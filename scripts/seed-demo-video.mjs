import dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';

// Load variables from .env.local (Next.js convention)
dotenv.config({ path: '.env.local' });

const {
  NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  NEXT_PUBLIC_CLOUDINARY_API_KEY,
  NEXT_PUBLIC_CLOUDINARY_API_SECRET,
  NEXT_PUBLIC_CLOUDINARY_VIDEO_PUBLIC_ID,
} = process.env;

if (
  !NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ||
  !NEXT_PUBLIC_CLOUDINARY_API_KEY ||
  !NEXT_PUBLIC_CLOUDINARY_API_SECRET
) {
  console.error(
    'Missing Cloudinary environment variables. Please set NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME, NEXT_PUBLIC_CLOUDINARY_API_KEY, and NEXT_PUBLIC_CLOUDINARY_API_SECRET in .env.local.'
  );
  process.exit(1);
}

cloudinary.config({
  cloud_name: NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: NEXT_PUBLIC_CLOUDINARY_API_SECRET,
});

function toVttTimestamp(seconds) {
  const totalMs = Math.round(Number(seconds) * 1000);
  const hours = Math.floor(totalMs / 3_600_000);
  const minutes = Math.floor((totalMs % 3_600_000) / 60_000);
  const secs = Math.floor((totalMs % 60_000) / 1_000);
  const ms = totalMs % 1_000;

  const pad = (n, len = 2) => String(n).padStart(len, '0');
  return `${pad(hours)}:${pad(minutes)}:${pad(secs)}.${pad(ms, 3)}`;
}

function transcriptJsonToVtt(segments) {
  let vtt = 'WEBVTT\n\n';

  segments.forEach((segment, index) => {
    if (!segment.words || !segment.words.length) return;
    const words = segment.words;
    const start = words[0].start_time;
    const end = words[words.length - 1].end_time;

    vtt += `${index + 1}\n`;
    vtt += `${toVttTimestamp(start)} --> ${toVttTimestamp(end)}\n`;
    vtt += `${segment.transcript.trim()}\n\n`;
  });

  return vtt;
}

async function ensureCaptionsFor(publicId) {
  const transcriptUrl = `https://res.cloudinary.com/${NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/raw/upload/${publicId}.transcript`;
  console.log(`Fetching transcript JSON from ${transcriptUrl}...`);

  const resp = await fetch(transcriptUrl);
  if (!resp.ok) {
    console.warn(
      `Transcript not available yet (status ${resp.status}). You may need to wait for processing to finish or re-run this script.`
    );
    return;
  }

  const segments = await resp.json();
  const vtt = transcriptJsonToVtt(segments);

  const captionPublicId = `${publicId}_en.vtt`;
  console.log(`Uploading generated captions as raw asset "${captionPublicId}"...`);

  // Upload from a buffer using upload_stream to avoid very long "file" paths
  await new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        resource_type: 'raw',
        public_id: captionPublicId,
        overwrite: true,
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );

    uploadStream.end(Buffer.from(vtt, 'utf8'));
  });

  console.log('Captions upload complete.');
}

async function main() {
  const publicId = NEXT_PUBLIC_CLOUDINARY_VIDEO_PUBLIC_ID || 'accessible_demo_video';
  // Cloudinary demo "lincoln" video
  const sourceUrl = 'https://demo-res.cloudinary.com/video/upload/lincoln.mp4';

  console.log(`Uploading demo video from ${sourceUrl} as public ID "${publicId}"...`);

  const result = await cloudinary.uploader.upload(sourceUrl, {
    resource_type: 'video',
    public_id: publicId,
    overwrite: true,
    // Request automatic transcription; requires a transcription add-on to be enabled.
    auto_transcription: true,
  });

  console.log('Upload complete.');
  console.log('Public ID:', result.public_id);
  console.log('Secure URL:', result.secure_url);

  // Try to generate and upload a VTT captions file from the transcript JSON.
  await ensureCaptionsFor(publicId);

  console.log(
    'If transcription is enabled for your account, captions have been generated as VTT and will be surfaced by the Cloudinary Video Player.'
  );
}

main().catch((err) => {
  console.error('Failed to upload demo video:', err);
  process.exit(1);
});


'use client';

import { CldVideoPlayer } from 'next-cloudinary';

interface AccessibleVideoPlayerProps {
  publicId?: string;
  className?: string;
}

export default function AccessibleVideoPlayer({
  publicId = process.env.NEXT_PUBLIC_CLOUDINARY_VIDEO_PUBLIC_ID || 'sample',
  className = '',
}: AccessibleVideoPlayerProps) {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  // Seed script uploads captions as a raw VTT with public ID `${publicId}_en.vtt`
  const captionsUrl =
    cloudName && publicId
      ? `https://res.cloudinary.com/${cloudName}/raw/upload/${publicId}_en.vtt`
      : undefined;

  const textTracks = captionsUrl
    ? {
        captions: {
          label: 'English',
          language: 'en',
          default: true,
          url: captionsUrl,
        },
      }
    : undefined;

  return (
    <div className={className}>
      <CldVideoPlayer
        id="accessible-video-player"
        width={1280}
        height={720}
        src={publicId}
        controls
        autoplay={false}
        muted={false}
        loop={false}
        preload="metadata"
        playsinline
        className="w-full h-auto"
        transformation={{
          quality: 'auto',
          format: 'auto',
        }}
        textTracks={textTracks}
      />
    </div>
  );
}






 
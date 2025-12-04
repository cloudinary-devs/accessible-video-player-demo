import { Cloudinary } from '@cloudinary/url-gen';

// Create and configure a Cloudinary instance
export const cld = new Cloudinary({
  cloud: {
    cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'demo',
  },
});


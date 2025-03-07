/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: [
        'cdn.shopify.com'  // Allow images from Shopify CDN
      ],
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'cdn.shopify.com',
          pathname: '**',
        },
      ],
    },
  };
  
  export default nextConfig;
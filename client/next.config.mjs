/** @type {import('next').NextConfig} */

// For using CommonJS modules like '@next/bundle-analyzer' in an ES Module (.mjs file)
import { createRequire } from 'module';
const commonJsRequire = createRequire(import.meta.url); // Renamed to avoid confusion with global require if it existed

const withBundleAnalyzer = commonJsRequire('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.shopify.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'places.googleapis.com',
        pathname: '**',
      },
    ],
  },
  
  // Advanced compiler options
  compiler: {
    // Remove console logs in production
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  // Note: optimizePackageImports has been removed as it may not be supported
  // in your Next.js version. If you're using Next.js 13.1+, you can 
  // add it back as a top-level option.
};

// Export configuration with bundle analyzer wrapper using ESM export
export default withBundleAnalyzer(nextConfig);
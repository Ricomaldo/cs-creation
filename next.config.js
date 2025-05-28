/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      formats: ['image/webp', 'image/avif'],
      minimumCacheTTL: 31536000,
    },
    experimental: {
      optimizeCss: true,
    },
  }
  
  module.exports = nextConfig
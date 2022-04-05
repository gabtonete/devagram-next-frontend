/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  images: {
    domains: ['assets.vercel.com', 'cdn.cosmicjs.com'],
    formats: ['image/avif', 'image/webp'],
  },
}

module.exports = nextConfig

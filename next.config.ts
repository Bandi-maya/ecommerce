/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
{ protocol: 'https', hostname: 'images.unsplash.com' },     // Fixes Hero Section
      { protocol: 'https', hostname: 'png.pngtree.com' },       // Fixes Awards
      { protocol: 'https', hostname: 'w7.pngwing.com' },        // Fixes Awards
      { protocol: 'https', hostname: 'e7.pngegg.com' },         // Fixes Awards
      { protocol: 'https', hostname: 'images.avishkaar.cc' },  // Fixes Partners & Newsroom
    ],
  },
};

export default nextConfig; // Use 'module.exports = nextConfig' if using CommonJS
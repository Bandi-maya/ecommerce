/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      // You can add more domains here if needed (e.g., 'www.mediatek.com')
      {
        protocol: 'https',
        hostname: 'www.mediatek.com',
      },
      {
        protocol: 'https',
        hostname: 'miro.medium.com',
      },
      {
        protocol: 'https',
        hostname: 'builtin.com',
      },
    ],
  },
};

export default nextConfig; // Use 'module.exports = nextConfig' if using CommonJS
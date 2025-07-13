/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // For GitHub Pages deployment
  output: 'export',
  trailingSlash: true,
  basePath: process.env.NODE_ENV === 'production' ? '/FridgeChef' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/FridgeChef/' : '',
}

module.exports = nextConfig 
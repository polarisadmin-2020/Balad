/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@monorepo/shared-ui'],
  output: 'export',
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  // Disable static optimization to prevent hydration issues
  experimental: {
    // This helps with hydration issues
    optimizeCss: false,
    optimizeServerReact: false
  }
};

module.exports = nextConfig;
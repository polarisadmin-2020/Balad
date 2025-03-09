/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@monorepo/shared-ui'],
  output: 'export',
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  // Enable experimental features
  experimental: {
    serverActions: true
  },
  // Server configuration
  serverRuntimeConfig: {
    // Will only be available on the server side
    mySecret: 'secret',
  },
  // Public runtime configuration
  publicRuntimeConfig: {
    // Will be available on both server and client
    staticFolder: '/static',
  },
  // Configure hostname and port
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        fs: false,
        net: false,
        tls: false,
      };
    }
    return config;
  },
};

module.exports = nextConfig;
const nextConfig = {
  images: {
    unoptimized: true,
  },
  experimental: {
    // Remove if not using Server Components
    serverComponentsExternalPackages: ['mongodb'],
  },
  webpack(config, { dev, isServer, nextRuntime }) {
    if (dev) {
      // Reduce CPU/memory from file watching
      config.watchOptions = {
        poll: 2000, // check every 2 seconds
        aggregateTimeout: 300, // wait before rebuilding
        ignored: ['**/node_modules'],
      };
    }

    // Polyfill/mock Node.js built-ins to prevent compilation crashes on edge runtime
    if (!isServer || nextRuntime === 'edge') {
      const path = require('path');
      config.resolve.alias = {
        ...config.resolve.alias,
        mongodb: path.resolve(__dirname, 'lib/mongodb-mock.js'),
      };
      config.resolve.fallback = {
        ...config.resolve.fallback,
        crypto: false,
        child_process: false,
        'fs/promises': false,
        net: false,
        dns: false,
        tls: false,
        fs: false,
        path: false,
        os: false,
        '@react-email/render': false,
      };
    }

    return config;
  },
  onDemandEntries: {
    maxInactiveAge: 10000,
    pagesBufferLength: 2,
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "ALLOWALL" },
          { key: "Content-Security-Policy", value: "frame-ancestors *;" },
          { key: "Access-Control-Allow-Origin", value: process.env.CORS_ORIGINS || "*" },
          { key: "Access-Control-Allow-Methods", value: "GET, POST, PUT, DELETE, OPTIONS" },
          { key: "Access-Control-Allow-Headers", value: "*" },
        ],
      },
    ];
  },
};

module.exports = nextConfig;

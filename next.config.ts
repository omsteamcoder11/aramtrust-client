import type { NextConfig } from "next";

const API_URL = process.env.API_URL;

if (!API_URL) {
  throw new Error(
    'API_URL is not set. Add it to your .env (dev) or hosting provider\'s environment variables (production).'
  );
}

const apiUrlParsed = new URL(API_URL);

const nextConfig: NextConfig = {
  reactCompiler: true,
  allowedDevOrigins: ['192.168.86.2'],
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: apiUrlParsed.protocol.replace(':', '') as 'http' | 'https',
        hostname: apiUrlParsed.hostname,
        port: apiUrlParsed.port,
        pathname: '/uploads/**',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/api/support/:path*',
        destination: `${API_URL}/api/support/:path*`,
      },
    ]
  },
};

export default nextConfig;
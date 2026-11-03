import type { NextConfig } from 'next';

// Page routing is temporarily handled by the splash middleware.
const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;

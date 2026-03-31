import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  redirects: async () => {
    return [
      {
        source: '/dashboard',
        destination: '/dashboard/challenge',
        permanent: true,
      },
    ];
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  devIndicators: false,
};

export default nextConfig;

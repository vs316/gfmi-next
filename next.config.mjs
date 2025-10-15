/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  eslint: {
    // Allow builds to complete even if there are ESLint errors or warnings
    ignoreDuringBuilds: true,
  },
}

export default nextConfig

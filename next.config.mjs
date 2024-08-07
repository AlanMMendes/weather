/** @type {import('next').NextConfig} */
const nextConfig = {
  env: { NEXT_PUBLIC_BASE_API_URL: process.env.NEXT_PUBLIC_BASE_API_URL },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;

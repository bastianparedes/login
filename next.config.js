/** @type {import('next').NextConfig} */

const nextConfig = {
  basePath: '/passwords',
  eslint: {
    dirs: ['.']
  },
  reactStrictMode: true,
  swcMinify: true
};

module.exports = nextConfig;

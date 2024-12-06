/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['ebkstoragea.blob.core.windows.net','via.placeholder.com'], 
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
};

export default nextConfig;

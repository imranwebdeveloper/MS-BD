/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "storage.googleapis.com",
        pathname: "/**",
      },
    ],
  },
  env: {
    API_URL: process.env.API_URL,
    API_KEY: process.env.API_KEY,
    IMGDB_API_KEY: process.env.IMGDB_API_KEY,
    TOKEN_NAME: process.env.TOKEN_NAME,
    LOGO: process.env.LOGO,
    FULL_DOMAIN_URL: process.env.FULL_DOMAIN_URL,
  },
};

module.exports = nextConfig;

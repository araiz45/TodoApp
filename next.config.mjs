/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    mongoUrl: process.env.MONGO_URL,
    serverUrl: process.env.SERVER_URL,
  },
};

export default nextConfig;

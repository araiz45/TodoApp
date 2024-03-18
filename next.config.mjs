/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    mongoUrl: process.env.MONGO_URL,
    serverUrl: process.env.SERVER_URL,
    jwtSecret: process.env.JWTSECRET,
  },
};

export default nextConfig;

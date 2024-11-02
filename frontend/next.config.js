/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['cdn.vox-cdn.com'],
  },
  env: {
    MONGODB_URI: process.env.MONGODB_URI, // Ajout de la variable d'environnement
  },
};

module.exports = nextConfig;

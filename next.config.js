/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/api/auth/callback/google",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;

//need to do this for CORS
/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://yieldtables.org/v1/:path*",
      },
    ];
  },
};

export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://syntra-dev.duckdns.org/:path*", // ✅ apna actual backend URL
      },
    ];
  },
};

export default nextConfig;
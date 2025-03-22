import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // Allows all image sources
      },
    ],
    unoptimized: true, // Allows Next.js to serve images without optimization
  },
};

export default nextConfig;

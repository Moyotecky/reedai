import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "images.ctfassets.net",
            },
            {
                protocol: "https",
                hostname: "www.notion.com",
            },
        ],
    },
};

export default nextConfig;

import "./src/env";

import type { NextConfig } from "next";

const NextConfig = {
    experimental: { appDir: true },
    images: {
        formats: ["image/avif", "image/webp"],
        remotePatterns: [
            {
                protocol: "https",
                hostname: "images.unsplash.com",
                pathname: "/**",
            },
            {
                protocol: "https",
                hostname: "images.pexels.com",
                pathname: "/**",
            },
        ],
    },
    allowedDevOrigins: ["http://192.168.0.104:3000"],
};

module.exports = NextConfig;
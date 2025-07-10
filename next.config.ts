import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    dangerouslyAllowSVG:true,
    domains: ["dl.dropboxusercontent.com","plus.unsplash.com"], // Add Dropbox domain here
  },
    compiler:{
    removeConsole : process.env.NODE_ENV === 'production'
  },
  webpack(config, { isServer }) {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        canvas: false, // Prevents trying to resolve 'canvas' in the browser
      };
    }
    return config;
  },
};

export default nextConfig;

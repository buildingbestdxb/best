import type { NextConfig } from "next";


const nextConfig: NextConfig = {
  images: {
    dangerouslyAllowSVG:true,
    remotePatterns: [
    {
      protocol: "https",
      hostname: "dl.dropboxusercontent.com",
    },
    {
      protocol: "https",
      hostname: "plus.unsplash.com",
    },
  ], 
  unoptimized:true// Add Dropbox domain here
  },
    compiler:{
    removeConsole : process.env.NODE_ENV === 'production'
  },
  webpack(config, { nextRuntime }) {
    if (nextRuntime === "nodejs") {
      config.resolve.alias.canvas = false;
    }

    return config;
  },

};

export default nextConfig;

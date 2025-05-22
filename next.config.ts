import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    dangerouslyAllowSVG:true,
    domains: ["dl.dropboxusercontent.com","plus.unsplash.com"], // Add Dropbox domain here
  },
    compiler:{
    removeConsole : process.env.NODE_ENV === 'production'
  },
};

export default nextConfig;

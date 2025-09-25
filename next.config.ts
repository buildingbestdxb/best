import type { NextConfig } from "next";

const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'unsafe-inline' 'unsafe-eval';
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: blob: https://dl.dropboxusercontent.com https://plus.unsplash.com;
  connect-src 'self';
  font-src 'self';
  frame-src 'none';
`;



const nextConfig: NextConfig = {
  images: {
    dangerouslyAllowSVG:true,
    domains: ["dl.dropboxusercontent.com","plus.unsplash.com"], // Add Dropbox domain here
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
  async headers() {
    return [
      {
        source: "/(.*)", // Apply CSP site-wide
        headers: [
          {
            key: "Content-Security-Policy",
            value: ContentSecurityPolicy.replace(/\n/g, " "),
          },
        ],
      },
    ];
  },
};

export default nextConfig;

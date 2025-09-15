import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    dangerouslyAllowSVG:true,
    domains: ["dl.dropboxusercontent.com","plus.unsplash.com"],
    unoptimized: true, // Add Dropbox domain here
  },
    compiler:{
    removeConsole : process.env.NODE_ENV === 'production'
  },
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\.[^/]+$).*)",
  ],
  webpack(config, { nextRuntime }) {
    if (nextRuntime === "nodejs") {
      config.resolve.alias.canvas = false;
    }

    return config;
  },
};

export default nextConfig;

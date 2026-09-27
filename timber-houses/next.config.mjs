/** @type {import("next").NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "derevbud.com.ua",
        pathname: "/uploads/**",
      },
    ],
  },
};

export default nextConfig;

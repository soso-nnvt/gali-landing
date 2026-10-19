/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  outputFileTracingRoot: process.cwd(),
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "pub-32cb790bb4ad44f18559fd6fdf139da7.r2.dev" },
      { protocol: "https", hostname: "picsum.photos" },
    ],
  },
};
export default nextConfig;

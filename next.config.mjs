/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "export", // emits a plain static site to /out (GitHub Pages)
  images: { unoptimized: true },
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || "", // set for project Pages URL
};
export default nextConfig;

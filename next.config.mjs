/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */

  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        // port: "",
        // pathname: "/my-bucket/**",
        // search: "",
      },
    ],
  },
};

export default nextConfig;

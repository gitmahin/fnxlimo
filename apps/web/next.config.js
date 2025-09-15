/** @type {import('next').NextConfig} */
const nextConfig = {
images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cms.finixlimo.com",
      },
       {
        protocol: "https",
        hostname: "secure.gravatar.com",
      },
    ],
  },
};

export default nextConfig;
 
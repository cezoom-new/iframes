import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [{ hostname: "cdn.sanity.io" }],
    dangerouslyAllowSVG: true,
  },
  // experimental: {
  //   reactCompiler: true,
  // },
  logging: {
    fetches: {
      fullUrl: true,
    },
    // @ts-ignore
    incomingRequests: {
      ignore: [/\api\/v1\/health/],
    },
  },
  env: {
    SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY,
    SUPABASE_URL: process.env.SUPABASE_URL,
  },
};

export default nextConfig;

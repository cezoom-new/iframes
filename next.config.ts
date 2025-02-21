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
    SUPABASE_ANON_PUBLIC: process.env.SUPABASE_ANON_PUBLIC,
    SUPABASE_PROJECT_URL: process.env.SUPABASE_PROJECT_URL,
    PROJECT_URL: process.env.PROJECT_URL,
    TOKEN: process.env.TOKEN,
  },
};

export default nextConfig;

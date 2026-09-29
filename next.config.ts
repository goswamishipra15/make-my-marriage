import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

// Token-bearing guest pages must not leak their URL via Referer or be indexed.
const tokenPageHeaders = [
  { key: "Referrer-Policy", value: "no-referrer" },
  { key: "X-Robots-Tag", value: "noindex, nofollow" },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  // Native Argon2 bindings must not be bundled.
  serverExternalPackages: ["@node-rs/argon2"],
  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      { source: "/invite/:path*", headers: tokenPageHeaders },
      { source: "/gallery/:path*", headers: tokenPageHeaders },
      { source: "/join/:path*", headers: tokenPageHeaders },
      { source: "/api/public/:path*", headers: tokenPageHeaders },
    ];
  },
};

export default nextConfig;

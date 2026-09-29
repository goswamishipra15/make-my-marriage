import type { RateLimitRule } from "@/server/security/rate-limit";

const MINUTE = 60 * 1000;

/** Central list of rate-limit rules (API_DESIGN §99). */
export const RATE_LIMITS = {
  signupPerIp: { name: "auth:signup:ip", limit: 10, windowMs: 60 * MINUTE },
  loginPerEmail: { name: "auth:login:email", limit: 10, windowMs: 15 * MINUTE },
  loginPerIp: { name: "auth:login:ip", limit: 50, windowMs: 15 * MINUTE },
} satisfies Record<string, RateLimitRule>;

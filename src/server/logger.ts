import "server-only";

/**
 * Minimal structured logger (SYSTEM_DESIGN §62).
 *
 * Sensitive keys are redacted recursively so passwords, tokens, and signed
 * URLs never reach Vercel logs even if a caller passes them by mistake.
 */
type LogLevel = "info" | "warn" | "error";
type LogContext = Record<string, unknown>;

const SENSITIVE_KEY = /pass(word)?|token|secret|cookie|authorization|signed.?url|upload.?url/i;

function redact(value: unknown, depth = 0): unknown {
  if (depth > 5 || value === null || typeof value !== "object") return value;

  if (value instanceof Error) {
    return { name: value.name, message: value.message, stack: value.stack };
  }

  if (Array.isArray(value)) return value.map((item) => redact(item, depth + 1));

  return Object.fromEntries(
    Object.entries(value as Record<string, unknown>).map(([key, entry]) => [
      key,
      SENSITIVE_KEY.test(key) ? "[REDACTED]" : redact(entry, depth + 1),
    ]),
  );
}

function write(level: LogLevel, message: string, context?: LogContext) {
  const line = JSON.stringify({
    level,
    message,
    time: new Date().toISOString(),
    ...(context ? (redact(context) as LogContext) : {}),
  });

  if (level === "error") console.error(line);
  else if (level === "warn") console.warn(line);
  else console.info(line);
}

export const logger = {
  info: (message: string, context?: LogContext) => write("info", message, context),
  warn: (message: string, context?: LogContext) => write("warn", message, context),
  error: (message: string, context?: LogContext) => write("error", message, context),
};

const ZIP = /^\d{5}$/;
const PROVIDER_ID = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
export type PublicOperation = "zip" | "search" | "provider" | "compare" | "federal";
const LIMITS: Record<PublicOperation, number> = { zip: 60, search: 40, provider: 120, compare: 30, federal: 30 };
const WINDOW_MS = 60_000;
type Bucket = { startedAt: number; count: number };
const buckets = new Map<string, Bucket>();

export function validateZip(value: string | null | undefined) {
  if (!value || !ZIP.test(value)) throw new PublicReadError(400, "INVALID_ZIP");
  return value;
}
export function validateProviderId(value: string | null | undefined) {
  if (!value || !PROVIDER_ID.test(value)) throw new PublicReadError(400, "INVALID_PROVIDER_ID");
  return value;
}
export function validateCompareIds(values: string[]) {
  const unique = [...new Set(values)];
  if (unique.length < 2 || unique.length > 4) throw new PublicReadError(400, "COMPARE_REQUIRES_2_TO_4");
  return unique.map(validateProviderId);
}
export class PublicReadError extends Error { constructor(public status: number, public code: string) { super(code); } }
export function publicClientKey(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return forwarded || request.headers.get("x-real-ip") || "anonymous";
}
export function enforceRateLimit(operation: PublicOperation, key: string, now = Date.now()) {
  const bucketKey = `${operation}:${key}`;
  const previous = buckets.get(bucketKey);
  const bucket = !previous || now - previous.startedAt >= WINDOW_MS ? { startedAt: now, count: 0 } : previous;
  bucket.count += 1; buckets.set(bucketKey, bucket);
  const remaining = Math.max(0, LIMITS[operation] - bucket.count);
  if (bucket.count > LIMITS[operation]) throw new PublicReadError(429, "RATE_LIMITED");
  return { limit: LIMITS[operation], remaining, resetAt: bucket.startedAt + WINDOW_MS };
}
export function publicReadsEnabled() {
  const previewCandidate = process.env.VERCEL_ENV === "preview";
  return (process.env.MOVE_ENABLE_PUBLIC_READS === "true" || previewCandidate) && (process.env.MOVE_ENABLE_V2 === "true" || previewCandidate);
}
export function publicError(error: unknown) {
  if (error instanceof PublicReadError) return { status: error.status, body: { error: error.code } };
  return { status: 503, body: { error: "RESEARCH_TEMPORARILY_UNAVAILABLE" } };
}
export function resetRateLimitsForTest() { buckets.clear(); }

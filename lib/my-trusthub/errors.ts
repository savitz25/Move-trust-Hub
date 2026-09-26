export type ErrorCode = 'invalid' | 'unauthorized' | 'expired' | 'conflict' | 'rate_limited' | 'unavailable';
export class ProtocolError extends Error {
  constructor(readonly code: ErrorCode) { super(code); }
}
export const PRIVATE_HEADERS = { 'Cache-Control': 'private, no-store', 'Referrer-Policy': 'no-referrer', 'X-Content-Type-Options': 'nosniff' };
export function errorResponse(error: unknown): Response {
  const code = error instanceof ProtocolError ? error.code : error instanceof SyntaxError ? 'invalid' : 'unavailable';
  return Response.json({ ok: false, error: code }, { status: { invalid: 400, unauthorized: 403, expired: 410, conflict: 409, rate_limited: 429, unavailable: 503 }[code], headers: PRIVATE_HEADERS });
}

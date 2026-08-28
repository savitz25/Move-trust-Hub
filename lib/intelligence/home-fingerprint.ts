import { createHash } from 'node:crypto';

const EXCLUDED = new Set([
  'generatedAt',
  'timedOut',
  'canonicalFingerprint',
  'payloadFingerprint',
]);

export function canonicalizeForFingerprint(value: unknown): unknown {
  if (value === null || typeof value !== 'object') return value;
  if (Array.isArray(value)) return value.map(canonicalizeForFingerprint);
  const obj = value as Record<string, unknown>;
  const out: Record<string, unknown> = {};
  for (const key of Object.keys(obj).sort()) {
    if (EXCLUDED.has(key)) continue;
    out[key] = canonicalizeForFingerprint(obj[key]);
  }
  return out;
}

export function fingerprintMoveHomePayload(payload: unknown): string {
  return createHash('sha256')
    .update(JSON.stringify(canonicalizeForFingerprint(payload)))
    .digest('hex');
}

/**
 * Conservative contact normalization/quality helpers. No outbound email, no vendors, no Google.
 */
import { normalizeEmail, normalizePhone } from '@/lib/state-hhg/normalize';

const ROLE_LOCAL_PARTS = new Set([
  'info',
  'office',
  'sales',
  'support',
  'dispatch',
  'moving',
  'admin',
  'contact',
  'hello',
  'bookings',
  'booking',
  'estimates',
  'estimate',
  'quotes',
  'quote',
  'customerservice',
  'service',
  'help',
  'mail',
  'webmaster',
]);

export function parsePhoneParts(value: string | null | undefined): {
  raw: string | null;
  normalized: string | null;
  extension: string | null;
  malformed: boolean;
} {
  const raw = value?.trim() ? value.trim() : null;
  if (!raw) return { raw: null, normalized: null, extension: null, malformed: false };
  const extMatch = raw.match(/(?:ext\.?|x|extension)\s*(\d{1,6})$/i);
  const extension = extMatch?.[1] ?? null;
  const withoutExt = extMatch ? raw.slice(0, extMatch.index).trim() : raw;
  const normalized = normalizePhone(withoutExt);
  return {
    raw,
    normalized,
    extension,
    malformed: !normalized,
  };
}

export function classifyEmail(value: string | null | undefined): {
  raw: string | null;
  normalized: string | null;
  class: 'named' | 'role' | 'generic' | 'malformed' | 'empty';
} {
  const raw = value?.trim() ? value.trim() : null;
  if (!raw) return { raw: null, normalized: null, class: 'empty' };
  const normalized = normalizeEmail(raw);
  if (!normalized) return { raw, normalized: null, class: 'malformed' };
  const local = normalized.split('@')[0] ?? '';
  const localKey = local.replace(/[._-]/g, '');
  if (ROLE_LOCAL_PARTS.has(local) || ROLE_LOCAL_PARTS.has(localKey)) {
    return { raw, normalized, class: 'role' };
  }
  if (local === 'info' || local.startsWith('info+') || local === 'office') {
    return { raw, normalized, class: 'generic' };
  }
  if (/^[a-z]+[._-]?[a-z]+$/.test(local) && !ROLE_LOCAL_PARTS.has(localKey)) {
    return { raw, normalized, class: 'named' };
  }
  return { raw, normalized, class: 'generic' };
}

export function isPoBox(address: string | null | undefined): boolean {
  if (!address) return false;
  return /\bP\.?\s*O\.?\s*BOX\b/i.test(address) || /\bPOST\s*OFFICE\s*BOX\b/i.test(address);
}

export type StateCandidateClass =
  | 'MATCHED_EXISTING'
  | 'ACTIVE_STATE_ONLY_CANDIDATE'
  | 'EXPIRED_STATE_RECORD'
  | 'REVOKED_STATE_RECORD'
  | 'UNKNOWN_STATE_RECORD';

export function classifyStateCandidate(input: {
  matchedCompanyId: string | null;
  statusNormalized: string;
}): StateCandidateClass {
  if (input.matchedCompanyId) return 'MATCHED_EXISTING';
  if (input.statusNormalized === 'expired') return 'EXPIRED_STATE_RECORD';
  if (input.statusNormalized === 'revoked' || input.statusNormalized === 'suspended') {
    return 'REVOKED_STATE_RECORD';
  }
  if (input.statusNormalized === 'active') return 'ACTIVE_STATE_ONLY_CANDIDATE';
  return 'UNKNOWN_STATE_RECORD';
}

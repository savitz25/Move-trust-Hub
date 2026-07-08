import 'server-only';

import { fmcsaPreviewFromSnapshot } from '@/lib/fmcsa/carrier-fields';
import type { FmcsaCarrierSnapshot } from '@/lib/fmcsa/refresh/types';
import { parseHeadquarters } from '@/lib/fmcsa/refresh/parse-headquarters';
import type { CompanySuggestionRow } from '@/lib/suggestions/approve';

function normalizeSafetyRating(
  value: string | null | undefined
): FmcsaCarrierSnapshot['safetyRating'] {
  const v = (value ?? '').trim();
  if (v === 'Satisfactory' || v === 'Conditional' || v === 'Unsatisfactory') return v;
  return 'Not Rated';
}

function isAuthorityCodeActive(status?: string | null): boolean {
  if (!status) return false;
  const code = status.trim().toUpperCase();
  return code === 'A' || code === 'ACTIVE';
}

/** Build FMCSA snapshot from stored suggestion data (no live API call). */
export function snapshotFromSuggestion(
  suggestion: CompanySuggestionRow
): FmcsaCarrierSnapshot | null {
  if (!suggestion.fmcsa_raw || typeof suggestion.fmcsa_raw !== 'object') {
    return null;
  }

  const raw = suggestion.fmcsa_raw as Record<string, unknown>;
  const usdot = suggestion.usdot?.replace(/\D/g, '') || String(raw.dotNumber ?? '').replace(/\D/g, '');
  if (!usdot) return null;

  const allowed = String(raw.allowedToOperate ?? '').trim().toUpperCase() === 'Y';
  const authorityFromCodes =
    isAuthorityCodeActive(raw.commonAuthorityStatus as string | undefined) ||
    isAuthorityCodeActive(raw.contractAuthorityStatus as string | undefined) ||
    isAuthorityCodeActive(raw.brokerAuthorityStatus as string | undefined);

  const authorityActive = allowed || authorityFromCodes;
  const previewSafety =
    suggestion.fmcsa_preview && typeof suggestion.fmcsa_preview === 'object'
      ? (suggestion.fmcsa_preview as { safetyRating?: string }).safetyRating
      : null;

  const safetyRating =
    (raw.safetyRating as string | undefined)?.trim() || previewSafety || 'Not Rated';

  return {
    dotNumber: usdot,
    mcNumber: suggestion.mc_number?.replace(/\D/g, '') || undefined,
    legalName: suggestion.legal_name || suggestion.name,
    dbaName: (raw.dbaName as string | undefined) ?? undefined,
    allowedToOperate: allowed,
    authorityActive,
    outOfService: Boolean(raw.oosDate),
    safetyRating: normalizeSafetyRating(safetyRating),
    complaintsLast12m: Number(raw.totalComplaints ?? raw.complaintCount ?? 0) || 0,
    shipments: Math.max(Number(raw.totalPowerUnits ?? 0) * 50, 1000),
    revocationDate: null,
    raw,
  };
}

/**
 * Prefer stored suggestion FMCSA data; optionally merge a fresher live snapshot
 * without overwriting good stored fields.
 */
export function resolvePublishFmcsaSnapshot(
  suggestion: CompanySuggestionRow,
  liveSnapshot: FmcsaCarrierSnapshot | null
): FmcsaCarrierSnapshot | null {
  const stored = snapshotFromSuggestion(suggestion);

  if (!liveSnapshot) {
    return stored;
  }

  if (!stored) {
    return liveSnapshot;
  }

  return {
    ...stored,
    ...liveSnapshot,
    legalName: liveSnapshot.legalName || stored.legalName,
    raw: Object.keys(liveSnapshot.raw).length ? liveSnapshot.raw : stored.raw,
    authorityActive: liveSnapshot.allowedToOperate
      ? liveSnapshot.authorityActive || liveSnapshot.allowedToOperate
      : stored.authorityActive,
    allowedToOperate: liveSnapshot.allowedToOperate || stored.allowedToOperate,
    complaintsLast12m: liveSnapshot.complaintsLast12m ?? stored.complaintsLast12m,
    shipments: liveSnapshot.shipments ?? stored.shipments,
    safetyRating: liveSnapshot.safetyRating ?? stored.safetyRating,
  };
}

export function coverageFromHeadquarters(headquarters: string | null | undefined): string {
  const { city, state } = parseHeadquarters(headquarters);
  if (city && state) return `${city}, ${state}`;
  if (state) return state;
  return 'Continental US';
}

export function isPublishVerified(snapshot: FmcsaCarrierSnapshot | null): boolean {
  if (!snapshot) return false;
  if (snapshot.outOfService) return false;
  return Boolean(snapshot.allowedToOperate || snapshot.authorityActive);
}

export function fmcsaPreviewJsonFromSnapshot(snapshot: FmcsaCarrierSnapshot | null) {
  if (!snapshot) return null;
  return fmcsaPreviewFromSnapshot(snapshot);
}
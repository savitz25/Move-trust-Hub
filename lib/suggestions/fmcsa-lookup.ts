import 'server-only';

import { fetchFmcsaCarrierSnapshot } from '@/lib/fmcsa/refresh/fetch-carrier';
import { parseCarrierNumber } from '@/lib/verify-dot/schema';
import { resolveCarrierPreview } from '@/lib/verify-dot/fmcsa';
import type { FmcsaPreview } from '@/lib/verify-dot/fmcsa';

export type SuggestionFmcsaData = {
  legalName: string | null;
  headquarters: string | null;
  phone: string | null;
  authorityStatus: string | null;
  usdot: string | null;
  mcNumber: string | null;
  fmcsaPreview: FmcsaPreview | null;
  fmcsaRaw: Record<string, unknown> | null;
};

function normalizeUsdot(value: string | null | undefined): string | null {
  if (!value) return null;
  const digits = value.replace(/\D/g, '');
  return digits.length >= 3 ? digits : null;
}

export async function lookupFmcsaForSuggestion(
  usdotInput?: string | null
): Promise<SuggestionFmcsaData | null> {
  const usdot = normalizeUsdot(usdotInput);
  if (!usdot) return null;

  const parsed = parseCarrierNumber(usdot);
  if (!parsed) return null;

  const { preview } = await resolveCarrierPreview(parsed, null);
  const snapshot = await fetchFmcsaCarrierSnapshot(usdot);

  const legalName = snapshot?.legalName ?? preview?.legalName ?? null;
  const snapshotAddress = snapshot?.raw
    ? [
        (snapshot.raw as { phyStreet?: string }).phyStreet,
        (snapshot.raw as { phyCity?: string }).phyCity,
        (snapshot.raw as { phyState?: string }).phyState,
        (snapshot.raw as { phyZipcode?: string }).phyZipcode,
      ]
        .filter(Boolean)
        .join(', ')
    : null;

  const headquarters = preview?.physicalAddress ?? snapshotAddress ?? null;

  const authorityStatus = snapshot
    ? snapshot.authorityActive
      ? 'Active'
      : snapshot.allowedToOperate
        ? 'Registered'
        : 'Inactive'
    : preview?.allowedToOperate === 'Y'
      ? 'Active'
      : preview?.allowedToOperate
        ? String(preview.allowedToOperate)
        : null;

  return {
    legalName,
    headquarters: headquarters || null,
    phone: preview?.phone ?? (snapshot?.raw as { telephone?: string })?.telephone ?? null,
    authorityStatus,
    usdot,
    mcNumber: snapshot?.mcNumber ?? null,
    fmcsaPreview: preview,
    fmcsaRaw: snapshot?.raw ?? null,
  };
}
import 'server-only';

import { fetchFmcsaCarrierSnapshot } from '@/lib/fmcsa/refresh/fetch-carrier';
import { parseCarrierNumber, type ParsedCarrierNumber } from '@/lib/verify-dot/schema';
import { resolveCarrierPreview } from '@/lib/verify-dot/fmcsa';
import type { FmcsaPreview } from '@/lib/verify-dot/fmcsa';
import type { FmcsaSuggestionPreview } from '@/lib/suggestions/types';

export type SuggestionFmcsaData = {
  displayNumber: string;
  legalName: string | null;
  dbaName: string | null;
  headquarters: string | null;
  phone: string | null;
  authorityStatus: string | null;
  safetyRating: string | null;
  allowedToOperate: string | null;
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

function buildAuthorityStatus(snapshot: Awaited<ReturnType<typeof fetchFmcsaCarrierSnapshot>>, preview: FmcsaPreview | null): string | null {
  if (snapshot) {
    if (snapshot.authorityActive) return 'Active';
    if (snapshot.allowedToOperate) return 'Registered';
    return 'Inactive';
  }
  if (preview?.allowedToOperate === 'Y') return 'Active';
  if (preview?.allowedToOperate) return String(preview.allowedToOperate);
  return null;
}

function snapshotAddress(raw: Record<string, unknown> | null | undefined): string | null {
  if (!raw) return null;
  const address = [
    raw.phyStreet as string | undefined,
    raw.phyCity as string | undefined,
    raw.phyState as string | undefined,
    raw.phyZipcode as string | undefined,
  ]
    .filter(Boolean)
    .join(', ');
  return address || null;
}

export function toFmcsaSuggestionPreview(data: SuggestionFmcsaData): FmcsaSuggestionPreview {
  return {
    displayNumber: data.displayNumber,
    usdot: data.usdot,
    mcNumber: data.mcNumber,
    legalName: data.legalName,
    dbaName: data.dbaName,
    headquarters: data.headquarters,
    phone: data.phone,
    authorityStatus: data.authorityStatus,
    safetyRating: data.safetyRating,
    allowedToOperate: data.allowedToOperate,
  };
}

async function lookupFromParsed(parsed: ParsedCarrierNumber): Promise<SuggestionFmcsaData | null> {
  const { preview } = await resolveCarrierPreview(parsed, null);
  const dotForSnapshot =
    parsed.type === 'DOT' ? parsed.value : normalizeUsdot((preview as { dotNumber?: string })?.dotNumber as string) ?? parsed.value;

  const snapshot = await fetchFmcsaCarrierSnapshot(
    dotForSnapshot,
    parsed.type === 'MC' ? parsed.value : null
  );

  const legalName = snapshot?.legalName ?? preview?.legalName ?? null;
  if (!legalName && !preview?.legalName) return null;

  const raw = snapshot?.raw ?? null;
  const headquarters = preview?.physicalAddress ?? snapshotAddress(raw) ?? null;

  return {
    displayNumber: parsed.display,
    legalName,
    dbaName: snapshot?.dbaName ?? preview?.dbaName ?? null,
    headquarters,
    phone: preview?.phone ?? (raw?.telephone as string | undefined) ?? null,
    authorityStatus: buildAuthorityStatus(snapshot, preview),
    safetyRating: snapshot?.safetyRating ?? preview?.safetyRating ?? null,
    allowedToOperate: snapshot
      ? snapshot.allowedToOperate
        ? 'Y'
        : 'N'
      : preview?.allowedToOperate ?? null,
    usdot: snapshot?.dotNumber?.replace(/\D/g, '') ?? (parsed.type === 'DOT' ? parsed.value : null),
    mcNumber:
      snapshot?.mcNumber ??
      (parsed.type === 'MC' ? parsed.value : (raw?.docketNumber as string | undefined)?.replace(/\D/g, '') ?? null),
    fmcsaPreview: preview,
    fmcsaRaw: raw,
  };
}

export async function lookupFmcsaForSuggestion(
  carrierInput?: string | null
): Promise<SuggestionFmcsaData | null> {
  if (!carrierInput?.trim()) return null;
  const parsed = parseCarrierNumber(carrierInput.trim());
  if (!parsed) return null;
  return lookupFromParsed(parsed);
}
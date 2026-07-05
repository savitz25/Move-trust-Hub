import 'server-only';

import {
  fetchFmcsaCarrierByParsed,
  formatFmcsaPhysicalAddress,
} from '@/lib/fmcsa/refresh/fetch-carrier';
import { parseCarrierNumber, type ParsedCarrierNumber } from '@/lib/verify-dot/schema';
import { resolveCarrierPreview } from '@/lib/verify-dot/fmcsa';
import type { FmcsaPreview } from '@/lib/verify-dot/fmcsa';
import type { FmcsaSuggestionPreview } from '@/lib/suggestions/types';
import type { FmcsaCarrierSnapshot } from '@/lib/fmcsa/refresh/types';

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

function buildAuthorityStatus(
  snapshot: FmcsaCarrierSnapshot | null,
  preview: FmcsaPreview | null
): string | null {
  if (snapshot) {
    if (snapshot.authorityActive) return 'Active';
    if (snapshot.allowedToOperate) return 'Registered';
    return 'Inactive';
  }
  if (preview?.allowedToOperate === 'Y') return 'Active';
  if (preview?.allowedToOperate) return String(preview.allowedToOperate);
  return null;
}

function snapshotFromFallbackPreview(
  parsed: ParsedCarrierNumber,
  preview: FmcsaPreview
): SuggestionFmcsaData {
  return {
    displayNumber: parsed.display,
    legalName: preview.legalName ?? null,
    dbaName: preview.dbaName ?? null,
    headquarters: preview.physicalAddress ?? null,
    phone: preview.phone ?? null,
    authorityStatus: buildAuthorityStatus(null, preview),
    safetyRating: preview.safetyRating ?? null,
    allowedToOperate: preview.allowedToOperate ?? null,
    usdot: parsed.type === 'DOT' ? parsed.value : preview.usdot ?? null,
    mcNumber: parsed.type === 'MC' ? parsed.value : preview.mcNumber ?? null,
    fmcsaPreview: preview,
    fmcsaRaw: null,
  };
}

function snapshotToSuggestionData(
  parsed: ParsedCarrierNumber,
  snapshot: FmcsaCarrierSnapshot,
  preview: FmcsaPreview | null
): SuggestionFmcsaData {
  const raw = snapshot.raw as {
    phyStreet?: string;
    phyCity?: string;
    phyState?: string;
    phyZipcode?: string;
    telephone?: string;
    docketNumber?: string;
  };

  const headquarters =
    formatFmcsaPhysicalAddress(raw) ?? preview?.physicalAddress ?? null;

  return {
    displayNumber: parsed.display,
    legalName: snapshot.legalName ?? preview?.legalName ?? null,
    dbaName: snapshot.dbaName ?? preview?.dbaName ?? null,
    headquarters,
    phone: raw.telephone ?? preview?.phone ?? null,
    authorityStatus: buildAuthorityStatus(snapshot, preview),
    safetyRating: snapshot.safetyRating ?? preview?.safetyRating ?? null,
    allowedToOperate: snapshot.allowedToOperate ? 'Y' : preview?.allowedToOperate ?? 'N',
    usdot: snapshot.dotNumber?.replace(/\D/g, '') ?? (parsed.type === 'DOT' ? parsed.value : null),
    mcNumber:
      snapshot.mcNumber ??
      (parsed.type === 'MC' ? parsed.value : raw.docketNumber?.replace(/\D/g, '') ?? null),
    fmcsaPreview: preview,
    fmcsaRaw: snapshot.raw,
  };
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
  const snapshot = await fetchFmcsaCarrierByParsed(parsed);
  const { preview } = await resolveCarrierPreview(parsed, null);

  if (snapshot?.legalName) {
    return snapshotToSuggestionData(parsed, snapshot, preview);
  }

  if (preview?.legalName) {
    return snapshotFromFallbackPreview(parsed, preview);
  }

  return null;
}

export async function lookupFmcsaForSuggestion(
  carrierInput?: string | null
): Promise<SuggestionFmcsaData | null> {
  if (!carrierInput?.trim()) return null;

  if (!process.env.FMCSA_WEB_KEY?.trim()) {
    console.error('[fmcsa-lookup] FMCSA_WEB_KEY is not configured');
  }

  const parsed = parseCarrierNumber(carrierInput.trim());
  if (!parsed) return null;
  return lookupFromParsed(parsed);
}

/** Map verify-dot FmcsaPreview + full snapshot into suggestion pre-fill data. */
export async function lookupFmcsaForCarrierDisplay(
  carrierInput: string
): Promise<SuggestionFmcsaData | null> {
  return lookupFmcsaForSuggestion(carrierInput);
}
import 'server-only';

import {
  fmcsaPreviewFromSnapshot,
  fmcsaPreviewToSuggestionPreview,
} from '@/lib/fmcsa/carrier-fields';
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

function snapshotFromFallbackPreview(
  parsed: ParsedCarrierNumber,
  preview: FmcsaPreview
): SuggestionFmcsaData {
  const suggestionPreview = fmcsaPreviewToSuggestionPreview(
    preview,
    parsed.display,
    parsed.type === 'DOT' ? parsed.value : preview.usdot ?? null,
    parsed.type === 'MC' ? parsed.value : preview.mcNumber ?? null
  );

  return {
    displayNumber: parsed.display,
    legalName: suggestionPreview.legalName,
    dbaName: suggestionPreview.dbaName,
    headquarters: suggestionPreview.headquarters,
    phone: suggestionPreview.phone,
    authorityStatus: suggestionPreview.authorityStatus,
    safetyRating: suggestionPreview.safetyRating,
    allowedToOperate: suggestionPreview.allowedToOperate,
    usdot: suggestionPreview.usdot,
    mcNumber: suggestionPreview.mcNumber,
    fmcsaPreview: preview,
    fmcsaRaw: null,
  };
}

function snapshotToSuggestionData(
  parsed: ParsedCarrierNumber,
  snapshot: FmcsaCarrierSnapshot
): SuggestionFmcsaData {
  const preview = fmcsaPreviewFromSnapshot(snapshot);
  const raw = snapshot.raw as {
    phyStreet?: string;
    phyCity?: string;
    phyState?: string;
    phyZipcode?: string;
    telephone?: string;
    docketNumber?: string;
  };

  const headquarters = formatFmcsaPhysicalAddress(raw) ?? preview.physicalAddress ?? null;
  const usdot =
    snapshot.dotNumber?.replace(/\D/g, '') ?? (parsed.type === 'DOT' ? parsed.value : null);
  const mcNumber =
    snapshot.mcNumber ??
    (parsed.type === 'MC' ? parsed.value : raw.docketNumber?.replace(/\D/g, '') ?? null);

  const suggestionPreview = fmcsaPreviewToSuggestionPreview(
    { ...preview, physicalAddress: headquarters ?? preview.physicalAddress },
    parsed.display,
    usdot,
    mcNumber
  );

  return {
    displayNumber: parsed.display,
    legalName: suggestionPreview.legalName,
    dbaName: suggestionPreview.dbaName,
    headquarters: suggestionPreview.headquarters,
    phone: suggestionPreview.phone,
    authorityStatus: suggestionPreview.authorityStatus,
    safetyRating: suggestionPreview.safetyRating,
    allowedToOperate: suggestionPreview.allowedToOperate,
    usdot: suggestionPreview.usdot,
    mcNumber: suggestionPreview.mcNumber,
    fmcsaPreview: preview,
    fmcsaRaw: snapshot.raw,
  };
}

export function toFmcsaSuggestionPreview(data: SuggestionFmcsaData): FmcsaSuggestionPreview {
  if (data.fmcsaPreview) {
    return fmcsaPreviewToSuggestionPreview(
      data.fmcsaPreview,
      data.displayNumber,
      data.usdot,
      data.mcNumber
    );
  }

  return {
    displayNumber: data.displayNumber,
    usdot: data.usdot,
    mcNumber: data.mcNumber,
    legalName: data.legalName,
    dbaName: data.dbaName,
    headquarters: data.headquarters,
    addressStreet: null,
    addressCity: null,
    addressState: null,
    addressZip: null,
    phone: data.phone,
    entityType: null,
    usdotStatus: null,
    powerUnits: null,
    carrierOperation: null,
    cargoCarried: null,
    mcs150Mileage: null,
    authorityStatus: data.authorityStatus,
    safetyRating: data.safetyRating,
    allowedToOperate: data.allowedToOperate,
  };
}

async function lookupFromParsed(parsed: ParsedCarrierNumber): Promise<SuggestionFmcsaData | null> {
  const snapshot = await fetchFmcsaCarrierByParsed(parsed);

  if (snapshot?.legalName) {
    return snapshotToSuggestionData(parsed, snapshot);
  }

  const { preview } = await resolveCarrierPreview(parsed, null);
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
import type { VerifyDotResult } from '@/actions/verify-dot';
import type { FmcsaSuggestionPreview } from '@/lib/suggestions/types';
import { parseCarrierNumber } from '@/lib/verify-dot/schema';

/** Map an on-page DOT verification result into modal pre-fill data. */
export function fmcsaPreviewFromVerifyResult(
  result: VerifyDotResult
): FmcsaSuggestionPreview | null {
  if (!result.success || !result.displayNumber) return null;

  const parsed = parseCarrierNumber(result.displayNumber);
  if (!parsed) return null;

  const preview = result.preview;
  if (!preview?.legalName) return null;

  return {
    displayNumber: result.displayNumber,
    usdot: parsed.type === 'DOT' ? parsed.value : null,
    mcNumber: parsed.type === 'MC' ? parsed.value : null,
    legalName: preview.legalName ?? null,
    dbaName: preview.dbaName ?? null,
    headquarters: preview.physicalAddress ?? null,
    phone: preview.phone ?? null,
    authorityStatus:
      preview.allowedToOperate === 'Y'
        ? 'Active'
        : preview.allowedToOperate
          ? String(preview.allowedToOperate)
          : null,
    safetyRating: preview.safetyRating ?? null,
    allowedToOperate: preview.allowedToOperate ?? null,
  };
}
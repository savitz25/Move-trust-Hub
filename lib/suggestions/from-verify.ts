import type { VerifyDotResult } from '@/actions/verify-dot';
import { fmcsaPreviewToSuggestionPreview } from '@/lib/fmcsa/carrier-fields';
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

  return fmcsaPreviewToSuggestionPreview(
    preview,
    result.displayNumber,
    preview.usdot ?? (parsed.type === 'DOT' ? parsed.value : null),
    preview.mcNumber ?? (parsed.type === 'MC' ? parsed.value : null)
  );
}
/** Client-safe FMCSA preview for suggestion modal (no raw API payload). */
export type FmcsaSuggestionPreview = {
  displayNumber: string;
  usdot: string | null;
  mcNumber: string | null;
  legalName: string | null;
  dbaName: string | null;
  headquarters: string | null;
  phone: string | null;
  authorityStatus: string | null;
  safetyRating: string | null;
  allowedToOperate: string | null;
};
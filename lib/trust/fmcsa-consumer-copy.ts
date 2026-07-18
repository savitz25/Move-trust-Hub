/**
 * Consumer-facing FMCSA language — keep “FMCSA” for accuracy/SEO,
 * always pair with plain-English meaning for non-industry visitors.
 */

/** Preferred short supporting line for badges and trust UI. */
export const FMCSA_PLAIN_ENGLISH =
  'Licensed by the U.S. Department of Transportation for interstate (state-to-state) moves.';

export const FMCSA_ACRONYM_EXPANDED =
  'FMCSA is the Federal Motor Carrier Safety Administration — the U.S. agency that licenses interstate movers.';

/** One-sentence explainer for tooltips next to “FMCSA Verified / Licensed”. */
export const FMCSA_VERIFIED_TOOLTIP = `${FMCSA_PLAIN_ENGLISH} We confirm an active USDOT/MC record in public federal SAFER data.`;

export const FMCSA_CHECKED_TOOLTIP = `${FMCSA_PLAIN_ENGLISH} Every listed interstate carrier has a verifiable USDOT number we can look up on FMCSA SAFER.`;

export const FMCSA_GUIDE_HREF = '/resources/fmcsa';

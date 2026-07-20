/**
 * Public company naming: prefer FMCSA DBA (Doing Business As) over legal name.
 *
 * Customers search for the trade name (e.g. "Dumbo Moving & Storage"), not the
 * legal entity ("2001-31 REALTY LLC"). Legal name stays available for licensing.
 */

const LEGAL_SUFFIX_UPPER = new Set([
  'llc',
  'inc',
  'corp',
  'ltd',
  'lp',
  'pllc',
  'pc',
  'pa',
  'co',
  'usa',
  'us',
  'dba',
]);

/** Reject empty / placeholder FMCSA name fields. */
function stringOrNull(value: unknown): string | null {
  if (value === null || value === undefined) return null;
  const s = String(value).trim();
  if (!s) return null;
  const upper = s.toUpperCase();
  if (
    upper === '-' ||
    upper === '--' ||
    upper === 'N/A' ||
    upper === 'NA' ||
    upper === 'NONE' ||
    upper === 'NULL' ||
    upper === 'UNKNOWN' ||
    upper === 'TBD'
  ) {
    return null;
  }
  // Ignore pure punctuation / placeholder noise
  if (!/[a-z0-9]/i.test(s)) return null;
  return s;
}

/** Collapse for equality checks (ignore case, punctuation, spacing). */
export function normalizeCompanyNameKey(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, '');
}

/**
 * Light title-case for ALL-CAPS FMCSA census names.
 * Leaves mixed-case strings alone. Keeps common legal suffixes uppercase.
 */
export function formatFmcsaDisplayName(name: string): string {
  const trimmed = name.trim().replace(/\s+/g, ' ');
  if (!trimmed) return '';

  const hasLower = /[a-z]/.test(trimmed);
  if (hasLower) return trimmed;

  return trimmed
    .toLowerCase()
    .split(/(\s+|&)/)
    .map((token) => {
      if (!token || /^\s+$/.test(token) || token === '&') return token;
      const bare = token.replace(/[^a-z0-9]/gi, '');
      if (LEGAL_SUFFIX_UPPER.has(bare.toLowerCase())) {
        return token.toUpperCase();
      }
      // Preserve digit-leading tokens like 2001-31
      if (/^\d/.test(token)) {
        return token
          .split(/(-)/)
          .map((part) =>
            part === '-' || /^\d+$/.test(part)
              ? part
              : part.charAt(0).toUpperCase() + part.slice(1).toLowerCase()
          )
          .join('');
      }
      return token.charAt(0).toUpperCase() + token.slice(1);
    })
    .join('');
}

/** Strip common legal-entity suffixes for fuzzy DBA vs legal comparison. */
function stripEntitySuffixKey(value: string): string {
  // Do not strip "company" — often part of the trade name (e.g. "Faith Moving Company").
  return normalizeCompanyNameKey(value).replace(
    /(llc|inc|incorporated|corp|corporation|ltd|pllc|lp|co)$/g,
    ''
  );
}

/**
 * True when DBA is a real, distinct trade name — not a placeholder, not the
 * legal name with spaces removed, and not the same entity key.
 */
export function isDistinctUsableDba(
  dbaName: string | null | undefined,
  legalName: string | null | undefined
): boolean {
  const dba = stringOrNull(dbaName);
  if (!dba) return false;
  const legal = stringOrNull(legalName);
  if (!legal) return true;
  if (normalizeCompanyNameKey(dba) === normalizeCompanyNameKey(legal)) return false;
  if (stripEntitySuffixKey(dba) === stripEntitySuffixKey(legal)) return false;
  return true;
}

/**
 * Primary public name = DBA when present and meaningfully different from legal.
 * Otherwise legal name, then fallback.
 */
export function preferPublicCompanyName(input: {
  legalName?: string | null;
  dbaName?: string | null;
  fallback?: string | null;
}): string {
  const dba = stringOrNull(input.dbaName);
  const legal = stringOrNull(input.legalName);
  const fallback = stringOrNull(input.fallback);

  if (dba && isDistinctUsableDba(dba, legal)) {
    return formatFmcsaDisplayName(dba);
  }

  if (legal) return formatFmcsaDisplayName(legal);
  if (fallback) return formatFmcsaDisplayName(fallback);
  return '';
}

export function extractDbaFromFmcsaRaw(raw: unknown): string | null {
  const carrier = raw && typeof raw === 'object' ? (raw as Record<string, unknown>) : null;
  if (!carrier) return null;
  return (
    stringOrNull(carrier.dbaName) ??
    stringOrNull(carrier.dba_name) ??
    stringOrNull(carrier.doingBusinessAsName) ??
    null
  );
}

export function extractLegalFromFmcsaRaw(raw: unknown): string | null {
  const carrier = raw && typeof raw === 'object' ? (raw as Record<string, unknown>) : null;
  if (!carrier) return null;
  return (
    stringOrNull(carrier.legalName) ??
    stringOrNull(carrier.legal_name) ??
    stringOrNull(carrier.name) ??
    null
  );
}

function extractDbaFromPreview(preview: unknown): string | null {
  if (!preview || typeof preview !== 'object') return null;
  const p = preview as Record<string, unknown>;
  return stringOrNull(p.dbaName) ?? stringOrNull(p.dba_name);
}

function extractLegalFromPreview(preview: unknown): string | null {
  if (!preview || typeof preview !== 'object') return null;
  const p = preview as Record<string, unknown>;
  return stringOrNull(p.legalName) ?? stringOrNull(p.legal_name);
}

export type ResolvedPublicCompanyNames = {
  publicName: string;
  legalName: string | null;
  dbaName: string | null;
  /** True when FMCSA DBA is the preferred public label over legal. */
  prefersDba: boolean;
  /**
   * True when the stored directory name should be rewritten to `publicName`
   * (stored is empty or is effectively the legal entity name).
   * False when a curated trade name should be preserved.
   */
  shouldUpdateStoredName: boolean;
};

const DISPLAY_STOP_TOKENS = new Set([
  'llc',
  'inc',
  'corp',
  'ltd',
  'lp',
  'pllc',
  'co',
  'the',
  'and',
  'of',
  'a',
  'an',
  'company',
  'companies',
]);

function displayNameTokens(value: string): string[] {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\s]+/g, ' ')
    .split(/\s+/)
    .filter((t) => t && !DISPLAY_STOP_TOKENS.has(t) && t.length > 1);
}

function tokenOverlapRatio(a: string, b: string): number {
  const ta = new Set(displayNameTokens(a));
  const tb = new Set(displayNameTokens(b));
  if (!ta.size || !tb.size) return 0;
  let hit = 0;
  for (const t of ta) if (tb.has(t)) hit++;
  return hit / Math.min(ta.size, tb.size);
}

/**
 * Whether to replace a stored directory name with the FMCSA-derived public name.
 *
 * Prefer a distinct DBA when the current name is still the legal entity, or when
 * the DBA is clearly the same brand family (token overlap). Never swap unrelated
 * parent-agent brands (e.g. Allied → Mayflower).
 */
export function shouldApplyFmcsaPublicName(
  storedName: string | null | undefined,
  resolved: Pick<
    ResolvedPublicCompanyNames,
    'publicName' | 'legalName' | 'dbaName' | 'prefersDba'
  >
): boolean {
  const stored = stringOrNull(storedName);
  if (!resolved.publicName) return false;
  if (!stored) return true;

  const storedKey = normalizeCompanyNameKey(stored);
  const publicKey = normalizeCompanyNameKey(resolved.publicName);
  if (storedKey === publicKey) {
    // Same underlying name: only reformat ALL CAPS → title case.
    if (/\s/.test(stored) && !/\s/.test(resolved.publicName)) return false;
    if (/[a-z]/.test(stored)) return false;
    return stored.trim() !== resolved.publicName.trim();
  }

  if (stripEntitySuffixKey(stored) === stripEntitySuffixKey(resolved.publicName)) {
    return false;
  }

  if (
    resolved.prefersDba &&
    !/\s/.test(resolved.publicName) &&
    /\s/.test(stored) &&
    publicKey.length >= 10 &&
    (publicKey === storedKey ||
      storedKey.includes(publicKey) ||
      publicKey.includes(storedKey))
  ) {
    return false;
  }

  if (!resolved.prefersDba) {
    if (
      resolved.legalName &&
      storedKey === normalizeCompanyNameKey(resolved.legalName) &&
      !/[a-z]/.test(stored)
    ) {
      return true;
    }
    return false;
  }

  const currentIsLegal =
    Boolean(resolved.legalName) &&
    (storedKey === normalizeCompanyNameKey(resolved.legalName!) ||
      stripEntitySuffixKey(stored) === stripEntitySuffixKey(resolved.legalName!));

  if (currentIsLegal) return true;

  // Curated brand: only refine when DBA shares brand tokens (same family).
  const overlap = tokenOverlapRatio(stored, resolved.publicName);
  if (overlap < 0.5) return false;

  const curTokens = displayNameTokens(stored);
  const dbaTokens = displayNameTokens(resolved.publicName);
  if (dbaTokens.length >= curTokens.length + 3 && resolved.publicName.length > stored.length * 1.4) {
    return false;
  }

  return true;
}

/**
 * Resolve public + legal names from stored company/suggestion FMCSA fields.
 *
 * Rule: when DBA differs from legal (and from the current public name), prefer
 * DBA as the public-facing name. Legal name remains available for licensing.
 */
export function resolvePublicCompanyNameFromSources(input: {
  storedName?: string | null;
  fmcsaLegalName?: string | null;
  legalName?: string | null;
  dbaName?: string | null;
  fmcsaRaw?: unknown;
  fmcsaPreview?: unknown;
  /**
   * When true (default for new onboarding), always use DBA/legal preference and
   * ignore curated preservation. When false (display/refresh/backfill), keep
   * non-legal stored names.
   */
  forceFmcsaPreference?: boolean;
}): ResolvedPublicCompanyNames {
  const legalNameRaw =
    stringOrNull(input.legalName) ??
    stringOrNull(input.fmcsaLegalName) ??
    extractLegalFromFmcsaRaw(input.fmcsaRaw) ??
    extractLegalFromPreview(input.fmcsaPreview);

  const dbaNameRaw =
    stringOrNull(input.dbaName) ??
    extractDbaFromFmcsaRaw(input.fmcsaRaw) ??
    extractDbaFromPreview(input.fmcsaPreview);

  const stored = stringOrNull(input.storedName);

  const fmcsaPreferred = preferPublicCompanyName({
    legalName: legalNameRaw,
    dbaName: dbaNameRaw,
    fallback: stored,
  });

  const prefersDba = Boolean(
    dbaNameRaw &&
      isDistinctUsableDba(dbaNameRaw, legalNameRaw) &&
      fmcsaPreferred &&
      normalizeCompanyNameKey(fmcsaPreferred) ===
        normalizeCompanyNameKey(formatFmcsaDisplayName(dbaNameRaw))
  );

  const legalName = legalNameRaw ? formatFmcsaDisplayName(legalNameRaw) : null;
  const dbaName = dbaNameRaw ? formatFmcsaDisplayName(dbaNameRaw) : null;

  const force = input.forceFmcsaPreference === true;
  let publicName = fmcsaPreferred || stored || 'Unnamed company';
  let shouldUpdateStoredName = false;

  if (force) {
    publicName = fmcsaPreferred || stored || 'Unnamed company';
    shouldUpdateStoredName = Boolean(
      stored && normalizeCompanyNameKey(stored) !== normalizeCompanyNameKey(publicName)
    );
  } else {
    const candidate: ResolvedPublicCompanyNames = {
      publicName: fmcsaPreferred || stored || 'Unnamed company',
      legalName,
      dbaName,
      prefersDba,
      shouldUpdateStoredName: false,
    };
    if (shouldApplyFmcsaPublicName(stored, candidate)) {
      publicName = candidate.publicName;
      shouldUpdateStoredName = true;
    } else if (stored) {
      // Keep curated name; still lightly format ALL CAPS labels.
      publicName = formatFmcsaDisplayName(stored);
      shouldUpdateStoredName =
        normalizeCompanyNameKey(stored) === normalizeCompanyNameKey(publicName) &&
        stored.trim() !== publicName.trim();
    }
  }

  return {
    publicName,
    legalName,
    dbaName,
    prefersDba,
    shouldUpdateStoredName,
  };
}

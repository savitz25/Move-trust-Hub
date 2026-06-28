/** Normalize USDOT to digits-only for comparison. */
export function normalizeUsdot(value: string | undefined): string {
  if (!value) return '';
  return value.replace(/\D/g, '').replace(/^0+/, '') || '0';
}

/** Normalize MC number to digits-only (strips MC-/MX- prefix). */
export function normalizeMc(value: string | undefined): string {
  if (!value) return '';
  return value.replace(/^MC-?/i, '').replace(/^MX-?/i, '').replace(/\D/g, '');
}

export type LicenseIssue =
  | 'missing_usdot'
  | 'invalid_usdot_format'
  | 'suspicious_usdot_pattern'
  | 'known_placeholder_usdot'
  | 'invalid_mc_format'
  | 'suspicious_mc_pattern';

export type LicenseAssessment = {
  isDisplayable: boolean;
  issues: LicenseIssue[];
  normalizedUsdot: string;
  normalizedMc: string;
};

/** Known placeholder or editorial test values — never display. */
const KNOWN_PLACEHOLDER_USDOTS = new Set([
  '2345678',
  '1234567',
  '3124567',
  '7654321',
  '1111111',
  '9999999',
]);

const KNOWN_PLACEHOLDER_MCS = new Set(['812345', '123456', '654321']);

function isAscendingOrDescendingSequence(digits: string): boolean {
  if (digits.length < 5) return false;
  let ascending = true;
  let descending = true;
  for (let i = 1; i < digits.length; i++) {
    const prev = Number.parseInt(digits[i - 1]!, 10);
    const curr = Number.parseInt(digits[i]!, 10);
    if (curr !== prev + 1) ascending = false;
    if (curr !== prev - 1) descending = false;
  }
  return ascending || descending;
}

function isRepeatedDigitRun(digits: string): boolean {
  return /^(\d)\1{4,}$/.test(digits);
}

export function isSuspiciousUsdot(usdot: string | undefined): boolean {
  const normalized = normalizeUsdot(usdot);
  if (!normalized) return true;
  if (KNOWN_PLACEHOLDER_USDOTS.has(normalized)) return true;
  if (isAscendingOrDescendingSequence(normalized)) return true;
  if (isRepeatedDigitRun(normalized)) return true;
  return false;
}

export function isSuspiciousMc(mc: string | undefined): boolean {
  const normalized = normalizeMc(mc);
  if (!normalized) return false;
  if (KNOWN_PLACEHOLDER_MCS.has(normalized)) return true;
  if (isAscendingOrDescendingSequence(normalized)) return true;
  if (isRepeatedDigitRun(normalized)) return true;
  return false;
}

export function isValidUsdotFormat(usdot: string | undefined): boolean {
  const normalized = normalizeUsdot(usdot);
  return /^\d{5,8}$/.test(normalized);
}

export function isValidMcFormat(mc: string | undefined): boolean {
  const normalized = normalizeMc(mc);
  return !normalized || /^\d{3,7}$/.test(normalized);
}

export function assessLicense(
  usdot: string | undefined,
  mc?: string | undefined
): LicenseAssessment {
  const issues: LicenseIssue[] = [];
  const normalizedUsdot = normalizeUsdot(usdot);
  const normalizedMc = normalizeMc(mc);

  if (!normalizedUsdot) {
    issues.push('missing_usdot');
  } else if (!isValidUsdotFormat(usdot)) {
    issues.push('invalid_usdot_format');
  } else if (KNOWN_PLACEHOLDER_USDOTS.has(normalizedUsdot)) {
    issues.push('known_placeholder_usdot');
  } else if (isSuspiciousUsdot(usdot)) {
    issues.push('suspicious_usdot_pattern');
  }

  if (mc && !isValidMcFormat(mc)) {
    issues.push('invalid_mc_format');
  } else if (isSuspiciousMc(mc)) {
    issues.push('suspicious_mc_pattern');
  }

  const blockingIssues = issues.filter(
    (issue) =>
      issue === 'missing_usdot' ||
      issue === 'invalid_usdot_format' ||
      issue === 'known_placeholder_usdot' ||
      issue === 'suspicious_usdot_pattern'
  );

  return {
    isDisplayable: blockingIssues.length === 0,
    issues,
    normalizedUsdot,
    normalizedMc,
  };
}

export function isPlaceholderMoverId(id: string): boolean {
  return id.startsWith('regional-');
}

/** FMCSA SAFER lookup URL for a USDOT number. */
export function buildFmcsaSaferUrl(usdot: string): string {
  const normalized = normalizeUsdot(usdot);
  return `https://safer.fmcsa.dot.gov/query.asp?searchtype=ANY&query_type=queryCarrierSnapshot&query_param=USDOT&query_string=${normalized}`;
}
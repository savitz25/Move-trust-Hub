/** Digits-only USDOT without leading zeros. */
export function normalizeUsdot(value: string | number | null | undefined): string {
  if (value === null || value === undefined) return '';
  const digits = String(value).replace(/\D/g, '');
  return digits.replace(/^0+/, '') || '';
}

/** Digits-only MC/docket, stripping MC/MX/FF prefixes. */
export function normalizeMc(value: string | null | undefined): string {
  if (!value) return '';
  const digits = value.replace(/^(MC|MX|FF)-?/i, '').replace(/\D/g, '');
  return digits.replace(/^0+/, '') || '';
}

export function docketPrefix(value: string | null | undefined): 'MC' | 'MX' | 'FF' | 'OTHER' {
  const raw = (value ?? '').trim().toUpperCase();
  if (raw.startsWith('MC')) return 'MC';
  if (raw.startsWith('MX')) return 'MX';
  if (raw.startsWith('FF')) return 'FF';
  return 'OTHER';
}

export function normalizeState(value: string | null | undefined): string {
  return (value ?? '').trim().toUpperCase().slice(0, 2);
}

export function normalizePersonName(value: string | null | undefined): string {
  return (value ?? '').replace(/\s+/g, ' ').trim();
}

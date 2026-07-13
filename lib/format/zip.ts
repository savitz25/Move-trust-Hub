/** Normalize a US ZIP to 5 digits with leading zeros preserved. */
export function normalizeUsZip(input: string | null | undefined): string | null {
  if (!input) return null;
  const digits = input.replace(/\D/g, '').slice(0, 5);
  if (digits.length < 5) return null;
  return digits.padStart(5, '0');
}

/** Normalize ZIP digits from a parsed US address (pads 3–4 digit leading-zero ZIPs). */
export function normalizeAddressZip(zipDigits: string): string | null {
  const digits = zipDigits.replace(/\D/g, '');
  if (digits.length < 3 || digits.length > 5) return null;
  return digits.padStart(5, '0');
}

/** Format ZIP for display (5-digit or ZIP+4). */
export function formatUsZip(input: string | null | undefined): string | null {
  if (!input) return null;
  const digits = input.replace(/\D/g, '');
  if (digits.length < 5) return null;
  const base = digits.slice(0, 5).padStart(5, '0');
  if (digits.length >= 9) {
    return `${base}-${digits.slice(5, 9)}`;
  }
  return base;
}
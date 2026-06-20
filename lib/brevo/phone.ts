/**
 * Normalize a US phone number to E.164 for Brevo's SMS attribute.
 * Returns null when the number cannot be validated (contact still syncs without SMS).
 */
export function normalizePhoneForBrevo(
  phone: string | null | undefined
): string | null {
  if (!phone?.trim()) return null;

  const digits = phone.replace(/\D/g, '');
  if (!digits) return null;

  let normalized: string | null = null;

  if (digits.length === 10) {
    normalized = `+1${digits}`;
  } else if (digits.length === 11 && digits.startsWith('1')) {
    normalized = `+${digits}`;
  } else if (phone.trim().startsWith('+') && digits.length >= 10 && digits.length <= 15) {
    normalized = `+${digits}`;
  }

  if (!normalized || !/^\+\d{10,15}$/.test(normalized)) {
    return null;
  }

  return normalized;
}
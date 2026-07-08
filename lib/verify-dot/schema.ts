import { z } from 'zod';

export type CarrierNumberType = 'DOT' | 'MC';

export type ParsedCarrierNumber = {
  type: CarrierNumberType;
  /** Digits only */
  value: string;
  display: string;
};

const digitsOnly = (raw: string) => raw.replace(/\D/g, '');

/**
 * Parse user input as USDOT or MC docket number.
 * Accepts: "1234567", "DOT 1234567", "MC-123456", "MC 123456"
 */
export function parseCarrierNumber(input: string): ParsedCarrierNumber | null {
  const trimmed = input.trim();
  if (!trimmed) return null;

  const upper = trimmed.toUpperCase();
  const mcMatch = upper.match(/^MC[-\s]?(\d{3,8})$/);
  if (mcMatch) {
    return {
      type: 'MC',
      value: mcMatch[1],
      display: `MC-${mcMatch[1]}`,
    };
  }

  const dotMatch = upper.match(/^(?:USDOT|DOT)[-\s]?(\d{3,8})$/);
  if (dotMatch) {
    return {
      type: 'DOT',
      value: dotMatch[1],
      display: `DOT ${dotMatch[1]}`,
    };
  }

  const digits = digitsOnly(trimmed);
  if (digits.length >= 3 && digits.length <= 8) {
    return {
      type: 'DOT',
      value: digits,
      display: `DOT ${digits}`,
    };
  }

  return null;
}

export const verifyDotSchema = z.object({
  query: z.string().trim().min(3).max(30),
  sourcePage: z.string().max(120).optional().nullable(),
});

export type VerifyDotInput = z.infer<typeof verifyDotSchema>;

export const verifyNameStateSchema = z.object({
  companyName: z.string().trim().min(2).max(120),
  state: z
    .string()
    .trim()
    .transform((value) => value.toUpperCase())
    .pipe(z.string().regex(/^[A-Z]{2}$/, 'Select a valid US state.')),
  sourcePage: z.string().max(120).optional().nullable(),
});

export type VerifyNameStateInput = z.infer<typeof verifyNameStateSchema>;
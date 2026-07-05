import { z } from 'zod';

export const suggestCompanySchema = z.object({
  name: z.string().trim().min(2, 'Company name is required').max(120),
  usdot: z
    .string()
    .trim()
    .max(20)
    .optional()
    .nullable()
    .or(z.literal('').transform(() => null)),
  details: z
    .string()
    .trim()
    .max(1000)
    .optional()
    .nullable()
    .or(z.literal('').transform(() => null)),
  suggestedByName: z.string().trim().min(2, 'Your name is required').max(80),
  suggestedByEmail: z.string().trim().email('Enter a valid email').max(254),
  sourcePage: z.string().max(120).optional().nullable(),
  /** Honeypot — must be empty */
  website: z.string().max(0).optional().nullable(),
});

export type SuggestCompanyInput = z.infer<typeof suggestCompanySchema>;
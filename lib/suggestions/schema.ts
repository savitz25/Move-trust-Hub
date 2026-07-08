import { z } from 'zod';
import { enrichmentSnapshotSchema } from '@/lib/suggestions/enrichment-snapshot-schema';
import { parseCarrierNumber } from '@/lib/verify-dot/schema';

export const suggestCompanySchema = z
  .object({
    /** USDOT or MC — when valid, server uses FMCSA as source of truth */
    carrierQuery: z
      .string()
      .trim()
      .max(30)
      .optional()
      .nullable()
      .or(z.literal('').transform(() => null)),
    /** Ignored when carrierQuery resolves to a valid FMCSA record */
    name: z
      .string()
      .trim()
      .max(120)
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
    /** Optional preview snapshot from modal — avoids duplicate scrape on submit */
    enrichmentSnapshot: enrichmentSnapshotSchema,
  })
  .superRefine((data, ctx) => {
    const carrier = data.carrierQuery ? parseCarrierNumber(data.carrierQuery) : null;
    if (!carrier) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message:
          'Verify the carrier with FMCSA first — enter a valid USDOT or MC number, or use Name + State search.',
        path: ['carrierQuery'],
      });
    }
  });

export type SuggestCompanyInput = z.infer<typeof suggestCompanySchema>;
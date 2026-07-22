import { z } from 'zod';
import { coverageSnapshotSchema } from '@/lib/suggestions/coverage-snapshot-schema';
import { enrichmentSnapshotSchema } from '@/lib/suggestions/enrichment-snapshot-schema';
import { parseCarrierNumber } from '@/lib/verify-dot/schema';

const selectedCountySchema = z.object({
  stateSlug: z.string().trim().min(2).max(80),
  countySlug: z.string().trim().min(1).max(80),
  name: z.string().trim().max(120).optional(),
});

export const suggestCompanySchema = z
  .object({
    serviceScope: z.enum(['interstate', 'intrastate']).default('interstate'),
    /** USDOT or MC — required for interstate */
    carrierQuery: z
      .string()
      .trim()
      .max(30)
      .optional()
      .nullable()
      .or(z.literal('').transform(() => null)),
    /** Company display name (required for intrastate; optional when FMCSA provides legal name) */
    name: z
      .string()
      .trim()
      .max(120)
      .optional()
      .nullable()
      .or(z.literal('').transform(() => null)),
    /** State code (e.g. TX) — required for intrastate name search path */
    stateCode: z
      .string()
      .trim()
      .max(2)
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
    // Never fail the whole submission on a bad enrichment payload — drop it instead.
    enrichmentSnapshot: z
      .unknown()
      .optional()
      .nullable()
      .transform((val) => {
        if (val == null) return null;
        const r = enrichmentSnapshotSchema.safeParse(val);
        return r.success ? r.data : null;
      }),
    coverageConsent: z.boolean().optional().default(false),
    websiteUrl: z
      .string()
      .trim()
      .max(2000)
      .optional()
      .nullable()
      .or(z.literal('').transform(() => null))
      .transform((v) => {
        if (!v) return null;
        // Keep under DB/display limits after optional UTM stripping client-side
        return v.slice(0, 300);
      }),
    // Same: invalid coverage snapshots must not block save
    coverageSnapshot: z
      .unknown()
      .optional()
      .nullable()
      .transform((val) => {
        if (val == null) return null;
        const r = coverageSnapshotSchema.safeParse(val);
        return r.success ? r.data : null;
      }),
    /** Local/intrastate: user-confirmed counties */
    selectedCounties: z.array(selectedCountySchema).optional().default([]),
    headquarters: z
      .string()
      .trim()
      .max(300)
      .optional()
      .nullable()
      .or(z.literal('').transform(() => null)),
    phone: z
      .string()
      .trim()
      .max(40)
      .optional()
      .nullable()
      .or(z.literal('').transform(() => null)),
    /** Company business email (not the submitter's email) */
    contactEmail: z
      .string()
      .trim()
      .max(254)
      .optional()
      .nullable()
      .or(z.literal('').transform(() => null))
      .transform((v) => {
        if (!v) return null;
        const e = v.toLowerCase();
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e) ? e : null;
      }),
  })
  .superRefine((data, ctx) => {
    if (data.serviceScope === 'intrastate') {
      if (!data.name || data.name.length < 2) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Enter the local mover’s business name.',
          path: ['name'],
        });
      }
      if (!data.stateCode || data.stateCode.length !== 2) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Select the state where this mover operates.',
          path: ['stateCode'],
        });
      }
      if (!data.selectedCounties?.length) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Select at least one county this mover serves.',
          path: ['selectedCounties'],
        });
      }
      return;
    }

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

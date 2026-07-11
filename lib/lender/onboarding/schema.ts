import { z } from 'zod';

const enrichmentSnapshotSchema = z
  .object({
    google: z.unknown().nullable().optional(),
    publicScrape: z.unknown().nullable().optional(),
    cfpb: z.unknown().nullable().optional(),
    fetchedAt: z.string().optional(),
  })
  .nullable()
  .optional();

export const nmlsIdSchema = z
  .string()
  .trim()
  .regex(/^\d{4,10}$/, 'Enter a valid NMLS ID (4–10 digits).');

export const lenderOnboardingSchema = z
  .object({
    nmlsId: nmlsIdSchema,
    lenderType: z
      .enum(['Mortgage', 'Auto', 'Personal', 'Credit Union', 'Bank', 'Other'])
      .default('Mortgage'),
    details: z.string().trim().max(1000).nullable().optional(),
    submittedByName: z.string().trim().min(2).max(80),
    submittedByEmail: z.string().trim().email().max(254),
    sourcePage: z.string().trim().max(500).default('/lender/onboard'),
    website: z.string().max(0).optional(),
    zipCode: z
      .string()
      .trim()
      .regex(/^\d{5}(-\d{4})?$/)
      .optional()
      .nullable(),
    enrichmentSnapshot: enrichmentSnapshotSchema,
  })
  .superRefine((data, ctx) => {
    if (data.website) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Submission rejected.',
        path: ['website'],
      });
    }
  });

export type LenderOnboardingInput = z.infer<typeof lenderOnboardingSchema>;

export function slugFromNmls(nmlsId: string, legalName: string): string {
  const base = legalName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 48);
  return base ? `${base}-nmls-${nmlsId}` : `lender-nmls-${nmlsId}`;
}
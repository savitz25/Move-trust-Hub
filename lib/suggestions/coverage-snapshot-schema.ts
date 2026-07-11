import { z } from 'zod';

export const coverageSnapshotSchema = z
  .object({
    consentGiven: z.boolean(),
    websiteUrl: z.string().nullable().optional(),
    scrapedAt: z.string(),
    status: z.enum(['ok', 'skipped', 'not_found', 'error']),
    isNationalOnly: z.boolean(),
    summary: z.string().nullable().optional(),
    stateSlugs: z.array(z.string()).optional(),
    cities: z
      .array(
        z.object({
          city: z.string(),
          stateCode: z.string(),
        })
      )
      .optional(),
    counties: z
      .array(
        z.object({
          stateSlug: z.string(),
          countySlug: z.string(),
          label: z.string(),
        })
      )
      .optional(),
    officeAddresses: z.array(z.string()).optional(),
    regions: z.array(z.string()).optional(),
    pagesFetched: z.array(z.string()).optional(),
    rawSnippets: z.array(z.string()).optional(),
    error: z.string().optional(),
  })
  .passthrough()
  .optional()
  .nullable();

export type CoverageSnapshotInput = z.infer<typeof coverageSnapshotSchema>;
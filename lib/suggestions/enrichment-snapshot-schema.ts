import { z } from 'zod';

const googleSnapshotSchema = z
  .object({
    source: z.literal('google_places_api'),
    place_id: z.string().nullable().optional(),
    name: z.string().nullable().optional(),
    rating: z.number().nullable().optional(),
    review_count: z.number().nullable().optional(),
    formatted_address: z.string().nullable().optional(),
    review_snippets: z
      .array(
        z.object({
          text: z.string(),
          rating: z.number(),
          relative_time: z.string().optional(),
          author: z.string().optional(),
        })
      )
      .optional(),
    last_fetched: z.string(),
    status: z.enum(['ok', 'not_found', 'error', 'skipped']),
    error: z.string().optional(),
    raw_response: z.record(z.unknown()).optional(),
  })
  .passthrough();

const publicScrapeSnapshotSchema = z
  .object({
    confidence: z.literal('public'),
    bbb_rating: z.string().nullable().optional(),
    bbb_review_count: z.number().nullable().optional(),
    bbb_accredited: z.boolean().nullable().optional(),
    trustpilot_rating: z.number().nullable().optional(),
    trustpilot_review_count: z.number().nullable().optional(),
    yelp_rating: z.number().nullable().optional(),
    yelp_review_count: z.number().nullable().optional(),
    last_scraped_at: z.string(),
    sources: z.record(z.unknown()).optional(),
  })
  .passthrough();

export const enrichmentSnapshotSchema = z
  .object({
    google: googleSnapshotSchema.nullable().optional(),
    publicScrape: publicScrapeSnapshotSchema.nullable().optional(),
    fetchedAt: z.string().optional(),
  })
  .optional()
  .nullable();

export type EnrichmentSnapshotInput = z.infer<typeof enrichmentSnapshotSchema>;
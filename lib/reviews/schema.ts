import { z } from 'zod';
import { parseCarrierNumber } from '@/lib/verify-dot/schema';

export const reviewSubmissionSchema = z.object({
  carrierQuery: z.string().trim().min(3).max(30),
  companyName: z.string().trim().min(2).max(120).optional(),
  reviewerName: z.string().trim().min(2, 'Name is required').max(80),
  reviewerEmail: z.string().trim().email('Enter a valid email').max(254),
  rating: z.coerce.number().int().min(1).max(5),
  title: z.string().trim().max(120).optional().nullable(),
  content: z
    .string()
    .trim()
    .min(50, 'Please write at least 50 characters about your experience')
    .max(5000),
  moveDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .optional()
    .nullable()
    .or(z.literal('').transform(() => null)),
  sourcePage: z.string().max(120).optional().nullable(),
  /** Honeypot — must be empty */
  website: z.string().max(0).optional().nullable(),
});

export type ReviewSubmissionInput = z.infer<typeof reviewSubmissionSchema>;

export function parseReviewCarrierQuery(query: string) {
  return parseCarrierNumber(query);
}

export function slugFromCarrier(type: 'DOT' | 'MC', value: string): string {
  return `${type.toLowerCase()}-${value}`;
}
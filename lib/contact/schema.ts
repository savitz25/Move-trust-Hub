import { z } from 'zod';

export const contactFormSchema = z.object({
  name: z.string().trim().min(2, 'Please enter your name').max(80),
  email: z.string().trim().email('Enter a valid email address').max(254),
  subject: z.enum([
    'general',
    'data-correction',
    'privacy-request',
    'review-moderation',
    'partnership',
  ]),
  message: z.string().trim().min(20, 'Please write at least 20 characters').max(5000),
  website: z.string().max(0).optional().nullable(),
});

export type ContactFormInput = z.infer<typeof contactFormSchema>;

export const CONTACT_SUBJECT_LABELS: Record<ContactFormInput['subject'], string> = {
  general: 'General inquiry',
  'data-correction': 'Directory data correction',
  'privacy-request': 'Privacy / data deletion request',
  'review-moderation': 'Review moderation question',
  partnership: 'Press or partnership inquiry',
};
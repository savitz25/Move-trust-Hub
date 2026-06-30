'use server';

import { contactFormSchema } from '@/lib/contact/schema';
import { sendContactMessage } from '@/lib/contact/send';
import { logger } from '@/lib/logging/logger';

export type SubmitContactResult = {
  success: boolean;
  error?: string;
};

export async function submitContactForm(raw: unknown): Promise<SubmitContactResult> {
  const parsed = contactFormSchema.safeParse(raw);
  if (!parsed.success) {
    const msg =
      Object.values(parsed.error.flatten().fieldErrors).flat()[0] ??
      'Please check the form and try again.';
    return { success: false, error: msg };
  }

  if (parsed.data.website) {
    return { success: false, error: 'Submission rejected.' };
  }

  const result = await sendContactMessage(parsed.data);

  logger.info('contact.submitted', {
    subject: parsed.data.subject,
    emailSent: result.emailSent,
    success: result.success,
  });

  if (!result.success) {
    return { success: false, error: result.error };
  }

  return { success: true };
}
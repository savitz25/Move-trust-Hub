import 'server-only';

import { revalidatePath, revalidateTag } from 'next/cache';
import { logger } from '@/lib/logging/logger';

/** Next.js cache tag for the movers directory company list. */
export const COMPANIES_DIRECTORY_TAG = 'companies-directory';

/**
 * Invalidate directory + profile caches after a company is approved or updated.
 * Call from server actions only (moderation, admin refresh).
 */
export function revalidatePublishedCompany(slug: string): void {
  revalidateTag(COMPANIES_DIRECTORY_TAG);

  revalidatePath('/companies', 'page');
  revalidatePath('/companies', 'layout');
  revalidatePath(`/companies/${slug}`, 'page');
  revalidatePath(`/companies/${slug}`, 'layout');
  revalidatePath('/verify-dot', 'page');
  revalidatePath('/sitemap.xml');

  logger.info('directory.revalidated', { slug });
}
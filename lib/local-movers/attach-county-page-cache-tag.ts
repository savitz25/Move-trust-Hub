import { addCacheTag } from '@vercel/functions';
import { countyCacheTag } from '@/lib/local-movers/county-cache-tag';

/**
 * Tags the HTML object produced by this county page render.
 *
 * Vercel ISR does not read Cache-Tag or Vercel-Cache-Tag off the raw response.
 * addCacheTag() is the supported runtime API for that object. It records only
 * the exact county tag. It does not add a family tag.
 */
export async function attachCountyPageCacheTag(path: string): Promise<void> {
  const tag = countyCacheTag(path);
  if (!tag) return;
  await addCacheTag(tag);
}

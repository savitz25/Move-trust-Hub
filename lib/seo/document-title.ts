import type { Metadata } from 'next';
import { SITE_NAME } from '@/lib/seo/site-metadata';

const BRAND_SUFFIX_RE =
  /\s*[|–—-]\s*(Move\s*Trust\s*Hub|MoveTrustHub|Lender\s*Trust\s*Hub|Insurance\s*Trust\s*Hub)\s*$/i;

/** Strip trailing brand suffixes so the root title template never doubles them. */
export function stripBrandTitleSuffix(title: string): string {
  let next = title.trim();
  // Repeatedly strip in case of accidental double suffixes.
  for (let i = 0; i < 3; i++) {
    const stripped = next.replace(BRAND_SUFFIX_RE, '').trim();
    if (stripped === next) break;
    next = stripped;
  }
  return next;
}

/** Final document title: "{page} | Move Trust Hub" (single brand). */
export function formatDocumentTitle(pageTitle: string, brand: string = SITE_NAME): string {
  const base = stripBrandTitleSuffix(pageTitle);
  if (!base) return brand;
  if (base.toLowerCase() === brand.toLowerCase()) return brand;
  return `${base} | ${brand}`;
}

/** Next.js Metadata title that bypasses the layout template (avoids double brand). */
export function absoluteDocumentTitle(
  pageTitle: string,
  brand: string = SITE_NAME
): NonNullable<Metadata['title']> {
  return { absolute: formatDocumentTitle(pageTitle, brand) };
}

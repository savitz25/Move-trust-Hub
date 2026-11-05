/**
 * Deleted company slugs must not soft-200.
 * 301 when a surviving best match is known. Otherwise 410.
 * GATES-014 holds are live noindex pages, not deletions.
 */

export type DeletedCompanyDisposition =
  | { status: 301; to: string }
  | { status: 410 };

/**
 * Explicit tombstones. Add a slug only when it has been removed.
 * Unknown slugs stay on the page notFound() path (404), not a 200 shell.
 */
export const DELETED_COMPANY_SLUGS: Readonly<Record<string, DeletedCompanyDisposition>> = {};

export function dispositionForDeletedSlug(
  slug: string | null | undefined,
  table: Readonly<Record<string, DeletedCompanyDisposition>> = DELETED_COMPANY_SLUGS
): DeletedCompanyDisposition | null {
  const normalized = (slug ?? '').trim().toLowerCase();
  if (!normalized) return null;
  return table[normalized] ?? null;
}

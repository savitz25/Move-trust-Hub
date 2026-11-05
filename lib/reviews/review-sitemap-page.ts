/**
 * Paged read for /company/{slug} sitemap rows.
 * Page size and stop are local to this module.
 */

export const REVIEW_SITEMAP_PAGE_SIZE = 1000;
export const REVIEW_SITEMAP_MAX_ROWS = 20_000;

export type ReviewSitemapRow = {
  slug: string;
  updated_at: string;
};

export type ReviewSitemapPageResult = {
  data: ReviewSitemapRow[] | null;
  error: unknown;
};

export async function collectReviewSitemapPages(
  fetchPage: (from: number, to: number) => Promise<ReviewSitemapPageResult>,
): Promise<ReviewSitemapRow[]> {
  const accepted: ReviewSitemapRow[] = [];
  let from = 0;

  while (from < REVIEW_SITEMAP_MAX_ROWS) {
    const to = from + REVIEW_SITEMAP_PAGE_SIZE - 1;
    let page: ReviewSitemapPageResult;
    try {
      page = await fetchPage(from, to);
    } catch {
      return accepted;
    }
    if (page.error || !page.data) return accepted;

    for (const row of page.data) {
      if (accepted.length >= REVIEW_SITEMAP_MAX_ROWS) return accepted;
      if (typeof row.slug !== 'string' || row.slug.trim() === '') continue;
      accepted.push({ slug: row.slug, updated_at: row.updated_at });
    }

    if (page.data.length < REVIEW_SITEMAP_PAGE_SIZE) return accepted;
    from += REVIEW_SITEMAP_PAGE_SIZE;
  }

  return accepted;
}

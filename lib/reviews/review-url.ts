import { slugFromCarrier } from '@/lib/reviews/schema';

export function buildReviewPageUrl(params: {
  slug?: string;
  carrier?: string;
  sourcePage?: string;
}): string {
  const search = new URLSearchParams();
  if (params.slug?.trim()) search.set('slug', params.slug.trim());
  if (params.carrier?.trim()) search.set('carrier', params.carrier.trim());
  if (params.sourcePage?.trim()) search.set('source', params.sourcePage.trim());
  const qs = search.toString();
  return qs ? `/review?${qs}` : '/review';
}

export function reviewUrlForDirectoryCompany(params: {
  usdotNumber?: string;
  mcNumber?: string;
  slug: string;
}): string {
  const dot = params.usdotNumber?.replace(/\D/g, '');
  const mc = params.mcNumber?.replace(/\D/g, '');
  const reviewSlug = dot
    ? slugFromCarrier('DOT', dot)
    : mc
      ? slugFromCarrier('MC', mc)
      : params.slug;
  const carrier = dot ? `DOT ${dot}` : mc ? `MC-${mc}` : undefined;

  return buildReviewPageUrl({
    slug: reviewSlug,
    carrier,
    sourcePage: `/companies/${params.slug}`,
  });
}

export function reviewUrlForMovingCompany(params: {
  slug: string;
  dotNumber?: string | null;
  mcNumber?: string | null;
}): string {
  const carrier = params.dotNumber
    ? `DOT ${params.dotNumber}`
    : params.mcNumber
      ? `MC-${params.mcNumber}`
      : undefined;

  return buildReviewPageUrl({
    slug: params.slug,
    carrier,
    sourcePage: `/company/${params.slug}`,
  });
}
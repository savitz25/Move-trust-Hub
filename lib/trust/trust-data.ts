import { getHomepageAttributableReviews } from '@/lib/trust/verified-reviews';
import {
  ATTRIBUTED_REVIEWS_EXPLANATION,
  formatAttributedReviewsLabel,
  formatDirectoryAvgRating,
  getDirectoryTrustStats,
  getVerifiedDirectoryCompanies,
  methodologyHref,
} from '@/lib/trust/site-stats';

const stats = getDirectoryTrustStats();
const verifiedDirectoryCompanies = getVerifiedDirectoryCompanies();

export const trustStats = stats;

export const trustBadges = [
  {
    id: 'fmcsa',
    label: 'FMCSA Licensing Checked',
    description: 'USDOT numbers formatted and screened against placeholder patterns',
    href: '/resources/fmcsa',
    externalHref: 'https://www.fmcsa.dot.gov/',
  },
  {
    id: 'licensed',
    label: `${stats.verifiedMovers} Directory Movers`,
    description: 'Interstate carriers with verifiable USDOT records',
    href: '/companies',
  },
  {
    id: 'reviews',
    label: formatAttributedReviewsLabel(stats.attributableReviews),
    description: ATTRIBUTED_REVIEWS_EXPLANATION,
    href: methodologyHref('reviewAttribution'),
  },
  {
    id: 'rating',
    label: formatDirectoryAvgRating(stats.averageRating),
    description: 'Across FMCSA-licensed interstate listings',
    href: methodologyHref('reputationScore'),
  },
  {
    id: 'independent',
    label: 'Independent Directory',
    description: 'Not affiliated with movers — verify FMCSA yourself',
    href: '/about#disclaimer',
  },
  {
    id: 'no-lead-fees',
    label: 'No Lead Fees',
    description: 'We do not sell your information or charge movers for placement',
    href: '/about#disclaimer',
  },
] as const;

const homepageReviews = getHomepageAttributableReviews(4);

export const testimonials = homepageReviews.map((review) => ({
  quote: review.quote,
  name: review.name,
  location: review.location,
  rating: review.rating,
  source: review.source,
  date: review.date,
  companyName: review.companyName,
  companySlug: review.companySlug,
  toolsUsed: ['companies'] as const,
}));

export const reviewHighlights = verifiedDirectoryCompanies
  .filter((c) => homepageReviews.some((r) => r.companySlug === c.slug))
  .sort((a, b) => b.reputationScore - a.reputationScore)
  .slice(0, 3)
  .map((company) => {
    const sample = homepageReviews.find((r) => r.companySlug === company.slug);
    return {
      companyName: company.name,
      slug: company.slug,
      rating: company.overallRating,
      attributableOnSite: homepageReviews.filter((r) => r.companySlug === company.slug).length,
      reputationScore: company.reputationScore,
      highlight: sample
        ? `"${sample.quote.slice(0, 120)}${sample.quote.length > 120 ? '…' : ''}" — ${sample.name}, Attributed ${sample.source}`
        : `FMCSA USDOT ${company.usdotNumber} · ${company.headquarters}`,
      source: sample ? `Attributed ${sample.source} review` : 'FMCSA directory',
    };
  });

export const neutralTrustSignals = [
  {
    title: 'Verify FMCSA licensing yourself',
    body: 'Verified listings include a USDOT number you can look up on the official FMCSA SAFER site before booking.',
    href: '/resources/fmcsa',
  },
  {
    title: 'Attributed reviews only',
    body: 'We display named Google reviews where available. Pages without sourced reviews use neutral trust signals — no fabricated quotes.',
    href: methodologyHref('reviewAttribution'),
  },
  {
    title: 'Independent research directory',
    body: 'Move Trust Hub is not affiliated with listed movers. Compare licensing, complaints, and reviews before booking any carrier.',
    href: '/about#disclaimer',
  },
] as const;

export const toolLinks = {
  'moving-calculator': { label: 'Moving Calculator', href: '/moving-calculator' },
  compare: { label: 'Compare Tool', href: '/compare' },
  companies: { label: 'Mover Directory', href: '/companies' },
  fmcsa: { label: 'FMCSA Guide', href: '/resources/fmcsa' },
} as const;
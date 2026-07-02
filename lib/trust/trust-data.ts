import { seedCompanies } from '@/data/seed-companies';
import { assessLicense } from '@/lib/trust/license-verification';
import {
  countAttributableReviews,
  getHomepageAttributableReviews,
} from '@/lib/trust/verified-reviews';

const verifiedDirectoryCompanies = seedCompanies.filter(
  (c) => c.isVerified && assessLicense(c.usdotNumber, c.mcNumber).isDisplayable
);

const attributableReviewCount = countAttributableReviews();

const avgDirectoryRating =
  verifiedDirectoryCompanies.length > 0
    ? Math.round(
        (verifiedDirectoryCompanies.reduce((sum, c) => sum + c.overallRating, 0) /
          verifiedDirectoryCompanies.length) *
          10
      ) / 10
    : 0;

export const trustStats = {
  verifiedMovers: verifiedDirectoryCompanies.length,
  attributableReviews: attributableReviewCount,
  averageRating: avgDirectoryRating,
  fmcsaLicensed: verifiedDirectoryCompanies.length,
};

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
    label: `${verifiedDirectoryCompanies.length} Directory Movers`,
    description: 'Interstate carriers with verifiable USDOT records',
    href: '/companies',
  },
  {
    id: 'reviews',
    label: `${attributableReviewCount} Attributed Google Reviews`,
    description: 'Sourced reviews with named reviewers — not representative quotes',
    href: '/companies?sort=reputation',
  },
  {
    id: 'rating',
    label: `${avgDirectoryRating}★ Directory Avg`,
    description: 'Across FMCSA-licensed interstate listings',
    href: '/companies?sort=rating',
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
  .filter((c) =>
    homepageReviews.some((r) => r.companySlug === c.slug)
  )
  .sort((a, b) => b.reputationScore - a.reputationScore)
  .slice(0, 3)
  .map((company) => {
    const sample = homepageReviews.find((r) => r.companySlug === company.slug);
    return {
      companyName: company.name,
      slug: company.slug,
      rating: company.overallRating,
      reviewCount: company.reviewCount,
      reputationScore: company.reputationScore,
      highlight: sample
        ? `"${sample.quote.slice(0, 120)}${sample.quote.length > 120 ? '…' : ''}" — ${sample.name}, ${sample.source}`
        : `FMCSA USDOT ${company.usdotNumber} · ${company.headquarters}`,
      source: sample ? `${sample.source} review` : 'FMCSA directory',
    };
  });

export const neutralTrustSignals = [
  {
    title: 'Verify FMCSA licensing yourself',
    body: 'Every directory listing includes a USDOT number you can look up on the official FMCSA SAFER site before booking.',
    href: '/resources/fmcsa',
  },
  {
    title: 'Attributed reviews only',
    body: 'We display named Google reviews where available. Pages without sourced reviews use neutral trust signals — no fabricated quotes.',
    href: '/companies',
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
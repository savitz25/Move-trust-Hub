/**
 * Client-safe trust content (testimonials / highlights from seed).
 * Live badge stats live in getLiveTrustBadges / TrustBadges Server Component.
 */
import { getHomepageAttributableReviews } from '@/lib/trust/verified-reviews';
import { getVerifiedDirectoryCompaniesSeed } from '@/lib/trust/verified-directory-seed';
import { methodologyHref } from '@/lib/trust/methodology-paths';
import { FMCSA_CHECKED_TOOLTIP } from '@/lib/trust/fmcsa-consumer-copy';
import { HOW_WE_VET_HREF } from '@/lib/trust/vetting-criteria';

export type TrustBadgeItem = {
  id: string;
  label: string;
  description: string;
  href: string;
  externalHref?: string;
};

export type DirectoryTrustStats = {
  verifiedMovers: number;
  attributableReviews: number;
  averageRating: number;
  fmcsaLicensed: number;
};

/** Build trust badges from stats — never freeze counts at import time for live UI. */
export function buildTrustBadges(stats: DirectoryTrustStats): TrustBadgeItem[] {
  return [
    {
      id: 'fmcsa',
      label: 'FMCSA DOT/MC Checked',
      description: FMCSA_CHECKED_TOOLTIP,
      href: HOW_WE_VET_HREF,
      externalHref: 'https://www.fmcsa.dot.gov/',
    },
    {
      id: 'licensed',
      label: `${stats.verifiedMovers.toLocaleString()} Directory Movers`,
      description: 'Interstate carriers with verifiable USDOT records in our curated directory',
      href: '/companies',
    },
    {
      id: 'rating',
      label: `${stats.averageRating}★ Directory Avg`,
      description: 'Across FMCSA-licensed interstate listings we publish',
      href: methodologyHref('reputationScore'),
    },
    {
      id: 'vetting',
      label: 'How we vet movers',
      description: 'USDOT, active authority, insurance, and out-of-service checks explained',
      href: HOW_WE_VET_HREF,
    },
    {
      id: 'methodology',
      label: 'Transparent Scoring',
      description: 'Reputation scores and review attribution explained in full',
      href: methodologyHref('reputationScore'),
    },
  ];
}

const verifiedDirectoryCompanies = getVerifiedDirectoryCompaniesSeed();
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
    body: 'Verified listings include a USDOT number you can look up on the official FMCSA SAFER site before booking. FMCSA licenses movers for interstate (state-to-state) moves.',
    href: '/resources/fmcsa',
  },
  {
    title: 'Attributed customer reviews only',
    body: 'We publish named Google customer reviews where available — not reviews written by the movers. Pages without sourced reviews use neutral trust signals.',
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
  companies: { label: 'Find Movers', href: '/companies' },
  fmcsa: { label: 'FMCSA Guide', href: '/resources/fmcsa' },
} as const;

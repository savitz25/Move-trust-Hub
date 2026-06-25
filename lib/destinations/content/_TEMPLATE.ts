/**
 * COPY THIS FILE → lib/destinations/content/[market-slug].ts
 *
 * Activation checklist (<10 min):
 * 1. Duplicate as [slug].ts (e.g. knoxville-tn.ts)
 * 2. Replace all {placeholders} from getMarketBySlug('[slug]')
 * 3. Register in lib/destinations/content/index.ts
 * 4. Add OG image to public/images/destinations/[slug]-cost-infographic.svg
 * 5. git push → Vercel auto-deploys; hub appears in sitemap via getPublishedCityHubSlugs()
 */

import type { CityHubContent } from '@/lib/destinations/types';

export const exampleMarketContent: CityHubContent = {
  marketSlug: '{slug}',
  h1: 'Moving to {City}, {ST}: Compare Trusted Movers & Estimate Your Move',
  seo: {
    title:
      'Moving to {City}, {ST} ({Year}) — Costs, Best Movers & Free Quotes | Move Trust Hub',
    description:
      'Planning a move to {City}? Compare FMCSA-verified movers, estimate costs with our free calculator, and get matched with 2–3 licensed quotes within 24 hours. Independent directory. Transparent. No affiliation with listed companies.',
    keywords: [
      'moving to {city} {st}',
      '{city} movers',
      'cost to move to {city}',
      'best moving companies {city} {st}',
    ],
    canonicalPath: '/moving-to/{slug}',
    ogImagePath: '/images/destinations/{slug}-cost-infographic.svg',
    ogImageAlt:
      '2026 interstate moving costs to {City} {ST} by home size – Move Trust Hub',
  },
  heroSubheadline: '{2-sentence hero — inbound context + independent verification}',
  introParagraphs: ['{paragraph 1}', '{paragraph 2}', '{paragraph 3}'],
  routeLinks: [
    { label: '{Origin} → {City}', href: '/from-{origin}-to-{city-slug}', miles: '≈{miles} miles' },
  ],
  costTableRows: [
    {
      homeSize: 'Studio / 1BR',
      cubicFt: '1,000–1,500',
      costRange: '{from market.avgCostRanges.studio}',
      transitDays: '4–7',
    },
    {
      homeSize: '2BR',
      cubicFt: '3,000–4,000',
      costRange: '{from market.avgCostRanges.twoBR}',
      transitDays: '5–9',
    },
    {
      homeSize: '3BR',
      cubicFt: '5,000–7,000',
      costRange: '{from market.avgCostRanges.threeBR}',
      transitDays: '6–10',
    },
    {
      homeSize: '4BR+',
      cubicFt: '8,000+',
      costRange: '{from market.avgCostRanges.fourBR}',
      transitDays: '7–12',
    },
  ],
  costTableNote: '{peak season + data source note}',
  insightCards: [
    { title: 'Peak Moving Season', body: '{from market.peakSeasonNote}' },
    { title: 'Top Inbound States', body: '{from market.topInboundOrigins.join}' },
    { title: 'Local vs. Interstate', body: '{market-specific}' },
  ],
  bodySections: [
    {
      heading: 'Why families are moving to {City} in 2026',
      paragraphs: ['{...}'],
    },
    {
      heading: 'How to choose an interstate mover for a {City} delivery',
      paragraphs: ['{...}'],
    },
  ],
  resourceLinks: [
    {
      title: 'Verify any mover’s USDOT & MC number',
      description: 'Step-by-step FMCSA lookup.',
      href: '/resources/fmcsa',
    },
    {
      title: 'Common moving scams & how to avoid them',
      description: 'Eight red flags before booking.',
      href: '/resources/scams',
    },
  ],
  testimonials: [
    {
      quote: '{geo-tagged quote}',
      name: '{Name}',
      detail: 'Moved from {Origin} to {City}, {ST} · {Season} 2026',
    },
  ],
  faqItems: [
    {
      question: 'How accurate is the moving calculator for {City} relocations?',
      answer: '{answer}',
    },
    {
      question: 'Is Move Trust Hub affiliated with the movers listed?',
      answer:
        'No. Move Trust Hub is an independent informational directory and quote-matching service. We are not affiliated with, endorsed by, or a partner of the companies listed.',
    },
  ],
  featuredInterstateSlugs: [
    'amerisafe-van-lines',
    'jk-moving-services',
    'pensey-moving',
  ],
  bestMoversPath: '/best-movers-{slug}',
};
import { getStateSlugFromCode } from '@/lib/local-movers/index';
import type { RouteGuide } from '@/lib/resources/routes';
import type { RouteGuideExtendedContent } from '@/lib/resources/routes/types';

/** Slugs that previously used synthetic content — now hand-written in dedicated modules. */
const SYNTHETIC_ROUTE_SLUGS = new Set<string>([]);

export function isSyntheticExtendedRoute(slug: string): boolean {
  return SYNTHETIC_ROUTE_SLUGS.has(slug);
}

/** Generate full extended route content from base RouteGuide data for thin corridors. */
export function buildSyntheticExtendedRoute(route: RouteGuide): RouteGuideExtendedContent {
  const fromSlug = getStateSlugFromCode(route.fromState);
  const toSlug = getStateSlugFromCode(route.toState);
  const destinationHub =
    route.destinationHubPath ??
    (toSlug ? `/moving-to/${toSlug}` : '/moving-to');

  const keywords = [
    `moving from ${route.from.toLowerCase()} to ${route.to.toLowerCase()}`,
    `${route.from.toLowerCase()} to ${route.to.toLowerCase()} moving cost 2026`,
    `interstate move ${route.fromState} ${route.toState}`,
    `${route.fromState} to ${route.toState} movers`,
  ];

  return {
    slug: route.slug,
    seo: {
      title: `${route.title} (2026–2027) — Costs, Timeline & Mover Guide | Move Trust Hub`,
      description: route.description,
      keywords,
    },
    heroSubheadline: `${route.from} to ${route.to} — ${route.distance}, ${route.avgCostRange}. ${route.deliveryWindow}.`,
    introParagraphs: [route.description],
    whyMove: {
      heading: `Why people move from ${route.from} to ${route.to}`,
      paragraphs: [route.description],
      highlights: [],
    },
    destinations: {
      heading: `Popular ${route.from}–${route.to} destinations`,
      intro: route.description,
      cities: [
        {
          name: route.to,
          hubPath: destinationHub,
          tagline: route.peakSeason,
          paragraphs: [route.description],
        },
      ],
    },
    costBreakdown: {
      heading: `Cost breakdown: ${route.from} to ${route.to}`,
      paragraphs: [route.description],
      table: [],
      note: route.avgCostRange,
    },
    timeline: {
      heading: 'Moving timeline and seasonal considerations',
      paragraphs: [route.description],
      phases: [],
      seasons: [{ period: route.peakSeason, note: route.deliveryWindow }],
    },
    pickupTips: {
      heading: `Tips for ${route.from} pickup`,
      paragraphs: route.planningTips ?? [],
      tips: route.planningTips ?? [],
    },
    deliveryTips: {
      heading: `Tips for ${route.to} delivery`,
      paragraphs: [],
      tips: route.planningTips ?? [],
    },
    carShipping: {
      heading: `Shipping your car from ${route.from} to ${route.to}`,
      paragraphs: [],
      tips: [],
    },
    faqItems: [],
    howToSteps: [],
    internalLinks: [
      { label: 'Free moving calculator', href: '/moving-calculator' },
      { label: destinationHub, href: destinationHub },
    ],
  };
}
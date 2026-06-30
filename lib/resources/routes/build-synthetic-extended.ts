import { getStateSlugFromCode } from '@/lib/local-movers/index';
import type { RouteGuide } from '@/lib/resources/routes';
import type { RouteGuideExtendedContent } from '@/lib/resources/routes/types';

const SYNTHETIC_ROUTE_SLUGS = new Set([
  'new-york-to-florida',
  'california-to-new-york',
  'florida-to-new-york',
  'texas-to-california',
  'east-coast-to-west-coast',
  'new-york-to-myrtle-beach',
]);

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
    'FMCSA licensed long distance movers',
  ];

  return {
    slug: route.slug,
    seo: {
      title: `${route.title} (2026–2027) — Costs, Timeline & Mover Guide | Move Trust Hub`,
      description: `Plan your ${route.from} to ${route.to} move: ${route.distance}, ${route.deliveryWindow}, and ${route.avgCostRange}. Seasonal tips, cost factors, and how to compare FMCSA-licensed movers.`,
      keywords,
    },
    heroSubheadline: `${route.from} to ${route.to} is a high-volume interstate corridor in 2026. Typical shipments cover ${route.distance} with ${route.deliveryWindow} and costs around ${route.avgCostRange}. ${route.description}`,
    introParagraphs: [
      `Whether you are relocating for work, retirement, or affordability, the fundamentals are the same: build a room-by-room inventory, verify every carrier on FMCSA.gov, and compare at least three quotes on identical cubic footage before signing a bill of lading.`,
      `Move Trust Hub is an independent informational directory — not affiliated with listed movers. This guide summarizes distance, pricing, seasonal demand (${route.peakSeason}), and practical planning steps sourced from public FMCSA data and corridor research.`,
    ],
    whyMove: {
      heading: `Why people move from ${route.from} to ${route.to}`,
      paragraphs: [route.description],
      highlights: route.costFactors.slice(0, 4).map((factor) => ({
        title: factor,
        body: 'Document this on your written estimate — surprise accessorials are a leading cause of interstate move disputes.',
      })),
    },
    destinations: {
      heading: `Planning delivery in ${route.to}`,
      intro: `Most shipments on this corridor terminate in major metros. Browse our destination guides for county-level movers and localized cost context.`,
      cities: [
        {
          name: route.to,
          hubPath: destinationHub,
          tagline: `${route.toState} inbound destination hub`,
          paragraphs: [
            `Use our ${route.to} destination cluster for city guides, county mover directories, and free quote matching from FMCSA-licensed carriers.`,
          ],
          linkLabel: 'Destination guides',
        },
      ],
    },
    costBreakdown: {
      heading: `${route.from} to ${route.to} cost snapshot`,
      paragraphs: [
        `Full-service interstate pricing on this corridor typically falls in the ${route.avgCostRange} range depending on home size, packing tier, and pickup/delivery access.`,
      ],
      table: [
        {
          homeSize: 'Studio / 1 BR',
          cubicFt: '300–500 cf',
          costRange: route.avgCostRange,
          transitDays: route.deliveryWindow,
        },
        {
          homeSize: '2–3 BR',
          cubicFt: '800–1,200 cf',
          costRange: route.avgCostRange,
          transitDays: route.deliveryWindow,
        },
        {
          homeSize: '4+ BR',
          cubicFt: '1,400+ cf',
          costRange: route.avgCostRange,
          transitDays: route.deliveryWindow,
        },
      ],
      note: 'Binding estimates after an in-home or virtual inventory survey are more reliable than phone-only quotes.',
    },
    timeline: {
      heading: 'Timeline & seasonal demand',
      paragraphs: [`Peak demand: ${route.peakSeason}. ${route.driveTime} drive time for linehaul crews.`],
      phases: [
        { label: 'Book & inventory', detail: '6–10 weeks before peak season; 3–4 weeks off-peak' },
        { label: 'Load-out', detail: route.deliveryWindow },
        { label: 'Delivery', detail: 'Confirm spread dates and access rules at destination' },
      ],
      seasons: [{ period: route.peakSeason, note: 'Book earlier — pricing and crew availability tighten' }],
    },
    pickupTips: {
      heading: `Pickup tips in ${route.from}`,
      paragraphs: ['Urban and suburban access drives price more than mileage on this corridor.'],
      tips: route.planningTips.slice(0, 4),
    },
    deliveryTips: {
      heading: `Delivery tips in ${route.to}`,
      paragraphs: ['Confirm HOA, condo COI, and shuttle-truck needs before load day.'],
      tips: route.costFactors.slice(0, 4),
    },
    carShipping: {
      heading: 'Shipping your vehicle',
      paragraphs: [
        'Many households ship one or more vehicles on long corridors. Compare open vs. enclosed transport and whether your mover bundles auto shipping or you book a specialist.',
      ],
      tips: [
        'Get a separate auto transport quote with the same pickup/delivery window',
        'Verify FMCSA broker/carrier licensing for vehicle shipments',
        'Document pre-existing damage with photos before handoff',
      ],
    },
    faqItems: [
      {
        question: `How much does it cost to move from ${route.from} to ${route.to}?`,
        answer: `Most full-service moves fall in the ${route.avgCostRange} range for ${route.distance}, depending on cubic footage, packing, and accessorials. Build your inventory first for apples-to-apples quotes.`,
      },
      {
        question: `How long does a ${route.from} to ${route.to} move take?`,
        answer: `Transit is typically ${route.deliveryWindow} (${route.driveTime} drive time). Peak season (${route.peakSeason}) can widen delivery spreads.`,
      },
      ...route.planningTips.slice(0, 2).map((tip, i) => ({
        question: `Planning tip ${i + 1}: ${route.from} → ${route.to}`,
        answer: tip,
      })),
    ],
    howToSteps: [
      {
        name: 'Build your inventory',
        text: 'Use our free moving calculator to estimate cubic feet and weight before requesting quotes.',
      },
      {
        name: 'Verify FMCSA licensing',
        text: 'Look up each carrier USDOT number on FMCSA.gov and compare complaint ratios.',
      },
      {
        name: 'Compare written estimates',
        text: 'Collect at least three quotes on the same inventory and ask about binding vs. non-binding pricing.',
      },
      {
        name: 'Book and confirm access',
        text: 'Reserve parking, elevators, and HOA move windows at both origin and destination.',
      },
    ],
    internalLinks: [
      { label: `${route.to} destination guides`, href: destinationHub },
      ...(fromSlug
        ? [{ label: `${route.from} county movers`, href: `/local-movers/${fromSlug}` }]
        : []),
      ...(toSlug
        ? [{ label: `${route.to} county movers`, href: `/local-movers/${toSlug}` }]
        : []),
      { label: 'Moving calculator', href: '/moving-calculator' },
      { label: 'Compare movers', href: '/compare' },
      { label: 'All route guides', href: '/resources/routes' },
    ],
    ctaHeading: `Get free ${route.from} → ${route.to} moving quotes`,
  };
}
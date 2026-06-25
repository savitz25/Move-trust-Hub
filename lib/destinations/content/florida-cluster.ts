import type { DestinationResourceLink } from '@/lib/destinations/types';

export type FloridaClusterContent = {
  h1: string;
  seo: {
    title: string;
    description: string;
    keywords: string[];
    canonicalPath: string;
  };
  heroSubheadline: string;
  introParagraphs: string[];
  palmBeachCorridor: {
    slug: string;
    displayName: string;
    zip: string;
    tagline: string;
  }[];
  bodySections: { heading: string; paragraphs: string[] }[];
  resourceLinks: DestinationResourceLink[];
};

export const floridaClusterContent: FloridaClusterContent = {
  h1: 'Moving to Florida: City Guides, Palm Beach Corridor Hubs & Trusted Movers',
  seo: {
    title:
      'Moving to Florida (2026) — Destination Guides, Costs & Free Quotes | Move Trust Hub',
    description:
      'Explore Florida inbound moving guides including Boca Raton, Delray Beach, Boynton Beach, Deerfield Beach, Jacksonville, Sarasota, and more. FMCSA-verified movers, free calculator, and transparent cost data. Independent directory.',
    keywords: [
      'moving to florida',
      'florida movers',
      'best cities to move to in florida 2026',
      'palm beach county movers',
      'south florida relocation guide',
      'florida interstate moving costs',
    ],
    canonicalPath: '/moving-to/florida',
  },
  heroSubheadline:
    'Florida remains the highest-volume Sunbelt inbound corridor in 2026 — drawing retirees, remote workers, and families from the Northeast, Midwest, and California. Our independent directory covers FMCSA-licensed interstate movers, county-level local directories, and city-specific guides with cost tables and free quote matching.',
  introParagraphs: [
    'Whether you are targeting the Palm Beach County coastal corridor, northeast Florida around Jacksonville, or Gulf Coast markets like Sarasota and Naples, the relocation fundamentals are identical: document your inventory with our free calculator, verify every carrier on FMCSA.gov, and compare multiple quotes on equal cubic footage before signing.',
    'Move Trust Hub is an independent informational directory — we are not affiliated with, endorsed by, or a partner of the moving companies listed. Florida moves involve unique logistics: snowbird-season scheduling, hurricane contingency planning, condo COI requirements, and gated-community shuttle trucks. Our city guides surface these factors so you can plan with confidence.',
    'Start with our live Palm Beach County corridor guides below — four high-demand sub-city hubs spanning Boca Raton through Deerfield Beach — or browse additional Florida markets launching soon across the state.',
  ],
  palmBeachCorridor: [
    {
      slug: 'boca-raton',
      displayName: 'Boca Raton',
      zip: '33432',
      tagline: 'Affluent luxury corridor · Mizner Park · gated estates & high-rises',
    },
    {
      slug: 'delray-beach',
      displayName: 'Delray Beach',
      zip: '33444',
      tagline: 'Atlantic Avenue arts district · walkable downtown · beach condos',
    },
    {
      slug: 'boynton-beach',
      displayName: 'Boynton Beach',
      zip: '33435',
      tagline: 'Value-oriented Palm Beach living · families · Oceanfront Park',
    },
    {
      slug: 'deerfield-beach',
      displayName: 'Deerfield Beach',
      zip: '33441',
      tagline: 'Palm Beach–Broward border · boating · Quiet Waters · family suburbs',
    },
  ],
  bodySections: [
    {
      heading: 'Why the Palm Beach County corridor leads South Florida inbound volume',
      paragraphs: [
        'The Boca Raton–Delray Beach–Boynton Beach–Deerfield Beach corridor captures a wide spectrum of South Florida relocation intent: luxury downsizers in Boca, arts-and-culture households in Delray, value-seeking families in Boynton Beach, and boating-oriented residents in Deerfield Beach. All four cities share Palm Beach County infrastructure — top-rated healthcare, Palm Beach International Airport, and I-95 / Turnpike access — while offering distinct price points and lifestyle profiles.',
        'Interstate moves into this corridor typically originate from New York, New Jersey, Massachusetts, Pennsylvania, Ohio, and Illinois. Snowbird season (October–April) tightens southbound carrier schedules and adds 10–20% to linehaul rates. Hurricane season (June–November) requires flexible delivery clauses in your bill of lading regardless of which city you choose.',
        'Our four live city hubs include 2026 cost tables, calculator prefill by ZIP, Palm Beach and Broward county mover directories, and route links to our New York–Florida interstate guide. Each hub follows the same independent, transparent structure as our Myrtle Beach launch.',
      ],
    },
    {
      heading: 'More Florida destination guides launching soon',
      paragraphs: [
        'Beyond the Palm Beach corridor, our Florida cluster will expand to Jacksonville, Sarasota, Naples, Ocala, St. Augustine, and Wildwood — each with county-level mover coverage, cost tables, and calculator embeds. Register for quotes through any live hub and your request is attributed to the destination market for accurate carrier matching.',
        'For statewide research, browse our Florida local movers map with 67 county directories, or use the national compare tool to evaluate FMCSA-licensed interstate carriers before requesting matched quotes to your Florida destination.',
      ],
    },
  ],
  resourceLinks: [
    {
      title: 'Browse Palm Beach County local movers',
      description: '10+ vetted companies with ratings, services, and luxury-move experience.',
      href: '/local-movers/florida/palm-beach',
    },
    {
      title: 'Browse Broward County local movers',
      description: 'Pompano Beach, Fort Lauderdale, and Deerfield Beach–adjacent carriers.',
      href: '/local-movers/florida/broward',
    },
    {
      title: 'New York to Florida route guide',
      description: 'Mileage, timing, and cost factors for Northeast-to-Florida interstate moves.',
      href: '/resources/routes/new-york-to-florida',
    },
    {
      title: 'Verify any mover\'s USDOT & MC number',
      description: 'Step-by-step FMCSA lookup before booking.',
      href: '/resources/fmcsa',
    },
    {
      title: 'All popular destinations',
      description: 'Myrtle Beach, Florida, Texas, the Carolinas, and more.',
      href: '/moving-to',
    },
  ],
};
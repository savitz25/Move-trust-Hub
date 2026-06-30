import type { DestinationResourceLink } from '@/lib/destinations/types';

export type WashingtonCorridorCity = {
  slug: string;
  displayName: string;
  zip: string;
  tagline: string;
};

export type WashingtonClusterContent = {
  h1: string;
  seo: {
    title: string;
    description: string;
    keywords: string[];
    canonicalPath: string;
  };
  heroSubheadline: string;
  introParagraphs: string[];
  pugetSoundCorridor: WashingtonCorridorCity[];
  bodySections: { heading: string; paragraphs: string[] }[];
  resourceLinks: DestinationResourceLink[];
};

export const washingtonClusterContent: WashingtonClusterContent = {
  h1: 'Moving to Washington: Seattle, Puget Sound & Pacific Northwest City Guides & Trusted Movers',
  seo: {
    title:
      'Moving to Washington (2026) — Destination Guides, Costs & Free Quotes | Move Trust Hub',
    description:
      'Explore Washington inbound moving guides for Seattle and King County. Puget Sound tech hiring, no state income tax, FMCSA-verified movers, free calculator. Independent directory.',
    keywords: [
      'moving to washington state',
      'washington movers',
      'seattle relocation guide',
      'moving to puget sound',
      'california to washington moving',
      'washington interstate moving costs 2026',
      'king county movers',
      'pacific northwest relocation',
    ],
    canonicalPath: '/moving-to/washington',
  },
  heroSubheadline:
    'Washington ranks among the top Pacific Northwest inbound destinations in 2026 — drawing California, Texas, Illinois, and Colorado households with Amazon and Microsoft corridor hiring, no state income tax on wages, Puget Sound outdoor access, and urban Seattle neighborhoods from Capitol Hill to Ballard. Our independent directory covers FMCSA-licensed interstate movers, county-level local directories, and city-specific guides with cost tables and free quote matching.',
  introParagraphs: [
    'Whether you are targeting Seattle\'s South Lake Union tech corridor, Capitol Hill walkability, Ballard craftsman neighborhoods, or Queen Anne hillside views with Puget Sound access, the relocation fundamentals are identical: document your inventory with our free calculator, verify every carrier on FMCSA.gov, and compare multiple quotes on equal cubic footage before signing.',
    'Move Trust Hub is an independent informational directory — we are not affiliated with, endorsed by, or a partner of the moving companies listed. Washington moves involve Pacific Northwest logistics that generic guides overlook: steep hillside shuttle staging, condo COI filings, I-5 corridor peak congestion, ferry-adjacent routing, and Snoqualmie Pass winter contingency — factors our city guides surface so you can plan with confidence.',
    'Live Washington city guides currently span the Puget Sound flagship metro (Seattle). Browse the Seattle guide below for 2026–2027 cost tables, calculator prefill by ZIP, and King County mover directories.',
  ],
  pugetSoundCorridor: [
    {
      slug: 'seattle-wa',
      displayName: 'Seattle',
      zip: '98101',
      tagline: 'Tech & aerospace hub · Puget Sound · no state income tax · urban neighborhoods',
    },
  ],
  bodySections: [
    {
      heading: 'Why families and professionals are moving to Washington in 2026',
      paragraphs: [
        'Washington\'s inbound migration story is anchored by the Puget Sound economy — a tech-and-aerospace corridor where Amazon, Microsoft, Boeing, and a dense startup ecosystem draw California, Texas, and Midwest households seeking West Coast salaries without California state income tax. Seattle\'s urban neighborhoods offer restaurant density, waterfront trails, and Sound Transit expansion while King County suburbs and the Eastside provide corporate-campus proximity in Bellevue and Redmond.',
        'California origin moves remain the dominant corridor: Bay Area and Southern California households cite tax savings, remote-work flexibility, and outdoor lifestyle access as primary drivers. Texas tech transferees, Illinois corporate relocations, and Colorado outdoor enthusiasts round out the inbound mix. Compared to Portland\'s Willamette Valley or Phoenix\'s Sunbelt warmth, Washington skews toward tech hiring density, gray-winter lifestyle trade-offs, and hillside urban logistics.',
        'No two Puget Sound addresses move alike. Capitol Hill walk-ups need stair-carry disclosure. Queen Anne hillsides require shuttle staging. South Lake Union towers need COI and elevator reservations. Document your exact address type when requesting quotes rather than relying on city-level averages.',
      ],
    },
    {
      heading: 'How to choose an interstate mover for a Washington delivery',
      paragraphs: [
        'Start with FMCSA verification. Every interstate carrier must have a USDOT number and, when operating as a for-hire carrier, an MC number. Look up both on FMCSA.gov and confirm acceptable safety ratings and low complaint ratios.',
        'Demand inventory-based quotes. Lowball estimates based on phone guesses are the leading cause of moving-day price disputes on I-5 and I-90 corridors into the Puget Sound. Use our room-by-room calculator to document cubic feet and estimated weight, then send the same inventory to every carrier you compare.',
        'Ask about Washington-specific accessorials. Hillside shuttle trucks, condo COI filings, and winter pass-routing contingency belong in writing before you book. Read our scam avoidance guide before paying more than a modest booking deposit.',
      ],
    },
  ],
  resourceLinks: [
    {
      title: 'California → Washington route guide',
      description: 'Premier West Coast corridor — costs, timing, and booking strategy.',
      href: '/resources/routes/california-to-washington',
    },
    {
      title: 'Browse King County local movers',
      description: 'Seattle and King County vetted companies with FMCSA licensing and ratings.',
      href: '/local-movers/washington/king',
    },
    {
      title: 'Moving to Oregon hub',
      description: 'Compare Puget Sound with Portland metro and Willamette Valley guides.',
      href: '/moving-to/oregon',
    },
    {
      title: 'Verify any mover\'s USDOT & MC number',
      description: 'Step-by-step FMCSA lookup and complaint-ratio interpretation.',
      href: '/resources/fmcsa',
    },
    {
      title: 'Common moving scams & how to avoid them',
      description: 'Eight red flags and deposit best practices before booking.',
      href: '/resources/scams',
    },
    {
      title: 'Compare movers side-by-side',
      description: 'Select up to 4 carriers and compare reputation and services.',
      href: '/compare',
    },
  ],
};
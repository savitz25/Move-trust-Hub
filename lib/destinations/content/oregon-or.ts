import type { DestinationResourceLink } from '@/lib/destinations/types';

export type OregonCorridorCity = {
  slug: string;
  displayName: string;
  zip: string;
  tagline: string;
};

export type OregonClusterContent = {
  h1: string;
  seo: {
    title: string;
    description: string;
    keywords: string[];
    canonicalPath: string;
  };
  heroSubheadline: string;
  introParagraphs: string[];
  portlandMetroCorridor: OregonCorridorCity[];
  willametteValleyCorridor: OregonCorridorCity[];
  centralOregonCorridor: OregonCorridorCity[];
  bodySections: { heading: string; paragraphs: string[] }[];
  resourceLinks: DestinationResourceLink[];
};

export const oregonClusterContent: OregonClusterContent = {
  h1: 'Moving to Oregon: Portland, Willamette Valley & Central Oregon City Guides & Trusted Movers',
  seo: {
    title:
      'Moving to Oregon (2026) — Destination Guides, Costs & Trusted Movers | Move Trust Hub',
    description:
      'Explore Oregon inbound moving guides for Portland, Bend, Hillsboro, Beaverton, Eugene, Corvallis, and Salem. Tech growth, outdoor lifestyle, FMCSA-verified movers, free calculator. Independent directory.',
    keywords: [
      'moving to oregon',
      'oregon movers',
      'portland bend eugene movers',
      'best cities to move to in oregon 2026',
      'silicon forest hillsboro beaverton',
      'oregon interstate moving costs',
      'california to oregon moving',
      'pacific northwest relocation',
    ],
    canonicalPath: '/moving-to/oregon',
  },
  heroSubheadline:
    'Oregon ranks among the top Pacific Northwest inbound destinations in 2026 — drawing California, Washington, and Colorado households with outdoor lifestyle access, Silicon Forest tech employment, progressive culture, and diverse climates from the coast through the Willamette Valley to Bend\'s high desert. Our independent directory covers FMCSA-licensed interstate movers, county-level local directories, and city-specific guides with cost tables and free quote matching.',
  introParagraphs: [
    'Whether you are targeting Portland\'s creative urban neighborhoods, Hillsboro and Beaverton\'s Silicon Forest suburbs, Bend\'s outdoor capital lifestyle, Eugene and Corvallis university corridors, or affordable Salem state-capital living, the relocation fundamentals are identical: document your inventory with our free calculator, verify every carrier on FMCSA.gov, and compare movers directly on equal cubic footage before signing.',
    'Move Trust Hub is an independent informational directory — we are not affiliated with, endorsed by, or a partner of the moving companies listed. Oregon moves involve Pacific Northwest logistics that generic guides overlook: rainy-season loading windows, narrow Portland street access and elevator protocols, Cascade Pass winter delays for Central Oregon deliveries, and HOA move-day scheduling in fast-growing Washington County suburbs — factors our city guides surface so you can plan with confidence.',
    'Six live Oregon hubs span the Portland metro (Portland, Hillsboro & Beaverton), the Willamette Valley (Eugene, Corvallis, Salem), and Central Oregon (Bend). Browse each city guide below for 2026–2027 cost tables, calculator prefill by ZIP, and county-level mover directories.',
  ],
  portlandMetroCorridor: [
    {
      slug: 'portland-or',
      displayName: 'Portland',
      zip: '97201',
      tagline: 'Creative hub · walkable neighborhoods · food & coffee culture',
    },
    {
      slug: 'hillsboro-beaverton-or',
      displayName: 'Hillsboro & Beaverton',
      zip: '97123',
      tagline: 'Silicon Forest · Intel & Nike corridor · MAX light-rail · top schools',
    },
  ],
  willametteValleyCorridor: [
    {
      slug: 'eugene-or',
      displayName: 'Eugene',
      zip: '97401',
      tagline: 'University of Oregon · progressive · bike-friendly · valley value',
    },
    {
      slug: 'corvallis-or',
      displayName: 'Corvallis',
      zip: '97330',
      tagline: 'Oregon State University · innovative · safe · agribusiness & research',
    },
    {
      slug: 'salem-or',
      displayName: 'Salem',
      zip: '97301',
      tagline: 'State capital · affordable · government jobs · central Willamette location',
    },
  ],
  centralOregonCorridor: [
    {
      slug: 'bend-or',
      displayName: 'Bend',
      zip: '97701',
      tagline: 'Outdoor capital · Mt. Bachelor · Deschutes River · remote workers',
    },
  ],
  bodySections: [
    {
      heading: 'Why families and professionals are moving to Oregon in 2026',
      paragraphs: [
        'Oregon consistently ranks among the highest net-inbound Pacific Northwest states, driven by California outmigration seeking quality of life, outdoor access, and tech employment without Bay Area housing premiums. Portland anchors creative and food-centric urban demand; Washington County\'s Silicon Forest draws Intel, Nike, and semiconductor supply-chain relocations; Bend attracts remote workers and outdoor enthusiasts willing to pay a premium for high-desert sunshine; and the Willamette Valley offers university-town stability at lower costs than Portland or Bend.',
        'Compared to Seattle or the Bay Area, Oregon offers relative value in Eugene, Corvallis, and Salem — while Portland and Bend command higher price points reflecting job-market strength and lifestyle demand. Interstate lanes from California, Washington, and Colorado are well-traveled; book early for summer peak season and build rainy-season contingency language into your bill of lading for Willamette Valley deliveries.',
        'No two Oregon corridors move alike. Portland high-rises need elevator reservations; Hillsboro new-build streets may require shuttle trucks; Bend foothill driveways can limit trailer access; Eugene and Corvallis bike-lane neighborhoods favor morning delivery windows. Compare quotes on identical inventory rather than choosing the lowest phone estimate.',
      ],
    },
    {
      heading: 'How to choose an interstate mover for an Oregon delivery',
      paragraphs: [
        'Start with FMCSA verification. Every interstate carrier must have a USDOT number and, if operating as a for-hire carrier, an MC number. Look up both on FMCSA.gov and confirm acceptable safety ratings and low complaint ratios. Move Trust Hub surfaces this data alongside Google, BBB, and Trustpilot reviews so you can research before anyone calls you.',
        'Demand inventory-based quotes. Lowball estimates based on phone guesses are the leading cause of moving-day price disputes on western routes. Use our room-by-room calculator to document cubic feet and estimated weight, then send the same inventory to every carrier you compare.',
        'Ask about Oregon-specific accessorials. Portland condo COI requirements, Washington County HOA scheduling, rainy-season covered loading in the Willamette Valley, and Central Oregon mountain-pass winter delays are legitimate cost drivers — they should appear in writing before booking.',
        'Read our scam avoidance guide before paying more than a modest booking deposit. Reputable interstate carriers do not demand large upfront cash payments via wire transfer or cryptocurrency.',
      ],
    },
    {
      heading: 'Regional Oregon moving corridors at a glance',
      paragraphs: [
        'Portland metro (Multnomah, Washington, and Clackamas counties) handles the highest urban inbound volume. Portland proper draws creative professionals and food-centric lifestyle buyers; Hillsboro and Beaverton serve Silicon Forest tech families with MAX light-rail commute access and top-rated Washington County schools.',
        'Willamette Valley (Lane, Benton, Marion, and Polk counties) offers university and government employment anchors. Eugene\'s University of Oregon corridor attracts progressive, bike-friendly households; Corvallis combines Oregon State research culture with a tight-knit safe community; Salem provides affordable state-capital living within an hour of Portland, Eugene, and the coast.',
        'Central Oregon (Deschutes County) centers on Bend — the outdoor capital with Mt. Bachelor skiing, Deschutes River recreation, craft beer culture, and a strong remote-worker base. Expect higher cost of living than the Willamette Valley, offset by 300+ days of sunshine and immediate trail access.',
      ],
    },
  ],
  resourceLinks: [
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
      title: 'Browse Multnomah County local movers',
      description: 'Portland vetted movers with FMCSA data.',
      href: '/local-movers/oregon/multnomah',
    },
    {
      title: 'Browse Washington County local movers',
      description: 'Hillsboro and Beaverton Silicon Forest mover directory.',
      href: '/local-movers/oregon/washington',
    },
    {
      title: 'Browse Deschutes County local movers',
      description: 'Bend Central Oregon mover directory.',
      href: '/local-movers/oregon/deschutes',
    },
    {
      title: 'Browse Lane County local movers',
      description: 'Eugene Willamette Valley mover directory.',
      href: '/local-movers/oregon/lane',
    },
    {
      title: 'Room-by-room packing checklist',
      description: 'Prepare your inventory before requesting fair quotes.',
      href: '/resources/packing-checklist',
    },
    {
      title: 'Compare movers side-by-side',
      description: 'Select up to 4 carriers and compare reputation and services.',
      href: '/compare',
    },
  ],
};
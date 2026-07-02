import type { DestinationResourceLink } from '@/lib/destinations/types';

export type OklahomaCorridorCity = {
  slug: string;
  displayName: string;
  zip: string;
  tagline: string;
};

export type OklahomaClusterContent = {
  h1: string;
  seo: {
    title: string;
    description: string;
    keywords: string[];
    canonicalPath: string;
  };
  heroSubheadline: string;
  introParagraphs: string[];
  okcMetroCorridor: OklahomaCorridorCity[];
  tulsaMetroCorridor: OklahomaCorridorCity[];
  collegeCorridor: OklahomaCorridorCity[];
  bodySections: { heading: string; paragraphs: string[] }[];
  resourceLinks: DestinationResourceLink[];
};

export const oklahomaClusterContent: OklahomaClusterContent = {
  h1: 'Moving to Oklahoma: OKC, Tulsa Metro & College Town City Guides & Trusted Movers',
  seo: {
    title:
      'Moving to Oklahoma (2026) — Destination Guides, Costs & Trusted Movers | Move Trust Hub',
    description:
      'Explore Oklahoma inbound moving guides for Oklahoma City, Tulsa, Edmond, Norman, Broken Arrow, Jenks, and Stillwater. Affordable living, energy & aerospace jobs, FMCSA-verified movers, free calculator. Independent directory.',
    keywords: [
      'moving to oklahoma',
      'oklahoma movers',
      'oklahoma city tulsa movers',
      'best cities to move to in oklahoma 2026',
      'affordable midwest relocation',
      'oklahoma interstate moving costs',
      'texas to oklahoma moving',
      'south central relocation',
    ],
    canonicalPath: '/moving-to/oklahoma',
  },
  heroSubheadline:
    'Oklahoma ranks among the most affordable high-growth inbound destinations in the South Central and Midwest corridors for 2026 — drawing Texas, California, Colorado, and Missouri households with low cost of living, energy and aerospace employment, MAPS-funded urban revitalization in OKC, Tulsa\'s arts-and-culture renaissance, and top-ranked suburban school districts. Our independent directory covers FMCSA-licensed interstate movers, county-level local directories, and city-specific guides with cost tables and free quote matching.',
  introParagraphs: [
    'Whether you are targeting Oklahoma City\'s booming metro with Bricktown and Scissortail Park, Tulsa\'s Gathering Place and Art Deco skyline, Edmond\'s top-ranked schools, Norman\'s University of Oklahoma campus energy, Broken Arrow\'s Rose District affordability, Jenks\' upscale Riverwalk lifestyle, or Stillwater\'s practical OSU college-town stability, the relocation fundamentals are identical: document your inventory with our free calculator, verify every carrier on FMCSA.gov, and compare movers directly on equal cubic footage before signing.',
    'Move Trust Hub is an independent informational directory — we are not affiliated with, endorsed by, or a partner of the moving companies listed. Oklahoma moves involve South Central logistics that generic guides overlook: tornado-season contingency planning, summer heat loading windows, new-build subdivision shuttle requirements in fast-growing suburbs, and I-35 / I-44 corridor scheduling between OKC and Tulsa — factors our city guides surface so you can plan with confidence.',
    'Seven live Oklahoma hubs span the OKC metro (Oklahoma City, Edmond, Norman), the Tulsa metro (Tulsa, Broken Arrow, Jenks), and the Stillwater college corridor. Browse each city guide below for 2026–2027 cost tables, calculator prefill by ZIP, and county-level mover directories.',
  ],
  okcMetroCorridor: [
    {
      slug: 'oklahoma-city-ok',
      displayName: 'Oklahoma City',
      zip: '73102',
      tagline: 'MAPS revitalization · aerospace & energy · Bricktown & Scissortail Park',
    },
    {
      slug: 'edmond-ok',
      displayName: 'Edmond',
      zip: '73034',
      tagline: 'Top-ranked suburb · safest neighborhoods · excellent public schools',
    },
    {
      slug: 'norman-ok',
      displayName: 'Norman',
      zip: '73069',
      tagline: 'University of Oklahoma · Campus Corner · Lake Thunderbird recreation',
    },
  ],
  tulsaMetroCorridor: [
    {
      slug: 'tulsa-ok',
      displayName: 'Tulsa',
      zip: '74103',
      tagline: 'Art Deco culture · Gathering Place · arts & music · remote-work haven',
    },
    {
      slug: 'broken-arrow-ok',
      displayName: 'Broken Arrow',
      zip: '74012',
      tagline: 'Rose District · safe suburbs · manufacturing jobs · family affordability',
    },
    {
      slug: 'jenks-ok',
      displayName: 'Jenks',
      zip: '74037',
      tagline: 'Oklahoma Aquarium · Riverwalk dining · top schools · waterfront suburb',
    },
  ],
  collegeCorridor: [
    {
      slug: 'stillwater-ok',
      displayName: 'Stillwater',
      zip: '74074',
      tagline: 'Oklahoma State University · Red Dirt music · affordable · laid-back',
    },
  ],
  bodySections: [
    {
      heading: 'Why families and professionals are moving to Oklahoma in 2026',
      paragraphs: [
        'Oklahoma consistently attracts net inbound migration from higher-cost states seeking affordability without sacrificing job-market depth. Oklahoma City benefits from MAPS-funded downtown and Midtown investment, a diversified economy spanning aerospace, energy, technology, and healthcare, and a cowboy-culture-meets-urban-vibe identity that resonates with remote workers and young professionals. Tulsa counters with Art Deco architecture, Cain\'s Ballroom music heritage, Gathering Place — one of the nation\'s largest riverfront parks — and a green, tree-lined landscape that surprises coastal transplants.',
        'Suburban corridors amplify Oklahoma\'s value proposition. Edmond ranks among the state\'s safest communities with top public schools and a walkable downtown arts scene. Norman delivers youthful university-town energy anchored by the University of Oklahoma. Broken Arrow and Jenks offer Tulsa-metro access at suburban price points, while Stillwater provides OSU stability and Red Dirt music culture at some of the lowest housing costs in the state. Compared to Dallas, Denver, or Phoenix, Oklahoma metros offer meaningfully lower interstate moving costs and ongoing living expenses.',
        'No two Oklahoma corridors move alike. OKC high-rises and Bricktown lofts need elevator reservations; Edmond and Jenks HOAs may require move-day scheduling; tornado season (April–June) warrants flexible delivery language in your bill of lading; and summer heat can limit loading hours. Compare quotes on identical inventory rather than choosing the lowest phone estimate.',
      ],
    },
    {
      heading: 'How to choose an interstate mover for an Oklahoma delivery',
      paragraphs: [
        'Start with FMCSA verification. Every interstate carrier must have a USDOT number and, if operating as a for-hire carrier, an MC number. Look up both on FMCSA.gov and confirm acceptable safety ratings and low complaint ratios. Move Trust Hub surfaces this data alongside Google, BBB, and Trustpilot reviews so you can research before anyone calls you.',
        'Demand inventory-based quotes. Lowball estimates based on phone guesses are the leading cause of moving-day price disputes on I-35 and I-44 corridors. Use our room-by-room calculator to document cubic feet and estimated weight, then send the same inventory to every carrier you compare.',
        'Ask about Oklahoma-specific accessorials. New construction streets in Edmond, Broken Arrow, and Jenks may require shuttle trucks. Downtown OKC and Tulsa condos need elevator COI paperwork. Tornado-season contingency clauses and summer heat scheduling are legitimate cost drivers — they should appear in writing before booking.',
        'Read our scam avoidance guide before paying more than a modest booking deposit. Reputable interstate carriers do not demand large upfront cash payments via wire transfer or cryptocurrency.',
      ],
    },
    {
      heading: 'Regional Oklahoma moving corridors at a glance',
      paragraphs: [
        'OKC metro (Oklahoma, Canadian, and Cleveland counties) handles the highest statewide inbound volume. Oklahoma City proper draws aerospace, energy, and healthcare professionals to MAPS revitalized districts; Edmond serves families prioritizing safety and schools north of the capital; Norman combines OU campus culture with Lake Thunderbird recreation minutes from I-35.',
        'Tulsa metro (Tulsa, Wagoner, and Creek counties) offers cultural depth and remote-work appeal. Tulsa\'s Gathering Place and Deco District attract lifestyle buyers; Broken Arrow\'s Rose District and manufacturing base serve value-focused families; Jenks delivers upscale waterfront living with Oklahoma Aquarium access and top-rated schools along the Arkansas River.',
        'Stillwater (Payne County) anchors the northern college corridor with Oklahoma State University employment, affordable housing, and a laid-back Red Dirt music scene — popular with faculty, staff, and families who want university-town stability without OKC or Tulsa price premiums.',
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
      title: 'Browse Oklahoma County local movers',
      description: 'Oklahoma City metro vetted movers with FMCSA data.',
      href: '/local-movers/oklahoma/oklahoma',
    },
    {
      title: 'Browse Tulsa County local movers',
      description: 'Tulsa metro mover directory.',
      href: '/local-movers/oklahoma/tulsa',
    },
    {
      title: 'Browse Cleveland County local movers',
      description: 'Norman and south OKC metro mover directory.',
      href: '/local-movers/oklahoma/cleveland',
    },
    {
      title: 'Browse Payne County local movers',
      description: 'Stillwater and OSU corridor mover directory.',
      href: '/local-movers/oklahoma/payne',
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
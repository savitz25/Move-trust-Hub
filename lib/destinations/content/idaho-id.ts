import type { DestinationResourceLink } from '@/lib/destinations/types';

export type IdahoCorridorCity = {
  slug: string;
  displayName: string;
  zip: string;
  tagline: string;
};

export type IdahoClusterContent = {
  h1: string;
  seo: {
    title: string;
    description: string;
    keywords: string[];
    canonicalPath: string;
  };
  heroSubheadline: string;
  introParagraphs: string[];
  treasureValleyCorridor: IdahoCorridorCity[];
  panhandleCorridor: IdahoCorridorCity[];
  easternSouthernCorridor: IdahoCorridorCity[];
  bodySections: { heading: string; paragraphs: string[] }[];
  resourceLinks: DestinationResourceLink[];
};

export const idahoClusterContent: IdahoClusterContent = {
  h1: 'Moving to Idaho: Treasure Valley, Panhandle & Statewide City Guides & Trusted Movers',
  seo: {
    title:
      'Moving to Idaho (2026) — Destination Guides, Costs & Trusted Movers | Move Trust Hub',
    description:
      'Explore Idaho inbound moving guides for Boise, Meridian, Eagle, Nampa, Coeur d\'Alene, Sandpoint, Idaho Falls, and Twin Falls. No retirement income tax, FMCSA-verified movers, free calculator. Independent directory.',
    keywords: [
      'moving to idaho',
      'idaho movers',
      'boise treasure valley movers',
      'best cities to move to in idaho 2026',
      'idaho retirement relocation',
      'coeur d alene sandpoint movers',
      'idaho interstate moving costs',
      'california to idaho moving',
    ],
    canonicalPath: '/moving-to/idaho',
  },
  heroSubheadline:
    'Idaho ranks among the top western inbound states in 2026 — drawing California, Washington, and Oregon households with no state income tax on retirement benefits, strong job growth in tech and healthcare, and an outdoor lifestyle spanning Treasure Valley urban living, Panhandle lakes, and Snake River canyon country. Our independent directory covers FMCSA-licensed interstate movers, county-level local directories, and city-specific guides with cost tables and free quote matching.',
  introParagraphs: [
    'Whether you are targeting Boise\'s state capital corridor, Meridian\'s fastest-growing family suburbs, affordable Nampa and Caldwell entry points, lakeside Coeur d\'Alene and Sandpoint, or eastern Idaho\'s Idaho Falls and Twin Falls growth markets, the relocation fundamentals are identical: document your inventory with our free calculator, verify every carrier on FMCSA.gov, and compare movers directly on equal cubic footage before signing.',
    'Move Trust Hub is an independent informational directory — we are not affiliated with, endorsed by, or a partner of the moving companies listed. Idaho moves involve western logistics that generic guides overlook: summer peak-season demand in the Treasure Valley, winter mountain-pass delays on I-90 into the Panhandle, Idaho National Laboratory security coordination in eastern Idaho, and canyon-edge accessorials near Twin Falls — factors our city guides surface so you can plan with confidence.',
    'Eight live Idaho hubs span the Treasure Valley (Boise, Meridian, Eagle, Nampa & Caldwell), the northern Panhandle (Coeur d\'Alene, Sandpoint), and eastern/southern corridors (Idaho Falls, Twin Falls). Browse each city guide below for 2026–2027 cost tables, calculator prefill by ZIP, and county-level mover directories.',
  ],
  treasureValleyCorridor: [
    {
      slug: 'boise-id',
      displayName: 'Boise',
      zip: '83702',
      tagline: 'State capital · tech & healthcare · Greenbelt · foothills access',
    },
    {
      slug: 'meridian-id',
      displayName: 'Meridian',
      zip: '83642',
      tagline: 'Fastest-growing · family-friendly · top schools · low crime',
    },
    {
      slug: 'eagle-id',
      displayName: 'Eagle',
      zip: '83616',
      tagline: 'Upscale suburb · premium properties · peaceful foothills living',
    },
    {
      slug: 'nampa-caldwell-id',
      displayName: 'Nampa & Caldwell',
      zip: '83651',
      tagline: 'Most affordable Treasure Valley entry · Boise job commute access',
    },
  ],
  panhandleCorridor: [
    {
      slug: 'coeur-dalene-id',
      displayName: "Coeur d'Alene",
      zip: '83814',
      tagline: 'Lakeside resort · boating · hiking · mountain views',
    },
    {
      slug: 'sandpoint-id',
      displayName: 'Sandpoint',
      zip: '83864',
      tagline: 'Lake Pend Oreille · Schweitzer Mountain · skiing & water sports',
    },
  ],
  easternSouthernCorridor: [
    {
      slug: 'idaho-falls-id',
      displayName: 'Idaho Falls',
      zip: '83402',
      tagline: 'INL jobs · wage growth · Yellowstone & Grand Teton gateway',
    },
    {
      slug: 'twin-falls-id',
      displayName: 'Twin Falls',
      zip: '83301',
      tagline: 'Snake River Canyon · Shoshone Falls · affordable outdoor living',
    },
  ],
  bodySections: [
    {
      heading: 'Why families and retirees are moving to Idaho in 2026',
      paragraphs: [
        'Idaho consistently ranks among the highest net-inbound western states, driven by California outmigration seeking lower housing costs, no state income tax on retirement benefits, and four-season outdoor access without coastal hurricane exposure. The Treasure Valley anchors the majority of inbound volume — Boise, Meridian, and Eagle attract tech transfers, healthcare professionals, and remote workers who want urban amenities with foothills trail access minutes from downtown.',
        'Northern Idaho\'s Panhandle draws a different profile: retirees and outdoor enthusiasts relocating to Coeur d\'Alene\'s lake lifestyle or Sandpoint\'s small-town mountain character. Eastern Idaho\'s Idaho Falls corridor benefits from Idaho National Laboratory employment and gateway access to Yellowstone and Grand Teton national parks. Southern Idaho\'s Twin Falls offers manufacturing and food-production job growth with dramatic Snake River Canyon scenery at a lower price point than Ada County.',
        'Compared to Phoenix or Denver, Idaho offers relative affordability with strong inbound demand — which means carrier availability tightens in summer. Book early, confirm winter pass contingency language for Panhandle deliveries, and compare quotes on identical inventory rather than choosing the lowest phone estimate.',
      ],
    },
    {
      heading: 'How to choose an interstate mover for an Idaho delivery',
      paragraphs: [
        'Start with FMCSA verification. Every interstate carrier must have a USDOT number and, if operating as a for-hire carrier, an MC number. Look up both on FMCSA.gov and confirm acceptable safety ratings and low complaint ratios. Move Trust Hub surfaces this data alongside Google, BBB, and Trustpilot reviews so you can research before anyone calls you.',
        'Demand inventory-based quotes. Lowball estimates based on phone guesses are the leading cause of moving-day price disputes on western routes. Use our room-by-room calculator to document cubic feet and estimated weight, then send the same inventory to every carrier you compare.',
        'Ask about Idaho-specific accessorials. Treasure Valley new-build streets may require shuttle trucks. Panhandle lakefront and mountain homes may need smaller equipment. Idaho Falls INL-area moves may involve security or scheduling constraints. Twin Falls canyon-edge properties can require long carries. These are legitimate cost drivers — they should appear in writing before booking.',
        'Read our scam avoidance guide before paying more than a modest booking deposit. Reputable interstate carriers do not demand large upfront cash payments via wire transfer or cryptocurrency.',
      ],
    },
    {
      heading: 'Regional Idaho moving corridors at a glance',
      paragraphs: [
        'Treasure Valley (Ada and Canyon counties) handles the highest inbound volume. Boise is the flagship; Meridian and Eagle serve family and upscale suburban demand; Nampa and Caldwell offer the most affordable entry with I-84 commute access to Boise employers. Interstate lanes from California, Washington, and Oregon are well-traveled — summer peaks May through September.',
        'Panhandle (Kootenai and Bonner counties) attracts lake and mountain lifestyle buyers. Coeur d\'Alene is the resort anchor; Sandpoint adds ski and small-town appeal on Lake Pend Oreille. Winter weather on Lookout Pass and Fourth of July Pass can delay cross-country delivery — build flexibility into your bill of lading.',
        'Eastern and southern Idaho (Bonneville, Twin Falls, and surrounding counties) offer economic resilience and outdoor gateway access at lower housing costs than the Treasure Valley. Idaho Falls INL and healthcare hiring drive professional relocations; Twin Falls food production and manufacturing support family moves from Utah, California, and the Pacific Northwest.',
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
      title: 'Browse Ada County local movers',
      description: 'Boise, Meridian, and Eagle vetted movers with FMCSA data.',
      href: '/local-movers/idaho/ada',
    },
    {
      title: 'Browse Canyon County local movers',
      description: 'Nampa and Caldwell local mover directory.',
      href: '/local-movers/idaho/canyon',
    },
    {
      title: 'Browse Kootenai County local movers',
      description: "Coeur d'Alene Panhandle mover directory.",
      href: '/local-movers/idaho/kootenai',
    },
    {
      title: 'California → Texas route guide',
      description: 'Western corridor pricing context for CA-origin Idaho moves.',
      href: '/resources/routes/california-to-texas',
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
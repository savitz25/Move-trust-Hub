import type { DestinationResourceLink } from '@/lib/destinations/types';

export type AlaskaCorridorCity = {
  slug: string;
  displayName: string;
  zip: string;
  tagline: string;
};

export type AlaskaClusterContent = {
  h1: string;
  seo: {
    title: string;
    description: string;
    keywords: string[];
    canonicalPath: string;
  };
  heroSubheadline: string;
  introParagraphs: string[];
  anchorageMatSuCorridor: AlaskaCorridorCity[];
  interiorAlaskaCorridor: AlaskaCorridorCity[];
  southeastIslandCorridor: AlaskaCorridorCity[];
  kenaiPeninsulaCorridor: AlaskaCorridorCity[];
  bodySections: { heading: string; paragraphs: string[] }[];
  resourceLinks: DestinationResourceLink[];
};

export const alaskaClusterContent: AlaskaClusterContent = {
  h1: 'Moving to Alaska: Anchorage, Mat-Su Valley, Fairbanks, Southeast Islands & Kenai Peninsula City Guides & Trusted Movers',
  seo: {
    title:
      'Moving to Alaska (2026) — Destination Guides, Costs & Free Quotes | Move Trust Hub',
    description:
      'Explore Alaska inbound moving guides for Anchorage, Wasilla, Palmer, Fairbanks, Juneau, Sitka, Soldotna, Kenai, Homer, and Ketchikan. Frontier outdoor lifestyle, energy/defense jobs, Road System vs island logistics. FMCSA-verified movers, free calculator. Independent directory.',
    keywords: [
      'moving to alaska',
      'alaska movers',
      'anchorage ak relocation',
      'wasilla palmer mat-su moving',
      'fairbanks ak movers',
      'best cities to move to in alaska 2026',
      'alaska interstate moving costs',
      'moving from washington to alaska',
      'juneau sitka southeast alaska moving',
      'kenai peninsula homer relocation',
    ],
    canonicalPath: '/moving-to/alaska',
  },
  heroSubheadline:
    'Alaska ranks among America\'s most distinctive frontier relocation destinations for 2026 — a state where dramatic natural beauty, strong energy and defense job markets, tourism and maritime employment, and a lifestyle built around outdoor access coexist with real logistics trade-offs between the Road System and island communities reachable only by ferry, barge, or air. Anchorage anchors the state\'s largest economic, medical, and defense hub with short commutes and urban amenities; Wasilla and Palmer capture fastest-growing Mat-Su Valley family demand with affordable land; Fairbanks delivers Interior affordability with university culture and Northern Lights appeal; Juneau concentrates state-government employment in the Tongass; Sitka ranks among Alaska\'s safest maritime communities; and the Kenai Peninsula corridor (Soldotna, Kenai, Homer) channels river recreation, fishing economies, and coastal living at the End of the Road. Our independent directory covers FMCSA-licensed interstate movers, borough-level local directories, and ten city-specific guides with cost tables and free quote matching.',
  introParagraphs: [
    'Whether you are targeting Anchorage\'s largest-city economic and medical hub, Wasilla\'s fastest-growing Mat-Su Valley affordability, Palmer\'s historic agricultural charm and mountain views, Fairbanks\' Interior university and Northern Lights lifestyle, Juneau\'s state-capital government corridor, Sitka\'s #1 safest maritime heritage, Soldotna\'s Kenai River recreation anchor, Kenai\'s coastal petrochemical and fishing economy, Homer\'s artsy Spit community at the End of the Road, or Ketchikan\'s rainforest Inside Passage tourism and maritime jobs, the relocation fundamentals are identical: document your inventory with our free calculator, verify every carrier on FMCSA.gov, and compare multiple quotes on equal cubic footage before signing.',
    'Move Trust Hub is an independent informational directory — we are not affiliated with, endorsed by, or a partner of the moving companies listed. Alaska moves involve frontier logistics that generic relocation guides overlook: limited interstate carrier lanes from the Lower 48, summer-only road access windows on some routes, barge and ferry final-mile requirements for Southeast island communities, extreme winter scheduling constraints, higher linehaul baselines due to distance, and Mat-Su Valley new-build driveway access on expanding acreage parcels — factors our city guides surface so you can plan with confidence.',
    'Ten live Alaska city guides span Anchorage Metro & Mat-Su (Anchorage, Wasilla, Palmer), Interior Alaska (Fairbanks), Southeast Island Communities (Juneau, Sitka, Ketchikan), and Kenai Peninsula Road System (Soldotna, Kenai, Homer). Browse each city guide below for 2026–2027 cost tables, calculator prefill by ZIP, and borough-level mover directories.',
  ],
  anchorageMatSuCorridor: [
    {
      slug: 'anchorage-ak',
      displayName: 'Anchorage',
      zip: '99501',
      tagline: 'Largest city · economic/medical/defense hub · short commutes · urban amenities',
    },
    {
      slug: 'wasilla-ak',
      displayName: 'Wasilla',
      zip: '99654',
      tagline: 'Fastest-growing Mat-Su Valley · affordable land · family-focused',
    },
    {
      slug: 'palmer-ak',
      displayName: 'Palmer',
      zip: '99645',
      tagline: 'Historic agricultural charm · mountain views · safety',
    },
  ],
  interiorAlaskaCorridor: [
    {
      slug: 'fairbanks-ak',
      displayName: 'Fairbanks',
      zip: '99701',
      tagline: 'Interior hub · university · Northern Lights · affordability',
    },
  ],
  southeastIslandCorridor: [
    {
      slug: 'juneau-ak',
      displayName: 'Juneau',
      zip: '99801',
      tagline: 'State capital · government jobs · Tongass National Forest',
    },
    {
      slug: 'sitka-ak',
      displayName: 'Sitka',
      zip: '99835',
      tagline: '#1 safest city · maritime heritage · oceanfront living',
    },
    {
      slug: 'ketchikan-ak',
      displayName: 'Ketchikan',
      zip: '99901',
      tagline: 'Rainforest coastal lifestyle · Inside Passage · tourism & maritime',
    },
  ],
  kenaiPeninsulaCorridor: [
    {
      slug: 'soldotna-ak',
      displayName: 'Soldotna',
      zip: '99669',
      tagline: 'Kenai River recreation · healthcare & logistics anchor',
    },
    {
      slug: 'kenai-ak',
      displayName: 'Kenai',
      zip: '99611',
      tagline: 'Coastal & river living · petrochemical & fishing economy',
    },
    {
      slug: 'homer-ak',
      displayName: 'Homer',
      zip: '99603',
      tagline: 'Artsy End of the Road · halibut fishing · Spit community',
    },
  ],
  bodySections: [
    {
      heading: 'Why families and professionals are moving to Alaska in 2026',
      paragraphs: [
        'Alaska\'s inbound migration story is defined by frontier lifestyle trade-offs that attract a specific household profile — outdoor-oriented families, defense and energy professionals, healthcare workers, maritime employees, and remote workers willing to exchange Lower 48 density for dramatic natural access. Anchorage anchors the state\'s employment base as the largest city with economic, medical, and Joint Base Elmendorf-Richardson defense hiring, short commutes relative to major metros, and genuine urban amenities including dining, arts, and airport connectivity to the Lower 48. Wasilla and Palmer in the Mat-Su Valley capture the state\'s fastest-growing family corridor with affordable land, acreage parcels, and mountain-view subdivisions minutes from Anchorage employment.',
        'Interior and peninsula corridors serve distinct lifestyle priorities. Fairbanks offers Interior affordability with University of Alaska Fairbanks culture, Northern Lights appeal, and pipeline-adjacent energy employment without Anchorage\'s higher housing curve. The Kenai Peninsula Road System — Soldotna, Kenai, and Homer — channels world-class fishing recreation, healthcare and logistics anchors, petrochemical employment, and Homer\'s artsy Spit community at the literal End of the Road. Compared to Pacific Northwest metros, Alaska delivers meaningfully different value propositions: higher interstate moving costs and seasonal logistics complexity in exchange for frontier outdoor lifestyle and strong niche job markets.',
        'Southeast Alaska island communities require a separate planning mindset. Juneau, the state capital, concentrates government employment within Tongass National Forest surroundings but is not connected to the North American road network — shipments typically route via barge or air from Seattle or Tacoma. Sitka ranks among Alaska\'s safest cities with deep maritime heritage and oceanfront character. Ketchikan delivers rainforest coastal lifestyle along the Inside Passage with tourism and maritime hiring. No two Alaska corridors move alike: Road System deliveries differ fundamentally from island final-mile logistics.',
        'Compare quotes on identical inventory rather than choosing the lowest phone estimate — especially for Southeast Alaska where barge scheduling, ferry windows, and summer-only access can dominate your final price.',
      ],
    },
    {
      heading: 'How to choose an interstate mover for an Alaska delivery',
      paragraphs: [
        'Start with FMCSA verification. Every interstate carrier must have a USDOT number and, if operating as a for-hire carrier, an MC number. Look up both on FMCSA.gov and confirm acceptable safety ratings and low complaint ratios. Move Trust Hub surfaces this data alongside Google, BBB, and Trustpilot reviews so you can research before anyone calls you.',
        'Demand inventory-based quotes. Lowball estimates based on phone guesses are the leading cause of moving-day price disputes on Alaska-bound shipments. Use our room-by-room calculator to document cubic feet and estimated weight, then send the same inventory to every carrier you compare. Alaska linehaul from Washington, California, or Texas involves among the longest domestic distances — incomplete inventory creates the largest price-gap risk.',
        'Ask about Alaska-specific accessorials. Road System communities (Anchorage, Mat-Su, Fairbanks, Kenai Peninsula) typically receive truck delivery via the Alaska Highway or marine highway connectors, but driveway grade, winter mud season, and new-build Mat-Su acreage access may require shuttle trucks. Southeast island communities (Juneau, Sitka, Ketchikan) often need barge or ferry final-mile coordination from Pacific Northwest ports — confirm whether your quote includes port-to-door service or stops at a regional hub.',
        'Plan around Alaska\'s seasonal windows. May through September offers the most reliable Road System access and marine shipping schedules. Winter moves face shorter daylight, icy driveway conditions, and compressed carrier availability. Read our scam avoidance guide before paying more than a modest booking deposit.',
      ],
    },
    {
      heading: 'Regional Alaska moving corridors at a glance',
      paragraphs: [
        'Anchorage Metro & Mat-Su (Anchorage, Wasilla, and Palmer) handles Alaska\'s highest inbound volume on the Road System — urban hub employment in Anchorage and fastest-growing family affordability in the Mat-Su Valley.',
        'Interior Alaska (Fairbanks) serves university culture, Northern Lights lifestyle, and Interior affordability with pipeline and defense-adjacent employment.',
        'Southeast Island Communities (Juneau, Sitka, and Ketchikan) require marine or air final-mile planning for capital-government, maritime heritage, and Inside Passage tourism corridors.',
        'Kenai Peninsula Road System (Soldotna, Kenai, and Homer) captures river recreation, fishing economies, petrochemical employment, and artsy coastal living at the End of the Road.',
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
      title: 'Browse Anchorage Borough local movers',
      description: 'Anchorage metro mover directory.',
      href: '/local-movers/alaska/anchorage',
    },
    {
      title: 'Browse Matanuska-Susitna Borough local movers',
      description: 'Wasilla and Palmer Mat-Su Valley mover directory.',
      href: '/local-movers/alaska/matanuska-susitna',
    },
    {
      title: 'Browse Fairbanks North Star Borough local movers',
      description: 'Fairbanks Interior Alaska mover directory.',
      href: '/local-movers/alaska/fairbanks-north-star',
    },
    {
      title: 'Browse Juneau Borough local movers',
      description: 'Juneau state capital mover directory.',
      href: '/local-movers/alaska/juneau',
    },
    {
      title: 'Browse Kenai Peninsula Borough local movers',
      description: 'Soldotna, Kenai, and Homer peninsula mover directory.',
      href: '/local-movers/alaska/kenai-peninsula',
    },
    {
      title: 'Browse Sitka Borough local movers',
      description: 'Sitka maritime community mover directory.',
      href: '/local-movers/alaska/sitka',
    },
    {
      title: 'Browse Ketchikan Gateway Borough local movers',
      description: 'Ketchikan Inside Passage mover directory.',
      href: '/local-movers/alaska/ketchikan-gateway',
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
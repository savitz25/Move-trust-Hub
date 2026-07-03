import type { DestinationResourceLink } from '@/lib/destinations/types';

export type NewMexicoCorridorCity = {
  slug: string;
  displayName: string;
  zip: string;
  tagline: string;
};

export type NewMexicoClusterContent = {
  h1: string;
  seo: {
    title: string;
    description: string;
    keywords: string[];
    canonicalPath: string;
  };
  heroSubheadline: string;
  introParagraphs: string[];
  rioGrandeMetroCorridor: NewMexicoCorridorCity[];
  northernCulturalCorridor: NewMexicoCorridorCity[];
  southernBorderCorridor: NewMexicoCorridorCity[];
  fourCornersMountainCorridor: NewMexicoCorridorCity[];
  bodySections: { heading: string; paragraphs: string[] }[];
  resourceLinks: DestinationResourceLink[];
};

export const newMexicoClusterContent: NewMexicoClusterContent = {
  h1: 'Moving to New Mexico: Rio Grande Metro, Santa Fe Arts, Southern Border & Mountain Resort City Guides & Trusted Movers',
  seo: {
    title:
      'Moving to New Mexico (2026) — Destination Guides, Costs & Trusted Movers | Move Trust Hub',
    description:
      'Explore New Mexico inbound moving guides for Rio Rancho, Albuquerque, Farmington, Santa Fe, Las Cruces, Los Alamos, Alamogordo, Corrales, Taos, and Ruidoso. High-desert living, arts heritage, competitive cost of living. FMCSA-verified movers, free calculator. Independent directory.',
    keywords: [
      'moving to new mexico',
      'new mexico movers',
      'rio rancho nm relocation',
      'albuquerque nm movers',
      'santa fe nm moving',
      'best cities to move to in new mexico 2026',
      'new mexico interstate moving costs',
      'moving from texas to new mexico',
      'las cruces santa fe relocation',
      'high desert new mexico movers',
    ],
    canonicalPath: '/moving-to/new-mexico',
  },
  heroSubheadline:
    'New Mexico ranks among the Southwest\'s most culturally distinctive and competitively affordable inbound relocation markets for 2026 — a Land of Enchantment where high-desert Rio Grande corridor living, Sangre de Cristo mountain enclaves, Pueblo and Spanish colonial heritage, and meaningfully lower housing costs than Colorado or Arizona metros coexist across distinct lifestyle corridors. Rio Rancho leads statewide inbound intent as New Mexico\'s #1 destination with Intel expansion and affordable master-planned communities; Albuquerque anchors the major metro with universities, film production, and diverse neighborhoods; Santa Fe channels world-renowned arts and culture capital prestige; Las Cruces delivers southern college-town affordability with Organ Mountains views; Los Alamos offers high-income mesa community quality near Los Alamos National Laboratory; and Ruidoso captures mountain-resort cabin retirement living. Our independent directory covers FMCSA-licensed interstate movers, county-level local directories, and ten city-specific guides with cost tables and trusted mover research tools.',
  introParagraphs: [
    'Whether you are targeting Rio Rancho\'s #1-ranked New Mexico livability with Intel corridor expansion and master-planned affordability, Albuquerque\'s major-metro universities and film-production employment, Farmington\'s Four Corners outdoor recreation and energy-sector jobs, Santa Fe\'s world-renowned arts capital historic charm, Las Cruces\' southern college-town Organ Mountains views, Los Alamos\' high-income national-laboratory mesa community, Alamogordo\'s military-family White Sands desert lifestyle, Corrales\' historic Rio Grande Bosque equestrian balance, Taos\' artistic mountain adobe character, or Ruidoso\'s skiing and cabin-style retirement living, the relocation fundamentals are identical: document your inventory with our free calculator, verify every carrier on FMCSA.gov, and compare movers directly on equal cubic footage before signing.',
    'Move Trust Hub is an independent informational directory — we are not affiliated with, endorsed by, or a partner of the moving companies listed. New Mexico moves involve Southwest high-desert logistics that generic relocation guides overlook: I-25 and I-40 corridor peak scheduling, Sandia foothill driveway grade on Rio Grande deliveries, Santa Fe historic-district narrow adobe street constraints, mountain-resort seasonal access in Taos and Ruidoso, White Sands military relocation windows in Alamogordo, and summer monsoon mud-season considerations on unpaved acreage parcels — factors our city guides surface so you can plan with confidence.',
    'Ten live New Mexico city guides span Rio Grande Metro (Rio Rancho, Albuquerque, Corrales), Northern Cultural (Santa Fe, Los Alamos, Taos), Southern & Border (Las Cruces, Alamogordo), and Four Corners & Mountain Resort (Farmington, Ruidoso). Browse each city guide below for 2026–2027 cost tables, calculator prefill by ZIP, and county-level mover directories.',
  ],
  rioGrandeMetroCorridor: [
    {
      slug: 'rio-rancho-nm',
      displayName: 'Rio Rancho',
      zip: '87144',
      tagline: '#1 in New Mexico · Intel expansion · affordable master-planned communities',
    },
    {
      slug: 'albuquerque-nm',
      displayName: 'Albuquerque',
      zip: '87102',
      tagline: 'Major metro · universities · film production · diverse neighborhoods',
    },
    {
      slug: 'corrales-nm',
      displayName: 'Corrales',
      zip: '87048',
      tagline: 'Historic rural-urban balance · Rio Grande Bosque · equestrian lifestyle',
    },
  ],
  northernCulturalCorridor: [
    {
      slug: 'santa-fe-nm',
      displayName: 'Santa Fe',
      zip: '87501',
      tagline: 'World-renowned arts & culture capital · historic charm',
    },
    {
      slug: 'los-alamos-nm',
      displayName: 'Los Alamos',
      zip: '87544',
      tagline: 'High-income mesa community · national laboratory · quality of life',
    },
    {
      slug: 'taos-nm',
      displayName: 'Taos',
      zip: '87571',
      tagline: 'Artistic mountain town · historic adobe · skiing & hiking',
    },
  ],
  southernBorderCorridor: [
    {
      slug: 'las-cruces-nm',
      displayName: 'Las Cruces',
      zip: '88001',
      tagline: 'Southern college town · Organ Mountains views · affordability',
    },
    {
      slug: 'alamogordo-nm',
      displayName: 'Alamogordo',
      zip: '88310',
      tagline: 'Military families · White Sands National Park · desert scenery',
    },
  ],
  fourCornersMountainCorridor: [
    {
      slug: 'farmington-nm',
      displayName: 'Farmington',
      zip: '87401',
      tagline: 'Outdoor recreation · energy sector · affordable Northwest hub',
    },
    {
      slug: 'ruidoso-nm',
      displayName: 'Ruidoso',
      zip: '88345',
      tagline: 'Mountain resort · skiing · cabin-style retirement living',
    },
  ],
  bodySections: [
    {
      heading: 'Why families and professionals are moving to New Mexico in 2026',
      paragraphs: [
        'New Mexico\'s inbound migration story blends Southwest affordability with cultural depth that few states can match. Rio Rancho ranks #1 among New Mexico destinations — Intel corridor expansion, master-planned community inventory, and Sandoval County school access draw Texas, Arizona, and Colorado spillover households seeking high-desert value without Denver or Phoenix price curves. Albuquerque anchors the Rio Grande metro with University of New Mexico and Central New Mexico Community College pipelines, Netflix and film-production employment, Kirtland Air Force Base and Sandia National Laboratories spillover, and genuinely diverse neighborhood character from Nob Hill walkability to Westside master-planned growth.',
        'Northern cultural corridors serve distinct household profiles. Santa Fe\'s world-renowned arts capital status — galleries, opera, culinary scene, and historic Plaza adobe architecture — attracts creative professionals and retirees trading coastal premiums for high-desert cultural depth. Los Alamos delivers among the state\'s highest household incomes with Los Alamos National Laboratory employment and mesa-community quality of life. Taos channels artistic mountain-town character with historic adobe, Taos Ski Valley recreation, and hiking access in the Sangre de Cristo foothills. Corrales along the Rio Grande Bosque offers rare rural-urban balance with equestrian properties minutes from Albuquerque employment.',
        'Southern, Four Corners, and mountain-resort corridors round out New Mexico\'s spectrum. Las Cruces in the Mesilla Valley combines New Mexico State University culture, Organ Mountains backdrop, and southern-border affordability. Alamogordo serves Holloman Air Force Base families with White Sands National Park desert scenery. Farmington anchors the Four Corners with outdoor recreation, energy-sector employment, and northwest New Mexico affordability. Ruidoso delivers Sierra Blanca mountain-resort skiing, cabin-style retirement inventory, and Lincoln National Forest access. Compared to Colorado Front Range or Arizona Sun Belt metros, New Mexico corridors deliver meaningfully lower interstate moving costs and ongoing living expenses.',
        'No two New Mexico counties move alike. Sandia foothill grades affect Albuquerque and Rio Rancho deliveries. Santa Fe historic adobe streets limit trailer access. Taos and Ruidoso mountain roads may require seasonal scheduling. Compare quotes on identical inventory rather than choosing the lowest phone estimate.',
      ],
    },
    {
      heading: 'How to choose an interstate mover for a New Mexico delivery',
      paragraphs: [
        'Start with FMCSA verification. Every interstate carrier must have a USDOT number and, if operating as a for-hire carrier, an MC number. Look up both on FMCSA.gov and confirm acceptable safety ratings and low complaint ratios. Move Trust Hub surfaces this data alongside Google, BBB, and Trustpilot reviews so you can research before anyone calls you.',
        'Demand inventory-based quotes. Lowball estimates based on phone guesses are the leading cause of moving-day price disputes on I-25 and I-40 corridors into New Mexico. Use our room-by-room calculator to document cubic feet and estimated weight, then send the same inventory to every carrier you compare.',
        'Ask about New Mexico-specific accessorials. High-desert acreage parcels in Rio Rancho, Corrales, and Farmington may involve long driveways and unpaved final-mile access. Santa Fe and Taos historic districts frequently require shuttle trucks on narrow adobe streets. Mountain-resort deliveries in Ruidoso and Taos may need seasonal road-condition planning. Summer monsoon season (July–September) can affect scheduling on dirt-road properties.',
        'Read our scam avoidance guide before paying more than a modest booking deposit. Reputable interstate carriers do not demand large upfront cash payments via wire transfer or cryptocurrency.',
      ],
    },
    {
      heading: 'Regional New Mexico moving corridors at a glance',
      paragraphs: [
        'Rio Grande Metro (Rio Rancho, Albuquerque, and Corrales) handles New Mexico\'s highest inbound volume — Intel corridor growth, major-metro employment diversity, and Bosque equestrian lifestyle within one metro footprint.',
        'Northern Cultural (Santa Fe, Los Alamos, and Taos) serves arts-capital prestige, national-laboratory high-income stability, and artistic mountain-town recreation.',
        'Southern & Border (Las Cruces and Alamogordo) captures college-town southern affordability and military-family White Sands desert living.',
        'Four Corners & Mountain Resort (Farmington and Ruidoso) anchors northwest energy-and-outdoor employment and Sierra Blanca resort retirement inventory.',
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
      title: 'Browse Sandoval County local movers',
      description: 'Rio Rancho master-planned community mover directory.',
      href: '/local-movers/new-mexico/sandoval',
    },
    {
      title: 'Browse Bernalillo County local movers',
      description: 'Albuquerque and Corrales Rio Grande metro mover directory.',
      href: '/local-movers/new-mexico/bernalillo',
    },
    {
      title: 'Browse Santa Fe County local movers',
      description: 'Santa Fe arts capital mover directory.',
      href: '/local-movers/new-mexico/santa-fe',
    },
    {
      title: 'Browse Los Alamos County local movers',
      description: 'Los Alamos national laboratory corridor mover directory.',
      href: '/local-movers/new-mexico/los-alamos',
    },
    {
      title: 'Browse Doña Ana County local movers',
      description: 'Las Cruces southern college-town mover directory.',
      href: '/local-movers/new-mexico/doa-ana',
    },
    {
      title: 'Browse San Juan County local movers',
      description: 'Farmington Four Corners mover directory.',
      href: '/local-movers/new-mexico/san-juan',
    },
    {
      title: 'Browse Otero County local movers',
      description: 'Alamogordo White Sands corridor mover directory.',
      href: '/local-movers/new-mexico/otero',
    },
    {
      title: 'Browse Taos County local movers',
      description: 'Taos artistic mountain-town mover directory.',
      href: '/local-movers/new-mexico/taos',
    },
    {
      title: 'Browse Lincoln County local movers',
      description: 'Ruidoso mountain resort mover directory.',
      href: '/local-movers/new-mexico/lincoln',
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
import type { DestinationResourceLink } from '@/lib/destinations/types';

export type KentuckyCorridorCity = {
  slug: string;
  displayName: string;
  zip: string;
  tagline: string;
};

export type KentuckyClusterContent = {
  h1: string;
  seo: {
    title: string;
    description: string;
    keywords: string[];
    canonicalPath: string;
  };
  heroSubheadline: string;
  introParagraphs: string[];
  bluegrassCorridor: KentuckyCorridorCity[];
  louisvilleMetroCorridor: KentuckyCorridorCity[];
  northernKentuckyCorridor: KentuckyCorridorCity[];
  i65WesternCorridor: KentuckyCorridorCity[];
  easternCreativeCorridor: KentuckyCorridorCity[];
  bodySections: { heading: string; paragraphs: string[] }[];
  resourceLinks: DestinationResourceLink[];
};

export const kentuckyClusterContent: KentuckyClusterContent = {
  h1: 'Moving to Kentucky: Bluegrass, Bourbon & Affordable City Guides & Trusted Movers',
  seo: {
    title:
      'Moving to Kentucky (2026) — Destination Guides, Costs & Trusted Movers | Move Trust Hub',
    description:
      'Explore Kentucky inbound moving guides for Lexington, Louisville, Bowling Green, Covington, Georgetown, Paducah, and more. Low cost of living, horse country, bourbon culture, FMCSA-verified movers, free calculator. Independent directory.',
    keywords: [
      'moving to kentucky',
      'kentucky movers',
      'lexington ky movers',
      'louisville ky relocation',
      'best cities to move to in kentucky',
      'affordable kentucky relocation',
      'kentucky interstate moving costs',
      'moving from ohio to kentucky',
      'moving from tennessee to kentucky',
    ],
    canonicalPath: '/moving-to/kentucky',
  },
  heroSubheadline:
    'Kentucky ranks among the Southern Midwest\'s most culturally rich inbound states in 2026 — drawing Ohio, Indiana, Illinois, Tennessee, California, Texas, New York, and Florida households to Lexington\'s horse-farm intellectual core, Louisville\'s Highlands and Old Louisville character, Covington\'s Cincinnati riverfront alternative, and Paducah\'s UNESCO Creative City sanctuary. Low cost of living relative to coastal metros, bourbon-and-Bluegrass heritage, and deliberate regional diversity create a relocation calculus that generic Appalachian guides rarely capture at city-level precision. Our independent directory covers FMCSA-licensed interstate movers, county-level local directories, and ten city-specific guides with cost tables and free quote matching.',
  introParagraphs: [
    'Whether you are accepting a UPS Worldport corridor transfer into Louisville, relocating a Cincinnati family across the river into Covington\'s historic districts, downsizing from Chicago into Georgetown\'s Toyota manufacturing stability, or choosing Paducah\'s river-confluence arts culture over Nashville pricing, the relocation fundamentals are identical: document your inventory with our free calculator, verify every carrier on FMCSA.gov, and compare movers directly on equal cubic footage before signing.',
    'Move Trust Hub is an independent informational directory — we are not affiliated with, endorsed by, or a partner of the moving companies listed. Kentucky moves involve regional logistics that statewide guides overlook: Louisville Highlands narrow-street shuttle staging, Lexington horse-farm long-driveway access, I-65 Elizabethtown EV plant closing clusters, Northern Kentucky CVG airport corridor traffic, Owensboro riverfront flood-zone planning, and Paducah historic district move-day coordination — factors our city guides surface so you can plan with confidence.',
    'Ten live Kentucky hubs span Bluegrass horse country (Lexington, Georgetown), Louisville metro culture, Northern Kentucky Cincinnati spillover (Covington, Florence), I-65 western growth (Bowling Green, Elizabethtown, Owensboro), and eastern creative corridors (Richmond, Paducah). Browse each city guide below for 2026–2027 cost tables, calculator prefill by ZIP, and county-level mover directories.',
  ],
  bluegrassCorridor: [
    {
      slug: 'lexington-ky',
      displayName: 'Lexington',
      zip: '40507',
      tagline: 'Refined intellectual core · horse farms · University of Kentucky',
    },
    {
      slug: 'georgetown-ky',
      displayName: 'Georgetown',
      zip: '40324',
      tagline: 'Stable family choice · Toyota manufacturing · Scott County value',
    },
  ],
  louisvilleMetroCorridor: [
    {
      slug: 'louisville-ky',
      displayName: 'Louisville',
      zip: '40202',
      tagline: 'Cultural heavyweight · Highlands · Old Louisville · UPS Worldport',
    },
  ],
  northernKentuckyCorridor: [
    {
      slug: 'covington-ky',
      displayName: 'Covington',
      zip: '41011',
      tagline: 'Urban Cincinnati alternative · Ohio Riverfront · historic charm',
    },
    {
      slug: 'florence-ky',
      displayName: 'Florence',
      zip: '41042',
      tagline: 'Logistics & transit hub · I-75 · CVG airport corridor',
    },
  ],
  i65WesternCorridor: [
    {
      slug: 'bowling-green-ky',
      displayName: 'Bowling Green',
      zip: '42101',
      tagline: 'Booming industrial engine · WKU · Corvette plant',
    },
    {
      slug: 'elizabethtown-ky',
      displayName: 'Elizabethtown',
      zip: '42701',
      tagline: 'Reshaped Hub City · EV battery corridor · I-65 growth',
    },
    {
      slug: 'owensboro-ky',
      displayName: 'Owensboro',
      zip: '42301',
      tagline: 'Affordable riverfront jewel · BBQ Capital of the World',
    },
  ],
  easternCreativeCorridor: [
    {
      slug: 'richmond-ky',
      displayName: 'Richmond',
      zip: '40475',
      tagline: 'High-growth commuter bargain · Eastern Kentucky University',
    },
    {
      slug: 'paducah-ky',
      displayName: 'Paducah',
      zip: '42001',
      tagline: 'Arts sanctuary · UNESCO Creative City · Ohio & Tennessee river confluence',
    },
  ],
  bodySections: [
    {
      heading: 'Why Kentucky leads affordable culturally rich Southern Midwest inbound migration in 2026',
      paragraphs: [
        'Kentucky offers a combination increasingly attractive to cross-state relocators: housing costs that remain below Chicago, Nashville, and coastal benchmarks; bourbon-and-Bluegrass culture without New England property-tax extremes; and university-and-manufacturing employment across Lexington, Louisville, Bowling Green, and Georgetown without Texas sprawl premiums. Ohio, Indiana, Illinois, Tennessee, California, Texas, New York, and Florida consistently rank among the largest origin states for Kentucky relocations.',
        'Fayette and Jefferson counties anchor the highest inbound volume — Lexington horse-country intellectual culture, Louisville Highlands walkability, UPS Worldport logistics employment, and Old Louisville historic inventory each carry distinct move logistics. Kenton and Boone counties draw Cincinnati spillover into Covington and Florence. Warren and Hardin counties serve Corvette plant and EV battery corridor growth. Madison, Daviess, and McCracken counties attract EKU commuter value, Owensboro riverfront affordability, and Paducah creative-community seekers.',
        'Our ten Kentucky city hubs include 2026–2027 cost tables, calculator prefill by ZIP, county mover directories, and cross-links to Ohio, Indiana, Tennessee, and Illinois for households comparing Ohio Valley and Southern Midwest relocation corridors.',
      ],
    },
    {
      heading: 'Why Lexington, Louisville, and Northern Kentucky drive the highest inbound volume',
      paragraphs: [
        'Lexington and Georgetown form Kentucky\'s Bluegrass employment triangle — University of Kentucky research culture, Toyota Georgetown manufacturing stability, and horse-farm estate inventory at graduated price points. Louisville adds cultural heavyweight density through the Highlands, NuLu, and Old Louisville corridors with UPS Worldport and bourbon-industry employment that keeps Cincinnati and Nashville spillover households comparing Kentucky favorably.',
        'Covington and Florence capture Northern Kentucky\'s Cincinnati alternative — Ohio Riverfront walkability, historic MainStrasse charm, and I-75/CVG logistics corridor convenience without Ohio income tax on the Kentucky side of the line. Summer builder closing clusters (May–August) and bourbon-festival season tighten Jefferson and Fayette County delivery windows along I-64 and I-75 routes.',
      ],
    },
    {
      heading: 'Why western I-65 growth and eastern creative towns attract distinct inbound households',
      paragraphs: [
        'Bowling Green, Elizabethtown, and Owensboro serve western Kentucky inbound — Western Kentucky University campus energy, Corvette Assembly Plant employment, EV battery Hub City reshaping along I-65, and Owensboro\'s BBQ Capital riverfront affordability for buyers who want manufacturing-hub economics without Louisville urban density.',
        'Richmond and Paducah anchor eastern and western creative inbound — EKU commuter growth with Lexington spillover pricing, and Paducah\'s UNESCO Creative City river-confluence arts culture for households prioritizing gallery-district walkability and Lower Town historic inventory over metro sprawl. Shoulder-season deliveries (April–May, September–October) often offer better carrier availability on rural Kentucky routes.',
      ],
    },
  ],
  resourceLinks: [
    {
      title: 'Browse Fayette County local movers',
      description: 'Lexington and Bluegrass horse-country relocations.',
      href: '/local-movers/kentucky/fayette',
    },
    {
      title: 'Browse Jefferson County local movers',
      description: 'Louisville Highlands, Old Louisville, and metro corridor moves.',
      href: '/local-movers/kentucky/jefferson',
    },
    {
      title: 'Browse Kenton County local movers',
      description: 'Covington and Northern Kentucky riverfront relocations.',
      href: '/local-movers/kentucky/kenton',
    },
    {
      title: 'Browse Boone County local movers',
      description: 'Florence and CVG airport corridor moves.',
      href: '/local-movers/kentucky/boone',
    },
    {
      title: 'Browse Warren County local movers',
      description: 'Bowling Green and Corvette plant corridor relocations.',
      href: '/local-movers/kentucky/warren',
    },
    {
      title: 'Ohio destination cluster',
      description: 'Compare KY with Cincinnati and Greater Ohio metro alternatives.',
      href: '/moving-to/ohio',
    },
    {
      title: 'Indiana destination cluster',
      description: 'Compare KY with Louisville-spillover and Southern Indiana corridors.',
      href: '/moving-to/indiana',
    },
    {
      title: 'Tennessee destination cluster',
      description: 'Compare KY with Nashville and Memphis corridor relocations.',
      href: '/moving-to/tennessee',
    },
    {
      title: 'Illinois destination cluster',
      description: 'Compare KY with Chicago suburbs and downstate alternatives.',
      href: '/moving-to/illinois',
    },
    {
      title: 'Iowa destination cluster',
      description: 'Compare KY with affordable Midwest university-town alternatives.',
      href: '/moving-to/iowa',
    },
    {
      title: 'Verify any mover\'s USDOT & MC number',
      description: 'Step-by-step FMCSA lookup before booking.',
      href: '/resources/fmcsa',
    },
    {
      title: 'All popular destinations',
      description: 'Kentucky, Ohio, Tennessee, and nationwide hubs.',
      href: '/moving-to',
    },
  ],
};
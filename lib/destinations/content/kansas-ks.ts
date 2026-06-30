import type { DestinationResourceLink } from '@/lib/destinations/types';

export type KansasCorridorCity = {
  slug: string;
  displayName: string;
  zip: string;
  tagline: string;
};

export type KansasClusterContent = {
  h1: string;
  seo: {
    title: string;
    description: string;
    keywords: string[];
    canonicalPath: string;
  };
  heroSubheadline: string;
  introParagraphs: string[];
  johnsonCountyCorridor: KansasCorridorCity[];
  universityCorridor: KansasCorridorCity[];
  aviationWichitaCorridor: KansasCorridorCity[];
  capitalCorridor: KansasCorridorCity[];
  bodySections: { heading: string; paragraphs: string[] }[];
  resourceLinks: DestinationResourceLink[];
};

export const kansasClusterContent: KansasClusterContent = {
  h1: 'Moving to Kansas: Affordable Midwest City Guides & Trusted Movers',
  seo: {
    title:
      'Moving to Kansas (2026) — Destination Guides, Costs & Free Quotes | Move Trust Hub',
    description:
      'Explore Kansas inbound moving guides for Overland Park, Olathe, Lawrence, Wichita, Manhattan, Leawood, and more. Johnson County suburbs, university towns, aviation hub, FMCSA-verified movers, free calculator. Independent directory.',
    keywords: [
      'moving to kansas',
      'kansas movers',
      'overland park ks movers',
      'johnson county kansas relocation',
      'best cities to move to in kansas',
      'affordable midwest relocation kansas',
      'kansas interstate moving costs',
      'moving from missouri to kansas',
      'moving from texas to kansas',
    ],
    canonicalPath: '/moving-to/kansas',
  },
  heroSubheadline:
    'Kansas ranks among the Midwest\'s most family-forward inbound states in 2026 — drawing Missouri, Illinois, Texas, California, New York, and Florida households to Overland Park\'s Blue Valley school prestige, Lawrence\'s Mass Street cultural energy, Wichita\'s Air Capital aerospace employment, and Andover\'s fast-growing Butler County alternatives. Affordable housing relative to coastal metros, Johnson County corporate headquarters density, and deliberate university-town culture create a relocation calculus that generic Great Plains guides rarely capture at city-level precision. Our independent directory covers FMCSA-licensed interstate movers, county-level local directories, and ten city-specific guides with cost tables and free quote matching.',
  introParagraphs: [
    'Whether you are accepting a Sprint/T-Mobile corridor transfer into Overland Park corporate campuses, relocating a Kansas City family across the state line into Olathe\'s master-planned subdivisions, downsizing from Chicago into Lawrence\'s KU-adjacent neighborhoods, or choosing Andover\'s elite school districts over Wichita urban density, the relocation fundamentals are identical: document your inventory with our free calculator, verify every carrier on FMCSA.gov, and compare multiple quotes on equal cubic footage before signing.',
    'Move Trust Hub is an independent informational directory — we are not affiliated with, endorsed by, or a partner of the moving companies listed. Kansas moves involve Midwest logistics that statewide guides overlook: Johnson County HOA move-day protocols, KU and K-State August turnover clusters, Wichita Old Town loft elevator reservations, Topeka capital-session traffic, and Butler County new-build cul-de-sac shuttle staging — factors our city guides surface so you can plan with confidence.',
    'Ten live Kansas hubs span Johnson County suburbs (Overland Park, Olathe, Lenexa, Leawood, Shawnee), university corridors (Lawrence, Manhattan), aviation and Wichita metro growth (Wichita, Andover), and state capital stability (Topeka). Browse each city guide below for 2026–2027 cost tables, calculator prefill by ZIP, and county-level mover directories.',
  ],
  johnsonCountyCorridor: [
    {
      slug: 'overland-park-ks',
      displayName: 'Overland Park',
      zip: '66213',
      tagline: 'Johnson County powerhouse · Blue Valley schools · corporate HQ',
    },
    {
      slug: 'olathe-ks',
      displayName: 'Olathe',
      zip: '66062',
      tagline: 'Family choice · master-planned communities · Lake Olathe lifestyle',
    },
    {
      slug: 'lenexa-ks',
      displayName: 'Lenexa',
      zip: '66219',
      tagline: 'Modern suburban pioneer · Lenexa City Center · trail connectivity',
    },
    {
      slug: 'leawood-ks',
      displayName: 'Leawood',
      zip: '66206',
      tagline: 'Premium enclave · high-end estates · Town Center Plaza',
    },
    {
      slug: 'shawnee-ks',
      displayName: 'Shawnee',
      zip: '66216',
      tagline: 'Accessible west-side suburb · historic charm · family value',
    },
  ],
  universityCorridor: [
    {
      slug: 'lawrence-ks',
      displayName: 'Lawrence',
      zip: '66044',
      tagline: 'Progressive cultural capital · KU · Mass Street vibrancy',
    },
    {
      slug: 'manhattan-ks',
      displayName: 'Manhattan',
      zip: '66502',
      tagline: 'Active Little Apple · KSU · Flint Hills horizon',
    },
  ],
  aviationWichitaCorridor: [
    {
      slug: 'wichita-ks',
      displayName: 'Wichita',
      zip: '67202',
      tagline: 'Aerospace hub · Old Town · Air Capital of the World',
    },
    {
      slug: 'andover-ks',
      displayName: 'Andover',
      zip: '67002',
      tagline: 'Fast-growing Wichita alternative · elite Butler County schools',
    },
  ],
  capitalCorridor: [
    {
      slug: 'topeka-ks',
      displayName: 'Topeka',
      zip: '66603',
      tagline: 'Stable state capital · government jobs · revitalized downtown',
    },
  ],
  bodySections: [
    {
      heading: 'Why Kansas leads affordable family-friendly Midwest inbound migration in 2026',
      paragraphs: [
        'Kansas offers a combination increasingly attractive to cross-state relocators: Johnson County school districts that routinely rank among the nation\'s best, housing costs that remain below Chicago, Dallas, and coastal benchmarks, and university-town culture in Lawrence and Manhattan without coastal tuition-town premiums. Missouri, Illinois, Texas, California, New York, and Florida consistently rank among the largest origin states for Kansas relocations.',
        'Johnson County anchors the highest inbound volume — Overland Park corporate headquarters corridors, Leawood estate inventory, Olathe master-planned family growth, Lenexa City Center walkability, and Shawnee\'s accessible west-side value each carry distinct move logistics. Douglas and Riley counties draw academic households around KU and K-State. Sedgwick and Butler counties serve aerospace professionals and families choosing Andover schools over Wichita density. Shawnee County provides capital-government stability in Topeka.',
        'Our ten Kansas city hubs include 2026–2027 cost tables, calculator prefill by ZIP, county mover directories, and cross-links to Missouri, Illinois, Oklahoma, and Nebraska for households comparing Great Plains and Kansas City metro relocation corridors.',
      ],
    },
    {
      heading: 'Why Johnson County drives Kansas\'s highest inbound volume',
      paragraphs: [
        'Overland Park, Olathe, Lenexa, Leawood, and Shawnee form Kansas\'s premier suburban pentagon — Blue Valley and Olathe USD 233 school prestige, Corporate Woods employment density, and Kansas City metro spillover from Missouri without Missouri income tax on the Kansas side of the line. Summer builder closing clusters (May–August) and Kansas City corporate transfer season tighten Johnson County delivery windows along I-435 and K-10 corridors.',
        'Leawood estates, Lenexa City Center towers, and Olathe new-build HOA move-day rules each create different final-mile requirements — a Town Center Plaza high-rise COI delivery, a Cedar Creek cul-de-sac shuttle truck, and a Shawnee historic-lane long carry should never share the same accessorial assumptions. Book 6–10 weeks ahead for peak metro closings.',
      ],
    },
    {
      heading: 'Why university towns, Wichita aviation, and Topeka attract distinct inbound households',
      paragraphs: [
        'Lawrence and Manhattan serve households prioritizing Mass Street walkability, KU literary and research culture, KSU agricultural innovation employment, and Flint Hills outdoor horizon without Denver or Austin price tags. Cedar Rapids-style affordability meets progressive community energy in Lawrence; Manhattan adds Big 12 campus-town bike culture and defense-research spillover from Fort Riley proximity.',
        'Wichita and Andover anchor south-central Kansas inbound — Spirit AeroSystems and aviation supplier employment, Old Town loft conversions, and Andover\'s Butler County school reputation for families who want Wichita employment access without Sedgwick County urban density. Topeka provides state capital and government employment stability with a revitalized downtown for buyers who prioritize predictable public-sector careers over Johnson County premiums.',
      ],
    },
  ],
  resourceLinks: [
    {
      title: 'Browse Johnson County local movers',
      description: 'Overland Park, Olathe, Lenexa, Leawood, and Shawnee coverage.',
      href: '/local-movers/kansas/johnson',
    },
    {
      title: 'Browse Douglas County local movers',
      description: 'Lawrence and University of Kansas corridor relocations.',
      href: '/local-movers/kansas/douglas',
    },
    {
      title: 'Browse Riley County local movers',
      description: 'Manhattan and Kansas State University relocations.',
      href: '/local-movers/kansas/riley',
    },
    {
      title: 'Browse Sedgwick County local movers',
      description: 'Wichita aerospace hub and Old Town corridor moves.',
      href: '/local-movers/kansas/sedgwick',
    },
    {
      title: 'Browse Butler County local movers',
      description: 'Andover and greater Wichita metro spillover relocations.',
      href: '/local-movers/kansas/butler',
    },
    {
      title: 'Browse Shawnee County local movers',
      description: 'Topeka capital-region and government employment moves.',
      href: '/local-movers/kansas/shawnee',
    },
    {
      title: 'Browse Missouri local movers',
      description: 'Compare KS with Kansas City metro and Missouri border county relocations.',
      href: '/local-movers/missouri',
    },
    {
      title: 'Illinois destination cluster',
      description: 'Compare KS with Chicago suburbs and downstate alternatives.',
      href: '/moving-to/illinois',
    },
    {
      title: 'Oklahoma destination cluster',
      description: 'Compare KS with Oklahoma City and Tulsa corridor relocations.',
      href: '/moving-to/oklahoma',
    },
    {
      title: 'Iowa destination cluster',
      description: 'Compare KS with Des Moines metro and university-town alternatives.',
      href: '/moving-to/iowa',
    },
    {
      title: 'Verify any mover\'s USDOT & MC number',
      description: 'Step-by-step FMCSA lookup before booking.',
      href: '/resources/fmcsa',
    },
    {
      title: 'All popular destinations',
      description: 'Kansas, Missouri, Illinois, and nationwide hubs.',
      href: '/moving-to',
    },
  ],
};
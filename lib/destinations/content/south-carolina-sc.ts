import type { DestinationResourceLink } from '@/lib/destinations/types';

export type SouthCarolinaCorridorCity = {
  slug: string;
  displayName: string;
  zip: string;
  tagline: string;
};

export type SouthCarolinaClusterContent = {
  h1: string;
  seo: {
    title: string;
    description: string;
    keywords: string[];
    canonicalPath: string;
  };
  heroSubheadline: string;
  introParagraphs: string[];
  grandStrandCorridor: SouthCarolinaCorridorCity[];
  lowcountryUpstateCorridor: SouthCarolinaCorridorCity[];
  bodySections: { heading: string; paragraphs: string[] }[];
  resourceLinks: DestinationResourceLink[];
};

export const southCarolinaClusterContent: SouthCarolinaClusterContent = {
  h1: 'Moving to South Carolina: Grand Strand, Lowcountry & Statewide City Guides & Trusted Movers',
  seo: {
    title:
      'Moving to South Carolina (2026) — Destination Guides, Costs & Free Quotes | Move Trust Hub',
    description:
      'Explore South Carolina inbound moving guides for Myrtle Beach, North Myrtle Beach, Murrells Inlet, Hilton Head, Greenville, and the Grand Strand. No retirement income tax, FMCSA-verified movers, free calculator. Independent directory.',
    keywords: [
      'moving to south carolina',
      'south carolina movers',
      'myrtle beach grand strand movers',
      'best cities to move to in south carolina 2026',
      'south carolina retirement relocation',
      'grand strand moving costs',
      'hilton head greenville movers',
    ],
    canonicalPath: '/moving-to/south-carolina',
  },
  heroSubheadline:
    'South Carolina ranks among the top coastal and retiree inbound states in 2026 — drawing Northeast and Midwest households to the Grand Strand\'s 3.88:1 inbound ratio, Lowcountry island living, and affordable Upstate manufacturing corridors. With no state income tax on retirement benefits and a coast-to-mountains lifestyle range, our independent directory covers FMCSA-licensed interstate movers, county-level local directories, and city-specific guides with cost tables and free quote matching.',
  introParagraphs: [
    'Whether you are targeting Myrtle Beach and the nine-city Grand Strand corridor, Hilton Head\'s gated Lowcountry communities, or Greenville–Spartanburg\'s Upstate job growth, the relocation fundamentals are identical: document your inventory with our free calculator, verify every carrier on FMCSA.gov, and compare multiple quotes on equal cubic footage before signing.',
    'Move Trust Hub is an independent informational directory — we are not affiliated with, endorsed by, or a partner of the moving companies listed. South Carolina moves involve coastal logistics that inland guides overlook: summer peak-season scheduling on the Grand Strand, condo elevator protocols, gated-community shuttle trucks, hurricane contingency planning, and bridge access to barrier islands — factors our city guides surface so you can plan with confidence.',
    'Nine live Grand Strand hubs span Myrtle Beach through Carolina Forest — each with 2026–2027 cost tables, calculator prefill by ZIP, and Horry and Georgetown county mover directories. Browse each city guide below or explore additional South Carolina markets launching across the Lowcountry and Upstate.',
  ],
  grandStrandCorridor: [
    {
      slug: 'myrtle-beach-sc',
      displayName: 'Myrtle Beach',
      zip: '29577',
      tagline: 'Flagship Grand Strand · 3.88:1 inbound ratio · boardwalk & entertainment district',
    },
    {
      slug: 'north-myrtle-beach',
      displayName: 'North Myrtle Beach',
      zip: '29582',
      tagline: 'Shag dance & Main Street · Cherry Grove · family northern Strand',
    },
    {
      slug: 'surfside-beach',
      displayName: 'Surfside Beach',
      zip: '29575',
      tagline: 'Family Beach · pier town charm · residential coastal living',
    },
    {
      slug: 'atlantic-beach',
      displayName: 'Atlantic Beach',
      zip: '29582',
      tagline: 'Historic beach town heritage · oceanfront community',
    },
    {
      slug: 'garden-city-beach',
      displayName: 'Garden City Beach',
      zip: '29576',
      tagline: 'Pier village · Horry + Georgetown counties · rental corridor',
    },
    {
      slug: 'little-river',
      displayName: 'Little River',
      zip: '29566',
      tagline: 'Calabash seafood · Intracoastal · NC border gateway',
    },
    {
      slug: 'murrells-inlet',
      displayName: 'Murrells Inlet',
      zip: '29576',
      tagline: 'MarshWalk seafood · inlet boating · marsh-front homes',
    },
    {
      slug: 'socastee',
      displayName: 'Socastee',
      zip: '29588',
      tagline: 'Inland suburb · affordable single-family · Intracoastal access',
    },
    {
      slug: 'carolina-forest',
      displayName: 'Carolina Forest',
      zip: '29579',
      tagline: 'Master-planned golf communities · fastest-growing Horry suburb',
    },
  ],
  lowcountryUpstateCorridor: [
    {
      slug: 'hilton-head',
      displayName: 'Hilton Head',
      zip: '29928',
      tagline: 'Premium Lowcountry island · gated retiree communities · bridge access',
    },
    {
      slug: 'greenville-spartanburg',
      displayName: 'Greenville–Spartanburg',
      zip: '29601',
      tagline: 'Upstate SC manufacturing · affordable vs Charlotte · logistics growth',
    },
  ],
  bodySections: [
    {
      heading: 'Why South Carolina drives coastal and retiree inbound migration in 2026',
      paragraphs: [
        'South Carolina captures sustained Northeast and Midwest household moves through a combination of coastal affordability relative to New Jersey and New York, favorable tax treatment for retirees, and year-round outdoor living from the Grand Strand to the Lowcountry. The Myrtle Beach metro posts one of the highest inbound ratios among U.S. destinations — 3.88:1 in 2026 migration data — while Hilton Head and Beaufort County attract premium downsizers seeking island and marsh-front lifestyles.',
        'Beyond the coast, Greenville–Spartanburg offers manufacturing, logistics, and BMW-supplier employment at price points well below Charlotte — making Upstate South Carolina a value alternative for families priced out of North Carolina\'s banking corridor. Interstate moves into South Carolina typically originate from New York, New Jersey, Pennsylvania, Ohio, and Florida, with summer peak season (May–September) tightening Grand Strand carrier schedules.',
        'Our nine Grand Strand city hubs include 2026–2027 cost tables, calculator prefill by ZIP, cross-links between northern and southern Strand communities, and the New York–Myrtle Beach route guide for Northeast origin households.',
      ],
    },
    {
      heading: 'Why the Grand Strand corridor leads South Carolina inbound volume',
      paragraphs: [
        'The Myrtle Beach–North Myrtle Beach–Surfside Beach–Murrells Inlet corridor captures the full Grand Strand relocation spectrum: entertainment-district condos in Myrtle Beach, family-oriented northern Strand beaches, historic Atlantic Beach heritage, Garden City pier villages, Little River Intracoastal dining, MarshWalk seafood waterfront in Murrells Inlet, inland affordability in Socastee, and master-planned golf communities in Carolina Forest.',
        'Interstate deliveries into Horry and Georgetown counties share summer peak-season premiums, condo COI requirements, and gated-community shuttle protocols. Compared to Florida\'s snowbird corridor, the Grand Strand offers shorter mileage from Northeast origins and strong retiree and remote-worker appeal without Florida hurricane insurance complexity in many inland Strand neighborhoods.',
      ],
    },
    {
      heading: 'South Carolina statewide appeal beyond the beach',
      paragraphs: [
        'South Carolina\'s no state income tax on retirement benefits, combined with beaches-to-mountains geography within a half-day drive, makes the state attractive for households comparing Florida, Tennessee, and North Carolina. The Lowcountry\'s Hilton Head and Beaufort County gated communities serve premium retiree inbound, while Greenville–Spartanburg captures manufacturing and logistics job growth at lower housing costs than Charlotte.',
        'For cross-state research, compare our North Carolina cluster for Charlotte and Research Triangle alternatives minutes north of the Grand Strand, or our Florida and Tennessee hubs for Sunbelt tax-advantage comparisons.',
      ],
    },
  ],
  resourceLinks: [
    {
      title: 'Browse Horry County local movers',
      description: 'Myrtle Beach, North Myrtle Beach, and Grand Strand carriers.',
      href: '/local-movers/south-carolina/horry',
    },
    {
      title: 'Browse Georgetown County local movers',
      description: 'Murrells Inlet, Garden City, and southern Strand moves.',
      href: '/local-movers/south-carolina/georgetown',
    },
    {
      title: 'Browse Beaufort County local movers',
      description: 'Hilton Head and Lowcountry island deliveries.',
      href: '/local-movers/south-carolina/beaufort',
    },
    {
      title: 'Browse Greenville County local movers',
      description: 'Upstate SC manufacturing and suburban relocations.',
      href: '/local-movers/south-carolina/greenville',
    },
    {
      title: 'New York to Myrtle Beach route guide',
      description: 'Mileage, timing, and cost factors for Northeast-to-Grand-Strand moves.',
      href: '/resources/routes/new-york-to-myrtle-beach',
    },
    {
      title: 'North Carolina moving destinations hub',
      description: 'Compare SC coast with Charlotte, Raleigh, and Wilmington NC.',
      href: '/moving-to/north-carolina',
    },
    {
      title: 'Florida moving destinations hub',
      description: 'Compare South Carolina with Florida Sunbelt markets.',
      href: '/moving-to/florida',
    },
    {
      title: 'Verify any mover\'s USDOT & MC number',
      description: 'Step-by-step FMCSA lookup before booking.',
      href: '/resources/fmcsa',
    },
    {
      title: 'All popular destinations',
      description: 'South Carolina, North Carolina, Florida, Tennessee, and more.',
      href: '/moving-to',
    },
  ],
};
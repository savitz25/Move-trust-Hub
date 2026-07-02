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
  upstateCorridor: SouthCarolinaCorridorCity[];
  lowcountryCorridor: SouthCarolinaCorridorCity[];
  bodySections: { heading: string; paragraphs: string[] }[];
  resourceLinks: DestinationResourceLink[];
};

export const southCarolinaClusterContent: SouthCarolinaClusterContent = {
  h1: 'Moving to South Carolina: Grand Strand, Upstate & Lowcountry City Guides & Trusted Movers',
  seo: {
    title:
      'Moving to South Carolina (2026) — Destination Guides, Costs & Trusted Movers | Move Trust Hub',
    description:
      'Explore South Carolina inbound moving guides for Myrtle Beach, Greenville, Spartanburg, Hilton Head, and the full Grand Strand. Coastal, Upstate, and Lowcountry corridors, FMCSA-verified movers, free calculator. Independent directory.',
    keywords: [
      'moving to south carolina',
      'south carolina movers',
      'myrtle beach grand strand movers',
      'greenville spartanburg movers',
      'hilton head moving',
      'best cities to move to in south carolina 2026',
      'south carolina retirement relocation',
      'upstate sc relocation',
      'lowcountry south carolina moving',
    ],
    canonicalPath: '/moving-to/south-carolina',
  },
  heroSubheadline:
    'South Carolina ranks among the top coastal, Upstate, and retiree inbound states in 2026 — drawing Northeast and Midwest households to the Grand Strand\'s 3.88:1 inbound ratio, Greenville and Spartanburg\'s BMW-driven manufacturing boom, and Hilton Head\'s premier Lowcountry island lifestyle. With no state income tax on retirement benefits and geography from beaches to Blue Ridge foothills, our independent directory covers FMCSA-licensed interstate movers, county-level local directories, and twelve city-specific guides with cost tables and free quote matching.',
  introParagraphs: [
    'Whether you are targeting Myrtle Beach and the nine-city Grand Strand corridor, Greenville\'s vibrant downtown and Falls Park on the Reedy, Spartanburg\'s automotive and logistics employment, or Hilton Head\'s gated resort communities and world-class golf, the relocation fundamentals are identical: document your inventory with our free calculator, verify every carrier on FMCSA.gov, and compare movers directly on equal cubic footage before signing.',
    'Move Trust Hub is an independent informational directory — we are not affiliated with, endorsed by, or a partner of the moving companies listed. South Carolina moves involve corridor-specific logistics that generic guides overlook: summer peak-season Grand Strand scheduling, Upstate BMW-supplier corporate transfers, Hilton Head bridge access and gated-community shuttle trucks, hurricane contingency planning on the coast, and condo elevator protocols — factors our city guides surface so you can plan with confidence.',
    'Twelve live South Carolina hubs span three major corridors: Grand Strand Coastal (Myrtle Beach through Carolina Forest), Upstate (Greenville and Spartanburg), and Lowcountry (Hilton Head). Browse each city guide below for 2026–2027 cost tables, calculator prefill by ZIP, and county-level mover directories.',
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
  upstateCorridor: [
    {
      slug: 'greenville-sc',
      displayName: 'Greenville',
      zip: '29601',
      tagline: 'Upstate powerhouse · Falls Park · BMW/Michelin · tech & manufacturing',
    },
    {
      slug: 'spartanburg-sc',
      displayName: 'Spartanburg',
      zip: '29301',
      tagline: 'Automotive hub · BMW supplier corridor · affordable family living',
    },
  ],
  lowcountryCorridor: [
    {
      slug: 'hilton-head-sc',
      displayName: 'Hilton Head',
      zip: '29928',
      tagline: 'Premier resort island · golf & beaches · luxury retirement & second homes',
    },
  ],
  bodySections: [
    {
      heading: 'Why South Carolina drives coastal, Upstate, and retiree inbound migration in 2026',
      paragraphs: [
        'South Carolina captures sustained Northeast and Midwest household moves through a combination of coastal affordability relative to New Jersey and New York, favorable tax treatment for retirees, and year-round outdoor living from the Grand Strand to the Lowcountry. The Myrtle Beach metro posts one of the highest inbound ratios among U.S. destinations — 3.88:1 in 2026 migration data — while Hilton Head attracts premium downsizers seeking island golf and marsh-front lifestyles.',
        'Upstate South Carolina has emerged as a parallel growth story. Greenville anchors a revitalized downtown with Falls Park on the Reedy, a thriving food scene, and BMW and Michelin supplier employment that draws engineers and manufacturing professionals from Charlotte, Atlanta, and the Northeast at lower housing costs. Spartanburg complements Greenville with automotive industrial depth, strong higher-education institutions (Wofford, Converse, USC Upstate), and affordable family suburbs along the I-85 corridor.',
        'Interstate moves into South Carolina typically originate from New York, New Jersey, Pennsylvania, Ohio, and Florida. Summer peak season (May–September) tightens Grand Strand carrier schedules, while Upstate corporate transfers peak around fiscal-year hiring cycles. Compare quotes on identical inventory across corridors rather than choosing the lowest phone estimate.',
      ],
    },
    {
      heading: 'Why the Grand Strand corridor leads South Carolina coastal inbound volume',
      paragraphs: [
        'The Myrtle Beach–North Myrtle Beach–Surfside Beach–Murrells Inlet corridor captures the full Grand Strand relocation spectrum: entertainment-district condos in Myrtle Beach, family-oriented northern Strand beaches, historic Atlantic Beach heritage, Garden City pier villages, Little River Intracoastal dining, MarshWalk seafood waterfront in Murrells Inlet, inland affordability in Socastee, and master-planned golf communities in Carolina Forest.',
        'Interstate deliveries into Horry and Georgetown counties share summer peak-season premiums, condo COI requirements, and gated-community shuttle protocols. Compared to Florida\'s snowbird corridor, the Grand Strand offers shorter mileage from Northeast origins and strong retiree and remote-worker appeal.',
      ],
    },
    {
      heading: 'Upstate and Lowcountry corridors complete the South Carolina relocation map',
      paragraphs: [
        'Greenville and Spartanburg serve households comparing Charlotte and Atlanta who want manufacturing and logistics jobs without big-metro housing premiums. Greenville\'s downtown renaissance, Blue Ridge foothill access, and growing tech sector attract young professionals and families; Spartanburg\'s BMW ecosystem and logistics growth capture workforce housing demand at even lower price points.',
        'Hilton Head Island defines South Carolina\'s premium Lowcountry inbound market — gated golf communities, bridge-only island access, luxury retirement and second-home demand, and world-class dining and shopping in a relaxed coastal setting. Deliveries require bridge timing coordination, HOA move-in certificates, and often shuttle trucks from mainland staging areas.',
        'For cross-state research, compare our North Carolina cluster for Charlotte and Research Triangle alternatives, or our Florida and Tennessee hubs for Sunbelt tax-advantage comparisons.',
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
      title: 'Browse Greenville County local movers',
      description: 'Greenville Upstate mover directory with FMCSA licensing.',
      href: '/local-movers/south-carolina/greenville',
    },
    {
      title: 'Browse Spartanburg County local movers',
      description: 'Spartanburg automotive and logistics corridor directory.',
      href: '/local-movers/south-carolina/spartanburg',
    },
    {
      title: 'Browse Beaufort County local movers',
      description: 'Hilton Head and Lowcountry island deliveries.',
      href: '/local-movers/south-carolina/beaufort',
    },
    {
      title: 'New Jersey to South Carolina route guide',
      description: 'Grand Strand, Lowcountry, and Upstate pricing from NJ origins on I-95.',
      href: '/resources/routes/new-jersey-to-south-carolina',
    },
    {
      title: 'Pennsylvania to South Carolina route guide',
      description: 'Philly, Pittsburgh, and statewide PA origins to Grand Strand and Upstate SC.',
      href: '/resources/routes/pennsylvania-to-south-carolina',
    },
    {
      title: 'Massachusetts to South Carolina route guide',
      description: 'Boston, Cape Cod, and statewide MA origins to Grand Strand and Upstate SC.',
      href: '/resources/routes/massachusetts-to-south-carolina',
    },
    {
      title: 'Minnesota to South Carolina route guide',
      description: 'Twin Cities and lake-country MN origins to Grand Strand and Upstate SC.',
      href: '/resources/routes/minnesota-to-south-carolina',
    },
    {
      title: 'New York to Myrtle Beach route guide',
      description: 'Mileage, timing, and cost factors for Northeast-to-Grand-Strand moves.',
      href: '/resources/routes/new-york-to-myrtle-beach',
    },
    {
      title: 'North Carolina moving destinations hub',
      description: 'Compare SC with Charlotte, Raleigh, and Wilmington NC.',
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

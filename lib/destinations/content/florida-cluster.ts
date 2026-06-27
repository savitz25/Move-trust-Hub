import type { DestinationResourceLink } from '@/lib/destinations/types';

export type FloridaCorridorCity = {
  slug: string;
  displayName: string;
  zip: string;
  tagline: string;
};

export type FloridaClusterContent = {
  h1: string;
  seo: {
    title: string;
    description: string;
    keywords: string[];
    canonicalPath: string;
  };
  heroSubheadline: string;
  introParagraphs: string[];
  miamiDadeBrowardCorridor: FloridaCorridorCity[];
  palmBeachCorridor: FloridaCorridorCity[];
  centralNorthFloridaCorridor: FloridaCorridorCity[];
  bodySections: { heading: string; paragraphs: string[] }[];
  resourceLinks: DestinationResourceLink[];
};

export const floridaClusterContent: FloridaClusterContent = {
  h1: 'Moving to Florida: South Florida, Gulf Coast & Central Florida City Guides & Trusted Movers',
  seo: {
    title:
      'Moving to Florida (2026) — Destination Guides, Costs & Free Quotes | Move Trust Hub',
    description:
      'Explore Florida inbound moving guides for Miami, Fort Lauderdale, Boca Raton, Jacksonville, Naples, Sarasota, St. Augustine, Ocala, Wildwood, and more. FMCSA-verified movers, free calculator, and transparent cost data. Independent directory.',
    keywords: [
      'moving to florida',
      'florida movers',
      'best cities to move to in florida 2026',
      'miami dade broward movers',
      'palm beach county movers',
      'jacksonville naples sarasota movers',
      'central florida relocation guide',
      'florida interstate moving costs',
    ],
    canonicalPath: '/moving-to/florida',
  },
  heroSubheadline:
    'Florida remains the highest-volume Sunbelt inbound corridor in 2026 — drawing retirees, remote workers, and families from the Northeast, Midwest, and California. Our independent directory covers FMCSA-licensed interstate movers, county-level local directories, and city-specific guides with cost tables and free quote matching.',
  introParagraphs: [
    'Whether you are targeting the Miami-Dade and Broward metro, the Palm Beach County coastal corridor, northeast Florida around Jacksonville, or Gulf Coast markets like Sarasota and Naples, the relocation fundamentals are identical: document your inventory with our free calculator, verify every carrier on FMCSA.gov, and compare multiple quotes on equal cubic footage before signing.',
    'Move Trust Hub is an independent informational directory — we are not affiliated with, endorsed by, or a partner of the moving companies listed. Florida moves involve unique logistics: snowbird-season scheduling, hurricane contingency planning, condo COI requirements, and gated-community shuttle trucks. Our city guides surface these factors so you can plan with confidence.',
    'Fourteen live Florida hubs now span three corridors: Miami-Dade and Broward (Miami through Pompano Beach), Palm Beach County (Boca Raton through Deerfield Beach), and Central & North Florida (Jacksonville through Wildwood). Browse each city guide below for 2026 cost tables, calculator prefill by ZIP, and county-level mover directories.',
  ],
  miamiDadeBrowardCorridor: [
    {
      slug: 'miami',
      displayName: 'Miami',
      zip: '33101',
      tagline: 'Urban coastal hub · Brickell · Miami Beach · international inbound',
    },
    {
      slug: 'fort-lauderdale',
      displayName: 'Fort Lauderdale',
      zip: '33301',
      tagline: 'Yachting capital · Las Olas · Intracoastal waterfront lifestyle',
    },
    {
      slug: 'hollywood',
      displayName: 'Hollywood',
      zip: '33020',
      tagline: 'Broadwalk beach living · family suburbs · ArtsPark district',
    },
    {
      slug: 'pompano-beach',
      displayName: 'Pompano Beach',
      zip: '33060',
      tagline: 'Affordable Broward beach · fishing pier · boating communities',
    },
  ],
  palmBeachCorridor: [
    {
      slug: 'boca-raton',
      displayName: 'Boca Raton',
      zip: '33432',
      tagline: 'Affluent luxury corridor · Mizner Park · gated estates & high-rises',
    },
    {
      slug: 'delray-beach',
      displayName: 'Delray Beach',
      zip: '33444',
      tagline: 'Atlantic Avenue arts district · walkable downtown · beach condos',
    },
    {
      slug: 'boynton-beach',
      displayName: 'Boynton Beach',
      zip: '33435',
      tagline: 'Value-oriented Palm Beach living · families · Oceanfront Park',
    },
    {
      slug: 'deerfield-beach',
      displayName: 'Deerfield Beach',
      zip: '33441',
      tagline: 'Palm Beach–Broward border · boating · Quiet Waters · family suburbs',
    },
  ],
  centralNorthFloridaCorridor: [
    {
      slug: 'jacksonville',
      displayName: 'Jacksonville',
      zip: '32202',
      tagline: 'Northeast metro · Beaches · St. Johns River · military · affordable vs South FL',
    },
    {
      slug: 'st-augustine',
      displayName: 'St. Augustine',
      zip: '32084',
      tagline: 'Historic coast · Castillo de San Marcos · Spanish colonial charm · beaches',
    },
    {
      slug: 'sarasota',
      displayName: 'Sarasota',
      zip: '34236',
      tagline: 'Arts & culture hub · Ringling Museum · Siesta Key · downtown walkability',
    },
    {
      slug: 'naples',
      displayName: 'Naples',
      zip: '34102',
      tagline: 'Luxury Gulf Coast · 5th Avenue South · golf · high-end retirement',
    },
    {
      slug: 'ocala',
      displayName: 'Ocala',
      zip: '34471',
      tagline: 'Horse country · Silver Springs · affordable central Florida · equestrian estates',
    },
    {
      slug: 'wildwood',
      displayName: 'Wildwood',
      zip: '34785',
      tagline: 'Central growth corridor · The Villages proximity · affordable suburban expansion',
    },
  ],
  bodySections: [
    {
      heading: 'Why the Miami-Dade and Broward corridor drives urban South Florida inbound volume',
      paragraphs: [
        'The Miami–Fort Lauderdale–Hollywood–Pompano Beach corridor captures the full spectrum of dense South Florida relocation intent: international professionals and Brickell high-rise households in Miami, yachting and Intracoastal lifestyles in Fort Lauderdale, family Broadwalk beach living in Hollywood, and affordable boating-community appeal in Pompano Beach. Miami-Dade and Broward counties share Fort Lauderdale-Hollywood International Airport, Port Everglades, and I-95 / Turnpike access while offering distinct urban-to-suburban price gradients.',
        'Interstate moves into this corridor typically originate from New York, New Jersey, Massachusetts, Pennsylvania, California, and Illinois. Snowbird season (October–April) tightens southbound carrier schedules and adds 10–25% to linehaul rates. High-rise COI requirements, causeway traffic in Miami-Dade, and beach-condo elevator reservations in Broward are standard destination accessorials.',
        'Our four Miami-Dade / Broward hubs include 2026 cost tables, calculator prefill by ZIP, county mover directories, and cross-links to the Palm Beach corridor and New York–Florida route guide.',
      ],
    },
    {
      heading: 'Why the Palm Beach County corridor leads luxury and retiree inbound volume',
      paragraphs: [
        'The Boca Raton–Delray Beach–Boynton Beach–Deerfield Beach corridor captures luxury downsizers, arts-district households, value-seeking families, and boating-oriented residents along Palm Beach County\'s coast. All four cities share Palm Beach International Airport and I-95 access while offering distinct price points from Boca\'s luxury towers to Boynton\'s value market.',
        'Interstate moves into Palm Beach County share the same snowbird and hurricane-season dynamics as Broward and Miami-Dade. Luxury high-rise protocols in Boca Raton and Atlantic Avenue logistics in Delray Beach are the primary destination cost drivers beyond base linehaul.',
      ],
    },
    {
      heading: 'Why Central and North Florida drives value-seeking inbound volume',
      paragraphs: [
        'The Jacksonville–St. Augustine northeast corridor captures military PCS relocations, finance-and-logistics job growth, and Northeast households seeking Atlantic beach access at price points below Miami-Dade. Jacksonville\'s Riverside, San Marco, and Mandarin neighborhoods and the Beaches communities of Jax Beach, Atlantic Beach, and Neptune Beach each carry distinct parking, flood-zone, and bridge-traffic logistics that affect delivery scheduling.',
        'St. Augustine adds historic-district access constraints — narrow streets, tourism-season traffic, and strict move windows near St. George Street and the Castillo de San Marcos — alongside Vilano Beach and Ponte Vedra spillover in St. Johns County. Compared to South Florida, northeast Florida interstate linehaul from Northeast origins is often shorter and snowbird premiums are less pronounced, though summer hurricane contingency planning still applies.',
      ],
    },
    {
      heading: 'Why the Gulf Coast and central corridor attract retirees and remote workers',
      paragraphs: [
        'Sarasota and Naples anchor Florida\'s Gulf Coast inbound mix: Sarasota draws arts-and-culture households to the Ringling Museum corridor, downtown, and Siesta Key beaches, while Naples attracts luxury retirees and snowbirds to 5th Avenue South, Pelican Bay, and gated golf communities in Collier County. Both markets share October–April snowbird tightening and gated-community shuttle requirements, with Naples commanding premium specialty-item and white-glove accessorials.',
        'Ocala and Wildwood serve central Florida\'s affordability corridor — horse-country equestrian estates and Silver Springs recreation in Marion County, plus Wildwood\'s rapid suburban growth adjacent to The Villages in Sumter County. Active-adult community move-day restrictions, new-construction HOA rules, and summer heat scheduling are the primary destination cost drivers beyond base linehaul. Our six Central & North Florida hubs include 2026–2027 cost tables, calculator prefill by ZIP, and cross-links to Duval, St. Johns, Sarasota, Collier, Marion, and Sumter county directories.',
      ],
    },
  ],
  resourceLinks: [
    {
      title: 'Browse Miami-Dade County local movers',
      description: 'Vetted companies with high-rise, luxury, and urban move experience.',
      href: '/local-movers/florida/miami-dade',
    },
    {
      title: 'Browse Broward County local movers',
      description: 'Fort Lauderdale, Hollywood, Pompano Beach, and coastal Broward carriers.',
      href: '/local-movers/florida/broward',
    },
    {
      title: 'Browse Palm Beach County local movers',
      description: '10+ vetted companies with ratings, services, and luxury-move experience.',
      href: '/local-movers/florida/palm-beach',
    },
    {
      title: 'Browse Duval County local movers',
      description: 'Jacksonville, the Beaches, and northeast Florida interstate carriers.',
      href: '/local-movers/florida/duval',
    },
    {
      title: 'Browse Collier County local movers',
      description: 'Naples luxury moves, gated communities, and Gulf Coast shuttle experience.',
      href: '/local-movers/florida/collier',
    },
    {
      title: 'Browse Sarasota County local movers',
      description: 'Gulf Coast condos, arts-district deliveries, and Siesta Key access.',
      href: '/local-movers/florida/sarasota',
    },
    {
      title: 'Browse Marion County local movers',
      description: 'Ocala horse-country estates and central Florida suburban moves.',
      href: '/local-movers/florida/marion',
    },
    {
      title: 'Browse St. Johns County local movers',
      description: 'St. Augustine historic district and Ponte Vedra coastal deliveries.',
      href: '/local-movers/florida/st-johns',
    },
    {
      title: 'Browse Sumter County local movers',
      description: 'Wildwood, The Villages corridor, and active-adult community protocols.',
      href: '/local-movers/florida/sumter',
    },
    {
      title: 'New York to Florida route guide',
      description: 'Mileage, timing, and cost factors for Northeast-to-Florida interstate moves.',
      href: '/resources/routes/new-york-to-florida',
    },
    {
      title: 'New Jersey to Florida route guide',
      description: 'Snowbird corridor pricing, NJ pickup tips, and Florida delivery logistics.',
      href: '/resources/routes/new-jersey-to-florida',
    },
    {
      title: 'New Jersey to South Carolina route guide',
      description: 'Shorter I-95 corridor to the Grand Strand and Upstate from New Jersey.',
      href: '/resources/routes/new-jersey-to-south-carolina',
    },
    {
      title: 'Verify any mover\'s USDOT & MC number',
      description: 'Step-by-step FMCSA lookup before booking.',
      href: '/resources/fmcsa',
    },
    {
      title: 'All popular destinations',
      description: 'Myrtle Beach, Florida, Texas, the Carolinas, and more.',
      href: '/moving-to',
    },
  ],
};
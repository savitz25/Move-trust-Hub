import type { DestinationResourceLink } from '@/lib/destinations/types';

export type TexasCorridorCity = {
  slug: string;
  displayName: string;
  zip: string;
  tagline: string;
};

export type TexasClusterContent = {
  h1: string;
  seo: {
    title: string;
    description: string;
    keywords: string[];
    canonicalPath: string;
  };
  heroSubheadline: string;
  introParagraphs: string[];
  dfwMetroCorridor: TexasCorridorCity[];
  majorMetrosCorridor: TexasCorridorCity[];
  westTexasCorridor: TexasCorridorCity[];
  bodySections: { heading: string; paragraphs: string[] }[];
  resourceLinks: DestinationResourceLink[];
};

export const texasClusterContent: TexasClusterContent = {
  h1: 'Moving to Texas: DFW, Austin, Houston & Statewide City Guides & Trusted Movers',
  seo: {
    title:
      'Moving to Texas (2026) — Destination Guides, Costs & Free Quotes | Move Trust Hub',
    description:
      'Explore Texas inbound moving guides for Dallas–Fort Worth, Austin, Houston, San Antonio, El Paso, Arlington, and more. No state income tax, FMCSA-verified movers, free calculator, and transparent cost data. Independent directory.',
    keywords: [
      'moving to texas',
      'texas movers',
      'best cities to move to in texas 2026',
      'dallas fort worth movers',
      'austin houston movers',
      'texas no income tax relocation',
      'dfw moving costs',
      'texas interstate moving costs',
    ],
    canonicalPath: '/moving-to/texas',
  },
  heroSubheadline:
    'Texas remains America\'s leading job-growth state for interstate household moves in 2026 — drawing California and Illinois transferees, energy-sector professionals, tech workers, and military families with no state income tax, diverse metro economies, and housing affordability relative to coastal markets. Our independent directory covers FMCSA-licensed interstate movers, county-level local directories, and city-specific guides with cost tables and free quote matching.',
  introParagraphs: [
    'Whether you are targeting Dallas–Fort Worth\'s corporate headquarters corridor and Frisco–Plano–McKinney suburbs, Austin\'s Silicon Hills tech boom, Houston\'s energy and medical center employment, or San Antonio\'s military-and-family affordability, the relocation fundamentals are identical: document your inventory with our free calculator, verify every carrier on FMCSA.gov, and compare multiple quotes on equal cubic footage before signing.',
    'Move Trust Hub is an independent informational directory — we are not affiliated with, endorsed by, or a partner of the moving companies listed. Texas moves involve distinct logistics: hurricane contingency planning on the Gulf Coast, Permian Basin housing-cycle scheduling in Midland–Odessa, DFW suburban shuttle trucks on narrow new-build streets, and Fort Bliss PCS timelines in El Paso — factors our city guides surface so you can plan with confidence.',
    'Ten live Texas hubs span the DFW metro ring (Dallas–Fort Worth through Grand Prairie), major metros (Austin, Houston, San Antonio), and West Texas growth corridors (El Paso, Lubbock, Midland–Odessa). Browse each city guide below for 2026–2027 cost tables, calculator prefill by ZIP, and county-level mover directories.',
  ],
  dfwMetroCorridor: [
    {
      slug: 'dallas-fort-worth-tx',
      displayName: 'Dallas–Fort Worth',
      zip: '75201',
      tagline: 'DFW Airport · corporate HQ · Frisco · Plano · McKinney suburb growth',
    },
    {
      slug: 'arlington-tx',
      displayName: 'Arlington',
      zip: '76010',
      tagline: 'Central Tarrant County · entertainment district · DFW spillover',
    },
    {
      slug: 'irving-tx',
      displayName: 'Irving',
      zip: '75038',
      tagline: 'Las Colinas corporate corridor · DFW Airport adjacency',
    },
    {
      slug: 'grand-prairie-tx',
      displayName: 'Grand Prairie',
      zip: '75050',
      tagline: 'Value DFW suburb · Dallas–Tarrant border · family-friendly',
    },
  ],
  majorMetrosCorridor: [
    {
      slug: 'austin-tx',
      displayName: 'Austin',
      zip: '78701',
      tagline: 'Silicon Hills tech · live music · Hill Country · young professionals',
    },
    {
      slug: 'houston-tx',
      displayName: 'Houston',
      zip: '77002',
      tagline: 'Energy capital · NASA · medical center · Woodlands · Katy',
    },
    {
      slug: 'san-antonio-tx',
      displayName: 'San Antonio',
      zip: '78205',
      tagline: 'Alamo historic charm · military bases · River Walk · affordable',
    },
  ],
  westTexasCorridor: [
    {
      slug: 'el-paso-tx',
      displayName: 'El Paso',
      zip: '79901',
      tagline: 'Fort Bliss military · border metro affordability · desert lifestyle',
    },
    {
      slug: 'lubbock-tx',
      displayName: 'Lubbock',
      zip: '79401',
      tagline: 'Texas Tech · West Texas affordability · prairie university hub',
    },
    {
      slug: 'midland-odessa-tx',
      displayName: 'Midland–Odessa',
      zip: '79701',
      tagline: 'Permian Basin energy corridor · job growth · housing demand cycles',
    },
  ],
  bodySections: [
    {
      heading: 'Why Texas leads U.S. inbound household migration in 2026',
      paragraphs: [
        'Texas captures the largest share of net domestic inbound moves among Sunbelt and growth states — driven by no state income tax, corporate headquarters relocations into Dallas and Austin, sustained California outflow into tech corridors, and energy-sector employment in Houston and the Permian Basin. DFW International Airport, the Port of Houston, and I-35 / I-45 / I-10 interstate access make Texas a natural destination for long-distance household shipments from every U.S. region.',
        'Compared to Florida or Tennessee, Texas offers greater metro diversity: finance and corporate HQ density in DFW, venture-backed tech in Austin, global energy and port logistics in Houston, military-and-family affordability in San Antonio, and cyclical energy growth in Midland–Odessa. Interstate pricing from California origins is often the highest-volume corridor, while Midwest and Northeast routes benefit from central U.S. geography.',
        'Our ten Texas city hubs include 2026–2027 cost tables, calculator prefill by ZIP, county mover directories, and cross-links between DFW suburbs and major metros so you can compare markets before choosing a destination.',
      ],
    },
    {
      heading: 'Why the Dallas–Fort Worth metro drives the highest Texas inbound volume',
      paragraphs: [
        'The Dallas–Fort Worth–Arlington–Irving–Grand Prairie corridor captures corporate transferees, finance professionals, and California downsizers seeking suburban space in Frisco, Plano, McKinney, and Collin County master-planned communities. DFW leads Texas net inbound volume with diverse job growth across finance, logistics, healthcare, and technology — all without state income tax.',
        'Interstate moves into north Texas typically originate from California, Illinois, New York, and Florida. Summer corporate relocation season (May–August) tightens delivery windows. Las Colinas high-rise COI requirements in Irving, new-build narrow streets in Collin County, and stadium-event traffic near Arlington are standard destination accessorials that should appear on your estimate before booking.',
      ],
    },
    {
      heading: 'Why Austin, Houston, and San Antonio anchor Texas lifestyle and industry diversity',
      paragraphs: [
        'Austin draws sustained California and New York tech inbound with Silicon Hills employment, live-music culture, and Hill Country outdoor lifestyle — though downtown high-rise and hill-country driveway access can add destination fees. Houston combines energy-sector transfers, Texas Medical Center employment, NASA/JSC proximity, and diverse international communities across Harris, Fort Bend, and Montgomery counties — with hurricane-season contingency planning essential June through November.',
        'San Antonio offers historic River Walk charm, Joint Base San Antonio military volume, and family-friendly affordability south of the Austin–DFW price curve. West Texas hubs — El Paso\'s Fort Bliss PCS corridor, Lubbock\'s Texas Tech university anchor, and Midland–Odessa\'s Permian Basin energy cycles — serve distinct inbound personas seeking affordability, military assignment, or energy-sector employment at price points well below coastal Texas metros.',
      ],
    },
  ],
  resourceLinks: [
    {
      title: 'Browse Dallas County local movers',
      description: 'Dallas, Irving, and north Texas interstate carriers.',
      href: '/local-movers/texas/dallas',
    },
    {
      title: 'Browse Tarrant County local movers',
      description: 'Fort Worth, Arlington, and west DFW metro movers.',
      href: '/local-movers/texas/tarrant',
    },
    {
      title: 'Browse Travis County local movers',
      description: 'Austin urban and Hill Country move experience.',
      href: '/local-movers/texas/travis',
    },
    {
      title: 'Browse Harris County local movers',
      description: 'Houston, Katy, and greater Houston carriers.',
      href: '/local-movers/texas/harris',
    },
    {
      title: 'Browse Bexar County local movers',
      description: 'San Antonio and greater metro relocations.',
      href: '/local-movers/texas/bexar',
    },
    {
      title: 'Browse Collin County local movers',
      description: 'Plano, Frisco, McKinney, and north DFW suburbs.',
      href: '/local-movers/texas/collin',
    },
    {
      title: 'California to Texas route guide',
      description: 'Mileage, timing, and cost factors for West Coast-to-Texas moves.',
      href: '/resources/routes/california-to-texas',
    },
    {
      title: 'Los Angeles to Dallas–Fort Worth route guide',
      description: 'The busiest CA→TX city pair — LA pickup tips and DFW delivery logistics.',
      href: '/resources/routes/los-angeles-to-dallas-fort-worth',
    },
    {
      title: 'San Francisco to Austin route guide',
      description: 'Tech relocation corridor pricing, Bay Area pickup, and Austin delivery tips.',
      href: '/resources/routes/san-francisco-to-austin',
    },
    {
      title: 'San Diego to Houston route guide',
      description: 'Southern California to Gulf Coast — SD origins and Houston suburban delivery.',
      href: '/resources/routes/san-diego-to-houston',
    },
    {
      title: 'New York to Texas route guide',
      description: 'NYC pickup tips, Texas destination insights, and 2026–2027 cost ranges.',
      href: '/resources/routes/new-york-to-texas',
    },
    {
      title: 'New Jersey to Texas route guide',
      description: 'NJ property-tax migration corridor — DFW, Austin, Houston, and San Antonio.',
      href: '/resources/routes/new-jersey-to-texas',
    },
    {
      title: 'Pennsylvania to Texas route guide',
      description: 'Philly and Pittsburgh to DFW, Austin, Houston, and San Antonio — 2026–2027 costs.',
      href: '/resources/routes/pennsylvania-to-texas',
    },
    {
      title: 'Massachusetts to Texas route guide',
      description: 'Boston and statewide MA to DFW, Austin, Houston, and San Antonio.',
      href: '/resources/routes/massachusetts-to-texas',
    },
    {
      title: 'Texas to California route guide',
      description: 'Reverse corridor pricing and seasonal factors.',
      href: '/resources/routes/texas-to-california',
    },
    {
      title: 'Florida moving destinations hub',
      description: 'Compare Texas with Florida Sunbelt inbound markets.',
      href: '/moving-to/florida',
    },
    {
      title: 'Verify any mover\'s USDOT & MC number',
      description: 'Step-by-step FMCSA lookup before booking.',
      href: '/resources/fmcsa',
    },
    {
      title: 'All popular destinations',
      description: 'Texas, Florida, Tennessee, Myrtle Beach, and more.',
      href: '/moving-to',
    },
  ],
};
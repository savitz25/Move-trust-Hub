import type { DestinationResourceLink } from '@/lib/destinations/types';

export type TennesseeCorridorCity = {
  slug: string;
  displayName: string;
  zip: string;
  tagline: string;
};

export type TennesseeClusterContent = {
  h1: string;
  seo: {
    title: string;
    description: string;
    keywords: string[];
    canonicalPath: string;
  };
  heroSubheadline: string;
  introParagraphs: string[];
  nashvilleMetroCorridor: TennesseeCorridorCity[];
  eastTennesseeCorridor: TennesseeCorridorCity[];
  bodySections: { heading: string; paragraphs: string[] }[];
  resourceLinks: DestinationResourceLink[];
};

export const tennesseeClusterContent: TennesseeClusterContent = {
  h1: 'Moving to Tennessee: Nashville Metro, East Tennessee & Statewide City Guides & Trusted Movers',
  seo: {
    title:
      'Moving to Tennessee (2026) — Destination Guides, Costs & Free Quotes | Move Trust Hub',
    description:
      'Explore Tennessee inbound moving guides for Nashville, Knoxville, Chattanooga, Clarksville, Murfreesboro, Franklin, Lebanon, and more. No state income tax, FMCSA-verified movers, free calculator, and transparent cost data. Independent directory.',
    keywords: [
      'moving to tennessee',
      'tennessee movers',
      'best cities to move to in tennessee 2026',
      'nashville movers',
      'knoxville chattanooga movers',
      'tennessee no income tax relocation',
      'middle tennessee moving costs',
      'tennessee interstate moving costs',
    ],
    canonicalPath: '/moving-to/tennessee',
  },
  heroSubheadline:
    'Tennessee ranks among the top inbound states in 2026 — drawing families, remote workers, military households, and corporate transferees with no state income tax, affordable housing relative to coastal metros, and strong job growth in Nashville, Knoxville, and Chattanooga. Our independent directory covers FMCSA-licensed interstate movers, county-level local directories, and city-specific guides with cost tables and free quote matching.',
  introParagraphs: [
    'Whether you are targeting Nashville\'s booming music-and-tech corridor, Knoxville\'s high inbound ratio and Smoky Mountain access, Clarksville\'s Fort Campbell military community, or Williamson County\'s top-rated school suburbs, the relocation fundamentals are identical: document your inventory with our free calculator, verify every carrier on FMCSA.gov, and compare multiple quotes on equal cubic footage before signing.',
    'Move Trust Hub is an independent informational directory — we are not affiliated with, endorsed by, or a partner of the moving companies listed. Tennessee moves involve distinct logistics: mountain-terrain shuttle trucks in East Tennessee, gated-community access in Williamson County, PCS timelines at Fort Campbell, and university turnover around UT and MTSU — factors our city guides surface so you can plan with confidence.',
    'Ten live Tennessee hubs span the Nashville metro and Middle Tennessee suburban ring (Nashville through Columbia) and East & North Tennessee (Knoxville, Chattanooga, Clarksville, and the Tri-Cities). Browse each city guide below for 2026–2027 cost tables, calculator prefill by ZIP, and county-level mover directories.',
  ],
  nashvilleMetroCorridor: [
    {
      slug: 'nashville-tn',
      displayName: 'Nashville',
      zip: '37201',
      tagline: 'Music City · tech & finance jobs · young professionals · downtown + suburbs',
    },
    {
      slug: 'murfreesboro-tn',
      displayName: 'Murfreesboro',
      zip: '37130',
      tagline: 'MTSU · younger demographic · I-24 suburban growth near Nashville',
    },
    {
      slug: 'lebanon-tn',
      displayName: 'Lebanon',
      zip: '37087',
      tagline: 'Wilson County growth · larger lots · quieter Nashville-adjacent pace',
    },
    {
      slug: 'franklin-brentwood-tn',
      displayName: 'Franklin / Brentwood',
      zip: '37064',
      tagline: 'Williamson County · top schools · high-end gated communities',
    },
    {
      slug: 'mount-juliet-tn',
      displayName: 'Mount Juliet',
      zip: '37122',
      tagline: 'Family-friendly lakeside suburb · retail growth · strong schools',
    },
    {
      slug: 'columbia-tn',
      displayName: 'Columbia',
      zip: '38401',
      tagline: 'Historic Mule Town · affordable south-of-Nashville alternative',
    },
  ],
  eastTennesseeCorridor: [
    {
      slug: 'knoxville-tn',
      displayName: 'Knoxville',
      zip: '37902',
      tagline: 'Top inbound ratio · UT/ORNL · Smoky Mountains · lower cost of living',
    },
    {
      slug: 'chattanooga-tn',
      displayName: 'Chattanooga',
      zip: '37402',
      tagline: 'Gig City · outdoor lifestyle · remote workers · progressive tech vibe',
    },
    {
      slug: 'clarksville-tn',
      displayName: 'Clarksville',
      zip: '37040',
      tagline: 'Fort Campbell military · high affordability · diverse population',
    },
    {
      slug: 'tri-cities-tn',
      displayName: 'Johnson City / Kingsport',
      zip: '37601',
      tagline: 'Tri-Cities · ETSU · healthcare · mountain retirement & remote work',
    },
  ],
  bodySections: [
    {
      heading: 'Why Tennessee leads Southeast inbound migration in 2026',
      paragraphs: [
        'Tennessee\'s combination of no state income tax, business-friendly regulation, and metro-level job growth makes it one of the highest-intent inbound states for household moves in 2026. Nashville draws corporate headquarters relocations and tech talent from California and Illinois; Knoxville posts top-tier inbound ratios among mid-size metros; Chattanooga markets itself as Gig City for fiber-connected remote workers; and Clarksville anchors military PCS volume from Fort Campbell.',
        'Compared to Florida or Texas, Tennessee offers four-season mountain-and-river geography with generally lower humidity on the plateau and strong healthcare and university employment anchors statewide. Interstate pricing from Midwest and Northeast origins is often competitive because Tennessee sits within a one-to-two-day linehaul window from Chicago, Detroit, and Atlanta — volume and accessorials drive final cost more than extreme distance in many corridors.',
        'Our ten Tennessee city hubs include 2026–2027 cost tables, calculator prefill by ZIP, county mover directories, and cross-links between Nashville suburbs and East Tennessee alternatives so you can compare markets before choosing a destination.',
      ],
    },
    {
      heading: 'Why the Nashville metro and Middle Tennessee suburban ring drives the highest volume',
      paragraphs: [
        'The Nashville–Murfreesboro–Franklin–Lebanon–Mount Juliet–Columbia corridor captures the full Middle Tennessee relocation spectrum: urban professionals in downtown Nashville and The Gulch, MTSU-affiliated households in Murfreesboro, luxury school-driven moves into Williamson County\'s Franklin and Brentwood, family lake-and-retail growth in Mount Juliet, and value-seeking buyers in Columbia\'s historic Mule Town south of the metro.',
        'Interstate moves into Davidson and Williamson counties typically originate from California, Illinois, New York, Florida, and Texas. Corporate relocation season (May–August) tightens delivery windows. Gated estates in Brentwood and new-construction subdivisions in Wilson County may require shuttle trucks when 53-foot trailers cannot navigate cul-de-sacs — legitimate accessorials that should appear on your estimate before booking.',
      ],
    },
    {
      heading: 'Why East and North Tennessee attract value, outdoor, and military inbound households',
      paragraphs: [
        'Knoxville combines a top-10 inbound ratio with University of Tennessee and Oak Ridge National Laboratory employment, Smoky Mountain recreation, and a cost of living well below Nashville. Chattanooga adds Gig City fiber infrastructure, Lookout Mountain outdoor lifestyle, and a progressive downtown tech scene drawing remote workers from Atlanta and the Midwest.',
        'Clarksville serves Fort Campbell PCS relocations with high affordability and diverse inbound demographics from Texas, California, and Kentucky. The Johnson City–Kingsport Tri-Cities region draws retirement and remote-work households seeking mountain views, East Tennessee State University and regional healthcare employment, and pricing below the Nashville metro. Mountain terrain, narrow rural driveways, and historic-district access in smaller downtowns are the primary destination cost drivers beyond base linehaul.',
      ],
    },
  ],
  resourceLinks: [
    {
      title: 'Browse Davidson County local movers',
      description: 'Nashville urban and suburban carriers with FMCSA licensing and ratings.',
      href: '/local-movers/tennessee/davidson',
    },
    {
      title: 'Browse Williamson County local movers',
      description: 'Franklin, Brentwood, and premium suburban move experience.',
      href: '/local-movers/tennessee/williamson',
    },
    {
      title: 'Browse Knox County local movers',
      description: 'Knoxville, Farragut, and eastern Tennessee interstate carriers.',
      href: '/local-movers/tennessee/knox',
    },
    {
      title: 'Browse Hamilton County local movers',
      description: 'Chattanooga and Lookout Mountain area movers.',
      href: '/local-movers/tennessee/hamilton',
    },
    {
      title: 'Browse Montgomery County local movers',
      description: 'Clarksville and Fort Campbell corridor carriers.',
      href: '/local-movers/tennessee/montgomery',
    },
    {
      title: 'Browse Rutherford County local movers',
      description: 'Murfreesboro and I-24 suburban growth corridor.',
      href: '/local-movers/tennessee/rutherford',
    },
    {
      title: 'Browse Wilson County local movers',
      description: 'Lebanon, Mount Juliet, and Nashville-adjacent suburbs.',
      href: '/local-movers/tennessee/wilson',
    },
    {
      title: 'Browse Washington & Sullivan County movers',
      description: 'Tri-Cities region including Johnson City and Kingsport.',
      href: '/local-movers/tennessee/washington',
    },
    {
      title: 'Massachusetts to Tennessee route guide',
      description: 'Boston and statewide MA origins to Nashville, Chattanooga, and Middle Tennessee.',
      href: '/resources/routes/massachusetts-to-tennessee',
    },
    {
      title: 'Florida moving destinations hub',
      description: 'Compare Tennessee with Florida Sunbelt inbound markets.',
      href: '/moving-to/florida',
    },
    {
      title: 'Verify any mover\'s USDOT & MC number',
      description: 'Step-by-step FMCSA lookup before booking.',
      href: '/resources/fmcsa',
    },
    {
      title: 'All popular destinations',
      description: 'Myrtle Beach, Florida, Tennessee, Texas, and more.',
      href: '/moving-to',
    },
  ],
};
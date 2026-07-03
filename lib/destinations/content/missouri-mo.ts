import type { DestinationResourceLink } from '@/lib/destinations/types';

export type MissouriCorridorCity = {
  slug: string;
  displayName: string;
  zip: string;
  tagline: string;
};

export type MissouriClusterContent = {
  h1: string;
  seo: {
    title: string;
    description: string;
    keywords: string[];
    canonicalPath: string;
  };
  heroSubheadline: string;
  introParagraphs: string[];
  kansasCityMetroCorridor: MissouriCorridorCity[];
  stLouisMetroCorridor: MissouriCorridorCity[];
  centralMissouriCorridor: MissouriCorridorCity[];
  ozarkCorridor: MissouriCorridorCity[];
  bodySections: { heading: string; paragraphs: string[] }[];
  resourceLinks: DestinationResourceLink[];
};

export const missouriClusterContent: MissouriClusterContent = {
  h1: 'Moving to Missouri: Kansas City, St. Louis, Ozarks & City Guides & Trusted Movers',
  seo: {
    title:
      'Moving to Missouri (2026) — Destination Guides, Costs & Trusted Movers | Move Trust Hub',
    description:
      'Explore Missouri inbound moving guides for Columbia, Lee\'s Summit, O\'Fallon, Kansas City, Chesterfield, Springfield, St. Charles, Liberty, St. Louis, and Republic/Nixa. Low cost of living, Show-Me State values, KC and STL metros, Ozark beauty. FMCSA-verified movers, free calculator. Independent directory.',
    keywords: [
      'moving to missouri',
      'missouri movers',
      'kansas city mo relocation',
      'st louis mo movers',
      'columbia missouri moving',
      'best cities to move to in missouri 2026',
      'missouri interstate moving costs',
      'moving from illinois to missouri',
      'moving from kansas to missouri',
      'show-me state relocation',
    ],
    canonicalPath: '/moving-to/missouri',
  },
  heroSubheadline:
    'Missouri ranks among the Midwest\'s most strategically affordable inbound states for 2026 — the Show-Me State where low cost of living, dual-metro employment (Kansas City and St. Louis), Ozark natural beauty, and nationally respected school districts coexist without coastal carrying costs. Columbia anchors central Missouri as a high-value consensus king with Mizzou intellectual culture and Farmers Market downtown energy. Lee\'s Summit delivers premier Kansas City suburb polish along Longview Lake. O\'Fallon powers St. Louis family growth through master-planned excellence. Kansas City rises as a cultural giant with Northland expansion and riverfront revival. Chesterfield offers west-county luxury and corporate headquarters density. Springfield provides Ozark urban value near Bass Pro Shops heritage. St. Charles charms as a historic Katy Trail river city. Liberty shines as a KC Northland hidden gem around its historic square. St. Louis delivers urban value through Central West End walkability and South City neighborhood character. Republic and Nixa sprint as explosive southwest suburbs within Springfield reach. Our independent directory covers FMCSA-licensed interstate movers, county-level local directories, and ten city-specific guides with cost tables and trusted mover research tools.',
  introParagraphs: [
    'Whether you are relocating from Illinois into Columbia\'s Mizzou corridor, accepting a Kansas City corporate transfer into Lee\'s Summit\'s Longview Lake inventory, settling O\'Fallon\'s master-planned subdivisions, targeting Chesterfield\'s west-county executive homes, joining Kansas City\'s Northland riverfront revival, moving into St. Charles\'s historic Main Street, choosing Liberty\'s square-adjacent charm, downsizing into St. Louis\'s Central West End, embracing Springfield\'s Ozark urban value, or building in Republic/Nixa\'s explosive southwest growth, the relocation fundamentals are identical: document your inventory with our free calculator, verify every carrier on FMCSA.gov, and compare movers directly on equal cubic footage before signing.',
    'Move Trust Hub is an independent informational directory — we are not affiliated with, endorsed by, or a partner of the moving companies listed. Missouri moves involve Show-Me State logistics that generic Midwest guides overlook: Longview Lake cul-de-sac shuttle staging, Chesterfield corporate closing clusters, Kansas City Northland builder HOA rules, St. Louis brick-home walk-up constraints, Katy Trail bluff access in St. Charles, Mizzou semester peaks in Columbia, and Ozark hillside long carries in Republic/Nixa — factors our city guides surface so you can plan with confidence.',
    'Ten live Missouri hubs span Kansas City Metro (Kansas City, Lee\'s Summit, Liberty), St. Louis Metro (O\'Fallon, Chesterfield, St. Charles, St. Louis), Central Missouri (Columbia), and Ozark Corridors (Springfield, Republic/Nixa). Browse each city guide below for 2026–2027 cost tables, calculator prefill by ZIP, and county-level mover directories.',
  ],
  kansasCityMetroCorridor: [
    {
      slug: 'kansas-city-mo',
      displayName: 'Kansas City',
      zip: '64108',
      tagline: 'Cultural giant · Northland · riverfront revival · BBQ & arts',
    },
    {
      slug: 'lees-summit-mo',
      displayName: 'Lee\'s Summit',
      zip: '64063',
      tagline: 'Premier KC suburb · Longview Lake · top schools',
    },
    {
      slug: 'liberty-mo',
      displayName: 'Liberty',
      zip: '64068',
      tagline: 'KC Northland hidden gem · historic square · family value',
    },
  ],
  stLouisMetroCorridor: [
    {
      slug: 'ofallon-mo',
      displayName: 'O\'Fallon',
      zip: '63366',
      tagline: 'St. Louis family powerhouse · master-planned · top schools',
    },
    {
      slug: 'chesterfield-mo',
      displayName: 'Chesterfield',
      zip: '63017',
      tagline: 'West-county luxury · corporate HQ · executive inventory',
    },
    {
      slug: 'st-charles-mo',
      displayName: 'St. Charles',
      zip: '63301',
      tagline: 'Historic river city · Katy Trail · Main Street charm',
    },
    {
      slug: 'st-louis-mo',
      displayName: 'St. Louis',
      zip: '63108',
      tagline: 'Urban value play · Central West End · South City neighborhoods',
    },
  ],
  centralMissouriCorridor: [
    {
      slug: 'columbia-mo',
      displayName: 'Columbia',
      zip: '65201',
      tagline: 'High-value consensus king · Mizzou · Farmers Market',
    },
  ],
  ozarkCorridor: [
    {
      slug: 'springfield-mo',
      displayName: 'Springfield',
      zip: '65807',
      tagline: 'Ozark urban value · Bass Pro heritage · affordability',
    },
    {
      slug: 'republic-nixa-mo',
      displayName: 'Republic / Nixa',
      zip: '65738',
      tagline: 'Explosive southwest sprinters · Springfield proximity',
    },
  ],
  bodySections: [
    {
      heading: 'Why Missouri leads affordable Midwest inbound migration in 2026',
      paragraphs: [
        'Missouri\'s inbound story is defined by Show-Me State value fundamentals — households from Illinois, Kansas, Arkansas, Texas, California, New York, and Florida choose Missouri for low cost of living, stable corporate employment across two major metros, genuine Ozark outdoor access, and housing inventory that routinely undercuts Chicagoland, Dallas, and coastal premiums while preserving strong community character. Kansas City and St. Louis anchor the highest employment inbound volume through distinct cultural identities united by Midwest affordability.',
        'Kansas City metro corridors draw Illinois and Texas spillover into Lee\'s Summit\'s Longview Lake prestige, Liberty\'s Northland square charm, and Kansas City\'s riverfront-and-Northland revival at cultural scale few Midwest cities match. St. Louis metro corridors serve O\'Fallon\'s master-planned family powerhouse reputation, Chesterfield\'s west-county executive inventory, St. Charles\'s historic Katy Trail river character, and St. Louis urban value through Central West End walkability and South City brick-home neighborhoods.',
        'Central and Ozark corridors round out Missouri\'s relocation spectrum. Columbia\'s Mizzou intellectual culture and Farmers Market downtown make Boone County a high-value consensus destination for Illinois and Kansas spillover. Springfield delivers Ozark urban affordability with Bass Pro Shops heritage and regional healthcare employment. Republic and Nixa capture explosive southwest suburban growth for households prioritizing Springfield proximity without inner-city density.',
        'No two Missouri corridors move alike. Chesterfield estate driveways need shuttle planning. St. Louis brick walk-ups require long carries. Kansas City Northland builder closings cluster May through September. Columbia Mizzou semester peaks compress August demand. Compare quotes on identical inventory rather than choosing the lowest phone estimate.',
      ],
    },
    {
      heading: 'How to choose an interstate mover for a Missouri delivery',
      paragraphs: [
        'Start with FMCSA verification. Every interstate carrier must have a USDOT number and, when operating as a for-hire carrier, an MC number. Look up both on FMCSA.gov and confirm acceptable safety ratings and low complaint ratios. Move Trust Hub surfaces this data alongside Google, BBB, and Trustpilot reviews so you can research before anyone calls you.',
        'Demand inventory-based quotes. Lowball estimates based on phone guesses are the leading cause of moving-day price disputes on I-70, I-44, and I-55 corridors into Missouri. Use our room-by-room calculator to document cubic feet and estimated weight, then send the same inventory to every carrier you compare.',
        'Ask about Missouri-specific accessorials. St. Louis historic brick homes frequently require stairwell equipment and shuttle trucks. Chesterfield and Lee\'s Summit cul-de-sacs often need HOA move-day coordination. Ozark hillside properties in Republic/Nixa may restrict trailer access. Summer corporate closing peaks and university semester windows compress schedules — confirm these line items in writing.',
        'Read our scam avoidance guide before paying more than a modest booking deposit. Reputable interstate carriers do not demand large upfront cash payments via wire transfer or cryptocurrency.',
      ],
    },
    {
      heading: 'Regional Missouri moving corridors at a glance',
      paragraphs: [
        'Kansas City Metro (Kansas City, Lee\'s Summit, and Liberty) handles Missouri\'s western cultural-and-corporate inbound volume across riverfront revival, Longview Lake prestige, and Northland square charm.',
        'St. Louis Metro (O\'Fallon, Chesterfield, St. Charles, and St. Louis) serves master-planned family growth, west-county luxury, historic river cities, and urban Central West End value.',
        'Central Missouri (Columbia) anchors Mizzou intellectual culture and high-value consensus relocation.',
        'Ozark Corridors (Springfield and Republic/Nixa) capture urban Ozark affordability and explosive southwest suburban growth.',
      ],
    },
  ],
  resourceLinks: [
    {
      title: 'Browse Jackson County local movers',
      description: 'Kansas City and Lee\'s Summit KC metro mover directory.',
      href: '/local-movers/missouri/jackson',
    },
    {
      title: 'Browse St. Louis County local movers',
      description: 'Chesterfield and west-county STL mover directory.',
      href: '/local-movers/missouri/st-louis',
    },
    {
      title: 'Browse St. Charles County local movers',
      description: 'O\'Fallon and St. Charles river-city mover directory.',
      href: '/local-movers/missouri/st-charles',
    },
    {
      title: 'Browse St. Louis City local movers',
      description: 'Central West End and South City urban mover directory.',
      href: '/local-movers/missouri/st-louis-city',
    },
    {
      title: 'Browse Boone County local movers',
      description: 'Columbia Mizzou corridor mover directory.',
      href: '/local-movers/missouri/boone',
    },
    {
      title: 'Browse Greene County local movers',
      description: 'Springfield Ozark urban mover directory.',
      href: '/local-movers/missouri/greene',
    },
    {
      title: 'Browse Christian County local movers',
      description: 'Republic and Nixa southwest sprinter mover directory.',
      href: '/local-movers/missouri/christian',
    },
    {
      title: 'Browse Clay County local movers',
      description: 'Liberty Northland mover directory.',
      href: '/local-movers/missouri/clay',
    },
    {
      title: 'Illinois moving destinations hub',
      description: 'Compare MO corridors with Chicagoland spillover markets.',
      href: '/moving-to/illinois',
    },
    {
      title: 'Kansas moving destinations hub',
      description: 'Compare MO corridors with Johnson County and Wichita markets.',
      href: '/moving-to/kansas',
    },
    {
      title: 'Arkansas moving destinations hub',
      description: 'Compare MO corridors with Northwest Arkansas spillover.',
      href: '/moving-to/arkansas',
    },
    {
      title: 'Verify any mover\'s USDOT & MC number',
      description: 'Step-by-step FMCSA lookup before booking.',
      href: '/resources/fmcsa',
    },
    {
      title: 'All popular destinations',
      description: 'Missouri, Illinois, Kansas, Arkansas, and nationwide hubs.',
      href: '/moving-to',
    },
  ],
};
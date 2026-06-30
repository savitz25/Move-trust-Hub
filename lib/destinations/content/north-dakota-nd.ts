import type { DestinationResourceLink } from '@/lib/destinations/types';

export type NorthDakotaCorridorCity = {
  slug: string;
  displayName: string;
  zip: string;
  tagline: string;
};

export type NorthDakotaClusterContent = {
  h1: string;
  seo: {
    title: string;
    description: string;
    keywords: string[];
    canonicalPath: string;
  };
  heroSubheadline: string;
  introParagraphs: string[];
  redRiverValleyCorridor: NorthDakotaCorridorCity[];
  capitalCorridor: NorthDakotaCorridorCity[];
  energyWesternCorridor: NorthDakotaCorridorCity[];
  bodySections: { heading: string; paragraphs: string[] }[];
  resourceLinks: DestinationResourceLink[];
};

export const northDakotaClusterContent: NorthDakotaClusterContent = {
  h1: 'Moving to North Dakota: Fargo, Bismarck, Grand Forks & City Guides & Trusted Movers',
  seo: {
    title:
      'Moving to North Dakota (2026) — Destination Guides, Costs & Free Quotes | Move Trust Hub',
    description:
      'Explore North Dakota inbound moving guides for Fargo, Bismarck, West Fargo, Grand Forks, Horace, Williston, Mandan, Dickinson, Wahpeton, and Minot. Low unemployment, open spaces, strong economy. FMCSA-verified movers, free calculator. Independent directory.',
    keywords: [
      'moving to north dakota',
      'north dakota movers',
      'fargo nd relocation',
      'bismarck north dakota moving',
      'grand forks nd movers',
      'best cities to move to in north dakota 2026',
      'north dakota interstate moving costs',
      'moving from minnesota to north dakota',
      'moving from south dakota to north dakota',
      'northern plains relocation',
    ],
    canonicalPath: '/moving-to/north-dakota',
  },
  heroSubheadline:
    'North Dakota ranks among the Northern Plains\' most strategically attractive inbound states for 2026 — the Peace Garden State where low unemployment, wide-open horizons, a resilient energy-and-agriculture economy, and genuinely distinct regional corridors coexist without coastal carrying costs. Fargo anchors Cass County as an economic and cultural pioneer through NDSU research energy and Silicon Prairie tech momentum. Bismarck delivers a polished capital core along the Missouri River with government stability and western polish. West Fargo powers rapidly growing family inventory through safe suburban neighborhoods and builder pipelines. Grand Forks serves as an academic and aerospace oasis anchored by UND and Grand Sky innovation. Horace captures explosive growth phenomenon status with luxury-lot subdivisions south of Fargo. Williston remains the resilient energy king of the Bakken formation. Mandan offers a historic western alternative across the Missouri from Bismarck. Dickinson gates the Badlands with energy-sector employment density. Wahpeton delivers affordable tech-ed capital living in the Red River Valley. Minot rises as the resilient Magic City anchored by Minot Air Force Base. Our independent directory covers FMCSA-licensed interstate movers, county-level local directories, and ten city-specific guides with cost tables and free quote matching.',
  introParagraphs: [
    'Whether you are relocating from Minnesota into Fargo\'s downtown-and-NDSU corridors, accepting a state-agency transfer into Bismarck\'s Missouri River capital core, settling West Fargo\'s family-suburb builder inventory, joining Grand Forks\' UND academic ecosystem, targeting Horace\'s luxury-lot growth, moving into Williston\'s Bakken energy employment, embracing Mandan\'s historic western character, choosing Dickinson\'s Badlands gateway lifestyle, downsizing into Wahpeton\'s Red River Valley affordability, or accepting a Minot AFB assignment in the Magic City, the relocation fundamentals are identical: document your inventory with our free calculator, verify every carrier on FMCSA.gov, and compare multiple quotes on equal cubic footage before signing.',
    'Move Trust Hub is an independent informational directory — we are not affiliated with, endorsed by, or a partner of the moving companies listed. North Dakota moves involve Peace Garden State logistics that generic Plains guides overlook: Red River Valley winter delivery windows, I-29 and I-94 corridor scheduling, Bakken energy-transfer closing clusters, NDSU and UND semester peaks, Horace and West Fargo HOA move-day rules, Minot AFB housing coordination, and rural western long carries — factors our city guides surface so you can plan with confidence.',
    'Ten live North Dakota hubs span Red River Valley (Fargo, West Fargo, Horace, Grand Forks, Wahpeton), Capital Corridor (Bismarck, Mandan), and Energy-Western (Williston, Dickinson, Minot). Browse each city guide below for 2026–2027 cost tables, calculator prefill by ZIP, and county-level mover directories.',
  ],
  redRiverValleyCorridor: [
    {
      slug: 'fargo-nd',
      displayName: 'Fargo',
      zip: '58102',
      tagline: 'Economic & cultural pioneer · NDSU · Silicon Prairie',
    },
    {
      slug: 'west-fargo-nd',
      displayName: 'West Fargo',
      zip: '58078',
      tagline: 'Rapidly growing family hub · safe neighborhoods',
    },
    {
      slug: 'horace-nd',
      displayName: 'Horace',
      zip: '58047',
      tagline: 'Explosive growth · luxury lots · Cass County south',
    },
    {
      slug: 'grand-forks-nd',
      displayName: 'Grand Forks',
      zip: '58201',
      tagline: 'Academic & aerospace oasis · UND · Grand Sky',
    },
    {
      slug: 'wahpeton-nd',
      displayName: 'Wahpeton',
      zip: '58075',
      tagline: 'Affordable tech-ed capital · Red River Valley',
    },
  ],
  capitalCorridor: [
    {
      slug: 'bismarck-nd',
      displayName: 'Bismarck',
      zip: '58501',
      tagline: 'Polished capital core · Missouri River · state government',
    },
    {
      slug: 'mandan-nd',
      displayName: 'Mandan',
      zip: '58554',
      tagline: 'Historic western alternative · Missouri River west bank',
    },
  ],
  energyWesternCorridor: [
    {
      slug: 'williston-nd',
      displayName: 'Williston',
      zip: '58801',
      tagline: 'Resilient energy king · Bakken formation',
    },
    {
      slug: 'dickinson-nd',
      displayName: 'Dickinson',
      zip: '58601',
      tagline: 'Gateway to the Badlands · energy sector hub',
    },
    {
      slug: 'minot-nd',
      displayName: 'Minot',
      zip: '58701',
      tagline: 'Resilient Magic City · Minot Air Force Base',
    },
  ],
  bodySections: [
    {
      heading: 'Why North Dakota draws inbound movers in 2026',
      paragraphs: [
        'North Dakota\'s inbound appeal rests on a combination that coastal and Sun Belt metros struggle to replicate: among the nation\'s lowest unemployment rates, a diversified economy spanning agriculture, energy, technology, higher education, and military employment, housing inventory that remains meaningfully affordable relative to household income, and a quality-of-life proposition built on community scale rather than congestion. Fargo and Bismarck anchor the state\'s two largest metros with distinct personalities — Fargo as a Silicon Prairie tech-and-culture pioneer, Bismarck as a polished riverfront capital — while West Fargo, Horace, and Grand Forks capture suburban and academic growth corridors that families and professionals increasingly prioritize.',
        'The Red River Valley corridor along I-29 connects Fargo, West Fargo, Horace, Grand Forks, and Wahpeton in a north-south chain that Minnesota and South Dakota spillover households know intimately. Short regional hauls from Minneapolis-St. Paul, Sioux Falls, and eastern Montana keep linehaul costs moderate compared with cross-country coastal moves. Western energy corridors — Williston, Dickinson, and Minot — attract Bakken employment transfers, Air Force assignments, and households seeking Badlands-adjacent outdoor recreation with energy-sector wage support.',
        'Inbound origin patterns reflect these corridors. Minnesota consistently ranks among the largest source states for Fargo and Grand Forks relocations, driven by I-94 adjacency and Red River Valley economic integration. South Dakota and Montana spillover targets Bismarck, Dickinson, and Minot on I-94 western routes. California, Texas, New York, and Florida households increasingly choose North Dakota when remote-work flexibility, military orders, or energy-sector employment allow Northern Plains stability without sacrificing career momentum.',
        'Every North Dakota corridor shares relocation fundamentals that our city guides address individually: winter delivery scheduling from November through March, Red River flood-season awareness in valley communities, Bakken housing turnover peaks in Williston and Dickinson, and semester-aligned closing windows around NDSU and UND. Document your inventory accurately, compare equal cubic-footage quotes, and verify FMCSA licensing before booking.',
      ],
    },
    {
      heading: 'Average interstate moving costs to North Dakota (2026)',
      paragraphs: [
        'Northern Plains linehaul economics generally favor inbound movers from adjacent states. Regional moves from Minnesota, South Dakota, and eastern Montana into Fargo or Grand Forks often fall in the $2,200–$5,000 studio range and $4,000–$7,600 for two-bedroom households because distance and fuel surcharges stay moderate on I-29 and I-94 corridors. Cross-country shipments from California, Texas, New York, and Florida involve longer transit windows and higher linehaul — typically $3,800–$7,400 for two-bedroom deliveries into metro Fargo or Bismarck and $5,500–$10,000 for three-bedroom households depending on origin ZIP and season.',
        'Peak season (May through September) adds 10–20% to interstate rates as school-year closing clusters, NDSU and UND semester peaks, Bakken energy-transfer windows, and summer construction inventory compress carrier availability across Cass, Burleigh, and Ward counties. Winter moves (November through March) require cold-weather handling protocols and occasionally face weather-delay spreads on I-94 and western routes — book flexible delivery windows and confirm carrier experience with North Dakota winter logistics.',
        'Destination accessorials vary by neighborhood type. West Fargo and Horace master-planned subdivisions frequently require HOA move-day reservations and cul-de-sac shuttle staging. Downtown Fargo loft deliveries may need elevator COI coordination. Williston and Dickinson energy-corridor apartments often involve third-floor walk-ups and tight parking. Minot AFB-adjacent housing may require base housing office coordination. Each factor should appear as a line item on your estimate, not a surprise on delivery day.',
        'Use our free calculator with your destination ZIP — Fargo (58102), Bismarck (58501), West Fargo (58078), Grand Forks (58201), Horace (58047), Williston (58801), Mandan (58554), Dickinson (58601), Wahpeton (58075), or Minot (58701) — then request 2–3 matched quotes on identical inventory before signing.',
      ],
    },
    {
      heading: 'How to choose a mover for your North Dakota relocation',
      paragraphs: [
        'Start with FMCSA verification. Every interstate carrier must have a USDOT number and, when operating as a for-hire carrier, an MC number. Look up both on FMCSA.gov and confirm acceptable safety ratings and low complaint ratios. Move Trust Hub surfaces this data alongside Google, BBB, and Trustpilot reviews so you can research before anyone calls you.',
        'Demand inventory-based quotes. Lowball phone estimates are the leading cause of moving-day price disputes on I-29 and I-94 routes into North Dakota. Use our room-by-room calculator to document cubic feet and estimated weight — include garage workshop equipment, snow blowers, patio furniture, and home-office setups common among Northern Plains relocations. Send the same inventory to every carrier you compare.',
        'Ask about corridor-specific logistics. Red River Valley winter deliveries, Bakken energy-transfer closing clusters, NDSU and UND semester peaks, Horace luxury-lot cul-de-sac shuttle constraints, and Minot AFB housing coordination are legitimate cost drivers that should appear in writing before you book. Reputable carriers disclose accessorials upfront; vague phone estimates are a red flag.',
        'Read our scam avoidance guide before paying more than a modest booking deposit. Reputable interstate carriers do not demand large upfront cash payments via wire transfer or cryptocurrency. Binding not-to-exceed estimates, when supported by an accurate virtual or in-home survey, offer the strongest price protection for North Dakota-bound shipments from Minnesota, South Dakota, Montana, California, Texas, New York, and Florida.',
      ],
    },
  ],
  resourceLinks: [
    {
      title: 'Minnesota moving destinations hub',
      description: 'Compare ND corridors with Minneapolis-St. Paul and Duluth spillover origins.',
      href: '/moving-to/minnesota',
    },
    {
      title: 'South Dakota moving destinations hub',
      description: 'Compare ND corridors with Sioux Falls and Rapid City regional markets.',
      href: '/moving-to/south-dakota',
    },
    {
      title: 'Montana moving destinations hub',
      description: 'Compare ND western corridors with Billings and Great Falls alternatives.',
      href: '/moving-to/montana',
    },
    {
      title: 'Nebraska moving destinations hub',
      description: 'Compare Northern Plains corridors with Omaha and Lincoln markets.',
      href: '/moving-to/nebraska',
    },
    {
      title: 'Browse Cass County local movers',
      description: 'Fargo, West Fargo, and Horace Red River Valley mover directory.',
      href: '/local-movers/north-dakota/cass',
    },
    {
      title: 'Browse Burleigh County local movers',
      description: 'Bismarck capital corridor mover directory.',
      href: '/local-movers/north-dakota/burleigh',
    },
    {
      title: 'Browse Ward County local movers',
      description: 'Minot Magic City and Minot AFB corridor mover directory.',
      href: '/local-movers/north-dakota/ward',
    },
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
      title: 'Free moving cost calculator',
      description: 'Estimate cubic footage and weight before requesting matched quotes.',
      href: '/moving-calculator',
    },
  ],
};
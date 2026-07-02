import type { DestinationResourceLink } from '@/lib/destinations/types';

export type SouthDakotaCorridorCity = {
  slug: string;
  displayName: string;
  zip: string;
  tagline: string;
};

export type SouthDakotaClusterContent = {
  h1: string;
  seo: {
    title: string;
    description: string;
    keywords: string[];
    canonicalPath: string;
  };
  heroSubheadline: string;
  introParagraphs: string[];
  siouxFallsMetroCorridor: SouthDakotaCorridorCity[];
  blackHillsCorridor: SouthDakotaCorridorCity[];
  easternCorridor: SouthDakotaCorridorCity[];
  bodySections: { heading: string; paragraphs: string[] }[];
  resourceLinks: DestinationResourceLink[];
};

export const southDakotaClusterContent: SouthDakotaClusterContent = {
  h1: 'Moving to South Dakota: Sioux Falls, Rapid City, Harrisburg & City Guides & Trusted Movers',
  seo: {
    title:
      'Moving to South Dakota (2026) — Destination Guides, Costs & Trusted Movers | Move Trust Hub',
    description:
      'Explore South Dakota inbound moving guides for Sioux Falls, Rapid City, Harrisburg, Brookings, Spearfish, Brandon, Tea, Watertown, Vermillion, and Box Elder. No state income tax, low taxes, outdoor-rich Upper Midwest living. FMCSA-verified movers, free calculator. Independent directory.',
    keywords: [
      'moving to south dakota',
      'south dakota movers',
      'sioux falls sd relocation',
      'rapid city south dakota moving',
      'harrisburg sd movers',
      'best cities to move to in south dakota 2026',
      'south dakota interstate moving costs',
      'moving from minnesota to south dakota',
      'moving from iowa to south dakota',
      'no income tax south dakota relocation',
    ],
    canonicalPath: '/moving-to/south-dakota',
  },
  heroSubheadline:
    'South Dakota ranks among the Upper Midwest\'s most strategically attractive inbound states for 2026 — the Mount Rushmore State where no state income tax, low property-tax carrying costs, outdoor-rich Black Hills recreation, and genuinely distinct regional corridors coexist without coastal price pressure. Sioux Falls anchors Minnehaha County as the economic engine along the Big Sioux River with healthcare-and-finance employment density. Rapid City gates the Black Hills and Mount Rushmore corridor with western adventure character. Harrisburg powers explosive master-planned growth as Lincoln County\'s fastest-building suburb. Brookings delivers brainy college-town living through SDSU research culture. Spearfish charms as an alpine sanctuary at the northern Black Hills edge. Brandon provides a premium school enclave through nationally respected Brandon Valley Schools. Tea offers a neighborly commuter safe-haven between Sioux Falls and Harrisburg corridors. Watertown serves as a lakeside recreational retreat along Lake Kampeska. Vermillion rises as a riverfront academic hub anchored by the University of South Dakota. Box Elder captures a booming military corridor adjacent to Ellsworth Air Force Base. Our independent directory covers FMCSA-licensed interstate movers, county-level local directories, and ten city-specific guides with cost tables and free quote matching.',
  introParagraphs: [
    'Whether you are relocating from Minnesota into Sioux Falls\' Big Sioux River downtown corridors, accepting a healthcare transfer into Brandon\'s Brandon Valley school boundaries, settling Harrisburg\'s master-planned builder inventory, targeting Tea\'s neighborly commuter lifestyle, moving into Rapid City\'s Black Hills gateway, embracing Spearfish\'s alpine sanctuary character, joining Brookings\' SDSU academic ecosystem, downsizing into Watertown\'s Lake Kampeska recreation inventory, settling Vermillion\'s USD riverfront culture, or accepting an Ellsworth AFB assignment in Box Elder, the relocation fundamentals are identical: document your inventory with our free calculator, verify every carrier on FMCSA.gov, and compare movers directly on equal cubic footage before signing.',
    'Move Trust Hub is an independent informational directory — we are not affiliated with, endorsed by, or a partner of the moving companies listed. South Dakota moves involve Mount Rushmore State logistics that generic Plains guides overlook: no-income-tax relocation planning still requires accurate inventory documentation, Harrisburg and Tea HOA move-day rules, I-29 and I-90 winter delivery windows, Ellsworth AFB housing coordination, SDSU and USD semester peaks, and Black Hills mountain-pass accessorials — factors our city guides surface so you can plan with confidence.',
    'Ten live South Dakota hubs span Sioux Falls Metro (Sioux Falls, Harrisburg, Brandon, Tea), Black Hills & Western (Rapid City, Spearfish, Box Elder), and Eastern Corridor (Brookings, Watertown, Vermillion). Browse each city guide below for 2026–2027 cost tables, calculator prefill by ZIP, and county-level mover directories.',
  ],
  siouxFallsMetroCorridor: [
    {
      slug: 'sioux-falls-sd',
      displayName: 'Sioux Falls',
      zip: '57104',
      tagline: 'Economic engine · Big Sioux River · healthcare & finance',
    },
    {
      slug: 'harrisburg-sd',
      displayName: 'Harrisburg',
      zip: '57032',
      tagline: 'Explosive growth winner · master-planned suburbs',
    },
    {
      slug: 'brandon-sd',
      displayName: 'Brandon',
      zip: '57005',
      tagline: 'Premium school enclave · Brandon Valley Schools',
    },
    {
      slug: 'tea-sd',
      displayName: 'Tea',
      zip: '57064',
      tagline: 'Neighborly commuter safe-haven · Sioux Falls corridor',
    },
  ],
  blackHillsCorridor: [
    {
      slug: 'rapid-city-sd',
      displayName: 'Rapid City',
      zip: '57701',
      tagline: 'Gateway to the Black Hills · Mount Rushmore corridor',
    },
    {
      slug: 'spearfish-sd',
      displayName: 'Spearfish',
      zip: '57783',
      tagline: 'Alpine sanctuary · northern Black Hills',
    },
    {
      slug: 'box-elder-sd',
      displayName: 'Box Elder',
      zip: '57719',
      tagline: 'Booming military corridor · Ellsworth Air Force Base',
    },
  ],
  easternCorridor: [
    {
      slug: 'brookings-sd',
      displayName: 'Brookings',
      zip: '57006',
      tagline: 'Brainy college town · SDSU research culture',
    },
    {
      slug: 'watertown-sd',
      displayName: 'Watertown',
      zip: '57201',
      tagline: 'Lakeside recreational retreat · Lake Kampeska',
    },
    {
      slug: 'vermillion-sd',
      displayName: 'Vermillion',
      zip: '57069',
      tagline: 'Riverfront academic hub · University of South Dakota',
    },
  ],
  bodySections: [
    {
      heading: 'Why South Dakota draws inbound movers in 2026',
      paragraphs: [
        'South Dakota\'s inbound appeal rests on a tax-and-lifestyle combination that coastal and high-tax metros struggle to match: no state income tax, comparatively low property-tax carrying costs, diversified employment across healthcare, finance, agriculture, tourism, higher education, and military sectors, and outdoor recreation access from the Black Hills to eastern lake country without congestion premiums. Sioux Falls and Rapid City anchor the state\'s two largest metros with distinct personalities — Sioux Falls as an Upper Midwest economic engine, Rapid City as a western adventure gateway — while Harrisburg, Brandon, and Tea capture suburban growth corridors that families increasingly prioritize over urban density.',
        'The Sioux Falls metro along I-29 connects Minnesota and Iowa spillover households who already know the corridor\'s affordability proposition. Black Hills communities — Rapid City, Spearfish, and Box Elder — attract tourism-employment transfers, Ellsworth AFB assignments, and households seeking mountain-adjacent recreation with western wage support. Eastern college towns — Brookings, Watertown, and Vermillion — draw academic professionals, lake-country retirees, and families valuing brainy small-city culture at attainable price points.',
        'Inbound origin patterns reflect these corridors. Minnesota and Iowa consistently rank among the largest source states for Sioux Falls and Brandon relocations, driven by I-29 adjacency and no-income-tax appeal. Nebraska and Wyoming spillover targets Rapid City and Spearfish on I-90 western routes. Colorado, Texas, California, New York, and Florida households increasingly choose South Dakota when remote-work flexibility, military orders, or healthcare employment allow tax-friendly Upper Midwest stability.',
        'Every South Dakota corridor shares relocation fundamentals that our city guides address individually: winter delivery scheduling from November through March, I-29 and I-90 corridor weather delays, Ellsworth AFB housing turnover peaks, SDSU and USD semester-aligned closing windows, and Black Hills mountain-pass accessorials. Document your inventory accurately, compare equal cubic-footage quotes, and verify FMCSA licensing before booking.',
      ],
    },
    {
      heading: 'Average interstate moving costs to South Dakota (2026)',
      paragraphs: [
        'Upper Midwest linehaul economics generally favor inbound movers from adjacent states. Regional moves from Minnesota, Iowa, and Nebraska into Sioux Falls or Brandon often fall in the $2,200–$5,000 studio range and $4,000–$7,600 for two-bedroom households because distance and fuel surcharges stay moderate on I-29 corridors. Cross-country shipments from California, Texas, New York, and Florida involve longer transit windows and higher linehaul — typically $3,800–$7,400 for two-bedroom deliveries into metro Sioux Falls or Rapid City and $5,500–$10,000 for three-bedroom households depending on origin ZIP and season.',
        'Peak season (May through September) adds 10–20% to interstate rates as school-year closing clusters, Harrisburg builder move-in windows, Ellsworth AFB transfer peaks, and summer tourism-season compressions affect carrier availability across Minnehaha, Lincoln, and Pennington counties. Winter moves (November through March) require cold-weather handling protocols and occasionally face weather-delay spreads on I-90 and Black Hills routes — book flexible delivery windows and confirm carrier experience with South Dakota winter logistics.',
        'Destination accessorials vary by neighborhood type. Harrisburg and Tea master-planned subdivisions frequently require HOA move-day reservations and cul-de-sac shuttle staging. Downtown Sioux Falls loft deliveries may need elevator COI coordination. Box Elder military-corridor housing may require base housing office coordination. Spearfish alpine inventory often involves hillside driveway shuttle constraints. Each factor should appear as a line item on your estimate, not a surprise on delivery day.',
        'Use our free calculator with your destination ZIP — Sioux Falls (57104), Rapid City (57701), Harrisburg (57032), Brookings (57006), Spearfish (57783), Brandon (57005), Tea (57064), Watertown (57201), Vermillion (57069), or Box Elder (57719) — then compare trusted movers in our directory on identical inventory before signing.',
      ],
    },
    {
      heading: 'How to choose a mover for your South Dakota relocation',
      paragraphs: [
        'Start with FMCSA verification. Every interstate carrier must have a USDOT number and, when operating as a for-hire carrier, an MC number. Look up both on FMCSA.gov and confirm acceptable safety ratings and low complaint ratios. Move Trust Hub surfaces this data alongside Google, BBB, and Trustpilot reviews so you can research before anyone calls you.',
        'Demand inventory-based quotes. Lowball phone estimates are the leading cause of moving-day price disputes on I-29 and I-90 routes into South Dakota. Use our room-by-room calculator to document cubic feet and estimated weight — include garage workshop equipment, snow blowers, patio furniture, and home-office setups common among Upper Midwest relocations. Send the same inventory to every carrier you compare.',
        'Ask about corridor-specific logistics. Sioux Falls metro HOA move-day rules, Ellsworth AFB housing coordination, Black Hills mountain-pass winter windows, SDSU and USD semester peaks, and Harrisburg builder closing clusters are legitimate cost drivers that should appear in writing before you book. Reputable carriers disclose accessorials upfront; vague phone estimates are a red flag.',
        'Read our scam avoidance guide before paying more than a modest booking deposit. Reputable interstate carriers do not demand large upfront cash payments via wire transfer or cryptocurrency. Binding not-to-exceed estimates, when supported by an accurate virtual or in-home survey, offer the strongest price protection for South Dakota-bound shipments from Minnesota, Iowa, Nebraska, Wyoming, Colorado, Texas, California, New York, and Florida.',
      ],
    },
  ],
  resourceLinks: [
    {
      title: 'Minnesota moving destinations hub',
      description: 'Compare SD corridors with Minneapolis-St. Paul and Duluth spillover origins.',
      href: '/moving-to/minnesota',
    },
    {
      title: 'Iowa moving destinations hub',
      description: 'Compare SD corridors with Des Moines and Cedar Rapids regional markets.',
      href: '/moving-to/iowa',
    },
    {
      title: 'Nebraska moving destinations hub',
      description: 'Compare Upper Midwest corridors with Omaha and Lincoln markets.',
      href: '/moving-to/nebraska',
    },
    {
      title: 'North Dakota moving destinations hub',
      description: 'Compare Northern Plains corridors with Fargo and Bismarck alternatives.',
      href: '/moving-to/north-dakota',
    },
    {
      title: 'Browse Minnehaha County local movers',
      description: 'Sioux Falls and Brandon metro mover directory.',
      href: '/local-movers/south-dakota/minnehaha',
    },
    {
      title: 'Browse Pennington County local movers',
      description: 'Rapid City, Spearfish, and Box Elder Black Hills mover directory.',
      href: '/local-movers/south-dakota/pennington',
    },
    {
      title: 'Browse Lincoln County local movers',
      description: 'Harrisburg and Tea suburban growth corridor mover directory.',
      href: '/local-movers/south-dakota/lincoln',
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
      description: 'Estimate cubic footage and weight before comparing trusted movers.',
      href: '/moving-calculator',
    },
  ],
};
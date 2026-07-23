import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';

/**
 * Hand-crafted Montgomery County, Texas moving intelligence.
 * Differentiators: The Woodlands master-planned core, Conroe growth, north Houston /
 * exurban expansion along I-45 — not Fort Bend SW Sugar Land scripts or Harris downtown elevators.
 */
export const montgomeryCountyIntelligence: CountyIntelligencePack = {
  stateSlug: 'texas',
  countySlug: 'montgomery',
  hubTitle: 'Montgomery County Moving Intelligence Hub',
  eyebrow: 'Montgomery · The Woodlands, Conroe & north Houston growth',
  h1: 'Moving in Montgomery County: The Woodlands, Conroe Growth & North Houston Guide',
  heroOpener:
    'Montgomery County is north Houston’s suburban–exurban growth belt — The Woodlands’ master-planned villages on one side, Conroe expansion and Lake Conroe edges on the other, and I-45 corridor towns absorbing Harris overflow. This is not Fort Bend’s Sugar Land script and not downtown Houston elevators. Woodlands HOAs, golf-course and forested lots, and strict move windows dominate the south-central core; Conroe and Magnolia bring newer tracts and longer arterials; Willis, New Caney, and Splendora edges feel more exurban. Piney-woods canopy, summer heat, and school calendars shape every crew day. This guide is for people moving in Montgomery County — Woodlands logistics plus north-metro growth — not a recycled Houston core pack.',
  heroCredibility:
    'The Woodlands · North Houston / Conroe growth · TxDMV household goods (intrastate) · FMCSA when interstate · Curated listings',
  collapsibleDeepContent: true,
  sectionOrder: [
    'whatMakesDifferent',
    'zones',
    'costDrivers',
    'seasonal',
    'specialized',
    'relocation',
    'resources',
  ],
  whatMakesDifferent: {
    title: 'What makes moving in Montgomery County different',
    intro:
      'These are Montgomery realities — The Woodlands planned-village access, Conroe growth, Lake Conroe edges, and I-45 corridor timing — not interchangeable “Houston suburb” boilerplate.',
    bullets: [
      {
        title: 'The Woodlands and Conroe growth are different products',
        detail:
          'A Woodlands village HOA home, a Conroe new build, a Lake Conroe waterfront approach, and a New Caney larger-lot do not share gate rules, truck access, or inventory profiles. Name both origin and destination communities on every estimate.',
      },
      {
        title: 'Woodlands logistics are paperwork- and canopy-first',
        detail:
          'Master-planned villages require COI, approved hours, and gate coordination. Forested lots add canopy clearance, longer carries, and limited turnaround that open prairie suburbs never see.',
      },
      {
        title: 'North Houston spillover fills the I-45 spine',
        detail:
          'Households choose Montgomery for schools, newer housing, and relative value while commuting into Harris job centers. Peak spring/summer and end-of-month windows book first along Spring, Oak Ridge North, and Woodlands-adjacent corridors.',
      },
      {
        title: 'I-45 / 99 / 242 / 105 timing rewrites “local” ETAs',
        detail:
          'Map miles between The Woodlands, Conroe, and Magnolia understate peak portal time. Hourly crews feel every bottleneck — ask how drive time is priced.',
      },
      {
        title: 'Lake Conroe edges are access jobs',
        detail:
          'Waterfront approaches, private roads, boat-traffic weekends, and weather-sensitive docks create staging constraints that inland cul-de-sacs never see. Share approach photos.',
      },
      {
        title: 'Exurban east and north edges lower service density',
        detail:
          'New Caney, Splendora, Willis, and rural-north parcels can mean longer deadhead, soft shoulders, and fewer same-day crew options than Woodlands core.',
      },
      {
        title: 'Gulf Coast heat and storm season stress outdoor work',
        detail:
          'Summer heat under canopy still exhausts crews on long carries; tropical systems and heavy rain can cancel outdoor packing. Early starts and flexible dates outperform rigid peak Saturdays.',
      },
      {
        title: 'Texas intrastate rules (TxDMV) + FMCSA when interstate',
        detail:
          'Moves entirely within Texas are generally overseen under Texas Department of Motor Vehicles (TxDMV) household-goods / motor-carrier frameworks. Interstate legs need active FMCSA USDOT (and usually MC) authority. Confirm which license applies before deposit.',
      },
    ],
  },
  zonesHeading: 'Montgomery County access zones',
  zonesIntro:
    'Plan by The Woodlands villages, Conroe core/growth, Lake Conroe edges, Magnolia/west growth, and east/exurban I-45 towns — each has its own access and traffic profile.',
  zones: [
    {
      id: 'the-woodlands',
      name: 'The Woodlands — master-planned village core',
      shortName: 'The Woodlands',
      neighborhoods: [
        'Village of Cochran’s Crossing',
        'Village of Indian Springs',
        'Village of Sterling Ridge',
        'Village of Alden Bridge',
        'Town Center / East Shore edges',
        'Creekside Park (as applicable)',
      ],
      housingTypes:
        'Master-planned HOA SFH, townhomes, some mid-rise and multi-family near Town Center',
      challenges: [
        'Strict HOA COI, gate lists, and approved move hours',
        'Canopy clearance and forested-lot long carries',
        'I-45 / Research Forest / Woodlands Parkway congestion',
        'High family and corporate transfer volume',
      ],
      moverTips:
        'Collect village HOA packets before booking. Measure canopy and driveway clearance. Prefer weekday morning windows. Woodlands ↔ Conroe is a multi-zone haul — price portal time honestly.',
      cityKeywords: [
        'the woodlands',
        'woodlands',
        'cochran',
        'alden bridge',
        'sterling ridge',
        'creekside park',
      ],
    },
    {
      id: 'conroe-core-growth',
      name: 'Conroe core & northern growth',
      shortName: 'Conroe',
      neighborhoods: [
        'Downtown / historic Conroe',
        'South Conroe growth',
        'North Conroe tracts',
        'Grand Central Park and similar villages',
        'FM 1488 / 105 corridor residential',
      ],
      housingTypes:
        'Mix of older SFH, newer HOA tracts, multi-family, some large two-story product',
      challenges: [
        'Mixed historic-grid staging vs new HOA rules',
        'I-45 interchange timing',
        'High inbound volume from north Houston spillover',
        'School-calendar Saturday demand',
      ],
      moverTips:
        'Clarify HOA vs non-HOA rules by address. Early summer starts beat heat. Price Conroe ↔ Woodlands and Conroe ↔ Magnolia with honest arterial time.',
      cityKeywords: [
        'conroe',
        'grand central park',
        'downtown conroe',
        'fm 1488',
      ],
    },
    {
      id: 'lake-conroe',
      name: 'Lake Conroe edges & waterfront approaches',
      shortName: 'Lake Conroe',
      neighborhoods: [
        'Lake Conroe west/east shores',
        'Montgomery (city) lake-adjacent',
        'Cape Conroe and similar communities',
        'Private road and gated lake villages',
      ],
      housingTypes:
        'Waterfront and lake-view SFH, gated communities, some multi-family and weekend homes',
      challenges: [
        'Private roads, gates, and limited truck turnaround',
        'Weekend recreation traffic',
        'Weather-sensitive docks and soft approaches',
        'Longer deadhead from I-45 core crews',
      ],
      moverTips:
        'Share approach, gate, and turnaround photos. Avoid peak lake-weekend staging when flexible. Confirm vehicle size for private roads before dispatch.',
      cityKeywords: [
        'lake conroe',
        'montgomery tx',
        'cape conroe',
        'lake',
        'waterfront',
      ],
    },
    {
      id: 'magnolia-west',
      name: 'Magnolia, Tomball-edge & western growth',
      shortName: 'Magnolia / West',
      neighborhoods: [
        'Magnolia',
        'Todd Mission edge',
        'FM 1774 / 1488 west corridors',
        'Tomball-adjacent Montgomery County pockets',
        'Newer west master-planned tracts',
      ],
      housingTypes:
        'Newer HOA SFH, larger-lot suburban, some multi-family and rural-edge',
      challenges: [
        'HOA COI in planned villages',
        'Longer arterials to I-45 / Woodlands job centers',
        'New-construction incomplete roads',
        'Lower service density than Woodlands core',
      ],
      moverTips:
        'Collect HOA packets early. Confirm access the week of the move in new sections. Magnolia ↔ Woodlands is a classic underquoted local.',
      cityKeywords: [
        'magnolia',
        'tomball',
        'fm 1774',
        'magnolia tx',
      ],
    },
    {
      id: 'spring-oak-ridge-south',
      name: 'Spring, Oak Ridge North & southern I-45 edge',
      shortName: 'Spring / South',
      neighborhoods: [
        'Spring (Montgomery portions)',
        'Oak Ridge North',
        'Shenandoah',
        'I-45 southern corridor multi-family',
        'Harris County line edges',
      ],
      housingTypes:
        'Suburban SFH, multi-family, townhomes, some HOA tracts',
      challenges: [
        'Peak I-45 congestion toward Houston',
        'Apartment elevator windows and COI',
        'Cross-county pairs into Harris employment centers',
        'High end-of-month lease churn',
      ],
      moverTips:
        'Price portal-to-portal time for Spring-edge ↔ Woodlands or downtown Houston pairs honestly. Collect apartment management rules early.',
      cityKeywords: [
        'spring',
        'oak ridge north',
        'shenandoah',
        'i-45',
        'spring tx',
      ],
    },
    {
      id: 'east-exurban',
      name: 'New Caney, Porter, Splendora & east exurban',
      shortName: 'East Exurban',
      neighborhoods: [
        'New Caney',
        'Porter',
        'Splendora',
        'Roman Forest edge',
        'East FM 1314 / 1485 corridors',
      ],
      housingTypes:
        'Larger-lot SFH, acreage edges, some newer tracts, limited multi-unit',
      challenges: [
        'Long deadhead and lower service density',
        'Soft shoulders and private-road access',
        '99 / east arterial timing',
        'Not interchangeable with Woodlands HOA logistics',
      ],
      moverTips:
        'Send driveway and road-surface photos. Confirm truck size. East exurban ↔ Woodlands or Conroe needs explicit time and access pricing.',
      cityKeywords: [
        'new caney',
        'porter',
        'splendora',
        'roman forest',
        'porter tx',
      ],
    },
  ],
  costDrivers: {
    title: 'Pricing & cost drivers inside Montgomery County',
    intro:
      'Two “local” moves of the same square footage can differ sharply depending on Woodlands HOA soft costs, canopy carries, Lake Conroe access, I-45 portal time, and whether the pair stays in village core or stretches to Magnolia or east exurban edges.',
    drivers: [
      {
        title: 'Woodlands HOA & canopy access',
        detail:
          'COI, approved hours, gate lists, and forested long carries add soft costs and labor hours before the truck rolls far.',
      },
      {
        title: 'I-45 / cross-zone corridor time',
        detail:
          'Woodlands ↔ Conroe, Spring-edge ↔ Magnolia, or any peak I-45 leg can burn far more clock than map miles suggest.',
      },
      {
        title: 'Lake Conroe private-road access',
        detail:
          'Gates, limited turnaround, and waterfront approaches add delay risk — photos prevent underquotes.',
      },
      {
        title: 'Exurban deadhead (east / far north)',
        detail:
          'New Caney, Splendora, and rural-north parcels lower crew density and raise portal time versus Woodlands core.',
      },
      {
        title: 'Peak school and corporate calendars',
        detail:
          'Late May–August weekends and transfer cycles raise booking lead times across planned villages.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (same zone, simple access)',
        value: '$450–$1,450+',
        note: 'Higher with elevators, HOA windows, or canopy long-carry',
      },
      {
        label: '2–3BR house / planned community',
        value: '$1,500–$4,300+',
        note: 'Woodlands HOA soft costs and multi-zone hauls trend up',
      },
      {
        label: '3–4+ BR (cross-zone / lake / exurban)',
        value: '$2,400–$7,200+',
        note: 'Lake access and east/west long locals price highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$115–$190+/hr',
        note: 'Portal-to-portal; packing and 3-person crews scale up',
      },
    ],
  },
  seasonal: {
    title: 'Seasonal, heat, storm & school-calendar intelligence',
    intro:
      'Gulf Coast heat, tropical systems, piney-woods weather, and north Houston school calendars set residential peaks across Montgomery County.',
    items: [
      {
        title: 'Peak residential: late spring – early fall weekends',
        detail:
          'School calendars and end-of-month leases fill Saturdays across The Woodlands, Conroe, and Spring-edge. Book 2–4 weeks ahead for popular village HOA windows.',
      },
      {
        title: 'Summer heat under canopy still matters',
        detail:
          'Forested lots do not eliminate heat stress on long carries. Prefer early starts and heat-safe packing for electronics and sealed goods.',
      },
      {
        title: 'Tropical storm / heavy-rain windows',
        detail:
          'Storm systems can flood approaches and cancel outdoor packing — especially near lake and low edges. Build flexibility and ask about weather policies.',
      },
      {
        title: 'Lake-weekend recreation traffic',
        detail:
          'Peak summer weekends near Lake Conroe complicate staging. Mid-week or early-morning starts usually stage cleaner.',
      },
      {
        title: 'Best value: mid-month Tue–Thu mornings',
        detail:
          'Still plan around HOA weekday windows. Avoid last Friday/Saturday of the month when leases and family moves collide.',
      },
    ],
  },
  specialized: [
    {
      id: 'woodlands-hoa-canopy',
      title: 'The Woodlands HOA, canopy & village logistics module',
      intro:
        'Montgomery County’s signature problem is planned-village paperwork plus forested-lot access — not open prairie cul-de-sacs alone.',
      bullets: [
        'Collect village HOA COI, gate lists, and approved hours before the survey is final.',
        'Measure canopy clearance, driveway width, and turnaround for forested lots before dispatching a full-size truck.',
        'Prefer weekday morning windows near Town Center and school corridors.',
        'Price Woodlands internal village-to-village pairs honestly — parkway congestion still bills on the clock.',
        'Corporate and healthcare transfers often need mid-week freight-style precision — confirm elevator rules near Town Center multi-unit.',
      ],
    },
    {
      id: 'conroe-lake-exurban-growth',
      title: 'Conroe growth, Lake Conroe & exurban expansion module',
      intro:
        'North and east growth need long-local pricing and access photos that Woodlands village jobs may not.',
      bullets: [
        'Share private-road and waterfront approach photos for Lake Conroe addresses.',
        'Confirm new-construction access the week of the move in Conroe and Magnolia growth sections.',
        'Ask whether “local” rate cards still apply for New Caney / Splendora / far Magnolia legs.',
        'Map peak I-45 timing for Spring-edge pairs into Harris County employment.',
        'Rural and acreage edges need soft-shoulder and truck-size confirmation before booking.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Montgomery County?',
    intro:
      'The Woodlands planned living, Conroe growth, Lake Conroe recreation, and east exurban edges are different bets — pick the pocket first, then validate schools, healthcare, I-45 commute tolerance, and HOA lifestyle fit.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & education',
        intro:
          'Montgomery County spans multiple districts (e.g., Conroe ISD — including The Woodlands area campuses — Magnolia ISD, New Caney ISD, Willis ISD, Montgomery ISD, and others). Match every listing address to the correct district.',
        bullets: [
          {
            title: 'Town-first district check',
            detail:
              'Use official district boundary tools and TEA resources. Marketing community names and unincorporated pockets can span feeders.',
          },
          {
            title: 'Woodlands vs growth systems',
            detail:
              'Enrollment pressures and facility plans differ between established Woodlands-area campuses and rapid Conroe / east-county growth — do not treat county averages as neighborhood truth.',
          },
          {
            title: 'Research tools',
            detail:
              'District sites and TEA data should lead; third-party rankings are secondary signals only.',
          },
          {
            title: 'Higher education presence',
            detail:
              'Lone Star College and nearby Houston institutions shape some staff and student housing demand along the I-45 corridor.',
          },
        ],
      },
      {
        id: 'hospitals',
        title: 'Hospitals & healthcare',
        bullets: [
          {
            title: 'County acute-care anchors',
            detail:
              'Houston Methodist The Woodlands, Memorial Hermann The Woodlands, HCA Houston Conroe, and other north-metro campuses cover much of the county — map ER drive times at rush hour from your target village or lake edge.',
          },
          {
            title: 'Houston specialty spillover',
            detail:
              'Some residents use Texas Medical Center specialty systems. Confirm insurer networks and realistic I-45 appointment drive times.',
          },
          {
            title: 'Relocator tip',
            detail:
              'Transfer pediatric and specialty care early if mid-treatment; book first appointments before peak summer village move chaos.',
          },
        ],
      },
      {
        id: 'housing',
        title: 'Housing & cost of living',
        bullets: [
          {
            title: 'Price ladder by pocket',
            detail:
              'Woodlands villages, Conroe growth, Lake Conroe waterfront, and east exurban lots often price differently. Compare total monthly costs (HOA, insurance, commute), not sticker price alone.',
          },
          {
            title: 'HOA-dominant Woodlands stock',
            detail:
              'Village covenants, dues, and move-day restrictions are part of the lifestyle cost in much of the south-central core.',
          },
          {
            title: 'Flood / drainage awareness',
            detail:
              'Gulf Coast drainage and low-edge parcels can affect insurance and access — verify by address, not by community marketing name.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Town fit by lifestyle',
        bullets: [
          {
            title: 'The Woodlands planned living',
            detail:
              'Amenity villages, trails, and corporate adjacency — with HOA paperwork and canopy access on move day.',
          },
          {
            title: 'Conroe growth & town character',
            detail:
              'Mix of historic core and new tracts — with I-45 timing and expanding inventory.',
          },
          {
            title: 'Lake Conroe recreation',
            detail:
              'Waterfront lifestyle — only if you accept private-road logistics and weekend traffic.',
          },
          {
            title: 'West growth / east exurban',
            detail:
              'Magnolia newer housing or New Caney larger lots — with longer service distances and different HOA density.',
          },
        ],
      },
      {
        id: 'jobs',
        title: 'Jobs & commute',
        bullets: [
          {
            title: 'Local anchors',
            detail:
              'Healthcare, corporate campuses near The Woodlands, retail, education, energy-services spillover, and growing Conroe commercial nodes.',
          },
          {
            title: 'I-45 north Houston patterns',
            detail:
              'Many residents commute within Montgomery or into Harris County. Peak I-45 and 99 times should drive housing choice more than brochure distance.',
          },
          {
            title: 'Hybrid / local options',
            detail:
              'Some professional and remote-capable roles reduce daily metro trips — still validate broadband and coworking by pocket if that matters to you.',
          },
        ],
      },
      {
        id: 'lifestyle',
        title: 'Lifestyle & climate',
        bullets: [
          {
            title: 'Piney-woods & Gulf Coast climate',
            detail:
              'Hot, humid summers, mild winters, canopy shade, and tropical-storm season — plan move windows around heat and weather alerts.',
          },
          {
            title: 'Outdoors',
            detail:
              'Trails, parks, and Lake Conroe recreation are major draws; weekend traffic affects lake-edge staging.',
          },
          {
            title: 'Suburban vs exurban choice',
            detail:
              'Village amenity living and east/west larger-lot living coexist — visit both on a weekday commute and a Saturday before choosing.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Practical Montgomery County resources',
    intro:
      'Official links and licensing notes — HOA, parking, and community rules change; verify before move day.',
    items: [
      {
        label: 'Montgomery County',
        href: 'https://www.mctx.org/',
        note: 'County services hub',
        external: true,
      },
      {
        label: 'The Woodlands Township',
        href: 'https://www.thewoodlandstownship-tx.gov/',
        external: true,
      },
      {
        label: 'City of Conroe',
        href: 'https://www.cityofconroe.org/',
        external: true,
      },
      {
        label: 'City of Magnolia',
        href: 'https://www.cityofmagnolia.com/',
        external: true,
      },
      {
        label: 'City of Oak Ridge North',
        href: 'https://www.oakridgenorth.com/',
        external: true,
      },
      {
        label: 'City of Shenandoah',
        href: 'https://www.shenandoahtx.us/',
        external: true,
      },
      {
        label: 'TxDOT — road conditions & construction',
        href: 'https://www.txdot.gov/',
        note: 'Check I-45 and corridor delays for long locals',
        external: true,
      },
      {
        label: 'TxDMV — motor carrier / household goods',
        href: 'https://www.txdmv.gov/',
        note: 'Texas Department of Motor Vehicles (intrastate frameworks)',
        external: true,
      },
      {
        label: 'FMCSA SAFER — interstate authority',
        href: 'https://safer.fmcsa.dot.gov/',
        note: 'Required when the move crosses state lines',
        external: true,
      },
      {
        label: 'Move Trust Hub — verify a USDOT',
        href: '/verify-dot',
        note: 'Cross-check interstate licensing before deposits',
      },
      {
        label: 'Free moving calculator',
        href: '/moving-calculator',
        note: 'Inventory-based volume for local or long-distance',
      },
    ],
  },
  directoryHint:
    'Filter listings by zone (The Woodlands, Conroe, Lake Conroe, Magnolia/West, Spring/South, East Exurban) when available. Confirm village HOA/COI and canopy access for The Woodlands, lake approach photos for waterfront, and honest I-45 time — not Fort Bend or downtown Houston assumptions.',
  lastReviewed: '2026-07-23',
};

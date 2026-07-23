import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';

/**
 * Hand-crafted Harris County, Texas moving intelligence.
 * Differentiators: Houston sprawl, Energy Corridor, flooding/bayou, urban core vs suburbs, extreme distance —
 * not DFW freeway grid, Austin density/tech, or San Antonio military sprawl.
 */
export const harrisCountyIntelligence: CountyIntelligencePack = {
  stateSlug: 'texas',
  countySlug: 'harris',
  hubTitle: 'Harris County Moving Intelligence Hub',
  eyebrow: 'Harris · Houston core, Energy Corridor & bayou sprawl',
  h1: 'Moving in Harris County: Houston Core, Energy Corridor & Suburb Distance Guide',
  heroOpener:
    'Harris County is Texas’s largest urban-sprawl engine: downtown and Midtown towers on one side, the Energy Corridor and west-side master plans on another, and bayou-adjacent neighborhoods where elevation and flood history matter as much as square footage. A Museum District bungalow, a Galleria high-rise, a Katy-edge two-story, and a Clear Lake ranch do not share truck access, drive time, or weather risk. Intra-county “local” moves routinely burn 45–90+ minutes portal-to-portal on I-10, I-45, I-69/US-59, Beltway 8, and the Grand Parkway. This hub is for people actually moving in Harris — not generic Texas tips recycled from Dallas or Austin.',
  heroCredibility:
    'TxDMV household goods for intrastate Texas moves · FMCSA for interstate legs · Houston sprawl & flood-zone awareness · Curated directory listings',
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
    title: 'What makes moving in Harris County different',
    intro:
      'These are Harris realities — extreme distance under one county label, bayou flood risk, and energy-corridor corporate demand — not interchangeable “Houston metro” boilerplate.',
    bullets: [
      {
        title: 'Sprawl turns “local” into regional drive time',
        detail:
          'Downtown ↔ Katy, Midtown ↔ The Woodlands-edge, or Heights ↔ Clear Lake pairs often look short on a map and long on a clock. Portal-to-portal billing tracks real freeway peaks, not crow-flies miles.',
      },
      {
        title: 'Urban core vertical is a different job than west-side SFH',
        detail:
          'Downtown, Midtown, Museum District, and Montrose towers need COI, elevators, and tight curb staging. Energy Corridor, Katy, Cypress, and Spring flip to HOA cul-de-sacs, long driveway carries, and gate lists.',
      },
      {
        title: 'Bayous, flooding, and elevation change risk and access',
        detail:
          'Parcels near Buffalo Bayou, White Oak, Brays, and other systems can face flood-mapped insurance costs and storm-related reschedules. Low-elevation streets may limit truck placement after heavy rain.',
      },
      {
        title: 'Energy Corridor and corporate campus density',
        detail:
          'West Houston energy and professional campuses create weekday congestion on I-10 and Beltway 8 and drive mid-month corporate relocation demand that pure residential markets do not see.',
      },
      {
        title: 'Medical Center and university calendars spike volume',
        detail:
          'Texas Medical Center apartments, Rice/UH-adjacent multi-family, and student turnover create concentrated move windows that compete with family summer demand.',
      },
      {
        title: 'Heat and humidity slow open carries',
        detail:
          'Summer heat stress on open suburban streets and loading docks is a labor-hours factor. Early starts outperform noon load-outs from June through September.',
      },
      {
        title: 'Multi-county Houston metro pairs are common',
        detail:
          'Households regularly move Harris ↔ Fort Bend, Montgomery, or Brazoria. Clarify county lines on the estimate so drive time and licensing assumptions stay accurate.',
      },
      {
        title: 'Intrastate Texas rules vs interstate authority',
        detail:
          'Moves entirely within Texas are generally subject to Texas Department of Motor Vehicles (TxDMV) household-goods motor-carrier frameworks. Interstate legs need active FMCSA USDOT (and usually MC) authority.',
      },
    ],
  },
  zonesHeading: 'Harris access zones',
  zonesIntro:
    'Plan by Houston urban core, Inner Loop neighborhoods, Energy Corridor / west side, north suburbs, southeast / Clear Lake, and outer-belt growth — each has its own access, flood, and traffic profile.',
  zones: [
    {
      id: 'houston-core',
      name: 'Houston urban core: Downtown, Midtown & EaDo',
      shortName: 'Houston Core',
      neighborhoods: [
        'Downtown Houston',
        'Midtown',
        'EaDo',
        'Warehouse District edges',
        'South Central edges',
        'Museum District north edges',
      ],
      housingTypes:
        'High-rises and mid-rises, urban condos, lofts, multi-family redevelopment product',
      challenges: [
        'Elevator/COI and loading-dock reservations',
        'Event and stadium traffic near downtown',
        'Limited curb staging and street permits',
        'Tunnel/garage height limits on some buildings',
      ],
      moverTips:
        'Get building packets early. Prefer mid-week morning freight windows. Avoid major event days when flexible. Share dock photos and truck height limits before the survey is final.',
      cityKeywords: [
        'houston',
        'downtown houston',
        'midtown',
        'eado',
        'museum district',
      ],
    },
    {
      id: 'inner-loop',
      name: 'Inner Loop: Heights, Montrose, Museum District & River Oaks edges',
      shortName: 'Inner Loop',
      neighborhoods: [
        'The Heights',
        'Montrose',
        'Museum District',
        'Rice Village edges',
        'River Oaks edges',
        'West University / Southside Place edges',
      ],
      housingTypes:
        'Older SFH and bungalows, multi-story renovations, townhomes, mid-rise multi-family',
      challenges: [
        'Narrow streets and limited truck length',
        'Mature trees and driveway constraints',
        'High-value contents and careful-handling norms',
        'Bayou-adjacent flood considerations on mapped parcels',
      ],
      moverTips:
        'Photo driveway width, street turns, and stairs. Discuss valuation for higher-value inventories. Prefer early starts near school and Medical Center corridors.',
      cityKeywords: [
        'heights',
        'montrose',
        'museum district',
        'river oaks',
        'west university',
        'rice village',
      ],
    },
    {
      id: 'energy-corridor-west',
      name: 'Energy Corridor, Memorial & west Houston',
      shortName: 'Energy Corridor',
      neighborhoods: [
        'Energy Corridor',
        'Memorial',
        'CityCentre edges',
        'Briarforest',
        'Westchase',
        'Memorial Villages edges',
      ],
      housingTypes:
        'Corporate-adjacent multi-family, mid-rises, SFH tracts, townhomes, HOA communities',
      challenges: [
        'I-10 / Beltway 8 weekday corporate congestion',
        'HOA rules in planned pockets',
        'Long portal time to east-side origins',
        'Mixed elevator and SFH product under one zip pattern',
      ],
      moverTips:
        'Price I-10 and Beltway peaks honestly. Collect HOA packets for gated villages. Mid-week mornings reduce corporate commute collisions with load windows.',
      cityKeywords: [
        'energy corridor',
        'memorial',
        'westchase',
        'briarforest',
        'citycentre',
        'katy freeway',
      ],
    },
    {
      id: 'north-suburbs',
      name: 'North: Spring, Cypress, Tomball & Willowbrook edges',
      shortName: 'North Suburbs',
      neighborhoods: [
        'Spring',
        'Cypress',
        'Tomball edges',
        'Willowbrook',
        'Champions / FM 1960 corridor',
        'Klein edges',
      ],
      housingTypes:
        'Suburban SFH, master-planned communities, townhomes, multi-family along freeways',
      challenges: [
        'I-45 / Hardy / Grand Parkway congestion',
        'HOA COI and gate lists in newer villages',
        'Long empty-mile time from core staging',
        'Confusion near Montgomery County line addresses',
      ],
      moverTips:
        'Treat north suburbs as HOA-first distance work. Clarify Harris vs Montgomery destinations. Book summer Saturdays early — family SFH demand fills first.',
      cityKeywords: [
        'spring',
        'cypress',
        'tomball',
        'willowbrook',
        'champions',
        'klein',
      ],
    },
    {
      id: 'southeast-clear-lake',
      name: 'Southeast: Clear Lake, Pasadena, Deer Park & Bay Area',
      shortName: 'SE / Clear Lake',
      neighborhoods: [
        'Clear Lake',
        'Pasadena',
        'Deer Park',
        'La Porte edges',
        'Baytown west edges',
        'NASA / Bay Area corridor',
      ],
      housingTypes:
        'Suburban SFH, multi-family, industrial-adjacent housing, waterfront and lake-area product',
      challenges: [
        'I-45 South / Beltway 8 / SH-146 industrial and refinery traffic',
        'Long legs to west-side destinations',
        'Hurricane and flood exposure on lower-elevation parcels',
        'Mix of quiet cul-de-sacs and heavy industrial corridors',
      ],
      moverTips:
        'Build industrial-corridor buffer on weekdays. Confirm flood and storm contingency for bay-adjacent parcels. Price southeast ↔ west-side pairs as multi-hour portal jobs when peak traffic applies.',
      cityKeywords: [
        'clear lake',
        'pasadena',
        'deer park',
        'la porte',
        'baytown',
        'nasa',
      ],
    },
    {
      id: 'outer-west-growth',
      name: 'Outer west growth: Katy, Fulshear edges & Grand Parkway belt',
      shortName: 'Katy / Outer West',
      neighborhoods: [
        'Katy (Harris side)',
        'Cinco Ranch edges',
        'Fulshear approach (note: Fort Bend border)',
        'Grand Parkway west villages',
        'Brookshire approach edges',
      ],
      housingTypes:
        'Large newer SFH tracts, HOA master-planned communities, townhomes, multi-family along I-10 west',
      challenges: [
        'Extreme I-10 / Grand Parkway portal time to core',
        'Dense HOA rules and construction traffic',
        'High summer Saturday demand',
        'County-line confusion with Fort Bend addresses',
      ],
      moverTips:
        'Never price Katy-edge ↔ downtown as a short local hop without traffic buffer. Collect HOA packets early. Clarify Harris vs Fort Bend jurisdiction on every address.',
      cityKeywords: [
        'katy',
        'cinco ranch',
        'fulshear',
        'grand parkway',
        'brookshire',
      ],
    },
  ],
  costDrivers: {
    title: 'What drives Harris moving costs',
    intro:
      'Ranges are market context for local / short regional moves — not quotes. Core elevator soft costs and sprawl portal time separate cheap estimates from real bills.',
    drivers: [
      {
        title: 'Downtown elevator, COI & dock soft costs',
        detail:
          'Building packets, elevator reservations, and certificate admin add time before loading starts on core towers.',
      },
      {
        title: 'Sprawl congestion (I-10 / I-45 / Beltway 8 / Grand Parkway)',
        detail:
          'Portal-to-portal billing tracks freeway peaks. Core ↔ Katy or Heights ↔ Clear Lake can burn 45–90+ minutes each way at rush.',
      },
      {
        title: 'HOA and master-planned community rules',
        detail:
          'Gate lists, COI, and weekday-only windows in west and north villages push demand into peak pricing.',
      },
      {
        title: 'Older Inner Loop access & long carries',
        detail:
          'Tight grids, stairs, mature landscaping, and limited driveway depth raise labor hours vs new cul-de-sac product.',
      },
      {
        title: 'Flood, storm, and heat delays',
        detail:
          'Weather holds, wet staging, and heat-safe pacing can extend job hours on open suburban streets and docks.',
      },
      {
        title: 'Cross-county Houston metro patterns',
        detail:
          'Harris ↔ Fort Bend, Montgomery, or Brazoria stops need honest distance assumptions in the written estimate.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (simple access)',
        value: '$500–$1,400+',
        note: 'Higher with elevators, docks, or peak sprawl traffic',
      },
      {
        label: '2–3BR condo or modest SFH',
        value: '$1,600–$4,200+',
        note: 'HOA soft costs and older-grid carries trend up',
      },
      {
        label: '3–4+ BR / core tower / cross-zone',
        value: '$2,800–$8,000+',
        note: 'Downtown towers and long west/north pairs price highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$120–$190+/hr',
        note: 'Portal-to-portal; packing and larger crews scale up',
      },
    ],
  },
  seasonal: {
    title: 'When to schedule a Harris move',
    intro:
      'School calendars, Medical Center and university turnover, summer heat, and hurricane season all reshape access and crew availability.',
    items: [
      {
        title: 'Best truck windows: mid-week mornings',
        detail:
          'Tuesday–Thursday before 9 a.m. usually clear curb space and reduce I-10 / I-45 / Beltway pain. Avoid month-end Fridays when leases collide.',
      },
      {
        title: 'Peak family season: May–August',
        detail:
          'West and north growth suburbs and family SFH moves fill Saturday calendars. Book 2–4 weeks ahead for popular windows.',
      },
      {
        title: 'Medical Center & university turnover',
        detail:
          'TMC-adjacent multi-family and Rice/UH-area apartments can spike around academic and fellowship cycles. Avoid peak student weekends when flexible.',
      },
      {
        title: 'Hurricane season: June–November',
        detail:
          'Bayou-adjacent and low-elevation parcels need weather contingency. Confirm reschedule policies before deposits.',
      },
      {
        title: 'Summer heat & afternoon storms',
        detail:
          'Prefer early starts; plan tarps and dry staging when storms are forecast. Heat slows open carries on new-construction streets.',
      },
    ],
  },
  specialized: [
    {
      id: 'houston-core-vertical-bayou',
      title: 'Houston core vertical & bayou-edge access module',
      intro:
        'Downtown, Midtown, Heights, and Museum District jobs fail on docks, street width, and flood staging more often than on packing skill.',
      bullets: [
        'Request building move packets (COI, elevator hours, dock rules) at lease signing or escrow.',
        'Share dock, street, and driveway photos for towers and older Inner Loop homes.',
        'Reserve freight elevators in writing and reconfirm the day before.',
        'Build buffer for downtown events and bayou-adjacent wet-weather access.',
        'Discuss valuation for higher-value Heights / Montrose / Museum District inventories early.',
      ],
    },
    {
      id: 'energy-sprawl-hoa',
      title: 'Energy Corridor & outer-sprawl HOA module',
      intro:
        'West, north, and Katy-edge volume is often HOA logistics plus extreme freeway distance — not urban elevators.',
      bullets: [
        'Collect HOA COI, gate lists, and approved hours before the survey is final.',
        'Price portal-to-portal time honestly for any pair that rides I-10, I-45, Beltway 8, or Grand Parkway.',
        'Prefer early summer starts for heat on open suburban streets.',
        'Clarify Fort Bend or Montgomery border addresses so drive-time and licensing assumptions stay accurate.',
        'Book peak June–August Saturdays early — growth corridors fill first.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Harris County?',
    intro:
      'Use this as a practical fit checklist — schools, healthcare, urban vs sprawl lifestyle — then verify on district and hospital sites. No single ranking captures neighborhood fit.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & education landscape',
        intro:
          'Multiple independent school districts serve Harris County (Houston ISD, Cypress-Fairbanks, Katy, Spring, Pasadena, and others). Assignment is address-based.',
        bullets: [
          {
            title: 'How districts work here',
            detail:
              'Public K–12 is split across many ISDs rather than one county-wide system. Confirm zoning for any property — neighborhood marketing names do not guarantee school assignment.',
          },
          {
            title: 'Growth areas and capacity',
            detail:
              'West and north growth corridors can see enrollment pressure as new tracts open. Ask districts about capacity and busing when touring.',
          },
          {
            title: 'Research sources',
            detail:
              'District boundary tools, Texas Education Agency data, and independent comparison sites help — validate with campus visits.',
          },
        ],
      },
      {
        id: 'hospitals',
        title: 'Hospitals & healthcare access',
        bullets: [
          {
            title: 'Major systems',
            detail:
              'Texas Medical Center is one of the world’s largest medical complexes (including Houston Methodist, Memorial Hermann, MD Anderson, and other campuses). Regional systems also serve suburbs. Confirm networks and specialties for your household.',
          },
          {
            title: 'What relocators should do',
            detail:
              'Map peak-hour drive times from west or north suburbs to preferred TMC or regional facilities — sprawl congestion changes “nearby” on paper. Transfer records early.',
          },
        ],
      },
      {
        id: 'housing',
        title: 'Housing character & cost pressures',
        bullets: [
          {
            title: 'Urban vs sprawl stock',
            detail:
              'Expect denser multi-unit and older SFH inside the Loop; larger newer tracts dominate Energy Corridor west, Cypress/Spring, and Katy-edge patterns.',
          },
          {
            title: 'Insurance and flood',
            detail:
              'Bayou-adjacent and flood-mapped parcels can carry higher insurance costs. Check FEMA maps and insurance quotes before finalizing a budget.',
          },
          {
            title: 'HOA prevalence',
            detail:
              'Newer west and north communities often include dues and architectural rules. Read association documents carefully.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Which Harris areas fit whom',
        bullets: [
          {
            title: 'Urban and near-core lifestyle',
            detail:
              'Downtown, Midtown, Heights, Montrose, and Museum District suit people prioritizing shorter urban access and amenities over new-tract square footage.',
          },
          {
            title: 'Energy Corridor and west family suburbs',
            detail:
              'Memorial, Energy Corridor multi-family, and Katy-edge master plans often appeal for newer homes and corporate proximity — with long east-side commute risk.',
          },
          {
            title: 'Southeast / Clear Lake patterns',
            detail:
              'Clear Lake and Bay Area corridors attract NASA/aerospace-adjacent households and quieter suburban living; verify industrial corridor traffic and flood maps.',
          },
        ],
      },
      {
        id: 'jobs',
        title: 'Jobs & commute patterns',
        bullets: [
          {
            title: 'Employment anchors',
            detail:
              'Energy, healthcare (TMC), port and logistics, aerospace (Clear Lake / NASA corridor), professional services, and corporate offices shape local employment.',
          },
          {
            title: 'Commute realism',
            detail:
              'Most households are car-dependent. I-10, I-45, I-69/US-59, Beltway 8, and Grand Parkway peaks are real. Test drive peak routes from outer suburbs before choosing solely on purchase price.',
          },
        ],
      },
      {
        id: 'lifestyle',
        title: 'Lifestyle & practical livability',
        bullets: [
          {
            title: 'Scale without a single “center of gravity”',
            detail:
              'Harris offers dense urban cores, bayou greenways, and vast inland suburbs under one county — a different pattern than compact Austin cores or Fort Worth’s western industrial edge.',
          },
          {
            title: 'Climate',
            detail:
              'Hot humid summers, frequent storms, and hurricane season. Plan outdoor staging and storm readiness as part of move-in.',
          },
          {
            title: 'Growth pace',
            detail:
              'West and north corridors can feel construction-heavy. Visit at commute hours to understand traffic and noise before deciding.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Harris resources',
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify mover registration before deposits.',
    items: [
      {
        label: 'Harris County — official site',
        href: 'https://www.harriscountytx.gov/',
        external: true,
        note: 'County services & offices',
      },
      {
        label: 'City of Houston',
        href: 'https://www.houstontx.gov/',
        external: true,
      },
      {
        label: 'Houston ISD',
        href: 'https://www.houstonisd.org/',
        external: true,
        note: 'Boundaries & calendars (one of several ISDs)',
      },
      {
        label: 'Cypress-Fairbanks ISD',
        href: 'https://www.cfisd.net/',
        external: true,
      },
      {
        label: 'Katy ISD',
        href: 'https://www.katyisd.org/',
        external: true,
      },
      {
        label: 'Houston TranStar — traffic conditions',
        href: 'https://traffic.houstontranstar.org/',
        external: true,
        note: 'I-10, I-45, Beltway before load windows',
      },
      {
        label: 'FEMA Flood Map Service Center',
        href: 'https://msc.fema.gov/portal/home',
        external: true,
        note: 'Check parcel flood zones',
      },
      {
        label: 'TxDMV — household goods movers',
        href: 'https://www.txdmv.gov/motor-carriers/household-goods-movers',
        external: true,
        note: 'Intrastate Texas household-goods motor carrier resources',
      },
      {
        label: 'FMCSA SAFER — interstate authority',
        href: 'https://safer.fmcsa.dot.gov/',
        external: true,
        note: 'Required when the move crosses state lines',
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
      {
        label: 'All Texas local mover guides',
        href: '/local-movers/texas',
      },
    ],
  },
  directoryHint:
    'Prefer crews with downtown dock/elevator experience for core towers; HOA fluency and honest I-10 / Beltway timing for Energy Corridor, Katy, and north suburbs. Bayou-adjacent jobs need wet-weather contingency. Verify TxDMV for in-state moves and FMCSA for interstate legs.',
  lastReviewed: '2026-07-23',
};

import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';

/**
 * Hand-crafted Volusia County moving intelligence.
 * Daytona tourism peaks, coastal vs inland (DeLand), seasonal event calendars.
 */
export const volusiaCountyIntelligence: CountyIntelligencePack = {
  stateSlug: 'florida',
  countySlug: 'volusia',
  hubTitle: 'Volusia County Daytona–Inland Moving Intelligence Hub',
  eyebrow: 'Volusia County · Daytona coast & DeLand inland guide',
  h1: 'Moving in Volusia County: Daytona Tourism Peaks, Coastal Condos & Inland Town Logistics',
  heroOpener:
    'Volusia County is a coastal–inland split market — Daytona Beach event calendars and high-rise condos, Ormond and New Smyrna beach towns, Port Orange and mainland suburbs, and DeLand’s inland college-town character west of I-95. Bike Week, racing weekends, spring break, and summer A1A traffic can make a beachside “local” move feel like a production. This guide is Volusia-specific — not a renamed Miami page and not Central Florida theme-park logistics with different labels.',
  heroCredibility:
    'Daytona tourism peaks · Coastal vs inland split · Event-calendar aware · FDACS Ch. 507 (intrastate) · FMCSA when interstate · Curated listings',
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
    title: 'What makes moving in Volusia County different',
    intro:
      'Event-driven beach traffic, coastal elevators, and a true inland county seat culture (DeLand) define estimates more than generic “Florida beach town” filler.',
    bullets: [
      {
        title: 'Event calendars are operational inputs',
        detail:
          'Daytona International Speedway weekends, Bike Week, spring break, and major beach festivals pack hotels, A1A, and I-95 approaches. Truck hours expand when guest traffic peaks — check the event calendar before locking a load window.',
      },
      {
        title: 'Coastal vs inland is not cosmetic',
        detail:
          'Daytona / Ormond / New Smyrna beach product (elevators, sand, tourist parking) differs sharply from DeLand, Deltona, and western inland SFH tracts. Price them as different markets under one county name.',
      },
      {
        title: 'Beach high-rises and boardwalk-adjacent rules',
        detail:
          'Oceanfront towers often require COIs, reserved elevators, and strict time windows. Estimates that ignore building operations fail on event weeks especially.',
      },
      {
        title: 'Mainland suburbs sit between coast and I-4/I-95',
        detail:
          'Port Orange, South Daytona, and Ormond inland pockets can mean bridge/causeway timing to beach jobs plus corridor congestion toward Orlando or Jacksonville directions.',
      },
      {
        title: 'Student and retiree turnover layers',
        detail:
          'Stetson University rhythms in DeLand and retiree/snowbird patterns on the coast create different lease-end clusters than pure family suburban counties.',
      },
      {
        title: 'Long coastal strip distances',
        detail:
          'Ormond Beach ↔ New Smyrna Beach or Daytona ↔ far south coastal addresses burn A1A and arterial time that map miles understate in peak tourism.',
      },
      {
        title: 'Storm season on a barrier-influenced coast',
        detail:
          'Hurricane windows, beach renourishment periods, and low-lying parcels affect coastal scheduling and storage demand.',
      },
      {
        title: 'Florida licensing: FDACS Ch. 507 vs FMCSA',
        detail:
          'Intrastate household moves generally require FDACS registration under Chapter 507. Interstate legs need FMCSA authority. Match the legal name on the estimate to the correct registry.',
      },
    ],
  },
  zonesHeading: 'Volusia County zones: Daytona core, beach towns, mainland & DeLand inland',
  zonesIntro:
    'Treat event-week Daytona towers, quieter beach towns, mainland suburbs, and DeLand inland stock as separate access problems — not one “Daytona local” rate card.',
  zones: [
    {
      id: 'daytona-core',
      name: 'Daytona Beach core & oceanfront towers',
      shortName: 'Daytona core',
      neighborhoods: [
        'Daytona Beach',
        'Oceanfront / A1A corridors',
        'Boardwalk-adjacent blocks',
        'ISB commercial corridors',
        'Core multifamily and towers',
      ],
      housingTypes:
        'High-rise and mid-rise condos, hotels-adjacent multifamily, older beach SFH, dense tourist-core stock',
      challenges: [
        'Elevator/COI windows and limited staging',
        'Event-week and spring-break congestion',
        'Tourist parking competition',
        'Sand tracking and high guest foot traffic',
      ],
      moverTips:
        'Cross-check Speedway and major event calendars before booking. Reserve elevators early. Prefer non-event weekdays for oceanfront towers when flexible.',
      cityKeywords: [
        'daytona beach',
        'daytona',
        'a1a',
        'international speedway',
        'boardwalk',
      ],
    },
    {
      id: 'ormond-north',
      name: 'Ormond Beach & north coastal',
      shortName: 'Ormond / North',
      neighborhoods: [
        'Ormond Beach',
        'North A1A corridors',
        'Ormond-by-the-Sea edge',
        'Mainland Ormond suburbs',
        'North peninsula pockets',
      ],
      housingTypes:
        'Beach SFH and condos, mainland suburban SFH, multifamily, retiree-oriented stock',
      challenges: [
        'A1A summer traffic',
        'Mix of elevator and non-elevator buildings',
        'Cross-town hauls to New Smyrna or DeLand',
        'HOA rules in some mainland tracts',
      ],
      moverTips:
        'Separate beachside vs mainland Ormond addresses on the survey. Share driveway photos on canopied lots. Build A1A buffer in summer.',
      cityKeywords: [
        'ormond beach',
        'ormond',
        'ormond-by-the-sea',
        'north volusia',
      ],
    },
    {
      id: 'new-smyrna-south',
      name: 'New Smyrna Beach & south coastal',
      shortName: 'New Smyrna / South',
      neighborhoods: [
        'New Smyrna Beach',
        'South peninsula corridors',
        'NSB beachside and mainland split',
        'Edgewater edge',
        'South coastal multifamily',
      ],
      housingTypes:
        'Beach cottages and condos, elevated coastal SFH, mainland NSB suburbs, tourist multifamily',
      challenges: [
        'Bridge/causeway timing between beachside and mainland',
        'Weekend tourist parking scarcity',
        'Sand protection needs',
        'Storm and flood awareness on low parcels',
      ],
      moverTips:
        'Confirm beachside vs mainland NSB logistics. Budget floor protection. Avoid peak summer weekend loads when flexible.',
      cityKeywords: [
        'new smyrna beach',
        'new smyrna',
        'edgewater',
        'south volusia',
      ],
    },
    {
      id: 'port-orange-mainland',
      name: 'Port Orange, South Daytona & central mainland',
      shortName: 'Port Orange / Mainland',
      neighborhoods: [
        'Port Orange',
        'South Daytona',
        'Daytona mainland suburbs',
        'Dunlawton corridors',
        'Central mainland multifamily',
      ],
      housingTypes:
        'Suburban SFH, HOA villages, apartments, family tracts between coast and I-95',
      challenges: [
        'I-95 and arterial peaks on cross-county hauls',
        'HOA COI and approved hours',
        'High family-inventory weekend volume',
        'Bridge timing when either end is beachside',
      ],
      moverTips:
        'Send HOA packets with the estimate. Treat Port Orange ↔ DeLand or Port Orange ↔ NSB beachside as long locals with corridor timing.',
      cityKeywords: [
        'port orange',
        'south daytona',
        'dunlawton',
        'mainland daytona',
      ],
    },
    {
      id: 'deland-inland',
      name: 'DeLand, Stetson area & western inland',
      shortName: 'DeLand / Inland',
      neighborhoods: [
        'DeLand',
        'Stetson University area',
        'Western Volusia inland',
        'Historic downtown DeLand edges',
        'Rural-suburban west pockets',
      ],
      housingTypes:
        'College-town SFH and rentals, historic homes, suburban tracts, larger-lot inland properties',
      challenges: [
        'Student lease clusters near campus',
        'Long empty miles to beachside elevators',
        'Older historic streets with tight staging',
        'Different crew density than coastal cores',
      ],
      moverTips:
        'Book May/August student peaks early near Stetson. Confirm inland coverage and travel fees for coastal crews. Inventory historic-home stairs carefully.',
      cityKeywords: [
        'deland',
        'stetson',
        'west volusia',
        'inland volusia',
      ],
    },
    {
      id: 'deltona-orange-city',
      name: 'Deltona, Orange City & southwest growth',
      shortName: 'Deltona / SW',
      neighborhoods: [
        'Deltona',
        'Orange City',
        'DeBary edge',
        'Southwest Volusia suburbs',
        'I-4 corridor influence',
      ],
      housingTypes:
        'Suburban SFH, HOA communities, multifamily, commuter-oriented stock toward Orlando metro',
      challenges: [
        'I-4 congestion on Orlando-direction pairs',
        'Long hauls to Daytona beachside',
        'HOA rules in planned tracts',
        'High family-move volume on school calendars',
      ],
      moverTips:
        'Price Deltona ↔ Daytona Beach as a long local with I-4/I-95 assumptions. Send HOA packets early. Mid-week starts beat school peaks.',
      cityKeywords: [
        'deltona',
        'orange city',
        'debary',
        'southwest volusia',
      ],
    },
  ],
  costDrivers: {
    title: 'Pricing & cost drivers inside Volusia County',
    intro:
      'Event weeks, beach elevators, and coastal–inland distance move quotes more than square footage alone.',
    drivers: [
      {
        title: 'Event-week delay risk',
        detail:
          'Speedway, Bike Week, and spring break traffic expand billable hours on coastal jobs — especially hourly crews.',
      },
      {
        title: 'Oceanfront elevator & building soft costs',
        detail:
          'COIs, reserved elevators, and protection labor stack in Daytona and other beach towers.',
      },
      {
        title: 'Coastal–inland portal-to-portal distance',
        detail:
          'DeLand or Deltona ↔ beachside pairs burn empty miles that “Volusia local” labels hide.',
      },
      {
        title: 'A1A summer tourism congestion',
        detail:
          'Beach-strip hauls between Ormond, Daytona, and New Smyrna slow sharply on peak weekends.',
      },
      {
        title: 'HOA suburban rules',
        detail:
          'Port Orange, Deltona, and mainland tracts often restrict hours and require paperwork.',
      },
      {
        title: 'Storm-season flexibility',
        detail:
          'Coastal weather holds and storage pivots can require multi-day or contingent pricing structures.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (same zone, simple access)',
        value: '$450–$1,100+',
        note: 'Higher with oceanfront elevators or event-week windows',
      },
      {
        label: '2–3BR house / mainland HOA',
        value: '$1,600–$3,800+',
        note: 'Coastal–inland pairs and HOA soft costs trend up',
      },
      {
        label: '3–4+ BR (oceanfront / event week / long inland–coast)',
        value: '$2,200–$6,000+',
        note: 'Daytona towers and DeLand–beach pairs price highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$100–$160+/hr',
        note: 'Portal-to-portal; packing and 3-person crews scale up',
      },
    ],
  },
  seasonal: {
    title: 'Seasonal, event & storm intelligence',
    intro:
      'Volusia peaks follow Daytona event calendars, beach summers, student turns in DeLand, and hurricane season — not Orlando park calendars alone.',
    items: [
      {
        title: 'Major Daytona event windows',
        detail:
          'Speedway race weeks, Bike Week, and similar events can gridlock coastal access. Reschedule beachside tower moves off those peaks when possible.',
      },
      {
        title: 'Spring break & summer beach season',
        detail:
          'A1A parking and guest traffic worsen. Prefer mid-week early starts for oceanfront and NSB beachside jobs.',
      },
      {
        title: 'Student lease clusters (DeLand)',
        detail:
          'Stetson-area May/August turns fill crews near campus. Book early for small multifamily stacks.',
      },
      {
        title: 'Hurricane season (June–November)',
        detail:
          'Build flexible date language for coastal addresses. Confirm storage and reschedule policies before deposit.',
      },
      {
        title: 'Best value: mid-month Tue–Thu, non-event weeks',
        detail:
          'Still honor HOA weekday rules. Early starts beat heat and residual tourist traffic even in shoulder seasons.',
      },
    ],
  },
  specialized: [
    {
      id: 'daytona-events-coastal',
      title: 'Daytona events, oceanfront towers & A1A logistics',
      intro:
        'Volusia’s signature coastal problem is event-driven congestion plus building operations on the beach strip.',
      bullets: [
        'Cross-check Speedway, Bike Week, spring break, and major festival calendars before locking load windows.',
        'Reserve oceanfront elevators early; get COI naming and protection requirements in writing.',
        'Budget sand protection and limited staging plans for boardwalk-adjacent blocks.',
        'Price A1A Ormond ↔ New Smyrna hauls with summer tourist delay risk explicit.',
        'Prefer non-event weekdays for Daytona core towers when dates are flexible.',
      ],
    },
    {
      id: 'inland-coastal-split',
      title: 'Inland DeLand/Deltona vs coastal split & student module',
      intro:
        'Western inland towns and coastal product share a county name but not a rate card — and Stetson adds campus turnover inland.',
      bullets: [
        'Name both cities and coastal vs inland on every estimate; “Volusia local” is too vague.',
        'Price DeLand or Deltona ↔ Daytona Beach pairs as long locals with I-4/I-95 assumptions.',
        'Book Stetson-area lease peaks early; confirm complex elevator and parking rules.',
        'Send HOA packets for Port Orange, Deltona, and mainland planned tracts with the survey.',
        'Clarify whether coastal crews charge travel premiums for deep inland addresses.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Volusia County?',
    intro:
      'Daytona event energy, quieter beach towns, mainland suburbs, and DeLand inland living are different bets — pick tourism tolerance and commute direction first.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & education',
        intro:
          'Volusia County Schools covers the county with magnets, charters, and private options. Match every listing address to the correct zone.',
        bullets: [
          {
            title: 'Zone before beach branding',
            detail:
              'Use district boundary tools. Daytona, Ormond, New Smyrna, and Deltona marketing names span multiple feeders.',
          },
          {
            title: 'Coastal vs inland program access',
            detail:
              'Commute and bus patterns differ when families choose beachside living versus DeLand or Deltona — verify logistics, not only ratings.',
          },
          {
            title: 'Higher education presence',
            detail:
              'Stetson University and other campuses shape DeLand rental demand and traffic near campus edges.',
          },
          {
            title: 'Research tools',
            detail:
              'District sites and Florida DOE reports should lead; third-party rankings are secondary.',
          },
        ],
      },
      {
        id: 'hospitals',
        title: 'Hospitals & healthcare',
        bullets: [
          {
            title: 'Regional campuses',
            detail:
              'Halifax Health, AdventHealth campuses, and other facilities serve coastal and inland pockets. Map ER drive times from beachside addresses during event traffic.',
          },
          {
            title: 'Inland vs coastal access',
            detail:
              'DeLand and Deltona households may orient differently than oceanfront residents — test peak routes before committing.',
          },
          {
            title: 'Seasonal demand',
            detail:
              'Tourism and snowbird seasons can affect appointment availability; establish care early if relocating in peak months.',
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
              'Oceanfront towers, quieter beach towns, mainland suburbs, and inland DeLand/Deltona stock price differently. Insurance and flood exposure can dominate coastal monthly costs.',
          },
          {
            title: 'Stock variety',
            detail:
              'High-rises, beach cottages, HOA SFH, historic DeLand homes, and commuter suburbs each change move-day access.',
          },
          {
            title: 'Event-adjacent living costs',
            detail:
              'Near Speedway and beach cores, short-term rental pressure and noise/traffic are lifestyle costs — factor them beyond sticker price.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Town fit by lifestyle',
        bullets: [
          {
            title: 'Daytona Beach energy',
            detail:
              'Events, tourism, and oceanfront density — great for some, overwhelming for others during peak weeks.',
          },
          {
            title: 'Ormond / New Smyrna beach towns',
            detail:
              'Coastal lifestyle with somewhat different rhythms than Daytona core — still summer tourism real.',
          },
          {
            title: 'Port Orange mainland suburban',
            detail:
              'Family tracts between coast and interstate — HOA structure and corridor commutes common.',
          },
          {
            title: 'DeLand & Deltona inland',
            detail:
              'College-town character or Orlando-direction commuting — longer drives to beach elevators on move day and weekends.',
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
              'Tourism and hospitality, healthcare, education, retail, motorsports-related activity, and professional services are major themes.',
          },
          {
            title: 'I-95 / I-4 / A1A commute reality',
            detail:
              'Corridor choice and event traffic set drive times more than brochure distance. Test peak runs for any inland ↔ coastal pair.',
          },
          {
            title: 'Orlando-direction workers',
            detail:
              'Deltona / Orange City households often orient toward Orlando metro jobs — I-4 peaks are part of the lifestyle calculus.',
          },
        ],
      },
      {
        id: 'lifestyle',
        title: 'Lifestyle & climate',
        bullets: [
          {
            title: 'Beach + event culture',
            detail:
              'Racing, bike events, and beach tourism define peak weeks — plan daily life and move dates accordingly.',
          },
          {
            title: 'Heat, humidity & storms',
            detail:
              'Hot summers and hurricane season require early move starts and flexible coastal contracts.',
          },
          {
            title: 'Inland green & historic character',
            detail:
              'DeLand’s tree canopy and historic core offer a different Florida feel than A1A towers — access rules differ on move day too.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Practical Volusia County resources',
    intro:
      'Official links and licensing notes — event calendars, HOA rules, and FDACS registration change; verify before move day.',
    items: [
      {
        label: 'Volusia County Government',
        href: 'https://www.volusia.org/',
        note: 'County services hub',
        external: true,
      },
      {
        label: 'City of Daytona Beach',
        href: 'https://www.codb.us/',
        external: true,
      },
      {
        label: 'City of Ormond Beach',
        href: 'https://www.ormondbeach.org/',
        external: true,
      },
      {
        label: 'City of New Smyrna Beach',
        href: 'https://www.cityofnsb.com/',
        external: true,
      },
      {
        label: 'City of DeLand',
        href: 'https://www.deland.org/',
        external: true,
      },
      {
        label: 'City of Port Orange',
        href: 'https://www.port-orange.org/',
        external: true,
      },
      {
        label: 'Volusia County Schools',
        href: 'https://www.vcsedu.org/',
        external: true,
      },
      {
        label: 'FDACS — Moving companies (Ch. 507)',
        href: 'https://www.fdacs.gov/Business-Services/Moving-Companies',
        note: 'Intrastate household mover registration',
        external: true,
      },
      {
        label: 'FDACS — Moving within Florida',
        href: 'https://www.fdacs.gov/Consumer-Resources/Consumer-Rights-and-Responsibilities/Moving-Within-Florida',
        external: true,
      },
      {
        label: 'FDACS business search',
        href: 'https://csapp.fdacs.gov/cspublicapp/businesssearch/businesssearch.aspx',
        external: true,
      },
      {
        label: 'FMCSA SAFER — interstate authority',
        href: 'https://safer.fmcsa.dot.gov/',
        note: 'Required when the move crosses state lines',
        external: true,
      },
      {
        label: 'National Hurricane Center',
        href: 'https://www.nhc.noaa.gov/',
        external: true,
      },
      {
        label: 'FEMA flood maps',
        href: 'https://msc.fema.gov/portal/home',
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
    'Filter by zone (Daytona core, Ormond/North, New Smyrna/South, Port Orange/Mainland, DeLand/Inland, Deltona/SW). Confirm event calendars, coastal elevators, and FDACS registration.',
  lastReviewed: '2026-07-23',
};

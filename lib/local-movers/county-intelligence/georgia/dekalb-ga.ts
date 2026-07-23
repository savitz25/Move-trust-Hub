import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';

/**
 * Hand-crafted DeKalb County, Georgia moving intelligence.
 * Differentiators: intown-east + suburban mix, Emory/CDC influence, varied housing —
 * not Fulton Midtown/Downtown towers, Gwinnett I-85 HOA growth, or Cobb NW I-75 pattern.
 */
export const dekalbCountyIntelligence: CountyIntelligencePack = {
  stateSlug: 'georgia',
  countySlug: 'dekalb',
  hubTitle: 'DeKalb County Moving Intelligence Hub',
  eyebrow: 'DeKalb · Intown-east, Emory/CDC & suburban mix',
  h1: 'Moving in DeKalb County: Intown-East Access, Emory Area & Suburban Zone Guide',
  heroOpener:
    'DeKalb County is metro Atlanta\'s east-side contrast market: intown-adjacent neighborhoods with older streets and careful curb staging, Emory and CDC-area multi-family that tracks academic and institutional calendars, Decatur\'s walkable core, and outer suburban tracts toward Stone Mountain, Lithonia, and Tucker. A Kirkwood bungalow, a Decatur condo, a North Druid Hills apartment, and a Stonecrest single-family home do not share truck access, inventory profile, or drive-time risk. I-285, I-20, US-78, and Clairmont/North Decatur corridors rewrite "local" estimates that ignore micro-market access. This hub is for people actually moving in DeKalb — not generic Atlanta tips recycled from Buckhead towers or Gwinnett cul-de-sacs.',
  heroCredibility:
    'Georgia DPS / MCCD household goods for intrastate Georgia moves · FMCSA for interstate legs · Intown-east access & Emory-area awareness · Curated directory listings',
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
    title: 'What makes moving in DeKalb County different',
    intro:
      'These are DeKalb realities — intown-east access friction, Emory/CDC calendars, and east suburban distance — not interchangeable "east Atlanta" boilerplate.',
    bullets: [
      {
        title: 'Intown-east housing is access-first, not elevator-first',
        detail:
          'Kirkwood, Candler Park edges, East Lake, and many Decatur-adjacent streets mean narrow grids, mature trees, stairs, and limited truck length — different failure modes than Midtown freight elevators.',
      },
      {
        title: 'Emory and CDC corridors create institutional move spikes',
        detail:
          'Faculty, research, medical, and student-adjacent multi-family turnover clusters around academic and fellowship calendars. Building packets and mid-month windows matter near Clifton and North Decatur corridors.',
      },
      {
        title: 'Decatur density sits beside deep suburban DeKalb',
        detail:
          'A walkable Decatur multi-family load-out is a different job than a Lithonia or Stonecrest SFH — yet both are "local DeKalb." Name origin and destination neighborhoods on every estimate.',
      },
      {
        title: 'I-285 and I-20 turn east-county pairs into regional time',
        detail:
          'Brookhaven-edge ↔ Lithonia or Decatur ↔ Stone Mountain can burn 35–70+ minutes at peak. Portal-to-portal billing must track ring-road reality.',
      },
      {
        title: 'Housing stock varies more than marketing names suggest',
        detail:
          'Mid-century ranches, renovated bungalows, new townhomes, garden apartments, and master-planned east growth all appear under one county label. Survey stairs, driveway depth, and HOA rules separately.',
      },
      {
        title: 'County-line micro-markets confuse Fulton/Gwinnett borders',
        detail:
          'Brookhaven, Chamblee, Doraville, and Tucker-edge addresses often sit near other counties. Confirm jurisdiction so drive-time and licensing assumptions stay accurate.',
      },
      {
        title: 'Multi-stop and storage patterns are common for intown-east',
        detail:
          'Households often combine a DeKalb condo or bungalow with storage, a Fulton stop, or an outbound interstate leg. Confirm which license applies to the exact origin and destination.',
      },
      {
        title: 'Intrastate Georgia rules vs interstate authority',
        detail:
          'Moves entirely within Georgia are generally subject to Georgia DPS Motor Carrier Compliance Division (MCCD) household-goods frameworks. Interstate legs need active FMCSA USDOT (and usually MC) authority.',
      },
    ],
  },
  zonesHeading: 'DeKalb access zones',
  zonesIntro:
    'Plan by intown-east neighborhoods, Decatur core, Emory/CDC / North Druid Hills, north DeKalb (Brookhaven–Doraville), and south/east suburban DeKalb — access and calendars cluster by zone.',
  zones: [
    {
      id: 'intown-east',
      name: 'Intown-east: Kirkwood, East Lake, Candler Park edges',
      shortName: 'Intown East',
      neighborhoods: [
        'Kirkwood',
        'East Lake',
        'Candler Park edges',
        'Lake Claire edges',
        'Oakhurst edges',
        'East Atlanta edges (verify city/county)',
      ],
      housingTypes:
        'Older SFH and bungalows, multi-story renovations, townhomes, limited low-rise multi-family',
      challenges: [
        'Narrow streets and limited truck length',
        'Mature trees, stairs, and long carries',
        'High-value contents and careful-handling norms',
        'Spill into City of Atlanta / Fulton address confusion',
      ],
      moverTips:
        'Photo driveway width, street turns, overhead clearance, and stairs. Clarify DeKalb vs Fulton jurisdiction. Prefer early weekday starts near school corridors.',
      cityKeywords: [
        'kirkwood',
        'east lake',
        'candler park',
        'lake claire',
        'oakhurst',
        'east atlanta',
      ],
    },
    {
      id: 'decatur',
      name: 'City of Decatur & near-Decatur',
      shortName: 'Decatur',
      neighborhoods: [
        'Downtown Decatur',
        'Decatur Heights',
        'Winnona Park',
        'Clairemont corridor',
        'Medlock Park edges',
        'Decatur multi-family',
      ],
      housingTypes:
        'Walkable SFH, townhomes, condos, mid-rise multi-family, renovated historic stock',
      challenges: [
        'Tight downtown curb staging and event traffic',
        'Mixed elevator and stair access',
        'HOA/condo packets on multi-unit product',
        'Clairmont / College Avenue congestion',
      ],
      moverTips:
        'Get multi-family packets early. Prefer mid-week mornings for downtown-adjacent loads. Share curb and alley photos. Avoid festival and square event peaks when flexible.',
      cityKeywords: [
        'decatur',
        'winnona park',
        'clairemont',
        'medlock park',
        'decatur heights',
      ],
    },
    {
      id: 'emory-cdc',
      name: 'Emory, CDC, Druid Hills & North Druid Hills',
      shortName: 'Emory / CDC',
      neighborhoods: [
        'Druid Hills',
        'North Druid Hills',
        'Emory Village edges',
        'Clifton corridor',
        'Toco Hills edges',
        'Executive Park edges',
      ],
      housingTypes:
        'Multi-family and apartments, townhomes, older SFH, institutional-adjacent housing',
      challenges: [
        'Academic and institutional move calendar spikes',
        'Elevator/COI rules in multi-family clusters',
        'Clairmont / North Decatur / Briarcliff congestion',
        'Limited staging near campus and medical facilities',
      ],
      moverTips:
        'Align dates away from peak term-start weekends when flexible. Reserve elevators early. Build buffer for institutional corridor traffic. Confirm building staff contacts day-of.',
      cityKeywords: [
        'emory',
        'druid hills',
        'north druid hills',
        'toco hills',
        'clifton',
        'cdc',
      ],
    },
    {
      id: 'north-dekalb',
      name: 'North DeKalb: Brookhaven, Chamblee, Doraville & Dunwoody edges',
      shortName: 'North DeKalb',
      neighborhoods: [
        'Brookhaven',
        'Chamblee',
        'Doraville',
        'Dunwoody edges (verify county)',
        'Northlake edges',
        'Buford Highway corridor',
      ],
      housingTypes:
        'Mix of mid-rise multi-family, townhomes, older SFH, redevelopment product',
      challenges: [
        'I-85 / Buford Highway / I-285 congestion',
        'Elevator rules in denser multi-unit pockets',
        'County-line confusion with Fulton / Gwinnett',
        'Redevelopment staging and tight commercial corridors',
      ],
      moverTips:
        'Clarify DeKalb vs Fulton addresses near Brookhaven and Dunwoody. Survey multi-family elevators separately from SFH. Prefer mid-week mornings on Buford Highway pairs.',
      cityKeywords: [
        'brookhaven',
        'chamblee',
        'doraville',
        'dunwoody',
        'northlake',
        'buford highway',
      ],
    },
    {
      id: 'tucker-stone-mountain',
      name: 'Tucker, Stone Mountain & central-east DeKalb',
      shortName: 'Tucker / Stone Mtn',
      neighborhoods: [
        'Tucker',
        'Stone Mountain',
        'Clarkston',
        'Pine Lake',
        'Mountain Industrial corridor',
        'US-78 corridor',
      ],
      housingTypes:
        'Suburban SFH, split-levels, townhomes, multi-family, some HOA villages',
      challenges: [
        'US-78 / Stone Mountain Freeway congestion',
        'Older driveway and stair access on mid-century stock',
        'Long portal time to intown-east origins',
        'Park and event traffic near Stone Mountain on peak weekends',
      ],
      moverTips:
        'Price US-78 pairs honestly. Photo stairs and driveway slope on older homes. Avoid peak park-event windows for curb-dependent Stone Mountain jobs when flexible.',
      cityKeywords: [
        'tucker',
        'stone mountain',
        'clarkston',
        'pine lake',
        'mountain industrial',
      ],
    },
    {
      id: 'south-east-dekalb',
      name: 'South & east DeKalb: Lithonia, Stonecrest & beyond',
      shortName: 'SE DeKalb',
      neighborhoods: [
        'Lithonia',
        'Stonecrest',
        'Ellenwood edges',
        'Panola Road corridor',
        'I-20 east corridor',
        'Flat Shoals edges',
      ],
      housingTypes:
        'Suburban SFH tracts, newer growth homes, townhomes, multi-family corridors',
      challenges: [
        'I-20 east congestion and long empty-mile time from intown',
        'HOA rules in newer villages',
        'County-line confusion with Rockdale edges',
        'Heat and open-street carries on new construction',
      ],
      moverTips:
        'Never price Lithonia ↔ Decatur as a short hop without traffic buffer. Collect HOA packets for gated villages. Book summer family Saturdays early.',
      cityKeywords: [
        'lithonia',
        'stonecrest',
        'ellenwood',
        'panola',
        'flat shoals',
      ],
    },
  ],
  costDrivers: {
    title: 'What drives DeKalb moving costs',
    intro:
      'Ranges are market context for local / short regional moves — not quotes. Intown-east access friction, Emory-area multi-family soft costs, and I-285/I-20 portal time separate cheap estimates from real bills.',
    drivers: [
      {
        title: 'Intown-east stairs, trees & curb constraints',
        detail:
          'Narrow grids, long carries, and limited truck placement raise labor hours on Kirkwood, East Lake, and similar stock.',
      },
      {
        title: 'Multi-family elevator & COI soft costs',
        detail:
          'Decatur, Emory-area, and north DeKalb apartments add packet admin and reserved elevator time before loading starts.',
      },
      {
        title: 'I-285 / I-20 / US-78 congestion',
        detail:
          'Portal-to-portal billing tracks ring-road and arterial peaks. West–east pairs can burn 35–70+ minutes each way at rush.',
      },
      {
        title: 'Institutional calendar demand spikes',
        detail:
          'Academic and research-adjacent turnover compresses crew supply around term starts and fellowship cycles.',
      },
      {
        title: 'Outer suburban distance & HOA rules',
        detail:
          'Lithonia, Stonecrest, and Tucker-edge pairs add empty miles and sometimes gate-list admin.',
      },
      {
        title: 'Cross-county east-metro patterns',
        detail:
          'DeKalb ↔ Fulton, Gwinnett, Rockdale, or Clayton stops need honest distance assumptions in the written estimate.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (simple access)',
        value: '$500–$1,450+',
        note: 'Higher with elevators, tight intown access, or peak ring-road traffic',
      },
      {
        label: '2–3BR condo or modest SFH',
        value: '$1,600–$4,300+',
        note: 'Intown-east carries and multi-family soft costs trend up',
      },
      {
        label: '3–4+ BR / cross-zone / constrained access',
        value: '$2,700–$7,800+',
        note: 'Long I-20 pairs and difficult intown-east access price highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$115–$190+/hr',
        note: 'Portal-to-portal; packing and larger crews scale up',
      },
    ],
  },
  seasonal: {
    title: 'When to schedule a DeKalb move',
    intro:
      'Academic calendars, lease cycles, school moves, summer heat, and weekend park/event traffic all reshape access and crew availability.',
    items: [
      {
        title: 'Best truck windows: mid-week mornings',
        detail:
          'Tuesday–Thursday before 9 a.m. usually clear curb space and reduce I-285 / Clairmont pain. Avoid month-end Fridays when leases collide.',
      },
      {
        title: 'Emory / academic turnover windows',
        detail:
          'Multi-family near Emory and North Druid Hills can spike around term starts and mid-month. Reserve elevators early.',
      },
      {
        title: 'Peak family season: May–August',
        detail:
          'Outer DeKalb SFH and family moves fill Saturday calendars. Book 2–4 weeks ahead for popular windows.',
      },
      {
        title: 'Decatur and park event days',
        detail:
          'Square events and Stone Mountain peak weekends can erase curb access. Cross-check calendars for street-dependent jobs.',
      },
      {
        title: 'Summer heat & afternoon storms',
        detail:
          'Prefer early starts; plan tarps and dry staging when storms are forecast. Heat slows open carries on suburban streets.',
      },
    ],
  },
  specialized: [
    {
      id: 'intown-east-access',
      title: 'Intown-east access & careful-handling module',
      intro:
        'Kirkwood, East Lake, Candler Park-edge, and similar jobs fail on street width, stairs, and tree canopy more often than on packing skill.',
      bullets: [
        'Photo driveway, street turns, overhead clearance, and stair configuration before the survey is final.',
        'Discuss valuation for higher-value renovated inventories early.',
        'Plan shuttle carries when full-size trucks cannot stage at the door.',
        'Clarify DeKalb vs Fulton / City of Atlanta addresses near the line.',
        'Prefer early weekday starts near school and arterial corridors.',
      ],
    },
    {
      id: 'emory-institutional-multifamily',
      title: 'Emory / CDC corridor multi-family module',
      intro:
        'Institutional-adjacent apartments and Decatur multi-family are packet logistics plus corridor congestion — not pure suburban driveway work.',
      bullets: [
        'Request building move packets (COI, elevator hours, dock rules) at lease signing.',
        'Avoid peak term-start weekends when flexible.',
        'Reserve freight elevators in writing and reconfirm the day before.',
        'Build Clairmont / North Decatur / Briarcliff buffer into start times.',
        'Price portal-to-portal time honestly for any pair that rides I-285 or I-20 to outer DeKalb.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to DeKalb County?',
    intro:
      'Use this as a practical fit checklist — schools, healthcare, intown-east vs suburban lifestyle — then verify on district and hospital sites. No single ranking captures neighborhood fit.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & education landscape',
        intro:
          'DeKalb County School District serves most of the county; City Schools of Decatur serves the city of Decatur. Assignment is address-based.',
        bullets: [
          {
            title: 'How districts work here',
            detail:
              'Confirm whether an address falls in DeKalb County School District or City Schools of Decatur. Neighborhood marketing names do not guarantee a campus.',
          },
          {
            title: 'Growth areas and capacity',
            detail:
              'Outer suburban corridors can see enrollment pressure. Ask districts about capacity, transfers, and busing when touring.',
          },
          {
            title: 'Research sources',
            detail:
              'District boundary tools, Georgia Department of Education data, and campus visits beat ranking screenshots alone.',
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
              'Emory Healthcare campuses, Children\'s Healthcare of Atlanta (Egleston), and other regional facilities serve DeKalb corridors, with additional access into broader metro systems. Confirm networks and specialties for your household.',
          },
          {
            title: 'What relocators should do',
            detail:
              'Map peak-hour drive times from Lithonia, Tucker, or Brookhaven to preferred facilities — I-285 congestion changes "nearby" on paper. Transfer records early.',
          },
        ],
      },
      {
        id: 'housing',
        title: 'Housing character & cost pressures',
        bullets: [
          {
            title: 'Intown-east vs outer suburban stock',
            detail:
              'Expect older renovated SFH and denser multi-unit product toward Decatur and intown-east; larger newer tracts appear more often toward Stonecrest and Lithonia corridors.',
          },
          {
            title: 'Cost variation inside the county',
            detail:
              'Purchase prices and rents vary sharply by micro-market. Budget for condo/HOA dues in multi-unit product and longer commute costs from outer east edges.',
          },
          {
            title: 'Redevelopment pace',
            detail:
              'North DeKalb and some intown-east corridors can feel construction-heavy. Visit at commute hours to understand traffic and noise before deciding.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Which DeKalb areas fit whom',
        bullets: [
          {
            title: 'Intown-east and Decatur lifestyle',
            detail:
              'Suits people prioritizing walkability, renovated housing character, and shorter access to central Atlanta amenities — with tighter move-day access tradeoffs.',
          },
          {
            title: 'Emory / institutional corridor',
            detail:
              'Appeals for healthcare, research, and university adjacency; expect multi-family logistics and academic calendar churn.',
          },
          {
            title: 'Outer east and south DeKalb patterns',
            detail:
              'Tucker, Stone Mountain, Lithonia, and Stonecrest corridors can offer more SFH inventory; verify peak drive times to intown job centers.',
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
              'Healthcare and research (Emory/CDC corridor), education, logistics, retail, government, and professional services shape local employment. Many residents also commute into Fulton cores.',
          },
          {
            title: 'Commute realism',
            detail:
              'Many households are car-dependent outside denser cores. I-285, I-20, US-78, and Clairmont peaks are real. Test drive peak routes before choosing solely on purchase price.',
          },
        ],
      },
      {
        id: 'lifestyle',
        title: 'Lifestyle & practical livability',
        bullets: [
          {
            title: 'East-metro contrast character',
            detail:
              'DeKalb stacks intown-east neighborhoods, a walkable city core in Decatur, and deep suburban arms — different from Fulton\'s vertical Buckhead/Midtown stack or Cobb\'s northwest I-75 pattern.',
          },
          {
            title: 'Climate',
            detail:
              'Hot humid summers and frequent storms. Plan outdoor staging and heat-safe move-in logistics.',
          },
          {
            title: 'Culture and pace',
            detail:
              'Food, arts, and neighborhood retail are strong in Decatur and intown-east corridors; outer edges feel more suburban and car-oriented. Visit at peak and off-peak times when deciding.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful DeKalb resources',
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify mover registration before deposits.',
    items: [
      {
        label: 'DeKalb County — official site',
        href: 'https://www.dekalbcountyga.gov/',
        external: true,
        note: 'County services & offices',
      },
      {
        label: 'City of Decatur',
        href: 'https://www.decaturga.com/',
        external: true,
      },
      {
        label: 'City of Brookhaven',
        href: 'https://www.brookhavenga.gov/',
        external: true,
      },
      {
        label: 'DeKalb County School District',
        href: 'https://www.dekalbschoolsga.org/',
        external: true,
        note: 'Boundaries & calendars (most of county)',
      },
      {
        label: 'City Schools of Decatur',
        href: 'https://www.csdecatur.net/',
        external: true,
      },
      {
        label: 'Georgia 511 — traffic conditions',
        href: 'https://www.511ga.org/',
        external: true,
        note: 'I-285, I-20, US-78 before load windows',
      },
      {
        label: 'Georgia DPS / MCCD — household goods',
        href: 'https://gamccd.net/HouseholdGoods.aspx',
        external: true,
        note: 'Intrastate Georgia household-goods motor carrier resources',
      },
      {
        label: 'Georgia MCCD — main site',
        href: 'https://gamccd.net/',
        external: true,
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
        label: 'All Georgia local mover guides',
        href: '/local-movers/georgia',
      },
    ],
  },
  directoryHint:
    'Prefer crews with intown-east narrow-street and stair experience for Kirkwood/East Lake/Decatur-adjacent homes; multi-family COI fluency for Emory and north DeKalb apartments; honest I-285 / I-20 timing for outer suburban pairs. Verify Georgia DPS/MCCD for in-state moves and FMCSA for interstate legs.',
  lastReviewed: '2026-07-23',
};

import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';

/**
 * Hand-crafted Monterey County moving intelligence.
 * Used by /local-movers/california/monterey and the shared intelligence template.
 *
 * Differentiators vs Santa Barbara / Santa Cruz: Monterey Peninsula tourism & coastal
 * constraints (Monterey, Pacific Grove, Carmel, Pebble Beach) vs Salinas Valley
 * agricultural economy and inland housing — not a South Coast or Santa Cruz clone.
 */
export const montereyCountyIntelligence: CountyIntelligencePack = {
  stateSlug: 'california',
  countySlug: 'monterey',
  hubTitle: 'Monterey County Moving Intelligence Hub',
  eyebrow: 'Monterey County · Peninsula & Salinas Valley guide',
  h1: 'Moving in Monterey County: Peninsula Coast, Salinas Valley & Zone Guide',
  heroOpener:
    'Monterey County is a hard split between tourism-coast logistics and inland agricultural valley volume. The Monterey Peninsula — Monterey, Pacific Grove, Carmel-by-the-Sea, Pebble Beach, and Seaside/Marina edges — brings fog, constrained streets, visitor traffic, HOA and gated communities, and premium inventories. The Salinas Valley — Salinas, Spreckels edges, Chualar, Gonzales, Soledad, Greenfield, King City — runs on ag-economy timing, different heat, and suburban-to-farm-edge access that Peninsula crews cannot treat as “same as Carmel.” Highway 1 and Highway 68 connect coast pockets; US-101 is the valley spine. This guide is for people moving in Monterey County — not Santa Barbara coastal copy, and not Santa Cruz tips with the names swapped.',
  heroCredibility:
    'Peninsula vs Salinas Valley · Tourism & coastal access · Intrastate CA (BHGS) · FMCSA when interstate · Curated listings',
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
    title: 'What makes moving in Monterey County different',
    intro:
      'These are the local realities that change estimates — Peninsula tourism constraints, coastal fog and staging limits, and Salinas Valley ag logistics on a different climate and price band.',
    bullets: [
      {
        title: 'Peninsula and Salinas Valley are different logistics products',
        detail:
          'A Carmel cottage, a Monterey condo, a Seaside multi-unit, and a Salinas or King City suburban home share a county name but not truck access, visitor traffic, or drive-time assumptions. Get both cities into the estimate — “Monterey County local” is too vague when the pair spans Peninsula and valley.',
      },
      {
        title: 'Tourism and coastal constraints rewrite move day',
        detail:
          'Monterey waterfront, Cannery Row–adjacent corridors, Pacific Grove residential grids, and Carmel’s village streets often mean limited staging, tight turns, no oversized trucks at the door, and weekend visitor congestion. Shuttle vans and long carries are common. Prefer mid-week windows when flexible.',
      },
      {
        title: 'Pebble Beach & gated / HOA access is its own product',
        detail:
          'Pebble Beach and many Peninsula planned communities require gate lists, Certificates of Insurance, approved hours, and sometimes escort or length limits. Treat the access packet as part of the survey — day-of COI scrambles cancel jobs.',
      },
      {
        title: 'Salinas Valley ag traffic is a real delay factor',
        detail:
          'Salinas and south-valley towns mix residential moves with farm equipment and commercial truck patterns on and near US-101 and valley arterials. Mid-day mid-week can stall “short” locals near packing and field corridors. Build buffer when either address sits on ag-adjacent routes.',
      },
      {
        title: 'Highway 1 / 68 vs US-101 are different spines',
        detail:
          'Peninsula pairs often ride Highway 1 and Highway 68 (fog, curves, visitor peaks). Valley pairs ride 101 with freight rhythm. Peninsula ↔ Salinas can be a long local with grade and traffic that map miles understate. Ask how portal-to-portal time is priced.',
      },
      {
        title: 'Fog, wind & microclimates on the same day',
        detail:
          'Peninsula mornings can be cold, damp, and foggy while Salinas Valley afternoons heat up. Packing, floor protection, and start times should match the microclimate — say so on the survey if one address is waterfront and the other is inland valley.',
      },
      {
        title: 'Military & education-adjacent turnover (Seaside, Marina, Monterey)',
        detail:
          'Defense Language Institute / Presidio-adjacent and California State University Monterey Bay areas create PCS and academic turnover patterns that do not match Carmel estate timing. Elevator rules, base-adjacent access, and lease peaks matter.',
      },
      {
        title: 'California intrastate rules (BHGS) + FMCSA when interstate',
        detail:
          'Moves entirely within California are generally overseen by the California Bureau of Household Goods and Services (BHGS). Interstate legs (e.g. Monterey → out-of-state) need FMCSA authority. Confirm which license applies to your exact origin and destination before deposit.',
      },
    ],
  },
  zonesHeading: 'Monterey County move zones',
  zonesIntro:
    'Treat each zone as its own access and traffic problem. Tourism-coast constrained streets, gated Peninsula communities, Seaside/Marina density, and Salinas Valley ag towns are not interchangeable.',
  zones: [
    {
      id: 'monterey-peninsula-core',
      name: 'Monterey City & Waterfront Corridor',
      shortName: 'Monterey',
      neighborhoods: [
        'Downtown Monterey',
        'New Monterey',
        'Del Monte / Monterey hills edges',
        'Cannery Row corridor',
        'Fisherman’s Wharf–adjacent',
        'Garden Road area',
      ],
      housingTypes:
        'Coastal multi-unit and condos, hillside SFH, historic and mid-century stock, tourist-corridor rentals',
      challenges: [
        'Visitor traffic and limited curb staging near waterfront',
        'Hillside grades and tight residential streets',
        'Condo COI and elevator windows',
        'Fog and damp packing conditions',
      ],
      moverTips:
        'Expect shuttle or long-carry near waterfront and dense downtown blocks. Prefer mid-week mornings outside event weekends. Protect against damp/fog on metal and cardboard.',
      cityKeywords: [
        'monterey',
        'cannery row',
        'new monterey',
        'downtown monterey',
        'fishermans wharf',
        'del monte',
      ],
    },
    {
      id: 'pacific-grove-carmel',
      name: 'Pacific Grove, Carmel-by-the-Sea & Pebble Beach',
      shortName: 'PG / Carmel / PB',
      neighborhoods: [
        'Pacific Grove',
        'Carmel-by-the-Sea',
        'Pebble Beach',
        'Carmel Hills edge',
        'Asilomar area',
        'Carmel Point edge',
      ],
      housingTypes:
        'Village cottages, coastal SFH, gated estate communities, high-value finishes, limited multi-unit',
      challenges: [
        'Carmel village street width and staging limits',
        'Pebble Beach gate lists, COI, and truck restrictions',
        'High-value inventory and finish protection expectations',
        'Tourism congestion on weekends and event days',
      ],
      moverTips:
        'Treat Carmel and Pebble Beach as access-first: photos, gate codes, max truck length, and approved hours belong in the survey. Avoid major tournament and festival weekends when flexible. Discuss valuation early for premium inventories.',
      cityKeywords: [
        'pacific grove',
        'carmel',
        'carmel-by-the-sea',
        'pebble beach',
        'asilomar',
        'carmel point',
        '17-mile drive',
      ],
    },
    {
      id: 'seaside-marina',
      name: 'Seaside, Marina, Sand City & Ord Community Edge',
      shortName: 'Seaside / Marina',
      neighborhoods: [
        'Seaside',
        'Marina',
        'Sand City',
        'Ord Community / former Fort Ord edges',
        'CSUMB-adjacent',
        'Del Rey Oaks edge',
      ],
      housingTypes:
        'Suburban SFH, multi-family, military- and student-adjacent rentals, newer planned pockets',
      challenges: [
        'Multi-unit load-outs and parking scarcity',
        'PCS and academic calendar peaks',
        'Highway 1 congestion between Peninsula and Marina',
        'Base-adjacent access rules when applicable',
      ],
      moverTips:
        'Share elevator status, parking plan, and lease-end timing for multi-unit. Book early around military and semester peaks. Confirm any gate or ID requirements for restricted corridors.',
      cityKeywords: [
        'seaside',
        'marina',
        'sand city',
        'del rey oaks',
        'csumb',
        'fort ord',
        'ord community',
      ],
    },
    {
      id: 'salinas-metro',
      name: 'Salinas Metro & North Valley',
      shortName: 'Salinas',
      neighborhoods: [
        'Salinas',
        'North Salinas',
        'East Salinas',
        'South Salinas',
        'Spreckels edge',
        'Prunedale edge',
      ],
      housingTypes:
        'Suburban SFH, multi-family, older urban stock, newer tracts, ag-adjacent edges',
      challenges: [
        'Ag and commercial truck traffic on valley corridors',
        'US-101 peak delays',
        'Inland heat vs Peninsula fog the same day',
        'Cross-zone pricing when paired with Carmel / Monterey',
      ],
      moverTips:
        'Price Salinas ↔ Peninsula as a timed corridor job (68/1), not map-mile “local.” Note ag-corridor adjacency for freight buffer. Summer inland starts should run early.',
      cityKeywords: [
        'salinas',
        'spreckels',
        'prunedale',
        'north salinas',
        'east salinas',
      ],
    },
    {
      id: 'mid-salinas-valley',
      name: 'Mid Salinas Valley — Gonzales, Soledad, Greenfield',
      shortName: 'Mid Valley',
      neighborhoods: [
        'Gonzales',
        'Soledad',
        'Greenfield',
        'Chualar edge',
        'Valley farm-town cores',
      ],
      housingTypes:
        'Small-city SFH, multi-family, ag-worker and family housing, farm-edge lots',
      challenges: [
        'Longer deadhead from Peninsula crews',
        'Ag harvest and packing traffic seasonality',
        'Limited same-day pairing with gated Peninsula estate jobs',
        'Hotter summer afternoons than the coast',
      ],
      moverTips:
        'Treat mid-valley towns as long-local from Monterey Peninsula yards. Share outbuilding and unpaved-access details. Align timing away from peak harvest freight when flexible.',
      cityKeywords: [
        'gonzales',
        'soledad',
        'greenfield',
        'chualar',
        'salinas valley',
      ],
    },
    {
      id: 'south-county-king-city',
      name: 'South County — King City & Southern Valley',
      shortName: 'King City',
      neighborhoods: [
        'King City',
        'San Lucas edge',
        'San Ardo edge',
        'Southern valley farm communities',
      ],
      housingTypes:
        'Small-city SFH, multi-family, ranch- and farm-edge properties',
      challenges: [
        'Longest 101 distances from Peninsula staging',
        'Rural-edge driveway and equipment access',
        'Heat and limited crew density south-county',
        'Cross-county pairs (e.g. King City ↔ Carmel) rarely price as simple locals',
      ],
      moverTips:
        'Confirm whether the quote is still on a local rate card or a distance schedule. Provide road-width and turnaround photos for ranch-edge homes. Budget full-day labor honestly for Peninsula ↔ south-valley pairs.',
      cityKeywords: [
        'king city',
        'san lucas',
        'san ardo',
        'south monterey county',
      ],
    },
  ],
  costDrivers: {
    title: 'Pricing & cost drivers inside Monterey County',
    intro:
      'Two “local” moves of the same square footage can differ sharply depending on Peninsula tourism staging, gated-community soft costs, and whether the pair bridges coast and Salinas Valley.',
    drivers: [
      {
        title: 'Peninsula ↔ Valley corridor time (1 / 68 / 101)',
        detail:
          'Carmel ↔ Salinas, Monterey ↔ King City, or Pacific Grove ↔ Greenfield can burn 45–120+ minutes each way depending on fog, visitor peaks, and 101 freight. Hourly billing follows the clock.',
      },
      {
        title: 'Coastal staging, shuttles & village streets',
        detail:
          'Carmel, Pacific Grove grids, and Monterey waterfront blocks often need smaller trucks or long carries. Ask for shuttle and long-carry fees in writing.',
      },
      {
        title: 'Gated / HOA soft costs (Pebble Beach & planned communities)',
        detail:
          'Gate lists, Certificates of Insurance, approved hours, and truck-length limits add soft costs before labor starts.',
      },
      {
        title: 'High-value Peninsula packing & valuation',
        detail:
          'Art, wine, and finish-sensitive inventories on the Peninsula raise packing labor and coverage needs beyond basic released-value moves.',
      },
      {
        title: 'Ag-corridor timing (Salinas Valley)',
        detail:
          'Harvest and packing seasons increase freight congestion. Mid-day delays near field and cool-dock corridors add billable hours.',
      },
      {
        title: 'Tourism & event weekends',
        detail:
          'Festivals, golf events, and peak visitor seasons tighten staging and parking on the Peninsula — Saturday premiums and longer load times are common.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (same zone, simple access)',
        value: '$550–$1,700+',
        note: 'Higher with elevators, village shuttle, or waterfront staging limits',
      },
      {
        label: '2–3BR house / condo',
        value: '$1,700–$4,800+',
        note: 'Gated soft costs and Peninsula↔Valley pairs trend up',
      },
      {
        label: '3–4+ BR (gated / hills / valley corridor)',
        value: '$2,800–$8,500+',
        note: 'Pebble Beach access and coast↔south-valley pairs price highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$125–$205+/hr',
        note: 'Portal-to-portal; packing and 3-person crews scale up',
      },
    ],
  },
  seasonal: {
    title: 'Seasonal, tourism & harvest intelligence',
    intro:
      'Peninsula fog and mild temps hide the real constraints — visitor calendars, military/academic peaks, valley heat, and harvest freight set operational risk.',
    items: [
      {
        title: 'Peak residential: late spring – early fall weekends',
        detail:
          'School calendars and end-of-month leases fill Saturdays on the Peninsula and in Salinas. Book 2–4 weeks ahead for popular windows.',
      },
      {
        title: 'Tourism & event pressure (Peninsula)',
        detail:
          'Summer visitors, holidays, and major golf or festival weekends tighten Carmel, Monterey waterfront, and Pebble Beach access. Mid-week mornings win when community windows allow.',
      },
      {
        title: 'Harvest & packing season freight (Salinas Valley)',
        detail:
          'Agricultural peaks increase commercial truck volume on valley roads and 101 approaches. Build buffer for Salinas and south-valley addresses during active harvest windows.',
      },
      {
        title: 'Military / CSUMB turnover windows',
        detail:
          'PCS cycles and semester transitions concentrate multi-unit moves in Seaside, Marina, and Monterey-adjacent stock. Book early and confirm building rules.',
      },
      {
        title: 'Summer valley heat vs Peninsula fog',
        detail:
          'Salinas and south-valley afternoons can run hot while the Peninsula stays cool and damp. Early inland starts protect crews and electronics.',
      },
      {
        title: 'Best value: mid-month Tue–Thu mornings',
        detail:
          'Still plan around gated weekday windows and tourism peaks. Avoid last Friday/Saturday of the month when leases collide — and check event calendars on the Peninsula.',
      },
    ],
  },
  specialized: [
    {
      id: 'peninsula-tourism-coastal',
      title: 'Monterey Peninsula tourism & coastal access logistics',
      intro:
        'Monterey County’s defining coast problem is constrained village and waterfront staging under visitor pressure — plus gated communities that flat Salinas jobs never see.',
      bullets: [
        'Share driveway, street-width, and turnaround photos for Carmel, Pacific Grove, and hillside Monterey homes before booking.',
        'Get Pebble Beach and HOA access packets (COI, gate list, truck limits, hours) in writing before deposit.',
        'Expect shuttle or long-carry language on village and waterfront streets — price it explicitly.',
        'Avoid major event and peak tourist weekends when flexible; mid-week mornings reduce curb fights.',
        'Discuss valuation and packing for premium Peninsula inventories early — released-value alone is often inadequate.',
      ],
    },
    {
      id: 'salinas-valley-ag',
      title: 'Salinas Valley ag corridor & long-local module',
      intro:
        'Valley residential moves ride freight patterns and heat that Peninsula tourism jobs do not — and Peninsula ↔ valley pairs are long locals, not map-mile errands.',
      bullets: [
        'Price portal-to-portal time honestly for any pair that bridges Highway 1/68 Peninsula pockets with US-101 valley towns.',
        'Note ag/industrial adjacency so crews build harvest and packing-traffic buffer.',
        'Ranch-edge and farm-adjacent homes need outbuilding inventory and unpaved-access details on the survey.',
        'Summer inland heat changes start times even when Monterey waterfront weather looks mild.',
        'Confirm whether south-county pairs (e.g. King City ↔ Carmel) still use a local rate card or a distance schedule.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Monterey County?',
    intro:
      'Peninsula coastal lifestyle, Seaside/Marina practicality, and Salinas Valley affordability and ag-economy character are different bets — pick the pocket first, then validate schools, healthcare, and corridor commute tolerance.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & education',
        intro:
          'Monterey County uses multiple districts (e.g., Monterey Peninsula Unified, Pacific Grove Unified, Carmel Unified, Seaside/Marina-area systems within MPUSD and neighbors, Salinas City Elementary / Salinas Union High and related, South Monterey County districts, and others). Match every listing address to the correct district.',
        bullets: [
          {
            title: 'Town-first district check',
            detail:
              'Use official district boundary tools and the California School Dashboard. Marketing city names and unincorporated edges can span feeders.',
          },
          {
            title: 'Peninsula vs Salinas Valley',
            detail:
              'Enrollment pressures, language programs, and bus patterns differ sharply between coastal districts and valley systems — do not treat county averages as neighborhood truth.',
          },
          {
            title: 'Research tools',
            detail:
              'District sites and state dashboard data should lead; third-party rankings are secondary signals only.',
          },
          {
            title: 'Higher education & military training presence',
            detail:
              'CSUMB, Monterey Peninsula College, Middlebury Institute, Naval Postgraduate School, and DLI-related communities shape rental demand and turnover near Seaside, Marina, and Monterey — useful for student, staff, and military-connected households.',
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
              'Community Hospital of the Monterey Peninsula (CHOMP) and Salinas Valley Health / Natividad and other valley facilities serve different pockets — map ER drive times at rush hour from your target neighborhood, especially Peninsula ↔ Salinas pairs.',
          },
          {
            title: 'Specialty care spillover',
            detail:
              'Some residents travel to Bay Area or larger regional systems for specialty care. Confirm insurer networks and realistic appointment drive times on 101 and 156 corridors.',
          },
          {
            title: 'Relocator tip',
            detail:
              'Transfer pediatric and specialty care early if mid-treatment; book first appointments before peak summer tourism and lease-turn chaos.',
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
              'Carmel, Pebble Beach, and Pacific Grove often price far above Seaside/Marina, and Salinas Valley towns are a different affordability band entirely. Compare total monthly costs, not sticker price alone.',
          },
          {
            title: 'Stock variety',
            detail:
              'Village cottages, gated estates, military-adjacent multi-unit, suburban tracts, and farm-edge homes — insurance, HOA dues, and access rules vary widely.',
          },
          {
            title: 'Coastal insurance & access awareness',
            detail:
              'Waterfront and hillside parcels can face different insurance and access constraints than inland valley lots. Factor premiums and truck access into Peninsula searches.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Town fit by lifestyle',
        bullets: [
          {
            title: 'Peninsula coastal lifestyle',
            detail:
              'Monterey, Pacific Grove, Carmel, and Pebble Beach for ocean access, visitor amenities, and premium housing — with constrained move-day staging and higher monthly costs.',
          },
          {
            title: 'Seaside / Marina practicality',
            detail:
              'More attainable multi-unit and suburban stock with military and CSUMB energy; building rules and turnover peaks shape the experience.',
          },
          {
            title: 'Salinas Valley value & ag-economy life',
            detail:
              'Salinas and south-valley towns for relatively more space per dollar — with inland climate, harvest traffic, and longer Peninsula access.',
          },
          {
            title: 'Commute tolerance test',
            detail:
              'Peninsula jobs with valley housing (or the reverse) create daily 68/1/101 costs — map peak drives before choosing on price alone.',
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
              'Agriculture and food processing (Salinas Valley), tourism and hospitality (Peninsula), healthcare, education and military/training institutions, retail, and public sector.',
          },
          {
            title: 'Corridor reality',
            detail:
              'Peninsula ↔ Salinas commuting is a real daily cost in fog and peak traffic. Brochure miles understate time on 68 and 1.',
          },
          {
            title: 'Hybrid / local options',
            detail:
              'Some professional and remote-capable roles reduce daily corridor trips — still validate broadband by pocket if that matters to you.',
          },
        ],
      },
      {
        id: 'lifestyle',
        title: 'Lifestyle & climate',
        bullets: [
          {
            title: 'Coast vs valley microclimates',
            detail:
              'Cool fog and damp mornings on the Peninsula vs warmer, drier Salinas Valley afternoons. Same county, different packing and start-time logic.',
          },
          {
            title: 'Outdoors & culture',
            detail:
              'Beaches, Big Sur gateway access, golf and visitor destinations, and valley recreation are major draws; weekend tourism affects Peninsula staging.',
          },
          {
            title: 'Seasonal literacy',
            detail:
              'Tourism peaks, harvest freight, and PCS/academic calendars are part of living here — plan housing search and move windows around the calendars that hit your pocket, not a generic California average.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Practical Monterey County resources',
    intro:
      'Official links and licensing notes — HOA, gate rules, parking, and city restrictions change; verify before move day.',
    items: [
      {
        label: 'County of Monterey',
        href: 'https://www.co.monterey.ca.us/',
        note: 'County services hub',
        external: true,
      },
      {
        label: 'City of Monterey',
        href: 'https://www.monterey.org/',
        external: true,
      },
      {
        label: 'City of Pacific Grove',
        href: 'https://www.cityofpacificgrove.org/',
        external: true,
      },
      {
        label: 'City of Carmel-by-the-Sea',
        href: 'https://ci.carmel.ca.us/',
        external: true,
      },
      {
        label: 'City of Seaside',
        href: 'https://www.ci.seaside.ca.us/',
        external: true,
      },
      {
        label: 'City of Marina',
        href: 'https://www.cityofmarina.org/',
        external: true,
      },
      {
        label: 'City of Salinas',
        href: 'https://www.cityofsalinas.org/',
        external: true,
      },
      {
        label: 'City of King City',
        href: 'https://www.kingcity.com/',
        external: true,
      },
      {
        label: 'California State University Monterey Bay',
        href: 'https://csumb.edu/',
        note: 'Campus calendars and student housing context',
        external: true,
      },
      {
        label: 'National Weather Service — San Francisco Bay Area / Monterey',
        href: 'https://www.weather.gov/mtr/',
        note: 'Fog, wind, and forecast context for move planning',
        external: true,
      },
      {
        label: 'CA BHGS — household movers (intrastate)',
        href: 'https://bhgs.dca.ca.gov/',
        note: 'California Bureau of Household Goods and Services',
        external: true,
      },
      {
        label: 'FMCSA SAFER — interstate authority',
        href: 'https://safer.fmcsa.dot.gov/',
        note: 'Required when the move crosses state lines',
        external: true,
      },
      {
        label: 'Pacific Gas and Electric / local utility check',
        href: 'https://www.pge.com/',
        note: 'Electric and gas service for much of the county — confirm by address',
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
    'Filter listings by zone (Monterey, PG/Carmel/PB, Seaside/Marina, Salinas, Mid Valley, King City) when available. Confirm coastal/village staging, gated COI rules, Peninsula↔Valley drive time, and tourism or harvest-season buffer.',
  lastReviewed: '2026-07-23',
};

import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';

/**
 * Hand-crafted Queens County, New York moving intelligence.
 * Differentiators: denser residential co-ops, longer in-borough distances,
 * airport-adjacent corridors — not Brooklyn brownstone stairs-first defaults,
 * Manhattan freight-tower rules, Bronx arterial mix, or Staten Island suburban.
 */
export const queensCountyIntelligence: CountyIntelligencePack = {
  stateSlug: 'new-york',
  countySlug: 'queens',
  hubTitle: 'Queens County Moving Intelligence Hub',
  eyebrow: 'Queens · Co-ops, long in-borough distances & airport-adjacent corridors',
  h1: 'Moving in Queens: Co-Ops, In-Borough Distance, Elevators & Airport-Corridor Guide',
  heroOpener:
    'Queens is New York City’s largest borough by area — and that size is a logistics fact, not trivia. A co-op in Forest Hills, a walk-up in Astoria, a house in Bayside, and an airport-adjacent unit near Jamaica do not share truck access, portal time, or building paperwork. Longer in-borough distances mean “local” Queens-to-Queens pairs can burn more clock than a short Brooklyn hop. Co-op boards, elevator reservations, and dense residential parking rewrite estimates that ignore building packets. JFK and LaGuardia corridors add hotel traffic, airport commercial peaks, and constrained curb windows. This hub is for people actually moving in Queens — not generic NYC tips recycled from Brooklyn brownstones or Manhattan towers.',
  heroCredibility:
    'NYSDOT household goods for intrastate New York moves · FMCSA for interstate legs · Queens co-op, distance & airport-corridor awareness · Curated directory listings',
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
    title: 'What makes moving in Queens different',
    intro:
      'These are Queens realities — co-op density, long in-borough miles, elevator rules, and airport-adjacent traffic — not interchangeable “outer borough” boilerplate.',
    bullets: [
      {
        title: 'Co-ops and mid-rise multi-family are core housing stock',
        detail:
          'Forest Hills, Kew Gardens, Jackson Heights, Flushing, and many avenue corridors run on co-op and condo rules: Certificates of Insurance, reserved elevators, floor protection, deposits, and fixed move windows. Treat the house rules as part of the survey — board calendars do not flex for late paperwork.',
      },
      {
        title: 'Longer in-borough distances rewrite “local” pricing',
        detail:
          'Astoria ↔ Far Rockaway, Long Island City ↔ Bayside, or Elmhurst ↔ Howard Beach can look like one borough on a map and a regional drive on a clock. Price portal-to-portal time honestly; empty miles from staging yards add cost even when both addresses say Queens.',
      },
      {
        title: 'Airport-adjacent corridors change traffic and curb reality',
        detail:
          'JFK and LaGuardia approaches, hotel strips, and commercial airport traffic spike congestion and limit truck staging near Jamaica, East Elmhurst, and Rockaway-adjacent routes. Build buffer for airport peaks and avoid assuming residential curb grace near hotel corridors.',
      },
      {
        title: 'Walk-ups and small multi-family still dominate many blocks',
        detail:
          'Astoria, Sunnyside, Ridgewood, Woodside, and parts of Corona mix three- and four-story walk-ups with limited elevator buildings. Stair labor and long carries from legal parking remain common — Queens is not only co-ops and houses.',
      },
      {
        title: 'Expressways and parkways segment the borough',
        detail:
          'I-495 (LIE), Grand Central Parkway, Van Wyck Expressway, Brooklyn-Queens Expressway edges, and Cross Island Parkway create choke points. Cross-Queens pairs at rush hour need mid-week morning starts when leases allow.',
      },
      {
        title: 'Multilingual, multi-community micro-markets',
        detail:
          'Flushing, Jackson Heights, Elmhurst, and other corridors have dense commercial streets, different parking norms, and varied unit layouts. Share exact cross-streets and building type — neighborhood brand names alone understate access.',
      },
      {
        title: 'Borough-to-borough and Long Island edge pairs are routine',
        detail:
          'Households regularly move Queens ↔ Brooklyn, Queens ↔ Manhattan, or Queens ↔ Nassau. Clarify bridge/tunnel vs parkway routing and whether the job stays intrastate New York.',
      },
      {
        title: 'Intrastate NYSDOT rules vs interstate FMCSA authority',
        detail:
          'Moves entirely within New York State generally require NYSDOT household goods authority. Any leg outside New York needs active FMCSA USDOT (and usually MC) authority. Confirm which license applies before deposits.',
      },
    ],
  },
  zonesHeading: 'Queens access zones',
  zonesIntro:
    'Plan by northwest corridor density, central co-op belts, eastern residential arms, airport-adjacent corridors, and Rockaway peninsula access — distance and building rules cluster by zone.',
  zones: [
    {
      id: 'northwest-queens',
      name: 'Northwest Queens — Astoria, Long Island City, Sunnyside, Woodside',
      shortName: 'NW Queens',
      neighborhoods: [
        'Astoria',
        'Long Island City',
        'Sunnyside',
        'Woodside',
        'Ditmars-Steinway',
        'Ravenswood edges',
      ],
      housingTypes:
        'Walk-up multi-family, mid-rise and high-rise condos/rentals (especially LIC), older co-ops, mixed industrial-adjacent product',
      challenges: [
        'Elevator/COI on LIC towers mixed with Astoria walk-ups',
        'Queensboro Bridge / Midtown Tunnel congestion for Manhattan pairs',
        'Street parking pressure and commercial corridor double-parking',
        'Construction staging near new development pockets',
      ],
      moverTips:
        'Survey LIC towers and Astoria walk-ups as different product types. Collect COI and elevator hours early for high-rises. Build bridge/tunnel buffer into Manhattan-bound estimates. Prefer mid-week morning starts.',
      cityKeywords: [
        'astoria',
        'long island city',
        'lic',
        'sunnyside',
        'woodside',
        'ditmars',
        'queens',
      ],
    },
    {
      id: 'central-coops',
      name: 'Central Queens co-op belt — Forest Hills, Kew Gardens, Jackson Heights, Elmhurst',
      shortName: 'Central Co-ops',
      neighborhoods: [
        'Forest Hills',
        'Kew Gardens',
        'Jackson Heights',
        'Elmhurst',
        'Rego Park',
        'Corona edges',
      ],
      housingTypes:
        'Classic co-ops and condos, mid-rise multi-family, some walk-ups and garden apartments',
      challenges: [
        'Near-universal board rules, COI, and elevator reservations on co-ops',
        'Dense residential parking and limited truck length',
        'Queens Boulevard and Roosevelt Avenue congestion',
        'Fixed move windows that do not match preferred lease times',
      ],
      moverTips:
        'Request co-op move packets at lease signing. Reserve elevators in writing. Confirm certificate holders and liability limits. Photo curb options on co-op courts and side streets. Avoid month-end elevator crunches when flexible.',
      cityKeywords: [
        'forest hills',
        'kew gardens',
        'jackson heights',
        'elmhurst',
        'rego park',
        'corona',
        'queens',
      ],
    },
    {
      id: 'flushing-northeast',
      name: 'Flushing & northeast Queens — denser cores to residential arms',
      shortName: 'Flushing / NE',
      neighborhoods: [
        'Flushing',
        'Murray Hill (Queens)',
        'Auburndale',
        'Bayside',
        'Whitestone',
        'College Point',
        'Little Neck edges',
      ],
      housingTypes:
        'High-density multi-family and co-ops near Flushing core; SFH, duplexes, and garden apartments toward Bayside/Whitestone',
      challenges: [
        'Flushing commercial density and scarce curb staging',
        'Whitestone Bridge / Cross Island congestion',
        'Mixed elevator and house access on short map hops',
        'Longer empty-mile time from western Queens staging',
      ],
      moverTips:
        'Never price Flushing core like a quiet residential street. Collect elevator packets for mid-rises. For SFH arms, photo driveways and tree clearances. Build Cross Island / bridge buffer for north-shore pairs.',
      cityKeywords: [
        'flushing',
        'bayside',
        'whitestone',
        'auburndale',
        'college point',
        'little neck',
        'queens',
      ],
    },
    {
      id: 'jamaica-airport',
      name: 'Jamaica, airport corridor & southeast approaches',
      shortName: 'Jamaica / Airport',
      neighborhoods: [
        'Jamaica',
        'South Jamaica',
        'St. Albans',
        'Springfield Gardens',
        'Rosedale',
        'JFK-adjacent corridors',
        'Ozone Park edges',
      ],
      housingTypes:
        'Multi-family, co-ops, SFH and duplex tracts, airport-adjacent rentals and mixed commercial-residential',
      challenges: [
        'Airport commercial traffic and hotel corridor peaks',
        'Van Wyck Expressway congestion',
        'Variable street access near commercial strips',
        'Longer portal time to northwest Queens or Manhattan',
      ],
      moverTips:
        'Price airport-corridor pairs with Van Wyck and Belt Parkway reality. Prefer early weekday windows away from peak flight-bank traffic when possible. Confirm truck access on residential side streets off busy avenues.',
      cityKeywords: [
        'jamaica',
        'st albans',
        'springfield gardens',
        'rosedale',
        'ozone park',
        'jfk',
        'queens',
      ],
    },
    {
      id: 'ridgewood-maspeth',
      name: 'Ridgewood, Maspeth, Middle Village & western industrial-residential mix',
      shortName: 'Ridgewood / Maspeth',
      neighborhoods: [
        'Ridgewood',
        'Maspeth',
        'Middle Village',
        'Glendale',
        'Fresh Pond edges',
        'Brooklyn-Queens border blocks (verify county)',
      ],
      housingTypes:
        'Walk-up multi-family, brick row housing, some SFH and semi-detached, light industrial-adjacent streets',
      challenges: [
        'Border confusion with Brooklyn addresses',
        'Industrial truck traffic mixed with residential blocks',
        'Stairs and limited elevators',
        'BQE / cemetery / parkway routing quirks',
      ],
      moverTips:
        'Clarify Kings vs Queens county on every address near the border. Photo truck turns on tight residential streets. Prefer early starts near industrial corridors. Confirm elevator vs walk-up unit-by-unit.',
      cityKeywords: [
        'ridgewood',
        'maspeth',
        'middle village',
        'glendale',
        'fresh pond',
        'queens',
      ],
    },
    {
      id: 'rockaways',
      name: 'The Rockaways — peninsula access & coastal residential',
      shortName: 'Rockaways',
      neighborhoods: [
        'Far Rockaway',
        'Rockaway Beach',
        'Rockaway Park',
        'Arverne',
        'Breezy Point edges',
        'Broad Channel edges',
      ],
      housingTypes:
        'Multi-family, co-ops, SFH and beach-adjacent product, some higher-density towers',
      challenges: [
        'Limited peninsula access routes and longer portal time',
        'Seasonal beach traffic and weather exposure',
        'Elevator buildings mixed with low-rise coastal stock',
        'Bridge and causeway congestion on peak weekends',
      ],
      moverTips:
        'Never treat Rockaway pairs as ordinary in-borough hops — build significant drive buffer. Prefer mid-week starts outside summer beach peaks. Confirm elevator packets for towers. Plan weather protection for open coastal carries.',
      cityKeywords: [
        'far rockaway',
        'rockaway beach',
        'rockaway park',
        'arverne',
        'breezy point',
        'broad channel',
        'queens',
      ],
    },
  ],
  costDrivers: {
    title: 'What drives Queens moving costs',
    intro:
      'Ranges are market context for local / short regional moves — not quotes. Co-op soft costs, long in-borough portal time, and airport-corridor congestion separate cheap estimates from real bills.',
    drivers: [
      {
        title: 'Co-op / condo elevator & COI soft costs',
        detail:
          'Board rules, Certificates of Insurance, reserved elevators, and fixed windows add admin and wait time before loading starts.',
      },
      {
        title: 'Long in-borough distances & empty miles',
        detail:
          'Queens’ geographic size means many same-borough pairs need honest multi-leg drive time and fuel assumptions.',
      },
      {
        title: 'Airport-corridor and expressway congestion',
        detail:
          'Van Wyck, Grand Central, LIE, and airport commercial peaks inflate portal-to-portal hours on southeast and central pairs.',
      },
      {
        title: 'Walk-up stair labor in northwest and western pockets',
        detail:
          'Astoria, Ridgewood, and similar multi-family belts still bill heavily for flights and long curb carries.',
      },
      {
        title: 'Peninsula / Rockaway access premium',
        detail:
          'Limited routes and seasonal traffic push labor and truck time on coastal jobs.',
      },
      {
        title: 'Borough-to-borough and Nassau-edge patterns',
        detail:
          'Queens ↔ Manhattan, Brooklyn, or Nassau stops need accurate routing and licensing assumptions in the written estimate.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (simple access)',
        value: '$650–$2,200+',
        note: 'Higher with elevators, co-op windows, or long portal time',
      },
      {
        label: '2–3BR co-op or multi-family',
        value: '$1,700–$4,800+',
        note: 'Building packets and in-borough distance trend up',
      },
      {
        label: '3–4+ BR / long cross-Queens / Rockaway or airport pairs',
        value: '$2,800–$8,500+',
        note: 'Distance, towers, and constrained access price highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$135–$210+/hr',
        note: 'Portal-to-portal; packing and larger crews scale up',
      },
    ],
  },
  seasonal: {
    title: 'When to schedule a Queens move',
    intro:
      'Lease cycles, summer family demand, airport peaks, beach traffic, and winter weather all reshape access and crew availability across a very large borough.',
    items: [
      {
        title: 'Best truck windows: mid-week mornings',
        detail:
          'Tuesday–Thursday before 9 a.m. usually reduce expressway pain and improve co-op elevator availability. Avoid month-end Fridays when leases collide.',
      },
      {
        title: 'Peak season: May–September + month-end',
        detail:
          'Apartment churn and family multi-bedroom moves fill Saturdays. Book 2–4 weeks ahead for popular windows.',
      },
      {
        title: 'Airport and hotel corridor peaks',
        detail:
          'Flight banks and holiday travel can spike Jamaica and LaGuardia-area traffic. Prefer early residential windows when flexible.',
      },
      {
        title: 'Rockaway summer beach traffic',
        detail:
          'Weekend peninsula congestion is real Memorial Day through Labor Day. Mid-week starts beat Saturday beach traffic.',
      },
      {
        title: 'Winter weather on open corridors',
        detail:
          'Snow and ice slow parkway driving and outdoor carries. Confirm elevator status and clear paths at both ends.',
      },
    ],
  },
  specialized: [
    {
      id: 'queens-coop-elevator',
      title: 'Queens co-op & elevator module',
      intro:
        'Central Queens and many mid-rise corridors fail on board rules and elevator calendars more often than on truck size.',
      bullets: [
        'Request co-op/condo move packets (COI, elevator hours, deposits, certificate holders) at lease signing.',
        'Reserve service elevators in writing and reconfirm the day before.',
        'Match move times to board windows — not only to your preferred Saturday.',
        'Share building entrance, court, and curb photos with the survey.',
        'Budget wait time when multiple units share one elevator on month-end days.',
      ],
    },
    {
      id: 'queens-distance-airport',
      title: 'In-borough distance & airport-corridor module',
      intro:
        'Queens’ size and airport expressways make many same-borough pairs regional drive-time jobs — especially northwest ↔ southeast or Rockaway pairs.',
      bullets: [
        'Price portal-to-portal time honestly for any pair that rides the Van Wyck, LIE, Grand Central, or Cross Island.',
        'Build airport commercial traffic buffer near JFK and LaGuardia corridors.',
        'Treat Rockaway peninsula jobs as constrained-access routes, not ordinary in-borough hops.',
        'Clarify Queens vs Brooklyn border addresses in Ridgewood/Glendale-type pockets.',
        'Prefer mid-week morning starts for long cross-Queens pairs.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Queens County?',
    intro:
      'Use this as a practical fit checklist — schools, healthcare, housing stock, and commute distance — then verify on district and hospital sites. No single ranking captures neighborhood fit across a borough this large.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & education landscape',
        intro:
          'Public K–12 in Queens is part of New York City Public Schools with address-based zoning and district variation across a wide geography.',
        bullets: [
          {
            title: 'How districts work here',
            detail:
              'Confirm your address zone through NYC Public Schools tools. Neighborhood names like Forest Hills or Bayside do not guarantee a single campus assignment.',
          },
          {
            title: 'Geographic spread',
            detail:
              'School options and commute to school can differ sharply between northwest Queens, central co-op belts, and eastern residential arms. Factor student travel time into housing choices.',
          },
          {
            title: 'Research sources',
            detail:
              'Official NYC Public Schools resources, campus visits, and current enrollment information beat ranking lists alone.',
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
              'NewYork-Presbyterian Queens, NYU Langone Hospital—Long Island adjacency for some east-edge households, Mount Sinai facilities, NYC Health + Hospitals (e.g., Elmhurst, Queens Hospital Center), and other providers serve different corridors. Confirm networks for your household.',
          },
          {
            title: 'What relocators should do',
            detail:
              'Map peak-hour travel from your target neighborhood — Queens distances make “nearby on a map” unreliable. Transfer records early.',
          },
        ],
      },
      {
        id: 'housing',
        title: 'Housing character & cost pressures',
        bullets: [
          {
            title: 'Co-ops, multi-family, and houses coexist',
            detail:
              'Expect dense co-ops and walk-ups through much of western and central Queens; more SFH and semi-detached stock toward northeast and southeast arms; towers concentrated in LIC and some Flushing corridors.',
          },
          {
            title: 'Cost variation inside the borough',
            detail:
              'Rents and purchase prices vary widely by neighborhood and building type. Budget for co-op fees, maintenance, and move deposits required by boards.',
          },
          {
            title: 'Board and building rules',
            detail:
              'Co-ops often control move hours, elevator use, insurance certificates, and even renovation timing. Read house rules before committing to a lease or purchase.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Which Queens areas fit whom',
        bullets: [
          {
            title: 'Northwest density & Manhattan adjacency',
            detail:
              'Astoria, LIC, and Sunnyside often appeal for transit access and denser urban living — with walk-up or tower move complexity depending on the building.',
          },
          {
            title: 'Central co-op residential pattern',
            detail:
              'Forest Hills, Kew Gardens, Jackson Heights, and Rego Park suit people seeking established multi-family neighborhoods — with board rules as a planning input.',
          },
          {
            title: 'Eastern and southern arms',
            detail:
              'Bayside, Whitestone, Jamaica-area, and Rockaway corridors can offer more space or different price points; verify commute length and airport/expressway traffic at peak hours.',
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
              'Airport and aviation-related work, healthcare, education, small business corridors, professional services, and Manhattan-bound careers shape many Queens households.',
          },
          {
            title: 'Commute realism',
            detail:
              'Subway and LIRR access varies sharply by neighborhood. Driving cross-Queens at rush hour can exceed expected times. Test peak routes before choosing solely on housing cost.',
          },
        ],
      },
      {
        id: 'lifestyle',
        title: 'Lifestyle & practical livability',
        bullets: [
          {
            title: 'Scale and diversity',
            detail:
              'Queens stacks dense immigrant commercial corridors, classic co-op neighborhoods, house-lined residential arms, and coastal peninsula living under one county name.',
          },
          {
            title: 'Parks and open space',
            detail:
              'Flushing Meadows, large park systems, and waterfront edges distribute green space unevenly. Visit candidate blocks on weekdays and weekends.',
          },
          {
            title: 'Climate',
            detail:
              'Hot humid summers, cold winters, and coastal wind exposure on the Rockaways. Plan weather contingency for move-in staging.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Queens County resources',
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify mover authority before deposits.',
    items: [
      {
        label: 'NYC 311 — city services & parking info',
        href: 'https://portal.311.nyc.gov/',
        external: true,
        note: 'Street cleaning, parking, and city service questions',
      },
      {
        label: 'NYC Department of Transportation',
        href: 'https://www.nyc.gov/html/dot/html/home/home.shtml',
        external: true,
      },
      {
        label: 'NYC Public Schools',
        href: 'https://www.schools.nyc.gov/',
        external: true,
        note: 'Zones, calendars, and enrollment',
      },
      {
        label: 'Port Authority of NY & NJ — airports',
        href: 'https://www.panynj.gov/airports/en/index.html',
        external: true,
        note: 'JFK / LGA context for corridor planning',
      },
      {
        label: 'NYSDOT — Moving (consumer guidance)',
        href: 'https://www.dot.ny.gov/divisions/operating/osss/truck/moving',
        external: true,
        note: 'Intrastate New York household goods guidance',
      },
      {
        label: 'NYSDOT — Registration & licensing',
        href: 'https://www.dot.ny.gov/divisions/operating/osss/truck/registration-licensing',
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
        label: 'All New York local mover guides',
        href: '/local-movers/new-york',
      },
    ],
  },
  directoryHint:
    'Prefer crews with co-op elevator and COI fluency for central Queens mid-rises; honest long in-borough timing for cross-Queens and Rockaway pairs; airport-corridor awareness near JFK/LGA approaches. Verify NYSDOT household goods authority for in-state moves and FMCSA for interstate legs.',
  lastReviewed: '2026-07-23',
};

import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';

/**
 * Hand-crafted Bronx County, New York moving intelligence.
 * Differentiators: mixed housing stock, elevator/walk-up blend, arterial traffic,
 * frequent borough-to-borough pairs — not Manhattan freight-tower defaults,
 * Brooklyn brownstone micro-markets, Queens co-op distance, or Staten Island suburbs.
 */
export const bronxCountyIntelligence: CountyIntelligencePack = {
  stateSlug: 'new-york',
  countySlug: 'bronx',
  hubTitle: 'Bronx County Moving Intelligence Hub',
  eyebrow: 'Bronx · Mixed stock, elevators & walk-ups, arterial & borough-to-borough',
  h1: 'Moving in the Bronx: Elevators, Walk-Ups, Arterial Traffic & Borough-to-Borough Guide',
  heroOpener:
    'Bronx County is a mixed-stock moving market under one borough name. Elevator co-ops and mid-rises sit blocks from walk-up multi-family; riverdale-style houses and hills contrast with dense southern corridors. Grand Concourse, the Cross Bronx Expressway, Major Deegan, and bridge approaches rewrite portal time on pairs that look short on a map. Borough-to-borough jobs — Bronx ↔ Manhattan, Bronx ↔ Westchester, Bronx ↔ Queens — are everyday logistics, not special cases. A Fordham walk-up, a Riverdale co-op, a Throgs Neck house, and a South Bronx mid-rise do not share truck access or traffic risk. This hub is for people actually moving in the Bronx — not generic NYC tips recycled from Manhattan towers or Brooklyn brownstones.',
  heroCredibility:
    'NYSDOT household goods for intrastate New York moves · FMCSA for interstate legs · Bronx mixed-access & arterial traffic awareness · Curated directory listings',
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
    title: 'What makes moving in the Bronx different',
    intro:
      'These are Bronx realities — mixed elevator/walk-up stock, arterial congestion, hills in the northwest, and routine borough-to-borough pairs — not clone “outer borough” copy.',
    bullets: [
      {
        title: 'Mixed stock is the defining logistics feature',
        detail:
          'The same commercial corridor can hold elevator co-ops, five-story walk-ups, and small multi-family homes. Confirm elevator vs stair access unit-by-unit — neighborhood names alone do not predict the building type.',
      },
      {
        title: 'Arterials and the Cross Bronx rewrite drive time',
        detail:
          'Cross Bronx Expressway, Major Deegan Expressway, Bruckner Expressway, and Grand Concourse peaks can double portal hours. Bronx ↔ Manhattan or east–west Bronx pairs need honest traffic buffers, especially at rush and school dismissal.',
      },
      {
        title: 'Elevator COIs and walk-up stairs both appear frequently',
        detail:
          'Co-ops and mid-rises require Certificates of Insurance, reserved elevators, and fixed windows. Walk-ups require stair labor and long carries from legal curb spots. Crews that only price one product type mis-scope half the borough.',
      },
      {
        title: 'Northwest hills and house stock differ from southern density',
        detail:
          'Riverdale, Fieldston, and parts of Kingsbridge introduce steeper grades, larger homes, and different truck-length constraints than dense southern multi-family corridors. One estimate template does not fit both.',
      },
      {
        title: 'Borough-to-borough moves are the norm',
        detail:
          'Households regularly move Bronx ↔ Manhattan (including upper Manhattan), Bronx ↔ Westchester, Bronx ↔ Queens, or Bronx ↔ Brooklyn. Clarify bridges (Third Avenue, Whitestone, Throgs Neck, RFK, etc.) and whether the job stays in New York State.',
      },
      {
        title: 'Street parking and commercial corridor pressure',
        detail:
          'Many blocks lack off-street staging. Commercial strips, bus routes, and alternate-side rules force temporary no-parking plans or shuttle carries. Photo the approach before the survey is final.',
      },
      {
        title: 'Institutional and park-adjacent pockets change windows',
        detail:
          'Hospital, university, and large-park edges (Fordham, Montefiore area, Bronx Zoo / Botanical Garden corridors) can spike congestion and curb demand on event or class-change days.',
      },
      {
        title: 'Intrastate NYSDOT rules vs interstate FMCSA authority',
        detail:
          'Moves entirely within New York State generally require NYSDOT household goods authority. Legs into Connecticut, New Jersey, or farther need active FMCSA authority. Verify before deposits.',
      },
    ],
  },
  zonesHeading: 'Bronx access zones',
  zonesIntro:
    'Plan by southern dense corridors, Concourse/central multi-family, northwest hills and houses, and eastern expressway-adjacent residential arms — access and traffic risk cluster by zone.',
  zones: [
    {
      id: 'south-bronx',
      name: 'South Bronx & downtown-adjacent corridors',
      shortName: 'South Bronx',
      neighborhoods: [
        'Mott Haven',
        'Port Morris',
        'Melrose',
        'Morrisania',
        'Hunts Point edges',
        'Longwood',
      ],
      housingTypes:
        'Multi-family walk-ups, mid-rise elevators, newer rental developments, mixed industrial-adjacent product',
      challenges: [
        'Mixed elevator and walk-up access',
        'Major Deegan / RFK Bridge approach congestion',
        'Street parking pressure and commercial truck traffic',
        'Manhattan-bound portal time at peak',
      ],
      moverTips:
        'Confirm elevator vs stairs explicitly. Build bridge and Deegan buffer for Manhattan pairs. Prefer mid-week morning starts. Photo curb options on narrow residential blocks.',
      cityKeywords: [
        'mott haven',
        'port morris',
        'melrose',
        'morrisania',
        'longwood',
        'hunts point',
        'bronx',
      ],
    },
    {
      id: 'concourse-central',
      name: 'Grand Concourse & central Bronx multi-family',
      shortName: 'Concourse / Central',
      neighborhoods: [
        'Grand Concourse corridor',
        'Fordham',
        'Tremont',
        'Belmont',
        'Mount Hope',
        'Claremont edges',
      ],
      housingTypes:
        'Pre-war and postwar elevator buildings, walk-up multi-family, co-ops, dense residential corridors',
      challenges: [
        'Elevator COI rules common on larger buildings',
        'Concourse and Fordham Road congestion',
        'University and commercial peak traffic',
        'Scarce legal curb near busy avenues',
      ],
      moverTips:
        'Collect building packets for elevator co-ops and large rentals. Avoid Fordham class-change peaks when flexible. Reserve elevators early at month-end. Share avenue vs side-street staging plans.',
      cityKeywords: [
        'fordham',
        'tremont',
        'belmont',
        'grand concourse',
        'mount hope',
        'bronx',
      ],
    },
    {
      id: 'northwest-hills',
      name: 'Northwest Bronx — Riverdale, Kingsbridge, Fieldston hills',
      shortName: 'NW Hills',
      neighborhoods: [
        'Riverdale',
        'Fieldston',
        'Kingsbridge',
        'Marble Hill edges (verify county/borough labeling)',
        'Spuyten Duyvil',
        'Van Cortlandt Village edges',
      ],
      housingTypes:
        'SFH and large multi-story homes, co-ops, elevator mid-rises, garden apartments',
      challenges: [
        'Hills, grades, and limited truck turnaround',
        'Mixed house driveways and co-op elevator rules',
        'Henry Hudson Parkway congestion',
        'Longer portal time to southern Bronx or Manhattan cores',
      ],
      moverTips:
        'Photo grades, driveway width, and tree clearances for houses. Collect co-op packets separately from SFH surveys. Prefer early starts. Do not price Riverdale like a flat South Bronx walk-up.',
      cityKeywords: [
        'riverdale',
        'fieldston',
        'kingsbridge',
        'spuyten duyvil',
        'marble hill',
        'bronx',
      ],
    },
    {
      id: 'east-bronx',
      name: 'East Bronx — Parkchester, Throgs Neck, Country Club, Co-op City edges',
      shortName: 'East Bronx',
      neighborhoods: [
        'Parkchester',
        'Throgs Neck',
        'Country Club',
        'Co-op City',
        'Pelham Bay',
        'Westchester Square edges',
        'Castle Hill',
      ],
      housingTypes:
        'Large co-op communities, elevator mid-rises, SFH and semi-detached, multi-family',
      challenges: [
        'Large-complex elevator and management rules (e.g., major co-op communities)',
        'Bruckner / Throgs Neck Bridge / Whitestone approach traffic',
        'Longer empty-mile time from west-Bronx staging',
        'Suburban-style streets mixed with dense co-op superblocks',
      ],
      moverTips:
        'Treat large co-op communities as their own building-packet problems. Build bridge and Bruckner buffer for Queens or Long Island-edge pairs. Survey SFH pockets for driveway access. Book elevators early in big complexes.',
      cityKeywords: [
        'parkchester',
        'throgs neck',
        'country club',
        'co-op city',
        'pelham bay',
        'castle hill',
        'bronx',
      ],
    },
    {
      id: 'north-central',
      name: 'North-central Bronx — Norwood, Bedford Park, Williamsbridge',
      shortName: 'North-Central',
      neighborhoods: [
        'Norwood',
        'Bedford Park',
        'Williamsbridge',
        'Olinville',
        'Allerton',
        'Bronx Park East edges',
      ],
      housingTypes:
        'Multi-family walk-ups and elevators, small apartment houses, some semi-detached',
      challenges: [
        'Hospital and park-adjacent congestion pockets',
        'Mixed stair and elevator access',
        'Cross-borough routing via Bronx River / parkways',
        'Street parking competition near commercial nodes',
      ],
      moverTips:
        'Confirm building type and elevator status before final pricing. Prefer early weekday windows near hospital corridors. Photo legal curb options. Clarify exact cross-streets for park-edge addresses.',
      cityKeywords: [
        'norwood',
        'bedford park',
        'williamsbridge',
        'allerton',
        'olinville',
        'bronx',
      ],
    },
  ],
  costDrivers: {
    title: 'What drives Bronx moving costs',
    intro:
      'Ranges are market context for local / short regional moves — not quotes. Mixed access labor, arterial portal time, and elevator soft costs separate cheap estimates from real bills.',
    drivers: [
      {
        title: 'Elevator COI vs walk-up stair labor',
        detail:
          'The borough bills both ways — reserved elevators and certificates on mid-rises, multi-flight carries on walk-ups. Wrong building assumptions blow estimates.',
      },
      {
        title: 'Cross Bronx, Deegan & bridge congestion',
        detail:
          'Portal-to-portal time tracks expressway and bridge peaks. Short map miles often hide long clock times.',
      },
      {
        title: 'Northwest hills & larger home inventories',
        detail:
          'Riverdale-area grades, driveways, and multi-level homes increase crew time versus flat multi-family jobs.',
      },
      {
        title: 'Large co-op community soft costs',
        detail:
          'Parkchester, Co-op City, and similar complexes add management rules, elevator calendars, and staging constraints.',
      },
      {
        title: 'Borough-to-borough routing',
        detail:
          'Bronx ↔ Manhattan, Westchester, Queens, or Brooklyn pairs need honest bridge/tunnel and traffic assumptions in the written estimate.',
      },
      {
        title: 'Street staging & commercial corridor friction',
        detail:
          'Scarce curb and busy avenues force shuttle carries and temporary no-parking logistics.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (simple access)',
        value: '$600–$2,000+',
        note: 'Higher with walk-up flights, elevators, or peak arterial traffic',
      },
      {
        label: '2–3BR multi-family or co-op',
        value: '$1,500–$4,500+',
        note: 'Mixed access and building packets trend up',
      },
      {
        label: '3–4+ BR / hills homes / long cross-borough',
        value: '$2,600–$8,000+',
        note: 'Riverdale-scale homes and bridge-heavy pairs price highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$130–$205+/hr',
        note: 'Portal-to-portal; packing and larger crews scale up',
      },
    ],
  },
  seasonal: {
    title: 'When to schedule a Bronx move',
    intro:
      'Lease cycles, school and university calendars, summer heat, winter weather, and expressway peaks all reshape access and crew availability.',
    items: [
      {
        title: 'Best truck windows: mid-week mornings',
        detail:
          'Tuesday–Thursday before 9 a.m. usually reduce Cross Bronx / Deegan pain and improve elevator availability. Avoid month-end Fridays when leases collide.',
      },
      {
        title: 'Peak season: May–September + month-end',
        detail:
          'Apartment turnover and family multi-bedroom moves fill Saturdays. Book ahead for popular windows.',
      },
      {
        title: 'School and university peaks',
        detail:
          'Fordham-area and school-corridor traffic spikes at arrival/dismissal. Prefer mid-day or early windows when flexible.',
      },
      {
        title: 'Summer heat on open carries',
        detail:
          'Early starts help on walk-up and long-carry jobs. Plan hydration and shade for crews on exposed blocks.',
      },
      {
        title: 'Winter weather & hills',
        detail:
          'Snow and ice are especially punishing on northwest grades. Confirm path clearing and truck traction assumptions.',
      },
    ],
  },
  specialized: [
    {
      id: 'bronx-mixed-access',
      title: 'Bronx mixed elevator & walk-up module',
      intro:
        'Bronx jobs fail when estimates assume all elevators or all stairs. Building type is the first scoping question.',
      bullets: [
        'Confirm elevator vs walk-up status for every address before final pricing.',
        'Collect COI and elevator hours for co-ops and mid-rises at lease signing.',
        'Photo stair flights, landings, and curb distance for walk-ups.',
        'Budget long-carry when legal parking sits off the building entrance.',
        'Treat large co-op communities as separate management-rule environments.',
      ],
    },
    {
      id: 'bronx-arterial-borough',
      title: 'Arterial traffic & borough-to-borough module',
      intro:
        'Expressways and bridges make many Bronx pairs regional drive-time jobs — especially Manhattan, Westchester, and Queens destinations.',
      bullets: [
        'Price portal-to-portal time honestly for Cross Bronx, Deegan, Bruckner, and bridge routes.',
        'Prefer mid-week morning starts for cross-borough pairs.',
        'Clarify Bronx vs Westchester or Manhattan border addresses near the edges.',
        'Build extra buffer near RFK, Whitestone, Throgs Neck, and GWB approaches.',
        'Confirm whether any out-of-state leg triggers FMCSA requirements.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Bronx County?',
    intro:
      'Use this as a practical fit checklist — schools, healthcare, housing mix, and commute bridges — then verify on district and hospital sites. No single ranking captures neighborhood fit.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & education landscape',
        intro:
          'Public K–12 in the Bronx is part of New York City Public Schools with address-based zoning and district variation across the borough.',
        bullets: [
          {
            title: 'How districts work here',
            detail:
              'Confirm your address zone through NYC Public Schools tools. Neighborhood marketing names do not guarantee a specific campus.',
          },
          {
            title: 'Geographic variation',
            detail:
              'School commute patterns differ between dense southern corridors and more residential northern/eastern pockets. Factor student travel into housing choices.',
          },
          {
            title: 'Research sources',
            detail:
              'Official NYC Public Schools resources and campus visits beat ranking lists alone.',
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
              'Montefiore, NYC Health + Hospitals (Jacobi, Lincoln, North Central Bronx, and others), and additional regional facilities serve different Bronx corridors. Confirm networks and specialties for your household.',
          },
          {
            title: 'What relocators should do',
            detail:
              'Map peak-hour travel from your target neighborhood to preferred facilities — arterial congestion changes “nearby.” Transfer records early.',
          },
        ],
      },
      {
        id: 'housing',
        title: 'Housing character & cost pressures',
        bullets: [
          {
            title: 'Mixed stock under one borough name',
            detail:
              'Expect dense multi-family and walk-ups through much of the south and central Bronx; large co-op communities in eastern pockets; more houses and hills northwest.',
          },
          {
            title: 'Cost variation',
            detail:
              'Rents and purchase prices vary by neighborhood and building type, generally with different bands than Manhattan cores. Budget for co-op fees where applicable.',
          },
          {
            title: 'Building rules',
            detail:
              'Elevator buildings and large co-op communities often control move hours and insurance certificates. Read house rules before signing.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Which Bronx areas fit whom',
        bullets: [
          {
            title: 'Southern and central density',
            detail:
              'Mott Haven, Melrose, Fordham, and Concourse corridors often appeal for transit access and multi-family living — with mixed elevator/walk-up move complexity.',
          },
          {
            title: 'Northwest residential pattern',
            detail:
              'Riverdale and nearby hills suit people seeking more house-scale living within city limits — with grades and longer portal times as tradeoffs.',
          },
          {
            title: 'Eastern arms and large communities',
            detail:
              'Parkchester, Throgs Neck, Pelham Bay, and Co-op City-area living can offer different space and price combinations; verify bridge and expressway commute reality.',
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
              'Healthcare, education, public sector, retail, logistics, small business corridors, and Manhattan-bound careers shape many Bronx households.',
          },
          {
            title: 'Commute realism',
            detail:
              'Subway and bus coverage varies; drivers face Cross Bronx and bridge delays. Test peak routes to Manhattan or Westchester job centers before choosing solely on rent.',
          },
        ],
      },
      {
        id: 'lifestyle',
        title: 'Lifestyle & practical livability',
        bullets: [
          {
            title: 'Parks and institutions',
            detail:
              'Large park systems, botanical and zoo destinations, and university edges distribute amenities unevenly. Visit candidate blocks on weekdays and weekends.',
          },
          {
            title: 'One borough, multiple textures',
            detail:
              'The Bronx stacks dense urban corridors, large co-op communities, and hillier residential pockets — different from Staten Island suburban density or Manhattan tower defaults.',
          },
          {
            title: 'Climate',
            detail:
              'Hot humid summers, cold winters, and wind exposure on elevated and waterfront edges. Plan weather contingency for move-in.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Bronx County resources',
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
        label: 'NYC Parks — Bronx parks',
        href: 'https://www.nycgovparks.org/',
        external: true,
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
    'Prefer crews comfortable with mixed elevator and walk-up stock; large co-op community rules for eastern complexes; honest Cross Bronx / bridge timing for borough-to-borough pairs; hill and driveway fluency for Riverdale-area homes. Verify NYSDOT household goods authority for in-state moves and FMCSA for interstate legs.',
  lastReviewed: '2026-07-23',
};

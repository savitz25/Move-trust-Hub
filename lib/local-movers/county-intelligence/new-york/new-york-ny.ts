import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';

/**
 * Hand-crafted New York County (Manhattan) moving intelligence.
 * Differentiators: high-rise COI/freight elevators, strict building rules,
 * extreme access density — not Brooklyn brownstone-first, Queens co-op sprawl,
 * Bronx mixed stock, or Staten Island suburban bridge access.
 */
export const newYorkCountyIntelligence: CountyIntelligencePack = {
  stateSlug: 'new-york',
  countySlug: 'new-york',
  hubTitle: 'Manhattan (New York County) Moving Intelligence Hub',
  eyebrow: 'New York · Manhattan high-rises, freight elevators & extreme access',
  h1: 'Moving in Manhattan: Freight Elevators, COI Packets, Building Rules & Access Guide',
  heroOpener:
    'New York County is Manhattan — the densest moving environment in the state. High-rises demand Certificates of Insurance, reserved freight elevators, floor protection, and weekday-only windows. Loading docks fill by mid-morning; curb space is a negotiation with buses, bike lanes, and temporary no-parking signs. A FiDi tower, an UES co-op walk-up hybrid, a Harlem brownstone, and a Midtown micro-unit do not share dock rules, inventory constraints, or labor math. Extreme access is the product: small elevators, long carries from legal staging, and building staff who control the clock. This hub is for people actually moving in Manhattan — not generic NYC tips recycled from Brooklyn walk-ups or Queens co-ops.',
  heroCredibility:
    'NYSDOT household goods for intrastate New York moves · FMCSA for interstate legs · Manhattan freight elevator, COI & building-rules awareness · Curated directory listings',
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
    title: 'What makes moving in Manhattan different',
    intro:
      'These are New York County realities — freight elevators, COI culture, dock windows, and extreme curb scarcity — not interchangeable “NYC borough” boilerplate.',
    bullets: [
      {
        title: 'Freight elevators and COI packets are the default',
        detail:
          'Most full-service apartment and condo buildings require Certificates of Insurance naming the building, management company, or condo association as additional insured, reserved freight (or service) elevators, masonite or floor protection, and approved hours — often weekdays only. Treat the building packet as non-negotiable scope, not optional admin.',
      },
      {
        title: 'Building rules control the clock more than traffic does',
        detail:
          'Move windows, elevator time caps, security check-in, and prohibited items (e.g., open food, certain packing materials) can override your preferred Saturday. Confirm written approval and reconfirm the day before — no elevator reservation means no move.',
      },
      {
        title: 'Extreme access: docks, garages, and curb scarcity',
        detail:
          'Loading docks book out; garage height limits reject full-size trucks; street staging may sit a block or more from the door with bus lanes and hydrant rules in between. Shuttle carries and small trucks are planning tools, not last-resort surprises.',
      },
      {
        title: 'Walk-ups still exist — and they are brutal on dense blocks',
        detail:
          'Tenement walk-ups, brownstones, and older walk-up co-ops in the Village, LES, Harlem, and parts of the UES/UWS mean multi-flight carries without freight elevators. Stairs plus zero curb grace is a different product from tower dock jobs.',
      },
      {
        title: 'Micro-units and high-value small inventories',
        detail:
          'Studios and one-bedrooms dominate many corridors, but high-value electronics, art, and carefully packed soft goods are common. Measure elevator and hallway clearances; fully assembled sofas may not fit paths that look fine on a floor plan.',
      },
      {
        title: 'Avenue congestion and event calendars rewrite portals',
        detail:
          'Midtown, FiDi, and parade/event corridors can freeze truck access. UN week, major marathons, holiday windows, and large arena events are real planning inputs — not footnotes.',
      },
      {
        title: 'Cross-borough and interstate exits are routine',
        detail:
          'Manhattan origins frequently go to Brooklyn, Queens, New Jersey, Westchester, or out of state. Clarify bridge/tunnel routing, tolls, and whether the job is NYSDOT intrastate or FMCSA interstate.',
      },
      {
        title: 'Intrastate NYSDOT rules vs interstate FMCSA authority',
        detail:
          'Moves entirely within New York State generally require NYSDOT household goods authority. Any leg outside New York needs active FMCSA USDOT (and usually MC) authority. Verify exact legal names and numbers before deposits.',
      },
    ],
  },
  zonesHeading: 'Manhattan access zones',
  zonesIntro:
    'Plan by vertical cores, classic residential avenues, downtown walk-up density, and uptown mixed stock — elevator rules and curb reality cluster by zone more than by ZIP alone.',
  zones: [
    {
      id: 'midtown-core',
      name: 'Midtown core — towers, docks & commercial density',
      shortName: 'Midtown',
      neighborhoods: [
        'Midtown',
        'Midtown East',
        'Midtown West',
        'Hell\'s Kitchen / Clinton',
        'Murray Hill',
        'Turtle Bay',
      ],
      housingTypes:
        'High-rises and mid-rises, corporate apartments, condos, some older walk-ups on side streets',
      challenges: [
        'Near-universal COI, freight elevator, and dock windows',
        'Extreme curb competition and bus/bike lane constraints',
        'Garage height limits and dock time caps',
        'Event and office-day congestion',
      ],
      moverTips:
        'Lock elevator and dock reservations in writing first. Share COI certificate holders and liability limits early. Prefer mid-week morning freight windows. Assume shuttle staging until dock access is confirmed.',
      cityKeywords: [
        'midtown',
        'hells kitchen',
        'clinton',
        'murray hill',
        'turtle bay',
        'manhattan',
        'new york',
      ],
    },
    {
      id: 'downtown-fidi',
      name: 'Downtown & Financial District — FiDi, Battery Park City, Tribeca edges',
      shortName: 'Downtown / FiDi',
      neighborhoods: [
        'Financial District',
        'Battery Park City',
        'Tribeca',
        'Civic Center edges',
        'South Street Seaport edges',
        'World Trade Center area',
      ],
      housingTypes:
        'High-rise condos and rentals, converted loft buildings, luxury towers, limited older walk-ups',
      challenges: [
        'Security, COI, and freight elevator complexity',
        'Narrow streets and construction staging',
        'Weekend vs weekday rule differences by building',
        'Bridge and tunnel approach congestion for outbound legs',
      ],
      moverTips:
        'Get security and loading procedures from management early. Confirm weekend move permissions — many towers are weekday-only. Photo dock approaches. Build bridge/tunnel buffer for NJ or outer-borough destinations.',
      cityKeywords: [
        'financial district',
        'fidi',
        'battery park city',
        'tribeca',
        'seaport',
        'manhattan',
      ],
    },
    {
      id: 'downtown-walkups',
      name: 'Downtown walk-up density — Village, SoHo, LES, East Village',
      shortName: 'Downtown Walk-ups',
      neighborhoods: [
        'Greenwich Village',
        'West Village',
        'East Village',
        'Lower East Side',
        'SoHo',
        'NoHo',
        'Nolita',
      ],
      housingTypes:
        'Walk-up tenements and lofts, limited elevators, boutique small buildings, some loft conversions',
      challenges: [
        'Multi-flight stairs and narrow halls',
        'Zero driveway culture and scarce legal curb',
        'Tourist and nightlife congestion on key streets',
        'Tight turns for larger trucks',
      ],
      moverTips:
        'Photo stairwells and landing turns. Prefer early morning starts before street activity peaks. Assume smaller trucks or long carries. Measure large furniture against real paths before move day.',
      cityKeywords: [
        'greenwich village',
        'west village',
        'east village',
        'lower east side',
        'soho',
        'noho',
        'nolita',
        'manhattan',
      ],
    },
    {
      id: 'ues-uws',
      name: 'Upper East Side & Upper West Side — classic residential avenues',
      shortName: 'UES / UWS',
      neighborhoods: [
        'Upper East Side',
        'Upper West Side',
        'Yorkville',
        'Carnegie Hill',
        'Lincoln Square',
        'Manhattan Valley edges',
      ],
      housingTypes:
        'Pre-war co-ops, postwar elevators, brownstones and walk-ups, luxury high-rises',
      challenges: [
        'Co-op board rules and COI requirements',
        'Mixed elevator and walk-up access on adjacent blocks',
        'Avenue arterial traffic and crosstown delays',
        'High-value contents and careful-handling expectations',
      ],
      moverTips:
        'Collect co-op packets early. Survey elevators vs walk-ups unit-by-unit. Discuss valuation for higher-value inventories. Prefer mid-week mornings away from school and crosstown peaks when possible.',
      cityKeywords: [
        'upper east side',
        'upper west side',
        'yorkville',
        'carnegie hill',
        'lincoln square',
        'manhattan',
      ],
    },
    {
      id: 'harlem-uptown',
      name: 'Harlem & uptown — brownstones, elevators & mixed stock',
      shortName: 'Harlem / Uptown',
      neighborhoods: [
        'Harlem',
        'East Harlem',
        'Hamilton Heights',
        'Morningside Heights',
        'Washington Heights',
        'Inwood',
      ],
      housingTypes:
        'Brownstones and row houses, walk-up multi-family, elevator co-ops and rentals, some newer mid-rises',
      challenges: [
        'Stairs and long carries common on brownstone blocks',
        'Elevator buildings with COI mixed into same zones',
        'Hills and limited truck turnaround in parts of Washington Heights / Inwood',
        'Bridge approaches (GWB) congestion for outbound NJ/upstate pairs',
      ],
      moverTips:
        'Confirm elevator vs stair access explicitly. Photo curb and stoop approaches. For Heights/Inwood, note grade and truck length limits. Build GWB buffer for New Jersey-bound legs.',
      cityKeywords: [
        'harlem',
        'east harlem',
        'hamilton heights',
        'morningside heights',
        'washington heights',
        'inwood',
        'manhattan',
      ],
    },
    {
      id: 'chelsea-hudson-yards',
      name: 'Chelsea, Hudson Yards & west-side vertical corridor',
      shortName: 'Chelsea / Hudson Yards',
      neighborhoods: [
        'Chelsea',
        'Hudson Yards',
        'Meatpacking District',
        'West Chelsea',
        'Penn Station South edges',
      ],
      housingTypes:
        'Luxury high-rises, mid-rises, converted lofts, limited walk-ups',
      challenges: [
        'Strict freight elevator and security procedures',
        'High construction and tourism traffic',
        'Dock competition in large developments',
        'High-value design inventories and careful-handling norms',
      ],
      moverTips:
        'Secure building approvals early — large developments book elevators weeks out at peak. Share COI and security contact lists. Prefer mid-week non-event days. Confirm truck routes around construction closures.',
      cityKeywords: [
        'chelsea',
        'hudson yards',
        'meatpacking',
        'west chelsea',
        'manhattan',
      ],
    },
  ],
  costDrivers: {
    title: 'What drives Manhattan moving costs',
    intro:
      'Ranges are market context for local / short regional moves — not quotes. Freight elevator soft costs, extreme access labor, and building-rule wait time separate cheap estimates from real bills.',
    drivers: [
      {
        title: 'Freight elevator, dock & COI soft costs',
        detail:
          'Reservations, certificate admin, security check-in, and elevator time caps add hours before the first box moves.',
      },
      {
        title: 'Extreme curb scarcity & shuttle carries',
        detail:
          'Legal staging often sits far from the door. Shuttle trucks and long carries dominate labor on many blocks.',
      },
      {
        title: 'Walk-up stair density on classic streets',
        detail:
          'Village, LES, Harlem brownstone, and similar multi-flight jobs bill heavily for vertical labor without elevator help.',
      },
      {
        title: 'Building window constraints',
        detail:
          'Weekday-only or short freight windows force premium crew scheduling and can split large inventories across multiple days.',
      },
      {
        title: 'Cross-borough and tunnel/bridge portal time',
        detail:
          'Manhattan ↔ Brooklyn, Queens, Bronx, or New Jersey pairs track bridge, tunnel, and FDR/West Side Highway peaks.',
      },
      {
        title: 'High-value contents & packing scope',
        detail:
          'Art, electronics, and carefully finished apartments raise packing and valuation choices even when unit size is small.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (simple access)',
        value: '$800–$2,800+',
        note: 'Higher with freight elevators, docks, walk-up flights, or peak windows',
      },
      {
        label: '2–3BR elevator co-op or mid-rise',
        value: '$2,200–$6,500+',
        note: 'Building packets and reserved elevators trend up',
      },
      {
        label: '3–4+ BR / luxury tower / multi-flight / cross-borough',
        value: '$4,000–$12,000+',
        note: 'Strict towers, brownstone stairs, and outer-borough pairs price highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$150–$240+/hr',
        note: 'Portal-to-portal; packing and larger crews scale up',
      },
    ],
  },
  seasonal: {
    title: 'When to schedule a Manhattan move',
    intro:
      'Lease cycles, building elevator calendars, corporate starts, event blackouts, and weather all reshape what is even possible on a given day.',
    items: [
      {
        title: 'Best windows: mid-week mornings with confirmed elevators',
        detail:
          'Tuesday–Thursday early freight slots usually clear docks and reduce avenue congestion. Month-end Fridays are the hardest elevator days.',
      },
      {
        title: 'Peak lease season: May–September + month-end',
        detail:
          'Apartment turnover and corporate housing changes fill elevator calendars weeks ahead. Reserve building slots as soon as the lease date is firm.',
      },
      {
        title: 'Event and parade blackouts',
        detail:
          'Marathons, holiday parades, major Midtown events, and UN-related restrictions can eliminate curb and dock access. Cross-check calendars before locking trucks.',
      },
      {
        title: 'Winter weather & holiday freight demand',
        detail:
          'Snow, ice, and holiday double-booking of freight elevators slow jobs. Confirm building heat, elevator status, and path clearing.',
      },
      {
        title: 'Corporate and academic calendars',
        detail:
          'Finance, tech, and university cycles cluster Midtown, FiDi, and Morningside demand. Mid-month dates are often more available than month-end.',
      },
    ],
  },
  specialized: [
    {
      id: 'manhattan-freight-coi',
      title: 'Manhattan freight elevator & COI module',
      intro:
        'Tower and co-op jobs fail on paperwork, elevator reservations, and dock rules more often than on packing skill.',
      bullets: [
        'Request the full building move packet at lease signing or unit assignment.',
        'Confirm COI limits, additional insured names, and certificate delivery method in writing.',
        'Reserve freight elevators and docks; reconfirm 24 hours prior.',
        'Share garage height, dock photos, and prohibited-item lists with the crew lead.',
        'Match inventory volume to elevator time caps — split-day plans beat overtime surprises.',
      ],
    },
    {
      id: 'manhattan-extreme-access',
      title: 'Extreme access, curb & walk-up module',
      intro:
        'When docks are full or buildings are walk-ups, Manhattan turns into a long-carry and small-truck problem on some of the densest blocks in the country.',
      bullets: [
        'Assume shuttle or long-carry until curb photos prove door-side staging.',
        'Photo every stair flight and landing turn for walk-up origins and destinations.',
        'Prefer early morning starts before bus and commerce peaks.',
        'Measure large furniture against elevator cabs and hallway corners.',
        'Avoid major event corridors and blackout dates when the building allows flexibility.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Manhattan (New York County)?',
    intro:
      'Use this as a practical fit checklist — schools, healthcare, building type, and lifestyle density — then verify on official sites. No single ranking captures block-by-block Manhattan fit.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & education landscape',
        intro:
          'Public K–12 is part of New York City Public Schools with highly address-sensitive zoning, plus extensive private and independent school options.',
        bullets: [
          {
            title: 'How districts work here',
            detail:
              'Confirm address zoning through NYC Public Schools tools. Popular neighborhood labels do not guarantee a specific elementary or middle school.',
          },
          {
            title: 'Choice landscape',
            detail:
              'Citywide high school choice and specialized programs require early planning if schools drive the housing search.',
          },
          {
            title: 'Research sources',
            detail:
              'Official NYC Public Schools resources and campus visits beat ranking screenshots alone.',
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
              'NewYork-Presbyterian, NYU Langone, Mount Sinai, Hospital for Special Surgery, NYC Health + Hospitals, and other major centers concentrate heavily in Manhattan. Confirm networks and specialists for your household.',
          },
          {
            title: 'What relocators should do',
            detail:
              'Proximity is often excellent by city standards, but appointment density is high. Transfer records early and verify in-network status after plan changes.',
          },
        ],
      },
      {
        id: 'housing',
        title: 'Housing character & cost pressures',
        bullets: [
          {
            title: 'Vertical living dominates',
            detail:
              'Expect elevators, co-ops, condos, and rentals as the default; true private outdoor space and driveways are rare. Walk-ups remain common in classic downtown and uptown pockets.',
          },
          {
            title: 'Cost pressure',
            detail:
              'Manhattan purchase prices and rents are among the highest in the country. Budget for co-op/condo fees, broker practices where applicable, and strict move deposits.',
          },
          {
            title: 'Building governance',
            detail:
              'Boards and management companies control move hours, elevators, renovations, and insurance certificates. Read house rules before signing.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Which Manhattan areas fit whom',
        bullets: [
          {
            title: 'Vertical core lifestyle',
            detail:
              'Midtown, FiDi, Hudson Yards, and similar towers suit people prioritizing elevator buildings and central access — with COI and dock complexity on move day.',
          },
          {
            title: 'Classic residential avenues',
            detail:
              'UES and UWS often appeal for established residential character and co-op living — with board rules and mixed walk-up/elevator stock.',
          },
          {
            title: 'Downtown character vs uptown space',
            detail:
              'Village/LES/SoHo patterns favor walkable density and older walk-ups; Harlem and Washington Heights can offer more residential brownstone scale — each with distinct access tradeoffs.',
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
              'Finance, media, tech, fashion, healthcare, education, tourism, and professional services concentrate employment density unmatched in most U.S. counties.',
          },
          {
            title: 'Commute realism',
            detail:
              'Many residents walk, subway, or bike more than they drive. Cross-town surface travel can be slow. Test peak routes between home and work before choosing solely on rent.',
          },
        ],
      },
      {
        id: 'lifestyle',
        title: 'Lifestyle & practical livability',
        bullets: [
          {
            title: 'Density as daily life',
            detail:
              'Manhattan compresses amenities, noise, and logistics. What feels energetic to one household feels constrained to another — visit at night and weekend as well as weekday.',
          },
          {
            title: 'Parks and waterfront',
            detail:
              'Central Park, riverside parks, and waterfront paths distribute open space unevenly. Proximity to green space is a major lifestyle variable.',
          },
          {
            title: 'Climate',
            detail:
              'Hot humid summers, cold winters, wind corridors between towers. Plan move-day weather contingency even for short outdoor carries.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Manhattan (New York County) resources',
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
        note: 'Street rules and temporary restrictions context',
      },
      {
        label: 'NYC Public Schools',
        href: 'https://www.schools.nyc.gov/',
        external: true,
        note: 'Zones, calendars, and enrollment',
      },
      {
        label: 'MTA — service status',
        href: 'https://new.mta.info/',
        external: true,
        note: 'Transit context for car-free households',
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
    'Prefer crews with Manhattan freight elevator, COI, and dock experience for towers; walk-up and long-carry fluency for Village/LES/Harlem brownstone stock; honest bridge/tunnel timing for outer-borough and NJ pairs. Verify NYSDOT household goods authority for in-state moves and FMCSA for interstate legs.',
  lastReviewed: '2026-07-23',
};

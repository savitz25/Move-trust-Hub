import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';

/**
 * Hand-crafted Kings County (Brooklyn), New York moving intelligence.
 * Differentiators: walk-ups & brownstones, elevators, COI, street parking,
 * neighborhood micro-markets — not Manhattan freight-tower defaults, Queens
 * co-op sprawl, Bronx arterial patterns, or Staten Island suburban access.
 */
export const kingsCountyIntelligence: CountyIntelligencePack = {
  stateSlug: 'new-york',
  countySlug: 'kings',
  hubTitle: 'Brooklyn (Kings County) Moving Intelligence Hub',
  eyebrow: 'Kings · Brooklyn walk-ups, brownstones & neighborhood micro-markets',
  h1: 'Moving in Brooklyn: Brownstone Walk-Ups, Elevators, COI & Street-Parking Guide',
  heroOpener:
    'Kings County is Brooklyn under the official county name — and it is not one moving market. Brownstone walk-ups with four-flight carries sit blocks from elevator co-ops that demand Certificates of Insurance and reserved service elevators. Street parking, alternate-side rules, and truck-length limits decide whether a box truck ever reaches the curb on a brownstone block. Park Slope is not Bushwick; Williamsburg is not Bay Ridge; a Dumbo loft and a Midwood co-op do not share access, inventory patterns, or portal time. Borough-to-borough bridges and tunnels turn “local” map miles into billable congestion. This hub is for people actually moving in Brooklyn — not generic NYC tips recycled from Manhattan towers or Queens co-ops.',
  heroCredibility:
    'NYSDOT household goods for intrastate New York moves · FMCSA for interstate legs · Brooklyn walk-up, elevator & COI awareness · Curated directory listings',
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
    title: 'What makes moving in Brooklyn different',
    intro:
      'These are Kings County realities — brownstone stairs, elevator COIs, street staging, and neighborhood micro-markets — not interchangeable “NYC” boilerplate.',
    bullets: [
      {
        title: 'Walk-ups and brownstones are the default access problem',
        detail:
          'Much of brownstone Brooklyn (Park Slope, Fort Greene, Boerum Hill, Bedford-Stuyvesant, Carroll Gardens, Prospect Heights) means multi-flight stairs, narrow halls, tight landings, and no freight elevator. Soft goods, disassembled furniture, and long-carry plans often matter more than truck size alone. Measure sofa and mattress paths before move day.',
      },
      {
        title: 'Elevator buildings still run on COI and reserved windows',
        detail:
          'Co-ops, condos, and mid-rises across Brooklyn Heights, Downtown Brooklyn, Williamsburg waterfront, and many avenue corridors require Certificates of Insurance naming the building or management company, reserved service elevators, floor protection, and fixed hours. Treat the building packet as part of the survey — not day-of paperwork.',
      },
      {
        title: 'Street parking and alternate-side rules dominate curb time',
        detail:
          'Most Brooklyn addresses lack private driveways. Alternate-side parking, hydrant zones, bus lanes, and residential permit pressure force temporary no-parking signs, smaller shuttle trucks, or long carries from legal staging. Confirm who posts signs, who pays, and what happens if curb space vanishes on move morning.',
      },
      {
        title: 'Neighborhood micro-markets rewrite the job',
        detail:
          'Williamsburg loft stock, Park Slope family brownstones, Bay Ridge multi-family, Sunset Park industrial-adjacent streets, and Midwood co-ops do not share truck access or inventory norms. Zone the estimate by neighborhood character, not “Brooklyn” as a single ZIP cluster.',
      },
      {
        title: 'Bridges, tunnels, and BQE congestion rewrite portal time',
        detail:
          'Brooklyn–Queens Expressway, Manhattan Bridge, Brooklyn Bridge approaches, Gowanus Expressway, and tunnel routes turn short map pairs into long billable drives — especially Brooklyn ↔ Manhattan or Brooklyn ↔ Queens at peak. Prefer mid-week morning starts when leases allow.',
      },
      {
        title: 'Lease-cycle churn collides with family SFH pockets',
        detail:
          'End-of-month apartment turns in denser corridors collide with summer family moves in more residential neighborhoods. Saturday calendars fill early May–September. Mid-month mid-week windows are usually more available and less curb-competitive.',
      },
      {
        title: 'High-value contents and careful-handling expectations vary by pocket',
        detail:
          'Renovated brownstones and waterfront condos often carry higher-value inventories; older multi-family may emphasize volume and stair labor. Discuss valuation coverage and packing scope against the actual unit type.',
      },
      {
        title: 'Intrastate NYSDOT rules vs interstate FMCSA authority',
        detail:
          'Moves entirely within New York State generally require New York State Department of Transportation (NYSDOT) household goods authority. Any leg outside New York needs active FMCSA USDOT (and usually MC) authority. Verify which license applies before you put down a deposit.',
      },
    ],
  },
  zonesHeading: 'Brooklyn access zones',
  zonesIntro:
    'Plan by brownstone belts, waterfront vertical pockets, southern residential corridors, and industrial-edge neighborhoods — stairs, elevators, and curb reality cluster by zone more than by ZIP alone.',
  zones: [
    {
      id: 'brownstone-belt',
      name: 'Brownstone belt — Park Slope, Fort Greene, Boerum Hill & Prospect Heights',
      shortName: 'Brownstone Belt',
      neighborhoods: [
        'Park Slope',
        'Fort Greene',
        'Boerum Hill',
        'Carroll Gardens',
        'Cobble Hill',
        'Prospect Heights',
        'Clinton Hill',
      ],
      housingTypes:
        'Brownstones and row houses, multi-flight walk-ups, limited elevator co-ops/condos, some townhomes',
      challenges: [
        'Multi-flight stairs and narrow landings',
        'Tight curb space and alternate-side parking',
        'Limited truck length on residential blocks',
        'High-value renovated interiors and careful-handling norms',
      ],
      moverTips:
        'Photo stairwells, hallway widths, and curb approach before the survey is final. Assume long-carry or shuttle until photos prove door-side staging. Prefer mid-week morning starts. Measure large furniture paths early.',
      cityKeywords: [
        'park slope',
        'fort greene',
        'boerum hill',
        'carroll gardens',
        'cobble hill',
        'prospect heights',
        'clinton hill',
        'brooklyn',
      ],
    },
    {
      id: 'north-brooklyn-waterfront',
      name: 'North Brooklyn & waterfront — Williamsburg, Greenpoint, Dumbo',
      shortName: 'North BK / Waterfront',
      neighborhoods: [
        'Williamsburg',
        'Greenpoint',
        'Dumbo',
        'Vinegar Hill',
        'Brooklyn Navy Yard edges',
        'East Williamsburg',
      ],
      housingTypes:
        'Lofts, mid-rise and high-rise condos, older walk-up multi-family, converted industrial product',
      challenges: [
        'Elevator/COI rules mixed with older walk-up stock',
        'Bridge and waterfront congestion',
        'Garage height limits and dock windows on newer towers',
        'Street festivals and event curb closures',
      ],
      moverTips:
        'Collect building packets early for waterfront towers. Survey lofts and walk-ups as different product types. Build Manhattan Bridge / BQE buffer into portal times. Reconfirm elevator reservations the day before.',
      cityKeywords: [
        'williamsburg',
        'greenpoint',
        'dumbo',
        'vinegar hill',
        'east williamsburg',
        'brooklyn',
      ],
    },
    {
      id: 'downtown-heights',
      name: 'Downtown Brooklyn, Brooklyn Heights & adjacent cores',
      shortName: 'Downtown / Heights',
      neighborhoods: [
        'Downtown Brooklyn',
        'Brooklyn Heights',
        'Brooklyn Bridge Park edges',
        'Downtown civic core',
        'MetroTech edges',
      ],
      housingTypes:
        'High-rises, mid-rises, classic Heights brownstones and co-ops, urban condos',
      challenges: [
        'Near-universal COI and elevator windows on towers',
        'Scarce legal curb and dock competition',
        'Court, school, and office-day congestion',
        'Mixed walk-up and tower inventory on adjacent blocks',
      ],
      moverTips:
        'Get COI limits, elevator hours, and certificate holders in writing. Prefer mid-week morning freight windows. Share dock and truck-height photos. Avoid major courthouse and event peaks when flexible.',
      cityKeywords: [
        'downtown brooklyn',
        'brooklyn heights',
        'metrotech',
        'brooklyn bridge park',
        'brooklyn',
      ],
    },
    {
      id: 'central-east-brooklyn',
      name: 'Central & east Brooklyn — Bed-Stuy, Crown Heights, Bushwick',
      shortName: 'Central / East BK',
      neighborhoods: [
        'Bedford-Stuyvesant',
        'Crown Heights',
        'Bushwick',
        'Prospect-Lefferts Gardens',
        'East Flatbush edges',
        'Brownsville edges',
      ],
      housingTypes:
        'Row houses and walk-up multi-family, renovated brownstones, low- and mid-rise multi-family, limited elevators',
      challenges: [
        'Stairs and long carries from legal curb spots',
        'Variable street width and truck turnaround',
        'Avenue arterial traffic (Atlantic, Eastern Parkway, Broadway)',
        'Mixed renovation quality and access within the same block',
      ],
      moverTips:
        'Confirm elevator vs stair access unit-by-unit. Photo alley and curb options. Prefer early weekday starts near major avenues. Clarify exact cross-streets — neighborhood names alone understate access.',
      cityKeywords: [
        'bedford-stuyvesant',
        'bed-stuy',
        'crown heights',
        'bushwick',
        'prospect-lefferts',
        'east flatbush',
        'brooklyn',
      ],
    },
    {
      id: 'south-brooklyn',
      name: 'South Brooklyn — Bay Ridge, Sunset Park, Borough Park, Midwood',
      shortName: 'South Brooklyn',
      neighborhoods: [
        'Bay Ridge',
        'Sunset Park',
        'Borough Park',
        'Midwood',
        'Bensonhurst',
        'Sheepshead Bay edges',
        'Homecrest edges',
      ],
      housingTypes:
        'Multi-family walk-ups, co-ops, some SFH and duplexes, denser residential corridors',
      challenges: [
        'Longer in-borough distances from north Brooklyn staging',
        'Gowanus Expressway / Belt Parkway congestion',
        'Co-op elevator rules mixed with walk-up stock',
        'Commercial corridor double-parking pressure',
      ],
      moverTips:
        'Never price Bay Ridge ↔ Williamsburg as a short hop without traffic buffer. Collect co-op packets early. Book family multi-bedroom Saturdays ahead in summer. Confirm truck access on residential side streets.',
      cityKeywords: [
        'bay ridge',
        'sunset park',
        'borough park',
        'midwood',
        'bensonhurst',
        'sheepshead bay',
        'brooklyn',
      ],
    },
    {
      id: 'flatbush-prospect-park-south',
      name: 'Flatbush, Ditmas Park & Prospect Park South',
      shortName: 'Flatbush / Ditmas',
      neighborhoods: [
        'Flatbush',
        'Ditmas Park',
        'Prospect Park South',
        'Kensington',
        'Windsor Terrace',
        'Catón Park edges',
      ],
      housingTypes:
        'Victorian SFH and large multi-story homes, walk-up multi-family, co-ops near avenues',
      challenges: [
        'Long drives and mature-tree clearances on SFH blocks',
        'Stairs and porch access on larger homes',
        'Prospect Park / parade and event traffic',
        'Parking pressure near commercial strips',
      ],
      moverTips:
        'Survey large homes for driveway vs street-only access. Photo tree limbs and porch turns. Prefer early starts near park and commercial corridors. Discuss packing for multi-level inventories.',
      cityKeywords: [
        'flatbush',
        'ditmas park',
        'prospect park south',
        'kensington',
        'windsor terrace',
        'brooklyn',
      ],
    },
  ],
  costDrivers: {
    title: 'What drives Brooklyn moving costs',
    intro:
      'Ranges are market context for local / short regional moves — not quotes. Stair labor, elevator soft costs, street-staging friction, and bridge/BQE portal time separate cheap estimates from real bills.',
    drivers: [
      {
        title: 'Walk-up stair labor & long carries',
        detail:
          'Multi-flight brownstones and walk-ups multiply crew hours. Long carries from legal curb spots add billable time before packing quality ever matters.',
      },
      {
        title: 'Elevator, COI & building soft costs',
        detail:
          'Certificates of Insurance, reserved service elevators, floor protection, and fixed windows add admin and wait time on co-ops, condos, and mid-rises.',
      },
      {
        title: 'Street parking, permits & shuttle staging',
        detail:
          'Alternate-side rules and scarce curb force temporary no-parking signs, smaller trucks, or shuttle carries — often the largest soft-cost surprise on brownstone blocks.',
      },
      {
        title: 'BQE, bridges & borough-to-borough congestion',
        detail:
          'Portal-to-portal billing tracks expressway and bridge peaks. Brooklyn ↔ Manhattan or cross-borough pairs can burn far more clock than map miles suggest.',
      },
      {
        title: 'Neighborhood micro-market inventory differences',
        detail:
          'Waterfront lofts, renovated brownstones, and multi-bedroom south Brooklyn homes do not share volume or handling assumptions under one “Brooklyn” label.',
      },
      {
        title: 'Peak lease-cycle and summer Saturday demand',
        detail:
          'Month-end apartment churn and May–September family windows tighten crew availability and push premium rates.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (simple access)',
        value: '$700–$2,400+',
        note: 'Higher with walk-up flights, elevator windows, or peak curb friction',
      },
      {
        label: '2–3BR walk-up or modest elevator unit',
        value: '$1,800–$5,000+',
        note: 'Stairs, long carries, and building packets trend up',
      },
      {
        label: '3–4+ BR brownstone / tower / cross-borough',
        value: '$3,200–$9,500+',
        note: 'Multi-flight homes, COI towers, and Manhattan pairs price highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$140–$220+/hr',
        note: 'Portal-to-portal; packing and larger crews scale up',
      },
    ],
  },
  seasonal: {
    title: 'When to schedule a Brooklyn move',
    intro:
      'Lease cycles, summer family demand, school calendars, street-cleaning windows, and weather all reshape curb access and crew availability.',
    items: [
      {
        title: 'Best truck windows: mid-week mornings',
        detail:
          'Tuesday–Thursday before 9 a.m. usually improves curb odds and reduces BQE / bridge pain. Avoid month-end Fridays when leases collide.',
      },
      {
        title: 'Peak apartment churn: month-end + May–September',
        detail:
          'End-of-month turns and summer demand fill calendars. Book 2–4 weeks ahead for popular Saturday windows.',
      },
      {
        title: 'Alternate-side and street-cleaning calendars',
        detail:
          'Know street-cleaning days for both addresses. A “free” curb at survey time can vanish on move morning if rules flip.',
      },
      {
        title: 'Winter weather & holiday curb pressure',
        detail:
          'Snow, ice, and holiday double-parking slow open carries. Build buffer and confirm elevator heat/power status in older buildings.',
      },
      {
        title: 'Event and festival corridors',
        detail:
          'Neighborhood festivals, park events, and bridge races can close curb access. Cross-check calendars for waterfront and park-adjacent jobs.',
      },
    ],
  },
  specialized: [
    {
      id: 'brooklyn-walkup-brownstone',
      title: 'Brooklyn walk-up & brownstone module',
      intro:
        'Brownstone and multi-flight jobs fail on stairs, landings, and curb staging more often than on packing skill alone.',
      bullets: [
        'Photo every flight, landing turn, and hallway width before the estimate is final.',
        'Measure sofas, mattresses, and large casegoods against actual paths — not floor plans.',
        'Budget long-carry or shuttle when trucks cannot stage at the stoop.',
        'Discuss partial packing for soft goods that move faster on stairs than fully assembled pieces.',
        'Prefer early weekday starts when alternate-side and commercial traffic ease.',
      ],
    },
    {
      id: 'brooklyn-elevator-coi-street',
      title: 'Elevator COI & street-parking module',
      intro:
        'Co-ops, condos, and mid-rises add paperwork and reserved elevators; street rules decide whether the truck ever reaches the door.',
      bullets: [
        'Request building move packets (COI limits, elevator hours, certificate holders) at lease signing.',
        'Reserve service elevators in writing and reconfirm the day before.',
        'Clarify who posts temporary no-parking signs and who pays permit or sign costs.',
        'Share curb photos and truck-length constraints with the crew lead.',
        'Avoid month-end Fridays when elevator calendars and curb competition peak.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Brooklyn (Kings County)?',
    intro:
      'Use this as a practical fit checklist — schools, healthcare, neighborhood character, and commute — then verify on district and hospital sites. No single ranking captures block-by-block fit.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & education landscape',
        intro:
          'Public K–12 in Brooklyn is part of New York City Public Schools with district and zoned options that vary by address. Assignment is address-based; neighborhood marketing names do not guarantee a campus.',
        bullets: [
          {
            title: 'How districts work here',
            detail:
              'Confirm your address zone through NYC Public Schools tools. Popular neighborhood names (Park Slope, Williamsburg, Bay Ridge) span multiple school options and waitlists.',
          },
          {
            title: 'Choice and specialized programs',
            detail:
              'Citywide choice, screened, and specialized high school processes add complexity. Start research early if school fit drives the housing search.',
          },
          {
            title: 'Research sources',
            detail:
              'NYC Public Schools official resources, school tours, and current enrollment data beat ranking screenshots alone.',
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
              'NYU Langone (including Brooklyn campuses), Maimonides, NewYork-Presbyterian Brooklyn Methodist, NYC Health + Hospitals facilities, and other regional providers serve different corridors. Confirm networks and specialties for your household.',
          },
          {
            title: 'What relocators should do',
            detail:
              'Map transit and peak-hour drive times from your target neighborhood to preferred facilities. Transfer records early and verify in-network status after a plan change.',
          },
        ],
      },
      {
        id: 'housing',
        title: 'Housing character & cost pressures',
        bullets: [
          {
            title: 'Stock varies by micro-market',
            detail:
              'Expect brownstones and walk-ups across classic residential belts; loft and tower product near waterfront cores; denser multi-family and co-ops through central and southern corridors.',
          },
          {
            title: 'Cost variation inside the borough',
            detail:
              'Rents and purchase prices vary sharply by neighborhood and building type. Budget for co-op/condo fees, broker norms where applicable, and insurance on higher-value inventories.',
          },
          {
            title: 'Building governance',
            detail:
              'Co-ops and many condos control move hours, elevator reservations, deposits, and Certificate of Insurance requirements. Read house rules before lease signing or closing.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Which Brooklyn areas fit whom',
        bullets: [
          {
            title: 'Brownstone residential lifestyle',
            detail:
              'Park Slope, Fort Greene, Cobble Hill, and similar belts often appeal for tree-lined blocks and family-oriented density — with stair and curb tradeoffs on move day.',
          },
          {
            title: 'North Brooklyn / waterfront pattern',
            detail:
              'Williamsburg, Greenpoint, and Dumbo suit people prioritizing loft/tower product and Manhattan-adjacent access — with elevator packets and bridge congestion as planning inputs.',
          },
          {
            title: 'Southern and avenue-corridor patterns',
            detail:
              'Bay Ridge, Midwood, Sunset Park, and Flatbush corridors can offer more multi-bedroom multi-family stock and different price bands; verify commute to job centers at peak hours.',
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
              'Healthcare, education, professional services, creative industries, logistics, retail, and Manhattan-bound careers shape many Brooklyn households’ commute math.',
          },
          {
            title: 'Commute realism',
            detail:
              'Subway lines, buses, and limited car-dependent pockets coexist. Bridge and tunnel delays are real for drivers. Test peak transit and drive routes before choosing solely on rent.',
          },
        ],
      },
      {
        id: 'lifestyle',
        title: 'Lifestyle & practical livability',
        bullets: [
          {
            title: 'One borough, many Brooklyns',
            detail:
              'Kings County stacks brownstone belts, waterfront vertical living, and long southern residential arms — different from Manhattan freight-tower defaults or Staten Island suburban density.',
          },
          {
            title: 'Climate & street life',
            detail:
              'Hot humid summers, cold winters with occasional snow, and strong street-level commercial corridors. Plan outdoor staging and weather contingency as part of move-in.',
          },
          {
            title: 'Parks and culture',
            detail:
              'Prospect Park, waterfront parks, and dense cultural scenes concentrate amenities unevenly. Visit target blocks at peak and off-peak times when deciding.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Brooklyn (Kings County) resources',
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
        label: 'NYC Open Data / parking & street resources',
        href: 'https://opendata.cityofnewyork.us/',
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
    'Prefer crews with brownstone walk-up and long-carry experience for classic residential belts; elevator COI fluency for co-ops and waterfront towers; honest BQE / bridge timing for borough-to-borough pairs. Verify NYSDOT household goods authority for in-state moves and FMCSA for interstate legs.',
  lastReviewed: '2026-07-23',
};

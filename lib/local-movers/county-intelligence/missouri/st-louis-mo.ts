import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeMoPack,
  MO_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/missouri/mo-shared';

/**
 * St. Louis County, MO — independent from St. Louis City; inner-ring Clayton/U City through
 * Chesterfield west corridor and North County. NOT St. Louis County, MN (Duluth/North Shore).
 * NOT Jackson County / Kansas City metro.
 */
export const stLouisCountyMoIntelligence: CountyIntelligencePack = finalizeMoPack({
  countySlug: 'st-louis',
  hubTitle: 'St. Louis County Moving Intelligence Hub',
  eyebrow:
    'St. Louis County, MO · Clayton density, Chesterfield west growth & I-270 loop logistics',
  h1: 'Moving in St. Louis County, MO: Inner-Ring Access, West Corridor Growth & I-270 Loop Logistics',
  heroOpener:
    'St. Louis County, Missouri is not St. Louis County, Minnesota (Duluth hills and North Shore cabins) and not a Kansas City / Jackson County clone — it is an independent county surrounding the City of St. Louis with Clayton and University City multi-unit density, west corridor Chesterfield–Ballwin HOA growth, North County mixed stock, and I-70 / I-64 / I-44 / I-270 freeflow that rewrites “local” estimates. A Central West End–adjacent elevator tower, a Kirkwood bungalow stair stack, a Town & Country gated driveway, and a Florissant multi-unit do not share truck access or crew skill. The city and county are separate jurisdictions with different curb rules and address lines. This hub is for people moving in St. Louis County, MO — not a renamed Duluth page, city-only script, or Kansas City freeflow template.',
  heroCredibility:
    'MoDOT Motor Carrier Services household goods authority for intrastate · FMCSA for interstate · St. Louis County access & I-270 logistics awareness · Curated listings',
  majorCorridors: 'I-70 · I-64 · I-44 · I-270 · I-55 · local arterial grid',
  whatMakesDifferent: {
    title: 'What makes moving in St. Louis County, MO different',
    intro:
      'These are St. Louis County, Missouri realities — city/county split, inner-ring elevators, west-corridor HOAs, and I-270 loop freeflow — not Duluth/North Shore logistics and not Kansas City interstate grids.',
    bullets: [
      {
        title: 'This is Missouri’s St. Louis County — not Minnesota’s St. Louis County',
        detail:
          'Ignore Duluth hill grades, Lake Superior weather, and MnDOT assumptions. Corridors, climate, and regulators here are Missouri-specific (MoDOT MCS household goods + FMCSA). Address lines say St. Louis County, MO — not Duluth.',
      },
      {
        title: 'City of St. Louis and St. Louis County are separate products',
        detail:
          'The independent City of St. Louis is not inside the county. Curb rules, permit culture, and density stacks differ from Clayton, University City, or unincorporated county pockets. Clarify city vs county on every estimate.',
      },
      {
        title: 'Inner-ring elevators, walk-ups, and scarce curb rewrite labor',
        detail:
          'Clayton towers, Richmond Heights multi-unit, Maplewood flats, and University City walk-ups stack COIs, elevator slots, and long carries that west-corridor driveway jobs do not share.',
      },
      {
        title: 'West corridor HOA growth is not North County product',
        detail:
          'Chesterfield, Ballwin, Wildwood edges, and Town & Country gate lists rewrite jobs that look suburban simple on paper. Florissant and Hazelwood mixed stock needs different stair and curb surveys.',
      },
      {
        title: 'I-70, I-64, I-44, I-270, and I-55 turn short pairs into billable hours',
        detail:
          'Clayton ↔ Chesterfield, Kirkwood ↔ North County, or South County ↔ West County pairs look local and still burn 25–60+ minutes at peak on the loop and radials. Price portal-to-portal honestly.',
      },
      {
        title: 'Metro East Illinois and city-core pairs are routine interstate/cross-jurisdiction jobs',
        detail:
          'Households regularly move St. Louis County ↔ St. Louis City or St. Clair / Madison County, IL. MoDOT household goods authority alone does not authorize Illinois delivery — verify FMCSA when any leg leaves Missouri.',
      },
      MO_REG_BULLET,
    ],
  },
  zonesHeading: 'St. Louis County, MO access zones',
  zonesIntro:
    'Plan by inner-ring Clayton–University City density, mid-county Kirkwood–Webster stock, west corridor Chesterfield growth, North County mixed product, and South County I-55/I-270 belts — access rules cluster by product more than ZIP alone.',
  zones: [
    {
      id: 'inner-ring-clayton-ucity',
      name: 'Clayton, University City, Richmond Heights & inner-ring multi-unit',
      shortName: 'Inner-ring / Clayton',
      neighborhoods: [
        'Clayton',
        'University City',
        'Richmond Heights',
        'Maplewood',
        'Brentwood edges',
        'Olivette edges',
      ],
      housingTypes: 'Mid-rise condo, walk-up multifamily, older SFH, limited high-rise',
      challenges: [
        'Elevator reservations, COIs, and scarce curb',
        'I-64 / Hanley / Brentwood Blvd freeflow',
        'City/county boundary confusion on addresses',
      ],
      moverTips:
        'Book elevators and COIs in writing before the crew day. Photo curb options. Confirm City of St. Louis vs county addresses on the estimate.',
      cityKeywords: [
        'clayton',
        'university city',
        'richmond heights',
        'maplewood',
        'brentwood',
        'olivette',
      ],
    },
    {
      id: 'mid-county-kirkwood-webster',
      name: 'Kirkwood, Webster Groves, Des Peres & mid-county character stock',
      shortName: 'Kirkwood / Webster',
      neighborhoods: [
        'Kirkwood',
        'Webster Groves',
        'Des Peres',
        'Shrewsbury edges',
        'Glendale edges',
        'Rock Hill edges',
      ],
      housingTypes: 'Older SFH, bungalows, multi-unit pockets, some townhomes',
      challenges: [
        'Stairs, basements, and tight residential curb',
        'I-44 / Big Bend freeflow at peak',
        'Tree-lined approaches limiting truck length',
      ],
      moverTips:
        'Survey stair and basement carries with photos. Prefer mid-week starts. Price I-44 honestly for cross-zone pairs.',
      cityKeywords: [
        'kirkwood',
        'webster groves',
        'des peres',
        'shrewsbury',
        'glendale',
      ],
    },
    {
      id: 'west-corridor-chesterfield',
      name: 'Chesterfield, Ballwin, Manchester & west corridor HOA growth',
      shortName: 'West corridor',
      neighborhoods: [
        'Chesterfield',
        'Ballwin',
        'Manchester',
        'Ellisville edges',
        'Wildwood edges',
        'Clarkson Valley edges',
      ],
      housingTypes: 'HOA SFH, townhomes, newer multi-family, gated pockets',
      challenges: [
        'HOA gate lists, truck-length limits, and timed windows',
        'I-64 / US-40 / I-270 freeflow',
        'Longer empty miles vs inner-ring',
      ],
      moverTips:
        'Collect HOA packets and gate codes early. Confirm truck length rules. Price I-64 / I-270 portal time for eastbound unload pairs.',
      cityKeywords: [
        'chesterfield',
        'ballwin',
        'manchester',
        'ellisville',
        'wildwood',
      ],
    },
    {
      id: 'ladue-town-country',
      name: 'Ladue, Town & Country, Frontenac & estate-access pockets',
      shortName: 'Ladue / T&C',
      neighborhoods: [
        'Ladue',
        'Town and Country',
        'Frontenac',
        'Huntleigh edges',
        'Crystal Lake Park edges',
        'Westwood edges',
      ],
      housingTypes: 'Estate SFH, large lots, some condo and townhome product',
      challenges: [
        'Long driveway carries and limited staging width',
        'HOA and private-road access rules',
        'I-64 / Lindbergh freeflow',
      ],
      moverTips:
        'Photo driveway pitch and turnarounds. Confirm private-road and HOA rules. Inventory high-value items carefully on the survey.',
      cityKeywords: [
        'ladue',
        'town and country',
        'frontenac',
        'huntleigh',
      ],
    },
    {
      id: 'north-county',
      name: 'Florissant, Hazelwood, Bridgeton & North County mixed product',
      shortName: 'North County',
      neighborhoods: [
        'Florissant',
        'Hazelwood',
        'Bridgeton',
        'Overland edges',
        'Maryland Heights edges',
        'Ferguson edges',
      ],
      housingTypes: 'SFH, multi-unit, older ranch stock, some newer multi-family',
      challenges: [
        'I-270 / I-70 freeflow and airport-corridor traffic',
        'Mixed stair and curb access',
        'Longer empty miles to west corridor jobs',
      ],
      moverTips:
        'Clarify municipality on the estimate. Avoid peak I-270 windows when flexible. Survey multi-unit rules early.',
      cityKeywords: [
        'florissant',
        'hazelwood',
        'bridgeton',
        'overland',
        'maryland heights',
        'ferguson',
      ],
    },
    {
      id: 'south-county-i270',
      name: 'South County, Mehlville–Oakville belts & I-55 / I-270 edges',
      shortName: 'South County',
      neighborhoods: [
        'Mehlville edges',
        'Oakville edges',
        'Affton edges',
        'Lemay edges',
        'South County Center corridors',
        'Concord edges',
      ],
      housingTypes: 'SFH, multi-unit, ranch and split-level stock',
      challenges: [
        'I-55 / I-270 / Tesson Ferry freeflow',
        'Basement stairs and driveway pitch',
        'Jefferson County fringe pairs common',
      ],
      moverTips:
        'Price I-55 and I-270 honestly. Photo basement access. Clarify unincorporated county addresses vs named municipalities.',
      cityKeywords: [
        'mehlville',
        'oakville',
        'affton',
        'lemay',
        'south county',
      ],
    },
  ],
  costDrivers: {
    title: 'What drives St. Louis County moving costs',
    intro:
      'Access product, elevator/HOA admin, and I-270 loop freeflow move the number more than packing skill alone — and this is not a Duluth or Kansas City price template.',
    drivers: [
      {
        title: 'Elevator reservations, COIs & scarce inner-ring curb',
        detail:
          'Clayton, University City, and Richmond Heights vertical product add labor and schedule risk before packing skill matters.',
      },
      {
        title: 'HOA gates, truck limits & west-corridor windows',
        detail:
          'Chesterfield–Ballwin–Town & Country packets rewrite jobs that look simple on a map.',
      },
      {
        title: 'I-70 · I-64 · I-44 · I-270 · I-55 congestion',
        detail:
          'Cross-county and city–suburb pairs burn portal-to-portal hours even when map miles look short.',
      },
      {
        title: 'Stairs, basements & older mid-county stock',
        detail:
          'Kirkwood, Webster Groves, and South County basements add flight counts flat-rate optimism underprices.',
      },
      {
        title: 'City / Metro East / multi-county empty miles',
        detail:
          'St. Louis City and Illinois destinations raise staging distance and authority complexity when leaving Missouri.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (simple access)',
        value: '$500–$1,900+',
        note: 'Higher with elevators, walk-ups, or peak I-270 pairs',
      },
      {
        label: '2–3BR condo, duplex, or mid-size SFH',
        value: '$1,500–$4,500+',
        note: 'Stairs, COI, and HOA soft costs trend up',
      },
      {
        label: '3–4+ BR / estate / cross-zone',
        value: '$3,000–$9,500+',
        note: 'West-corridor estates and long loop pairs price highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$120–$210+/hr',
        note: 'Portal-to-portal; packing, COI admin, and stairs scale up',
      },
    ],
  },
  seasonal: {
    title: 'When to schedule a St. Louis County move',
    intro:
      'Lease cycles, school calendars, summer heat, and winter ice reshape access and crew availability across the loop.',
    items: [
      {
        title: 'Best windows: mid-week early mornings',
        detail:
          'Tuesday–Thursday starts clear curb, ease elevator windows, and reduce I-270 / I-64 pain. Avoid month-end Fridays when leases and HOA slots collide.',
      },
      {
        title: 'Peak season: late May–mid-September',
        detail:
          'Apartment turnover and family school calendars fill first. Book 2–4 weeks ahead for peak weekends and elevator or HOA slots.',
      },
      {
        title: 'Summer heat & humidity on outdoor carries',
        detail:
          'June–August heat indexes raise crew rotation needs and soft costs on long driveway and stair jobs. Prefer early starts.',
      },
      {
        title: 'Winter ice, freeze-thaw, and holiday freeflow',
        detail:
          'December–February adds icy stoops, driveway pitch risk, and weather cancellations. Prefer flexible dates and contingency for melt and tarps.',
      },
    ],
  },
  specialized: [
    {
      id: 'stl-county-elevator-hoa-loop',
      title: 'St. Louis County elevator, HOA & I-270 loop logistics module',
      intro:
        'St. Louis County estimates fail more often on stair surveys, elevator packets, HOA gates, and loop freeflow than on packing skill alone.',
      bullets: [
        'Collect building COI, elevator reservations, and HOA gate rules before the survey is final.',
        'Photo stair counts, curb options, and driveway pitch for inner-ring and mid-county stock.',
        'Price portal-to-portal time for any pair that rides I-70, I-64, I-44, I-270, or I-55 at peak.',
        'Clarify City of St. Louis vs St. Louis County municipality on every multi-address estimate.',
        'Plan summer heat and winter ice contingency into outdoor carries.',
        'For in-state jobs verify MoDOT household goods operating authority; verify FMCSA for any out-of-state leg.',
      ],
    },
    {
      id: 'not-duluth-not-kc',
      title: 'Not Duluth MN · not Kansas City micro-market module',
      intro:
        'A single “St. Louis” or “metro” rate collapses when Missouri county product is confused with Minnesota St. Louis County or Jackson County KC freeflow.',
      bullets: [
        'Do not apply Duluth hillside or North Shore cabin access assumptions — this is Missouri loop logistics.',
        'Do not price Clayton elevators like Chesterfield HOA driveways or like Kansas City Plaza product.',
        'Keep St. Louis City, St. Louis County, and Metro East Illinois lines clear on authority and timing.',
        'Match west-corridor school calendars separately from inner-ring lease-end peaks.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to St. Louis County, MO?',
    intro:
      'Use this as a practical fit checklist — schools, healthcare, housing character, and commute realism — then verify on district and hospital sites. No single ranking captures neighborhood fit. This is not Duluth, MN relocation guidance.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & education landscape',
        bullets: [
          {
            title: 'How districts work here',
            detail:
              'St. Louis County is fragmented across many independent districts (Parkway, Rockwood, Kirkwood, Ladue, Ferguson-Florissant, Pattonville, Lindbergh, Mehlville, and others). Assignment is address-based — marketing neighborhood names do not guarantee a campus.',
          },
          {
            title: 'Choice, boundaries & enrollment pressure',
            detail:
              'Popular programs and boundary edges can be competitive. Confirm enrollment windows early when relocating mid-year.',
          },
          {
            title: 'Research sources',
            detail:
              'District boundary tools, Missouri DESE data, and campus visits beat ranking screenshots alone.',
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
              'BJC HealthCare (including Barnes-Jewish and St. Louis Children’s), Mercy, SSM Health, and St. Luke’s campuses anchor care across the county and adjacent city. Confirm insurance networks for your household.',
          },
          {
            title: 'What relocators should do',
            detail:
              'Map peak-hour drive times to preferred campuses — I-270 freeflow changes “nearby” on paper. Transfer records early.',
          },
        ],
      },
      {
        id: 'housing',
        title: 'Housing character & cost pressures',
        bullets: [
          {
            title: 'Housing mix',
            detail:
              'Expect inner-ring multi-unit and condo product; mid-county character SFH; west-corridor HOA growth; North and South County mixed ranch and multi-family stock.',
          },
          {
            title: 'Cost variation inside the county',
            detail:
              'Purchase prices and rents vary sharply by municipality and product. Budget for HOA dues, older-building repair risk, and parking where relevant.',
          },
          {
            title: 'Building and HOA governance',
            detail:
              'Associations and multi-unit management often control move hours, truck size, elevators, and deposits. Read documents carefully.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Which areas fit whom',
        bullets: [
          {
            title: 'Inner-ring urban-adjacent lifestyle',
            detail:
              'Clayton, University City, and Richmond Heights suit people prioritizing walkability and short city access — with elevator, curb, and parking tradeoffs on move day.',
          },
          {
            title: 'Mid-county character living',
            detail:
              'Kirkwood and Webster Groves often appeal for downtown districts and older housing stock — with stairs, basements, and tighter curb.',
          },
          {
            title: 'West corridor space and schools',
            detail:
              'Chesterfield, Ballwin, and similar belts attract households seeking newer product and relative space — with HOA logistics and longer loop commutes.',
          },
          {
            title: 'North and South County value belts',
            detail:
              'Fit buyers chasing relative value and freeway access — with mixed stock norms and I-270 / I-55 freeflow.',
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
              'Clayton and west-corridor corporate campuses, healthcare systems, education, aerospace/defense suppliers, and downtown St. Louis City professional cores concentrate demand. Many households reverse-commute across the loop.',
          },
          {
            title: 'Commute realism',
            detail:
              'Peak I-270, I-64, and I-44 freeflow is real. Test peak routes before choosing solely on rent or purchase price.',
          },
        ],
      },
      {
        id: 'lifestyle',
        title: 'Lifestyle & practical livability',
        bullets: [
          {
            title: 'Local character',
            detail:
              'St. Louis County stacks inner-ring density, character towns, west-corridor growth, and North/South County belts — different from St. Louis City-only product, Kansas City freeflow, and completely different from Duluth/North Shore Minnesota logistics.',
          },
          {
            title: 'Climate',
            detail:
              'Humid continental four-season climate with hot summers, occasional severe storms, and freeze-thaw winters. Plan outdoor staging, heat, and ice contingency as part of move-in.',
          },
          {
            title: 'Culture and pace',
            detail:
              'Visit at peak and off-peak times when deciding — school calendars, summer festivals, and winter weather reshape daily rhythm.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful St. Louis County resources',
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify MoDOT household goods operating authority for in-state moves and FMCSA for interstate legs before deposits.',
    items: [
      {
        label: 'St. Louis County — official site',
        href: 'https://stlouiscountymo.gov/',
        external: true,
        note: 'County services, permits & unincorporated info',
      },
      {
        label: 'City of Clayton',
        href: 'https://www.claytonmo.gov/',
        external: true,
        note: 'Inner-ring multi-unit & curb context',
      },
      {
        label: 'City of Chesterfield',
        href: 'https://www.chesterfield.mo.us/',
        external: true,
        note: 'West corridor growth municipality',
      },
      {
        label: 'Traveler Information Map — MoDOT',
        href: 'https://traveler.modot.org/map/',
        external: true,
        note: 'I-270 / I-64 / I-44 / I-70 before load windows',
      },
    ],
  },
  directoryHint:
    'Prefer crews with elevator/COI experience for Clayton–University City product; HOA gate fluency for Chesterfield–Ballwin–Town & Country stock; honest I-70 · I-64 · I-44 · I-270 · I-55 timing for cross-zone pairs. Verify MoDOT Motor Carrier Services household goods operating authority for intrastate moves and FMCSA for interstate legs before deposits.',
  lastReviewed: '2026-07-24',
});

import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeNvPack,
  NV_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/nevada/nv-shared';

/**
 * Clark County, NV — Las Vegas Valley core / Henderson / North Las Vegas / strip-adjacent.
 * NOT Washoe (Reno), NOT Nye (Pahrump exurban), NOT CA Inland Empire freeflow.
 */
export const clarkCountyNvIntelligence: CountyIntelligencePack = finalizeNvPack({
  countySlug: 'clark',
  hubTitle: 'Clark County Moving Intelligence Hub',
  eyebrow:
    'Clark County, NV · Las Vegas Valley, Henderson, NLV & desert heat logistics',
  h1: 'Moving in Clark County: Las Vegas Valley Access, Strip-Adjacent Staging & Desert Heat Logistics',
  heroOpener:
    'Clark County, Nevada is not a Reno / Washoe CA-border clone and not a Pahrump exurban rename — it is the Las Vegas Valley with Strip-adjacent and resort-corridor density on one side, Henderson and Summerlin HOA growth on another, North Las Vegas and far-west belts stretching empty miles, and extreme desert heat that rewrites open-carry labor from late spring through early fall. A high-rise COI elevator, a gated master-plan driveway, a midtown walk-up, and a desert-lot ranch do not share truck access or crew skill. I-15, I-215, US-95, and US-93 freeflow turn “local” pairs into billable portal hours. This hub is for people moving in Clark County, NV — not a renamed Reno page or generic Southwest script.',
  heroCredibility:
    'NTA household goods CPCN for intrastate · FMCSA for interstate · Las Vegas Valley access & extreme-heat logistics awareness · Curated listings',
  majorCorridors: 'I-15 · I-215 · US-95 · US-93 · local Las Vegas arterial grid',
  whatMakesDifferent: {
    title: 'What makes moving in Clark County different',
    intro:
      'These are Las Vegas Valley realities — Strip-adjacent staging, HOA master plans, NLV growth, and desert heat logistics — not Reno/Sparks industrial grids and not long-approach Pahrump exurban product.',
    bullets: [
      {
        title: 'Strip-adjacent and resort-corridor density is not suburb product',
        detail:
          'High-rises, mid-rises, and entertainment-district multi-unit stack COIs, elevator slots, dock reservations, and scarce curb that Henderson cul-de-sacs and Summerlin gates do not share. Event and convention freeflow can kill an unbuffered load window.',
      },
      {
        title: 'Henderson, Summerlin & master-plan HOAs rewrite suburban jobs',
        detail:
          'Gate lists, truck-length limits, timed move windows, and Certificates of Insurance dominate planned communities across the Valley. Flat-rate optimism from open-street desert lots underprices HOA admin and long driveway carries.',
      },
      {
        title: 'North Las Vegas and far-west belts add empty-mile burn',
        detail:
          'NLV growth tracts, Centennial / northwest pockets, and far-west approaches routinely burn 30–60+ minutes portal-to-portal vs central Strip or Henderson staging — even when map miles look “local.”',
      },
      {
        title: 'Extreme heat is a labor and schedule factor, not a footnote',
        detail:
          'Late spring through early fall afternoons regularly push dangerous open-carry conditions. Early starts, hydration pacing, shade staging, and flexible weather windows outperform noon load-outs on new-construction streets and open docks.',
      },
      {
        title: 'I-15, I-215, US-95 & US-93 freeflow rewrite “local” estimates',
        detail:
          'Strip ↔ Henderson, Summerlin ↔ NLV, or southeast Valley ↔ northwest pairs look short and still burn billable hours at peak. Price portal-to-portal honestly — not crow-flies miles.',
      },
      {
        title: 'This is not Washoe County and not Nye County',
        detail:
          'Ignore Reno/Sparks I-80 industrial-residential assumptions and do not treat Pahrump long approaches as interchangeable Valley product. Housing mix, heat scale, and corridors are Las Vegas Valley–specific.',
      },
      {
        title: 'Interstate pairs (CA, AZ, UT) are routine authority problems',
        detail:
          'Households regularly move Clark ↔ Southern California, Arizona, or Utah. An NTA household goods CPCN alone does not authorize out-of-state delivery — verify FMCSA USDOT/MC when any leg leaves Nevada.',
      },
      NV_REG_BULLET,
    ],
  },
  zonesHeading: 'Clark County / Las Vegas Valley access zones',
  zonesIntro:
    'Plan by Strip-adjacent and resort multi-unit, central/mid-Valley stock, Henderson growth, Summerlin / west HOAs, North Las Vegas belts, and far-northwest / southwest desert edges — access rules cluster by product more than ZIP alone.',
  zones: [
    {
      id: 'strip-resort-corridor',
      name: 'Strip-adjacent, resort corridor & high-rise multi-unit',
      shortName: 'Strip / resort',
      neighborhoods: [
        'Las Vegas Strip edges',
        'Paradise / University corridors',
        'Convention Center approaches',
        'East Strip multi-unit',
        'Resort-corridor towers',
        'Maryland Parkway edges',
      ],
      housingTypes: 'High-rise condo, mid-rise multifamily, resort-adjacent product, limited older walk-ups',
      challenges: [
        'Elevator reservations, dock slots, and building COIs',
        'Tourism, event, and convention curb shrinkage',
        'I-15 / Las Vegas Blvd freeflow at peak',
      ],
      moverTips:
        'Book elevators and COIs in writing before the crew day. Prefer mid-week early freight windows away from major events. Photo dock height, curb staging, and truck approach limits.',
      cityKeywords: [
        'las vegas',
        'paradise',
        'strip',
        'university',
        'convention center',
      ],
    },
    {
      id: 'central-mid-valley',
      name: 'Central Las Vegas, mid-Valley & older grid stock',
      shortName: 'Central / mid-Valley',
      neighborhoods: [
        'Downtown Las Vegas edges',
        'Central Las Vegas corridors',
        'Chinatown / Spring Mountain edges',
        'East Las Vegas pockets',
        'Older mid-Valley SFH belts',
        'Industrial-adjacent residential edges',
      ],
      housingTypes: 'Older SFH, multi-unit, walk-up apartments, mixed commercial-adjacent stock',
      challenges: [
        'Tight residential curb and long carries',
        'Mixed stair and alley access',
        'US-95 / local arterial freeflow',
      ],
      moverTips:
        'Survey stair counts and curb options with photos. Clarify city vs unincorporated address lines. Prefer early starts before heat and arterial peaks.',
      cityKeywords: [
        'las vegas',
        'downtown las vegas',
        'spring mountain',
        'chinatown',
      ],
    },
    {
      id: 'henderson',
      name: 'Henderson, Green Valley, Anthem & southeast Valley growth',
      shortName: 'Henderson',
      neighborhoods: [
        'Henderson',
        'Green Valley',
        'Anthem edges',
        'Seven Hills edges',
        'MacDonald Ranch edges',
        'Lake Las Vegas edges',
      ],
      housingTypes: 'HOA SFH, master-planned communities, townhomes, gated pockets, some multi-family',
      challenges: [
        'HOA gate lists, truck-length limits, and timed windows',
        'I-215 / US-95 / I-15 freeflow to Strip and northwest pairs',
        'Longer empty miles vs central staging',
      ],
      moverTips:
        'Collect HOA packets and gate codes early. Confirm truck length and move-hour rules. Price I-215 / US-95 honestly for westbound or Strip-corridor unload pairs.',
      cityKeywords: [
        'henderson',
        'green valley',
        'anthem',
        'seven hills',
        'lake las vegas',
      ],
    },
    {
      id: 'summerlin-west',
      name: 'Summerlin, west Valley & master-plan HOA belts',
      shortName: 'Summerlin / west',
      neighborhoods: [
        'Summerlin',
        'Summerlin South edges',
        'The Lakes edges',
        'West Sahara corridors',
        'Red Rock approaches',
        'Far-west planned villages',
      ],
      housingTypes: 'Master-planned HOA SFH, townhomes, gated enclaves, limited multi-family',
      challenges: [
        'Dense HOA COI and gate administration',
        'Long driveway carries and cul-de-sac truck limits',
        'I-215 / US-95 / Desert Inn freeflow',
      ],
      moverTips:
        'Treat Summerlin jobs as HOA-first product. Get management packets before locking Saturday crews. Prefer early summer starts on open streets and photo driveway grades near foothill edges.',
      cityKeywords: [
        'summerlin',
        'las vegas',
        'red rock',
        'west las vegas',
      ],
    },
    {
      id: 'north-las-vegas',
      name: 'North Las Vegas, Aliante & northern growth belts',
      shortName: 'North Las Vegas',
      neighborhoods: [
        'North Las Vegas',
        'Aliante edges',
        'Eldorado edges',
        'Craig Road corridors',
        'Northern master-plan pockets',
        'I-15 north industrial-residential edges',
      ],
      housingTypes: 'Newer SFH tracts, HOA villages, multi-family, mixed older ranch stock',
      challenges: [
        'I-15 / US-95 / I-215 portal time to Henderson and Strip pairs',
        'HOA rules in newer villages',
        'Construction traffic in expanding tracts',
      ],
      moverTips:
        'Never price NLV ↔ Henderson as a short hop without traffic buffer. Collect HOA packets early. Prefer heat-safe early starts on open new-construction streets.',
      cityKeywords: [
        'north las vegas',
        'aliante',
        'eldorado',
        'nlv',
      ],
    },
    {
      id: 'nw-sw-desert-edges',
      name: 'Northwest Centennial, southwest & desert-edge product',
      shortName: 'NW / SW desert',
      neighborhoods: [
        'Centennial Hills edges',
        'Skye Canyon edges',
        'Mountain’s Edge edges',
        'Southern Highlands edges',
        'Enterprise edges',
        'Far-southwest desert tracts',
      ],
      housingTypes: 'Large newer SFH tracts, HOA master plans, desert-lot custom homes',
      challenges: [
        'Extreme portal time to Strip and southeast Valley',
        'Open heat exposure on new streets and long carries',
        'HOA and private-road access rules',
      ],
      moverTips:
        'Build I-215 / arterial buffer at rush. Plan heat-safe early starts and confirm driveway photos for desert-lot product. Collect HOA packets before peak-season Saturdays.',
      cityKeywords: [
        'centennial hills',
        'southern highlands',
        'enterprise',
        'mountain edge',
        'las vegas',
      ],
    },
  ],
  costDrivers: {
    title: 'What drives Clark County moving costs',
    intro:
      'Access product, HOA/elevator admin, heat pacing, and I-15 / I-215 freeflow move the number more than packing skill alone — this is Las Vegas Valley logistics, not Reno grid pricing.',
    drivers: [
      {
        title: 'Elevator reservations, docks & building COIs',
        detail:
          'Strip-adjacent and resort multi-unit add labor and schedule risk before packing skill matters.',
      },
      {
        title: 'HOA gates, truck limits & master-plan windows',
        detail:
          'Henderson, Summerlin, and planned villages rewrite jobs that look suburban-simple on a map.',
      },
      {
        title: 'I-15 · I-215 · US-95 · US-93 congestion',
        detail:
          'Cross-Valley pairs burn portal-to-portal hours even when map miles look short.',
      },
      {
        title: 'Extreme desert heat pacing',
        detail:
          'Summer open carries slow crews, force early starts, and raise soft costs for shade, water, and flexible windows.',
      },
      {
        title: 'Empty miles & multi-zone / interstate pairs',
        detail:
          'NLV, far-west, and Henderson pairs raise staging distance; CA/AZ/UT legs add FMCSA authority complexity.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (simple access)',
        value: '$550–$2,100+',
        note: 'Higher with elevators, HOA gates, or peak heat windows',
      },
      {
        label: '2–3BR condo, townhome, or mid-size SFH',
        value: '$1,600–$5,000+',
        note: 'Stairs, COI, HOA, and freeflow soft costs trend up',
      },
      {
        label: '3–4+ BR / high-rise / cross-Valley',
        value: '$3,200–$10,500+',
        note: 'Tower moves and long I-15 / I-215 pairs price highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$130–$230+/hr',
        note: 'Portal-to-portal; packing, COI admin, heat pacing, and stairs scale up',
      },
    ],
  },
  seasonal: {
    title: 'When to schedule a Clark County move',
    intro:
      'Lease cycles, school calendars, extreme summer heat, convention/event spikes, and mild winter snowbird turnover reshape access and crew availability across the Valley.',
    items: [
      {
        title: 'Best windows: mid-week early mornings',
        detail:
          'Tuesday–Thursday starts clear curb, ease freight windows, and reduce I-15 / I-215 pain. In summer, start as early as buildings allow — noon open carries are a labor risk.',
      },
      {
        title: 'Peak season: late May–mid-September family + heat stack',
        detail:
          'Apartment turnover and family school calendars collide with extreme heat. Book 2–4 weeks ahead for peak weekends, elevator slots, and HOA windows.',
      },
      {
        title: 'Convention, event & tourism freeflow',
        detail:
          'Major Strip and downtown events shrink curb and slow approaches. Avoid unbuffered load windows on known event days when flexible.',
      },
      {
        title: 'Fall–spring milder weather & snowbird turnover',
        detail:
          'October–April eases heat stress but still competes with seasonal residents, second-home turnover, and year-round tourism. Prefer flexible dates around holidays.',
      },
    ],
  },
  specialized: [
    {
      id: 'clark-valley-heat-hoa',
      title: 'Clark County heat, HOA & Strip-adjacent logistics module',
      intro:
        'Clark County estimates fail more often on elevator packets, HOA gates, heat pacing, and freeway freeflow than on packing skill alone.',
      bullets: [
        'Collect building COI, elevator reservations, and dock rules before the survey is final.',
        'Collect HOA packets and gate codes early for Henderson, Summerlin, and master-plan product.',
        'Price portal-to-portal time for any pair that rides I-15, I-215, US-95, or US-93 at peak.',
        'Plan heat-safe early starts May–September; photo open-carry exposure on new streets and desert lots.',
        'Clarify Las Vegas, Henderson, North Las Vegas, and unincorporated address lines on every estimate.',
        'For in-state jobs verify NTA household goods CPCN; verify FMCSA for any out-of-state leg — especially CA, AZ, and UT pairs.',
      ],
    },
    {
      id: 'not-washoe-not-nye',
      title: 'Not Washoe · not Nye / Pahrump module',
      intro:
        'A single “Nevada rate” collapses when Las Vegas Valley product is confused with Reno/Sparks industrial-residential grids or long-approach Pahrump desert exurban logistics.',
      bullets: [
        'Do not price Strip elevators like Reno downtown lofts or like Pahrump ranch driveways.',
        'Keep Clark vs Nye county lines clear on every multi-address estimate — Pahrump is not Valley product.',
        'Match tourism/event peaks separately from suburban school-calendar waves.',
        'Treat interstate legs as FMCSA authority problems — NTA CPCN alone is not enough for CA/AZ/UT delivery.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Clark County?',
    intro:
      'Use this as a practical fit checklist — schools, healthcare, housing character, and commute realism — then verify on district and hospital sites. No single ranking captures neighborhood fit.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & education landscape',
        bullets: [
          {
            title: 'How districts work here',
            detail:
              'Clark County School District is one of the largest in the U.S., with address-based assignment across Las Vegas, Henderson, North Las Vegas, and unincorporated Valley communities. Marketing neighborhood names do not guarantee a campus.',
          },
          {
            title: 'Choice, magnets & enrollment pressure',
            detail:
              'Popular magnets, charters, and boundary edges can be competitive. Confirm enrollment windows early when relocating mid-year.',
          },
          {
            title: 'Research sources',
            detail:
              'CCSD boundary tools, Nevada Department of Education data, and campus visits beat ranking screenshots alone.',
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
              'University Medical Center, Sunrise, Dignity Health–St. Rose (Henderson), MountainView, Summerlin Hospital, North Vista, and other campuses anchor care across the Valley. Confirm insurance networks for your household.',
          },
          {
            title: 'What relocators should do',
            detail:
              'Map peak-hour drive times to preferred campuses — I-15 and I-215 freeflow change “nearby” on paper. Transfer records early.',
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
              'Expect Strip-adjacent and resort vertical product; central multi-unit and older SFH; Henderson and Summerlin HOA growth; NLV and far-west tract expansion; desert-lot edges.',
          },
          {
            title: 'Cost variation inside the county',
            detail:
              'Purchase prices and rents vary sharply by city and product. Budget for HOA/condo dues, cooling costs, and parking where relevant.',
          },
          {
            title: 'Building and HOA governance',
            detail:
              'Associations and multi-unit management often control move hours, truck size, elevators, and deposits. Read documents carefully before locking a crew day.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Which areas fit whom',
        bullets: [
          {
            title: 'Strip-adjacent / urban multi-unit lifestyle',
            detail:
              'Suits people prioritizing entertainment-district access and vertical amenities — with elevator, parking, and event-day tradeoffs on move day.',
          },
          {
            title: 'Henderson growth living',
            detail:
              'Often appeals for master-plan amenities and schools — with HOA rules and longer empty miles to northwest pairs.',
          },
          {
            title: 'Summerlin / west planned communities',
            detail:
              'Attracts households seeking gated/master-plan product — with dense association rules and I-215 freeflow.',
          },
          {
            title: 'North Las Vegas / far-west value & space',
            detail:
              'Fits buyers chasing newer tract product and relative space — with portal-time realism to Henderson and Strip corridors.',
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
              'Hospitality and entertainment, conventions, healthcare systems, logistics/distribution, construction, professional services, and public sector concentrate demand across the Valley.',
          },
          {
            title: 'Commute realism',
            detail:
              'Peak freeway freeflow is real — especially I-15, I-215, and US-95. Test peak routes before choosing solely on rent or purchase price.',
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
              'Clark County stacks tourism-core density, master-plan suburbs, and desert-edge growth — different from Reno/Sparks industrial-residential patterns and from Pahrump long-approach exurban living.',
          },
          {
            title: 'Climate',
            detail:
              'Hot desert climate with extreme summer heat, mild winters, and intense sun. Plan outdoor staging, heat contingency, and cooling as part of move-in — not as optional notes.',
          },
          {
            title: 'Culture and pace',
            detail:
              'Visit at peak and off-peak times when deciding — tourism calendars, school waves, and summer heat reshape daily rhythm differently by zone.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Clark County resources',
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify NTA household goods CPCN status for in-state moves and FMCSA for interstate legs before deposits.',
    items: [
      {
        label: 'Clark County, Nevada — official site',
        href: 'https://www.clarkcountynv.gov/',
        external: true,
        note: 'County services & property context',
      },
      {
        label: 'City of Las Vegas',
        href: 'https://www.lasvegasnevada.gov/',
        external: true,
        note: 'Permits, services & city info',
      },
      {
        label: 'City of Henderson',
        href: 'https://www.cityofhenderson.com/',
        external: true,
        note: 'Southeast Valley municipality context',
      },
      {
        label: 'City of North Las Vegas',
        href: 'https://www.cityofnorthlasvegas.com/',
        external: true,
        note: 'Northern growth municipality context',
      },
      {
        label: 'NDOT — traveler information',
        href: 'https://nvroads.com/',
        external: true,
        note: 'I-15 / I-215 / US-95 before load windows',
      },
    ],
  },
  directoryHint:
    'Prefer crews with elevator/COI experience for Strip-adjacent and resort multi-unit; HOA gate fluency for Henderson–Summerlin product; heat-pacing discipline for summer open carries; honest I-15 · I-215 · US-95 · US-93 timing for cross-Valley pairs. Verify Nevada Transportation Authority (NTA) household goods CPCN for intrastate moves and FMCSA for interstate legs (including CA, AZ, and UT pairs) before deposits.',
  lastReviewed: '2026-07-24',
});

import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeNvPack,
  NV_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/nevada/nv-shared';

/**
 * Carson City, NV — consolidated city-county / state capital scale.
 * NOT Reno south clone, NOT Las Vegas Valley product, NOT Douglas Tahoe-only.
 */
export const carsonCityNvIntelligence: CountyIntelligencePack = finalizeNvPack({
  countySlug: 'carson-city',
  hubTitle: 'Carson City Moving Intelligence Hub',
  eyebrow:
    'Carson City, NV · capital-scale urban grid, state workforce & US-50 / US-395 logistics',
  h1: 'Moving in Carson City: Capital-Scale Access, State Workforce Cycles & US-50 / US-395 Logistics',
  heroOpener:
    'Carson City, Nevada is a consolidated city-county — not a Reno south suburb clone and not a Las Vegas Valley HOA template. It is the state capital’s smaller urban grid with downtown and midtown multi-unit pockets, state-employee lease waves, east and west residential belts, and US-50 / US-395 / I-580-link freeflow that connects Washoe growth to Douglas Tahoe approaches. A downtown walk-up, a west-side HOA cul-de-sac, an east industrial-adjacent ranch, and a foothill driveway do not share truck access or crew skill. Capital-scale density is real — and still smaller than Reno/Sparks industrial product. This hub is for people moving in Carson City, NV — not a renamed Washoe page.',
  heroCredibility:
    'NTA household goods CPCN for intrastate · FMCSA for interstate · Capital-scale access & corridor logistics awareness · Curated listings',
  majorCorridors: 'US-50 · US-395 · I-580 links · local grid',
  whatMakesDifferent: {
    title: 'What makes moving in Carson City different',
    intro:
      'These are capital consolidated city-county realities — smaller urban grid, state workforce cycles, and corridor links to Washoe and Douglas — not Reno industrial freeflow clones and not Strip-adjacent Valley heat product.',
    bullets: [
      {
        title: 'Consolidated city-county — one jurisdiction, capital identity',
        detail:
          'Carson City is both city and county. Address lines, permits, and services do not split like multi-city Valley or Reno/Sparks pairs. Still clarify street access, HOA rules, and foothill private-road product on every estimate.',
      },
      {
        title: 'Capital-scale density is not Reno south product',
        detail:
          'Downtown and midtown multi-unit, older SFH grids, and state-adjacent housing stack curb and stair constraints — but empty miles, industrial freeflow, and metro scale differ from Washoe’s Reno/Sparks machine. Do not paste Sparks warehouse assumptions onto capital streets.',
      },
      {
        title: 'State workforce and legislative calendar reshape demand',
        detail:
          'Agency hiring, session cycles, and capital-adjacent lease turnover create peaks that pure residential suburb calendars miss. Match crew availability to known capital turnover windows when flexible.',
      },
      {
        title: 'US-50, US-395 & I-580 links rewrite portal time',
        detail:
          'Carson City ↔ Reno, Carson City ↔ Minden–Gardnerville, or east-west local pairs look short and still burn billable minutes at peak — longer with weather. Price portal-to-portal honestly.',
      },
      {
        title: 'This is not Washoe County and not Douglas Tahoe-only',
        detail:
          'Ignore I-80 industrial-residential templates and do not treat East Fork / Tahoe approaches as interchangeable with capital grid product. Housing mix and corridors differ.',
      },
      {
        title: 'Cross-county Northern Nevada pairs are common',
        detail:
          'Households regularly move Carson City ↔ Washoe or Carson City ↔ Douglas. Stay in-state for NTA CPCN jobs; verify FMCSA when any leg leaves Nevada (including CA Tahoe or CA valley pairs).',
      },
      NV_REG_BULLET,
    ],
  },
  zonesHeading: 'Carson City access zones',
  zonesIntro:
    'Plan by downtown / capital core, west residential and HOA belts, east industrial-residential product, and foothill / south approaches — access rules cluster by product on a compact capital grid.',
  zones: [
    {
      id: 'downtown-capital-core',
      name: 'Downtown, capital complex edges & core multi-unit',
      shortName: 'Downtown / capital',
      neighborhoods: [
        'Downtown Carson City',
        'Capitol complex edges',
        'West King Street corridors',
        'Carson Street multi-unit',
        'Historic core pockets',
        'State office–adjacent residential',
      ],
      housingTypes: 'Walk-up multifamily, older SFH, limited mid-rise, mixed commercial-adjacent stock',
      challenges: [
        'Scarce curb and stair carries on older stock',
        'State event and session freeflow near the core',
        'US-395 / local arterial peaks',
      ],
      moverTips:
        'Survey stairs and curb options with photos. Prefer mid-week early starts away from major capital event days. Confirm building access rules where multi-unit management exists.',
      cityKeywords: [
        'carson city',
        'downtown carson city',
        'capitol',
      ],
    },
    {
      id: 'west-residential-hoa',
      name: 'West side residential, LOA / HOA pockets & hillside edges',
      shortName: 'West side',
      neighborhoods: [
        'West Carson City residential',
        'Lakeview edges',
        'Ash Canyon approaches',
        'West Washington corridors',
        'Hillside planned pockets',
        'Foothill driveway product',
      ],
      housingTypes: 'SFH, HOA pockets, hillside custom homes, limited townhomes',
      challenges: [
        'Driveway grade, turnaround, and truck-length limits',
        'HOA or private-road access rules in pockets',
        'Longer carries vs flat east grids',
      ],
      moverTips:
        'Photo driveway pitch and turnarounds. Collect HOA/private-road rules early. Prefer early starts when heat or winter ice is a factor on grades.',
      cityKeywords: [
        'carson city',
        'lakeview',
        'ash canyon',
        'west carson',
      ],
    },
    {
      id: 'east-industrial-residential',
      name: 'East side, industrial-adjacent & flatter grid product',
      shortName: 'East side',
      neighborhoods: [
        'East Carson City',
        'Industrial park edges',
        'Hot Springs Road corridors',
        'East Fifth Street edges',
        'Flatter ranch and tract stock',
        'US-50 east residential edges',
      ],
      housingTypes: 'Ranch SFH, multi-unit pockets, industrial-adjacent residential, newer tract stock',
      challenges: [
        'Freight and arterial freeflow mixed with residential curb',
        'US-50 / US-395 portal time for Reno pairs',
        'Mixed stair and long-carry product',
      ],
      moverTips:
        'Price arterial freeflow honestly. Photo curb staging. Clarify load/unload streets on the estimate for east-west local pairs.',
      cityKeywords: [
        'carson city',
        'hot springs',
        'east carson',
      ],
    },
    {
      id: 'south-north-approaches',
      name: 'South approaches, north links & corridor residential edges',
      shortName: 'N/S approaches',
      neighborhoods: [
        'South Carson City edges',
        'North Carson approaches',
        'US-395 corridor residential',
        'I-580 link approaches',
        'College Parkway edges',
        'Douglas County line approaches',
      ],
      housingTypes: 'SFH, multi-unit, mixed growth stock along corridor approaches',
      challenges: [
        'US-395 / I-580 freeflow to Reno and Douglas pairs',
        'County-line confusion near Douglas',
        'Longer empty miles for cross-county jobs',
      ],
      moverTips:
        'Never price Carson City ↔ Reno as a trivial hop without traffic buffer. Clarify Carson City vs Douglas destinations near the south line. Verify NTA CPCN for in-state pairs.',
      cityKeywords: [
        'carson city',
        'college parkway',
        'south carson',
      ],
    },
    {
      id: 'foothill-rural-edges',
      name: 'Foothill, rural-edge & larger-lot product',
      shortName: 'Foothill / rural edge',
      neighborhoods: [
        'Foothill larger-lot edges',
        'Rural residential pockets',
        'Western canyon approaches',
        'Eastern valley larger lots',
        'Semi-rural driveway product',
      ],
      housingTypes: 'Larger-lot SFH, custom homes, limited multi-unit, semi-rural stock',
      challenges: [
        'Long driveway carries and limited staging width',
        'Private-road and gate access in pockets',
        'Weather exposure on open approaches',
      ],
      moverTips:
        'Confirm driveway photos, turnarounds, and gate codes. Inventory carefully on larger homes. Build weather contingency for winter ice and summer heat.',
      cityKeywords: [
        'carson city',
        'foothill',
      ],
    },
  ],
  costDrivers: {
    title: 'What drives Carson City moving costs',
    intro:
      'Access product, stair/grade surveys, and US-50 / US-395 freeflow move the number more than packing skill alone — this is capital-scale logistics, not Reno industrial pricing or Las Vegas Valley heat templates.',
    drivers: [
      {
        title: 'Walk-up stairs, curb scarcity & older core stock',
        detail:
          'Downtown and capital-adjacent multi-unit add flight counts that open cul-de-sac jobs do not share.',
      },
      {
        title: 'Hillside grades & west-side driveway product',
        detail:
          'Foothill and canyon-edge homes add truck limits and long carries that flat east grids avoid.',
      },
      {
        title: 'US-50 · US-395 · I-580 link congestion',
        detail:
          'Cross-county pairs to Reno or Minden burn portal-to-portal hours even when map miles look short.',
      },
      {
        title: 'Capital / lease-cycle demand spikes',
        detail:
          'State workforce turnover and session-adjacent demand raise weekend premiums and crew scarcity.',
      },
      {
        title: 'Cross-county & interstate empty miles',
        detail:
          'Washoe, Douglas, and CA-bound destinations raise staging distance and authority complexity when leaving Nevada.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (simple access)',
        value: '$450–$1,700+',
        note: 'Higher with walk-ups, grades, or peak capital turnover',
      },
      {
        label: '2–3BR condo, duplex, or mid-size SFH',
        value: '$1,300–$4,000+',
        note: 'Stairs, grades, and freeflow soft costs trend up',
      },
      {
        label: '3–4+ BR / foothill / cross-county',
        value: '$2,600–$8,000+',
        note: 'Hillside access and Reno/Douglas pairs price highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$115–$200+/hr',
        note: 'Portal-to-portal; packing, grades, and stairs scale up',
      },
    ],
  },
  seasonal: {
    title: 'When to schedule a Carson City move',
    intro:
      'State workforce cycles, school calendars, summer heat, winter ice, and corridor freeflow reshape access and crew availability on the capital grid.',
    items: [
      {
        title: 'Best windows: mid-week early mornings',
        detail:
          'Tuesday–Thursday starts clear curb, ease US-395 freeflow, and reduce capital-core congestion. Avoid month-end Fridays when leases collide.',
      },
      {
        title: 'Peak season: late May–mid-September',
        detail:
          'Family school calendars and summer heat fill first. Book ahead for peak weekends and larger foothill homes.',
      },
      {
        title: 'Winter ice & valley weather',
        detail:
          'December–February adds icy stoops and driveway grades. Prefer flexible dates and contingency for melt and tarps on older stock.',
      },
      {
        title: 'Capital session & workforce turnover',
        detail:
          'Legislative session periods and agency hiring waves can tighten multi-unit inventory and crew calendars. Plan buffers when relocating with state employment.',
      },
    ],
  },
  specialized: [
    {
      id: 'carson-capital-access',
      title: 'Carson City capital grid & corridor logistics module',
      intro:
        'Carson City estimates fail more often on stair/grade surveys, capital-core curb, and US-50 / US-395 freeflow than on packing skill alone.',
      bullets: [
        'Photo stair counts, curb options, and driveway grades before the survey is final.',
        'Prefer mid-week early starts near the capital core and arterial peaks.',
        'Price portal-to-portal time for any pair that rides US-50, US-395, or I-580 links at peak.',
        'Clarify Carson City vs Douglas vs Washoe destinations on every multi-address estimate.',
        'Collect HOA/private-road rules early for west and foothill pockets.',
        'For in-state jobs verify NTA household goods CPCN; verify FMCSA for any out-of-state leg.',
      ],
    },
    {
      id: 'not-reno-south-clone',
      title: 'Not Reno south clone · not Clark Valley module',
      intro:
        'A single “Northern Nevada rate” collapses when capital-scale product is confused with Reno/Sparks industrial freeflow or Las Vegas Valley HOA heat logistics.',
      bullets: [
        'Do not price capital-core walk-ups like Sparks warehouse-adjacent ranches or like Strip elevators.',
        'Keep Carson City consolidated jurisdiction clear — it is not a multi-city Valley template.',
        'Match state workforce cycles separately from pure suburban school-calendar waves.',
        'Treat interstate legs as FMCSA authority problems — NTA CPCN alone is not enough for CA delivery.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Carson City?',
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
              'Carson City School District serves the consolidated city-county with address-based assignment. Marketing neighborhood names do not guarantee a campus.',
          },
          {
            title: 'Choice, boundaries & enrollment pressure',
            detail:
              'Popular programs and boundary edges can be competitive. Confirm enrollment windows early when relocating mid-year.',
          },
          {
            title: 'Research sources',
            detail:
              'District boundary tools, Nevada Department of Education data, and campus visits beat ranking screenshots alone.',
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
              'Carson Tahoe Health and related regional campuses anchor local care; many households also use Reno systems for specialty access. Confirm insurance networks for your household.',
          },
          {
            title: 'What relocators should do',
            detail:
              'Map peak-hour drive times to preferred campuses — US-395 freeflow to Reno changes “nearby” specialty care on paper. Transfer records early.',
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
              'Expect downtown multi-unit and older SFH; west hillside and HOA pockets; east industrial-adjacent and flatter tract stock; foothill larger lots.',
          },
          {
            title: 'Cost variation inside the city-county',
            detail:
              'Purchase prices and rents vary by elevation and product. Budget for HOA dues where applicable and four-season utility costs.',
          },
          {
            title: 'Building and HOA governance',
            detail:
              'Associations and multi-unit management often control move hours, truck size, and deposits. Read documents carefully before locking a crew day.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Which areas fit whom',
        bullets: [
          {
            title: 'Downtown / capital-core living',
            detail:
              'Suits people prioritizing walkability to state and civic amenities — with curb and stair tradeoffs on move day.',
          },
          {
            title: 'West side / hillside character',
            detail:
              'Often appeals for views and quieter residential product — with grades, driveway limits, and HOA pockets.',
          },
          {
            title: 'East side flatter grids',
            detail:
              'Attracts households seeking relative access simplicity — with arterial freeflow and mixed industrial-adjacent edges.',
          },
          {
            title: 'Corridor approaches toward Washoe or Douglas',
            detail:
              'Fits commuters trading capital living for Reno or Minden–Gardnerville job access — with portal-time realism.',
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
              'State government, healthcare, education, retail/services, light industrial, and tourism-adjacent work concentrate demand. Many households reverse-commute to Reno or Douglas.',
          },
          {
            title: 'Commute realism',
            detail:
              'Peak US-395 and US-50 freeflow is real for Reno and Minden pairs. Test peak routes before choosing solely on rent or purchase price.',
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
              'Carson City stacks capital civic identity, a compact urban grid, and foothill edges — different from Reno/Sparks industrial scale and from Las Vegas Valley sprawl.',
          },
          {
            title: 'Climate',
            detail:
              'High-desert four-season climate with hot summers, cold winters, and ice risk on grades. Plan outdoor staging, heat, and winter contingency as part of move-in.',
          },
          {
            title: 'Culture and pace',
            detail:
              'Visit at peak and off-peak times when deciding — capital calendars, school waves, and corridor traffic reshape daily rhythm.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Carson City resources',
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify NTA household goods CPCN status for in-state moves and FMCSA for interstate legs before deposits.',
    items: [
      {
        label: 'Carson City, Nevada — official site',
        href: 'https://www.carson.org/',
        external: true,
        note: 'Consolidated city-county services & property context',
      },
      {
        label: 'Carson City School District',
        href: 'https://www.carsoncityschools.com/',
        external: true,
        note: 'School assignment & enrollment context',
      },
      {
        label: 'NDOT — traveler information',
        href: 'https://nvroads.com/',
        external: true,
        note: 'US-50 / US-395 / I-580 before load windows',
      },
    ],
  },
  directoryHint:
    'Prefer crews with stair and curb fluency for capital-core multi-unit; driveway-grade discipline for west and foothill product; honest US-50 · US-395 · I-580 link timing for Reno and Douglas pairs. Verify Nevada Transportation Authority (NTA) household goods CPCN for intrastate moves and FMCSA for interstate legs before deposits.',
  lastReviewed: '2026-07-24',
});

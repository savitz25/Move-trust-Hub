import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeMnPack,
  MN_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/minnesota/mn-shared';

/**
 * Ramsey County, MN — St. Paul capital patterns, east-river identity (not Minneapolis/Hennepin, not Dakota south-metro, not Washington MN east collar alone).
 */
export const ramseyCountyMnIntelligence: CountyIntelligencePack = finalizeMnPack({
  countySlug: 'ramsey',
  hubTitle: 'Ramsey County Moving Intelligence Hub',
  eyebrow: 'Ramsey · St. Paul capital density, east-river stock & I-35E logistics',
  h1: 'Moving in Ramsey County: St. Paul Capital Access, East-River Neighborhoods & Metro Corridors',
  heroOpener:
    'Ramsey County is not a Minneapolis elevator clone and not a Woodbury HOA template — it is St. Paul capital-city density with older multi-unit stairs, river bluff approaches, state-government and university calendars, Maplewood–Roseville multi-family belts, and I-35E / I-94 / I-694 freeflow that rewrites short-map-mile estimates. A Cathedral Hill walk-up, a downtown St. Paul freight elevator, a Midway multi-unit, and a Shoreview HOA driveway do not share truck access or crew skill. Winter curb bans and capital-session timing are real inputs. This hub is for people moving in Ramsey County — not a renamed Hennepin page or generic Twin Cities script.',
  heroCredibility:
    'MnDOT household goods mover permit for intrastate moves · FMCSA for interstate · St. Paul capital & east-river logistics awareness · Curated listings',
  majorCorridors: 'I-35E · I-94 · I-694 · US-61 · Snelling corridors',
  whatMakesDifferent: {
    title: 'What makes moving in Ramsey County different',
    intro:
      'These are St. Paul and east-metro realities — capital multi-unit, river-bluff access, and I-35E freeflow — not Minneapolis lakeside product, Dakota south-metro HOAs, or Anoka north-growth alone.',
    bullets: [
      {
        title: 'St. Paul capital multi-unit and older walk-ups rewrite labor',
        detail:
          'Cathedral Hill, Summit-University, West Side, and large Midway tracts stack stairs, basements, and tight curb. Flat-rate optimism from suburban driveways underprices flight counts.',
      },
      {
        title: 'Downtown elevators and building COIs are a different product than neighborhood stairs',
        detail:
          'Downtown St. Paul and Lowertown towers need elevator reservations and COI naming. A Highland Park bungalow does not share that stack.',
      },
      {
        title: 'East-river identity is not Minneapolis west-bank logistics',
        detail:
          'Mississippi crossings, Snelling corridors, and I-35E approaches create freeflow patterns that Minneapolis-side quotes often misprice.',
      },
      {
        title: 'I-35E, I-94, I-694, and US-61 turn short pairs into billable hours',
        detail:
          'Downtown St. Paul ↔ Shoreview or Midway ↔ Maplewood pairs look local and still burn 25–60+ minutes at peak.',
      },
      {
        title: 'State government and university calendars cluster demand',
        detail:
          'Legislative session timing and campus-adjacent lease waves compress elevators and crews into mid-month and semester windows.',
      },
      {
        title: 'Winter ice and snow-emergency rules reshape capital-city staging',
        detail:
          'Street parking bans and icy stoops punish inflexible Saturday plans November–March.',
      },
      {
        title: 'Multi-county east-metro pairs are routine',
        detail:
          'Households regularly move Ramsey ↔ Hennepin, Washington (MN), Dakota, or Anoka. Clarify county lines so MnDOT vs FMCSA assumptions stay accurate when any leg leaves Minnesota.',
      },
      MN_REG_BULLET,
    ],
  },
  zonesHeading: 'Ramsey County access zones',
  zonesIntro:
    'Plan by downtown St. Paul vertical product, central capital neighborhoods, Midway multi-unit belts, northern Shoreview–Arden Hills suburbs, and eastern Maplewood–White Bear multi-family — product differs more than ZIP alone.',
  zones: [
    {
      id: 'downtown-stpaul-vertical',
      name: 'Downtown St. Paul, Lowertown & riverfront towers',
      shortName: 'Downtown St. Paul',
      neighborhoods: [
        'Downtown St. Paul',
        'Lowertown',
        'West Seventh edges',
        'Capitol approach edges',
        'Riverfront loft edges',
        'Union Depot edges',
      ],
      housingTypes: 'High-rise condo, loft conversions, mid-rise multifamily',
      challenges: [
        'Elevator reservations and building COIs',
        'Limited curb and event-day freeflow',
        'I-35E / I-94 approach congestion',
      ],
      moverTips:
        'Book elevators and COIs in writing. Prefer mid-week early freight windows. Confirm street staging near Capitol events.',
      cityKeywords: [
        'saint paul',
        'st paul',
        'downtown st paul',
        'lowertown',
      ],
    },
    {
      id: 'central-capital-neighborhoods',
      name: 'Cathedral Hill, Summit-University, Highland & central stock',
      shortName: 'Central St. Paul',
      neighborhoods: [
        'Cathedral Hill',
        'Summit Avenue corridors',
        'Summit-University',
        'Highland Park',
        'Macalester-Groveland',
        'Merriam Park edges',
      ],
      housingTypes: 'Older SFH, duplexes, walk-up multifamily, limited elevators',
      challenges: [
        'Multi-flight stairs and long carries',
        'Narrow residential staging',
        'Winter ice on stoops and driveways',
      ],
      moverTips:
        'Survey stair counts with photos. Confirm truck length on residential streets. Plan winter ice contingency.',
      cityKeywords: [
        'highland park',
        'cathedral hill',
        'macalester',
        'saint paul',
        'st paul',
      ],
    },
    {
      id: 'midway-west-side',
      name: 'Midway, Frogtown, West Side & dense multi-unit belts',
      shortName: 'Midway / West Side',
      neighborhoods: [
        'Midway',
        'Frogtown',
        'West Side',
        'Dayton\'s Bluff edges',
        'Payne-Phalen edges',
        'Thomas-Dale edges',
      ],
      housingTypes: 'Multi-unit apartments, duplexes, older SFH',
      challenges: [
        'Snelling and arterial congestion',
        'Tight curb and multi-flight stock',
        'Lease-end volume spikes',
      ],
      moverTips:
        'Prefer mid-week starts on Snelling-adjacent blocks. Photo curb options. Inventory basements carefully.',
      cityKeywords: [
        'midway',
        'frogtown',
        'west side',
        'saint paul',
        'st paul',
      ],
    },
    {
      id: 'north-ramsey-suburbs',
      name: 'Roseville, Shoreview, Arden Hills & north Ramsey suburbs',
      shortName: 'North Ramsey',
      neighborhoods: [
        'Roseville',
        'Shoreview',
        'Arden Hills',
        'New Brighton edges',
        'Mounds View edges',
        'North Oaks edges',
      ],
      housingTypes: 'Suburban SFH, townhomes, HOA multi-family',
      challenges: [
        'I-35W / I-694 / I-35E portal time',
        'HOA timed windows',
        'Longer empty miles vs capital core',
      ],
      moverTips:
        'Collect HOA packets before dispatch. Price I-694 honestly. Confirm cul-de-sac truck access.',
      cityKeywords: [
        'roseville',
        'shoreview',
        'arden hills',
        'new brighton',
        'mounds view',
      ],
    },
    {
      id: 'east-ramsey',
      name: 'Maplewood, White Bear Lake & eastern multi-family',
      shortName: 'East Ramsey',
      neighborhoods: [
        'Maplewood',
        'White Bear Lake',
        'North St. Paul',
        'Vadnais Heights',
        'Little Canada',
        'Gem Lake edges',
      ],
      housingTypes: 'Multi-family, townhomes, SFH, lake-adjacent stock',
      challenges: [
        'I-694 / US-61 freeflow',
        'Lake-adjacent staging in peak season',
        'Mixed HOA and older multi-unit product',
      ],
      moverTips:
        'Clarify Maplewood vs White Bear addresses. Price US-61 / I-694 pairs honestly. Survey lake-adjacent curb early.',
      cityKeywords: [
        'maplewood',
        'white bear lake',
        'north st paul',
        'vadnais heights',
        'little canada',
      ],
    },
  ],
  costDrivers: {
    title: 'What drives Ramsey County moving costs',
    intro:
      'Capital multi-unit access, river-crossing freeflow, HOA suburbs, and winter staging move the number more than packing skill alone.',
    drivers: [
      {
        title: 'Elevator / COI downtown product',
        detail:
          'Lowertown and downtown towers add schedule risk before packing skill matters.',
      },
      {
        title: 'Older walk-up stairs & bluff approaches',
        detail:
          'Cathedral Hill, West Side, and Midway stock add flight counts and tight curb.',
      },
      {
        title: 'I-35E · I-94 · I-694 congestion',
        detail:
          'Cross-zone and multi-county pairs burn portal-to-portal hours.',
      },
      {
        title: 'North and east suburban HOA empty miles',
        detail:
          'Shoreview and Maplewood product adds admin soft costs and longer staging distance.',
      },
      {
        title: 'Winter ice & snow-emergency rules',
        detail:
          'Capital-city parking bans and icy carries reshape outdoor labor November–March.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (simple access)',
        value: '$550–$1,900+',
        note: 'Higher with elevators or peak I-35E pairs',
      },
      {
        label: '2–3BR condo or walk-up',
        value: '$1,500–$4,500+',
        note: 'Stairs and COI soft costs trend up',
      },
      {
        label: '3–4+ BR / suburban executive',
        value: '$3,000–$9,000+',
        note: 'Long I-694 pairs and high-value stock price highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$120–$210+/hr',
        note: 'Portal-to-portal; packing and stairs scale up',
      },
    ],
  },
  seasonal: {
    title: 'When to schedule a Ramsey County move',
    intro:
      'Lease cycles, capital calendars, winter curb friction, and elevator windows reshape access and crew availability.',
    items: [
      {
        title: 'Best windows: mid-week early mornings',
        detail:
          'Tuesday–Thursday starts clear curb and ease I-35E / I-94 pain. Avoid month-end Fridays when leases and elevators collide.',
      },
      {
        title: 'Peak season: late May–mid-September',
        detail:
          'Apartment turnover fills first. Book 2–4 weeks ahead for peak weekends.',
      },
      {
        title: 'Winter: snow, ice, and curb shrinkage',
        detail:
          'December–March adds parking bans and weather cancellations. Prefer flexible dates.',
      },
      {
        title: 'Capital and campus mid-month spikes',
        detail:
          'Government and university calendars often land mid-month. Confirm hard dates early.',
      },
    ],
  },
  specialized: [
    {
      id: 'stpaul-capital-east-river',
      title: 'St. Paul capital & east-river logistics module',
      intro:
        'Ramsey estimates fail more often on stair surveys, elevator packets, river-crossing freeflow, and winter curb than on packing skill alone.',
      bullets: [
        'Collect building COI and elevator reservations for downtown / Lowertown before the survey is final.',
        'Photo stair counts and curb options for Cathedral Hill, Midway, and West Side stock.',
        'Price portal-to-portal time for I-35E, I-94, I-694, and US-61 pairs at peak.',
        'Plan winter ice contingency and snow-emergency parking rules into outdoor carries.',
        'Clarify St. Paul neighborhood vs Roseville / Maplewood / Shoreview addresses on every estimate.',
        'Verify MnDOT household goods mover permit for in-state-only jobs and FMCSA for interstate legs.',
      ],
    },
    {
      id: 'not-minneapolis-clone',
      title: 'East-river vs Minneapolis micro-market module',
      intro:
        'A single “Twin Cities rate” collapses when St. Paul capital product and Minneapolis lakeside product diverge.',
      bullets: [
        'Do not price Cathedral Hill walk-ups like North Loop lofts — access products differ.',
        'Ask which Mississippi-crossing and Snelling approaches the crew will actually use.',
        'Match state-government calendars separately from Fortune 500 west-metro calendars.',
        'Keep Ramsey vs Hennepin county lines clear on every multi-address estimate.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Ramsey County?',
    intro:
      'Use this as a practical fit checklist — schools, healthcare, housing character, and commute realism — then verify on district and hospital sites.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & education landscape',
        bullets: [
          {
            title: 'How districts work here',
            detail:
              'Saint Paul Public Schools covers most City of St. Paul addresses; suburban cities such as Roseville, White Bear Lake, and Mounds View operate separate systems. Assignment is address-based.',
          },
          {
            title: 'Choice, boundaries & enrollment pressure',
            detail:
              'Popular programs and boundary edges can be competitive. Confirm enrollment windows early when relocating mid-year.',
          },
          {
            title: 'Research sources',
            detail:
              'District boundary tools, Minnesota Department of Education data, and campus visits beat ranking screenshots alone.',
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
              'Regions Hospital, United Hospital (Allina), M Health Fairview St. John\'s, and other campuses anchor care across St. Paul and east metro. Confirm insurance networks.',
          },
          {
            title: 'What relocators should do',
            detail:
              'Map peak-hour drive times from Highland, Maplewood, or Shoreview to preferred campuses — I-35E and I-94 congestion change “nearby” on paper.',
          },
        ],
      },
      {
        id: 'housing',
        title: 'Housing character & cost pressures',
        bullets: [
          {
            title: 'Capital multi-unit, older SFH & suburban product',
            detail:
              'Expect downtown lofts and towers; walk-up multifamily and historic SFH in central neighborhoods; multi-family and SFH in Roseville–Maplewood–Shoreview belts.',
          },
          {
            title: 'Cost variation inside the county',
            detail:
              'Purchase prices and rents vary by neighborhood. Budget for condo dues, older-building repair risk, and parking.',
          },
          {
            title: 'Building and HOA governance',
            detail:
              'Condo and HOA rules often control move hours, truck size, and deposits. Read documents carefully.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Which Ramsey areas fit whom',
        bullets: [
          {
            title: 'Downtown / Lowertown urban lifestyle',
            detail:
              'Suits people prioritizing walkability and amenities — with elevator and event-day tradeoffs.',
          },
          {
            title: 'Central capital neighborhoods',
            detail:
              'Often appeals for historic stock and character — with stairs and winter staging constraints.',
          },
          {
            title: 'North Ramsey suburbs',
            detail:
              'Attracts households seeking schools and space — with HOA logistics and longer I-694 days.',
          },
          {
            title: 'East Ramsey multi-family and lake edges',
            detail:
              'Fits buyers chasing relative value or lake-adjacent living — with US-61 freeflow norms.',
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
              'State government, healthcare systems, education, 3M-adjacent professional corridors, and downtown professional services concentrate demand.',
          },
          {
            title: 'Commute realism',
            detail:
              'Many households mix driving and Metro Transit. I-35E, I-94, and I-694 peaks are real. Test peak routes before choosing solely on price.',
          },
        ],
      },
      {
        id: 'lifestyle',
        title: 'Lifestyle & practical livability',
        bullets: [
          {
            title: 'East-river capital identity',
            detail:
              'Ramsey stacks capital-city density, historic neighborhoods, and east-metro suburbs — different from Minneapolis lakeside or Dakota south-metro growth.',
          },
          {
            title: 'Climate',
            detail:
              'Continental four-season climate with long cold winters. Plan outdoor staging and ice contingency as part of move-in.',
          },
          {
            title: 'Culture and pace',
            detail:
              'Capital events, riverfront culture, and neighborhood schools set local rhythms. Visit at peak and off-peak times when deciding.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Ramsey County resources',
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify MnDOT household goods mover permit status for in-state moves and FMCSA for interstate legs before deposits.',
    items: [
      {
        label: 'City of Saint Paul — official site',
        href: 'https://www.stpaul.gov/',
        external: true,
        note: 'Permits, services & city info',
      },
      {
        label: 'Saint Paul Public Schools',
        href: 'https://www.spps.org/',
        external: true,
        note: 'Boundaries & calendars (St. Paul addresses)',
      },
      {
        label: 'Metro Transit',
        href: 'https://www.metrotransit.org/',
        external: true,
        note: 'Commute planning for core addresses',
      },
      {
        label: '511mn — traffic conditions',
        href: 'https://511mn.org/',
        external: true,
        note: 'I-35E / I-94 before load windows',
      },
    ],
  },
  directoryHint:
    'Prefer crews with elevator/COI experience for downtown St. Paul product; walk-up stair fluency for Cathedral Hill and Midway stock; HOA readiness for Shoreview–Roseville; honest I-35E · I-94 · I-694 · US-61 timing. Verify MnDOT household goods mover permit for in-state moves and FMCSA for interstate legs.',
  lastReviewed: '2026-07-24',
});

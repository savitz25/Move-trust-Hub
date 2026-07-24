import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeIlPack,
  IL_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/illinois/il-shared';

/**
 * Sangamon County, IL — Springfield capital-city market.
 * State government calendars, Clear Lake Ave corridors, I-55 / I-72 logistics.
 */
export const sangamonCountyIlIntelligence: CountyIntelligencePack = finalizeIlPack({
  countySlug: 'sangamon',
  hubTitle: 'Sangamon County Moving Intelligence Hub',
  eyebrow: 'Sangamon · Springfield capital · Chatham, Rochester, Sherman & I-55 / I-72',
  h1: 'Moving in Sangamon County: Springfield Capital Access, Government Calendars & I-55 / I-72 Logistics',
  heroOpener:
    'Sangamon County is central Illinois’s capital-city market — Springfield government and healthcare cores, Chatham and Rochester family suburbs, Sherman and Riverton north/east edges, and township stock that still sits under one county name. A downtown Springfield walk-up, a West Side ranch with HOA-adjacent rules, a Chatham growth tract, and a mid-session legislative or agency report date do not share truck access or crew skill. I-55, I-72, IL-4, and Clear Lake Avenue corridors rewrite “local” estimates that ignore portal-to-portal time, session-week demand, and winter ice on older grids. This hub is for people moving in Sangamon County — capital-city logistics, not Chicago, not Metro East, and not a university-town template.',
  heroCredibility:
    'Illinois Commerce Commission (ICC) Household Goods authority for intrastate moves · FMCSA for interstate · Curated listings',
  majorCorridors: 'I-55 · I-72 · IL-4 · Clear Lake Ave corridors',
  whatMakesDifferent: {
    title: 'What makes moving in Sangamon County different',
    intro:
      'These are Springfield capital-city realities — state government calendars, Clear Lake and medical corridors, and I-55/I-72 portal time — not Chicago collar sprawl or Champaign university cycles alone.',
    bullets: [
      {
        title: 'State government and agency calendars reshape mid-week demand',
        detail:
          'Legislative session weeks, agency start dates, and contractor onboarding create hard mid-month windows that compete with Saturday family demand for crews.',
      },
      {
        title: 'Springfield core product mixes walk-ups, medical-corridor multifamily, and older SFH',
        detail:
          'Downtown and near-campus/hospital stock often means stairs, limited curb, and long carries. Same-ZIP West Side ranches still need driveway photos — not elevator-only checklists.',
      },
      {
        title: 'I-55 and I-72 turn short map miles into billable hours',
        detail:
          'Springfield ↔ Chatham, Sherman ↔ Rochester, or West Side ↔ Clear Lake pairs look local and still burn portal time at peak, construction, and weather events. Price honestly.',
      },
      {
        title: 'Chatham and south/west growth product is its own logistics stack',
        detail:
          'Newer SFH tracts, some HOA rules, and longer empty miles from core staging yards rewrite jobs that look “suburban simple” on paper.',
      },
      {
        title: 'Clear Lake Avenue and medical corridors constrain daytime staging',
        detail:
          'Healthcare, retail, and employment peaks shrink legal curb and raise wait risk. Prefer early starts and written staging plans near medical campuses.',
      },
      {
        title: 'North and east edges ride I-55 interchanges differently than IL-4 west',
        detail:
          'Sherman, Riverton, and Rochester pairs face interchange freight; Auburn and west IL-4 corridors face different arterial peaks. Zone the quote, not the county average.',
      },
      {
        title: 'Cross-county central Illinois pairs are routine',
        detail:
          'Households regularly move Sangamon ↔ Menard, Christian, Logan, or longer I-55 destinations. Clarify county lines so ICC vs FMCSA assumptions stay accurate when any leg leaves Illinois.',
      },
      IL_REG_BULLET,
    ],
  },
  zonesHeading: 'Sangamon County access zones',
  zonesIntro:
    'Plan by Springfield core and medical corridors, West Side family stock, Chatham south growth, Sherman–Riverton I-55 north/east, Rochester east suburbs, and Auburn–west IL-4 edges — access rules cluster by zone more than ZIP alone.',
  zones: [
    {
      id: 'springfield-core-medical',
      name: 'Springfield core, downtown & medical corridors',
      shortName: 'Springfield core',
      neighborhoods: [
        'Downtown Springfield',
        'Near medical campuses',
        'Enos Park edges',
        'Near east side pockets',
        'Capitol complex residential edges',
      ],
      housingTypes: 'Older SFH, walk-up multifamily, limited mid-rise, medical-corridor apartments',
      challenges: [
        'Stairs, limited legal curb, and long carries',
        'Clear Lake Ave and downtown daytime congestion',
        'Session-week and hospital shift curb pressure',
      ],
      moverTips:
        'Photo curb and stair counts before the final estimate. Prefer mid-week early starts. Confirm loading zones near medical campuses in writing.',
      cityKeywords: [
        'springfield',
        'downtown springfield',
        'enos park',
        'medical district',
        'capitol',
      ],
    },
    {
      id: 'west-side-springfield',
      name: 'West Side Springfield & family ranch corridors',
      shortName: 'West Side',
      neighborhoods: [
        'West Side Springfield',
        'Koke Mill corridor edges',
        'Veterans Parkway residential',
        'Southwest family pockets',
        'Jerome / Southern View edges',
      ],
      housingTypes: 'Ranch and split-level SFH, townhomes, garden multifamily',
      challenges: [
        'I-72 / Veterans Parkway peak congestion',
        'Basement carries and driveway grade variation',
        'High Saturday family demand May–August',
      ],
      moverTips:
        'Survey basements and driveway pitch. Build arterial buffer for any core or Chatham-linked pair. Book peak Saturdays early.',
      cityKeywords: [
        'west springfield',
        'west side',
        'koke mill',
        'veterans parkway',
        'jerome',
        'southern view',
      ],
    },
    {
      id: 'chatham-south',
      name: 'Chatham, south growth & IL-4 approaches',
      shortName: 'Chatham / South',
      neighborhoods: [
        'Chatham',
        'South Springfield growth edges',
        'IL-4 residential corridors',
        'Curran edges',
        'Newer family tracts',
      ],
      housingTypes: 'Newer SFH, some HOA tracts, limited multifamily',
      challenges: [
        'HOA or subdivision truck limits on newer streets',
        'I-55 / IL-4 peak approaches',
        'Longer empty miles from core staging for some crews',
      ],
      moverTips:
        'Collect subdivision rules early. Share driveway photos. Price I-55 / IL-4 portal time for Springfield-core pairs.',
      cityKeywords: ['chatham', 'curran', 'south springfield', 'il-4'],
    },
    {
      id: 'sherman-riverton-i55',
      name: 'Sherman, Riverton & I-55 north/east edges',
      shortName: 'Sherman / Riverton',
      neighborhoods: [
        'Sherman',
        'Riverton',
        'I-55 north residential',
        'Williamsville edges',
        'Spaulding edges',
      ],
      housingTypes: 'Suburban SFH, small-town cores, limited multifamily',
      challenges: [
        'I-55 interchange freight and construction pulses',
        'Cross-zone pairs into Springfield core at peak',
        'Weather-sensitive rural-adjacent approaches',
      ],
      moverTips:
        'Build I-55 buffer for morning and evening peaks. Clarify Sangamon addresses vs adjacent counties. Prefer early starts in winter.',
      cityKeywords: [
        'sherman',
        'riverton',
        'williamsville',
        'spaulding',
        'i-55',
      ],
    },
    {
      id: 'rochester-east',
      name: 'Rochester, east suburbs & Clear Lake east',
      shortName: 'Rochester / East',
      neighborhoods: [
        'Rochester',
        'Clear Lake east residential',
        'Mechanicsburg edges',
        'East county family pockets',
        'Lake Springfield east edges',
      ],
      housingTypes: 'Family SFH, small-town stock, limited multifamily, lake-adjacent edges',
      challenges: [
        'Clear Lake Ave corridor peaks toward medical/employment cores',
        'High Saturday family demand in peak season',
        'Longer empty miles from west-side yards on some jobs',
      ],
      moverTips:
        'Price Clear Lake and I-55 link portal time. Survey basements and curb width. Book peak weekends early.',
      cityKeywords: [
        'rochester',
        'clear lake',
        'mechanicsburg',
        'east springfield',
        'lake springfield',
      ],
    },
    {
      id: 'auburn-west-rural',
      name: 'Auburn, west IL-4 & rural township pockets',
      shortName: 'Auburn / West rural',
      neighborhoods: [
        'Auburn',
        'Thayer edges',
        'Divernon edges',
        'West township roads',
        'Rural Sangamon pockets',
      ],
      housingTypes: 'Small-town SFH, rural-lot edges, limited multifamily',
      challenges: [
        'Soft shoulders and limited truck staging',
        'Longer empty miles and weather-sensitive gravel approaches',
        'Sparse turnarounds on private lanes',
      ],
      moverTips:
        'Pre-walk lane width and turnarounds. Confirm weather contingency for spring thaw. Price empty miles honestly from Springfield yards.',
      cityKeywords: ['auburn', 'thayer', 'divernon', 'west sangamon', 'rural springfield'],
    },
  ],
  costDrivers: {
    title: 'What drives Sangamon County moving costs',
    intro:
      'Ranges are market context for local / short regional moves — not quotes. Stair access, government hard dates, and I-55/I-72 portal time separate cheap estimates from real bills.',
    drivers: [
      {
        title: 'Walk-up stairs, basements & limited curb',
        detail:
          'Springfield core and older belts add labor before packing skill matters. Photo access early.',
      },
      {
        title: 'I-55 / I-72 / Clear Lake / IL-4 congestion',
        detail:
          'Cross-zone pairs burn portal-to-portal hours even when map miles look short — worse in session weeks and weather events.',
      },
      {
        title: 'Chatham growth and subdivision rules',
        detail:
          'Truck limits and longer empty miles push time and equipment constraints into the quote.',
      },
      {
        title: 'Government and healthcare hard dates',
        detail:
          'Agency starts, session-adjacent relocates, and medical employment create mid-week competition for crews.',
      },
      {
        title: 'Multi-county central Illinois empty miles',
        detail:
          'Adjacent-county and longer I-55 destinations raise staging distance and, for out-of-state legs, authority complexity.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (simple access)',
        value: '$400–$1,300+',
        note: 'Higher with walk-ups or peak arterial pairs',
      },
      {
        label: '2–3BR condo or modest SFH',
        value: '$1,100–$3,400+',
        note: 'Basement and subdivision soft costs trend up',
      },
      {
        label: '3–4+ BR / growth tract / cross-zone',
        value: '$2,200–$6,800+',
        note: 'Chatham estates and long I-55 pairs price highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$100–$170+/hr',
        note: 'Portal-to-portal; packing and access admin scale up',
      },
    ],
  },
  seasonal: {
    title: 'When to schedule a Sangamon County move',
    intro:
      'School calendars, legislative session pulses, humidity, and winter ice reshape access and crew availability across the Springfield capital region.',
    items: [
      {
        title: 'Best windows: mid-week early mornings',
        detail:
          'Tuesday–Thursday starts clear curb and reduce Clear Lake / I-72 pain. Avoid month-end Fridays when leases and agency dates collide.',
      },
      {
        title: 'Peak family season: late May–mid-August',
        detail:
          'West Side–Chatham–Rochester Saturday demand fills first. Book 2–4 weeks ahead for peak weekends.',
      },
      {
        title: 'Session weeks and agency onboarding clusters',
        detail:
          'Legislative and contractor calendars create mid-week spikes. Confirm report dates, storage-in-transit, and temporary housing early.',
      },
      {
        title: 'Winter ice, snow, and summer storms',
        detail:
          'I-55 / I-72 incidents and unplowed curb can erase truck access; summer storms slow exterior carries. Prefer flexible morning windows.',
      },
    ],
  },
  specialized: [
    {
      id: 'springfield-capital-access',
      title: 'Springfield capital access & corridor logistics module',
      intro:
        'Sangamon estimates fail more often on curb/stair access, Clear Lake and interstate portal time, and hard government dates than on packing skill alone.',
      bullets: [
        'Photo curb, stair counts, and driveway grade for Springfield core and West Side stock.',
        'Collect subdivision rules and truck limits for Chatham growth product.',
        'Price portal-to-portal time for any pair that rides I-55, I-72, IL-4, or Clear Lake corridors at peak.',
        'Build weather buffers for ice, snow, and summer storms on older grids and rural approaches.',
        'Clarify Sangamon vs adjacent-county addresses on every estimate.',
        'Verify Illinois Commerce Commission (ICC) Household Goods authorization for in-state-only jobs and FMCSA for interstate legs.',
      ],
    },
    {
      id: 'government-healthcare-relocation',
      title: 'State government & healthcare relocation module',
      intro:
        'Many Sangamon households move on agency, contractor, or medical employment timelines that do not flex with Saturday-only crews.',
      bullets: [
        'Ask about hard report-to-duty or start dates at estimate time.',
        'Clarify storage-in-transit and partial-load needs for temporary housing during onboarding.',
        'Prefer mid-week early windows when capitol and medical campus curb is lighter post-commute.',
        'Match inventory complexity (home office, specialty medical household items) to crew experience.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Sangamon County?',
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
              'Springfield Public Schools District 186 serves much of the city; Chatham, Rochester, Ball-Chatham patterns, and other unit districts serve suburbs and townships. Assignment is address-based — marketing names do not guarantee a campus.',
          },
          {
            title: 'Growth areas and capacity',
            detail:
              'Chatham and some west/south growth pockets can see enrollment pressure. Ask districts about capacity, boundaries, and busing when touring.',
          },
          {
            title: 'Research sources',
            detail:
              'District boundary tools, Illinois State Board of Education data, and campus visits beat ranking screenshots alone.',
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
              'Memorial Medical Center, HSHS St. John’s Hospital, and related Springfield campuses anchor regional care, with additional specialty options. Confirm networks for your household.',
          },
          {
            title: 'What relocators should do',
            detail:
              'Map peak-hour drive times from Chatham or Rochester to preferred campuses — Clear Lake and I-72 congestion change “nearby” on paper. Transfer records early.',
          },
        ],
      },
      {
        id: 'housing',
        title: 'Housing character & cost pressures',
        bullets: [
          {
            title: 'Capital core vs West Side vs Chatham growth',
            detail:
              'Expect older SFH and walk-up multifamily near downtown and medical corridors; family ranch stock on the West Side; newer tracts in Chatham; small-town product in Rochester, Sherman, and Auburn.',
          },
          {
            title: 'Cost variation inside the county',
            detail:
              'Purchase prices and rents vary by corridor. Budget for older-home repair risk in core stock and subdivision dues or assessments where applicable.',
          },
          {
            title: 'Multifamily and lease governance',
            detail:
              'Medical-corridor and downtown multifamily often control move hours, elevator or stair access, and deposits. Read documents carefully before lease signing.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Which Sangamon areas fit whom',
        bullets: [
          {
            title: 'Springfield core capital and medical lifestyle',
            detail:
              'Suits people prioritizing short drives to agencies and hospitals — with curb, stair, and daytime congestion tradeoffs on move day.',
          },
          {
            title: 'West Side family corridors',
            detail:
              'Often appeals for established SFH and school-oriented living — with I-72 timing and basement carries.',
          },
          {
            title: 'Chatham south growth',
            detail:
              'Attracts households seeking newer housing and IL-4 access — with longer core-bound peaks.',
          },
          {
            title: 'Rochester–Sherman small-suburb living',
            detail:
              'Fits buyers chasing quieter towns and I-55 adjacency — with interchange portal time into Springfield.',
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
              'State government and contractors, healthcare, education, logistics, insurance/professional services, and regional retail concentrate demand in Springfield and its suburbs.',
          },
          {
            title: 'Commute realism',
            detail:
              'Most households are car-dependent. I-55, I-72, IL-4, and Clear Lake peaks are real. Test drive peak routes before choosing solely on purchase price — this is a capital-city market, not a mega-metro transit system.',
          },
        ],
      },
      {
        id: 'lifestyle',
        title: 'Lifestyle & practical livability',
        bullets: [
          {
            title: 'One county, multiple Springfields',
            detail:
              'Sangamon stacks capital core, medical corridors, West Side family belts, Chatham growth, I-55 edge towns, and rural townships — different from Chicago, Metro East, and university-town markets.',
          },
          {
            title: 'Climate',
            detail:
              'Hot humid summers, severe-storm season, and cold winters with ice events. Plan outdoor staging and weather contingency as part of move-in.',
          },
          {
            title: 'Culture and pace',
            detail:
              'Dining and events concentrate around Springfield corridors and Lake Springfield edges; suburbs feel more family- and school-oriented. Visit at peak and off-peak — including a session-week weekday if government employment is part of your plan.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Sangamon County resources',
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify Illinois Commerce Commission (ICC) household goods authority for in-state moves and FMCSA for interstate legs.',
    items: [
      {
        label: 'Sangamon County — official site',
        href: 'https://www.sangamonil.gov/',
        external: true,
        note: 'County services & offices',
      },
      {
        label: 'City of Springfield',
        href: 'https://www.springfield.il.us/',
        external: true,
        note: 'Municipal services — capital city',
      },
      {
        label: 'Springfield Public Schools District 186',
        href: 'https://www.sps186.org/',
        external: true,
        note: 'Core urban district — confirm address assignment',
      },
      {
        label: 'IDOT travel / traffic conditions',
        href: 'https://www.gettingaroundillinois.com/',
        external: true,
        note: 'I-55 / I-72 before load windows',
      },
    ],
  },
  directoryHint:
    'Prefer crews with walk-up and medical-corridor experience for Springfield core; growth-tract fluency for Chatham; honest I-55 / I-72 / Clear Lake / IL-4 timing for cross-zone pairs; mid-week capacity for government and healthcare hard dates. Verify Illinois Commerce Commission (ICC) Household Goods authorization for in-state moves and FMCSA for interstate legs.',
  lastReviewed: '2026-07-24',
});

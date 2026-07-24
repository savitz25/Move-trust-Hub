/**
 * One-shot generator for Oregon Core 8 Tier-1 intelligence packs.
 * Run: npx tsx scripts/generate-or-tier1-packs.ts
 */
import { writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

type Zone = {
  id: string;
  name: string;
  shortName: string;
  neighborhoods: string[];
  housingTypes: string;
  challenges: string[];
  moverTips: string;
  cityKeywords: string[];
};

type PackSpec = {
  slug: string;
  exportName: string;
  countyName: string;
  hubTitle: string;
  eyebrow: string;
  h1: string;
  heroOpener: string;
  majorCorridors: string;
  whatIntro: string;
  bullets: { title: string; detail: string }[];
  zonesHeading: string;
  zonesIntro: string;
  zones: Zone[];
  costIntro: string;
  drivers: { title: string; detail: string }[];
  ranges: { label: string; value: string; note: string }[];
  seasonalIntro: string;
  seasonal: { title: string; detail: string }[];
  specialized: { id: string; title: string; intro: string; bullets: string[] };
  schools: { title: string; detail: string }[];
  hospitals: { title: string; detail: string }[];
  housing: { title: string; detail: string }[];
  townFit: { title: string; detail: string }[];
  jobs: { title: string; detail: string }[];
  lifestyle: { title: string; detail: string }[];
  resourceItems: { label: string; href: string }[];
  directoryHint: string;
};

const OR_REG = {
  title: 'Intrastate ODOT household goods certificate vs interstate FMCSA',
  detail:
    'Moves entirely within Oregon by for-hire household goods carriers generally require a certificate of authority from the Oregon Department of Transportation (ODOT), administered through the Commerce and Compliance Division under ORS 825. Match the legal name on the estimate to Oregon household goods authority before you deposit. Any out-of-state leg needs active FMCSA USDOT (and usually MC) authority — verify on FMCSA SAFER.',
};

const specs: PackSpec[] = [
  {
    slug: 'multnomah',
    exportName: 'multnomahCountyOrIntelligence',
    countyName: 'Multnomah',
    hubTitle: 'Multnomah County Moving Intelligence Hub',
    eyebrow: 'Multnomah · Portland neighborhoods, hills/stairs & I-5/I-84 bridges',
    h1: 'Moving in Multnomah County: Portland Neighborhoods, Hills & Bridge Logistics',
    heroOpener:
      'Multnomah County is Portland’s urban core: westside hills and stairs, eastside neighborhood grids, downtown elevators, bridge and I-5/I-84 congestion, and rain-window curb limits that are not Beaverton HOA product and not Bend high-desert logistics. A Pearl District condo, a SE Portland bungalow, a SW hillside stairs job, and a Gresham multi-family unit do not share truck access or empty-mile risk. This hub is for Multnomah — not a Washington County clone or renamed King County page.',
    majorCorridors: 'I-5 · I-84 · I-205 · US-26 · local arterial grid',
    whatIntro:
      'These are Portland/Multnomah realities — hills, bridges, neighborhood micro-markets, and rain staging — not west-metro tech collars or central Oregon desert product.',
    bullets: [
      {
        title: 'Westside hills and stairs rewrite labor hours',
        detail: 'SW and NW hillside addresses often need smaller trucks, long carries, and photo surveys.',
      },
      {
        title: 'Eastside neighborhood grids differ from downtown elevators',
        detail: 'SE/NE bungalows and multi-unit mix change curb length and parking rules block by block.',
      },
      {
        title: 'Bridges and I-5 / I-84 define portal-to-portal time',
        detail: 'Cross-river pairs look local on maps and regional at peak or during incidents.',
      },
      {
        title: 'Rain windows and limited curb staging dominate many jobs',
        detail: 'Protect floors and furniture; confirm legal truck length early.',
      },
      {
        title: 'Not Washington County HOA product and not Clackamas south-metro sprawl',
        detail: 'Survey each Multnomah address — eastside vs westside vs Gresham edges differ.',
      },
      OR_REG,
    ],
    zonesHeading: 'Multnomah access zones',
    zonesIntro:
      'Plan by downtown/Pearl, westside hills, eastside neighborhoods, and east county (Gresham/Troutdale) edges.',
    zones: [
      {
        id: 'downtown-pearl',
        name: 'Downtown, Pearl & inner NW',
        shortName: 'Downtown / Pearl',
        neighborhoods: ['Downtown Portland', 'Pearl District', 'Goose Hollow edges', 'Old Town edges'],
        housingTypes: 'High-rises, mid-rises, condos, loft stock',
        challenges: ['Elevators and COI', 'Scarce curb staging', 'Event-day congestion'],
        moverTips: 'Get building packets early. Prefer mid-week morning freight windows.',
        cityKeywords: ['portland', 'pearl', 'downtown'],
      },
      {
        id: 'westside-hills',
        name: 'Westside hills (SW / NW)',
        shortName: 'Westside hills',
        neighborhoods: ['Southwest hills', 'Council Crest edges', 'NW hills', 'Sylvan edges'],
        housingTypes: 'Hillside SFH, multi-level, limited multi-family',
        challenges: ['Steep driveways', 'Stairs and long carries', 'Limited truck turn radius'],
        moverTips: 'Photo grades and street width. Prefer smaller trucks when required.',
        cityKeywords: ['southwest hills', 'northwest portland', 'sylvan'],
      },
      {
        id: 'eastside',
        name: 'Inner eastside (SE / NE)',
        shortName: 'Eastside',
        neighborhoods: ['SE Division corridors', 'Alberta edges', 'Hawthorne edges', 'Sellwood edges', 'St. Johns edges'],
        housingTypes: 'Bungalows, multi-unit, ADUs, renovated SFH',
        challenges: ['Curb parking limits', 'Stairs and basements', 'I-84 / arterial congestion'],
        moverTips: 'Confirm permit and parking rules. Survey basement access carefully.',
        cityKeywords: ['southeast portland', 'northeast portland', 'sellwood', 'st johns'],
      },
      {
        id: 'east-county',
        name: 'East county (Gresham / Troutdale edges)',
        shortName: 'East county',
        neighborhoods: ['Gresham', 'Troutdale edges', 'Fairview edges', 'Rockwood edges'],
        housingTypes: 'SFH, multi-family, suburban stock',
        challenges: ['I-84 / I-205 timing', 'Longer portal time to core', 'HOA pockets'],
        moverTips: 'Price east-county pairs portal-to-portal. Collect HOA packets when applicable.',
        cityKeywords: ['gresham', 'troutdale', 'fairview'],
      },
    ],
    costIntro:
      'Hills/stairs, elevators, and bridge/I-5 portal time drive quotes more than square footage alone.',
    drivers: [
      { title: 'Hillside stairs & long carries', detail: 'Westside labor hours spike.' },
      { title: 'Downtown elevator & curb friction', detail: 'COI wait time dominates core jobs.' },
      { title: 'I-5 / I-84 / bridge congestion', detail: 'Portal-to-portal spikes at peak.' },
      { title: 'Rain staging & protection soft costs', detail: 'Wet-weather packing adds labor.' },
    ],
    ranges: [
      { label: 'Studio / 1BR (simple access)', value: '$550–$1,700+', note: 'Higher with elevators or hills' },
      { label: '2–3BR condo or modest SFH', value: '$1,600–$4,500+', note: 'Hills and curb friction trend up' },
      { label: '3–4+ BR / tower / cross-metro', value: '$3,000–$9,000+', note: 'Towers and long bridge pairs highest' },
      { label: 'Typical 2-person crew rate', value: '$120–$200+/hr', note: 'Portal-to-portal' },
    ],
    seasonalIntro:
      'Rainy winters, summer peak, wildfire-smoke days, and multi-family lease turns reshape Portland windows.',
    seasonal: [
      { title: 'Best windows: mid-week dry mornings', detail: 'Clear curb and reduce bridge congestion.' },
      { title: 'Peak family season: late May–mid-August', detail: 'Book eastside Saturdays early.' },
      { title: 'Month-end multi-family turns', detail: 'Downtown and eastside elevators fill first.' },
      { title: 'Wildfire-smoke and extreme heat days', detail: 'Confirm contingency for outdoor staging.' },
    ],
    specialized: {
      id: 'portland-multnomah-hills-bridges',
      title: 'Portland hills, elevators & bridge logistics module',
      intro:
        'Multnomah estimates fail when hillside access, building packets, or I-5/bridge empty miles are ignored.',
      bullets: [
        'Request downtown/Pearl building packets at lease signing or escrow.',
        'Photo hillside grades, stair width, and truck turn radius for SW/NW jobs.',
        'Price I-5/I-84/bridge pairs portal-to-portal — eastside vs westside differ.',
        'Clarify Multnomah vs Washington/Clackamas destinations on multi-county estimates.',
        'Verify ODOT household goods authority for in-state-only jobs and FMCSA for interstate legs.',
      ],
    },
    schools: [
      {
        title: 'How districts work here',
        detail:
          'Portland Public Schools and east-county districts (Gresham-Barlow and others) serve different addresses. Confirm zoning carefully.',
      },
      {
        title: 'Research sources',
        detail: 'District tools and Oregon Department of Education data beat ranking screenshots.',
      },
    ],
    hospitals: [
      {
        title: 'Major systems',
        detail:
          'OHSU, Legacy, Providence, and Kaiser sites serve Multnomah corridors. Confirm networks.',
      },
      {
        title: 'What relocators should do',
        detail: 'Map peak-hour drive times from east county into core specialty care. Transfer records early.',
      },
    ],
    housing: [
      {
        title: 'Core condo/multi-unit vs eastside bungalows vs east-county SFH',
        detail: 'Pearl product differs sharply from SE bungalows and Gresham multi-family.',
      },
      {
        title: 'Cost variation',
        detail: 'Inner neighborhoods often price differently from east-county growth stock.',
      },
    ],
    townFit: [
      { title: 'Downtown / Pearl lifestyle', detail: 'Walkable amenities with elevator and curb tradeoffs.' },
      { title: 'Eastside neighborhood pattern', detail: 'Bungalow density with arterial logistics.' },
      { title: 'East-county pattern', detail: 'Suburban product with longer portal time to core jobs.' },
    ],
    jobs: [
      {
        title: 'Employment anchors',
        detail:
          'Healthcare, tech/professional services, logistics, government, and creative industries shape employment.',
      },
      {
        title: 'Commute realism',
        detail: 'I-5, I-84, and bridge peaks are real. Test drive peak routes across the river.',
      },
    ],
    lifestyle: [
      {
        title: 'Portland core identity',
        detail:
          'Multnomah is Portland metro core — not west-metro Silicon Forest HOAs or Bend high-desert product as the default.',
      },
      {
        title: 'Climate',
        detail: 'Wet winters, mild-to-hot summers, and occasional wildfire smoke. Plan outdoor staging contingency.',
      },
    ],
    resourceItems: [
      { label: 'Multnomah County — official site', href: 'https://www.multco.us/' },
      { label: 'City of Portland', href: 'https://www.portland.gov/' },
      { label: 'TripCheck traffic (ODOT)', href: 'https://www.tripcheck.com/' },
    ],
    directoryHint:
      'Prefer hillside/elevator experience and honest bridge/I-5 pricing. Verify ODOT in-state and FMCSA interstate.',
  },
  {
    slug: 'washington',
    exportName: 'washingtonCountyOrIntelligence',
    countyName: 'Washington',
    hubTitle: 'Washington County Moving Intelligence Hub',
    eyebrow: 'Washington · Beaverton/Hillsboro Silicon Forest & US-26/OR-217',
    h1: 'Moving in Washington County: Beaverton–Hillsboro Tech Corridor, West-Metro HOAs & US-26 Logistics',
    heroOpener:
      'Washington County is Portland’s west-metro tech collar: Beaverton and Hillsboro campus housing, Tigard/Tualatin HOA growth, US-26 and OR-217 portal time, and Silicon Forest relo calendars that are not Multnomah hills/stairs and not Clackamas SE-metro product. A Hillsboro multi-family unit, a Beaverton HOA two-story, and a Forest Grove edge home do not share truck access or empty-mile risk. This hub is for Oregon’s Washington County — not Washington State King County and not urban Portland.',
    majorCorridors: 'I-5 · US-26 · OR-217 · OR-8 · TV Highway corridors',
    whatIntro:
      'These are west-metro / Silicon Forest realities — HOA growth, tech hard dates, and US-26 logistics — not Portland core elevators or eastside bungalows.',
    bullets: [
      {
        title: 'Silicon Forest corporate calendars create hard report dates',
        detail: 'Tech and supplier transfers compress windows more than pure city lease waves.',
      },
      {
        title: 'Beaverton / Hillsboro multi-family and HOA product dominate many jobs',
        detail: 'Gate lists and elevator packets rewrite labor hours.',
      },
      {
        title: 'US-26 / OR-217 / TV Highway define portal-to-portal time',
        detail: 'West-metro pairs look short on maps and regional at peak.',
      },
      {
        title: 'Not Multnomah hillside stairs as the default product',
        detail: 'West-metro grids differ from SW Portland hills and downtown elevators.',
      },
      {
        title: 'Do not confuse with Washington State markets',
        detail: 'This is Oregon’s Washington County (Beaverton/Hillsboro) — not King or Clark County WA as the page identity.',
      },
      OR_REG,
    ],
    zonesHeading: 'Washington County access zones',
    zonesIntro:
      'Plan by Beaverton core, Hillsboro tech corridors, Tigard/Tualatin south edges, and western township growth.',
    zones: [
      {
        id: 'beaverton',
        name: 'Beaverton core & multi-family belt',
        shortName: 'Beaverton',
        neighborhoods: ['Beaverton', 'Cedar Hills edges', 'Aloha edges', 'TV Highway corridors'],
        housingTypes: 'Multi-family, SFH, HOA pockets',
        challenges: ['OR-217 congestion', 'Elevator reservations', 'Lease-end waves'],
        moverTips: 'Book elevators early for month-end. Avoid peak OR-217 when flexible.',
        cityKeywords: ['beaverton', 'aloha', 'cedar hills'],
      },
      {
        id: 'hillsboro-tech',
        name: 'Hillsboro & Silicon Forest campuses',
        shortName: 'Hillsboro',
        neighborhoods: ['Hillsboro', 'Orenco edges', 'North Plains edges', 'US-26 west corridors'],
        housingTypes: 'Multi-family, HOA SFH, campus-adjacent housing',
        challenges: ['Corporate hard dates', 'US-26 congestion', 'HOA rules'],
        moverTips: 'Align crew days with report dates. Collect HOA and building packets early.',
        cityKeywords: ['hillsboro', 'orenco'],
      },
      {
        id: 'tigard-tualatin',
        name: 'Tigard, Tualatin & south-west metro edges',
        shortName: 'Tigard / Tualatin',
        neighborhoods: ['Tigard', 'Tualatin', 'King City edges', 'Durham edges'],
        housingTypes: 'HOA SFH, multi-family, townhomes',
        challenges: ['I-5 / OR-217 timing', 'HOA rules', 'Longer portal time to Hillsboro'],
        moverTips: 'Price south-west pairs portal-to-portal. Collect gate lists.',
        cityKeywords: ['tigard', 'tualatin'],
      },
      {
        id: 'west-growth',
        name: 'Forest Grove, Cornelius & western growth edges',
        shortName: 'West growth',
        neighborhoods: ['Forest Grove', 'Cornelius', 'North Plains edges', 'Banks edges'],
        housingTypes: 'SFH, multi-family, small-town stock',
        challenges: ['Longer empty miles', 'OR-8 timing', 'Rain access'],
        moverTips: 'Price western pairs honestly. Photo driveway and street width.',
        cityKeywords: ['forest grove', 'cornelius', 'north plains'],
      },
    ],
    costIntro:
      'HOA/elevator friction and US-26/OR-217 portal time drive quotes more than bedroom count alone.',
    drivers: [
      { title: 'HOA gate lists & elevator packets', detail: 'Soft costs push peak windows.' },
      { title: 'US-26 / OR-217 congestion', detail: 'Portal-to-portal spikes at peak.' },
      { title: 'Corporate hard-date premiums', detail: 'Short windows raise weekend demand.' },
      { title: 'Rain staging soft costs', detail: 'Wet-weather packing adds labor.' },
    ],
    ranges: [
      { label: 'Studio / 1BR (simple access)', value: '$520–$1,600+', note: 'Higher with elevators' },
      { label: '2–3BR condo or modest SFH', value: '$1,500–$4,200+', note: 'HOA friction trends up' },
      { label: '3–4+ BR / cross-metro', value: '$2,800–$8,500+', note: 'Long US-26 pairs highest' },
      { label: 'Typical 2-person crew rate', value: '$115–$195+/hr', note: 'Portal-to-portal' },
    ],
    seasonalIntro:
      'Tech calendars, school-year suburb demand, rainy winters, and summer peak reshape west-metro windows.',
    seasonal: [
      { title: 'Best windows: mid-week early mornings', detail: 'Clear curb and reduce US-26/OR-217 pain.' },
      { title: 'Peak family season: late May–mid-August', detail: 'Book HOA Saturdays early.' },
      { title: 'Corporate Q-end transfers', detail: 'Hard dates cluster around fiscal calendars.' },
      { title: 'Rainy winter staging', detail: 'Confirm floor protection and driveway contingency.' },
    ],
    specialized: {
      id: 'washington-or-silicon-forest-hoa',
      title: 'Silicon Forest west-metro & HOA module',
      intro:
        'Washington County (OR) estimates fail when HOA packets, tech hard dates, or US-26 empty miles are treated like Portland hills jobs.',
      bullets: [
        'Collect HOA and elevator packets before final quotes on Beaverton/Hillsboro stock.',
        'Price US-26/OR-217 pairs portal-to-portal.',
        'Separate corporate inventory scopes from standard suburban SFH.',
        'Clarify Oregon Washington County vs Multnomah/Clackamas destinations — and never assume Washington State logistics.',
        'Verify ODOT household goods authority for in-state-only jobs and FMCSA for interstate legs.',
      ],
    },
    schools: [
      {
        title: 'How districts work here',
        detail:
          'Beaverton, Hillsboro, Tigard-Tualatin, Forest Grove, and other districts serve different addresses. Confirm zoning carefully.',
      },
      {
        title: 'Research sources',
        detail: 'District tools and Oregon Department of Education data beat ranking screenshots.',
      },
    ],
    hospitals: [
      {
        title: 'Major systems',
        detail:
          'Providence St. Vincent, Kaiser west-metro sites, OHSU affiliates, and other systems serve west-metro corridors. Confirm networks.',
      },
      {
        title: 'What relocators should do',
        detail: 'Map peak-hour drive times from Hillsboro and Forest Grove into major campuses. Transfer records early.',
      },
    ],
    housing: [
      {
        title: 'Tech multi-family vs HOA SFH growth',
        detail: 'Orenco/Hillsboro product differs from Tigard/Tualatin two-stories.',
      },
      {
        title: 'Cost variation',
        detail: 'West-metro premium suburbs often price differently from far-west small-town stock.',
      },
    ],
    townFit: [
      { title: 'Hillsboro / tech-corridor lifestyle', detail: 'Campus adjacency with multi-family tradeoffs.' },
      { title: 'Beaverton pattern', detail: 'Mixed multi-unit and HOA product with OR-217 logistics.' },
      { title: 'Tigard / Tualatin pattern', detail: 'South-west HOA growth with I-5 timing.' },
    ],
    jobs: [
      {
        title: 'Employment anchors',
        detail:
          'Semiconductor and tech campuses, suppliers, healthcare, and professional services shape west-metro employment.',
      },
      {
        title: 'Commute realism',
        detail: 'US-26, OR-217, and TV Highway peaks are real. Test drive peak routes before choosing a submarket.',
      },
    ],
    lifestyle: [
      {
        title: 'West-metro identity',
        detail:
          'Oregon’s Washington County is Silicon Forest collar — not Multnomah hills and not Washington State Puget Sound defaults.',
      },
      {
        title: 'Climate',
        detail: 'Wet winters and mild-to-hot summers. Plan outdoor staging contingency.',
      },
    ],
    resourceItems: [
      { label: 'Washington County, OR — official site', href: 'https://www.washingtoncountyor.gov/' },
      { label: 'TripCheck traffic (ODOT)', href: 'https://www.tripcheck.com/' },
    ],
    directoryHint:
      'Prefer HOA/tech-corridor experience and honest US-26 pricing. Verify ODOT in-state and FMCSA interstate. This is Oregon Washington County — not WA state.',
  },
  {
    slug: 'clackamas',
    exportName: 'clackamasCountyOrIntelligence',
    countyName: 'Clackamas',
    hubTitle: 'Clackamas County Moving Intelligence Hub',
    eyebrow: 'Clackamas · SE/south metro, Oregon City & I-205 logistics',
    h1: 'Moving in Clackamas County: SE Metro Growth, Oregon City Access & I-205 Logistics',
    heroOpener:
      'Clackamas County is Portland’s SE/south metro collar: Oregon City hills and historic stock, Clackamas Town Center multi-family, Happy Valley/West Linn HOA growth, and I-205/OR-99E portal time that is not downtown Portland elevators and not Beaverton tech campuses. A Oregon City stairs job, a Happy Valley two-story, and a Wilsonville multi-unit do not share truck access or empty-mile risk. This hub is for Clackamas — not a Multnomah clone.',
    majorCorridors: 'I-205 · OR-99E · OR-212/224 · OR-43',
    whatIntro:
      'These are SE/south metro realities — suburban growth, river-adjacent towns, and I-205 timing — not Pearl District elevators or Silicon Forest hard dates as the default.',
    bullets: [
      {
        title: 'Oregon City hills and older stock rewrite access plans',
        detail: 'Stairs, grades, and historic blocks change truck sizing.',
      },
      {
        title: 'Happy Valley / West Linn HOA product is not urban Portland',
        detail: 'Gate lists and longer empty miles dominate many jobs.',
      },
      {
        title: 'I-205 / OR-99E define portal-to-portal time',
        detail: 'South-metro pairs look local on maps and regional at peak.',
      },
      {
        title: 'Not Multnomah eastside bungalows and not Washington County tech collars',
        detail: 'Survey each Clackamas submarket on its own terms.',
      },
      {
        title: 'River towns and foothills edges add access friction',
        detail: 'Photo driveway grades and street width early.',
      },
      OR_REG,
    ],
    zonesHeading: 'Clackamas access zones',
    zonesIntro:
      'Plan by Oregon City core, Clackamas/Happy Valley growth, West Linn/Lake Oswego edges, and Wilsonville/south corridors.',
    zones: [
      {
        id: 'oregon-city',
        name: 'Oregon City core & hillside stock',
        shortName: 'Oregon City',
        neighborhoods: ['Oregon City', 'Canemah edges', 'Park Place edges'],
        housingTypes: 'Older SFH, multi-level, limited multi-family',
        challenges: ['Hills and stairs', 'Historic street width', 'OR-99E congestion'],
        moverTips: 'Photo grades and curb. Prefer smaller trucks on tight blocks.',
        cityKeywords: ['oregon city'],
      },
      {
        id: 'happy-valley-clackamas',
        name: 'Happy Valley, Clackamas & SE growth',
        shortName: 'Happy Valley / Clackamas',
        neighborhoods: ['Happy Valley', 'Clackamas', 'Damascus edges', 'Sunnsyside corridors'],
        housingTypes: 'HOA SFH, multi-family, townhomes',
        challenges: ['HOA rules', 'I-205 congestion', 'Longer portal time to Portland core'],
        moverTips: 'Collect HOA packets. Price I-205 pairs portal-to-portal.',
        cityKeywords: ['happy valley', 'clackamas'],
      },
      {
        id: 'west-linn-lo',
        name: 'West Linn, Lake Oswego edges & river towns',
        shortName: 'West Linn / LO edges',
        neighborhoods: ['West Linn', 'Lake Oswego edges', 'OR-43 corridors'],
        housingTypes: 'HOA SFH, multi-level, premium stock',
        challenges: ['Hills and driveway grades', 'OR-43 timing', 'HOA rules'],
        moverTips: 'Survey driveway grades carefully. Confirm HOA access rules.',
        cityKeywords: ['west linn', 'lake oswego'],
      },
      {
        id: 'wilsonville-south',
        name: 'Wilsonville, Canby & south corridors',
        shortName: 'South Clackamas',
        neighborhoods: ['Wilsonville', 'Canby edges', 'Molalla edges', 'Aurora edges'],
        housingTypes: 'SFH, multi-family, small-town stock',
        challenges: ['I-5 / I-205 timing', 'Longer empty miles', 'Rain access'],
        moverTips: 'Price south pairs honestly. Clarify Clackamas vs Marion destinations.',
        cityKeywords: ['wilsonville', 'canby', 'molalla'],
      },
    ],
    costIntro:
      'Hills/HOA friction and I-205 portal time drive quotes more than bedroom count alone.',
    drivers: [
      { title: 'Hillside stairs & grades', detail: 'Oregon City and river-town labor hours spike.' },
      { title: 'HOA soft costs', detail: 'Gate lists push peak windows.' },
      { title: 'I-205 / OR-99E congestion', detail: 'Portal-to-portal spikes at peak.' },
      { title: 'Rain staging soft costs', detail: 'Wet-weather packing adds labor.' },
    ],
    ranges: [
      { label: 'Studio / 1BR (simple access)', value: '$500–$1,550+', note: 'Higher with hills or elevators' },
      { label: '2–3BR condo or modest SFH', value: '$1,450–$4,100+', note: 'HOA/hill friction trends up' },
      { label: '3–4+ BR / cross-metro', value: '$2,700–$8,200+', note: 'Long I-205 pairs highest' },
      { label: 'Typical 2-person crew rate', value: '$115–$190+/hr', note: 'Portal-to-portal' },
    ],
    seasonalIntro:
      'School-year suburb demand, rainy winters, summer peak, and wildfire-smoke days reshape SE-metro windows.',
    seasonal: [
      { title: 'Best windows: mid-week early mornings', detail: 'Clear curb and reduce I-205 pain.' },
      { title: 'Peak family season: late May–mid-August', detail: 'Book HOA Saturdays early.' },
      { title: 'Month-end multi-family turns', detail: 'Clackamas multi-unit fills first.' },
      { title: 'Wildfire-smoke contingency', detail: 'Confirm outdoor staging flexibility on smoke days.' },
    ],
    specialized: {
      id: 'clackamas-se-metro-oregon-city',
      title: 'SE/south metro & Oregon City module',
      intro:
        'Clackamas estimates fail when hillside access, HOA packets, or I-205 empty miles are treated like downtown Portland jobs.',
      bullets: [
        'Photo Oregon City grades and street width before truck sizing.',
        'Collect Happy Valley/West Linn HOA packets early.',
        'Price I-205/OR-99E pairs portal-to-portal.',
        'Clarify Clackamas vs Multnomah/Washington destinations on multi-county estimates.',
        'Verify ODOT household goods authority for in-state-only jobs and FMCSA for interstate legs.',
      ],
    },
    schools: [
      {
        title: 'How districts work here',
        detail:
          'Oregon City, North Clackamas, West Linn-Wilsonville, Lake Oswego, Canby, and other districts serve different addresses. Confirm zoning carefully.',
      },
      {
        title: 'Research sources',
        detail: 'District tools and Oregon Department of Education data beat ranking screenshots.',
      },
    ],
    hospitals: [
      {
        title: 'Major systems',
        detail:
          'Providence Willamette Falls, Kaiser south-metro sites, Legacy affiliates, and Portland systems (via commute) serve the county. Confirm networks.',
      },
      {
        title: 'What relocators should do',
        detail: 'Map peak-hour drive times from Happy Valley and Wilsonville into major campuses. Transfer records early.',
      },
    ],
    housing: [
      {
        title: 'Historic hillside vs HOA growth stock',
        detail: 'Oregon City product differs from Happy Valley two-stories.',
      },
      {
        title: 'Cost variation',
        detail: 'River-town premium stock often prices differently from far-south small-town SFH.',
      },
    ],
    townFit: [
      { title: 'Oregon City pattern', detail: 'Historic hills with stair and grade tradeoffs.' },
      { title: 'Happy Valley / Clackamas growth', detail: 'HOA product with I-205 logistics.' },
      { title: 'West Linn / river-town pattern', detail: 'Premium hillside stock with OR-43 timing.' },
    ],
    jobs: [
      {
        title: 'Employment anchors',
        detail:
          'Healthcare, logistics, retail corridors, manufacturing, and Portland-commute professional jobs shape employment.',
      },
      {
        title: 'Commute realism',
        detail: 'I-205 and OR-99E peaks are real for Portland-bound workers.',
      },
    ],
    lifestyle: [
      {
        title: 'SE/south metro identity',
        detail:
          'Clackamas is SE Portland metro collar — not Multnomah core elevators or Silicon Forest defaults.',
      },
      {
        title: 'Climate',
        detail: 'Wet winters, warm summers, and occasional wildfire smoke. Plan outdoor staging contingency.',
      },
    ],
    resourceItems: [
      { label: 'Clackamas County — official site', href: 'https://www.clackamas.us/' },
      { label: 'TripCheck traffic (ODOT)', href: 'https://www.tripcheck.com/' },
    ],
    directoryHint:
      'Prefer hillside/HOA experience and honest I-205 pricing. Verify ODOT in-state and FMCSA interstate.',
  },
  {
    slug: 'lane',
    exportName: 'laneCountyOrIntelligence',
    countyName: 'Lane',
    hubTitle: 'Lane County Moving Intelligence Hub',
    eyebrow: 'Lane · Eugene/Springfield, UO cycles & I-5 valley logistics',
    h1: 'Moving in Lane County: Eugene–Springfield Access, University Cycles & I-5 Valley Logistics',
    heroOpener:
      'Lane County is Willamette Valley university metro, not Portland spillover: Eugene downtown and campus multi-unit, Springfield stock, UO lease waves, and I-5/OR-126 portal time that is not Salem capital patterns and not Bend high-desert product. A campus multi-family turn, a south Eugene HOA two-story, and a Springfield multi-unit do not share truck access or empty-mile risk. This hub is for Lane — not a Multnomah clone or mid-valley Linn rename.',
    majorCorridors: 'I-5 · OR-126 · OR-99 · Belt Line corridors',
    whatIntro:
      'These are Eugene/Springfield valley realities — university calendars, valley rain, and I-5 logistics — not Portland hills or central Oregon desert defaults.',
    bullets: [
      {
        title: 'University of Oregon lease cycles cluster crews',
        detail: 'August/September and academic turns fill elevators and street parking first.',
      },
      {
        title: 'Eugene core multi-unit differs from south/west HOA product',
        detail: 'Campus access rules and suburban gate lists are not interchangeable.',
      },
      {
        title: 'I-5 / Belt Line / OR-126 define portal-to-portal time',
        detail: 'Valley pairs look local on maps and regional at peak.',
      },
      {
        title: 'Not Portland metro logistics and not Salem capital defaults',
        detail: 'Treat Lane as its own valley hub with distinct inventory patterns.',
      },
      {
        title: 'Rain windows and occasional wildfire smoke reshape staging',
        detail: 'Confirm contingency for outdoor packing days.',
      },
      OR_REG,
    ],
    zonesHeading: 'Lane access zones',
    zonesIntro:
      'Plan by downtown Eugene/campus, south/west Eugene suburbs, Springfield, and rural valley edges.',
    zones: [
      {
        id: 'eugene-campus',
        name: 'Downtown Eugene & UO multi-family',
        shortName: 'Eugene / UO',
        neighborhoods: ['Downtown Eugene', 'University district', 'Whitaker edges', 'South University edges'],
        housingTypes: 'Student multi-family, mid-rises, older SFH',
        challenges: ['Lease-end waves', 'Scarce curb staging', 'Elevators and stairs'],
        moverTips: 'Book academic peaks early. Confirm elevator reservations and truck length.',
        cityKeywords: ['eugene', 'university of oregon', 'uo'],
      },
      {
        id: 'south-west-eugene',
        name: 'South/west Eugene suburbs',
        shortName: 'South/west Eugene',
        neighborhoods: ['South Eugene', 'West Eugene edges', 'Santa Clara edges', 'River Road edges'],
        housingTypes: 'HOA SFH, multi-family, ranch stock',
        challenges: ['Belt Line congestion', 'HOA rules', 'Longer portal time to campus'],
        moverTips: 'Collect HOA packets. Price Belt Line pairs portal-to-portal.',
        cityKeywords: ['south eugene', 'santa clara'],
      },
      {
        id: 'springfield',
        name: 'Springfield city & east-valley stock',
        shortName: 'Springfield',
        neighborhoods: ['Springfield', 'Gateway edges', 'Thurston edges', 'Mohawk edges'],
        housingTypes: 'SFH, multi-family, older stock',
        challenges: ['I-5 / OR-126 timing', 'Mixed stairs and elevators', 'Rain access'],
        moverTips: 'Clarify Eugene vs Springfield destinations. Survey older stock carefully.',
        cityKeywords: ['springfield'],
      },
      {
        id: 'lane-edges',
        name: 'Cottage Grove, Florence approaches & rural edges',
        shortName: 'Outer Lane',
        neighborhoods: ['Cottage Grove', 'Junction City edges', 'Veneta edges', 'coastal approaches'],
        housingTypes: 'SFH, rural stock, limited multi-family',
        challenges: ['Longer empty miles', 'OR-126 / I-5 timing', 'Rural access'],
        moverTips: 'Price outer pairs honestly. Photo driveway and turn radius.',
        cityKeywords: ['cottage grove', 'junction city', 'veneta'],
      },
    ],
    costIntro:
      'Campus multi-unit access and I-5/Belt Line portal time drive quotes more than bedroom count alone.',
    drivers: [
      { title: 'Campus multi-unit & curb friction', detail: 'Academic peaks spike labor hours.' },
      { title: 'I-5 / Belt Line / OR-126 congestion', detail: 'Portal-to-portal spikes at peak.' },
      { title: 'HOA soft costs on south/west edges', detail: 'Gate lists push peak windows.' },
      { title: 'Rain staging soft costs', detail: 'Wet-weather packing adds labor.' },
    ],
    ranges: [
      { label: 'Studio / 1BR (simple access)', value: '$450–$1,450+', note: 'Higher near campus elevators' },
      { label: '2–3BR condo or modest SFH', value: '$1,350–$3,800+', note: 'Campus friction trends up' },
      { label: '3–4+ BR / cross-metro', value: '$2,400–$7,200+', note: 'Portland pairs and peaks highest' },
      { label: 'Typical 2-person crew rate', value: '$105–$180+/hr', note: 'Portal-to-portal' },
    ],
    seasonalIntro:
      'University calendars dominate more than pure suburban peaks — plan August carefully; rain and smoke still matter.',
    seasonal: [
      { title: 'Best windows: mid-week outside academic peaks', detail: 'Clear curb near UO and downtown.' },
      { title: 'Academic peaks: late August–September', detail: 'Book multi-unit far ahead.' },
      { title: 'Peak family season: late May–mid-August', detail: 'Book suburban Saturdays early.' },
      { title: 'Wildfire-smoke contingency', detail: 'Confirm outdoor staging flexibility on smoke days.' },
    ],
    specialized: {
      id: 'eugene-lane-uo-valley',
      title: 'Eugene UO & Willamette Valley module',
      intro:
        'Lane estimates fail when academic lease waves, campus curb limits, or I-5 empty miles are treated like Portland collar defaults.',
      bullets: [
        'Align multi-unit moves with UO calendars when possible.',
        'Request elevator packets early near campus.',
        'Price I-5/Belt Line/OR-126 pairs portal-to-portal toward Portland or southern OR.',
        'Do not treat Lane as a Multnomah or Marion clone.',
        'Verify ODOT household goods authority for in-state-only jobs and FMCSA for interstate legs.',
      ],
    },
    schools: [
      {
        title: 'How districts work here',
        detail:
          'Eugene 4J, Springfield, Bethel, and other districts serve different addresses. Confirm zoning carefully.',
      },
      {
        title: 'Research sources',
        detail: 'District tools and Oregon Department of Education data beat ranking screenshots.',
      },
    ],
    hospitals: [
      {
        title: 'Major systems',
        detail:
          'PeaceHealth Sacred Heart, McKenzie-Willamette, and other systems serve valley corridors. Confirm networks.',
      },
      {
        title: 'What relocators should do',
        detail: 'Map peak-hour drive times from Springfield and south Eugene into major campuses. Transfer records early.',
      },
    ],
    housing: [
      {
        title: 'Campus multi-unit vs south Eugene HOA stock',
        detail: 'Near-UO product differs sharply from suburban two-stories.',
      },
      {
        title: 'Cost variation',
        detail: 'Campus-adjacent renovated stock often prices differently from outer-valley SFH.',
      },
    ],
    townFit: [
      { title: 'Eugene campus lifestyle', detail: 'Walkable university amenities with curb tradeoffs.' },
      { title: 'South/west suburban pattern', detail: 'HOA product with Belt Line logistics.' },
      { title: 'Springfield pattern', detail: 'Mixed stock with I-5/OR-126 timing.' },
    ],
    jobs: [
      {
        title: 'Employment anchors',
        detail:
          'University of Oregon, healthcare, education, timber/manufacturing adjacency, and professional services shape employment.',
      },
      {
        title: 'Commute realism',
        detail: 'I-5 and Belt Line peaks are real. Test drive peak routes before choosing a submarket.',
      },
    ],
    lifestyle: [
      {
        title: 'Valley university identity',
        detail:
          'Lane is Eugene metro — not Portland collar product or Bend high-desert lifestyle as the default.',
      },
      {
        title: 'Climate',
        detail: 'Wet winters, warm summers, and occasional wildfire smoke. Plan outdoor staging contingency.',
      },
    ],
    resourceItems: [
      { label: 'Lane County — official site', href: 'https://www.lanecounty.org/' },
      { label: 'City of Eugene', href: 'https://www.eugene-or.gov/' },
      { label: 'TripCheck traffic (ODOT)', href: 'https://www.tripcheck.com/' },
    ],
    directoryHint:
      'Prefer campus multi-unit experience and honest I-5 pricing. Verify ODOT in-state and FMCSA interstate.',
  },
  {
    slug: 'marion',
    exportName: 'marionCountyOrIntelligence',
    countyName: 'Marion',
    hubTitle: 'Marion County Moving Intelligence Hub',
    eyebrow: 'Marion · Salem capital, mid-valley & I-5/OR-22 logistics',
    h1: 'Moving in Marion County: Salem Capital Access, Mid-Valley Patterns & I-5/OR-22 Logistics',
    heroOpener:
      'Marion County is capital and mid-valley logistics: downtown Salem multi-unit, state-government calendars, Keizer and South Salem suburbs, and I-5/OR-22 portal time that is not Eugene campus waves and not Portland collar HOAs. A capitol-adjacent condo, a South Salem two-story, and a Woodburn multi-family unit do not share truck access or empty-mile risk. This hub is for Marion — not a Lane clone or Multnomah rename.',
    majorCorridors: 'I-5 · OR-22 · OR-99E · Capitol corridors',
    whatIntro:
      'These are Salem capital / mid-valley realities — government calendars, valley rain, and I-5 logistics — not UO lease waves or Portland hills.',
    bullets: [
      {
        title: 'State government relo calendars create hard dates',
        detail: 'Session timing and agency transfers can compress windows.',
      },
      {
        title: 'Downtown Salem multi-unit differs from South Salem / Keizer SFH',
        detail: 'Elevators and curb limits rewrite core labor hours.',
      },
      {
        title: 'I-5 / OR-22 / OR-99E define portal-to-portal time',
        detail: 'Pairs toward Portland or Eugene look regional at peak.',
      },
      {
        title: 'Not Eugene university product and not Portland SE-metro',
        detail: 'Treat Marion as capital mid-valley with its own inventory patterns.',
      },
      {
        title: 'Agricultural and logistics corridors still matter',
        detail: 'Truck traffic near I-5 and valley arterials can reshape crew timing.',
      },
      OR_REG,
    ],
    zonesHeading: 'Marion access zones',
    zonesIntro:
      'Plan by downtown Salem, South Salem suburbs, Keizer north, and Woodburn/east-valley edges.',
    zones: [
      {
        id: 'salem-core',
        name: 'Downtown Salem & capitol corridors',
        shortName: 'Downtown Salem',
        neighborhoods: ['Downtown Salem', 'Capitol area', 'North Salem edges', 'West Salem edges'],
        housingTypes: 'Multi-unit, mid-rises, renovated stock',
        challenges: ['Elevators and COI', 'Scarce curb staging', 'Government event traffic'],
        moverTips: 'Get building packets early. Prefer mid-week mornings away from major capitol events.',
        cityKeywords: ['salem', 'downtown salem', 'capitol'],
      },
      {
        id: 'south-salem',
        name: 'South Salem suburban belt',
        shortName: 'South Salem',
        neighborhoods: ['South Salem', 'Liberty corridors', 'Kuebler edges'],
        housingTypes: 'SFH, multi-family, HOA pockets',
        challenges: ['HOA rules', 'I-5 timing', 'Longer portal time to core'],
        moverTips: 'Collect HOA packets. Price south pairs portal-to-portal.',
        cityKeywords: ['south salem'],
      },
      {
        id: 'keizer',
        name: 'Keizer & north mid-valley',
        shortName: 'Keizer',
        neighborhoods: ['Keizer', 'Clear Lake edges', 'north river corridors'],
        housingTypes: 'SFH, multi-family',
        challenges: ['OR-99E congestion', 'Rain access', 'Empty miles to south jobs'],
        moverTips: 'Clarify Keizer vs Salem destinations. Survey multi-unit access type.',
        cityKeywords: ['keizer'],
      },
      {
        id: 'woodburn-east',
        name: 'Woodburn, Silverton edges & east valley',
        shortName: 'Woodburn / east',
        neighborhoods: ['Woodburn', 'Silverton edges', 'Stayton edges', 'Aumsville edges'],
        housingTypes: 'SFH, multi-family, small-town stock',
        challenges: ['I-5 / OR-22 timing', 'Longer empty miles', 'Agricultural traffic'],
        moverTips: 'Price east-valley pairs honestly. Photo driveway and street width.',
        cityKeywords: ['woodburn', 'silverton', 'stayton'],
      },
    ],
    costIntro:
      'Core elevator friction and I-5/OR-22 portal time drive quotes more than bedroom count alone.',
    drivers: [
      { title: 'Downtown elevator & curb friction', detail: 'Capitol-adjacent labor hours spike.' },
      { title: 'I-5 / OR-22 / OR-99E congestion', detail: 'Portal-to-portal spikes at peak.' },
      { title: 'HOA soft costs on south suburbs', detail: 'Gate lists push peak windows.' },
      { title: 'Rain staging soft costs', detail: 'Wet-weather packing adds labor.' },
    ],
    ranges: [
      { label: 'Studio / 1BR (simple access)', value: '$420–$1,400+', note: 'Higher with elevators' },
      { label: '2–3BR condo or modest SFH', value: '$1,300–$3,700+', note: 'Core friction trends up' },
      { label: '3–4+ BR / cross-metro', value: '$2,300–$7,000+', note: 'Portland pairs highest' },
      { label: 'Typical 2-person crew rate', value: '$100–$175+/hr', note: 'Portal-to-portal' },
    ],
    seasonalIntro:
      'Capital session timing, family peaks, rainy winters, and summer smoke days reshape Salem windows.',
    seasonal: [
      { title: 'Best windows: mid-week early mornings', detail: 'Clear curb and reduce I-5 pain.' },
      { title: 'Peak family season: late May–mid-August', detail: 'Book suburban Saturdays early.' },
      { title: 'Government transfer windows', detail: 'Hard dates can cluster around fiscal calendars.' },
      { title: 'Wildfire-smoke contingency', detail: 'Confirm outdoor staging flexibility on smoke days.' },
    ],
    specialized: {
      id: 'salem-marion-capital-mid-valley',
      title: 'Salem capital & mid-valley module',
      intro:
        'Marion estimates fail when capitol-core elevators or I-5 empty miles are treated like Eugene campus or Portland collar defaults.',
      bullets: [
        'Request downtown Salem building packets early.',
        'Price I-5/OR-22 pairs portal-to-portal toward Portland or Eugene.',
        'Separate government hard-date scopes from standard suburban SFH.',
        'Clarify Marion vs Linn/Lane destinations on multi-county estimates.',
        'Verify ODOT household goods authority for in-state-only jobs and FMCSA for interstate legs.',
      ],
    },
    schools: [
      {
        title: 'How districts work here',
        detail:
          'Salem-Keizer, Woodburn, Silver Falls, and other districts serve different addresses. Confirm zoning carefully.',
      },
      {
        title: 'Research sources',
        detail: 'District tools and Oregon Department of Education data beat ranking screenshots.',
      },
    ],
    hospitals: [
      {
        title: 'Major systems',
        detail:
          'Salem Health, Legacy Silverton affiliates, and other systems serve mid-valley corridors. Confirm networks.',
      },
      {
        title: 'What relocators should do',
        detail: 'Map peak-hour drive times from Woodburn and South Salem into major campuses. Transfer records early.',
      },
    ],
    housing: [
      {
        title: 'Capitol multi-unit vs suburban SFH',
        detail: 'Downtown product differs from South Salem and Keizer two-stories.',
      },
      {
        title: 'Cost variation',
        detail: 'Near-core renovated stock often prices differently from east-valley small-town SFH.',
      },
    ],
    townFit: [
      { title: 'Downtown capital lifestyle', detail: 'Government adjacency with elevator tradeoffs.' },
      { title: 'South Salem suburban pattern', detail: 'HOA/SFH product with I-5 logistics.' },
      { title: 'Woodburn / east-valley pattern', detail: 'Smaller-town stock with longer empty miles.' },
    ],
    jobs: [
      {
        title: 'Employment anchors',
        detail:
          'State government, healthcare, education, agriculture-adjacent industry, and logistics shape employment.',
      },
      {
        title: 'Commute realism',
        detail: 'I-5 and OR-22 peaks are real for Portland-bound workers.',
      },
    ],
    lifestyle: [
      {
        title: 'Capital mid-valley identity',
        detail:
          'Marion is Salem metro — not Eugene campus defaults or Portland SE-metro collars.',
      },
      {
        title: 'Climate',
        detail: 'Wet winters, warm summers, and occasional wildfire smoke. Plan outdoor staging contingency.',
      },
    ],
    resourceItems: [
      { label: 'Marion County — official site', href: 'https://www.co.marion.or.us/' },
      { label: 'City of Salem', href: 'https://www.cityofsalem.net/' },
      { label: 'TripCheck traffic (ODOT)', href: 'https://www.tripcheck.com/' },
    ],
    directoryHint:
      'Prefer capitol multi-unit experience and honest I-5 pricing. Verify ODOT in-state and FMCSA interstate.',
  },
  {
    slug: 'deschutes',
    exportName: 'deschutesCountyOrIntelligence',
    countyName: 'Deschutes',
    hubTitle: 'Deschutes County Moving Intelligence Hub',
    eyebrow: 'Deschutes · Bend growth, high-desert logistics & US-97',
    h1: 'Moving in Deschutes County: Bend Growth, High-Desert Logistics & US-97 Access',
    heroOpener:
      'Deschutes County is high-desert central Oregon, not Willamette Valley: Bend multi-unit and HOA growth, Redmond airport-corridor stock, tourism and second-home pulses, and US-97/US-20 portal time that is not Portland rain-hills logistics and not Medford Rogue Valley product. A westside Bend stairs job, a northeast HOA two-story, and a Redmond multi-family unit do not share truck access or empty-mile risk. This hub is for Deschutes — not a Multnomah south rename.',
    majorCorridors: 'US-97 · US-20 · OR-372 · parkway corridors',
    whatIntro:
      'These are Bend / high-desert realities — dry climate staging, tourism peaks, and mountain-edge access — not Portland bridges or Eugene campus waves.',
    bullets: [
      {
        title: 'High-desert climate changes staging assumptions',
        detail: 'Dust, heat, and winter ice matter more than Willamette Valley rain defaults.',
      },
      {
        title: 'Tourism and second-home pulses cluster summer demand',
        detail: 'Short-term rental turns and peak weekends fill crews first.',
      },
      {
        title: 'US-97 / US-20 define portal-to-portal time',
        detail: 'Pairs toward Portland or southern OR are long regional hauls — price honestly.',
      },
      {
        title: 'Bend westside hills vs northeast flat growth are not clones',
        detail: 'Photo grades and HOA rules separately.',
      },
      {
        title: 'Not Portland spillover and not Rogue Valley product',
        detail: 'Treat Deschutes as central Oregon with its own inventory patterns.',
      },
      OR_REG,
    ],
    zonesHeading: 'Deschutes access zones',
    zonesIntro:
      'Plan by central Bend, westside hills, northeast/Redmond growth, and Sisters/rural edges.',
    zones: [
      {
        id: 'bend-core',
        name: 'Central Bend multi-unit & downtown',
        shortName: 'Central Bend',
        neighborhoods: ['Downtown Bend', 'Old Bend edges', 'central multi-family'],
        housingTypes: 'Multi-unit, condos, renovated SFH',
        challenges: ['Curb staging', 'Tourism congestion', 'Elevators and stairs'],
        moverTips: 'Avoid peak tourism weekends when flexible. Confirm elevator reservations.',
        cityKeywords: ['bend', 'downtown bend'],
      },
      {
        id: 'bend-westside',
        name: 'Westside Bend hills & premium stock',
        shortName: 'Westside Bend',
        neighborhoods: ['Westside Bend', 'Awbrey Butte edges', 'Summit edges'],
        housingTypes: 'Hillside SFH, multi-level, HOA pockets',
        challenges: ['Grades and stairs', 'Limited truck turn radius', 'Winter ice'],
        moverTips: 'Photo driveway grades. Prefer smaller trucks when required.',
        cityKeywords: ['westside bend', 'awbrey butte'],
      },
      {
        id: 'ne-redmond',
        name: 'Northeast Bend, Redmond & airport corridor',
        shortName: 'NE Bend / Redmond',
        neighborhoods: ['Northeast Bend', 'Redmond', 'Deschutes River Woods edges', 'airport corridors'],
        housingTypes: 'HOA SFH, multi-family, growth suburbs',
        challenges: ['US-97 congestion', 'HOA rules', 'Longer empty miles to westside'],
        moverTips: 'Collect HOA packets. Price US-97 pairs portal-to-portal.',
        cityKeywords: ['redmond', 'northeast bend'],
      },
      {
        id: 'sisters-edges',
        name: 'Sisters, Sunriver approaches & rural edges',
        shortName: 'Sisters / rural',
        neighborhoods: ['Sisters', 'Sunriver approaches', 'La Pine edges', 'rural forest roads'],
        housingTypes: 'SFH, vacation/second-home stock, rural access',
        challenges: ['Longer empty miles', 'Seasonal tourism', 'Winter access'],
        moverTips: 'Price rural pairs honestly. Confirm winter and driveway contingency.',
        cityKeywords: ['sisters', 'sunriver', 'la pine'],
      },
    ],
    costIntro:
      'Tourism peaks, hillside access, and long US-97 empty miles drive quotes more than bedroom count alone.',
    drivers: [
      { title: 'Westside grades & stairs', detail: 'Hillside labor hours spike.' },
      { title: 'Tourism-weekend demand premiums', detail: 'Summer peaks raise rates.' },
      { title: 'US-97 / US-20 long empty miles', detail: 'Regional pairs cost more than map distance suggests.' },
      { title: 'HOA soft costs on growth edges', detail: 'Gate lists push peak windows.' },
    ],
    ranges: [
      { label: 'Studio / 1BR (simple access)', value: '$500–$1,600+', note: 'Higher in peak tourism windows' },
      { label: '2–3BR condo or modest SFH', value: '$1,500–$4,400+', note: 'Hills and HOA friction trend up' },
      { label: '3–4+ BR / cross-state / long OR haul', value: '$2,900–$9,500+', note: 'Portland or CA pairs highest' },
      { label: 'Typical 2-person crew rate', value: '$115–$195+/hr', note: 'Portal-to-portal' },
    ],
    seasonalIntro:
      'Summer tourism dominates more than Willamette Valley patterns; winter ice and wildfire smoke still matter.',
    seasonal: [
      { title: 'Best windows: mid-week outside peak tourism', detail: 'Clear curb in central Bend.' },
      { title: 'Peak season: June–September', detail: 'Book Bend weekends far ahead.' },
      { title: 'Shoulder seasons for second-home turns', detail: 'Still confirm HOA and access rules.' },
      { title: 'Winter ice and wildfire-smoke contingency', detail: 'Confirm driveway and outdoor staging flexibility.' },
    ],
    specialized: {
      id: 'bend-deschutes-high-desert',
      title: 'Bend high-desert growth & tourism module',
      intro:
        'Deschutes estimates fail when tourism peaks, westside grades, or long US-97 empty miles are treated like Portland rain-metro defaults.',
      bullets: [
        'Photo westside grades and street width before truck sizing.',
        'Avoid peak tourism weekends in central Bend when flexible.',
        'Price US-97/US-20 pairs portal-to-portal toward Portland, Eugene, or southern OR.',
        'Do not treat Deschutes as Multnomah south or Willamette Valley product.',
        'Verify ODOT household goods authority for in-state-only jobs and FMCSA for interstate legs.',
      ],
    },
    schools: [
      {
        title: 'How districts work here',
        detail:
          'Bend-La Pine, Redmond, Sisters, and other districts serve different addresses. Confirm zoning carefully.',
      },
      {
        title: 'Research sources',
        detail: 'District tools and Oregon Department of Education data beat ranking screenshots.',
      },
    ],
    hospitals: [
      {
        title: 'Major systems',
        detail:
          'St. Charles Health System and other central Oregon providers serve Bend/Redmond corridors. Confirm networks.',
      },
      {
        title: 'What relocators should do',
        detail: 'Map drive times from Sisters and Redmond into major campuses. Transfer records early.',
      },
    ],
    housing: [
      {
        title: 'Central multi-unit vs westside hills vs northeast HOA growth',
        detail: 'Submarkets differ sharply within short distances.',
      },
      {
        title: 'Cost variation',
        detail: 'Tourism-adjacent and premium hillside stock often prices differently from Redmond growth SFH.',
      },
    ],
    townFit: [
      { title: 'Central Bend lifestyle', detail: 'Walkable amenities with tourism congestion tradeoffs.' },
      { title: 'Westside hillside pattern', detail: 'Premium grades and stair logistics.' },
      { title: 'Redmond / NE growth pattern', detail: 'HOA product with US-97 logistics.' },
    ],
    jobs: [
      {
        title: 'Employment anchors',
        detail:
          'Healthcare, tourism/hospitality, outdoor recreation economy, construction, and remote/tech hybrid work shape employment.',
      },
      {
        title: 'Commute realism',
        detail: 'US-97 peaks and long distances between Bend and Redmond are real. Test drive peak routes.',
      },
    ],
    lifestyle: [
      {
        title: 'High-desert identity',
        detail:
          'Deschutes is central Oregon high desert — not Portland rain-metro or Willamette Valley university defaults.',
      },
      {
        title: 'Climate',
        detail: 'Dry climate, cold winters, hot summers, and wildfire-smoke risk. Plan outdoor staging contingency.',
      },
    ],
    resourceItems: [
      { label: 'Deschutes County — official site', href: 'https://www.deschutes.org/' },
      { label: 'City of Bend', href: 'https://www.bendoregon.gov/' },
      { label: 'TripCheck traffic (ODOT)', href: 'https://www.tripcheck.com/' },
    ],
    directoryHint:
      'Prefer high-desert hillside and tourism-window experience with honest US-97 pricing. Verify ODOT in-state and FMCSA interstate.',
  },
  {
    slug: 'jackson',
    exportName: 'jacksonCountyOrIntelligence',
    countyName: 'Jackson',
    hubTitle: 'Jackson County Moving Intelligence Hub',
    eyebrow: 'Jackson · Medford/Rogue Valley, southern OR & I-5 logistics',
    h1: 'Moving in Jackson County: Medford–Rogue Valley Access, Southern Oregon Identity & I-5 Logistics',
    heroOpener:
      'Jackson County is southern Oregon Rogue Valley, not Portland spillover: Medford multi-unit and SFH mix, Ashland tourism and campus-adjacent stock, Central Point/White City growth, and I-5/OR-62 portal time that is not Bend high-desert product and not Eugene valley defaults. A Medford multi-family unit, an Ashland hillside job, and a Central Point two-story do not share truck access or empty-mile risk. This hub is for Jackson — not a Multnomah south rename.',
    majorCorridors: 'I-5 · OR-62 · OR-99 · OR-238',
    whatIntro:
      'These are Rogue Valley realities — southern OR climate, tourism peaks, and I-5 logistics — not Portland collars or central Oregon desert as the default.',
    bullets: [
      {
        title: 'Medford core multi-unit differs from Ashland hillside and tourism stock',
        detail: 'Survey access type carefully — not one valley product.',
      },
      {
        title: 'I-5 defines long north-south portal time',
        detail: 'Pairs toward Portland or California are long regional or interstate hauls.',
      },
      {
        title: 'Tourism and cultural calendars (Ashland) reshape summer windows',
        detail: 'Peak weekends fill curb and lodging demand first.',
      },
      {
        title: 'Wildfire-smoke and heat days are first-class planning risks',
        detail: 'Confirm outdoor staging contingency in late summer.',
      },
      {
        title: 'Not Portland south and not Bend clone',
        detail: 'Treat Jackson as Rogue Valley with its own inventory patterns.',
      },
      OR_REG,
    ],
    zonesHeading: 'Jackson access zones',
    zonesIntro:
      'Plan by Medford core, Ashland, Central Point/White City, and Applegate/west-valley edges.',
    zones: [
      {
        id: 'medford-core',
        name: 'Medford core & multi-family belt',
        shortName: 'Medford',
        neighborhoods: ['Downtown Medford', 'east/west Medford', 'multi-family corridors'],
        housingTypes: 'Multi-unit, SFH, renovated stock',
        challenges: ['Curb staging', 'I-5 timing', 'Heat/smoke days'],
        moverTips: 'Prefer mid-week mornings. Confirm multi-unit access type.',
        cityKeywords: ['medford'],
      },
      {
        id: 'ashland',
        name: 'Ashland tourism & hillside stock',
        shortName: 'Ashland',
        neighborhoods: ['Ashland', 'downtown Ashland', 'hillside neighborhoods'],
        housingTypes: 'Hillside SFH, multi-unit, tourism-adjacent stock',
        challenges: ['Hills and stairs', 'Tourism congestion', 'Limited street width'],
        moverTips: 'Photo grades and curb. Avoid festival/peak tourism windows when flexible.',
        cityKeywords: ['ashland'],
      },
      {
        id: 'central-point-white-city',
        name: 'Central Point, White City & north-valley growth',
        shortName: 'Central Point / White City',
        neighborhoods: ['Central Point', 'White City', 'Eagle Point edges'],
        housingTypes: 'SFH, multi-family, industrial-adjacent stock',
        challenges: ['OR-62 congestion', 'Industrial traffic', 'Longer empty miles to Ashland'],
        moverTips: 'Price north-valley pairs portal-to-portal. Survey industrial-adjacent access.',
        cityKeywords: ['central point', 'white city', 'eagle point'],
      },
      {
        id: 'west-valley',
        name: 'Jacksonville, Applegate & west-valley edges',
        shortName: 'West valley',
        neighborhoods: ['Jacksonville', 'Applegate edges', 'Ruch edges', 'OR-238 corridors'],
        housingTypes: 'SFH, rural stock, historic town product',
        challenges: ['Longer empty miles', 'Rural access', 'Wildfire-season risk'],
        moverTips: 'Price rural pairs honestly. Confirm driveway and turn radius.',
        cityKeywords: ['jacksonville', 'applegate'],
      },
    ],
    costIntro:
      'Hillside/tourism access and long I-5 empty miles drive quotes more than bedroom count alone.',
    drivers: [
      { title: 'Ashland hillside & tourism friction', detail: 'Peak weekends spike labor hours.' },
      { title: 'I-5 / OR-62 long empty miles', detail: 'Regional pairs cost more than map distance suggests.' },
      { title: 'Heat and wildfire-smoke contingency', detail: 'Late-summer outdoor staging risk.' },
      { title: 'Multi-unit access friction in Medford', detail: 'Elevators and stairs rewrite labor hours.' },
    ],
    ranges: [
      { label: 'Studio / 1BR (simple access)', value: '$420–$1,400+', note: 'Higher in Ashland tourism peaks' },
      { label: '2–3BR condo or modest SFH', value: '$1,300–$3,800+', note: 'Hills and heat friction trend up' },
      { label: '3–4+ BR / cross-state', value: '$2,400–$8,000+', note: 'CA or Portland pairs highest' },
      { label: 'Typical 2-person crew rate', value: '$100–$175+/hr', note: 'Portal-to-portal' },
    ],
    seasonalIntro:
      'Southern OR heat, tourism summers, and wildfire-smoke risk reshape windows more than Portland rain defaults.',
    seasonal: [
      { title: 'Best windows: mid-week spring/fall', detail: 'Avoid peak heat and tourism when flexible.' },
      { title: 'Peak tourism season: summer', detail: 'Book Ashland weekends early.' },
      { title: 'Late-summer wildfire-smoke risk', detail: 'Confirm outdoor staging contingency.' },
      { title: 'Mild winters vs valley ice pockets', detail: 'Still confirm driveway access on cold snaps.' },
    ],
    specialized: {
      id: 'medford-jackson-rogue-valley',
      title: 'Medford Rogue Valley & southern OR module',
      intro:
        'Jackson estimates fail when Ashland tourism access, heat/smoke days, or long I-5 empty miles are treated like Portland collar defaults.',
      bullets: [
        'Photo Ashland grades and curb before truck sizing.',
        'Avoid peak tourism weekends when flexible.',
        'Price I-5 pairs portal-to-portal toward California or Portland.',
        'Do not treat Jackson as Multnomah south or Bend high-desert product.',
        'Verify ODOT household goods authority for in-state-only jobs and FMCSA for interstate legs.',
      ],
    },
    schools: [
      {
        title: 'How districts work here',
        detail:
          'Medford, Ashland, Central Point, Phoenix-Talent, and other districts serve different addresses. Confirm zoning carefully.',
      },
      {
        title: 'Research sources',
        detail: 'District tools and Oregon Department of Education data beat ranking screenshots.',
      },
    ],
    hospitals: [
      {
        title: 'Major systems',
        detail:
          'Asante Rogue Regional, Providence Medford, and other systems serve Rogue Valley corridors. Confirm networks.',
      },
      {
        title: 'What relocators should do',
        detail: 'Map drive times from Ashland and Central Point into major campuses. Transfer records early.',
      },
    ],
    housing: [
      {
        title: 'Medford multi-unit vs Ashland hillside vs north-valley growth',
        detail: 'Submarkets differ sharply within the Rogue Valley.',
      },
      {
        title: 'Cost variation',
        detail: 'Tourism-adjacent Ashland stock often prices differently from White City growth SFH.',
      },
    ],
    townFit: [
      { title: 'Medford core pattern', detail: 'Regional hub multi-unit and SFH mix.' },
      { title: 'Ashland lifestyle', detail: 'Tourism and hillside tradeoffs.' },
      { title: 'Central Point / White City pattern', detail: 'Growth suburbs with OR-62 logistics.' },
    ],
    jobs: [
      {
        title: 'Employment anchors',
        detail:
          'Healthcare, retail/logistics, agriculture-adjacent industry, tourism, and education shape employment.',
      },
      {
        title: 'Commute realism',
        detail: 'I-5 and OR-62 peaks are real across the valley. Test drive peak routes.',
      },
    ],
    lifestyle: [
      {
        title: 'Southern OR identity',
        detail:
          'Jackson is Rogue Valley — not Portland spillover suburbs or Bend high-desert defaults.',
      },
      {
        title: 'Climate',
        detail: 'Hotter, drier summers than the Willamette Valley, with wildfire-smoke risk. Plan outdoor staging contingency.',
      },
    ],
    resourceItems: [
      { label: 'Jackson County — official site', href: 'https://jacksoncountyor.gov/' },
      { label: 'City of Medford', href: 'https://www.medfordoregon.gov/' },
      { label: 'TripCheck traffic (ODOT)', href: 'https://www.tripcheck.com/' },
    ],
    directoryHint:
      'Prefer Rogue Valley hillside/tourism experience and honest I-5 pricing. Verify ODOT in-state and FMCSA interstate.',
  },
  {
    slug: 'linn',
    exportName: 'linnCountyOrIntelligence',
    countyName: 'Linn',
    hubTitle: 'Linn County Moving Intelligence Hub',
    eyebrow: 'Linn · Albany mid-valley, not Eugene or Salem clone',
    h1: 'Moving in Linn County: Albany Mid-Valley Access, I-5 Logistics & Regional Patterns',
    heroOpener:
      'Linn County is mid-valley Albany regional product, not a Eugene or Salem clone: Albany multi-unit and SFH mix, Lebanon and Sweet Home edges, I-5/US-20/OR-34 portal time, and agricultural-industrial adjacency that is not UO lease waves and not capitol multi-unit defaults. An Albany multi-family unit, a Lebanon two-story, and a rural edge home do not share truck access or empty-mile risk. This hub is for Linn — not renamed Lane or Marion pages.',
    majorCorridors: 'I-5 · US-20 · OR-34 · OR-99E',
    whatIntro:
      'These are Albany / mid-valley realities — regional logistics, valley rain, and I-5 timing — not Portland collars or Eugene campus product as the default.',
    bullets: [
      {
        title: 'Albany core multi-unit differs from Lebanon / Sweet Home edges',
        detail: 'Survey access type carefully — not one mid-valley product.',
      },
      {
        title: 'I-5 / US-20 / OR-34 define portal-to-portal time',
        detail: 'Pairs toward Salem, Eugene, or Portland look regional at peak.',
      },
      {
        title: 'Not a Eugene campus clone and not a Salem capital clone',
        detail: 'Linn has its own industrial/agricultural adjacency patterns.',
      },
      {
        title: 'Industrial and mill-adjacent traffic can reshape crew timing',
        detail: 'Avoid shift-change peaks when flexible.',
      },
      {
        title: 'Rain windows still dominate Willamette Valley staging',
        detail: 'Confirm floor protection and driveway contingency.',
      },
      OR_REG,
    ],
    zonesHeading: 'Linn access zones',
    zonesIntro:
      'Plan by Albany core, north Albany edges, Lebanon, and Sweet Home/east-valley corridors.',
    zones: [
      {
        id: 'albany-core',
        name: 'Albany core & multi-family belt',
        shortName: 'Albany core',
        neighborhoods: ['Downtown Albany', 'central multi-family', 'south Albany edges'],
        housingTypes: 'Multi-unit, SFH, renovated stock',
        challenges: ['Curb staging', 'I-5 timing', 'Mixed stairs and elevators'],
        moverTips: 'Prefer mid-week mornings. Confirm multi-unit access type.',
        cityKeywords: ['albany'],
      },
      {
        id: 'north-albany',
        name: 'North Albany & river edges',
        shortName: 'North Albany',
        neighborhoods: ['North Albany', 'river corridors', 'OR-20 approaches'],
        housingTypes: 'SFH, multi-family, premium pockets',
        challenges: ['Bridge/approach timing', 'Longer empty miles to Lebanon', 'Rain access'],
        moverTips: 'Price north pairs portal-to-portal. Photo driveway grades.',
        cityKeywords: ['north albany'],
      },
      {
        id: 'lebanon',
        name: 'Lebanon & mid-county stock',
        shortName: 'Lebanon',
        neighborhoods: ['Lebanon', 'US-20 corridors', 'mid-county SFH'],
        housingTypes: 'SFH, multi-family, small-city stock',
        challenges: ['US-20 congestion', 'Longer empty miles to Albany', 'Industrial traffic'],
        moverTips: 'Clarify Lebanon vs Albany destinations. Survey older stock carefully.',
        cityKeywords: ['lebanon'],
      },
      {
        id: 'sweet-home-east',
        name: 'Sweet Home, east-valley & foothills edges',
        shortName: 'Sweet Home / east',
        neighborhoods: ['Sweet Home', 'Brownsville edges', 'foothills approaches'],
        housingTypes: 'SFH, rural stock, limited multi-family',
        challenges: ['Longer empty miles', 'Rural access', 'OR-228 / US-20 timing'],
        moverTips: 'Price east pairs honestly. Photo driveway and turn radius.',
        cityKeywords: ['sweet home', 'brownsville'],
      },
    ],
    costIntro:
      'Regional empty miles and multi-unit access drive quotes more than bedroom count alone.',
    drivers: [
      { title: 'Multi-unit access friction in Albany', detail: 'Stairs and elevators rewrite labor hours.' },
      { title: 'I-5 / US-20 / OR-34 empty miles', detail: 'Portal-to-portal spikes on longer pairs.' },
      { title: 'Industrial shift-change windows', detail: 'Crew timing near mill/industrial corridors matters.' },
      { title: 'Rain staging soft costs', detail: 'Wet-weather packing adds labor.' },
    ],
    ranges: [
      { label: 'Studio / 1BR (simple access)', value: '$400–$1,300+', note: 'Higher with elevators or long carries' },
      { label: '2–3BR condo or modest SFH', value: '$1,200–$3,400+', note: 'Regional friction trends up' },
      { label: '3–4+ BR / cross-metro', value: '$2,100–$6,500+', note: 'Portland or Eugene pairs highest' },
      { label: 'Typical 2-person crew rate', value: '$95–$165+/hr', note: 'Portal-to-portal' },
    ],
    seasonalIntro:
      'Mid-valley family peaks, rainy winters, and occasional wildfire smoke reshape Linn windows.',
    seasonal: [
      { title: 'Best windows: mid-week early mornings', detail: 'Clear curb and reduce I-5 pain.' },
      { title: 'Peak family season: late May–mid-August', detail: 'Book suburban Saturdays early.' },
      { title: 'Month-end multi-family turns', detail: 'Albany multi-unit fills first.' },
      { title: 'Wildfire-smoke contingency', detail: 'Confirm outdoor staging flexibility on smoke days.' },
    ],
    specialized: {
      id: 'albany-linn-mid-valley',
      title: 'Albany mid-valley regional module',
      intro:
        'Linn estimates fail when empty miles or industrial timing are treated like Eugene campus or Salem capital defaults.',
      bullets: [
        'Survey Albany multi-unit access carefully before final quotes.',
        'Price I-5/US-20/OR-34 pairs portal-to-portal toward Salem or Eugene.',
        'Do not treat Linn as a Lane or Marion clone.',
        'Clarify Linn vs Marion/Lane destinations on multi-county estimates.',
        'Verify ODOT household goods authority for in-state-only jobs and FMCSA for interstate legs.',
      ],
    },
    schools: [
      {
        title: 'How districts work here',
        detail:
          'Greater Albany, Lebanon Community, Sweet Home, and other districts serve different addresses. Confirm zoning carefully.',
      },
      {
        title: 'Research sources',
        detail: 'District tools and Oregon Department of Education data beat ranking screenshots.',
      },
    ],
    hospitals: [
      {
        title: 'Major systems',
        detail:
          'Samaritan Albany General, Good Samaritan (Lebanon corridor), and other systems serve mid-valley corridors. Confirm networks.',
      },
      {
        title: 'What relocators should do',
        detail: 'Map drive times from Lebanon and Sweet Home into major campuses. Transfer records early.',
      },
    ],
    housing: [
      {
        title: 'Albany multi-unit vs Lebanon/Sweet Home SFH',
        detail: 'Core product differs from east-county small-city stock.',
      },
      {
        title: 'Cost variation',
        detail: 'Near-core renovated stock often prices differently from foothills-edge SFH.',
      },
    ],
    townFit: [
      { title: 'Albany core pattern', detail: 'Regional hub multi-unit and SFH mix.' },
      { title: 'Lebanon mid-county pattern', detail: 'Smaller-city stock with US-20 logistics.' },
      { title: 'Sweet Home / east pattern', detail: 'Longer empty miles and rural access.' },
    ],
    jobs: [
      {
        title: 'Employment anchors',
        detail:
          'Manufacturing, healthcare, education, agriculture-adjacent industry, and logistics shape employment.',
      },
      {
        title: 'Commute realism',
        detail: 'I-5 peaks are real for Salem- and Eugene-bound workers.',
      },
    ],
    lifestyle: [
      {
        title: 'Mid-valley identity',
        detail:
          'Linn is Albany regional mid-valley — not Eugene campus or Salem capital product as the default.',
      },
      {
        title: 'Climate',
        detail: 'Wet winters, warm summers, and occasional wildfire smoke. Plan outdoor staging contingency.',
      },
    ],
    resourceItems: [
      { label: 'Linn County — official site', href: 'https://www.linncountyor.gov/' },
      { label: 'City of Albany', href: 'https://www.cityofalbany.net/' },
      { label: 'TripCheck traffic (ODOT)', href: 'https://www.tripcheck.com/' },
    ],
    directoryHint:
      'Prefer mid-valley multi-unit experience and honest I-5 pricing. Verify ODOT in-state and FMCSA interstate.',
  },
];

function esc(s: string): string {
  return s.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
}

function renderPack(spec: PackSpec): string {
  const zones = spec.zones
    .map(
      (z) => `    {
      id: "${z.id}",
      name: "${esc(z.name)}",
      shortName: "${esc(z.shortName)}",
      neighborhoods: ${JSON.stringify(z.neighborhoods)},
      housingTypes: "${esc(z.housingTypes)}",
      challenges: ${JSON.stringify(z.challenges)},
      moverTips: "${esc(z.moverTips)}",
      cityKeywords: ${JSON.stringify(z.cityKeywords)},
    }`
    )
    .join(',\n');

  const bullets = spec.bullets
    .map(
      (b) => `      {
        title: "${esc(b.title)}",
        detail: "${esc(b.detail)}",
      }`
    )
    .join(',\n');

  const drivers = spec.drivers
    .map((d) => `      { title: "${esc(d.title)}", detail: "${esc(d.detail)}" }`)
    .join(',\n');

  const ranges = spec.ranges
    .map(
      (r) =>
        `      { label: "${esc(r.label)}", value: "${esc(r.value)}", note: "${esc(r.note)}" }`
    )
    .join(',\n');

  const seasonal = spec.seasonal
    .map((s) => `      { title: "${esc(s.title)}", detail: "${esc(s.detail)}" }`)
    .join(',\n');

  const specBullets = spec.specialized.bullets.map((b) => `"${esc(b)}"`).join(',');

  const mkBullets = (items: { title: string; detail: string }[]) =>
    items
      .map((b) => `          { title: "${esc(b.title)}", detail: "${esc(b.detail)}" }`)
      .join(',\n');

  const resources = spec.resourceItems
    .map(
      (r) =>
        `      { label: "${esc(r.label)}", href: "${esc(r.href)}", external: true }`
    )
    .join(',\n');

  return `import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import { finalizeOrPack } from '@/lib/local-movers/county-intelligence/oregon/or-shared';

export const ${spec.exportName}: CountyIntelligencePack = finalizeOrPack({
  countySlug: "${spec.slug}",
  hubTitle: "${esc(spec.hubTitle)}",
  eyebrow: "${esc(spec.eyebrow)}",
  h1: "${esc(spec.h1)}",
  heroOpener: "${esc(spec.heroOpener)}",
  heroCredibility:
    'ODOT household goods certificate (ORS 825) for intrastate OR moves · FMCSA for interstate · Curated directory listings',
  majorCorridors: "${esc(spec.majorCorridors)}",
  whatMakesDifferent: {
    title: "What makes moving in ${esc(spec.countyName)} County different",
    intro: "${esc(spec.whatIntro)}",
    bullets: [
${bullets},
    ],
  },
  zonesHeading: "${esc(spec.zonesHeading)}",
  zonesIntro: "${esc(spec.zonesIntro)}",
  zones: [
${zones}
  ],
  costDrivers: {
    title: "What drives ${esc(spec.countyName)} County moving costs",
    intro: "${esc(spec.costIntro)}",
    drivers: [
${drivers}
    ],
    ranges: [
${ranges}
    ],
  },
  seasonal: {
    title: "When to schedule a move in ${esc(spec.countyName)} County",
    intro: "${esc(spec.seasonalIntro)}",
    items: [
${seasonal}
    ],
  },
  specialized: [
    {
      id: "${esc(spec.specialized.id)}",
      title: "${esc(spec.specialized.title)}",
      intro: "${esc(spec.specialized.intro)}",
      bullets: [${specBullets}],
    },
  ],
  relocation: {
    title: "Considering a move to ${esc(spec.countyName)} County?",
    intro:
      'Use this as a practical fit checklist — schools, healthcare, housing character, and commute realism — then verify on district and hospital sites. No single ranking captures neighborhood fit.',
    modules: [
      {
        id: "schools",
        title: "Schools & education landscape",
        bullets: [
${mkBullets(spec.schools)}
        ],
      },
      {
        id: "hospitals",
        title: "Hospitals & healthcare access",
        bullets: [
${mkBullets(spec.hospitals)}
        ],
      },
      {
        id: "housing",
        title: "Housing character & cost pressures",
        bullets: [
${mkBullets(spec.housing)}
        ],
      },
      {
        id: "town-fit",
        title: "Which areas fit whom",
        bullets: [
${mkBullets(spec.townFit)}
        ],
      },
      {
        id: "jobs",
        title: "Jobs & commute patterns",
        bullets: [
${mkBullets(spec.jobs)}
        ],
      },
      {
        id: "lifestyle",
        title: "Lifestyle & practical livability",
        bullets: [
${mkBullets(spec.lifestyle)}
        ],
      },
    ],
  },
  resources: {
    title: "Useful ${esc(spec.countyName)} County resources",
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify ODOT household goods authority for in-state moves and FMCSA for interstate legs.',
    items: [
${resources}
    ],
  },
  directoryHint: "${esc(spec.directoryHint)}",
  lastReviewed: '2026-07-24',
});
`;
}

const outDir = join(process.cwd(), 'lib/local-movers/county-intelligence/oregon');
mkdirSync(outDir, { recursive: true });

for (const spec of specs) {
  const path = join(outDir, `${spec.slug}-or.ts`);
  writeFileSync(path, renderPack(spec), 'utf8');
  console.log('wrote', path);
}

console.log(`Generated ${specs.length} Oregon Tier-1 packs.`);

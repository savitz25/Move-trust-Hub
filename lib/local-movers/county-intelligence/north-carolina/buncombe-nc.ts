import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import { finalizeNcPack } from '@/lib/local-movers/county-intelligence/north-carolina/nc-shared';

/** Buncombe County, NC — Asheville mountain market (not Piedmont, not coastal). */
export const buncombeCountyNcIntelligence: CountyIntelligencePack = finalizeNcPack({
  countySlug: 'buncombe',
  hubTitle: 'Buncombe County Moving Intelligence Hub',
  eyebrow: 'Buncombe · Asheville mountain access, tourism & hills',
  h1: 'Moving in Buncombe County: Asheville Hills, Tourism Season & Mountain Access Logistics',
  heroOpener:
    'Buncombe County is a mountain-access market: Asheville downtown and West Asheville multi-unit product, steep driveways and switchback approaches, tourism-season curb competition, and I-40/I-26 tunnel approaches that punish estimates built for Piedmont freeways. A downtown Asheville loft, a Montford craftsman, a South Asheville HOA home, and a Weaverville-edge driveway do not share truck access or grade risk. This hub is for Buncombe — not Charlotte, not Wilmington humidity-only tips, and not a renamed Florida mountain fantasy.',
  heroCredibility:
    'NCUC household goods certificate (C-#) for intrastate NC moves · FMCSA for interstate · Asheville mountain access & tourism-season awareness · Curated listings',
  majorCorridors: 'I-40 · I-26 · US-19/23 · US-70 · Smoky Park Hwy · tunnel approaches',
  whatMakesDifferent: {
    title: 'What makes moving in Buncombe County different',
    intro: 'Mountain grades, tourism calendars, and tunnel approaches — not Piedmont beltways or coastal plain PCS markets.',
    bullets: [
      { title: 'Hills and driveways dominate labor hours', detail: 'Long carries, limited truck turn radius, and soft shoulders after rain are common outside flat-lot suburbs.' },
      { title: 'Tourism season rewrites curb access downtown', detail: 'Peak visitor weekends compete for staging near restaurants and hotels.' },
      { title: 'I-40 / I-26 tunnel approaches rewrite arrival time', detail: 'Crews delayed by mountain weather or incidents need honest buffer language.' },
      { title: 'Older near-core stock includes stairs and tight streets', detail: 'Montford and similar pockets are not elevator towers by default.' },
      { title: 'Buncombe is not Piedmont NC', detail: 'Do not price Asheville pairs like Charlotte I-485 hops.' },
      { title: 'Intrastate NC rules vs interstate authority', detail: 'In-state household moves generally need NCUC C-#. Interstate needs FMCSA.' },
    ],
  },
  zonesHeading: 'Buncombe access zones',
  zonesIntro: 'Plan by downtown/West Asheville, north slopes, south Asheville growth, east approaches, and rural mountain edges.',
  zones: [
    {
      id: 'asheville-core',
      name: 'Downtown Asheville & West Asheville',
      shortName: 'Downtown / West',
      neighborhoods: ['Downtown', 'West Asheville', 'River Arts District edges', 'Montford', 'Kenilworth'],
      housingTypes: 'Multi-unit, older SFH, lofts, hillside homes',
      challenges: ['Tourism curb competition', 'Stairs and tight streets', 'Limited legal truck staging'],
      moverTips: 'Prefer mid-week mornings off peak tourist days. Photo curb and stairs. Confirm multi-unit rules.',
      cityKeywords: ['asheville', 'west asheville', 'montford', 'downtown', 'river arts'],
    },
    {
      id: 'north-slopes',
      name: 'North Asheville slopes & Reynolda-adjacent patterns',
      shortName: 'North slopes',
      neighborhoods: ['North Asheville', 'Beaverdam edges', 'Grove Park edges', 'Hillside driveways'],
      housingTypes: 'Hillside SFH, some multi-family',
      challenges: ['Steep grades', 'Limited turn radius', 'Weather-sensitive surfaces'],
      moverTips: 'Survey grade and truck length. Discuss shuttle carries when full trucks cannot reach the door.',
      cityKeywords: ['north asheville', 'beaverdam', 'grove park'],
    },
    {
      id: 'south-asheville',
      name: 'South Asheville growth & HOA pockets',
      shortName: 'South Asheville',
      neighborhoods: ['South Asheville', 'Biltmore Park edges', 'Airport Road multi-family', 'Arden edges'],
      housingTypes: 'HOA SFH, multi-family, townhomes',
      challenges: ['HOA rules', 'I-26 / airport-area congestion', 'Longer empty miles from downtown yards'],
      moverTips: 'Collect HOA packets. Build I-26 buffer. Prefer early starts.',
      cityKeywords: ['south asheville', 'biltmore', 'arden', 'airport road'],
    },
    {
      id: 'east-rural',
      name: 'East approaches & rural mountain edges',
      shortName: 'East / rural edge',
      neighborhoods: ['Swannanoa edges', 'Black Mountain edges (verify county)', 'US-70 corridors', 'Rural mountain lots'],
      housingTypes: 'SFH, rural-edge lots, limited multi-family',
      challenges: ['Long empty miles', 'Weather closures risk', 'Narrow approaches'],
      moverTips: 'Share approach videos. Build weather delay language. Clarify Buncombe vs neighboring counties.',
      cityKeywords: ['swannanoa', 'black mountain', 'us-70', 'east asheville'],
    },
  ],
  costDrivers: {
    title: 'What drives Buncombe moving costs',
    intro: 'Grade access, tourism curb friction, and mountain empty miles drive quotes.',
    drivers: [
      { title: 'Hillside long carries', detail: 'Labor hours rise when trucks cannot park at the door.' },
      { title: 'Tourism-season staging limits', detail: 'Peak weekends raise time risk downtown.' },
      { title: 'I-40 / I-26 approach delays', detail: 'Portal time includes mountain corridor uncertainty.' },
      { title: 'Weather contingency', detail: 'Ice, fog, and storms can force reschedules.' },
    ],
    ranges: [
      { label: 'Studio / 1BR (simple access)', value: '$450–$1,400+', note: 'Higher with stairs or hills' },
      { label: '2–3BR hillside or modest SFH', value: '$1,400–$4,000+', note: 'Grade access trends up' },
      { label: '3–4+ BR / mountain approach / long local', value: '$2,500–$7,500+', note: 'Hillside estates and weather risk price highest' },
      { label: 'Typical 2-person crew rate', value: '$110–$185+/hr', note: 'Portal-to-portal' },
    ],
  },
  seasonal: {
    title: 'When to schedule a Buncombe move',
    intro: 'Tourism peaks, leaf season, and winter weather reshape access more than Piedmont lease calendars alone.',
    items: [
      { title: 'Best windows: mid-week off-peak tourism mornings', detail: 'Clear curb downtown and reduce visitor traffic.' },
      { title: 'Leaf / peak tourism seasons', detail: 'Book early; expect curb and lodging-adjacent congestion.' },
      { title: 'Winter weather risk', detail: 'Ice and mountain fog can delay I-40/I-26 arrivals — confirm contingency language.' },
      { title: 'Summer storms and humidity', detail: 'Prefer early starts; protect open carries.' },
    ],
  },
  specialized: [
    {
      id: 'asheville-mountain-access',
      title: 'Asheville mountain access & tourism module',
      intro: 'Buncombe estimates fail when grade and tourism curb rules are ignored.',
      bullets: [
        'Survey driveway grade, turn radius, and shuttle needs before final pricing.',
        'Prefer mid-week off-peak windows downtown.',
        'Build I-40/I-26 tunnel approach buffer.',
        'Confirm weather contingency for mountain arrivals.',
        'Verify NCUC C-# in-state and FMCSA interstate.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Buncombe County?',
    intro: 'Practical fit checklist — verify on official sources. No invented rankings.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & education landscape',
        bullets: [
          { title: 'How districts work here', detail: 'Asheville City Schools and Buncombe County Schools serve different addresses. Confirm zoning carefully.' },
          { title: 'Mountain geography', detail: 'Commute times to campuses can be grade- and weather-sensitive. Test drive peak routes.' },
          { title: 'Research sources', detail: 'District tools, NCDPI data, and campus visits beat ranking screenshots.' },
        ],
      },
      {
        id: 'hospitals',
        title: 'Hospitals & healthcare access',
        bullets: [
          { title: 'Major systems', detail: 'Mission Health / HCA and other facilities serve Asheville corridors. Confirm networks.' },
          { title: 'What relocators should do', detail: 'Map peak-hour and weather-affected drive times from outer mountain addresses. Transfer records early.' },
        ],
      },
      {
        id: 'housing',
        title: 'Housing character & cost pressures',
        bullets: [
          { title: 'Hillside and near-core stock', detail: 'Expect grades, stairs, and limited parking near popular neighborhoods.' },
          { title: 'Tourism influence', detail: 'Short-term rental dynamics can affect some corridors; read HOA and city rules carefully.' },
          { title: 'Cost variation', detail: 'Prices vary by view, grade, and proximity to downtown. Budget access complexity on move day.' },
        ],
      },
      {
        id: 'town-fit',
        title: 'Which Buncombe areas fit whom',
        bullets: [
          { title: 'Downtown / West Asheville lifestyle', detail: 'Urban amenities with curb and stair tradeoffs.' },
          { title: 'North slope pattern', detail: 'Hillside living with driveway and shuttle logistics.' },
          { title: 'South Asheville growth', detail: 'HOA multi-family and SFH with I-26 commute risk.' },
        ],
      },
      {
        id: 'jobs',
        title: 'Jobs & commute patterns',
        bullets: [
          { title: 'Employment anchors', detail: 'Healthcare, tourism/hospitality, education, professional services, and outdoor economy jobs shape employment.' },
          { title: 'Commute realism', detail: 'Mountain roads and I-40/I-26 peaks matter. Test drive in weather.' },
        ],
      },
      {
        id: 'lifestyle',
        title: 'Lifestyle & practical livability',
        bullets: [
          { title: 'Mountain-city identity', detail: 'Buncombe is distinct from Piedmont metros and coastal plain markets.' },
          { title: 'Climate', detail: 'Four seasons with winter mountain risk and summer storms. Plan accordingly.' },
          { title: 'Tourism pace', detail: 'Peak visitor seasons change downtown feel. Visit peak and off-peak.' },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Buncombe resources',
    intro: 'Official links first. Verify NCUC in-state and FMCSA interstate.',
    items: [
      { label: 'Buncombe County — official site', href: 'https://www.buncombecounty.org/', external: true },
      { label: 'City of Asheville', href: 'https://www.ashevillenc.gov/', external: true },
      { label: 'Buncombe County Schools', href: 'https://www.buncombe.k12.nc.us/', external: true },
      { label: 'Asheville City Schools', href: 'https://www.ashevillecityschools.net/', external: true },
      { label: 'NCDOT traffic / 511', href: 'https://drivenc.gov/', external: true },
    ],
  },
  directoryHint:
    'Prefer mountain-grade and hillside experience; tourism-season curb awareness downtown; honest I-40/I-26 buffer language. Verify NCUC C-# and FMCSA.',
  lastReviewed: '2026-07-23',
});

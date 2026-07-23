import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import { finalizeNcPack } from '@/lib/local-movers/county-intelligence/north-carolina/nc-shared';

/** Union County, NC — south Charlotte overflow (not Mecklenburg clone). */
export const unionCountyNcIntelligence: CountyIntelligencePack = finalizeNcPack({
  countySlug: 'union',
  hubTitle: 'Union County Moving Intelligence Hub',
  eyebrow: 'Union · South Charlotte overflow, HOA growth & longer suburban access',
  h1: 'Moving in Union County: South Charlotte Overflow, HOA Villages & US-74 Logistics',
  heroOpener:
    'Union County is Charlotte’s south/southeast overflow market: master-planned HOA density, longer empty miles from Uptown yards, US-74 and I-485 link congestion, and towns like Monroe, Indian Trail, and Weddington that are not South End loft logistics. A Wesley Chapel HOA two-story, a Monroe multi-family unit, a Waxhaw growth tract, and a rural-edge lot do not share truck access or portal time. This hub is for Union — not a renamed Mecklenburg page with different suburbs.',
  heroCredibility:
    'NCUC household goods certificate (C-#) for intrastate NC moves · FMCSA for interstate · South Charlotte HOA & longer-haul awareness · Curated listings',
  majorCorridors: 'US-74 · I-485 links · NC-16 · NC-84 · Providence Road corridor',
  whatMakesDifferent: {
    title: 'What makes moving in Union County different',
    intro: 'HOA growth and longer suburban access from Charlotte core — not Uptown elevators as the default product.',
    bullets: [
      { title: 'Master-planned HOAs dominate many addresses', detail: 'Gate lists, COI, truck limits, and approved hours are routine.' },
      { title: 'Empty miles from Charlotte yards are real', detail: 'Even “local” Union pairs can price as distance work for center-city based crews.' },
      { title: 'US-74 and I-485 links define portal time', detail: 'Cross-county Mecklenburg jobs burn clock at peak.' },
      { title: 'Town centers differ from pure bedroom tracts', detail: 'Monroe and older pockets can mean tighter streets than brand-new HOA villages.' },
      { title: 'Union is not Mecklenburg', detail: 'Less vertical product; more driveway HOA logistics. Do not reuse Uptown tower copy.' },
      { title: 'Intrastate NC rules vs interstate authority', detail: 'In-state household moves generally need NCUC C-#. Interstate needs FMCSA.' },
    ],
  },
  zonesHeading: 'Union access zones',
  zonesIntro: 'Plan by Indian Trail/Wesley Chapel growth, Waxhaw/Weddington edges, Monroe core, and eastern rural approaches.',
  zones: [
    {
      id: 'indian-trail-wesley',
      name: 'Indian Trail, Wesley Chapel & northwest growth',
      shortName: 'NW growth',
      neighborhoods: ['Indian Trail', 'Wesley Chapel', 'Stallings edges', 'HOA master plans'],
      housingTypes: 'HOA SFH, townhomes, multi-family',
      challenges: ['Dense HOA rules', 'I-485 link congestion', 'Long cul-de-sac carries'],
      moverTips: 'Collect HOA packets first. Price Mecklenburg-linked pairs honestly. Share gate photos.',
      cityKeywords: ['indian trail', 'wesley chapel', 'stallings'],
    },
    {
      id: 'waxhaw-weddington',
      name: 'Waxhaw, Weddington & south/west edges',
      shortName: 'SW edges',
      neighborhoods: ['Waxhaw', 'Weddington', 'Marvin edges', 'Providence Road corridor'],
      housingTypes: 'HOA SFH, larger lots, some multi-family',
      challenges: ['Longer empty miles', 'HOA rules', 'NC-16 / Providence congestion'],
      moverTips: 'Prefer early starts. Survey driveway depth. Clarify Union vs Mecklenburg addresses.',
      cityKeywords: ['waxhaw', 'weddington', 'marvin', 'providence'],
    },
    {
      id: 'monroe-core',
      name: 'Monroe core & central Union',
      shortName: 'Monroe',
      neighborhoods: ['Monroe', 'Downtown Monroe edges', 'Central multi-family', 'Older SFH pockets'],
      housingTypes: 'Older SFH, multi-family, townhomes',
      challenges: ['Mixed access types', 'US-74 congestion', 'Tighter older streets'],
      moverTips: 'Photo curb for older blocks. Confirm elevator vs stair access on multi-family.',
      cityKeywords: ['monroe', 'union county'],
    },
    {
      id: 'east-rural',
      name: 'Eastern Union rural-edge growth',
      shortName: 'East / rural edge',
      neighborhoods: ['Marshville edges', 'Eastern tracts', 'Rural driveway lots'],
      housingTypes: 'SFH, rural-edge lots',
      challenges: ['Long empty miles', 'Soft surfaces after rain', 'Limited alternate routes'],
      moverTips: 'Survey truck access. Prefer early starts for long east-county pairs.',
      cityKeywords: ['marshville', 'east union', 'rural'],
    },
  ],
  costDrivers: {
    title: 'What drives Union moving costs',
    intro: 'HOA soft costs and Charlotte-linked empty miles drive quotes more than square footage alone.',
    drivers: [
      { title: 'HOA gate lists and approved hours', detail: 'Soft costs and peak-window pressure.' },
      { title: 'Empty miles from Charlotte yards', detail: 'Distance work disguised as “local.”' },
      { title: 'US-74 / I-485 link congestion', detail: 'Portal-to-portal spikes at peak.' },
      { title: 'Long cul-de-sac carries', detail: 'Labor hours rise on new master plans.' },
    ],
    ranges: [
      { label: 'Studio / 1BR (simple access)', value: '$450–$1,300+', note: 'Higher with HOA soft costs' },
      { label: '2–3BR HOA SFH or multi-family', value: '$1,400–$3,800+', note: 'Distance from Charlotte trends up' },
      { label: '3–4+ BR / long Charlotte-linked', value: '$2,500–$7,000+', note: 'Cross-county pairs price highest' },
      { label: 'Typical 2-person crew rate', value: '$110–$180+/hr', note: 'Portal-to-portal' },
    ],
  },
  seasonal: {
    title: 'When to schedule a Union move',
    intro: 'Family seasons and Charlotte-metro demand spillover reshape calendars.',
    items: [
      { title: 'Best windows: mid-week early mornings', detail: 'Reduce US-74/I-485 pain and clear HOA-approved hours.' },
      { title: 'Peak family season: late May–mid-August', detail: 'Book suburban Saturdays early.' },
      { title: 'Month-end multi-family turns', detail: 'Lease clusters fill crews in growth corridors.' },
      { title: 'Summer heat and storms', detail: 'Prefer early starts on open suburban streets.' },
    ],
  },
  specialized: [
    {
      id: 'south-charlotte-hoa-overflow',
      title: 'South Charlotte HOA overflow module',
      intro: 'Union estimates fail when HOA rules and Charlotte empty miles are ignored.',
      bullets: [
        'Collect HOA COI, gate lists, and truck limits before surveys finalize.',
        'Price Mecklenburg-linked pairs as logistics days.',
        'Share driveway and cul-de-sac photos for new villages.',
        'Clarify Union vs Mecklenburg addresses on every estimate.',
        'Verify NCUC C-# in-state and FMCSA interstate.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Union County?',
    intro: 'Practical fit checklist — verify on official sources. No invented rankings.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & education landscape',
        bullets: [
          { title: 'How districts work here', detail: 'Union County Public Schools is the primary public K–12 system. Assignment is address-based.' },
          { title: 'Growth areas and capacity', detail: 'Northwest growth corridors can see enrollment pressure. Ask about capacity when touring.' },
          { title: 'Research sources', detail: 'District tools, NCDPI data, and campus visits beat ranking screenshots.' },
        ],
      },
      {
        id: 'hospitals',
        title: 'Hospitals & healthcare access',
        bullets: [
          { title: 'Major systems', detail: 'Atrium Health Union and Charlotte-metro systems serve residents. Confirm networks and drive times.' },
          { title: 'What relocators should do', detail: 'Map peak-hour times into Mecklenburg specialty care. Transfer records early.' },
        ],
      },
      {
        id: 'housing',
        title: 'Housing character & cost pressures',
        bullets: [
          { title: 'HOA growth product', detail: 'Many addresses are master-planned with dues and move-day rules.' },
          { title: 'Cost variation', detail: 'Northwest edges often price closer to Charlotte spillover; eastern areas differ.' },
          { title: 'Commute tradeoffs', detail: 'Home price savings can be offset by longer Charlotte job commutes.' },
        ],
      },
      {
        id: 'town-fit',
        title: 'Which Union areas fit whom',
        bullets: [
          { title: 'Northwest growth lifestyle', detail: 'Newer HOA product with Charlotte access and freeway risk.' },
          { title: 'Waxhaw / Weddington pattern', detail: 'Larger-lot and family amenities with longer empty-mile logistics.' },
          { title: 'Monroe core pattern', detail: 'More mixed older stock and town-center access.' },
        ],
      },
      {
        id: 'jobs',
        title: 'Jobs & commute patterns',
        bullets: [
          { title: 'Employment anchors', detail: 'Many residents commute into Mecklenburg; local retail, education, healthcare, and services also employ residents.' },
          { title: 'Commute realism', detail: 'US-74 and I-485 peaks are real. Test drive peak routes into Charlotte.' },
        ],
      },
      {
        id: 'lifestyle',
        title: 'Lifestyle & practical livability',
        bullets: [
          { title: 'South Charlotte overflow identity', detail: 'Union is suburban growth adjacent to Charlotte — not Uptown vertical living.' },
          { title: 'Climate', detail: 'Hot humid summers and storms. Plan outdoor staging contingency.' },
          { title: 'Pace', detail: 'Family-suburban feel dominates many corridors. Visit peak commute hours.' },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Union resources',
    intro: 'Official links first. Verify NCUC in-state and FMCSA interstate.',
    items: [
      { label: 'Union County — official site', href: 'https://www.unioncountync.gov/', external: true },
      { label: 'City of Monroe', href: 'https://www.monroenc.org/', external: true },
      { label: 'Union County Public Schools', href: 'https://www.ucps.k12.nc.us/', external: true },
      { label: 'NCDOT traffic / 511', href: 'https://drivenc.gov/', external: true },
    ],
  },
  directoryHint:
    'Prefer HOA fluency for master-planned villages; honest empty-mile pricing from Charlotte yards; US-74/I-485 buffer language. Verify NCUC C-# and FMCSA.',
  lastReviewed: '2026-07-23',
});

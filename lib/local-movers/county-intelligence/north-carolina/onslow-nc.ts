import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import { finalizeNcPack } from '@/lib/local-movers/county-intelligence/north-carolina/nc-shared';

/** Onslow County, NC — Jacksonville + Camp Lejeune PCS (Marines), not Fort Liberty. */
export const onslowCountyNcIntelligence: CountyIntelligencePack = finalizeNcPack({
  countySlug: 'onslow',
  hubTitle: 'Onslow County Moving Intelligence Hub',
  eyebrow: 'Onslow · Jacksonville, Camp Lejeune PCS & coastal plain logistics',
  h1: 'Moving in Onslow County: Camp Lejeune PCS, Jacksonville Access & Coastal Plain Logistics',
  heroOpener:
    'Onslow County is a Marine Corps PCS market on the coastal plain: Camp Lejeune and related installation access reshape housing turnover in Jacksonville; multi-family corridors along Western and Lejeune boulevards absorb order-driven demand; and humidity, storms, and longer coastal-plain empty miles differ from Piedmont freeways. A base-adjacent apartment, a Jacksonville multi-family unit, a Hubert-edge rental, and a rural-edge house do not share truck access or report-date pressure. This hub is for Onslow — not Fayetteville/Fort Liberty copy, and not Wilmington beach-tourism logistics.',
  heroCredibility:
    'NCUC household goods certificate (C-#) for intrastate NC moves · FMCSA for interstate · Camp Lejeune PCS & coastal plain awareness · Curated listings',
  majorCorridors: 'US-17 · NC-24 · Western Boulevard · Lejeune Boulevard · base-access roads',
  whatMakesDifferent: {
    title: 'What makes moving in Onslow County different',
    intro: 'Marine installation PCS calendars and coastal-plain access — not Army Cumberland patterns or Charlotte beltways.',
    bullets: [
      { title: 'Camp Lejeune PCS orders compress calendars', detail: 'Report dates drive surveys and load days more than civilian weekend preference.' },
      { title: 'Jacksonville multi-family corridors turn over quickly', detail: 'Elevators, parking, and month-end clusters stack around training and permanent-change cycles.' },
      { title: 'US-17 and NC-24 are the spine, not an interstate grid', detail: 'Portal time is real even without I-77-scale freeways; empty miles still matter.' },
      { title: 'Coastal plain humidity and storm risk affect staging', detail: 'Protect cardboard and electronics; confirm weather contingency language.' },
      { title: 'Onslow is not Cumberland', detail: 'Marine base access and Jacksonville geography differ from Fort Liberty/Fayetteville. Do not reuse Bragg copy.' },
      { title: 'Intrastate NC rules vs interstate authority', detail: 'In-state household moves generally need NCUC C-#. Interstate PCS needs FMCSA.' },
    ],
  },
  zonesHeading: 'Onslow access zones',
  zonesIntro: 'Plan by base-adjacent Jacksonville multi-family, central Jacksonville, coastal-edge communities, and inland rural edges.',
  zones: [
    {
      id: 'base-adjacent-jax',
      name: 'Camp Lejeune–adjacent multi-family',
      shortName: 'Base-adjacent',
      neighborhoods: ['Lejeune Boulevard corridors', 'Western Boulevard multi-family', 'Base housing-adjacent rentals', 'Piney Green edges'],
      housingTypes: 'Multi-family, townhomes, military-workforce rentals',
      challenges: ['PCS lease-end waves', 'Access/ID rules', 'Tight parking'],
      moverTips: 'Confirm access requirements early. Align to order dates. Photo elevators and parking.',
      cityKeywords: ['camp lejeune', 'lejeune', 'jacksonville', 'western boulevard', 'piney green'],
    },
    {
      id: 'central-jacksonville',
      name: 'Central Jacksonville corridors',
      shortName: 'Central Jacksonville',
      neighborhoods: ['Central Jacksonville', 'Gum Branch edges', 'Retail corridor multi-family', 'Older SFH pockets'],
      housingTypes: 'Multi-family, SFH, townhomes',
      challenges: ['Arterial congestion', 'Mixed access types', 'Month-end turnover'],
      moverTips: 'Prefer mid-week early starts when orders allow. Confirm unit access type.',
      cityKeywords: ['jacksonville', 'gum branch', 'onslow'],
    },
    {
      id: 'coastal-edge',
      name: 'Coastal-edge & beach-adjacent approaches',
      shortName: 'Coastal edge',
      neighborhoods: ['Swansboro edges', 'Hubert', 'Sneads Ferry edges', 'Coastal plain multi-family'],
      housingTypes: 'SFH, multi-family, vacation-adjacent rentals',
      challenges: ['Longer empty miles', 'Storm and humidity risk', 'Seasonal traffic pulses'],
      moverTips: 'Share access photos. Build weather contingency. Do not price as Wilmington tourism product without surveying.',
      cityKeywords: ['swansboro', 'hubert', 'sneads ferry', 'coastal'],
    },
    {
      id: 'inland-rural',
      name: 'Inland & rural-edge Onslow',
      shortName: 'Inland / rural edge',
      neighborhoods: ['Richlands edges', 'Inland tracts', 'Rural driveway lots'],
      housingTypes: 'SFH, rural-edge lots, limited multi-family',
      challenges: ['Long empty miles', 'Soft surfaces after rain', 'Limited alternate routes'],
      moverTips: 'Survey driveway and truck turn radius. Prefer early starts for long inland pairs.',
      cityKeywords: ['richlands', 'inland', 'rural onslow'],
    },
  ],
  costDrivers: {
    title: 'What drives Onslow moving costs',
    intro: 'PCS timing, multi-family access, and coastal-plain empty miles drive quotes.',
    drivers: [
      { title: 'Compressed PCS timelines', detail: 'Rush calendars raise peak pricing risk.' },
      { title: 'Multi-family elevators and parking', detail: 'Base-adjacent apartments add labor and wait time.' },
      { title: 'US-17 / NC-24 distance', detail: 'Portal-to-portal time still matters without an interstate lattice.' },
      { title: 'Humidity and storm contingency', detail: 'Protection and reschedule language affect total cost risk.' },
    ],
    ranges: [
      { label: 'Studio / 1BR (simple access)', value: '$400–$1,200+', note: 'Higher near base multi-family peaks' },
      { label: '2–3BR apartment or modest SFH', value: '$1,150–$3,400+', note: 'PCS rush windows trend up' },
      { label: '3–4+ BR / long local / interstate start', value: '$2,100–$7,200+', note: 'Interstate PCS legs are full household goods jobs' },
      { label: 'Typical 2-person crew rate', value: '$100–$170+/hr', note: 'Portal-to-portal for local legs' },
    ],
  },
  seasonal: {
    title: 'When to schedule an Onslow move',
    intro: 'Marine PCS seasons and storm risk stack demand differently than Piedmont metros.',
    items: [
      { title: 'PCS peak seasons', detail: 'High-volume windows fill crews first. Book to order dates immediately.' },
      { title: 'Best flexible windows: mid-week early mornings', detail: 'Reduce arterial pain when orders allow.' },
      { title: 'Hurricane season awareness', detail: 'Late summer–fall storm risk; confirm contingency language.' },
      { title: 'Humidity year-round logistics', detail: 'Protect cardboard and electronics on open carries.' },
    ],
  },
  specialized: [
    {
      id: 'camp-lejeune-pcs',
      title: 'Camp Lejeune PCS & coastal plain module',
      intro: 'Onslow estimates fail when Marine report dates or coastal-plain access are ignored.',
      bullets: [
        'Align survey, pack, and delivery to PCS timelines.',
        'Confirm base-adjacent access rules and IDs early.',
        'Price US-17 and NC-24 pairs portal-to-portal.',
        'Build humidity/storm contingency into outdoor staging plans.',
        'Verify NCUC C-# for in-state-only legs and FMCSA for interstate PCS.',
        'Do not reuse Fort Liberty/Fayetteville assumptions here.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Onslow County?',
    intro: 'Practical fit checklist for military and civilian households — verify on official sources.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & education landscape',
        bullets: [
          { title: 'How districts work here', detail: 'Onslow County Schools is the primary public K–12 system. Assignment is address-based; military families should confirm zoning for off-base housing.' },
          { title: 'Turnover and capacity', detail: 'Military mobility can affect enrollment. Ask about calendars and capacity when touring.' },
          { title: 'Research sources', detail: 'District tools, NCDPI data, and school visits beat ranking screenshots.' },
        ],
      },
      {
        id: 'hospitals',
        title: 'Hospitals & healthcare access',
        bullets: [
          { title: 'Major systems', detail: 'Onslow Memorial and other facilities serve Jacksonville corridors; military beneficiaries also navigate TRICARE networks. Confirm coverage.' },
          { title: 'What relocators should do', detail: 'Map drive times from base-adjacent housing. Transfer records early.' },
        ],
      },
      {
        id: 'housing',
        title: 'Housing character & cost pressures',
        bullets: [
          { title: 'Base-adjacent multi-family density', detail: 'High turnover product near major boulevards.' },
          { title: 'Coastal-edge and inland contrast', detail: 'Humidity/storm risk near coast; longer empty miles inland.' },
          { title: 'Military housing decisions', detail: 'On-base vs off-base choices change access rules and commute patterns.' },
        ],
      },
      {
        id: 'town-fit',
        title: 'Which Onslow areas fit whom',
        bullets: [
          { title: 'Base-adjacent convenience', detail: 'Short commute with multi-family move-day logistics.' },
          { title: 'Central Jacksonville pattern', detail: 'Retail corridors and mixed stock with arterial congestion.' },
          { title: 'Coastal-edge pattern', detail: 'Different humidity and seasonal traffic profile than inland tracts.' },
        ],
      },
      {
        id: 'jobs',
        title: 'Jobs & commute patterns',
        bullets: [
          { title: 'Employment anchors', detail: 'Marine installation, healthcare, retail, education, and coastal services shape employment.' },
          { title: 'Commute realism', detail: 'US-17, NC-24, Western, and Lejeune boulevards peak are real. Test drive peak routes.' },
        ],
      },
      {
        id: 'lifestyle',
        title: 'Lifestyle & practical livability',
        bullets: [
          { title: 'Marine-community identity', detail: 'Onslow rhythms follow installation calendars and coastal plain geography.' },
          { title: 'Climate', detail: 'Hot humid summers, storms, and hurricane-season risk. Plan staging contingency.' },
          { title: 'Pace', detail: 'PCS seasons feel busier. Visit peak and off-peak when choosing housing.' },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Onslow resources',
    intro: 'Official links first. Verify NCUC in-state and FMCSA interstate.',
    items: [
      { label: 'Onslow County — official site', href: 'https://www.onslowcountync.gov/', external: true },
      { label: 'City of Jacksonville', href: 'https://www.jacksonvillenc.gov/', external: true },
      { label: 'Onslow County Schools', href: 'https://www.onslow.k12.nc.us/', external: true },
      { label: 'Marine Corps Base Camp Lejeune', href: 'https://www.lejeune.marines.mil/', external: true, note: 'Installation information; confirm access rules for contractors' },
      { label: 'NCDOT traffic / 511', href: 'https://drivenc.gov/', external: true },
    ],
  },
  directoryHint:
    'Prefer PCS-fluent crews for Camp Lejeune timelines; multi-family experience on Western/Lejeune corridors; coastal humidity/storm awareness. Verify NCUC C-# and FMCSA for the correct move type.',
  lastReviewed: '2026-07-23',
});

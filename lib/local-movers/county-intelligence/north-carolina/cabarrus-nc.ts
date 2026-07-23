import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import { finalizeNcPack } from '@/lib/local-movers/county-intelligence/north-carolina/nc-shared';

/** Cabarrus County, NC — Concord/Kannapolis NE Charlotte corridor (not Mecklenburg clone). */
export const cabarrusCountyNcIntelligence: CountyIntelligencePack = finalizeNcPack({
  countySlug: 'cabarrus',
  hubTitle: 'Cabarrus County Moving Intelligence Hub',
  eyebrow: 'Cabarrus · Concord, Kannapolis & Charlotte NE corridor',
  h1: 'Moving in Cabarrus County: Concord Growth, Kannapolis Revitalization & I-85 Logistics',
  heroOpener:
    'Cabarrus County is Charlotte’s northeast growth corridor: Concord multi-family and HOA rings, Kannapolis revitalization stock, I-85 portal time into Mecklenburg, and event/retail traffic pulses near major venues and Concord Mills that are not South End elevator jobs. A Concord HOA two-story, a Kannapolis multi-family unit, a Harrisburg-edge townhome, and a Midland rural-edge house do not share truck access or timing risk. This hub is for Cabarrus — not a renamed Mecklenburg Uptown guide.',
  heroCredibility:
    'NCUC household goods certificate (C-#) for intrastate NC moves · FMCSA for interstate · I-85 NE corridor & venue-traffic awareness · Curated listings',
  majorCorridors: 'I-85 · US-29 · Concord Mills Blvd · NC-49 · NC-73',
  whatMakesDifferent: {
    title: 'What makes moving in Cabarrus County different',
    intro: 'Northeast Charlotte spillover with venue/retail pulses — not Uptown towers or Union south-side HOA patterns alone.',
    bullets: [
      { title: 'I-85 defines Charlotte-linked portal time', detail: 'Cross-county pairs look local on maps and regional at peak.' },
      { title: 'HOA growth product is common in Concord corridors', detail: 'Gate lists and approved hours are routine.' },
      { title: 'Event and retail traffic pulses matter near major venues and Concord Mills', detail: 'Load windows can collide with event calendars — ask crews how they plan around peaks.' },
      { title: 'Kannapolis stock can differ from brand-new Concord HOAs', detail: 'Older and revitalizing multi-unit needs different access surveys.' },
      { title: 'Cabarrus is not Mecklenburg', detail: 'Less vertical core product; more I-85 suburban logistics.' },
      { title: 'Intrastate NC rules vs interstate authority', detail: 'In-state household moves generally need NCUC C-#. Interstate needs FMCSA.' },
    ],
  },
  zonesHeading: 'Cabarrus access zones',
  zonesIntro: 'Plan by Concord growth, Kannapolis core, Harrisburg edges, and eastern/rural approaches.',
  zones: [
    {
      id: 'concord-growth',
      name: 'Concord multi-family & HOA growth',
      shortName: 'Concord growth',
      neighborhoods: ['Concord', 'Concord Mills edges', 'NC-49 multi-family', 'HOA master plans'],
      housingTypes: 'HOA SFH, townhomes, multi-family',
      challenges: ['HOA rules', 'I-85 / Concord Mills congestion', 'Event-day traffic pulses'],
      moverTips: 'Collect HOA packets. Avoid major event peaks when flexible. Build I-85 buffer.',
      cityKeywords: ['concord', 'concord mills', 'cabarrus'],
    },
    {
      id: 'kannapolis',
      name: 'Kannapolis revitalization & multi-unit',
      shortName: 'Kannapolis',
      neighborhoods: ['Kannapolis', 'Downtown Kannapolis edges', 'Research campus-adjacent multi-family', 'Older SFH pockets'],
      housingTypes: 'Multi-family, older SFH, townhomes',
      challenges: ['Mixed access types', 'US-29 congestion', 'Elevator vs stair variety'],
      moverTips: 'Confirm unit access type. Photo curb for older blocks. Prefer mid-week mornings.',
      cityKeywords: ['kannapolis', 'north cabarrus'],
    },
    {
      id: 'harrisburg-edge',
      name: 'Harrisburg & southwest Cabarrus edges',
      shortName: 'Harrisburg edge',
      neighborhoods: ['Harrisburg', 'I-485 approach edges', 'Southwest HOA villages'],
      housingTypes: 'HOA SFH, townhomes, multi-family',
      challenges: ['Mecklenburg-linked congestion', 'HOA rules', 'Longer empty miles to eastern Cabarrus'],
      moverTips: 'Clarify Cabarrus vs Mecklenburg addresses. Price cross-county pairs honestly.',
      cityKeywords: ['harrisburg', 'southwest cabarrus'],
    },
    {
      id: 'east-rural',
      name: 'Eastern Cabarrus & Midland edges',
      shortName: 'East / Midland',
      neighborhoods: ['Midland', 'Eastern tracts', 'Rural driveway lots'],
      housingTypes: 'SFH, rural-edge lots',
      challenges: ['Long empty miles', 'Limited alternate routes', 'Soft surfaces after rain'],
      moverTips: 'Survey driveway access. Prefer early starts for long east-county pairs.',
      cityKeywords: ['midland', 'east cabarrus', 'rural'],
    },
  ],
  costDrivers: {
    title: 'What drives Cabarrus moving costs',
    intro: 'I-85 empty miles, HOA soft costs, and event-day timing drive quotes.',
    drivers: [
      { title: 'I-85 Charlotte-linked congestion', detail: 'Portal-to-portal spikes at peak.' },
      { title: 'HOA gate lists and approved hours', detail: 'Soft costs push demand into peak windows.' },
      { title: 'Venue / retail traffic pulses', detail: 'Load windows can collide with major events.' },
      { title: 'Cross-county empty miles', detail: 'Mecklenburg destinations raise staging distance.' },
    ],
    ranges: [
      { label: 'Studio / 1BR (simple access)', value: '$450–$1,300+', note: 'Higher with HOA soft costs' },
      { label: '2–3BR HOA SFH or multi-family', value: '$1,350–$3,700+', note: 'I-85 pairs trend up' },
      { label: '3–4+ BR / long Charlotte-linked', value: '$2,400–$6,900+', note: 'Cross-county pairs price highest' },
      { label: 'Typical 2-person crew rate', value: '$110–$180+/hr', note: 'Portal-to-portal' },
    ],
  },
  seasonal: {
    title: 'When to schedule a Cabarrus move',
    intro: 'Family seasons, multi-family turns, and major event calendars reshape access.',
    items: [
      { title: 'Best windows: mid-week early mornings', detail: 'Reduce I-85 pain and clear HOA hours.' },
      { title: 'Avoid major event peaks when flexible', detail: 'Venue and retail corridors can lock curb access.' },
      { title: 'Peak family season: late May–mid-August', detail: 'Book suburban Saturdays early.' },
      { title: 'Summer heat and storms', detail: 'Prefer early starts on open suburban streets.' },
    ],
  },
  specialized: [
    {
      id: 'cabarrus-i85-venue',
      title: 'I-85 NE corridor & venue-traffic module',
      intro: 'Cabarrus estimates fail when event pulses or Charlotte empty miles are ignored.',
      bullets: [
        'Ask about event calendars near major venues when load dates are flexible.',
        'Collect HOA packets for Concord growth product.',
        'Price I-85 Mecklenburg pairs portal-to-portal.',
        'Clarify Cabarrus vs Mecklenburg addresses.',
        'Verify NCUC C-# in-state and FMCSA interstate.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Cabarrus County?',
    intro: 'Practical fit checklist — verify on official sources. No invented rankings.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & education landscape',
        bullets: [
          { title: 'How districts work here', detail: 'Cabarrus County Schools and Kannapolis City Schools serve different addresses. Confirm zoning carefully.' },
          { title: 'Growth areas', detail: 'Concord corridors can see enrollment pressure. Ask about capacity when touring.' },
          { title: 'Research sources', detail: 'District tools, NCDPI data, and campus visits beat ranking screenshots.' },
        ],
      },
      {
        id: 'hospitals',
        title: 'Hospitals & healthcare access',
        bullets: [
          { title: 'Major systems', detail: 'Atrium Health Cabarrus and Charlotte-metro systems serve residents. Confirm networks.' },
          { title: 'What relocators should do', detail: 'Map peak-hour I-85 times into Mecklenburg specialty care. Transfer records early.' },
        ],
      },
      {
        id: 'housing',
        title: 'Housing character & cost pressures',
        bullets: [
          { title: 'Growth HOA product vs revitalizing stock', detail: 'Concord master plans differ from older/revitalizing Kannapolis multi-unit.' },
          { title: 'Cost variation', detail: 'Southwest edges may price closer to Charlotte spillover.' },
          { title: 'HOA governance', detail: 'Many communities control move hours and truck size.' },
        ],
      },
      {
        id: 'town-fit',
        title: 'Which Cabarrus areas fit whom',
        bullets: [
          { title: 'Concord growth lifestyle', detail: 'Newer HOA product with I-85 commute risk.' },
          { title: 'Kannapolis pattern', detail: 'Revitalizing multi-unit and mixed stock with different access surveys.' },
          { title: 'Harrisburg edge pattern', detail: 'Closer Mecklenburg access with cross-county logistics on move day.' },
        ],
      },
      {
        id: 'jobs',
        title: 'Jobs & commute patterns',
        bullets: [
          { title: 'Employment anchors', detail: 'Many residents commute into Mecklenburg; local healthcare, retail, manufacturing, and services also employ residents.' },
          { title: 'Commute realism', detail: 'I-85 peaks are real. Test drive peak routes into Charlotte.' },
        ],
      },
      {
        id: 'lifestyle',
        title: 'Lifestyle & practical livability',
        bullets: [
          { title: 'NE Charlotte corridor identity', detail: 'Cabarrus is I-85 growth adjacent to Charlotte — not Uptown vertical living.' },
          { title: 'Climate', detail: 'Hot humid summers and storms. Plan outdoor staging contingency.' },
          { title: 'Event-day pace', detail: 'Major venues can change traffic feel. Visit peak and off-peak.' },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Cabarrus resources',
    intro: 'Official links first. Verify NCUC in-state and FMCSA interstate.',
    items: [
      { label: 'Cabarrus County — official site', href: 'https://www.cabarruscounty.us/', external: true },
      { label: 'City of Concord', href: 'https://www.concordnc.gov/', external: true },
      { label: 'City of Kannapolis', href: 'https://www.kannapolisnc.gov/', external: true },
      { label: 'Cabarrus County Schools', href: 'https://www.cabarrus.k12.nc.us/', external: true },
      { label: 'NCDOT traffic / 511', href: 'https://drivenc.gov/', external: true },
    ],
  },
  directoryHint:
    'Prefer HOA fluency for Concord growth; I-85 buffer for Charlotte pairs; event-calendar awareness near major venues. Verify NCUC C-# and FMCSA.',
  lastReviewed: '2026-07-23',
});

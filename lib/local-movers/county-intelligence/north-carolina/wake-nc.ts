import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import { finalizeNcPack } from '@/lib/local-movers/county-intelligence/north-carolina/nc-shared';

/** Wake County, NC — Raleigh / Triangle core (not Charlotte, not Durham). */
export const wakeCountyNcIntelligence: CountyIntelligencePack = finalizeNcPack({
  countySlug: 'wake',
  hubTitle: 'Wake County Moving Intelligence Hub',
  eyebrow: 'Wake · Raleigh core, North Raleigh & Cary-edge Triangle',
  h1: 'Moving in Wake County: Raleigh Core, North Raleigh Growth & I-40/I-440 Logistics',
  heroOpener:
    'Wake County is the Triangle’s state-capital and tech-growth engine: downtown Raleigh vertical living and warehouse lofts, North Raleigh multi-family and HOA rings, Cary and Apex spillover that feels suburban-but-Triangle, and research/government corridors that pull mid-month executive and apartment turns. A downtown Raleigh tower, a Five Points bungalow, a North Raleigh HOA two-story, and a Cary townhome do not share truck access or I-40/I-440 portal time. This hub is for people moving in Wake — not generic “Raleigh-Durham” copy that erases Durham’s medical research identity or Charlotte’s banking core.',
  heroCredibility:
    'NCUC household goods certificate (C-#) for intrastate NC moves · FMCSA for interstate · Triangle beltway & state-government calendar awareness · Curated listings',
  majorCorridors: 'I-40 · I-440 · I-540 · US-1 · US-70 · NC-54',
  whatMakesDifferent: {
    title: 'What makes moving in Wake County different',
    intro:
      'These are Wake realities — capital-city density, Outer Loop growth, and Triangle employment calendars — not Charlotte beltway clones or Triad industrial patterns.',
    bullets: [
      {
        title: 'Downtown Raleigh multi-unit product is elevator-first',
        detail:
          'Towers, mid-rises, and many warehouse conversions need COI, freight elevators, and tight curb rules. Building packets beat verbal access promises.',
      },
      {
        title: 'I-40 / I-440 / I-540 define portal-to-portal time',
        detail:
          'Downtown ↔ North Raleigh or Cary ↔ RTP-edge pairs look short on maps and long on clocks at peak. Price honestly.',
      },
      {
        title: 'State government and tech calendars reshape mid-month demand',
        detail:
          'Agency and corporate apartment turns compete with weekend family SFH demand. Book peak windows early.',
      },
      {
        title: 'Cary / Apex / Holly Springs edges are HOA-dense growth products',
        detail:
          'Master-planned villages mean gate lists, approved hours, and longer empty miles from Raleigh yards.',
      },
      {
        title: 'Wake ↔ Durham pairs are Triangle logistics, not “suburb hops”',
        detail:
          'Cross-county jobs on I-40 and NC-147 need clear origin/destination county lines for drive time and NCUC/FMCSA assumptions.',
      },
      {
        title: 'Intrastate NC rules vs interstate authority',
        detail:
          'In-state-only household moves are generally subject to NCUC certification (C-#). Interstate legs need FMCSA USDOT (and usually MC).',
      },
    ],
  },
  zonesHeading: 'Wake access zones',
  zonesIntro:
    'Plan by downtown/near-core Raleigh, North Raleigh growth, Cary/Apex western spillover, east/southeast Wake, and Research Triangle edges — access and HOA rules differ by pocket.',
  zones: [
    {
      id: 'downtown-raleigh',
      name: 'Downtown Raleigh & near-core',
      shortName: 'Downtown Raleigh',
      neighborhoods: ['Downtown', 'Glenwood South', 'Warehouse District', 'Moore Square edges', 'Oakwood edges'],
      housingTypes: 'High-rises, mid-rises, lofts, older multi-story walk-ups',
      challenges: ['COI and elevator reservations', 'Scarce curb staging', 'I-440 approach congestion'],
      moverTips: 'Collect building packets early. Prefer mid-week morning freight windows. Photo dock and alley options.',
      cityKeywords: ['raleigh', 'downtown', 'glenwood', 'warehouse district', 'oakwood'],
    },
    {
      id: 'north-raleigh',
      name: 'North Raleigh multi-family & HOA ring',
      shortName: 'North Raleigh',
      neighborhoods: ['North Hills', 'Falls of Neuse', 'Brier Creek edges', 'Six Forks', 'Durant Road corridor'],
      housingTypes: 'Mid-rise multi-family, townhomes, HOA SFH',
      challenges: ['I-540 / I-440 congestion', 'Elevator buildings with guest-parking chaos', 'Lease-end waves'],
      moverTips: 'Book month-end early. Confirm elevator vs stair access. Build Outer Loop buffer.',
      cityKeywords: ['north raleigh', 'north hills', 'brier creek', 'six forks', 'falls of neuse'],
    },
    {
      id: 'cary-apex',
      name: 'Cary, Apex & western Wake spillover',
      shortName: 'Cary / Apex',
      neighborhoods: ['Cary', 'Apex', 'Morrisville edges', 'Weston', 'Davis Drive corridor'],
      housingTypes: 'Master-planned HOA SFH, townhomes, tech-corridor multi-family',
      challenges: ['Dense HOA rules', 'I-40 / NC-54 congestion toward RTP', 'Long portal time to downtown Raleigh'],
      moverTips: 'Collect HOA packets first. Price Cary↔Raleigh pairs as logistics days. Share gate photos.',
      cityKeywords: ['cary', 'apex', 'morrisville', 'weston', 'davis drive'],
    },
    {
      id: 'east-southeast-wake',
      name: 'East & southeast Wake growth',
      shortName: 'East / SE Wake',
      neighborhoods: ['Knightdale', 'Wendell', 'Zebulon edges', 'Garner', 'Clayton-edge (verify county)'],
      housingTypes: 'Newer tract SFH, townhomes, multi-family along US-64/US-70',
      challenges: ['Longer empty miles from core yards', 'US-64 / I-440 congestion', 'HOA villages in growth tracts'],
      moverTips: 'Clarify Wake vs Johnston addresses. Prefer early starts for long east-county pairs.',
      cityKeywords: ['knightdale', 'wendell', 'zebulon', 'garner', 'east raleigh'],
    },
    {
      id: 'rtp-edge',
      name: 'RTP-adjacent & NC-54 employment edge',
      shortName: 'RTP edge',
      neighborhoods: ['Research Triangle Park edge', 'NC-54 corridor', 'Airport Boulevard edges', 'RDU-area multi-family'],
      housingTypes: 'Workforce multi-family, townhomes, limited SFH',
      challenges: ['Corporate lease turns', 'I-40 freight and commute peaks', 'Airport-area traffic pulses'],
      moverTips: 'Align mid-month corporate moves with freight windows. Build I-40 buffer either direction.',
      cityKeywords: ['rtp', 'research triangle', 'rdu', 'morrisville', 'nc-54'],
    },
  ],
  costDrivers: {
    title: 'What drives Wake moving costs',
    intro: 'Elevators, Outer Loop distance, and HOA soft costs separate cheap estimates from real bills.',
    drivers: [
      { title: 'Downtown elevator / COI buildings', detail: 'Raleigh core towers add labor and wait time.' },
      { title: 'I-40 / I-440 / I-540 congestion', detail: 'Cross-county and cross-loop pairs burn portal hours.' },
      { title: 'Western Wake HOA density', detail: 'Cary/Apex gate rules push demand into peak windows.' },
      { title: 'Triangle cross-county empty miles', detail: 'Durham destinations raise staging distance.' },
    ],
    ranges: [
      { label: 'Studio / 1BR (simple access)', value: '$450–$1,350+', note: 'Higher with elevators' },
      { label: '2–3BR condo or modest SFH', value: '$1,350–$3,700+', note: 'HOA soft costs trend up' },
      { label: '3–4+ BR / tower / cross-loop', value: '$2,400–$7,200+', note: 'Downtown and long I-540 pairs highest' },
      { label: 'Typical 2-person crew rate', value: '$110–$180+/hr', note: 'Portal-to-portal' },
    ],
  },
  seasonal: {
    title: 'When to schedule a Wake move',
    intro: 'State-government calendars, tech turns, school seasons, and humidity reshape access windows.',
    items: [
      { title: 'Best windows: mid-week early mornings', detail: 'Reduce I-440/I-40 pain and clear curb near downtown.' },
      { title: 'Peak family season: late May–mid-August', detail: 'Suburban SFH Saturdays fill first; book ahead.' },
      { title: 'University / multi-family lease waves', detail: 'May and August clusters near core apartments and North Hills product.' },
      { title: 'Summer storms and heat', detail: 'Afternoon storms and humidity slow exterior carries; prefer early starts.' },
    ],
  },
  specialized: [
    {
      id: 'triangle-capital-tech',
      title: 'Triangle capital, tech & Outer Loop logistics module',
      intro: 'Wake fails estimates when downtown building rules or I-540 distance are ignored.',
      bullets: [
        'Request Raleigh tower packets at lease signing or escrow.',
        'Price portal-to-portal for I-40, I-440, and I-540 pairs.',
        'Collect Cary/Apex HOA gate lists early.',
        'Clarify Wake vs Durham destinations on every estimate.',
        'Verify NCUC C-# for in-state-only jobs and FMCSA for interstate legs.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Wake County?',
    intro: 'Practical fit checklist — schools, healthcare, housing, commute — then verify on official sites. No invented rankings.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & education landscape',
        bullets: [
          { title: 'How districts work here', detail: 'Wake County Public School System is the primary public K–12 system. Assignment is address-based.' },
          { title: 'Growth areas and capacity', detail: 'North and western growth corridors can see enrollment pressure. Ask about capacity and busing when touring.' },
          { title: 'Research sources', detail: 'District boundary tools, NCDPI data, and campus visits beat ranking screenshots alone.' },
        ],
      },
      {
        id: 'hospitals',
        title: 'Hospitals & healthcare access',
        bullets: [
          { title: 'Major systems', detail: 'WakeMed, UNC Health, Duke Health (Triangle-wide), and other campuses serve Wake corridors. Confirm networks for your household.' },
          { title: 'What relocators should do', detail: 'Map peak-hour drive times from Cary or Knightdale to preferred facilities. Transfer records early.' },
        ],
      },
      {
        id: 'housing',
        title: 'Housing character & cost pressures',
        bullets: [
          { title: 'Core vs Outer Loop stock', detail: 'Dense multi-unit downtown; larger HOA tracts dominate North Raleigh and western Wake growth.' },
          { title: 'Cost variation', detail: 'Prices vary sharply by corridor. Budget condo dues and HOA assessments.' },
          { title: 'HOA governance', detail: 'Planned communities often control move hours and truck size. Read documents carefully.' },
        ],
      },
      {
        id: 'town-fit',
        title: 'Which Wake areas fit whom',
        bullets: [
          { title: 'Downtown / near-core lifestyle', detail: 'Suits walkable amenities and shorter urban access with elevator tradeoffs.' },
          { title: 'North Raleigh pattern', detail: 'Often appeals for multi-family and family SFH with Outer Loop commute risk.' },
          { title: 'Cary / Apex western pattern', detail: 'Tech employment access and newer HOA product; verify I-40 peak times to Raleigh jobs.' },
        ],
      },
      {
        id: 'jobs',
        title: 'Jobs & commute patterns',
        bullets: [
          { title: 'Employment anchors', detail: 'State government, tech, life sciences, healthcare, and education shape Wake employment.' },
          { title: 'Commute realism', detail: 'I-40, I-440, and I-540 peaks are real. Test drive peak routes before choosing solely on price.' },
        ],
      },
      {
        id: 'lifestyle',
        title: 'Lifestyle & practical livability',
        bullets: [
          { title: 'Triangle capital identity', detail: 'Wake stacks a state capital core with tech-suburban arms — different from Durham medical research or Charlotte banking.' },
          { title: 'Climate', detail: 'Hot humid summers and frequent storms. Plan outdoor staging contingency.' },
          { title: 'Pace', detail: 'Downtown feels urban-professional; western and northern arms more family-suburban. Visit peak and off-peak.' },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Wake resources',
    intro: 'Official links first. Verify NCUC for in-state moves and FMCSA for interstate legs.',
    items: [
      { label: 'Wake County — official site', href: 'https://www.wake.gov/', external: true },
      { label: 'City of Raleigh', href: 'https://raleighnc.gov/', external: true },
      { label: 'Wake County Public School System', href: 'https://www.wcpss.net/', external: true, note: 'Boundaries & calendars' },
      { label: 'NCDOT traffic / 511', href: 'https://drivenc.gov/', external: true },
    ],
  },
  directoryHint:
    'Prefer downtown elevator experience for Raleigh towers; HOA fluency for Cary/Apex; honest I-40/I-540 timing for cross-loop pairs. Verify NCUC C-# in-state and FMCSA interstate.',
  lastReviewed: '2026-07-23',
});

import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import { finalizeNcPack } from '@/lib/local-movers/county-intelligence/north-carolina/nc-shared';

/** Guilford County, NC — Triad (Greensboro / High Point), not Charlotte. */
export const guilfordCountyNcIntelligence: CountyIntelligencePack = finalizeNcPack({
  countySlug: 'guilford',
  hubTitle: 'Guilford County Moving Intelligence Hub',
  eyebrow: 'Guilford · Greensboro core, High Point edge & Triad mix',
  h1: 'Moving in Guilford County: Greensboro Core, High Point Edge & Triad Logistics',
  heroOpener:
    'Guilford County is the Triad’s Greensboro–High Point market: downtown and Fisher Park–adjacent older stock, university and multi-family corridors, furniture-trade and industrial edges around High Point, and suburban rings that are not Charlotte’s I-485 clone. A downtown Greensboro loft, a Lindley Park bungalow, a High Point showroom-adjacent house, and a northwest HOA two-story do not share truck access or I-40/I-85 timing. This hub is for Guilford moves — not renamed Mecklenburg or Wake pages.',
  heroCredibility:
    'NCUC household goods certificate (C-#) for intrastate NC moves · FMCSA for interstate · Triad industrial & residential mix awareness · Curated listings',
  majorCorridors: 'I-40 · I-85 · US-29 · US-220 · Bryan Boulevard · Wendover Avenue',
  whatMakesDifferent: {
    title: 'What makes moving in Guilford County different',
    intro: 'Triad industrial/residential mix and Greensboro–High Point split — not Charlotte banking towers or Triangle research density.',
    bullets: [
      { title: 'Greensboro core mixes older SFH and multi-unit product', detail: 'Stairs, alleys, and mid-rise elevators all appear under one county name — survey access photos matter.' },
      { title: 'High Point edges carry furniture-trade and industrial adjacency', detail: 'Truck timing near commercial corridors and showroom-season pulses can differ from pure residential suburbs.' },
      { title: 'I-40 / I-85 / US-29 define portal time', detail: 'Cross-county Triad pairs look local on maps and regional at peak.' },
      { title: 'University and multi-family lease waves exist but are not Triangle-scale', detail: 'Still book May/August clusters early for campus-adjacent apartments.' },
      { title: 'Guilford ↔ Forsyth pairs are everyday Triad logistics', detail: 'Keep county lines clear for drive time and NCUC/FMCSA assumptions.' },
      { title: 'Intrastate NC rules vs interstate authority', detail: 'In-state household moves generally need NCUC C-#. Interstate needs FMCSA USDOT/MC.' },
    ],
  },
  zonesHeading: 'Guilford access zones',
  zonesIntro: 'Plan by Greensboro core, northwest/southwest suburbs, High Point edge, eastern Guilford, and airport/industrial corridors.',
  zones: [
    {
      id: 'greensboro-core',
      name: 'Greensboro downtown & near-core neighborhoods',
      shortName: 'Greensboro core',
      neighborhoods: ['Downtown', 'Fisher Park', 'Lindley Park', 'College Hill', 'Glenwood'],
      housingTypes: 'Older SFH, multi-story walk-ups, limited mid-rise multi-family',
      challenges: ['Stairs and narrow streets', 'Limited curb staging', 'Event-day downtown congestion'],
      moverTips: 'Photo alley and curb options. Prefer mid-week mornings. Confirm stairs vs elevator unit-by-unit.',
      cityKeywords: ['greensboro', 'fisher park', 'lindley park', 'college hill', 'downtown'],
    },
    {
      id: 'nw-sw-suburbs',
      name: 'Northwest & southwest Greensboro suburbs',
      shortName: 'NW/SW suburbs',
      neighborhoods: ['Friendly', 'New Garden', 'Adams Farm', 'Sedgefield edges', 'Jamestown edges'],
      housingTypes: 'HOA SFH, townhomes, multi-family along major arterials',
      challenges: ['Wendover / Bryan congestion', 'HOA rules', 'Long portal time to High Point edges'],
      moverTips: 'Collect HOA packets. Build arterial buffer. Price cross-city pairs honestly.',
      cityKeywords: ['friendly', 'new garden', 'adams farm', 'jamestown', 'sedgefield'],
    },
    {
      id: 'high-point-edge',
      name: 'High Point & southern Guilford edge',
      shortName: 'High Point edge',
      neighborhoods: ['High Point', 'Deep River edges', 'Archdale edges (verify county)', 'Furniture market corridors'],
      housingTypes: 'SFH, multi-family, industrial-adjacent residential',
      challenges: ['Commercial truck corridors', 'Market-season traffic pulses', 'Mixed older stock access'],
      moverTips: 'Ask about market-week congestion when relevant. Survey driveway depth. Prefer early starts near commercial arteries.',
      cityKeywords: ['high point', 'deep river', 'archdale', 'furniture'],
    },
    {
      id: 'east-guilford',
      name: 'Eastern Guilford growth & multi-family',
      shortName: 'East Guilford',
      neighborhoods: ['McLeansville edges', 'Northeast Greensboro', 'US-70 corridors', 'Airport-adjacent multi-family'],
      housingTypes: 'Tract SFH, multi-family, some rural-edge lots',
      challenges: ['I-40/I-85 approach congestion', 'Longer empty miles', 'Varied driveway access'],
      moverTips: 'Clarify addresses near Alamance edges. Share access photos for rural-edge lots.',
      cityKeywords: ['mcleansville', 'northeast greensboro', 'ptia', 'east greensboro'],
    },
  ],
  costDrivers: {
    title: 'What drives Guilford moving costs',
    intro: 'Access type, Triad freeways, and cross-city empty miles drive quotes more than square footage alone.',
    drivers: [
      { title: 'Older core stairs and alleys', detail: 'Labor hours rise without elevators.' },
      { title: 'I-40 / I-85 / US-29 congestion', detail: 'Portal-to-portal spikes at peak.' },
      { title: 'High Point commercial adjacency', detail: 'Timing and staging friction near industrial corridors.' },
      { title: 'Forsyth cross-county empty miles', detail: 'Winston-Salem destinations raise staging distance.' },
    ],
    ranges: [
      { label: 'Studio / 1BR (simple access)', value: '$400–$1,200+', note: 'Higher with stairs or peak freeways' },
      { label: '2–3BR condo or modest SFH', value: '$1,200–$3,400+', note: 'HOA soft costs trend up' },
      { label: '3–4+ BR / cross-Triad', value: '$2,100–$6,200+', note: 'Long I-40 pairs price highest' },
      { label: 'Typical 2-person crew rate', value: '$100–$170+/hr', note: 'Portal-to-portal' },
    ],
  },
  seasonal: {
    title: 'When to schedule a Guilford move',
    intro: 'Family seasons, multi-family lease turns, and commercial calendar pulses reshape access.',
    items: [
      { title: 'Best windows: mid-week early mornings', detail: 'Reduce Wendover/I-40 pain and clear curb downtown.' },
      { title: 'Peak family season: late May–mid-August', detail: 'Book suburban Saturdays early.' },
      { title: 'University / multi-family lease waves', detail: 'May/August clusters near campus-adjacent apartments.' },
      { title: 'Summer heat and storms', detail: 'Prefer early starts; confirm weather contingency.' },
    ],
  },
  specialized: [
    {
      id: 'triad-greensboro-high-point',
      title: 'Triad Greensboro–High Point logistics module',
      intro: 'Guilford estimates fail when High Point commercial timing or Greensboro core stairs are ignored.',
      bullets: [
        'Photo stairs, alleys, and curb for near-core SFH.',
        'Build I-40/I-85 buffer for cross-city and cross-county pairs.',
        'Ask about market-week congestion near High Point commercial edges when relevant.',
        'Clarify Guilford vs Forsyth destinations.',
        'Verify NCUC C-# in-state and FMCSA interstate.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Guilford County?',
    intro: 'Practical fit checklist — verify on official sources. No invented rankings.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & education landscape',
        bullets: [
          { title: 'How districts work here', detail: 'Guilford County Schools is the primary public K–12 system. Assignment is address-based.' },
          { title: 'Growth areas', detail: 'Suburban edges can see enrollment pressure. Ask about capacity when touring.' },
          { title: 'Research sources', detail: 'District tools, NCDPI data, and campus visits beat ranking screenshots.' },
        ],
      },
      {
        id: 'hospitals',
        title: 'Hospitals & healthcare access',
        bullets: [
          { title: 'Major systems', detail: 'Cone Health and other regional facilities serve Greensboro–High Point corridors. Confirm networks.' },
          { title: 'What relocators should do', detail: 'Map peak-hour drive times across the county. Transfer records early.' },
        ],
      },
      {
        id: 'housing',
        title: 'Housing character & cost pressures',
        bullets: [
          { title: 'Core vs suburban stock', detail: 'Older near-core SFH and multi-unit; larger tracts on suburban edges.' },
          { title: 'Cost variation', detail: 'Prices vary by corridor. Budget HOA dues where applicable.' },
          { title: 'Industrial-adjacent pockets', detail: 'Some High Point-edge residential sits near commercial logistics corridors.' },
        ],
      },
      {
        id: 'town-fit',
        title: 'Which Guilford areas fit whom',
        bullets: [
          { title: 'Greensboro near-core lifestyle', detail: 'Suits established neighborhoods and shorter urban access with stair/curb tradeoffs.' },
          { title: 'Suburban ring pattern', detail: 'HOA product and arterials with freeway commute risk.' },
          { title: 'High Point edge pattern', detail: 'Different commercial/residential mix than Greensboro core — visit both before deciding.' },
        ],
      },
      {
        id: 'jobs',
        title: 'Jobs & commute patterns',
        bullets: [
          { title: 'Employment anchors', detail: 'Healthcare, education, logistics, manufacturing, and professional services shape Triad employment.' },
          { title: 'Commute realism', detail: 'I-40, I-85, US-29, and Wendover peaks are real. Test drive peak routes.' },
        ],
      },
      {
        id: 'lifestyle',
        title: 'Lifestyle & practical livability',
        bullets: [
          { title: 'Triad identity', detail: 'Guilford is Piedmont Triad fabric — not Charlotte vertical density or Triangle research towns.' },
          { title: 'Climate', detail: 'Hot humid summers and storms. Plan outdoor staging contingency.' },
          { title: 'Pace', detail: 'Greensboro and High Point feel different day-to-day. Visit peak and off-peak.' },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Guilford resources',
    intro: 'Official links first. Verify NCUC in-state and FMCSA interstate.',
    items: [
      { label: 'Guilford County — official site', href: 'https://www.guilfordcountync.gov/', external: true },
      { label: 'City of Greensboro', href: 'https://www.greensboro-nc.gov/', external: true },
      { label: 'City of High Point', href: 'https://www.highpointnc.gov/', external: true },
      { label: 'Guilford County Schools', href: 'https://www.gcsnc.com/', external: true },
      { label: 'NCDOT traffic / 511', href: 'https://drivenc.gov/', external: true },
    ],
  },
  directoryHint:
    'Prefer core SFH stair/alley experience for Greensboro neighborhoods; commercial-corridor timing near High Point edges; honest I-40/I-85 pricing for Triad pairs. Verify NCUC C-# and FMCSA.',
  lastReviewed: '2026-07-23',
});

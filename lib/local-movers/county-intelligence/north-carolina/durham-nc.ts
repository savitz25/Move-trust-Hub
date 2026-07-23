import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import { finalizeNcPack } from '@/lib/local-movers/county-intelligence/north-carolina/nc-shared';

/** Durham County, NC — Triangle research/medical partner (not a Raleigh suburb clone). */
export const durhamCountyNcIntelligence: CountyIntelligencePack = finalizeNcPack({
  countySlug: 'durham',
  hubTitle: 'Durham County Moving Intelligence Hub',
  eyebrow: 'Durham · Downtown revival, Duke medical & Triangle research',
  h1: 'Moving in Durham County: Downtown Revival, Duke Medical Access & Triangle Positioning',
  heroOpener:
    'Durham County is a Triangle research-and-medical market with its own downtown revival: adaptive-reuse lofts and mid-rises near Brightleaf and American Tobacco, Duke University and Duke Health employment that generate specialized mid-month turns, older bungalow and mill-adjacent stock, and suburban growth toward Research Triangle Park edges that still is not “North Raleigh under another name.” A downtown Durham loft, a Trinity Park craftsman, a Southpoint-area multi-family unit, and a RTP-edge HOA home do not share truck access or NC-147 timing. This hub is for people moving in Durham — not generic Triangle tips that treat Durham as Wake overflow.',
  heroCredibility:
    'NCUC household goods certificate (C-#) for intrastate NC moves · FMCSA for interstate · Duke medical & research-corridor awareness · Curated listings',
  majorCorridors: 'I-40 · I-85 · NC-147 (Durham Freeway) · US-15-501 · NC-55',
  whatMakesDifferent: {
    title: 'What makes moving in Durham County different',
    intro:
      'These are Durham realities — medical/research employment, downtown adaptive reuse, and Triangle positioning — not Wake capital-city patterns or Charlotte towers.',
    bullets: [
      {
        title: 'Downtown Durham multi-unit is adaptive-reuse product',
        detail:
          'Lofts and mid-rises often mean elevators, COI, and tight historic-block curb rules. Survey access photos matter.',
      },
      {
        title: 'Duke / medical calendars create specialized turn windows',
        detail:
          'Hospital and university-related apartments can spike mid-month and academic-year demand differently than pure family SFH peaks.',
      },
      {
        title: 'NC-147 and I-40 rewrite short map miles',
        detail:
          'Downtown ↔ RTP-edge or Durham ↔ Chapel Hill-edge pairs need honest portal-to-portal pricing.',
      },
      {
        title: 'Older near-core stock still includes stairs and narrow streets',
        detail:
          'Trinity Park, Old West Durham, and similar pockets are not tower jobs — long carries and careful truck placement still dominate.',
      },
      {
        title: 'Durham is a Triangle partner, not a Wake suburb',
        detail:
          'Cross-county Wake/Orange jobs are routine, but housing character and employment anchors differ. Keep county lines clear on estimates.',
      },
      {
        title: 'Intrastate NC rules vs interstate authority',
        detail:
          'In-state household moves generally require NCUC certification (C-#). Interstate legs need FMCSA USDOT (and usually MC).',
      },
    ],
  },
  zonesHeading: 'Durham access zones',
  zonesIntro:
    'Plan by downtown/American Tobacco corridor, Duke/medical near-campus, Southpoint/southern multi-family, northern/eastern suburban edges, and RTP western approach — each has distinct access friction.',
  zones: [
    {
      id: 'downtown-durham',
      name: 'Downtown Durham & adaptive-reuse core',
      shortName: 'Downtown Durham',
      neighborhoods: ['Downtown', 'Brightleaf', 'American Tobacco', 'Central Park edges', 'Cleveland-Holloway edges'],
      housingTypes: 'Lofts, mid-rises, renovated industrial product, limited SFH',
      challenges: ['COI/elevators', 'Event and restaurant-district curb pressure', 'Tight historic streets'],
      moverTips: 'Get building packets early. Prefer mid-week mornings. Avoid major event nights when flexible.',
      cityKeywords: ['durham', 'downtown', 'brightleaf', 'american tobacco'],
    },
    {
      id: 'duke-medical',
      name: 'Duke University & medical corridors',
      shortName: 'Duke / medical',
      neighborhoods: ['Duke West Campus edges', 'Trent Drive corridor', 'Ninth Street edges', 'Walltown', 'Old West Durham'],
      housingTypes: 'Multi-family, older SFH, townhomes, medical-workforce rentals',
      challenges: ['Hospital traffic pulses', 'Mixed stairs and elevators', 'Limited truck staging near campus'],
      moverTips: 'Coordinate around clinical peak hours when possible. Photo curb and alley options. Confirm unit access type.',
      cityKeywords: ['duke', 'ninth street', 'walltown', 'old west durham', 'medical'],
    },
    {
      id: 'southpoint-south',
      name: 'Southpoint & southern multi-family',
      shortName: 'Southpoint',
      neighborhoods: ['Southpoint', 'Woodcroft', 'Hope Valley edges', 'NC-54 south multi-family'],
      housingTypes: 'Mid-rise multi-family, townhomes, HOA SFH',
      challenges: ['Retail-corridor congestion', 'Elevator buildings', 'I-40 approach friction'],
      moverTips: 'Book lease-end clusters early. Build I-40 buffer. Collect HOA packets for planned pockets.',
      cityKeywords: ['southpoint', 'woodcroft', 'hope valley', 'south durham'],
    },
    {
      id: 'north-east-suburban',
      name: 'Northern & eastern suburban edges',
      shortName: 'N/E suburbs',
      neighborhoods: ['Bahama edges', 'Falls Lake approach', 'Mineral Springs', 'Eastern Durham tracts'],
      housingTypes: 'SFH tracts, some multi-family, rural-edge lots',
      challenges: ['Longer empty miles', 'Varied driveway depth', 'County-line confusion with Granville/Person edges'],
      moverTips: 'Clarify address county. Price long suburban pairs honestly. Share driveway photos for rural-edge lots.',
      cityKeywords: ['bahama', 'falls lake', 'north durham', 'east durham'],
    },
    {
      id: 'rtp-west',
      name: 'RTP western approach & employment multi-family',
      shortName: 'RTP west edge',
      neighborhoods: ['RTP edge', 'Page Road corridor', 'TW Alexander edges', 'Research Drive multi-family'],
      housingTypes: 'Workforce multi-family, townhomes',
      challenges: ['Corporate lease turns', 'I-40 freight peaks', 'Elevator access rules'],
      moverTips: 'Align mid-month corporate moves carefully. Confirm elevator reservations in writing.',
      cityKeywords: ['rtp', 'page road', 'research triangle', 'morrisville edge'],
    },
  ],
  costDrivers: {
    title: 'What drives Durham moving costs',
    intro: 'Adaptive-reuse elevators, medical-corridor timing, and Triangle empty miles drive quotes.',
    drivers: [
      { title: 'Downtown loft / mid-rise access', detail: 'COI and elevators dominate core jobs.' },
      { title: 'NC-147 / I-40 congestion', detail: 'Portal time spikes at peak.' },
      { title: 'Medical / university turn density', detail: 'Mid-month demand competes with weekend SFH.' },
      { title: 'Cross-Triangle empty miles', detail: 'Wake and Orange destinations raise staging distance.' },
    ],
    ranges: [
      { label: 'Studio / 1BR (simple access)', value: '$450–$1,300+', note: 'Higher with elevators' },
      { label: '2–3BR loft or modest SFH', value: '$1,300–$3,600+', note: 'Historic-block access trends up' },
      { label: '3–4+ BR / cross-Triangle', value: '$2,300–$6,800+', note: 'Long I-40 pairs price highest' },
      { label: 'Typical 2-person crew rate', value: '$110–$175+/hr', note: 'Portal-to-portal' },
    ],
  },
  seasonal: {
    title: 'When to schedule a Durham move',
    intro: 'University, hospital, and family calendars stack differently than pure capital-city patterns.',
    items: [
      { title: 'Best windows: mid-week early mornings', detail: 'Clear downtown curb and reduce NC-147 pain.' },
      { title: 'Academic / medical turn clusters', detail: 'Book early around major academic-year transitions.' },
      { title: 'Peak family season: late May–mid-August', detail: 'Suburban SFH Saturdays fill first.' },
      { title: 'Summer heat and storms', detail: 'Prefer early starts; confirm weather contingency.' },
    ],
  },
  specialized: [
    {
      id: 'durham-research-medical',
      title: 'Durham research, medical & downtown loft module',
      intro: 'Durham estimates fail when loft access or medical-corridor traffic is treated as generic suburb work.',
      bullets: [
        'Request loft/mid-rise packets early for downtown adaptive reuse.',
        'Coordinate around hospital traffic peaks when flexible.',
        'Price NC-147 and I-40 pairs portal-to-portal.',
        'Clarify Durham vs Wake/Orange addresses.',
        'Verify NCUC C-# in-state and FMCSA interstate.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Durham County?',
    intro: 'Practical fit checklist — then verify on official district and health-system sites. No invented rankings.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & education landscape',
        bullets: [
          { title: 'How districts work here', detail: 'Durham Public Schools is the primary public K–12 system. Assignment is address-based.' },
          { title: 'Nearby higher education context', detail: 'Duke and nearby Triangle campuses shape housing demand more than school rankings alone.' },
          { title: 'Research sources', detail: 'District tools, NCDPI data, and campus visits beat ranking screenshots.' },
        ],
      },
      {
        id: 'hospitals',
        title: 'Hospitals & healthcare access',
        bullets: [
          { title: 'Major systems', detail: 'Duke Health is a major local anchor; UNC Health and other Triangle facilities also serve residents. Confirm networks.' },
          { title: 'What relocators should do', detail: 'Map peak-hour times to preferred campuses. Transfer records early.' },
        ],
      },
      {
        id: 'housing',
        title: 'Housing character & cost pressures',
        bullets: [
          { title: 'Downtown revival vs suburban edges', detail: 'Adaptive-reuse multi-unit downtown; larger tracts and multi-family south and RTP-edge.' },
          { title: 'Cost variation', detail: 'Prices vary by corridor. Budget condo dues and HOA fees where applicable.' },
          { title: 'Older stock realities', detail: 'Near-core SFH can mean stairs, narrow streets, and limited driveway depth.' },
        ],
      },
      {
        id: 'town-fit',
        title: 'Which Durham areas fit whom',
        bullets: [
          { title: 'Downtown / near-core lifestyle', detail: 'Suits people prioritizing urban amenities and shorter access with elevator tradeoffs.' },
          { title: 'Duke / medical-adjacent pattern', detail: 'Often appeals for employment proximity; expect traffic pulses and mixed housing stock.' },
          { title: 'Southpoint / suburban pattern', detail: 'Multi-family and HOA product with retail-corridor logistics and I-40 risk.' },
        ],
      },
      {
        id: 'jobs',
        title: 'Jobs & commute patterns',
        bullets: [
          { title: 'Employment anchors', detail: 'Healthcare, research, education, life sciences, and professional services dominate.' },
          { title: 'Commute realism', detail: 'I-40, I-85, and NC-147 peaks are real. Test drive peak routes.' },
        ],
      },
      {
        id: 'lifestyle',
        title: 'Lifestyle & practical livability',
        bullets: [
          { title: 'Triangle research-town identity', detail: 'Durham feels distinct from Raleigh capital density and Charlotte banking towers.' },
          { title: 'Climate', detail: 'Hot humid summers and storms. Plan outdoor staging contingency.' },
          { title: 'Pace', detail: 'Downtown revival energy coexists with quieter residential pockets. Visit peak and off-peak.' },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Durham resources',
    intro: 'Official links first. Verify NCUC in-state and FMCSA interstate.',
    items: [
      { label: 'Durham County — official site', href: 'https://www.dconc.gov/', external: true },
      { label: 'City of Durham', href: 'https://www.durhamnc.gov/', external: true },
      { label: 'Durham Public Schools', href: 'https://www.dpsnc.net/', external: true },
      { label: 'NCDOT traffic / 511', href: 'https://drivenc.gov/', external: true },
    ],
  },
  directoryHint:
    'Prefer loft/elevator experience for downtown adaptive reuse; medical-corridor timing awareness near Duke; honest NC-147/I-40 pricing. Verify NCUC C-# and FMCSA as applicable.',
  lastReviewed: '2026-07-23',
});

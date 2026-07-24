import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import { finalizeUtPack } from '@/lib/local-movers/county-intelligence/utah/ut-shared';

export const saltLakeCountyUtIntelligence: CountyIntelligencePack = finalizeUtPack({
  countySlug: 'salt-lake',
  hubTitle: 'Salt Lake County Moving Intelligence Hub',
  eyebrow: 'Salt Lake · SLC neighborhoods, east bench & I-15 / I-80 logistics',
  h1: 'Moving in Salt Lake County: SLC Neighborhoods, East Bench Access & I-15 / I-80 Logistics',
  heroOpener:
    'Salt Lake County is Utah\'s metro core — not Utah County Provo–Orem product and not St. George desert stock: Salt Lake City neighborhood multi-unit elevators, east bench hillside driveways, Sugar House and Millcreek density, I-15 and I-80 portal time, and valley floor logistics that are not Lehi tech-corridor or southern Utah defaults. A downtown SLC tower, an Avenues walk-up, a Cottonwood Heights two-story, and a West Valley multi-family unit do not share truck access or empty-mile risk. This hub is for Salt Lake County (SLC–east bench–valley) — not a renamed Utah County or Davis page.',
  heroCredibility:
    'UDOT motor carrier credentials for intrastate UT moves · FMCSA for interstate · Curated directory listings',
  majorCorridors: 'I-15 · I-80 · I-215 · US-89',
  whatMakesDifferent: {
    title: 'What makes moving in Salt Lake County different',
    intro:
      'These are Salt Lake metro realities — downtown elevators, east bench grades, and I-15/I-80 timing — not Utah County tech growth or St. George desert defaults.',
    bullets: [
      {
        title: 'Downtown and midtown elevators rewrite labor hours',
        detail:
          'Building packets, COI naming, and freight windows dominate SLC core and multi-unit jobs.',
      },
      {
        title: 'East bench hillside driveways change staging rules',
        detail:
          'Steep approaches, limited turnaround, and long carries reshape Millcreek, Holladay, and Cottonwood product.',
      },
      {
        title: 'I-15, I-80, and I-215 define portal-to-portal time',
        detail: 'Cross-valley pairs look local on maps and regional at peak.',
      },
      {
        title: 'West valley multi-unit is not east bench SFH',
        detail:
          'West Valley, Taylorsville, and South Jordan stock differs sharply from Avenues and foothill product.',
      },
      {
        title: 'Not Utah County Provo–Orem or Davis north Wasatch product as the default',
        detail:
          'Survey each Salt Lake address — metro core density is not Silicon Slopes growth or Ogden hub defaults.',
      },
      {
        title: 'Intrastate UDOT motor carrier credentials vs interstate FMCSA',
        detail:
          'Moves entirely within Utah by for-hire motor carriers generally require appropriate UDOT Motor Carrier Division registration and insurance credentials. Match the legal name on the estimate to UDOT credentials before you deposit. Any out-of-state leg needs active FMCSA USDOT (and usually MC) authority — verify on FMCSA SAFER.',
      },
    ],
  },
  zonesHeading: 'Salt Lake access zones',
  zonesIntro:
    'Plan by downtown/midtown elevators, east bench hills, west valley multi-unit, and south valley/I-15 growth edges.',
  zones: [
    {
      id: 'downtown-midtown',
      name: 'Downtown SLC, Avenues & midtown elevators',
      shortName: 'Downtown / midtown',
      neighborhoods: [
        'Downtown Salt Lake',
        'The Avenues',
        'Central City',
        'Sugar House edges',
      ],
      housingTypes: 'High-rises, mid-rises, walk-ups, renovated multi-unit',
      challenges: ['Elevators and COI', 'Scarce curb staging', 'Stairs and long carries'],
      moverTips: 'Get building packets early. Prefer mid-week morning freight windows.',
      cityKeywords: ['salt lake city', 'downtown', 'avenues', 'sugar house'],
    },
    {
      id: 'east-bench',
      name: 'East bench: Millcreek, Holladay & Cottonwood',
      shortName: 'East bench',
      neighborhoods: ['Millcreek', 'Holladay', 'Cottonwood Heights', 'Olympus Cove edges'],
      housingTypes: 'SFH, multi-family, hillside driveways',
      challenges: ['Steep driveways', 'Limited turnaround', 'I-215 congestion'],
      moverTips:
        'Photo driveway grade and turnaround. Prefer smaller trucks when approach is tight.',
      cityKeywords: ['millcreek', 'holladay', 'cottonwood heights'],
    },
    {
      id: 'west-valley',
      name: 'West Valley, Taylorsville & west multi-unit',
      shortName: 'West valley',
      neighborhoods: ['West Valley City', 'Taylorsville', 'Kearns edges', 'Magna edges'],
      housingTypes: 'Multi-family, SFH, mid-rises',
      challenges: ['I-215 / SR-201 congestion', 'Curb parking limits', 'Mixed access types'],
      moverTips:
        'Confirm parking rules block by block. Price west-to-east pairs portal-to-portal.',
      cityKeywords: ['west valley', 'taylorsville', 'kearns'],
    },
    {
      id: 'south-valley',
      name: 'South Jordan, Draper & south I-15 growth',
      shortName: 'South valley',
      neighborhoods: ['South Jordan', 'Draper', 'Riverton edges', 'Sandy edges'],
      housingTypes: 'SFH, multi-family, HOA pockets',
      challenges: ['I-15 congestion', 'HOA gates', 'Longer portal time to core'],
      moverTips: 'Collect HOA packets. Price south valley pairs portal-to-portal.',
      cityKeywords: ['south jordan', 'draper', 'sandy', 'riverton'],
    },
  ],
  costDrivers: {
    title: 'What drives Salt Lake County moving costs',
    intro:
      'Elevator friction, east bench grades, and I-15/I-80 portal time drive quotes more than bedroom count alone.',
    drivers: [
      { title: 'Downtown elevator & curb friction', detail: 'Core labor hours spike.' },
      { title: 'I-15 / I-80 / I-215 congestion', detail: 'Portal-to-portal spikes at peak.' },
      {
        title: 'East bench driveway grades & long carries',
        detail: 'Hillside access raises crew time.',
      },
      { title: 'Cross-valley empty miles', detail: 'West-to-east pairs punish odometer optimism.' },
    ],
    ranges: [
      { label: 'Studio / 1BR (simple access)', value: '$450–$1,500+', note: 'Higher with elevators' },
      { label: '2–3BR condo or modest SFH', value: '$1,350–$3,900+', note: 'Core friction trends up' },
      {
        label: '3–4+ BR / tower / cross-valley',
        value: '$2,500–$7,800+',
        note: 'Towers and long pairs highest',
      },
      { label: 'Typical 2-person crew rate', value: '$105–$180+/hr', note: 'Portal-to-portal' },
    ],
  },
  seasonal: {
    title: 'When to schedule a move in Salt Lake County',
    intro:
      'Summer family peaks, multi-family lease turns, inversion-season air quality, and winter canyon/bench ice reshape Salt Lake windows.',
    items: [
      {
        title: 'Best windows: mid-week early mornings',
        detail: 'Clear curb and reduce I-15/I-80 pain.',
      },
      { title: 'Peak family season: late May–mid-August', detail: 'Book suburban Saturdays early.' },
      { title: 'Month-end multi-family turns', detail: 'Downtown elevators fill first.' },
      { title: 'Winter ice and east bench snow', detail: 'Confirm driveway contingency.' },
    ],
  },
  specialized: [
    {
      id: 'salt-lake-slc-east-bench-i15-i80',
      title: 'SLC neighborhoods, east bench & I-15 / I-80 module',
      intro:
        'Salt Lake estimates fail when building packets, bench driveway grades, or I-15/I-80 empty miles are ignored.',
      bullets: [
        'Request downtown/midtown building packets early.',
        'Photo curb, stair, and driveway grade for multi-unit and east bench jobs.',
        'Price I-15, I-80, I-215, and US-89 pairs portal-to-portal.',
        'Clarify Salt Lake vs Utah or Davis destinations on multi-county estimates.',
        'Verify UDOT motor carrier credentials for in-state-only jobs and FMCSA for interstate legs.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Salt Lake County?',
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
              'Salt Lake City School District, Granite, Jordan, Canyons, and other systems serve different addresses. Confirm zoning carefully.',
          },
          {
            title: 'Research sources',
            detail:
              'District tools and Utah State Board of Education data beat ranking screenshots.',
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
              'University of Utah Health, Intermountain, MountainStar, and other campuses serve county corridors. Confirm networks.',
          },
          {
            title: 'What relocators should do',
            detail:
              'Map peak-hour drive times from west and south valley edges into major campuses. Transfer records early.',
          },
        ],
      },
      {
        id: 'housing',
        title: 'Housing character & cost pressures',
        bullets: [
          {
            title: 'Core condo/multi-unit vs bench SFH stock',
            detail:
              'Downtown product differs sharply from east bench and south valley two-stories.',
          },
          {
            title: 'Cost variation',
            detail:
              'Near-core renovated stock often prices differently from west valley multi-family.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Which areas fit whom',
        bullets: [
          {
            title: 'Downtown / midtown lifestyle',
            detail: 'Walkable amenities with elevator and curb tradeoffs.',
          },
          {
            title: 'East bench pattern',
            detail: 'Hillside SFH with driveway logistics.',
          },
          {
            title: 'South / west valley pattern',
            detail: 'HOA/multi-unit product with longer portal time to core jobs.',
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
              'Healthcare, government, tech, logistics, finance, and professional services shape employment.',
          },
          {
            title: 'Commute realism',
            detail:
              'I-15 and I-80 peaks are real. Test drive peak routes around the valley ring.',
          },
        ],
      },
      {
        id: 'lifestyle',
        title: 'Lifestyle & practical livability',
        bullets: [
          {
            title: 'Salt Lake identity',
            detail:
              'Salt Lake County is Wasatch Front metro core — not Utah County Silicon Slopes growth or St. George desert product as the default.',
          },
          {
            title: 'Climate',
            detail:
              'Hot dry summers, inversion winters, and mountain snow. Plan outdoor staging contingency.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Salt Lake County resources',
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify UDOT motor carrier credentials for in-state moves and FMCSA for interstate legs.',
    items: [
      { label: 'Salt Lake County — official site', href: 'https://slco.org/', external: true },
      { label: 'UDOT traffic', href: 'https://www.udot.utah.gov/connect/', external: true },
    ],
  },
  directoryHint:
    'Prefer downtown elevator and east bench access experience with honest I-15/I-80 pricing. Verify UDOT credentials in-state and FMCSA interstate.',
  lastReviewed: '2026-07-24',
});

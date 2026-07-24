import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import { finalizeUtPack } from '@/lib/local-movers/county-intelligence/utah/ut-shared';

export const utahCountyUtIntelligence: CountyIntelligencePack = finalizeUtPack({
  countySlug: 'utah',
  hubTitle: 'Utah County Moving Intelligence Hub',
  eyebrow: 'Utah County · Provo–Orem–Lehi tech/family growth & I-15 logistics',
  h1: 'Moving in Utah County: Provo–Orem–Lehi Growth, Campus Access & I-15 Logistics',
  heroOpener:
    'Utah County is the Provo–Orem–Lehi growth belt — not statewide “Moving in Utah” and not Salt Lake City metro core: BYU and UVU campus multi-unit waves, Silicon Slopes family HOA product, I-15 corridor portal time, and south Wasatch Front density that is not downtown SLC elevators or St. George desert defaults. A Provo walk-up, an Orem multi-family unit, a Lehi two-story HOA, and a Spanish Fork ranch do not share truck access or empty-mile risk. This hub is for Utah County (Provo–Orem–Lehi) — not a renamed Salt Lake County page or generic statewide Utah script.',
  heroCredibility:
    'UDOT motor carrier credentials for intrastate UT moves · FMCSA for interstate · Curated directory listings',
  majorCorridors: 'I-15 · US-89 · US-189',
  whatMakesDifferent: {
    title: 'What makes moving in Utah County different',
    intro:
      'These are Utah County Provo–Orem–Lehi realities — campus multi-unit, tech-corridor HOA growth, and I-15 timing — not Salt Lake downtown elevators or statewide generic product.',
    bullets: [
      {
        title: 'Campus multi-unit waves rewrite calendars',
        detail:
          'BYU, UVU, and student-adjacent housing compress move-in/out windows and raise month-end demand.',
      },
      {
        title: 'Silicon Slopes HOA and multi-family product differs from Provo core',
        detail:
          'Lehi, American Fork, and Eagle Mountain stock stacks gates, curb rules, and newer elevators.',
      },
      {
        title: 'I-15, US-89, and US-189 define portal-to-portal time',
        detail: 'North-county to Provo pairs look local on maps and regional at peak.',
      },
      {
        title: 'South county SFH is not Lehi tech multi-unit',
        detail:
          'Spanish Fork, Springville, and Payson product differs from north I-15 growth corridors.',
      },
      {
        title: 'Not Salt Lake County metro core or statewide Utah as the default',
        detail:
          'Survey each Utah County address — Provo–Orem–Lehi density is not SLC east bench or St. George desert defaults.',
      },
      {
        title: 'Intrastate UDOT motor carrier credentials vs interstate FMCSA',
        detail:
          'Moves entirely within Utah by for-hire motor carriers generally require appropriate UDOT Motor Carrier Division registration and insurance credentials. Match the legal name on the estimate to UDOT credentials before you deposit. Any out-of-state leg needs active FMCSA USDOT (and usually MC) authority — verify on FMCSA SAFER.',
      },
    ],
  },
  zonesHeading: 'Utah County access zones',
  zonesIntro:
    'Plan by Provo/campus multi-unit, Orem/UVU corridor, Lehi/Silicon Slopes growth, and south county SFH edges.',
  zones: [
    {
      id: 'provo-campus',
      name: 'Provo core, BYU edges & multi-unit',
      shortName: 'Provo / campus',
      neighborhoods: [
        'Downtown Provo',
        'BYU edges',
        'Joaquin edges',
        'Provo Canyon approaches',
      ],
      housingTypes: 'Multi-family, walk-ups, mid-rises, SFH',
      challenges: ['Stairs and tight curb', 'Campus calendar spikes', 'US-189 / I-15 congestion'],
      moverTips:
        'Get building packets early. Prefer mid-week mornings away from semester move peaks when flexible.',
      cityKeywords: ['provo', 'byu'],
    },
    {
      id: 'orem-uvu',
      name: 'Orem, UVU corridor & mid-county multi-unit',
      shortName: 'Orem / UVU',
      neighborhoods: ['Orem', 'UVU edges', 'Lindon edges', 'Vineyard edges'],
      housingTypes: 'Multi-family, SFH, mid-rises',
      challenges: ['I-15 congestion', 'Curb parking limits', 'Mixed access types'],
      moverTips: 'Confirm parking rules block by block. Price mid-county pairs portal-to-portal.',
      cityKeywords: ['orem', 'lindon', 'vineyard'],
    },
    {
      id: 'lehi-silicon-slopes',
      name: 'Lehi, American Fork & Silicon Slopes growth',
      shortName: 'Lehi / Silicon Slopes',
      neighborhoods: [
        'Lehi',
        'American Fork',
        'Eagle Mountain edges',
        'Saratoga Springs edges',
      ],
      housingTypes: 'SFH, multi-family, HOA pockets, newer elevators',
      challenges: ['HOA gates', 'I-15 peak delays', 'Longer portal time to Provo core'],
      moverTips: 'Collect HOA packets. Price north-county pairs portal-to-portal.',
      cityKeywords: ['lehi', 'american fork', 'eagle mountain', 'saratoga springs'],
    },
    {
      id: 'south-county',
      name: 'Spanish Fork, Springville, Payson & south edges',
      shortName: 'South county',
      neighborhoods: ['Spanish Fork', 'Springville', 'Payson', 'Mapleton edges'],
      housingTypes: 'SFH, multi-family, HOA pockets',
      challenges: ['I-15 / US-89 congestion', 'HOA rules', 'Longer empty miles to Lehi'],
      moverTips: 'Collect HOA packets. Price south-to-north pairs honestly.',
      cityKeywords: ['spanish fork', 'springville', 'payson'],
    },
  ],
  costDrivers: {
    title: 'What drives Utah County moving costs',
    intro:
      'Campus multi-unit friction, HOA access, and I-15 portal time drive quotes more than bedroom count alone.',
    drivers: [
      { title: 'Campus multi-unit stair & curb friction', detail: 'Core labor hours spike.' },
      { title: 'I-15 / US-89 congestion', detail: 'Portal-to-portal spikes at peak.' },
      { title: 'HOA gates & long carries', detail: 'Silicon Slopes access raises crew time.' },
      { title: 'North-south empty miles', detail: 'Lehi-to-Payson pairs punish odometer optimism.' },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (simple access)',
        value: '$425–$1,450+',
        note: 'Higher with multi-unit stairs',
      },
      {
        label: '2–3BR condo or modest SFH',
        value: '$1,250–$3,700+',
        note: 'Growth-corridor friction trends up',
      },
      {
        label: '3–4+ BR / multi-unit / cross-corridor',
        value: '$2,300–$7,200+',
        note: 'Long pairs and peak calendars highest',
      },
      { label: 'Typical 2-person crew rate', value: '$100–$175+/hr', note: 'Portal-to-portal' },
    ],
  },
  seasonal: {
    title: 'When to schedule a move in Utah County',
    intro:
      'Summer family peaks, university move waves, tech-corridor growth turns, and winter valley ice reshape Utah County windows.',
    items: [
      { title: 'Best windows: mid-week early mornings', detail: 'Clear curb and reduce I-15 pain.' },
      { title: 'Peak family season: late May–mid-August', detail: 'Book suburban Saturdays early.' },
      {
        title: 'University move-in / move-out waves',
        detail: 'Provo/Orem multi-unit fills first.',
      },
      { title: 'Winter ice and snow', detail: 'Confirm driveway contingency.' },
    ],
  },
  specialized: [
    {
      id: 'utah-county-provo-orem-lehi-i15',
      title: 'Provo–Orem–Lehi growth, campus & I-15 module',
      intro:
        'Utah County estimates fail when campus calendars, HOA packets, or I-15 empty miles are ignored — and when statewide Utah or Salt Lake defaults are applied.',
      bullets: [
        'Request Provo/Orem multi-unit building packets early.',
        'Collect Silicon Slopes HOA packets for Lehi/American Fork jobs.',
        'Price I-15, US-89, and US-189 pairs portal-to-portal.',
        'Clarify Utah County vs Salt Lake destinations on multi-county estimates.',
        'Verify UDOT motor carrier credentials for in-state-only jobs and FMCSA for interstate legs.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Utah County?',
    intro:
      'Use this as a practical fit checklist — schools, healthcare, housing character, and commute realism — then verify on district and hospital sites. No single ranking captures neighborhood fit. This is Utah County (Provo–Orem–Lehi), not statewide Utah.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & education landscape',
        bullets: [
          {
            title: 'How districts work here',
            detail:
              'Alpine, Nebo, Provo, and other districts serve different addresses. Confirm zoning carefully.',
          },
          {
            title: 'Research sources',
            detail:
              'District tools and Utah State Board of Education data beat ranking screenshots. BYU and UVU calendars affect housing demand.',
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
              'Intermountain Utah Valley, Timpanogos Regional, and other campuses serve county corridors. Confirm networks.',
          },
          {
            title: 'What relocators should do',
            detail:
              'Map peak-hour drive times from Lehi and south county edges into major campuses. Transfer records early.',
          },
        ],
      },
      {
        id: 'housing',
        title: 'Housing character & cost pressures',
        bullets: [
          {
            title: 'Campus multi-unit vs Silicon Slopes SFH stock',
            detail:
              'Provo/Orem product differs sharply from Lehi/Eagle Mountain HOA two-stories.',
          },
          {
            title: 'Cost variation',
            detail:
              'North-corridor growth stock often prices differently from south county multi-family.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Which areas fit whom',
        bullets: [
          {
            title: 'Provo / campus lifestyle',
            detail: 'University amenities with multi-unit and curb tradeoffs.',
          },
          {
            title: 'Lehi / Silicon Slopes pattern',
            detail: 'Tech-corridor HOA growth with I-15 logistics.',
          },
          {
            title: 'South county pattern',
            detail: 'SFH/family product with longer portal time to north jobs.',
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
              'Tech, education, healthcare, manufacturing, and logistics shape employment along I-15.',
          },
          {
            title: 'Commute realism',
            detail: 'I-15 peaks are real. Test drive peak routes between Lehi and Provo.',
          },
        ],
      },
      {
        id: 'lifestyle',
        title: 'Lifestyle & practical livability',
        bullets: [
          {
            title: 'Utah County identity',
            detail:
              'Utah County is Provo–Orem–Lehi south Wasatch growth — not Salt Lake downtown metro core or St. George desert product as the default.',
          },
          {
            title: 'Climate',
            detail:
              'Hot dry summers and winter valley ice/snow. Plan outdoor staging contingency.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Utah County resources',
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify UDOT motor carrier credentials for in-state moves and FMCSA for interstate legs.',
    items: [
      { label: 'Utah County — official site', href: 'https://www.utahcounty.gov/', external: true },
      { label: 'UDOT traffic', href: 'https://www.udot.utah.gov/connect/', external: true },
    ],
  },
  directoryHint:
    'Prefer Provo–Orem multi-unit and Lehi HOA experience with honest I-15 pricing. Verify UDOT credentials in-state and FMCSA interstate. This is Utah County, not statewide Utah.',
  lastReviewed: '2026-07-24',
});

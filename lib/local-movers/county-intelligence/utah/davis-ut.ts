import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import { finalizeUtPack } from '@/lib/local-movers/county-intelligence/utah/ut-shared';

export const davisCountyUtIntelligence: CountyIntelligencePack = finalizeUtPack({
  countySlug: 'davis',
  hubTitle: 'Davis County Moving Intelligence Hub',
  eyebrow: 'Davis · north Wasatch between SLC/Ogden & I-15 / Legacy logistics',
  h1: 'Moving in Davis County: North Wasatch Suburbs, Hill AFB Edges & I-15 / Legacy Logistics',
  heroOpener:
    'Davis County is the north Wasatch Front belt between Salt Lake and Ogden — not Salt Lake downtown elevators and not Weber Ogden core alone: Layton and Clearfield multi-unit, Bountiful and Farmington family corridors, Hill Air Force Base adjacency, I-15 and Legacy Parkway portal time, and suburban density that is not Provo campus or St. George desert defaults. A Bountiful two-story, a Layton multi-family unit, a Farmington HOA, and a Clearfield base-adjacent turn do not share truck access or empty-mile risk. This hub is for Davis County (north Wasatch) — not a renamed Salt Lake or Weber page.',
  heroCredibility:
    'UDOT motor carrier credentials for intrastate UT moves · FMCSA for interstate · Curated directory listings',
  majorCorridors: 'I-15 · US-89 · Legacy Parkway',
  whatMakesDifferent: {
    title: 'What makes moving in Davis County different',
    intro:
      'These are Davis north Wasatch realities — suburban multi-unit, base-adjacent calendars, and I-15/Legacy timing — not SLC downtown elevators or Utah County Silicon Slopes defaults.',
    bullets: [
      {
        title: 'Hill AFB-adjacent calendars reshape demand windows',
        detail:
          'Military and contractor housing turns compress flexible dates near Clearfield and Layton corridors.',
      },
      {
        title: 'I-15, US-89, and Legacy Parkway define portal-to-portal time',
        detail:
          'North-south pairs look local on maps and regional at peak between SLC and Ogden approaches.',
      },
      {
        title: 'South Davis vs north Davis micro-markets differ',
        detail:
          'Bountiful/Centerville stock is not Layton/Clearfield multi-unit or Syracuse growth product.',
      },
      {
        title: 'HOA and multi-family product is not interchangeable',
        detail: 'Farmington and Kaysville gates differ from older multi-unit curb rules.',
      },
      {
        title: 'Not Salt Lake downtown or Weber Ogden core as the default',
        detail:
          'Survey each Davis address — north Wasatch suburb density is not SLC elevators or Ogden industrial-edge defaults.',
      },
      {
        title: 'Intrastate UDOT motor carrier credentials vs interstate FMCSA',
        detail:
          'Moves entirely within Utah by for-hire motor carriers generally require appropriate UDOT Motor Carrier Division registration and insurance credentials. Match the legal name on the estimate to UDOT credentials before you deposit. Any out-of-state leg needs active FMCSA USDOT (and usually MC) authority — verify on FMCSA SAFER.',
      },
    ],
  },
  zonesHeading: 'Davis access zones',
  zonesIntro:
    'Plan by south Davis (Bountiful/Farmington), Layton multi-unit, Clearfield/Hill AFB edges, and Syracuse/west growth.',
  zones: [
    {
      id: 'south-davis',
      name: 'Bountiful, Centerville, Farmington & south Davis',
      shortName: 'South Davis',
      neighborhoods: ['Bountiful', 'Centerville', 'Farmington', 'North Salt Lake edges'],
      housingTypes: 'SFH, multi-family, HOA pockets',
      challenges: ['I-15 / US-89 congestion', 'HOA rules', 'Stairs and basements'],
      moverTips: 'Collect HOA packets. Price south Davis pairs portal-to-portal toward SLC.',
      cityKeywords: ['bountiful', 'centerville', 'farmington'],
    },
    {
      id: 'layton',
      name: 'Layton multi-unit & mid-county corridors',
      shortName: 'Layton',
      neighborhoods: ['Layton', 'Kaysville edges', 'Fruit Heights edges'],
      housingTypes: 'Multi-family, SFH, mid-rises',
      challenges: ['I-15 congestion', 'Curb parking limits', 'Mixed access types'],
      moverTips: 'Confirm parking rules block by block. Survey stair width carefully.',
      cityKeywords: ['layton', 'kaysville'],
    },
    {
      id: 'clearfield-hill',
      name: 'Clearfield, Hill AFB edges & base-adjacent stock',
      shortName: 'Clearfield / Hill',
      neighborhoods: ['Clearfield', 'Hill AFB edges', 'Clinton edges', 'Sunset edges'],
      housingTypes: 'Multi-family, SFH, military-adjacent stock',
      challenges: ['Base-calendar spikes', 'I-15 congestion', 'Tight curb'],
      moverTips:
        'Confirm access near base-adjacent corridors. Prefer mid-week mornings away from peak PCS weeks when flexible.',
      cityKeywords: ['clearfield', 'clinton', 'hill air force base'],
    },
    {
      id: 'syracuse-west',
      name: 'Syracuse, West Point & west growth edges',
      shortName: 'Syracuse / west',
      neighborhoods: ['Syracuse', 'West Point', 'Hooper edges', 'West Point edges'],
      housingTypes: 'SFH, multi-family, HOA pockets',
      challenges: ['HOA gates', 'Longer portal time to I-15 core', 'Limited arterial options'],
      moverTips: 'Collect HOA packets. Price west growth pairs honestly.',
      cityKeywords: ['syracuse', 'west point'],
    },
  ],
  costDrivers: {
    title: 'What drives Davis County moving costs',
    intro:
      'Multi-unit access, base-calendar demand, and I-15/Legacy portal time drive quotes more than bedroom count alone.',
    drivers: [
      {
        title: 'Multi-unit stair & curb friction',
        detail: 'Labor hours spike on denser corridors.',
      },
      { title: 'I-15 / US-89 / Legacy congestion', detail: 'Portal-to-portal spikes at peak.' },
      {
        title: 'Base-adjacent calendar premiums',
        detail: 'PCS-style waves compress flexible windows.',
      },
      {
        title: 'North-south empty miles',
        detail: 'Bountiful-to-Clearfield pairs punish odometer optimism.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (simple access)',
        value: '$425–$1,400+',
        note: 'Higher with multi-unit access',
      },
      {
        label: '2–3BR condo or modest SFH',
        value: '$1,250–$3,600+',
        note: 'Corridor friction trends up',
      },
      {
        label: '3–4+ BR / multi-unit / cross-corridor',
        value: '$2,300–$7,000+',
        note: 'Long pairs and peak calendars highest',
      },
      { label: 'Typical 2-person crew rate', value: '$100–$175+/hr', note: 'Portal-to-portal' },
    ],
  },
  seasonal: {
    title: 'When to schedule a move in Davis County',
    intro:
      'Summer family peaks, base-adjacent turns, multi-family lease ends, and winter ice reshape Davis windows.',
    items: [
      {
        title: 'Best windows: mid-week early mornings',
        detail: 'Clear curb and reduce I-15/Legacy pain.',
      },
      { title: 'Peak family season: late May–mid-August', detail: 'Book suburban Saturdays early.' },
      {
        title: 'Base-adjacent and multi-family turns',
        detail: 'Clearfield/Layton demand compresses first.',
      },
      { title: 'Winter ice and snow', detail: 'Confirm driveway contingency.' },
    ],
  },
  specialized: [
    {
      id: 'davis-north-wasatch-i15-legacy',
      title: 'North Wasatch, Hill AFB edges & I-15 / Legacy module',
      intro:
        'Davis estimates fail when HOA packets, base calendars, or I-15/Legacy empty miles are ignored.',
      bullets: [
        'Collect HOA packets for Farmington/Kaysville/Syracuse jobs.',
        'Confirm access near Hill AFB-adjacent corridors early.',
        'Price I-15, US-89, and Legacy Parkway pairs portal-to-portal.',
        'Clarify Davis vs Salt Lake or Weber destinations on multi-county estimates.',
        'Verify UDOT motor carrier credentials for in-state-only jobs and FMCSA for interstate legs.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Davis County?',
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
              'Davis School District serves most of the county; confirm zoning carefully by address.',
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
              'Intermountain Layton, Lakeview, and campuses in neighboring counties serve residents. Confirm networks.',
          },
          {
            title: 'What relocators should do',
            detail:
              'Map peak-hour drive times from west growth edges into major campuses. Transfer records early.',
          },
        ],
      },
      {
        id: 'housing',
        title: 'Housing character & cost pressures',
        bullets: [
          {
            title: 'South Davis SFH vs north multi-unit stock',
            detail:
              'Bountiful/Farmington product differs from Clearfield multi-family and Syracuse growth.',
          },
          {
            title: 'Cost variation',
            detail:
              'South Davis renovated stock often prices differently from base-adjacent multi-family.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Which areas fit whom',
        bullets: [
          {
            title: 'South Davis lifestyle',
            detail: 'Family amenities with I-15 portal time to SLC.',
          },
          {
            title: 'Layton / Clearfield pattern',
            detail: 'Multi-unit density with base-adjacent logistics.',
          },
          {
            title: 'West growth pattern',
            detail: 'HOA SFH product with longer portal time to core jobs.',
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
              'Defense/Hill AFB, healthcare, logistics, retail, and reverse commute to SLC/Ogden shape employment.',
          },
          {
            title: 'Commute realism',
            detail:
              'I-15 and Legacy peaks are real. Test drive peak routes north and south.',
          },
        ],
      },
      {
        id: 'lifestyle',
        title: 'Lifestyle & practical livability',
        bullets: [
          {
            title: 'Davis identity',
            detail:
              'Davis County is north Wasatch between SLC and Ogden — not Salt Lake downtown elevators or Utah County Silicon Slopes as the default.',
          },
          {
            title: 'Climate',
            detail: 'Hot dry summers and winter ice/snow. Plan outdoor staging contingency.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Davis County resources',
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify UDOT motor carrier credentials for in-state moves and FMCSA for interstate legs.',
    items: [
      {
        label: 'Davis County — official site',
        href: 'https://www.daviscountyutah.gov/',
        external: true,
      },
      { label: 'UDOT traffic', href: 'https://www.udot.utah.gov/connect/', external: true },
    ],
  },
  directoryHint:
    'Prefer multi-unit and base-adjacent access experience with honest I-15/Legacy pricing. Verify UDOT credentials in-state and FMCSA interstate.',
  lastReviewed: '2026-07-24',
});

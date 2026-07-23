import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';

/** Mercer County — capital, Princeton university corridor, Route 1 professional belt. */
export const mercerCountyNjIntelligence: CountyIntelligencePack = {
  stateSlug: 'new-jersey',
  countySlug: 'mercer',
  hubTitle: 'Mercer County Moving Intelligence',
  eyebrow: 'Mercer County · Capital & university corridor',
  h1: 'Moving in Mercer County, NJ: Trenton, Princeton & Route 1 Logistics',
  heroOpener:
    'Mercer County packs a state capital, a global university town, dense Route 1 office parks, and still-rural western pockets into one short drive. A Trenton walk-up, a Princeton borough Victorian, and a Hamilton suburban colonial each need a different access plan — and academic calendars can jam elevators the same week state offices close for a holiday.',
  heroCredibility:
    'Capital / university / suburban zones · Professional corridor timing · Independent directory',
  collapsibleDeepContent: true,
  sectionOrder: [
    'zones',
    'whatMakesDifferent',
    'costDrivers',
    'specialized',
    'relocation',
    'seasonal',
    'resources',
  ],
  whatMakesDifferent: {
    title: 'Mercer’s logistics mix (capital + campus + suburbs)',
    intro:
      'You are not booking a single “Central Jersey” product — you are booking for street width, parking enforcement, and calendar peaks that differ by town.',
    bullets: [
      {
        title: 'Princeton’s constrained streets',
        detail:
          'Borough and near-campus streets are narrow; many homes predate modern trucks. Expect shuttle conversations and strict parking etiquette near campus events.',
      },
      {
        title: 'Trenton urban inventory',
        detail:
          'Rowhouses and multi-story buildings mean long carries, stairs, and limited staging. COI and loading-zone rules show up more often than in western rural zip codes.',
      },
      {
        title: 'Route 1 is a clock',
        detail:
          'The Route 1 corridor between Trenton and New Brunswick clogs at peak commute. Hourly crews feel every delay between Princeton Junction-area offices and residential drops.',
      },
      {
        title: 'Government & academic calendars',
        detail:
          'State worker schedules, legislative sessions, and Princeton University move-in/out windows create predictable demand spikes — book around them when you can.',
      },
      {
        title: 'West Mercer rural pockets',
        detail:
          'Hopewell and western townships bring longer driveways, septic setbacks, and less street parking pressure — but longer deadhead time from regional crews.',
      },
    ],
  },
  zonesHeading: 'Mercer County by corridor',
  zonesIntro:
    'Match your origin/destination corridor before comparing hourly rates — urban stairs and campus streets price differently than Hopewell lanes.',
  zones: [
    {
      id: 'princeton-belt',
      name: 'Princeton & university belt',
      shortName: 'Princeton',
      neighborhoods: ['Princeton', 'Princeton Township areas', 'West Windsor edge'],
      housingTypes: 'Victorians, colonials, faculty rentals, luxury townhomes',
      challenges: ['Narrow streets', 'Event-day parking', 'Historic detailing'],
      moverTips:
        'Share photos of stair turns and street width. Avoid alumni-weekend and reunions weekends.',
      cityKeywords: ['princeton', 'west windsor'],
    },
    {
      id: 'trenton-hamilton',
      name: 'Trenton & Hamilton',
      shortName: 'Trenton / Hamilton',
      neighborhoods: ['Trenton', 'Hamilton', 'Ewing'],
      housingTypes: 'Rowhomes, capes, garden apartments, state-worker housing stock',
      challenges: ['Stairs and long carries', 'Urban parking', 'Multi-unit buildings'],
      moverTips:
        'Confirm elevator/reservation rules for apartments. Get a written inventory for dense walks.',
      cityKeywords: ['trenton', 'hamilton', 'ewing'],
    },
    {
      id: 'route1-east',
      name: 'Route 1 / Lawrence / East Windsor',
      shortName: 'Route 1 east',
      neighborhoods: ['Lawrence', 'East Windsor', 'Hightstown'],
      housingTypes: 'Suburban colonials, townhome developments, office-park adjacent rentals',
      challenges: ['HOA windows', 'Route 1 peak traffic', 'Corporate lease turnovers'],
      moverTips:
        'Mid-morning starts miss the worst Route 1 crush. Ask about HOA certificate requirements early.',
      cityKeywords: ['lawrence', 'east windsor', 'hightstown'],
    },
    {
      id: 'hopewell-west',
      name: 'Hopewell & western townships',
      shortName: 'West Mercer',
      neighborhoods: ['Hopewell', 'Pennington', 'western townships'],
      housingTypes: 'Larger lots, farmette edges, historic village homes',
      challenges: ['Long driveways', 'Septic / well setbacks', 'Soft shoulders'],
      moverTips:
        'Measure truck turnarounds. Soft ground after rain can strand heavy trucks — plan staging.',
      cityKeywords: ['hopewell', 'pennington'],
    },
  ],
  specialized: [
    {
      id: 'university-capital',
      title: 'University & capital corridor module',
      intro:
        'Princeton academic peaks and Trenton government schedules both pull the same regional labor pool.',
      bullets: [
        'Avoid late August campus turnovers if your dates are flexible.',
        'State-office holidays can free parking but close related services — plan elevator access accordingly.',
        'Faculty and professional relocations often include high-value library and art inventories — specify packing levels.',
      ],
    },
    {
      id: 'hoa-coi',
      title: 'HOA & COI realities along Route 1',
      intro: 'Townhome and condo communities commonly require insurance certificates before move-in.',
      bullets: [
        'Request the association’s COI template at lease signing.',
        'Some boards only allow moves on weekdays.',
        'Elevator padding deposits may apply — ask who pays.',
      ],
    },
  ],
  seasonal: {
    title: 'Timing a Mercer move',
    intro: 'Academic and professional calendars dominate more than beach tourism here.',
    items: [
      {
        title: 'Late August / early September',
        detail: 'Campus and school-year starts — elevators and trucks get scarce near Princeton.',
      },
      {
        title: 'May–June',
        detail: 'Common family closing season; book 2–4 weeks ahead for weekend crews.',
      },
      {
        title: 'Winter freezes',
        detail: 'Icy steps on older Trenton and Princeton homes — ask about salt and runner policies.',
      },
    ],
  },
  costDrivers: {
    title: 'Mercer County cost drivers',
    intro: 'Market ranges for planning only — obtain written estimates for your inventory and access.',
    ranges: [
      { label: 'Studio / 1-BR', value: '$450–$950' },
      { label: '3–4 BR home', value: '$1,700–$3,600', note: 'Princeton access can price higher' },
      { label: '2-person crew', value: '$110–$165/hr' },
    ],
    drivers: [
      {
        title: 'Long carries & stairs',
        detail: 'Urban Trenton and older multi-story homes add labor hours fast.',
      },
      {
        title: 'Shuttle for narrow streets',
        detail: 'Princeton borough blocks sometimes cannot stage 26-ft trucks.',
      },
      {
        title: 'Professional packing for libraries/art',
        detail: 'University and professional households often need higher packing tiers.',
      },
    ],
  },
  relocation: {
    title: 'Relocating to Mercer County — fit checklist',
    intro:
      'Decide whether you need campus energy, capital-city practicality, or western quiet — then validate schools and hospitals for that pocket.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & education',
        intro:
          'Mercer families typically evaluate municipal and regional districts tied to specific towns (e.g., Princeton Public Schools, Hopewell Valley, Hamilton, Lawrence, East Windsor).',
        bullets: [
          {
            title: 'Town-first strategy',
            detail:
              'District quality conversations in New Jersey are highly local. Confirm the exact district for any listing address via NJ DOE resources and district boundary maps.',
          },
          {
            title: 'Princeton magnet',
            detail:
              'Princeton-area schools and private options attract many relocating professionals; inventory is competitive — start housing search early if school year timing is fixed.',
          },
          {
            title: 'Research tools',
            detail:
              'Use NJ School Performance Reports and district sites for curriculum and facilities; third-party ratings (GreatSchools, Niche) are secondary signals only.',
          },
          {
            title: 'Higher education presence',
            detail:
              'Princeton University and nearby colleges shape rental markets, traffic, and cultural amenities — useful for dual-career academic households.',
          },
        ],
      },
      {
        id: 'hospitals',
        title: 'Healthcare systems',
        bullets: [
          {
            title: 'Penn Medicine Princeton Medical Center',
            detail:
              'A major regional acute-care hub for much of central Mercer; verify specialty access and insurance networks.',
          },
          {
            title: 'Capital Health & Trenton-area access',
            detail:
              'Capital Health campuses serve Trenton/Hamilton-area residents — map ER drive times from your target neighborhood at rush hour.',
          },
          {
            title: 'Relocator tip',
            detail:
              'Transfer pediatric and specialty care early if you are mid-treatment; central NJ systems book out for some specialties.',
          },
        ],
      },
      {
        id: 'housing-cost',
        title: 'Housing & cost of living',
        bullets: [
          {
            title: 'Price ladder',
            detail:
              'Princeton and nearby pockets command premiums versus Hamilton or Trenton inventory. Compare total monthly costs, not just sticker price.',
          },
          {
            title: 'Stock variety',
            detail:
              'From urban rowhomes to large Hopewell lots — accessibility and renovation needs vary widely.',
          },
          {
            title: 'Taxes',
            detail:
              'Property taxes are a core NJ budget line. Review municipal tax rates and recent assessments when shortlisting towns.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Town fit by lifestyle',
        bullets: [
          {
            title: 'Academics & professionals',
            detail: 'Princeton and Lawrence corridors for campus and office access.',
          },
          {
            title: 'Value-seeking families',
            detail: 'Hamilton and parts of East Windsor often trade prestige ZIP for space.',
          },
          {
            title: 'Quieter western living',
            detail: 'Hopewell/Pennington for semi-rural character with still-drivable job access.',
          },
        ],
      },
      {
        id: 'jobs',
        title: 'Employment & commute',
        bullets: [
          {
            title: 'Local anchors',
            detail:
              'State government, education, healthcare, and Route 1 professional/tech employers.',
          },
          {
            title: 'Rail options',
            detail:
              'NJ Transit and Northeast Corridor access from Princeton Junction area supports NYC and Philly-direction commuting for some households.',
          },
          {
            title: 'Car reality',
            detail:
              'Many suburban and western addresses still assume a car for daily errands and school runs.',
          },
        ],
      },
      {
        id: 'lifestyle',
        title: 'Livability notes',
        bullets: [
          {
            title: 'Cultural density',
            detail: 'University and capital amenities concentrated; western townships feel quieter.',
          },
          {
            title: 'Weather',
            detail: 'Standard Mid-Atlantic seasons — humidity and winter ice affect older stair-heavy homes.',
          },
        ],
      },
      {
        id: 'demographics',
        title: 'Community character',
        bullets: [
          {
            title: 'Professional skew',
            detail:
              'Education and government employment contribute to a professional/family mix, with distinct urban and suburban subcultures by municipality (Census and local economic profiles).',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Mercer County resources',
    intro: 'Primary sources first — then use the directory to compare licensed movers.',
    items: [
      { label: 'Mercer County', href: 'https://www.mercercounty.org/', external: true },
      {
        label: 'NJ School Performance Reports',
        href: 'https://rc.doe.state.nj.us/',
        external: true,
      },
      {
        label: 'Directory: Mercer County movers filter',
        href: '/companies?coverage=state&state=NJ&counties=mercer',
      },
      { label: 'New Jersey local mover guides', href: '/local-movers/new-jersey' },
    ],
  },
  directoryHint: 'Filter for crews experienced with stairs, narrow streets, and HOA certificates.',
  lastReviewed: '2026-07-22',
};

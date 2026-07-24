import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeMnPack,
  MN_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/minnesota/mn-shared';

/**
 * Stearns County, MN — St. Cloud regional / college hub (not Twin Cities clone, not Duluth shore, not Rochester Mayo).
 */
export const stearnsCountyMnIntelligence: CountyIntelligencePack = finalizeMnPack({
  countySlug: 'stearns',
  hubTitle: 'Stearns County Moving Intelligence Hub',
  eyebrow: 'Stearns · St. Cloud regional hub, college multi-unit & I-94 logistics',
  h1: 'Moving in Stearns County: St. Cloud Access, College Cycles & Central Minnesota Corridors',
  heroOpener:
    'Stearns County is not a Twin Cities collar clone and not a Rochester medical corridor — it is a central Minnesota regional hub around St. Cloud with college multi-unit turnover, downtown and near-campus walk-ups, suburban Sartell–Sauk Rapids multi-family, and I-94 / MN-15 / MN-23 freeflow that rewrites “local” estimates. A campus-adjacent elevator, a downtown St. Cloud walk-up, a Sartell HOA townhome, and a rural-edge farmstead approach do not share truck access or empty-mile cost. Semester calendars and winter ice are real inputs. This hub is for people moving in Stearns County — not a renamed Hennepin page or generic central Minnesota script.',
  heroCredibility:
    'MnDOT household goods mover permit for intrastate moves · FMCSA for interstate · St. Cloud regional & college logistics awareness · Curated listings',
  majorCorridors: 'I-94 · MN-15 · MN-23 · US-10',
  whatMakesDifferent: {
    title: 'What makes moving in Stearns County different',
    intro:
      'These are St. Cloud regional and college-market realities — semester multi-unit waves, I-94 freeflow, and central MN empty miles — not Minneapolis elevators, Duluth hills, or Mayo hard-date product alone.',
    bullets: [
      {
        title: 'College multi-unit turnover clusters demand around semester windows',
        detail:
          'St. Cloud State and near-campus stock compress elevators and curb into late summer and January transitions. Book early for those peaks.',
      },
      {
        title: 'Regional hub product mixes downtown walk-ups with Sartell–Sauk Rapids growth',
        detail:
          'A single “St. Cloud rate” collapses when campus multi-unit and suburban HOA driveways diverge.',
      },
      {
        title: 'I-94, MN-15, MN-23, and US-10 turn short pairs into billable hours',
        detail:
          'St. Cloud ↔ Sartell looks local; St. Cloud ↔ Twin Cities is a true long haul. Price portal-to-portal honestly.',
      },
      {
        title: 'Twin Cities career pairs are common but not metro collar logistics',
        detail:
          'I-94 empty miles dominate — do not price like a Burnsville ↔ Minneapolis hop.',
      },
      {
        title: 'Winter ice and wind reshape outdoor carries in central Minnesota',
        detail:
          'December–March adds cancellation risk — flexible dates reduce soft costs.',
      },
      {
        title: 'Multi-county central MN pairs are routine',
        detail:
          'Households regularly move Stearns ↔ Benton, Sherburne, or Twin Cities counties. Clarify destinations so MnDOT vs FMCSA assumptions stay accurate when any leg leaves Minnesota.',
      },
      MN_REG_BULLET,
    ],
  },
  zonesHeading: 'Stearns County access zones',
  zonesIntro:
    'Plan by downtown St. Cloud multi-unit, campus-adjacent stock, Sartell–Sauk Rapids growth, western rural edges, and southern/eastern approaches.',
  zones: [
    {
      id: 'downtown-stcloud',
      name: 'Downtown St. Cloud multi-unit & riverfront stock',
      shortName: 'Downtown St. Cloud',
      neighborhoods: [
        'Downtown St. Cloud',
        'Riverfront edges',
        'St. Germain corridors',
        'Technical High edges',
        'East End edges',
        'Wilson Park edges',
      ],
      housingTypes: 'Multi-unit apartments, older SFH, limited elevators',
      challenges: [
        'Multi-flight stairs and tight curb',
        'I-94 / MN-23 freeflow',
        'Event and campus spillover traffic',
      ],
      moverTips:
        'Survey stairs carefully. Prefer mid-week starts. Photo curb options downtown.',
      cityKeywords: [
        'st cloud',
        'saint cloud',
      ],
    },
    {
      id: 'campus-adjacent',
      name: 'Campus-adjacent multi-unit & student stock',
      shortName: 'Campus belt',
      neighborhoods: [
        'St. Cloud State edges',
        'University Drive corridors',
        'South Side multi-unit',
        'Apollo edges',
        'Hockey Center edges',
        'Halenbeck edges',
      ],
      housingTypes: 'Student multi-unit, walk-ups, limited elevators',
      challenges: [
        'Semester lease waves',
        'Elevator multi-unit where present',
        'Scarce curb at move-in peaks',
      ],
      moverTips:
        'Book elevators and crews early for August and January peaks. Prefer mid-week starts. Confirm building rules in writing.',
      cityKeywords: [
        'st cloud',
        'saint cloud',
      ],
    },
    {
      id: 'sartell-sauk-rapids',
      name: 'Sartell, Sauk Rapids & northern growth multi-family',
      shortName: 'Sartell / Sauk Rapids',
      neighborhoods: [
        'Sartell',
        'Sauk Rapids',
        'Watab edges',
        'Pinecone corridors',
        'Benton Drive edges',
        'Mississippi river edges',
      ],
      housingTypes: 'Townhomes, multi-family, growth SFH',
      challenges: [
        'HOA timed windows',
        'US-10 / MN-15 freeflow',
        'Longer empty miles vs campus core',
      ],
      moverTips:
        'Collect HOA packets early. Price US-10 / MN-15 honestly. Clarify Stearns vs Benton county lines on border addresses.',
      cityKeywords: [
        'sartell',
        'sauk rapids',
      ],
    },
    {
      id: 'west-stearns',
      name: 'Western Stearns towns & rural edges',
      shortName: 'West Stearns',
      neighborhoods: [
        'Paynesville edges',
        'Melrose edges',
        'Sauk Centre edges',
        'Albany edges',
        'Freeport edges',
        'Holdingford edges',
      ],
      housingTypes: 'Small-town multi-unit, SFH, farmstead approaches',
      challenges: [
        'Long empty miles on I-94 / MN-23',
        'Rural driveway approaches',
        'Winter weather buffers',
      ],
      moverTips:
        'Price empty miles and travel day costs honestly. Survey long driveways and outbuildings. Confirm access photos early.',
      cityKeywords: [
        'paynesville',
        'melrose',
        'sauk centre',
        'albany',
        'freeport',
        'holdingford',
      ],
    },
    {
      id: 'south-east-stearns',
      name: 'Southern & eastern Stearns approaches',
      shortName: 'S/E Stearns',
      neighborhoods: [
        'Waite Park',
        'St. Joseph',
        'Rockville edges',
        'Cold Spring edges',
        'Richmond edges',
        'Kimball edges',
      ],
      housingTypes: 'Multi-family, SFH, small-town stock',
      challenges: [
        'MN-23 / I-94 freeflow',
        'Mixed product',
        'School-calendar peaks',
      ],
      moverTips:
        'Clarify Waite Park vs St. Cloud addresses. Price MN-23 pairs honestly. Survey HOA multi-family separately from rural edges.',
      cityKeywords: [
        'waite park',
        'st joseph',
        'cold spring',
        'rockville',
        'richmond',
        'kimball',
      ],
    },
  ],
  costDrivers: {
    title: 'What drives Stearns County moving costs',
    intro:
      'College lease waves, multi-unit access, I-94 empty miles, and winter ice move the number more than packing skill alone.',
    drivers: [
      {
        title: 'Campus multi-unit elevators & semester peaks',
        detail:
          'August and January windows add schedule risk before packing skill matters.',
      },
      {
        title: 'Downtown walk-up stairs & tight curb',
        detail:
          'Core St. Cloud stock adds flight counts and staging constraints.',
      },
      {
        title: 'I-94 · MN-15 · MN-23 · US-10 freeflow & empty miles',
        detail:
          'Twin Cities pairs and western town hauls burn portal-to-portal hours.',
      },
      {
        title: 'Sartell–Sauk Rapids HOA admin',
        detail:
          'Growth multi-family adds certificates and timed windows.',
      },
      {
        title: 'Winter ice & weather contingency',
        detail:
          'December–March reshapes outdoor labor and cancellation risk.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (simple access)',
        value: '$450–$1,600+',
        note: 'Higher with elevators or semester peaks',
      },
      {
        label: '2–3BR multi-unit or townhome',
        value: '$1,200–$3,800+',
        note: 'Stairs and HOA soft costs trend up',
      },
      {
        label: '3–4+ BR / Twin Cities long pair',
        value: '$2,400–$7,500+',
        note: 'I-94 empty miles price highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$105–$185+/hr',
        note: 'Portal-to-portal; packing and empty miles scale up',
      },
    ],
  },
  seasonal: {
    title: 'When to schedule a Stearns County move',
    intro:
      'College calendars, winter ice, I-94 freeflow, and school peaks reshape access and crew availability.',
    items: [
      {
        title: 'Best windows: mid-week early mornings in non-semester peaks',
        detail:
          'Tuesday–Thursday starts clear campus curb and ease I-94 pain.',
      },
      {
        title: 'Peak college: mid-August and early January',
        detail:
          'Student multi-unit turnover fills fleets first. Book 2–4 weeks ahead.',
      },
      {
        title: 'Peak family season: late May–mid-September',
        detail:
          'Family SFH and townhome moves compete with campus waves — book early.',
      },
      {
        title: 'Winter: ice and weather cancellations',
        detail:
          'December–March favors flexible dates and early starts.',
      },
    ],
  },
  specialized: [
    {
      id: 'stcloud-college-regional',
      title: 'St. Cloud college & regional hub logistics module',
      intro:
        'Stearns estimates fail more often on semester multi-unit waves, I-94 empty miles, and winter ice than on packing skill alone.',
      bullets: [
        'Book elevators and crews early for August and January campus peaks.',
        'Survey downtown walk-ups separately from Sartell HOA townhomes.',
        'Price portal-to-portal time for I-94, MN-15, MN-23, and US-10 pairs — especially Twin Cities hauls.',
        'Plan winter ice contingency on outdoor carries.',
        'Clarify Stearns vs Benton county lines on Sartell–Sauk Rapids border addresses.',
        'Verify MnDOT household goods mover permit for in-state-only jobs and FMCSA for interstate legs.',
      ],
    },
    {
      id: 'not-twin-cities-collar',
      title: 'Central MN hub vs Twin Cities collar module',
      intro:
        'A single “Minnesota metro rate” collapses when St. Cloud regional product and Twin Cities multi-county logistics diverge.',
      bullets: [
        'Do not price St. Cloud ↔ Twin Cities like a Dakota ↔ Hennepin collar hop — empty miles dominate.',
        'Match college calendars separately from Twin Cities corporate relo waves.',
        'Ask which I-94 approaches the crew will actually use for long hauls.',
        'Keep Stearns destinations clear from Rochester medical or Duluth shore assumptions.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Stearns County?',
    intro:
      'Use this as a practical fit checklist — schools, healthcare, housing character, and commute realism — then verify on district and hospital sites.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & education landscape',
        bullets: [
          {
            title: 'How districts work here',
            detail:
              'St. Cloud Area School District and neighboring districts (Sartell-St. Stephen, Sauk Rapids-Rice, and others) serve the county. Assignment is address-based — marketing city names do not guarantee a campus.',
          },
          {
            title: 'Choice, boundaries & enrollment pressure',
            detail:
              'Popular programs and boundary edges can be competitive. Confirm enrollment windows early when relocating mid-year.',
          },
          {
            title: 'Research sources',
            detail:
              'District boundary tools, Minnesota Department of Education data, and campus visits beat ranking screenshots alone.',
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
              'CentraCare / St. Cloud Hospital anchors regional care; clinics serve surrounding towns. Confirm insurance networks and campus locations.',
          },
          {
            title: 'What relocators should do',
            detail:
              'Map peak-hour drive times to preferred campuses — congestion changes “nearby” on paper. Transfer records early.',
          },
        ],
      },
      {
        id: 'housing',
        title: 'Housing character & cost pressures',
        bullets: [
          {
            title: 'Housing mix',
            detail:
              'Expect campus multi-unit and downtown walk-ups in St. Cloud; growth multi-family and SFH in Sartell–Sauk Rapids–Waite Park; small-town and rural-edge stock west and south.',
          },
          {
            title: 'Cost variation inside the county',
            detail:
              'Purchase prices and rents vary by city and product. Budget for HOA dues, older-building repair risk, and parking where relevant.',
          },
          {
            title: 'Building and HOA governance',
            detail:
              'Associations and multi-unit management often control move hours, truck size, elevators, and deposits. Read documents carefully.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Which areas fit whom',
        bullets: [
          {
            title: 'Downtown / campus multi-unit',
            detail:
              'Suits students and young professionals — with lease-end competition and stair/elevator tradeoffs.',
          },
          {
            title: 'Sartell / Sauk Rapids growth',
            detail:
              'Often appeals for newer multi-unit and schools — with HOA logistics and US-10 freeflow.',
          },
          {
            title: 'Waite Park / St. Joseph edges',
            detail:
              'Attracts households seeking relative value — with mixed multi-family and small-city product.',
          },
          {
            title: 'Western small towns and rural edges',
            detail:
              'Fits households seeking space — with empty-mile tradeoffs into St. Cloud.',
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
              'Healthcare, education, retail, manufacturing, and Twin Cities reverse-commutes along I-94 concentrate demand.',
          },
          {
            title: 'Commute realism',
            detail:
              'Peak freeway freeflow is real. Test peak routes before choosing solely on rent or purchase price.',
          },
        ],
      },
      {
        id: 'lifestyle',
        title: 'Lifestyle & practical livability',
        bullets: [
          {
            title: 'Local character',
            detail:
              'Stearns is a central Minnesota regional and college hub — different from Twin Cities collars, Rochester medical corridors, and Duluth North Shore logistics.',
          },
          {
            title: 'Climate',
            detail:
              'Continental four-season climate with long cold winters and snow/ice. Plan outdoor staging and ice contingency as part of move-in.',
          },
          {
            title: 'Culture and pace',
            detail:
              'Visit at peak and off-peak times when deciding — school calendars and winter weather reshape daily rhythm.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Stearns County resources',
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify MnDOT household goods mover permit status for in-state moves and FMCSA for interstate legs before deposits.',
    items: [
      {
        label: 'City of St. Cloud — official site',
        href: 'https://www.ci.stcloud.mn.us/',
        external: true,
        note: 'Permits, services & city info',
      },
      {
        label: 'Stearns County',
        href: 'https://www.stearnscountymn.gov/',
        external: true,
        note: 'County services & info',
      },
      {
        label: '511mn — traffic conditions',
        href: 'https://511mn.org/',
        external: true,
        note: 'I-94 before load windows',
      },
    ],
  },
  directoryHint:
    'Prefer crews with campus multi-unit experience for St. Cloud student stock; HOA readiness for Sartell–Sauk Rapids; honest I-94 · MN-15 · MN-23 · US-10 timing for regional and Twin Cities pairs. Verify MnDOT household goods mover permit for in-state moves and FMCSA for interstate legs.',
  lastReviewed: '2026-07-24',
});

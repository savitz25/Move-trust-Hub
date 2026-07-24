import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeMnPack,
  MN_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/minnesota/mn-shared';

/**
 * Dakota County, MN — south-metro Burnsville/Eagan/Apple Valley HOAs (not Hennepin core, not Anoka north, not Olmsted/Mayo).
 */
export const dakotaCountyMnIntelligence: CountyIntelligencePack = finalizeMnPack({
  countySlug: 'dakota',
  hubTitle: 'Dakota County Moving Intelligence Hub',
  eyebrow: 'Dakota · South-metro HOAs, Burnsville–Eagan–Apple Valley & I-35 logistics',
  h1: 'Moving in Dakota County: South Metro HOAs, Eagan Access & I-35 Growth Corridors',
  heroOpener:
    'Dakota County is not a Minneapolis elevator template and not a Rochester medical corridor — it is south-metro HOA multi-family and single-family growth across Burnsville, Eagan, Apple Valley, Lakeville, and Hastings, with I-35 / I-494 / MN-77 freeflow that rewrites “local” estimates. A Eagan townhome HOA window, a Burnsville multi-unit elevator, a Lakeville cul-de-sac SFH, and a Hastings river-town approach do not share truck access or empty-mile cost. Winter driveway ice and school-calendar peaks are real inputs. This hub is for people moving in Dakota County — not a renamed Hennepin or Anoka page.',
  heroCredibility:
    'MnDOT household goods mover permit for intrastate moves · FMCSA for interstate · South-metro HOA logistics awareness · Curated listings',
  majorCorridors: 'I-35 · I-494 · MN-77 · MN-13 · Cedar corridors',
  whatMakesDifferent: {
    title: 'What makes moving in Dakota County different',
    intro:
      'These are south-metro realities — HOA packets, growth multi-family, and I-35 freeflow — not downtown Minneapolis towers, St. Paul capital stock, or Anoka north-metro patterns.',
    bullets: [
      {
        title: 'HOA townhome and multi-family product dominate many south-metro jobs',
        detail:
          'Burnsville, Eagan, and Apple Valley multi-unit often need certificates of insurance, timed windows, and elevator reservations. Driveway SFH in Lakeville does not share that stack.',
      },
      {
        title: 'I-35, I-494, MN-77, and Cedar corridors burn portal time',
        detail:
          'Eagan ↔ Minneapolis or Apple Valley ↔ Bloomington pairs look local and still burn 30–70+ minutes at peak. Price portal-to-portal honestly.',
      },
      {
        title: 'Growth suburbs vs river-town Hastings are different access products',
        detail:
          'Lakeville cul-de-sacs and Hastings older stock do not share truck length or staging norms with Eagan multi-family.',
      },
      {
        title: 'School calendars and family relo waves cluster Saturdays',
        detail:
          'South-metro family moves pack fleets May–September. Mid-week mornings clear HOA docks faster.',
      },
      {
        title: 'Winter ice on driveways and HOA sidewalks reshapes outdoor carries',
        detail:
          'December–March adds cancellation risk and longer outdoor walks on ice — flexible dates reduce soft costs.',
      },
      {
        title: 'Multi-county south-metro pairs are routine',
        detail:
          'Households regularly move Dakota ↔ Hennepin, Ramsey, Scott, or Goodhue. Clarify county lines so MnDOT vs FMCSA assumptions stay accurate when any leg leaves Minnesota.',
      },
      MN_REG_BULLET,
    ],
  },
  zonesHeading: 'Dakota County access zones',
  zonesIntro:
    'Plan by Eagan multi-family, Burnsville–Apple Valley growth belts, Lakeville southern SFH, northern I-494 edges, and eastern Hastings river-town stock.',
  zones: [
    {
      id: 'eagan-multifamily',
      name: 'Eagan multi-family & corporate multi-unit',
      shortName: 'Eagan',
      neighborhoods: [
        'Eagan',
        'Diffley corridors',
        'Yankee Doodle edges',
        'Cedar Grove edges',
        'Pilot City edges',
        'Lebanon Hills edges',
      ],
      housingTypes: 'Townhomes, mid-rise multi-family, some SFH',
      challenges: [
        'HOA COI and timed windows',
        'Elevator multi-unit',
        'I-494 / MN-77 freeflow',
      ],
      moverTips:
        'Collect HOA packets before dispatch. Book elevators early. Price MN-77 / I-494 honestly.',
      cityKeywords: [
        'eagan',
      ],
    },
    {
      id: 'burnsville-apple-valley',
      name: 'Burnsville, Apple Valley & central south-metro growth',
      shortName: 'Burnsville / AV',
      neighborhoods: [
        'Burnsville',
        'Apple Valley',
        'County Road 42 corridors',
        'Heart of the City edges',
        'Palomino Hills edges',
        'Southcross edges',
      ],
      housingTypes: 'Multi-family, townhomes, SFH',
      challenges: [
        'I-35 congestion',
        'HOA and multi-unit mix',
        'School-calendar Saturday peaks',
      ],
      moverTips:
        'Prefer mid-week starts. Survey HOA vs SFH product separately. Confirm truck size on cul-de-sacs.',
      cityKeywords: [
        'burnsville',
        'apple valley',
      ],
    },
    {
      id: 'lakeville-south',
      name: 'Lakeville & southern growth SFH',
      shortName: 'Lakeville',
      neighborhoods: [
        'Lakeville',
        'Kenwood Trail edges',
        'Dodd corridors',
        'Downtown Lakeville edges',
        'Airlake edges',
        'Crystal Lake edges',
      ],
      housingTypes: 'Suburban SFH, townhomes, some multi-family',
      challenges: [
        'Longer empty miles on I-35',
        'Cul-de-sac truck access',
        'Winter driveway ice',
      ],
      moverTips:
        'Price empty miles honestly for southern pairs. Photo driveway pitch in winter. Confirm HOA rules on townhomes.',
      cityKeywords: [
        'lakeville',
      ],
    },
    {
      id: 'north-dakota-i494',
      name: 'Northern Dakota I-494 edges & Mendota approaches',
      shortName: 'North Dakota edges',
      neighborhoods: [
        'Mendota Heights',
        'West St. Paul edges',
        'Inver Grove Heights',
        'South St. Paul edges',
        'Lilydale edges',
        'Sunfish Lake edges',
      ],
      housingTypes: 'SFH, multi-family, river-bluff stock',
      challenges: [
        'I-494 / US-52 freeflow',
        'Bluff grades and winter ice',
        'Mixed older and newer product',
      ],
      moverTips:
        'Survey bluff driveways carefully. Price I-494 honestly. Clarify Dakota vs Ramsey addresses.',
      cityKeywords: [
        'mendota heights',
        'inver grove heights',
        'west st paul',
        'south st paul',
      ],
    },
    {
      id: 'hastings-east',
      name: 'Hastings & eastern river-town stock',
      shortName: 'Hastings',
      neighborhoods: [
        'Hastings',
        'Downtown Hastings',
        'Vermillion edges',
        'Mississippi riverfront edges',
        'Nininger edges',
        'Marshan edges',
      ],
      housingTypes: 'Older SFH, multi-unit, river-town stock',
      challenges: [
        'US-61 corridor timing',
        'Older multi-unit stairs',
        'Longer empty miles from south-metro cores',
      ],
      moverTips:
        'Do not price Hastings like Eagan multi-family. Photo stair stock. Price US-61 empty miles honestly.',
      cityKeywords: [
        'hastings',
      ],
    },
    {
      id: 'rosemount-farmington',
      name: 'Rosemount, Farmington & interior growth',
      shortName: 'Rosemount / Farmington',
      neighborhoods: [
        'Rosemount',
        'Farmington',
        'Empire edges',
        'Coates edges',
        'Vermillion Township edges',
        'Eureka edges',
      ],
      housingTypes: 'Growth SFH, townhomes, rural-edge lots',
      challenges: [
        'Long empty miles',
        'Rural driveway approaches',
        'School-calendar peaks',
      ],
      moverTips:
        'Survey long driveways and outbuildings. Price empty miles. Book peak school windows early.',
      cityKeywords: [
        'rosemount',
        'farmington',
      ],
    },
  ],
  costDrivers: {
    title: 'What drives Dakota County moving costs',
    intro:
      'HOA admin, multi-unit elevators, I-35 freeflow, and winter driveway ice move the number more than packing skill alone.',
    drivers: [
      {
        title: 'HOA COI packets & timed windows',
        detail:
          'Eagan–Burnsville–Apple Valley multi-family add admin soft costs before packing skill matters.',
      },
      {
        title: 'I-35 · I-494 · MN-77 congestion',
        detail:
          'South-metro to core pairs burn portal-to-portal hours.',
      },
      {
        title: 'Southern empty miles (Lakeville / Farmington)',
        detail:
          'Growth edges raise staging distance vs Eagan multi-unit hops.',
      },
      {
        title: 'Winter ice on driveways & walks',
        detail:
          'December–March reshapes outdoor labor and cancellation risk.',
      },
      {
        title: 'Mixed river-town vs HOA product',
        detail:
          'Hastings older stock and Lakeville cul-de-sacs need different truck plans.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (simple access)',
        value: '$500–$1,800+',
        note: 'Higher with elevators or peak I-35 pairs',
      },
      {
        label: '2–3BR townhome or multi-unit',
        value: '$1,400–$4,200+',
        note: 'HOA and elevator soft costs trend up',
      },
      {
        label: '3–4+ BR / long south-metro pair',
        value: '$2,800–$8,500+',
        note: 'Lakeville empty miles and high-value SFH price highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$115–$200+/hr',
        note: 'Portal-to-portal; HOA admin and stairs scale up',
      },
    ],
  },
  seasonal: {
    title: 'When to schedule a Dakota County move',
    intro:
      'School calendars, HOA windows, winter ice, and I-35 peaks reshape access and crew availability.',
    items: [
      {
        title: 'Best windows: mid-week early mornings',
        detail:
          'Tuesday–Thursday starts clear HOA docks and ease I-35 pain. Avoid month-end Fridays.',
      },
      {
        title: 'Peak season: late May–mid-September',
        detail:
          'Family and multi-unit turnover fills first. Book 2–4 weeks ahead for peak weekends.',
      },
      {
        title: 'Winter: driveway ice and weather cancellations',
        detail:
          'December–March favors flexible dates and early starts.',
      },
      {
        title: 'School-year mid-month spikes',
        detail:
          'Family relocations often land around school calendars rather than only Saturday peaks.',
      },
    ],
  },
  specialized: [
    {
      id: 'south-metro-hoa',
      title: 'South-metro HOA & multi-family logistics module',
      intro:
        'Dakota estimates fail more often on HOA packets, elevator windows, and I-35 freeflow than on packing skill alone.',
      bullets: [
        'Collect HOA COI packets and timed windows before the survey is final.',
        'Survey elevator multi-unit separately from Lakeville driveway SFH.',
        'Price portal-to-portal time for I-35, I-494, MN-77, and MN-13 pairs at peak.',
        'Plan winter ice contingency on outdoor carries.',
        'Clarify Eagan vs Burnsville vs Apple Valley vs Lakeville addresses on every estimate.',
        'Verify MnDOT household goods mover permit for in-state-only jobs and FMCSA for interstate legs.',
      ],
    },
    {
      id: 'not-minneapolis-south-clone',
      title: 'South collar vs Minneapolis core module',
      intro:
        'A single “metro rate” collapses when south-metro HOA product and Minneapolis tower product diverge.',
      bullets: [
        'Do not price Eagan townhomes like North Loop lofts.',
        'Ask which I-35 vs MN-77 approaches the crew will actually use.',
        'Match school-calendar family inventories to crews experienced with high-volume SFH packing.',
        'Keep Dakota vs Hennepin / Ramsey county lines clear on multi-address estimates.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Dakota County?',
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
              'Independent districts serve Burnsville-Eagan-Savage, Rosemount-Apple Valley-Eagan, Lakeville, Farmington, Hastings, and others. Assignment is address-based — marketing city names do not guarantee a campus.',
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
              'M Health Fairview Ridges (Burnsville), Allina and HealthPartners clinics, and downtown Minneapolis / St. Paul specialty campuses serve south metro. Confirm insurance networks.',
          },
          {
            title: 'What relocators should do',
            detail:
              'Map peak-hour drive times from Lakeville or Eagan to preferred campuses — I-35 and I-494 congestion change “nearby” on paper.',
          },
        ],
      },
      {
        id: 'housing',
        title: 'Housing character & cost pressures',
        bullets: [
          {
            title: 'HOA multi-family, growth SFH & river-town stock',
            detail:
              'Expect townhomes and multi-family in Eagan–Burnsville–Apple Valley; growth SFH in Lakeville–Farmington; older river-town stock in Hastings.',
          },
          {
            title: 'Cost variation inside the county',
            detail:
              'Purchase prices and rents vary by city and product. Budget for HOA dues and longer commute tradeoffs.',
          },
          {
            title: 'HOA governance',
            detail:
              'Associations often control move hours, truck size, and deposits. Read documents carefully.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Which Dakota areas fit whom',
        bullets: [
          {
            title: 'Eagan multi-family and corporate adjacency',
            detail:
              'Suits people prioritizing newer multi-unit and job-corridor access — with HOA tradeoffs on move day.',
          },
          {
            title: 'Burnsville / Apple Valley family growth',
            detail:
              'Often appeals for schools and amenities — with I-35 freeflow and multi-unit mix.',
          },
          {
            title: 'Lakeville southern space',
            detail:
              'Attracts households seeking newer SFH — with longer empty miles and winter driveway logistics.',
          },
          {
            title: 'Hastings river-town character',
            detail:
              'Fits buyers chasing smaller-city feel — with older stock and US-61 staging norms.',
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
              'South-metro corporate campuses, retail and logistics along I-35 / I-494, healthcare, and reverse-commutes into Minneapolis / St. Paul concentrate demand.',
          },
          {
            title: 'Commute realism',
            detail:
              'I-35, I-494, and MN-77 peaks are real. Test peak routes before choosing solely on purchase price.',
          },
        ],
      },
      {
        id: 'lifestyle',
        title: 'Lifestyle & practical livability',
        bullets: [
          {
            title: 'South-metro family rhythm',
            detail:
              'Dakota stacks HOA growth suburbs and river-town edges — different from Minneapolis core or Anoka north-metro patterns.',
          },
          {
            title: 'Climate',
            detail:
              'Continental four-season climate with long cold winters. Plan outdoor staging and ice contingency as part of move-in.',
          },
          {
            title: 'Culture and pace',
            detail:
              'Parks, schools, and family calendars set local rhythms. Visit at peak and off-peak times when deciding.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Dakota County resources',
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify MnDOT household goods mover permit status for in-state moves and FMCSA for interstate legs before deposits.',
    items: [
      {
        label: 'Dakota County — official site',
        href: 'https://www.co.dakota.mn.us/',
        external: true,
        note: 'County services & info',
      },
      {
        label: '511mn — traffic conditions',
        href: 'https://511mn.org/',
        external: true,
        note: 'I-35 / I-494 before load windows',
      },
      {
        label: 'Metro Transit',
        href: 'https://www.metrotransit.org/',
        external: true,
        note: 'Commute planning where service exists',
      },
    ],
  },
  directoryHint:
    'Prefer crews with HOA multi-family experience for Eagan–Burnsville–Apple Valley product; cul-de-sac SFH fluency for Lakeville; honest I-35 · I-494 · MN-77 timing. Verify MnDOT household goods mover permit for in-state moves and FMCSA for interstate legs.',
  lastReviewed: '2026-07-24',
});

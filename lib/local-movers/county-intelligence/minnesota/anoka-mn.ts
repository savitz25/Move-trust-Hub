import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeMnPack,
  MN_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/minnesota/mn-shared';

/**
 * Anoka County, MN — north-metro growth, Coon Rapids/Blaine corridors (not Dakota south, not Hennepin core, not Washington MN east).
 */
export const anokaCountyMnIntelligence: CountyIntelligencePack = finalizeMnPack({
  countySlug: 'anoka',
  hubTitle: 'Anoka County Moving Intelligence Hub',
  eyebrow: 'Anoka · North-metro growth, Coon Rapids–Blaine corridors & US-10 logistics',
  h1: 'Moving in Anoka County: North Metro Growth, Blaine Corridors & US-10 Access',
  heroOpener:
    'Anoka County is not a south-metro Dakota HOA clone and not a Minneapolis elevator template — it is north-metro growth across Coon Rapids, Blaine, Andover, Anoka, and Ramsey with US-10 / I-35W / MN-65 freeflow that rewrites short-map-mile estimates. A Blaine townhome HOA window, a Coon Rapids multi-unit elevator, an Andover cul-de-sac SFH, and an Anoka river-town approach do not share truck access or empty-mile cost. Winter driveway ice and school-calendar peaks are real inputs. This hub is for people moving in Anoka County — not a renamed Hennepin or Dakota page.',
  heroCredibility:
    'MnDOT household goods mover permit for intrastate moves · FMCSA for interstate · North-metro growth logistics awareness · Curated listings',
  majorCorridors: 'I-35W · US-10 · MN-65 · MN-47 · 610 corridors',
  whatMakesDifferent: {
    title: 'What makes moving in Anoka County different',
    intro:
      'These are north-metro realities — growth HOAs, US-10 freeflow, and river-town edges — not downtown Minneapolis towers, Dakota south-metro patterns, or Washington County, MN east-metro product.',
    bullets: [
      {
        title: 'North-metro growth multi-family and HOA product dominate many jobs',
        detail:
          'Blaine, Coon Rapids, and Andover multi-unit often need COI packets and timed windows. Older Anoka river-town stock does not share that stack.',
      },
      {
        title: 'I-35W, US-10, MN-65, and 610 corridors burn portal time',
        detail:
          'Blaine ↔ Minneapolis or Coon Rapids ↔ Roseville pairs look local and still burn 30–70+ minutes at peak.',
      },
      {
        title: 'Growth edges vs river-town Anoka are different access products',
        detail:
          'Andover cul-de-sacs and Anoka older multi-unit do not share truck length or staging norms with Blaine townhomes.',
      },
      {
        title: 'School calendars and family relo waves cluster Saturdays',
        detail:
          'North-metro family moves pack fleets May–September. Mid-week mornings clear HOA docks faster.',
      },
      {
        title: 'Winter ice on driveways reshapes outdoor carries',
        detail:
          'December–March adds cancellation risk — flexible dates reduce soft costs.',
      },
      {
        title: 'Multi-county north-metro pairs are routine',
        detail:
          'Households regularly move Anoka ↔ Hennepin, Ramsey, Washington (MN), or Sherburne. Clarify county lines so MnDOT vs FMCSA assumptions stay accurate when any leg leaves Minnesota.',
      },
      MN_REG_BULLET,
    ],
  },
  zonesHeading: 'Anoka County access zones',
  zonesIntro:
    'Plan by Blaine growth multi-family, Coon Rapids multi-unit belts, Andover–Ramsey SFH edges, Anoka river-town core, and eastern Lino Lakes–East Bethel approaches.',
  zones: [
    {
      id: 'blaine-growth',
      name: 'Blaine growth multi-family & townhomes',
      shortName: 'Blaine',
      neighborhoods: [
        'Blaine',
        'National Sports Center edges',
        'Radisson corridors',
        'Lexington edges',
        'Club West edges',
        'Northtown edges',
      ],
      housingTypes: 'Townhomes, multi-family, growth SFH',
      challenges: [
        'HOA COI and timed windows',
        'US-10 / MN-65 freeflow',
        'School-calendar peaks',
      ],
      moverTips:
        'Collect HOA packets early. Price US-10 / MN-65 honestly. Prefer mid-week starts.',
      cityKeywords: [
        'blaine',
      ],
    },
    {
      id: 'coon-rapids',
      name: 'Coon Rapids multi-unit & river-adjacent stock',
      shortName: 'Coon Rapids',
      neighborhoods: [
        'Coon Rapids',
        'Riverdale edges',
        'Foley corridors',
        'Mississippi river edges',
        'Coon Creek edges',
        'Evergreen edges',
      ],
      housingTypes: 'Multi-family, townhomes, SFH',
      challenges: [
        'US-10 / MN-47 congestion',
        'Elevator multi-unit mix',
        'Winter driveway ice',
      ],
      moverTips:
        'Book elevators early on multi-unit. Survey river-adjacent access. Price US-10 honestly.',
      cityKeywords: [
        'coon rapids',
      ],
    },
    {
      id: 'andover-ramsey-sfh',
      name: 'Andover, Ramsey & northwestern SFH growth',
      shortName: 'Andover / Ramsey',
      neighborhoods: [
        'Andover',
        'Ramsey',
        'Nowthen edges',
        'Oak Grove edges',
        'Crooked Lake edges',
        'Rum River edges',
      ],
      housingTypes: 'Suburban SFH, townhomes, rural-edge lots',
      challenges: [
        'Longer empty miles',
        'Cul-de-sac truck access',
        'Winter driveway ice',
      ],
      moverTips:
        'Price empty miles honestly. Photo driveway pitch. Confirm HOA on townhomes.',
      cityKeywords: [
        'andover',
        'ramsey',
        'nowthen',
        'oak grove',
      ],
    },
    {
      id: 'anoka-core',
      name: 'Anoka city river-town core',
      shortName: 'Anoka city',
      neighborhoods: [
        'Anoka',
        'Downtown Anoka',
        'Rum River edges',
        'Main Street corridors',
        'Fridley border edges',
        'Champlin border edges',
      ],
      housingTypes: 'Older SFH, multi-unit, river-town stock',
      challenges: [
        'Older multi-unit stairs',
        'US-10 / Main Street freeflow',
        'Mixed product with growth edges',
      ],
      moverTips:
        'Do not price Anoka core like Blaine townhomes. Photo stair stock. Clarify city vs township addresses.',
      cityKeywords: [
        'anoka',
        'fridley',
        'champlin',
      ],
    },
    {
      id: 'east-anoka',
      name: 'Lino Lakes, Circle Pines & eastern approaches',
      shortName: 'East Anoka',
      neighborhoods: [
        'Lino Lakes',
        'Circle Pines',
        'Lexington',
        'Centerville',
        'Columbus edges',
        'East Bethel edges',
      ],
      housingTypes: 'SFH, townhomes, lake-adjacent stock',
      challenges: [
        'I-35W / 610 freeflow',
        'Lake-adjacent staging',
        'Longer empty miles vs Blaine',
      ],
      moverTips:
        'Price 610 / I-35W pairs honestly. Survey lake-adjacent curb. Book peak weekends early.',
      cityKeywords: [
        'lino lakes',
        'circle pines',
        'lexington',
        'centerville',
        'east bethel',
      ],
    },
    {
      id: 'columbia-heights-fridley',
      name: 'Columbia Heights, Fridley & southern Anoka multi-unit',
      shortName: 'South Anoka multi-unit',
      neighborhoods: [
        'Columbia Heights',
        'Fridley',
        'Spring Lake Park',
        'Hilltop',
        'St. Anthony border edges',
        'New Brighton border edges',
      ],
      housingTypes: 'Multi-unit apartments, older SFH, duplexes',
      challenges: [
        'I-694 / MN-65 freeflow',
        'Multi-flight stock',
        'Lease-end volume spikes',
      ],
      moverTips:
        'Survey stairs carefully. Prefer mid-week starts. Clarify Anoka vs Ramsey county lines on border addresses.',
      cityKeywords: [
        'columbia heights',
        'fridley',
        'spring lake park',
        'hilltop',
      ],
    },
  ],
  costDrivers: {
    title: 'What drives Anoka County moving costs',
    intro:
      'HOA admin, multi-unit elevators, US-10 freeflow, and winter driveway ice move the number more than packing skill alone.',
    drivers: [
      {
        title: 'HOA COI packets & timed windows',
        detail:
          'Blaine–Coon Rapids multi-family add admin soft costs before packing skill matters.',
      },
      {
        title: 'I-35W · US-10 · MN-65 · 610 congestion',
        detail:
          'North-metro to core pairs burn portal-to-portal hours.',
      },
      {
        title: 'Northwestern empty miles (Andover / Ramsey)',
        detail:
          'Growth edges raise staging distance vs Coon Rapids multi-unit hops.',
      },
      {
        title: 'Winter ice on driveways & walks',
        detail:
          'December–March reshapes outdoor labor and cancellation risk.',
      },
      {
        title: 'Mixed river-town vs growth product',
        detail:
          'Anoka core older stock and Blaine townhomes need different truck plans.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (simple access)',
        value: '$500–$1,800+',
        note: 'Higher with elevators or peak US-10 pairs',
      },
      {
        label: '2–3BR townhome or multi-unit',
        value: '$1,400–$4,200+',
        note: 'HOA and elevator soft costs trend up',
      },
      {
        label: '3–4+ BR / long north-metro pair',
        value: '$2,800–$8,500+',
        note: 'Andover empty miles and high-value SFH price highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$115–$200+/hr',
        note: 'Portal-to-portal; HOA admin and stairs scale up',
      },
    ],
  },
  seasonal: {
    title: 'When to schedule an Anoka County move',
    intro:
      'School calendars, HOA windows, winter ice, and US-10 peaks reshape access and crew availability.',
    items: [
      {
        title: 'Best windows: mid-week early mornings',
        detail:
          'Tuesday–Thursday starts clear HOA docks and ease US-10 / I-35W pain.',
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
      id: 'north-metro-growth',
      title: 'North-metro growth & US-10 logistics module',
      intro:
        'Anoka estimates fail more often on HOA packets, elevator windows, and US-10 freeflow than on packing skill alone.',
      bullets: [
        'Collect HOA COI packets and timed windows before the survey is final.',
        'Survey elevator multi-unit separately from Andover driveway SFH.',
        'Price portal-to-portal time for I-35W, US-10, MN-65, MN-47, and 610 pairs at peak.',
        'Plan winter ice contingency on outdoor carries.',
        'Clarify Blaine vs Coon Rapids vs Andover vs Anoka city addresses on every estimate.',
        'Verify MnDOT household goods mover permit for in-state-only jobs and FMCSA for interstate legs.',
      ],
    },
    {
      id: 'not-dakota-south-clone',
      title: 'North collar vs south collar module',
      intro:
        'A single “metro collar rate” collapses when Anoka north-growth and Dakota south-HOA product diverge.',
      bullets: [
        'Do not price Blaine townhomes like Eagan multi-family as interchangeable — freeflow corridors differ (US-10 vs I-35 south).',
        'Ask which approach corridors the crew will actually use at load and unload.',
        'Keep Anoka vs Hennepin / Ramsey county lines clear on multi-address estimates.',
        'Match school-calendar family inventories to crews experienced with high-volume SFH packing.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Anoka County?',
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
              'Independent districts serve Anoka-Hennepin, Spring Lake Park, Fridley, Columbia Heights, St. Francis, Centennial, and others. Assignment is address-based — marketing city names do not guarantee a campus.',
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
              'Mercy Hospital (Coon Rapids / Allina), nearby M Health Fairview and HealthPartners clinics, and downtown Minneapolis specialty campuses serve north metro. Confirm insurance networks.',
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
              'Expect growth townhomes and multi-family in Blaine–Coon Rapids; SFH in Andover–Ramsey; older multi-unit and river-town stock in Anoka city and southern multi-unit belts.',
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
            title: 'Blaine growth multi-family',
            detail:
              'Suits people prioritizing newer multi-unit and amenities — with HOA tradeoffs on move day.',
          },
          {
            title: 'Coon Rapids multi-unit and river edges',
            detail:
              'Often appeals for relative value and access — with US-10 freeflow and elevator norms.',
          },
          {
            title: 'Andover / Ramsey space',
            detail:
              'Attracts households seeking newer SFH — with longer empty miles and winter driveway logistics.',
          },
          {
            title: 'Anoka river-town character',
            detail:
              'Fits buyers chasing smaller-city feel — with older stock and Main Street staging norms.',
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
              'North-metro retail and logistics, healthcare, manufacturing, and reverse-commutes into Minneapolis / St. Paul concentrate demand.',
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
              'Anoka stacks north-metro growth suburbs and river-town edges — different from Dakota south-metro patterns or Minneapolis core density.',
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
    title: 'Useful Anoka County resources',
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify MnDOT household goods mover permit status for in-state moves and FMCSA for interstate legs before deposits.',
    items: [
      {
        label: 'Anoka County — official site',
        href: 'https://www.anokacountymn.gov/',
        external: true,
        note: 'County services & info',
      },
      {
        label: '511mn — traffic conditions',
        href: 'https://511mn.org/',
        external: true,
        note: 'I-35W / US-10 before load windows',
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
    'Prefer crews with HOA multi-family experience for Blaine–Coon Rapids product; cul-de-sac SFH fluency for Andover; honest I-35W · US-10 · MN-65 · 610 timing. Verify MnDOT household goods mover permit for in-state moves and FMCSA for interstate legs.',
  lastReviewed: '2026-07-24',
});

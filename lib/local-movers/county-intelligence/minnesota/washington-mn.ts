import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeMnPack,
  MN_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/minnesota/mn-shared';

/**
 * Washington County, MN — Stillwater / Woodbury east metro, St. Croix edge. NOT Washington State. NOT Seattle/King. NOT OR Washington County.
 */
export const washingtonCountyMnIntelligence: CountyIntelligencePack = finalizeMnPack({
  countySlug: 'washington',
  hubTitle: 'Washington County (Minnesota) Moving Intelligence Hub',
  eyebrow: 'Washington County, MN · Woodbury multi-family, Stillwater historic core & St. Croix edge',
  h1: 'Moving in Washington County, MN: Woodbury Growth, Stillwater Access & East Metro Corridors',
  heroOpener:
    'Washington County, Minnesota is not Washington State, not Seattle King County logistics, and not Oregon’s Washington County suburb belt — it is Twin Cities east-metro product across Woodbury multi-family and HOAs, Stillwater historic river-town stock, Cottage Grove growth, and St. Croix River approaches with I-94 / MN-36 freeflow that rewrites short-map-mile estimates. A Woodbury townhome HOA window, a Stillwater downtown walk-up, and a Lake Elmo cul-de-sac do not share truck access or empty-mile cost. Winter ice and bridge approaches are real inputs. This hub is for people moving in Washington County, MN — not a renamed Seattle page or generic east-metro script.',
  heroCredibility:
    'MnDOT household goods mover permit for intrastate moves · FMCSA for interstate · East-metro MN & St. Croix logistics awareness · Curated listings',
  majorCorridors: 'I-94 · I-494/694 links · MN-36 · MN-5 · St. Croix approaches',
  whatMakesDifferent: {
    title: 'What makes moving in Washington County, MN different',
    intro:
      'These are Minnesota east-metro realities — Woodbury HOAs, Stillwater historic stock, and St. Croix approaches — not Seattle rain logistics, not Oregon suburb product, and not Minneapolis west-metro elevators alone.',
    bullets: [
      {
        title: 'This is Minnesota’s Washington County — not Washington State',
        detail:
          'Ignore any mental model from Seattle, Tacoma, or Portland-metro Washington County, OR. Corridors, climate, and regulators are Minnesota-specific (MnDOT HHG + FMCSA).',
      },
      {
        title: 'Woodbury multi-family and HOA product dominate many east-metro jobs',
        detail:
          'Timed windows, COI packets, and elevator multi-unit are common. Stillwater historic walk-ups do not share that stack.',
      },
      {
        title: 'Stillwater river-town and historic core rewrite labor',
        detail:
          'Downtown Stillwater stairs, tight curb, and tourism-season staging differ from Woodbury cul-de-sacs a few miles away.',
      },
      {
        title: 'I-94, MN-36, MN-5, and St. Croix approaches burn portal time',
        detail:
          'Woodbury ↔ St. Paul or Stillwater ↔ Maplewood pairs look local and still burn 25–60+ minutes at peak.',
      },
      {
        title: 'Wisconsin border pairs can flip authority to interstate FMCSA',
        detail:
          'Short St. Croix crossings into Pierce County, WI need FMCSA — a MnDOT permit alone is not enough.',
      },
      {
        title: 'Winter ice and bridge freeflow reshape outdoor carries',
        detail:
          'December–March adds cancellation risk and longer outdoor walks on ice — flexible dates reduce soft costs.',
      },
      {
        title: 'Multi-county east-metro pairs are routine',
        detail:
          'Households regularly move Washington (MN) ↔ Ramsey, Dakota, Anoka, or Hennepin. Clarify Minnesota county lines so MnDOT vs FMCSA assumptions stay accurate.',
      },
      MN_REG_BULLET,
    ],
  },
  zonesHeading: 'Washington County, MN access zones',
  zonesIntro:
    'Plan by Woodbury multi-family, Stillwater historic core, Cottage Grove growth, Oakdale–Lake Elmo mid-belt, and northern Hugo–Forest Lake approaches — product differs more than ZIP alone.',
  zones: [
    {
      id: 'woodbury-multifamily',
      name: 'Woodbury multi-family, townhomes & HOA growth',
      shortName: 'Woodbury',
      neighborhoods: [
        'Woodbury',
        'Tamarack edges',
        'Radio Drive corridors',
        'City Walk edges',
        'Bailey edges',
        'Heatherton edges',
      ],
      housingTypes: 'Townhomes, mid-rise multi-family, SFH',
      challenges: [
        'HOA COI and timed windows',
        'Elevator multi-unit',
        'I-94 / MN-5 freeflow',
      ],
      moverTips:
        'Collect HOA packets before dispatch. Book elevators early. Price I-94 honestly.',
      cityKeywords: [
        'woodbury',
      ],
    },
    {
      id: 'stillwater-historic',
      name: 'Stillwater historic core & St. Croix river-town stock',
      shortName: 'Stillwater',
      neighborhoods: [
        'Stillwater',
        'Downtown Stillwater',
        'South Hill edges',
        'North Hill edges',
        'Oak Park Heights edges',
        'Bayport edges',
      ],
      housingTypes: 'Older SFH, walk-up multi-unit, historic stock',
      challenges: [
        'Tight downtown curb and tourism staging',
        'Multi-flight stairs',
        'St. Croix approach freeflow',
      ],
      moverTips:
        'Prefer mid-week starts in tourism season. Photo stair and curb options. Clarify Stillwater vs Oak Park Heights addresses.',
      cityKeywords: [
        'stillwater',
        'oak park heights',
        'bayport',
      ],
    },
    {
      id: 'cottage-grove-south',
      name: 'Cottage Grove & southern growth',
      shortName: 'Cottage Grove',
      neighborhoods: [
        'Cottage Grove',
        'St. Paul Park edges',
        'Newport edges',
        'Grey Cloud edges',
        'East Cottage Grove edges',
        'Jamaica Avenue corridors',
      ],
      housingTypes: 'Growth SFH, townhomes, multi-family',
      challenges: [
        'US-61 / I-494 freeflow',
        'Cul-de-sac truck access',
        'Winter driveway ice',
      ],
      moverTips:
        'Price US-61 empty miles honestly. Survey cul-de-sacs. Confirm HOA on townhomes.',
      cityKeywords: [
        'cottage grove',
        'st paul park',
        'newport',
      ],
    },
    {
      id: 'oakdale-lake-elmo',
      name: 'Oakdale, Lake Elmo & mid-belt suburbs',
      shortName: 'Oakdale / Lake Elmo',
      neighborhoods: [
        'Oakdale',
        'Lake Elmo',
        'Landfall edges',
        'Northdale edges',
        'Ideal edges',
        'Sunfish Lake border edges',
      ],
      housingTypes: 'SFH, townhomes, multi-family',
      challenges: [
        'I-94 / I-694 freeflow',
        'Mixed HOA and older multi-unit',
        'Longer empty miles vs Woodbury cores',
      ],
      moverTips:
        'Clarify Oakdale vs Woodbury addresses. Price I-94 / I-694 honestly. Survey HOA packets early.',
      cityKeywords: [
        'oakdale',
        'lake elmo',
        'landfall',
      ],
    },
    {
      id: 'north-washington',
      name: 'Hugo, Forest Lake & northern approaches',
      shortName: 'North Washington',
      neighborhoods: [
        'Hugo',
        'Forest Lake',
        'Scandia edges',
        'Marine on St. Croix edges',
        'Grant edges',
        'Mahtomedi edges',
      ],
      housingTypes: 'SFH, lake-adjacent stock, rural-edge lots',
      challenges: [
        'I-35E / MN-36 freeflow',
        'Lake-adjacent staging',
        'Long empty miles',
      ],
      moverTips:
        'Price empty miles honestly for northern pairs. Survey lake driveways. Book peak summer weekends early.',
      cityKeywords: [
        'hugo',
        'forest lake',
        'scandia',
        'mahtomedi',
        'marine on st croix',
      ],
    },
  ],
  costDrivers: {
    title: 'What drives Washington County, MN moving costs',
    intro:
      'HOA admin, Stillwater historic access, I-94 freeflow, and winter ice move the number more than packing skill alone.',
    drivers: [
      {
        title: 'HOA COI packets & Woodbury multi-unit elevators',
        detail:
          'East-metro multi-family add admin soft costs before packing skill matters.',
      },
      {
        title: 'Stillwater historic stairs & tourism curb',
        detail:
          'River-town stock adds flight counts and staging constraints.',
      },
      {
        title: 'I-94 · MN-36 · MN-5 · St. Croix freeflow',
        detail:
          'East-metro to core pairs burn portal-to-portal hours.',
      },
      {
        title: 'Wisconsin border authority complexity',
        detail:
          'Short St. Croix hops may require FMCSA rather than MnDOT alone.',
      },
      {
        title: 'Winter ice on driveways & walks',
        detail:
          'December–March reshapes outdoor labor and cancellation risk.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (simple access)',
        value: '$500–$1,900+',
        note: 'Higher with elevators or peak I-94 pairs',
      },
      {
        label: '2–3BR townhome or multi-unit',
        value: '$1,500–$4,500+',
        note: 'HOA and elevator soft costs trend up',
      },
      {
        label: '3–4+ BR / Stillwater historic / long pair',
        value: '$2,900–$9,000+',
        note: 'Historic stairs and empty miles price highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$115–$205+/hr',
        note: 'Portal-to-portal; HOA admin and stairs scale up',
      },
    ],
  },
  seasonal: {
    title: 'When to schedule a Washington County, MN move',
    intro:
      'HOA windows, Stillwater tourism peaks, winter ice, and I-94 freeflow reshape access and crew availability.',
    items: [
      {
        title: 'Best windows: mid-week early mornings',
        detail:
          'Tuesday–Thursday starts clear HOA docks and ease I-94 / MN-36 pain. Prefer mid-week in Stillwater tourism season.',
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
        title: 'Stillwater summer tourism spikes',
        detail:
          'Weekend downtown staging is harder Memorial Day–Labor Day — mid-week wins.',
      },
    ],
  },
  specialized: [
    {
      id: 'east-metro-mn-not-wa-state',
      title: 'East-metro Minnesota (not Washington State) logistics module',
      intro:
        'Washington County, MN estimates fail more often on HOA packets, Stillwater staging, and I-94 freeflow than on packing skill alone — and must never inherit Seattle/King County assumptions.',
      bullets: [
        'Label every estimate as Washington County, Minnesota — never assume Washington State regulators or corridors.',
        'Collect HOA COI packets for Woodbury multi-family before the survey is final.',
        'Photo Stillwater stair counts and downtown curb options separately from Woodbury driveways.',
        'Price portal-to-portal time for I-94, MN-36, MN-5, and St. Croix approaches at peak.',
        'Clarify Wisconsin destinations early — short border hops often need FMCSA.',
        'Verify MnDOT household goods mover permit for in-state-only jobs and FMCSA for interstate legs.',
      ],
    },
    {
      id: 'st-croix-woodbury-stillwater',
      title: 'Woodbury multi-family vs Stillwater historic micro-market module',
      intro:
        'A single “east metro rate” collapses when Woodbury HOA product and Stillwater river-town product diverge.',
      bullets: [
        'Do not price downtown Stillwater walk-ups like Woodbury townhome elevators.',
        'Ask which I-94 vs MN-36 approaches the crew will actually use.',
        'Match tourism-season Stillwater calendars separately from school-calendar Woodbury peaks.',
        'Keep Washington (MN) vs Ramsey county lines clear on multi-address estimates.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Washington County, Minnesota?',
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
              'Independent districts serve South Washington County (Woodbury/Cottage Grove area), Stillwater Area, Forest Lake, Mahtomedi, and others. Assignment is address-based — marketing city names do not guarantee a campus.',
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
              'Lakeview Hospital (Stillwater), nearby HealthPartners and M Health Fairview clinics, and St. Paul specialty campuses serve east metro. Confirm insurance networks.',
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
              'Expect multi-family and HOA townhomes in Woodbury; historic SFH and walk-ups in Stillwater; growth SFH in Cottage Grove; lake-adjacent and rural-edge stock north.',
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
            title: 'Woodbury multi-family and amenities',
            detail:
              'Suits people prioritizing newer multi-unit and retail access — with HOA tradeoffs on move day.',
          },
          {
            title: 'Stillwater historic river-town lifestyle',
            detail:
              'Often appeals for character and St. Croix adjacency — with stairs, tourism curb, and winter staging constraints.',
          },
          {
            title: 'Cottage Grove southern growth',
            detail:
              'Attracts households seeking newer SFH — with US-61 freeflow and cul-de-sac logistics.',
          },
          {
            title: 'Northern lake and rural-edge options',
            detail:
              'Fits buyers chasing space — with longer empty miles and lake-access norms.',
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
              'East-metro retail and logistics, healthcare, professional reverse-commutes into St. Paul / Minneapolis, and Wisconsin-border employment concentrate demand.',
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
              'Washington County, MN stacks east-metro HOA suburbs and St. Croix river-town edges — different from Minneapolis core, Dakota south-metro, and never equivalent to Washington State markets.',
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
    title: 'Useful Washington County, MN resources',
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify MnDOT household goods mover permit status for in-state moves and FMCSA for interstate legs before deposits. This page covers Washington County, Minnesota — not Washington State.',
    items: [
      {
        label: 'Washington County, MN — official site',
        href: 'https://www.co.washington.mn.us/',
        external: true,
        note: 'County services & info (Minnesota)',
      },
      {
        label: 'City of Woodbury',
        href: 'https://www.woodburymn.gov/',
        external: true,
        note: 'City services where relevant',
      },
      {
        label: 'City of Stillwater',
        href: 'https://www.stillwatermn.gov/',
        external: true,
        note: 'Historic core & city services',
      },
      {
        label: '511mn — traffic conditions',
        href: 'https://511mn.org/',
        external: true,
        note: 'I-94 / MN-36 before load windows',
      },
    ],
  },
  directoryHint:
    'Prefer crews with HOA multi-family experience for Woodbury product; historic walk-up fluency for Stillwater; honest I-94 · MN-36 · MN-5 · St. Croix timing. Never apply Washington State assumptions. Verify MnDOT household goods mover permit for in-state moves and FMCSA for interstate legs.',
  lastReviewed: '2026-07-24',
});

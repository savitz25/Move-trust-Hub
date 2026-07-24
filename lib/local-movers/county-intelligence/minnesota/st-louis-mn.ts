import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeMnPack,
  MN_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/minnesota/mn-shared';

/**
 * St. Louis County, MN — Duluth / North Shore / port logistics. NOT St. Louis, Missouri.
 */
export const stLouisCountyMnIntelligence: CountyIntelligencePack = finalizeMnPack({
  countySlug: 'st-louis',
  hubTitle: 'St. Louis County (Minnesota) Moving Intelligence Hub',
  eyebrow: 'St. Louis County, MN · Duluth hills, North Shore access & port-city logistics',
  h1: 'Moving in St. Louis County, MN: Duluth Access, North Shore Logistics & Port-City Corridors',
  heroOpener:
    'St. Louis County, Minnesota is not St. Louis, Missouri and not a Twin Cities spillover market — it is Duluth hill grades and multi-unit stairs, Lake Superior weather, North Shore second-home access along MN-61, port-city freeflow, and I-35 / US-53 logistics that rewrite “local” estimates. A Canal Park multi-unit elevator, a hillside Orient Heights walk-up, a Hermantown HOA driveway, and a Two Harbors cabin approach do not share truck access or winter contingency needs. Lake-effect snow and tourism peaks are real inputs. This hub is for people moving in St. Louis County, MN — not a renamed Missouri page or Minneapolis clone.',
  heroCredibility:
    'MnDOT household goods mover permit for intrastate moves · FMCSA for interstate · Duluth hill & North Shore logistics awareness · Curated listings',
  majorCorridors: 'I-35 · US-53 · MN-61 (North Shore) · local Duluth grid',
  whatMakesDifferent: {
    title: 'What makes moving in St. Louis County, MN different',
    intro:
      'These are Duluth and Arrowhead realities — hill grades, lake weather, and North Shore access — not Twin Cities multi-county freeflow and not St. Louis, Missouri river logistics.',
    bullets: [
      {
        title: 'This is Minnesota’s St. Louis County — not St. Louis, Missouri',
        detail:
          'Ignore Missouri metro assumptions. Corridors, climate, and regulators are Minnesota-specific (MnDOT HHG + FMCSA).',
      },
      {
        title: 'Hill grades and multi-flight stock rewrite labor in Duluth',
        detail:
          'Hillside streets, stairs, and winter ice fail estimates more often than packing skill alone. Flat-rate optimism from prairie driveways underprices carries.',
      },
      {
        title: 'North Shore MN-61 second-home and cabin access is a different product',
        detail:
          'Narrow approaches, seasonal occupancy, and longer empty miles differ from Hermantown HOA driveways.',
      },
      {
        title: 'I-35, US-53, and MN-61 freeflow turn short pairs into billable hours',
        detail:
          'Downtown Duluth ↔ Hermantown or Duluth ↔ Two Harbors pairs look local and still burn portal time — especially in tourism season and winter storms.',
      },
      {
        title: 'Lake Superior weather and lake-effect snow reshape outdoor carries',
        detail:
          'November–April adds cancellation risk, ice, and wind. Prefer flexible dates and early starts.',
      },
      {
        title: 'Wisconsin Superior and Twin Cities pairs are routine',
        detail:
          'Households regularly move St. Louis (MN) ↔ Douglas County, WI or Twin Cities. Clarify destinations so MnDOT vs FMCSA assumptions stay accurate when any leg leaves Minnesota.',
      },
      MN_REG_BULLET,
    ],
  },
  zonesHeading: 'St. Louis County, MN access zones',
  zonesIntro:
    'Plan by downtown Duluth vertical product, hillside neighborhoods, Hermantown–Proctor suburbs, North Shore MN-61 corridor, and interior Range approaches.',
  zones: [
    {
      id: 'downtown-duluth-canal',
      name: 'Downtown Duluth, Canal Park & waterfront multi-unit',
      shortName: 'Downtown / Canal Park',
      neighborhoods: [
        'Downtown Duluth',
        'Canal Park',
        'Fitger\'s edges',
        'Lake Avenue corridors',
        'Bayfront edges',
        'Endion edges',
      ],
      housingTypes: 'Multi-unit, loft conversions, mid-rise, limited elevators',
      challenges: [
        'Elevator/COI where present',
        'Tourism curb and event freeflow',
        'I-35 approach congestion',
      ],
      moverTips:
        'Book elevators early. Prefer mid-week starts in tourism season. Confirm waterfront staging rules.',
      cityKeywords: [
        'duluth',
        'canal park',
      ],
    },
    {
      id: 'duluth-hillsides',
      name: 'Hillside, East Hillside & multi-flight Duluth stock',
      shortName: 'Hillsides',
      neighborhoods: [
        'East Hillside',
        'Observation Hill edges',
        'Central Hillside',
        'Duluth Heights edges',
        'Kenwood edges',
        'Woodland edges',
      ],
      housingTypes: 'Older SFH, walk-up multi-unit, hillside grades',
      challenges: [
        'Steep grades and multi-flight stairs',
        'Winter ice on hills',
        'Limited truck length on steep streets',
      ],
      moverTips:
        'Photo grades and stair counts. Prefer smaller trucks when required. Plan winter ice contingency aggressively.',
      cityKeywords: [
        'duluth',
        'woodland',
        'kenwood',
      ],
    },
    {
      id: 'hermantown-proctor',
      name: 'Hermantown, Proctor & western suburban edges',
      shortName: 'Hermantown / Proctor',
      neighborhoods: [
        'Hermantown',
        'Proctor',
        'Midway edges',
        'Solway edges',
        'Canosia edges',
        'Rice Lake edges',
      ],
      housingTypes: 'Suburban SFH, townhomes, multi-family',
      challenges: [
        'I-35 / US-53 freeflow',
        'HOA timed windows',
        'Longer empty miles vs hillside core',
      ],
      moverTips:
        'Collect HOA packets early. Price I-35 / US-53 honestly. Do not price Hermantown like Canal Park elevators.',
      cityKeywords: [
        'hermantown',
        'proctor',
        'rice lake',
      ],
    },
    {
      id: 'north-shore-mn61',
      name: 'North Shore MN-61 corridor (Two Harbors & shore towns)',
      shortName: 'North Shore',
      neighborhoods: [
        'Two Harbors',
        'Knife River edges',
        'French River edges',
        'Larsmont edges',
        'Silver Bay edges',
        'North Shore cabin corridors',
      ],
      housingTypes: 'Second homes, cabins, small-town SFH, limited multi-unit',
      challenges: [
        'MN-61 seasonal congestion',
        'Narrow approaches and long empty miles',
        'Seasonal occupancy access',
      ],
      moverTips:
        'Survey cabin access early. Avoid peak summer Friday arrivals when flexible. Price MN-61 empty miles honestly.',
      cityKeywords: [
        'two harbors',
        'silver bay',
        'knife river',
      ],
    },
    {
      id: 'range-interior',
      name: 'Interior Range & western St. Louis approaches',
      shortName: 'Range / interior',
      neighborhoods: [
        'Virginia edges',
        'Hibbing edges',
        'Eveleth edges',
        'Mountain Iron edges',
        'Chisholm edges',
        'Floodwood edges',
      ],
      housingTypes: 'Small-city multi-unit, SFH, rural-edge lots',
      challenges: [
        'US-53 long empty miles',
        'Winter weather contingency',
        'Thinner local crew density',
      ],
      moverTips:
        'Price empty miles and weather buffers honestly. Survey rural driveways. Confirm crew travel day costs in writing.',
      cityKeywords: [
        'virginia',
        'hibbing',
        'eveleth',
        'chisholm',
        'floodwood',
      ],
    },
  ],
  costDrivers: {
    title: 'What drives St. Louis County, MN moving costs',
    intro:
      'Hill grades, lake weather, North Shore empty miles, and winter ice move the number more than packing skill alone.',
    drivers: [
      {
        title: 'Hillside grades & multi-flight stairs',
        detail:
          'Duluth hill stock adds labor and truck-size constraints before packing skill matters.',
      },
      {
        title: 'North Shore MN-61 empty miles & cabin access',
        detail:
          'Seasonal shore product raises staging distance and approach difficulty.',
      },
      {
        title: 'I-35 · US-53 freeflow & tourism curb',
        detail:
          'Downtown pairs burn portal-to-portal hours in peak season.',
      },
      {
        title: 'Lake-effect snow, ice & wind',
        detail:
          'November–April reshapes outdoor labor and cancellation risk.',
      },
      {
        title: 'Wisconsin Superior & long regional pairs',
        detail:
          'Border and Range hauls add authority complexity and empty miles.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (simple access)',
        value: '$450–$1,700+',
        note: 'Higher with hills, elevators, or peak tourism windows',
      },
      {
        label: '2–3BR hillside or multi-unit',
        value: '$1,300–$4,200+',
        note: 'Grades and stairs trend up',
      },
      {
        label: '3–4+ BR / North Shore cabin / long pair',
        value: '$2,600–$8,500+',
        note: 'MN-61 empty miles and winter risk price highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$110–$195+/hr',
        note: 'Portal-to-portal; grades and weather scale up',
      },
    ],
  },
  seasonal: {
    title: 'When to schedule a St. Louis County, MN move',
    intro:
      'Tourism peaks, lake-effect winter, hill ice, and I-35 freeflow reshape access and crew availability.',
    items: [
      {
        title: 'Best windows: mid-week early mornings in shoulder seasons',
        detail:
          'Tuesday–Thursday starts clear tourism curb and ease hill ice risk. May and September often beat July weekends.',
      },
      {
        title: 'Peak tourism: June–August',
        detail:
          'Canal Park and North Shore demand surge. Book 2–4 weeks ahead for peak weekends.',
      },
      {
        title: 'Winter: lake-effect snow, ice, and wind',
        detail:
          'November–April favors flexible dates and early starts — hills punish inflexible plans.',
      },
      {
        title: 'Second-home shoulder turns',
        detail:
          'Spring open-ups and fall winterizations cluster shore demand outside pure lease calendars.',
      },
    ],
  },
  specialized: [
    {
      id: 'duluth-north-shore',
      title: 'Duluth hill, port-city & North Shore logistics module',
      intro:
        'St. Louis County, MN estimates fail more often on hill surveys, winter ice, and MN-61 empty miles than on packing skill alone.',
      bullets: [
        'Photo hill grades, stair counts, and truck length before the survey is final.',
        'Plan winter ice and wind contingency aggressively for hillside outdoor carries.',
        'Price portal-to-portal time for I-35, US-53, and MN-61 pairs — including tourism and storm days.',
        'Survey North Shore cabin access separately from Hermantown HOA driveways.',
        'Clarify Wisconsin Superior destinations early — border hops need FMCSA.',
        'Label every estimate as St. Louis County, Minnesota — never assume St. Louis, Missouri.',
        'Verify MnDOT household goods mover permit for in-state-only jobs and FMCSA for interstate legs.',
      ],
    },
    {
      id: 'not-twin-cities-spillover',
      title: 'Arrowhead vs Twin Cities micro-market module',
      intro:
        'A single “Minnesota rate” collapses when Duluth port-city product and Twin Cities multi-county logistics diverge.',
      bullets: [
        'Do not price Duluth hillsides like Minneapolis walk-ups as interchangeable empty-mile markets.',
        'Ask which I-35 vs MN-61 approaches the crew will actually use.',
        'Match tourism and second-home calendars separately from Twin Cities lease-end waves.',
        'Keep St. Louis (MN) vs Twin Cities multi-county destinations clear on every estimate.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to St. Louis County, Minnesota?',
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
              'Duluth Public Schools covers most city addresses; Hermantown, Proctor, and other communities operate separate systems. Assignment is address-based.',
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
              'Essentia Health and St. Luke\'s campuses anchor Duluth care; regional clinics serve North Shore and Range communities. Confirm insurance networks.',
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
              'Expect hillside SFH and multi-unit in Duluth; multi-unit near Canal Park; suburban SFH in Hermantown–Proctor; cabins and second homes on the North Shore; small-city stock on the Range.',
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
            title: 'Downtown / Canal Park multi-unit',
            detail:
              'Suits people prioritizing walkability and waterfront amenities — with tourism curb and elevator tradeoffs.',
          },
          {
            title: 'Hillside character living',
            detail:
              'Often appeals for views and older stock — with grades, stairs, and winter ice constraints.',
          },
          {
            title: 'Hermantown / Proctor suburban space',
            detail:
              'Attracts households seeking driveways and schools — with I-35 freeflow tradeoffs.',
          },
          {
            title: 'North Shore second-home lifestyle',
            detail:
              'Fits seasonal and recreational buyers — with MN-61 access and weather logistics.',
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
              'Healthcare, education (including University of Minnesota Duluth), port and logistics, tourism, and Range industry concentrate demand.',
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
              'St. Louis County, MN is an Arrowhead port and shore market — different from Twin Cities collars, Rochester medical corridors, and never equivalent to St. Louis, Missouri.',
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
    title: 'Useful St. Louis County, MN resources',
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify MnDOT household goods mover permit status for in-state moves and FMCSA for interstate legs before deposits. This page covers St. Louis County, Minnesota — not St. Louis, Missouri.',
    items: [
      {
        label: 'City of Duluth — official site',
        href: 'https://duluthmn.gov/',
        external: true,
        note: 'Permits, services & city info',
      },
      {
        label: 'St. Louis County, MN',
        href: 'https://www.stlouiscountymn.gov/',
        external: true,
        note: 'County services (Minnesota)',
      },
      {
        label: '511mn — traffic conditions',
        href: 'https://511mn.org/',
        external: true,
        note: 'I-35 / MN-61 before load windows',
      },
    ],
  },
  directoryHint:
    'Prefer crews with hillside grade fluency for Duluth product; North Shore cabin access experience for MN-61 stock; honest I-35 · US-53 · MN-61 timing. Never apply St. Louis, Missouri assumptions. Verify MnDOT household goods mover permit for in-state moves and FMCSA for interstate legs.',
  lastReviewed: '2026-07-24',
});

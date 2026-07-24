import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeIlPack,
  IL_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/illinois/il-shared';

/**
 * McHenry County, IL — far-north collar, lower density, longer runs (not Lake North Shore clone).
 * Crystal Lake/McHenry/Woodstock, US-14/IL-31/IL-47, I-90 links.
 */
export const mcHenryCountyIlIntelligence: CountyIntelligencePack = finalizeIlPack({
  countySlug: 'mchenry',
  hubTitle: 'McHenry County Moving Intelligence Hub',
  eyebrow: 'McHenry · far-north collar · Crystal Lake, Woodstock & longer-run logistics',
  h1: 'Moving in McHenry County: Lower-Density Towns, Longer Runs & US-14 / IL-47 Logistics',
  heroOpener:
    'McHenry County is the far-north collar: lower density than Lake or DuPage, longer empty miles between towns, and a mix of Crystal Lake and McHenry suburban product, Woodstock and Harvard small-city grids, and rural-lot edges where driveway length beats elevator checklists. A Crystal Lake HOA two-story, a Woodstock craftsman, a Huntley growth-tract ranch, and a winter move off IL-47 do not share truck access or crew skill. US-14, IL-31, IL-47, and I-90 links rewrite “local” estimates that assume short Naperville-style hops. This hub is for people moving in McHenry County — not a renamed Lake County North Shore page or generic Illinois template.',
  heroCredibility:
    'Illinois Commerce Commission (ICC) Household Goods license for intrastate moves · FMCSA for interstate · Far-north collar, longer-run & rural-edge access awareness · Curated listings',
  majorCorridors: 'US-14 · IL-31 · IL-47 · I-90 links',
  whatMakesDifferent: {
    title: 'What makes moving in McHenry County different',
    intro:
      'These are McHenry far-north realities — lower density, longer inter-town runs, and rural-edge driveways — not Lake’s North Shore estate stack or DuPage’s dense I-88 HOA belt.',
    bullets: [
      {
        title: 'Longer runs are the default, not the exception',
        detail:
          'Crystal Lake ↔ Harvard, Huntley ↔ McHenry, or Woodstock ↔ Algonquin pairs burn real portal time. Quotes built for short collar hops underprice McHenry empty miles.',
      },
      {
        title: 'Lower density means fewer trucks nearby at peak',
        detail:
          'Crew supply is thinner than Cook or DuPage on summer Saturdays. Book earlier and expect staging yards farther from some west-county parcels.',
      },
      {
        title: 'US-14, IL-31, and IL-47 are the spine — not a dense expressway grid',
        detail:
          'Signal density, farm equipment, and two-lane segments reshape timing. I-90 links help only for south/east-bound pairs — they do not collapse every cross-county estimate.',
      },
      {
        title: 'Growth tracts and small-city grids both exist',
        detail:
          'Huntley and Lake in the Hills HOA product needs gate packets; Woodstock and Harvard older grids need curb and stair surveys. Do not treat the county as one product type.',
      },
      {
        title: 'Rural-edge lots rewrite labor with driveways and soft shoulders',
        detail:
          'Long gravel or narrow drives, limited turn radius, and tree canopy add hours that subdivision ranch quotes never capture.',
      },
      {
        title: 'Winter hits open roads and long exterior carries hard',
        detail:
          'Wind-driven snow across open parcels and icy rural approaches slow crews more than dense urban blocks. Build flexible weather windows November–March.',
      },
      {
        title: 'Cross-county and Wisconsin-border pairs are routine',
        detail:
          'Households regularly move McHenry ↔ Lake, Kane, Cook, or Walworth/WI destinations. Clarify state lines so ICC vs FMCSA assumptions stay accurate when any leg leaves Illinois.',
      },
      IL_REG_BULLET,
    ],
  },
  zonesHeading: 'McHenry County access zones',
  zonesIntro:
    'Plan by Crystal Lake–Lake in the Hills south-central, McHenry–Johnsburg Fox River north, Woodstock–Harvard west, Huntley–Algonquin I-90 edge, and rural township parcels — access rules cluster by zone more than ZIP alone.',
  zones: [
    {
      id: 'crystal-lake-lith',
      name: 'Crystal Lake, Lake in the Hills & south-central McHenry',
      shortName: 'Crystal Lake / LITH',
      neighborhoods: [
        'Crystal Lake',
        'Lake in the Hills',
        'Lakewood',
        'Cary edges',
        'Oakwood Hills edges',
      ],
      housingTypes: 'HOA SFH, townhomes, established suburban SFH, some condo',
      challenges: [
        'HOA gate lists and approved hours on growth tracts',
        'US-14 congestion at peak',
        'High Saturday family demand May–August',
      ],
      moverTips:
        'Collect HOA packets first. Book peak Saturdays early. Price US-14 pairs honestly for any Algonquin- or Huntley-linked job.',
      cityKeywords: [
        'crystal lake',
        'lake in the hills',
        'lakewood',
        'cary',
        'oakwood hills',
      ],
    },
    {
      id: 'mchenry-johnsburg',
      name: 'McHenry, Johnsburg, Wonder Lake & Fox River north',
      shortName: 'McHenry / Johnsburg',
      neighborhoods: [
        'McHenry',
        'Johnsburg',
        'Wonder Lake',
        'Spring Grove edges',
        'Fox River residential pockets',
      ],
      housingTypes: 'SFH, lakefront and river-adjacent product, some multi-unit',
      challenges: [
        'IL-31 timing and seasonal lake traffic',
        'Driveway grade near water edges',
        'Longer empty miles to I-90 staging',
      ],
      moverTips:
        'Survey driveway grade and turn radius near water. Prefer early starts in summer lake season. Inventory outdoor and garage gear carefully.',
      cityKeywords: [
        'mchenry',
        'johnsburg',
        'wonder lake',
        'spring grove',
      ],
    },
    {
      id: 'woodstock-harvard',
      name: 'Woodstock, Harvard & western McHenry small cities',
      shortName: 'Woodstock / Harvard',
      neighborhoods: [
        'Woodstock',
        'Harvard',
        'Marengo edges',
        'Union edges',
        'Western township pockets',
      ],
      housingTypes: 'Older SFH, small-city grids, larger-lot edges, some new subdivisions',
      challenges: [
        'Long empty miles from east-county crews',
        'IL-47 / US-14 approach timing',
        'Limited curb on older downtown-adjacent streets',
      ],
      moverTips:
        'Price empty miles honestly. Photo curb and driveway options. Confirm access notes for parcels without clear street parking.',
      cityKeywords: ['woodstock', 'harvard', 'marengo', 'union'],
    },
    {
      id: 'huntley-algonquin-i90',
      name: 'Huntley, Algonquin, Barrington Hills edges & I-90 links',
      shortName: 'Huntley / Algonquin',
      neighborhoods: [
        'Huntley',
        'Algonquin',
        'Lake in the Hills west edges',
        'Barrington Hills edges',
        'I-90 residential pockets',
      ],
      housingTypes: 'Master-planned HOA SFH, townhomes, estate-edge lots',
      challenges: [
        'HOA truck limits on Huntley growth tracts',
        'I-90 peak freeflow collapse toward Cook/Kane',
        'Cross-county pairs into Kane or Cook',
      ],
      moverTips:
        'Collect HOA COI early. Build I-90 buffers for reverse-commute and city-linked pairs. Clarify Kane vs McHenry addresses on border parcels.',
      cityKeywords: [
        'huntley',
        'algonquin',
        'barrington hills',
        'i-90',
      ],
    },
    {
      id: 'rural-township-edges',
      name: 'Rural township edges & agricultural-lot residential',
      shortName: 'Rural edges',
      neighborhoods: [
        'Western and northern township parcels',
        'Agricultural-edge homes',
        'Unincorporated McHenry pockets',
        'Hebron / Richmond edges',
      ],
      housingTypes: 'Large-lot SFH, farmhouses, long driveways, limited HOA',
      challenges: [
        'Long gravel drives and soft shoulders',
        'Limited truck turn radius and overhead clearance',
        'Cell coverage and wayfinding risk for crews',
      ],
      moverTips:
        'Pre-walk driveway length, grade, and turnaround space. Share GPS pins and gate codes. Price rural empty miles and weather risk explicitly.',
      cityKeywords: [
        'hebron',
        'richmond',
        'unincorporated',
        'township',
        'rural mchenry',
      ],
    },
  ],
  costDrivers: {
    title: 'What drives McHenry County moving costs',
    intro:
      'Ranges are market context for local / short regional moves — not quotes. Empty miles, rural driveways, and thinner peak crew supply separate cheap estimates from real bills.',
    drivers: [
      {
        title: 'Longer inter-town empty miles',
        detail:
          'Lower density means portal-to-portal time dominates more than in DuPage or near-north Lake.',
      },
      {
        title: 'US-14 / IL-31 / IL-47 / I-90 link timing',
        detail:
          'Corridor congestion and two-lane segments burn hours that “local” labels hide.',
      },
      {
        title: 'Rural driveway length, grade & soft shoulders',
        detail:
          'Agricultural-edge lots add labor and equipment risk before packing skill matters.',
      },
      {
        title: 'HOA growth tracts on Huntley–Crystal Lake fabric',
        detail:
          'Gate lists and approved hours push demand into peak pricing when crew supply is already thin.',
      },
      {
        title: 'Cross-county and WI-border empty miles',
        detail:
          'Lake, Kane, Cook, and interstate destinations raise staging distance and authority complexity.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (simple access)',
        value: '$400–$1,250+',
        note: 'Higher with long empty miles or rural driveways',
      },
      {
        label: '2–3BR condo or modest SFH',
        value: '$1,150–$3,400+',
        note: 'HOA soft costs and distance trend up',
      },
      {
        label: '3–4+ BR / rural-edge / cross-zone',
        value: '$2,100–$6,500+',
        note: 'Long IL-47 pairs and rural lots price highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$100–$170+/hr',
        note: 'Portal-to-portal; distance and packing scale up',
      },
    ],
  },
  seasonal: {
    title: 'When to schedule a McHenry County move',
    intro:
      'School calendars, thinner peak crew supply, winter open-road weather, and HOA windows reshape access and availability.',
    items: [
      {
        title: 'Best windows: mid-week early mornings',
        detail:
          'Tuesday–Thursday starts clear curb and reduce US-14 / IL-47 / I-90 pain. Avoid month-end Fridays when leases and HOA windows collide.',
      },
      {
        title: 'Peak family season: late May–mid-August',
        detail:
          'Crystal Lake, Huntley, and McHenry SFH Saturday demand fills first — and supply is thinner than inner-collar counties. Book 3–5 weeks ahead for peak weekends.',
      },
      {
        title: 'Winter: wind-driven snow and icy rural approaches',
        detail:
          'Open parcels and long drives ice over quickly. Prefer flexible dates, early starts, and salt/mats for exterior paths.',
      },
      {
        title: 'Summer lake and fair-adjacent traffic',
        detail:
          'Wonder Lake and local event weekends can clog IL-31 approaches. Schedule around major events when flexible.',
      },
    ],
  },
  specialized: [
    {
      id: 'mchenry-long-run-rural',
      title: 'Far-north longer-run & rural-edge logistics module',
      intro:
        'McHenry estimates fail more often on empty miles and driveway access than on packing skill alone.',
      bullets: [
        'Price portal-to-portal time for any pair that rides US-14, IL-31, IL-47, or I-90 links — do not assume short collar hops.',
        'Pre-walk driveway length, grade, turnaround, and overhead clearance on rural and lake-edge lots.',
        'Collect HOA COI, gate lists, and approved hours for Huntley–Crystal Lake–Lake in the Hills product.',
        'Book peak summer Saturdays earlier than you would in denser collar counties.',
        'Clarify McHenry vs Lake / Kane / Cook / Wisconsin addresses on every estimate.',
        'Verify Illinois Commerce Commission (ICC) Household Goods authority for in-state-only jobs and FMCSA for interstate legs.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to McHenry County?',
    intro:
      'Use this as a practical fit checklist — schools, healthcare, housing character, and commute realism — then verify on district and hospital sites. No single ranking captures town fit.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & education landscape',
        bullets: [
          {
            title: 'How districts work here',
            detail:
              'McHenry County is served by multiple elementary and high-school districts (Crystal Lake-area, McHenry, Woodstock, Huntley, and others). Assignment is address-based — marketing names do not guarantee a campus.',
          },
          {
            title: 'Growth areas and capacity',
            detail:
              'Huntley and other growth corridors can see enrollment pressure. Ask the specific district about capacity, transfers, and busing when touring.',
          },
          {
            title: 'Research sources',
            detail:
              'District boundary tools, Illinois State Board of Education data, and campus visits beat ranking screenshots alone.',
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
              'Northwestern Medicine McHenry / Huntley-area campuses, Mercyhealth Woodstock, and other regional facilities serve the county, with additional specialty options toward Lake and Cook. Confirm networks for your household.',
          },
          {
            title: 'What relocators should do',
            detail:
              'Map peak-hour drive times from Harvard or Wonder Lake to preferred campuses — longer runs change “nearby” on paper. Transfer records early.',
          },
        ],
      },
      {
        id: 'housing',
        title: 'Housing character & cost pressures',
        bullets: [
          {
            title: 'Suburban tracts, small cities & rural lots',
            detail:
              'Expect HOA and suburban SFH around Crystal Lake, Huntley, and Algonquin; small-city grids in Woodstock and Harvard; larger agricultural-edge lots in western and northern townships.',
          },
          {
            title: 'Cost variation inside the county',
            detail:
              'Purchase prices and rents are often lower than inner-collar counties — budget for longer commutes, vehicle dependency, and rural maintenance (wells, septic, long drives) where applicable.',
          },
          {
            title: 'HOA and unincorporated rules',
            detail:
              'Planned communities control move hours and truck size; unincorporated parcels may lack HOA rules but still present physical access limits. Confirm both paperwork and driveway reality.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Which McHenry areas fit whom',
        bullets: [
          {
            title: 'Crystal Lake–Lake in the Hills suburban lifestyle',
            detail:
              'Suits families prioritizing amenities and schools with a classic collar feel — with HOA logistics and US-14 timing.',
          },
          {
            title: 'McHenry–Johnsburg–Wonder Lake water edges',
            detail:
              'Often appeals for recreation and space — with seasonal traffic and driveway grade constraints.',
          },
          {
            title: 'Woodstock–Harvard small-city and west county',
            detail:
              'Attracts households seeking quieter towns and value — with longer empty miles to job centers.',
          },
          {
            title: 'Huntley–Algonquin I-90 edge',
            detail:
              'Fits reverse-commuters and growth-tract buyers — with HOA rules and tollway peak realism.',
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
              'Healthcare, manufacturing, retail, local services, and reverse-commute or Chicago-bound corridors via I-90 and US-14 concentrate demand. Many residents work outside the county.',
          },
          {
            title: 'Commute realism',
            detail:
              'Car dependence is high. US-14, IL-31, IL-47, and I-90 peaks are real — and distances are longer than marketing maps imply. Test drive peak routes before choosing solely on purchase price.',
          },
        ],
      },
      {
        id: 'lifestyle',
        title: 'Lifestyle & practical livability',
        bullets: [
          {
            title: 'One county, far-north pace',
            detail:
              'McHenry stacks suburban HOA towns, small historic downtowns, lake recreation, and agricultural edges — different from Lake’s North Shore prestige stack or Kane’s Fox River dual urban cores.',
          },
          {
            title: 'Climate',
            detail:
              'Cold windy winters, hot humid summers, and open-land snow drift. Plan outdoor staging and weather contingency as part of move-in.',
          },
          {
            title: 'Culture and pace',
            detail:
              'Daily life is more small-town and outdoor oriented than inner-collar counties; dining and events cluster in Crystal Lake, Woodstock, and McHenry. Visit at peak and off-peak times when deciding.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful McHenry County resources',
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify Illinois Commerce Commission (ICC) household goods authority for in-state moves and FMCSA for interstate legs.',
    items: [
      {
        label: 'McHenry County — official site',
        href: 'https://www.mchenrycountyil.gov/',
        external: true,
        note: 'County services & offices',
      },
      {
        label: 'City of Crystal Lake',
        href: 'https://www.crystallake.org/',
        external: true,
      },
      {
        label: 'City of McHenry',
        href: 'https://www.cityofmchenry.org/',
        external: true,
      },
      {
        label: 'IDOT / Illinois traffic & road conditions',
        href: 'https://www.gettingaroundillinois.com/',
        external: true,
        note: 'US-14 / I-90 before load windows',
      },
    ],
  },
  directoryHint:
    'Prefer crews willing to price longer empty miles honestly; HOA fluency for Crystal Lake–Huntley product; rural driveway surveys for west and lake-edge lots; US-14 · IL-31 · IL-47 · I-90 link timing for cross-zone pairs. Verify Illinois Commerce Commission (ICC) Household Goods authority for in-state moves and FMCSA for interstate legs.',
  lastReviewed: '2026-07-24',
});

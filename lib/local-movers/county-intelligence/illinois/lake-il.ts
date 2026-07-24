import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeIlPack,
  IL_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/illinois/il-shared';

/**
 * Lake County, IL — North Shore edge vs inland Lake (not DuPage HOA clone, not Cook city).
 * Highland Park/Lake Forest estates, Waukegan/Round Lake inland, I-94/US-41 logistics.
 */
export const lakeCountyIlIntelligence: CountyIntelligencePack = finalizeIlPack({
  countySlug: 'lake',
  hubTitle: 'Lake County Moving Intelligence Hub',
  eyebrow: 'Lake · northern collar · North Shore edge, inland towns & I-94 corridor',
  h1: 'Moving in Lake County: North Shore Estates, Inland Suburbs & I-94 Logistics',
  heroOpener:
    'Lake County is a split personality market: North Shore–edge towns with estate lots, tree canopy, and high-value inventories; inland growth from Gurnee to Round Lake and Mundelein with HOA tracts and retail corridors; and Waukegan–North Chicago stock that mixes multi-unit and workforce housing near industrial and naval-adjacent edges. A Lake Forest circular drive, a Vernon Hills HOA gate list, a Waukegan walk-up, and a winter move off US-41 do not share truck access or crew skill. I-94, I-294 links, US-41, IL-60, and IL-120 rewrite “local” estimates that ignore long carries, HOA packets, and peak Tri-State portal time. This hub is for people moving in Lake County — not a renamed Naperville page or generic Illinois template.',
  heroCredibility:
    'Illinois Commerce Commission (ICC) Household Goods license for intrastate moves · FMCSA for interstate · North Shore estate, inland HOA & I-94 corridor awareness · Curated listings',
  majorCorridors: 'I-94 · I-294 links · US-41 · IL-60 · IL-120',
  whatMakesDifferent: {
    title: 'What makes moving in Lake County different',
    intro:
      'These are Lake County realities — North Shore estate access vs inland HOA growth, I-94/US-41 timing, and mixed density — not DuPage’s I-88 corporate belt or Chicago street-permit micro-markets.',
    bullets: [
      {
        title: 'North Shore edge vs inland Lake are different jobs',
        detail:
          'Highland Park, Lake Forest, Lake Bluff, and Winnetka-edge product often means long driveways, tree canopy, and high-value packing. Gurnee, Round Lake, and Grayslake tracts are HOA and volume-driven. Do not quote them as one county average.',
      },
      {
        title: 'Estate lots rewrite labor before packing skill matters',
        detail:
          'Circular drives, limited truck turn radius, and long exterior carries on North Shore and Libertyville-area estates add hours that inland ranch quotes never capture.',
      },
      {
        title: 'I-94 and US-41 turn short map miles into billable time',
        detail:
          'Waukegan ↔ Deerfield, Round Lake ↔ Highland Park, or Gurnee ↔ Vernon Hills pairs look local and still burn 40–75+ minutes at peak. Price portal-to-portal honestly.',
      },
      {
        title: 'Inland HOA villages dominate western growth fabric',
        detail:
          'Mundelein, Vernon Hills, Grayslake, and Round Lake growth often require gate lists, truck limits, and approved hours. Collect packets early.',
      },
      {
        title: 'Waukegan and North Chicago multi-unit stock still matters',
        detail:
          'Walk-ups, denser rentals, and industrial-edge timing need stair surveys and different curb rules than estate or HOA product.',
      },
      {
        title: 'IL-60 and IL-120 reshape east–west inland timing',
        detail:
          'Retail and signal density on IL-60 / IL-120 corridors add empty minutes that North Shore-only quotes underprice when the job spans the county.',
      },
      {
        title: 'Cross-county and Wisconsin-border pairs are routine',
        detail:
          'Households regularly move Lake ↔ Cook, McHenry, or Kenosha/WI destinations. Clarify state lines so ICC vs FMCSA assumptions stay accurate when any leg leaves Illinois.',
      },
      IL_REG_BULLET,
    ],
  },
  zonesHeading: 'Lake County access zones',
  zonesIntro:
    'Plan by North Shore edge estates, south-central Vernon Hills–Libertyville, Waukegan–North Chicago, west inland growth (Round Lake–Grayslake–Mundelein), and Gurnee–I-94 retail corridors — access rules cluster by zone more than ZIP alone.',
  zones: [
    {
      id: 'north-shore-edge',
      name: 'North Shore edge (Highland Park, Lake Forest, Lake Bluff & edges)',
      shortName: 'North Shore edge',
      neighborhoods: [
        'Highland Park',
        'Lake Forest',
        'Lake Bluff',
        'Deerfield edges',
        'Bannockburn edges',
      ],
      housingTypes: 'Estate SFH, large lots, some condo and denser village product',
      challenges: [
        'Long driveways, circular drives, and tree canopy',
        'High-value packing and white-glove expectations',
        'US-41 / I-94 approach timing',
      ],
      moverTips:
        'Pre-walk driveway length, grade, and turn radius. Inventory art and specialty items carefully. Prefer experienced high-value crews.',
      cityKeywords: [
        'highland park',
        'lake forest',
        'lake bluff',
        'deerfield',
        'bannockburn',
      ],
    },
    {
      id: 'vernon-hills-libertyville',
      name: 'Vernon Hills, Libertyville & south-central Lake',
      shortName: 'Vernon Hills / Libertyville',
      neighborhoods: [
        'Vernon Hills',
        'Libertyville',
        'Mundelein south edges',
        'Lincolnshire',
        'Buffalo Grove Lake edges',
      ],
      housingTypes: 'HOA SFH, townhomes, condo villages, established SFH',
      challenges: [
        'HOA gate lists and approved move hours',
        'IL-60 retail congestion',
        'Mixed product on short distances',
      ],
      moverTips:
        'Collect HOA packets first. Price IL-60 and I-94 pairs honestly. Confirm unit type before final estimate.',
      cityKeywords: [
        'vernon hills',
        'libertyville',
        'mundelein',
        'lincolnshire',
        'buffalo grove',
      ],
    },
    {
      id: 'waukegan-north-chicago',
      name: 'Waukegan, North Chicago & lakeshore industrial edges',
      shortName: 'Waukegan / North Chicago',
      neighborhoods: [
        'Waukegan',
        'North Chicago',
        'Park City edges',
        'Lakeshore industrial-adjacent residential',
      ],
      housingTypes: 'Multi-unit walk-ups, modest SFH, workforce multifamily',
      challenges: [
        'Stairs and limited curb on denser blocks',
        'US-41 / industrial truck traffic',
        'Lease-end waves and shorter notice jobs',
      ],
      moverTips:
        'Survey stair counts and curb options. Avoid peak industrial ingress when flexible. Clarify storage needs for short-notice transfers.',
      cityKeywords: ['waukegan', 'north chicago', 'park city'],
    },
    {
      id: 'west-inland-growth',
      name: 'Round Lake, Grayslake, Mundelein & west inland growth',
      shortName: 'West inland',
      neighborhoods: [
        'Round Lake',
        'Round Lake Beach',
        'Grayslake',
        'Mundelein',
        'Hainesville edges',
      ],
      housingTypes: 'HOA SFH, townhomes, larger family inventories, some older stock',
      challenges: [
        'IL-120 congestion and longer empty miles to shore',
        'HOA truck limits on newer tracts',
        'High Saturday family demand May–August',
      ],
      moverTips:
        'Book peak Saturdays early. Share gate and driveway photos. Build I-94 / IL-120 buffers for North Shore-linked pairs.',
      cityKeywords: [
        'round lake',
        'round lake beach',
        'grayslake',
        'mundelein',
        'hainesville',
      ],
    },
    {
      id: 'gurnee-i94-retail',
      name: 'Gurnee, I-94 retail corridor & central Lake links',
      shortName: 'Gurnee / I-94',
      neighborhoods: [
        'Gurnee',
        'I-94 retail residential pockets',
        'Wadsworth edges',
        'Old Mill Creek edges',
      ],
      housingTypes: 'HOA SFH, townhomes, multifamily near commercial strips',
      challenges: [
        'I-94 peak freeflow collapse and retail event traffic',
        'HOA packets on growth tracts',
        'Cross-zone pairs into McHenry or Cook',
      ],
      moverTips:
        'Build I-94 buffer for morning and evening peaks. Avoid major retail event weekends when flexible. Collect HOA COI early.',
      cityKeywords: ['gurnee', 'wadsworth', 'old mill creek', 'i-94'],
    },
  ],
  costDrivers: {
    title: 'What drives Lake County moving costs',
    intro:
      'Ranges are market context for local / short regional moves — not quotes. Estate long carries, HOA rules, and I-94/US-41 portal time separate cheap estimates from real bills.',
    drivers: [
      {
        title: 'Estate driveways, canopy & high-value inventories',
        detail:
          'North Shore-edge product adds labor and packing complexity before truck size matters.',
      },
      {
        title: 'I-94 / US-41 / IL-60 / IL-120 congestion',
        detail:
          'Shore-to-inland pairs burn portal-to-portal hours even when map miles look short.',
      },
      {
        title: 'Inland HOA master-planned rules',
        detail:
          'Gate lists, truck limits, and weekday-only windows push demand into peak pricing.',
      },
      {
        title: 'Waukegan multi-unit stairs & curb friction',
        detail:
          'Walk-ups and denser blocks add flight counts that ranch-style quotes underprice.',
      },
      {
        title: 'Cross-county and WI-border empty miles',
        detail:
          'Cook, McHenry, and interstate destinations raise staging distance and authority complexity.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (simple access)',
        value: '$450–$1,450+',
        note: 'Higher with stairs, HOA friction, or peak I-94 pairs',
      },
      {
        label: '2–3BR condo or modest SFH',
        value: '$1,300–$3,900+',
        note: 'HOA and basement soft costs trend up',
      },
      {
        label: '3–4+ BR / estate / cross-zone',
        value: '$2,500–$8,500+',
        note: 'North Shore estates and long I-94 pairs price highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$110–$195+/hr',
        note: 'Portal-to-portal; high-value packing scales up',
      },
    ],
  },
  seasonal: {
    title: 'When to schedule a Lake County move',
    intro:
      'School calendars, lake-effect winter, summer humidity, and HOA windows reshape access and crew availability.',
    items: [
      {
        title: 'Best windows: mid-week early mornings',
        detail:
          'Tuesday–Thursday starts clear curb and reduce I-94 / US-41 / IL-60 pain. Avoid month-end Fridays when leases and HOA windows collide.',
      },
      {
        title: 'Peak family season: late May–mid-August',
        detail:
          'Inland HOA SFH Saturday demand fills first. Book 2–4 weeks ahead for peak weekends and estate crew availability.',
      },
      {
        title: 'Winter: snow, ice, and lake-effect wind',
        detail:
          'North Shore and open inland parcels see wind-driven snow and icy long carries. Prefer flexible dates, early starts, and salt plans.',
      },
      {
        title: 'Retail and tourism-adjacent spikes',
        detail:
          'Gurnee and lakeshore event weekends can clog I-94 approaches. Schedule around major events when flexible.',
      },
    ],
  },
  specialized: [
    {
      id: 'lake-north-shore-inland',
      title: 'North Shore estate vs inland HOA logistics module',
      intro:
        'Lake estimates fail more often when crews treat estate long-carries and inland HOA packets as the same job.',
      bullets: [
        'Pre-walk driveway length, grade, and turn radius for North Shore and estate product.',
        'Collect HOA COI, gate lists, and approved hours for Vernon Hills–Round Lake–Mundelein tracts.',
        'Price portal-to-portal time for any pair that rides I-94, US-41, IL-60, or IL-120 at peak.',
        'Match high-value inventories to packing experience; match multi-unit Waukegan stock to stair-capable crews.',
        'Clarify Lake vs Cook / McHenry / Wisconsin addresses on every estimate.',
        'Verify Illinois Commerce Commission (ICC) Household Goods authority for in-state-only jobs and FMCSA for interstate legs.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Lake County?',
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
              'Lake County is served by multiple elementary and high-school districts across North Shore towns, inland suburbs, and Waukegan-area systems. Assignment is address-based — marketing names do not guarantee a campus.',
          },
          {
            title: 'Shore vs inland variation',
            detail:
              'District reputation and capacity differ sharply between shore communities and west inland growth. Confirm boundaries and transfer policies when touring.',
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
              'Northwestern Medicine Lake Forest, Advocate Condell, Vista / Waukegan-area campuses, and other regional facilities serve the county. Confirm networks for your household.',
          },
          {
            title: 'What relocators should do',
            detail:
              'Map peak-hour drive times from Round Lake or Gurnee to preferred shore or central campuses — I-94 and IL-120 congestion changes “nearby” on paper. Transfer records early.',
          },
        ],
      },
      {
        id: 'housing',
        title: 'Housing character & cost pressures',
        bullets: [
          {
            title: 'Estates, HOA tracts & multi-unit mix',
            detail:
              'Expect large-lot and high-value product on the North Shore edge; planned HOA SFH inland; multi-unit and modest SFH around Waukegan–North Chicago.',
          },
          {
            title: 'Cost variation inside the county',
            detail:
              'Purchase prices and rents vary dramatically shore-to-inland. Budget for taxes, HOA dues, older-estate maintenance, and insurance on higher-value inventories.',
          },
          {
            title: 'HOA and association governance',
            detail:
              'Planned communities often control move hours, truck size, and deposits. Estate streets may still have practical truck limits even without formal HOA gates.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Which Lake areas fit whom',
        bullets: [
          {
            title: 'North Shore edge estate lifestyle',
            detail:
              'Suits households prioritizing space, schools, and lake proximity — with long-driveway logistics and higher move complexity.',
          },
          {
            title: 'Vernon Hills–Libertyville south-central',
            detail:
              'Often appeals for mixed retail access and family housing — with HOA rules and IL-60 timing.',
          },
          {
            title: 'West inland growth (Round Lake–Grayslake–Mundelein)',
            detail:
              'Attracts buyers chasing newer homes and relative value — with longer shore and job-center commutes.',
          },
          {
            title: 'Waukegan–North Chicago urban edge',
            detail:
              'Fits renters and buyers seeking lower entry costs or lakeshore access — with multi-unit move logistics.',
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
              'Healthcare, manufacturing, retail/logistics along I-94, professional services, and reverse-commute or Chicago-bound Metra corridors concentrate demand.',
          },
          {
            title: 'Commute realism',
            detail:
              'Most households are car-dependent outside station towns. I-94, US-41, IL-60, and IL-120 peaks are real. Test drive peak routes before choosing solely on purchase price.',
          },
        ],
      },
      {
        id: 'lifestyle',
        title: 'Lifestyle & practical livability',
        bullets: [
          {
            title: 'One county, two lakeshores of reality',
            detail:
              'Lake stacks North Shore estates, inland HOA suburbs, retail-heavy I-94 nodes, and denser Waukegan fabric — different from DuPage’s corporate west-collar belt or McHenry’s lower-density far north.',
          },
          {
            title: 'Climate',
            detail:
              'Lake-effect wind and snow near the shore, hot humid summers, and icy winters inland. Plan outdoor staging and weather contingency as part of move-in.',
          },
          {
            title: 'Culture and pace',
            detail:
              'Shore towns feel more village and estate oriented; inland corridors are family- and retail-driven; Waukegan has a more urban-industrial edge. Visit at peak and off-peak times when deciding.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Lake County resources',
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify Illinois Commerce Commission (ICC) household goods authority for in-state moves and FMCSA for interstate legs.',
    items: [
      {
        label: 'Lake County — official site',
        href: 'https://www.lakecountyil.gov/',
        external: true,
        note: 'County services & offices',
      },
      {
        label: 'City of Waukegan',
        href: 'https://www.waukeganil.gov/',
        external: true,
      },
      {
        label: 'City of Highland Park',
        href: 'https://www.cityhpil.com/',
        external: true,
      },
      {
        label: 'IDOT / Illinois traffic & road conditions',
        href: 'https://www.gettingaroundillinois.com/',
        external: true,
        note: 'I-94 / US-41 before load windows',
      },
    ],
  },
  directoryHint:
    'Prefer crews with estate long-carry and high-value experience for North Shore-edge product; HOA fluency for inland growth tracts; stair-capable crews for Waukegan multi-unit; honest I-94 · US-41 · IL-60 · IL-120 timing for cross-zone pairs. Verify Illinois Commerce Commission (ICC) Household Goods authority for in-state moves and FMCSA for interstate legs.',
  lastReviewed: '2026-07-24',
});

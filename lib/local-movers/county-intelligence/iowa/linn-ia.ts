import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeIaPack,
  IA_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/iowa/ia-shared';

/**
 * Linn County, IA — Cedar Rapids metro / Marion / Hiawatha / Mount Vernon edges.
 * Regional industrial + residential. NOT Des Moines Polk, NOT Quad Cities, NOT Waterloo.
 */
export const linnCountyIaIntelligence: CountyIntelligencePack = finalizeIaPack({
  countySlug: 'linn',
  hubTitle: 'Linn County Moving Intelligence Hub',
  eyebrow:
    'Linn County, IA · Cedar Rapids industrial-residential core & I-380 / US-30 logistics',
  h1: 'Moving in Linn County: Cedar Rapids Access, Industrial Belts & I-380 Logistics',
  heroOpener:
    'Linn County, Iowa is the Cedar Rapids regional market — not a Des Moines insurance-corridor clone, not Quad Cities river product, and not Waterloo–Cedar Falls twin-city logistics. Expect NewBo and downtown multi-unit, Czech Village and older grid stock, Marion and Hiawatha growth belts, industrial-adjacent residential near processing and manufacturing campuses, and I-380 / US-30 / US-151 freeflow that rewrites “local” estimates. A NewBo loft dock slot, a Mound View bungalow basement, a Marion HOA driveway, and a Hiawatha industrial-edge multi-family do not share truck access or crew skill. Regional employers and residential turnover drive demand that Polk capital-city scripts do not capture. This hub is for people moving in Linn County, IA — Cedar Rapids — not a renamed Des Moines or Black Hawk page.',
  heroCredibility:
    'Iowa DOT Intrastate Motor Carrier Permit (household goods) for intrastate · FMCSA for interstate · Cedar Rapids access & I-380 logistics awareness · Curated listings',
  majorCorridors: 'I-380 · US-30 · US-151 · local Cedar Rapids grid',
  whatMakesDifferent: {
    title: 'What makes moving in Linn County different',
    intro:
      'These are Cedar Rapids regional realities — industrial-adjacent residential, NewBo multi-unit, Marion growth, and I-380 freeflow — not Des Moines I-235 insurance towers, not Quad Cities bridge pairs, and not Waterloo–Cedar Falls twin markets.',
    bullets: [
      {
        title: 'This is Cedar Rapids — not Des Moines east and not Waterloo north',
        detail:
          'Ignore Polk County corporate-elevator defaults and Black Hawk twin-city assumptions. Linn is eastern Iowa’s industrial-residential hub with processing campuses, regional healthcare, and I-380 spine logistics. Match estimates to Cedar Rapids–Marion addresses — not Des Moines scripts.',
      },
      {
        title: 'Industrial and manufacturing adjacency reshapes residential access',
        detail:
          'Freight traffic, shift-change congestion, and industrial-edge curb rules affect neighborhoods that look “simple SFH” on a map. Price portal time near plant corridors honestly.',
      },
      {
        title: 'NewBo, downtown, and Czech Village multi-unit is not Marion HOA product',
        detail:
          'Elevators, walk-ups, tight river-adjacent curb, and event freeflow dominate core jobs. A Marion cul-de-sac or Robins ranch does not share that stack.',
      },
      {
        title: 'Marion, Hiawatha, and northern growth belts rewrite labor calendars',
        detail:
          'HOA packets, school-calendar peaks, and longer empty miles vs downtown fail estimates built only on NewBo loft assumptions.',
      },
      {
        title: 'I-380, US-30, and US-151 burn portal time',
        detail:
          'Downtown ↔ Marion, Hiawatha ↔ NewBo, or Mount Vernon edges ↔ west-side pairs look local and still burn 20–50+ minutes at peak. Price portal-to-portal honestly.',
      },
      {
        title: 'Floodplain and river-corridor staging constraints are real',
        detail:
          'Cedar River adjacency and historic flood rebuild zones change street access, parking, and ground conditions. Survey curb and driveway product — do not assume dry-lot defaults year-round.',
      },
      IA_REG_BULLET,
    ],
  },
  zonesHeading: 'Linn County access zones',
  zonesIntro:
    'Plan by downtown–NewBo multi-unit, older grid and Czech Village stock, west and southwest residential, Marion–Hiawatha growth, and industrial-edge belts — access rules cluster by product more than ZIP alone.',
  zones: [
    {
      id: 'downtown-newbo',
      name: 'Downtown Cedar Rapids, NewBo & riverfront multi-unit',
      shortName: 'Downtown / NewBo',
      neighborhoods: [
        'Downtown Cedar Rapids',
        'NewBo',
        'Czech Village edges',
        'Sinclair edges',
        '1st Avenue corridors',
        'Riverfront redevelopment edges',
      ],
      housingTypes: 'Loft conversions, mid-rise multifamily, walk-up multi-unit',
      challenges: [
        'Elevator reservations, docks, and building COIs where applicable',
        'Limited legal curb and event-day freeflow',
        'I-380 / river-crossing approach congestion',
      ],
      moverTips:
        'Book elevators and COIs in writing when required. Prefer mid-week early starts. Photo dock or curb staging options near riverfront blocks.',
      cityKeywords: [
        'cedar rapids',
        'newbo',
        'downtown cedar rapids',
        'czech village',
      ],
    },
    {
      id: 'mound-view-grids',
      name: 'Mound View, Wellington Heights & older grid stock',
      shortName: 'Mound View / grids',
      neighborhoods: [
        'Mound View',
        'Wellington Heights',
        'Oak Hill Jackson edges',
        'Time Check edges',
        'Noelridge edges',
        'Mt. Vernon Road corridors',
      ],
      housingTypes: 'Older SFH, bungalows, multi-unit pockets, ranch stock',
      challenges: [
        'Basement stairs and tighter residential curb',
        'Mixed rebuild and older stock access',
        'Arterial freeflow at peak',
      ],
      moverTips:
        'Photo driveway and basement access. Survey long carries. Prefer mid-week starts on tight grid blocks.',
      cityKeywords: [
        'mound view',
        'wellington heights',
        'cedar rapids',
      ],
    },
    {
      id: 'west-southwest-cr',
      name: 'West and southwest Cedar Rapids residential belts',
      shortName: 'West / SW CR',
      neighborhoods: [
        'Westside Cedar Rapids',
        'Southwest corridors',
        'Ellis edges',
        'Johnson Avenue corridors',
        'Wiley Boulevard edges',
        'Williams Boulevard corridors',
      ],
      housingTypes: 'Ranch and split-level SFH, multi-family, townhomes',
      challenges: [
        'US-30 / I-380 freeflow',
        'Mixed multi-family and SFH access rules',
        'Longer carries on larger lots',
      ],
      moverTips:
        'Price US-30 and I-380 pairs portal-to-portal. Clarify multi-unit building rules early. Survey driveway slope and garage access.',
      cityKeywords: [
        'cedar rapids',
        'west cedar rapids',
      ],
    },
    {
      id: 'marion-hiawatha',
      name: 'Marion, Hiawatha & northern growth HOAs',
      shortName: 'Marion / Hiawatha',
      neighborhoods: [
        'Marion',
        'Hiawatha',
        'Robins edges',
        'Alburnett edges',
        'Highway 13 corridors',
        'Northern arterial belts',
      ],
      housingTypes: 'HOA SFH, townhomes, newer multi-family, ranch stock',
      challenges: [
        'HOA gate lists and truck-length limits',
        'I-380 freeflow and empty miles vs downtown',
        'School-calendar summer peaks',
      ],
      moverTips:
        'Collect HOA packets and gate codes early. Price I-380 honestly for NewBo unload pairs. Confirm Marion vs Hiawatha addresses.',
      cityKeywords: [
        'marion',
        'hiawatha',
        'robins',
      ],
    },
    {
      id: 'industrial-east-edges',
      name: 'Eastern industrial-residential & plant-corridor belts',
      shortName: 'East industrial',
      neighborhoods: [
        'Eastern industrial edges',
        'C Street corridors',
        'Blairs Ferry edges',
        'Plant-adjacent residential',
        'Northeast multi-family pockets',
        'I-380 east approach belts',
      ],
      housingTypes: 'Mixed SFH, multi-unit, industrial-adjacent residential',
      challenges: [
        'Shift-change and freight traffic spikes',
        'Industrial-adjacent staging limits',
        'I-380 freeflow at peak',
      ],
      moverTips:
        'Avoid major shift-change windows when flexible. Confirm staging limits near industrial curb. Price freeflow honestly.',
      cityKeywords: [
        'cedar rapids',
        'hiawatha',
      ],
    },
    {
      id: 'mount-vernon-lisbon-edges',
      name: 'Mount Vernon, Lisbon & southeastern college-town edges',
      shortName: 'Mt. Vernon / SE',
      neighborhoods: [
        'Mount Vernon',
        'Lisbon',
        'Cornell College edges',
        'US-30 east corridors',
        'Southeastern rural-residential',
        'Highway 1 edges',
      ],
      housingTypes: 'College-adjacent multi-unit, older SFH, rural-residential',
      challenges: [
        'Longer empty miles to Cedar Rapids core',
        'US-30 freeflow and academic calendar peaks',
        'Mixed driveway and gravel access product',
      ],
      moverTips:
        'Price empty miles honestly. Align with academic move windows when relevant. Survey rural driveway width and turnaround.',
      cityKeywords: [
        'mount vernon',
        'lisbon',
        'mt vernon',
      ],
    },
  ],
  costDrivers: {
    title: 'What drives Linn County moving costs',
    intro:
      'Access product, multi-unit admin, industrial freeflow, and I-380 / US-30 portal time move the number more than packing skill alone — this is Cedar Rapids regional logistics, not Des Moines insurance-corridor pricing.',
    drivers: [
      {
        title: 'NewBo elevators, docks & multi-unit COIs',
        detail:
          'Downtown and riverfront vertical product add labor and schedule risk before packing skill matters.',
      },
      {
        title: 'Basement stairs, older grids & floodplain-adjacent curb',
        detail:
          'Mound View, Czech Village edges, and older stock add flight counts and staging friction that flat-rate optimism underprices.',
      },
      {
        title: 'I-380 · US-30 · US-151 congestion',
        detail:
          'Cross-county pairs burn portal-to-portal hours even when map miles look short.',
      },
      {
        title: 'Marion / Hiawatha HOA gates & growth windows',
        detail:
          'Northern suburb packets rewrite jobs that look simple on a map.',
      },
      {
        title: 'Industrial shift freeflow & multi-county empty miles',
        detail:
          'Plant-corridor timing and Johnson / Benton / Jones destinations raise staging distance and schedule soft costs.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (simple access)',
        value: '$400–$1,600+',
        note: 'Higher with elevators, walk-ups, or peak I-380 pairs',
      },
      {
        label: '2–3BR condo, duplex, or mid-size SFH',
        value: '$1,250–$3,800+',
        note: 'Stairs, multi-unit, and HOA soft costs trend up',
      },
      {
        label: '3–4+ BR / multi-unit / cross-zone',
        value: '$2,400–$7,500+',
        note: 'Core multi-unit and long I-380 pairs price highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$100–$185+/hr',
        note: 'Portal-to-portal; packing, stairs, and freeflow scale up',
      },
    ],
  },
  seasonal: {
    title: 'When to schedule a Linn County move',
    intro:
      'Industrial calendars, lease cycles, school calendars, summer heat, severe-storm and flood risk windows, and winter ice reshape access across the Cedar Rapids grid.',
    items: [
      {
        title: 'Best windows: mid-week early mornings',
        detail:
          'Tuesday–Thursday starts clear curb, ease downtown freeflow, and reduce I-380 / US-30 pain. Avoid month-end Fridays when leases and multi-unit elevators collide.',
      },
      {
        title: 'Peak season: late May–mid-September',
        detail:
          'Apartment turnover and family school calendars fill first. Book 2–4 weeks ahead for peak weekends and HOA slots.',
      },
      {
        title: 'Academic edges & Mount Vernon calendar spikes',
        detail:
          'College-adjacent southeast pockets compress labor around term starts. Prefer flexible dates near Mount Vernon when possible.',
      },
      {
        title: 'Winter ice, freeze-thaw, and flood-season contingency',
        detail:
          'December–February adds icy stoops and frozen driveways; spring river stages can constrain low-lying staging. Prefer flexible dates, salt contingency, and photo-verified curb access.',
      },
    ],
  },
  specialized: [
    {
      id: 'linn-cr-industrial-residential',
      title: 'Cedar Rapids multi-unit, industrial-edge & I-380 logistics module',
      intro:
        'Linn County estimates fail more often on stair surveys, multi-unit packets, industrial freeflow, and I-380 portal time than on packing skill alone.',
      bullets: [
        'Collect building COI, elevator reservations, and dock rules for NewBo and downtown multi-unit before the survey is final.',
        'Photo stair counts, curb options, and basement access for older grid and floodplain-adjacent stock.',
        'Price portal-to-portal time for any pair that rides I-380, US-30, or US-151 at peak.',
        'Collect HOA packets early for Marion and Hiawatha product.',
        'Clarify Cedar Rapids, Marion, Hiawatha, and unincorporated addresses on every estimate.',
        'For in-state jobs verify Iowa DOT Intrastate Motor Carrier Permit covering household goods (tariffs on file); verify FMCSA for any out-of-state leg.',
      ],
    },
    {
      id: 'not-dsm-not-qc-not-waterloo',
      title: 'Not Des Moines · not Quad Cities · not Waterloo module',
      intro:
        'A single “eastern Iowa rate” collapses when Cedar Rapids industrial-residential product is confused with Polk insurance corridors, Scott river-bridge pairs, or Black Hawk twin markets.',
      bullets: [
        'Do not price NewBo lofts like Des Moines East Village towers or like Davenport riverfront stock as interchangeable defaults.',
        'Keep Linn vs Johnson / Benton / Jones county lines clear on multi-address estimates.',
        'Match industrial shift freeflow separately from Marion school-calendar waves.',
        'Treat out-of-state legs as interstate authority problems — Iowa DOT household goods permit alone is not enough for Illinois or Wisconsin delivery.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Linn County?',
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
              'Linn County spans Cedar Rapids Community Schools plus Marion Independent, Linn-Mar, College Community, Mount Vernon, Lisbon, and other systems. Assignment is address-based — marketing neighborhood names do not guarantee a campus.',
          },
          {
            title: 'Choice, boundaries & enrollment pressure',
            detail:
              'Popular programs and boundary edges can be competitive. Confirm enrollment windows early when relocating mid-year.',
          },
          {
            title: 'Research sources',
            detail:
              'District boundary tools, Iowa Department of Education data, and campus visits beat ranking screenshots alone.',
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
              'UnityPoint Health – St. Luke’s, Mercy Medical Center (Cedar Rapids), and regional specialty campuses anchor care across Linn County. Confirm insurance networks for your household.',
          },
          {
            title: 'What relocators should do',
            detail:
              'Map peak-hour drive times to preferred campuses — I-380 freeflow changes “nearby” on paper. Transfer records early.',
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
              'Expect NewBo and downtown multi-unit; older grid and Czech Village stock; west-side ranch and multi-family; Marion–Hiawatha HOA growth; industrial-edge residential; Mount Vernon college-town edges.',
          },
          {
            title: 'Cost variation inside the county',
            detail:
              'Purchase prices and rents vary by city and product. Budget for multi-unit dues, older-building repair risk, and flood-insurance questions where relevant.',
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
            title: 'Downtown / NewBo urban lifestyle',
            detail:
              'Suits people prioritizing walkability and amenities — with multi-unit access and event-day tradeoffs on move day.',
          },
          {
            title: 'Older grid / neighborhood character living',
            detail:
              'Often appeals for space and value — with basements, curb limits, and denser staging constraints.',
          },
          {
            title: 'Marion / Hiawatha growth living',
            detail:
              'Attracts households seeking newer product and schools — with HOA rules and longer empty miles to the core.',
          },
          {
            title: 'Mount Vernon / Lisbon college-town edges',
            detail:
              'Fits people prioritizing smaller-town character and academic adjacency — with longer portal time to Cedar Rapids employers.',
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
              'Food processing and manufacturing, healthcare, logistics, education, technology, and regional professional services concentrate demand across the metro.',
          },
          {
            title: 'Commute realism',
            detail:
              'Peak I-380 and US-30 freeflow is real. Test peak routes before choosing solely on rent or purchase price.',
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
              'Linn County stacks Cedar Rapids urban redevelopment, industrial-residential belts, and Marion growth — different from Des Moines capital-city product, Quad Cities river markets, and Waterloo–Cedar Falls twins.',
          },
          {
            title: 'Climate',
            detail:
              'Humid continental climate with hot summers, severe-storm and flood risk windows, and freeze-thaw winters with ice and snow. Plan outdoor staging, heat, and winter contingency as part of move-in.',
          },
          {
            title: 'Culture and pace',
            detail:
              'Visit at peak and off-peak times when deciding — industrial calendars, school seasons, arts-district event days, and winter weather reshape daily rhythm.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Linn County resources',
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify Iowa DOT Intrastate Motor Carrier Permit (household goods) status for in-state moves and FMCSA for interstate legs before deposits.',
    items: [
      {
        label: 'Linn County, Iowa — official site',
        href: 'https://www.linncountyiowa.gov/',
        external: true,
        note: 'County services & property context',
      },
      {
        label: 'City of Cedar Rapids',
        href: 'https://www.cedar-rapids.org/',
        external: true,
        note: 'Permits, services & city info',
      },
      {
        label: 'City of Marion',
        href: 'https://www.cityofmarion.org/',
        external: true,
        note: 'Northern growth municipality context',
      },
      {
        label: '511ia — Iowa traveler information',
        href: 'https://www.511ia.org/',
        external: true,
        note: 'I-380 / US-30 / US-151 before load windows',
      },
    ],
  },
  directoryHint:
    'Prefer crews with multi-unit and curb fluency for NewBo–downtown product; basement and grid experience for older residential stock; HOA fluency for Marion–Hiawatha; honest I-380 · US-30 · US-151 timing for cross-zone pairs. Verify Iowa DOT Intrastate Motor Carrier Permit covering household goods (tariffs on file) for intrastate moves and FMCSA for interstate legs before deposits.',
  lastReviewed: '2026-07-24',
});

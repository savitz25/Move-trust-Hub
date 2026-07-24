import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeMoPack,
  MO_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/missouri/mo-shared';

/**
 * Jefferson County, MO — south St. Louis metro fringe / I-55 corridor
 * (Arnold, Imperial, Hillsboro, Festus–Crystal City). Not St. Louis County clone.
 */
export const jeffersonCountyMoIntelligence: CountyIntelligencePack = finalizeMoPack({
  countySlug: 'jefferson',
  hubTitle: 'Jefferson County Moving Intelligence Hub',
  eyebrow:
    'Jefferson County · south STL fringe, Arnold–Imperial belts & I-55 / MO-21 logistics',
  h1: 'Moving in Jefferson County: South Metro Fringe Access, I-55 Corridors & Ozarks-Edge Logistics',
  heroOpener:
    'Jefferson County, Missouri is not a St. Louis County inner-ring clone and not a Chesterfield HOA template — it is the south metro fringe with Arnold and Imperial multi-family belts, High Ridge and House Springs hillside approaches, Hillsboro county-seat stock, Festus–Crystal City river-town product, and I-55 / US-61/67 / MO-21 / MO-30 freeflow that rewrites “local” estimates. An Arnold townhome gate list, a MO-21 hillside driveway, a Festus bungalow stair stack, and a De Soto larger-lot approach do not share truck access or crew skill. Peak I-55 backups toward the city turn short map miles into billable hours. This hub is for people moving in Jefferson County — not a renamed South County St. Louis page.',
  heroCredibility:
    'MoDOT Motor Carrier Services household goods authority for intrastate · FMCSA for interstate · South fringe access & I-55 logistics awareness · Curated listings',
  majorCorridors: 'I-55 · US-61/67 · MO-21 · MO-30',
  whatMakesDifferent: {
    title: 'What makes moving in Jefferson County different',
    intro:
      'These are south St. Louis metro fringe realities — I-55 growth belts, hillside approaches, and river-town stock — not Clayton elevators or Chesterfield west-corridor product alone.',
    bullets: [
      {
        title: 'South metro fringe is not St. Louis County product',
        detail:
          'Ignore Clayton COI stacks and Town & Country gate culture as defaults. Jefferson mixes multi-family growth, hillside lots, and small-town grids with longer empty miles toward the city core.',
      },
      {
        title: 'I-55, US-61/67, MO-21, and MO-30 burn portal time',
        detail:
          'Arnold ↔ Hillsboro, Imperial ↔ Festus, or Jefferson ↔ South County pairs look local and still burn 20–50+ minutes at peak and construction windows. Price portal-to-portal honestly.',
      },
      {
        title: 'Hillside, gravel, and long-driveway approaches rewrite labor',
        detail:
          'MO-21 and interior ridges add pitch, turnaround limits, and soft-ground risk that flat South County ranch optimism underprices.',
      },
      {
        title: 'Arnold–Imperial multi-family differs from Festus–De Soto town stock',
        detail:
          'HOA townhomes and newer multi-unit near I-55 do not share curb rules with older river-town or larger-lot southern product.',
      },
      {
        title: 'St. Louis County and city pairs are routine northbound jobs',
        detail:
          'Households regularly move Jefferson ↔ Mehlville / Oakville edges or farther into the city/county. Keep jurisdiction lines clear and price I-55 honestly.',
      },
      {
        title: 'Illinois and long-distance legs need matching authority',
        detail:
          'Some households continue across the river or farther. MoDOT household goods authority alone does not authorize interstate delivery — verify FMCSA when any leg leaves Missouri.',
      },
      MO_REG_BULLET,
    ],
  },
  zonesHeading: 'Jefferson County access zones',
  zonesIntro:
    'Plan by Arnold–Imperial I-55 multi-family belts, High Ridge–House Springs hillside product, Hillsboro county-seat stock, Festus–Crystal City river-town grids, and southern De Soto–larger-lot edges.',
  zones: [
    {
      id: 'arnold-imperial',
      name: 'Arnold, Imperial & northern I-55 multi-family belts',
      shortName: 'Arnold / Imperial',
      neighborhoods: [
        'Arnold',
        'Imperial',
        'Barnhart edges',
        'Kimmswick edges',
        'I-55 retail corridors',
        'Church Road corridors',
      ],
      housingTypes: 'Townhomes, multi-family, HOA SFH, some older ranch stock',
      challenges: [
        'HOA timed windows and truck limits',
        'I-55 freeflow at peak toward St. Louis',
        'Mixed product across short distances',
      ],
      moverTips:
        'Collect HOA packets early. Price I-55 honestly for northbound pairs. Clarify Arnold vs Imperial addresses on estimates.',
      cityKeywords: [
        'arnold',
        'imperial',
        'barnhart',
        'kimmswick',
      ],
    },
    {
      id: 'high-ridge-house-springs',
      name: 'High Ridge, House Springs & MO-30 hillside belts',
      shortName: 'High Ridge / MO-30',
      neighborhoods: [
        'High Ridge',
        'House Springs',
        'MO-30 corridors',
        'Byrnes Mill edges',
        'Cedar Hill edges',
        'Scotsdale edges',
      ],
      housingTypes: 'SFH, hillside lots, multi-unit pockets, mixed driveway product',
      challenges: [
        'Driveway pitch, turnaround limits, and long carries',
        'MO-30 freeflow and limited alternate routes',
        'Soft edges and weather-sensitive approaches',
      ],
      moverTips:
        'Photo driveway pitch and truck turnarounds. Prefer smaller trucks when approaches are tight. Plan weather contingency on soft shoulders.',
      cityKeywords: [
        'high ridge',
        'house springs',
        'byrnes mill',
        'cedar hill',
      ],
    },
    {
      id: 'hillsboro-county-seat',
      name: 'Hillsboro county-seat stock & central corridors',
      shortName: 'Hillsboro',
      neighborhoods: [
        'Hillsboro',
        'Central Jefferson corridors',
        'MO-21 corridors',
        'MO-110 edges',
        'Horine edges',
        'Goldman edges',
      ],
      housingTypes: 'Older SFH, small multi-unit, larger-lot edges',
      challenges: [
        'MO-21 freeflow and empty miles vs I-55 belt',
        'Mixed small-town curb product',
        'Longer staging distance for metro crews',
      ],
      moverTips:
        'Price empty miles honestly for northern unload pairs. Confirm approach photos. Clarify Hillsboro vs unincorporated addresses.',
      cityKeywords: [
        'hillsboro',
      ],
    },
    {
      id: 'festus-crystal-city',
      name: 'Festus, Crystal City & river-town grids',
      shortName: 'Festus / Crystal City',
      neighborhoods: [
        'Festus',
        'Crystal City',
        'Herculaneum edges',
        'US-61/67 corridors',
        'Downtown Festus edges',
        'River-town residential grids',
      ],
      housingTypes: 'Older SFH, bungalows, multi-unit pockets, limited newer multi-family',
      challenges: [
        'Stairs, basements, and tighter residential curb',
        'US-61/67 / I-55 freeflow',
        'Mixed municipal rules across twin-city edges',
      ],
      moverTips:
        'Survey stairs and basements with photos. Prefer mid-week starts. Clarify Festus vs Crystal City vs Herculaneum on the estimate.',
      cityKeywords: [
        'festus',
        'crystal city',
        'herculaneum',
      ],
    },
    {
      id: 'de-soto-south',
      name: 'De Soto, southern larger-lot & rural-edge stock',
      shortName: 'De Soto / south',
      neighborhoods: [
        'De Soto',
        'Southern rural-edge pockets',
        'MO-110 south corridors',
        'Vineland edges',
        'Olympian Village edges',
        'Valle Mines edges',
      ],
      housingTypes: 'SFH, larger lots, limited multi-unit, rural-edge approaches',
      challenges: [
        'Longer empty miles and narrower approaches',
        'Gravel and soft-edge risk in weather',
        'Limited alternate routes',
      ],
      moverTips:
        'Confirm approach width and turnarounds with photos. Price southern empty miles honestly. Plan weather contingency.',
      cityKeywords: [
        'de soto',
        'desoto',
        'olympian village',
      ],
    },
    {
      id: 'mo21-ridge-interior',
      name: 'MO-21 ridge, Morse Mill edges & interior hillside product',
      shortName: 'MO-21 interior',
      neighborhoods: [
        'MO-21 ridge corridors',
        'Morse Mill edges',
        'Interior hillside pockets',
        'Dittmer edges',
        'Grubville edges',
        'Liguori edges',
      ],
      housingTypes: 'Hillside SFH, larger lots, limited multi-unit',
      challenges: [
        'Steep driveways and long carries',
        'MO-21 freeflow and limited shoulders',
        'Weather-sensitive gravel approaches',
      ],
      moverTips:
        'Photo pitch and staging pads. Prefer crews comfortable with hillside product. Do not assume flat South County access.',
      cityKeywords: [
        'morse mill',
        'dittmer',
        'liguori',
      ],
    },
  ],
  costDrivers: {
    title: 'What drives Jefferson County moving costs',
    intro:
      'Hillside access, I-55 freeflow, and empty miles toward the St. Louis core move the number more than packing skill alone — this is south fringe logistics, not inner-ring elevator pricing.',
    drivers: [
      {
        title: 'Hillside driveways, long carries & approach limits',
        detail:
          'MO-21 and interior ridges add labor and truck-length risk that flat-rate optimism underprices.',
      },
      {
        title: 'I-55 · US-61/67 · MO-21 · MO-30 congestion',
        detail:
          'Northbound metro pairs burn portal-to-portal hours even when map miles look short.',
      },
      {
        title: 'Arnold–Imperial HOA multi-family windows',
        detail:
          'Growth packets rewrite jobs that look simple on a map near the interstate belt.',
      },
      {
        title: 'River-town stairs & older Festus–Crystal City stock',
        detail:
          'Basements and tight curb add flight counts separate from northern multi-family product.',
      },
      {
        title: 'St. Louis County / city / interstate empty miles',
        detail:
          'Northbound metro destinations and out-of-state legs raise staging distance and authority complexity when leaving Missouri.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (simple access)',
        value: '$450–$1,700+',
        note: 'Higher with hillsides, HOA windows, or peak I-55 pairs',
      },
      {
        label: '2–3BR townhome or mid-size SFH',
        value: '$1,300–$4,000+',
        note: 'Driveway pitch, stairs, and portal soft costs trend up',
      },
      {
        label: '3–4+ BR / hillside / cross-zone',
        value: '$2,500–$8,000+',
        note: 'Hillside product and long I-55 pairs price highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$110–$195+/hr',
        note: 'Portal-to-portal; packing, access, and stairs scale up',
      },
    ],
  },
  seasonal: {
    title: 'When to schedule a Jefferson County move',
    intro:
      'School calendars, summer heat, severe storms, and winter ice on hillside approaches reshape access and crew availability along I-55.',
    items: [
      {
        title: 'Best windows: mid-week early mornings',
        detail:
          'Tuesday–Thursday starts ease HOA windows and reduce I-55 pain toward the city. Avoid month-end Fridays when leases collide.',
      },
      {
        title: 'Peak season: late May–mid-September',
        detail:
          'Family school moves and multi-family turnover fill first. Book 2–4 weeks ahead for peak weekends.',
      },
      {
        title: 'Summer heat, storms & soft-edge risk',
        detail:
          'June–August heat and thunderstorms raise cancellation risk and soft-ground problems on gravel approaches. Prefer early starts and flexible weather windows.',
      },
      {
        title: 'Winter ice on hillside driveways',
        detail:
          'December–February adds icy pitch risk and weather cancellations. Prefer flexible dates and contingency for melt and traction on approaches.',
      },
    ],
  },
  specialized: [
    {
      id: 'jefferson-hillside-i55',
      title: 'Jefferson County hillside, HOA & I-55 logistics module',
      intro:
        'Jefferson County estimates fail more often on approach surveys, I-55 freeflow, and product mis-match with St. Louis County templates than on packing skill alone.',
      bullets: [
        'Photo driveway pitch, turnarounds, and truck length before the survey is final — especially on MO-21 and MO-30 belts.',
        'Collect HOA packets early for Arnold–Imperial multi-family product.',
        'Price portal-to-portal time for any pair that rides I-55, US-61/67, MO-21, or MO-30 at peak.',
        'Do not assume flat South County St. Louis access for hillside or rural-edge lots.',
        'Clarify Arnold, Imperial, Festus, Crystal City, Hillsboro, and De Soto addresses on every estimate.',
        'For in-state jobs verify MoDOT household goods operating authority; verify FMCSA for any out-of-state leg.',
      ],
    },
    {
      id: 'not-stl-county-clone',
      title: 'Not St. Louis County inner-ring micro-market module',
      intro:
        'A single “South County rate” collapses when Jefferson fringe product is treated as interchangeable with Mehlville flats or Chesterfield HOAs.',
      bullets: [
        'Keep Jefferson County vs St. Louis County lines clear on every multi-address estimate.',
        'Match hillside and gravel approaches separately from northern multi-family gate lists.',
        'Price northbound I-55 empty miles as a first-class cost driver, not an afterthought.',
        'Ask which approach corridors the crew will actually use at load and unload on ridge product.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Jefferson County?',
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
              'Jefferson County is fragmented across many districts (Northwest, Fox, Windsor, Hillsboro, Festus, Jefferson R-VII / De Soto, Grandview, and others). Assignment is address-based — marketing subdivision names do not guarantee a campus.',
          },
          {
            title: 'Choice, boundaries & enrollment pressure',
            detail:
              'Popular programs and growth-edge boundaries can be competitive. Confirm enrollment windows early when relocating mid-year.',
          },
          {
            title: 'Research sources',
            detail:
              'District boundary tools, Missouri DESE data, and campus visits beat ranking screenshots alone.',
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
              'Mercy Hospital Jefferson (Crystal City / Festus area) anchors local acute care; many households also use South County and broader St. Louis systems north on I-55. Confirm insurance networks.',
          },
          {
            title: 'What relocators should do',
            detail:
              'Map peak-hour drive times to preferred campuses — I-55 freeflow changes “nearby” on paper. Transfer records early.',
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
              'Expect Arnold–Imperial multi-family and HOA growth; High Ridge hillside SFH; Hillsboro small-town stock; Festus–Crystal City older grids; southern larger-lot and rural-edge product.',
          },
          {
            title: 'Cost variation inside the county',
            detail:
              'Purchase prices and rents generally trade below inner St. Louis County cores, with tradeoffs in commute time and approach logistics. Budget for HOA dues where relevant.',
          },
          {
            title: 'Building and HOA governance',
            detail:
              'Associations in northern multi-family belts often control move hours, truck size, and deposits. Read documents carefully.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Which areas fit whom',
        bullets: [
          {
            title: 'Arnold / Imperial I-55 convenience',
            detail:
              'Suits people prioritizing multi-family or newer product with relatively shorter city access — with HOA rules and peak freeflow tradeoffs.',
          },
          {
            title: 'High Ridge / MO-30 hillside living',
            detail:
              'Often appeals for space and relative value — with driveway pitch and weather-sensitive approaches.',
          },
          {
            title: 'Festus / Crystal City river-town character',
            detail:
              'Attracts households seeking small-city grids — with older stock stairs and US-61/67 freeflow.',
          },
          {
            title: 'Hillsboro / De Soto southern space',
            detail:
              'Fits buyers chasing larger lots and quieter pace — with longer empty miles toward metro employment.',
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
              'Local healthcare, retail, manufacturing, logistics, and large reverse-commute flows into St. Louis County and the City of St. Louis concentrate demand.',
          },
          {
            title: 'Commute realism',
            detail:
              'Peak I-55 freeflow is real. Test peak routes before choosing solely on rent or purchase price.',
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
              'Jefferson County stacks south metro fringe growth, hillside living, and river-town grids — different from St. Louis County inner-ring elevators and west-corridor Chesterfield product.',
          },
          {
            title: 'Climate',
            detail:
              'Humid continental four-season climate with hot summers, severe-storm risk, and freeze-thaw winters that are harsher on hillside approaches. Plan outdoor staging, heat, and ice contingency as part of move-in.',
          },
          {
            title: 'Culture and pace',
            detail:
              'Visit at peak and off-peak times when deciding — school calendars, I-55 traffic, and winter weather reshape daily rhythm.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Jefferson County resources',
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify MoDOT household goods operating authority for in-state moves and FMCSA for interstate legs before deposits.',
    items: [
      {
        label: 'Jefferson County, Missouri — official site',
        href: 'https://www.jeffcomo.org/',
        external: true,
        note: 'County services & unincorporated info',
      },
      {
        label: 'City of Arnold',
        href: 'https://www.arnoldmo.org/',
        external: true,
        note: 'Northern I-55 multi-family belt context',
      },
      {
        label: 'City of Festus',
        href: 'https://www.cityoffestus.org/',
        external: true,
        note: 'River-town municipality context',
      },
      {
        label: 'Traveler Information Map — MoDOT',
        href: 'https://traveler.modot.org/map/',
        external: true,
        note: 'I-55 / US-61/67 / MO-21 / MO-30 before load windows',
      },
    ],
  },
  directoryHint:
    'Prefer crews with hillside and long-driveway fluency for MO-21 / MO-30 product; HOA multi-family fluency for Arnold–Imperial belts; older-grid stair access for Festus–Crystal City stock; honest I-55 · US-61/67 · MO-21 · MO-30 timing for cross-zone pairs. Verify MoDOT Motor Carrier Services household goods operating authority for intrastate moves and FMCSA for interstate legs before deposits.',
  lastReviewed: '2026-07-24',
});

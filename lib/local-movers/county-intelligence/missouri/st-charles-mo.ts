import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeMoPack,
  MO_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/missouri/mo-shared';

/**
 * St. Charles County, MO — west STL metro growth (St. Peters, O’Fallon, Wentzville).
 * Not a St. Louis City / inner-ring county core clone.
 */
export const stCharlesCountyMoIntelligence: CountyIntelligencePack = finalizeMoPack({
  countySlug: 'st-charles',
  hubTitle: 'St. Charles County Moving Intelligence Hub',
  eyebrow:
    'St. Charles County · west STL growth, O’Fallon–Wentzville HOAs & I-70 / MO-370 logistics',
  h1: 'Moving in St. Charles County: West Metro Growth, River Town Access & I-70 / MO-370 Corridors',
  heroOpener:
    'St. Charles County is not a St. Louis City core clone and not a Clayton elevator template pasted westward — it is the west metro growth engine with historic St. Charles river-town multi-unit, St. Peters and O’Fallon HOA density, Wentzville and Lake Saint Louis expansion product, and I-70 / I-64 / MO-370 / MO-94 freeflow that rewrites “local” estimates. A Main Street walk-up, a St. Peters townhome gate list, a Wentzville cul-de-sac driveway, and a Cottleville multi-family elevator do not share truck access or crew skill. Bridges and peak I-70 backups turn short map miles into billable hours. This hub is for people moving in St. Charles County — not a renamed St. Louis County inner-ring page.',
  heroCredibility:
    'MoDOT Motor Carrier Services household goods authority for intrastate · FMCSA for interstate · West metro growth & I-70 logistics awareness · Curated listings',
  majorCorridors: 'I-70 · I-64 · MO-370 · MO-94',
  whatMakesDifferent: {
    title: 'What makes moving in St. Charles County different',
    intro:
      'These are west St. Louis metro growth realities — river-town curb, HOA expansion belts, and I-70 / MO-370 freeflow — not City of St. Louis walk-up density or Clayton tower product alone.',
    bullets: [
      {
        title: 'West metro growth is HOA- and school-calendar driven',
        detail:
          'St. Peters, O’Fallon, Wentzville, and Lake Saint Louis stack gate lists, truck-length limits, and summer family peaks that historic Main Street jobs do not share.',
      },
      {
        title: 'Historic St. Charles river-town product still constrains curb',
        detail:
          'Older multi-unit, tight downtown streets, and event freeflow rewrite labor near the riverfront. Flat-rate optimism from new HOA driveways underprices carries.',
      },
      {
        title: 'I-70, I-64, MO-370, and MO-94 burn portal time',
        detail:
          'St. Charles ↔ O’Fallon, Wentzville ↔ St. Peters, or county ↔ St. Louis County pairs look local and still burn 20–50+ minutes at peak, construction, and bridge backups.',
      },
      {
        title: 'This is not St. Louis City and not inner-ring county clone',
        detail:
          'Ignore Central West End elevator assumptions and do not treat Chesterfield product as interchangeable with Wentzville expansion belts. Housing mix and freeflow differ.',
      },
      {
        title: 'Missouri River crossings and St. Louis County pairs are routine',
        detail:
          'Households regularly move St. Charles ↔ St. Louis County or the City of St. Louis. Price bridge and I-70 freeflow honestly and keep addresses jurisdiction-clear.',
      },
      {
        title: 'Illinois and out-of-state legs need separate authority',
        detail:
          'Some households continue to Metro East or farther. MoDOT household goods authority alone does not authorize interstate delivery — verify FMCSA when any leg leaves Missouri.',
      },
      MO_REG_BULLET,
    ],
  },
  zonesHeading: 'St. Charles County access zones',
  zonesIntro:
    'Plan by historic St. Charles river-town product, St. Peters multi-family belts, O’Fallon growth HOAs, Wentzville–Lake Saint Louis expansion, and MO-94 / Cottleville southern edges.',
  zones: [
    {
      id: 'historic-st-charles',
      name: 'Historic St. Charles, riverfront & downtown multi-unit',
      shortName: 'Historic St. Charles',
      neighborhoods: [
        'Historic Downtown St. Charles',
        'Main Street corridors',
        'Frenchtown edges',
        'Riverfront edges',
        'Boschertown edges',
        'Foundry edges',
      ],
      housingTypes: 'Walk-up multifamily, older SFH, limited elevators, mixed commercial-adjacent',
      challenges: [
        'Scarce curb, event freeflow, and tight truck length',
        'Stairs and long carries on older stock',
        'I-70 / First Capitol approach congestion',
      ],
      moverTips:
        'Prefer mid-week early starts. Photo curb options on Main Street and side streets. Confirm festival and event calendars near the riverfront.',
      cityKeywords: [
        'st charles',
        'saint charles',
        'downtown st charles',
      ],
    },
    {
      id: 'st-peters',
      name: 'St. Peters multi-family, townhome & mid-county belts',
      shortName: 'St. Peters',
      neighborhoods: [
        'St. Peters',
        'Mid Rivers corridors',
        'Jungermann corridors',
        'Spencer Creek edges',
        'Cottage Hills edges',
        'Harris Drive corridors',
      ],
      housingTypes: 'Townhomes, multi-family, HOA SFH, some elevators',
      challenges: [
        'HOA timed windows and truck limits',
        'I-70 / MO-370 freeflow',
        'Mixed product across short distances',
      ],
      moverTips:
        'Collect HOA packets early. Price I-70 honestly. Clarify St. Peters vs O’Fallon addresses on estimates.',
      cityKeywords: [
        'st peters',
        'saint peters',
      ],
    },
    {
      id: 'ofallon-mo',
      name: "O'Fallon growth HOAs & family SFH corridors",
      shortName: "O'Fallon",
      neighborhoods: [
        "O'Fallon",
        'Highway K corridors',
        'WingHaven edges',
        'Fort Zumwalt edges',
        'Bryan Road corridors',
        'Belleau Creek edges',
      ],
      housingTypes: 'HOA SFH, townhomes, newer multi-family',
      challenges: [
        'Gate lists and school-calendar peaks',
        'I-70 freeflow at peak',
        'Longer empty miles vs river-town core',
      ],
      moverTips:
        'Book around school move-in peaks when flexible. Confirm gate codes and truck length. Photo driveway pitch.',
      cityKeywords: [
        "o'fallon",
        'ofallon',
      ],
    },
    {
      id: 'wentzville-lsl',
      name: 'Wentzville, Lake Saint Louis & western expansion',
      shortName: 'Wentzville / LSL',
      neighborhoods: [
        'Wentzville',
        'Lake Saint Louis',
        'Dardenne Prairie edges',
        'Foristell edges',
        'Flint Hill edges',
        'I-70 west corridors',
      ],
      housingTypes: 'Newer HOA SFH, townhomes, lake-adjacent stock, multi-family growth',
      challenges: [
        'HOA rules and longer portal miles',
        'I-70 construction and peak freeflow',
        'Lake and cul-de-sac staging limits',
      ],
      moverTips:
        'Collect HOA and lake-community rules early. Price western empty miles honestly. Prefer mid-week starts for long I-70 pairs.',
      cityKeywords: [
        'wentzville',
        'lake saint louis',
        'lake st louis',
        'dardenne prairie',
      ],
    },
    {
      id: 'cottleville-mo94',
      name: 'Cottleville, Weldon Spring & MO-94 southern edges',
      shortName: 'Cottleville / MO-94',
      neighborhoods: [
        'Cottleville',
        'Weldon Spring',
        'MO-94 corridors',
        'Highway N edges',
        'Harvester edges',
        'Defiance edges',
      ],
      housingTypes: 'SFH, townhomes, mixed multi-family, some rural-edge lots',
      challenges: [
        'MO-94 freeflow and limited alternate routes',
        'Mixed driveway and HOA product',
        'St. Louis County fringe pairs common',
      ],
      moverTips:
        'Price MO-94 honestly. Photo rural-edge approaches. Clarify Cottleville vs St. Peters boundaries.',
      cityKeywords: [
        'cottleville',
        'weldon spring',
        'harvester',
      ],
    },
    {
      id: 'st-paul-north-edges',
      name: 'St. Paul, northern rural-edge & MO-370 approach belts',
      shortName: 'North edges',
      neighborhoods: [
        'St. Paul edges',
        'Northern unincorporated pockets',
        'MO-370 approach corridors',
        'Orchard Farm edges',
        'West Alton edges',
        'Portage des Sioux edges',
      ],
      housingTypes: 'SFH, larger lots, limited multi-unit, rural-edge stock',
      challenges: [
        'Longer empty miles and narrower approaches',
        'MO-370 / I-70 freeflow',
        'Less curb infrastructure on some lots',
      ],
      moverTips:
        'Confirm approach width and turnarounds with photos. Price empty miles honestly. Plan weather contingency on unpaved or soft edges.',
      cityKeywords: [
        'st paul',
        'west alton',
        'portage des sioux',
      ],
    },
  ],
  costDrivers: {
    title: 'What drives St. Charles County moving costs',
    intro:
      'HOA admin, river-town curb limits, and I-70 / MO-370 freeflow move the number more than packing skill alone — this is west growth logistics, not city-core elevator pricing alone.',
    drivers: [
      {
        title: 'HOA gates, truck limits & timed windows',
        detail:
          'St. Peters, O’Fallon, Wentzville, and Lake Saint Louis packets rewrite jobs that look simple on a map.',
      },
      {
        title: 'Historic river-town curb & stairs',
        detail:
          'Downtown St. Charles multi-unit and older stock add carries that new driveway optimism underprices.',
      },
      {
        title: 'I-70 · I-64 · MO-370 · MO-94 congestion',
        detail:
          'Cross-county and bridge-bound pairs burn portal-to-portal hours even when map miles look short.',
      },
      {
        title: 'Western expansion empty miles',
        detail:
          'Wentzville and Lake Saint Louis destinations raise staging distance versus river-town or St. Louis County pairs.',
      },
      {
        title: 'St. Louis County / city / interstate legs',
        detail:
          'Eastbound metro pairs and out-of-state destinations raise freeflow risk and authority complexity when leaving Missouri.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (simple access)',
        value: '$500–$1,800+',
        note: 'Higher with stairs, HOA windows, or peak I-70 pairs',
      },
      {
        label: '2–3BR townhome or mid-size SFH',
        value: '$1,400–$4,200+',
        note: 'HOA soft costs and long portal miles trend up',
      },
      {
        label: '3–4+ BR / cross-zone / growth-edge',
        value: '$2,800–$8,500+',
        note: 'Western expansion and bridge-bound pairs price highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$115–$200+/hr',
        note: 'Portal-to-portal; packing, HOA admin, and stairs scale up',
      },
    ],
  },
  seasonal: {
    title: 'When to schedule a St. Charles County move',
    intro:
      'School calendars, growth-suburb lease waves, summer heat, and winter ice reshape access and crew availability along I-70.',
    items: [
      {
        title: 'Best windows: mid-week early mornings',
        detail:
          'Tuesday–Thursday starts ease HOA windows and reduce I-70 / MO-370 pain. Avoid month-end Fridays when leases and school calendars collide.',
      },
      {
        title: 'Peak season: late May–mid-September',
        detail:
          'Family school moves and multi-family turnover fill first. Book 2–4 weeks ahead for peak weekends and HOA slots.',
      },
      {
        title: 'Summer heat & river-valley humidity',
        detail:
          'June–August heat indexes raise crew rotation needs on long driveway jobs. Prefer early starts.',
      },
      {
        title: 'Winter ice and freeze-thaw on HOA approaches',
        detail:
          'December–February adds icy stoops and weather cancellations. Prefer flexible dates and contingency for melt and tarps.',
      },
    ],
  },
  specialized: [
    {
      id: 'st-charles-hoa-i70',
      title: 'St. Charles County HOA, river-town & I-70 logistics module',
      intro:
        'St. Charles estimates fail more often on HOA packets, river-town curb surveys, and I-70 freeflow than on packing skill alone.',
      bullets: [
        'Collect HOA gate rules, truck-length limits, and timed windows before the survey is final.',
        'Photo curb options and stair counts for historic St. Charles multi-unit stock.',
        'Price portal-to-portal time for any pair that rides I-70, I-64, MO-370, or MO-94 at peak.',
        'Clarify St. Charles vs St. Peters vs O’Fallon vs Wentzville addresses on every estimate.',
        'Plan summer heat and winter ice contingency into outdoor carries.',
        'For in-state jobs verify MoDOT household goods operating authority; verify FMCSA for any out-of-state leg.',
      ],
    },
    {
      id: 'not-city-core-clone',
      title: 'West growth vs St. Louis city-core micro-market module',
      intro:
        'A single “St. Louis metro rate” collapses when west growth HOA product is confused with city-core elevators or Clayton inner-ring towers.',
      bullets: [
        'Do not price Main Street walk-ups like Wentzville cul-de-sacs — access products differ.',
        'Do not apply City of St. Louis curb culture as a default for O’Fallon HOA belts.',
        'Match school-calendar peaks separately from downtown lease-end waves east of the river.',
        'Keep St. Charles County vs St. Louis County lines clear on every multi-address estimate.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to St. Charles County?',
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
              'Major systems include Francis Howell, Fort Zumwalt, Wentzville R-IV, St. Charles, Orchard Farm, and others. Assignment is address-based — marketing subdivision names do not guarantee a campus.',
          },
          {
            title: 'Choice, boundaries & enrollment pressure',
            detail:
              'Popular programs and growth-area boundary edges can be competitive. Confirm enrollment windows early when relocating mid-year.',
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
              'SSM Health St. Joseph (St. Charles and Lake Saint Louis), Barnes-Jewish St. Peters, Progress West, and related campuses anchor local care; many households also use larger St. Louis County systems. Confirm insurance networks.',
          },
          {
            title: 'What relocators should do',
            detail:
              'Map peak-hour drive times to preferred campuses — I-70 freeflow changes “nearby” on paper. Transfer records early.',
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
              'Expect historic river-town multi-unit and older SFH; dense St. Peters multi-family; O’Fallon and Wentzville HOA growth; lake-adjacent and rural-edge lots on the fringe.',
          },
          {
            title: 'Cost variation inside the county',
            detail:
              'Purchase prices and rents vary by municipality and product. Budget for HOA dues and longer commute tradeoffs versus eastern metro cores.',
          },
          {
            title: 'Building and HOA governance',
            detail:
              'Associations often control move hours, truck size, and deposits in growth belts. Read documents carefully.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Which areas fit whom',
        bullets: [
          {
            title: 'Historic St. Charles river-town lifestyle',
            detail:
              'Suits people prioritizing walkable downtown character — with curb, event, and stair tradeoffs on move day.',
          },
          {
            title: 'St. Peters mid-county convenience',
            detail:
              'Often appeals for multi-family and retail access — with HOA logistics and I-70 freeflow.',
          },
          {
            title: "O'Fallon family growth living",
            detail:
              'Attracts households seeking schools and newer product — with gate rules and peak calendar clustering.',
          },
          {
            title: 'Wentzville / Lake Saint Louis western space',
            detail:
              'Fits buyers chasing newer lots and lake amenities — with longer empty miles and HOA packets.',
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
              'Local healthcare, retail, logistics, manufacturing, and large reverse-commute flows into St. Louis County and the City of St. Louis concentrate demand. Some households also work remote or hybrid.',
          },
          {
            title: 'Commute realism',
            detail:
              'Peak I-70 and bridge freeflow is real. Test peak routes before choosing solely on rent or purchase price.',
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
              'St. Charles County stacks river-town history and west metro growth — different from St. Louis City core density and from inner-ring Clayton elevator living alone.',
          },
          {
            title: 'Climate',
            detail:
              'Humid continental four-season climate with hot summers, severe-storm risk, and freeze-thaw winters. Plan outdoor staging, heat, and ice contingency as part of move-in.',
          },
          {
            title: 'Culture and pace',
            detail:
              'Visit at peak and off-peak times when deciding — school calendars, riverfront events, and winter weather reshape daily rhythm.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful St. Charles County resources',
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify MoDOT household goods operating authority for in-state moves and FMCSA for interstate legs before deposits.',
    items: [
      {
        label: 'St. Charles County — official site',
        href: 'https://www.sccmo.org/',
        external: true,
        note: 'County services & unincorporated info',
      },
      {
        label: 'City of St. Charles',
        href: 'https://www.stcharlescitymo.gov/',
        external: true,
        note: 'Historic core permits & services',
      },
      {
        label: "City of O'Fallon, Missouri",
        href: 'https://www.ofallon.mo.us/',
        external: true,
        note: 'Growth municipality context',
      },
      {
        label: 'Traveler Information Map — MoDOT',
        href: 'https://traveler.modot.org/map/',
        external: true,
        note: 'I-70 / MO-370 / MO-94 before load windows',
      },
    ],
  },
  directoryHint:
    'Prefer crews with HOA gate fluency for St. Peters–O’Fallon–Wentzville product; tight-curb and stair fluency for historic St. Charles stock; honest I-70 · I-64 · MO-370 · MO-94 timing for cross-zone and bridge-bound pairs. Verify MoDOT Motor Carrier Services household goods operating authority for intrastate moves and FMCSA for interstate legs before deposits.',
  lastReviewed: '2026-07-24',
});

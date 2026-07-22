import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';

/**
 * Hand-crafted Morris County, New Jersey moving intelligence.
 * Used by /local-movers/new-jersey/morris and the shared intelligence template.
 *
 * Differentiators vs Bergen / Essex / Somerset / generic North Jersey:
 * Affluent historic-town + corporate (Parsippany) mix; more SFH / larger lots than
 * denser inner counties; western semi-rural contrast; HOA + high-value contents;
 * I-80 / I-287 / Rte 10–24 spines — not GWB high-rises (Bergen) and not Newark density (Essex).
 */
export const morrisCountyIntelligence: CountyIntelligencePack = {
  stateSlug: 'new-jersey',
  countySlug: 'morris',
  hubTitle: 'Morris County Moving Intelligence Hub',
  eyebrow: 'Morris County · North Jersey / corporate corridor guide',
  h1: 'Moving in Morris County, NJ: Morristown, Parsippany & Western Suburb Zone Guide',
  heroOpener:
    'Morris County is an affluent North Jersey market that mixes historic towns, corporate employment corridors, and more spacious residential communities than denser neighbors like Bergen, Essex, or Hudson. County seat Morristown anchors historic downtown streets and multi-story homes; the Parsippany–Troy Hills corridor (Routes 10 and 46) concentrates corporate and pharmaceutical offices that drive professional and executive relocations. East and central towns — Madison, Chatham, Florham Park, Randolph, Denville, Mountain Lakes — lean high-value single-family and HOA-aware suburbs. Westward, Roxbury, Chester, Washington Township, and the Mendham edge open into larger lots, wooded approaches, and semi-rural access. Higher average home values mean careful handling and valuation coverage matter as much as truck length. I-80, I-287, Route 10, Route 24, and Route 46 turn short-looking locals into real portal-to-portal time. This guide is for people actually moving in Morris — not generic “suburban NYC” tips recycled from Bergen or Somerset.',
  heroCredibility:
    'Historic towns · Corporate/pharma corridor · Larger-lot SFH · HOA & high-value · Intrastate NJ · FMCSA when interstate · Curated listings',
  whatMakesDifferent: {
    title: 'What makes moving in Morris County different',
    intro:
      'These are Morris-specific realities — affluent historic cores, Parsippany corporate demand, and western spacious lots — not interchangeable North Jersey boilerplate.',
    bullets: [
      {
        title: 'More space and higher home values than denser inner counties',
        detail:
          'Compared with Bergen high-rises or Essex multi-family density, Morris skews larger single-family homes, longer carries, driveway staging, and higher-value inventories. Labor minutes and valuation coverage often matter more than curb permits alone.',
      },
      {
        title: 'Corporate and pharmaceutical corridor demand (Parsippany and beyond)',
        detail:
          'Office parks and HQ corridors along Routes 10 and 46, plus I-287 access, drive professional and executive relocations on corporate calendars — not only school-year family moves.',
      },
      {
        title: 'Historic-town access is its own skill set',
        detail:
          'Morristown, Madison, and Chatham often mean narrower streets, older multi-story homes, tree canopies, and preservation-sensitive handling. A full trailer may not reach every door.',
      },
      {
        title: 'Strong HOA presence across planned communities',
        detail:
          'Certificates of insurance, approved hours, and community rules are common in many developments. Collect the management packet before move day — especially for multi-unit or gated sections.',
      },
      {
        title: 'East/central developed vs. western semi-rural contrast',
        detail:
          'A Florham Park cul-de-sac, a Rockaway multi-family, and a Chester larger-lot home are different access profiles. Western Morris can mean longer driveways, wooded approaches, and weather-sensitive hills.',
      },
      {
        title: 'Hillside and wooded properties rewrite truck plans',
        detail:
          'Steep drives, low branches, limited turnarounds, and winter ice show up in parts of Randolph, Denville, Mountain Lakes, Mendham edge, and western townships. Share approach photos and max truck length early.',
      },
      {
        title: 'I-80, I-287, Route 10, 24, and 46 control the clock',
        detail:
          'Employment centers and interchanges create peak congestion around Parsippany, Morristown approaches, and I-80/I-287 weaves. Ask whether quotes are portal-to-portal.',
      },
      {
        title: 'New Jersey intrastate rules vs. interstate authority',
        detail:
          'Moves entirely within New Jersey are generally overseen under New Jersey household-goods / BPU frameworks for licensed carriers. Legs into New York or other states need FMCSA interstate authority. Confirm which license applies to your exact origin and destination.',
      },
    ],
  },
  zonesIntro:
    'Treat each zone as its own access and value profile. Morristown historic core, Parsippany corporate corridor, Madison–Chatham affluence, Dover–Rockaway density mix, Randolph–Denville hills, and western larger-lot towns are not interchangeable under one “Morris local” label.',
  zones: [
    {
      id: 'morristown-core',
      name: 'Morristown / Morris Township Core',
      shortName: 'Morristown Core',
      neighborhoods: [
        'Morristown',
        'Morris Township',
        'Downtown Morristown',
        'Speedwell / medical corridor edge',
        'Convent Station edge',
      ],
      housingTypes:
        'Historic multi-story and Victorian stock, downtown multi-family and condos, established single-family in Morris Township, some higher-density near transit',
      challenges: [
        'Tighter downtown streets and limited large-truck staging',
        'Historic-home stairs, moldings, and careful-handling expectations',
        'Multi-unit COI and elevator windows near downtown',
        'Route 24 / I-287 approach congestion at peaks',
      ],
      moverTips:
        'Share street and approach photos for downtown blocks. Prefer mid-week mornings. Confirm elevator/COI for multi-unit. Inventory high-value and antique pieces carefully; discuss valuation coverage for historic homes.',
      cityKeywords: [
        'morristown',
        'morris township',
        'convent station',
        'speedwell',
      ],
    },
    {
      id: 'parsippany-corridor',
      name: 'Parsippany–Troy Hills & Route 10 / 46 Corridor',
      shortName: 'Parsippany Corridor',
      neighborhoods: [
        'Parsippany',
        'Troy Hills',
        'Lake Hiawatha edge',
        'Route 10 retail / office corridor',
        'Route 46 corridor',
        'I-80 / I-287 interchange edges',
      ],
      housingTypes:
        'Suburban single-family, multi-family and garden apartments, townhome HOAs, office-park-adjacent rentals',
      challenges: [
        'I-80 / I-287 / Route 10 / Route 46 congestion near employment centers',
        'HOA and multi-unit COI rules common',
        'Corporate relocation calendars (weekday windows preferred)',
        'Retail-corridor staging limits mid-day and weekends',
      ],
      moverTips:
        'Build honest portal-to-portal time around I-80/I-287 peaks. Collect HOA packets for townhome communities. Mid-week mornings beat Route 10 retail traffic. Corporate moves often need weekday-only elevator or community windows — confirm early.',
      cityKeywords: [
        'parsippany',
        'troy hills',
        'lake hiawatha',
        'route 10',
        'route 46',
      ],
    },
    {
      id: 'madison-chatham',
      name: 'Madison / Chatham / Florham Park Area',
      shortName: 'Madison / Chatham',
      neighborhoods: [
        'Madison',
        'Chatham',
        'Chatham Township',
        'Florham Park',
        'Madison downtown / train-station area',
        'Route 24 corridor edge',
      ],
      housingTypes:
        'High-value single-family, historic multi-story homes, village cores with tree canopies, some multi-family near downtowns, corporate-adjacent housing in Florham Park',
      challenges: [
        'Narrow village streets and limited large-truck turnarounds',
        'High-value contents and careful-handling norms',
        'Long carries from legal parking on tighter blocks',
        'Route 24 congestion toward Morristown / Millburn edge',
      ],
      moverTips:
        'Assume access complexity in village cores until proven otherwise — smaller trucks often win. Full inventory and valuation discussion for higher-value homes. Weekday mornings beat weekend downtown Madison/Chatham. Florham Park HOAs need packets when applicable.',
      cityKeywords: [
        'madison',
        'chatham',
        'florham park',
        'chatham township',
      ],
    },
    {
      id: 'dover-rockaway',
      name: 'Dover / Rockaway / Wharton Area',
      shortName: 'Dover / Rockaway',
      neighborhoods: [
        'Dover',
        'Rockaway',
        'Rockaway Township',
        'Wharton',
        'Victory Gardens edge',
        'Hibernia / White Meadow Lake edges',
      ],
      housingTypes:
        'Mix of multi-family and older SFH in Dover, suburban tracts in Rockaway Township, hillside and lake-adjacent stock, some denser downtown blocks',
      challenges: [
        'Tighter staging in Dover older grids',
        'Hillside and lake-community access in Rockaway Township',
        'I-80 corridor congestion for east–west pairs',
        'Multi-unit COI in denser pockets',
      ],
      moverTips:
        'Clarify Dover multi-family vs. Rockaway Township SFH/hillside on the survey. Share driveway videos for steep or wooded approaches. Mid-week mornings reduce I-80 pain for Parsippany or Morristown pairs.',
      cityKeywords: [
        'dover',
        'rockaway',
        'wharton',
        'victory gardens',
        'white meadow',
        'hibernia',
      ],
    },
    {
      id: 'randolph-denville',
      name: 'Randolph / Denville / Mountain Lakes',
      shortName: 'Randolph / Denville',
      neighborhoods: [
        'Randolph',
        'Denville',
        'Mountain Lakes',
        'Mine Hill edge',
        'Mount Freedom edge',
        'Route 10 / Route 46 local approaches',
      ],
      housingTypes:
        'Established single-family, larger lots, some hillside and wooded properties, limited multi-family, high-value homes in Mountain Lakes',
      challenges: [
        'Longer driveway carries and multi-story homes',
        'Wooded approaches, low branches, limited turnarounds',
        'High-value inventory expectations (especially Mountain Lakes)',
        'Local arterial feed into Route 10 / I-80 peaks',
      ],
      moverTips:
        'Request approach photos and max truck length for wooded or hillside addresses. Budget long-carry labor on larger lots. Discuss valuation coverage for higher-value shipments. Prefer mid-week mornings over rush-hour Route 10 feeds.',
      cityKeywords: [
        'randolph',
        'denville',
        'mountain lakes',
        'mine hill',
        'mount freedom',
      ],
    },
    {
      id: 'western-morris',
      name: 'Western Morris',
      shortName: 'Western Morris',
      neighborhoods: [
        'Roxbury',
        'Succasunna / Ledgewood edges',
        'Chester',
        'Chester Township',
        'Washington Township',
        'Long Valley',
        'Mendham / Mendham Township edge',
        'Mount Olive edge',
      ],
      housingTypes:
        'Larger-lot single-family, semi-rural and estate-style properties, planned communities with HOAs, some multi-family near Roxbury commercial nodes',
      challenges: [
        'Long driveways, gravel or shared access, and limited truck turnarounds',
        'Wooded and hillside weather sensitivity (ice, mud, low branches)',
        'Longer hauls to Morristown / Parsippany employment cores',
        'HOA rules in many developments; rural-edge access variance',
      ],
      moverTips:
        'Treat western Morris as access-first: survey driveway length, grade, and turnaround. Smaller trucks or shuttle strategies may beat forcing a full trailer. Build portal-to-portal time to I-80/I-287 corridors. Collect HOA packets where planned communities apply. Winter and wet weather can change access on short notice.',
      cityKeywords: [
        'roxbury',
        'succasunna',
        'ledgewood',
        'chester',
        'washington township',
        'long valley',
        'mendham',
        'mount olive',
      ],
    },
  ],
  costDrivers: {
    title: 'Pricing & cost drivers inside Morris County',
    intro:
      'Two “local” Morris moves of the same square footage can differ sharply depending on historic-town access, larger-lot long carries, HOA soft costs, and I-80/I-287 portal-to-portal time.',
    drivers: [
      {
        title: 'Larger homes & longer carries',
        detail:
          'Spacious SFH and multi-story inventories raise labor minutes versus dense urban studio jobs in inner counties — even when highway distance looks short.',
      },
      {
        title: 'High-value contents & valuation coverage',
        detail:
          'Affluent towns and executive relocations often need full inventory and adequate valuation. Cheap released-value coverage is frequently inadequate.',
      },
      {
        title: 'HOA soft costs',
        detail:
          'COI, approved hours, and community rules in planned developments add soft costs and can force weekday-only windows.',
      },
      {
        title: 'Historic-town & hillside access / shuttles',
        detail:
          'Morristown, Madison, Chatham village cores and western/wooded drives may need smaller trucks or long carries from legal staging.',
      },
      {
        title: 'I-80 / I-287 / Routes 10 · 24 · 46 congestion',
        detail:
          'Corporate corridor peaks and interchange weaves can burn 45–90+ minutes each way on cross-county pairs at rush hour.',
      },
      {
        title: 'Corporate relocation calendars',
        detail:
          'Weekday-only building or community windows around employment centers can constrain scheduling and crew availability.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (same zone, simple access)',
        value: '$600–$1,500+',
        note: 'Higher with multi-unit COI or tight historic-street staging',
      },
      {
        label: '2–3BR house / townhome',
        value: '$1,900–$4,600+',
        note: 'HOA soft costs and longer carries trend up',
      },
      {
        label: '3–4+ BR (larger lot / high-value / cross-zone)',
        value: '$3,000–$8,000+',
        note: 'Western lots, Mountain Lakes, and executive inventories price highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$135–$210+/hr',
        note: 'Portal-to-portal; packing and 3-person crews scale up',
      },
    ],
  },
  seasonal: {
    title: 'Traffic, corporate & calendar intelligence',
    intro:
      'Morris peaks follow school calendars, corporate relocation cycles, and I-80/I-287 congestion — hillside access stays weather-sensitive year-round.',
    items: [
      {
        title: 'Best truck windows: mid-week mornings',
        detail:
          'Tuesday–Thursday starts before 9 a.m. usually clear HOA windows and reduce I-80 / I-287 / Route 10 pain. Avoid last Friday/Saturday of the month when leases collide.',
      },
      {
        title: 'Corporate corridor peaks (Parsippany / Rte 10–46)',
        detail:
          'Employment-center rush hours constrain staging and travel time. Mid-day can still be busy near retail/office nodes — early starts win.',
      },
      {
        title: 'School-calendar family moves (late spring – early fall)',
        detail:
          'Madison, Chatham, Randolph, and similar towns fill June–August Saturdays. Book 2–4 weeks ahead for popular windows.',
      },
      {
        title: 'Historic downtown event & weekend congestion',
        detail:
          'Morristown and Madison cores pack up on event weekends. Prefer mid-week curb access for multi-story historic homes.',
      },
      {
        title: 'Winter hills and wooded western approaches',
        detail:
          'Ice on steep drives in Randolph, Denville, Mountain Lakes, and western townships slows carries and can block full-size trucks. Protect floors; allow extra time.',
      },
      {
        title: 'Inbound from denser NYC-area counties',
        detail:
          'Households leaving denser Bergen/Essex/Hudson or NYC often time moves around school years and corporate starts — inventory volume and valuation discussions rise with home size.',
      },
    ],
  },
  resources: {
    title: 'Practical Morris County resources',
    intro:
      'Official links and licensing notes — HOA, historic-district, and municipal rules change; verify before move day.',
    items: [
      {
        label: 'Morris County, NJ — official site',
        href: 'https://www.morriscountynj.gov/',
        external: true,
      },
      {
        label: 'Town of Morristown',
        href: 'https://www.townofmorristown.org/',
        external: true,
      },
      {
        label: 'Township of Parsippany-Troy Hills',
        href: 'https://www.parsippany.net/',
        external: true,
      },
      {
        label: 'Borough of Madison',
        href: 'https://www.rosenet.org/',
        external: true,
      },
      {
        label: 'Borough of Chatham',
        href: 'https://www.chathamborough.org/',
        external: true,
      },
      {
        label: 'Township of Randolph',
        href: 'https://www.randolphnj.org/',
        external: true,
      },
      {
        label: 'Township of Roxbury',
        href: 'https://www.roxburynj.us/',
        external: true,
      },
      {
        label: 'NJ 511 — traffic conditions',
        href: 'https://www.511nj.org/',
        note: 'Check I-80, I-287, Routes 10/24/46 before locking load windows',
        external: true,
      },
      {
        label: 'NJ Board of Public Utilities — utilities & consumer info',
        href: 'https://www.nj.gov/bpu/',
        note: 'Start with BPU for NJ utility and consumer frameworks; confirm mover licensing for your route',
        external: true,
      },
      {
        label: 'FMCSA SAFER — interstate authority',
        href: 'https://safer.fmcsa.dot.gov/',
        note: 'Required when the move crosses state lines (e.g. into New York)',
        external: true,
      },
      {
        label: 'JCP&L / FirstEnergy — electric service (much of Morris)',
        href: 'https://www.firstenergycorp.com/jcp_l.html',
        note: 'Confirm your exact utility for gas/electric start-stop',
        external: true,
      },
      {
        label: 'PSE&G — start/stop service (parts of eastern Morris)',
        href: 'https://nj.pseg.com/',
        note: 'Service territories vary — verify by address',
        external: true,
      },
      {
        label: 'Move Trust Hub — verify a USDOT',
        href: '/verify-dot',
        note: 'Cross-check interstate licensing before deposits',
      },
      {
        label: 'Free moving calculator',
        href: '/moving-calculator',
        note: 'Inventory-based volume for local or long-distance',
      },
    ],
  },
  directoryHint:
    'Filter listings by zone (Morristown Core, Parsippany Corridor, Madison/Chatham, Dover/Rockaway, Randolph/Denville, Western Morris) when available. Confirm HOA/COI rules, hillside access, and valuation coverage for higher-value homes — historic-town and western-lot jobs are different under one county name.',
  lastReviewed: '2026-07-22',
};

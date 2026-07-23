import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';

/**
 * Hand-crafted Pasco County, Florida moving intelligence.
 * Differentiators: Tampa north-suburb growth, HOA density, corridor commuting —
 * not Pinellas beach logistics or Hillsborough Tampa-core elevators alone.
 */
export const pascoCountyIntelligence: CountyIntelligencePack = {
  stateSlug: 'florida',
  countySlug: 'pasco',
  hubTitle: 'Pasco County Moving Intelligence Hub',
  eyebrow: 'Pasco · North Tampa growth & corridor commuting',
  h1: 'Moving in Pasco County: Wesley Chapel Growth, HOAs & Corridor Commute Zone Guide',
  heroOpener:
    'Pasco County is Tampa Bay’s northern growth edge: master-planned HOA villages in Wesley Chapel and New Port Richey corridors, coastal and west-county older stock toward Hudson and Holiday, and long I-75 / SR-54 / US-19 portal time for anyone still oriented to Tampa jobs. “Local” Pasco moves often mean gate lists, new-construction access quirks, and empty-mile time from southern staging — not downtown elevators. This hub is for people actually moving in Pasco — not generic Tampa Bay tips recycled from Channelside towers or Clearwater Beach.',
  heroCredibility:
    'FDACS Ch. 507 for intrastate Florida moves · FMCSA for interstate legs · Growth HOA & corridor-commute awareness · Curated directory listings',
  collapsibleDeepContent: true,
  sectionOrder: [
    'whatMakesDifferent',
    'zones',
    'costDrivers',
    'seasonal',
    'specialized',
    'relocation',
    'resources',
  ],
  whatMakesDifferent: {
    title: 'What makes moving in Pasco County different',
    intro:
      'These are Pasco realities — north-of-Tampa growth HOAs and corridor commuting — not interchangeable Bay suburb boilerplate.',
    bullets: [
      {
        title: 'Tampa north-suburb growth drives volume and new-construction logistics',
        detail:
          'Wesley Chapel, Wiregrass-area patterns, and related master-planned villages bring HOA packets, incomplete roads on new streets, and high Saturday demand. New-build access can change week to week during active construction phases.',
      },
      {
        title: 'HOA density is the default in many eastern and central growth pockets',
        detail:
          'Certificates of insurance, gate lists, approved hours, and truck length limits show up more often than open rural staging. Collect management rules before locking a crew.',
      },
      {
        title: 'Corridor commuting rewrites portal-to-portal time',
        detail:
          'I-75, SR-54, US-19, and Suncoast Parkway peaks connect Pasco households to Hillsborough and Pinellas jobs. Short map miles to New Tampa or Tampa still burn real hours at rush.',
      },
      {
        title: 'West county and coastal-edge stock is a different job',
        detail:
          'New Port Richey, Port Richey, Hudson, Holiday, and Gulf-edge pockets include older SFH, multi-family, and flood-aware parcels that do not match Wesley Chapel HOA playbooks.',
      },
      {
        title: 'County line confusion with Hillsborough is common',
        detail:
          'Addresses near Lutz, Land O’ Lakes edges, and Wesley Chapel / New Tampa approaches can sit steps from the Hillsborough line. Clarify county on the survey for drive-time and licensing assumptions.',
      },
      {
        title: 'Longer rural and north-county legs need empty-mile honesty',
        detail:
          'Dade City, Zephyrhills, and northern parcels can sit far from coastal or Tampa crew staging. Confirm whether “local” rate cards still apply.',
      },
      {
        title: 'Summer heat on open suburban streets is operational',
        detail:
          'New tracts without mature canopy get hot early. Dawn starts outperform noon load-outs in peak summer, and afternoon storms interrupt open packing.',
      },
      {
        title: 'Intrastate Florida rules vs interstate authority',
        detail:
          'Moves entirely within Florida are generally subject to Florida Statutes Chapter 507 household-mover frameworks administered by FDACS. Interstate legs need active FMCSA USDOT (and usually MC) authority.',
      },
    ],
  },
  zonesHeading: 'Pasco access zones',
  zonesIntro:
    'Plan by Wesley Chapel growth, Land O’ Lakes / central corridors, west-county coastal edge, and eastern inland towns — HOA rules and commute distance vary sharply.',
  zones: [
    {
      id: 'wesley-chapel-growth',
      name: 'Wesley Chapel & southeast growth corridor',
      shortName: 'Wesley Chapel',
      neighborhoods: [
        'Wesley Chapel',
        'Wiregrass / State Road 56 corridors',
        'Meadow Pointe edges',
        'Epperson / new-village edges',
        'South Wesley Chapel / Hillsborough border approaches',
      ],
      housingTypes:
        'Master-planned SFH, townhomes, HOA villages, multi-family near retail corridors, active new construction',
      challenges: [
        'HOA COI, gates, and approved hours',
        'I-75 / SR-54 / SR-56 congestion',
        'Incomplete roads and temporary access on new streets',
        'High Saturday demand in peak season',
      ],
      moverTips:
        'Collect HOA packets before the survey is final. Confirm street access the week of the move in active construction villages. Book June–August Saturdays early. Start early in heat.',
      cityKeywords: [
        'wesley chapel',
        'wiregrass',
        'meadow pointe',
        'epperson',
      ],
    },
    {
      id: 'land-o-lakes-central',
      name: 'Land O’ Lakes, Lutz edges & central corridor',
      shortName: 'Land O’ Lakes',
      neighborhoods: [
        'Land O’ Lakes',
        'Lutz (Pasco side / border)',
        'Odessa edges',
        'Central SR-54 corridor',
        'Connerton / planned edges',
      ],
      housingTypes:
        'Suburban SFH, HOA communities, larger-lot pockets, multi-family along arterials',
      challenges: [
        'County-line address confusion with Hillsborough',
        'SR-54 / Suncoast approach congestion',
        'HOA rules in planned communities',
        'Long carries in large villages',
      ],
      moverTips:
        'Clarify Pasco vs Hillsborough destinations near Lutz / New Tampa edges. Collect gate lists early. Price corridor portal time honestly for pairs toward Tampa.',
      cityKeywords: [
        'land o lakes',
        "land o' lakes",
        'lutz',
        'odessa',
        'connerton',
      ],
    },
    {
      id: 'west-county-coastal',
      name: 'West county: New Port Richey, Port Richey, Hudson & Holiday',
      shortName: 'West County',
      neighborhoods: [
        'New Port Richey',
        'Port Richey',
        'Hudson',
        'Holiday',
        'Elfers edges',
        'Gulf-edge multi-family pockets',
      ],
      housingTypes:
        'Older SFH and mid-century stock, multi-family, some waterfront and canal homes, manufactured-home communities',
      challenges: [
        'US-19 congestion',
        'Older stairs and tight staging',
        'Flood-mapped and storm-exposed parcels near the Gulf edge',
        'Different access profile than eastern HOA growth',
      ],
      moverTips:
        'Survey curb and driveway access on older lots. Check flood maps for canal and Gulf-edge addresses. Do not assume Wesley Chapel HOA playbooks apply — building and street rules differ.',
      cityKeywords: [
        'new port richey',
        'port richey',
        'hudson',
        'holiday',
        'elfers',
      ],
    },
    {
      id: 'trinity-seven-springs',
      name: 'Trinity, Seven Springs & southwest Pasco',
      shortName: 'Trinity / SW',
      neighborhoods: [
        'Trinity',
        'Seven Springs',
        'East Lake corridor spill (near Pinellas line)',
        'Mitchell / SR-54 west approaches',
      ],
      housingTypes:
        'Planned SFH communities, townhomes, golf and HOA villages, multi-family pockets',
      challenges: [
        'HOA gate lists and COI requirements',
        'SR-54 / Little Road / US-19 corridor peaks',
        'Cross-county pairs toward Pinellas',
        'School-calendar Saturday demand',
      ],
      moverTips:
        'Treat Trinity / Seven Springs as HOA-first suburban work. Clarify Pinellas border destinations. Prefer mid-week mornings when association windows allow.',
      cityKeywords: [
        'trinity',
        'seven springs',
        'new port richey east',
      ],
    },
    {
      id: 'east-inland',
      name: 'East inland: Zephyrhills, Dade City & rural edges',
      shortName: 'East Inland',
      neighborhoods: [
        'Zephyrhills',
        'Dade City',
        'San Antonio edges',
        'St. Leo edges',
        'Rural east-county parcels',
      ],
      housingTypes:
        'Smaller-city SFH, rural-edge properties, manufactured homes, limited multi-family, some historic downtown stock',
      challenges: [
        'Long empty-mile time from Tampa / Wesley Chapel staging',
        'Rural driveway and soft-surface access after rain',
        'Fewer high-rise issues — more distance and access photos needed',
        'Weather-sensitive unpaved approaches',
      ],
      moverTips:
        'Share driveway, gate, and turnaround photos for rural parcels. Confirm whether far-east pairs still use a pure local rate card. Build buffer for two-lane corridor delays.',
      cityKeywords: [
        'zephyrhills',
        'dade city',
        'san antonio',
        'st leo',
        'saint leo',
      ],
    },
  ],
  costDrivers: {
    title: 'What drives Pasco moving costs',
    intro:
      'Ranges are market context for local / short regional moves — not quotes. HOA soft costs and corridor portal time separate cheap-looking locals from real bills.',
    drivers: [
      {
        title: 'HOA / gated soft costs in growth villages',
        detail:
          'COI, gate lists, approved hours, and truck limits add admin time and can force weekday-only moves in Wesley Chapel, Trinity, and similar communities.',
      },
      {
        title: 'I-75 / SR-54 / US-19 corridor congestion',
        detail:
          'Portal-to-portal billing tracks commute peaks toward Tampa and along west-county arterials. Growth ↔ west county pairs can burn 45–90+ minutes each way at rush.',
      },
      {
        title: 'New-construction access friction',
        detail:
          'Incomplete roads, temporary parking rules, and builder restrictions on active streets can force long carries or reschedules.',
      },
      {
        title: 'Distance from core Tampa Bay staging',
        detail:
          'Empty miles to Dade City, Zephyrhills, or far north parcels raise labor hours if crews stage from farther south.',
      },
      {
        title: 'Older west-county carries and flood-aware packing',
        detail:
          'Mid-century lots, stairs, and moisture protection near Gulf-edge parcels add time not visible in new-tract square footage.',
      },
      {
        title: 'Peak growth-season demand',
        detail:
          'Inbound relocation and new-home closings fill June–August Saturdays in Wesley Chapel and related corridors first.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (simple access)',
        value: '$400–$1,100+',
        note: 'Higher with HOA soft costs or peak corridor windows',
      },
      {
        label: '2–3BR HOA SFH or modest multi-family',
        value: '$1,400–$3,600+',
        note: 'Gate rules and long carries trend up',
      },
      {
        label: '3–4+ BR / cross-corridor / long empty-mile',
        value: '$2,400–$6,500+',
        note: 'Wesley Chapel ↔ west county and far-east pairs price highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$105–$175+/hr',
        note: 'Portal-to-portal; packing and larger crews scale up',
      },
    ],
  },
  seasonal: {
    title: 'When to schedule a Pasco move',
    intro:
      'Growth-corridor closings, school calendars, summer heat, and hurricane season reshape crew availability.',
    items: [
      {
        title: 'Best truck windows: mid-week mornings',
        detail:
          'Tuesday–Thursday before 9 a.m. usually clear gates and reduce I-75 / SR-54 / US-19 pain. Avoid month-end Fridays when leases and closings collide.',
      },
      {
        title: 'Peak growth season: late spring through summer',
        detail:
          'New-home closings and family moves fill Wesley Chapel and Land O’ Lakes Saturdays. Book 2–4 weeks ahead for popular windows.',
      },
      {
        title: 'Hurricane season: June–November',
        detail:
          'West-county and flood-mapped parcels need weather contingency language. Confirm reschedule policies before deposits.',
      },
      {
        title: 'Summer heat on new tracts',
        detail:
          'Open streets without canopy get hot early. Prefer dawn starts; plan moisture protection for afternoon storms.',
      },
      {
        title: 'Snowbird & seasonal west-county pockets',
        detail:
          'Some west-county multi-family and manufactured communities see seasonal turnover — still quieter than South Florida coastal peaks, but not zero.',
      },
    ],
  },
  specialized: [
    {
      id: 'growth-hoa-new-construction',
      title: 'Growth HOA & new-construction logistics module',
      intro:
        'Pasco’s volume problem is often master-planned access plus unfinished streets — not urban freight elevators.',
      bullets: [
        'Collect HOA COI, gate lists, approved hours, and truck limits before the survey is final.',
        'Reconfirm street access the week of the move in active construction villages — rules change.',
        'Photo gate entries and cul-de-sac turnarounds so crews bring the right truck length.',
        'Book peak summer Saturdays early; mid-week windows often reduce friction and price pressure.',
        'Ask whether weekend moves are banned — many associations force weekday-only load-ins.',
      ],
    },
    {
      id: 'corridor-commute-cross-county',
      title: 'Corridor commuting & cross-county module',
      intro:
        'Many Pasco households still orient to Tampa Bay employment geography — drive time is part of the move estimate, not just the daily commute.',
      bullets: [
        'Price portal-to-portal time honestly for any pair that rides I-75, SR-54, US-19, or the Suncoast Parkway.',
        'Clarify Hillsborough or Pinellas addresses near county lines so licensing and distance assumptions stay accurate.',
        'Prefer start times that miss the worst southbound morning and northbound evening peaks when HOA windows allow.',
        'For far-east inland legs (Dade City / Zephyrhills), confirm whether a local rate card still applies.',
        'If the household is inbound from out of state, confirm FMCSA authority for the interstate leg and FDACS frameworks for any pure in-state second hop.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Pasco County?',
    intro:
      'Use this as a practical fit checklist — schools, healthcare, growth-suburb lifestyle, and commute reality — then verify on district and hospital sites. Avoid treating marketing rankings as facts.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & education landscape',
        intro:
          'Pasco County Schools serves most public K–12 students. Growth areas can see enrollment pressure as new tracts open.',
        bullets: [
          {
            title: 'How districts work here',
            detail:
              'Public K–12 is largely under Pasco County Schools. Boundary lines and capacity in high-growth zones matter as much as community marketing names — confirm zoning for any address.',
          },
          {
            title: 'Growth-area considerations',
            detail:
              'Wesley Chapel and other fast-growing corridors may see school capacity and busing changes as development continues. Ask current questions when touring.',
          },
          {
            title: 'Research sources',
            detail:
              'District tools, Florida Department of Education data, and independent comparison sites help — validate with campus visits.',
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
              'Local and regional care includes campuses such as AdventHealth Wesley Chapel, HCA Florida facilities in the west/north county area, and access to larger Tampa Bay systems for specialized care. Confirm networks for your household.',
          },
          {
            title: 'What relocators should do',
            detail:
              'Map peak-hour drive times to preferred hospitals — corridor congestion changes “nearby.” Many households also use Hillsborough specialists; include bridge and I-75 time in that plan. Transfer records early.',
          },
        ],
      },
      {
        id: 'housing',
        title: 'Housing character & cost pressures',
        bullets: [
          {
            title: 'Growth product vs older west county',
            detail:
              'Expect newer HOA SFH and townhomes in Wesley Chapel and similar corridors; older SFH and multi-family toward New Port Richey, Hudson, and Holiday. Access difficulty and insurance profiles differ.',
          },
          {
            title: 'Relative Bay affordability patterns',
            detail:
              'Many households compare Pasco to Hillsborough and Pinellas on total housing cost and commute. Compare specific micro-markets and insurance quotes — not county averages alone.',
          },
          {
            title: 'HOA dues and rules',
            detail:
              'Growth villages often include dues, architectural controls, and truck/move restrictions. Read documents before closing.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Which Pasco areas fit whom',
        bullets: [
          {
            title: 'New-suburban family growth',
            detail:
              'Wesley Chapel and related planned communities often appeal for newer homes, amenities, and school-oriented calendars — with HOA rules and corridor traffic as tradeoffs.',
          },
          {
            title: 'West-county value and Gulf-edge access',
            detail:
              'New Port Richey, Hudson, and Holiday areas can offer different price points and older stock — with US-19 congestion and flood awareness on some parcels.',
          },
          {
            title: 'Quieter inland towns',
            detail:
              'Zephyrhills and Dade City suit people prioritizing smaller-city or rural-edge living over Tampa-adjacent retail density — with longer empty-mile logistics.',
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
              'Local retail, healthcare, education, construction, and public sector roles sit alongside heavy commuting into Hillsborough (and sometimes Pinellas) job centers.',
          },
          {
            title: 'Commute realism',
            detail:
              'Most households are car-dependent. I-75 and SR-54 peaks are the main planning constraints for Tampa-oriented workers. Test drive peak routes before choosing solely on purchase price.',
          },
        ],
      },
      {
        id: 'lifestyle',
        title: 'Lifestyle & practical livability',
        bullets: [
          {
            title: 'Growth pace',
            detail:
              'Eastern and central corridors can feel construction-heavy and retail-new. Visit at commute hours to understand traffic before deciding.',
          },
          {
            title: 'Climate',
            detail:
              'Hot humid summers, afternoon storms, and hurricane season. West-county residents should learn flood and evacuation context for mapped parcels.',
          },
          {
            title: 'Access to Tampa Bay amenities',
            detail:
              'Many residents use Pasco housing with Tampa Bay employment and recreation — plan lifestyle around real corridor drive times, not brochure map distances.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Pasco County resources',
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify mover registration before deposits.',
    items: [
      {
        label: 'Pasco County — official site',
        href: 'https://www.pascocountyfl.net/',
        external: true,
        note: 'County services & offices',
      },
      {
        label: 'Pasco County Schools',
        href: 'https://www.pasco.k12.fl.us/',
        external: true,
        note: 'Boundaries, choice & calendars',
      },
      {
        label: 'City of New Port Richey',
        href: 'https://www.cityofnewportrichey.org/',
        external: true,
      },
      {
        label: 'City of Zephyrhills',
        href: 'https://www.ci.zephyrhills.fl.us/',
        external: true,
      },
      {
        label: 'City of Dade City',
        href: 'https://www.dadecityfl.com/',
        external: true,
      },
      {
        label: 'FL511 — traffic conditions',
        href: 'https://fl511.com/',
        external: true,
        note: 'I-75, SR-54, US-19, Suncoast before load windows',
      },
      {
        label: 'FEMA Flood Map Service Center',
        href: 'https://msc.fema.gov/portal/home',
        external: true,
        note: 'Check parcel flood zones',
      },
      {
        label: 'FDACS — Florida household movers (Ch. 507)',
        href: 'https://www.fdacs.gov/',
        external: true,
        note: 'Intrastate mover registration & consumer resources',
      },
      {
        label: 'FMCSA SAFER — interstate authority',
        href: 'https://safer.fmcsa.dot.gov/',
        external: true,
        note: 'Required when the move crosses state lines',
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
      {
        label: 'All Florida local mover guides',
        href: '/local-movers/florida',
      },
    ],
  },
  directoryHint:
    'Prefer crews fluent in growth HOA packets and new-construction access for Wesley Chapel / Land O’ Lakes; different playbooks for west-county older stock. Price corridor and cross-county pairs honestly. Verify FDACS for in-state moves and FMCSA for interstate legs.',
  lastReviewed: '2026-07-23',
};

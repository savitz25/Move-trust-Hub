import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';

/**
 * Hand-crafted Gwinnett County, Georgia moving intelligence.
 * Differentiators: diverse suburb growth, HOA density, I-85 corridor, family relos —
 * not Fulton intown towers, Cobb Cumberland/I-75 NW, or Forsyth affluent north HOA.
 */
export const gwinnettCountyIntelligence: CountyIntelligencePack = {
  stateSlug: 'georgia',
  countySlug: 'gwinnett',
  hubTitle: 'Gwinnett County Moving Intelligence Hub',
  eyebrow: 'Gwinnett · Diverse suburbs, HOAs & I-85 growth corridor',
  h1: 'Moving in Gwinnett County: HOA Suburbs, I-85 Corridor & Family Relocation Guide',
  heroOpener:
    'Gwinnett County is metro Atlanta’s high-growth suburban engine: diverse family neighborhoods, HOA master plans, townhome and multi-family corridors along I-85, and longer portal times that make “local” pairs feel regional. A Suwanee cul-de-sac, a Norcross older ranch, a Duluth townhome, a Lawrenceville two-story, and a Braselton-edge new build do not share gate rules, driveway depth, or traffic risk. I-85, I-985, GA-316, and Sugarloaf congestion rewrite estimates that ignore HOA packets and school-calendar demand. This hub is for people actually moving in Gwinnett — not generic Atlanta tips recycled from Midtown towers or Cobb’s northwest corridor.',
  heroCredibility:
    'Georgia DPS / MCCD household goods for intrastate Georgia moves · FMCSA for interstate legs · HOA & I-85 corridor awareness · Curated directory listings',
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
    title: 'What makes moving in Gwinnett County different',
    intro:
      'These are Gwinnett realities — diverse suburban growth, HOA logistics, and I-85 corridor distance — not interchangeable “northeast Atlanta” boilerplate.',
    bullets: [
      {
        title: 'HOA communities are the default move environment',
        detail:
          'Many Suwanee, Peachtree Corners, Duluth, Buford, and Braselton-edge villages require Certificates of Insurance, gate lists, truck length limits, and weekday-only windows. Collect rules in writing before locking a crew.',
      },
      {
        title: 'I-85 corridor sprawl turns short map miles into drive time',
        detail:
          'Norcross ↔ Buford, Duluth ↔ Lawrenceville, or Peachtree Corners ↔ Snellville pairs often look short and run long at peak. Portal-to-portal billing tracks I-85, I-985, GA-316, and Sugarloaf reality.',
      },
      {
        title: 'Diverse housing stock under one county label',
        detail:
          'Older Norcross and Lilburn ranches sit beside master-planned Suwanee and Buford product, multi-family near commercial nodes, and new construction on the north and east edges. Survey access, not ZIP marketing names.',
      },
      {
        title: 'Family relocation volume dominates the calendar',
        detail:
          'School-year timing, multi-bedroom SFH inventories, and inbound corporate/family moves concentrate May–August Saturdays. Book early for popular HOA windows.',
      },
      {
        title: 'New-construction access friction is common',
        detail:
          'North and east growth pockets can have incomplete streets, mud, limited staging, and HOA rules that arrive after closings. Confirm road and gate conditions the week of the move.',
      },
      {
        title: 'Multi-family and townhome elevators sit beside SFH work',
        detail:
          'Corridor apartments and stacked townhomes need building packets even when the destination is a classic cul-de-sac. Treat origin and destination rules separately.',
      },
      {
        title: 'Cross-county northeast metro pairs are routine',
        detail:
          'Households regularly move Gwinnett ↔ Fulton, DeKalb, Forsyth, or Hall. Clarify county lines so drive time and licensing assumptions stay accurate.',
      },
      {
        title: 'Intrastate Georgia rules vs interstate authority',
        detail:
          'Moves entirely within Georgia are generally subject to Georgia DPS Motor Carrier Compliance Division (MCCD) household-goods frameworks. Interstate legs need active FMCSA USDOT (and usually MC) authority.',
      },
    ],
  },
  zonesHeading: 'Gwinnett access zones',
  zonesIntro:
    'Plan by I-85 west-edge cities, central Gwinnett, north growth (Suwanee/Buford), east/southeast suburbs, and Peachtree Corners / tech-adjacent corridors — each has its own HOA density and arterial risk.',
  zones: [
    {
      id: 'peachtree-corners-norcross',
      name: 'Peachtree Corners, Norcross & west-edge corridor',
      shortName: 'PC / Norcross',
      neighborhoods: [
        'Peachtree Corners',
        'Norcross',
        'Berkeley Lake',
        'Technology Parkway edges',
        'Jimmy Carter Boulevard corridor',
        'I-85 west Gwinnett multi-family',
      ],
      housingTypes:
        'Older SFH and ranches, townhomes, mid-rise multi-family, some HOA villages',
      challenges: [
        'I-85 / Jimmy Carter congestion',
        'Mixed older-grid access and newer multi-family elevators',
        'Long portal time to east Gwinnett destinations',
        'County-line confusion with DeKalb / Fulton edges',
      ],
      moverTips:
        'Survey multi-family elevator rules separately from SFH curb access. Price I-85 peaks honestly. Clarify Gwinnett vs neighboring county addresses near the line.',
      cityKeywords: [
        'peachtree corners',
        'norcross',
        'berkeley lake',
        'jimmy carter',
        'technology parkway',
      ],
    },
    {
      id: 'duluth-suwanee',
      name: 'Duluth, Suwanee & north-central growth',
      shortName: 'Duluth / Suwanee',
      neighborhoods: [
        'Duluth',
        'Suwanee',
        'Sugarloaf corridor',
        'Johns Creek edge (verify county)',
        'McGinnis Ferry corridor',
        'Suwanee Station edges',
      ],
      housingTypes:
        'Master-planned HOA SFH, townhomes, some multi-family, newer two-story product',
      challenges: [
        'Near-universal HOA COI and gate lists in planned villages',
        'Sugarloaf / I-85 / McGinnis Ferry congestion',
        'Large family inventories and long driveway carries',
        'Peak Saturday competition in summer',
      ],
      moverTips:
        'Collect HOA packets before the survey is final. Photo gate, cul-de-sac turnaround, and driveway slope. Book June–August Saturdays early.',
      cityKeywords: [
        'duluth',
        'suwanee',
        'sugarloaf',
        'mcginnis ferry',
        'johns creek',
      ],
    },
    {
      id: 'lawrenceville-central',
      name: 'Lawrenceville & central Gwinnett',
      shortName: 'Lawrenceville',
      neighborhoods: [
        'Lawrenceville',
        'Downtown Lawrenceville edges',
        'GA-316 corridor',
        'Grayson edges',
        'Dacula edges',
        'Central Gwinnett multi-family',
      ],
      housingTypes:
        'Suburban SFH, townhomes, multi-family, mix of older tracts and newer subdivisions',
      challenges: [
        'GA-316 and arterial congestion',
        'HOA rules in newer villages mixed with older street grids',
        'Courthouse / civic corridor traffic on weekdays',
        'Long empty-mile time from west-edge staging',
      ],
      moverTips:
        'Prefer mid-week morning starts for GA-316 pairs. Confirm HOA vs non-HOA access. Share photos of driveway width and garage depth for two-story SFH.',
      cityKeywords: [
        'lawrenceville',
        'grayson',
        'dacula',
        '316',
        'central gwinnett',
      ],
    },
    {
      id: 'buford-north',
      name: 'Buford, Sugar Hill & north Gwinnett',
      shortName: 'Buford / North',
      neighborhoods: [
        'Buford',
        'Sugar Hill',
        'Rest Haven edges',
        'Mall of Georgia corridor',
        'I-985 corridor',
        'Lake Lanier south-edge pockets',
      ],
      housingTypes:
        'Growth SFH, HOA communities, townhomes, retail-adjacent multi-family',
      challenges: [
        'I-985 / Mall of Georgia traffic',
        'New-construction staging and incomplete streets',
        'HOA truck limits and weekday windows',
        'Spill toward Hall County destinations',
      ],
      moverTips:
        'Confirm construction access the week of greenfield moves. Collect gate lists early. Price retail-corridor congestion into weekend windows.',
      cityKeywords: [
        'buford',
        'sugar hill',
        'mall of georgia',
        'i-985',
        'lake lanier',
      ],
    },
    {
      id: 'snellville-east',
      name: 'Snellville, Loganville & east / southeast Gwinnett',
      shortName: 'East Gwinnett',
      neighborhoods: [
        'Snellville',
        'Loganville edges',
        'Grayson',
        'Lilburn edges',
        'Mountain Park edges',
        'US-78 corridor',
      ],
      housingTypes:
        'Family SFH tracts, some HOA villages, townhomes, limited multi-family',
      challenges: [
        'US-78 / Stone Mountain Freeway congestion',
        'Long portal time to I-85 west-edge origins',
        'School-zone timing on arterial corridors',
        'County-line confusion with Walton / Rockdale edges',
      ],
      moverTips:
        'Treat east Gwinnett as distance work from Peachtree Corners or Norcross. Prefer early starts around school corridors. Clarify Gwinnett vs Walton addresses near Loganville.',
      cityKeywords: [
        'snellville',
        'loganville',
        'lilburn',
        'grayson',
        'mountain park',
      ],
    },
    {
      id: 'lilburn-stone-mountain-edge',
      name: 'Lilburn, Mountain Park & southwest Gwinnett',
      shortName: 'SW Gwinnett',
      neighborhoods: [
        'Lilburn',
        'Mountain Park',
        'Tucker edge (verify county)',
        'Stone Mountain edge (verify county)',
        'US-29 corridor',
        'Beaver Ruin corridor',
      ],
      housingTypes:
        'Older SFH and split-levels, renovated homes, some multi-family, limited HOA product',
      challenges: [
        'Older driveways, stairs, and mature landscaping',
        'Arterial congestion toward I-85 and US-78',
        'Cross-county pairs into DeKalb',
        'Mixed inventory sizes in established neighborhoods',
      ],
      moverTips:
        'Photo stairs, driveway slope, and overhead clearance. Clarify DeKalb border destinations. Mid-week mornings reduce arterial friction.',
      cityKeywords: [
        'lilburn',
        'mountain park',
        'tucker',
        'beaver ruin',
        'stone mountain',
      ],
    },
  ],
  costDrivers: {
    title: 'What drives Gwinnett moving costs',
    intro:
      'Ranges are market context for local / short regional moves — not quotes. HOA soft costs, large family inventories, and I-85 corridor portal time separate cheap estimates from real bills.',
    drivers: [
      {
        title: 'HOA gate lists, COI & approved hours',
        detail:
          'Master-planned communities across Suwanee, Duluth, Buford, and Peachtree Corners add admin time and can force premium weekday slots.',
      },
      {
        title: 'I-85 / I-985 / GA-316 congestion',
        detail:
          'Portal-to-portal billing tracks peaks. Suburb-to-suburb pairs can burn 35–75+ minutes each way at rush.',
      },
      {
        title: 'Large family SFH inventories',
        detail:
          'Multi-bedroom two-stories, garages full of goods, and long driveway carries raise labor hours vs studio multi-family.',
      },
      {
        title: 'New-construction access friction',
        detail:
          'Incomplete streets, mud, and limited staging on north/east builds raise labor hours and risk delays.',
      },
      {
        title: 'Peak summer family demand',
        detail:
          'School-calendar volume tightens Saturday supply and raises peak pricing May–August.',
      },
      {
        title: 'Cross-county northeast metro patterns',
        detail:
          'Gwinnett ↔ Fulton, DeKalb, Forsyth, or Hall stops need honest distance assumptions in the written estimate.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (simple access)',
        value: '$480–$1,350+',
        note: 'Higher with elevators, HOA windows, or peak I-85 traffic',
      },
      {
        label: '2–3BR condo/townhome or modest SFH',
        value: '$1,550–$4,100+',
        note: 'HOA soft costs and family inventories trend up',
      },
      {
        label: '3–4+ BR / gated community / cross-zone',
        value: '$2,600–$7,800+',
        note: 'Large HOA homes and long east–west pairs price highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$115–$185+/hr',
        note: 'Portal-to-portal; packing and larger crews scale up',
      },
    ],
  },
  seasonal: {
    title: 'When to schedule a Gwinnett move',
    intro:
      'School calendars, corporate multi-family turnover, new-home closings, and summer heat all reshape access and crew availability.',
    items: [
      {
        title: 'Best truck windows: mid-week mornings',
        detail:
          'Tuesday–Thursday before 9 a.m. usually clear curb space and reduce I-85 / 316 pain. Avoid month-end Fridays when leases and closings collide.',
      },
      {
        title: 'Peak family season: May–August',
        detail:
          'Suwanee, Duluth, Buford, Lawrenceville, and Snellville SFH moves fill Saturday calendars first. Book 2–4 weeks ahead for popular HOA windows.',
      },
      {
        title: 'New-home closing clusters',
        detail:
          'North and east growth villages may see batches of closings that strain local crew supply. Book early when your builder closing date is firm.',
      },
      {
        title: 'Corridor multi-family turnover',
        detail:
          'I-85 and commercial-node apartments can spike mid-month. Confirm building elevators and COI early.',
      },
      {
        title: 'Summer heat & afternoon storms',
        detail:
          'Prefer early starts for heat on open suburban streets. Plan tarps and dry staging when storms are forecast.',
      },
    ],
  },
  specialized: [
    {
      id: 'hoa-family-suburbs',
      title: 'HOA family suburb & master-plan module',
      intro:
        'Suwanee, Duluth, Buford, and many Peachtree Corners villages fail on gate lists, COI, and Saturday demand more often than on packing skill.',
      bullets: [
        'Collect HOA COI, gate lists, approved hours, and truck size limits before the survey is final.',
        'Photo driveway, gate, and cul-de-sac turnaround space.',
        'Book peak June–August Saturdays early — family HOA corridors fill first.',
        'Prefer early summer starts for heat on open streets.',
        'Discuss packing help for multi-bedroom family inventories early.',
      ],
    },
    {
      id: 'i85-corridor-growth',
      title: 'I-85 corridor growth & new-construction module',
      intro:
        'West-to-north Gwinnett volume is often arterial distance plus greenfield access — not Atlanta intown elevators.',
      bullets: [
        'Price portal-to-portal time honestly for I-85, I-985, GA-316, and Sugarloaf pairs.',
        'Confirm unfinished road and staging conditions the week of greenfield moves.',
        'Survey multi-family elevator rules separately from SFH destinations.',
        'Clarify Fulton, DeKalb, Forsyth, or Hall border addresses.',
        'Avoid school drop-off/pick-up peaks on major arterials when flexible.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Gwinnett County?',
    intro:
      'Use this as a practical fit checklist — schools, healthcare, suburban lifestyle — then verify on district and hospital sites. No single ranking captures neighborhood fit.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & education landscape',
        intro:
          'Gwinnett County Public Schools serves most of the county; a few pockets may involve neighboring systems near borders. Assignment is address-based.',
        bullets: [
          {
            title: 'How districts work here',
            detail:
              'Confirm zoning for any property with district tools — master-plan marketing names do not guarantee a campus. Magnet and specialty options exist; verify eligibility and transportation.',
          },
          {
            title: 'Growth areas and capacity',
            detail:
              'North and east growth can see enrollment pressure as new tracts open. Ask about capacity, portable classrooms, and busing when touring.',
          },
          {
            title: 'Research sources',
            detail:
              'Gwinnett County Public Schools boundary tools, Georgia Department of Education data, and campus visits beat ranking screenshots alone.',
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
              'Northside Hospital Gwinnett and other regional facilities, plus access into metro Atlanta systems, serve different corridors. Confirm networks and specialties for your household.',
          },
          {
            title: 'What relocators should do',
            detail:
              'Map peak-hour drive times from Buford, Snellville, or Peachtree Corners to preferred facilities — I-85 congestion changes “nearby” on paper. Transfer records early.',
          },
        ],
      },
      {
        id: 'housing',
        title: 'Housing character & cost pressures',
        bullets: [
          {
            title: 'Suburban and HOA stock',
            detail:
              'Much of Gwinnett’s newer inventory sits in HOA communities with amenities, architectural rules, and dues. Older Norcross/Lilburn corridors offer different character and access profiles.',
          },
          {
            title: 'Cost variation inside the county',
            detail:
              'Purchase prices and rents vary by city and master plan. Budget for HOA dues, gate communities, and longer commute fuel/time costs.',
          },
          {
            title: 'New construction pace',
            detail:
              'North and east corridors can feel construction-heavy. Visit at commute hours to understand traffic and noise before deciding.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Which Gwinnett areas fit whom',
        bullets: [
          {
            title: 'Family master-planned suburbs',
            detail:
              'Suwanee, Duluth, Buford, and similar patterns often appeal for newer homes and school-focused living — with arterial commute tradeoffs.',
          },
          {
            title: 'West-edge / tech-adjacent living',
            detail:
              'Peachtree Corners and Norcross can suit people prioritizing job-center proximity and mixed housing types — still car-dependent at peak.',
          },
          {
            title: 'East and southeast patterns',
            detail:
              'Snellville, Loganville-edge, and related areas can feel more established-suburban; verify drive times to I-85 west job nodes.',
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
              'Logistics and distribution, healthcare, retail, professional services, manufacturing, and tech-adjacent offices shape local employment. Many residents also commute into Fulton/DeKalb cores.',
          },
          {
            title: 'Commute realism',
            detail:
              'Most households are car-dependent. I-85, I-985, GA-316, and Sugarloaf peaks are real. Test drive peak routes before choosing solely on purchase price.',
          },
        ],
      },
      {
        id: 'lifestyle',
        title: 'Lifestyle & practical livability',
        bullets: [
          {
            title: 'Diverse high-growth suburb character',
            detail:
              'Gwinnett is defined by multicultural communities, family housing, and corridor retail — different from Fulton’s vertical core or Cherokee’s more exurban north-metro feel.',
          },
          {
            title: 'Climate',
            detail:
              'Hot humid summers and frequent storms. Plan outdoor staging and heat-safe move-in logistics.',
          },
          {
            title: 'Amenities and pace',
            detail:
              'Parks, shopping, and restaurants are abundant along major corridors; outer edges can feel more construction-oriented. Visit at peak and off-peak times when deciding.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Gwinnett resources',
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify mover registration before deposits.',
    items: [
      {
        label: 'Gwinnett County — official site',
        href: 'https://www.gwinnettcounty.com/',
        external: true,
        note: 'County services & offices',
      },
      {
        label: 'City of Lawrenceville',
        href: 'https://www.lawrencevillega.org/',
        external: true,
      },
      {
        label: 'City of Duluth',
        href: 'https://www.duluthga.net/',
        external: true,
      },
      {
        label: 'City of Suwanee',
        href: 'https://www.suwanee.com/',
        external: true,
      },
      {
        label: 'Gwinnett County Public Schools',
        href: 'https://www.gcpsk12.org/',
        external: true,
        note: 'Boundaries & calendars',
      },
      {
        label: 'Georgia 511 — traffic conditions',
        href: 'https://www.511ga.org/',
        external: true,
        note: 'I-85, I-985, GA-316 before load windows',
      },
      {
        label: 'Georgia DPS / MCCD — household goods',
        href: 'https://gamccd.net/HouseholdGoods.aspx',
        external: true,
        note: 'Intrastate Georgia household-goods motor carrier resources',
      },
      {
        label: 'Georgia MCCD — main site',
        href: 'https://gamccd.net/',
        external: true,
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
        label: 'All Georgia local mover guides',
        href: '/local-movers/georgia',
      },
    ],
  },
  directoryHint:
    'Prefer crews with master-planned HOA fluency for Suwanee/Duluth/Buford; honest I-85 / GA-316 timing for corridor pairs; family SFH packing capacity for summer peak. Verify Georgia DPS/MCCD for in-state moves and FMCSA for interstate legs.',
  lastReviewed: '2026-07-23',
};

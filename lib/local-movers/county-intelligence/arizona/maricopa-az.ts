import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';

/**
 * Hand-crafted Maricopa County, Arizona moving intelligence.
 * Differentiators: Phoenix metro sprawl, East/West Valley vs central, HOA/master-planned density,
 * extreme heat, snowbird season — not Tucson foothills (Pima) or Sun Corridor growth towns (Pinal).
 */
export const maricopaCountyIntelligence: CountyIntelligencePack = {
  stateSlug: 'arizona',
  countySlug: 'maricopa',
  hubTitle: 'Maricopa County Moving Intelligence Hub',
  eyebrow: 'Maricopa · Phoenix metro, East Valley & West Valley sprawl',
  h1: 'Moving in Maricopa County: Phoenix Core, East Valley & West Valley Sprawl Guide',
  heroOpener:
    'Maricopa County is Arizona’s sprawl capital: downtown and midtown Phoenix towers on one side, master-planned East Valley and West Valley villages on the other, and desert heat that turns open carries into a labor-hours problem from May through September. A Roosevelt Row loft, a Scottsdale mid-rise, a Chandler HOA two-story, and a Surprise ranch do not share truck access, portal time, or HOA soft costs. Intra-county “local” moves routinely burn 45–90+ minutes portal-to-portal on I-10, I-17, Loop 101, Loop 202, and US-60. This hub is for people actually moving in Maricopa — not generic Arizona tips recycled from Tucson or the Pinal growth corridor.',
  heroCredibility:
    'Extreme desert heat pacing · ACC business-entity check for Arizona companies · FMCSA for interstate legs · Curated directory listings',
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
    title: 'What makes moving in Maricopa County different',
    intro:
      'These are Maricopa realities — extreme Valley sprawl, HOA density, and heat-first logistics under one county label — not interchangeable “Phoenix area” boilerplate or Tucson foothill patterns.',
    bullets: [
      {
        title: 'Sprawl turns “local” into regional drive time',
        detail:
          'Downtown Phoenix ↔ Surprise, Tempe ↔ Goodyear, or Scottsdale ↔ Chandler pairs often look short on a map and long on a clock. Portal-to-portal billing tracks real freeway peaks on I-10, I-17, Loop 101/202, and US-60 — not crow-flies miles.',
      },
      {
        title: 'Central Phoenix vertical is a different job than Valley SFH',
        detail:
          'Downtown, midtown, and high-rise corridors need COI, elevators, and tight curb staging. East Valley and West Valley master plans flip to gate lists, long driveway carries, and HOA-approved hours.',
      },
      {
        title: 'East Valley vs West Valley are not interchangeable markets',
        detail:
          'Tempe, Mesa, Chandler, Gilbert, and Scottsdale edges lean university/tech/corporate and denser HOA product; Glendale, Peoria, Surprise, Buckeye, and Goodyear often mean longer empty-mile runs from core staging and newer tract construction traffic.',
      },
      {
        title: 'HOA and master-planned rules dominate suburban volume',
        detail:
          'Planned communities across the Valley enforce Certificates of Insurance, reserved truck windows, and gate lists. Collect management packets before locking a Saturday crew in peak season.',
      },
      {
        title: 'Extreme heat is a labor and scheduling factor, not a footnote',
        detail:
          'Summer afternoons regularly push 110°F+. Heat stress slows open carries on new-construction streets and open docks. Early starts and hydration pacing outperform noon load-outs from May through September.',
      },
      {
        title: 'Snowbird and seasonal resident demand reshapes winter calendars',
        detail:
          'October–April brings seasonal residents, second-home turnover, and retiree inventory that competes with family moves — a pattern Pima sees at lower scale and Pinal feels mainly as overflow from Maricopa growth.',
      },
      {
        title: 'Cross-county Sun Corridor pairs are common',
        detail:
          'Households regularly move Maricopa ↔ Pinal (San Tan, Queen Creek-edge, Casa Grande approach) and less often Maricopa ↔ Pima for long I-10 legs. Clarify county lines so drive time and licensing assumptions stay accurate.',
      },
      {
        title: 'Arizona entity diligence vs interstate FMCSA authority',
        detail:
          'Arizona does not run a California BHGS– or Texas TxDMV–style statewide household-goods mover certificate program. For in-state work, verify Arizona Corporation Commission (ACC) business-entity status, insurance, and written contracts. Interstate legs need active FMCSA USDOT (and usually MC) authority.',
      },
    ],
  },
  zonesHeading: 'Maricopa Valley access zones',
  zonesIntro:
    'Plan by central Phoenix, Scottsdale / northeast, East Valley, West Valley, and far-west / northwest growth — each has its own HOA density, freeway profile, and heat-exposed staging pattern.',
  zones: [
    {
      id: 'phoenix-core',
      name: 'Central Phoenix: downtown, midtown & urban villages',
      shortName: 'Phoenix Core',
      neighborhoods: [
        'Downtown Phoenix',
        'Midtown / Central Corridor',
        'Roosevelt Row',
        'Willis / Arts District edges',
        'Encanto / Melrose edges',
        'South Mountain approach edges',
      ],
      housingTypes:
        'High-rises and mid-rises, urban condos, lofts, multi-family redevelopment, older SFH pockets',
      challenges: [
        'Elevator/COI and loading-dock reservations',
        'Event and sports traffic near downtown',
        'Limited curb staging and street parking',
        'Garage height limits on some towers',
      ],
      moverTips:
        'Get building packets early. Prefer mid-week morning freight windows. Avoid major event days when flexible. Share dock photos and truck height limits before the survey is final.',
      cityKeywords: [
        'phoenix',
        'downtown phoenix',
        'midtown',
        'roosevelt',
        'encanto',
        'central avenue',
      ],
    },
    {
      id: 'scottsdale-ne',
      name: 'Scottsdale, Paradise Valley edges & northeast Valley',
      shortName: 'Scottsdale / NE',
      neighborhoods: [
        'Old Town Scottsdale',
        'North Scottsdale',
        'McCormick Ranch edges',
        'Paradise Valley edges',
        'Fountain Hills approach',
        'Desert Ridge / Kierland edges',
      ],
      housingTypes:
        'Luxury SFH and golf-course communities, mid-rise condos, resort-adjacent multi-family, gated enclaves',
      challenges: [
        'HOA and resort community rules',
        'Higher-value inventories and careful-handling norms',
        'Steep desert drives and long cul-de-sac carries in foothill pockets',
        'Tourist-season congestion near Old Town',
      ],
      moverTips:
        'Discuss valuation early for higher-value contents. Collect HOA/gate packets. Photo driveway grade and street width in foothill and golf communities. Prefer early starts in summer heat.',
      cityKeywords: [
        'scottsdale',
        'paradise valley',
        'fountain hills',
        'desert ridge',
        'kierland',
        'mccormick ranch',
      ],
    },
    {
      id: 'east-valley',
      name: 'East Valley: Tempe, Mesa, Chandler, Gilbert & Queen Creek edges',
      shortName: 'East Valley',
      neighborhoods: [
        'Tempe',
        'Mesa',
        'Chandler',
        'Gilbert',
        'Ahwatukee edges',
        'Queen Creek (Maricopa side) edges',
      ],
      housingTypes:
        'University multi-family, suburban SFH, dense HOA master plans, townhomes, tech-corridor apartments',
      challenges: [
        'US-60 / Loop 101 / Loop 202 congestion',
        'ASU and lease-turnover spikes in Tempe/Mesa',
        'HOA COI and gate lists in Chandler/Gilbert villages',
        'County-line confusion near Pinal (Queen Creek / San Tan)',
      ],
      moverTips:
        'Price US-60 and Loop peaks honestly. Collect HOA packets for Gilbert/Chandler master plans. Avoid peak student move-in weekends near ASU when flexible. Clarify Maricopa vs Pinal destinations near the southeast edge.',
      cityKeywords: [
        'tempe',
        'mesa',
        'chandler',
        'gilbert',
        'ahwatukee',
        'queen creek',
        'east valley',
      ],
    },
    {
      id: 'west-valley',
      name: 'West Valley: Glendale, Peoria, Avondale, Goodyear & Surprise',
      shortName: 'West Valley',
      neighborhoods: [
        'Glendale',
        'Peoria',
        'Avondale',
        'Goodyear',
        'Surprise',
        'Litchfield Park edges',
      ],
      housingTypes:
        'Suburban SFH, master-planned communities, townhomes, multi-family along freeways, some older tract product',
      challenges: [
        'I-10 / Loop 101 / Loop 303 portal time to east-side origins',
        'HOA rules in newer villages',
        'Long empty-mile time from central staging',
        'Stadium and Westgate event traffic near Glendale',
      ],
      moverTips:
        'Treat West Valley jobs as HOA-first distance work. Build I-10 and Loop buffer at rush. Prefer early summer starts on open new-construction streets. Book peak Saturdays early — family SFH demand fills first.',
      cityKeywords: [
        'glendale',
        'peoria',
        'avondale',
        'goodyear',
        'surprise',
        'litchfield park',
        'west valley',
      ],
    },
    {
      id: 'far-west-nw-growth',
      name: 'Far west & northwest growth: Buckeye, Verrado edges & Anthem corridor',
      shortName: 'Far West / NW',
      neighborhoods: [
        'Buckeye',
        'Verrado / master-planned west edges',
        'Sun City / Sun City West edges',
        'Anthem',
        'New River approach',
        'Cave Creek / Carefree edges',
      ],
      housingTypes:
        'Large newer SFH tracts, active-adult communities, HOA master plans, foothill custom homes on desert lots',
      challenges: [
        'Extreme portal time to central Phoenix and East Valley',
        'Construction traffic in expanding tracts',
        'Active-adult community rules and seasonal resident timing',
        'Desert lot access, grades, and long carries from street to home',
      ],
      moverTips:
        'Never price Buckeye or Anthem ↔ downtown as a short local hop without traffic buffer. Collect HOA/active-adult packets early. Plan heat-safe early starts and confirm driveway photos for desert-lot product.',
      cityKeywords: [
        'buckeye',
        'verrado',
        'sun city',
        'anthem',
        'cave creek',
        'carefree',
        'new river',
      ],
    },
    {
      id: 'south-mountain-ahwatukee',
      name: 'South Mountain, Ahwatukee & I-10 south corridor',
      shortName: 'South / Ahwatukee',
      neighborhoods: [
        'Ahwatukee Foothills',
        'South Mountain villages',
        'Laveen edges',
        'Baseline corridor edges',
        'I-10 south multi-family',
      ],
      housingTypes:
        'Foothill SFH, HOA villages, townhomes, multi-family along I-10, some custom desert lots',
      challenges: [
        'I-10 south congestion and limited alternate routes in foothill pockets',
        'HOA gate and parking rules',
        'Steep drives and tight turns in foothill cul-de-sacs',
        'Heat-exposed open staging on newer streets',
      ],
      moverTips:
        'Photo driveway grade and truck turn radius. Collect HOA rules for Ahwatukee villages. Prefer early I-10 windows and mid-week mornings for south-corridor pairs.',
      cityKeywords: [
        'ahwatukee',
        'south mountain',
        'laveen',
        'baseline',
        'south phoenix',
      ],
    },
  ],
  costDrivers: {
    title: 'What drives Maricopa moving costs',
    intro:
      'Ranges are market context for local / short regional moves — not quotes. Heat pacing, HOA soft costs, and Valley freeway portal time separate cheap estimates from real bills.',
    drivers: [
      {
        title: 'Downtown elevator, COI & dock soft costs',
        detail:
          'Building packets, elevator reservations, and certificate admin add time before loading starts on central Phoenix and Scottsdale mid-rises.',
      },
      {
        title: 'Valley freeway congestion (I-10 / I-17 / Loop 101 / 202 / US-60)',
        detail:
          'Portal-to-portal billing tracks rush peaks. Core ↔ West Valley or Tempe ↔ Surprise can burn 45–90+ minutes each way.',
      },
      {
        title: 'HOA and master-planned community rules',
        detail:
          'Gate lists, COI, and weekday-only windows across East and West Valley villages push demand into peak pricing.',
      },
      {
        title: 'Extreme heat pacing & crew safety',
        detail:
          'Heat-safe rest cycles and early starts can extend clock hours on open suburban streets from late spring through early fall.',
      },
      {
        title: 'Longer suburban hauls & empty-mile staging',
        detail:
          'Buckeye, Anthem, Queen Creek-edge, and far West Valley origins raise empty miles from core yards before the first item loads.',
      },
      {
        title: 'Snowbird and seasonal inventory spikes',
        detail:
          'Winter seasonal demand and active-adult community turnover can tighten crew calendars even when summer heat is gone.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (simple access)',
        value: '$450–$1,300+',
        note: 'Higher with elevators, docks, or peak freeway traffic',
      },
      {
        label: '2–3BR condo or modest SFH',
        value: '$1,400–$3,800+',
        note: 'HOA soft costs and long Valley pairs trend up',
      },
      {
        label: '3–4+ BR / tower / cross-Valley',
        value: '$2,500–$7,500+',
        note: 'Downtown towers and East↔West Valley pairs price highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$110–$180+/hr',
        note: 'Portal-to-portal; packing and larger crews scale up',
      },
    ],
  },
  seasonal: {
    title: 'When to schedule a Maricopa move',
    intro:
      'Extreme heat, monsoon storms, snowbird season, and school calendars all reshape access, crew availability, and safe outdoor staging windows.',
    items: [
      {
        title: 'Best truck windows: mid-week early mornings',
        detail:
          'Tuesday–Thursday starts before 7–8 a.m. usually clear curb space, reduce Loop/I-10 pain, and beat peak heat. Avoid month-end Fridays when leases collide.',
      },
      {
        title: 'Extreme heat season: May–September',
        detail:
          'Afternoon temperatures routinely make open carries slower and more fatiguing. Prefer dawn starts, shade/tarp plans, and honest hour estimates that include heat pacing — not just inventory size.',
      },
      {
        title: 'Monsoon pattern: roughly July–September',
        detail:
          'Dust storms, high winds, and sudden downpours can halt outdoor staging and wet cardboard. Confirm weather contingency and reschedule language before deposits.',
      },
      {
        title: 'Snowbird & seasonal peak: October–April',
        detail:
          'Seasonal residents, second homes, and active-adult communities increase winter volume. Book popular windows early even when daytime temperatures are mild.',
      },
      {
        title: 'Family & school season: late May–mid-August',
        detail:
          'East and West Valley family SFH moves fill Saturday calendars. Book 2–4 weeks ahead for peak weekends; heat and school calendars stack demand.',
      },
    ],
  },
  specialized: [
    {
      id: 'valley-hoa-master-planned',
      title: 'Valley HOA & master-planned logistics module',
      intro:
        'East Valley and West Valley volume often fails on gate lists, COI, and approved hours more often than on packing skill.',
      bullets: [
        'Collect HOA COI, gate lists, truck size limits, and approved hours before the survey is final.',
        'Price portal-to-portal time honestly for any pair that rides I-10, I-17, Loop 101/202, or US-60.',
        'Share driveway, cul-de-sac, and gate photos for new master-planned villages.',
        'Prefer early summer starts for heat on open suburban streets.',
        'Clarify Maricopa vs Pinal border addresses near Queen Creek / San Tan so drive-time assumptions stay accurate.',
        'Book peak June–August Saturdays early — growth corridors fill first.',
      ],
    },
    {
      id: 'heat-snowbird-phoenix-core',
      title: 'Extreme heat, snowbird & Phoenix core vertical module',
      intro:
        'Central towers plus winter seasonal demand create two different stress patterns on the same county calendar.',
      bullets: [
        'Request building move packets (COI, elevator hours, dock rules) at lease signing or escrow for downtown/midtown product.',
        'Reserve freight elevators in writing and reconfirm the day before.',
        'Plan heat-safe pacing: early starts, water, and shaded staging from May through September.',
        'Build monsoon contingency for dust, wind, and rain holds in late summer.',
        'For snowbird and active-adult communities, confirm association rules and seasonal timing before locking crews.',
        'Discuss valuation for higher-value Scottsdale / Paradise Valley inventories early.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Maricopa County?',
    intro:
      'Use this as a practical fit checklist — schools, healthcare, Valley lifestyle, and commute realism — then verify on district and hospital sites. No single ranking captures neighborhood fit.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & education landscape',
        intro:
          'Maricopa is served by many independent school districts and charter options (Phoenix Union and elementary districts, Mesa, Chandler, Gilbert, Scottsdale, Peoria, Dysart, and others). Assignment is address-based.',
        bullets: [
          {
            title: 'How districts work here',
            detail:
              'Public K–12 is split across numerous districts rather than one county-wide system. Confirm zoning for any property — neighborhood marketing names do not guarantee school assignment.',
          },
          {
            title: 'Growth areas and capacity',
            detail:
              'West Valley and far-west growth corridors can see enrollment pressure as new tracts open. Ask districts about capacity and busing when touring.',
          },
          {
            title: 'Research sources',
            detail:
              'District boundary tools, Arizona Department of Education data, and campus visits help — treat online rankings as starting points only.',
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
              'Large systems with Valley campuses include Banner Health, Dignity Health / CommonSpirit, HonorHealth, Phoenix Children’s, and Mayo Clinic Arizona (Scottsdale/Phoenix area). Specialty access is strong metro-wide; confirm networks for your household.',
          },
          {
            title: 'What relocators should do',
            detail:
              'Map peak-hour drive times from West Valley or far-east suburbs to preferred campuses — sprawl congestion changes “nearby” on paper. Transfer records early.',
          },
        ],
      },
      {
        id: 'housing',
        title: 'Housing character & cost pressures',
        bullets: [
          {
            title: 'Core vs Valley stock',
            detail:
              'Expect denser multi-unit and older SFH in central Phoenix; larger newer tracts and HOA villages dominate East Valley, West Valley, Buckeye, and Anthem-edge patterns.',
          },
          {
            title: 'HOA prevalence',
            detail:
              'Master-planned and many suburban communities include dues, design rules, and move-day restrictions. Read association documents carefully before closing.',
          },
          {
            title: 'Heat and utility budgeting',
            detail:
              'Summer cooling costs and pool maintenance are real household expenses. Factor them into total cost of living alongside rent or mortgage.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Which Maricopa areas fit whom',
        bullets: [
          {
            title: 'Urban and near-core lifestyle',
            detail:
              'Downtown, midtown, and central corridor living suit people prioritizing shorter urban access and amenities over new-tract square footage.',
          },
          {
            title: 'East Valley family and tech corridors',
            detail:
              'Tempe, Chandler, Gilbert, and Mesa often appeal for employment access, newer HOA product, and family amenities — with US-60 / Loop congestion risk.',
          },
          {
            title: 'West Valley and far-west value / space patterns',
            detail:
              'Glendale, Peoria, Surprise, Goodyear, and Buckeye attract households seeking newer homes and space; verify commute times to central or East Valley jobs before choosing solely on purchase price.',
          },
          {
            title: 'Scottsdale / northeast desert lifestyle',
            detail:
              'Scottsdale and Paradise Valley edges often fit higher-amenity and desert-recreation preferences; expect HOA/gate logistics and tourist-season traffic near Old Town.',
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
              'Healthcare, financial services, semiconductor and advanced manufacturing, aerospace/defense, tourism/hospitality, government, and professional services shape Valley employment. ASU and major corporate campuses concentrate daytime traffic.',
          },
          {
            title: 'Commute realism',
            detail:
              'Most households are car-dependent. I-10, I-17, Loop 101/202, and US-60 peaks are real. Test drive peak routes from outer suburbs before choosing solely on home price.',
          },
        ],
      },
      {
        id: 'lifestyle',
        title: 'Lifestyle & practical livability',
        bullets: [
          {
            title: 'Scale without a single “center of gravity”',
            detail:
              'Maricopa offers dense urban cores, golf-and-desert amenity corridors, and vast inland suburbs under one county — a different pattern than Tucson’s mountain-framed basin (Pima) or Pinal’s corridor growth towns.',
          },
          {
            title: 'Climate',
            detail:
              'Extremely hot, dry summers; mild winters that draw seasonal residents; monsoon dust and storms in late summer. Plan outdoor staging and heat readiness as part of move-in.',
          },
          {
            title: 'Growth pace',
            detail:
              'West Valley and far-west corridors can feel construction-heavy. Visit at commute hours to understand traffic and noise before deciding.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Maricopa resources',
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify business entity status and interstate authority before deposits.',
    items: [
      {
        label: 'Maricopa County — official site',
        href: 'https://www.maricopa.gov/',
        external: true,
        note: 'County services & offices',
      },
      {
        label: 'City of Phoenix',
        href: 'https://www.phoenix.gov/',
        external: true,
      },
      {
        label: 'City of Mesa',
        href: 'https://www.mesaaz.gov/',
        external: true,
      },
      {
        label: 'City of Scottsdale',
        href: 'https://www.scottsdaleaz.gov/',
        external: true,
      },
      {
        label: 'Arizona Department of Transportation (ADOT)',
        href: 'https://azdot.gov/',
        external: true,
        note: 'Freeway conditions & travel info',
      },
      {
        label: 'Arizona Corporation Commission (ACC)',
        href: 'https://www.azcc.gov/',
        external: true,
        note: 'Business entity search — Arizona does not issue a separate statewide household-goods mover certificate like CA/FL/TX/NY',
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
        label: 'All Arizona local mover guides',
        href: '/local-movers/arizona',
      },
    ],
  },
  directoryHint:
    'Prefer crews with downtown dock/elevator experience for central Phoenix towers; HOA fluency and honest Loop / I-10 timing for East and West Valley master plans. Extreme heat needs early starts and paced labor — not just bigger crews. Verify ACC entity status for in-state companies and FMCSA for interstate legs.',
  lastReviewed: '2026-07-23',
};

import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';

/**
 * Hand-crafted Denton County, Texas moving intelligence.
 * Differentiators: north DFW growth corridor, University of North Texas / TWU student turnover,
 * suburban expansion (Frisco-edge, Little Elm, Prosper-edge) — not Dallas County core elevators
 * or Collin-only Plano/McKinney scripts.
 */
export const dentonCountyIntelligence: CountyIntelligencePack = {
  stateSlug: 'texas',
  countySlug: 'denton',
  hubTitle: 'Denton County Moving Intelligence Hub',
  eyebrow: 'Denton County · North DFW growth & university corridor',
  h1: 'Moving in Denton County: North DFW Growth, Denton University Town & Suburban Expansion Guide',
  heroOpener:
    'Denton County is north DFW’s growth engine — not Dallas County with a different zip code. The City of Denton still runs on university calendars, older street grids, and I-35E staging, while Frisco-edge, Little Elm, Providence Village, and Prosper-adjacent tracts bring master-planned HOAs, wide suburban arterials, and end-of-month lease churn. Flower Mound and Highland Village flip toward lake-adjacent and larger-lot product; Lewisville and Carrollton edges absorb metro density without downtown Dallas elevators. Summer heat, school calendars, and DFW spillover fill Saturday crews first. This guide is for people actually moving in Denton County — north-metro expansion plus university town logistics — not a recycled Dallas or Collin script.',
  heroCredibility:
    'North DFW growth · University & suburban expansion · TxDMV household goods (intrastate) · FMCSA when interstate · Curated listings',
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
    title: 'What makes moving in Denton County different',
    intro:
      'These are Denton County realities — university-town access, north DFW HOA growth, and I-35E corridor timing — not interchangeable “DFW metro” boilerplate.',
    bullets: [
      {
        title: 'University Denton and north-suburb growth are different products',
        detail:
          'A near-campus apartment, a downtown Denton bungalow, a Little Elm two-story, and a Frisco-edge HOA home do not share truck access, parking rules, or inventory profiles. Name both origin and destination cities on every estimate — “Denton County local” is too vague.',
      },
      {
        title: 'UNT / TWU calendars drive student and staff turnover',
        detail:
          'August, December, and May windows pack crews with short-notice apartment moves, elevator buildings, and high volume near campus. Mid-semester Saturdays still book; start-of-term peaks require earlier lead time.',
      },
      {
        title: 'North DFW spillover fills planned communities first',
        detail:
          'Households choosing Denton County for newer housing, schools, and relative value still commute into Collin, Dallas, and Tarrant job centers. Inbound volume tracks Frisco-edge, Little Elm, Argyle, and Prosper-adjacent inventory more than Square-only Denton.',
      },
      {
        title: 'I-35E / I-35W / 121 / 380 timing rewrites “local” ETAs',
        detail:
          'Map miles between Denton, Lewisville, Flower Mound, and Frisco-edge understate peak portal time. Hourly crews feel every bottleneck — ask how drive time is priced before you compare rate cards.',
      },
      {
        title: 'HOAs dominate much of the suburban growth stock',
        detail:
          'Master-planned villages require Certificates of Insurance, approved hours, gate lists, and floor protection. Treat the HOA packet as part of the survey — not an afterthought on move morning.',
      },
      {
        title: 'Lake and larger-lot edges change access',
        detail:
          'Flower Mound, Highland Village, and lake-adjacent pockets bring longer carries, cul-de-sac turnaround limits, and weekend recreation traffic that flat apartment corridors never see.',
      },
      {
        title: 'North Texas summer heat stresses open staging',
        detail:
          'Afternoon heat on suburban streets and apartment docks slows exterior carries. Early starts, shaded staging, and heat-safe packing for electronics outperform noon load-outs in July and August.',
      },
      {
        title: 'Texas intrastate rules (TxDMV) + FMCSA when interstate',
        detail:
          'Moves entirely within Texas are generally overseen under Texas Department of Motor Vehicles (TxDMV) household-goods / motor-carrier frameworks. Interstate legs (e.g. Denton → Oklahoma City or out-of-state) need active FMCSA USDOT (and usually MC) authority. Confirm which license applies to your exact origin and destination before deposit.',
      },
    ],
  },
  zonesHeading: 'Denton County access zones',
  zonesIntro:
    'Treat each zone as its own access and traffic problem. University Denton, Lewisville/Carrollton edges, Flower Mound/Highland Village, Little Elm/growth north, and Frisco/Prosper-edge HOAs are not interchangeable.',
  zones: [
    {
      id: 'denton-university',
      name: 'Denton core — university town & historic grid',
      shortName: 'Denton Core',
      neighborhoods: [
        'Downtown Denton / The Square',
        'UNT campus-adjacent',
        'TWU / east campus edges',
        'South Denton',
        'North Denton residential',
        'Older bungalow and multi-unit pockets',
      ],
      housingTypes:
        'Student and workforce apartments, older SFH, downtown multi-unit, some mid-rise and redevelopment product',
      challenges: [
        'Campus-calendar peaks and short-notice apartment turnover',
        'Limited curb staging near The Square and older grids',
        'Elevator/COI rules in multi-unit buildings',
        'I-35E interchange timing into and out of town',
      ],
      moverTips:
        'Book campus peaks 2–4 weeks ahead when flexible. Share building packets and truck-height limits. Prefer weekday mornings away from game days and move-in weekends. Denton ↔ Lewisville is a classic underquoted “local.”',
      cityKeywords: [
        'denton',
        'unt',
        'twu',
        'downtown denton',
        'the square',
        'university of north texas',
      ],
    },
    {
      id: 'lewisville-carrollton-edge',
      name: 'Lewisville, Carrollton edge & southern corridor',
      shortName: 'Lewisville / South',
      neighborhoods: [
        'Lewisville',
        'Castle Hills edge',
        'Carrollton (Denton County edge)',
        'Hebron corridor',
        'Lake Lewisville approaches',
      ],
      housingTypes:
        'Suburban SFH, townhomes, multi-family, some HOA tracts and older in-town stock',
      challenges: [
        'DFW arterial congestion at peak (121 / 35E / local belts)',
        'Apartment elevator windows and COI',
        'Cross-county pairs into Dallas / Collin job corridors',
        'High end-of-month lease churn',
      ],
      moverTips:
        'Price portal-to-portal time for Lewisville ↔ Denton and Lewisville ↔ Flower Mound honestly. Collect apartment management rules early. Avoid last-Saturday-of-month when flexible.',
      cityKeywords: [
        'lewisville',
        'carrollton',
        'castle hills',
        'hebron',
        'lake lewisville',
      ],
    },
    {
      id: 'flower-mound-highland',
      name: 'Flower Mound, Highland Village & lake-adjacent',
      shortName: 'Flower Mound',
      neighborhoods: [
        'Flower Mound',
        'Highland Village',
        'Double Oak edge',
        'Lake-adjacent pockets',
        'Larger-lot west/northwest Flower Mound',
      ],
      housingTypes:
        'Larger-lot SFH, HOA communities, lake-edge homes, some multi-family clusters',
      challenges: [
        'Cul-de-sac turnaround and longer driveway carries',
        'HOA COI and approved move hours',
        'Weekend recreation traffic near lake approaches',
        'School-calendar Saturday demand',
      ],
      moverTips:
        'Share driveway and turnaround photos for larger-lot homes. Collect HOA packets before locking a Saturday crew. Early summer starts beat heat on open streets.',
      cityKeywords: [
        'flower mound',
        'highland village',
        'double oak',
        'lake grapevine edge',
      ],
    },
    {
      id: 'little-elm-north-growth',
      name: 'Little Elm, Providence Village & north growth belt',
      shortName: 'Little Elm / North',
      neighborhoods: [
        'Little Elm',
        'Oak Point',
        'Providence Village',
        'Aubrey edge',
        'Cross Roads / Krugerville edges',
        'Newer master-planned villages',
      ],
      housingTypes:
        'Master-planned HOA SFH, newer two-story product, some townhome and multi-family',
      challenges: [
        'HOA gate lists, COI, and move-hour restrictions',
        'Longer arterials to I-35E compared with Lewisville core',
        'New-construction incomplete roads and temporary parking rules',
        'High inbound volume from DFW spillover',
      ],
      moverTips:
        'Collect village HOA packets early. Confirm builder/HOA access the week of the move in new sections. Price Little Elm ↔ Denton or Frisco-edge with honest arterial time.',
      cityKeywords: [
        'little elm',
        'providence village',
        'oak point',
        'aubrey',
        'cross roads',
      ],
    },
    {
      id: 'frisco-prosper-edge',
      name: 'Frisco-edge, Prosper-edge & eastern HOA growth',
      shortName: 'Frisco / Prosper Edge',
      neighborhoods: [
        'Frisco (Denton County portions)',
        'Prosper-edge / northwest growth',
        'Celina-edge approaches',
        'Master-planned villages along 380 / eastern corridors',
      ],
      housingTypes:
        'Master-planned HOA communities, newer SFH tracts, townhomes, some multi-family',
      challenges: [
        'Strict HOA windows and COI processing',
        '380 / 121 / toll-corridor congestion',
        'Peak spring/summer family move volume',
        'Cross-county pairs into Collin employment centers',
      ],
      moverTips:
        'HOA paperwork first — many villages turn crews away without COI. Prefer weekday morning windows. Treat Frisco-edge ↔ Denton as a multi-zone haul, not a pure map-mile local.',
      cityKeywords: [
        'frisco',
        'prosper',
        'celina',
        '380 corridor',
        'frisco denton county',
      ],
    },
    {
      id: 'argyle-roanoke-west',
      name: 'Argyle, Roanoke, Justin & western larger-lot belt',
      shortName: 'West / Larger-Lot',
      neighborhoods: [
        'Argyle',
        'Roanoke',
        'Justin',
        'Northlake edge',
        'Trophy Club edge (as applicable)',
        'Rural-suburban acreage pockets',
      ],
      housingTypes:
        'Larger-lot SFH, acreage and equestrian-edge homes, some HOA villages, limited multi-unit',
      challenges: [
        'Longer carries and soft or gravel approaches',
        'Limited truck turnaround on private roads',
        'Lower service density than Lewisville core',
        'Weather-sensitive outdoor packing on open lots',
      ],
      moverTips:
        'Send driveway/approach photos before booking. Confirm vehicle size for private roads. Western larger-lot ↔ university Denton needs honest deadhead and time assumptions.',
      cityKeywords: [
        'argyle',
        'roanoke',
        'justin',
        'northlake',
        'trophy club',
      ],
    },
  ],
  costDrivers: {
    title: 'Pricing & cost drivers inside Denton County',
    intro:
      'Two “local” moves of the same square footage can differ sharply depending on HOA soft costs, university-building elevators, cross-zone I-35E time, and whether the pair stays in Lewisville–Flower Mound or stretches to Little Elm and Frisco-edge growth.',
    drivers: [
      {
        title: 'Cross-zone DFW corridor time',
        detail:
          'Denton ↔ Frisco-edge, Little Elm ↔ Flower Mound, or any 380 / 121 / I-35E peak leg can burn far more clock than map miles suggest. Hourly billing follows the clock.',
      },
      {
        title: 'HOA soft costs (growth villages)',
        detail:
          'COI processing, approved hours, and gate lists add soft costs and can force weekday-only windows before labor starts.',
      },
      {
        title: 'University multi-unit access',
        detail:
          'Elevators, stair carries, and short-notice campus peaks add labor hours and require building coordination that suburban HOA jobs may not.',
      },
      {
        title: 'Larger-lot / lake-edge access',
        detail:
          'Long driveways, cul-de-sacs, and limited turnaround on Flower Mound and western lots add carry time — access photos prevent underquotes.',
      },
      {
        title: 'Peak school and lease calendars',
        detail:
          'Late May–August and end-of-month weekends raise booking lead times and can push rates — popular HOA and campus windows fill first.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (same zone, simple access)',
        value: '$450–$1,400+',
        note: 'Higher with elevators, campus peaks, or HOA windows',
      },
      {
        label: '2–3BR house / planned community',
        value: '$1,400–$3,800+',
        note: 'HOA soft costs and multi-zone hauls trend up',
      },
      {
        label: '3–4+ BR (cross-zone / larger-lot / growth edge)',
        value: '$2,200–$6,500+',
        note: 'Long locals across I-35E / 380 corridors price highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$110–$185+/hr',
        note: 'Portal-to-portal; packing and 3-person crews scale up',
      },
    ],
  },
  seasonal: {
    title: 'Seasonal, heat, university & school-calendar intelligence',
    intro:
      'North Texas heat, DFW school calendars, and UNT/TWU terms set residential peaks. HOA villages and campus buildings compete for the same Saturday crews.',
    items: [
      {
        title: 'Peak residential: late spring – early fall weekends',
        detail:
          'School calendars and end-of-month leases fill Saturdays across Lewisville, Flower Mound, Little Elm, and Frisco-edge. Book 2–4 weeks ahead for popular HOA windows.',
      },
      {
        title: 'University move-in / move-out spikes',
        detail:
          'August, December, and May near UNT and TWU pack apartments and create short-notice demand. Flexible mid-week dates often price better than peak weekends.',
      },
      {
        title: 'North Texas summer heat',
        detail:
          'Afternoon heat stresses open suburban staging and apartment docks. Prefer early starts, shaded staging, and heat-safe packing for electronics and sealed goods.',
      },
      {
        title: 'Mild winters, storm-day exceptions',
        detail:
          'Ice or severe-storm days can still cancel outdoor packing. Build flexibility around forecast windows rather than assuming year-round perfect weather.',
      },
      {
        title: 'Best value: mid-month Tue–Thu mornings',
        detail:
          'Still plan around HOA weekday windows and campus building rules. Avoid last Friday/Saturday of the month when leases and family moves collide.',
      },
    ],
  },
  specialized: [
    {
      id: 'university-town-logistics',
      title: 'University Denton & multi-unit campus logistics',
      intro:
        'Denton County’s volume problem near the university core is apartment elevators, short calendars, and dense student turnover — not only HOA cul-de-sacs.',
      bullets: [
        'Collect building COI, elevator reservations, and loading rules before the survey is final.',
        'Expect August/December/May spikes; lock dates early or accept mid-week alternatives.',
        'Inventory for stairs, tight turns, and partial DIY loads common in student moves.',
        'Price Denton core ↔ southern suburbs with honest I-35E portal time.',
        'Game days and special events can close staging near The Square — check calendars when flexible.',
      ],
    },
    {
      id: 'north-dfw-hoa-growth',
      title: 'North DFW growth HOAs & suburban expansion module',
      intro:
        'Little Elm, Frisco-edge, Prosper-edge, and many planned villages need paperwork-first logistics that university apartments may not.',
      bullets: [
        'Collect HOA COI, gate lists, and approved hours before booking — many villages will turn crews away without paperwork.',
        'New-construction sections may have incomplete roads or temporary parking rules — confirm access the week of the move.',
        'Prefer early starts in peak summer heat on open suburban streets.',
        'If either address ties to Collin or Dallas County employment, map peak commute timing into the rate card conversation.',
        'Cross-zone pairs (e.g. Flower Mound ↔ Little Elm) are long locals — ask whether “local” rate cards still apply.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Denton County?',
    intro:
      'University-town Denton, lake-adjacent Flower Mound, and north growth HOAs are different bets — pick the pocket first, then validate schools, healthcare, DFW commute tolerance, and housing type.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & education',
        intro:
          'Denton County spans multiple districts (e.g., Denton ISD, Lewisville ISD, Frisco ISD portions, Little Elm ISD, Argyle ISD, Northwest ISD edges, and others). Match every listing address to the correct district.',
        bullets: [
          {
            title: 'Town-first district check',
            detail:
              'Use official district boundary tools and Texas Education Agency resources. Marketing city names and unincorporated pockets can span feeders.',
          },
          {
            title: 'Growth vs established systems',
            detail:
              'Enrollment pressures and facility plans differ between rapid-growth north/east villages and longer-established Denton or Lewisville corridors — do not treat county averages as neighborhood truth.',
          },
          {
            title: 'Research tools',
            detail:
              'District sites and TEA data should lead; third-party rankings are secondary signals only.',
          },
          {
            title: 'Higher education presence',
            detail:
              'University of North Texas and Texas Woman’s University shape rental demand, traffic, and staff housing near campus — useful for student and university-affiliated households.',
          },
        ],
      },
      {
        id: 'hospitals',
        title: 'Hospitals & healthcare',
        bullets: [
          {
            title: 'County acute-care anchors',
            detail:
              'Medical City Denton, Texas Health Presbyterian Denton, and other north-metro campuses cover much of the county; southern corridors also use Lewisville-area and broader DFW systems — map ER drive times at rush hour from your target neighborhood.',
          },
          {
            title: 'DFW specialty spillover',
            detail:
              'Some residents use Dallas or Collin specialty systems. Confirm insurer networks and realistic appointment drive times on I-35E / 121 / 380.',
          },
          {
            title: 'Relocator tip',
            detail:
              'Transfer pediatric and specialty care early if mid-treatment; book first appointments before peak summer move chaos.',
          },
        ],
      },
      {
        id: 'housing',
        title: 'Housing & cost of living',
        bullets: [
          {
            title: 'Price ladder by pocket',
            detail:
              'University multi-unit, Lewisville suburbs, Flower Mound larger lots, and Little Elm / Frisco-edge HOAs often price differently. Compare total monthly costs (HOA, insurance, tolls, commute), not sticker price alone.',
          },
          {
            title: 'Stock variety',
            detail:
              'Master-planned HOAs, student apartments, lake-adjacent SFH, and western acreage edges — dues, access rules, and insurance vary widely.',
          },
          {
            title: 'New construction volume',
            detail:
              'North growth belts add inventory quickly; builder warranties, incomplete amenities, and temporary access rules can affect move-in logistics.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Town fit by lifestyle',
        bullets: [
          {
            title: 'University town character',
            detail:
              'City of Denton for campus energy, Square culture, and mixed older housing — with apartment peaks and event traffic.',
          },
          {
            title: 'Established south-metro suburbs',
            detail:
              'Lewisville and related corridors for DFW access and mixed housing stock — with arterial congestion.',
          },
          {
            title: 'Lake-adjacent / larger-lot',
            detail:
              'Flower Mound and Highland Village for space and recreation access — with HOA rules and longer carries.',
          },
          {
            title: 'North growth HOAs',
            detail:
              'Little Elm, Providence Village, Frisco-edge for newer planned communities — only if you accept paperwork logistics and longer corridor drives.',
          },
        ],
      },
      {
        id: 'jobs',
        title: 'Jobs & commute',
        bullets: [
          {
            title: 'Local anchors',
            detail:
              'Higher education, healthcare, retail and logistics, public sector, and growing north-metro employment — plus strong economic ties into the broader DFW job market.',
          },
          {
            title: 'North DFW corridor patterns',
            detail:
              'Many residents commute within Denton County or toward Dallas, Collin, and Tarrant centers. Peak I-35E / 121 / 380 times should drive housing choice more than brochure distance.',
          },
          {
            title: 'Hybrid / local options',
            detail:
              'Some professional and remote-capable roles reduce daily metro trips — still validate broadband and coworking by pocket if that matters to you.',
          },
        ],
      },
      {
        id: 'lifestyle',
        title: 'Lifestyle & climate',
        bullets: [
          {
            title: 'North Texas climate reality',
            detail:
              'Hot summers, mild winters, and occasional severe-storm days — plan move windows around heat and weather alerts.',
          },
          {
            title: 'Outdoors & recreation',
            detail:
              'Lake Lewisville recreation, trails, and suburban greenbelts are major draws; weekend traffic affects lake-edge staging.',
          },
          {
            title: 'Growth vs town character',
            detail:
              'Rapid suburban expansion coexists with university-town identity — choose the lifestyle pocket before locking a lease or purchase.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Practical Denton County resources',
    intro:
      'Official links and licensing notes — HOA, parking, and city rules change; verify before move day.',
    items: [
      {
        label: 'Denton County',
        href: 'https://www.dentoncounty.gov/',
        note: 'County services hub',
        external: true,
      },
      {
        label: 'City of Denton',
        href: 'https://www.cityofdenton.com/',
        external: true,
      },
      {
        label: 'City of Lewisville',
        href: 'https://www.cityoflewisville.com/',
        external: true,
      },
      {
        label: 'Town of Flower Mound',
        href: 'https://www.flower-mound.com/',
        external: true,
      },
      {
        label: 'Town of Little Elm',
        href: 'https://www.littleelm.org/',
        external: true,
      },
      {
        label: 'City of Frisco',
        href: 'https://www.friscotexas.gov/',
        external: true,
      },
      {
        label: 'TxDOT — road conditions & construction',
        href: 'https://www.txdot.gov/',
        note: 'Check corridor delays for long locals',
        external: true,
      },
      {
        label: 'TxDMV — motor carrier / household goods',
        href: 'https://www.txdmv.gov/',
        note: 'Texas Department of Motor Vehicles (intrastate frameworks)',
        external: true,
      },
      {
        label: 'FMCSA SAFER — interstate authority',
        href: 'https://safer.fmcsa.dot.gov/',
        note: 'Required when the move crosses state lines',
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
    'Filter listings by zone (Denton Core, Lewisville/South, Flower Mound, Little Elm/North, Frisco/Prosper Edge, West/Larger-Lot) when available. Confirm HOA/COI for growth villages, building packets near UNT/TWU, and honest I-35E corridor time — not Dallas County core assumptions.',
  lastReviewed: '2026-07-23',
};

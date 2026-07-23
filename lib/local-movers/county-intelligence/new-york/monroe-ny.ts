import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';

/**
 * Hand-crafted Monroe County, New York moving intelligence.
 * Differentiators: Rochester metro, university/medical anchors, lake-effect and winter
 * weather, eastside/westside suburban contrast — NOT NYC or Long Island patterns.
 */
export const monroeCountyIntelligence: CountyIntelligencePack = {
  stateSlug: 'new-york',
  countySlug: 'monroe',
  hubTitle: 'Monroe County Moving Intelligence Hub',
  eyebrow: 'Monroe · Rochester, university/medical & winter access',
  h1: 'Moving in Monroe County: Rochester Access, University/Medical Peaks & Winter Guide',
  heroOpener:
    'Monroe County is the Rochester metro in Western–Central New York — university and medical calendars, intown multi-story stock, first-ring suburbs from Brighton to Greece, canal and lakeshore edges, and winters that rewrite truck access. A downtown loft, a Park Avenue walk-up, a Pittsford colonial, and a Greece ranch are not the same job under one county name. I-490, I-390, the Inner Loop remnants, and lake-effect bands punish estimates that treat Rochester like a mild downstate suburb. This hub is for people actually moving in Monroe — not NYC co-op copy with Rochester street names pasted on.',
  heroCredibility:
    'NYSDOT household goods for intrastate New York moves · FMCSA for interstate legs · Rochester university/medical & winter awareness · Curated directory listings',
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
    title: 'What makes moving in Monroe County different',
    intro:
      'These are Monroe / Rochester realities — university and hospital turnover, winter access, and eastside/westside suburban contrast — not interchangeable downstate or Buffalo boilerplate.',
    bullets: [
      {
        title: 'University and medical calendars drive demand spikes',
        detail:
          'University of Rochester, RIT, and major hospital systems create concentrated move-in/out windows. August and academic start weeks fill multi-family calendars faster than quiet mid-winter Tuesdays.',
      },
      {
        title: 'Intown Rochester means stairs and tight curb more than towers',
        detail:
          'Park Avenue, South Wedge, Neighborhood of the Arts, and similar corridors often feature multi-story homes, porches, and limited truck length — with some downtown elevator product layered on top.',
      },
      {
        title: 'Winter is a primary access variable',
        detail:
          'Snow, ice, and occasional lake-effect bands from Lake Ontario slow carries, shrink legal curb after plow berms, and force weather holds. Plan differently than Long Island winters.',
      },
      {
        title: 'Eastside vs westside suburban contrast',
        detail:
          'Brighton, Pittsford, Penfield, and Fairport stack different school-district premiums and HOA pockets than Greece, Gates, and Chili. Cross-town pairs need honest I-490 / I-390 time.',
      },
      {
        title: 'Canal towns and lakeshore edges add approach friction',
        detail:
          'Fairport, Spencerport, Hilton, and Webster-edge waterfront streets can limit trailer length and turnarounds. Survey approaches; do not assume driveway SFH everywhere.',
      },
      {
        title: 'Downtown and East End multi-family soft costs',
        detail:
          'Selected towers and mid-rises require COI packets, elevator reservations, and fixed windows. Treat building rules as survey inputs.',
      },
      {
        title: 'This is not NYC overflow or Long Island HOA math',
        detail:
          'Monroe prices on stairs, winter, suburban volume, and university peaks — not LIRR villages, GWB approaches, or Manhattan multi-stops.',
      },
      {
        title: 'Intrastate NY rules vs interstate authority',
        detail:
          'Moves entirely within New York are generally subject to NYSDOT household-goods frameworks. Interstate legs need active FMCSA USDOT (and usually MC) authority.',
      },
    ],
  },
  zonesHeading: 'Monroe access zones',
  zonesIntro:
    'Plan by Rochester intown, downtown/East End, eastside suburbs, westside/Greece band, and canal/lakeshore towns — winter access and university peaks cluster by zone.',
  zones: [
    {
      id: 'rochester-intown',
      name: 'Rochester intown: Park Ave, South Wedge, NOTA & Corn Hill',
      shortName: 'Rochester intown',
      neighborhoods: [
        'Park Avenue',
        'South Wedge',
        'Neighborhood of the Arts',
        'Corn Hill',
        'Upper Monroe',
        'Susan B. Anthony District edges',
      ],
      housingTypes:
        'Older multi-story SFH, doubles and multi-family, porches and stairs, limited mid-rise product',
      challenges: [
        'Stairs, long carries, and narrow residential streets',
        'Snowbank curb loss in winter',
        'Student and young-professional turnover peaks',
        'Limited legal truck length after parking restrictions',
      ],
      moverTips:
        'Photo stairs, porch width, and curb options. Prefer mid-week morning starts. Build winter contingency into December–March jobs. Confirm temporary no-parking signs early.',
      cityKeywords: [
        'rochester',
        'park avenue',
        'south wedge',
        'nota',
        'corn hill',
        'upper monroe',
      ],
    },
    {
      id: 'downtown-east-end',
      name: 'Downtown, East End & medical campus edges',
      shortName: 'Downtown / East End',
      neighborhoods: [
        'Downtown Rochester',
        'East End',
        'Cascade District edges',
        'High Falls edges',
        'Medical campus corridors',
        'Midtown redevelopment edges',
      ],
      housingTypes:
        'Mid-rises and high-rises, lofts, renovated commercial product, limited older multi-story',
      challenges: [
        'Elevator/COI rules and dock constraints',
        'Event and festival traffic peaks',
        'Garage height limits on some buildings',
        'Winter ice on open loading areas',
      ],
      moverTips:
        'Get building packets early. Reserve freight elevators in writing. Share dock and truck-height photos. Avoid major downtown event windows when flexible.',
      cityKeywords: [
        'downtown rochester',
        'east end',
        'cascade',
        'high falls',
        'midtown',
        'medical campus',
      ],
    },
    {
      id: 'eastside-suburbs',
      name: 'Eastside suburbs: Brighton, Pittsford, Penfield & Fairport',
      shortName: 'Eastside suburbs',
      neighborhoods: [
        'Brighton',
        'Pittsford',
        'Penfield',
        'Fairport',
        'East Rochester',
        'Henrietta edges (east)',
      ],
      housingTypes:
        'Suburban SFH, HOA communities, townhomes, multi-family near commercial spines, canal-village homes',
      challenges: [
        'I-490 / I-590 congestion at peak',
        'HOA truck hours and COI packets',
        'Family SFH Saturday demand',
        'Canal-village curb limits in Fairport',
      ],
      moverTips:
        'Collect HOA packets early. Price 490-corridor pairs with peak buffers. Book summer Saturdays ahead. Survey canal-town approaches separately from open tract SFH.',
      cityKeywords: [
        'brighton',
        'pittsford',
        'penfield',
        'fairport',
        'east rochester',
        'henrietta',
      ],
    },
    {
      id: 'westside-greece',
      name: 'Westside suburbs: Greece, Gates, Chili & Spencerport edges',
      shortName: 'Westside / Greece',
      neighborhoods: [
        'Greece',
        'Gates',
        'Chili',
        'Spencerport edges',
        'North Greece',
        'Ogden edges',
      ],
      housingTypes:
        'Suburban SFH tracts, townhomes, multi-family corridors, some HOA pockets, canal-adjacent product',
      challenges: [
        'I-390 / Route 104 / local arterial congestion',
        'Longer portal time to eastside destinations',
        'Winter wind exposure on open lots',
        'Family volume peaks in summer',
      ],
      moverTips:
        'Never price Greece ↔ Pittsford as a free short hop without traffic buffer. Confirm HOA rules in planned pockets. Allow weather holds in lake-effect bands near the lake.',
      cityKeywords: [
        'greece',
        'gates',
        'chili',
        'spencerport',
        'ogden',
        'north greece',
      ],
    },
    {
      id: 'henrietta-brighton-south',
      name: 'South corridor: Henrietta, RIT edges & marketplace band',
      shortName: 'Henrietta / south',
      neighborhoods: [
        'Henrietta',
        'RIT campus edges',
        'Marketplace / Jefferson Road corridor',
        'Rush edges',
        'Mendon edges',
        'Honeoye Falls edges',
      ],
      housingTypes:
        'Student multi-family, suburban SFH, retail-corridor apartments, townhomes',
      challenges: [
        'RIT and student move-in/out spikes',
        'I-390 / Jefferson Road congestion',
        'Mixed elevator and walk-up access',
        'Retail traffic near big-box corridors',
      ],
      moverTips:
        'Lock August RIT windows early. Survey multi-family elevators separately from driveway SFH. Prefer mid-week mornings near retail spines. Confirm truck staging away from peak shopping hours.',
      cityKeywords: [
        'henrietta',
        'rit',
        'rush',
        'mendon',
        'honeoye falls',
        'jefferson road',
      ],
    },
    {
      id: 'lakeshore-webster',
      name: 'Lakeshore & Webster / Irondequoit band',
      shortName: 'Lakeshore / Webster',
      neighborhoods: [
        'Webster',
        'Irondequoit',
        'Sea Breeze edges',
        'Ontario Beach edges',
        'Webster lake corridors',
        'Penfield lakeshore edges',
      ],
      housingTypes:
        'Suburban SFH, lakeshore homes, multi-family, some seasonal-adjacent product',
      challenges: [
        'Lake-effect snow bands and wind exposure',
        'Narrower lakeshore approaches',
        'Seasonal beach and park traffic in summer',
        'Longer empty miles from westside staging',
      ],
      moverTips:
        'Build winter flexibility for lakeshore addresses. Photo approach width. Avoid peak summer beach weekends when flexible. Price cross-town pairs honestly.',
      cityKeywords: [
        'webster',
        'irondequoit',
        'sea breeze',
        'ontario beach',
        'lakeshore',
      ],
    },
  ],
  costDrivers: {
    title: 'What drives Monroe moving costs',
    intro:
      'Ranges are market context for local / short regional moves — not quotes. Stairs, winter delays, university peaks, and east–west portal time separate cheap estimates from real bills.',
    drivers: [
      {
        title: 'Stairs, porches & older multi-story stock',
        detail:
          'Intown Rochester doubles and multi-story homes raise labor minutes per item even without tower soft costs.',
      },
      {
        title: 'Winter weather delays & curb loss',
        detail:
          'Snow, ice, and plow berms add contingency time and sometimes reschedule costs November–March.',
      },
      {
        title: 'Elevator & multi-family soft costs',
        detail:
          'Downtown/East End building packets and reserved elevators add time before loading starts.',
      },
      {
        title: 'Eastside ↔ westside portal time',
        detail:
          'I-490, I-390, and I-590 peaks stretch cross-town pairs beyond map miles.',
      },
      {
        title: 'University and medical turnover peaks',
        detail:
          'August and academic start weeks tighten multi-family crew availability and weekend pricing near U of R and RIT.',
      },
      {
        title: 'Suburban SFH volume & HOA rules',
        detail:
          'Brighton–Pittsford and Greece-band family moves fill summer Saturdays; HOA hour rules can force less efficient windows.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (simple access)',
        value: '$450–$1,300+',
        note: 'Higher with stairs, elevators, or winter access friction',
      },
      {
        label: '2–3BR multi-family or modest SFH',
        value: '$1,400–$3,700+',
        note: 'Stairs and cross-town portal time trend up',
      },
      {
        label: '3–4+ BR / eastside SFH / cross-zone',
        value: '$2,400–$6,200+',
        note: 'Larger SFH volume and long suburban pairs price highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$110–$175+/hr',
        note: 'Portal-to-portal; packing and larger crews scale up',
      },
    ],
  },
  seasonal: {
    title: 'When to schedule a Monroe move',
    intro:
      'University calendars, medical hiring cycles, family summer peaks, and winter snow all reshape access and crew availability.',
    items: [
      {
        title: 'Best truck windows: mid-week mornings',
        detail:
          'Tuesday–Thursday before 9 a.m. usually clear curb space and reduce 490/390 pain. Avoid month-end Fridays when leases collide.',
      },
      {
        title: 'University peaks: August and May',
        detail:
          'U of R and RIT move-in/out weeks spike multi-family demand. Reserve elevators and crews early.',
      },
      {
        title: 'Peak family season: May–August',
        detail:
          'Eastside and westside SFH Saturdays fill for school-year timing. Book 2–4 weeks ahead for popular windows.',
      },
      {
        title: 'Winter snow and ice contingency',
        detail:
          'December–March jobs need weather holds, early starts, and mats/salt time. Lakeshore bands can shut approaches quickly.',
      },
      {
        title: 'Canal and festival event days',
        detail:
          'Downtown and Fairport-area events can erase curb access. Cross-check calendars for village jobs.',
      },
      {
        title: 'Spring thaw and road work',
        detail:
          'Potholes and seasonal construction after winter can change truck routes. Reconfirm approaches the week of the move.',
      },
    ],
  },
  specialized: [
    {
      id: 'university-medical',
      title: 'University & medical turnover module',
      intro:
        'Rochester-area multi-family jobs fail on academic calendars, elevator windows, and lease collisions more often than on box count alone.',
      bullets: [
        'Book August and mid-month academic windows early — elevators and crews fill first near campus corridors.',
        'Request building move packets (COI, elevator hours, dock rules) at lease signing.',
        'Survey walk-up multi-family and tower product as different jobs.',
        'Prefer mid-week starts when housing allows flexibility.',
        'Coordinate with hospital relocation timelines for medical hires when dates are firm.',
      ],
    },
    {
      id: 'winter-east-west',
      title: 'Winter access & east–west cross-town module',
      intro:
        'Monroe’s winter climate and I-490/I-390 length make weather and portal time core pricing inputs — not footnotes.',
      bullets: [
        'Build written weather contingency into November–March estimates.',
        'Confirm plow berm clearance and parking ban status before trucks roll.',
        'Price Greece ↔ Pittsford-type pairs with honest peak drive time.',
        'Collect HOA packets for eastside planned communities early.',
        'Confirm NYSDOT vs FMCSA authority when any leg leaves New York State.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Monroe County?',
    intro:
      'Use this as a practical fit checklist — schools, healthcare, eastside vs westside lifestyle — then verify on district and hospital sites. Rochester is not downstate.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & education landscape',
        intro:
          'Public K–12 spans Rochester City School District and many suburban districts (Brighton, Pittsford, Penfield, Webster, Greece, and others). Assignment is address-based.',
        bullets: [
          {
            title: 'How districts work here',
            detail:
              'Confirm the specific district for each address. City and suburban systems differ sharply; neighborhood marketing names do not guarantee a campus.',
          },
          {
            title: 'Higher education anchors',
            detail:
              'University of Rochester, RIT, and other campuses shape rental demand, traffic, and cultural life. Factor academic calendars near campus corridors.',
          },
          {
            title: 'Research sources',
            detail:
              'District boundary tools, NYSED data, and campus visits beat ranking screenshots alone.',
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
              'University of Rochester Medical Center / Strong, Rochester Regional Health, and affiliated facilities dominate regional care. Confirm networks and specialties for your household.',
          },
          {
            title: 'What relocators should do',
            detail:
              'Map peak-hour and winter drive times from Greece or Penfield to preferred facilities. Transfer records early — medical employment is a common relocation driver here.',
          },
        ],
      },
      {
        id: 'housing',
        title: 'Housing character & cost pressures',
        bullets: [
          {
            title: 'Intown vs suburban stock',
            detail:
              'Expect older multi-story homes intown; denser multi-family near campuses and downtown; larger SFH tracts in Brighton, Pittsford, Greece, and surrounding towns.',
          },
          {
            title: 'Cost variation inside the county',
            detail:
              'Purchase prices and taxes vary by city neighborhood vs eastside suburbs. Budget for winter heating and snow-related home costs.',
          },
          {
            title: 'HOA and multi-family rules',
            detail:
              'Planned communities and downtown buildings may control move hours and truck size. Read documents before closing or lease signing.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Which Monroe areas fit whom',
        bullets: [
          {
            title: 'Rochester intown lifestyle',
            detail:
              'Park Avenue, South Wedge, and similar neighborhoods suit people prioritizing walkable amenities — with stairs and winter curb tradeoffs.',
          },
          {
            title: 'Eastside suburban pattern',
            detail:
              'Brighton, Pittsford, Penfield, and Fairport often appeal for schools and services — with higher housing costs and HOA logistics in some pockets.',
          },
          {
            title: 'Westside and lakeshore patterns',
            detail:
              'Greece, Gates, Chili, Webster, and Irondequoit offer varied lot sizes and lake access — with cross-town commute tradeoffs to eastside job centers.',
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
              'Healthcare, higher education, optics/imaging heritage industries, technology, and advanced manufacturing shape local employment more than NYC corporate spillover.',
          },
          {
            title: 'Commute realism',
            detail:
              'Most households are car-dependent. Winter driving and 490/390 peaks are real. Test drive peak routes before choosing solely on purchase price.',
          },
        ],
      },
      {
        id: 'lifestyle',
        title: 'Lifestyle & practical livability',
        bullets: [
          {
            title: 'Rochester metro identity',
            detail:
              'Monroe is a Finger Lakes–adjacent metro with university culture, festivals, and real winters — not a suburb of New York City.',
          },
          {
            title: 'Climate',
            detail:
              'Cold snowy winters, warm summers, lake-effect risk near Ontario. Plan outdoor staging and snow removal as part of move-in readiness.',
          },
          {
            title: 'Culture and pace',
            detail:
              'Intown arts and food scenes contrast with quieter canal and suburban towns. Visit in both summer and winter when deciding.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Monroe resources',
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify mover registration before deposits.',
    items: [
      {
        label: 'Monroe County — official site',
        href: 'https://www.monroecounty.gov/',
        external: true,
        note: 'County services & offices',
      },
      {
        label: 'City of Rochester',
        href: 'https://www.cityofrochester.gov/',
        external: true,
      },
      {
        label: 'Town of Brighton',
        href: 'https://www.townofbrighton.org/',
        external: true,
      },
      {
        label: 'Town of Greece',
        href: 'https://www.greeceny.gov/',
        external: true,
      },
      {
        label: 'NY 511 — traffic & winter conditions',
        href: 'https://www.511ny.org/',
        external: true,
        note: 'I-490, I-390, and winter advisories before load windows',
      },
      {
        label: 'NYSDOT — motor carriers & household goods',
        href: 'https://www.dot.ny.gov/',
        external: true,
        note: 'Start with NYSDOT for intrastate New York household-goods frameworks',
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
        label: 'All New York local mover guides',
        href: '/local-movers/new-york',
      },
    ],
  },
  directoryHint:
    'Prefer crews with Rochester multi-story stair experience for intown jobs; elevator fluency for downtown/East End; university calendar awareness near U of R and RIT; honest east–west timing and winter access planning. Verify NYSDOT for in-state moves and FMCSA for interstate legs.',
  lastReviewed: '2026-07-23',
};

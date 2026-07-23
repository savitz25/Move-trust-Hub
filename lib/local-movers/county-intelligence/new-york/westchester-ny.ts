import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';

/**
 * Hand-crafted Westchester County, New York moving intelligence.
 * Differentiators: NYC-adjacent suburbs, hills and winding approaches, co-ops/HOAs,
 * stark north vs south county contrast — not Long Island parkway patterns or upstate winter metros.
 */
export const westchesterCountyIntelligence: CountyIntelligencePack = {
  stateSlug: 'new-york',
  countySlug: 'westchester',
  hubTitle: 'Westchester County Moving Intelligence Hub',
  eyebrow: 'Westchester · NYC-adjacent suburbs, hills & north–south contrast',
  h1: 'Moving in Westchester County: Hills, Co-ops/HOAs & North–South Access Guide',
  heroOpener:
    'Westchester is the NYC-adjacent suburban county that is not Long Island and not Manhattan: steep hills and winding estate roads, south-county co-ops and elevators within sight of the Bronx, Metro-North village grids, parkway spines that choke at peak, and a north-county pattern of larger lots and longer empty miles that feels like a different market. A Yonkers high-rise, a Scarsdale colonial, a White Plains condo, and a Yorktown ranch do not share truck access, parking reality, or drive-time risk. Hutchinson River, Saw Mill, Bronx River, Cross County, and I-287 rewrite “local” estimates that ignore building packets and hill approaches. This hub is for people actually moving in Westchester — not generic Hudson Valley tips or recycled LI HOA copy.',
  heroCredibility:
    'NYSDOT household goods for intrastate New York moves · FMCSA for interstate legs · Hill / co-op / north–south access awareness · Curated directory listings',
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
    title: 'What makes moving in Westchester County different',
    intro:
      'These are Westchester realities — hills, NYC adjacency, co-op density in the south, and longer north-county runs — not interchangeable Long Island or upstate boilerplate.',
    bullets: [
      {
        title: 'Hills and winding approaches change truck strategy',
        detail:
          'Many North Castle, Pound Ridge, Bedford, and river-town estates sit on grades that limit trailer length, turnarounds, and winter traction. Shuttle vans and long carries are common on properties that look driveway-accessible on a map.',
      },
      {
        title: 'South-county co-ops and elevators are the default near NYC',
        detail:
          'Yonkers, Mount Vernon, New Rochelle, and parts of White Plains stack multi-family buildings with COI packets, reserved elevators, and fixed move windows — more vertical than typical inland Nassau tracts.',
      },
      {
        title: 'North vs south county is two markets under one name',
        detail:
          'Southern cities absorb Bronx and Manhattan overflow with dense grids. Northern towns trade that density for longer empty miles, larger SFH, and fewer elevator jobs. Pricing one rate for “Westchester” fails both ends.',
      },
      {
        title: 'Parkway and I-287 congestion rewrite portal time',
        detail:
          'Hutchinson River, Saw Mill, Bronx River, Cross County, Sprain Brook, and I-287 peaks can double south–north hop times. A Yonkers ↔ Yorktown pair is not a free local glide at rush hour.',
      },
      {
        title: 'Metro-North villages punish oversized trailers',
        detail:
          'Bronxville, Larchmont, Rye, Hastings, and similar village cores have tight streets, on-street parking pressure, and municipal truck rules. Temporary no-parking signs often beat long carries.',
      },
      {
        title: 'HOA and estate gate lists raise soft costs',
        detail:
          'Planned communities and gated properties across the county require certificates, approved hours, and sometimes on-site escorts. Treat packets as survey inputs.',
      },
      {
        title: 'NYC and CT multi-stop patterns are routine',
        detail:
          'Households regularly move Westchester ↔ Bronx, Manhattan, or Connecticut. Interstate legs flip to FMCSA authority; multi-borough stops need honest drive-time language in the estimate.',
      },
      {
        title: 'Intrastate NY rules vs interstate authority',
        detail:
          'Moves entirely within New York are generally subject to NYSDOT household-goods frameworks. Legs into Connecticut, New Jersey, or other states need active FMCSA USDOT (and usually MC) authority.',
      },
    ],
  },
  zonesHeading: 'Westchester access zones',
  zonesIntro:
    'Plan by southern cities, Sound Shore villages, central White Plains corridor, river towns, and northern towns — elevator rules, hill approaches, and parkway risk cluster by zone.',
  zones: [
    {
      id: 'southern-cities',
      name: 'Southern cities: Yonkers, Mount Vernon & New Rochelle',
      shortName: 'Southern cities',
      neighborhoods: [
        'Yonkers',
        'Mount Vernon',
        'New Rochelle',
        'Pelham edges',
        'Eastchester edges',
        'Bronx-border corridors',
      ],
      housingTypes:
        'High-rises and mid-rises, co-ops, multi-family walk-ups, older SFH grids, some waterfront product',
      challenges: [
        'Near-universal COI and elevator rules on towers',
        'Tight curb staging and municipal parking enforcement',
        'Bronx River / Cross County / I-87 congestion',
        'Frequent multi-stop pairs into the Bronx or Manhattan',
      ],
      moverTips:
        'Get building packets early. Prefer mid-week morning freight windows. Share dock and truck-height photos. Price city-adjacent pairs with honest peak buffers.',
      cityKeywords: [
        'yonkers',
        'mount vernon',
        'new rochelle',
        'pelham',
        'eastchester',
      ],
    },
    {
      id: 'sound-shore',
      name: 'Sound Shore: Larchmont, Mamaroneck, Rye & Port Chester',
      shortName: 'Sound Shore',
      neighborhoods: [
        'Larchmont',
        'Mamaroneck',
        'Rye',
        'Port Chester',
        'Harrison edges',
        'Playland / waterfront edges',
      ],
      housingTypes:
        'Village SFH, multi-story homes, co-ops near stations, waterfront homes, limited multi-family',
      challenges: [
        'Village curb limits and I-95 / New England Thruway spillover',
        'High-value contents and careful-handling norms',
        'Narrow older residential streets',
        'Connecticut-border multi-stop patterns',
      ],
      moverTips:
        'Photo curb and driveway options. Confirm village truck rules. Discuss valuation for waterfront inventories. Clarify NY vs CT destinations on every estimate.',
      cityKeywords: [
        'larchmont',
        'mamaroneck',
        'rye',
        'port chester',
        'harrison',
      ],
    },
    {
      id: 'central-white-plains',
      name: 'Central corridor: White Plains, Scarsdale, Hartsdale & Greenburgh',
      shortName: 'Central / White Plains',
      neighborhoods: [
        'White Plains',
        'Scarsdale',
        'Hartsdale',
        'Greenburgh',
        'Ardsley edges',
        'Edgemont edges',
      ],
      housingTypes:
        'Corporate-adjacent high-rises, co-ops, affluent SFH, townhomes, HOA communities',
      challenges: [
        'Elevator/COI rules mixed with estate driveway constraints',
        'I-287 / Bronx River / cross-county congestion',
        'High-value contents in Scarsdale-band homes',
        'Corporate lease turnover windows',
      ],
      moverTips:
        'Survey towers and estates as different product types. Collect COI and HOA packets early. Build I-287 buffer into start times. Book corporate mid-month windows ahead.',
      cityKeywords: [
        'white plains',
        'scarsdale',
        'hartsdale',
        'greenburgh',
        'ardsley',
        'edgemont',
      ],
    },
    {
      id: 'river-towns',
      name: 'Hudson river towns: Tarrytown, Sleepy Hollow, Irvington & Dobbs Ferry',
      shortName: 'River towns',
      neighborhoods: [
        'Tarrytown',
        'Sleepy Hollow',
        'Irvington',
        'Dobbs Ferry',
        'Hastings-on-Hudson',
        'Croton edges',
      ],
      housingTypes:
        'Village multi-story homes, hillsides, limited multi-family, historic and renovated SFH',
      challenges: [
        'Steep streets and limited truck turnarounds',
        'Saw Mill / Route 9 congestion',
        'Tight village cores and on-street parking pressure',
        'Stairs and long carries on hillside lots',
      ],
      moverTips:
        'Always photo grade, driveway pitch, and street width. Prefer smaller trucks or shuttles on hillside jobs. Avoid peak Saw Mill windows when flexible.',
      cityKeywords: [
        'tarrytown',
        'sleepy hollow',
        'irvington',
        'dobbs ferry',
        'hastings',
        'croton',
      ],
    },
    {
      id: 'northern-westchester',
      name: 'Northern Westchester: Yorktown, Cortlandt, Somers & Bedford',
      shortName: 'North county',
      neighborhoods: [
        'Yorktown Heights',
        'Cortlandt / Peekskill edges',
        'Somers',
        'Bedford',
        'Mount Kisco',
        'Katonah edges',
      ],
      housingTypes:
        'Larger-lot SFH, estates, some multi-family near villages, HOA pockets, rural-edge product',
      challenges: [
        'Long empty miles from southern crew bases',
        'Winding estate roads and gate lists',
        'Taconic / Route 35 / I-684 congestion at peak',
        'Winter ice on hills and long drives',
      ],
      moverTips:
        'Never price north-county pairs as short south-county hops. Survey estate access early. Build winter traction plans. Book family SFH Saturdays early in summer.',
      cityKeywords: [
        'yorktown',
        'cortlandt',
        'peekskill',
        'somers',
        'bedford',
        'mount kisco',
        'katonah',
      ],
    },
    {
      id: 'bronxville-eastchester',
      name: 'Bronxville, Tuckahoe & Eastchester village band',
      shortName: 'Bronxville band',
      neighborhoods: [
        'Bronxville',
        'Tuckahoe',
        'Eastchester',
        'Crestwood edges',
        'Fleetwood edges',
        'Bronx River corridor',
      ],
      housingTypes:
        'Village SFH and multi-story homes, co-ops near stations, denser multi-family edges',
      challenges: [
        'Extremely tight village streets and curb competition',
        'Elevator and co-op packets near stations',
        'Bronx River Parkway peak congestion',
        'High-value contents and careful-handling norms',
      ],
      moverTips:
        'Lock temporary no-parking signs early. Confirm co-op windows in writing. Prefer mid-week mornings. Share street photos for shuttle decisions.',
      cityKeywords: [
        'bronxville',
        'tuckahoe',
        'eastchester',
        'crestwood',
        'fleetwood',
      ],
    },
  ],
  costDrivers: {
    title: 'What drives Westchester moving costs',
    intro:
      'Ranges are market context for local / short regional moves — not quotes. Elevator soft costs, hill shuttles, and parkway portal time separate cheap estimates from real bills.',
    drivers: [
      {
        title: 'Co-op, condo & elevator soft costs',
        detail:
          'Building packets, elevator reservations, and certificate admin add time before loading starts on southern and White Plains multi-family jobs.',
      },
      {
        title: 'Hill approaches, shuttles & long carries',
        detail:
          'Estate grades and village streets often block full trailers. Shuttle strategies and stair carries raise labor hours.',
      },
      {
        title: 'Parkway / I-287 congestion',
        detail:
          'Portal-to-portal billing tracks Hutch, Saw Mill, Bronx River, Cross County, and I-287 peaks. South–north pairs can burn 45–90+ minutes each way at rush.',
      },
      {
        title: 'Affluent SFH inventories & careful handling',
        detail:
          'Scarsdale-band, Sound Shore, and north-county estates raise valuation choices and labor minutes per item.',
      },
      {
        title: 'North-county empty miles',
        detail:
          'Longer runs from southern staging plus larger SFH volume push pricing on Yorktown–Bedford-band jobs.',
      },
      {
        title: 'NYC / CT multi-stop patterns',
        detail:
          'Bronx, Manhattan, and Connecticut legs need honest drive time and correct NYSDOT vs FMCSA authority in the written estimate.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (simple access)',
        value: '$700–$1,900+',
        note: 'Higher with elevators, co-op packets, or parkway peaks',
      },
      {
        label: '2–3BR co-op, condo, or modest SFH',
        value: '$2,000–$5,200+',
        note: 'Village curb friction and hill shuttles trend up',
      },
      {
        label: '3–4+ BR / estate / south–north cross-zone',
        value: '$3,500–$11,000+',
        note: 'Hills, high-value contents, and long north-county runs price highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$145–$230+/hr',
        note: 'Portal-to-portal; packing and larger crews scale up',
      },
    ],
  },
  seasonal: {
    title: 'When to schedule a Westchester move',
    intro:
      'Corporate and co-op turnover, school calendars, parkway peaks, and winter ice on hills all reshape access and crew availability.',
    items: [
      {
        title: 'Best truck windows: mid-week mornings',
        detail:
          'Tuesday–Thursday before 9 a.m. usually clear curb space and reduce Hutch / Saw Mill / I-287 pain. Avoid month-end Fridays when leases collide.',
      },
      {
        title: 'Peak family season: May–August',
        detail:
          'North-county and Scarsdale-band SFH moves fill Saturday calendars. Book 2–4 weeks ahead for popular windows.',
      },
      {
        title: 'Co-op & corporate turnover',
        detail:
          'Yonkers, White Plains, and southern multi-family buildings spike mid-month and around corporate start dates. Reserve elevators as soon as the date is firm.',
      },
      {
        title: 'Parkway peak avoidance',
        detail:
          'Even all-Westchester pairs feel south–north parkway approaches at 7–9 a.m. and 4–7 p.m. Build buffer for cross-zone hops.',
      },
      {
        title: 'Winter ice on hills and village streets',
        detail:
          'Grades in river towns and north county become slow, high-risk carries after ice events. Protect floors; allow extra time for mats, salt, and traction.',
      },
      {
        title: 'Leaf and storm season on estate roads',
        detail:
          'Fallen trees and wet leaves on winding approaches slow estate access in autumn. Survey drive clearance after major storms.',
      },
    ],
  },
  specialized: [
    {
      id: 'hills-coops',
      title: 'Westchester hills, co-ops & elevator module',
      intro:
        'South-county towers and hillside estates fail on packets, grades, and legal staging more often than on packing skill.',
      bullets: [
        'Request co-op/condo/HOA move packets (COI, elevator hours, truck size) at lease signing or contract.',
        'Photo driveway pitch, street width, and turnaround space on every hillside or estate survey.',
        'Budget shuttle vans when full trailers cannot reach the door safely.',
        'Reserve freight elevators in writing and reconfirm the day before.',
        'Match certificate holder names exactly to board or management requirements.',
      ],
    },
    {
      id: 'north-south-parkway',
      title: 'North–south contrast & parkway module',
      intro:
        'Westchester’s length from Yonkers to northern towns makes many “local” pairs regional drive-time jobs along parkway and I-287 spines.',
      bullets: [
        'Price portal-to-portal time honestly for any pair that rides Hutch, Saw Mill, Bronx River, Cross County, or I-287.',
        'Prefer mid-week morning starts for south ↔ north pairs.',
        'Clarify Westchester vs Bronx or Connecticut border addresses.',
        'Collect HOA packets for planned communities early.',
        'Confirm NYSDOT vs FMCSA authority when any leg leaves New York State.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Westchester County?',
    intro:
      'Use this as a practical fit checklist — schools, healthcare, south vs north lifestyle — then verify on district and hospital sites. No single ranking captures village fit.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & education landscape',
        intro:
          'Public K–12 in Westchester spans many independent city and village districts rather than one county-wide system. Assignment is address-based.',
        bullets: [
          {
            title: 'How districts work here',
            detail:
              'Confirm the specific district for each address (e.g. Scarsdale, Bronxville, White Plains, Yonkers, Yorktown). Village prestige names do not always match campus boundaries.',
          },
          {
            title: 'Private school demand',
            detail:
              'Strong private and specialized school demand exists countywide. Factor commute to preferred campuses when choosing a street.',
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
              'Westchester Medical Center, White Plains Hospital, Montefiore New Rochelle, Phelps, Northern Westchester Hospital, and other regional facilities serve different corridors. Confirm networks and specialties for your household.',
          },
          {
            title: 'What relocators should do',
            detail:
              'Map peak-hour drive times from north county or river towns to preferred facilities — parkway congestion changes “nearby” on paper. Transfer records early.',
          },
        ],
      },
      {
        id: 'housing',
        title: 'Housing character & cost pressures',
        bullets: [
          {
            title: 'South vertical vs north lot-size contrast',
            detail:
              'Expect denser multi-family and co-ops in southern cities; affluent village SFH on the Sound Shore and central band; larger lots and estates in the north.',
          },
          {
            title: 'Cost variation inside the county',
            detail:
              'Taxes, purchase prices, and co-op carrying costs vary sharply by municipality. Budget for HOA/co-op dues and insurance on higher-value inventories.',
          },
          {
            title: 'HOA and co-op governance',
            detail:
              'Boards often control move hours, truck size, and deposits. Read proprietary leases and house rules carefully before closing or sublet approval.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Which Westchester areas fit whom',
        bullets: [
          {
            title: 'Southern urban-suburban pattern',
            detail:
              'Yonkers, Mount Vernon, and New Rochelle suit people prioritizing density, transit, and shorter city access — with elevator and curb tradeoffs on move day.',
          },
          {
            title: 'Central / Sound Shore pattern',
            detail:
              'White Plains, Scarsdale, and Sound Shore villages often appeal for schools, amenities, and Metro-North — with higher housing costs and village curb limits.',
          },
          {
            title: 'North-county pattern',
            detail:
              'Yorktown, Somers, Bedford, and similar towns offer larger lots and quieter streets — with longer commutes and different service run times.',
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
              'Healthcare, corporate offices (especially White Plains and southern corridors), education, professional services, and a large NYC-commuter workforce shape local employment.',
          },
          {
            title: 'Commute realism',
            detail:
              'Many households split Metro-North, car, and hybrid patterns. Parkway and I-287 peaks are real. Test drive peak routes and rail reverse-peak options before choosing solely on purchase price.',
          },
        ],
      },
      {
        id: 'lifestyle',
        title: 'Lifestyle & practical livability',
        bullets: [
          {
            title: 'NYC-adjacent, not Long Island',
            detail:
              'Westchester stacks hills, river towns, and Metro-North villages — different from Nassau/Suffolk parkway grids and from Buffalo/Rochester winter metros.',
          },
          {
            title: 'Climate',
            detail:
              'Four full seasons with ice on hills and occasional heavy snow. Plan outdoor staging and winter contingency as part of move-in.',
          },
          {
            title: 'Culture and pace',
            detail:
              'Southern cities feel denser and more urban-adjacent; north county feels more semi-rural. Visit at peak and off-peak times when deciding.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Westchester resources',
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify mover registration before deposits.',
    items: [
      {
        label: 'Westchester County — official site',
        href: 'https://www.westchestergov.com/',
        external: true,
        note: 'County services & offices',
      },
      {
        label: 'City of Yonkers',
        href: 'https://www.yonkersny.gov/',
        external: true,
      },
      {
        label: 'City of White Plains',
        href: 'https://www.cityofwhiteplains.com/',
        external: true,
      },
      {
        label: 'City of New Rochelle',
        href: 'https://www.newrochelleny.com/',
        external: true,
      },
      {
        label: 'NY 511 — traffic conditions',
        href: 'https://www.511ny.org/',
        external: true,
        note: 'Parkways, I-287, and local approaches before load windows',
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
        note: 'Required when the move crosses state lines (e.g. into Connecticut)',
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
    'Prefer crews with co-op/elevator fluency for Yonkers, New Rochelle, and White Plains towers; hill and estate approach experience for river towns and north county; honest parkway / I-287 timing for south–north pairs. Verify NYSDOT for in-state moves and FMCSA for interstate legs.',
  lastReviewed: '2026-07-23',
};

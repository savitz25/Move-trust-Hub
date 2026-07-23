import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';

/**
 * Hand-crafted Nassau County, New York moving intelligence.
 * Differentiators: inner Long Island suburbs, HOA/co-op density, LIRR town grids,
 * NYC overflow and Queens-border pairs — not Suffolk east-end distance, Westchester hills,
 * or upstate winter metros.
 */
export const nassauCountyIntelligence: CountyIntelligencePack = {
  stateSlug: 'new-york',
  countySlug: 'nassau',
  hubTitle: 'Nassau County Moving Intelligence Hub',
  eyebrow: 'Nassau · Inner Long Island suburbs, HOAs & LIRR towns',
  h1: 'Moving in Nassau County: LIRR Towns, HOA/Co-op Rules & NYC-Overflow Access Guide',
  heroOpener:
    'Nassau is the inner Long Island suburban band that absorbs NYC overflow without becoming Manhattan: dense village and town grids on the LIRR, co-ops and condos with elevator/COI packets, HOA communities with truck-size and hour rules, North Shore waterfront estates, and South Shore canal-and-bay streets that punish oversized trailers. A Garden City co-op, a Great Neck estate, a Hempstead multi-family walk-up, and a Massapequa ranch are not the same job under one county name. Northern State, Southern State, Meadowbrook, Wantagh, and LIE approaches rewrite “local” estimates that ignore building packets and peak commute windows. This hub is for people actually moving in Nassau — not generic Long Island tips recycled from Suffolk’s east-end runs.',
  heroCredibility:
    'NYSDOT household goods for intrastate New York moves · FMCSA for interstate legs · HOA / co-op / LIRR-town access awareness · Curated directory listings',
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
    title: 'What makes moving in Nassau County different',
    intro:
      'These are Nassau realities — inner-LI density, HOA/co-op soft costs, LIRR-town street grids, and NYC-adjacent overflow — not interchangeable “Long Island” boilerplate from Suffolk or Westchester.',
    bullets: [
      {
        title: 'Co-ops, condos & HOAs make packets the default',
        detail:
          'Many Nassau multi-family buildings and planned communities require Certificates of Insurance naming the co-op, condo board, or HOA, reserved elevators or loading windows, floor protection, and fixed move hours. Treat the building packet as part of the survey — not day-of paperwork.',
      },
      {
        title: 'LIRR-town grids punish long trailers',
        detail:
          'Mineola, Freeport, Rockville Centre, Valley Stream, and similar village cores often have narrow streets, on-street parking pressure, and limited legal curb for a full tractor-trailer. Shuttle carries and temporary no-parking signs are routine, not edge cases.',
      },
      {
        title: 'NYC overflow and Queens-border pairs are common',
        detail:
          'Households regularly move Nassau ↔ Queens, Brooklyn, or Manhattan. Those pairs can be short map miles and long clock hours on LIE, Cross Island, and Belt approaches — and they flip licensing when any stop leaves New York State.',
      },
      {
        title: 'North Shore estates vs South Shore SFH contrast',
        detail:
          'Great Neck, Manhasset, Roslyn, and Oyster Bay-edge estates stack long drives, gates, stairs, and high-value contents. South Shore tracts (Wantagh, Seaford, Massapequa, Merrick) flip to driveway SFH volume, canal-side access limits, and summer Saturday demand.',
      },
      {
        title: 'Parkway and LIE congestion rewrites portal time',
        detail:
          'Northern State, Southern State, Meadowbrook, Wantagh, and LIE peaks can double empty-mile time on west–east Nassau pairs. A Hempstead ↔ Great Neck hop is not a free local glide at 7–9 a.m. or 4–7 p.m.',
      },
      {
        title: 'Village parking rules vary block by block',
        detail:
          'Incorporated villages often enforce their own truck staging, overnight parking, and temporary-sign rules. What worked in one hamlet may be illegal two miles over in the next village.',
      },
      {
        title: 'Inner LI is denser and shorter-run than Suffolk',
        detail:
          'Nassau’s average truck run is tighter to NYC and denser with multi-family product. Do not price Nassau jobs with Suffolk east-end empty-mile assumptions — or the reverse.',
      },
      {
        title: 'Intrastate NY rules vs interstate authority',
        detail:
          'Moves entirely within New York are generally subject to New York State Department of Transportation (NYSDOT) household-goods frameworks for licensed carriers. Interstate legs need active FMCSA USDOT (and usually MC) authority. Confirm which license applies to origin and destination.',
      },
    ],
  },
  zonesHeading: 'Nassau access zones',
  zonesIntro:
    'Plan by North Shore estates, central county / Hempstead Town cores, South Shore SFH bands, and western Queens-border villages — elevator rules, curb reality, and parkway risk cluster by zone more than by ZIP alone.',
  zones: [
    {
      id: 'north-shore',
      name: 'North Shore: Great Neck, Manhasset, Roslyn & Oyster Bay edges',
      shortName: 'North Shore',
      neighborhoods: [
        'Great Neck',
        'Manhasset',
        'Roslyn',
        'Port Washington',
        'Glen Cove edges',
        'Oyster Bay / Syosset edges',
      ],
      housingTypes:
        'Estates and large SFH, waterfront homes, mid-rise multi-family, co-ops near village centers',
      challenges: [
        'Long drives, gates, and tight estate approaches',
        'High-value contents and careful-handling expectations',
        'Village curb and truck-size limits',
        'Northern State / LIE commute congestion',
      ],
      moverTips:
        'Survey estates and co-ops as different product types. Collect COI and HOA packets early. Discuss valuation for higher-value inventories. Build parkway buffer into start times.',
      cityKeywords: [
        'great neck',
        'manhasset',
        'roslyn',
        'port washington',
        'glen cove',
        'oyster bay',
        'syosset',
      ],
    },
    {
      id: 'central-hempstead',
      name: 'Central Nassau: Hempstead, Garden City, Mineola & Uniondale',
      shortName: 'Central Nassau',
      neighborhoods: [
        'Hempstead',
        'Garden City',
        'Mineola',
        'Uniondale',
        'Westbury',
        'East Meadow',
      ],
      housingTypes:
        'Village SFH, co-ops and condos, multi-family walk-ups, townhomes, commercial-adjacent multi-unit',
      challenges: [
        'Elevator/COI rules mixed with dense street parking',
        'LIRR-adjacent curb pressure and morning rail peaks',
        'Meadowbrook / Northern State congestion',
        'Long carries from legal staging spots',
      ],
      moverTips:
        'Get building packets early for Garden City and Mineola multi-family. Photo curb and alley options. Prefer mid-week morning freight windows. Confirm HOA truck hours in planned pockets.',
      cityKeywords: [
        'hempstead',
        'garden city',
        'mineola',
        'uniondale',
        'westbury',
        'east meadow',
      ],
    },
    {
      id: 'south-shore',
      name: 'South Shore: Freeport, Merrick, Wantagh, Massapequa & Long Beach',
      shortName: 'South Shore',
      neighborhoods: [
        'Freeport',
        'Merrick',
        'Wantagh',
        'Seaford',
        'Massapequa',
        'Long Beach / Island Park edges',
      ],
      housingTypes:
        'Suburban SFH tracts, canal-side homes, multi-family near village cores, beach-adjacent product',
      challenges: [
        'Canal and bay streets with limited truck length',
        'Southern State / Wantagh / Meadowbrook peaks',
        'Summer Saturday family demand',
        'Barrier-island bridge timing near Long Beach',
      ],
      moverTips:
        'Never price canal-side addresses without approach photos. Book June–August Saturdays early. Build bridge buffer for Long Beach pairs. Collect HOA packets in newer tracts.',
      cityKeywords: [
        'freeport',
        'merrick',
        'wantagh',
        'seaford',
        'massapequa',
        'long beach',
        'island park',
      ],
    },
    {
      id: 'west-queens-border',
      name: 'Western Nassau: Valley Stream, Elmont, Floral Park & New Hyde Park',
      shortName: 'West / Queens border',
      neighborhoods: [
        'Valley Stream',
        'Elmont',
        'Floral Park',
        'New Hyde Park',
        'Franklin Square',
        'Lynbrook edges',
      ],
      housingTypes:
        'Dense SFH grids, multi-family, co-ops near transit, retail-corridor multi-unit',
      challenges: [
        'Queens-border traffic and Cross Island / Belt spillover',
        'Tight village streets and scarce legal truck staging',
        'Frequent Nassau ↔ Queens multi-stop patterns',
        'On-street parking competition near LIRR stations',
      ],
      moverTips:
        'Clarify Nassau vs Queens addresses on every stop. Price Cross Island / LIE approaches honestly. Prefer early weekday starts. Share street photos for shuttle decisions.',
      cityKeywords: [
        'valley stream',
        'elmont',
        'floral park',
        'new hyde park',
        'franklin square',
        'lynbrook',
      ],
    },
    {
      id: 'east-nassau-hicksville',
      name: 'East-central: Hicksville, Levittown, Plainview & Bethpage',
      shortName: 'East-central Nassau',
      neighborhoods: [
        'Hicksville',
        'Levittown',
        'Plainview',
        'Bethpage',
        'Jericho edges',
        'Farmingdale edges (verify county)',
      ],
      housingTypes:
        'Post-war and mid-century SFH, townhomes, multi-family near commercial spines, HOA pockets',
      challenges: [
        'LIE / Northern State / Route 110 corridor congestion',
        'HOA rules in planned communities',
        'Longer portal time to western Nassau or Queens origins',
        'County-line confusion near Suffolk border',
      ],
      moverTips:
        'Price LIE-corridor pairs with peak buffers. Collect HOA packets early. Clarify Nassau vs Suffolk destinations. Book family SFH Saturdays ahead in summer.',
      cityKeywords: [
        'hicksville',
        'levittown',
        'plainview',
        'bethpage',
        'jericho',
        'farmingdale',
      ],
    },
    {
      id: 'five-towns-oceanside',
      name: 'Five Towns & Oceanside band',
      shortName: 'Five Towns / Oceanside',
      neighborhoods: [
        'Lawrence',
        'Cedarhurst',
        'Woodmere',
        'Hewlett',
        'Inwood edges',
        'Oceanside',
      ],
      housingTypes:
        'Village SFH and multi-story homes, co-ops, waterfront and near-shore product',
      challenges: [
        'Village curb limits and religious-calendar parking patterns',
        'High-value contents and careful-handling norms',
        'Southern State and Peninsula Boulevard congestion',
        'Tight approaches on older residential streets',
      ],
      moverTips:
        'Confirm village move-day rules and truck access early. Photo stairs and driveway width. Prefer mid-week mornings near school and retail corridors.',
      cityKeywords: [
        'lawrence',
        'cedarhurst',
        'woodmere',
        'hewlett',
        'inwood',
        'oceanside',
        'five towns',
      ],
    },
  ],
  costDrivers: {
    title: 'What drives Nassau moving costs',
    intro:
      'Ranges are market context for local / short regional moves — not quotes. HOA/co-op soft costs, parkway portal time, and dense village curb friction separate cheap estimates from real bills.',
    drivers: [
      {
        title: 'Co-op, condo & HOA packet soft costs',
        detail:
          'Certificate admin, elevator reservations, and fixed move windows add time before loading starts on multi-family and planned-community jobs.',
      },
      {
        title: 'Village parking, permits & long curb carries',
        detail:
          'Legal staging can sit a block or more from the door in LIRR towns. Temporary no-parking signs and shuttle carries raise labor hours.',
      },
      {
        title: 'Parkway / LIE congestion',
        detail:
          'Portal-to-portal billing tracks Northern State, Southern State, Meadowbrook, Wantagh, and LIE peaks. West–east Nassau pairs can burn 40–80+ minutes each way at rush.',
      },
      {
        title: 'North Shore estate access & high-value inventories',
        detail:
          'Long drives, gates, stairs, and careful-handling expectations increase crew time and valuation choices.',
      },
      {
        title: 'South Shore family SFH volume & canal access',
        detail:
          'Peak summer Saturday demand plus approach limits on canal and bay streets push pricing on driveway-heavy jobs.',
      },
      {
        title: 'NYC / Queens multi-stop patterns',
        detail:
          'Nassau ↔ Queens or city borough legs need honest drive-time assumptions and clear licensing language in the written estimate.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (simple access)',
        value: '$650–$1,800+',
        note: 'Higher with elevators, co-op packets, or parkway peak traffic',
      },
      {
        label: '2–3BR condo, co-op, or modest SFH',
        value: '$1,900–$4,800+',
        note: 'Village curb friction and HOA soft costs trend up',
      },
      {
        label: '3–4+ BR / North Shore estate / cross-zone or NYC-edge',
        value: '$3,200–$9,500+',
        note: 'Estates, high-value contents, and Queens-border pairs price highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$140–$220+/hr',
        note: 'Portal-to-portal; packing and larger crews scale up',
      },
    ],
  },
  seasonal: {
    title: 'When to schedule a Nassau move',
    intro:
      'Lease cycles, school calendars, LIRR commute peaks, and summer South Shore demand all reshape access and crew availability.',
    items: [
      {
        title: 'Best truck windows: mid-week mornings',
        detail:
          'Tuesday–Thursday before 9 a.m. usually clear curb space and reduce LIE / parkway pain. Avoid last Friday/Saturday of the month when leases collide.',
      },
      {
        title: 'Peak family season: May–August',
        detail:
          'South Shore and Levittown-band SFH moves fill Saturday calendars. Book 2–4 weeks ahead for popular windows.',
      },
      {
        title: 'Co-op & multi-family turnover',
        detail:
          'Garden City, Mineola, Great Neck, and similar multi-family buildings spike mid-month and around school-year starts. Reserve elevators as soon as the date is firm.',
      },
      {
        title: 'LIRR and parkway peak avoidance',
        detail:
          'Even all-Nassau pairs feel Northern State / Southern State / LIE approaches at 7–9 a.m. and 4–7 p.m. Build buffer or start earlier for west–east hops.',
      },
      {
        title: 'Beach and South Shore summer traffic',
        detail:
          'Long Beach and barrier-adjacent corridors tighten on summer weekends. Prefer mid-week for island or near-shore addresses when flexible.',
      },
      {
        title: 'Winter ice on stoops and village streets',
        detail:
          'Ice slows carries on older multi-story homes and co-op walks. Protect floors; allow extra time for mats and salt.',
      },
    ],
  },
  specialized: [
    {
      id: 'hoa-coop-elevator',
      title: 'Nassau HOA, co-op & elevator module',
      intro:
        'Inner-LI multi-family and planned-community jobs fail on packets, elevators, and truck-hour rules more often than on packing skill.',
      bullets: [
        'Request co-op/condo/HOA move packets (COI, elevator hours, truck size, deposits) at lease signing or contract.',
        'Share dock, curb, and street photos before the survey is final.',
        'Reserve freight elevators in writing and reconfirm the day before.',
        'Budget shuttle carries when full trailers cannot stage at the door in village cores.',
        'Match certificate holder names exactly to board or management requirements.',
      ],
    },
    {
      id: 'lirr-nyc-overflow',
      title: 'LIRR-town density & NYC-overflow module',
      intro:
        'Nassau’s western band and LIRR villages absorb Queens and city pairs that look local on a map and regional on a clock.',
      bullets: [
        'Price portal-to-portal time honestly for any pair that rides LIE, Cross Island, Belt, or parkway spines.',
        'Clarify Nassau vs Queens addresses and multi-stop city legs in the written estimate.',
        'Prefer mid-week morning starts for west-county and Queens-border pairs.',
        'Photo village curb options early — temporary no-parking signs often beat long carries.',
        'Confirm NYSDOT vs FMCSA authority when any leg leaves New York State.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Nassau County?',
    intro:
      'Use this as a practical fit checklist — schools, healthcare, North Shore vs South Shore lifestyle — then verify on district and hospital sites. No single ranking captures village fit.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & education landscape',
        intro:
          'Public K–12 in Nassau is organized across many independent districts and village systems rather than one county-wide district. Assignment is address-based.',
        bullets: [
          {
            title: 'How districts work here',
            detail:
              'Confirm the specific district for each address (e.g. Great Neck, Manhasset, Garden City, Levittown, Massapequa). Marketing town names do not always match campus boundaries.',
          },
          {
            title: 'Private and specialized options',
            detail:
              'Strong private, parochial, and specialized school demand exists countywide. Factor commute to preferred campuses when choosing a street, not only a ZIP.',
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
              'Northwell Health (including North Shore University Hospital and LIJ networks), NYU Langone Long Island, Mount Sinai South Nassau, and other regional facilities serve different corridors. Confirm networks and specialties for your household.',
          },
          {
            title: 'What relocators should do',
            detail:
              'Map peak-hour drive times from South Shore or eastern Nassau to preferred facilities — parkway congestion changes “nearby” on paper. Transfer records early.',
          },
        ],
      },
      {
        id: 'housing',
        title: 'Housing character & cost pressures',
        bullets: [
          {
            title: 'Inner-LI stock mix',
            detail:
              'Expect dense village SFH, co-ops/condos near LIRR, post-war tracts (Levittown band), North Shore estates, and South Shore waterfront product under one county label.',
          },
          {
            title: 'Cost variation inside the county',
            detail:
              'Purchase prices and taxes vary sharply by village and school district. Budget for co-op/HOA dues, flood insurance near shore, and insurance on higher-value inventories.',
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
        title: 'Which Nassau areas fit whom',
        bullets: [
          {
            title: 'North Shore pattern',
            detail:
              'Great Neck, Manhasset, Roslyn, and Port Washington often appeal for waterfront access and village amenities — with estate-access and higher housing-cost tradeoffs.',
          },
          {
            title: 'Central / LIRR-commute pattern',
            detail:
              'Garden City, Mineola, Westbury, and Hicksville corridors suit people prioritizing rail access to the city — with denser curb and multi-family move logistics.',
          },
          {
            title: 'South Shore family pattern',
            detail:
              'Merrick, Wantagh, Seaford, and Massapequa tracts often appeal for larger SFH lots and beach proximity — with summer traffic and canal-street access limits.',
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
              'Healthcare systems, education, retail/logistics along major corridors, professional services, and a large NYC-commuter workforce shape local employment.',
          },
          {
            title: 'Commute realism',
            detail:
              'Many households split LIRR, car, and hybrid patterns. LIE and parkway peaks are real. Test drive peak routes and rail reverse-peak options before choosing solely on purchase price.',
          },
        ],
      },
      {
        id: 'lifestyle',
        title: 'Lifestyle & practical livability',
        bullets: [
          {
            title: 'Inner Long Island, not east-end resort',
            detail:
              'Nassau is denser, closer to NYC, and more multi-family than Suffolk’s eastern reaches — different from Westchester’s hills and co-op corridors, and not an upstate winter metro.',
          },
          {
            title: 'Climate',
            detail:
              'Humid summers, coastal storms, and occasional winter ice. Plan outdoor staging and weather contingency as part of move-in near the shore.',
          },
          {
            title: 'Culture and pace',
            detail:
              'Village downtowns, beach culture on the South Shore, and city-commuter rhythms coexist. Visit at peak and off-peak times when deciding.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Nassau resources',
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify mover registration before deposits.',
    items: [
      {
        label: 'Nassau County — official site',
        href: 'https://www.nassaucountyny.gov/',
        external: true,
        note: 'County services & offices',
      },
      {
        label: 'Town of Hempstead',
        href: 'https://www.toh.li/',
        external: true,
      },
      {
        label: 'Town of North Hempstead',
        href: 'https://www.northhempsteadny.gov/',
        external: true,
      },
      {
        label: 'Town of Oyster Bay',
        href: 'https://www.oysterbaytown.com/',
        external: true,
      },
      {
        label: 'NY 511 — traffic conditions',
        href: 'https://www.511ny.org/',
        external: true,
        note: 'LIE, parkways, and local approaches before load windows',
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
    'Prefer crews with co-op/HOA packet fluency for Garden City, Mineola, and Great Neck multi-family; estate access experience for North Shore; honest LIE/parkway timing for west–east pairs; canal and village curb awareness for South Shore. Verify NYSDOT for in-state moves and FMCSA for interstate legs.',
  lastReviewed: '2026-07-23',
};

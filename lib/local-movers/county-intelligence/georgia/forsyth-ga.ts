import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';

/**
 * Hand-crafted Forsyth County, Georgia moving intelligence.
 * Differentiators: affluent north growth, HOA/master-planned density, Lake Lanier edge —
 * not Fulton intown towers, Gwinnett’s more diverse I-85 mass growth, or Cherokee’s
 * I-575 Woodstock family pattern (related north-metro but distinct price/access mix).
 */
export const forsythCountyIntelligence: CountyIntelligencePack = {
  stateSlug: 'georgia',
  countySlug: 'forsyth',
  hubTitle: 'Forsyth County Moving Intelligence Hub',
  eyebrow: 'Forsyth · Affluent north growth, HOAs & Lake Lanier edge',
  h1: 'Moving in Forsyth County: Master-Planned HOAs, GA-400 Access & Lake Lanier Guide',
  heroOpener:
    'Forsyth County is north-metro Atlanta’s affluent growth corridor: master-planned HOA communities, higher-value family inventories, GA-400 portal time, and Lake Lanier-edge access that is not pure cul-de-sac work. A South Forsyth gated two-story, a Cumming townhome, a mid-county new build, and a lake-adjacent home with a longer approach do not share gate rules, driveway depth, or traffic risk. GA-400, McFarland, Hwy 141, and school-calendar demand rewrite “local” estimates that ignore HOA packets and long empty miles from inside the Perimeter. This hub is for people actually moving in Forsyth — not generic north-Atlanta tips recycled from Alpharetta marketing or Gwinnett volume suburbs.',
  heroCredibility:
    'Georgia DPS / MCCD household goods for intrastate Georgia moves · FMCSA for interstate legs · Master-planned HOA & Lake Lanier-edge awareness · Curated directory listings',
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
    title: 'What makes moving in Forsyth County different',
    intro:
      'These are Forsyth realities — affluent master-planned growth, GA-400 distance, and Lake Lanier-edge access — not interchangeable “north metro” boilerplate.',
    bullets: [
      {
        title: 'Master-planned HOAs are the default environment',
        detail:
          'Many South Forsyth, Cumming, and mid-county villages require Certificates of Insurance, gate lists, truck length limits, and weekday-only windows. Treat association rules as part of the survey.',
      },
      {
        title: 'Higher-value family inventories raise handling expectations',
        detail:
          'Larger homes, finished basements, and careful-handling norms are common. Discuss valuation, specialty items, and packing scope early — not at the truck.',
      },
      {
        title: 'GA-400 defines portal-to-portal time',
        detail:
          'South Forsyth ↔ Perimeter job centers or Cumming ↔ north Fulton pairs can look short and run long at peak. Price 400 and McFarland reality, not crow-flies miles.',
      },
      {
        title: 'Lake Lanier-edge parcels change access math',
        detail:
          'Lake-adjacent and peninsula-style approaches can mean longer drives, limited turnarounds, dock/boat gear, and weekend recreational traffic — different from pure HOA cul-de-sacs.',
      },
      {
        title: 'New-construction friction persists on growth edges',
        detail:
          'Incomplete streets, mud, and limited staging still appear even in higher-priced communities. Confirm road and gate conditions the week of the move.',
      },
      {
        title: 'Townhome and multi-family product sits beside large SFH',
        detail:
          'Not every Forsyth job is a gated estate. Corridor multi-family and stacked townhomes need building packets even when the other stop is a master-plan driveway.',
      },
      {
        title: 'Cross-county north-metro pairs are routine',
        detail:
          'Households regularly move Forsyth ↔ Fulton, Gwinnett, Dawson, or Hall. Clarify county lines so drive time and licensing assumptions stay accurate.',
      },
      {
        title: 'Intrastate Georgia rules vs interstate authority',
        detail:
          'Moves entirely within Georgia are generally subject to Georgia DPS Motor Carrier Compliance Division (MCCD) household-goods frameworks. Interstate legs need active FMCSA USDOT (and usually MC) authority.',
      },
    ],
  },
  zonesHeading: 'Forsyth access zones',
  zonesIntro:
    'Plan by South Forsyth master plans, Cumming core, mid-county growth, Lake Lanier edges, and north Forsyth — HOA density, 400 timing, and lake access cluster by zone.',
  zones: [
    {
      id: 'south-forsyth',
      name: 'South Forsyth: master-planned & GA-400 edge',
      shortName: 'South Forsyth',
      neighborhoods: [
        'South Forsyth',
        'McFarland corridor',
        'Hwy 141 corridor',
        'Johns Creek edge (verify county)',
        'Alpharetta edge (verify county)',
        'South Forsyth multi-family',
      ],
      housingTypes:
        'Master-planned HOA SFH, luxury two-stories, townhomes, some multi-family',
      challenges: [
        'Near-universal HOA COI and gate lists',
        'GA-400 / McFarland / 141 congestion',
        'High-value contents and careful-handling expectations',
        'County-line confusion with Fulton / Gwinnett',
      ],
      moverTips:
        'Collect HOA packets before the survey is final. Discuss valuation early. Price GA-400 peaks honestly. Clarify Forsyth vs Fulton addresses near the south edge.',
      cityKeywords: [
        'south forsyth',
        'mcfarland',
        'highway 141',
        'johns creek',
        'alpharetta',
      ],
    },
    {
      id: 'cumming',
      name: 'Cumming core & central retail corridors',
      shortName: 'Cumming',
      neighborhoods: [
        'Cumming',
        'Downtown Cumming edges',
        'Hwy 9 corridor',
        'Sawnee Mountain edges',
        'Central Forsyth multi-family',
        'Cumming City Center edges',
      ],
      housingTypes:
        'Suburban SFH, HOA villages, townhomes, multi-family near retail nodes',
      challenges: [
        'Arterial and retail congestion',
        'HOA rules in planned communities',
        'Mixed older and newer access profiles',
        'Long portal time to Perimeter origins',
      ],
      moverTips:
        'Prefer mid-week morning starts. Confirm HOA vs non-HOA access. Share driveway and cul-de-sac photos for larger SFH. Avoid peak retail Saturday afternoons when flexible.',
      cityKeywords: [
        'cumming',
        'sawnee',
        'hwy 9',
        'city center',
        'central forsyth',
      ],
    },
    {
      id: 'mid-county-growth',
      name: 'Mid-county growth villages & new construction',
      shortName: 'Mid-County Growth',
      neighborhoods: [
        'Mid-Forsyth growth tracts',
        'Bettis Tribble Gap edges',
        'Settingdown corridor pockets',
        'Newer HOA villages',
        'Builder closing clusters',
      ],
      housingTypes:
        'New SFH, master-planned communities, townhomes, limited multi-family',
      challenges: [
        'Incomplete streets and mud staging',
        'HOA rules arriving around closings',
        'Batch closing demand spikes',
        'Heat on open new-construction streets',
      ],
      moverTips:
        'Confirm road and gate conditions the week of the move. Book early when builder closing dates firm up. Prefer early summer starts. Photo unfinished approaches.',
      cityKeywords: [
        'forsyth growth',
        'new construction',
        'hoa village',
        'builder',
      ],
    },
    {
      id: 'lake-lanier-edge',
      name: 'Lake Lanier edge & recreational corridors',
      shortName: 'Lake Lanier Edge',
      neighborhoods: [
        'Lake Lanier edges',
        'Lanier islands-adjacent corridors',
        'Peninsula and cove approaches',
        'Boat-storage and dock-adjacent homes',
        'Weekend recreation corridors',
      ],
      housingTypes:
        'Lake-adjacent SFH, some HOA lake communities, vacation-flex product, limited multi-family',
      challenges: [
        'Longer approaches and limited truck turnarounds',
        'Weekend recreational traffic',
        'Dock, boat, and outdoor gear volume',
        'Weather-sensitive staging near water',
      ],
      moverTips:
        'Photo full approach roads and turnarounds. Discuss boat/dock gear and outdoor equipment early. Prefer mid-week windows over peak lake weekends when flexible.',
      cityKeywords: [
        'lake lanier',
        'lanier',
        'lake house',
        'dock',
        'peninsula',
      ],
    },
    {
      id: 'north-forsyth',
      name: 'North Forsyth toward Dawson edges',
      shortName: 'North Forsyth',
      neighborhoods: [
        'North Forsyth',
        'Dawsonville edge (verify county)',
        'GA-400 north corridor',
        'Larger-lot SFH pockets',
        'Rural-edge parcels',
      ],
      housingTypes:
        'Larger-lot SFH, some HOA pockets, rural-edge homes, limited multi-family',
      challenges: [
        'Long portal time from south Forsyth or Perimeter',
        'Longer driveway carries and approach constraints',
        'County-line confusion with Dawson / Hall',
        'Sparse staging options on rural roads',
      ],
      moverTips:
        'Build generous travel buffer. Photo approaches and turnarounds. Clarify Forsyth vs Dawson addresses. Treat as distance work from South Forsyth multi-family origins.',
      cityKeywords: [
        'north forsyth',
        'dawsonville',
        'ga 400 north',
        'rural forsyth',
      ],
    },
    {
      id: 'townhome-multifamily',
      name: 'Townhome & multi-family corridors',
      shortName: 'Townhome / MF',
      neighborhoods: [
        'South Forsyth apartments',
        'Cumming multi-family',
        'Stacked townhome communities',
        'Retail-node mid-rises',
        'GA-400 exit multi-family',
      ],
      housingTypes:
        'Townhomes, garden and mid-rise multi-family, amenity-heavy planned product',
      challenges: [
        'Elevator or stair-stack rules',
        'Management COI and fixed move windows',
        'Parking court truck limits',
        'Pairs into large HOA SFH destinations with different access rules',
      ],
      moverTips:
        'Get management packets early. Reserve elevators in writing. Survey origin multi-family rules separately from destination HOA gates.',
      cityKeywords: [
        'forsyth apartments',
        'townhomes',
        'cumming apartments',
        'multifamily',
      ],
    },
  ],
  costDrivers: {
    title: 'What drives Forsyth moving costs',
    intro:
      'Ranges are market context for local / short regional moves — not quotes. HOA soft costs, higher-value inventories, GA-400 portal time, and lake-edge access separate cheap estimates from real bills.',
    drivers: [
      {
        title: 'HOA gate lists, COI & approved hours',
        detail:
          'Master-planned communities across South Forsyth and Cumming add admin time and can force premium weekday slots.',
      },
      {
        title: 'GA-400 / McFarland / Hwy 141 congestion',
        detail:
          'Portal-to-portal billing tracks peaks. South–north pairs can burn 35–70+ minutes each way at rush.',
      },
      {
        title: 'Higher-value family inventories',
        detail:
          'Larger homes, specialty items, and careful-handling expectations increase labor hours and valuation choices.',
      },
      {
        title: 'Lake Lanier-edge approach friction',
        detail:
          'Long drives, tight turnarounds, and outdoor/boat gear add time beyond standard cul-de-sac work.',
      },
      {
        title: 'New-construction and closing clusters',
        detail:
          'Greenfield staging and batch closings strain crew supply and raise peak pricing.',
      },
      {
        title: 'Cross-county north-metro patterns',
        detail:
          'Forsyth ↔ Fulton, Gwinnett, Dawson, or Hall stops need honest distance assumptions in the written estimate.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (simple access)',
        value: '$500–$1,450+',
        note: 'Higher with elevators, HOA windows, or peak GA-400 traffic',
      },
      {
        label: '2–3BR townhome or modest SFH',
        value: '$1,650–$4,400+',
        note: 'HOA soft costs and careful-handling inventories trend up',
      },
      {
        label: '3–4+ BR / gated community / lake-edge / cross-zone',
        value: '$2,800–$8,500+',
        note: 'Large master-plan homes and long 400 pairs price highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$120–$195+/hr',
        note: 'Portal-to-portal; packing and larger crews scale up',
      },
    ],
  },
  seasonal: {
    title: 'When to schedule a Forsyth move',
    intro:
      'School calendars, builder closings, summer heat, and peak Lake Lanier weekends all reshape access and crew availability.',
    items: [
      {
        title: 'Best truck windows: mid-week mornings',
        detail:
          'Tuesday–Thursday before 9 a.m. usually clear curb space and reduce GA-400 pain. Avoid month-end Fridays when leases and closings collide.',
      },
      {
        title: 'Peak family season: May–August',
        detail:
          'South Forsyth and Cumming SFH moves fill Saturday calendars first. Book 2–4 weeks ahead for popular HOA windows.',
      },
      {
        title: 'New-home closing clusters',
        detail:
          'Growth villages may see batches of closings that strain local crew supply. Book early when your builder closing date is firm.',
      },
      {
        title: 'Lake season weekends',
        detail:
          'Late spring through early fall recreational traffic can slow lake-edge corridors. Prefer mid-week for lake-adjacent jobs when flexible.',
      },
      {
        title: 'Summer heat & afternoon storms',
        detail:
          'Prefer early starts for heat on open new-construction streets. Plan tarps and dry staging when storms are forecast.',
      },
    ],
  },
  specialized: [
    {
      id: 'affluent-hoa-master-plan',
      title: 'Affluent master-planned HOA module',
      intro:
        'South Forsyth and many Cumming villages fail on gate lists, COI, and higher-value inventory handling more often than on basic packing skill.',
      bullets: [
        'Collect HOA COI, gate lists, approved hours, and truck size limits before the survey is final.',
        'Discuss valuation and specialty items early for larger family homes.',
        'Photo driveway, gate, and cul-de-sac turnaround space.',
        'Book peak June–August Saturdays early — master-plan corridors fill first.',
        'Prefer early summer starts for heat on open streets.',
      ],
    },
    {
      id: 'ga400-lake-lanier',
      title: 'GA-400 corridor & Lake Lanier-edge module',
      intro:
        'Forsyth distance work is often 400 portal time plus lake-edge approach logistics — not Atlanta intown elevator jobs.',
      bullets: [
        'Price portal-to-portal time honestly for GA-400, McFarland, and Hwy 141 pairs.',
        'Photo full approach roads and turnarounds on lake-adjacent parcels.',
        'Plan for boat, dock, and outdoor gear volume when applicable.',
        'Prefer mid-week windows over peak lake weekends when flexible.',
        'Clarify Fulton, Gwinnett, Dawson, or Hall border addresses.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Forsyth County?',
    intro:
      'Use this as a practical fit checklist — schools, healthcare, master-planned lifestyle — then verify on district and hospital sites. No single ranking captures neighborhood fit.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & education landscape',
        intro:
          'Forsyth County Schools serves the county. Assignment is address-based.',
        bullets: [
          {
            title: 'How districts work here',
            detail:
              'Confirm zoning for any property with district tools — master-plan marketing names do not guarantee a campus.',
          },
          {
            title: 'Growth areas and capacity',
            detail:
              'South and mid-county growth can see enrollment pressure as new tracts open. Ask about capacity, transfers, and busing when touring.',
          },
          {
            title: 'Research sources',
            detail:
              'Forsyth County Schools boundary tools, Georgia Department of Education data, and campus visits beat ranking screenshots alone.',
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
              'Northside Hospital Forsyth and other regional facilities serve Cumming and surrounding areas, with additional access into north Fulton and broader metro systems. Confirm networks and specialties for your household.',
          },
          {
            title: 'What relocators should do',
            detail:
              'Map peak-hour drive times from South Forsyth, lake-edge, or north Forsyth to preferred facilities — GA-400 congestion changes “nearby” on paper. Transfer records early.',
          },
        ],
      },
      {
        id: 'housing',
        title: 'Housing character & cost pressures',
        bullets: [
          {
            title: 'Master-planned dominance',
            detail:
              'Much of Forsyth’s newer stock sits in HOA communities with amenities, architectural rules, and dues. Lake-edge and larger-lot pockets offer different character and access profiles.',
          },
          {
            title: 'Cost variation inside the county',
            detail:
              'Purchase prices and rents vary by corridor and community. Budget for HOA dues, higher-value insurance needs, and longer commute costs to intown job centers.',
          },
          {
            title: 'New construction pace',
            detail:
              'Growth corridors can feel construction-heavy. Visit at commute hours to understand traffic and noise before deciding.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Which Forsyth areas fit whom',
        bullets: [
          {
            title: 'South Forsyth master-planned lifestyle',
            detail:
              'Often appeals for newer homes, amenities, and relatively shorter GA-400 access toward north Fulton job centers — with HOA rules and peak traffic tradeoffs.',
          },
          {
            title: 'Cumming and mid-county patterns',
            detail:
              'Suits households seeking a central Forsyth base with retail access; verify school zoning and commute tolerance.',
          },
          {
            title: 'Lake Lanier-edge living',
            detail:
              'Attracts people prioritizing water access and recreation; confirm year-round access, flood/insurance considerations where relevant, and weekend traffic.',
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
              'Healthcare, retail, education, professional services, and local commerce shape in-county employment. Many residents commute into north Fulton, Alpharetta-edge, or broader metro job centers.',
          },
          {
            title: 'Commute realism',
            detail:
              'Most households are car-dependent. GA-400, McFarland, and Hwy 141 peaks are real. Test drive peak routes before choosing solely on purchase price.',
          },
        ],
      },
      {
        id: 'lifestyle',
        title: 'Lifestyle & practical livability',
        bullets: [
          {
            title: 'Affluent north-growth character',
            detail:
              'Forsyth is defined by master-planned communities, family-oriented amenities, and Lake Lanier recreation — different from Gwinnett’s broader I-85 mass-growth mix or Fulton’s vertical core.',
          },
          {
            title: 'Climate',
            detail:
              'Hot humid summers and frequent storms. Plan outdoor staging and heat-safe move-in logistics.',
          },
          {
            title: 'Pace and amenities',
            detail:
              'Parks, trails, shopping, and lake recreation are strong draws; growth edges can feel construction-oriented. Visit at peak and off-peak times when deciding.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Forsyth resources',
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify mover registration before deposits.',
    items: [
      {
        label: 'Forsyth County — official site',
        href: 'https://www.forsythco.com/',
        external: true,
        note: 'County services & offices',
      },
      {
        label: 'City of Cumming',
        href: 'https://www.cityofcumming.net/',
        external: true,
      },
      {
        label: 'Forsyth County Schools',
        href: 'https://www.forsyth.k12.ga.us/',
        external: true,
        note: 'Boundaries & calendars',
      },
      {
        label: 'Georgia 511 — traffic conditions',
        href: 'https://www.511ga.org/',
        external: true,
        note: 'GA-400 and arterials before load windows',
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
    'Prefer crews with master-planned HOA fluency and careful-handling experience for South Forsyth; honest GA-400 timing for cross-zone pairs; Lake Lanier-edge approach awareness for water-adjacent homes. Verify Georgia DPS/MCCD for in-state moves and FMCSA for interstate legs.',
  lastReviewed: '2026-07-23',
};

import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeIlPack,
  IL_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/illinois/il-shared';

/**
 * Cook County, IL — Chicago + inner/outer suburbs (not DuPage HOA clone, not Will warehouse belt).
 * Neighborhood micro-markets, elevators/COI, street permits, winter, North/South/West Side.
 */
export const cookCountyIlIntelligence: CountyIntelligencePack = finalizeIlPack({
  countySlug: 'cook',
  hubTitle: 'Cook County Moving Intelligence Hub',
  eyebrow: 'Cook · Chicago metro · neighborhoods, elevators & street-permit logistics',
  h1: 'Moving in Cook County: Chicago Micro-Markets, Elevators & Street-Permit Logistics',
  heroOpener:
    'Cook County is not one move market — it is Chicago neighborhood micro-markets stacked against dense near-north high-rises, bungalow-belt walk-ups, South and West Side grids, and collar suburbs from Evanston to Orland Park. A Gold Coast elevator reservation, a Bridgeport two-flat with alley staging, a street-permit load on a North Side one-way, and a winter move off Lake Shore Drive do not share truck access or crew skill. I-90/94, I-55, I-290, I-294, Lake Shore Drive, and the local arterial grid rewrite “local” estimates that ignore COIs, curb permits, and peak expressway portal time. This hub is for people moving in Cook County — not a renamed Naperville HOA page or generic Illinois template.',
  heroCredibility:
    'Illinois Commerce Commission (ICC) Household Goods license for intrastate moves · FMCSA for interstate · Chicago elevator, street-permit & winter logistics awareness · Curated listings',
  majorCorridors: 'I-90/94 · I-55 · I-290 · I-294 · Lake Shore Drive · local arterial grid',
  whatMakesDifferent: {
    title: 'What makes moving in Cook County different',
    intro:
      'These are Cook and Chicago realities — neighborhood micro-markets, elevator/COI stacks, street permits, and winter logistics — not DuPage master-planned HOA rules or Will industrial growth sprawl.',
    bullets: [
      {
        title: 'Neighborhood micro-markets rewrite the job',
        detail:
          'Lincoln Park, Logan Square, Hyde Park, Pilsen, Bronzeville, and Beverly are not interchangeable “Chicago” quotes. Building type, alley width, parking, and stair patterns change labor before packing skill matters.',
      },
      {
        title: 'Elevators, loading docks, and building COIs dominate dense product',
        detail:
          'Near-north, Loop-adjacent, and lakefront towers require elevator reservations, certificate-of-insurance naming, padded protection, and timed dock slots. A bungalow-belt SFH does not share that logistics stack.',
      },
      {
        title: 'Street permits and curb staging are often the critical path',
        detail:
          'Many Chicago blocks need temporary no-parking or street-use permits for legal truck space. Crews that skip permit lead time burn hours on illegal staging or long carries from distant spots.',
      },
      {
        title: 'I-90/94, I-55, I-290, and I-294 turn short map miles into billable hours',
        detail:
          'North Side ↔ South Side, city ↔ western suburb, or O’Hare-adjacent pairs look local and still burn 45–90+ minutes at peak. Price portal-to-portal honestly, not odometer optimism.',
      },
      {
        title: 'North, South, and West Side access patterns are not clones',
        detail:
          'Lakefront one-ways and high-rise denseness, South Side multi-unit and boulevard grids, and West Side industrial-edge arterials each need different survey photos — not a single citywide truck assumption.',
      },
      {
        title: 'Winter, lake-effect cold, and freeze–thaw reshape open carries',
        detail:
          'Snow piles shrink curb, ice slows exterior paths, and wind off the lake makes open-dock work miserable. Prefer early starts, salt plans, and flexible weather windows November–March.',
      },
      {
        title: 'City–suburb and multi-county pairs are routine',
        detail:
          'Households regularly move Chicago ↔ Evanston, Oak Park, Skokie, or out to DuPage, Lake, Will, or Kane. Clarify addresses so ICC intrastate vs FMCSA interstate assumptions stay accurate when any leg leaves Illinois.',
      },
      IL_REG_BULLET,
    ],
  },
  zonesHeading: 'Cook County access zones',
  zonesIntro:
    'Plan by near-north/lakefront vertical, North Side neighborhood grids, South Side and boulevard corridors, West Side and near-west mix, and inner-ring suburbs — access rules cluster by zone more than ZIP alone.',
  zones: [
    {
      id: 'near-north-lakefront',
      name: 'Near North, Gold Coast, Streeterville & lakefront towers',
      shortName: 'Near North / Lakefront',
      neighborhoods: [
        'Gold Coast',
        'Streeterville',
        'River North',
        'Old Town edges',
        'Lakeview lakefront edges',
      ],
      housingTypes: 'High-rise condo, mid-rise multifamily, denser luxury product',
      challenges: [
        'Elevator reservations, dock slots, and building COIs',
        'Limited legal curb and long interior carries',
        'Lake Shore Drive and downtown approach congestion',
      ],
      moverTips:
        'Book elevators and COIs in writing before the crew day. Prefer mid-week early starts. Photo loading docks and street-permit options.',
      cityKeywords: [
        'gold coast',
        'streeterville',
        'river north',
        'old town',
        'near north',
        'chicago',
      ],
    },
    {
      id: 'north-side-neighborhoods',
      name: 'North Side neighborhood grids (Lincoln Park to Rogers Park)',
      shortName: 'North Side',
      neighborhoods: [
        'Lincoln Park',
        'Lakeview',
        'Wicker Park',
        'Logan Square',
        'Edgewater',
        'Rogers Park',
      ],
      housingTypes: 'Three-flats, walk-ups, greystones, courtyard buildings, denser SFH',
      challenges: [
        'Stairs, narrow stairs, and alley-only staging',
        'One-way streets and permit parking zones',
        'I-90/94 and Lake Shore Drive peak freeflow collapse',
      ],
      moverTips:
        'Survey stair counts and alley width. Confirm street-permit needs early. Price North Side cross-neighborhood pairs with expressway buffers.',
      cityKeywords: [
        'lincoln park',
        'lakeview',
        'wicker park',
        'logan square',
        'edgewater',
        'rogers park',
      ],
    },
    {
      id: 'south-side-corridors',
      name: 'South Side corridors (Hyde Park, Bronzeville, Beverly & beyond)',
      shortName: 'South Side',
      neighborhoods: [
        'Hyde Park',
        'Bronzeville',
        'Bridgeport',
        'Beverly',
        'Chatham',
        'South Shore edges',
      ],
      housingTypes: 'Multi-unit flats, bungalows, greystones, larger SFH on boulevards',
      challenges: [
        'I-90/94 / I-55 approach timing into the core',
        'Mixed alley and street staging by block',
        'Longer empty miles from north-side staging yards',
      ],
      moverTips:
        'Photo curb and alley options. Build Dan Ryan / Stevenson buffers for downtown-linked pairs. Inventory basement and porch items carefully.',
      cityKeywords: [
        'hyde park',
        'bronzeville',
        'bridgeport',
        'beverly',
        'chatham',
        'south shore',
      ],
    },
    {
      id: 'west-side-near-west',
      name: 'West Side, Near West & industrial-edge residential',
      shortName: 'West Side',
      neighborhoods: [
        'West Loop edges',
        'Pilsen',
        'Little Village',
        'Humboldt Park',
        'Austin edges',
        'Near West Side',
      ],
      housingTypes: 'Two- and three-flats, walk-ups, mixed SFH, loft conversions',
      challenges: [
        'I-290 Eisenhower peak congestion',
        'Truck access on mixed industrial/residential blocks',
        'Stairs and long carries on dense older stock',
      ],
      moverTips:
        'Price I-290 portal time honestly. Confirm loading zones vs residential only streets. Share stair and hallway photos before final estimate.',
      cityKeywords: [
        'west loop',
        'pilsen',
        'little village',
        'humboldt park',
        'austin',
        'near west',
      ],
    },
    {
      id: 'inner-north-suburbs',
      name: 'Inner north Cook suburbs (Evanston, Skokie, Wilmette edges)',
      shortName: 'Inner north suburbs',
      neighborhoods: [
        'Evanston',
        'Skokie',
        'Wilmette edges',
        'Lincolnwood',
        'Niles edges',
      ],
      housingTypes: 'SFH, courtyard multifamily, mid-rise condo, university-adjacent rentals',
      challenges: [
        'Tree-lined curb with limited truck length',
        'HOA and condo association rules on denser product',
        'US-41 / I-94 links and school-calendar demand',
      ],
      moverTips:
        'Collect building/HOA packets when applicable. Prefer early starts around campus lease peaks. Clarify city vs Chicago address jurisdiction.',
      cityKeywords: ['evanston', 'skokie', 'wilmette', 'lincolnwood', 'niles'],
    },
    {
      id: 'west-south-suburbs',
      name: 'West & south Cook suburbs (Oak Park, Cicero, Orland & beyond)',
      shortName: 'West / South suburbs',
      neighborhoods: [
        'Oak Park',
        'Cicero',
        'Berwyn',
        'Oak Lawn',
        'Orland Park',
        'Tinley Park edges',
      ],
      housingTypes: 'Bungalows, colonials, HOA SFH, townhomes, garden apartments',
      challenges: [
        'I-55 / I-294 / I-57 corridor congestion clusters',
        'Basement carries and older driveway geometry',
        'High Saturday family demand May–August',
      ],
      moverTips:
        'Survey stairs and driveway turn radius. Build expressway buffers for city-linked pairs. Book peak Saturdays early for larger SFH.',
      cityKeywords: [
        'oak park',
        'cicero',
        'berwyn',
        'oak lawn',
        'orland park',
        'tinley park',
      ],
    },
  ],
  costDrivers: {
    title: 'What drives Cook County moving costs',
    intro:
      'Ranges are market context for local / short regional moves — not quotes. Elevator soft costs, street permits, winter friction, and expressway portal time separate cheap estimates from real bills.',
    drivers: [
      {
        title: 'Elevator reservations, docks & building COIs',
        detail:
          'Lakefront and near-north vertical product add labor and schedule risk before packing skill matters.',
      },
      {
        title: 'Street permits & curb staging friction',
        detail:
          'Permit lead time, ticket risk, and long carries from distant legal spots rewrite crew hours.',
      },
      {
        title: 'I-90/94 · I-55 · I-290 · I-294 congestion',
        detail:
          'Cross-city and city–suburb pairs burn portal-to-portal hours even when map miles look short.',
      },
      {
        title: 'Stairs, alleys & bungalow-belt geometry',
        detail:
          'Three-flats and older grids add flight counts and awkward turns that flat-rate optimism underprices.',
      },
      {
        title: 'Winter weather & multi-county empty miles',
        detail:
          'Snow/ice slow exterior work; DuPage, Lake, Will, and Kane destinations raise staging distance and authority complexity.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (simple access)',
        value: '$500–$1,800+',
        note: 'Higher with elevators, permits, or peak expressway pairs',
      },
      {
        label: '2–3BR condo or walk-up flat',
        value: '$1,500–$4,500+',
        note: 'Stairs, COI, and dock soft costs trend up',
      },
      {
        label: '3–4+ BR / high-rise / cross-zone SFH',
        value: '$3,000–$9,500+',
        note: 'Tower moves and long I-90/94 or I-294 pairs price highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$120–$210+/hr',
        note: 'Portal-to-portal; packing, permits, and COI admin scale up',
      },
    ],
  },
  seasonal: {
    title: 'When to schedule a Cook County move',
    intro:
      'Lease cycles, school calendars, winter weather, and elevator/permit windows reshape access and crew availability.',
    items: [
      {
        title: 'Best windows: mid-week early mornings',
        detail:
          'Tuesday–Thursday starts clear curb, ease permit enforcement windows, and reduce I-90/94 and I-290 pain. Avoid month-end Fridays when leases and elevators collide.',
      },
      {
        title: 'Peak season: late May–mid-September (and Oct 1 lease clusters)',
        detail:
          'Chicago apartment turnover and suburban SFH Saturdays fill first. Book 2–4 weeks ahead for peak weekends and elevator slots.',
      },
      {
        title: 'Winter: snow, ice, and lake-effect wind',
        detail:
          'November–March adds curb shrinkage, frozen walks, and weather cancellations. Prefer flexible dates, early starts, and contingency for salt and tarps.',
      },
      {
        title: 'University and medical-campus waves',
        detail:
          'Hyde Park, Near West, and Evanston-adjacent calendars create short-notice spikes. Confirm hard move-in dates and storage-in-transit early.',
      },
    ],
  },
  specialized: [
    {
      id: 'chicago-elevator-permit',
      title: 'Chicago elevator, street-permit & winter logistics module',
      intro:
        'Cook estimates fail more often on elevator packets, curb permits, and winter/expressway portal time than on packing skill alone.',
      bullets: [
        'Collect building COI, elevator reservations, and dock rules before the survey is final.',
        'Confirm whether a temporary no-parking or street-use permit is required; start applications early.',
        'Photo alley width, stair counts, and curb options for multi-unit and bungalow-belt stock.',
        'Price portal-to-portal time for any pair that rides I-90/94, I-55, I-290, I-294, or Lake Shore Drive at peak.',
        'Build winter contingency: salt, mats, flexible weather windows, and shorter outdoor carries.',
        'Clarify Chicago vs suburban Cook addresses and DuPage / Lake / Will / Kane destinations on every estimate.',
        'Verify Illinois Commerce Commission (ICC) Household Goods authority for in-state-only jobs and FMCSA for interstate legs.',
      ],
    },
    {
      id: 'neighborhood-micro-markets',
      title: 'North / South / West Side micro-market module',
      intro:
        'A single “Chicago rate” collapses when neighborhood housing stock and approach corridors diverge.',
      bullets: [
        'Survey by neighborhood product — tower, three-flat, bungalow, or suburban SFH — not by city name alone.',
        'Ask which Side and which expressway approaches the crew will actually use at load and unload.',
        'Match high-value lakefront inventories and basement multi-unit inventories to different crew experience.',
        'Expect different parking and permit norms even a few blocks apart; do not assume one permit covers both addresses.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Cook County?',
    intro:
      'Use this as a practical fit checklist — schools, healthcare, housing character, and commute realism — then verify on district and hospital sites. No single ranking captures neighborhood fit.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & education landscape',
        bullets: [
          {
            title: 'How districts work here',
            detail:
              'Chicago Public Schools (CPS) covers the city; dozens of suburban districts cover Evanston, Oak Park, Orland, and other Cook municipalities. Assignment is address-based — neighborhood marketing names do not guarantee a campus.',
          },
          {
            title: 'Selective enrollment, magnets & suburbs',
            detail:
              'City options include neighborhood, magnet, and selective programs with their own processes. Suburban districts vary widely in size and boundaries. Confirm eligibility windows early.',
          },
          {
            title: 'Research sources',
            detail:
              'CPS and suburban district boundary tools, Illinois State Board of Education data, and campus visits beat ranking screenshots alone.',
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
              'Northwestern, Rush, University of Chicago Medicine, Advocate, and other systems anchor campuses across the city and inner suburbs. Specialty care is metro-wide — confirm networks for your household.',
          },
          {
            title: 'What relocators should do',
            detail:
              'Map peak-hour drive or transit times from your target neighborhood to preferred campuses — expressway and parking realities change “nearby” on paper. Transfer records early.',
          },
        ],
      },
      {
        id: 'housing',
        title: 'Housing character & cost pressures',
        bullets: [
          {
            title: 'Towers, flats, bungalows & suburban SFH',
            detail:
              'Expect vertical condo product near the lakefront and downtown; multi-unit flats across many city neighborhoods; bungalow-belt SFH; and larger suburban homes toward Orland, Tinley, and similar corridors.',
          },
          {
            title: 'Cost variation inside the county',
            detail:
              'Purchase prices and rents vary sharply by neighborhood and suburb. Budget for condo assessments, older-building repair risk, parking, and insurance on higher-value inventories.',
          },
          {
            title: 'Building and HOA governance',
            detail:
              'Condo associations and suburban HOAs often control move hours, truck size, elevators, and deposits. Read documents carefully before closing or lease signing.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Which Cook areas fit whom',
        bullets: [
          {
            title: 'Near-north / lakefront urban lifestyle',
            detail:
              'Suits people prioritizing walkability and amenities — with elevator, parking, permit, and COI tradeoffs on move day.',
          },
          {
            title: 'North Side neighborhood living',
            detail:
              'Often appeals for transit access and mixed housing stock — with stairs, alleys, and one-way staging constraints.',
          },
          {
            title: 'South and West Side community corridors',
            detail:
              'Attracts households seeking specific cultural anchors, space, or value — with expressway timing and multi-unit logistics.',
          },
          {
            title: 'Inner-ring and outer Cook suburbs',
            detail:
              'Fits buyers chasing yards, schools, or quieter streets — with I-294/I-55 commute realism and different permit norms than the city core.',
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
              'Downtown professional services and finance, healthcare systems, universities, O’Hare and logistics edges, manufacturing, and suburban office corridors concentrate demand.',
          },
          {
            title: 'Commute realism',
            detail:
              'Many households mix driving and transit. I-90/94, I-55, I-290, I-294, and Lake Shore Drive peaks are real. Test drive or ride peak routes before choosing solely on rent or purchase price.',
          },
        ],
      },
      {
        id: 'lifestyle',
        title: 'Lifestyle & practical livability',
        bullets: [
          {
            title: 'One county, many Chicagos',
            detail:
              'Cook stacks high-rise lakefront living, dense neighborhood grids, industrial-edge flats, and full suburban rings — different from DuPage’s corporate HOA belt or Will’s south-collar warehouse growth.',
          },
          {
            title: 'Climate',
            detail:
              'Hot humid summers, cold snowy winters, lake-effect wind, and freeze–thaw cycles. Plan outdoor staging and weather contingency as part of move-in.',
          },
          {
            title: 'Culture and pace',
            detail:
              'Dining, arts, sports, and events concentrate heavily in the city; suburbs skew more residential and school-calendar driven. Visit at peak and off-peak times when deciding.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Cook County resources',
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify Illinois Commerce Commission (ICC) household goods authority for in-state moves and FMCSA for interstate legs.',
    items: [
      {
        label: 'Cook County — official site',
        href: 'https://www.cookcountyil.gov/',
        external: true,
        note: 'County services & offices',
      },
      {
        label: 'City of Chicago',
        href: 'https://www.chicago.gov/',
        external: true,
        note: 'Permits, services & city info',
      },
      {
        label: 'Chicago Public Schools',
        href: 'https://www.cps.edu/',
        external: true,
        note: 'Boundaries & calendars (city addresses)',
      },
      {
        label: 'IDOT / Illinois traffic & road conditions',
        href: 'https://www.gettingaroundillinois.com/',
        external: true,
        note: 'Expressway conditions before load windows',
      },
    ],
  },
  directoryHint:
    'Prefer crews with elevator/COI and street-permit experience for dense Chicago product; stair/alley fluency for multi-unit flats; honest I-90/94 · I-55 · I-290 · I-294 timing for cross-zone pairs; winter readiness November–March. Verify Illinois Commerce Commission (ICC) Household Goods authority for in-state moves and FMCSA for interstate legs.',
  lastReviewed: '2026-07-24',
});

import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';

/**
 * Hand-crafted Pima County, Arizona moving intelligence.
 * Differentiators: Tucson ≠ Phoenix, University of Arizona calendar, desert foothills,
 * lower density than Maricopa — not Valley Loop sprawl or Pinal Sun Corridor master plans.
 */
export const pimaCountyIntelligence: CountyIntelligencePack = {
  stateSlug: 'arizona',
  countySlug: 'pima',
  hubTitle: 'Pima County Moving Intelligence Hub',
  eyebrow: 'Pima · Tucson basin, foothills & university corridor',
  h1: 'Moving in Pima County: Tucson Core, Foothills & University Corridor Guide',
  heroOpener:
    'Pima County is not a smaller Phoenix. Tucson sits in a mountain-framed desert basin with a real downtown and midtown fabric, University of Arizona lease churn, Catalina and Tucson Mountain foothill grades, and lower overall density than Maricopa’s Loop-highway grid. A Fourth Avenue walk-up, a Sam Hughes bungalow, an Oro Valley HOA two-story, and a Green Valley seasonal home do not share truck access, driveway grade, or seasonal demand. Heat still dominates summer logistics, but the geography is foothill-and-basin — not East Valley vs West Valley freeway sprawl. This hub is for people actually moving in Pima — not Valley tips recycled from Maricopa or corridor growth notes from Pinal.',
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
    title: 'What makes moving in Pima County different',
    intro:
      'These are Pima realities — Tucson basin density, foothill access, and university calendars — not Maricopa Loop sprawl or Pinal master-planned corridor towns under another name.',
    bullets: [
      {
        title: 'Tucson is a distinct metro, not Phoenix overflow',
        detail:
          'Street grids, building stock, HOA density, and commute patterns differ from the Valley. Estimates built on Maricopa “local hop” assumptions misprice foothill grades, I-10 approaches, and lower-density empty miles inside Pima.',
      },
      {
        title: 'University of Arizona calendars spike midtown volume',
        detail:
          'Student and staff turnover around UA creates concentrated move windows near campus, midtown multi-family, and older rental stock that pure family suburbs do not see at the same scale.',
      },
      {
        title: 'Desert foothills change truck access and labor hours',
        detail:
          'Catalina Foothills, parts of Oro Valley, Tucson Mountain edges, and custom desert lots often mean grades, tight turns, long carries from street to structure, and limited truck length — different from flat Valley cul-de-sac product.',
      },
      {
        title: 'Lower density, longer quiet-mile pairs inside one county',
        detail:
          'Green Valley, Sahuarita, Marana, and Vail can sit far from midtown staging even when both addresses say “Pima.” Portal time is real without Maricopa-scale freeway congestion every mile.',
      },
      {
        title: 'Extreme heat still governs summer open carries',
        detail:
          'Tucson summers routinely top 100°F+. Heat stress on open suburban streets and foothill driveways is a labor-hours factor. Early starts outperform noon load-outs from May through September.',
      },
      {
        title: 'Snowbird and seasonal southern communities matter',
        detail:
          'Green Valley and other seasonal/retirement patterns increase winter volume and inventory profiles that differ from year-round family SFH in northwest growth pockets.',
      },
      {
        title: 'I-10 corridor links to Maricopa and Pinal, not local shortcuts',
        detail:
          'Households do move Tucson ↔ Phoenix metro or Pinal corridor towns. Price those as long regional jobs with honest rest and fuel assumptions — not as extended “local” Valley work.',
      },
      {
        title: 'Arizona entity diligence vs interstate FMCSA authority',
        detail:
          'Arizona does not run a California BHGS– or Florida FDACS–style statewide household-goods mover certificate program. For in-state work, verify Arizona Corporation Commission (ACC) business-entity status, insurance, and written contracts. Interstate legs need active FMCSA USDOT (and usually MC) authority.',
      },
    ],
  },
  zonesHeading: 'Pima / Tucson access zones',
  zonesIntro:
    'Plan by central Tucson and midtown, University corridor, Catalina Foothills / northeast, northwest growth (Marana / Oro Valley), and south county (Sahuarita / Green Valley) — each has its own access and seasonal profile.',
  zones: [
    {
      id: 'tucson-core-midtown',
      name: 'Central Tucson, downtown & midtown fabric',
      shortName: 'Tucson Core',
      neighborhoods: [
        'Downtown Tucson',
        'Fourth Avenue / Warehouse District edges',
        'Armory Park',
        'Barrio Viejo edges',
        'Midtown / Broadway corridor',
        'Sam Hughes / University edges',
      ],
      housingTypes:
        'Older SFH and bungalows, walk-ups, mid-rise multi-family, historic-adjacent product, some urban infill',
      challenges: [
        'Narrow streets and limited truck staging',
        'Older stairs and long carries from curb',
        'Event and downtown activity windows',
        'Mixed rental turnover near midtown corridors',
      ],
      moverTips:
        'Photo street width, alley access, and stair counts. Prefer mid-week morning windows. Discuss careful handling for older homes and denser midtown blocks.',
      cityKeywords: [
        'tucson',
        'downtown tucson',
        'midtown',
        'fourth avenue',
        'sam hughes',
        'armory park',
        'barrio',
      ],
    },
    {
      id: 'university-corridor',
      name: 'University of Arizona corridor & student multi-family',
      shortName: 'UA Corridor',
      neighborhoods: [
        'University of Arizona campus edge',
        'Main Gate / University area',
        'Helen / Speedway multi-family',
        'Campus-adjacent rentals',
        'Midtown student corridors',
      ],
      housingTypes:
        'Student apartments, multi-family, older rentals, some condo product near campus',
      challenges: [
        'Concentrated lease start/end weekends',
        'Elevator and building rules in newer complexes',
        'Limited curb space on move-in peaks',
        'High volume of small inventories in short windows',
      ],
      moverTips:
        'Avoid peak UA move-in/out weekends when flexible. Confirm building packets for elevator buildings. Price volume of small jobs honestly when demand spikes mid-August and mid-May.',
      cityKeywords: [
        'university of arizona',
        'ua',
        'campus',
        'main gate',
        'speedway',
        'student',
      ],
    },
    {
      id: 'foothills-ne',
      name: 'Catalina Foothills, northeast Tucson & desert custom lots',
      shortName: 'Foothills / NE',
      neighborhoods: [
        'Catalina Foothills',
        'Skyline / Campbell edges',
        'Ventana / Sabino approach',
        'Northeast desert custom homes',
        'Tanque Verde edges',
      ],
      housingTypes:
        'Custom desert SFH, hillside homes, some HOA enclaves, higher-value inventories',
      challenges: [
        'Steep grades and limited truck turn radius',
        'Long carries from street parking to structure',
        'Mature desert landscaping and driveway constraints',
        'Heat exposure on exposed slopes in summer',
      ],
      moverTips:
        'Require driveway and approach photos before finalizing labor hours. Discuss shuttle or smaller truck options when full trailers cannot stage. Prefer earliest heat-season starts on exposed lots.',
      cityKeywords: [
        'catalina foothills',
        'tanque verde',
        'sabino',
        'ventana',
        'foothills',
        'skyline',
      ],
    },
    {
      id: 'northwest-growth',
      name: 'Northwest: Oro Valley, Marana & I-10 north approach',
      shortName: 'NW Growth',
      neighborhoods: [
        'Oro Valley',
        'Marana',
        'Dove Mountain edges',
        'Tortolita edges',
        'I-10 northwest multi-family',
        'Casas Adobes edges',
      ],
      housingTypes:
        'Suburban SFH, master-planned and HOA communities, townhomes, newer multi-family',
      challenges: [
        'HOA COI and gate lists in planned villages',
        'Longer portal time to central Tucson midtown',
        'Construction traffic in expanding tracts',
        'Mix of foothill-edge grades and flat HOA product',
      ],
      moverTips:
        'Collect HOA packets early for Oro Valley / Dove Mountain-style communities. Price northwest ↔ midtown pairs with real drive time. Early summer starts help on open new streets.',
      cityKeywords: [
        'oro valley',
        'marana',
        'dove mountain',
        'casas adobes',
        'tortolita',
        'northwest tucson',
      ],
    },
    {
      id: 'south-county',
      name: 'South county: Sahuarita, Green Valley & I-19 corridor',
      shortName: 'South / I-19',
      neighborhoods: [
        'Sahuarita',
        'Green Valley',
        'I-19 corridor communities',
        'Continental edges',
        'South Tucson approaches (note city vs county context)',
      ],
      housingTypes:
        'Suburban SFH, HOA villages, active-adult and seasonal communities, multi-family along I-19',
      challenges: [
        'Longer empty miles from midtown Tucson staging',
        'Seasonal resident timing in Green Valley patterns',
        'HOA and community rules',
        'Heat on open suburban streets in summer',
      ],
      moverTips:
        'Treat Green Valley / Sahuarita as distance-plus-HOA work, not a short Tucson hop. Confirm association rules for seasonal communities. Book winter seasonal windows early when demand rises.',
      cityKeywords: [
        'sahuarita',
        'green valley',
        'i-19',
        'continental',
        'south tucson',
      ],
    },
    {
      id: 'southeast-rita-vail',
      name: 'Southeast: Rita Ranch, Vail & aerospace corridor edges',
      shortName: 'SE / Vail',
      neighborhoods: [
        'Rita Ranch',
        'Vail',
        'Harrison / Houghton corridor edges',
        'Aerospace / employment corridor approaches',
        'Southeast multi-family pockets',
      ],
      housingTypes:
        'Newer suburban SFH, HOA tracts, townhomes, multi-family near employment corridors',
      challenges: [
        'Commute-hour congestion on southeast arterials',
        'HOA rules in newer villages',
        'Distance from foothills or northwest origins',
        'Military/aerospace shift patterns affecting traffic near some corridors',
      ],
      moverTips:
        'Price southeast ↔ foothills or northwest pairs as multi-zone jobs. Collect HOA packets. Prefer off-peak freeway and arterial windows for longer hauls.',
      cityKeywords: [
        'rita ranch',
        'vail',
        'houghton',
        'harrison',
        'southeast tucson',
      ],
    },
  ],
  costDrivers: {
    title: 'What drives Pima moving costs',
    intro:
      'Ranges are market context for local / short regional moves — not quotes. Foothill access, university peaks, and heat pacing separate cheap estimates from real bills.',
    drivers: [
      {
        title: 'Foothill grade, long carries & limited staging',
        detail:
          'Catalina Foothills and custom desert lots often need extra labor hours, smaller equipment, or shuttles when full trucks cannot park at the door.',
      },
      {
        title: 'University and midtown building soft costs',
        detail:
          'Elevator reservations, building rules, and tight curb windows near UA and midtown multi-family add time before loading starts.',
      },
      {
        title: 'Intra-county distance (NW / south / SE pairs)',
        detail:
          'Marana ↔ Green Valley or Oro Valley ↔ Vail can burn substantial portal time even without Maricopa-scale Loop congestion.',
      },
      {
        title: 'HOA rules in northwest and south growth communities',
        detail:
          'Gate lists, COI, and approved hours in planned villages push demand into constrained peak windows.',
      },
      {
        title: 'Extreme heat pacing',
        detail:
          'Heat-safe rest cycles from May through September extend clock hours on open streets and exposed foothill driveways.',
      },
      {
        title: 'Seasonal / snowbird inventory in southern communities',
        detail:
          'Winter demand in Green Valley–style patterns can tighten calendars and change inventory profiles versus pure student season.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (simple access)',
        value: '$400–$1,200+',
        note: 'Higher near UA peaks, elevators, or tight midtown streets',
      },
      {
        label: '2–3BR condo or modest SFH',
        value: '$1,200–$3,400+',
        note: 'Foothill carries and HOA soft costs trend up',
      },
      {
        label: '3–4+ BR / foothill / cross-basin',
        value: '$2,200–$6,500+',
        note: 'Hillside access and long NW–south pairs price highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$100–$170+/hr',
        note: 'Portal-to-portal; packing and larger crews scale up',
      },
    ],
  },
  seasonal: {
    title: 'When to schedule a Pima move',
    intro:
      'University calendars, extreme heat, monsoon storms, and snowbird season in southern communities all reshape crew availability and safe staging windows.',
    items: [
      {
        title: 'Best truck windows: mid-week early mornings',
        detail:
          'Tuesday–Thursday starts before 8 a.m. usually improve curb access and beat peak heat. Avoid month-end Fridays when leases collide.',
      },
      {
        title: 'Extreme heat season: May–September',
        detail:
          'Afternoon temperatures make open carries slower and more fatiguing, especially on foothill lots. Prefer dawn starts and honest hour estimates that include heat pacing.',
      },
      {
        title: 'Monsoon pattern: roughly July–September',
        detail:
          'Dust, wind, and sudden storms can halt outdoor staging. Confirm weather contingency and reschedule language before deposits.',
      },
      {
        title: 'University peak: mid-May and mid-August windows',
        detail:
          'UA-adjacent multi-family and midtown rentals spike around academic calendars. Avoid peak student weekends when flexible, or book well ahead.',
      },
      {
        title: 'Snowbird & seasonal south-county demand: October–April',
        detail:
          'Green Valley and other seasonal patterns increase winter volume. Book popular windows early even when daytime temperatures are mild.',
      },
    ],
  },
  specialized: [
    {
      id: 'tucson-foothills-access',
      title: 'Tucson foothills & desert-lot access module',
      intro:
        'Catalina Foothills and custom desert homes fail on grade, turn radius, and carry distance more often than on packing skill.',
      bullets: [
        'Require approach, driveway grade, and street-width photos before finalizing labor hours.',
        'Discuss shuttle trucks or smaller equipment when full trailers cannot stage at the home.',
        'Plan extra carry time for homes set far back on desert lots.',
        'Prefer earliest heat-season starts on exposed slopes and unshaded drives.',
        'Discuss valuation for higher-value foothill inventories early.',
        'Build monsoon contingency for wind and rain holds in late summer.',
      ],
    },
    {
      id: 'ua-university-midtown',
      title: 'University of Arizona & midtown multi-family module',
      intro:
        'Campus-edge volume is calendar-driven: building rules and curb scarcity matter as much as inventory size.',
      bullets: [
        'Request building move packets (COI, elevator hours, loading rules) early for multi-family product.',
        'Avoid peak UA move-in/out weekends when the schedule allows.',
        'Confirm freight elevator reservations in writing and reconfirm the day before.',
        'Price clusters of small student inventories honestly during peak weeks.',
        'Share curb and alley photos for older midtown walk-ups.',
        'For in-state jobs, verify ACC entity status; for interstate legs, verify FMCSA authority.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Pima County?',
    intro:
      'Use this as a practical fit checklist — schools, healthcare, Tucson vs Valley lifestyle, and foothill vs basin living — then verify on district and hospital sites. No single ranking captures neighborhood fit.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & education landscape',
        intro:
          'Pima is served primarily by Tucson Unified and other districts/charters serving Oro Valley, Marana, Vail, Sahuarita, and surrounding communities. Assignment is address-based.',
        bullets: [
          {
            title: 'How districts work here',
            detail:
              'Public K–12 spans multiple districts rather than one simple city system. Confirm zoning for any property — marketing area names do not guarantee school assignment.',
          },
          {
            title: 'University presence',
            detail:
              'The University of Arizona shapes midtown rental demand and cultural life; it is not a K–12 substitute. Families should still verify local district campuses separately.',
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
              'Banner – University Medical Center Tucson and other Banner campuses, Tucson Medical Center, and additional regional facilities serve the metro. Specialty access is strong for a mid-size market; confirm networks for your household.',
          },
          {
            title: 'What relocators should do',
            detail:
              'Map drive times from Oro Valley, Marana, Vail, or Green Valley to preferred campuses at peak hours. Transfer records early when changing systems.',
          },
        ],
      },
      {
        id: 'housing',
        title: 'Housing character & cost pressures',
        bullets: [
          {
            title: 'Basin vs foothill stock',
            detail:
              'Expect older SFH, bungalows, and multi-family in central/midtown Tucson; custom desert and hillside product in the foothills; newer HOA tracts in Oro Valley, Marana, Sahuarita, and Rita Ranch / Vail patterns.',
          },
          {
            title: 'HOA prevalence',
            detail:
              'Common in northwest and south growth communities. Read association documents for move-day rules and dues before closing.',
          },
          {
            title: 'Heat and utility budgeting',
            detail:
              'Summer cooling costs are a real household expense across the basin. Factor them into total cost of living alongside rent or mortgage.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Which Pima areas fit whom',
        bullets: [
          {
            title: 'Central / midtown lifestyle',
            detail:
              'Downtown and midtown suit people who want urban fabric, shorter local access, and older-neighborhood character — with tighter truck and parking logistics on move day.',
          },
          {
            title: 'Foothills and northeast desert',
            detail:
              'Catalina Foothills and nearby custom areas often fit households prioritizing views, privacy, and desert-lot living; verify access grades and carry distance for furnishings.',
          },
          {
            title: 'Northwest growth (Oro Valley / Marana)',
            detail:
              'Often appeals for newer homes and planned amenities; confirm commute times to central employment and HOA rules.',
          },
          {
            title: 'South county seasonal and family patterns',
            detail:
              'Sahuarita and Green Valley attract different mixes of families and seasonal residents; winter demand and association rules matter for move timing.',
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
              'The University of Arizona, healthcare, optics and tech niches, aerospace/defense corridor activity, government, tourism/hospitality, and regional services shape local employment — a different mix than Phoenix’s larger corporate Valley.',
          },
          {
            title: 'Commute realism',
            detail:
              'Most households are car-dependent. I-10, I-19, and surface arterials set the tempo. Northwest or south addresses can mean long basin drives to midtown jobs — test peak routes before choosing solely on home price.',
          },
        ],
      },
      {
        id: 'lifestyle',
        title: 'Lifestyle & practical livability',
        bullets: [
          {
            title: 'Mountain-framed desert living',
            detail:
              'Pima offers a more compact basin identity than Maricopa’s multi-valley sprawl, with outdoor access to surrounding public lands and a distinct Tucson cultural core.',
          },
          {
            title: 'Climate',
            detail:
              'Extremely hot summers, mild winters that draw seasonal residents, and monsoon storms in late summer. Plan outdoor staging and heat readiness as part of move-in.',
          },
          {
            title: 'Pace and density',
            detail:
              'Lower density than the Phoenix metro can mean quieter streets and longer service radii. Visit candidate neighborhoods at commute hours before deciding.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Pima resources',
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify business entity status and interstate authority before deposits.',
    items: [
      {
        label: 'Pima County — official site',
        href: 'https://www.pima.gov/',
        external: true,
        note: 'County services & offices',
      },
      {
        label: 'City of Tucson',
        href: 'https://www.tucsonaz.gov/',
        external: true,
      },
      {
        label: 'Town of Oro Valley',
        href: 'https://www.orovalleyaz.gov/',
        external: true,
      },
      {
        label: 'Town of Marana',
        href: 'https://www.maranaaz.gov/',
        external: true,
      },
      {
        label: 'University of Arizona',
        href: 'https://www.arizona.edu/',
        external: true,
        note: 'Academic calendar context for campus-area moves',
      },
      {
        label: 'Arizona Department of Transportation (ADOT)',
        href: 'https://azdot.gov/',
        external: true,
        note: 'I-10 / I-19 travel info',
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
    'Prefer crews with foothill grade and long-carry experience for Catalina Foothills lots; building-packet fluency for UA/midtown multi-family; honest basin distance for Marana, Vail, and Green Valley pairs. Extreme heat needs early starts. Verify ACC entity status for in-state companies and FMCSA for interstate legs.',
  lastReviewed: '2026-07-23',
};

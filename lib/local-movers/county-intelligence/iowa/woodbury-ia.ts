import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeIaPack,
  IA_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/iowa/ia-shared';

/**
 * Woodbury County, IA — Sioux City / Missouri River western Iowa.
 * Cross-state NE/SD pairs common. NOT central Iowa (Des Moines) clone.
 */
export const woodburyCountyIaIntelligence: CountyIntelligencePack = finalizeIaPack({
  countySlug: 'woodbury',
  hubTitle: 'Woodbury County Moving Intelligence Hub',
  eyebrow:
    'Woodbury County, IA · Sioux City Missouri River core & I-29 / US-20 logistics',
  h1: 'Moving in Woodbury County: Sioux City Access, Missouri River Logistics & I-29 Corridors',
  heroOpener:
    'Woodbury County, Iowa is Sioux City on the Missouri River — not a Des Moines capital-city clone, not Cedar Rapids industrial stock, and not a generic “western Iowa ranch” template. Expect downtown and historic Morningside multi-unit and SFH, Northside and Riverside stock, Sergeant Bluff and southern growth, industrial and packing-plant adjacency, and I-29 / US-20 / US-75 freeflow that rewrites “local” estimates. A downtown loft dock slot, a Morningside basement stair stack, a Sergeant Bluff HOA driveway, and a South Sioux City (Nebraska) or Dakota Dunes (South Dakota) unload do not share truck access, authority, or crew skill. Cross-state Nebraska and South Dakota pairs are routine interstate jobs — not “still local.” This hub is for people moving in Woodbury County, IA — Sioux City — not a renamed Polk or central Iowa page.',
  heroCredibility:
    'Iowa DOT Intrastate Motor Carrier Permit (household goods) for intrastate · FMCSA for interstate (including NE/SD pairs) · Sioux City Missouri River & I-29 logistics awareness · Curated listings',
  majorCorridors: 'I-29 · US-20 · US-75 · local Sioux City grid',
  whatMakesDifferent: {
    title: 'What makes moving in Woodbury County different',
    intro:
      'These are Sioux City Missouri River realities — river-city grids, multi-state labor markets, industrial adjacency, and I-29 freeflow — not Des Moines I-235 insurance corridors and not eastern Iowa university or Quad Cities product.',
    bullets: [
      {
        title: 'This is western Iowa / Sioux City — not a central Iowa clone',
        detail:
          'Ignore Des Moines insurance-elevator defaults, Iowa City campus scripts, and Cedar Rapids plant-corridor assumptions as interchangeable product. Woodbury is Missouri River metro with bluffs, industrial packing and logistics employment, and tri-state daily life with Nebraska and South Dakota. Match estimates to Sioux City geography — not Polk County scripts.',
      },
      {
        title: 'Nebraska and South Dakota pairs are routine interstate authority problems',
        detail:
          'Households regularly move Woodbury ↔ South Sioux City NE, Dakota City NE, Dakota Dunes SD, or North Sioux City SD. An Iowa DOT Intrastate Motor Carrier Permit covering household goods alone does not authorize Nebraska or South Dakota delivery — verify FMCSA USDOT/MC when any leg leaves Iowa. Do not substitute NE or SD credentials for Iowa intrastate work or treat river crossings as “still local.”',
      },
      {
        title: 'Missouri River approaches and I-29 freeflow rewrite portal time',
        detail:
          'I-29, river bridges, and US-75 / US-20 connectors compress schedules at peak, incident, and winter weather events. A Morningside ↔ South Sioux City pair looks short on a map and regional at rush hour.',
      },
      {
        title: 'Downtown and Morningside product is not Sergeant Bluff HOA product',
        detail:
          'Walk-ups, basements, tight historic curb, and older multi-unit dominate core jobs. A Sergeant Bluff cul-de-sac or rural-residential lot does not share that stack.',
      },
      {
        title: 'Industrial and packing-plant adjacency reshapes residential access',
        detail:
          'Shift-change freeflow, freight traffic, and industrial-edge staging affect neighborhoods that look “simple SFH” on a map. Price portal time near plant corridors honestly.',
      },
      {
        title: 'Bluffs, basements, and winter ice underprice flat-rate optimism',
        detail:
          'Morningside slopes, older grid stairs, and freeze-thaw driveways fail estimates built on flat central-Iowa subdivision assumptions.',
      },
      IA_REG_BULLET,
    ],
  },
  zonesHeading: 'Woodbury County access zones',
  zonesIntro:
    'Plan by downtown–historic multi-unit, Morningside and bluff stock, Northside–Riverside grids, Sergeant Bluff growth, industrial-edge belts, and river-crossing approach corridors — access and authority rules cluster by product and state line more than ZIP alone.',
  zones: [
    {
      id: 'downtown-sioux-city',
      name: 'Downtown Sioux City, riverfront & historic multi-unit',
      shortName: 'Downtown',
      neighborhoods: [
        'Downtown Sioux City',
        'Riverfront edges',
        'Historic 4th Street edges',
        'Pearl Street corridors',
        'Bridge approach blocks',
        'Civic center edges',
      ],
      housingTypes: 'Loft conversions, mid-rise multifamily, walk-up multi-unit',
      challenges: [
        'Elevator reservations, docks, and building COIs where applicable',
        'Limited legal curb and event-day freeflow',
        'I-29 / river-crossing approach congestion',
      ],
      moverTips:
        'Book elevators and COIs in writing when required. Prefer mid-week early starts. Photo curb staging near riverfront and bridge approaches.',
      cityKeywords: [
        'sioux city',
        'downtown sioux city',
      ],
    },
    {
      id: 'morningside-bluffs',
      name: 'Morningside, bluff stock & southeast residential',
      shortName: 'Morningside',
      neighborhoods: [
        'Morningside',
        'Southeastern bluff edges',
        'Morningside Avenue corridors',
        'Lakeport corridors',
        'Southern multi-family pockets',
        'Bluff residential stock',
      ],
      housingTypes: 'Older SFH, bungalows, multi-unit pockets, bluff lots',
      challenges: [
        'Basement stairs, slope, and scarce truck length',
        'Tight residential curb and winter ice on grades',
        'US-75 / arterial freeflow',
      ],
      moverTips:
        'Survey stair counts, driveway slope, and basement access with photos. Prefer mid-week starts. Inventory long carries carefully.',
      cityKeywords: [
        'morningside',
        'sioux city',
      ],
    },
    {
      id: 'northside-riverside',
      name: 'Northside, Riverside & northern grid stock',
      shortName: 'Northside / Riverside',
      neighborhoods: [
        'Northside',
        'Riverside',
        'Northern grid corridors',
        'Hamilton Boulevard edges',
        'West Third corridors',
        'Northern multi-family pockets',
      ],
      housingTypes: 'Older SFH, multi-unit, ranch and split-level stock',
      challenges: [
        'Basement stairs and mixed curb product',
        'I-29 freeflow at peak',
        'Mixed municipal and industrial-adjacent rules',
      ],
      moverTips:
        'Photo driveway and basement access. Prefer mid-week starts. Clarify Northside vs Riverside addresses carefully.',
      cityKeywords: [
        'sioux city',
        'riverside sioux city',
        'northside sioux city',
      ],
    },
    {
      id: 'sergeant-bluff-south',
      name: 'Sergeant Bluff, southern growth & airport-adjacent belts',
      shortName: 'Sergeant Bluff',
      neighborhoods: [
        'Sergeant Bluff',
        'Southern growth HOAs',
        'Airport corridor edges',
        'Highway 75 south corridors',
        'Southern multi-family pockets',
        'Rural-residential south edges',
      ],
      housingTypes: 'HOA SFH, townhomes, newer multi-family, ranch stock',
      challenges: [
        'HOA gate lists and truck-length limits',
        'I-29 freeflow and longer empty miles vs downtown',
        'Airport traffic spikes on some approaches',
      ],
      moverTips:
        'Collect HOA packets early. Price I-29 honestly for downtown unload pairs. Confirm Sergeant Bluff vs Sioux City addresses.',
      cityKeywords: [
        'sergeant bluff',
        'sgt bluff',
      ],
    },
    {
      id: 'industrial-stockyards-edges',
      name: 'Industrial, packing-plant & stockyards-adjacent residential',
      shortName: 'Industrial edges',
      neighborhoods: [
        'Industrial corridor edges',
        'Stockyards-adjacent residential',
        'Packing-plant belts',
        'Eastern industrial multi-family',
        'Freight approach corridors',
        'Shift-change arterial edges',
      ],
      housingTypes: 'Mixed SFH, multi-unit, industrial-adjacent residential',
      challenges: [
        'Shift-change and freight traffic spikes',
        'Industrial-adjacent staging limits',
        'I-29 / US-75 freeflow at peak',
      ],
      moverTips:
        'Avoid major shift-change windows when flexible. Confirm staging limits near industrial curb. Price freeflow honestly.',
      cityKeywords: [
        'sioux city',
      ],
    },
    {
      id: 'moville-climbing-hill-edges',
      name: 'Moville, Climbing Hill & eastern rural-residential edges',
      shortName: 'Moville / east edges',
      neighborhoods: [
        'Moville',
        'Climbing Hill edges',
        'Lawton edges',
        'Correctionville edges',
        'US-20 east corridors',
        'Eastern rural-residential',
      ],
      housingTypes: 'SFH, multi-unit pockets, rural-residential, ranch stock',
      challenges: [
        'Longer empty miles to Sioux City core',
        'Mixed driveway and gravel access product',
        'US-20 freeflow and winter rural road conditions',
      ],
      moverTips:
        'Price empty miles honestly. Survey rural driveway width and turnaround. Plan winter contingency on county roads.',
      cityKeywords: [
        'moville',
        'lawton',
        'correctionville',
      ],
    },
  ],
  costDrivers: {
    title: 'What drives Woodbury County moving costs',
    intro:
      'Access product, river and I-29 freeflow, industrial timing, and interstate NE/SD authority complexity move the number more than packing skill alone — this is Sioux City Missouri River logistics, not central Iowa defaults.',
    drivers: [
      {
        title: 'Downtown multi-unit elevators, docks & COIs',
        detail:
          'Riverfront and historic vertical product add labor and schedule risk before packing skill matters.',
      },
      {
        title: 'Bluff stairs, basements & Morningside-grid curb',
        detail:
          'Morningside and older stock add flight counts and slope that flat-rate optimism underprices.',
      },
      {
        title: 'I-29 · US-20 · US-75 congestion',
        detail:
          'Cross-zone and cross-river pairs burn portal-to-portal hours even when map miles look short.',
      },
      {
        title: 'Sergeant Bluff HOA gates & growth windows',
        detail:
          'Southern suburb packets rewrite jobs that look simple on a map.',
      },
      {
        title: 'Nebraska/South Dakota interstate empty miles & authority',
        detail:
          'South Sioux City NE, Dakota Dunes SD, and similar destinations raise staging distance and require FMCSA — Iowa DOT household goods permit alone is not enough.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (simple access)',
        value: '$375–$1,550+',
        note: 'Higher with elevators, walk-ups, bluffs, or peak I-29 pairs',
      },
      {
        label: '2–3BR condo, duplex, or mid-size SFH',
        value: '$1,150–$3,700+',
        note: 'Stairs, multi-unit, HOA, and freeflow soft costs trend up',
      },
      {
        label: '3–4+ BR / multi-unit / cross-state',
        value: '$2,200–$7,800+',
        note: 'Core multi-unit and NE/SD pairs price highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$95–$180+/hr',
        note: 'Portal-to-portal; packing, stairs, freeflow, and interstate scale up',
      },
    ],
  },
  seasonal: {
    title: 'When to schedule a Woodbury County move',
    intro:
      'Industrial calendars, lease cycles, school calendars, summer heat, severe-storm and wind events, and winter ice on bluffs and I-29 reshape access across the Sioux City grid.',
    items: [
      {
        title: 'Best windows: mid-week early mornings',
        detail:
          'Tuesday–Thursday starts clear curb, ease river approaches, and reduce I-29 / US-75 pain. Avoid month-end Fridays when leases and multi-unit buildings collide.',
      },
      {
        title: 'Peak season: late May–mid-September',
        detail:
          'Apartment turnover and family school calendars fill first. Book 2–4 weeks ahead for peak weekends, HOA slots, and cross-state pairs.',
      },
      {
        title: 'Industrial shift and wind-event contingency',
        detail:
          'Plant shift changes and prairie wind/storm windows raise cancellation and staging risk. Prefer early starts and flexible weather dates.',
      },
      {
        title: 'Winter ice, freeze-thaw, and I-29 weather',
        detail:
          'December–February adds icy bluff stoops, frozen driveways, rural road risk, and interstate slowdowns. Prefer flexible dates, salt contingency, and weather windows for NE/SD unloads.',
      },
    ],
  },
  specialized: [
    {
      id: 'woodbury-sioux-city-interstate',
      title: 'Sioux City multi-unit, industrial-edge & tri-state interstate module',
      intro:
        'Woodbury County estimates fail more often on stair surveys, industrial freeflow, I-29 portal time, and Nebraska/South Dakota authority gaps than on packing skill alone.',
      bullets: [
        'Collect building COI, elevator reservations, and dock rules for downtown multi-unit before the survey is final.',
        'Photo stair counts, curb options, driveway slope, and basement access for Morningside and older grid stock.',
        'Price portal-to-portal time for any pair that rides I-29, US-20, or US-75 at peak.',
        'Collect HOA packets early for Sergeant Bluff product.',
        'Treat South Sioux City NE, Dakota Dunes SD, and similar unloads as interstate — verify FMCSA; Iowa DOT household goods permit alone is not enough.',
        'For in-state-only jobs verify Iowa DOT Intrastate Motor Carrier Permit covering household goods (tariffs on file). Do not hardcode NE or SD credentials as Iowa permission.',
      ],
    },
    {
      id: 'not-central-ia-not-local-ne',
      title: 'Not central Iowa · not “still local” Nebraska/SD module',
      intro:
        'A single “Iowa metro rate” collapses when Sioux City Missouri River product is confused with Des Moines insurance corridors, eastern Iowa university markets, or treated as if NE/SD delivery needs no FMCSA.',
      bullets: [
        'Do not price Morningside basements like Des Moines Beaverdale bungalows or like Iowa City campus multi-unit as interchangeable defaults.',
        'Keep Woodbury vs Plymouth / Monona / Ida county lines clear on multi-address estimates.',
        'Never treat river crossings into Nebraska or South Dakota as an intrastate Iowa job.',
        'Match industrial shift freeflow separately from Sergeant Bluff school-calendar waves and tri-state reverse-commute patterns.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Woodbury County?',
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
              'Woodbury County spans Sioux City Community Schools plus Sergeant Bluff-Luton, Woodbury Central, River Valley, and other systems. Assignment is address-based — marketing neighborhood names do not guarantee a campus. Nebraska and South Dakota districts are separate systems if you commute or relocate across state lines.',
          },
          {
            title: 'Choice, boundaries & enrollment pressure',
            detail:
              'Popular programs and boundary edges can be competitive. Confirm enrollment windows early when relocating mid-year.',
          },
          {
            title: 'Research sources',
            detail:
              'District boundary tools, Iowa Department of Education data, and campus visits beat ranking screenshots alone.',
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
              'UnityPoint Health – St. Luke’s (Sioux City), MercyOne Siouxland, and regional specialty campuses anchor care across Woodbury County. Confirm insurance networks for your household — including Nebraska or South Dakota facilities if relevant.',
          },
          {
            title: 'What relocators should do',
            detail:
              'Map peak-hour drive times to preferred campuses — I-29 freeflow and river approaches change “nearby” on paper. Transfer records early.',
          },
        ],
      },
      {
        id: 'housing',
        title: 'Housing character & cost pressures',
        bullets: [
          {
            title: 'Housing mix',
            detail:
              'Expect downtown multi-unit; Morningside bluff and older SFH; Northside and Riverside grids; Sergeant Bluff HOA growth; industrial-edge residential; eastern rural-residential stock.',
          },
          {
            title: 'Cost variation inside the county',
            detail:
              'Purchase prices and rents vary by neighborhood and product. Budget for multi-unit dues, older-building repair risk, and bluff maintenance where relevant.',
          },
          {
            title: 'Building and HOA governance',
            detail:
              'Associations and multi-unit management often control move hours, truck size, elevators, and deposits. Read documents carefully.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Which areas fit whom',
        bullets: [
          {
            title: 'Downtown urban lifestyle',
            detail:
              'Suits people prioritizing walkability and river amenities — with multi-unit access and event-day tradeoffs on move day.',
          },
          {
            title: 'Morningside character living',
            detail:
              'Often appeals for established neighborhood feel — with basements, bluff slope, and denser staging constraints.',
          },
          {
            title: 'Sergeant Bluff growth living',
            detail:
              'Attracts households seeking newer product and schools — with HOA rules and longer empty miles to the core.',
          },
          {
            title: 'Eastern rural-residential (Moville and edges)',
            detail:
              'Fits people prioritizing smaller-town space — with longer portal time to Sioux City employers and winter road contingency.',
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
              'Food processing and packing, manufacturing, logistics, healthcare, agribusiness, education, and tri-state professional services concentrate demand — including Nebraska and South Dakota reverse commutes.',
          },
          {
            title: 'Commute realism',
            detail:
              'Peak I-29 freeflow and river crossings are real. Test peak routes — including NE/SD campuses — before choosing solely on rent or purchase price.',
          },
        ],
      },
      {
        id: 'lifestyle',
        title: 'Lifestyle & practical livability',
        bullets: [
          {
            title: 'Local character',
            detail:
              'Woodbury County is western Iowa’s Missouri River metro — Sioux City industrial and neighborhood identity with daily tri-state commerce — not a Des Moines suburb and not an eastern Iowa university or Quad Cities clone.',
          },
          {
            title: 'Climate',
            detail:
              'Humid continental / prairie-edge climate with hot summers, severe-storm and wind risk, and freeze-thaw winters with ice, snow, and I-29 weather events. Plan outdoor staging, heat, and winter contingency as part of move-in.',
          },
          {
            title: 'Culture and pace',
            detail:
              'Visit at peak and off-peak times when deciding — industrial shifts, school calendars, river events, and winter weather reshape daily rhythm.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Woodbury County resources',
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify Iowa DOT Intrastate Motor Carrier Permit (household goods) status for in-state moves and FMCSA for interstate legs — including Nebraska and South Dakota pairs — before deposits.',
    items: [
      {
        label: 'Woodbury County, Iowa — official site',
        href: 'https://www.woodburycountyiowa.gov/',
        external: true,
        note: 'County services & property context',
      },
      {
        label: 'City of Sioux City',
        href: 'https://www.sioux-city.org/',
        external: true,
        note: 'Permits, services & city info',
      },
      {
        label: 'City of Sergeant Bluff',
        href: 'https://www.cityofsergeantbluff.com/',
        external: true,
        note: 'Southern growth municipality context',
      },
      {
        label: '511ia — Iowa traveler information',
        href: 'https://www.511ia.org/',
        external: true,
        note: 'I-29 / US-20 / US-75 before load windows',
      },
    ],
  },
  directoryHint:
    'Prefer crews with multi-unit and riverfront curb fluency for downtown product; bluff/basement experience for Morningside stock; HOA fluency for Sergeant Bluff; industrial-edge freeflow awareness; honest I-29 · US-20 · US-75 timing for cross-zone pairs. Verify Iowa DOT Intrastate Motor Carrier Permit covering household goods (tariffs on file) for intrastate moves and FMCSA for interstate legs — especially Nebraska and South Dakota unloads — before deposits. Do not treat NE/SD credentials as Iowa permission.',
  lastReviewed: '2026-07-24',
});

import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeIaPack,
  IA_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/iowa/ia-shared';

/**
 * Black Hawk County, IA — Waterloo–Cedar Falls twin markets / UNI / industrial residential.
 * NOT Cedar Rapids (Linn), NOT Des Moines (Polk).
 */
export const blackHawkCountyIaIntelligence: CountyIntelligencePack = finalizeIaPack({
  countySlug: 'black-hawk',
  hubTitle: 'Black Hawk County Moving Intelligence Hub',
  eyebrow:
    'Black Hawk County, IA · Waterloo–Cedar Falls twin markets & I-380 / US-20 logistics',
  h1: 'Moving in Black Hawk County: Waterloo–Cedar Falls Access, Twin Markets & US-20 Logistics',
  heroOpener:
    'Black Hawk County, Iowa is the Waterloo–Cedar Falls twin market — not a Cedar Rapids industrial clone, not Des Moines insurance corridors, and not a single-city “one rate fits both” template. Expect Waterloo downtown and older grid stock, Cedar Falls campus-adjacent multi-unit around the University of Northern Iowa, Evansdale and industrial-residential belts, suburban growth pockets, and I-380 / US-20 / US-218 freeflow that rewrites “local” estimates. A Waterloo bungalow basement, a College Hill walk-up, a Cedar Falls HOA driveway, and an Evansdale industrial-edge multi-family do not share truck access or crew skill. Twin-city empty miles and separate municipal rules fail estimates built on one-city Des Moines or Cedar Rapids scripts. This hub is for people moving in Black Hawk County, IA — Waterloo–Cedar Falls — not a renamed Linn or Polk page.',
  heroCredibility:
    'Iowa DOT Intrastate Motor Carrier Permit (household goods) for intrastate · FMCSA for interstate · Waterloo–Cedar Falls twin-market & I-380 / US-20 logistics awareness · Curated listings',
  majorCorridors: 'I-380 · US-20 · US-218 · local Waterloo/Cedar Falls grid',
  whatMakesDifferent: {
    title: 'What makes moving in Black Hawk County different',
    intro:
      'These are Waterloo–Cedar Falls twin-market realities — two cores, UNI campus density, industrial-residential belts, and US-20 freeflow — not Cedar Rapids I-380-only product and not Des Moines capital-city towers.',
    bullets: [
      {
        title: 'Twin markets — Waterloo and Cedar Falls are not interchangeable',
        detail:
          'Separate downtowns, municipal rules, housing mix, and empty miles between cores rewrite “local” estimates. A Waterloo east-side bungalow and a Cedar Falls College Hill multi-unit do not share curb product or crew routing. Price twin-city pairs portal-to-portal — do not collapse both into one flat metro rate.',
      },
      {
        title: 'This is not Cedar Rapids and not Des Moines',
        detail:
          'Ignore Linn NewBo industrial-adjacent defaults and Polk insurance-elevator scripts. Black Hawk is northeast Iowa’s twin-city hub with UNI academic waves, manufacturing and logistics employment, and US-20 spine logistics.',
      },
      {
        title: 'University of Northern Iowa calendars reshape Cedar Falls demand',
        detail:
          'Term-start multi-unit peaks, faculty moves, and campus-adjacent curb rules fail estimates built only on Waterloo industrial-residential assumptions.',
      },
      {
        title: 'Industrial and manufacturing adjacency reshapes Waterloo access',
        detail:
          'Shift-change freeflow, plant-corridor congestion, and industrial-edge staging affect residential jobs that look simple on a map. Price freeflow near freight corridors honestly.',
      },
      {
        title: 'Older grids and basements underprice flat-rate optimism',
        detail:
          'Waterloo historic stock, Cedar Falls near-campus walk-ups, and basement stairs fail estimates more often than packing skill alone.',
      },
      {
        title: 'I-380, US-20, and US-218 burn portal time',
        detail:
          'Waterloo ↔ Cedar Falls, Evansdale ↔ College Hill, or Hudson edges ↔ downtown pairs look local and still burn 20–45+ minutes at peak. Price portal-to-portal honestly.',
      },
      IA_REG_BULLET,
    ],
  },
  zonesHeading: 'Black Hawk County access zones',
  zonesIntro:
    'Plan by Waterloo core and grids, Cedar Falls campus multi-unit, Evansdale industrial-residential, western/suburban belts, and cross-twin empty-mile corridors — access rules cluster by city and product more than ZIP alone.',
  zones: [
    {
      id: 'waterloo-downtown-grids',
      name: 'Waterloo downtown, riverfront & historic grid stock',
      shortName: 'Waterloo core',
      neighborhoods: [
        'Downtown Waterloo',
        'Riverfront edges',
        'Historic District edges',
        'East High neighborhood edges',
        'West High neighborhood edges',
        '4th Street corridors',
      ],
      housingTypes: 'Older SFH, multi-unit pockets, loft conversions, bungalows',
      challenges: [
        'Basement stairs and tighter residential curb',
        'Mixed multi-unit rules and scarce truck length',
        'US-218 / arterial freeflow at peak',
      ],
      moverTips:
        'Photo driveway and basement access. Survey stair counts. Prefer mid-week starts on tight grid blocks.',
      cityKeywords: [
        'waterloo',
        'downtown waterloo',
      ],
    },
    {
      id: 'cedar-falls-uni',
      name: 'Cedar Falls, College Hill & UNI campus multi-unit',
      shortName: 'Cedar Falls / UNI',
      neighborhoods: [
        'Cedar Falls',
        'College Hill',
        'UNI campus edges',
        'Main Street corridors',
        'University Avenue corridors',
        'Campus multi-family pockets',
      ],
      housingTypes: 'Student and professional multi-unit, walk-ups, older SFH, limited elevators',
      challenges: [
        'Academic move-in congestion and scarce curb',
        'Multi-flight stairs and building packets',
        'US-20 / University freeflow',
      ],
      moverTips:
        'Avoid peak August/May campus windows when flexible. Collect multi-unit building rules early. Photo curb staging near College Hill.',
      cityKeywords: [
        'cedar falls',
        'college hill',
        'uni',
      ],
    },
    {
      id: 'evansdale-industrial',
      name: 'Evansdale, industrial-residential & plant-corridor belts',
      shortName: 'Evansdale / industrial',
      neighborhoods: [
        'Evansdale',
        'Industrial corridor edges',
        'Gilbertville edges',
        'Eastern multi-family pockets',
        'Plant-adjacent residential',
        'Highway 380 approach belts',
      ],
      housingTypes: 'Mixed SFH, multi-unit, industrial-adjacent residential, ranch stock',
      challenges: [
        'Shift-change and freight traffic spikes',
        'Industrial-adjacent staging limits',
        'I-380 freeflow at peak',
      ],
      moverTips:
        'Avoid major shift-change windows when flexible. Confirm staging limits near industrial curb. Price I-380 honestly.',
      cityKeywords: [
        'evansdale',
        'gilbertville',
        'waterloo',
      ],
    },
    {
      id: 'west-waterloo-cedar-falls-belt',
      name: 'West Waterloo, cross-twin belts & US-20 connectors',
      shortName: 'West / twin belt',
      neighborhoods: [
        'West Waterloo corridors',
        'Cross-twin arterial belts',
        'US-20 connector edges',
        'Ridgeway corridors',
        'San Marnan corridors',
        'Shared metro multi-family pockets',
      ],
      housingTypes: 'Ranch and split-level SFH, multi-family, townhomes',
      challenges: [
        'Twin-city empty miles mispriced as “local”',
        'US-20 freeflow at peak',
        'Mixed municipal rules across short distances',
      ],
      moverTips:
        'Price Waterloo ↔ Cedar Falls pairs portal-to-portal. Clarify city on every estimate. Prefer mid-week starts.',
      cityKeywords: [
        'waterloo',
        'cedar falls',
      ],
    },
    {
      id: 'hudson-dunkerton-edges',
      name: 'Hudson, Dunkerton & southern/eastern growth edges',
      shortName: 'Hudson / edges',
      neighborhoods: [
        'Hudson',
        'Dunkerton edges',
        'Janesville edges',
        'Southern growth pockets',
        'Rural-residential corridors',
        'County road edges',
      ],
      housingTypes: 'HOA SFH pockets, ranch stock, rural-residential, multi-unit pockets',
      challenges: [
        'Longer empty miles to either core',
        'Mixed driveway and gravel access product',
        'School-calendar summer peaks',
      ],
      moverTips:
        'Price empty miles honestly for core unload pairs. Survey rural driveway width. Collect HOA packets where applicable.',
      cityKeywords: [
        'hudson',
        'dunkerton',
        'janesville',
      ],
    },
    {
      id: 'cedar-falls-west-growth',
      name: 'Western Cedar Falls growth & residential HOAs',
      shortName: 'CF west growth',
      neighborhoods: [
        'Western Cedar Falls',
        'Growth HOA pockets',
        'Greenhill corridors',
        'Highway 57 edges',
        'Northern CF multi-family',
        'Suburban ranch belts',
      ],
      housingTypes: 'HOA SFH, townhomes, newer multi-family, ranch stock',
      challenges: [
        'HOA gate lists and truck-length limits',
        'Longer empty miles vs Waterloo core',
        'US-20 freeflow',
      ],
      moverTips:
        'Collect HOA packets early. Price twin-city freeflow for Waterloo unloads. Confirm Cedar Falls addresses carefully.',
      cityKeywords: [
        'cedar falls',
      ],
    },
  ],
  costDrivers: {
    title: 'What drives Black Hawk County moving costs',
    intro:
      'Twin-city empty miles, multi-unit and basement access, industrial freeflow, and I-380 / US-20 portal time move the number more than packing skill alone — this is Waterloo–Cedar Falls logistics, not Cedar Rapids or Des Moines defaults.',
    drivers: [
      {
        title: 'Twin-city portal time (Waterloo ↔ Cedar Falls)',
        detail:
          'Pairs that look local on a map still burn crew hours between cores. Price honestly — one flat “metro rate” fails.',
      },
      {
        title: 'Campus multi-unit stairs & College Hill curb',
        detail:
          'UNI-adjacent product adds flight counts and academic-peak compression that flat-rate optimism underprices.',
      },
      {
        title: 'Basements, older Waterloo grids & long carries',
        detail:
          'Historic stock fails estimates built on new-subdivision driveway assumptions.',
      },
      {
        title: 'I-380 · US-20 · US-218 congestion',
        detail:
          'Cross-zone and industrial-corridor pairs burn portal-to-portal hours even when map miles look short.',
      },
      {
        title: 'Industrial shift freeflow & multi-county empty miles',
        detail:
          'Plant-corridor timing and Buchanan / Bremer / Grundy destinations raise staging distance and schedule soft costs.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (simple access)',
        value: '$375–$1,500+',
        note: 'Higher with walk-ups, basements, or twin-city pairs',
      },
      {
        label: '2–3BR condo, duplex, or mid-size SFH',
        value: '$1,150–$3,600+',
        note: 'Stairs, multi-unit, and twin-city soft costs trend up',
      },
      {
        label: '3–4+ BR / multi-unit / cross-twin',
        value: '$2,200–$7,000+',
        note: 'Campus peaks and long twin-city pairs price highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$95–$175+/hr',
        note: 'Portal-to-portal; packing, stairs, and freeflow scale up',
      },
    ],
  },
  seasonal: {
    title: 'When to schedule a Black Hawk County move',
    intro:
      'UNI academic calendars, industrial shift patterns, school calendars, summer heat, severe-storm season, and winter ice reshape access across the twin-city grid.',
    items: [
      {
        title: 'Best windows: mid-week early mornings',
        detail:
          'Tuesday–Thursday starts clear curb and reduce US-20 / I-380 pain. Avoid month-end Fridays when leases and multi-unit buildings collide.',
      },
      {
        title: 'Peak season: late May–mid-September',
        detail:
          'Family school calendars and UNI turnovers fill first. Book 2–4 weeks ahead for peak weekends and campus-adjacent slots.',
      },
      {
        title: 'UNI term-start and term-end spikes',
        detail:
          'August and May compress College Hill curb and multi-unit freight windows. Prefer flexible dates when moving near campus.',
      },
      {
        title: 'Winter ice, freeze-thaw, and holiday freeflow',
        detail:
          'December–February adds icy stoops, frozen driveways, and weather cancellations across northeast Iowa. Prefer flexible dates, salt contingency, and tarps on older Waterloo stock.',
      },
    ],
  },
  specialized: [
    {
      id: 'black-hawk-twin-market',
      title: 'Waterloo–Cedar Falls twin-market & US-20 logistics module',
      intro:
        'Black Hawk County estimates fail more often on twin-city empty miles, stair surveys, campus multi-unit packets, and industrial freeflow than on packing skill alone.',
      bullets: [
        'Never collapse Waterloo and Cedar Falls into one flat rate — price portal-to-portal between cores.',
        'Collect multi-unit building rules for College Hill and campus-edge product before the survey is final.',
        'Photo stair counts, curb options, and basement access for older Waterloo grid stock.',
        'Price portal-to-portal time for any pair that rides I-380, US-20, or US-218 at peak.',
        'Clarify Waterloo, Cedar Falls, Evansdale, Hudson, and unincorporated addresses on every estimate.',
        'For in-state jobs verify Iowa DOT Intrastate Motor Carrier Permit covering household goods (tariffs on file); verify FMCSA for any out-of-state leg.',
      ],
    },
    {
      id: 'not-cr-not-dsm',
      title: 'Not Cedar Rapids · not Des Moines module',
      intro:
        'A single “northeast Iowa rate” collapses when Waterloo–Cedar Falls twin product is confused with Linn industrial belts or Polk insurance corridors.',
      bullets: [
        'Do not price College Hill walk-ups like NewBo lofts or like Des Moines East Village towers as interchangeable defaults.',
        'Keep Black Hawk vs Bremer / Buchanan / Grundy county lines clear on multi-address estimates.',
        'Match UNI academic peaks separately from Waterloo industrial shift freeflow.',
        'Treat out-of-state legs as interstate authority problems — Iowa DOT household goods permit alone is not enough for Minnesota, Illinois, or Wisconsin delivery.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Black Hawk County?',
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
              'Black Hawk County spans Waterloo Community Schools, Cedar Falls Community Schools, and other systems including Hudson and Dunkerton areas. University of Northern Iowa anchors higher education in Cedar Falls. Assignment for K–12 is address-based — marketing neighborhood names do not guarantee a campus.',
          },
          {
            title: 'Choice, boundaries & enrollment pressure',
            detail:
              'Popular programs and twin-city boundary edges can be competitive. Confirm enrollment windows early when relocating mid-year.',
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
              'UnityPoint Health – Waterloo, MercyOne (Northeast Iowa region), and specialty campuses anchor care across Black Hawk County. Confirm insurance networks for your household.',
          },
          {
            title: 'What relocators should do',
            detail:
              'Map peak-hour drive times between twin cities to preferred campuses — US-20 freeflow changes “nearby” on paper. Transfer records early.',
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
              'Expect Waterloo older grids and multi-unit; Cedar Falls campus multi-unit and College Hill stock; Evansdale industrial-residential; western and suburban growth; rural-residential edges.',
          },
          {
            title: 'Cost variation inside the county',
            detail:
              'Purchase prices and rents vary by city and product — Cedar Falls campus adjacency often prices differently from Waterloo industrial-edge stock. Budget for multi-unit dues and older-building repair risk.',
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
            title: 'Waterloo core / grid living',
            detail:
              'Suits people prioritizing relative value and established neighborhoods — with basements, curb limits, and denser staging constraints.',
          },
          {
            title: 'Cedar Falls / UNI lifestyle',
            detail:
              'Often appeals for campus amenities and walkability — with multi-unit access and academic-calendar tradeoffs on move day.',
          },
          {
            title: 'Evansdale / industrial-residential',
            detail:
              'Attracts households seeking space and employment proximity — with freeflow and staging tradeoffs near plant corridors.',
          },
          {
            title: 'Hudson / edge growth living',
            detail:
              'Fits buyers chasing smaller-town or newer product — with longer empty miles to either twin core.',
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
              'Manufacturing, logistics, healthcare, University of Northern Iowa, education, and regional professional services concentrate demand across both cores.',
          },
          {
            title: 'Commute realism',
            detail:
              'Peak twin-city freeflow on US-20 and I-380 is real. Test peak routes between Waterloo and Cedar Falls before choosing solely on rent or purchase price.',
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
              'Black Hawk County is a true twin market — Waterloo industrial-residential identity and Cedar Falls university-town character side by side — different from single-core Cedar Rapids and from Des Moines capital-city product.',
          },
          {
            title: 'Climate',
            detail:
              'Humid continental climate with hot summers, severe-storm risk, and freeze-thaw winters with ice and snow. Plan outdoor staging, heat, and winter contingency as part of move-in.',
          },
          {
            title: 'Culture and pace',
            detail:
              'Visit both cores at peak and off-peak times when deciding — industrial shifts, UNI calendars, school seasons, and winter weather reshape daily rhythm.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Black Hawk County resources',
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify Iowa DOT Intrastate Motor Carrier Permit (household goods) status for in-state moves and FMCSA for interstate legs before deposits.',
    items: [
      {
        label: 'Black Hawk County, Iowa — official site',
        href: 'https://www.blackhawkcounty.iowa.gov/',
        external: true,
        note: 'County services & property context',
      },
      {
        label: 'City of Waterloo',
        href: 'https://www.cityofwaterlooiowa.com/',
        external: true,
        note: 'Permits, services & city info',
      },
      {
        label: 'City of Cedar Falls',
        href: 'https://www.cedarfalls.com/',
        external: true,
        note: 'UNI-adjacent municipality context',
      },
      {
        label: '511ia — Iowa traveler information',
        href: 'https://www.511ia.org/',
        external: true,
        note: 'I-380 / US-20 / US-218 before load windows',
      },
    ],
  },
  directoryHint:
    'Prefer crews with twin-city routing fluency for Waterloo ↔ Cedar Falls pairs; basement and grid experience for Waterloo stock; campus multi-unit awareness for College Hill / UNI; honest I-380 · US-20 · US-218 timing for cross-zone pairs. Verify Iowa DOT Intrastate Motor Carrier Permit covering household goods (tariffs on file) for intrastate moves and FMCSA for interstate legs before deposits.',
  lastReviewed: '2026-07-24',
});

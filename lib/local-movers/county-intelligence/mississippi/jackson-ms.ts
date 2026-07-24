import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeMsPack,
  MS_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/mississippi/ms-shared';

/**
 * Jackson County, MS — Gulf Coast / Pascagoula / Ocean Springs.
 * MUST say NOT Jackson County MO (Kansas City), and NOT Hinds / Jackson the city.
 */
export const jacksonCountyMsIntelligence: CountyIntelligencePack = finalizeMsPack({
  countySlug: 'jackson',
  hubTitle: 'Jackson County Moving Intelligence Hub',
  eyebrow:
    'Jackson County, MS · Pascagoula / Ocean Springs Gulf Coast (not Jackson city · not Jackson MO)',
  h1: 'Moving in Jackson County, MS: Pascagoula Access, Ocean Springs Grids & I-10 Gulf Coast Logistics',
  heroOpener:
    'Jackson County, Mississippi is Pascagoula, Ocean Springs, Gautier, and Moss Point on the eastern Mississippi Gulf Coast — not Jackson the city in Hinds County (the capital metro), and not Jackson County, Missouri (Kansas City / Independence). Expect Pascagoula multi-unit and shipyard-adjacent stock, Ocean Springs character grids and walk-ups, Gautier and Vancleave growth belts, Moss Point and Escatawpa edges, US-90 coastal product, and I-10 / US-90 / MS-63 freeflow that rewrites “local” estimates. A Pascagoula mid-rise curb stack, an Ocean Springs stair carry, a Gautier HOA driveway, and a Vancleave acreage long carry do not share truck access or crew skill. Shipyard and industrial waves, humidity, and hurricane-season contingency are real inputs. This hub is for people moving in Jackson County, MS — Pascagoula / Ocean Springs Gulf Coast — not Hinds capital Jackson and not Jackson County MO.',
  heroCredibility:
    'MDOT household goods Certificate of Public Convenience and Necessity for intrastate · FMCSA for interstate · Pascagoula–Ocean Springs Gulf Coast & I-10 logistics awareness · Curated listings',
  majorCorridors: 'I-10 · US-90 · MS-63 · local Pascagoula/OS grid',
  whatMakesDifferent: {
    title: 'What makes moving in Jackson County different',
    intro:
      'These are Jackson County, Mississippi / Pascagoula–Ocean Springs Gulf Coast realities — shipyard freeflow, Ocean Springs character grids, I-10 / US-90 logistics, and hurricane contingency — not Hinds / Jackson the city capital product, not Jackson County Missouri Kansas City logistics, and not Gulfport–Biloxi casino-corridor defaults alone.',
    bullets: [
      {
        title: 'This is Jackson County, MS Gulf Coast — NOT Jackson the city, NOT Jackson County MO',
        detail:
          'Ignore downtown Jackson capital elevators, Fondren stairs, and Hinds I-55 / I-20 templates. Also ignore Kansas City Plaza towers, Independence grids, and Missouri MoDOT scripts. Jackson County MS is Pascagoula–Ocean Springs eastern Gulf Coast product with MDOT household goods Certificate of Public Convenience and Necessity authority — not capital metro Hinds and not Jackson County MO.',
      },
      {
        title: 'Pascagoula multi-unit and shipyard freeflow rewrite labor',
        detail:
          'Industrial traffic mix, multi-unit turnover, and limited curb near commercial and shipyard edges dominate many jobs. An Ocean Springs character driveway does not share that stack.',
      },
      {
        title: 'Ocean Springs character grids underprice flat-rate optimism',
        detail:
          'Walk-ups, older interiors, tight residential curb, and tree-lined carries fail estimates more often than packing skill alone. Same-county Vancleave acreage product does not share that stair stack.',
      },
      {
        title: 'Hurricane season and humidity compress productive outdoor hours',
        detail:
          'Named-storm contingency, high humidity, and summer heat reshape outdoor labor and cancellation risk. Prefer early starts, tarp discipline, and flexible dates in peak season.',
      },
      {
        title: 'I-10, US-90, MS-63, and the local Pascagoula / Ocean Springs grid burn portal time',
        detail:
          'Pascagoula ↔ Ocean Springs, Gautier ↔ Moss Point, or Vancleave ↔ US-90 pairs look local and still burn 25–60+ minutes at peak. Price portal-to-portal honestly.',
      },
      {
        title: 'Multi-county coast and interstate pairs are routine',
        detail:
          'Households regularly move Jackson County MS ↔ Harrison (Gulfport–Biloxi), George, or Mobile County AL, or out-of-state on I-10. MDOT household goods Certificate of Public Convenience and Necessity authority alone does not authorize interstate delivery — verify FMCSA when any leg leaves Mississippi.',
      },
      MS_REG_BULLET,
    ],
  },
  zonesHeading: 'Jackson County access zones',
  zonesIntro:
    'Plan by Pascagoula multi-unit and shipyard edges, Ocean Springs character grids, Gautier growth, Moss Point–Escatawpa belts, Vancleave inland stock, and US-90 coastal product — access rules cluster by product more than ZIP alone. This is Jackson County, MS Gulf Coast — not Hinds / Jackson the city and not Jackson County MO.',
  zones: [
    {
      id: 'pascagoula-core',
      name: 'Pascagoula core, multi-unit & shipyard-adjacent belts',
      shortName: 'Pascagoula core',
      neighborhoods: [
        'Pascagoula',
        'Downtown Pascagoula edges',
        'Shipyard and industrial edges',
        'Market Street corridors',
        'I-10 / MS-63 approaches',
        'Beach Boulevard east edges',
      ],
      housingTypes: 'Multi-family, mid-rise pockets, older SFH, industrial-adjacent stock',
      challenges: [
        'Industrial freeflow mixed with residential loads',
        'Multi-unit curb limits and shift-change congestion',
        'I-10 / MS-63 approach freeflow',
      ],
      moverTips:
        'Prefer mid-week early starts near shift peaks. Photo curb staging. Clarify Pascagoula vs Moss Point and Gautier addresses.',
      cityKeywords: [
        'pascagoula',
        'downtown pascagoula',
      ],
    },
    {
      id: 'ocean-springs-character',
      name: 'Ocean Springs character grids, walk-ups & arts-corridor stock',
      shortName: 'Ocean Springs',
      neighborhoods: [
        'Ocean Springs',
        'Downtown Ocean Springs',
        'Government Street corridors',
        'Shearwater edges',
        'East Beach edges',
        'US-90 Ocean Springs belts',
      ],
      housingTypes: 'Character SFH, walk-up multifamily, duplexes, limited elevators',
      challenges: [
        'Multi-flight stairs and scarce truck length',
        'Tight residential curb and festival-day freeflow',
        'Tree-lined carries and older interiors',
      ],
      moverTips:
        'Survey stair counts with photos. Prefer mid-week starts near corridor peaks. Inventory porches and basements carefully.',
      cityKeywords: [
        'ocean springs',
        'downtown ocean springs',
      ],
    },
    {
      id: 'gautier-growth',
      name: 'Gautier, mid-county growth & I-10 residential belts',
      shortName: 'Gautier / growth',
      neighborhoods: [
        'Gautier',
        'I-10 Gautier multi-unit edges',
        'MS-57 corridors',
        'Singing River edges',
        'Martin Bluff edges',
        'Mid-county HOA pockets',
      ],
      housingTypes: 'HOA SFH, multi-family, ranch and two-story stock',
      challenges: [
        'I-10 freeflow and longer empty miles vs Ocean Springs core',
        'HOA packets where present',
        'Cross-zone empty miles common',
      ],
      moverTips:
        'Collect HOA packets early when present. Clarify Gautier vs Pascagoula addresses. Price I-10 honestly for east/west pairs.',
      cityKeywords: [
        'gautier',
        'martin bluff',
      ],
    },
    {
      id: 'moss-point-escatawpa',
      name: 'Moss Point, Escatawpa & river-edge stock',
      shortName: 'Moss Point / Escatawpa',
      neighborhoods: [
        'Moss Point',
        'Escatawpa',
        'River-edge corridors',
        'MS-63 links',
        'Kreole edges',
        'North Moss Point ranch pockets',
      ],
      housingTypes: 'Ranch and character SFH, multi-unit pockets, mixed older stock',
      challenges: [
        'MS-63 / I-10 freeflow',
        'Longer carries and mixed driveway geometry',
        'Municipal mix across short distances',
      ],
      moverTips:
        'Clarify Moss Point, Escatawpa, and Pascagoula addresses. Survey older stock carefully. Price MS-63 portal time honestly.',
      cityKeywords: [
        'moss point',
        'escatawpa',
        'pascagoula',
      ],
    },
    {
      id: 'vancleave-inland',
      name: 'Vancleave, inland acreage & north growth',
      shortName: 'Vancleave / inland',
      neighborhoods: [
        'Vancleave',
        'MS-57 north corridors',
        'Inland acreage pockets',
        'Wade edges',
        'North Jackson County ranch stock',
        'I-10 north service edges',
      ],
      housingTypes: 'Ranch SFH, acreage, newer subdivision pockets',
      challenges: [
        'Longer empty miles vs US-90 coastal core',
        'Gate and driveway geometry on acreage product',
        'Soft shoulders and longer carries',
      ],
      moverTips:
        'Survey gate and driveway access carefully. Price empty miles for Ocean Springs and Pascagoula pairs. Clarify unincorporated addresses.',
      cityKeywords: [
        'vancleave',
        'wade',
        'jackson county ms',
      ],
    },
    {
      id: 'us90-coastal-jackson',
      name: 'US-90 coastal product, raised-home & beachfront edges',
      shortName: 'US-90 coastal',
      neighborhoods: [
        'US-90 coastal corridors',
        'East Ocean Springs beach edges',
        'Pascagoula beachfront edges',
        'Raised-home belts',
        'Coastal condo pockets',
        'Seawall and pier approaches',
      ],
      housingTypes: 'Raised SFH, beachfront condo, multi-unit, slab and elevated product',
      challenges: [
        'Wind, sand, salt, and limited legal curb',
        'Long carries from beachfront staging limits',
        'Hurricane shutters and outdoor furniture volume',
      ],
      moverTips:
        'Survey elevation and stair counts with photos. Plan tarp and wind contingency. Prefer early starts before sea-breeze peaks.',
      cityKeywords: [
        'ocean springs',
        'pascagoula',
        'us 90',
      ],
    },
  ],
  costDrivers: {
    title: 'What drives Jackson County moving costs',
    intro:
      'Access product, beachfront and character-grid staging, industrial freeflow, and I-10 / US-90 timing move the number more than packing skill alone — this is Pascagoula–Ocean Springs Gulf Coast logistics, not Hinds capital Jackson pricing and not Jackson County MO Kansas City defaults.',
    drivers: [
      {
        title: 'Ocean Springs stairs, porches & character-grid curb',
        detail:
          'Walk-up and older stock add flight counts that flat-rate optimism underprices.',
      },
      {
        title: 'Pascagoula multi-unit & shipyard freeflow',
        detail:
          'Industrial traffic mix and multi-unit curb add schedule risk before packing skill matters.',
      },
      {
        title: 'US-90 beachfront curb limits, raised homes & wind staging',
        detail:
          'Coastal product adds long carries and weather risk that inland acreage never sees.',
      },
      {
        title: 'I-10 · US-90 · MS-63 · local Pascagoula/OS grid congestion',
        detail:
          'Cross-coast pairs burn portal-to-portal hours even when map miles look short.',
      },
      {
        title: 'Multi-county coast & interstate empty miles',
        detail:
          'Harrison, George, Mobile AL, and out-of-state destinations raise staging distance and authority complexity when leaving Jackson County MS or Mississippi.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (simple access)',
        value: '$450–$1,850+',
        note: 'Higher with stairs, beachfront, or peak I-10 / US-90 pairs',
      },
      {
        label: '2–3BR condo, duplex, or mid-size SFH',
        value: '$1,400–$4,300+',
        note: 'Raised-home stairs, character grids, and HOA soft costs trend up',
      },
      {
        label: '3–4+ BR / coastal / cross-zone',
        value: '$2,800–$9,000+',
        note: 'Beachfront moves and long I-10 / MS-63 pairs price highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$110–$195+/hr',
        note: 'Portal-to-portal; packing, coastal staging, and stairs scale up',
      },
    ],
  },
  seasonal: {
    title: 'When to schedule a Jackson County move',
    intro:
      'Lease cycles, school calendars, summer heat and humidity, shipyard shift patterns, and hurricane season reshape access and crew availability across the Pascagoula–Ocean Springs grid.',
    items: [
      {
        title: 'Best windows: mid-week early mornings',
        detail:
          'Tuesday–Thursday starts clear curb, ease multi-unit windows, and reduce I-10 / US-90 pain. Avoid festival and major event weekends in Ocean Springs when flexible.',
      },
      {
        title: 'Peak season: late May–mid-September',
        detail:
          'Apartment turnover, family school calendars, and summer tourism fill first. Book 2–4 weeks ahead for peak weekends and coastal slots.',
      },
      {
        title: 'Hurricane-season contingency',
        detail:
          'June–November named-storm risk raises cancellation and staging risk. Prefer flexible dates, elevated storage plans when relevant, and early starts when forecasts allow.',
      },
      {
        title: 'Summer heat, humidity & winter mild snaps',
        detail:
          'June–August heat and humidity reshape outdoor labor. Prefer early starts, hydration plans, and tarp discipline on coastal and character-grid stock.',
      },
    ],
  },
  specialized: [
    {
      id: 'jackson-ms-gulf-coast-logistics',
      title: 'Pascagoula–Ocean Springs Gulf Coast & I-10 / US-90 logistics module',
      intro:
        'Jackson County MS estimates fail more often on stair surveys, beachfront staging, industrial freeflow, and freeway timing than on packing skill alone — Gulf Coast product, not Hinds capital Jackson and not Jackson County MO.',
      bullets: [
        'Photo stair counts and curb options for Ocean Springs character-grid stock.',
        'Survey beachfront elevation, wind exposure, and staging limits for US-90 product.',
        'Price portal-to-portal time for any pair that rides I-10, US-90, or MS-63 at peak.',
        'Avoid peak shipyard shift windows when flexible for Pascagoula multi-unit jobs.',
        'Clarify Pascagoula, Ocean Springs, Gautier, Moss Point, Vancleave, and other municipal addresses on every estimate — and state “Jackson County, Mississippi” when authority or destination could be confused with Jackson the city or Jackson County MO.',
        'For in-state jobs verify MDOT household goods Certificate of Public Convenience and Necessity pathways; verify FMCSA for any out-of-state leg. Do not apply Missouri MoDOT or Hinds-only capital assumptions here.',
      ],
    },
    {
      id: 'not-hinds-jackson-city-not-jackson-mo',
      title: 'Not Hinds / Jackson the city · not Jackson County MO module',
      intro:
        'A single “Jackson rate” collapses when Jackson County MS Gulf Coast product is confused with Hinds County / Jackson the city capital logistics or with Jackson County Missouri Kansas City / Independence product.',
      bullets: [
        'Do not price Ocean Springs walk-ups like downtown Jackson MS capitol docks or like Kansas City Plaza elevators as interchangeable defaults.',
        'Keep Jackson County MS vs Harrison vs Hinds county lines clear on multi-address estimates — and never swap in Jackson MO addresses or Missouri authority language.',
        'Match shipyard and industrial peaks separately from Ocean Springs festival and school-calendar waves.',
        'Treat out-of-state legs (including Mobile AL) as interstate authority problems — MDOT household goods authority alone is not enough for interstate delivery.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Jackson County, MS?',
    intro:
      'Use this as a practical fit checklist — schools, healthcare, housing character, and commute realism — then verify on district and hospital sites. No single ranking captures neighborhood fit. This is Jackson County, Mississippi Gulf Coast — not Jackson the city (Hinds) and not Jackson County, Missouri.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & education landscape',
        bullets: [
          {
            title: 'How districts work here',
            detail:
              'Jackson County MS spans Pascagoula-Gautier, Ocean Springs, Moss Point, and Jackson County systems. Assignment is address-based — marketing neighborhood names do not guarantee a campus.',
          },
          {
            title: 'Choice, boundaries & enrollment pressure',
            detail:
              'Popular programs and boundary edges can be competitive. Confirm enrollment windows early when relocating mid-year.',
          },
          {
            title: 'Research sources',
            detail:
              'District boundary tools, Mississippi Department of Education data, and campus visits beat ranking screenshots alone. Do not use Missouri or capital-metro Hinds tools as substitutes for this coast market.',
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
              'Singing River Health System and related coastal campuses anchor care across Jackson County MS. Confirm insurance networks for your household.',
          },
          {
            title: 'What relocators should do',
            detail:
              'Map peak-hour drive times to preferred campuses — I-10 and US-90 freeflow change “nearby” on paper. Transfer records early.',
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
              'Expect Pascagoula multi-unit and industrial-adjacent stock; Ocean Springs character SFH and walk-ups; Gautier growth; Moss Point ranch product; Vancleave acreage; US-90 coastal raised and condo stock.',
          },
          {
            title: 'Cost variation inside the county',
            detail:
              'Purchase prices and rents vary by coastal vs inland product. Budget for flood insurance where mapped, HOA dues, and wind-mitigation upgrades.',
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
            title: 'Ocean Springs character living',
            detail:
              'Often appeals for arts-corridor and neighborhood feel — with stairs, curb limits, and denser staging constraints.',
          },
          {
            title: 'Pascagoula multi-unit / shipyard-edge living',
            detail:
              'Suits people prioritizing employment access — with industrial freeflow and multi-unit curb tradeoffs on move day.',
          },
          {
            title: 'Gautier / mid-county growth belts',
            detail:
              'Fits buyers chasing relative space and I-10 access — with longer pairs to Ocean Springs character cores.',
          },
          {
            title: 'Vancleave / inland acreage living',
            detail:
              'Attracts households seeking space and quieter grids — with longer empty miles to US-90 coastal product.',
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
              'Shipyard and manufacturing, healthcare, education, retail, and reverse commutes toward Harrison County concentrate demand across Jackson County MS.',
          },
          {
            title: 'Commute realism',
            detail:
              'Peak I-10 and US-90 freeflow is real — including Harrison reverse commutes and Mobile AL interstate pairs. Test peak routes before choosing solely on rent or purchase price.',
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
              'Jackson County MS stacks Pascagoula industrial-coast cores, Ocean Springs character grids, and inland growth — different from Hinds / Jackson the city capital patterns, Jackson County MO Kansas City product, and Gulfport–Biloxi casino-corridor defaults alone.',
          },
          {
            title: 'Climate',
            detail:
              'Humid subtropical Gulf climate with hot summers, high humidity, hurricane-season risk, and mild winters. Plan outdoor staging, heat, wind, and storm contingency as part of move-in.',
          },
          {
            title: 'Culture and pace',
            detail:
              'Visit at peak and off-peak times when deciding — festival weekends, school calendars, shipyard shifts, and storm season reshape daily rhythm.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Jackson County, MS resources',
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify MDOT household goods carrier authority for in-state moves and FMCSA for interstate legs before deposits. This is Jackson County, Mississippi Gulf Coast — not Jackson the city (Hinds) and not Jackson County, Missouri.',
    items: [
      {
        label: 'Jackson County, MS — official site',
        href: 'https://www.co.jackson.ms.us/',
        external: true,
        note: 'County services & property context — Mississippi Gulf Coast',
      },
      {
        label: 'City of Pascagoula',
        href: 'https://www.cityofpascagoula.com/',
        external: true,
        note: 'Shipyard-adjacent municipality context',
      },
      {
        label: 'City of Ocean Springs',
        href: 'https://www.oceansprings-ms.gov/',
        external: true,
        note: 'Character-grid municipality context',
      },
      {
        label: 'City of Gautier',
        href: 'https://www.gautier-ms.gov/',
        external: true,
        note: 'Mid-county growth municipality context',
      },
      {
        label: 'MDOT — traveler / traffic resources',
        href: 'https://mdot.ms.gov/',
        external: true,
        note: 'I-10 / US-90 / MS-63 before load windows',
      },
    ],
  },
  directoryHint:
    'Prefer crews with stair and character-grid fluency for Ocean Springs stock; multi-unit and industrial freeflow awareness for Pascagoula product; beachfront and raised-home staging for US-90 coastal jobs; honest I-10 · US-90 · MS-63 · local Pascagoula/OS grid timing for cross-zone pairs. Confirm Jackson County, Mississippi (not Jackson the city / Hinds, not Jackson County MO). Verify MDOT household goods Certificate of Public Convenience and Necessity pathways for intrastate moves (even within city limits) and FMCSA for interstate legs before deposits.',
  lastReviewed: '2026-07-24',
});

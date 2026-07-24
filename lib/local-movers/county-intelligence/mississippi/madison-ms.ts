import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeMsPack,
  MS_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/mississippi/ms-shared';

/**
 * Madison County, MS — Madison / Ridgeland north-metro.
 * MUST say NOT Madison County AL (Huntsville aerospace).
 * Must differ from Rankin (Pearl/Brandon east-metro).
 */
export const madisonCountyMsIntelligence: CountyIntelligencePack = finalizeMsPack({
  countySlug: 'madison',
  hubTitle: 'Madison County Moving Intelligence Hub',
  eyebrow:
    'Madison County, MS · Madison / Ridgeland north-metro (not Madison County AL)',
  h1: 'Moving in Madison County, MS: Ridgeland Access, Madison Growth & I-55 North-Metro Logistics',
  heroOpener:
    'Madison County, Mississippi is Jackson’s north-metro engine — Ridgeland, the City of Madison, Gluckstadt, and Canton growth along I-55 — not Madison County Alabama (Huntsville aerospace), not Rankin Pearl / Brandon east-metro product, and not Hinds downtown capital elevators alone. Expect Ridgeland multi-unit and Highland Colony product, Madison HOA growth and school-calendar peaks, Gluckstadt and north I-55 belts, Canton and county-edge stock, Reservoir west recreation edges, and I-55 / MS-22 / US-51 freeflow that rewrites “local” estimates. A Ridgeland mid-rise elevator job, a Madison gated driveway, a Gluckstadt new-build curb, and a Canton square-edge long carry do not share truck access or crew skill. Professional-services and north-metro reverse-commute waves are real inputs. This hub is for people moving in Madison County, MS — north-metro Jackson — not Madison County AL and not Rankin east-metro.',
  heroCredibility:
    'MDOT household goods Certificate of Public Convenience and Necessity for intrastate · FMCSA for interstate · Madison / Ridgeland north-metro & I-55 logistics awareness · Curated listings',
  majorCorridors: 'I-55 · MS-22 · US-51 · local north-metro grid',
  whatMakesDifferent: {
    title: 'What makes moving in Madison County different',
    intro:
      'These are Madison County, Mississippi / Ridgeland–Madison north-metro realities — I-55 freeflow, Highland Colony product, City of Madison HOAs, and Reservoir edges — not Madison County Alabama Huntsville aerospace, not Rankin Pearl–Brandon east-metro, and not downtown Jackson capital elevators alone.',
    bullets: [
      {
        title: 'This is Madison County, MS — NOT Madison County, Alabama',
        detail:
          'Ignore Huntsville, Redstone, Research Park, I-565, and APSC templates entirely. Madison County MS is Jackson north-metro product on I-55 with Ridgeland multi-unit, City of Madison HOA growth, and MDOT household goods Certificate of Public Convenience and Necessity authority — not Alabama APSC scripts or aerospace-transfer logistics.',
      },
      {
        title: 'North-metro Madison is not Rankin east-metro',
        detail:
          'Ignore Pearl US-80 multi-unit and Brandon MS-18 HOA defaults as the whole story. Madison stacks I-55 / US-51 north freeflow, Highland Colony product, and Gluckstadt growth that Rankin east-metro scripts underprice. Match estimates to Ridgeland, Madison, and Madison County MS addresses.',
      },
      {
        title: 'Ridgeland multi-unit and Highland Colony product rewrite labor',
        detail:
          'Elevator reservations, building COIs, tight curb near commercial strips, and County Line freeflow dominate many jobs. A City of Madison cul-de-sac does not share that stack.',
      },
      {
        title: 'City of Madison growth is HOA- and school-calendar driven',
        detail:
          'Gate lists, truck-length limits, and summer family peaks rewrite jobs that look suburban-simple on paper. Same-county Canton ranch product does not share that packet stack.',
      },
      {
        title: 'I-55, MS-22, US-51, and the local north-metro grid burn portal time',
        detail:
          'Ridgeland ↔ Madison, Gluckstadt ↔ downtown Jackson, or Canton ↔ Reservoir pairs look local and still burn 25–60+ minutes at peak. Price portal-to-portal honestly.',
      },
      {
        title: 'Multi-county capital-metro and interstate pairs are routine',
        detail:
          'Households regularly move Madison ↔ Hinds, Rankin, or Yazoo County, or out-of-state on I-55. MDOT household goods Certificate of Public Convenience and Necessity authority alone does not authorize interstate delivery — verify FMCSA when any leg leaves Mississippi.',
      },
      MS_REG_BULLET,
    ],
  },
  zonesHeading: 'Madison County access zones',
  zonesIntro:
    'Plan by Ridgeland multi-unit and Highland Colony belts, City of Madison HOA growth, Gluckstadt north I-55 product, Canton county-edge stock, Reservoir west recreation edges, and US-51 arterial grids — access rules cluster by product more than ZIP alone. This is Madison County, MS north-metro — not Madison County AL.',
  zones: [
    {
      id: 'ridgeland-highland-colony',
      name: 'Ridgeland, Highland Colony & County Line multi-unit',
      shortName: 'Ridgeland / Highland Colony',
      neighborhoods: [
        'Ridgeland',
        'Highland Colony corridors',
        'County Line Road edges',
        'Old Agency corridors',
        'I-55 Ridgeland multi-unit belts',
        'Trace and recreation edges',
      ],
      housingTypes: 'Mid-rise multi-unit, townhomes, HOA SFH, retail-adjacent stock',
      challenges: [
        'Elevator reservations, building COIs, and multi-unit curb limits',
        'I-55 / County Line freeflow into Hinds / Jackson',
        'Mixed multi-unit rules across short distances',
      ],
      moverTips:
        'Book elevators and COIs early for mid-rise product. Prefer mid-week multi-unit starts. Price County Line and I-55 honestly for southbound Jackson pairs.',
      cityKeywords: [
        'ridgeland',
        'highland colony',
        'county line',
      ],
    },
    {
      id: 'city-of-madison-growth',
      name: 'City of Madison, HOA growth & school-calendar belts',
      shortName: 'Madison / HOA',
      neighborhoods: [
        'Madison',
        'Main Street edges',
        'Boaz-Kenna corridors',
        'Madison Avenue belts',
        'Northpark and growth pockets',
        'East Madison HOA edges',
      ],
      housingTypes: 'HOA SFH, townhomes, newer multi-family, gated product',
      challenges: [
        'HOA gate lists, truck-length limits, and timed windows',
        'US-51 / I-55 freeflow and longer empty miles vs Ridgeland multi-unit',
        'School-calendar summer peaks',
      ],
      moverTips:
        'Collect HOA packets and gate codes early. Confirm truck length rules. Price US-51 honestly for southbound Ridgeland pairs.',
      cityKeywords: [
        'madison',
        'madison ms',
        'city of madison',
      ],
    },
    {
      id: 'gluckstadt-north-i55',
      name: 'Gluckstadt, north I-55 growth & commercial-residential belts',
      shortName: 'Gluckstadt / north I-55',
      neighborhoods: [
        'Gluckstadt',
        'I-55 north commercial-residential edges',
        'MS-22 links',
        'Livingston edges',
        'North growth subdivision pockets',
        'Retail and warehouse edges',
      ],
      housingTypes: 'Newer HOA SFH, multi-family pockets, growth stock',
      challenges: [
        'I-55 / MS-22 freeflow',
        'HOA packets and longer empty miles vs Ridgeland core',
        'Industrial freeflow mixed with residential loads',
      ],
      moverTips:
        'Collect HOA packets early. Clarify Gluckstadt vs Madison addresses. Price I-55 portal time for southbound pairs.',
      cityKeywords: [
        'gluckstadt',
        'livingston',
        'madison',
      ],
    },
    {
      id: 'canton-north-edge',
      name: 'Canton, north county-edge & historic square stock',
      shortName: 'Canton / north edge',
      neighborhoods: [
        'Canton',
        'Courthouse square edges',
        'US-51 north corridors',
        'I-55 Canton approaches',
        'North Madison County ranch pockets',
        'Yazoo County approach edges',
      ],
      housingTypes: 'Character SFH, ranch stock, multi-unit pockets, acreage',
      challenges: [
        'Longer empty miles vs Ridgeland multi-unit core',
        'Square-edge curb and mixed driveway product',
        'US-51 / I-55 freeflow',
      ],
      moverTips:
        'Confirm Canton municipality on the estimate. Survey older stock carefully. Price empty miles for Ridgeland unload pairs.',
      cityKeywords: [
        'canton',
        'canton ms',
      ],
    },
    {
      id: 'reservoir-west',
      name: 'Ross Barnett Reservoir west edges & recreation belts',
      shortName: 'Reservoir west',
      neighborhoods: [
        'Reservoir west and north edges',
        'Natchez Trace approaches',
        'Lakeside recreation pockets',
        'East Ridgeland edges',
        'MS-43 links',
        'Waterfront and bluff stock',
      ],
      housingTypes: 'Lakeside SFH, HOA pockets, recreation-edge stock',
      challenges: [
        'Long carries, driveway pitch, and soft shoulders',
        'Seasonal recreation traffic',
        'Longer empty miles vs Highland Colony multi-unit',
      ],
      moverTips:
        'Photo driveway and gate access. Price empty miles for Ridgeland pairs. Clarify lakeside and unincorporated addresses.',
      cityKeywords: [
        'ridgeland',
        'reservoir',
        'madison county',
      ],
    },
    {
      id: 'us51-arterial',
      name: 'US-51 arterial grids & mid-county mixed stock',
      shortName: 'US-51 arterial',
      neighborhoods: [
        'US-51 corridors between Ridgeland and Madison',
        'Mid-county multi-unit pockets',
        'Older ranch and character stock',
        'School and church corridor edges',
        'Local north-metro grid connectors',
        'I-55 service road residential edges',
      ],
      housingTypes: 'Mixed SFH, multi-unit pockets, character and ranch stock',
      challenges: [
        'US-51 freeflow and signal density',
        'Mixed municipal rules across short distances',
        'Cross-zone empty miles common',
      ],
      moverTips:
        'Clarify Ridgeland vs Madison municipality on every estimate. Photo curb options. Price US-51 honestly at peak.',
      cityKeywords: [
        'ridgeland',
        'madison',
        'us 51',
      ],
    },
  ],
  costDrivers: {
    title: 'What drives Madison County moving costs',
    intro:
      'Access product, elevator/HOA admin, and I-55 / US-51 freeflow move the number more than packing skill alone — this is Madison County MS north-metro logistics, not Madison County AL Huntsville pricing and not Rankin east-metro defaults.',
    drivers: [
      {
        title: 'Elevator reservations, docks & Ridgeland COIs',
        detail:
          'Highland Colony and Ridgeland mid-rise product add labor and schedule risk before packing skill matters.',
      },
      {
        title: 'City of Madison HOA gates & truck-length rules',
        detail:
          'North growth packets rewrite jobs that look simple on a map.',
      },
      {
        title: 'I-55 · MS-22 · US-51 · local north-metro grid congestion',
        detail:
          'Cross-metro pairs burn portal-to-portal hours even when map miles look short.',
      },
      {
        title: 'Reservoir-edge long carries & driveway geometry',
        detail:
          'Lakeside and recreation stock add labor that Highland Colony optimism underprices.',
      },
      {
        title: 'Multi-county & interstate empty miles',
        detail:
          'Hinds, Rankin, Yazoo, and out-of-state destinations raise staging distance and authority complexity when leaving Madison County MS or Mississippi.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (simple access)',
        value: '$450–$1,850+',
        note: 'Higher with elevators, multi-unit peaks, or peak I-55 / County Line pairs',
      },
      {
        label: '2–3BR condo, duplex, or mid-size SFH',
        value: '$1,450–$4,400+',
        note: 'HOA, elevator, and stairs soft costs trend up',
      },
      {
        label: '3–4+ BR / gated / cross-zone',
        value: '$2,900–$9,200+',
        note: 'Madison gated moves and long I-55 / MS-22 pairs price highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$110–$195+/hr',
        note: 'Portal-to-portal; packing, HOA admin, and elevators scale up',
      },
    ],
  },
  seasonal: {
    title: 'When to schedule a Madison County move',
    intro:
      'Lease cycles, school calendars, summer heat and humidity, severe-storm season, and Reservoir recreation peaks reshape access and crew availability across the Ridgeland–Madison north-metro grid.',
    items: [
      {
        title: 'Best windows: mid-week early mornings',
        detail:
          'Tuesday–Thursday starts clear curb, ease multi-unit and elevator windows, and reduce I-55 / County Line pain. Avoid month-end Fridays when leases and HOA slots collide.',
      },
      {
        title: 'Peak season: late May–mid-September',
        detail:
          'Apartment turnover and family school calendars fill first — City of Madison and Ridgeland especially. Book 2–4 weeks ahead for peak weekends and HOA or elevator slots.',
      },
      {
        title: 'Severe-storm & tornado-season risk',
        detail:
          'Spring and early summer storms raise cancellation and staging risk. Prefer flexible dates, covered staging plans, and early starts when forecasts allow.',
      },
      {
        title: 'Summer heat, humidity & winter ice',
        detail:
          'June–August heat and humidity reshape outdoor labor; occasional ice disrupts I-55. Prefer early starts and weather contingency.',
      },
    ],
  },
  specialized: [
    {
      id: 'madison-ms-north-metro-hoa',
      title: 'Ridgeland–Madison north-metro, elevator & I-55 / US-51 logistics module',
      intro:
        'Madison County MS estimates fail more often on elevator packets, HOA gates, multi-unit curb, and freeway freeflow than on packing skill alone — north-metro product, not Madison County AL and not Rankin east-metro defaults.',
      bullets: [
        'Collect building COI, elevator reservations, and dock rules for Ridgeland mid-rise product.',
        'Collect HOA packets early for City of Madison growth product.',
        'Price portal-to-portal time for any pair that rides I-55, MS-22, or US-51 at peak.',
        'Photo driveway and curb options for Reservoir-edge stock.',
        'Clarify Ridgeland, Madison, Gluckstadt, Canton, and other municipal addresses on every estimate — and state “Madison County, Mississippi” when authority or destination could be confused with Alabama.',
        'For in-state jobs verify MDOT household goods Certificate of Public Convenience and Necessity pathways; verify FMCSA for any out-of-state leg. Do not apply Alabama APSC assumptions here.',
      ],
    },
    {
      id: 'not-madison-al-not-rankin-east',
      title: 'Not Madison County AL · not Rankin east-metro module',
      intro:
        'A single “Madison rate” or “Jackson metro rate” collapses when Madison County MS north-metro product is confused with Madison County Alabama Huntsville aerospace logistics or with Rankin Pearl–Brandon east-metro product.',
      bullets: [
        'Do not price Ridgeland elevators like Huntsville Research Park product or like Pearl US-80 multi-unit as interchangeable defaults.',
        'Keep Madison MS vs Hinds vs Rankin county lines clear on multi-address estimates — and never swap in Madison AL addresses or APSC authority language.',
        'Match Ridgeland lease peaks separately from City of Madison school-calendar waves.',
        'Treat out-of-state legs as interstate authority problems — MDOT household goods authority alone is not enough for interstate delivery.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Madison County, MS?',
    intro:
      'Use this as a practical fit checklist — schools, healthcare, housing character, and commute realism — then verify on district and hospital sites. No single ranking captures neighborhood fit. This is Madison County, Mississippi north-metro — not Madison County Alabama.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & education landscape',
        bullets: [
          {
            title: 'How districts work here',
            detail:
              'Madison County MS spans Madison County Schools and related municipal attendance patterns across Ridgeland, Madison, Gluckstadt, and Canton. Assignment is address-based — marketing neighborhood names do not guarantee a campus.',
          },
          {
            title: 'Choice, boundaries & enrollment pressure',
            detail:
              'Popular programs and boundary edges can be competitive. Confirm enrollment windows early when relocating mid-year.',
          },
          {
            title: 'Research sources',
            detail:
              'District boundary tools, Mississippi Department of Education data, and campus visits beat ranking screenshots alone. Do not use Alabama district tools for this market.',
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
              'North-metro campuses and short drives to UMMC, Baptist, St. Dominic, and other Jackson systems anchor care. Confirm insurance networks for your household.',
          },
          {
            title: 'What relocators should do',
            detail:
              'Map peak-hour drive times to preferred campuses — I-55 and County Line freeflow change “nearby” on paper. Transfer records early.',
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
              'Expect Ridgeland multi-unit and Highland Colony product; City of Madison HOA growth; Gluckstadt new-build belts; Canton character and ranch stock; Reservoir west edges.',
          },
          {
            title: 'Cost variation inside the county',
            detail:
              'Purchase prices and rents vary by city and product. Budget for HOA dues, newer-subdivision premiums, and commute costs into Jackson.',
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
            title: 'Ridgeland / Highland Colony multi-unit living',
            detail:
              'Suits people prioritizing amenities and I-55 access — with elevator, curb, and County Line freeflow tradeoffs on move day.',
          },
          {
            title: 'City of Madison / north growth belts',
            detail:
              'Fits buyers chasing newer product and schools — with HOA rules and longer empty miles to Ridgeland multi-unit core.',
          },
          {
            title: 'Gluckstadt / north I-55 living',
            detail:
              'Often appeals for new growth and MS-22 access — with longer pairs to County Line and Jackson cores.',
          },
          {
            title: 'Canton / north-edge living',
            detail:
              'Attracts households seeking square-town character and space — with longer empty miles to Ridgeland multi-unit belts.',
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
              'Professional services, healthcare, retail, education, and reverse commutes into Jackson concentrate demand across Madison County MS.',
          },
          {
            title: 'Commute realism',
            detail:
              'Peak I-55 and County Line freeflow is real — including Hinds reverse commutes. Test peak routes before choosing solely on rent or purchase price.',
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
              'Madison County MS stacks Ridgeland multi-unit cores, City of Madison growth, and Reservoir edges — different from Madison County AL Huntsville aerospace patterns, Rankin east-metro product, and downtown Hinds capital alone.',
          },
          {
            title: 'Climate',
            detail:
              'Humid subtropical climate with hot summers, severe-storm and tornado risk, and mild winters with occasional ice. Plan outdoor staging, heat, humidity, and storm contingency as part of move-in.',
          },
          {
            title: 'Culture and pace',
            detail:
              'Visit at peak and off-peak times when deciding — school calendars, Reservoir recreation days, and storm season reshape daily rhythm.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Madison County, MS resources',
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify MDOT household goods carrier authority for in-state moves and FMCSA for interstate legs before deposits. This is Madison County, Mississippi — not Madison County, Alabama.',
    items: [
      {
        label: 'Madison County, MS — official site',
        href: 'https://www.madison-co.com/',
        external: true,
        note: 'County services & property context — Mississippi',
      },
      {
        label: 'City of Ridgeland',
        href: 'https://www.ridgelandms.org/',
        external: true,
        note: 'North-metro multi-unit municipality context',
      },
      {
        label: 'City of Madison, MS',
        href: 'https://www.madisonthecity.com/',
        external: true,
        note: 'HOA growth municipality context — not Madison AL',
      },
      {
        label: 'City of Canton',
        href: 'https://www.cityofcantonms.com/',
        external: true,
        note: 'North-edge municipality context',
      },
      {
        label: 'MDOT — traveler / traffic resources',
        href: 'https://mdot.ms.gov/',
        external: true,
        note: 'I-55 / MS-22 / US-51 before load windows',
      },
    ],
  },
  directoryHint:
    'Prefer crews with elevator/COI experience for Ridgeland–Highland Colony multi-unit; HOA gate fluency for City of Madison growth; honest I-55 · MS-22 · US-51 · local north-metro grid timing for cross-zone pairs. Confirm Madison County, Mississippi (not Madison County AL). Verify MDOT household goods Certificate of Public Convenience and Necessity pathways for intrastate moves (even within city limits) and FMCSA for interstate legs before deposits — not Alabama APSC.',
  lastReviewed: '2026-07-24',
});

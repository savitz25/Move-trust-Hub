import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeMsPack,
  MS_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/mississippi/ms-shared';

/**
 * Rankin County, MS — Pearl / Brandon east-metro.
 * Must differ from Madison (north-metro Ridgeland product).
 */
export const rankinCountyMsIntelligence: CountyIntelligencePack = finalizeMsPack({
  countySlug: 'rankin',
  hubTitle: 'Rankin County Moving Intelligence Hub',
  eyebrow:
    'Rankin County · Pearl / Brandon east-metro & I-20 / MS-25 logistics',
  h1: 'Moving in Rankin County: Pearl Access, Brandon Growth & I-20 / East-Metro Logistics',
  heroOpener:
    'Rankin County is Jackson’s east-metro engine — Pearl, Brandon, Flowood, and Richland growth east of the Pearl River — not Madison / Ridgeland north-metro product, not Hinds / Jackson the city downtown alone, and not Gulf Coast coastal stock. Expect Pearl multi-unit and retail-corridor product, Brandon HOA growth and school-calendar peaks, Flowood medical and mid-rise belts, Richland and south Rankin ranch stock, Reservoir and northeast recreation edges, and I-20 / US-80 / MS-25 freeflow that rewrites “local” estimates. A Flowood elevator job, a Brandon gated driveway, a Pearl apartment curb stack, and a Pelahatchie rural-edge long carry do not share truck access or crew skill. Healthcare and east-metro reverse-commute waves are real inputs. This hub is for people moving in Rankin County — Pearl / Brandon east-metro — not Madison north-metro and not downtown Hinds capital product alone.',
  heroCredibility:
    'MDOT household goods Certificate of Public Convenience and Necessity for intrastate · FMCSA for interstate · Pearl–Brandon east-metro & I-20 / MS-25 logistics awareness · Curated listings',
  majorCorridors: 'I-20 · US-80 · MS-25 · local east-metro grid',
  whatMakesDifferent: {
    title: 'What makes moving in Rankin County different',
    intro:
      'These are Rankin / Pearl–Brandon east-metro realities — I-20 freeflow, Flowood medical multi-unit, Brandon HOAs, and Reservoir edges — not Madison / Ridgeland north-I-55 product, not downtown Jackson capital elevators alone, and not Gulf Coast defaults.',
    bullets: [
      {
        title: 'East-metro Rankin is not Madison north-metro',
        detail:
          'Ignore Ridgeland–Highland Colony and I-55 north templates as the default. Rankin stacks Pearl River-east product, I-20 / MS-25 freeflow, Brandon school-calendar HOAs, and Flowood medical belts that Madison north-metro scripts underprice. Match estimates to Pearl, Brandon, Flowood, and Rankin addresses.',
      },
      {
        title: 'Pearl multi-unit and retail corridors rewrite labor',
        detail:
          'Apartment turnover, tight curb near commercial strips, and I-20 approach congestion dominate many jobs. A Brandon cul-de-sac does not share that stack.',
      },
      {
        title: 'Brandon growth is HOA- and school-calendar driven',
        detail:
          'Gate lists, truck-length limits, and summer family peaks rewrite jobs that look suburban-simple on paper. Same-county Richland ranch product does not share that packet stack.',
      },
      {
        title: 'Flowood medical and mid-rise product differs from Reservoir edges',
        detail:
          'Elevator reservations, building COIs, and medical-shift freeflow dominate Flowood jobs. Lakefront and recreation-edge driveways fail estimates differently.',
      },
      {
        title: 'I-20, US-80, MS-25, and the local east-metro grid burn portal time',
        detail:
          'Pearl ↔ Brandon, Flowood ↔ downtown Jackson, or Richland ↔ Reservoir pairs look local and still burn 25–60+ minutes at peak. Price portal-to-portal honestly.',
      },
      {
        title: 'Multi-county capital-metro and interstate pairs are routine',
        detail:
          'Households regularly move Rankin ↔ Hinds, Madison, or Scott County, or out-of-state on I-20. MDOT household goods Certificate of Public Convenience and Necessity authority alone does not authorize interstate delivery — verify FMCSA when any leg leaves Mississippi.',
      },
      MS_REG_BULLET,
    ],
  },
  zonesHeading: 'Rankin County access zones',
  zonesIntro:
    'Plan by Pearl multi-unit and retail corridors, Brandon HOA growth, Flowood medical mid-rise belts, Richland south ranch stock, Reservoir / northeast recreation edges, and east I-20 arterial growth — access rules cluster by product more than ZIP alone. This is Pearl / Brandon east-metro, not Madison north-metro.',
  zones: [
    {
      id: 'pearl-core',
      name: 'Pearl core, multi-unit & I-20 / US-80 retail corridors',
      shortName: 'Pearl core',
      neighborhoods: [
        'Pearl',
        'US-80 corridors',
        'I-20 Pearl multi-unit belts',
        'Airport approach edges',
        'Riverwind edges',
        'Crossgates approach edges',
      ],
      housingTypes: 'Multi-family, townhomes, HOA SFH, retail-adjacent stock',
      challenges: [
        'Apartment turnover and curb limits near commercial strips',
        'I-20 / US-80 freeflow into Hinds / Jackson',
        'Mixed multi-unit rules across short distances',
      ],
      moverTips:
        'Prefer mid-week multi-unit starts. Photo curb options. Price I-20 honestly for westbound Jackson unload pairs.',
      cityKeywords: [
        'pearl',
        'pearl ms',
      ],
    },
    {
      id: 'brandon-growth',
      name: 'Brandon, HOA growth & school-calendar belts',
      shortName: 'Brandon / HOA',
      neighborhoods: [
        'Brandon',
        'MS-18 corridors',
        'Spillway Road edges',
        'Crossgates edges',
        'Castlewoods edges',
        'East Brandon growth pockets',
      ],
      housingTypes: 'HOA SFH, townhomes, newer multi-family, gated product',
      challenges: [
        'HOA gate lists, truck-length limits, and timed windows',
        'MS-18 / I-20 freeflow and longer empty miles vs Pearl core',
        'School-calendar summer peaks',
      ],
      moverTips:
        'Collect HOA packets and gate codes early. Confirm truck length rules. Price MS-18 and I-20 honestly for westbound pairs.',
      cityKeywords: [
        'brandon',
        'crossgates',
        'castlewoods',
      ],
    },
    {
      id: 'flowood-medical',
      name: 'Flowood, medical mid-rise & Lakeland Drive belts',
      shortName: 'Flowood / medical',
      neighborhoods: [
        'Flowood',
        'Lakeland Drive corridors',
        'Medical campus edges',
        'Dogwood Festival edges',
        'Airport Road corridors',
        'Reservoir approach west edges',
      ],
      housingTypes: 'Mid-rise multi-unit, HOA SFH, medical-adjacent stock',
      challenges: [
        'Elevator reservations, building COIs, and medical-shift freeflow',
        'Lakeland Drive / I-55 approach congestion toward Madison',
        'Cross-county pairs into Hinds and Madison',
      ],
      moverTips:
        'Book elevators and COIs early for mid-rise product. Avoid peak medical windows when flexible. Clarify Flowood vs Pearl addresses.',
      cityKeywords: [
        'flowood',
        'lakeland',
      ],
    },
    {
      id: 'richland-south',
      name: 'Richland, south Rankin ranch & US-49 links',
      shortName: 'Richland / south',
      neighborhoods: [
        'Richland',
        'US-49 links',
        'South Pearl edges',
        'Florence edges',
        'Star edges',
        'South Rankin ranch pockets',
      ],
      housingTypes: 'Ranch and two-story SFH, multi-unit pockets, mixed older stock',
      challenges: [
        'US-49 / I-20 freeflow',
        'Longer carries and mixed driveway geometry',
        'Cross-zone empty miles common',
      ],
      moverTips:
        'Clarify Richland, Florence, and Pearl addresses. Survey older stock carefully. Price US-49 portal time honestly.',
      cityKeywords: [
        'richland',
        'florence',
        'star',
      ],
    },
    {
      id: 'reservoir-northeast',
      name: 'Ross Barnett Reservoir edges, northeast recreation & MS-25 belts',
      shortName: 'Reservoir / NE',
      neighborhoods: [
        'Reservoir east and south edges',
        'MS-25 corridors',
        'Pelahatchie edges',
        'Pisgah edges',
        'Lakeside and recreation pockets',
        'Northeast Rankin acreage',
      ],
      housingTypes: 'Lakeside SFH, acreage, HOA pockets, recreation-edge stock',
      challenges: [
        'Long carries, soft shoulders, and driveway pitch',
        'MS-25 freeflow and longer empty miles vs Pearl',
        'Seasonal recreation traffic',
      ],
      moverTips:
        'Photo driveway and gate access. Price MS-25 empty miles for Pearl unload pairs. Clarify unincorporated and lakeside addresses.',
      cityKeywords: [
        'pelahatchie',
        'reservoir',
        'rankin county',
      ],
    },
    {
      id: 'east-i20-arterial',
      name: 'East I-20 arterial growth & county-edge stock',
      shortName: 'East I-20',
      neighborhoods: [
        'I-20 east commercial-residential edges',
        'Puckett edges',
        'Johns edges',
        'East Rankin acreage',
        'US-80 east belts',
        'Scott County approach edges',
      ],
      housingTypes: 'Ranch SFH, acreage, newer subdivision pockets',
      challenges: [
        'Longer empty miles vs Flowood medical core',
        'I-20 freeflow',
        'Gate and driveway geometry on acreage product',
      ],
      moverTips:
        'Survey gate and driveway access carefully. Price empty miles for Brandon and Pearl pairs. Clarify rural-edge addresses.',
      cityKeywords: [
        'brandon',
        'puckett',
        'rankin county',
      ],
    },
  ],
  costDrivers: {
    title: 'What drives Rankin County moving costs',
    intro:
      'Access product, HOA/elevator admin, and I-20 / MS-25 freeflow move the number more than packing skill alone — this is Pearl / Brandon east-metro logistics, not Madison north-metro pricing and not downtown Hinds capital defaults alone.',
    drivers: [
      {
        title: 'Multi-unit turnover & Pearl retail-corridor curb',
        detail:
          'Apartment product and commercial-adjacent staging add labor and schedule risk before packing skill matters.',
      },
      {
        title: 'Brandon HOA gates & truck-length rules',
        detail:
          'East growth packets rewrite jobs that look simple on a map.',
      },
      {
        title: 'Flowood elevators, COIs & medical freeflow',
        detail:
          'Mid-rise and medical-adjacent product adds schedule risk that ranch stock never sees.',
      },
      {
        title: 'I-20 · US-80 · MS-25 · local east-metro grid congestion',
        detail:
          'Cross-metro pairs burn portal-to-portal hours even when map miles look short.',
      },
      {
        title: 'Multi-county & interstate empty miles',
        detail:
          'Hinds, Madison, Scott, and out-of-state destinations raise staging distance and authority complexity when leaving Rankin County or Mississippi.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (simple access)',
        value: '$450–$1,800+',
        note: 'Higher with multi-unit peaks or peak I-20 / Lakeland pairs',
      },
      {
        label: '2–3BR condo, duplex, or mid-size SFH',
        value: '$1,400–$4,200+',
        note: 'HOA, elevator, and stairs soft costs trend up',
      },
      {
        label: '3–4+ BR / gated / cross-zone',
        value: '$2,800–$9,000+',
        note: 'Brandon gated moves and long MS-25 / I-20 pairs price highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$110–$190+/hr',
        note: 'Portal-to-portal; packing, HOA admin, and elevators scale up',
      },
    ],
  },
  seasonal: {
    title: 'When to schedule a Rankin County move',
    intro:
      'Lease cycles, school calendars, summer heat and humidity, severe-storm season, and Reservoir recreation peaks reshape access and crew availability across the Pearl–Brandon east-metro grid.',
    items: [
      {
        title: 'Best windows: mid-week early mornings',
        detail:
          'Tuesday–Thursday starts clear curb, ease multi-unit and medical windows, and reduce I-20 / MS-25 pain. Avoid month-end Fridays when leases and HOA slots collide.',
      },
      {
        title: 'Peak season: late May–mid-September',
        detail:
          'Apartment turnover and family school calendars fill first — Brandon and Flowood especially. Book 2–4 weeks ahead for peak weekends and HOA or elevator slots.',
      },
      {
        title: 'Severe-storm & tornado-season risk',
        detail:
          'Spring and early summer storms raise cancellation and staging risk. Prefer flexible dates, covered staging plans, and early starts when forecasts allow.',
      },
      {
        title: 'Summer heat, humidity & winter ice',
        detail:
          'June–August heat and humidity reshape outdoor labor; occasional ice disrupts I-20. Prefer early starts and weather contingency.',
      },
    ],
  },
  specialized: [
    {
      id: 'rankin-east-metro-hoa',
      title: 'Pearl–Brandon east-metro, Flowood elevator & I-20 / MS-25 logistics module',
      intro:
        'Rankin County estimates fail more often on multi-unit curb, HOA gates, elevator packets, and freeway freeflow than on packing skill alone — east-metro product, not Madison north-metro defaults.',
      bullets: [
        'Photo multi-unit curb options for Pearl retail-corridor stock.',
        'Collect HOA packets early for Brandon growth product.',
        'Collect building COI and elevator rules for Flowood mid-rise jobs.',
        'Price portal-to-portal time for any pair that rides I-20, US-80, or MS-25 at peak.',
        'Clarify Pearl, Brandon, Flowood, Richland, Florence, and other municipal addresses on every estimate.',
        'For in-state jobs verify MDOT household goods Certificate of Public Convenience and Necessity pathways; verify FMCSA for any out-of-state leg.',
      ],
    },
    {
      id: 'not-madison-north-not-hinds-downtown-only',
      title: 'Not Madison north-metro · not Hinds downtown-only module',
      intro:
        'A single “Jackson metro rate” collapses when Rankin east-metro product is confused with Madison / Ridgeland north-I-55 logistics or with Hinds downtown capital elevators alone.',
      bullets: [
        'Do not price Brandon HOAs like Madison / Ridgeland Highland Colony product or like downtown Jackson docks as interchangeable defaults.',
        'Keep Rankin vs Hinds vs Madison county lines clear on multi-address estimates.',
        'Match Pearl lease peaks separately from Brandon school-calendar waves.',
        'Treat out-of-state legs as interstate authority problems — MDOT household goods authority alone is not enough for interstate delivery.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Rankin County?',
    intro:
      'Use this as a practical fit checklist — schools, healthcare, housing character, and commute realism — then verify on district and hospital sites. No single ranking captures neighborhood fit. This is Pearl / Brandon east-metro, not Madison north-metro.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & education landscape',
        bullets: [
          {
            title: 'How districts work here',
            detail:
              'Rankin County spans Rankin County School District and related municipal attendance patterns across Pearl, Brandon, Flowood, and Richland. Assignment is address-based — marketing neighborhood names do not guarantee a campus.',
          },
          {
            title: 'Choice, boundaries & enrollment pressure',
            detail:
              'Popular programs and boundary edges can be competitive. Confirm enrollment windows early when relocating mid-year.',
          },
          {
            title: 'Research sources',
            detail:
              'District boundary tools, Mississippi Department of Education data, and campus visits beat ranking screenshots alone.',
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
              'Flowood and Rankin medical campuses plus short drives to UMMC and other Hinds systems anchor care. Confirm insurance networks for your household.',
          },
          {
            title: 'What relocators should do',
            detail:
              'Map peak-hour drive times to preferred campuses — I-20, Lakeland Drive, and MS-25 freeflow change “nearby” on paper. Transfer records early.',
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
              'Expect Pearl multi-unit and HOA SFH; Brandon growth product; Flowood medical multi-unit; Richland ranch stock; Reservoir and east acreage.',
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
            title: 'Pearl multi-unit / retail-corridor living',
            detail:
              'Suits people prioritizing I-20 access and amenities — with multi-unit curb and freeflow tradeoffs on move day.',
          },
          {
            title: 'Brandon / east growth belts',
            detail:
              'Fits buyers chasing newer product and schools — with HOA rules and longer empty miles to Pearl core.',
          },
          {
            title: 'Flowood medical / mid-rise living',
            detail:
              'Often appeals for medical-campus proximity — with elevator, COI, and Lakeland Drive freeflow constraints.',
          },
          {
            title: 'Richland / south ranch living',
            detail:
              'Attracts households seeking relative value and US-49 access — with older stock logistics and cross-zone empty miles.',
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
              'Healthcare, retail and distribution, education, professional services, and reverse commutes into Jackson concentrate demand across Rankin County.',
          },
          {
            title: 'Commute realism',
            detail:
              'Peak I-20 and MS-25 freeflow is real — including Hinds reverse commutes. Test peak routes before choosing solely on rent or purchase price.',
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
              'Rankin County stacks Pearl–Brandon east-metro suburbs, Flowood medical belts, and Reservoir edges — different from Madison north-metro product and from downtown Hinds capital patterns alone.',
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
    title: 'Useful Rankin County resources',
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify MDOT household goods carrier authority for in-state moves and FMCSA for interstate legs before deposits.',
    items: [
      {
        label: 'Rankin County — official site',
        href: 'https://www.rankincounty.org/',
        external: true,
        note: 'County services & property context',
      },
      {
        label: 'City of Pearl',
        href: 'https://www.cityofpearl.com/',
        external: true,
        note: 'East-metro core municipality context',
      },
      {
        label: 'City of Brandon',
        href: 'https://www.brandonms.org/',
        external: true,
        note: 'HOA growth municipality context',
      },
      {
        label: 'City of Flowood',
        href: 'https://www.flowoodms.com/',
        external: true,
        note: 'Medical mid-rise municipality context',
      },
      {
        label: 'MDOT — traveler / traffic resources',
        href: 'https://mdot.ms.gov/',
        external: true,
        note: 'I-20 / US-80 / MS-25 before load windows',
      },
    ],
  },
  directoryHint:
    'Prefer crews with multi-unit curb fluency for Pearl retail-corridor product; HOA gate fluency for Brandon growth; elevator/COI fluency for Flowood medical mid-rise; honest I-20 · US-80 · MS-25 · local east-metro grid timing for cross-zone pairs. Verify MDOT household goods Certificate of Public Convenience and Necessity pathways for intrastate moves (even within city limits) and FMCSA for interstate legs before deposits.',
  lastReviewed: '2026-07-24',
});

import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeMsPack,
  MS_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/mississippi/ms-shared';

/**
 * Hinds County, MS — Jackson THE CITY / capital metro core.
 * Hinds carries Jackson the city — not Gulf Coast, not Rankin/Madison suburb-only scripts.
 */
export const hindsCountyMsIntelligence: CountyIntelligencePack = finalizeMsPack({
  countySlug: 'hinds',
  hubTitle: 'Hinds County Moving Intelligence Hub',
  eyebrow:
    'Hinds County · Jackson the city, capital metro core & I-55 / I-20 logistics',
  h1: 'Moving in Hinds County: Jackson the City, Capital Grids & I-55 / I-20 Logistics',
  heroOpener:
    'Hinds County is where Jackson the city lives — Mississippi’s capital metro core, not a Gulfport–Biloxi coastal rename, not a Pearl / Brandon east-metro clone, and not a Madison / Ridgeland north-suburb script. Expect downtown and Farish Street multi-unit, Fondren and Belhaven character grids, Byram and south Hinds growth stock, Clinton and west arterial product, and I-55 / I-20 / US-49 / US-51 freeflow that rewrites “local” estimates. A capitol-adjacent dock slot, a Belhaven stair carry, a Byram HOA driveway, and a west Jackson multi-family curb do not share truck access or crew skill. State-government, healthcare, and university lease waves are real inputs. This hub is for people moving in Hinds County — Jackson the city capital core — not Rankin, Madison, or Mississippi Gulf Coast product.',
  heroCredibility:
    'MDOT household goods Certificate of Public Convenience and Necessity for intrastate · FMCSA for interstate · Jackson capital access & I-55 / I-20 logistics awareness · Curated listings',
  majorCorridors: 'I-55 · I-20 · US-49 · US-51 · local Jackson grid',
  whatMakesDifferent: {
    title: 'What makes moving in Hinds County different',
    intro:
      'These are Hinds / Jackson the city capital-core realities — downtown elevators, Fondren–Belhaven stairs, Byram growth, and I-55 / I-20 freeflow — not Gulf Coast beach product, not Rankin Pearl–Brandon east-metro alone, and not Madison north-metro HOAs alone.',
    bullets: [
      {
        title: 'Hinds carries Jackson the city — capital metro core, not a suburb rename',
        detail:
          'Ignore Gulfport boardwalk assumptions and Rankin cul-de-sac defaults as the whole story. Hinds stacks state capitol density, downtown multi-unit, Fondren character product, and cross-town freeflow that east- and north-metro scripts underprice. Match estimates to Hinds / Jackson city addresses and MDOT household goods authority.',
      },
      {
        title: 'Downtown and near-capitol vertical product rewrite labor',
        detail:
          'Elevator reservations, building COIs, dock slots, and scarce curb dominate core jobs. A Byram ranch or Clinton HOA lot does not share that logistics stack.',
      },
      {
        title: 'Fondren, Belhaven, and midtown character grids underprice flat-rate optimism',
        detail:
          'Walk-ups, older interiors, tight residential curb, and tree-lined carries fail estimates more often than packing skill alone. Same-county south growth product does not share that stair stack.',
      },
      {
        title: 'Byram, Clinton, and west arterial stock differ from downtown towers',
        detail:
          'HOA packets, longer empty miles, and mixed multi-unit rewrite jobs that look suburban-simple on paper. Capitol-area dock rules do not apply one-for-one.',
      },
      {
        title: 'I-55, I-20, US-49, US-51, and the local Jackson grid burn portal time',
        detail:
          'Downtown ↔ Byram, Fondren ↔ Clinton, or west Jackson ↔ Pearl-edge pairs look local and still burn 25–60+ minutes at peak. Price portal-to-portal honestly.',
      },
      {
        title: 'Multi-county capital-metro and interstate pairs are routine',
        detail:
          'Households regularly move Hinds ↔ Rankin, Madison, or Warren County, or out-of-state on I-55 / I-20. MDOT household goods Certificate of Public Convenience and Necessity authority alone does not authorize interstate delivery — verify FMCSA when any leg leaves Mississippi.',
      },
      MS_REG_BULLET,
    ],
  },
  zonesHeading: 'Hinds County access zones',
  zonesIntro:
    'Plan by downtown–capitol vertical product, Fondren–Belhaven character grids, south Byram growth, Clinton–west arterial belts, and north / medical-corridor multi-unit — access rules cluster by product more than ZIP alone. This is Jackson the city capital core.',
  zones: [
    {
      id: 'downtown-capitol-jackson',
      name: 'Downtown Jackson, capitol corridors & core multi-unit',
      shortName: 'Downtown / capitol',
      neighborhoods: [
        'Downtown Jackson',
        'Capitol complex edges',
        'Farish Street edges',
        'Smith Park corridors',
        'Government Street edges',
        'I-55 / I-20 core approaches',
      ],
      housingTypes: 'Mid-rise multifamily, loft conversions, older multi-unit, limited high-rise',
      challenges: [
        'Elevator reservations, dock slots, and building COIs',
        'Limited legal curb and event-day freeflow',
        'I-55 / I-20 approach congestion',
      ],
      moverTips:
        'Book elevators and COIs in writing before the crew day. Prefer mid-week early freight windows. Photo dock or curb staging options.',
      cityKeywords: [
        'jackson',
        'downtown jackson',
        'jackson ms',
        'capitol',
      ],
    },
    {
      id: 'fondren-belhaven',
      name: 'Fondren, Belhaven & midtown character grids',
      shortName: 'Fondren / Belhaven',
      neighborhoods: [
        'Fondren',
        'Belhaven',
        'Belhaven Heights edges',
        'Midtown Jackson',
        'Fortification Street corridors',
        'State Street corridors',
      ],
      housingTypes: 'Walk-up multifamily, character SFH, duplexes, limited elevators',
      challenges: [
        'Multi-flight stairs and scarce truck length',
        'Tight residential curb and restaurant-corridor freeflow',
        'Tree-lined carries and older interiors',
      ],
      moverTips:
        'Survey stair counts with photos. Prefer mid-week starts near corridor peaks. Inventory basements and porches carefully.',
      cityKeywords: [
        'fondren',
        'belhaven',
        'jackson',
        'midtown jackson',
      ],
    },
    {
      id: 'byram-south-hinds',
      name: 'Byram, south Hinds growth & US-51 south belts',
      shortName: 'Byram / south',
      neighborhoods: [
        'Byram',
        'South Jackson corridors',
        'Terry edges',
        'US-51 south belts',
        'I-55 south commercial-residential edges',
        'Crystal Springs approach edges',
      ],
      housingTypes: 'HOA SFH, ranch and two-story stock, multi-family pockets',
      challenges: [
        'I-55 / US-51 freeflow and longer empty miles vs downtown',
        'HOA gate lists and truck-length limits where present',
        'School-calendar summer peaks',
      ],
      moverTips:
        'Collect HOA packets early. Price I-55 honestly for northbound unload pairs. Clarify Byram vs Jackson city addresses.',
      cityKeywords: [
        'byram',
        'jackson',
        'terry',
      ],
    },
    {
      id: 'clinton-west',
      name: 'Clinton, west Hinds arterial & I-20 west belts',
      shortName: 'Clinton / west',
      neighborhoods: [
        'Clinton',
        'West Jackson corridors',
        'I-20 west belts',
        'US-80 edges',
        'Mississippi College edges',
        'Springridge corridors',
      ],
      housingTypes: 'HOA SFH, multi-family, ranch and character stock',
      challenges: [
        'I-20 / US-80 freeflow',
        'Municipal mix across short distances',
        'Cross-zone empty miles common',
      ],
      moverTips:
        'Confirm Clinton vs Jackson municipality on the estimate. Photo driveway and curb options. Price I-20 honestly for eastbound pairs.',
      cityKeywords: [
        'clinton',
        'jackson',
        'west jackson',
      ],
    },
    {
      id: 'north-medical-corridor',
      name: 'North Jackson medical corridor & I-55 multi-unit',
      shortName: 'North / medical',
      neighborhoods: [
        'North Jackson medical edges',
        'I-55 north multi-unit belts',
        'County Line Road approaches',
        'Lakeland Drive edges toward Rankin',
        'Ridgewood corridors',
        'Gluckstadt approach edges',
      ],
      housingTypes: 'Multi-family, mid-rise pockets, HOA SFH, medical-adjacent stock',
      challenges: [
        'I-55 / County Line freeflow into Madison County',
        'Multi-unit turnover and curb limits',
        'Medical-shift and lease peaks',
      ],
      moverTips:
        'Prefer mid-week multi-unit starts. Price County Line and I-55 freeflow for Madison unload pairs. Collect building rules early.',
      cityKeywords: [
        'jackson',
        'north jackson',
        'ridgewood',
      ],
    },
    {
      id: 'southwest-jackson-grid',
      name: 'Southwest Jackson residential grids & US-49 links',
      shortName: 'SW Jackson / US-49',
      neighborhoods: [
        'Southwest Jackson corridors',
        'US-49 links',
        'Raymond edges',
        'Bolton edges',
        'Older ranch and multi-unit pockets',
        'I-20 southwest approaches',
      ],
      housingTypes: 'Ranch and split-level SFH, multi-unit, mixed older stock',
      challenges: [
        'US-49 / I-20 freeflow',
        'Longer carries and mixed driveway geometry',
        'Cross-county pairs toward Warren / Vicksburg corridors',
      ],
      moverTips:
        'Survey older stock carefully. Clarify Raymond and rural-edge addresses. Price US-49 and I-20 portal time honestly.',
      cityKeywords: [
        'jackson',
        'raymond',
        'bolton',
      ],
    },
  ],
  costDrivers: {
    title: 'What drives Hinds County moving costs',
    intro:
      'Access product, elevator/HOA admin, and I-55 / I-20 freeflow move the number more than packing skill alone — this is Jackson the city capital logistics, not Gulf Coast coastal pricing and not Rankin or Madison suburb-only defaults.',
    drivers: [
      {
        title: 'Elevator reservations, docks & building COIs',
        detail:
          'Downtown and capitol-adjacent vertical product add labor and schedule risk before packing skill matters.',
      },
      {
        title: 'Walk-up stairs, porches & Fondren–Belhaven curb',
        detail:
          'Midtown character stock adds flight counts that flat-rate optimism underprices.',
      },
      {
        title: 'I-55 · I-20 · US-49 · US-51 · local Jackson grid congestion',
        detail:
          'Cross-metro pairs burn portal-to-portal hours even when map miles look short.',
      },
      {
        title: 'Byram & Clinton HOA gates',
        detail:
          'South and west packets rewrite jobs that look simple on a map.',
      },
      {
        title: 'Multi-county & interstate empty miles',
        detail:
          'Rankin, Madison, Warren, and out-of-state destinations raise staging distance and authority complexity when leaving Hinds County or Mississippi.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (simple access)',
        value: '$450–$1,800+',
        note: 'Higher with elevators, walk-ups, or peak I-55 / I-20 pairs',
      },
      {
        label: '2–3BR condo, duplex, or mid-size SFH',
        value: '$1,400–$4,200+',
        note: 'Stairs, COI, and HOA soft costs trend up',
      },
      {
        label: '3–4+ BR / high-rise / cross-zone',
        value: '$2,800–$9,000+',
        note: 'Tower moves and long I-55 / I-20 pairs price highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$110–$190+/hr',
        note: 'Portal-to-portal; packing, COI admin, and stairs scale up',
      },
    ],
  },
  seasonal: {
    title: 'When to schedule a Hinds County move',
    intro:
      'Lease cycles, school calendars, summer heat and humidity, severe-storm season, and occasional winter ice reshape access and crew availability across the Jackson capital grid.',
    items: [
      {
        title: 'Best windows: mid-week early mornings',
        detail:
          'Tuesday–Thursday starts clear curb, ease downtown freight windows, and reduce I-55 / I-20 pain. Avoid month-end Fridays when leases and elevators collide.',
      },
      {
        title: 'Peak season: late May–mid-September',
        detail:
          'Apartment turnover, state-government transfers, and family school calendars fill first. Book 2–4 weeks ahead for peak weekends and elevator or HOA slots.',
      },
      {
        title: 'Severe-storm & tornado-season risk',
        detail:
          'Spring and early summer storms raise cancellation and staging risk. Prefer flexible dates, covered staging plans, and early starts when forecasts allow.',
      },
      {
        title: 'Summer heat, humidity & winter ice',
        detail:
          'June–August heat and humidity reshape outdoor labor; freeze events are less frequent but still disrupt I-55 / I-20. Prefer early starts and weather contingency on older stock.',
      },
    ],
  },
  specialized: [
    {
      id: 'hinds-jackson-city-elevator-grid',
      title: 'Jackson the city elevator, character-grid & I-55 / I-20 logistics module',
      intro:
        'Hinds County estimates fail more often on stair surveys, elevator packets, HOA gates, and freeway freeflow than on packing skill alone — capital-core product, not suburb-only defaults.',
      bullets: [
        'Collect building COI, elevator reservations, and dock rules before the survey is final.',
        'Photo stair counts, curb options, and porch access for Fondren, Belhaven, and midtown stock.',
        'Price portal-to-portal time for any pair that rides I-55, I-20, US-49, or US-51 at peak.',
        'Collect HOA packets early for Byram and Clinton growth product.',
        'Clarify Jackson city, Byram, Clinton, and other municipal addresses on every estimate.',
        'For in-state jobs verify MDOT household goods Certificate of Public Convenience and Necessity pathways; verify FMCSA for any out-of-state leg.',
      ],
    },
    {
      id: 'not-gulf-coast-not-rankin-madison-only',
      title: 'Not Gulf Coast · not Rankin / Madison suburb-only module',
      intro:
        'A single “Jackson metro rate” collapses when Hinds capital-core product is confused with Mississippi Gulf Coast logistics or with Rankin Pearl–Brandon / Madison Ridgeland suburb product alone.',
      bullets: [
        'Do not price downtown Jackson elevators like Ocean Springs coastal stock or like Madison gated cul-de-sacs as interchangeable defaults.',
        'Keep Hinds vs Rankin vs Madison county lines clear on multi-address estimates.',
        'Match capitol lease peaks separately from Byram school-calendar waves.',
        'Treat out-of-state legs as interstate authority problems — MDOT household goods authority alone is not enough for interstate delivery.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Hinds County?',
    intro:
      'Use this as a practical fit checklist — schools, healthcare, housing character, and commute realism — then verify on district and hospital sites. No single ranking captures neighborhood fit. This is Jackson the city capital metro, not coastal Mississippi.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & education landscape',
        bullets: [
          {
            title: 'How districts work here',
            detail:
              'Hinds County spans Jackson Public Schools plus Clinton, Hinds County, Byram, and other systems. Assignment is address-based — marketing neighborhood names do not guarantee a campus.',
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
              'University of Mississippi Medical Center (UMMC), Baptist, St. Dominic, and specialty campuses anchor care across Hinds County. Confirm insurance networks for your household.',
          },
          {
            title: 'What relocators should do',
            detail:
              'Map peak-hour drive times to preferred campuses — I-55, I-20, and County Line freeflow change “nearby” on paper. Transfer records early.',
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
              'Expect downtown and capitol multi-unit; Fondren–Belhaven character SFH and walk-ups; Byram and Clinton HOA growth; north medical-corridor multi-family; southwest ranch stock.',
          },
          {
            title: 'Cost variation inside the county',
            detail:
              'Purchase prices and rents vary by city and product. Budget for condo/HOA dues, older-building repair risk, and parking where relevant.',
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
            title: 'Downtown / capitol urban lifestyle',
            detail:
              'Suits people prioritizing walkability to government and amenities — with elevator, parking, and event-day tradeoffs on move day.',
          },
          {
            title: 'Fondren / Belhaven character living',
            detail:
              'Often appeals for neighborhood feel — with stairs, curb limits, and denser staging constraints.',
          },
          {
            title: 'Byram / south growth belts',
            detail:
              'Fits buyers chasing newer product and schools — with HOA rules and longer empty miles to the core.',
          },
          {
            title: 'Clinton / west arterial living',
            detail:
              'Attracts households seeking west access and school options — with I-20 freeflow and municipal rule mix.',
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
              'State government, healthcare systems (including UMMC), education, professional services, and logistics concentrate demand across the capital metro.',
          },
          {
            title: 'Commute realism',
            detail:
              'Peak freeway freeflow is real — including Rankin and Madison reverse commutes. Test peak routes before choosing solely on rent or purchase price.',
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
              'Hinds County stacks Jackson the city capital cores, classic midtown grids, and south/west growth belts — different from Mississippi Gulf Coast patterns and from Rankin or Madison suburb-only product.',
          },
          {
            title: 'Climate',
            detail:
              'Humid subtropical climate with hot summers, severe-storm and tornado risk, and mild winters with occasional ice. Plan outdoor staging, heat, humidity, and storm contingency as part of move-in.',
          },
          {
            title: 'Culture and pace',
            detail:
              'Visit at peak and off-peak times when deciding — school calendars, legislative and event days, and storm season reshape daily rhythm.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Hinds County resources',
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify MDOT household goods carrier authority for in-state moves and FMCSA for interstate legs before deposits.',
    items: [
      {
        label: 'Hinds County — official site',
        href: 'https://www.hindscountyms.com/',
        external: true,
        note: 'County services & property context',
      },
      {
        label: 'City of Jackson',
        href: 'https://www.jacksonms.gov/',
        external: true,
        note: 'Permits, services & city info — Jackson the city capital core',
      },
      {
        label: 'City of Clinton',
        href: 'https://www.clintonms.org/',
        external: true,
        note: 'West arterial municipality context',
      },
      {
        label: 'City of Byram',
        href: 'https://www.byram-ms.us/',
        external: true,
        note: 'South growth municipality context',
      },
      {
        label: 'MDOT — traveler / traffic resources',
        href: 'https://mdot.ms.gov/',
        external: true,
        note: 'I-55 / I-20 / US-49 / US-51 before load windows',
      },
    ],
  },
  directoryHint:
    'Prefer crews with elevator/COI experience for downtown–capitol product; stair and character-grid fluency for Fondren–Belhaven stock; HOA gate fluency for Byram–Clinton growth; honest I-55 · I-20 · US-49 · US-51 · local Jackson grid timing for cross-zone pairs. Verify MDOT household goods Certificate of Public Convenience and Necessity pathways for intrastate moves (even within city limits) and FMCSA for interstate legs before deposits.',
  lastReviewed: '2026-07-24',
});

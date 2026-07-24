import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeMsPack,
  MS_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/mississippi/ms-shared';

/**
 * Harrison County, MS — Gulfport–Biloxi coastal.
 * Not Jackson south / capital metro, not Pascagoula-only Jackson County MS.
 */
export const harrisonCountyMsIntelligence: CountyIntelligencePack = finalizeMsPack({
  countySlug: 'harrison',
  hubTitle: 'Harrison County Moving Intelligence Hub',
  eyebrow:
    'Harrison County · Gulfport–Biloxi coastal, beachfront access & I-10 / US-90 logistics',
  h1: 'Moving in Harrison County: Gulfport–Biloxi Access, Coastal Grids & I-10 / US-90 Logistics',
  heroOpener:
    'Harrison County is Mississippi’s Gulfport–Biloxi coastal engine — not Jackson the city capital product pushed south, not a Pascagoula / Ocean Springs rename, and not a generic “MS coast” template without beachfront logistics. Expect casino-corridor multi-unit, US-90 beachfront and raised-home stock, Gulfport and Biloxi mid-rise product, D’Iberville and north-of-I-10 HOA growth, Long Beach and Pass Christian west-coast grids, and I-10 / US-90 / US-49 freeflow that rewrites “local” estimates. A Biloxi tower elevator job, a beachfront long-carry with wind exposure, a D’Iberville gated driveway, and a Long Beach pier-adjacent staging strip do not share truck access or crew skill. Tourism peaks, hurricane-season contingency, and humidity are real inputs. This hub is for people moving in Harrison County — Gulfport–Biloxi coastal — not Hinds capital metro or inland Mississippi defaults.',
  heroCredibility:
    'MDOT household goods Certificate of Public Convenience and Necessity for intrastate · FMCSA for interstate · Gulfport–Biloxi coastal access & I-10 / US-90 logistics awareness · Curated listings',
  majorCorridors: 'I-10 · US-90 · US-49 · local Gulf Coast grid',
  whatMakesDifferent: {
    title: 'What makes moving in Harrison County different',
    intro:
      'These are Harrison / Gulfport–Biloxi coastal realities — beachfront access, casino-corridor multi-unit, north-of-I-10 growth, and I-10 / US-90 freeflow — not Jackson the city capital product, not Pascagoula shipyard-only defaults, and not inland central Mississippi ranch scripts.',
    bullets: [
      {
        title: 'This is Gulfport–Biloxi coastal — not Jackson south',
        detail:
          'Ignore capitol-grid and Fondren stair templates as the default. Harrison stacks beachfront curb limits, casino-corridor elevators, raised and slab coastal product, and I-10 freeflow that central Mississippi capital scripts underprice. Match estimates to Gulfport, Biloxi, and Harrison addresses and MDOT household goods authority.',
      },
      {
        title: 'US-90 beachfront and raised-home stock rewrite labor',
        detail:
          'Wind exposure, sand and salt staging, long carries from limited curb, and elevated living areas fail estimates more often than packing skill alone. Inland HOA product does not share that stack.',
      },
      {
        title: 'Casino-corridor and Biloxi mid-rise vertical product differ from D’Iberville HOAs',
        detail:
          'Elevator reservations, building COIs, dock slots, and tourist-day freeflow dominate core jobs. A north-of-I-10 cul-de-sac does not share that logistics packet.',
      },
      {
        title: 'Hurricane season and humidity compress productive outdoor hours',
        detail:
          'Named-storm contingency, high humidity, and summer heat reshape outdoor labor and cancellation risk. Prefer early starts, tarp discipline, and flexible dates in peak season.',
      },
      {
        title: 'I-10, US-90, US-49, and the local Gulf Coast grid burn portal time',
        detail:
          'Gulfport ↔ Biloxi, Long Beach ↔ D’Iberville, or Pass Christian ↔ I-10 pairs look local and still burn 25–60+ minutes at peak tourism and storm-prep windows. Price portal-to-portal honestly.',
      },
      {
        title: 'Multi-county coast and interstate pairs are routine',
        detail:
          'Households regularly move Harrison ↔ Jackson County MS (Pascagoula / Ocean Springs), Hancock, or Stone County, or out-of-state on I-10 / US-49. MDOT household goods Certificate of Public Convenience and Necessity authority alone does not authorize interstate delivery — verify FMCSA when any leg leaves Mississippi.',
      },
      MS_REG_BULLET,
    ],
  },
  zonesHeading: 'Harrison County access zones',
  zonesIntro:
    'Plan by Gulfport core and port edges, Biloxi casino-corridor multi-unit, US-90 beachfront stock, D’Iberville–north I-10 growth HOAs, Long Beach–Pass Christian west coast, and inland arterial belts — access rules cluster by product more than ZIP alone. This is Gulfport–Biloxi coastal, not Jackson capital metro.',
  zones: [
    {
      id: 'gulfport-core',
      name: 'Gulfport core, port edges & US-49 approaches',
      shortName: 'Gulfport core',
      neighborhoods: [
        'Downtown Gulfport',
        'Port of Gulfport edges',
        'US-49 corridors',
        'Courthouse area edges',
        'Jones Park edges',
        'I-10 / US-49 interchanges',
      ],
      housingTypes: 'Multi-family, mid-rise pockets, older SFH, commercial-adjacent stock',
      challenges: [
        'Port and industrial freeflow mixed with residential loads',
        'US-49 / I-10 congestion',
        'Limited curb near core commercial blocks',
      ],
      moverTips:
        'Prefer mid-week early starts near port peaks. Photo curb staging. Clarify Gulfport addresses vs Biloxi and D’Iberville.',
      cityKeywords: [
        'gulfport',
        'downtown gulfport',
      ],
    },
    {
      id: 'biloxi-casino-corridor',
      name: 'Biloxi casino corridor, mid-rise & Back Bay edges',
      shortName: 'Biloxi / casino',
      neighborhoods: [
        'Biloxi',
        'Casino Row edges',
        'Back Bay corridors',
        'Downtown Biloxi',
        'Keegan Bayou edges',
        'I-110 approaches',
      ],
      housingTypes: 'High-rise and mid-rise condo, multi-family, loft conversions',
      challenges: [
        'Elevator reservations, building COIs, and dock slots',
        'Tourism and event-day freeflow',
        'I-110 / US-90 approach congestion',
      ],
      moverTips:
        'Book elevators and COIs in writing before the crew day. Avoid peak tourist windows when flexible. Photo dock or curb staging options.',
      cityKeywords: [
        'biloxi',
        'downtown biloxi',
        'casino biloxi',
      ],
    },
    {
      id: 'us90-beachfront',
      name: 'US-90 beachfront, raised-home & coastal staging belts',
      shortName: 'US-90 beachfront',
      neighborhoods: [
        'US-90 beachfront corridors',
        'East Biloxi coastal edges',
        'Gulfport beachfront edges',
        'Raised-home belts',
        'Seawall and pier approaches',
        'Coastal condo pockets',
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
        'biloxi',
        'gulfport',
        'beach boulevard',
        'us 90',
      ],
    },
    {
      id: 'diberville-north-i10',
      name: 'D’Iberville, north-of-I-10 growth HOAs & retail belts',
      shortName: 'D’Iberville / north I-10',
      neighborhoods: [
        'D’Iberville',
        'North Biloxi edges',
        'I-10 commercial-residential belts',
        'Promenade edges',
        'Woolmarket edges',
        'Lamey Bridge corridors',
      ],
      housingTypes: 'HOA SFH, townhomes, newer multi-family, gated product',
      challenges: [
        'HOA gate lists, truck-length limits, and timed windows',
        'I-10 freeflow and longer empty miles vs beachfront',
        'School-calendar summer peaks',
      ],
      moverTips:
        'Collect HOA packets and gate codes early. Confirm truck length rules. Price I-10 honestly for southbound beachfront unload pairs.',
      cityKeywords: [
        'diberville',
        "d'iberville",
        'biloxi',
        'woolmarket',
      ],
    },
    {
      id: 'long-beach-pass-christian',
      name: 'Long Beach, Pass Christian & west-coast grids',
      shortName: 'Long Beach / Pass Christian',
      neighborhoods: [
        'Long Beach',
        'Pass Christian',
        'West Gulfport edges',
        'US-90 west corridors',
        'Pineville edges',
        'DeLisle edges',
      ],
      housingTypes: 'Coastal SFH, raised product, multi-family pockets, character stock',
      challenges: [
        'US-90 west freeflow and bridge approaches',
        'Tight residential curb and longer carries',
        'Cross-zone empty miles to Biloxi / D’Iberville',
      ],
      moverTips:
        'Clarify Long Beach, Pass Christian, and Gulfport addresses. Photo driveway turnarounds. Price west-coast portal time honestly.',
      cityKeywords: [
        'long beach',
        'pass christian',
        'gulfport',
      ],
    },
    {
      id: 'inland-harrison-arterial',
      name: 'Inland Harrison arterial, Saucier edges & north growth',
      shortName: 'Inland / Saucier',
      neighborhoods: [
        'Saucier edges',
        'Lizana edges',
        'Orange Grove corridors',
        'US-49 north belts',
        'Inland ranch and acreage pockets',
        'I-10 north service corridors',
      ],
      housingTypes: 'Ranch SFH, acreage, multi-unit pockets, newer growth stock',
      challenges: [
        'Longer empty miles vs beachfront core',
        'Driveway geometry and soft shoulders',
        'US-49 freeflow',
      ],
      moverTips:
        'Survey driveway and gate access carefully. Price empty miles for coast-bound pairs. Clarify unincorporated addresses.',
      cityKeywords: [
        'saucier',
        'orange grove',
        'gulfport',
      ],
    },
  ],
  costDrivers: {
    title: 'What drives Harrison County moving costs',
    intro:
      'Access product, beachfront staging, elevator/HOA admin, and I-10 / US-90 freeflow move the number more than packing skill alone — this is Gulfport–Biloxi coastal logistics, not Jackson capital pricing.',
    drivers: [
      {
        title: 'Beachfront curb limits, raised homes & wind staging',
        detail:
          'US-90 coastal product adds long carries and weather risk before packing skill matters.',
      },
      {
        title: 'Elevator reservations, docks & casino-corridor COIs',
        detail:
          'Biloxi mid-rise and tower product add labor and schedule risk that inland ranches never see.',
      },
      {
        title: 'I-10 · US-90 · US-49 · local Gulf Coast grid congestion',
        detail:
          'Cross-coast pairs burn portal-to-portal hours even when map miles look short — tourism and storm windows amplify delays.',
      },
      {
        title: 'D’Iberville & north growth HOA gates',
        detail:
          'North-of-I-10 packets rewrite jobs that look simple on a map.',
      },
      {
        title: 'Multi-county coast & interstate empty miles',
        detail:
          'Jackson County MS, Hancock, Stone, and out-of-state destinations raise staging distance and authority complexity when leaving Harrison County or Mississippi.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (simple access)',
        value: '$500–$1,900+',
        note: 'Higher with beachfront, elevators, or peak I-10 / US-90 pairs',
      },
      {
        label: '2–3BR condo, duplex, or mid-size SFH',
        value: '$1,500–$4,500+',
        note: 'Raised-home stairs, COI, and HOA soft costs trend up',
      },
      {
        label: '3–4+ BR / high-rise / cross-zone',
        value: '$3,000–$9,500+',
        note: 'Tower moves and long I-10 / west-coast pairs price highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$115–$200+/hr',
        note: 'Portal-to-portal; packing, COI admin, and coastal staging scale up',
      },
    ],
  },
  seasonal: {
    title: 'When to schedule a Harrison County move',
    intro:
      'Tourism peaks, lease cycles, school calendars, summer heat and humidity, and hurricane season reshape access and crew availability across the Gulfport–Biloxi grid.',
    items: [
      {
        title: 'Best windows: mid-week early mornings',
        detail:
          'Tuesday–Thursday starts clear curb, ease casino-corridor freight windows, and reduce I-10 / US-90 pain. Avoid holiday and major event weekends when tourism collides with leases.',
      },
      {
        title: 'Peak season: late May–mid-September',
        detail:
          'Apartment turnover, family school calendars, and summer tourism fill first. Book 2–4 weeks ahead for peak weekends and elevator or HOA slots.',
      },
      {
        title: 'Hurricane-season contingency',
        detail:
          'June–November named-storm risk raises cancellation and staging risk. Prefer flexible dates, elevated storage plans when relevant, and early starts when forecasts allow.',
      },
      {
        title: 'Summer heat, humidity & winter mild snaps',
        detail:
          'June–August heat and humidity reshape outdoor labor. Prefer early starts, hydration plans, and tarp discipline on beachfront stock.',
      },
    ],
  },
  specialized: [
    {
      id: 'harrison-coastal-elevator-hoa',
      title: 'Gulfport–Biloxi coastal, elevator & I-10 / US-90 logistics module',
      intro:
        'Harrison County estimates fail more often on beachfront surveys, elevator packets, HOA gates, and freeway freeflow than on packing skill alone — coastal product, not Jackson capital defaults.',
      bullets: [
        'Photo beachfront curb, elevation stairs, and wind-exposure staging before the survey is final.',
        'Collect building COI, elevator reservations, and dock rules for Biloxi multi-unit product.',
        'Price portal-to-portal time for any pair that rides I-10, US-90, or US-49 at peak.',
        'Collect HOA packets early for D’Iberville and north-of-I-10 growth product.',
        'Clarify Gulfport, Biloxi, D’Iberville, Long Beach, Pass Christian, and other municipal addresses on every estimate.',
        'For in-state jobs verify MDOT household goods Certificate of Public Convenience and Necessity pathways; verify FMCSA for any out-of-state leg.',
      ],
    },
    {
      id: 'not-jackson-capital-not-pascagoula-only',
      title: 'Not Jackson capital · not Pascagoula-only module',
      intro:
        'A single “Mississippi coast rate” collapses when Harrison Gulfport–Biloxi product is confused with Hinds / Jackson the city capital logistics or with Jackson County MS Pascagoula–Ocean Springs product alone.',
      bullets: [
        'Do not price Biloxi elevators like downtown Jackson capitol docks or like Pascagoula shipyard multi-unit as interchangeable defaults.',
        'Keep Harrison vs Jackson County MS vs Hancock county lines clear on multi-address estimates.',
        'Match tourism and casino peaks separately from D’Iberville school-calendar waves.',
        'Treat out-of-state legs as interstate authority problems — MDOT household goods authority alone is not enough for interstate delivery.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Harrison County?',
    intro:
      'Use this as a practical fit checklist — schools, healthcare, housing character, and commute realism — then verify on district and hospital sites. No single ranking captures neighborhood fit. This is Gulfport–Biloxi coastal Mississippi, not capital metro Jackson.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & education landscape',
        bullets: [
          {
            title: 'How districts work here',
            detail:
              'Harrison County spans Gulfport, Biloxi, Long Beach, Pass Christian, Harrison County, and other systems. Assignment is address-based — marketing neighborhood names do not guarantee a campus.',
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
              'Memorial Hospital at Gulfport, Singing River affiliates, Keesler and other coastal campuses anchor care across Harrison County. Confirm insurance networks for your household.',
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
              'Expect Gulfport and Biloxi multi-unit; US-90 beachfront raised and condo product; D’Iberville HOA growth; Long Beach–Pass Christian coastal SFH; inland ranch and acreage stock.',
          },
          {
            title: 'Cost variation inside the county',
            detail:
              'Purchase prices and rents vary by beachfront vs inland product. Budget for flood insurance where mapped, condo/HOA dues, and wind-mitigation upgrades.',
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
            title: 'Biloxi / casino-corridor urban lifestyle',
            detail:
              'Suits people prioritizing amenities and vertical living — with elevator, parking, and tourism tradeoffs on move day.',
          },
          {
            title: 'US-90 beachfront living',
            detail:
              'Often appeals for coastal access — with wind staging, raised stairs, and curb limits.',
          },
          {
            title: 'D’Iberville / north I-10 growth belts',
            detail:
              'Fits buyers chasing newer product and schools — with HOA rules and longer empty miles to the beachfront.',
          },
          {
            title: 'Long Beach / Pass Christian west-coast living',
            detail:
              'Attracts households seeking quieter coastal grids — with US-90 freeflow and longer pairs to Biloxi retail cores.',
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
              'Tourism and hospitality, port and logistics, healthcare, military and federal facilities, education, and retail concentrate demand across the coast.',
          },
          {
            title: 'Commute realism',
            detail:
              'Peak I-10 and US-90 freeflow is real — including Jackson County MS reverse commutes. Test peak routes before choosing solely on rent or purchase price.',
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
              'Harrison County stacks Gulfport–Biloxi urban cores, beachfront grids, and north-of-I-10 growth — different from Jackson the city capital patterns and from Pascagoula / Ocean Springs product alone.',
          },
          {
            title: 'Climate',
            detail:
              'Humid subtropical Gulf climate with hot summers, high humidity, hurricane-season risk, and mild winters. Plan outdoor staging, heat, wind, and storm contingency as part of move-in.',
          },
          {
            title: 'Culture and pace',
            detail:
              'Visit at peak and off-peak times when deciding — tourism weekends, school calendars, and storm season reshape daily rhythm.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Harrison County resources',
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify MDOT household goods carrier authority for in-state moves and FMCSA for interstate legs before deposits.',
    items: [
      {
        label: 'Harrison County — official site',
        href: 'https://harrisoncountyms.gov/',
        external: true,
        note: 'County services & property context',
      },
      {
        label: 'City of Gulfport',
        href: 'https://www.gulfport-ms.gov/',
        external: true,
        note: 'Permits, services & city info',
      },
      {
        label: 'City of Biloxi',
        href: 'https://biloxi.ms.us/',
        external: true,
        note: 'Casino-corridor municipality context',
      },
      {
        label: 'City of D’Iberville',
        href: 'https://www.diberville.ms.us/',
        external: true,
        note: 'North-of-I-10 growth municipality context',
      },
      {
        label: 'MDOT — traveler / traffic resources',
        href: 'https://mdot.ms.gov/',
        external: true,
        note: 'I-10 / US-90 / US-49 before load windows',
      },
    ],
  },
  directoryHint:
    'Prefer crews with beachfront and raised-home staging experience for US-90 product; elevator/COI fluency for Biloxi casino-corridor multi-unit; HOA gate fluency for D’Iberville–north I-10 growth; honest I-10 · US-90 · US-49 · local Gulf Coast grid timing for cross-zone pairs. Verify MDOT household goods Certificate of Public Convenience and Necessity pathways for intrastate moves (even within city limits) and FMCSA for interstate legs before deposits.',
  lastReviewed: '2026-07-24',
});

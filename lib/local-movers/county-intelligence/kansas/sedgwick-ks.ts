import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeKsPack,
  KS_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/kansas/ks-shared';

/**
 * Sedgwick County, KS — Wichita regional / aircraft-industrial metro core.
 */
export const sedgwickCountyKsIntelligence: CountyIntelligencePack = finalizeKsPack({
  countySlug: 'sedgwick',
  hubTitle: 'Sedgwick County Moving Intelligence Hub',
  eyebrow:
    'Sedgwick County · Wichita regional, aircraft-industrial & I-135 / I-235 logistics',
  h1: 'Moving in Sedgwick County: Wichita Access, Aircraft-Industrial Belts & I-135 / I-235 Logistics',
  heroOpener:
    'Sedgwick County is the Wichita regional metro — Kansas’s largest city market with aircraft-industrial employment density, not a JOCO Overland Park HOA clone and not a Topeka capital-city script. Expect downtown and Old Town elevator product, Riverside and College Hill character grids, east and west Wichita multi-unit, Derby and Andover growth HOAs, Maize and Goddard belts, and I-135 / I-235 / US-54 / K-96 freeflow that rewrites “local” estimates. A downtown loft dock, a College Hill stair carry, a Derby gated driveway, and an aircraft-corridor multi-family curb do not share truck access or crew skill. Aerospace, healthcare, and manufacturing relocation waves are real inputs. This hub is for people moving in Sedgwick County — Wichita regional — not a renamed Kansas City suburban page.',
  heroCredibility:
    'KCC Certificate of Public Convenience and Necessity (HHG) for intrastate · FMCSA for interstate · Wichita access & I-135 / I-235 logistics awareness · Curated listings',
  majorCorridors: 'I-135 · I-235 · US-54 · K-96 · local Wichita grid',
  whatMakesDifferent: {
    title: 'What makes moving in Sedgwick County different',
    intro:
      'These are Sedgwick County / Wichita regional realities — downtown elevators, aircraft-industrial employment belts, Derby–Andover HOAs, and I-135 / I-235 freeflow — not JOCO Kansas City suburban defaults and not Topeka capital product.',
    bullets: [
      {
        title: 'Wichita is a regional aircraft-industrial metro — not JOCO suburbia',
        detail:
          'Ignore Overland Park HOA-only templates and Shawnee Mission school-district scripts. Sedgwick stacks aerospace and manufacturing employment, downtown multi-unit, College Hill character product, and south-central Kansas freeflow that KC metro scripts underprice. Match estimates to Wichita–Derby–Andover addresses and Kansas KCC authority.',
      },
      {
        title: 'Downtown, Old Town, and Delano vertical product rewrite labor',
        detail:
          'Elevator reservations, building COIs, dock slots, and scarce curb dominate core jobs. A Derby cul-de-sac or west-side ranch does not share that logistics stack.',
      },
      {
        title: 'College Hill, Riverside, and character grids underprice flat-rate optimism',
        detail:
          'Walk-ups, basements, tree-lined curb, and long carries fail estimates more often than packing skill alone.',
      },
      {
        title: 'Aircraft-industrial and shift employment reshapes mid-week demand',
        detail:
          'Aerospace, manufacturing, and hospital systems drive schedule-sensitive relocations that pure apartment-lease templates underprice. Confirm access near industrial and airport corridors.',
      },
      {
        title: 'Derby, Andover, Maize, and Goddard growth is HOA- and school-calendar driven',
        detail:
          'Gate lists, truck-length limits, and summer family peaks rewrite jobs that look suburban-simple on paper. Same-county downtown product does not share that stack.',
      },
      {
        title: 'I-135, I-235, US-54, and K-96 burn portal time',
        detail:
          'Downtown ↔ Derby, College Hill ↔ Maize, or east Wichita ↔ Andover pairs look local and still burn 20–50+ minutes at peak. Price portal-to-portal honestly.',
      },
      KS_REG_BULLET,
    ],
  },
  zonesHeading: 'Sedgwick County access zones',
  zonesIntro:
    'Plan by downtown–Old Town vertical product, College Hill–Riverside character grids, east and west Wichita multi-unit belts, Derby–Andover growth HOAs, Maize–Goddard west growth, and industrial-corridor edges — access rules cluster by product more than ZIP alone.',
  zones: [
    {
      id: 'downtown-old-town',
      name: 'Downtown Wichita, Old Town, Delano & core multi-unit',
      shortName: 'Downtown / Old Town',
      neighborhoods: [
        'Downtown Wichita',
        'Old Town',
        'Delano',
        'WaterWalk edges',
        'Douglas Avenue corridors',
        'Core loft conversions',
      ],
      housingTypes: 'Loft conversions, mid-rise multifamily, condo',
      challenges: [
        'Elevator reservations, docks, and building COIs',
        'Limited legal curb and event-day freeflow',
        'I-135 / US-54 approach congestion',
      ],
      moverTips:
        'Book elevators and COIs in writing before the crew day. Prefer mid-week early freight windows. Photo dock or curb staging options.',
      cityKeywords: [
        'wichita',
        'downtown wichita',
        'old town',
        'delano',
      ],
    },
    {
      id: 'college-hill-riverside',
      name: 'College Hill, Riverside, Midtown & character grids',
      shortName: 'College Hill / Riverside',
      neighborhoods: [
        'College Hill',
        'Riverside',
        'Midtown',
        'Crown Heights edges',
        'Hilltop edges',
        'Central character corridors',
      ],
      housingTypes: 'Character SFH, walk-up multifamily, duplexes',
      challenges: [
        'Multi-flight stairs, basements, and scarce truck length',
        'Tree-lined curb and long carries',
        'Local arterial freeflow',
      ],
      moverTips:
        'Survey stair counts with photos. Prefer mid-week starts. Protect older interiors and landscaping.',
      cityKeywords: [
        'college hill',
        'riverside',
        'wichita',
        'midtown wichita',
      ],
    },
    {
      id: 'east-wichita',
      name: 'East Wichita multi-unit, Kellogg corridors & suburban belts',
      shortName: 'East Wichita',
      neighborhoods: [
        'East Wichita',
        'Kellogg / US-54 east corridors',
        'Rock Road belts',
        'Bradley Fair edges',
        'East multi-unit pockets',
        'I-35 east residential edges',
      ],
      housingTypes: 'Multi-family, townhomes, ranch and two-story SFH',
      challenges: [
        'US-54 / K-96 freeflow',
        'Mixed multi-unit rules and curb limits',
        'Cross-zone empty miles common',
      ],
      moverTips:
        'Price Kellogg / US-54 honestly. Collect multi-unit building rules early. Clarify east Wichita addresses.',
      cityKeywords: [
        'wichita',
        'east wichita',
      ],
    },
    {
      id: 'west-wichita',
      name: 'West Wichita, zoo / museum edges & west arterial belts',
      shortName: 'West Wichita',
      neighborhoods: [
        'West Wichita',
        'Zoo / museum district edges',
        'West Street corridors',
        'Central & Tyler corridors',
        'West multi-unit pockets',
        'I-235 west residential belts',
      ],
      housingTypes: 'SFH, multi-family, ranch and split-level stock',
      challenges: [
        'I-235 / US-54 west freeflow',
        'Mixed older stock and long carries',
        'Multi-unit turnover near retail corridors',
      ],
      moverTips:
        'Price I-235 honestly. Survey older stock carefully. Photo driveway and curb options.',
      cityKeywords: [
        'wichita',
        'west wichita',
      ],
    },
    {
      id: 'derby-andover',
      name: 'Derby, Andover, Bel Aire & east / south growth HOAs',
      shortName: 'Derby / Andover',
      neighborhoods: [
        'Derby',
        'Andover',
        'Bel Aire',
        'Park City edges',
        'K-15 / K-96 growth belts',
        'Southern and eastern HOAs',
      ],
      housingTypes: 'HOA SFH, townhomes, newer multi-family, gated product',
      challenges: [
        'HOA gate lists, truck-length limits, and timed windows',
        'K-96 / I-135 freeflow and longer empty miles vs downtown',
        'School-calendar summer peaks',
      ],
      moverTips:
        'Collect HOA packets and gate codes early. Confirm truck length rules. Price K-96 and I-135 honestly for core unload pairs.',
      cityKeywords: [
        'derby',
        'andover',
        'bel aire',
        'park city',
      ],
    },
    {
      id: 'maize-goddard-industrial',
      name: 'Maize, Goddard, Haysville & aircraft-industrial corridor edges',
      shortName: 'Maize / industrial edges',
      neighborhoods: [
        'Maize',
        'Goddard',
        'Haysville',
        'Aircraft-industrial corridor edges',
        'Valley Center edges',
        'Western and southern county belts',
      ],
      housingTypes: 'HOA SFH, multi-unit, ranch stock, industrial-adjacent housing',
      challenges: [
        'Shift-traffic spikes near industrial and airport corridors',
        'Longer empty miles to downtown core',
        'Mixed HOA and rural-residential access',
      ],
      moverTips:
        'Avoid peak shift windows when flexible. Price empty miles honestly. Clarify Maize, Goddard, Haysville, and Wichita addresses.',
      cityKeywords: [
        'maize',
        'goddard',
        'haysville',
        'valley center',
        'wichita',
      ],
    },
  ],
  costDrivers: {
    title: 'What drives Sedgwick County moving costs',
    intro:
      'Access product, elevator/HOA admin, aircraft-corridor timing, and I-135 / I-235 freeflow move the number more than packing skill alone — this is Wichita regional logistics, not JOCO Kansas City suburban pricing.',
    drivers: [
      {
        title: 'Elevator reservations, docks & building COIs',
        detail:
          'Downtown, Old Town, and Delano vertical product add labor and schedule risk before packing skill matters.',
      },
      {
        title: 'Walk-up stairs, basements & character-grid curb',
        detail:
          'College Hill, Riverside, and older multi-unit stock add flight counts that flat-rate optimism underprices.',
      },
      {
        title: 'I-135 · I-235 · US-54 · K-96 congestion',
        detail:
          'Cross-metro pairs burn portal-to-portal hours even when map miles look short.',
      },
      {
        title: 'Derby / Andover HOA gates & growth windows',
        detail:
          'East and south growth packets rewrite jobs that look simple on a map.',
      },
      {
        title: 'Aircraft-industrial empty miles & multi-county pairs',
        detail:
          'Industrial-corridor timing, Butler County destinations, and out-of-state legs raise staging distance and authority complexity when leaving Sedgwick County or Kansas.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (simple access)',
        value: '$450–$1,800+',
        note: 'Higher with elevators, walk-ups, or peak US-54 pairs',
      },
      {
        label: '2–3BR condo, duplex, or mid-size SFH',
        value: '$1,400–$4,200+',
        note: 'Stairs, COI, and HOA soft costs trend up',
      },
      {
        label: '3–4+ BR / multi-unit / cross-zone',
        value: '$2,800–$8,500+',
        note: 'Tower moves and long I-135 / K-96 pairs price highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$110–$195+/hr',
        note: 'Portal-to-portal; packing, COI admin, and stairs scale up',
      },
    ],
  },
  seasonal: {
    title: 'When to schedule a Sedgwick County move',
    intro:
      'Lease cycles, school calendars, aerospace and manufacturing shift patterns, summer heat, severe-storm and tornado season, and winter ice reshape access across the Wichita grid.',
    items: [
      {
        title: 'Best windows: mid-week early mornings',
        detail:
          'Tuesday–Thursday starts clear curb, ease downtown freight windows, and reduce I-135 / US-54 pain. Avoid month-end Fridays when leases and elevators collide.',
      },
      {
        title: 'Peak season: late May–mid-September',
        detail:
          'Apartment turnover and family school calendars fill first. Book 2–4 weeks ahead for peak weekends and elevator or HOA slots.',
      },
      {
        title: 'Severe-storm & tornado-season risk',
        detail:
          'Spring and early summer storms raise cancellation and staging risk on the southern plains. Prefer flexible dates, covered staging plans, and early starts when forecasts allow.',
      },
      {
        title: 'Summer heat & winter ice',
        detail:
          'June–August heat and freeze-thaw winters reshape outdoor labor. Prefer early starts and weather contingency on older character stock.',
      },
    ],
  },
  specialized: [
    {
      id: 'wichita-elevator-hoa-industrial',
      title: 'Wichita elevator, HOA & aircraft-corridor logistics module',
      intro:
        'Sedgwick County estimates fail more often on stair surveys, elevator packets, HOA gates, industrial shift freeflow, and freeway timing than on packing skill alone.',
      bullets: [
        'Collect building COI, elevator reservations, and dock rules for downtown–Old Town–Delano multi-unit before the survey is final.',
        'Photo stair counts, curb options, and basement access for College Hill, Riverside, and older stock.',
        'Price portal-to-portal time for any pair that rides I-135, I-235, US-54, or K-96 at peak.',
        'Collect HOA packets early for Derby, Andover, Bel Aire, Maize, and Goddard growth product.',
        'Avoid peak aircraft-industrial and airport shift windows when flexible; clarify Wichita vs suburb addresses.',
        'For in-state jobs verify KCC Certificate of Public Convenience and Necessity covering household goods (tariffs); verify FMCSA for any out-of-state leg.',
      ],
    },
    {
      id: 'not-joco-not-topeka',
      title: 'Not JOCO · not Topeka capital module',
      intro:
        'A single “Kansas rate” collapses when Wichita regional aircraft-industrial product is confused with Johnson County HOA suburbia or Shawnee County capital-city logistics.',
      bullets: [
        'Do not price Old Town lofts like Overland Park cul-de-sacs or like Topeka capitol-adjacent product as interchangeable defaults.',
        'State the market as Sedgwick County / Wichita on every estimate — regional metro, not KC suburban clone.',
        'Match industrial and healthcare mid-week waves separately from Derby school-calendar peaks.',
        'Keep Sedgwick vs Butler / Harvey / Sumner county lines clear on multi-address estimates.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Sedgwick County?',
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
              'Sedgwick County spans Wichita Public Schools plus Derby, Andover, Maize, Goddard, Haysville, Valley Center, and other systems. Wichita State University anchors higher education. Assignment for K–12 is address-based — marketing neighborhood names do not guarantee a campus.',
          },
          {
            title: 'Choice, boundaries & enrollment pressure',
            detail:
              'Popular programs and boundary edges can be competitive. Confirm enrollment windows early when relocating mid-year.',
          },
          {
            title: 'Research sources',
            detail:
              'District boundary tools, Kansas State Department of Education data, and campus visits beat ranking screenshots alone.',
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
              'Ascension Via Christi, Wesley Healthcare, and regional specialty campuses anchor care across Sedgwick County. Confirm insurance networks for your household.',
          },
          {
            title: 'What relocators should do',
            detail:
              'Map peak-hour drive times to preferred campuses — Kellogg / US-54 and I-135 freeflow change “nearby” on paper. Transfer records early.',
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
              'Expect downtown and Old Town loft multi-unit; College Hill–Riverside character SFH; east and west Wichita multi-family; Derby–Andover HOA growth; Maize–Goddard west product; industrial-corridor edges.',
          },
          {
            title: 'Cost variation inside the county',
            detail:
              'Purchase prices and rents vary sharply by neighborhood and suburb. Budget for HOA dues, older-building repair risk, and competitive rental seasons near employment corridors.',
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
            title: 'Downtown / Old Town / Delano urban lifestyle',
            detail:
              'Suits people prioritizing walkability and amenities — with elevator, parking, and event-day tradeoffs on move day.',
          },
          {
            title: 'College Hill / Riverside character living',
            detail:
              'Often appeals for neighborhood feel and tree-lined grids — with stairs, basements, and curb limits.',
          },
          {
            title: 'Derby / Andover / Bel Aire growth belts',
            detail:
              'Fits buyers chasing newer product and schools — with HOA rules and longer empty miles to the core.',
          },
          {
            title: 'Maize / Goddard / west and industrial-adjacent living',
            detail:
              'Attracts households seeking relative value and western access — with shift freeflow and empty-mile logistics.',
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
              'Aerospace and aircraft manufacturing, healthcare systems, logistics, education, energy services, and regional professional services concentrate demand across the Wichita metro.',
          },
          {
            title: 'Commute realism',
            detail:
              'Peak I-135, I-235, US-54, and K-96 freeflow is real — including industrial shift windows. Test peak routes before choosing solely on rent or purchase price.',
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
              'Sedgwick County is Wichita regional — aircraft-industrial employment density, river-city character neighborhoods, and suburb growth belts — not JOCO Kansas City suburban product and not Topeka capital-city defaults.',
          },
          {
            title: 'Climate',
            detail:
              'Southern plains climate with hot summers, severe-storm and tornado risk, and freeze-thaw winters. Plan outdoor staging, heat, and storm contingency as part of move-in.',
          },
          {
            title: 'Culture and pace',
            detail:
              'Visit at peak and off-peak times when deciding — school calendars, industrial shifts, and storm season reshape daily rhythm.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Sedgwick County resources',
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify KCC Certificate of Public Convenience and Necessity (household goods) status for in-state moves and FMCSA for interstate legs before deposits.',
    items: [
      {
        label: 'Sedgwick County — official site',
        href: 'https://www.sedgwickcounty.org/',
        external: true,
        note: 'County services & property context',
      },
      {
        label: 'City of Wichita',
        href: 'https://www.wichita.gov/',
        external: true,
        note: 'Permits, services & city info',
      },
      {
        label: 'City of Derby',
        href: 'https://www.derbyweb.com/',
        external: true,
        note: 'South growth municipality context',
      },
      {
        label: 'City of Andover',
        href: 'https://www.andoverks.com/',
        external: true,
        note: 'East growth municipality context',
      },
      {
        label: 'KanDrive — Kansas traveler information',
        href: 'https://www.kandrive.org/',
        external: true,
        note: 'I-135 / I-235 / US-54 / K-96 before load windows',
      },
    ],
  },
  directoryHint:
    'Prefer crews with elevator/COI experience for downtown–Old Town–Delano product; stair and character-grid fluency for College Hill–Riverside stock; HOA gate fluency for Derby–Andover–Maize growth; industrial-corridor timing awareness near aircraft employment belts; honest I-135 · I-235 · US-54 · K-96 timing for cross-zone pairs. Verify KCC Certificate of Public Convenience and Necessity covering household goods (tariffs) for intrastate moves and FMCSA for interstate legs before deposits.',
  lastReviewed: '2026-07-24',
});

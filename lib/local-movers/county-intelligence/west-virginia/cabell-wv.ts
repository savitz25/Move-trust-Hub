import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeWvPack,
  WV_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/west-virginia/wv-shared';

/**
 * Cabell County, WV — Huntington river city / Tri-State.
 * NOT Charleston capital (Kanawha), NOT Parkersburg (Wood), NOT Morgantown (Monongalia).
 */
export const cabellCountyWvIntelligence: CountyIntelligencePack = finalizeWvPack({
  countySlug: 'cabell',
  hubTitle: 'Cabell County Moving Intelligence Hub',
  eyebrow:
    'Cabell County, WV · Huntington river city / Tri-State & I-64 logistics',
  h1: 'Moving in Cabell County: Huntington Access, Tri-State River Grids & I-64 / US-60 Logistics',
  heroOpener:
    'Cabell County, West Virginia is Huntington river-city and Tri-State density — downtown multi-unit and riverfront pockets, Marshall University campus-adjacent stock, Barboursville growth and retail corridors, Guyandotte–east residential belts, Milton edges, and Ohio River approaches — not Charleston capital valley product, not Parkersburg mid-Ohio Valley defaults, and not Morgantown campus cycles alone. Expect older river-city housing, scarce curb, multi-flight stairs, short Ohio and Kentucky hops that trigger interstate authority, and I-64 / US-60 / WV-2 freeflow that rewrites “local” estimates. A Marshall-area walk-up, a Barboursville HOA driveway, a Guyandotte older ranch, and a Milton edge approach do not share truck access or crew skill. School calendars and university cycles are real inputs. This hub is for people moving in Cabell County, WV — Huntington Tri-State access — not a renamed Charleston west or Parkersburg page.',
  heroCredibility:
    'WV PSC Motor Carrier Certificate of Convenience and Necessity (HHG) for intrastate · FMCSA for interstate (incl. short OH/KY hops) · Huntington river-city & I-64 logistics awareness · Curated listings',
  majorCorridors: 'I-64 · US-60 · WV-2 · local Huntington grid',
  whatMakesDifferent: {
    title: 'What makes moving in Cabell County different',
    intro:
      'These are Cabell County / Huntington Tri-State realities — river-city multi-unit, Marshall campus edges, Barboursville growth, and short OH/KY legs — not Charleston Kanawha Valley hills alone, not Parkersburg I-77 mid-valley defaults, and not Morgantown semester multi-unit as interchangeable templates.',
    bullets: [
      {
        title: 'This is Cabell County (Huntington Tri-State) — not Charleston west or Parkersburg',
        detail:
          'Ignore Kanawha capital-valley templates, Wood County Parkersburg scripts, and Monongalia campus multi-unit defaults alone. Cabell is Huntington, Marshall University area, Barboursville, Guyandotte, Milton, and Ohio River product. Match estimates to Cabell addresses and West Virginia PSC authority — not out-of-market corridor scripts.',
      },
      {
        title: 'Short Ohio and Kentucky hops need FMCSA — not “still local” optimism',
        detail:
          'Households routinely cross into Ohio and Kentucky for jobs, family, and housing across the Tri-State. Map miles can look short and still leave West Virginia. A WV PSC household goods certificate alone does not authorize interstate delivery — verify FMCSA when any leg crosses a state line.',
      },
      {
        title: 'Downtown Huntington and Marshall-area multi-unit underprice flat-rate optimism',
        detail:
          'Walk-ups, scarce curb, older basements, elevators where present, and multi-flight stairs fail estimates more often than packing skill alone. Photo stair counts and curb staging early — especially near campus peaks.',
      },
      {
        title: 'Barboursville growth and Milton edges burn empty miles',
        detail:
          'East-corridor pairs look “still Cabell” and still burn 20–45+ minutes at peak through I-64, US-60, and local arterials. Price portal-to-portal honestly rather than ZIP-to-ZIP optimism.',
      },
      {
        title: 'I-64, US-60, and WV-2 freeflow rewrites local timing',
        detail:
          'Huntington ↔ Barboursville, Guyandotte ↔ Milton, or downtown ↔ river-edge pairs ride valley bottlenecks and interstate merge friction. Peak-hour freeflow is a cost driver, not a footnote.',
      },
      {
        title: 'In-state and interstate pairs are routine',
        detail:
          'Households regularly move Cabell County ↔ Wayne, Putnam, or Kanawha County, or into Ohio and Kentucky Tri-State markets. Confirm authority for every out-of-state leg before deposits.',
      },
      WV_REG_BULLET,
    ],
  },
  zonesHeading: 'Cabell County access zones',
  zonesIntro:
    'Plan by Downtown Huntington multi-unit, Marshall University area density, Barboursville growth corridors, Guyandotte–east residential belts, Milton edges, and Ohio River edges — access rules cluster by curb scarcity, campus cycles, river-city product, and interstate freeflow more than ZIP alone.',
  zones: [
    {
      id: 'downtown-huntington',
      name: 'Downtown Huntington, riverfront multi-unit & core grid',
      shortName: 'Downtown Huntington',
      neighborhoods: [
        'Downtown Huntington',
        'Third Avenue corridors',
        'Riverfront multi-unit pockets',
        'Pullman Square edges',
        'Older walk-up stock',
        'Core retail-adjacent lofts',
      ],
      housingTypes: 'Walk-up multifamily, loft, limited elevators, mixed SFH edges',
      challenges: [
        'Elevator reservations where present, docks, and building COIs',
        'Scarce curb near retail and event traffic',
        'I-64 / US-60 approach freeflow into the core',
      ],
      moverTips:
        'Book elevators and COIs in writing when required. Prefer mid-week early freight windows. Photo curb staging options early and confirm load zones near downtown traffic.',
      cityKeywords: [
        'huntington',
        'downtown huntington',
      ],
    },
    {
      id: 'marshall-university-area',
      name: 'Marshall University area, campus-adjacent multi-unit & hillsides',
      shortName: 'Marshall area',
      neighborhoods: [
        'Marshall University edges',
        'Campus-adjacent multi-unit',
        'Fifth Avenue corridors',
        'Student housing belts',
        'Hillside walk-up stock',
        'Near-campus SFH edges',
      ],
      housingTypes: 'Dense multi-unit, walk-ups, limited elevators, mixed SFH edges',
      challenges: [
        'Semester and academic peak congestion and scarce curb',
        'Steep approaches, long carries, and multi-flight stairs',
        'Building COIs and timed move windows',
      ],
      moverTips:
        'Book campus-adjacent windows early around academic peaks. Photo every flight and landing. Prefer early morning starts before street parking fills.',
      cityKeywords: [
        'huntington',
        'marshall',
      ],
    },
    {
      id: 'barboursville',
      name: 'Barboursville growth, retail corridors & eastern HOA belts',
      shortName: 'Barboursville',
      neighborhoods: [
        'Barboursville',
        'I-64 east corridors',
        'US-60 retail-adjacent belts',
        'Growth HOA subdivisions',
        'Newer multi-family pockets',
        'Eastern SFH stock',
      ],
      housingTypes: 'HOA SFH, townhomes, newer multi-family, ranch and two-story stock',
      challenges: [
        'HOA gate lists, truck-length limits, and timed windows when present',
        'I-64 freeflow and longer empty miles vs downtown Huntington',
        'School-calendar summer peaks',
      ],
      moverTips:
        'Collect HOA packets and complex rules early. Clarify Barboursville vs Huntington addresses. Price I-64 honestly for westbound unload pairs into the core.',
      cityKeywords: [
        'barboursville',
      ],
    },
    {
      id: 'guyandotte-east',
      name: 'Guyandotte, east Huntington residential & river-adjacent stock',
      shortName: 'Guyandotte / east',
      neighborhoods: [
        'Guyandotte',
        'East Huntington residential belts',
        'River-adjacent SFH edges',
        'Older two-story stock',
        'Local arterial corridors',
        'East multi-unit pockets',
      ],
      housingTypes: 'Older SFH, duplexes, multi-unit pockets, ranch and two-story stock',
      challenges: [
        'Older stairs, basements, and tight residential curb',
        'River-edge access and flood-plain edge questions',
        'Cross-zone freeflow into downtown and Marshall area',
      ],
      moverTips:
        'Survey stair counts and curb with photos. Inventory basements carefully. Confirm addresses and protect older interiors as standard.',
      cityKeywords: [
        'guyandotte',
        'huntington',
      ],
    },
    {
      id: 'milton-edges',
      name: 'Milton edges & eastern Cabell approach belts',
      shortName: 'Milton edges',
      neighborhoods: [
        'Milton',
        'I-64 eastern approaches',
        'US-60 east belts',
        'Eastern SFH and ranch stock',
        'Rural-residential mix pockets',
        'County-edge approaches',
      ],
      housingTypes: 'SFH, ranch, limited multi-unit, mixed rural-residential',
      challenges: [
        'Longer empty miles to Huntington core',
        'Mixed driveway width and turnaround product',
        'I-64 freeflow and school-calendar peaks',
      ],
      moverTips:
        'Price empty miles honestly. Survey driveway width and turnaround. Align with school calendars when family moves dominate summer windows.',
      cityKeywords: [
        'milton',
      ],
    },
    {
      id: 'ohio-river-edges',
      name: 'Ohio River edges, WV-2 corridors & Tri-State approaches',
      shortName: 'Ohio River edges',
      neighborhoods: [
        'Ohio River residential edges',
        'WV-2 corridors',
        'River-adjacent multi-unit pockets',
        'Industrial-adjacent residential belts',
        'Tri-State approach SFH',
        'Bridge-approach residential stock',
      ],
      housingTypes: 'SFH, multi-unit pockets, older stock, mixed industrial-adjacent product',
      challenges: [
        'Bridge freeflow and short OH/KY empty-mile pairs',
        'Scarce curb near industrial and river corridors',
        'FMCSA required when any unload leaves West Virginia',
      ],
      moverTips:
        'Flag Ohio or Kentucky unloads early for FMCSA verification. Price bridge and WV-2 freeflow honestly. Survey curb and truck access near industrial edges.',
      cityKeywords: [
        'huntington',
      ],
    },
  ],
  costDrivers: {
    title: 'What drives Cabell County moving costs',
    intro:
      'River-city multi-unit stairs, campus curb scarcity, HOA growth packets, I-64 freeflow, and short OH/KY hops move the number more than packing skill alone — this is Huntington Tri-State logistics, not Charleston capital defaults or Parkersburg mid-valley scripts.',
    drivers: [
      {
        title: 'Walk-up stairs, elevators & scarce curb',
        detail:
          'Downtown Huntington and Marshall-area multi-unit rewrite jobs that look simple on a map.',
      },
      {
        title: 'HOA packets & eastern growth access rules',
        detail:
          'Barboursville and corridor product add admin and truck-length limits before packing skill matters.',
      },
      {
        title: 'Older basements, long carries & river-edge stock',
        detail:
          'Guyandotte and river-adjacent grids add flight counts and curb limits that flat-rate optimism underprices.',
      },
      {
        title: 'I-64 · US-60 · WV-2 congestion',
        detail:
          'Cross-county pairs burn portal-to-portal hours even when map miles look short.',
      },
      {
        title: 'OH / KY Tri-State & longer interstate empty miles',
        detail:
          'Short border hops and farther destinations raise staging distance and require FMCSA when any leg leaves West Virginia.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (simple access)',
        value: '$450–$1,850+',
        note: 'Higher with walk-ups, campus peaks, or peak I-64 pairs',
      },
      {
        label: '2–3BR condo, duplex, or mid-size SFH',
        value: '$1,400–$4,300+',
        note: 'Stairs, multi-unit, and HOA soft costs trend up',
      },
      {
        label: '3–4+ BR / growth / cross-zone',
        value: '$2,800–$8,800+',
        note: 'Long I-64 pairs and Tri-State unloads price highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$110–$195+/hr',
        note: 'Portal-to-portal; packing, stairs, and border hops scale up',
      },
    ],
  },
  seasonal: {
    title: 'When to schedule a Cabell County move',
    intro:
      'School calendars, Marshall University academic cycles, summer humidity and heat, river-valley flooding risk, and winter ice reshape access and crew availability across the Huntington grid.',
    items: [
      {
        title: 'Best windows: mid-week early mornings',
        detail:
          'Tuesday–Thursday starts clear curb, ease multi-unit freight windows, and reduce I-64 / US-60 pain. Avoid month-end Fridays when leases and campus-adjacent slots collide.',
      },
      {
        title: 'Peak season: late May–mid-September',
        detail:
          'Family school calendars and apartment turnover fill first — with additional pressure around academic peaks. Book 2–4 weeks ahead for peak weekends and elevator or campus-adjacent crews.',
      },
      {
        title: 'River-valley weather & storm risk',
        detail:
          'Heavy rain, river rise, and summer storms raise cancellation and staging risk near Ohio River edges. Prefer flexible dates, covered staging plans, and early starts when forecasts allow.',
      },
      {
        title: 'Summer heat & winter ice',
        detail:
          'June–August humidity and freeze-thaw winters reshape outdoor labor. Prefer early starts and weather contingency on older river-city stock.',
      },
    ],
  },
  specialized: [
    {
      id: 'huntington-tristate-corridor',
      title: 'Huntington Tri-State multi-unit, river edges & I-64 logistics module',
      intro:
        'Cabell County estimates fail more often on stair surveys, campus curb scarcity, border-crossing authority, and I-64 freeflow than on packing skill alone.',
      bullets: [
        'Photo stair counts, curb options, and basement access for downtown Huntington and Marshall-area walk-ups early.',
        'Book elevators and building COIs when required before the survey is final.',
        'Collect HOA and complex rules for Barboursville growth product.',
        'Flag Ohio or Kentucky unloads early — short Tri-State hops still need FMCSA verification.',
        'Price portal-to-portal time for any pair that rides I-64, US-60, or WV-2 at peak.',
        'For in-state jobs verify WV PSC Motor Carrier Certificate of Convenience and Necessity covering household goods; verify FMCSA for any out-of-state leg.',
      ],
    },
    {
      id: 'not-charleston-not-parkersburg',
      title: 'Not Charleston capital · not Parkersburg module',
      intro:
        'A single “Cabell County rate” collapses when Huntington Tri-State product is confused with Kanawha capital-valley logistics or Wood County Parkersburg mid-valley defaults alone.',
      bullets: [
        'Do not price Marshall-area walk-ups like Charleston South Hills hillside stock or like Parkersburg river multi-unit as interchangeable defaults.',
        'State the market as Cabell County / Huntington Tri-State on every estimate — disambiguate from Kanawha, Wood, Monongalia, and Berkeley County markets.',
        'Keep in-state vs interstate addresses clear when Ohio or Kentucky pairs appear — interstate authority applies when any leg leaves West Virginia.',
        'Match school-calendar peaks separately from academic mid-week relocation windows.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Cabell County?',
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
              'Cabell County Schools is the primary public system across Huntington, Barboursville, Milton, and river communities. Marshall University anchors higher education. Assignment is address-based — marketing neighborhood names do not guarantee a campus.',
          },
          {
            title: 'Choice, boundaries & enrollment pressure',
            detail:
              'Popular programs and boundary edges can be competitive. Confirm enrollment windows early when relocating mid-year.',
          },
          {
            title: 'Research sources',
            detail:
              'Cabell County Schools boundary tools, West Virginia Department of Education data, Marshall University resources for student housing logistics, and campus visits beat ranking screenshots alone.',
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
              'Cabell Huntington Hospital, St. Mary’s Medical Center, and related specialty care anchor healthcare across the Huntington Tri-State. Confirm insurance networks for your household — including Ohio and Kentucky options if you commute across state lines.',
          },
          {
            title: 'What relocators should do',
            detail:
              'Map peak-hour drive times to preferred campuses — I-64, US-60, and river-edge freeflow change “nearby” on paper. Transfer records early.',
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
              'Expect downtown Huntington multi-unit and riverfront product; Marshall campus-adjacent density; Barboursville growth HOA and multi-family; Guyandotte–east older SFH; Milton edge stock; Ohio River industrial-adjacent residential.',
          },
          {
            title: 'Cost variation inside the county',
            detail:
              'Purchase prices and rents vary by campus proximity, river access, and product age. Budget for older-building repair risk, flood-plain edge insurance questions, and competitive rental seasons near employment and campus cores.',
          },
          {
            title: 'Building and HOA governance',
            detail:
              'Multi-unit management and growth HOAs often control move hours, truck size, elevators, and deposits. Read documents carefully.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Which areas fit whom',
        bullets: [
          {
            title: 'Downtown Huntington / multi-unit lifestyle',
            detail:
              'Suits people prioritizing urban amenities and riverfront access — with elevator, curb, and I-64 freeflow tradeoffs on move day.',
          },
          {
            title: 'Marshall area / campus-adjacent living',
            detail:
              'Often appeals for university proximity — with stair surveys, scarce curb, and academic-peak logistics.',
          },
          {
            title: 'Barboursville / eastern growth belts',
            detail:
              'Fits buyers chasing newer product and retail access — with HOA rules and longer empty miles to downtown Huntington.',
          },
          {
            title: 'Milton / river-edge living',
            detail:
              'Attracts households seeking relative value and eastern or river approaches — with longer staging distance and mixed driveway access.',
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
              'Healthcare systems (Cabell Huntington, St. Mary’s), Marshall University, professional services, retail, logistics, and Tri-State reverse-commute patterns concentrate demand across Cabell County.',
          },
          {
            title: 'Commute realism',
            detail:
              'Peak I-64, US-60, and WV-2 freeflow is real — including short Ohio and Kentucky pairs. Test peak routes before choosing solely on rent or purchase price.',
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
              'Cabell County is Huntington river-city and Tri-State density — Ohio River corridor, Marshall campus rhythm, and eastern growth belts — not Charleston capital product and not Parkersburg mid-Ohio Valley defaults.',
          },
          {
            title: 'Climate',
            detail:
              'Humid continental / Ohio Valley climate with hot humid summers, storm and flood-edge risk, and freeze-thaw winters. Plan outdoor staging, heat, and ice contingency as part of move-in.',
          },
          {
            title: 'Culture and pace',
            detail:
              'Visit at peak and off-peak times when deciding — school calendars, academic cycles, and river weather reshape daily rhythm.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Cabell County resources',
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify WV PSC Motor Carrier household goods certificate status for in-state moves and FMCSA for interstate legs before deposits.',
    items: [
      {
        label: 'Cabell County, West Virginia — official site',
        href: 'https://www.cabellcounty.org/',
        external: true,
        note: 'County services & property context',
      },
      {
        label: 'City of Huntington',
        href: 'https://www.cityofhuntington.com/',
        external: true,
        note: 'Primary municipality context',
      },
      {
        label: 'Marshall University',
        href: 'https://www.marshall.edu/',
        external: true,
        note: 'Campus calendar & housing context',
      },
      {
        label: 'Cabell Huntington Hospital',
        href: 'https://cabellhuntington.org/',
        external: true,
        note: 'Major healthcare system context',
      },
      {
        label: 'WV 511 — traveler information',
        href: 'https://wv511.org/',
        external: true,
        note: 'I-64 / US-60 / WV-2 before load windows',
      },
    ],
  },
  directoryHint:
    'Prefer crews with multi-unit and stair fluency for downtown Huntington and Marshall-area product; HOA fluency for Barboursville growth; river-edge and older-stock fluency for Guyandotte and Ohio River belts; honest I-64 · US-60 · WV-2 timing for cross-zone pairs; and FMCSA readiness for short OH/KY hops. Verify WV PSC Motor Carrier Certificate of Convenience and Necessity covering household goods for intrastate moves and FMCSA for interstate legs before deposits. This is Cabell County (Huntington Tri-State) — not Charleston west and not Parkersburg.',
  lastReviewed: '2026-07-24',
});

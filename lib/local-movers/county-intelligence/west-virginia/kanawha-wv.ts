import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeWvPack,
  WV_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/west-virginia/wv-shared';

/**
 * Kanawha County, WV — Charleston capital / Kanawha Valley.
 * NOT Huntington (Cabell), NOT Eastern Panhandle (Berkeley), NOT Morgantown (Monongalia).
 */
export const kanawhaCountyWvIntelligence: CountyIntelligencePack = finalizeWvPack({
  countySlug: 'kanawha',
  hubTitle: 'Kanawha County Moving Intelligence Hub',
  eyebrow:
    'Kanawha County, WV · Charleston capital / Kanawha Valley & I-64 / I-77 logistics',
  h1: 'Moving in Kanawha County: Charleston Capital Access, Kanawha Valley Grids & I-64 / I-77 Logistics',
  heroOpener:
    'Kanawha County, West Virginia is the Charleston capital and Kanawha Valley core — downtown Capitol corridors, South Hills and Kanawha City hillsides, St. Albans–Nitro west belts, Elkview–Pinch eastern approaches, Dunbar–Institute edges, and rural valley stock — not Huntington river-city product, not Martinsburg Eastern Panhandle growth, and not Morgantown campus density. Expect older river-valley housing, steep drives, long carries, multi-unit downtown pockets, and I-64 / I-77 / US-60 freeflow that rewrites “local” estimates. A Capitol Complex elevator dock, a South Hills hillside ranch, a St. Albans ranch, and a Pinch gravel approach do not share truck access or crew skill. State employment cycles and school calendars are real inputs. This hub is for people moving in Kanawha County, WV — Charleston capital access — not a renamed Huntington or Eastern Panhandle page.',
  heroCredibility:
    'WV PSC Motor Carrier Certificate of Convenience and Necessity (HHG) for intrastate · FMCSA for interstate · Kanawha Valley hills & I-64 / I-77 logistics awareness · Curated listings',
  majorCorridors: 'I-64 · I-77 · US-60 · US-119 · local Charleston grid',
  whatMakesDifferent: {
    title: 'What makes moving in Kanawha County different',
    intro:
      'These are Kanawha County / Charleston capital and Kanawha Valley realities — hillside drives, older river-valley stock, Capitol multi-unit pockets, and I-64 / I-77 freeflow — not Huntington Tri-State river defaults, not Martinsburg Eastern Panhandle growth, and not Morgantown semester peaks alone.',
    bullets: [
      {
        title: 'This is Kanawha County (Charleston capital) — not Huntington or the Eastern Panhandle',
        detail:
          'Ignore Cabell Huntington river-city templates, Berkeley County I-81 growth scripts, and Monongalia campus multi-unit defaults. Kanawha is the state capital valley with Charleston, South Hills, Kanawha City, St. Albans, Nitro, Elkview, and Dunbar product. Match estimates to Kanawha addresses and West Virginia PSC authority — not out-of-market corridor scripts.',
      },
      {
        title: 'Hills, long carries, and older valley stock underprice flat-rate optimism',
        detail:
          'South Hills, Kanawha City, and older Charleston grids add steep driveways, tight turns, basements, and multi-flight stairs that look simple on a map and fail on survey photos. Protect landscaping, railings, and older interiors as standard — not optional extras.',
      },
      {
        title: 'Downtown Capitol and multi-unit corridors rewrite labor',
        detail:
          'Capitol Complex edges, downtown Charleston elevators, and walk-up multi-unit need freight windows, COIs, and scarce curb that suburban ranches never see. Elevator reservations and dock access change the crew math before packing skill matters.',
      },
      {
        title: 'St. Albans–Nitro west and Elkview–Pinch east burn empty miles',
        detail:
          'West-valley and east-valley pairs look “still Kanawha” and still burn 25–50+ minutes at peak through I-64, US-60, and local arterials. Price portal-to-portal honestly rather than ZIP-to-ZIP optimism.',
      },
      {
        title: 'I-64, I-77, US-60, and US-119 freeflow rewrites local timing',
        detail:
          'Charleston ↔ South Hills, Dunbar ↔ Elkview, or St. Albans ↔ Kanawha City pairs ride valley bottlenecks and interstate merge friction. Peak-hour freeflow is a cost driver, not a footnote.',
      },
      {
        title: 'In-state and interstate pairs are routine',
        detail:
          'Households regularly move Kanawha County ↔ Putnam, Cabell, Wood, or Raleigh County, or across state lines for job and family reasons. A WV PSC household goods certificate alone does not authorize interstate delivery — verify FMCSA when any leg leaves West Virginia.',
      },
      WV_REG_BULLET,
    ],
  },
  zonesHeading: 'Kanawha County access zones',
  zonesIntro:
    'Plan by Downtown Charleston / Capitol multi-unit, South Hills / Kanawha City hillsides, St. Albans–Nitro west belts, Elkview–Pinch east approaches, Dunbar–Institute edges, and rural valley edges — access rules cluster by hill geometry, curb scarcity, and river-valley product more than ZIP alone.',
  zones: [
    {
      id: 'downtown-charleston-capitol',
      name: 'Downtown Charleston, Capitol Complex & riverfront multi-unit',
      shortName: 'Downtown / Capitol',
      neighborhoods: [
        'Downtown Charleston',
        'Capitol Complex edges',
        'East End edges',
        'Kanawha Boulevard corridors',
        'Riverfront multi-unit pockets',
        'State office-adjacent stock',
      ],
      housingTypes: 'Mid-rise multifamily, loft, older walk-up, mixed SFH edges',
      challenges: [
        'Elevator reservations, docks, and building COIs',
        'Scarce curb near Capitol and retail corridors',
        'I-64 / I-77 approach freeflow and one-way grid friction',
      ],
      moverTips:
        'Book elevators and COIs in writing when required. Prefer mid-week early freight windows. Photo curb staging options early and confirm load zones near Capitol traffic.',
      cityKeywords: [
        'charleston',
        'downtown charleston',
      ],
    },
    {
      id: 'south-hills-kanawha-city',
      name: 'South Hills, Kanawha City & hillside character grids',
      shortName: 'South Hills / KC',
      neighborhoods: [
        'South Hills',
        'Kanawha City',
        'Bridge Road edges',
        'MacCorkle corridors',
        'Hillside character streets',
        'Older two-story stock',
      ],
      housingTypes: 'Character SFH, hillside ranch and two-story, limited multi-unit',
      challenges: [
        'Steep drives, tight turns, and long carries',
        'Older basements, stairs, and tree-lined curb limits',
        'US-60 / local arterial freeflow into valley cores',
      ],
      moverTips:
        'Survey driveway grade and turnaround with photos. Inventory basements carefully. Protect railings and older interiors; plan shuttle or smaller truck when full-size access fails.',
      cityKeywords: [
        'south hills',
        'kanawha city',
      ],
    },
    {
      id: 'st-albans-nitro-west',
      name: 'St. Albans, Nitro & western Kanawha Valley belts',
      shortName: 'St. Albans / Nitro',
      neighborhoods: [
        'St. Albans',
        'Nitro',
        'I-64 west corridors',
        'US-60 west belts',
        'Western ranch and two-story stock',
        'River-adjacent edges',
      ],
      housingTypes: 'SFH, ranch, multi-family pockets, mixed older stock',
      challenges: [
        'I-64 freeflow and longer empty miles vs downtown Charleston',
        'Mixed municipal rules across short distances',
        'School-calendar summer peaks',
      ],
      moverTips:
        'Clarify St. Albans vs Nitro vs unincorporated addresses. Price I-64 portal time honestly for eastbound unload pairs. Collect HOA or complex rules when present.',
      cityKeywords: [
        'st albans',
        'st. albans',
        'nitro',
      ],
    },
    {
      id: 'elkview-pinch-east',
      name: 'Elkview, Pinch & eastern valley approaches',
      shortName: 'Elkview / Pinch',
      neighborhoods: [
        'Elkview',
        'Pinch',
        'US-119 corridors',
        'Eastern arterial edges',
        'Valley SFH belts',
        'Creek-adjacent approaches',
      ],
      housingTypes: 'SFH, ranch, rural-residential edges, limited multi-unit',
      challenges: [
        'Longer empty miles to Capitol core',
        'Mixed driveway width and flood-plain edge access',
        'US-119 / I-79 approach freeflow',
      ],
      moverTips:
        'Price empty miles honestly. Survey driveway width and turnaround. Align with school calendars when family moves dominate summer windows.',
      cityKeywords: [
        'elkview',
        'pinch',
      ],
    },
    {
      id: 'dunbar-institute-edges',
      name: 'Dunbar, Institute & west-central valley edges',
      shortName: 'Dunbar / Institute',
      neighborhoods: [
        'Dunbar',
        'Institute edges',
        'West-central arterial corridors',
        'Older multi-unit pockets',
        'Valley SFH stock',
        'Campus-adjacent edges',
      ],
      housingTypes: 'SFH, multi-family pockets, ranch and older two-story',
      challenges: [
        'Cross-valley freeflow into Charleston core',
        'Tight residential curb and stair surveys',
        'Mixed municipal and unincorporated addressing',
      ],
      moverTips:
        'Confirm municipality on every estimate. Survey stair counts with photos. Prefer mid-week starts to clear curb near arterial corridors.',
      cityKeywords: [
        'dunbar',
        'institute',
      ],
    },
    {
      id: 'rural-valley-edges',
      name: 'Rural Kanawha Valley & mountain-edge stock',
      shortName: 'Rural valley edges',
      neighborhoods: [
        'Sissonville edges',
        'Clendenin edges',
        'Marmet–Belle edges',
        'Cedar Grove edges',
        'Rural residential belts',
        'Mountain-edge approaches',
      ],
      housingTypes: 'SFH, rural-residential, limited multi-unit, mixed gravel access',
      challenges: [
        'Longer empty miles and staging distance',
        'Gravel drives, narrow lanes, and limited turnaround',
        'Weather-sensitive hill and creek approaches',
      ],
      moverTips:
        'Price empty miles and weather contingency honestly. Survey lane width, bridge limits, and turnaround before committing truck size. Align with school calendars when relevant.',
      cityKeywords: [
        'sissonville',
        'clendenin',
        'marmet',
        'belle',
        'cedar grove',
      ],
    },
  ],
  costDrivers: {
    title: 'What drives Kanawha County moving costs',
    intro:
      'Hillside access, multi-unit elevators, older valley stairs, and I-64 / I-77 freeflow move the number more than packing skill alone — this is Charleston capital / Kanawha Valley logistics, not Huntington river defaults or Eastern Panhandle growth scripts.',
    drivers: [
      {
        title: 'Hillside drives, long carries & turnaround limits',
        detail:
          'South Hills, Kanawha City, and mountain-edge stock rewrite jobs that look simple on a map.',
      },
      {
        title: 'Elevator reservations, docks & building COIs',
        detail:
          'Downtown Capitol multi-unit and riverfront product add labor and schedule risk before packing skill matters.',
      },
      {
        title: 'Older stairs, basements & curb limits',
        detail:
          'Charleston character grids, Dunbar multi-unit, and valley two-story stock add flight counts that flat-rate optimism underprices.',
      },
      {
        title: 'I-64 · I-77 · US-60 · US-119 congestion',
        detail:
          'Cross-valley pairs burn portal-to-portal hours even when map miles look short.',
      },
      {
        title: 'In-state & interstate empty miles',
        detail:
          'Putnam, Cabell, Wood, Raleigh, and out-of-state destinations raise staging distance and authority complexity when leaving Kanawha County or West Virginia.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (simple access)',
        value: '$450–$1,800+',
        note: 'Higher with elevators, walk-ups, hills, or peak I-64 pairs',
      },
      {
        label: '2–3BR condo, duplex, or mid-size SFH',
        value: '$1,400–$4,200+',
        note: 'Stairs, hillside access, and multi-unit soft costs trend up',
      },
      {
        label: '3–4+ BR / hillside / cross-zone',
        value: '$2,800–$8,500+',
        note: 'Steep access and long I-64 / I-77 pairs price highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$110–$195+/hr',
        note: 'Portal-to-portal; packing, stairs, and hill shuttles scale up',
      },
    ],
  },
  seasonal: {
    title: 'When to schedule a Kanawha County move',
    intro:
      'School calendars, state-employment and lease cycles, summer humidity and heat, river-valley flooding risk, and winter ice on hills reshape access and crew availability across the Kanawha Valley grid.',
    items: [
      {
        title: 'Best windows: mid-week early mornings',
        detail:
          'Tuesday–Thursday starts clear curb, ease multi-unit freight windows, and reduce I-64 / I-77 pain. Avoid month-end Fridays when leases and Capitol-area slots collide.',
      },
      {
        title: 'Peak season: late May–mid-September',
        detail:
          'Family school calendars and apartment turnover fill first. Book 2–4 weeks ahead for peak weekends and elevator or hillside-access crews.',
      },
      {
        title: 'River-valley weather & storm risk',
        detail:
          'Heavy rain, creek rise, and summer storms raise cancellation and staging risk in valley and hillside approaches. Prefer flexible dates, covered staging plans, and early starts when forecasts allow.',
      },
      {
        title: 'Summer heat & winter ice on hills',
        detail:
          'June–August humidity and freeze-thaw winters reshape outdoor labor — especially on South Hills and mountain-edge drives. Prefer early starts and weather contingency on older character stock.',
      },
    ],
  },
  specialized: [
    {
      id: 'kanawha-valley-corridor',
      title: 'Kanawha Valley hills, multi-unit & I-64 / I-77 logistics module',
      intro:
        'Kanawha County estimates fail more often on hillside surveys, stair counts, multi-unit COIs, and interstate freeflow than on packing skill alone.',
      bullets: [
        'Survey driveway grade, turnaround, and long-carry paths for South Hills, Kanawha City, and rural valley product early.',
        'Book elevators and building COIs for downtown Charleston and Capitol-adjacent multi-unit before the survey is final.',
        'Photo stair counts, curb options, and basement access for older Charleston, Dunbar, and valley two-story stock.',
        'Price portal-to-portal time for any pair that rides I-64, I-77, US-60, or US-119 at peak.',
        'Clarify Charleston, South Hills, Kanawha City, St. Albans, Nitro, Elkview, Dunbar, and unincorporated addresses on every estimate.',
        'For in-state jobs verify WV PSC Motor Carrier Certificate of Convenience and Necessity covering household goods; verify FMCSA for any out-of-state leg.',
      ],
    },
    {
      id: 'not-huntington-not-panhandle',
      title: 'Not Huntington · not Eastern Panhandle module',
      intro:
        'A single “Kanawha County rate” collapses when Charleston capital product is confused with Huntington Tri-State river logistics or Martinsburg Eastern Panhandle growth defaults alone.',
      bullets: [
        'Do not price South Hills hillside stock like Huntington Ohio River multi-unit or like Martinsburg I-81 growth HOAs as interchangeable defaults.',
        'State the market as Kanawha County / Charleston capital on every estimate — disambiguate from Cabell, Berkeley, Monongalia, and Wood County markets.',
        'Keep in-state vs interstate addresses clear when Putnam, Cabell, or out-of-state pairs appear — interstate authority applies when any leg leaves West Virginia.',
        'Match school-calendar peaks separately from state-employment mid-week relocation windows.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Kanawha County?',
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
              'Kanawha County Schools is the primary public system across Charleston, South Hills, St. Albans, Nitro, Elkview, Dunbar, and valley communities. Assignment is address-based — marketing neighborhood names do not guarantee a campus.',
          },
          {
            title: 'Choice, boundaries & enrollment pressure',
            detail:
              'Popular programs and boundary edges can be competitive. Confirm enrollment windows early when relocating mid-year.',
          },
          {
            title: 'Research sources',
            detail:
              'Kanawha County Schools boundary tools, West Virginia Department of Education data, and campus visits beat ranking screenshots alone.',
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
              'Charleston Area Medical Center (CAMC) campuses and regional specialty care anchor healthcare across the Kanawha Valley. Confirm insurance networks for your household.',
          },
          {
            title: 'What relocators should do',
            detail:
              'Map peak-hour drive times to preferred campuses — I-64, US-60, and hillside freeflow change “nearby” on paper. Transfer records early.',
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
              'Expect downtown Charleston multi-unit and Capitol-adjacent product; South Hills–Kanawha City hillside SFH; St. Albans–Nitro west belts; Elkview–Pinch east SFH; Dunbar multi-unit pockets; rural valley and mountain-edge stock.',
          },
          {
            title: 'Cost variation inside the county',
            detail:
              'Purchase prices and rents vary by hillside character, valley access, and product age. Budget for older-building repair risk, flood-plain edge insurance questions, and competitive rental seasons near employment cores.',
          },
          {
            title: 'Building and complex governance',
            detail:
              'Multi-unit management and limited HOAs often control move hours, truck size, elevators, and deposits. Read documents carefully.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Which areas fit whom',
        bullets: [
          {
            title: 'Downtown Charleston / Capitol lifestyle',
            detail:
              'Suits people prioritizing state employment and urban amenities — with elevator, curb, and I-64 freeflow tradeoffs on move day.',
          },
          {
            title: 'South Hills / Kanawha City character living',
            detail:
              'Often appeals for neighborhood feel and hillside views — with driveway geometry, long carries, and older-stock logistics.',
          },
          {
            title: 'St. Albans / Nitro / west-valley belts',
            detail:
              'Fits households chasing relative value and I-64 access — with longer empty miles to Capitol cores and mixed municipal rules.',
          },
          {
            title: 'Elkview / Pinch / rural valley living',
            detail:
              'Attracts households seeking space and eastern approaches — with longer staging distance and mixed driveway access.',
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
              'State government, healthcare systems (including CAMC), professional services, energy and industrial corridors, retail, and regional logistics concentrate demand across the Kanawha Valley.',
          },
          {
            title: 'Commute realism',
            detail:
              'Peak I-64, I-77, US-60, and US-119 freeflow is real — including hillside approaches and reverse pairs into Charleston. Test peak routes before choosing solely on rent or purchase price.',
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
              'Kanawha County is Charleston capital and Kanawha Valley density — river corridor, hillside neighborhoods, and state-employment rhythm — not Huntington Tri-State product and not Eastern Panhandle DC-adjacency growth.',
          },
          {
            title: 'Climate',
            detail:
              'Humid continental / Appalachian valley climate with hot humid summers, storm and flood-edge risk, and freeze-thaw winters that ice hillside drives. Plan outdoor staging, heat, and ice contingency as part of move-in.',
          },
          {
            title: 'Culture and pace',
            detail:
              'Visit at peak and off-peak times when deciding — school calendars, state office cycles, and valley weather reshape daily rhythm.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Kanawha County resources',
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify WV PSC Motor Carrier household goods certificate status for in-state moves and FMCSA for interstate legs before deposits.',
    items: [
      {
        label: 'Kanawha County, West Virginia — official site',
        href: 'https://kanawha.us/',
        external: true,
        note: 'County services & property context',
      },
      {
        label: 'City of Charleston',
        href: 'https://www.charlestonwv.gov/',
        external: true,
        note: 'Capital municipality context',
      },
      {
        label: 'Kanawha County Schools',
        href: 'https://kcs.kana.k12.wv.us/',
        external: true,
        note: 'District & enrollment context',
      },
      {
        label: 'CAMC — Charleston Area Medical Center',
        href: 'https://www.camc.org/',
        external: true,
        note: 'Major healthcare system context',
      },
      {
        label: 'WV 511 — traveler information',
        href: 'https://wv511.org/',
        external: true,
        note: 'I-64 / I-77 / US-60 before load windows',
      },
    ],
  },
  directoryHint:
    'Prefer crews with hillside driveway and long-carry fluency for South Hills–Kanawha City and rural valley product; elevator/COI experience for downtown Charleston and Capitol multi-unit; stair and older-stock fluency for valley two-story grids; honest I-64 · I-77 · US-60 · US-119 timing for cross-zone pairs. Verify WV PSC Motor Carrier Certificate of Convenience and Necessity covering household goods for intrastate moves and FMCSA for interstate legs before deposits. This is Kanawha County (Charleston capital / Kanawha Valley) — not Huntington and not the Eastern Panhandle.',
  lastReviewed: '2026-07-24',
});

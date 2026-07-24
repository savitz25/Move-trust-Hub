import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeKsPack,
  KS_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/kansas/ks-shared';

/**
 * Wyandotte County, KS — Kansas City, KS (KCK) urban / Unified Government.
 * MUST say Kansas City, KS — not Kansas City, MO.
 */
export const wyandotteCountyKsIntelligence: CountyIntelligencePack = finalizeKsPack({
  countySlug: 'wyandotte',
  hubTitle: 'Wyandotte County Moving Intelligence Hub',
  eyebrow:
    'Wyandotte County · Kansas City, KS (KCK) urban & I-70 / I-635 logistics',
  h1: 'Moving in Wyandotte County: Kansas City, KS Access, Urban Grids & I-70 / I-635 Logistics',
  heroOpener:
    'Wyandotte County is Kansas City, Kansas (KCK) and the Unified Government urban core — not Kansas City, Missouri (KCMO), not Jackson County riverfront towers alone, and not JOCO Overland Park HOA suburbia. Expect downtown KCK multi-unit, Argentine and Rosedale neighborhood stock, Strawberry Hill character product, Piper and western growth belts, Edwardsville and Bonner Springs edges, and I-70 / I-635 / US-69 freeflow that rewrites “local” estimates. A downtown KCK curb stack, a Strawberry Hill stair carry, a Piper HOA driveway, and a Speeds Way multi-family dock do not share truck access or crew skill. Cross-state-line pairs into Missouri are routine and change authority. This hub is for people moving in Wyandotte County — Kansas City, KS — not a renamed Kansas City, MO page.',
  heroCredibility:
    'KCC Certificate of Public Convenience and Necessity (HHG) for intrastate · FMCSA for interstate · KCK urban access & I-70 / I-635 logistics awareness · Curated listings',
  majorCorridors: 'I-70 · I-635 · US-69 · local KCK grid',
  whatMakesDifferent: {
    title: 'What makes moving in Wyandotte County different',
    intro:
      'These are Wyandotte County / Kansas City, KS realities — KCK urban grids, Strawberry Hill character product, Piper growth, and I-70 / I-635 freeflow — not Kansas City, MO downtown defaults and not JOCO Overland Park HOA scripts.',
    bullets: [
      {
        title: 'This is Kansas City, Kansas (KCK) — not Kansas City, Missouri',
        detail:
          'Ignore KCMO Power & Light tower templates and Jackson County-only freeflow assumptions. Wyandotte is the Kansas-side urban core under the Unified Government of Wyandotte County / Kansas City, KS. Match estimates to KCK / Wyandotte addresses and Kansas KCC authority. Any leg into Missouri is interstate — verify FMCSA.',
      },
      {
        title: 'Downtown KCK and urban multi-unit rewrite labor',
        detail:
          'Elevator product where present, building COIs, scarce curb, and industrial-adjacent freeflow dominate core jobs. A Piper cul-de-sac does not share that logistics stack.',
      },
      {
        title: 'Strawberry Hill, Rosedale, and Argentine neighborhood stock underprice flat-rate optimism',
        detail:
          'Walk-ups, basements, tight residential curb, and older interiors fail estimates more often than packing skill alone.',
      },
      {
        title: 'Piper and western growth is HOA- and school-calendar driven',
        detail:
          'Gate lists, truck-length limits, and summer family peaks rewrite jobs that look suburban-simple on paper. Same-county urban product does not share that stack.',
      },
      {
        title: 'I-70, I-635, and US-69 burn portal time',
        detail:
          'Downtown KCK ↔ Piper, Strawberry Hill ↔ Edwardsville, or Rosedale ↔ Bonner Springs pairs look local and still burn 20–50+ minutes at peak. Price portal-to-portal honestly.',
      },
      {
        title: 'Cross-state-line metro pairs are routine',
        detail:
          'Households regularly move Wyandotte County ↔ Johnson County, or across the state line into Kansas City, MO / Jackson County. A KCC Certificate of Public Convenience and Necessity alone does not authorize interstate delivery — verify FMCSA when any leg leaves Kansas.',
      },
      KS_REG_BULLET,
    ],
  },
  zonesHeading: 'Wyandotte County access zones',
  zonesIntro:
    'Plan by downtown KCK multi-unit, Strawberry Hill–Rosedale–Argentine neighborhood stock, central and east industrial-adjacent belts, Piper western growth HOAs, Edwardsville–Bonner Springs edges, and river / I-70 corridor product — access rules cluster by urban vs growth product more than ZIP alone.',
  zones: [
    {
      id: 'downtown-kck',
      name: 'Downtown Kansas City, KS, Village West edges & core multi-unit',
      shortName: 'Downtown KCK',
      neighborhoods: [
        'Downtown Kansas City, KS',
        'Minnesota Avenue corridors',
        'Central Avenue corridors',
        'Core multi-unit pockets',
        'Village West / Legends edges',
        'I-70 core approaches',
      ],
      housingTypes: 'Mid-rise multifamily, loft conversions, mixed SFH',
      challenges: [
        'Elevator reservations, docks, and building COIs where applicable',
        'Limited legal curb and event freeflow near entertainment corridors',
        'I-70 / I-635 approach congestion',
      ],
      moverTips:
        'Book elevators and COIs in writing when required. Prefer mid-week early freight windows. Photo curb staging options early.',
      cityKeywords: [
        'kansas city',
        'kansas city ks',
        'kck',
        'downtown kansas city ks',
      ],
    },
    {
      id: 'strawberry-hill-rosedale',
      name: 'Strawberry Hill, Rosedale & near-core character grids',
      shortName: 'Strawberry Hill / Rosedale',
      neighborhoods: [
        'Strawberry Hill',
        'Rosedale',
        'Near-core character corridors',
        'Tree-lined residential grids',
        'University of Kansas Medical Center edges',
        'Central walk-up pockets',
      ],
      housingTypes: 'Character SFH, walk-up multifamily, duplexes',
      challenges: [
        'Multi-flight stairs, basements, and scarce truck length',
        'Tight residential curb and long carries',
        'Medical-campus freeflow near KUMC edges',
      ],
      moverTips:
        'Survey stair counts with photos. Prefer mid-week starts outside clinic peaks. Protect older interiors.',
      cityKeywords: [
        'strawberry hill',
        'rosedale',
        'kansas city',
        'kansas city ks',
      ],
    },
    {
      id: 'argentine-south',
      name: 'Argentine, south KCK & industrial-adjacent neighborhood stock',
      shortName: 'Argentine / south',
      neighborhoods: [
        'Argentine',
        'South Kansas City, KS',
        'Industrial-adjacent residential',
        'Southern multi-unit pockets',
        'K-32 corridors',
        'River-adjacent south edges',
      ],
      housingTypes: 'Older SFH, multi-family, ranch and duplex stock',
      challenges: [
        'Industrial freeflow and mixed curb access',
        'Older stock basements and long carries',
        'I-635 / local arterial congestion',
      ],
      moverTips:
        'Survey older stock carefully. Avoid peak industrial windows when flexible. Clarify Argentine vs other KCK addresses.',
      cityKeywords: [
        'argentine',
        'kansas city',
        'kansas city ks',
      ],
    },
    {
      id: 'piper-west-growth',
      name: 'Piper, western KCK growth HOAs & I-435 edges',
      shortName: 'Piper / west',
      neighborhoods: [
        'Piper',
        'Western Kansas City, KS growth',
        'I-435 west edges',
        'Western HOA belts',
        'School-district growth corridors',
        'Newer multi-family pockets',
      ],
      housingTypes: 'HOA SFH, townhomes, newer multi-family, gated product',
      challenges: [
        'HOA gate lists, truck-length limits, and timed windows',
        'I-435 / I-70 freeflow and longer empty miles vs downtown KCK',
        'School-calendar summer peaks',
      ],
      moverTips:
        'Collect HOA packets and gate codes early. Confirm truck length rules. Price I-70 and I-435 honestly for eastbound unload pairs.',
      cityKeywords: [
        'piper',
        'kansas city',
        'kansas city ks',
      ],
    },
    {
      id: 'edwardsville-bonner',
      name: 'Edwardsville, Bonner Springs & western edge municipalities',
      shortName: 'Edwardsville / Bonner',
      neighborhoods: [
        'Edwardsville',
        'Bonner Springs',
        'Western county edges',
        'K-7 corridors',
        'Kansas Speedway / Village West residential edges',
        'Outer multi-unit pockets',
      ],
      housingTypes: 'SFH, multi-family, HOA pockets, ranch stock',
      challenges: [
        'I-70 freeflow and longer empty miles to urban core',
        'Mixed municipal rules across short distances',
        'Event freeflow near entertainment venues',
      ],
      moverTips:
        'Clarify Edwardsville, Bonner Springs, and KCK addresses. Price I-70 honestly. Avoid major event windows when flexible.',
      cityKeywords: [
        'edwardsville',
        'bonner springs',
        'kansas city ks',
      ],
    },
    {
      id: 'northeast-industrial',
      name: 'Northeast KCK, industrial corridors & river-adjacent belts',
      shortName: 'NE / industrial',
      neighborhoods: [
        'Northeast Kansas City, KS',
        'Industrial corridors',
        'River-adjacent belts',
        'I-635 / US-69 north edges',
        'Multi-unit turnover pockets',
        'Eastern county residential edges',
      ],
      housingTypes: 'Multi-family, older SFH, industrial-adjacent stock',
      challenges: [
        'Truck freeflow and scarce residential curb near industrial zones',
        'I-635 / US-69 congestion',
        'Cross-state-line empty miles common',
      ],
      moverTips:
        'Price I-635 and US-69 honestly. Survey curb and driveway carefully. Flag any Missouri unload as interstate authority.',
      cityKeywords: [
        'kansas city',
        'kansas city ks',
        'kck',
      ],
    },
  ],
  costDrivers: {
    title: 'What drives Wyandotte County moving costs',
    intro:
      'Urban multi-unit access, character-grid stairs, HOA admin, and I-70 / I-635 freeflow move the number more than packing skill alone — this is Kansas City, KS logistics, not Kansas City, MO tower defaults alone and not JOCO HOA pricing.',
    drivers: [
      {
        title: 'Urban multi-unit elevators, docks & COIs',
        detail:
          'Downtown KCK and core vertical product add labor and schedule risk before packing skill matters.',
      },
      {
        title: 'Walk-up stairs, basements & neighborhood-grid curb',
        detail:
          'Strawberry Hill, Rosedale, Argentine, and older multi-unit stock add flight counts that flat-rate optimism underprices.',
      },
      {
        title: 'I-70 · I-635 · US-69 congestion',
        detail:
          'Cross-county and cross-state pairs burn portal-to-portal hours even when map miles look short.',
      },
      {
        title: 'Piper HOA gates & western growth windows',
        detail:
          'Western packets rewrite jobs that look simple on a map.',
      },
      {
        title: 'Interstate empty miles into Missouri',
        detail:
          'Johnson County pairs stay intrastate; any Kansas City, MO / Jackson County leg needs FMCSA authority and raises staging complexity.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (simple access)',
        value: '$450–$1,800+',
        note: 'Higher with elevators, walk-ups, or peak I-70 pairs',
      },
      {
        label: '2–3BR condo, duplex, or mid-size SFH',
        value: '$1,400–$4,200+',
        note: 'Stairs, multi-unit, and HOA soft costs trend up',
      },
      {
        label: '3–4+ BR / multi-unit / cross-zone',
        value: '$2,700–$8,500+',
        note: 'Urban multi-unit and interstate pairs price highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$110–$200+/hr',
        note: 'Portal-to-portal; packing, stairs, and interstate admin scale up',
      },
    ],
  },
  seasonal: {
    title: 'When to schedule a Wyandotte County move',
    intro:
      'Lease cycles, school calendars, medical-campus traffic, summer heat, severe-storm and tornado season, winter ice, and entertainment-venue event freeflow reshape access across the KCK grid.',
    items: [
      {
        title: 'Best windows: mid-week early mornings',
        detail:
          'Tuesday–Thursday starts clear curb, ease multi-unit freight windows, and reduce I-70 / I-635 pain. Avoid month-end Fridays when leases collide.',
      },
      {
        title: 'Peak season: late May–mid-September',
        detail:
          'Apartment turnover and family school calendars fill first. Book 2–4 weeks ahead for peak weekends and elevator or HOA slots.',
      },
      {
        title: 'Severe-storm & tornado-season risk',
        detail:
          'Spring and early summer storms raise cancellation and staging risk. Prefer flexible dates, covered staging plans, and early starts when forecasts allow.',
      },
      {
        title: 'Summer heat, winter ice & venue event freeflow',
        detail:
          'June–August heat and freeze-thaw winters reshape outdoor labor. Major sports and entertainment events compress Village West and I-70 staging — confirm blackout windows.',
      },
    ],
  },
  specialized: [
    {
      id: 'kck-urban-hoa-interstate',
      title: 'KCK urban multi-unit, HOA & I-70 / interstate logistics module',
      intro:
        'Wyandotte County estimates fail more often on stair surveys, multi-unit packets, HOA gates, freeway freeflow, and state-line authority mistakes than on packing skill alone.',
      bullets: [
        'Collect building COI, elevator reservations, and dock rules for downtown KCK multi-unit before the survey is final.',
        'Photo stair counts, curb options, and basement access for Strawberry Hill, Rosedale, and Argentine stock.',
        'Price portal-to-portal time for any pair that rides I-70, I-635, or US-69 at peak.',
        'Collect HOA packets early for Piper and western growth product.',
        'State Kansas City, KS (not MO) on every estimate; treat any Missouri unload as FMCSA interstate.',
        'For in-state jobs verify KCC Certificate of Public Convenience and Necessity covering household goods (tariffs); verify FMCSA for any out-of-state leg.',
      ],
    },
    {
      id: 'not-kcmo-not-joco',
      title: 'Not Kansas City, MO · not JOCO module',
      intro:
        'A single “Kansas City rate” collapses when KCK urban product is confused with Kansas City, MO towers or Johnson County Overland Park HOAs.',
      bullets: [
        'Do not price Strawberry Hill walk-ups like Power & Light elevators or like Overland Park cul-de-sacs as interchangeable defaults.',
        'State the market as Wyandotte County / Kansas City, KS (KCK) on every estimate — never assume Kansas City, MO.',
        'Keep Wyandotte vs Johnson county lines clear on multi-address estimates.',
        'Treat state-line pairs as interstate authority problems — KCC alone is not enough for Missouri delivery.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Wyandotte County?',
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
              'Wyandotte County spans Kansas City, Kansas Public Schools plus Piper, Bonner Springs, Turner, and other systems. Assignment is address-based — marketing neighborhood names do not guarantee a campus.',
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
              'The University of Kansas Health System (including KU Medical Center edges serving the metro), Providence Medical Center, and regional partners anchor care for Wyandotte households. Confirm insurance networks for your household.',
          },
          {
            title: 'What relocators should do',
            detail:
              'Map peak-hour drive times to preferred campuses — I-70, I-635, and State Line freeflow change “nearby” on paper. Transfer records early.',
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
              'Expect downtown KCK multi-unit; Strawberry Hill–Rosedale–Argentine character and older SFH; industrial-adjacent stock; Piper western HOA growth; Edwardsville–Bonner Springs edge product.',
          },
          {
            title: 'Cost variation inside the county',
            detail:
              'Purchase prices and rents vary sharply by neighborhood and growth belt. Budget for multi-unit dues, older-building repair risk, and competitive rental seasons near employment corridors.',
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
            title: 'Downtown KCK / urban lifestyle',
            detail:
              'Suits people prioritizing Kansas-side urban access and amenities — with multi-unit and freeflow tradeoffs on move day.',
          },
          {
            title: 'Strawberry Hill / Rosedale character living',
            detail:
              'Often appeals for neighborhood feel near medical and urban cores — with stairs, curb limits, and denser staging.',
          },
          {
            title: 'Piper / western growth belts',
            detail:
              'Fits buyers chasing newer product and schools — with HOA rules and longer empty miles to downtown KCK.',
          },
          {
            title: 'Edwardsville / Bonner Springs edge living',
            detail:
              'Attracts households seeking relative value and western access — with I-70 freeflow and municipal rule mix.',
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
              'Healthcare and medical education, logistics and industrial corridors, entertainment and sports venue employment, government, and KC metro reverse-commute patterns concentrate demand across Wyandotte.',
          },
          {
            title: 'Commute realism',
            detail:
              'Peak I-70, I-635, and US-69 freeflow is real — including Missouri-side pairs. Test peak routes before choosing solely on rent or purchase price.',
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
              'Wyandotte County is Kansas City, KS (KCK) — Unified Government urban density, neighborhood character grids, and western growth — not Kansas City, Missouri and not JOCO Overland Park suburbia.',
          },
          {
            title: 'Climate',
            detail:
              'Humid continental climate with hot summers, severe-storm and tornado risk, and freeze-thaw winters. Plan outdoor staging, heat, and storm contingency as part of move-in.',
          },
          {
            title: 'Culture and pace',
            detail:
              'Visit at peak and off-peak times when deciding — school calendars, venue events, and storm season reshape daily rhythm.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Wyandotte County resources',
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify KCC Certificate of Public Convenience and Necessity (household goods) status for in-state moves and FMCSA for interstate legs before deposits.',
    items: [
      {
        label: 'Unified Government of Wyandotte County / Kansas City, KS',
        href: 'https://www.wycokck.org/',
        external: true,
        note: 'County–city services & property context',
      },
      {
        label: 'City of Bonner Springs',
        href: 'https://www.bonnersprings.org/',
        external: true,
        note: 'Western edge municipality context',
      },
      {
        label: 'City of Edwardsville',
        href: 'https://www.edwardsvilleks.org/',
        external: true,
        note: 'Western municipality context',
      },
      {
        label: 'KanDrive — Kansas traveler information',
        href: 'https://www.kandrive.org/',
        external: true,
        note: 'I-70 / I-635 / US-69 before load windows',
      },
    ],
  },
  directoryHint:
    'Prefer crews with urban multi-unit and curb fluency for downtown KCK product; stair and neighborhood-grid fluency for Strawberry Hill–Rosedale–Argentine stock; HOA fluency for Piper growth; honest I-70 · I-635 · US-69 timing for cross-zone pairs; clear interstate authority when any leg enters Missouri. Verify KCC Certificate of Public Convenience and Necessity covering household goods (tariffs) for intrastate moves and FMCSA for interstate legs before deposits. This is Kansas City, KS (KCK) — not Kansas City, MO.',
  lastReviewed: '2026-07-24',
});

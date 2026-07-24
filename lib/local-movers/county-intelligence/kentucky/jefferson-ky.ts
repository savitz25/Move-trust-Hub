import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeKyPack,
  KY_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/kentucky/ky-shared';

/**
 * Jefferson County, KY — Louisville metro core.
 * NOT Jefferson County, MO (south St. Louis fringe). NOT Lexington / Fayette.
 */
export const jeffersonCountyKyIntelligence: CountyIntelligencePack = finalizeKyPack({
  countySlug: 'jefferson',
  hubTitle: 'Jefferson County Moving Intelligence Hub',
  eyebrow:
    'Jefferson County, KY · Louisville core, Highlands stock & I-64 / I-65 / I-71 logistics',
  h1: 'Moving in Jefferson County, KY: Louisville Access, Neighborhood Grids & I-64 / I-65 Logistics',
  heroOpener:
    'Jefferson County, Kentucky is Louisville’s metro core — not Jefferson County, Missouri (south St. Louis fringe), not Lexington horse-country, and not a Northern Kentucky Cincinnati-collar template. Expect downtown and NuLu elevator product, Highlands and Crescent Hill walk-ups, South End and Shively ranch stock, East End and Jeffersontown HOA growth, and I-64 / I-65 / I-71 / I-264 / I-265 freeflow that rewrites “local” estimates. A Waterfront tower dock slot, a Bardstown Road stair stack, a St. Matthews multi-unit, and a Prospect gated driveway do not share truck access or crew skill. Indiana-side pairs across the Ohio River add interstate authority risk. This hub is for people moving in Jefferson County, KY — Louisville — not a renamed Missouri Jefferson page or Fayette County script.',
  heroCredibility:
    'KYTC Division of Motor Carriers household goods certificate for intrastate · FMCSA for interstate · Louisville access & I-64 / I-65 logistics awareness · Curated listings',
  majorCorridors: 'I-64 · I-65 · I-71 · I-264 · I-265 · local arterial grid',
  whatMakesDifferent: {
    title: 'What makes moving in Jefferson County different',
    intro:
      'These are Louisville core realities — downtown elevators, Highlands stairs, East End HOAs, and I-64 / I-65 / I-71 freeflow — not Jefferson County MO I-55 product, not Lexington New Circle belts, and not Covington riverfront stock alone.',
    bullets: [
      {
        title: 'This is Louisville, Kentucky — not Jefferson County, Missouri',
        detail:
          'Ignore Arnold–Imperial I-55 fringe templates and St. Louis South County assumptions. Jefferson KY is the Louisville metro core with river bridges, Watterson Expressway (I-264), Gene Snyder Freeway (I-265), and Kentucky-side housing mix. Match estimates to KY addresses and KYTC authority — not Missouri MoDOT scripts.',
      },
      {
        title: 'Downtown, NuLu, and Waterfront vertical product rewrite labor',
        detail:
          'Elevator reservations, building COIs, dock slots, and scarce curb dominate core jobs. A Highlands duplex or East End cul-de-sac does not share that logistics stack.',
      },
      {
        title: 'Highlands, Crescent Hill, and Clifton stairs underprice flat-rate optimism',
        detail:
          'Walk-ups, basements, tight residential curb, and Bardstown / Frankfort Avenue freeflow fail estimates more often than packing skill alone.',
      },
      {
        title: 'East End HOA growth is not South End or West End product',
        detail:
          'Jeffersontown, Middletown, Anchorage edges, and Prospect gate lists stack truck-length limits and timed windows that Shively ranch stock and older West End grids do not share.',
      },
      {
        title: 'I-64, I-65, I-71, I-264, and I-265 burn portal time',
        detail:
          'Downtown ↔ East End, Highlands ↔ Airport south, or Jeffersontown ↔ St. Matthews pairs look local and still burn 25–60+ minutes at peak. Price portal-to-portal honestly.',
      },
      {
        title: 'Indiana-side and multi-county pairs are routine interstate or multi-market jobs',
        detail:
          'Households regularly move Jefferson KY ↔ Clark/Floyd County IN, or to Oldham, Bullitt, or Shelby County KY. A Kentucky household goods certificate alone does not authorize Indiana delivery — verify FMCSA when any leg leaves Kentucky. Do not assume OH PUCO or IN DOR credentials cover Kentucky intrastate work.',
      },
      KY_REG_BULLET,
    ],
  },
  zonesHeading: 'Jefferson County access zones',
  zonesIntro:
    'Plan by downtown–NuLu vertical product, Highlands–Crescent Hill neighborhood stock, St. Matthews–East End multi-unit, South End–airport belts, West End grids, and Jeffersontown–Prospect growth HOAs — access rules cluster by product more than ZIP alone.',
  zones: [
    {
      id: 'downtown-nulu-waterfront',
      name: 'Downtown Louisville, NuLu & Waterfront towers',
      shortName: 'Downtown / NuLu',
      neighborhoods: [
        'Downtown Louisville',
        'NuLu',
        'Waterfront edges',
        'Phoenix Hill edges',
        'Butchertown edges',
        'Main Street corridors',
      ],
      housingTypes: 'High-rise condo, loft conversions, mid-rise multifamily',
      challenges: [
        'Elevator reservations, dock slots, and building COIs',
        'Limited legal curb and event-day freeflow',
        'I-64 / I-65 approach congestion and bridge traffic',
      ],
      moverTips:
        'Book elevators and COIs in writing before the crew day. Prefer mid-week early freight windows. Photo dock or curb staging options.',
      cityKeywords: [
        'louisville',
        'downtown louisville',
        'nulu',
      ],
    },
    {
      id: 'highlands-crescent-hill',
      name: 'Highlands, Crescent Hill, Clifton & Bardstown Road stock',
      shortName: 'Highlands / Crescent Hill',
      neighborhoods: [
        'The Highlands',
        'Crescent Hill',
        'Clifton',
        'Cherokee Triangle edges',
        'Deer Park edges',
        'Bardstown Road corridors',
      ],
      housingTypes: 'Walk-up multifamily, older SFH, duplexes, limited elevators',
      challenges: [
        'Multi-flight stairs and scarce truck length',
        'Tight residential curb and tree-lined blocks',
        'Bardstown / Frankfort Avenue freeflow',
      ],
      moverTips:
        'Survey stair counts with photos. Prefer mid-week starts near corridor peaks. Inventory basements carefully.',
      cityKeywords: [
        'highlands',
        'crescent hill',
        'clifton',
        'louisville',
      ],
    },
    {
      id: 'st-matthews-east-inner',
      name: 'St. Matthews, Lyndon & east inner-ring multi-unit',
      shortName: 'St. Matthews / Lyndon',
      neighborhoods: [
        'St. Matthews',
        'Lyndon',
        'St. Regis Park edges',
        'Watterson Trail corridors',
        'Shelbyville Road corridors',
        'Brownsboro edges',
      ],
      housingTypes: 'Multi-family, townhomes, older SFH, some elevators',
      challenges: [
        'I-264 / Shelbyville Road freeflow',
        'HOA and multi-unit mix across short distances',
        'Retail-corridor staging limits',
      ],
      moverTips:
        'Collect building rules early. Clarify St. Matthews vs Louisville metro addresses. Price I-264 honestly for cross-zone pairs.',
      cityKeywords: [
        'st matthews',
        'saint matthews',
        'lyndon',
        'louisville',
      ],
    },
    {
      id: 'south-end-airport',
      name: 'South End, Airport corridor & I-65 south belts',
      shortName: 'South End / airport',
      neighborhoods: [
        'South End',
        'Airport corridor',
        'Okolona edges',
        'Newburg edges',
        'Iroquois edges',
        'Outer Loop corridors',
      ],
      housingTypes: 'Ranch and split-level SFH, multi-unit, some newer multi-family',
      challenges: [
        'I-65 / Outer Loop freeflow and airport traffic spikes',
        'Mixed older stock and long carries',
        'Industrial-adjacent staging constraints',
      ],
      moverTips:
        'Avoid peak airport windows when flexible. Survey older stock carefully. Clarify Louisville vs unincorporated addresses.',
      cityKeywords: [
        'okolona',
        'newburg',
        'louisville',
        'iroquois',
      ],
    },
    {
      id: 'west-end-shively',
      name: 'West End, Shively & western grid stock',
      shortName: 'West End / Shively',
      neighborhoods: [
        'West End',
        'Shively',
        'Portland edges',
        'Shawnee edges',
        'Parkland edges',
        'Dixie Highway corridors',
      ],
      housingTypes: 'Older SFH, bungalows, multi-unit pockets, ranch stock',
      challenges: [
        'Basement stairs and tighter residential curb',
        'I-264 / Dixie Highway freeflow',
        'Mixed municipal rules across short distances',
      ],
      moverTips:
        'Confirm municipality on the estimate. Photo driveway and basement access. Prefer mid-week starts.',
      cityKeywords: [
        'shively',
        'west end louisville',
        'louisville',
        'portland',
      ],
    },
    {
      id: 'jeffersontown-prospect-east',
      name: 'Jeffersontown, Middletown, Prospect & East End growth HOAs',
      shortName: 'East End HOAs',
      neighborhoods: [
        'Jeffersontown',
        'Middletown',
        'Prospect',
        'Anchorage edges',
        'Worthington Hills edges',
        'Hurstbourne corridors',
      ],
      housingTypes: 'HOA SFH, townhomes, newer multi-family, gated product',
      challenges: [
        'HOA gate lists, truck-length limits, and timed windows',
        'I-265 / US-60 freeflow and longer empty miles vs downtown',
        'School-calendar summer peaks',
      ],
      moverTips:
        'Collect HOA packets and gate codes early. Confirm truck length rules. Price I-265 honestly for westbound unload pairs.',
      cityKeywords: [
        'jeffersontown',
        'middletown',
        'prospect',
        'anchorage',
        'hurstbourne',
      ],
    },
  ],
  costDrivers: {
    title: 'What drives Jefferson County moving costs',
    intro:
      'Access product, elevator/HOA admin, and I-64 / I-65 / I-264 freeflow move the number more than packing skill alone — this is Louisville logistics, not Missouri Jefferson fringe pricing and not Lexington New Circle defaults.',
    drivers: [
      {
        title: 'Elevator reservations, docks & building COIs',
        detail:
          'Downtown, NuLu, and Waterfront vertical product add labor and schedule risk before packing skill matters.',
      },
      {
        title: 'Walk-up stairs, basements & Highlands-grid curb',
        detail:
          'Highlands, Crescent Hill, Clifton, and West End stock add flight counts that flat-rate optimism underprices.',
      },
      {
        title: 'I-64 · I-65 · I-71 · I-264 · I-265 congestion',
        detail:
          'Cross-metro pairs burn portal-to-portal hours even when map miles look short.',
      },
      {
        title: 'East End HOA gates & truck-length rules',
        detail:
          'Jeffersontown, Middletown, and Prospect packets rewrite jobs that look simple on a map.',
      },
      {
        title: 'Indiana-side & multi-county empty miles',
        detail:
          'Clark/Floyd IN, Oldham, Bullitt, and Shelby destinations raise staging distance and authority complexity when leaving Jefferson or Kentucky.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (simple access)',
        value: '$500–$1,900+',
        note: 'Higher with elevators, walk-ups, or peak I-264 pairs',
      },
      {
        label: '2–3BR condo, duplex, or mid-size SFH',
        value: '$1,500–$4,500+',
        note: 'Stairs, COI, and HOA soft costs trend up',
      },
      {
        label: '3–4+ BR / high-rise / cross-zone',
        value: '$3,000–$9,500+',
        note: 'Tower moves and long I-65 / I-265 pairs price highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$120–$210+/hr',
        note: 'Portal-to-portal; packing, COI admin, and stairs scale up',
      },
    ],
  },
  seasonal: {
    title: 'When to schedule a Jefferson County move',
    intro:
      'Lease cycles, Derby-adjacent hospitality spikes, school calendars, summer heat, severe-storm season, and winter ice reshape access and crew availability across the Louisville grid.',
    items: [
      {
        title: 'Best windows: mid-week early mornings',
        detail:
          'Tuesday–Thursday starts clear curb, ease downtown freight windows, and reduce I-64 / I-65 / I-264 pain. Avoid month-end Fridays when leases and elevators collide.',
      },
      {
        title: 'Peak season: late May–mid-September',
        detail:
          'Apartment turnover and family school calendars fill first. Book 2–4 weeks ahead for peak weekends and elevator or HOA slots.',
      },
      {
        title: 'Derby season & event freeflow',
        detail:
          'Late April–early May hospitality and event traffic compress downtown and corridor staging. Prefer flexible dates and confirm building blackout windows.',
      },
      {
        title: 'Summer heat, storms & winter ice',
        detail:
          'June–August heat and thunderstorms raise cancellation risk; December–February adds icy stoops. Prefer early starts and weather contingency on older stock.',
      },
    ],
  },
  specialized: [
    {
      id: 'jefferson-louisville-elevator-hoa',
      title: 'Louisville elevator, neighborhood & I-264 logistics module',
      intro:
        'Jefferson County estimates fail more often on stair surveys, elevator packets, HOA gates, and freeway freeflow than on packing skill alone.',
      bullets: [
        'Collect building COI, elevator reservations, and dock rules before the survey is final.',
        'Photo stair counts, curb options, and basement access for Highlands, Crescent Hill, and West End stock.',
        'Price portal-to-portal time for any pair that rides I-64, I-65, I-71, I-264, or I-265 at peak.',
        'Collect HOA packets early for Jeffersontown, Middletown, and Prospect product.',
        'Clarify Louisville, St. Matthews, Jeffersontown, and unincorporated addresses on every estimate.',
        'For in-state jobs verify KYTC Division of Motor Carriers household goods certificate (DMT/DVR); verify FMCSA for any out-of-state leg — especially Indiana-side pairs.',
      ],
    },
    {
      id: 'not-jefferson-mo-not-lexington',
      title: 'Not Jefferson County MO · not Lexington / NKY module',
      intro:
        'A single “Kentucky metro rate” collapses when Louisville core product is confused with Missouri Jefferson I-55 fringe, Fayette County horse-country, or Northern Kentucky Cincinnati-collar logistics.',
      bullets: [
        'Do not price NuLu elevators like Arnold–Imperial multi-family or like Covington riverfront walk-ups as interchangeable defaults.',
        'Keep Jefferson KY vs Oldham / Bullitt / Shelby county lines clear on multi-address estimates.',
        'Match downtown lease peaks separately from East End school-calendar waves.',
        'Treat river-crossing legs as interstate authority problems — KYTC alone is not enough for Indiana delivery. Do not substitute OH PUCO or IN DOR for Kentucky intrastate work.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Jefferson County?',
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
              'Jefferson County Public Schools (JCPS) covers most of the county, with magnet and choice programs that are competitive. Assignment and lottery rules are address- and process-based — marketing neighborhood names do not guarantee a campus.',
          },
          {
            title: 'Choice, boundaries & enrollment pressure',
            detail:
              'Popular magnets and boundary edges can be competitive. Confirm enrollment windows early when relocating mid-year.',
          },
          {
            title: 'Research sources',
            detail:
              'JCPS boundary tools, Kentucky Department of Education data, and campus visits beat ranking screenshots alone.',
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
              'UofL Health, Norton Healthcare, Baptist Health Louisville, and specialty campuses anchor care across Jefferson County. Confirm insurance networks for your household.',
          },
          {
            title: 'What relocators should do',
            detail:
              'Map peak-hour drive times to preferred campuses — I-64, I-65, and I-264 freeflow change “nearby” on paper. Transfer records early.',
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
              'Expect downtown and NuLu vertical product; Highlands–Crescent Hill walk-ups; St. Matthews multi-unit; South and West End older SFH; East End HOA growth toward Jeffersontown and Prospect.',
          },
          {
            title: 'Cost variation inside the county',
            detail:
              'Purchase prices and rents vary sharply by neighborhood and product. Budget for condo/HOA dues, older-building repair risk, and parking where relevant.',
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
            title: 'Downtown / NuLu urban lifestyle',
            detail:
              'Suits people prioritizing walkability and amenities — with elevator, parking, and event-day tradeoffs on move day.',
          },
          {
            title: 'Highlands / Crescent Hill character living',
            detail:
              'Often appeals for neighborhood feel — with stairs, curb limits, and denser staging constraints.',
          },
          {
            title: 'St. Matthews / east inner-ring convenience',
            detail:
              'Attracts households seeking retail access and multi-unit options — with I-264 freeflow as a daily input.',
          },
          {
            title: 'East End HOA growth (Jeffersontown / Middletown / Prospect)',
            detail:
              'Fits buyers chasing newer product and schools — with HOA rules and longer empty miles to the core.',
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
              'Healthcare systems, logistics and UPS Worldport adjacency, professional services downtown, manufacturing, and education concentrate demand across the metro.',
          },
          {
            title: 'Commute realism',
            detail:
              'Peak freeway freeflow is real — including Indiana-side reverse commutes. Test peak routes before choosing solely on rent or purchase price.',
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
              'Jefferson County, KY stacks Louisville urban cores, classic neighborhood grids, and East End growth — different from Jefferson County MO I-55 fringe, Lexington horse-country, and Northern Kentucky Cincinnati-collar patterns.',
          },
          {
            title: 'Climate',
            detail:
              'Humid subtropical climate with hot summers, severe-storm risk, and freeze-thaw winters. Plan outdoor staging, heat, and ice contingency as part of move-in.',
          },
          {
            title: 'Culture and pace',
            detail:
              'Visit at peak and off-peak times when deciding — Derby season, school calendars, sports and event days, and winter weather reshape daily rhythm.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Jefferson County resources',
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify KYTC Division of Motor Carriers household goods licensing for in-state moves and FMCSA for interstate legs before deposits.',
    items: [
      {
        label: 'Louisville Metro Government',
        href: 'https://louisvilleky.gov/',
        external: true,
        note: 'City-county services, permits & neighborhood context',
      },
      {
        label: 'Jefferson County Public Schools (JCPS)',
        href: 'https://www.jefferson.kyschools.us/',
        external: true,
        note: 'Enrollment & boundary research',
      },
      {
        label: 'City of Jeffersontown',
        href: 'https://www.jeffersontownky.com/',
        external: true,
        note: 'East End municipality context',
      },
      {
        label: 'GOKY — Kentucky 511 traveler info',
        href: 'https://goky.ky.gov/',
        external: true,
        note: 'I-64 / I-65 / I-71 / I-264 / I-265 before load windows',
      },
    ],
  },
  directoryHint:
    'Prefer crews with elevator/COI experience for downtown–NuLu product; stair and basement fluency for Highlands–Crescent Hill and West End stock; HOA gate fluency for Jeffersontown–Middletown–Prospect; honest I-64 · I-65 · I-71 · I-264 · I-265 timing for cross-zone pairs. Verify KYTC Division of Motor Carriers household goods certificate (DMT/DVR) for intrastate moves and FMCSA for interstate legs (including Indiana-side pairs) before deposits.',
  lastReviewed: '2026-07-24',
});

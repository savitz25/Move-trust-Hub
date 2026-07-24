import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeWvPack,
  WV_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/west-virginia/wv-shared';

/**
 * Monongalia County, WV — Morgantown / WVU campus cycles.
 * NOT Charleston capital (Kanawha), NOT Martinsburg (Berkeley), NOT Huntington (Cabell).
 */
export const monongaliaCountyWvIntelligence: CountyIntelligencePack = finalizeWvPack({
  countySlug: 'monongalia',
  hubTitle: 'Monongalia County Moving Intelligence Hub',
  eyebrow:
    'Monongalia County, WV · Morgantown / WVU campus cycles & I-79 / I-68 logistics',
  h1: 'Moving in Monongalia County: Morgantown Access, WVU Campus Cycles & I-79 / I-68 Logistics',
  heroOpener:
    'Monongalia County, West Virginia is Morgantown and the WVU campus economy — downtown multi-unit and walk-ups, Sunnyside and campus-adjacent density, Star City–Westover river edges, Sabraton–Cheat Lake growth, Granville–West Run belts, and rural mountain stock — not Charleston capital valley product, not Martinsburg Eastern Panhandle growth, and not Huntington Tri-State river defaults. Expect semester peaks in August and May, steep hills, scarce curb, long carries, multi-flight stairs, and I-79 / I-68 freeflow that rewrites “local” estimates. A Sunnyside walk-up, a Cheat Lake hillside home, a Star City multi-unit dock, and a rural mountain gravel approach do not share truck access or crew skill. Academic calendars dominate crew availability. This hub is for people moving in Monongalia County, WV — Morgantown / WVU access — not a renamed Charleston north page.',
  heroCredibility:
    'WV PSC Motor Carrier Certificate of Convenience and Necessity (HHG) for intrastate · FMCSA for interstate · WVU campus-cycle & hill logistics awareness · Curated listings',
  majorCorridors: 'I-79 · I-68 · US-119 · local Morgantown grid',
  whatMakesDifferent: {
    title: 'What makes moving in Monongalia County different',
    intro:
      'These are Monongalia County / Morgantown and WVU realities — semester peaks, hillside multi-unit density, campus curb scarcity, and I-79 / I-68 freeflow — not Charleston capital defaults, not Berkeley I-81 growth HOAs alone, and not Huntington Ohio River templates.',
    bullets: [
      {
        title: 'This is Monongalia County (Morgantown / WVU) — not Charleston north',
        detail:
          'Ignore Kanawha capital-valley templates, Berkeley Eastern Panhandle growth scripts, and Cabell Tri-State river defaults. Monongalia is downtown Morgantown multi-unit, WVU campus / Sunnyside density, Star City–Westover, Sabraton–Cheat Lake, and Granville product. Match estimates to Monongalia addresses and West Virginia PSC authority — not Charleston corridor scripts.',
      },
      {
        title: 'Semester peaks in August and May rewrite crew availability',
        detail:
          'Move-in and move-out waves around the academic calendar fill elevators, curb, and crews first. A mid-semester mid-week job does not share that scarcity stack. Book 2–6 weeks ahead for peak campus windows.',
      },
      {
        title: 'Hills, stairs, and campus multi-unit underprice flat-rate optimism',
        detail:
          'Sunnyside walk-ups, downtown multi-flight stock, and hillside approaches add long carries, tight turns, and scarce truck length that look simple on a map. Photo stair counts and curb options early.',
      },
      {
        title: 'Cheat Lake, Sabraton, and West Run burn empty miles',
        detail:
          'Growth and lake-edge pairs look “still Morgantown” and still burn 20–45+ minutes at peak through local arterials and interstate approaches. Price portal-to-portal honestly.',
      },
      {
        title: 'I-79, I-68, and US-119 freeflow rewrites local timing',
        detail:
          'Downtown ↔ Cheat Lake, Granville ↔ Sunnyside, or Star City ↔ Sabraton pairs ride hill bottlenecks and interstate merge friction. Peak-hour freeflow is a cost driver, not a footnote.',
      },
      {
        title: 'In-state and interstate pairs are routine',
        detail:
          'Households regularly move Monongalia County ↔ Preston, Marion, or Harrison County, or into Pennsylvania and farther markets for jobs and family. A WV PSC household goods certificate alone does not authorize interstate delivery — verify FMCSA when any leg leaves West Virginia.',
      },
      WV_REG_BULLET,
    ],
  },
  zonesHeading: 'Monongalia County access zones',
  zonesIntro:
    'Plan by Downtown Morgantown multi-unit, WVU campus / Sunnyside density, Star City–Westover river edges, Sabraton–Cheat Lake growth, Granville–West Run belts, and rural mountain edges — access rules cluster by hills, campus curb scarcity, and academic calendars more than ZIP alone.',
  zones: [
    {
      id: 'downtown-morgantown-multi-unit',
      name: 'Downtown Morgantown multi-unit, High Street & riverfront edges',
      shortName: 'Downtown multi-unit',
      neighborhoods: [
        'Downtown Morgantown',
        'High Street corridors',
        'Wharf District edges',
        'Riverfront multi-unit pockets',
        'Older walk-up stock',
        'Retail-adjacent lofts',
      ],
      housingTypes: 'Walk-up multifamily, loft, limited elevators, mixed SFH edges',
      challenges: [
        'Multi-flight stairs and scarce truck length',
        'Tight curb near retail and event traffic',
        'I-79 / local arterial freeflow into downtown',
      ],
      moverTips:
        'Survey stair counts with photos. Prefer mid-week early freight windows away from game and event peaks. Confirm load zones and elevator rules in writing when present.',
      cityKeywords: [
        'morgantown',
        'downtown morgantown',
      ],
    },
    {
      id: 'wvu-campus-sunnyside',
      name: 'WVU campus, Sunnyside & campus-adjacent density',
      shortName: 'Campus / Sunnyside',
      neighborhoods: [
        'Sunnyside',
        'Campus-adjacent multi-unit',
        'University Avenue corridors',
        'Student housing belts',
        'Hillside walk-up stock',
        'Near-campus SFH edges',
      ],
      housingTypes: 'Dense multi-unit, walk-ups, limited elevators, mixed SFH edges',
      challenges: [
        'Semester peak congestion and scarce curb',
        'Steep hills, long carries, and multi-flight stairs',
        'Building COIs and timed move windows',
      ],
      moverTips:
        'Book campus-adjacent windows early for August and May peaks. Photo every flight and landing. Prefer early morning starts before street parking fills.',
      cityKeywords: [
        'sunnyside',
        'morgantown',
      ],
    },
    {
      id: 'star-city-westover',
      name: 'Star City, Westover & Monongahela river edges',
      shortName: 'Star City / Westover',
      neighborhoods: [
        'Star City',
        'Westover',
        'River-edge multi-unit pockets',
        'US-19 corridors',
        'Older SFH and duplex stock',
        'Bridge-approach residential belts',
      ],
      housingTypes: 'Multi-family, SFH, duplexes, ranch and two-story stock',
      challenges: [
        'Bridge and river-approach freeflow',
        'Mixed municipal rules across short distances',
        'Older stairs and tight residential curb',
      ],
      moverTips:
        'Clarify Star City vs Westover vs Morgantown addresses. Survey curb and stair access with photos. Price bridge freeflow honestly at peak.',
      cityKeywords: [
        'star city',
        'westover',
      ],
    },
    {
      id: 'sabraton-cheat-lake',
      name: 'Sabraton, Cheat Lake & eastern growth / lake-edge belts',
      shortName: 'Sabraton / Cheat Lake',
      neighborhoods: [
        'Sabraton',
        'Cheat Lake',
        'I-68 east corridors',
        'Lake-edge SFH and hillside homes',
        'Eastern multi-family pockets',
        'Growth subdivision edges',
      ],
      housingTypes: 'SFH, hillside homes, multi-family, HOA and lake-edge stock',
      challenges: [
        'Longer empty miles to downtown and campus cores',
        'Hillside drives, long carries, and limited turnaround',
        'I-68 freeflow and school-calendar peaks',
      ],
      moverTips:
        'Survey driveway grade and turnaround early. Collect HOA or lake-access rules when present. Price I-68 and arterial time honestly for westbound unload pairs.',
      cityKeywords: [
        'sabraton',
        'cheat lake',
      ],
    },
    {
      id: 'granville-west-run',
      name: 'Granville, West Run & northern / western approach belts',
      shortName: 'Granville / West Run',
      neighborhoods: [
        'Granville',
        'West Run corridors',
        'Northern multi-family pockets',
        'I-79 approach belts',
        'Mixed SFH growth stock',
        'Retail-adjacent residential edges',
      ],
      housingTypes: 'Multi-family, SFH, townhomes, ranch and two-story stock',
      challenges: [
        'I-79 freeflow and cross-zone empty miles',
        'Mixed complex rules and curb scarcity near retail',
        'Peak campus-adjacent spillover demand',
      ],
      moverTips:
        'Collect complex rules early. Clarify Granville vs Morgantown addresses. Price I-79 portal time honestly for campus unload pairs.',
      cityKeywords: [
        'granville',
        'west run',
      ],
    },
    {
      id: 'rural-mountain-edges',
      name: 'Rural Monongalia mountain edges & valley approaches',
      shortName: 'Rural mountain edges',
      neighborhoods: [
        'Blacksville edges',
        'Cassville edges',
        'Core edges',
        'Dellslow edges',
        'Rural residential belts',
        'Mountain and ridge approaches',
      ],
      housingTypes: 'SFH, rural-residential, limited multi-unit, mixed gravel access',
      challenges: [
        'Longer empty miles and staging distance',
        'Gravel drives, narrow lanes, and limited turnaround',
        'Weather-sensitive hill and ridge approaches',
      ],
      moverTips:
        'Price empty miles and weather contingency honestly. Survey lane width and turnaround before committing truck size. Align with school and semester calendars when relevant.',
      cityKeywords: [
        'blacksville',
        'cassville',
        'core',
        'dellslow',
      ],
    },
  ],
  costDrivers: {
    title: 'What drives Monongalia County moving costs',
    intro:
      'Campus multi-unit stairs, hillside access, semester peak scarcity, and I-79 / I-68 freeflow move the number more than packing skill alone — this is Morgantown / WVU logistics, not Charleston capital defaults or Eastern Panhandle growth scripts.',
    drivers: [
      {
        title: 'Semester peak curb, elevators & crew scarcity',
        detail:
          'August and May campus waves rewrite jobs that look simple on a calendar.',
      },
      {
        title: 'Multi-flight stairs, walk-ups & scarce curb',
        detail:
          'Sunnyside, downtown, and campus-adjacent stock add flight counts that flat-rate optimism underprices.',
      },
      {
        title: 'Hillside drives, long carries & turnaround limits',
        detail:
          'Cheat Lake, campus hills, and mountain-edge product rewrite access before packing skill matters.',
      },
      {
        title: 'I-79 · I-68 · US-119 congestion',
        detail:
          'Cross-zone pairs burn portal-to-portal hours even when map miles look short.',
      },
      {
        title: 'In-state & interstate empty miles',
        detail:
          'Preston, Marion, Harrison, Pennsylvania, and farther destinations raise staging distance and authority complexity when leaving Monongalia County or West Virginia.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (simple access)',
        value: '$450–$1,900+',
        note: 'Higher with walk-ups, campus peaks, hills, or peak I-79 pairs',
      },
      {
        label: '2–3BR condo, duplex, or mid-size SFH',
        value: '$1,450–$4,500+',
        note: 'Stairs, hillside access, and multi-unit soft costs trend up',
      },
      {
        label: '3–4+ BR / hillside / cross-zone',
        value: '$2,900–$9,000+',
        note: 'Steep access and long I-79 / I-68 pairs price highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$110–$200+/hr',
        note: 'Portal-to-portal; packing, stairs, and semester peaks scale up',
      },
    ],
  },
  seasonal: {
    title: 'When to schedule a Monongalia County move',
    intro:
      'WVU academic calendars, family school calendars, summer humidity and heat, severe-storm risk, and winter ice on hills reshape access and crew availability across the Morgantown grid.',
    items: [
      {
        title: 'Best windows: mid-week early mornings outside semester peaks',
        detail:
          'Tuesday–Thursday starts clear curb and reduce I-79 / I-68 pain. Avoid August move-in and May move-out weekends unless booked well ahead with campus-fluent crews.',
      },
      {
        title: 'Peak season: late July–late August and early–mid May',
        detail:
          'Semester turnover fills first — then family summer peaks. Book 2–6 weeks ahead for campus multi-unit and hillside-access crews.',
      },
      {
        title: 'Storm-season & heat risk',
        detail:
          'Spring and summer storms and humid heat raise cancellation and staging risk on hills. Prefer flexible dates, covered staging plans, and early starts when forecasts allow.',
      },
      {
        title: 'Winter ice on hills & campus approaches',
        detail:
          'Freeze-thaw winters reshape outdoor labor — especially on Sunnyside, Cheat Lake, and mountain-edge drives. Prefer early starts and weather contingency on older multi-unit stock.',
      },
    ],
  },
  specialized: [
    {
      id: 'morgantown-wvu-corridor',
      title: 'Morgantown WVU multi-unit, hills & I-79 / I-68 logistics module',
      intro:
        'Monongalia County estimates fail more often on stair surveys, campus curb scarcity, hillside access, and interstate freeflow than on packing skill alone.',
      bullets: [
        'Book campus-adjacent and multi-unit windows early for August and May semester peaks.',
        'Photo stair counts, landings, curb options, and basement access for Sunnyside and downtown walk-ups.',
        'Survey driveway grade and turnaround for Cheat Lake, hillside, and rural mountain-edge product.',
        'Price portal-to-portal time for any pair that rides I-79, I-68, or US-119 at peak.',
        'Clarify Morgantown, Sunnyside, Star City, Westover, Sabraton, Cheat Lake, Granville, and unincorporated addresses on every estimate.',
        'For in-state jobs verify WV PSC Motor Carrier Certificate of Convenience and Necessity covering household goods; verify FMCSA for any out-of-state leg.',
      ],
    },
    {
      id: 'not-charleston-not-panhandle',
      title: 'Not Charleston capital · not Eastern Panhandle module',
      intro:
        'A single “Monongalia County rate” collapses when Morgantown campus product is confused with Kanawha capital-valley logistics or Berkeley I-81 growth defaults alone.',
      bullets: [
        'Do not price Sunnyside walk-ups like Charleston South Hills ranches or like Martinsburg Inwood HOAs as interchangeable defaults.',
        'State the market as Monongalia County / Morgantown / WVU on every estimate — disambiguate from Kanawha, Berkeley, Cabell, and Wood County markets.',
        'Keep in-state vs interstate addresses clear when Pennsylvania or farther pairs appear — interstate authority applies when any leg leaves West Virginia.',
        'Match semester peaks separately from family school-calendar and mid-week corporate windows.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Monongalia County?',
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
              'Monongalia County Schools is the primary public system across Morgantown, Star City, Westover, Sabraton, Cheat Lake, Granville, and mountain communities. West Virginia University anchors higher education. Assignment is address-based — marketing neighborhood names do not guarantee a campus.',
          },
          {
            title: 'Choice, boundaries & enrollment pressure',
            detail:
              'Popular programs and growth-corridor boundary edges can be competitive. Confirm enrollment windows early when relocating mid-year — and plan around semester traffic if you live near campus.',
          },
          {
            title: 'Research sources',
            detail:
              'Monongalia County Schools boundary tools, West Virginia Department of Education data, WVU resources for student housing logistics, and campus visits beat ranking screenshots alone.',
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
              'WVU Medicine / J.W. Ruby Memorial Hospital and related specialty campuses anchor care across the Morgantown region. Confirm insurance networks for your household.',
          },
          {
            title: 'What relocators should do',
            detail:
              'Map peak-hour drive times to preferred campuses — I-79, I-68, and hillside freeflow change “nearby” on paper. Transfer records early.',
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
              'Expect downtown Morgantown multi-unit and walk-ups; Sunnyside and campus-adjacent density; Star City–Westover river-edge product; Sabraton–Cheat Lake hillside and growth SFH; Granville–West Run multi-family; rural mountain-edge stock.',
          },
          {
            title: 'Cost variation inside the county',
            detail:
              'Purchase prices and rents vary sharply by campus proximity and product type. Budget for student-market competition near WVU, older-building repair risk, and seasonal lease spikes.',
          },
          {
            title: 'Building and complex governance',
            detail:
              'Multi-unit management and limited HOAs often control move hours, truck size, elevators, and deposits — especially near campus. Read documents carefully.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Which areas fit whom',
        bullets: [
          {
            title: 'Downtown / campus multi-unit lifestyle',
            detail:
              'Suits students, staff, and people prioritizing walkable access — with stair, curb, and semester-peak tradeoffs on move day.',
          },
          {
            title: 'Cheat Lake / Sabraton character living',
            detail:
              'Often appeals for space and lake-edge feel — with hillside driveway geometry and longer empty miles to campus cores.',
          },
          {
            title: 'Star City / Westover / Granville belts',
            detail:
              'Fits households chasing relative value and river or northern access — with mixed multi-unit logistics and bridge freeflow.',
          },
          {
            title: 'Rural mountain-edge living',
            detail:
              'Attracts households seeking quiet and space — with longer staging distance and weather-sensitive approaches.',
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
              'West Virginia University, WVU Medicine / Ruby Memorial, research and professional services, retail, logistics, and regional education concentrate demand across Monongalia County.',
          },
          {
            title: 'Commute realism',
            detail:
              'Peak I-79, I-68, and US-119 freeflow is real — including hillside approaches and Pennsylvania reverse pairs. Test peak routes before choosing solely on rent or purchase price.',
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
              'Monongalia County is Morgantown / WVU campus-economy density — hills, multi-unit stock, and semester rhythm — not Charleston capital product and not Eastern Panhandle DC-adjacency growth.',
          },
          {
            title: 'Climate',
            detail:
              'Humid continental / Appalachian climate with hot humid summers, storm risk, and freeze-thaw winters that ice hillside drives. Plan outdoor staging, heat, and ice contingency as part of move-in.',
          },
          {
            title: 'Culture and pace',
            detail:
              'Visit at peak and off-peak times when deciding — game days, semester turnover, and winter hills reshape daily rhythm.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Monongalia County resources',
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify WV PSC Motor Carrier household goods certificate status for in-state moves and FMCSA for interstate legs before deposits.',
    items: [
      {
        label: 'Monongalia County, West Virginia — official site',
        href: 'https://www.monongaliacounty.gov/',
        external: true,
        note: 'County services & property context',
      },
      {
        label: 'City of Morgantown',
        href: 'https://www.morgantownwv.gov/',
        external: true,
        note: 'Primary municipality context',
      },
      {
        label: 'West Virginia University',
        href: 'https://www.wvu.edu/',
        external: true,
        note: 'Campus calendar & housing context',
      },
      {
        label: 'WVU Medicine — Ruby Memorial',
        href: 'https://wvumedicine.org/ruby-memorial-hospital/',
        external: true,
        note: 'Major healthcare system context',
      },
      {
        label: 'WV 511 — traveler information',
        href: 'https://wv511.org/',
        external: true,
        note: 'I-79 / I-68 / US-119 before load windows',
      },
    ],
  },
  directoryHint:
    'Prefer crews with campus multi-unit and stair fluency for Sunnyside and downtown Morgantown product; hillside driveway and long-carry fluency for Cheat Lake and mountain edges; honest I-79 · I-68 · US-119 timing for cross-zone pairs; and August/May semester-peak capacity. Verify WV PSC Motor Carrier Certificate of Convenience and Necessity covering household goods for intrastate moves and FMCSA for interstate legs before deposits. This is Monongalia County (Morgantown / WVU) — not Charleston capital north.',
  lastReviewed: '2026-07-24',
});

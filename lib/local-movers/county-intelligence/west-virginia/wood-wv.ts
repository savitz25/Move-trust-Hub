import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeWvPack,
  WV_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/west-virginia/wv-shared';

/**
 * Wood County, WV — Parkersburg / Ohio River mid-Ohio Valley.
 * NOT Huntington (Cabell), NOT Charleston capital (Kanawha), NOT Morgantown (Monongalia).
 */
export const woodCountyWvIntelligence: CountyIntelligencePack = finalizeWvPack({
  countySlug: 'wood',
  hubTitle: 'Wood County Moving Intelligence Hub',
  eyebrow:
    'Wood County, WV · Parkersburg / Ohio River mid-Ohio Valley & I-77 logistics',
  h1: 'Moving in Wood County: Parkersburg Access, Ohio River Grids & I-77 / US-50 Logistics',
  heroOpener:
    'Wood County, West Virginia is Parkersburg and the mid-Ohio Valley river corridor — downtown multi-unit and riverfront pockets, Vienna residential belts, Mineral Wells–south growth approaches, Williamstown northern edges, industrial river stock, and rural eastern mountain-edge product — not Huntington Tri-State density, not Charleston capital valley grids, and not Morgantown campus cycles. Expect older river-city housing, scarce curb, multi-flight stairs, short Ohio hops that trigger interstate authority, and I-77 / US-50 / WV-2 freeflow that rewrites “local” estimates. A downtown Parkersburg elevator dock, a Vienna ranch, a Mineral Wells growth driveway, and a rural eastern gravel approach do not share truck access or crew skill. School calendars and industrial employment cycles are real inputs. This hub is for people moving in Wood County, WV — Parkersburg Ohio River access — not a renamed Huntington north page.',
  heroCredibility:
    'WV PSC Motor Carrier Certificate of Convenience and Necessity (HHG) for intrastate · FMCSA for interstate (incl. short OH hops) · Mid-Ohio Valley river & I-77 logistics awareness · Curated listings',
  majorCorridors: 'I-77 · US-50 · WV-2 · local Parkersburg grid',
  whatMakesDifferent: {
    title: 'What makes moving in Wood County different',
    intro:
      'These are Wood County / Parkersburg mid-Ohio Valley realities — river-city multi-unit, Vienna residential grids, industrial river edges, and short Ohio legs — not Huntington Marshall-campus defaults, not Charleston Kanawha Valley hills alone, and not Morgantown semester multi-unit templates.',
    bullets: [
      {
        title: 'This is Wood County (Parkersburg / Ohio River) — not Huntington north',
        detail:
          'Ignore Cabell Huntington Tri-State templates, Kanawha capital-valley scripts, and Monongalia campus multi-unit defaults. Wood is Parkersburg, Vienna, Mineral Wells, Williamstown, industrial river edges, and rural eastern product. Match estimates to Wood addresses and West Virginia PSC authority — not Huntington corridor scripts.',
      },
      {
        title: 'Short Ohio hops need FMCSA — not “still local” optimism',
        detail:
          'Households routinely cross into Ohio for jobs, family, and housing across the mid-Ohio Valley. Map miles can look short and still leave West Virginia. A WV PSC household goods certificate alone does not authorize interstate delivery — verify FMCSA when any leg crosses a state line.',
      },
      {
        title: 'Downtown Parkersburg multi-unit and older river stock underprice flat-rate optimism',
        detail:
          'Walk-ups, scarce curb, older basements, elevators where present, and multi-flight stairs fail estimates more often than packing skill alone. Photo stair counts and curb staging early.',
      },
      {
        title: 'Vienna, Mineral Wells, and Williamstown burn empty miles',
        detail:
          'North-south and river-edge pairs look “still Wood County” and still burn 20–45+ minutes at peak through I-77, US-50, WV-2, and local arterials. Price portal-to-portal honestly.',
      },
      {
        title: 'I-77, US-50, and WV-2 freeflow rewrites local timing',
        detail:
          'Parkersburg ↔ Vienna, Mineral Wells ↔ downtown, or Williamstown ↔ industrial river pairs ride valley bottlenecks and interstate merge friction. Peak-hour freeflow is a cost driver, not a footnote.',
      },
      {
        title: 'In-state and interstate pairs are routine',
        detail:
          'Households regularly move Wood County ↔ Jackson, Wirt, or Ritchie County, or into Ohio mid-valley markets. Confirm authority for every out-of-state leg before deposits.',
      },
      WV_REG_BULLET,
    ],
  },
  zonesHeading: 'Wood County access zones',
  zonesIntro:
    'Plan by Downtown Parkersburg multi-unit, Vienna residential belts, Mineral Wells–south approaches, Williamstown north edges, industrial river stock, and rural eastern edges — access rules cluster by river-city curb scarcity, driveway product, and interstate freeflow more than ZIP alone.',
  zones: [
    {
      id: 'downtown-parkersburg',
      name: 'Downtown Parkersburg, riverfront multi-unit & core grid',
      shortName: 'Downtown Parkersburg',
      neighborhoods: [
        'Downtown Parkersburg',
        'Market Street corridors',
        'Riverfront multi-unit pockets',
        'Older walk-up stock',
        'Core retail-adjacent lofts',
        'Near-downtown SFH edges',
      ],
      housingTypes: 'Walk-up multifamily, loft, limited elevators, mixed SFH edges',
      challenges: [
        'Elevator reservations where present, docks, and building COIs',
        'Scarce curb near retail and river corridors',
        'I-77 / US-50 approach freeflow into the core',
      ],
      moverTips:
        'Book elevators and COIs in writing when required. Prefer mid-week early freight windows. Photo curb staging options early and confirm load zones near downtown traffic.',
      cityKeywords: [
        'parkersburg',
        'downtown parkersburg',
      ],
    },
    {
      id: 'vienna',
      name: 'Vienna residential belts, Grand Central corridors & north-central stock',
      shortName: 'Vienna',
      neighborhoods: [
        'Vienna',
        'Grand Central Avenue corridors',
        'North-central SFH belts',
        'Multi-family pockets',
        'Retail-adjacent residential stock',
        'River-adjacent Vienna edges',
      ],
      housingTypes: 'SFH, ranch, multi-family pockets, two-story stock',
      challenges: [
        'Mixed municipal rules across short distances from Parkersburg',
        'Arterial freeflow and curb limits near retail',
        'School-calendar summer peaks',
      ],
      moverTips:
        'Clarify Vienna vs Parkersburg addresses on every estimate. Survey curb and driveway access with photos. Prefer mid-week starts to clear retail-adjacent curb.',
      cityKeywords: [
        'vienna',
      ],
    },
    {
      id: 'mineral-wells-south',
      name: 'Mineral Wells, south approaches & I-77 south belts',
      shortName: 'Mineral Wells / south',
      neighborhoods: [
        'Mineral Wells',
        'I-77 south corridors',
        'Southern growth SFH belts',
        'Multi-family pockets',
        'Retail-adjacent southern stock',
        'County-edge south approaches',
      ],
      housingTypes: 'SFH, multi-family, ranch and two-story stock, limited HOA product',
      challenges: [
        'I-77 freeflow and longer empty miles vs downtown Parkersburg',
        'Mixed driveway width and growth-access product',
        'School-calendar summer peaks',
      ],
      moverTips:
        'Price I-77 portal time honestly for northbound unload pairs. Collect complex or HOA rules when present. Survey driveway turnaround early.',
      cityKeywords: [
        'mineral wells',
      ],
    },
    {
      id: 'williamstown-north',
      name: 'Williamstown, northern edges & Ohio River north approaches',
      shortName: 'Williamstown / north',
      neighborhoods: [
        'Williamstown',
        'Northern SFH belts',
        'Ohio River north approaches',
        'I-77 north corridors',
        'Bridge-adjacent residential stock',
        'Northern multi-unit pockets',
      ],
      housingTypes: 'SFH, multi-unit pockets, ranch and older two-story stock',
      challenges: [
        'Bridge freeflow and short OH empty-mile pairs',
        'Longer empty miles to southern Mineral Wells belts',
        'FMCSA required when any unload leaves West Virginia',
      ],
      moverTips:
        'Flag Ohio unloads early for FMCSA verification. Price I-77 and bridge freeflow honestly. Clarify Williamstown vs unincorporated addresses.',
      cityKeywords: [
        'williamstown',
      ],
    },
    {
      id: 'industrial-river-edges',
      name: 'Industrial river edges, WV-2 corridors & river-adjacent stock',
      shortName: 'Industrial river edges',
      neighborhoods: [
        'Ohio River industrial edges',
        'WV-2 corridors',
        'River-adjacent multi-unit pockets',
        'Industrial-adjacent residential belts',
        'Plant-corridor SFH stock',
        'Flood-plain edge residential',
      ],
      housingTypes: 'Older SFH, multi-unit pockets, industrial-adjacent product',
      challenges: [
        'Scarce curb near industrial and river corridors',
        'Flood-plain edge access and staging risk',
        'Truck routing around industrial traffic windows',
      ],
      moverTips:
        'Survey curb and truck access near industrial edges. Prefer early starts around plant traffic. Inventory older basements carefully and protect older interiors.',
      cityKeywords: [
        'parkersburg',
      ],
    },
    {
      id: 'rural-eastern-edges',
      name: 'Rural eastern Wood County & mountain-edge stock',
      shortName: 'Rural eastern edges',
      neighborhoods: [
        'Waverly edges',
        'Davisville edges',
        'Lubeck edges',
        'Eastern rural residential belts',
        'Mountain and ridge approaches',
        'Creek-adjacent rural stock',
      ],
      housingTypes: 'SFH, rural-residential, limited multi-unit, mixed gravel access',
      challenges: [
        'Longer empty miles and staging distance',
        'Gravel drives, narrow lanes, and limited turnaround',
        'Weather-sensitive hill and creek approaches',
      ],
      moverTips:
        'Price empty miles and weather contingency honestly. Survey lane width and turnaround before committing truck size. Align with school calendars when relevant.',
      cityKeywords: [
        'waverly',
        'davisville',
        'lubeck',
      ],
    },
  ],
  costDrivers: {
    title: 'What drives Wood County moving costs',
    intro:
      'River-city multi-unit stairs, older stock access, I-77 freeflow, industrial curb limits, and short Ohio hops move the number more than packing skill alone — this is Parkersburg mid-Ohio Valley logistics, not Huntington Tri-State campus defaults or Charleston capital scripts.',
    drivers: [
      {
        title: 'Walk-up stairs, elevators & scarce curb',
        detail:
          'Downtown Parkersburg multi-unit and riverfront product rewrite jobs that look simple on a map.',
      },
      {
        title: 'Older basements, long carries & river-edge stock',
        detail:
          'Industrial river edges and older SFH grids add flight counts that flat-rate optimism underprices.',
      },
      {
        title: 'Cross-zone empty miles (Vienna · Mineral Wells · Williamstown)',
        detail:
          'North-south pairs burn portal-to-portal hours even when map miles look short.',
      },
      {
        title: 'I-77 · US-50 · WV-2 congestion',
        detail:
          'Interstate and arterial freeflow is a cost driver across the mid-Ohio Valley grid.',
      },
      {
        title: 'Ohio border & longer interstate empty miles',
        detail:
          'Short border hops and farther destinations raise staging distance and require FMCSA when any leg leaves West Virginia.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (simple access)',
        value: '$450–$1,800+',
        note: 'Higher with walk-ups, industrial curb limits, or peak I-77 pairs',
      },
      {
        label: '2–3BR condo, duplex, or mid-size SFH',
        value: '$1,400–$4,200+',
        note: 'Stairs, multi-unit, and cross-zone soft costs trend up',
      },
      {
        label: '3–4+ BR / cross-zone / river-edge',
        value: '$2,700–$8,500+',
        note: 'Long I-77 pairs and Ohio unloads price highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$105–$190+/hr',
        note: 'Portal-to-portal; packing, stairs, and border hops scale up',
      },
    ],
  },
  seasonal: {
    title: 'When to schedule a Wood County move',
    intro:
      'School calendars, industrial and lease cycles, summer humidity and heat, Ohio River flood-edge risk, and winter ice reshape access and crew availability across the Parkersburg grid.',
    items: [
      {
        title: 'Best windows: mid-week early mornings',
        detail:
          'Tuesday–Thursday starts clear curb, ease multi-unit freight windows, and reduce I-77 / US-50 pain. Avoid month-end Fridays when leases and industrial-adjacent slots collide.',
      },
      {
        title: 'Peak season: late May–mid-September',
        detail:
          'Family school calendars and apartment turnover fill first. Book 2–4 weeks ahead for peak weekends and elevator or river-edge crews.',
      },
      {
        title: 'River-valley weather & flood-edge risk',
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
      id: 'parkersburg-ohio-river-corridor',
      title: 'Parkersburg Ohio River multi-unit, industrial edges & I-77 logistics module',
      intro:
        'Wood County estimates fail more often on stair surveys, river-edge curb limits, border-crossing authority, and I-77 freeflow than on packing skill alone.',
      bullets: [
        'Photo stair counts, curb options, and basement access for downtown Parkersburg walk-ups and older river stock early.',
        'Book elevators and building COIs when required before the survey is final.',
        'Survey driveway and industrial-edge access for Vienna, Mineral Wells, Williamstown, and river corridors.',
        'Flag Ohio unloads early — short mid-Ohio Valley hops still need FMCSA verification.',
        'Price portal-to-portal time for any pair that rides I-77, US-50, or WV-2 at peak.',
        'For in-state jobs verify WV PSC Motor Carrier Certificate of Convenience and Necessity covering household goods; verify FMCSA for any out-of-state leg.',
      ],
    },
    {
      id: 'not-huntington-not-charleston',
      title: 'Not Huntington Tri-State · not Charleston capital module',
      intro:
        'A single “Wood County rate” collapses when Parkersburg mid-Ohio Valley product is confused with Cabell Huntington logistics or Kanawha capital-valley defaults alone.',
      bullets: [
        'Do not price Parkersburg river multi-unit like Huntington Marshall-area walk-ups or like Charleston South Hills hillside stock as interchangeable defaults.',
        'State the market as Wood County / Parkersburg mid-Ohio Valley on every estimate — disambiguate from Cabell, Kanawha, Monongalia, and Berkeley County markets.',
        'Keep in-state vs interstate addresses clear when Ohio pairs appear — interstate authority applies when any leg leaves West Virginia.',
        'Match school-calendar peaks separately from industrial mid-week relocation windows.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Wood County?',
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
              'Wood County Schools is the primary public system across Parkersburg, Vienna, Mineral Wells, Williamstown, and eastern communities. Assignment is address-based — marketing neighborhood names do not guarantee a campus.',
          },
          {
            title: 'Choice, boundaries & enrollment pressure',
            detail:
              'Popular programs and boundary edges can be competitive. Confirm enrollment windows early when relocating mid-year.',
          },
          {
            title: 'Research sources',
            detail:
              'Wood County Schools boundary tools, West Virginia Department of Education data, and campus visits beat ranking screenshots alone.',
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
              'CamdenClark Medical Center (WVU Medicine Parkersburg) and related specialty care anchor healthcare across the mid-Ohio Valley. Confirm insurance networks for your household — including Ohio options if you commute across the river.',
          },
          {
            title: 'What relocators should do',
            detail:
              'Map peak-hour drive times to preferred campuses — I-77, US-50, and river-edge freeflow change “nearby” on paper. Transfer records early.',
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
              'Expect downtown Parkersburg multi-unit and riverfront product; Vienna residential SFH and multi-family; Mineral Wells southern belts; Williamstown northern stock; industrial river-edge housing; rural eastern mountain-edge SFH.',
          },
          {
            title: 'Cost variation inside the county',
            detail:
              'Purchase prices and rents vary by river access, product age, and municipality. Budget for older-building repair risk, flood-plain edge insurance questions, and competitive rental seasons near employment cores.',
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
            title: 'Downtown Parkersburg / multi-unit lifestyle',
            detail:
              'Suits people prioritizing urban amenities and riverfront access — with elevator, curb, and I-77 freeflow tradeoffs on move day.',
          },
          {
            title: 'Vienna residential living',
            detail:
              'Often appeals for neighborhood feel and retail access — with municipal rule mix and arterial freeflow.',
          },
          {
            title: 'Mineral Wells / southern belts',
            detail:
              'Fits households chasing relative value and I-77 south access — with longer empty miles to downtown Parkersburg.',
          },
          {
            title: 'Williamstown / rural eastern living',
            detail:
              'Attracts households seeking northern river approaches or space — with bridge freeflow, longer staging distance, and mixed driveway access.',
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
              'Healthcare (CamdenClark / WVU Medicine Parkersburg), industrial and chemical corridors, professional services, retail, logistics, and Ohio reverse-commute patterns concentrate demand across Wood County.',
          },
          {
            title: 'Commute realism',
            detail:
              'Peak I-77, US-50, and WV-2 freeflow is real — including short Ohio pairs. Test peak routes before choosing solely on rent or purchase price.',
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
              'Wood County is Parkersburg mid-Ohio Valley density — Ohio River corridor, Vienna residential grids, and industrial river edges — not Huntington Tri-State product and not Charleston capital defaults.',
          },
          {
            title: 'Climate',
            detail:
              'Humid continental / Ohio Valley climate with hot humid summers, storm and flood-edge risk, and freeze-thaw winters. Plan outdoor staging, heat, and ice contingency as part of move-in.',
          },
          {
            title: 'Culture and pace',
            detail:
              'Visit at peak and off-peak times when deciding — school calendars, industrial cycles, and river weather reshape daily rhythm.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Wood County resources',
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify WV PSC Motor Carrier household goods certificate status for in-state moves and FMCSA for interstate legs before deposits.',
    items: [
      {
        label: 'Wood County, West Virginia — official site',
        href: 'https://www.woodcountywv.com/',
        external: true,
        note: 'County services & property context',
      },
      {
        label: 'City of Parkersburg',
        href: 'https://parkersburgcity.com/',
        external: true,
        note: 'Primary municipality context',
      },
      {
        label: 'City of Vienna',
        href: 'https://vienna-wv.com/',
        external: true,
        note: 'North-central municipality context',
      },
      {
        label: 'WVU Medicine — CamdenClark Medical Center',
        href: 'https://wvumedicine.org/camdenclark/',
        external: true,
        note: 'Major healthcare system context',
      },
      {
        label: 'WV 511 — traveler information',
        href: 'https://wv511.org/',
        external: true,
        note: 'I-77 / US-50 / WV-2 before load windows',
      },
    ],
  },
  directoryHint:
    'Prefer crews with multi-unit and stair fluency for downtown Parkersburg product; municipal-grid fluency for Vienna; industrial river-edge and older-stock fluency for WV-2 corridors; honest I-77 · US-50 · WV-2 timing for cross-zone pairs; and FMCSA readiness for short Ohio hops. Verify WV PSC Motor Carrier Certificate of Convenience and Necessity covering household goods for intrastate moves and FMCSA for interstate legs before deposits. This is Wood County (Parkersburg / Ohio River mid-Ohio Valley) — not Huntington north.',
  lastReviewed: '2026-07-24',
});

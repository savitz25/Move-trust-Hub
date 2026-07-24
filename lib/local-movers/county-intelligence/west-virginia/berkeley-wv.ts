import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeWvPack,
  WV_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/west-virginia/wv-shared';

/**
 * Berkeley County, WV — Martinsburg / Eastern Panhandle / DC–Baltimore adjacency.
 * NOT Charleston capital (Kanawha), NOT Morgantown (Monongalia), NOT Huntington (Cabell).
 */
export const berkeleyCountyWvIntelligence: CountyIntelligencePack = finalizeWvPack({
  countySlug: 'berkeley',
  hubTitle: 'Berkeley County Moving Intelligence Hub',
  eyebrow:
    'Berkeley County, WV · Martinsburg Eastern Panhandle / DC–Baltimore adjacency & I-81 logistics',
  h1: 'Moving in Berkeley County: Martinsburg Access, Eastern Panhandle Growth & I-81 / WV-9 Logistics',
  heroOpener:
    'Berkeley County, West Virginia is the Martinsburg Eastern Panhandle growth belt — downtown Martinsburg multi-unit, Inwood HOA and subdivision product, Hedgesville mountain edges, Falling Waters northern approaches, WV-9 corridor density, and rural panhandle stock — not Charleston capital valley grids, not Morgantown campus cycles, and not Huntington river-city product. Expect DC–Baltimore adjacency commute patterns, growth HOAs, short Maryland / Virginia / Pennsylvania hops that trigger interstate authority, older Martinsburg walk-ups, and I-81 / WV-9 freeflow that rewrites “local” estimates. A Martinsburg elevator dock, an Inwood gated driveway, a Hedgesville hillside ranch, and a Falling Waters approach do not share truck access or crew skill. Growth-season and school calendars are real inputs. This hub is for people moving in Berkeley County, WV — Eastern Panhandle access — not a renamed Charleston east page.',
  heroCredibility:
    'WV PSC Motor Carrier Certificate of Convenience and Necessity (HHG) for intrastate · FMCSA for interstate (incl. short MD/VA/PA hops) · Eastern Panhandle HOA & I-81 logistics awareness · Curated listings',
  majorCorridors: 'I-81 · WV-9 · US-11 · local Martinsburg grid',
  whatMakesDifferent: {
    title: 'What makes moving in Berkeley County different',
    intro:
      'These are Berkeley County / Martinsburg Eastern Panhandle realities — I-81 freeflow, Inwood growth HOAs, WV-9 corridor product, and short MD/VA/PA legs — not Charleston Kanawha Valley hills alone, not Morgantown semester multi-unit defaults, and not Huntington Ohio River templates.',
    bullets: [
      {
        title: 'This is Berkeley County (Eastern Panhandle) — not Charleston east',
        detail:
          'Ignore Kanawha capital-valley templates, Cabell Tri-State river scripts, and Monongalia campus multi-unit defaults. Berkeley is Martinsburg, Inwood, Hedgesville, Falling Waters, and panhandle growth product with DC–Baltimore adjacency. Match estimates to Berkeley addresses and West Virginia PSC authority — not Charleston corridor scripts.',
      },
      {
        title: 'Inwood growth HOAs rewrite suburban-simple jobs',
        detail:
          'Gate lists, truck-length limits, timed move windows, and school-calendar peaks dominate south and corridor growth belts. A downtown Martinsburg walk-up or Hedgesville hillside ranch does not share that packet stack.',
      },
      {
        title: 'Martinsburg multi-unit and older character grids underprice flat-rate optimism',
        detail:
          'Downtown and near-core walk-ups, scarce curb, older basements, and multi-flight stairs fail estimates more often than packing skill alone. Photo stair counts and curb staging early.',
      },
      {
        title: 'Short MD, VA, and PA hops need FMCSA — not “still local” optimism',
        detail:
          'Households routinely cross into Maryland, Virginia, or Pennsylvania for jobs, family, and housing. Map miles can look short and still leave West Virginia. A WV PSC household goods certificate alone does not authorize interstate delivery — verify FMCSA when any leg crosses a state line.',
      },
      {
        title: 'I-81, WV-9, and US-11 burn portal time',
        detail:
          'Martinsburg ↔ Inwood, Hedgesville ↔ Falling Waters, or WV-9 corridor pairs look local and still burn 20–50+ minutes at peak. Price portal-to-portal honestly.',
      },
      {
        title: 'Panhandle and interstate pairs are routine',
        detail:
          'Households regularly move Berkeley County ↔ Jefferson County, or into Maryland, Virginia, Pennsylvania, and farther DC–Baltimore markets. Confirm authority for every out-of-state leg before deposits.',
      },
      WV_REG_BULLET,
    ],
  },
  zonesHeading: 'Berkeley County access zones',
  zonesIntro:
    'Plan by Martinsburg core multi-unit, Inwood growth HOAs, Hedgesville mountain edges, Falling Waters / northern approaches, WV-9 corridor density, and rural panhandle edges — access rules cluster by HOA packets, curb scarcity, and interstate freeflow more than ZIP alone.',
  zones: [
    {
      id: 'martinsburg-core',
      name: 'Martinsburg core, downtown multi-unit & US-11 corridors',
      shortName: 'Martinsburg core',
      neighborhoods: [
        'Downtown Martinsburg',
        'Queen Street corridors',
        'US-11 near-core belts',
        'Older walk-up multi-unit',
        'Near-downtown SFH edges',
        'Retail and rail-adjacent pockets',
      ],
      housingTypes: 'Walk-up multifamily, older SFH, duplexes, limited elevators',
      challenges: [
        'Multi-flight stairs and scarce truck length',
        'Tight residential curb and older basements',
        'I-81 / US-11 freeflow into downtown',
      ],
      moverTips:
        'Survey stair counts with photos. Prefer mid-week early starts. Inventory basements carefully and confirm load zones near downtown traffic.',
      cityKeywords: [
        'martinsburg',
      ],
    },
    {
      id: 'inwood-growth',
      name: 'Inwood growth HOAs, subdivisions & southern belts',
      shortName: 'Inwood',
      neighborhoods: [
        'Inwood',
        'Southern growth HOAs',
        'I-81 south corridors',
        'Subdivision cul-de-sacs',
        'Newer multi-family pockets',
        'Retail-adjacent growth belts',
      ],
      housingTypes: 'HOA SFH, townhomes, newer multi-family, ranch and two-story stock',
      challenges: [
        'HOA gate lists, truck-length limits, and timed windows',
        'I-81 freeflow and longer empty miles vs Martinsburg core',
        'School-calendar summer peaks',
      ],
      moverTips:
        'Collect HOA packets and gate codes early. Confirm truck length rules. Price I-81 honestly for northbound unload pairs into Martinsburg.',
      cityKeywords: [
        'inwood',
      ],
    },
    {
      id: 'hedgesville',
      name: 'Hedgesville, mountain edges & west-panhandle character stock',
      shortName: 'Hedgesville',
      neighborhoods: [
        'Hedgesville',
        'Mountain-edge approaches',
        'West-panhandle SFH belts',
        'Hillside ranch and two-story stock',
        'Rural-residential pockets',
        'Creek-adjacent edges',
      ],
      housingTypes: 'SFH, hillside ranch, rural-residential, limited multi-unit',
      challenges: [
        'Steep drives, long carries, and limited turnaround',
        'Longer empty miles to Martinsburg core',
        'Weather-sensitive mountain approaches',
      ],
      moverTips:
        'Survey driveway grade and turnaround with photos. Plan shuttle or smaller truck when full-size access fails. Protect landscaping and older interiors.',
      cityKeywords: [
        'hedgesville',
      ],
    },
    {
      id: 'falling-waters-north',
      name: 'Falling Waters, northern approaches & I-81 north belts',
      shortName: 'Falling Waters / north',
      neighborhoods: [
        'Falling Waters',
        'I-81 north corridors',
        'Northern SFH belts',
        'Potomac-adjacent edges',
        'Growth and rural mix pockets',
        'Maryland-approach corridors',
      ],
      housingTypes: 'SFH, multi-family pockets, ranch and two-story stock',
      challenges: [
        'I-81 freeflow and interstate-border empty-mile pairs',
        'Mixed municipal and unincorporated addressing',
        'Short MD hops that still require FMCSA',
      ],
      moverTips:
        'Clarify Falling Waters vs unincorporated addresses. Flag any Maryland unload early for FMCSA verification. Price I-81 portal time honestly.',
      cityKeywords: [
        'falling waters',
      ],
    },
    {
      id: 'wv-9-corridor',
      name: 'WV-9 corridor density & east-panhandle growth belts',
      shortName: 'WV-9 corridor',
      neighborhoods: [
        'WV-9 corridor communities',
        'East-panhandle growth edges',
        'Corridor multi-unit pockets',
        'Retail-adjacent SFH belts',
        'Jefferson County–adjacent approaches',
        'Commuter-oriented subdivisions',
      ],
      housingTypes: 'HOA SFH, townhomes, multi-family, mixed newer stock',
      challenges: [
        'WV-9 freeflow and cross-county empty miles',
        'HOA packets and mixed complex rules',
        'Peak commute congestion near growth nodes',
      ],
      moverTips:
        'Collect HOA and complex rules early. Price WV-9 and I-81 honestly. Confirm Berkeley vs Jefferson County addresses on every estimate.',
      cityKeywords: [
        'martinsburg',
        'inwood',
      ],
    },
    {
      id: 'rural-panhandle-edges',
      name: 'Rural Eastern Panhandle & mountain-edge stock',
      shortName: 'Rural panhandle edges',
      neighborhoods: [
        'Gerrardstown edges',
        'Shanghai edges',
        'Arden edges',
        'Glengary edges',
        'Rural residential belts',
        'Mountain and orchard edges',
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
        'gerrardstown',
        'shanghai',
        'arden',
        'glengary',
      ],
    },
  ],
  costDrivers: {
    title: 'What drives Berkeley County moving costs',
    intro:
      'HOA admin, multi-unit stairs, hillside access, I-81 freeflow, and short interstate hops move the number more than packing skill alone — this is Martinsburg / Eastern Panhandle logistics, not Charleston capital defaults or Morgantown campus scripts.',
    drivers: [
      {
        title: 'HOA gates, truck-length rules & timed windows',
        detail:
          'Inwood and WV-9 growth packets rewrite jobs that look simple on a map.',
      },
      {
        title: 'Walk-up stairs, basements & scarce curb',
        detail:
          'Martinsburg core multi-unit and older character stock add flight counts that flat-rate optimism underprices.',
      },
      {
        title: 'Hillside drives & rural turnaround limits',
        detail:
          'Hedgesville and mountain-edge product rewrite access before packing skill matters.',
      },
      {
        title: 'I-81 · WV-9 · US-11 congestion',
        detail:
          'Cross-county pairs burn portal-to-portal hours even when map miles look short.',
      },
      {
        title: 'MD / VA / PA & longer interstate empty miles',
        detail:
          'Short border hops and DC–Baltimore market pairs raise staging distance and require FMCSA when any leg leaves West Virginia.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (simple access)',
        value: '$450–$1,850+',
        note: 'Higher with walk-ups, HOAs, hills, or peak I-81 pairs',
      },
      {
        label: '2–3BR condo, duplex, or mid-size SFH',
        value: '$1,450–$4,400+',
        note: 'Stairs, HOA, and multi-unit soft costs trend up',
      },
      {
        label: '3–4+ BR / HOA / cross-zone',
        value: '$2,900–$9,000+',
        note: 'Gated growth and long I-81 / interstate pairs price highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$110–$200+/hr',
        note: 'Portal-to-portal; packing, HOA admin, and stairs scale up',
      },
    ],
  },
  seasonal: {
    title: 'When to schedule a Berkeley County move',
    intro:
      'School calendars, Eastern Panhandle growth lease cycles, summer humidity and heat, severe-storm risk, and winter ice reshape access and crew availability across the Martinsburg grid.',
    items: [
      {
        title: 'Best windows: mid-week early mornings',
        detail:
          'Tuesday–Thursday starts clear curb, ease multi-unit and HOA windows, and reduce I-81 / WV-9 pain. Avoid month-end Fridays when leases and growth-HOA slots collide.',
      },
      {
        title: 'Peak season: late May–mid-September',
        detail:
          'Family school calendars and apartment turnover fill first. Book 2–4 weeks ahead for peak weekends and elevator or HOA slots.',
      },
      {
        title: 'Storm-season & heat risk',
        detail:
          'Spring and summer storms and humid heat raise cancellation and staging risk. Prefer flexible dates, covered staging plans, and early starts when forecasts allow.',
      },
      {
        title: 'Winter ice & mountain approaches',
        detail:
          'Freeze-thaw winters reshape outdoor labor — especially on Hedgesville and mountain-edge drives. Prefer early starts and weather contingency on older character stock.',
      },
    ],
  },
  specialized: [
    {
      id: 'eastern-panhandle-corridor',
      title: 'Eastern Panhandle HOA, multi-unit & I-81 logistics module',
      intro:
        'Berkeley County estimates fail more often on HOA packets, stair surveys, border-crossing authority, and I-81 freeflow than on packing skill alone.',
      bullets: [
        'Collect HOA packets, gate codes, and truck-length rules for Inwood and WV-9 growth product early.',
        'Photo stair counts, curb options, and basement access for Martinsburg core walk-ups and older stock.',
        'Survey driveway grade and turnaround for Hedgesville and rural mountain-edge product.',
        'Price portal-to-portal time for any pair that rides I-81, WV-9, or US-11 at peak.',
        'Flag Maryland, Virginia, or Pennsylvania unloads early — short hops still need FMCSA verification.',
        'For in-state jobs verify WV PSC Motor Carrier Certificate of Convenience and Necessity covering household goods; verify FMCSA for any out-of-state leg.',
      ],
    },
    {
      id: 'not-charleston-not-campus',
      title: 'Not Charleston capital · not Morgantown campus module',
      intro:
        'A single “Berkeley County rate” collapses when Eastern Panhandle growth product is confused with Kanawha capital-valley logistics or Monongalia semester multi-unit defaults alone.',
      bullets: [
        'Do not price Inwood HOAs like Charleston South Hills hillside stock or like Morgantown campus multi-unit as interchangeable defaults.',
        'State the market as Berkeley County / Martinsburg Eastern Panhandle on every estimate — disambiguate from Kanawha, Monongalia, Cabell, and Wood County markets.',
        'Keep in-state vs interstate addresses clear when Jefferson County or MD/VA/PA pairs appear — interstate authority applies when any leg leaves West Virginia.',
        'Match school-calendar peaks separately from DC–Baltimore commute mid-week relocation windows.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Berkeley County?',
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
              'Berkeley County Schools is the primary public system across Martinsburg, Inwood, Hedgesville, Falling Waters, and panhandle communities. Assignment is address-based — marketing neighborhood names do not guarantee a campus.',
          },
          {
            title: 'Choice, boundaries & enrollment pressure',
            detail:
              'Growth corridors can stress popular programs and boundary edges. Confirm enrollment windows early when relocating mid-year.',
          },
          {
            title: 'Research sources',
            detail:
              'Berkeley County Schools boundary tools, West Virginia Department of Education data, and campus visits beat ranking screenshots alone.',
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
              'Berkeley Medical Center (WVU Medicine) and regional specialty partners anchor care across the Eastern Panhandle. Confirm insurance networks for your household — including Maryland and Virginia options if you commute across state lines.',
          },
          {
            title: 'What relocators should do',
            detail:
              'Map peak-hour drive times to preferred campuses — I-81 and WV-9 freeflow change “nearby” on paper. Transfer records early.',
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
              'Expect Martinsburg multi-unit and older walk-up product; Inwood HOA growth; Hedgesville hillside SFH; Falling Waters northern belts; WV-9 corridor townhomes and subdivisions; rural panhandle stock.',
          },
          {
            title: 'Cost variation inside the county',
            detail:
              'Purchase prices and rents vary by growth corridor and product type. Budget for HOA dues, older-building repair risk, and competitive rental seasons near I-81 employment nodes.',
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
            title: 'Martinsburg core / multi-unit lifestyle',
            detail:
              'Suits people prioritizing walkable services and rail-adjacent access — with stair, curb, and I-81 freeflow tradeoffs on move day.',
          },
          {
            title: 'Inwood / WV-9 growth living',
            detail:
              'Often appeals for newer product and schools — with HOA rules and longer empty miles to downtown Martinsburg.',
          },
          {
            title: 'Hedgesville mountain-edge living',
            detail:
              'Fits households seeking space and character — with driveway geometry and weather-sensitive approaches.',
          },
          {
            title: 'Falling Waters / northern living',
            detail:
              'Attracts households seeking northern I-81 access and relative value — with border-hop logistics when Maryland unloads appear.',
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
              'Healthcare, logistics and distribution, federal and defense-adjacent employment, retail, professional services, and DC–Baltimore reverse-commute patterns concentrate demand across the Eastern Panhandle.',
          },
          {
            title: 'Commute realism',
            detail:
              'Peak I-81, WV-9, and US-11 freeflow is real — including short Maryland, Virginia, and Pennsylvania pairs. Test peak routes before choosing solely on rent or purchase price.',
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
              'Berkeley County is Martinsburg Eastern Panhandle growth density — I-81 corridors, HOA subdivisions, and DC–Baltimore adjacency — not Charleston capital product and not Morgantown campus cycles.',
          },
          {
            title: 'Climate',
            detail:
              'Humid continental / mid-Atlantic climate with hot humid summers, storm risk, and freeze-thaw winters. Plan outdoor staging, heat, and ice contingency as part of move-in.',
          },
          {
            title: 'Culture and pace',
            detail:
              'Visit at peak and off-peak times when deciding — school calendars, growth lease cycles, and commute seasons reshape daily rhythm.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Berkeley County resources',
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify WV PSC Motor Carrier household goods certificate status for in-state moves and FMCSA for interstate legs before deposits.',
    items: [
      {
        label: 'Berkeley County, West Virginia — official site',
        href: 'https://www.berkeleywv.org/',
        external: true,
        note: 'County services & property context',
      },
      {
        label: 'City of Martinsburg',
        href: 'https://www.cityofmartinsburg.org/',
        external: true,
        note: 'Largest Berkeley municipality context',
      },
      {
        label: 'Berkeley County Schools',
        href: 'https://www.berkeleycountyschools.org/',
        external: true,
        note: 'District & enrollment context',
      },
      {
        label: 'WVU Medicine — Berkeley Medical Center',
        href: 'https://wvumedicine.org/berkeley/',
        external: true,
        note: 'Major healthcare system context',
      },
      {
        label: 'WV 511 — traveler information',
        href: 'https://wv511.org/',
        external: true,
        note: 'I-81 / WV-9 / US-11 before load windows',
      },
    ],
  },
  directoryHint:
    'Prefer crews with HOA gate fluency for Inwood and WV-9 growth product; stair and curb fluency for Martinsburg core walk-ups; hillside driveway fluency for Hedgesville and rural edges; honest I-81 · WV-9 · US-11 timing for cross-zone pairs; and FMCSA readiness for short MD/VA/PA hops. Verify WV PSC Motor Carrier Certificate of Convenience and Necessity covering household goods for intrastate moves and FMCSA for interstate legs before deposits. This is Berkeley County (Martinsburg Eastern Panhandle) — not Charleston capital east.',
  lastReviewed: '2026-07-24',
});

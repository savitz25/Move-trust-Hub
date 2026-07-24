import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeWaPack,
  WA_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/washington/wa-shared';

/**
 * Pierce County, WA — Tacoma + JBLM military PCS (not Seattle clone, not King Eastside tech).
 */
export const pierceCountyWaIntelligence: CountyIntelligencePack = finalizeWaPack({
  countySlug: 'pierce',
  hubTitle: 'Pierce County Moving Intelligence Hub',
  eyebrow: 'Pierce · Tacoma, JBLM PCS & south-Sound corridor logistics',
  h1: 'Moving in Pierce County: Tacoma Access, JBLM Military PCS & South-Sound Logistics',
  heroOpener:
    'Pierce County is not a Seattle neighborhood rename and not an Eastside tech corridor — it is Tacoma’s hill grids and port-adjacent product, Joint Base Lewis-McChord (JBLM) PCS timelines, Lakewood and Spanaway multifamily turnover, and south-Sound arterials that rewrite “local” portal time. A North Tacoma craftsman with stair carries, a downtown Tacoma mid-rise COI, a JBLM-adjacent apartment on a fixed report date, and a Puyallup valley two-story do not share truck access or crew skill. I-5, SR-16, SR-512, I-705, and Pacific Avenue corridors turn short map miles into billable hours when peak commute and base-gate windows collide. This hub is for people moving in Pierce County — not a renamed King County page or generic Puget Sound template.',
  heroCredibility:
    'Washington UTC household goods permit for intrastate moves · FMCSA for interstate · Tacoma access & JBLM military PCS logistics awareness · Curated listings',
  majorCorridors: 'I-5 · SR-16 · SR-512 · I-705 · Pacific Ave corridors',
  whatMakesDifferent: {
    title: 'What makes moving in Pierce County different',
    intro:
      'These are Pierce and Tacoma–JBLM realities — military PCS calendars, Tacoma hill and port-edge product, and south-Sound arterial congestion — not Seattle elevator towers or Bellevue tech HOA belts.',
    bullets: [
      {
        title: 'JBLM PCS orders rewrite booking lead time',
        detail:
          'Joint Base Lewis-McChord–linked households often have fixed report dates, weight tickets, and inventory expectations. Flexible civilian Saturday windows are not the default on PCS peaks — book as soon as orders allow and clarify storage-in-transit early.',
      },
      {
        title: 'Base-adjacent multifamily and gate timing dominate south-central jobs',
        detail:
          'Lakewood, DuPont, Spanaway, and JBLM-corridor apartments stack tight guest parking, stair or elevator carries, and lease-end waves that pure Tacoma SFH quotes underprice.',
      },
      {
        title: 'Tacoma hill grids and older stock are not Seattle clones',
        detail:
          'North End, Stadium District, Hilltop, and central Tacoma need stair surveys, narrow-street staging, and mixed alley access — different logistics from King County’s Eastside cul-de-sacs or downtown Seattle tower packets.',
      },
      {
        title: 'I-5, SR-16, SR-512, and I-705 turn short miles into portal hours',
        detail:
          'North Tacoma ↔ Lakewood, Puyallup ↔ JBLM edges, or Tacoma ↔ Gig Harbor pairs look local and still burn 35–75+ minutes at peak. Price portal-to-portal honestly, not odometer optimism.',
      },
      {
        title: 'Puyallup valley and east Pierce family product is a separate micro-market',
        detail:
          'Puyallup, South Hill, Sumner, and Bonney Lake stack HOA rules, two-story inventories, and SR-512 / I-5 freeflow that differ from port-edge Tacoma or base apartments. Do not reuse one “Pierce rate” across all three.',
      },
      {
        title: 'Kitsap-linked SR-16 and ferry-adjacent pairs need extra buffer',
        detail:
          'Gig Harbor and SR-16 bridge approaches connect Pierce to Kitsap timing realities. Confirm whether either address is peninsula-side and build bridge congestion buffers into the estimate.',
      },
      {
        title: 'Cross-county south-Sound pairs are routine',
        detail:
          'Households regularly move Pierce ↔ King, Thurston, Kitsap, or Snohomish. Clarify addresses so Washington UTC household goods permit vs FMCSA interstate assumptions stay accurate when any leg leaves Washington.',
      },
      WA_REG_BULLET,
    ],
  },
  zonesHeading: 'Pierce County access zones',
  zonesIntro:
    'Plan by central Tacoma grids, north Tacoma character neighborhoods, JBLM-adjacent south corridors, Puyallup valley family belts, and Gig Harbor / Key Peninsula edges — access rules cluster by zone more than ZIP alone.',
  zones: [
    {
      id: 'central-tacoma',
      name: 'Central Tacoma, downtown & Stadium District',
      shortName: 'Central Tacoma',
      neighborhoods: [
        'Downtown Tacoma',
        'Stadium District',
        'Hilltop edges',
        'Central business-adjacent multifamily',
        'Thea Foss waterfront edges',
      ],
      housingTypes: 'Mid-rise multifamily, older walk-ups, mixed SFH and loft conversions',
      challenges: [
        'Elevator and building COI windows on denser product',
        'Limited legal curb and event-day freeflow',
        'I-705 / I-5 / Pacific Avenue approach congestion',
      ],
      moverTips:
        'Collect building packets early. Prefer mid-week early starts. Photo curb, alleys, and dock options before finalizing labor hours.',
      cityKeywords: [
        'downtown tacoma',
        'stadium district',
        'hilltop',
        'tacoma',
        'thea foss',
      ],
    },
    {
      id: 'north-tacoma',
      name: 'North Tacoma, Proctor & north-end character stock',
      shortName: 'North Tacoma',
      neighborhoods: [
        'North End',
        'Proctor',
        'Old Town edges',
        'Ruston edges',
        'Point Defiance edges',
      ],
      housingTypes: 'Craftsman SFH, bungalows, denser duplexes, limited multifamily',
      challenges: [
        'Stairs, porch geometry, and basement carries',
        'Tree-lined curb with limited truck length',
        'Hill approaches and rain-slick grades',
      ],
      moverTips:
        'Survey stair counts and driveway grade with photos. Confirm truck length on narrow blocks. Inventory basements and detached garages carefully.',
      cityKeywords: [
        'north end tacoma',
        'proctor',
        'old town tacoma',
        'ruston',
        'point defiance',
      ],
    },
    {
      id: 'jblm-lakewood-spanaway',
      name: 'JBLM corridor (Lakewood, DuPont, Spanaway & base-adjacent)',
      shortName: 'JBLM corridor',
      neighborhoods: [
        'Lakewood',
        'DuPont',
        'Spanaway',
        'Tillicum edges',
        'JBLM-adjacent multifamily',
        'Steilacoom edges',
      ],
      housingTypes: 'Apartments, townhomes, modest SFH, military-affiliated rentals',
      challenges: [
        'PCS hard dates and short notice spikes',
        'Guest parking and stair/elevator apartment access',
        'I-5 gate and corridor congestion near peak commute',
      ],
      moverTips:
        'Book as soon as orders allow. Ask about storage-in-transit and partial loads. Confirm gate or installation entry rules if either address requires base access.',
      cityKeywords: [
        'lakewood',
        'dupont',
        'spanaway',
        'jblm',
        'steilacoom',
        'tillicum',
      ],
    },
    {
      id: 'puyallup-east-pierce',
      name: 'Puyallup valley & east Pierce family belts',
      shortName: 'Puyallup / East Pierce',
      neighborhoods: [
        'Puyallup',
        'South Hill',
        'Sumner',
        'Bonney Lake',
        'Orting edges',
        'Edgewood edges',
      ],
      housingTypes: 'Two-story SFH, HOA tracts, townhomes, some multifamily',
      challenges: [
        'HOA gate lists and truck-length rules',
        'SR-512 / I-5 approach clusters',
        'High Saturday family demand May–August',
      ],
      moverTips:
        'Confirm HOA rules before the crew day. Survey driveway turn radius. Build SR-512 buffers for Tacoma- or JBLM-linked pairs.',
      cityKeywords: [
        'puyallup',
        'south hill',
        'sumner',
        'bonney lake',
        'orting',
        'edgewood',
      ],
    },
    {
      id: 'gig-harbor-west',
      name: 'Gig Harbor, Key Peninsula & SR-16 west edges',
      shortName: 'Gig Harbor / West',
      neighborhoods: [
        'Gig Harbor',
        'Key Peninsula edges',
        'Fox Island edges',
        'University Place edges',
        'Fircrest edges',
      ],
      housingTypes: 'SFH, water-view lots, townhomes, limited multifamily',
      challenges: [
        'SR-16 bridge and approach congestion',
        'Longer empty miles from central Tacoma staging',
        'Driveway grade and rain-slick residential streets',
      ],
      moverTips:
        'Price SR-16 portal time honestly. Photo driveway grade and curb. Clarify Pierce vs Kitsap addresses near peninsula edges.',
      cityKeywords: [
        'gig harbor',
        'key peninsula',
        'fox island',
        'university place',
        'fircrest',
      ],
    },
    {
      id: 'south-tacoma-parkland',
      name: 'South Tacoma, Parkland, Midland & Pacific Avenue corridors',
      shortName: 'South Tacoma / Parkland',
      neighborhoods: [
        'South Tacoma',
        'Parkland',
        'Midland',
        'Fern Hill edges',
        'Pacific Avenue corridor residential',
      ],
      housingTypes: 'Ranch and bi-level SFH, duplexes, garden apartments',
      challenges: [
        'Pacific Avenue / I-5 freeflow collapse at peak',
        'Basement and garage inventories on older stock',
        'Cross-zone pairs into JBLM or Puyallup',
      ],
      moverTips:
        'Survey driveway turn radius and basement access. Price I-5 and Pacific Avenue buffers. Share photos of low-clearance garages.',
      cityKeywords: [
        'south tacoma',
        'parkland',
        'midland',
        'fern hill',
        'pacific avenue',
      ],
    },
  ],
  costDrivers: {
    title: 'What drives Pierce County moving costs',
    intro:
      'Ranges are market context for local / short regional moves — not quotes. PCS timing soft costs, Tacoma stairs, HOA rules, and I-5 / SR-16 / SR-512 portal time separate cheap estimates from real bills.',
    drivers: [
      {
        title: 'JBLM PCS hard dates & storage-in-transit',
        detail:
          'Fixed report dates, weight tickets, and double-touch inventories add admin and trip soft costs civilian Saturday quotes miss.',
      },
      {
        title: 'Tacoma stairs, hills & older-stock geometry',
        detail:
          'North End and central grids add flight counts and tight curb that flat-rate optimism underprices.',
      },
      {
        title: 'I-5 · SR-16 · SR-512 · I-705 congestion',
        detail:
          'Cross-zone and base-linked pairs burn portal-to-portal hours even when map miles look short.',
      },
      {
        title: 'Apartment parking & HOA gate friction',
        detail:
          'Lakewood/Spanaway multifamily and east Pierce HOAs add timed windows and long carries from distant legal spots.',
      },
      {
        title: 'Multi-county south-Sound empty miles',
        detail:
          'King, Thurston, and Kitsap destinations raise staging distance and authority complexity.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (simple access)',
        value: '$450–$1,600+',
        note: 'Higher with stairs, apartments, or peak I-5 pairs',
      },
      {
        label: '2–3BR condo, apartment, or walk-up',
        value: '$1,300–$4,000+',
        note: 'PCS timing and parking friction trend up',
      },
      {
        label: '3–4+ BR / cross-zone SFH / PCS full household',
        value: '$2,600–$8,500+',
        note: 'Larger inventories and long I-5 or SR-16 pairs price highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$115–$200+/hr',
        note: 'Portal-to-portal; packing, stairs, and PCS admin scale up',
      },
    ],
  },
  seasonal: {
    title: 'When to schedule a Pierce County move',
    intro:
      'PCS cycles, lease ends, school calendars, rain, and bridge/corridor peaks reshape access and crew availability.',
    items: [
      {
        title: 'Best windows: mid-week early mornings',
        detail:
          'Tuesday–Thursday starts clear curb, ease I-5 / SR-16 / SR-512 pain, and reduce apartment-lot conflict. Avoid month-end Fridays when leases and PCS report dates collide.',
      },
      {
        title: 'Peak season: late May–mid-September (plus PCS order waves)',
        detail:
          'Family SFH Saturdays and military peaks fill first. Book as soon as orders allow for JBLM-linked moves; book 2–4 weeks ahead for civilian peak weekends.',
      },
      {
        title: 'Rain season friction (fall–spring)',
        detail:
          'Wet stairs, slick driveways, and limited dry staging slow open carries on Tacoma hills and valley lots. Prefer early starts, mats, and tarps.',
      },
      {
        title: 'School-calendar and mid-month PCS spikes',
        detail:
          'Report dates and district calendars often land mid-month rather than only on Saturday peaks. Confirm hard move-in dates and storage-in-transit early.',
      },
    ],
  },
  specialized: [
    {
      id: 'jblm-pcs-tacoma-access',
      title: 'JBLM PCS & Tacoma access logistics module',
      intro:
        'Pierce estimates fail more often on PCS hard dates, base-adjacent apartment access, Tacoma stair surveys, and I-5 / SR-16 portal time than on packing skill alone.',
      bullets: [
        'Book as soon as military orders allow; ask about weight tickets, storage-in-transit, and partial loads at estimate time.',
        'Confirm gate or installation entry rules if either address requires base access.',
        'Photo stair counts, curb options, and apartment parking maps for Lakewood/Spanaway product.',
        'Survey Tacoma hill grades and older-stock basements with photos before final labor hours.',
        'Price portal-to-portal time for any pair that rides I-5, SR-16, SR-512, I-705, or Pacific Avenue at peak.',
        'Clarify Tacoma vs JBLM-corridor vs Puyallup addresses on every estimate.',
        'Verify Washington UTC household goods permit for in-state-only jobs and FMCSA for interstate legs.',
      ],
    },
    {
      id: 'pierce-micro-markets',
      title: 'Tacoma / JBLM / Puyallup micro-market module',
      intro:
        'A single “Pierce rate” collapses when Tacoma hills, base apartments, and east Pierce HOA product diverge.',
      bullets: [
        'Survey by product — craftsman walk-up, base multifamily, or HOA two-story — not by county name alone.',
        'Ask which approach corridors the crew will actually use at load and unload (I-5 vs SR-512 vs SR-16).',
        'Match PCS inventories and high-value waterfront/view inventories to different crew experience.',
        'Expect different parking and HOA norms a few miles apart; do not assume one staging plan covers both addresses.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Pierce County?',
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
              'Tacoma Public Schools covers much of the city; additional districts cover Peninsula (Gig Harbor), Puyallup, Franklin Pierce, Clover Park (Lakewood area), Bethel, Sumner-Bonney Lake, and other Pierce municipalities. Assignment is address-based — marketing names do not guarantee a campus.',
          },
          {
            title: 'Military families & enrollment timing',
            detail:
              'PCS mid-year arrivals are common near JBLM. Confirm enrollment windows, records transfer, and transportation early when orders fix the calendar.',
          },
          {
            title: 'Research sources',
            detail:
              'District boundary tools, OSPI data, and campus visits beat ranking screenshots alone.',
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
              'MultiCare, Virginia Mason Franciscan, Madigan Army Medical Center (eligible beneficiaries), and other campuses anchor care across Tacoma, Lakewood, Puyallup, and Gig Harbor. Specialty options span the south Sound — confirm networks for your household.',
          },
          {
            title: 'What relocators should do',
            detail:
              'Map peak-hour drive times from North Tacoma, Lakewood, or South Hill to preferred campuses — I-5 and SR-512 congestion change “nearby” on paper. Transfer records early, especially for PCS arrivals.',
          },
        ],
      },
      {
        id: 'housing',
        title: 'Housing character & cost pressures',
        bullets: [
          {
            title: 'Tacoma stock, base multifamily & valley SFH',
            detail:
              'Expect craftsman and older SFH in north/central Tacoma; denser multifamily near downtown and JBLM corridors; and two-story/HOA product through Puyallup, South Hill, and Bonney Lake.',
          },
          {
            title: 'Cost variation inside the county',
            detail:
              'Purchase prices and rents vary sharply by city and pocket. Budget for HOA dues, older-building repair risk, and insurance — especially on view or waterfront-adjacent inventories.',
          },
          {
            title: 'Building and HOA governance',
            detail:
              'Condo associations and suburban HOAs often control move hours, truck size, elevators, and deposits. Read documents carefully before closing or lease signing.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Which Pierce areas fit whom',
        bullets: [
          {
            title: 'Central and north Tacoma urban-neighborhood living',
            detail:
              'Suits people prioritizing character housing, waterfront access, and city amenities — with stairs, curb, and hill logistics on move day.',
          },
          {
            title: 'JBLM-adjacent Lakewood / DuPont / Spanaway',
            detail:
              'Often appeals for military commute convenience and multifamily flexibility — with PCS calendar pressure and apartment access constraints.',
          },
          {
            title: 'Puyallup valley and east Pierce family belts',
            detail:
              'Attracts households seeking yards, schools, and newer product — with SR-512 / I-5 commute realism and HOA rules.',
          },
          {
            title: 'Gig Harbor and west Pierce edges',
            detail:
              'Fits buyers chasing quieter streets and water access — with SR-16 bridge timing and longer empty miles from central staging.',
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
              'JBLM and defense-adjacent work, Port of Tacoma logistics, healthcare systems, education, government, and reverse-commute into King County concentrate demand.',
          },
          {
            title: 'Commute realism',
            detail:
              'Many households mix driving and limited transit. I-5, SR-16, SR-512, I-705, and Pacific Avenue peaks are real. Test drive peak routes before choosing solely on rent or purchase price.',
          },
        ],
      },
      {
        id: 'lifestyle',
        title: 'Lifestyle & practical livability',
        bullets: [
          {
            title: 'One county, many Pierces',
            detail:
              'Pierce stacks Tacoma neighborhood culture, military-installation rhythm, valley family suburbs, and Gig Harbor edges — different from King County’s Seattle–Eastside tech stack.',
          },
          {
            title: 'Climate',
            detail:
              'Mild wet winters, drier summers, and year-round rain risk on open carries. Plan outdoor staging and wet-grade contingency as part of move-in.',
          },
          {
            title: 'Culture and pace',
            detail:
              'Tacoma arts, waterfront, and dining culture sit beside military-calendar energy and quieter valley suburbs. Visit at peak and off-peak times when deciding.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Pierce County resources',
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify Washington UTC household goods permit status for in-state moves and FMCSA for interstate legs before deposits.',
    items: [
      {
        label: 'Pierce County — official site',
        href: 'https://www.piercecountywa.gov/',
        external: true,
        note: 'County services & offices',
      },
      {
        label: 'City of Tacoma',
        href: 'https://www.cityoftacoma.org/',
        external: true,
        note: 'Permits, services & city info',
      },
      {
        label: 'Tacoma Public Schools',
        href: 'https://www.tacomaschools.org/',
        external: true,
        note: 'Boundaries & calendars (Tacoma addresses)',
      },
      {
        label: 'WS-DOT traffic & travel alerts',
        href: 'https://wsdot.com/travel/real-time/',
        external: true,
        note: 'I-5 / SR-16 / SR-512 before load windows',
      },
    ],
  },
  directoryHint:
    'Prefer crews with JBLM PCS and storage-in-transit fluency; Tacoma hill/stair experience for north and central product; apartment parking discipline for Lakewood/Spanaway; honest I-5 · SR-16 · SR-512 · I-705 timing for cross-zone pairs. Verify Washington UTC household goods permit for in-state moves and FMCSA for interstate legs.',
  lastReviewed: '2026-07-24',
});

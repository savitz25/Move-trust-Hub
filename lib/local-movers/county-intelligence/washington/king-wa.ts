import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeWaPack,
  WA_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/washington/wa-shared';

/**
 * King County, WA — Seattle hills/stairs/elevators + Eastside Bellevue/Redmond tech
 * (not Tacoma, not Pierce military, not Kitsap ferry).
 */
export const kingCountyWaIntelligence: CountyIntelligencePack = finalizeWaPack({
  countySlug: 'king',
  hubTitle: 'King County Moving Intelligence Hub',
  eyebrow: 'King · Seattle hills, Eastside tech & I-5 / I-405 logistics',
  h1: 'Moving in King County: Seattle Hills, Elevator Towers & Eastside Tech Corridors',
  heroOpener:
    'King County is not a Tacoma clone and not a generic Puget Sound template — it is Seattle hill streets with stair flights and tight curb, downtown and South Lake Union elevator towers with building COIs, and Eastside tech-and-family product from Bellevue and Redmond to Kirkland and Issaquah. A Queen Anne walk-up with no driveway, a Capitol Hill multifamily freight elevator, a Bellevue high-rise COI packet, and a Sammamish two-story on a cul-de-sac do not share truck access or crew skill. I-5, I-90, I-405, SR-520, and SR-99 rewrite “local” estimates that ignore hills, elevators, floating-bridge peaks, and Eastside HOA gates. This hub is for people moving in King County — not a renamed Pierce page or south-Sound military script.',
  heroCredibility:
    'Washington UTC household goods permit for intrastate moves · FMCSA for interstate · Seattle hill / elevator & Eastside tech-corridor logistics awareness · Curated listings',
  majorCorridors: 'I-5 · I-90 · I-405 · SR-520 · SR-99',
  whatMakesDifferent: {
    title: 'What makes moving in King County different',
    intro:
      'These are King and Seattle–Eastside realities — hill geometry, elevator/COI stacks, and tech-corridor congestion — not Tacoma port grids, JBLM PCS calendars, or Kitsap ferry timing.',
    bullets: [
      {
        title: 'Seattle hills, stairs, and narrow street staging rewrite labor',
        detail:
          'Queen Anne, Capitol Hill, Beacon Hill, Magnolia, and many West Seattle blocks stack steep approaches, multi-flight stairs, limited legal curb, and long carries. Flat-rate optimism from Eastside cul-de-sacs underprices flight counts and truck placement.',
      },
      {
        title: 'Elevators, loading docks, and building COIs dominate vertical product',
        detail:
          'Downtown, Belltown, South Lake Union, First Hill, and Bellevue towers require elevator reservations, certificate-of-insurance naming, padded protection, and timed dock or freight slots. A Wallingford bungalow does not share that logistics stack.',
      },
      {
        title: 'Eastside tech corridors are a different move market than Seattle core',
        detail:
          'Bellevue, Redmond, Kirkland, and Issaquah stack HOA gates, newer multifamily elevators, and employer-driven mid-month spikes. A “Seattle rate” collapses when Eastside building packets and I-405 freeflow diverge from hill-street access.',
      },
      {
        title: 'I-5, I-90, I-405, and SR-520 turn short map miles into billable hours',
        detail:
          'Capitol Hill ↔ Bellevue, Ballard ↔ Redmond, or West Seattle ↔ Kirkland pairs look local and still burn 45–90+ minutes at peak. Floating-bridge and I-405 choke points punish odometer optimism — price portal-to-portal honestly.',
      },
      {
        title: 'Rain, grades, and tight curb reshape open carries year-round',
        detail:
          'Wet stairs, slick driveways, and canopy-lined streets shrink staging options. Prefer early starts, mats and tarps, and contingency when either address is a walk-up on a hill street.',
      },
      {
        title: 'South King and airport-adjacent pairs are not North Seattle clones',
        detail:
          'Renton, Kent, SeaTac, Burien, and Federal Way edges mix apartment turnover, industrial approaches, and I-5 / SR-99 freeflow that differ from Ballard or Queen Anne surveys. Match crew experience to product, not ZIP marketing alone.',
      },
      {
        title: 'Multi-county Puget Sound pairs are routine',
        detail:
          'Households regularly move King ↔ Snohomish, Pierce, Kitsap (ferry-linked), or Thurston. Clarify addresses so Washington UTC household goods permit vs FMCSA interstate assumptions stay accurate when any leg leaves Washington.',
      },
      WA_REG_BULLET,
    ],
  },
  zonesHeading: 'King County access zones',
  zonesIntro:
    'Plan by Seattle core vertical product, hill-street neighborhoods, Eastside tech and family belts, south King apartment and industrial edges, and eastside foothills suburbs — access rules cluster by zone more than ZIP alone.',
  zones: [
    {
      id: 'seattle-core-vertical',
      name: 'Downtown Seattle, SLU, Belltown & First Hill towers',
      shortName: 'Seattle core / towers',
      neighborhoods: [
        'Downtown Seattle',
        'Belltown',
        'South Lake Union',
        'First Hill',
        'Denny Triangle',
        'Pioneer Square edges',
      ],
      housingTypes: 'High-rise condo, mid-rise multifamily, denser urban product',
      challenges: [
        'Elevator reservations, dock slots, and building COIs',
        'Limited legal curb and event-day freeflow collapse',
        'I-5 / SR-99 approach congestion into the core',
      ],
      moverTips:
        'Book elevators and COIs in writing before the crew day. Prefer mid-week early freight windows. Photo docks and street-staging options.',
      cityKeywords: [
        'downtown seattle',
        'belltown',
        'south lake union',
        'first hill',
        'denny triangle',
        'pioneer square',
      ],
    },
    {
      id: 'seattle-hills-neighborhoods',
      name: 'Seattle hill neighborhoods (Queen Anne, Capitol Hill, Beacon Hill & beyond)',
      shortName: 'Seattle hills',
      neighborhoods: [
        'Queen Anne',
        'Capitol Hill',
        'Beacon Hill',
        'Magnolia',
        'Ballard',
        'West Seattle edges',
      ],
      housingTypes: 'Walk-up multifamily, bungalows, craftsman SFH, denser duplexes',
      challenges: [
        'Steep approaches, multi-flight stairs, and long carries',
        'Narrow streets with limited truck length',
        'Rain-slick grades and tight curb staging',
      ],
      moverTips:
        'Survey stair counts, driveway grade, and curb options with photos. Confirm whether a smaller truck is required. Inventory basements and porches carefully.',
      cityKeywords: [
        'queen anne',
        'capitol hill',
        'beacon hill',
        'magnolia',
        'ballard',
        'west seattle',
      ],
    },
    {
      id: 'eastside-bellevue-redmond',
      name: 'Eastside tech core (Bellevue, Redmond, Kirkland)',
      shortName: 'Eastside tech',
      neighborhoods: [
        'Bellevue',
        'Downtown Bellevue',
        'Redmond',
        'Kirkland',
        'Factoria edges',
        'Overlake edges',
      ],
      housingTypes: 'High-rise and mid-rise condo, townhomes, newer multifamily, SFH pockets',
      challenges: [
        'Building COIs and elevator windows on denser product',
        'I-405 / SR-520 / I-90 peak freeflow collapse',
        'Employer-driven mid-month relocation spikes',
      ],
      moverTips:
        'Collect building packets early. Price I-405 and floating-bridge buffers for Seattle-linked pairs. Match high-value inventories to experienced crews.',
      cityKeywords: [
        'bellevue',
        'redmond',
        'kirkland',
        'factoria',
        'overlake',
        'eastside',
      ],
    },
    {
      id: 'eastside-foothills-family',
      name: 'Eastside family belts (Issaquah, Sammamish, Renton Highlands edges)',
      shortName: 'Eastside family',
      neighborhoods: [
        'Issaquah',
        'Sammamish',
        'Newcastle',
        'Renton Highlands edges',
        'Mercer Island',
        'Woodinville edges',
      ],
      housingTypes: 'Two-story SFH, townhomes, HOA planned tracts, some multifamily',
      challenges: [
        'HOA gate lists, truck-length rules, and move-hour windows',
        'I-90 / I-405 / SR-520 approach clusters',
        'High Saturday family demand May–August',
      ],
      moverTips:
        'Confirm HOA rules and gate access before the crew day. Survey driveway turn radius and cul-de-sac truck length. Book peak Saturdays early for larger SFH.',
      cityKeywords: [
        'issaquah',
        'sammamish',
        'newcastle',
        'mercer island',
        'woodinville',
        'renton highlands',
      ],
    },
    {
      id: 'south-king',
      name: 'South King (Renton, Kent, SeaTac, Burien & Federal Way edges)',
      shortName: 'South King',
      neighborhoods: [
        'Renton',
        'Kent',
        'SeaTac',
        'Burien',
        'Federal Way edges',
        'Tukwila edges',
      ],
      housingTypes: 'Apartments, townhomes, ranch and two-story SFH, industrial-edge rentals',
      challenges: [
        'I-5 / SR-99 / I-405 corridor congestion clusters',
        'Apartment turnover and guest-parking friction',
        'Airport-adjacent and industrial approach timing',
      ],
      moverTips:
        'Price I-5 portal time honestly for Seattle- or Eastside-linked pairs. Survey apartment elevator/stair access and parking maps. Clarify city jurisdiction on every estimate.',
      cityKeywords: [
        'renton',
        'kent',
        'seatac',
        'burien',
        'federal way',
        'tukwila',
      ],
    },
    {
      id: 'north-king-shoreline',
      name: 'North King (Shoreline, Lake Forest Park, Kenmore & Bothell edges)',
      shortName: 'North King',
      neighborhoods: [
        'Shoreline',
        'Lake Forest Park',
        'Kenmore',
        'Bothell edges',
        'Northgate edges',
        'Lake City edges',
      ],
      housingTypes: 'SFH, mid-century stock, denser multifamily along arterials',
      challenges: [
        'I-5 / SR-522 links and Snohomish-bound freeflow',
        'Tree-lined curb with limited truck length',
        'Mixed alley and driveway staging by block',
      ],
      moverTips:
        'Build I-5 buffers for downtown-linked pairs. Photo curb and driveway options. Clarify King vs Snohomish addresses near Bothell and Kenmore edges.',
      cityKeywords: [
        'shoreline',
        'lake forest park',
        'kenmore',
        'bothell',
        'northgate',
        'lake city',
      ],
    },
  ],
  costDrivers: {
    title: 'What drives King County moving costs',
    intro:
      'Ranges are market context for local / short regional moves — not quotes. Elevator soft costs, hill stairs, curb friction, and I-5 / I-405 / SR-520 portal time separate cheap estimates from real bills.',
    drivers: [
      {
        title: 'Elevator reservations, docks & building COIs',
        detail:
          'Seattle core and Bellevue vertical product add labor and schedule risk before packing skill matters.',
      },
      {
        title: 'Hill streets, stairs & long carries',
        detail:
          'Queen Anne, Capitol Hill, Beacon Hill, and similar stock add flight counts and awkward turns that flat-rate optimism underprices.',
      },
      {
        title: 'I-5 · I-90 · I-405 · SR-520 congestion',
        detail:
          'Cross-lake and city–Eastside pairs burn portal-to-portal hours even when map miles look short.',
      },
      {
        title: 'HOA gates & Eastside building packets',
        detail:
          'Issaquah, Sammamish, and Bellevue multifamily rules add admin soft costs and timed windows.',
      },
      {
        title: 'Multi-county Puget Sound empty miles',
        detail:
          'Snohomish, Pierce, Kitsap, and Thurston destinations raise staging distance and authority complexity.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (simple access)',
        value: '$550–$1,900+',
        note: 'Higher with elevators, hill walk-ups, or peak I-405 pairs',
      },
      {
        label: '2–3BR condo or walk-up flat',
        value: '$1,600–$4,800+',
        note: 'Stairs, COI, and dock soft costs trend up',
      },
      {
        label: '3–4+ BR / high-rise / cross-zone SFH',
        value: '$3,200–$10,000+',
        note: 'Tower moves and long I-5 or I-405 pairs price highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$130–$230+/hr',
        note: 'Portal-to-portal; packing, COI admin, and stairs scale up',
      },
    ],
  },
  seasonal: {
    title: 'When to schedule a King County move',
    intro:
      'Lease cycles, tech-employer calendars, school windows, rain, and elevator/HOA slots reshape access and crew availability.',
    items: [
      {
        title: 'Best windows: mid-week early mornings',
        detail:
          'Tuesday–Thursday starts clear curb, ease downtown and Bellevue freight windows, and reduce I-5 / I-405 / SR-520 pain. Avoid month-end Fridays when leases and elevators collide.',
      },
      {
        title: 'Peak season: late May–mid-September',
        detail:
          'Apartment turnover and family SFH Saturdays fill first. Book 2–4 weeks ahead for peak weekends, elevator slots, and Eastside HOA windows.',
      },
      {
        title: 'Rain season friction (fall–spring)',
        detail:
          'Wet stairs, slick grades, and limited dry staging slow open carries. Prefer early starts, mats and tarps, and flexible weather windows on hill-street addresses.',
      },
      {
        title: 'Tech and professional mid-month spikes',
        detail:
          'Eastside and Seattle employer relocations often land mid-month rather than only on Saturday peaks. Confirm hard move-in dates, temporary housing, and storage-in-transit early.',
      },
    ],
  },
  specialized: [
    {
      id: 'seattle-hill-elevator-eastside',
      title: 'Seattle hill, elevator & Eastside tech logistics module',
      intro:
        'King estimates fail more often on hill stairs, elevator packets, floating-bridge timing, and Eastside HOA rules than on packing skill alone.',
      bullets: [
        'Collect building COI, elevator reservations, and dock rules before the survey is final.',
        'Photo stair counts, driveway grade, curb options, and truck length for hill-street and walk-up stock.',
        'Price portal-to-portal time for any pair that rides I-5, I-90, I-405, SR-520, or SR-99 at peak.',
        'Confirm HOA gate lists, truck-size limits, and move hours on Eastside planned tracts.',
        'Plan rain contingency: mats, tarps, and shorter outdoor carries on wet grades.',
        'Clarify Seattle vs Bellevue/Redmond vs south King addresses on every estimate.',
        'Verify Washington UTC household goods permit for in-state-only jobs and FMCSA for interstate legs.',
      ],
    },
    {
      id: 'eastside-vs-seattle-micro-markets',
      title: 'Seattle core vs Eastside micro-market module',
      intro:
        'A single “King County rate” collapses when tower, hill walk-up, and Eastside HOA product diverge a few miles apart.',
      bullets: [
        'Survey by product — tower, multi-flight walk-up, or HOA two-story — not by county name alone.',
        'Ask which approach corridors the crew will actually use at load and unload (I-5 vs I-405 vs SR-520).',
        'Match high-value Bellevue inventories and basement hill-street inventories to different crew experience.',
        'Expect different parking and permit norms even a few miles apart; do not assume one staging plan covers both addresses.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to King County?',
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
              'Seattle Public Schools covers most Seattle addresses; dozens of suburban districts cover Bellevue, Lake Washington (Kirkland/Redmond/Sammamish), Issaquah, Renton, Kent, and other King municipalities. Assignment is address-based — marketing names like “Eastside” do not guarantee a campus.',
          },
          {
            title: 'Choice, boundaries & enrollment pressure',
            detail:
              'Popular programs and boundary edges can be competitive, especially near high-demand Eastside and north Seattle pockets. Confirm enrollment windows, transportation, and waitlists early when relocating mid-year.',
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
              'UW Medicine, Swedish, Virginia Mason Franciscan, Overlake, and other campuses anchor care across Seattle and the Eastside. Specialty options span the metro — confirm insurance networks for your household.',
          },
          {
            title: 'What relocators should do',
            detail:
              'Map peak-hour drive times from Queen Anne, Capitol Hill, Bellevue, or south King to preferred campuses — I-5, I-405, and floating-bridge congestion change “nearby” on paper. Transfer records early.',
          },
        ],
      },
      {
        id: 'housing',
        title: 'Housing character & cost pressures',
        bullets: [
          {
            title: 'Towers, hill bungalows, Eastside SFH & south King mix',
            detail:
              'Expect high-rise product downtown and in Bellevue; walk-ups and craftsman stock on Seattle hills; HOA two-stories and townhomes on the Eastside; and apartment/SFH mixes through Renton, Kent, and Federal Way edges.',
          },
          {
            title: 'Cost variation inside the county',
            detail:
              'Purchase prices and rents vary sharply by neighborhood and city. Budget for HOA/condo dues, older-building repair risk, parking, and insurance on higher-value inventories.',
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
        title: 'Which King areas fit whom',
        bullets: [
          {
            title: 'Seattle core urban lifestyle',
            detail:
              'Suits people prioritizing walkability, transit, and amenities — with elevator, parking, event-day, and COI tradeoffs on move day.',
          },
          {
            title: 'Hill-neighborhood character living',
            detail:
              'Often appeals for porch-line stock and city views — with stairs, grades, and tight curb staging constraints.',
          },
          {
            title: 'Eastside tech and family corridors',
            detail:
              'Attracts households chasing employers, newer product, and school clusters — with I-405 / SR-520 commute realism and HOA rules.',
          },
          {
            title: 'South King value and airport-adjacent options',
            detail:
              'Fits buyers seeking more space or rent flexibility — with I-5 timing and different building norms than downtown or Bellevue towers.',
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
              'Downtown and SLU professional/tech employers, Eastside technology campuses, healthcare systems, Sea-Tac and logistics edges, government, and education concentrate demand. Many households reverse-commute or cross-lake daily.',
          },
          {
            title: 'Commute realism',
            detail:
              'Many households mix driving, light rail, bus, and ferry-linked Kitsap pairs. I-5, I-90, I-405, SR-520, and SR-99 peaks are real. Test drive or ride peak routes before choosing solely on rent or purchase price.',
          },
        ],
      },
      {
        id: 'lifestyle',
        title: 'Lifestyle & practical livability',
        bullets: [
          {
            title: 'One county, many Kings',
            detail:
              'King stacks tower living, hill bungalows, Eastside tech suburbs, and south King apartment belts — different from Pierce’s Tacoma–JBLM rhythm or Kitsap’s peninsula–ferry logistics.',
          },
          {
            title: 'Climate',
            detail:
              'Mild wet winters, dry-ish summers, and year-round rain risk on open carries. Plan outdoor staging and wet-grade contingency as part of move-in.',
          },
          {
            title: 'Culture and pace',
            detail:
              'Dining, arts, sports, and outdoors culture concentrate heavily in Seattle; Eastside skews more employer- and school-calendar driven. Visit at peak and off-peak times when deciding.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful King County resources',
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify Washington UTC household goods permit status for in-state moves and FMCSA for interstate legs before deposits.',
    items: [
      {
        label: 'King County — official site',
        href: 'https://kingcounty.gov/',
        external: true,
        note: 'County services & offices',
      },
      {
        label: 'City of Seattle',
        href: 'https://www.seattle.gov/',
        external: true,
        note: 'Permits, services & city info',
      },
      {
        label: 'Seattle Public Schools',
        href: 'https://www.seattleschools.org/',
        external: true,
        note: 'Boundaries & calendars (Seattle addresses)',
      },
      {
        label: 'WS-DOT traffic & travel alerts',
        href: 'https://wsdot.com/travel/real-time/',
        external: true,
        note: 'I-5 / I-90 / I-405 / SR-520 before load windows',
      },
    ],
  },
  directoryHint:
    'Prefer crews with elevator/COI experience for Seattle core and Bellevue towers; hill-street stair fluency for Queen Anne, Capitol Hill, and similar stock; honest I-5 · I-90 · I-405 · SR-520 · SR-99 timing for cross-zone pairs; Eastside HOA readiness. Verify Washington UTC household goods permit for in-state moves and FMCSA for interstate legs.',
  lastReviewed: '2026-07-24',
});

import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeHiPack,
  HI_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/hawaii/hi-shared';

/**
 * Maui County, HI — Maui island product focus (Kahului–Wailuku / resort–residential mix).
 * Not Honolulu/Oʻahu, not Big Island, not a whole-state rename.
 * Note: county also includes Molokaʻi / Lānaʻi administratively; this pack focuses Maui island product.
 */
export const mauiCountyHiIntelligence: CountyIntelligencePack = finalizeHiPack({
  countySlug: 'maui',
  hubTitle: 'Maui County Moving Intelligence Hub',
  eyebrow:
    'Maui County, HI · Kahului–Wailuku density, resort/residential mix & island corridor logistics',
  h1: 'Moving in Maui County: Kahului–Wailuku Access, Resort–Residential Mix & Island Corridor Logistics',
  heroOpener:
    'Maui County moving on this hub means Maui island product — Kahului–Wailuku multi-unit and service-core density, Kihei–Wailea resort-residential mix, Lahaina–West Maui recovery and constrained access patterns, Upcountry character grids, Pāʻia–North Shore edges, and rural approaches — not Honolulu condo defaults, not Big Island Belt Road distance, and not a whole-state “Hawaii movers” template. Expect Honoapiʻilani Highway, Haleakalā Highway, and the local Kahului arterial grid to rewrite portal time when tourism peaks, construction, and weather stack. A Kahului walk-up, a Wailea elevator dock, a West Maui hillside driveway, and an Upcountry ranch do not share truck access or crew skill. Inter-island barge/air components and mainland container legs are common enough to quote as separate line items. This hub focuses Maui island product within Maui County — not Oʻahu and not the entire state of Hawaii.',
  heroCredibility:
    'HI PUC Motor Carrier CPCN (household goods) for intrastate / inter-island · FMCSA for mainland · Maui resort/residential & corridor logistics awareness · Curated listings',
  majorCorridors: 'Honoapiʻilani Hwy · Haleakalā Hwy · local Kahului grid',
  whatMakesDifferent: {
    title: 'What makes moving in Maui County different',
    intro:
      'These are Maui island realities — Kahului–Wailuku service-core density, south- and west-side resort-residential mix, Upcountry character, and constrained coastal corridors — not Honolulu H-1 freeflow, not Hilo–Kona Belt Road scripts, and not a generic statewide Hawaii template.',
    bullets: [
      {
        title: 'This is Maui island product — not Honolulu, not the Big Island, not the whole state',
        detail:
          'Ignore Waikīkī high-rise templates, Oʻahu military PCS pages, and Hawaii County Belt Road empty-mile defaults as interchangeable. This pack focuses Maui island addresses: Kahului, Wailuku, Kihei, Wailea, West Maui, Upcountry, Pāʻia, and related belts. Match estimates to Maui addresses and Hawaii PUC authority for the commodity and islands served.',
      },
      {
        title: 'Kahului–Wailuku multi-unit rewrites “island-simple” jobs',
        detail:
          'Central service-core apartments, older walk-ups, and commercial-adjacent curb scarcity need stair surveys and freight timing that Upcountry ranches never see. Airport-adjacent and industrial edges add staging complexity.',
      },
      {
        title: 'Kihei–Wailea and West Maui resort-residential mix underprices flat-rate optimism',
        detail:
          'Resort docks, association rules, elevator COIs, hillside driveways, and tourism-season congestion fail estimates more often than packing skill alone. A Wailea condo and a Makawao SFH do not share labor models.',
      },
      {
        title: 'Honoapiʻilani, Haleakalā Hwy, and Kahului grid burn portal time',
        detail:
          'Kahului ↔ West Maui, Kihei ↔ Upcountry, or Wailuku ↔ South Maui pairs look local and still burn significant time at peak tourism, construction, or weather. Price portal-to-portal honestly.',
      },
      {
        title: 'West Maui access constraints remain a first-class estimate input',
        detail:
          'Post-disaster recovery patterns, corridor capacity, and staging limits on West Maui product require current access checks — do not quote from outdated “always open freeflow” assumptions. Confirm load paths and municipal guidance before finalizing.',
      },
      {
        title: 'Inter-island barge/air and mainland container pairs are routine',
        detail:
          'Households regularly move Maui ↔ Oʻahu, Big Island, or Kauaʻi via barge or air components, and Maui ↔ mainland via container or ocean freight. A Hawaii PUC household goods CPCN alone does not authorize mainland interstate delivery — verify FMCSA when any leg leaves Hawaii.',
      },
      HI_REG_BULLET,
    ],
  },
  zonesHeading: 'Maui County access zones (Maui island focus)',
  zonesIntro:
    'Plan by Kahului–Wailuku service core, Kihei–Wailea south resorts and residential, Lahaina–West Maui constrained corridors, Upcountry character, Pāʻia–North Shore edges, and rural approaches — access rules cluster by resort association, multi-unit stairs, and corridor freeflow more than ZIP alone. This pack focuses Maui island product within Maui County.',
  zones: [
    {
      id: 'kahului-wailuku',
      name: 'Kahului–Wailuku service core, multi-unit & central grid',
      shortName: 'Kahului / Wailuku',
      neighborhoods: [
        'Kahului',
        'Wailuku',
        'Central multi-unit corridors',
        'Airport-adjacent edges',
        'Wailuku town residential',
        'Kahului commercial and industrial edges',
      ],
      housingTypes: 'Walk-up multifamily, SFH, townhomes, limited elevators',
      challenges: [
        'Multi-flight stairs and scarce curb near commercial nodes',
        'Airport and industrial freeflow conflicts at peak',
        'Local Kahului grid congestion for South or West Maui pairs',
      ],
      moverTips:
        'Survey stair counts with photos. Prefer mid-week early starts. Price corridor time to Kihei or West Maui honestly. Inventory humidity packing for coastal and older stock.',
      cityKeywords: [
        'kahului',
        'wailuku',
      ],
    },
    {
      id: 'kihei-wailea',
      name: 'Kihei, Wailea, Mākena & South Maui resort-residential belts',
      shortName: 'Kihei / Wailea',
      neighborhoods: [
        'Kihei',
        'Wailea',
        'Mākena edges',
        'South Maui condo corridors',
        'Piʻilani Highway approaches',
        'Resort residential pockets',
      ],
      housingTypes: 'Condo, townhomes, SFH, resort multi-unit, HOA / association product',
      challenges: [
        'Elevator reservations, docks, and building COIs',
        'Tourism-season congestion and scarce curb',
        'Association timed windows and truck-length rules',
      ],
      moverTips:
        'Book elevators and COIs in writing. Collect association packets early. Prefer early freight windows outside visitor peaks. Photo curb staging options near resort nodes.',
      cityKeywords: [
        'kihei',
        'wailea',
        'makena',
      ],
    },
    {
      id: 'lahaina-west-maui',
      name: 'Lahaina, Kāʻanapali, Nāpili–Kapalua & West Maui corridors',
      shortName: 'West Maui',
      neighborhoods: [
        'Lahaina edges',
        'Kāʻanapali',
        'Nāpili',
        'Kapalua edges',
        'West Maui residential belts',
        'Honoapiʻilani Highway corridors',
      ],
      housingTypes: 'Condo, SFH, resort multi-unit, recovery and rebuilt product mix',
      challenges: [
        'Corridor capacity, staging limits, and access constraints',
        'Resort association rules and elevator logistics',
        'Longer empty miles and timing risk vs Kahului core',
      ],
      moverTips:
        'Confirm current access paths and municipal guidance before quoting. Book resort freight windows in writing. Price Honoapiʻilani portal time honestly. Do not assume outdated freeflow defaults.',
      cityKeywords: [
        'lahaina',
        'kaanapali',
        'napili',
        'kapalua',
        'west maui',
      ],
    },
    {
      id: 'upcountry',
      name: 'Upcountry — Makawao, Pukalani, Kula & Haleakalā slopes',
      shortName: 'Upcountry',
      neighborhoods: [
        'Makawao',
        'Pukalani',
        'Kula',
        'Haʻikū edges',
        'Haleakalā Highway corridors',
        'Upcountry rural-residential belts',
      ],
      housingTypes: 'Character SFH, estate lots, limited multi-unit, agricultural-edge stock',
      challenges: [
        'Elevation grades, driveway geometry, and cooler weather staging',
        'Haleakalā Highway freeflow and longer empty miles to coastal cores',
        'Narrow rural approaches on some lots',
      ],
      moverTips:
        'Survey driveway width and grade with photos. Price empty miles to Kahului or South Maui honestly. Protect interiors from wind and moisture. Clarify Upcountry vs coastal addresses on every estimate.',
      cityKeywords: [
        'makawao',
        'pukalani',
        'kula',
        'haiku',
      ],
    },
    {
      id: 'paia-north-shore',
      name: 'Pāʻia, Haʻikū edges & North Shore coastal product',
      shortName: 'Pāʻia / North Shore',
      neighborhoods: [
        'Pāʻia',
        'Haʻikū edges',
        'North Shore coastal residential',
        'Hāna Highway west approaches (access-dependent)',
        'Beach-adjacent SFH pockets',
        'Rural-coastal edges',
      ],
      housingTypes: 'Character SFH, limited multi-unit, coastal residential',
      challenges: [
        'Narrow coastal road geometry and tourism congestion',
        'Limited truck staging near village cores',
        'Weather and wind exposure on open coastal loads',
      ],
      moverTips:
        'Prefer early starts to avoid visitor traffic. Survey curb and driveway carefully. Price moisture and salt-air packing. Confirm whether Hāna-direction legs need specialized access planning.',
      cityKeywords: [
        'paia',
        'haiku',
        'north shore maui',
      ],
    },
    {
      id: 'rural-edges',
      name: 'Rural edges — Hāna approaches, remote coast & agricultural belts',
      shortName: 'Rural edges',
      neighborhoods: [
        'Hāna approaches (access-dependent)',
        'East Maui rural belts',
        'Agricultural and ranch edges',
        'Remote coastal residential',
        'Central valley rural pockets',
        'Limited-service outlying roads',
      ],
      housingTypes: 'Rural SFH, agricultural-edge stock, limited multi-unit',
      challenges: [
        'Very long empty miles and limited same-day multi-stop feasibility',
        'Narrow roads, one-lane segments, and turnaround limits',
        'Weather-sensitive access and scarce staging',
      ],
      moverTips:
        'Survey full access path with photos or video before dispatch. Price empty miles and possible overnight logistics. Confirm truck length suitability. Never assume Kahului freeflow for remote Hāna-direction addresses.',
      cityKeywords: [
        'hana',
        'east maui',
      ],
    },
  ],
  costDrivers: {
    title: 'What drives Maui County moving costs',
    intro:
      'Resort elevators and associations, Kahului multi-unit stairs, West Maui access constraints, corridor freeflow, Upcountry grades, and inter-island or mainland ocean components move the number more than packing skill alone — this is Maui island logistics, not Honolulu or whole-state defaults.',
    drivers: [
      {
        title: 'Elevator reservations, docks & association COIs',
        detail:
          'Kihei, Wailea, West Maui resort multi-unit, and mid-rise product add labor and schedule risk before packing skill matters.',
      },
      {
        title: 'Kahului–Wailuku stairs & commercial-curb limits',
        detail:
          'Central multi-unit and older stock add flight counts that flat-rate optimism underprices.',
      },
      {
        title: 'Honoapiʻilani · Haleakalā Hwy · Kahului grid congestion',
        detail:
          'Cross-island Maui pairs burn portal-to-portal hours even when map miles look short — especially core ↔ West Maui or coastal ↔ Upcountry.',
      },
      {
        title: 'West Maui access & staging constraints',
        detail:
          'Corridor capacity and current access conditions can rewrite dates, truck size, and crew plans — verify before quoting.',
      },
      {
        title: 'Inter-island barge/air & mainland container legs',
        detail:
          'Pier cutoffs, moisture protection, air-freight premiums, and FMCSA authority for mainland destinations raise complexity beyond same-island local rates.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (simple access)',
        value: '$600–$2,300+',
        note: 'Higher with elevators, walk-ups, peak corridor pairs, or humidity packing',
      },
      {
        label: '2–3BR condo, duplex, or mid-size SFH',
        value: '$1,800–$5,400+',
        note: 'Resort rules, stairs, and empty miles trend up',
      },
      {
        label: '3–4+ BR / resort / cross-island corridor',
        value: '$3,400–$12,000+',
        note: 'West Maui access, Upcountry grades, and long corridor pairs price highest on-island',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$130–$235+/hr',
        note: 'Portal-to-portal; packing, elevators, association admin, and stairs scale up',
      },
      {
        label: 'Inter-island / mainland ocean components',
        value: 'Quoted separately',
        note: 'Barge, air, container, pier, and FMCSA legs are not local hourly defaults',
      },
    ],
  },
  seasonal: {
    title: 'When to schedule a Maui County move',
    intro:
      'Tourism peaks, school calendars, visitor-economy lease turns, trade-wind and rain patterns, and inter-island barge schedules reshape access and crew availability across the Maui island grid.',
    items: [
      {
        title: 'Best windows: mid-week early mornings',
        detail:
          'Tuesday–Thursday starts clear curb in Kahului–Wailuku and ease resort freight windows. Avoid month-end Fridays when leases, elevators, and association slots collide.',
      },
      {
        title: 'Peak season: late May–mid-September plus winter visitor peaks',
        detail:
          'Family school calendars, apartment turnover, and high visitor seasons fill first. Book 2–4+ weeks ahead for peak weekends and popular South or West Maui dates.',
      },
      {
        title: 'Tourism and corridor pressure',
        detail:
          'Honoapiʻilani and South Maui corridors tighten around visitor peaks. Prefer flexible dates and early starts when resort product is involved.',
      },
      {
        title: 'Barge and inter-island schedule dependency',
        detail:
          'When barge or air components apply, pier cutoffs — not just truck availability — can dictate the calendar. Align local load dates with bookings early.',
      },
    ],
  },
  specialized: [
    {
      id: 'maui-resort-residential-corridor',
      title: 'Maui resort/residential, Kahului multi-unit & corridor logistics module',
      intro:
        'Maui island estimates fail more often on association packets, elevator COIs, West Maui access checks, and corridor freeflow than on packing skill alone.',
      bullets: [
        'Book elevators, docks, and building COIs for Kihei, Wailea, and West Maui multi-unit before the survey is final.',
        'Collect association packets, truck-length rules, and timed windows for resort-residential product early.',
        'Survey Kahului–Wailuku stair counts and commercial curb options with photos.',
        'Confirm current West Maui access paths and municipal guidance — do not rely on outdated freeflow assumptions.',
        'Price portal-to-portal time for pairs on Honoapiʻilani Highway, Haleakalā Highway, and the Kahului grid at peak.',
        'Clarify Kahului, Wailuku, Kihei, Wailea, West Maui, Upcountry, Pāʻia, rural, and unincorporated addresses on every estimate.',
        'For in-state and inter-island jobs verify Hawaii PUC Motor Carrier CPCN covering household goods for the islands served; verify FMCSA for any mainland leg.',
      ],
    },
    {
      id: 'inter-island-barge-mainland-container',
      title: 'Inter-island barge/air & mainland container logistics module',
      intro:
        'Same-island Maui local rates collapse when barge, air freight, pier cutoffs, or mainland ocean containers appear — quote those components as distinct line items with schedules and authority checks.',
      bullets: [
        'Separate local Maui trucking from inter-island barge or air components and from mainland container or ocean-freight legs on every written estimate.',
        'Confirm pier cutoffs, booking windows, crate/container sizing, and moisture / humidity packing standards before deposit.',
        'Price air-freight premiums only when timeline requires them — barge remains common for full households between islands when schedules allow.',
        'Verify Hawaii PUC household goods CPCN for in-state and inter-island household goods work; verify FMCSA USDOT/MC for any mainland or other out-of-state leg.',
        'Never treat a Hawaii PUC certificate alone as mainland interstate authority, and never treat a USDOT alone as Hawaii intrastate permission.',
        'State origin and destination as Maui island / Maui County product explicitly — not Honolulu and not whole-state defaults.',
      ],
    },
    {
      id: 'not-honolulu-not-whole-state',
      title: 'Not Honolulu · not Big Island · not whole-state Hawaii module',
      intro:
        'A single “Hawaii rate” collapses when Maui resort-residential product is confused with Oʻahu condos, Big Island Belt Road distance, or Kauaʻi North Shore constraints.',
      bullets: [
        'Do not price Wailea elevators like Waikīkī towers or Hilo walk-ups as interchangeable defaults.',
        'State the market as Maui County / Maui island on every estimate — disambiguate from Honolulu County, Hawaii County (Big Island), and Kauaʻi County.',
        'Keep West Maui access checks separate from South Maui resort freeflow assumptions.',
        'Match inter-island barge windows separately from same-island corridor freeflow quotes.',
        'Note: this pack focuses Maui island product; do not auto-apply Kahului templates to every Maui County administrative address without access survey.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Maui County?',
    intro:
      'Use this as a practical fit checklist — schools, healthcare, housing character, commute realism, and Maui island logistics — then verify on district and hospital sites. No single ranking captures neighborhood fit. This hub focuses Maui island product — not Honolulu/Oʻahu and not the entire state of Hawaii.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & education landscape',
        bullets: [
          {
            title: 'How districts work here',
            detail:
              'Maui island is served by the statewide Hawaiʻi Department of Education complex-area structure across central Maui, South Maui, West Maui, Upcountry, and more remote communities. Assignment is address-based — marketing neighborhood names do not guarantee a campus.',
          },
          {
            title: 'Choice, boundaries & enrollment pressure',
            detail:
              'Popular schools and growth pockets can be competitive. Confirm enrollment windows early when relocating mid-year.',
          },
          {
            title: 'Research sources',
            detail:
              'Hawaiʻi DOE school finder tools, complex-area information, and campus visits beat ranking screenshots alone.',
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
              'Maui Memorial Medical Center and related clinics anchor care on Maui island; specialty care may require Oʻahu travel. Confirm insurance networks for your household.',
          },
          {
            title: 'What relocators should do',
            detail:
              'Map peak-hour drive times on Honoapiʻilani and Haleakalā corridors — tourism freeflow changes “nearby” on paper. Transfer records early.',
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
              'Expect Kahului–Wailuku multi-unit and SFH; Kihei–Wailea condo and resort-residential; West Maui condo and constrained residential mix; Upcountry character SFH; Pāʻia–North Shore coastal product; rural edges with limited services.',
          },
          {
            title: 'Cost variation inside the county',
            detail:
              'Purchase prices and rents vary sharply by resort adjacency, elevation, and central-core access. Budget for association dues, humidity and salt-air maintenance, and competitive rental seasons near employment and tourism hubs.',
          },
          {
            title: 'Building and association governance',
            detail:
              'Associations and resort management often control move hours, truck size, elevators, and deposits. Read documents carefully before locking a move date.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Which areas fit whom',
        bullets: [
          {
            title: 'Kahului–Wailuku central living',
            detail:
              'Suits people prioritizing services, airport access, and employment density — with multi-unit logistics and corridor freeflow tradeoffs.',
          },
          {
            title: 'Kihei–Wailea south living',
            detail:
              'Often appeals for amenities and resort-adjacent lifestyle — with elevator COIs, tourism congestion, and association rules on move day.',
          },
          {
            title: 'West Maui living',
            detail:
              'Fits households tied to West Maui employment and lifestyle — with current access checks and longer empty miles to the central core.',
          },
          {
            title: 'Upcountry living',
            detail:
              'Attracts buyers seeking cooler elevation and character product — with grades, driveway surveys, and coastal commute realism.',
          },
          {
            title: 'Pāʻia / North Shore living',
            detail:
              'Appeals for coastal character — with village curb limits, tourism peaks, and wind/moisture staging needs.',
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
              'Tourism and hospitality, healthcare, education, agriculture, construction, government, airport and logistics, and professional services concentrate demand across central, south, and west Maui.',
          },
          {
            title: 'Commute realism',
            detail:
              'Peak Honoapiʻilani, Haleakalā Highway, and Kahului grid freeflow is real. Test peak routes before choosing solely on rent or purchase price.',
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
              'Maui County on this hub is Maui island product — Kahului–Wailuku core, resort-residential coasts, Upcountry character, and constrained rural edges — not Honolulu density and not a whole-state Hawaii rename.',
          },
          {
            title: 'Climate',
            detail:
              'Tropical island climate with wetter windward and Upcountry gradients, leeward heat, and trade-wind patterns. Plan outdoor staging, moisture protection, and heat contingency as part of move-in.',
          },
          {
            title: 'Culture and pace',
            detail:
              'Visit central, south, west, and Upcountry at peak and off-peak times when deciding — tourism intensity and corridor congestion reshape daily rhythm.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Maui County resources',
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify Hawaii PUC household goods motor carrier certificate status for in-state and inter-island moves and FMCSA for mainland legs before deposits. This hub focuses Maui island product.',
    items: [
      {
        label: 'County of Maui',
        href: 'https://www.mauicounty.gov/',
        external: true,
        note: 'County services & municipal context',
      },
      {
        label: 'County of Maui — Highways Division',
        href: 'https://www.mauicounty.gov/126/Highways-Division',
        external: true,
        note: 'Corridor and road condition context',
      },
      {
        label: 'Hawaiʻi Department of Transportation — Highways',
        href: 'https://hidot.hawaii.gov/highways/',
        external: true,
        note: 'State highway corridor context',
      },
      {
        label: 'Hawaiʻi Department of Education',
        href: 'https://www.hawaiipublicschools.org/',
        external: true,
        note: 'School complex and enrollment research',
      },
      {
        label: 'Hawaii PUC — Motor carriers',
        href: 'https://puc.hawaii.gov/motor_carriers/',
        external: true,
        note: 'Intrastate / inter-island household goods authority',
      },
    ],
  },
  directoryHint:
    'Prefer crews with Kahului–Wailuku multi-unit fluency; resort elevator/COI and association experience for Kihei–Wailea and West Maui; honest Honoapiʻilani · Haleakalā Hwy · Kahului grid timing; current West Maui access checks; Upcountry driveway and grade surveys; and written inter-island barge/air or mainland container components when those legs apply. Verify Hawaii PUC Motor Carrier CPCN covering household goods for intrastate and inter-island moves and FMCSA for mainland legs before deposits. This is Maui island product within Maui County — not Honolulu/Oʻahu and not the whole state of Hawaii.',
  lastReviewed: '2026-07-24',
});

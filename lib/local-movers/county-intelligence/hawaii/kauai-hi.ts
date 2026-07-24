import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeHiPack,
  HI_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/hawaii/hi-shared';

/**
 * Kauaʻi County, HI — Kauaʻi island product (Līhuʻe / North Shore constraints / tourism logistics).
 * NOT Honolulu/Oʻahu, not Big Island, not Maui, not a whole-state rename.
 */
export const kauaiCountyHiIntelligence: CountyIntelligencePack = finalizeHiPack({
  countySlug: 'kauai',
  hubTitle: 'Kauai County Moving Intelligence Hub',
  eyebrow:
    'Kauaʻi County, HI · Līhuʻe density, North Shore constraints & tourism logistics',
  h1: 'Moving in Kauaʻi County: Līhuʻe Access, North Shore Constraints & Tourism Logistics',
  heroOpener:
    'Kauaʻi County is the island of Kauaʻi — Līhuʻe multi-unit and service-core product, Kapaʻa–East Side residential belts, North Shore (Princeville–Hanalei) access constraints, South Shore (Poipū) resort-residential mix, West Side grids, and rural edges — not Honolulu condo defaults, not Big Island Belt Road distance, not Maui West Side templates, and not a whole-state “Hawaii movers” page. Expect Kaumualiʻi Highway, Kuhio Highway, and the local Līhuʻe arterial grid to rewrite portal time when tourism peaks, weather, and one-corridor island geometry stack. A Līhuʻe walk-up, a Poipū elevator dock, a Princeville hillside driveway, and a West Side ranch do not share truck access or crew skill. North Shore bridge, parking, and road constraints are first-class estimate inputs — not footnotes. Inter-island barge/air components and mainland container legs should be quoted as separate line items. This hub is for people moving in Kauaʻi County — not Oʻahu and not the entire state of Hawaii.',
  heroCredibility:
    'HI PUC Motor Carrier CPCN (household goods) for intrastate / inter-island · FMCSA for mainland · Kauaʻi North Shore & tourism logistics awareness · Curated listings',
  majorCorridors: 'Kaumualiʻi Hwy · Kuhio Hwy · local Līhuʻe grid',
  whatMakesDifferent: {
    title: 'What makes moving in Kauaʻi County different',
    intro:
      'These are Kauaʻi realities — Līhuʻe service-core density, East Side growth, North Shore access constraints, South Shore resort-residential mix, West Side distance, and single-corridor freeflow risk — not Honolulu H-1 logistics, not Maui resort grids alone, and not a generic statewide Hawaii template.',
    bullets: [
      {
        title: 'This is Kauaʻi County — not Honolulu, not Maui, not the whole state',
        detail:
          'Ignore Waikīkī high-rise scripts, Oʻahu military PCS pages, Big Island Belt Road empty-mile defaults, and whole-state “move to Hawaii” templates. Kauaʻi County covers Kauaʻi island product: Līhuʻe, Kapaʻa, North Shore, Poipū, West Side, and related belts. Match estimates to Kauaʻi addresses and Hawaii PUC authority for the commodity and islands served.',
      },
      {
        title: 'Līhuʻe multi-unit and service-core product rewrites “island-simple” jobs',
        detail:
          'Central apartments, older walk-ups, airport-adjacent staging, and scarce curb near commercial nodes need stair surveys that rural West Side ranches never see. Airport freight windows can collide with residential curb at peak.',
      },
      {
        title: 'North Shore (Princeville–Hanalei) constraints underprice flat-rate optimism',
        detail:
          'Bridge limits, one-lane segments, parking scarcity, hillside driveways, rain, and tourism congestion fail estimates more often than packing skill alone. Do not quote North Shore like Līhuʻe freeflow or South Shore resort docks as interchangeable defaults.',
      },
      {
        title: 'South Shore resort-residential mix needs association and elevator fluency',
        detail:
          'Poipū multi-unit docks, COIs, timed windows, and tourism curb scarcity rewrite jobs that look simple on a map. A resort condo and a Kōloa residential driveway do not share truck geometry.',
      },
      {
        title: 'Kaumualiʻi Highway, Kuhio Highway, and the Līhuʻe grid burn portal time',
        detail:
          'Līhuʻe ↔ North Shore, Poipū ↔ Kapaʻa, or West Side ↔ East Side pairs look “same island” and still burn significant time at peak tourism or weather. Price portal-to-portal honestly; corridor incidents can strand crews with few alternate routes.',
      },
      {
        title: 'Inter-island barge/air and mainland container pairs are routine',
        detail:
          'Households regularly move Kauaʻi ↔ Oʻahu, Maui, or Big Island via barge or air components, and Kauaʻi ↔ mainland via container or ocean freight. A Hawaii PUC household goods CPCN alone does not authorize mainland interstate delivery — verify FMCSA when any leg leaves Hawaii.',
      },
      HI_REG_BULLET,
    ],
  },
  zonesHeading: 'Kauaʻi County access zones',
  zonesIntro:
    'Plan by Līhuʻe service core, Kapaʻa–East Side residential belts, North Shore (Princeville–Hanalei) constraints, South Shore (Poipū) resort-residential product, West Side grids, and rural edges — access rules cluster by corridor limits, association docks, stairs, and tourism freeflow more than ZIP alone. This is Kauaʻi island product only.',
  zones: [
    {
      id: 'lihue-core',
      name: 'Līhuʻe service core, multi-unit & airport-adjacent product',
      shortName: 'Līhuʻe',
      neighborhoods: [
        'Līhuʻe',
        'Līhuʻe multi-unit corridors',
        'Airport-adjacent edges',
        'Nawiliwili approaches',
        'Central commercial residential pockets',
        'Local Līhuʻe grid belts',
      ],
      housingTypes: 'Walk-up multifamily, SFH, townhomes, limited elevators',
      challenges: [
        'Multi-flight stairs and scarce curb near commercial nodes',
        'Airport and harbor freeflow conflicts at peak',
        'Portal time for North Shore or West Side unload pairs',
      ],
      moverTips:
        'Survey stair counts with photos. Prefer mid-week early starts. Price corridor time to North Shore or Poipū honestly. Inventory humidity packing for coastal and older stock.',
      cityKeywords: [
        'lihue',
        'līhuʻe',
        'nawiliwili',
      ],
    },
    {
      id: 'kapaa-east-side',
      name: 'Kapaʻa, Wailua, Kawaihau & East Side residential belts',
      shortName: 'Kapaʻa / East Side',
      neighborhoods: [
        'Kapaʻa',
        'Wailua',
        'Kawaihau edges',
        'East Side multi-unit pockets',
        'Kuhio Highway corridors',
        'Coastal residential belts',
      ],
      housingTypes: 'SFH, multi-unit pockets, townhomes, vacation-adjacent product',
      challenges: [
        'Kuhio Highway tourism congestion and limited staging',
        'Mixed multi-unit stairs and driveway geometry',
        'Humidity and coastal exposure packing needs',
      ],
      moverTips:
        'Prefer early starts to avoid visitor traffic. Photo curb and driveway options. Collect multi-unit rules when elevators or stairs apply. Price Līhuʻe portal time honestly for south or west pairs.',
      cityKeywords: [
        'kapaa',
        'kapaʻa',
        'wailua',
      ],
    },
    {
      id: 'north-shore-princeville-hanalei',
      name: 'North Shore — Princeville, Hanalei & access-constrained belts',
      shortName: 'North Shore',
      neighborhoods: [
        'Princeville',
        'Hanalei',
        'Kīlauea edges',
        'North Shore hillside residential',
        'Hanalei valley approaches',
        'Constrained coastal village cores',
      ],
      housingTypes: 'SFH, hillside product, limited multi-unit, resort-edge stock',
      challenges: [
        'Bridge, one-lane, and road-constraint access that can limit truck size',
        'Scarce parking/staging and tourism congestion',
        'Rain, landslides, and weather-sensitive closures',
      ],
      moverTips:
        'Survey full access path before dispatch — truck length and weight limits are real. Consider shuttle strategies when full-size trucks cannot stage. Prefer off-peak early windows. Never quote North Shore as Līhuʻe freeflow defaults.',
      cityKeywords: [
        'princeville',
        'hanalei',
        'kilauea',
        'north shore kauai',
      ],
    },
    {
      id: 'south-shore-poipu',
      name: 'South Shore — Poipū, Kōloa, Kalāheo edges & resort-residential mix',
      shortName: 'South Shore / Poipū',
      neighborhoods: [
        'Poipū',
        'Kōloa',
        'Kalāheo edges',
        'South Shore condo corridors',
        'Resort residential pockets',
        'Kaumualiʻi Highway south approaches',
      ],
      housingTypes: 'Condo, townhomes, SFH, resort multi-unit, HOA / association product',
      challenges: [
        'Elevator reservations, docks, and building COIs',
        'Tourism-season congestion and scarce curb',
        'Association timed windows and truck-length rules',
      ],
      moverTips:
        'Book elevators and COIs in writing. Collect association packets early. Prefer early freight windows outside visitor peaks. Separate pure residential Kōloa surveys from resort dock product.',
      cityKeywords: [
        'poipu',
        'poipū',
        'koloa',
        'kōloa',
        'kalaheo',
      ],
    },
    {
      id: 'west-side',
      name: 'West Side — Waimea, Kekaha, Hanapēpē & western grids',
      shortName: 'West Side',
      neighborhoods: [
        'Waimea',
        'Kekaha',
        'Hanapēpē',
        'West Side residential belts',
        'Kaumualiʻi Highway west corridors',
        'Agricultural-edge approaches',
      ],
      housingTypes: 'SFH, limited multi-unit, agricultural-edge stock, older character product',
      challenges: [
        'Longer empty miles to Līhuʻe and North Shore pairs',
        'Heat and sun exposure on open loads',
        'Mixed driveway and rural approach geometry',
      ],
      moverTips:
        'Price empty miles honestly for Līhuʻe or East Side unload pairs. Survey driveway turnarounds. Prefer early starts for heat. Clarify West Side vs South Shore addresses on every estimate.',
      cityKeywords: [
        'waimea',
        'kekaha',
        'hanapepe',
        'hanapēpē',
      ],
    },
    {
      id: 'rural-edges',
      name: 'Rural edges — remote coast, agricultural & limited-access approaches',
      shortName: 'Rural edges',
      neighborhoods: [
        'Remote coastal residential',
        'Agricultural and ranch edges',
        'Limited-service outlying roads',
        'Valley and hillside approaches',
        'Rural subdivision pockets',
        'Weather-sensitive secondary roads',
      ],
      housingTypes: 'Rural SFH, agricultural-edge stock, limited multi-unit',
      challenges: [
        'Very long empty miles and limited same-day multi-stop feasibility',
        'Narrow roads, soft shoulders, and turnaround limits',
        'Weather-sensitive access and scarce staging',
      ],
      moverTips:
        'Survey full access path with photos or video before dispatch. Price empty miles and possible shuttle needs. Confirm truck length suitability. Never assume Līhuʻe freeflow for remote valley or coastal addresses.',
      cityKeywords: [
        'rural kauai',
      ],
    },
  ],
  costDrivers: {
    title: 'What drives Kauaʻi County moving costs',
    intro:
      'North Shore access constraints, South Shore elevators and associations, Līhuʻe stairs, single-corridor freeflow risk, West Side empty miles, and inter-island or mainland ocean components move the number more than packing skill alone — this is Kauaʻi logistics, not Honolulu or whole-state defaults.',
    drivers: [
      {
        title: 'North Shore truck limits, staging & weather access',
        detail:
          'Princeville–Hanalei constraints can force smaller trucks, shuttles, or multi-day logistics that flat-rate optimism underprices.',
      },
      {
        title: 'Elevator reservations, docks & association COIs',
        detail:
          'Poipū and South Shore multi-unit add labor and schedule risk before packing skill matters.',
      },
      {
        title: 'Līhuʻe multi-unit stairs & commercial-curb limits',
        detail:
          'Service-core walk-ups and airport-adjacent freeflow conflicts add flight counts and timing risk.',
      },
      {
        title: 'Kaumualiʻi Hwy · Kuhio Hwy · Līhuʻe grid congestion',
        detail:
          'Cross-island Kauaʻi pairs burn portal-to-portal hours — and corridor incidents can strand crews with few alternate routes.',
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
        value: '$550–$2,200+',
        note: 'Higher with stairs, elevators, North Shore access, or humidity packing',
      },
      {
        label: '2–3BR condo, duplex, or mid-size SFH',
        value: '$1,700–$5,200+',
        note: 'Association rules, stairs, and corridor freeflow trend up',
      },
      {
        label: '3–4+ BR / North Shore / cross-island corridor',
        value: '$3,200–$11,500+',
        note: 'Access constraints, resort product, and long empty miles price highest on-island',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$125–$230+/hr',
        note: 'Portal-to-portal; packing, elevators, shuttles, and stairs scale up',
      },
      {
        label: 'Inter-island / mainland ocean components',
        value: 'Quoted separately',
        note: 'Barge, air, container, pier, and FMCSA legs are not local hourly defaults',
      },
    ],
  },
  seasonal: {
    title: 'When to schedule a Kauaʻi County move',
    intro:
      'Tourism peaks, school calendars, North Shore weather and access risk, South Shore visitor pressure, and inter-island barge schedules reshape access and crew availability across the Kauaʻi grid.',
    items: [
      {
        title: 'Best windows: mid-week early mornings',
        detail:
          'Tuesday–Thursday starts clear curb in Līhuʻe and ease resort freight windows. Avoid month-end Fridays when leases, elevators, and association slots collide.',
      },
      {
        title: 'Peak season: late May–mid-September plus winter visitor peaks',
        detail:
          'Family school calendars, apartment turnover, and high visitor seasons fill first. Book 2–4+ weeks ahead for peak weekends and popular North Shore or Poipū dates.',
      },
      {
        title: 'North Shore weather & access seasonality',
        detail:
          'Winter surf, rain, and occasional road or bridge constraints raise cancellation and shuttle risk on North Shore product. Prefer flexible dates and confirmed access plans.',
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
      id: 'kauai-north-shore-tourism-corridor',
      title: 'Kauaʻi North Shore constraints, tourism & corridor logistics module',
      intro:
        'Kauaʻi estimates fail more often on North Shore access surveys, resort COIs, single-corridor freeflow, and tourism curb scarcity than on packing skill alone.',
      bullets: [
        'Survey Princeville–Hanalei access fully — truck length, bridge limits, staging, and weather risk — before the quote is final; plan shuttles when needed.',
        'Book elevators, docks, and building COIs for Poipū and South Shore multi-unit before the survey is final.',
        'Survey Līhuʻe stair counts and commercial curb options with photos.',
        'Price portal-to-portal time for pairs on Kaumualiʻi Highway, Kuhio Highway, and the Līhuʻe grid at peak — and plan for limited alternate routes.',
        'Collect association packets and truck-length rules for resort-residential product early.',
        'Clarify Līhuʻe, Kapaʻa–East Side, North Shore, South Shore, West Side, rural, and unincorporated addresses on every estimate.',
        'For in-state and inter-island jobs verify Hawaii PUC Motor Carrier CPCN covering household goods for the islands served; verify FMCSA for any mainland leg.',
      ],
    },
    {
      id: 'inter-island-barge-mainland-container',
      title: 'Inter-island barge/air & mainland container logistics module',
      intro:
        'Same-island Kauaʻi local rates collapse when barge, air freight, pier cutoffs, or mainland ocean containers appear — quote those components as distinct line items with schedules and authority checks.',
      bullets: [
        'Separate local Kauaʻi trucking from inter-island barge or air components and from mainland container or ocean-freight legs on every written estimate.',
        'Confirm pier cutoffs, booking windows, crate/container sizing, and moisture / humidity packing standards before deposit.',
        'Price air-freight premiums only when timeline requires them — barge remains common for full households between islands when schedules allow.',
        'Verify Hawaii PUC household goods CPCN for in-state and inter-island household goods work; verify FMCSA USDOT/MC for any mainland or other out-of-state leg.',
        'Never treat a Hawaii PUC certificate alone as mainland interstate authority, and never treat a USDOT alone as Hawaii intrastate permission.',
        'State origin and destination as Kauaʻi County explicitly — not Honolulu and not whole-state defaults.',
      ],
    },
    {
      id: 'not-honolulu-not-whole-state',
      title: 'Not Honolulu · not Maui/Big Island · not whole-state Hawaii module',
      intro:
        'A single “Hawaii rate” collapses when Kauaʻi North Shore constraints and Līhuʻe multi-unit product are confused with Oʻahu condos, Maui resort grids, or Big Island Belt Road distance.',
      bullets: [
        'Do not price Hanalei access like Waikīkī elevators or Kihei resort docks as interchangeable defaults.',
        'State the market as Kauaʻi County on every estimate — disambiguate from Honolulu County (Oʻahu), Maui County, and Hawaii County (Big Island).',
        'Keep North Shore constraint surveys separate from South Shore resort freeflow assumptions.',
        'Match inter-island barge windows separately from same-island corridor freeflow quotes.',
        'Note Waimea on Kauaʻi is not Waimea/Kamuela on the Big Island — disambiguate island in every address review.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Kauaʻi County?',
    intro:
      'Use this as a practical fit checklist — schools, healthcare, housing character, commute realism, and Kauaʻi logistics — then verify on district and hospital sites. No single ranking captures neighborhood fit. This is Kauaʻi County only — not Honolulu/Oʻahu and not the entire state of Hawaii.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & education landscape',
        bullets: [
          {
            title: 'How districts work here',
            detail:
              'Kauaʻi County is served by the statewide Hawaiʻi Department of Education complex-area structure across Līhuʻe, East Side, North Shore, South Shore, and West Side communities. Assignment is address-based — marketing place names do not guarantee a campus.',
          },
          {
            title: 'Choice, boundaries & enrollment pressure',
            detail:
              'Smaller island capacity means popular schools and geographic exceptions can be competitive. Confirm enrollment windows early when relocating mid-year.',
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
              'Wilcox Medical Center and related clinics anchor care on Kauaʻi; specialty care often requires Oʻahu travel. Confirm insurance networks for your household.',
          },
          {
            title: 'What relocators should do',
            detail:
              'Map realistic drive times on Kaumualiʻi and Kuhio corridors — tourism freeflow and weather change “nearby” on paper. Transfer records early and plan for inter-island care logistics when needed.',
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
              'Expect Līhuʻe multi-unit and SFH; Kapaʻa–East Side residential and vacation-adjacent product; North Shore hillside and constrained village stock; Poipū resort condo and South Shore SFH; West Side character and agricultural-edge product; rural edges with limited services.',
          },
          {
            title: 'Cost variation inside the county',
            detail:
              'Purchase prices and rents vary sharply by North Shore vs South Shore vs West Side access. Budget for association dues, humidity and salt-air maintenance, older-building repair risk, and competitive rental seasons near tourism hubs.',
          },
          {
            title: 'Building and association governance',
            detail:
              'Associations and resort management often control move hours, truck size, elevators, and deposits on South Shore multi-unit product. Read documents carefully.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Which areas fit whom',
        bullets: [
          {
            title: 'Līhuʻe central living',
            detail:
              'Suits people prioritizing services, airport access, and employment density — with multi-unit logistics and island-wide empty-mile tradeoffs.',
          },
          {
            title: 'Kapaʻa / East Side living',
            detail:
              'Often appeals for coastal access and relative centrality — with Kuhio congestion and mixed multi-unit surveys.',
          },
          {
            title: 'North Shore living',
            detail:
              'Fits households seeking North Shore character — with bridge/road constraints, weather risk, and higher move-day logistics cost.',
          },
          {
            title: 'South Shore / Poipū living',
            detail:
              'Attracts resort-adjacent lifestyles — with elevator COIs, tourism peaks, and association rules on move day.',
          },
          {
            title: 'West Side living',
            detail:
              'Appeals for quieter grids and relative value — with longer empty miles to Līhuʻe and heat exposure on load day.',
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
              'Tourism and hospitality, healthcare, education, agriculture, construction, government, airport and harbor logistics, and professional services concentrate demand around Līhuʻe, East Side, and resort nodes.',
          },
          {
            title: 'Commute realism',
            detail:
              'Peak Kaumualiʻi Highway and Kuhio Highway freeflow is real — and alternate routes are limited. Test peak routes before choosing solely on rent or purchase price.',
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
              'Kauaʻi County is Kauaʻi island — Līhuʻe core, East Side belts, constrained North Shore, resort South Shore, and quieter West Side — not Honolulu density and not a whole-state Hawaii rename.',
          },
          {
            title: 'Climate',
            detail:
              'Tropical island climate with wetter North Shore and windward gradients, leeward heat on South and West Sides, and trade-wind patterns. Plan outdoor staging, moisture protection, and heat contingency as part of move-in.',
          },
          {
            title: 'Culture and pace',
            detail:
              'Visit Līhuʻe, East Side, North Shore, South Shore, and West Side at peak and off-peak times when deciding — tourism intensity and corridor risk reshape daily rhythm. Respect local access norms on move day.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Kauaʻi County resources',
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify Hawaii PUC household goods motor carrier certificate status for in-state and inter-island moves and FMCSA for mainland legs before deposits.',
    items: [
      {
        label: 'County of Kauaʻi',
        href: 'https://www.kauai.gov/',
        external: true,
        note: 'County services & municipal context',
      },
      {
        label: 'County of Kauaʻi — Public Works',
        href: 'https://www.kauai.gov/Public-Works',
        external: true,
        note: 'Roads and access context',
      },
      {
        label: 'Hawaiʻi Department of Transportation — Highways',
        href: 'https://hidot.hawaii.gov/highways/',
        external: true,
        note: 'Kaumualiʻi / Kuhio corridor context',
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
    'Prefer crews with Līhuʻe multi-unit fluency; North Shore access-survey and shuttle experience for Princeville–Hanalei product; resort elevator/COI fluency for Poipū; honest Kaumualiʻi Hwy · Kuhio Hwy · Līhuʻe grid timing; West Side empty-mile honesty; and written inter-island barge/air or mainland container components when those legs apply. Verify Hawaii PUC Motor Carrier CPCN covering household goods for intrastate and inter-island moves and FMCSA for mainland legs before deposits. This is Kauaʻi County — not Honolulu/Oʻahu and not the whole state of Hawaii.',
  lastReviewed: '2026-07-24',
});

import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeHiPack,
  HI_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/hawaii/hi-shared';

/**
 * Hawaii County, HI — Big Island / Hawaiʻi Island product (Hilo–Kona).
 * CRITICAL: NOT the whole state of Hawaii, NOT Honolulu County / Oʻahu.
 */
export const hawaiiCountyHiIntelligence: CountyIntelligencePack = finalizeHiPack({
  countySlug: 'hawaii',
  hubTitle: 'Hawaii County Moving Intelligence Hub',
  eyebrow:
    'Hawaii County, HI · Big Island / Hilo–Kona access & Hawaiʻi Belt Road logistics',
  h1: 'Moving in Hawaii County: Big Island Access, Hilo–Kona Grids & Belt Road Logistics',
  heroOpener:
    'Hawaii County is the Big Island of Hawaiʻi — Hilo, Kailua-Kona, Waimea/Kamuela, Puna, South Kohala resort edges, and rural lava-zone approaches — not Honolulu County on Oʻahu, not Maui, and not “the entire state of Hawaii.” Expect Hilo multi-unit and older walk-up stock, Kona resort-adjacent and residential product, Waimea upcountry character, Puna and east-side rural-residential access, South Kohala resort-edge logistics, and long Belt Road empty miles that rewrite “local” estimates. Queen Kaʻahumanu Highway, the Hawaiʻi Belt Road (routes circling the island), and local Hilo/Kona grids dominate portal time. A Hilo elevator dock, a Kona hillside driveway, a Waimea ranch, and a Puna rural approach do not share truck access or crew skill. Inter-island barge/air components and mainland container legs are common enough to quote as separate line items. This hub is for people moving in Hawaii County on the Big Island — explicitly not Honolulu/Oʻahu and not a whole-state rename.',
  heroCredibility:
    'HI PUC Motor Carrier CPCN (household goods) for intrastate / inter-island · FMCSA for mainland · Big Island Belt Road & Hilo–Kona logistics awareness · Curated listings',
  majorCorridors: 'Queen Kaʻahumanu Hwy · Hawaiʻi Belt Road · local Hilo/Kona grids',
  whatMakesDifferent: {
    title: 'What makes moving in Hawaii County different',
    intro:
      'These are Hawaii County / Big Island realities — Hilo multi-unit, Kona resort-residential mix, Waimea character, Puna rural access, South Kohala edges, and Belt Road distance — not Honolulu condo elevators, not Maui West Side grids, and not a generic statewide Hawaii template.',
    bullets: [
      {
        title: 'This is Hawaii County (Big Island) — not Honolulu/Oʻahu and not the entire state',
        detail:
          'Ignore Waikīkī high-rise scripts, Oʻahu H-1 freeflow pages, and “move to Hawaii” whole-state templates. Hawaii County covers the island of Hawaiʻi only — Hilo, Kona, Waimea, Puna, Kohala, Kaʻū, and related belts. Match estimates to Big Island addresses and Hawaii PUC authority for the commodity and islands served. Never treat this pack as Honolulu County or statewide defaults.',
      },
      {
        title: 'Hilo multi-unit and older stock rewrite east-side “simple” jobs',
        detail:
          'Downtown Hilo edges, multi-unit walk-ups, humidity, and scarce curb near commercial nodes need stair surveys and moisture planning that dry Kona hillside ranches never see. East-side rain gradients are real labor inputs.',
      },
      {
        title: 'Kailua-Kona and South Kohala resort-residential mix underprices flat-rate optimism',
        detail:
          'Resort-edge docks, HOA or association rules, hillside driveways, and tourism-season congestion fail estimates more often than packing skill alone. A resort condo and a Waimea ranch do not share truck geometry.',
      },
      {
        title: 'Belt Road and Queen Kaʻahumanu distance burn portal time',
        detail:
          'Hilo ↔ Kona, Waimea ↔ Puna, or South Kohala ↔ Hilo pairs look “same island” and still burn 1.5–3+ hours one way depending on route and weather. Price portal-to-portal honestly; empty miles dominate Big Island quotes more than urban Oʻahu pairs.',
      },
      {
        title: 'Rural lava-zone and Puna approaches need access surveys',
        detail:
          'Narrow roads, soft shoulders, private easements, and lava-zone / hazard-area approaches can limit truck length and turnaround. Photo access early; do not assume mainland suburban freeflow.',
      },
      {
        title: 'Inter-island barge/air and mainland container pairs are routine',
        detail:
          'Households regularly move Big Island ↔ Oʻahu, Maui, or Kauaʻi via barge or air components, and Big Island ↔ mainland via container or ocean freight. A Hawaii PUC household goods CPCN alone does not authorize mainland interstate delivery — verify FMCSA when any leg leaves Hawaii. Pier schedules and moisture protection are estimate-line items.',
      },
      HI_REG_BULLET,
    ],
  },
  zonesHeading: 'Hawaii County access zones',
  zonesIntro:
    'Plan by Hilo multi-unit and east-side product, Kailua-Kona residential and resort-adjacent belts, Waimea/Kamuela upcountry character, Puna/east rural approaches, South Kohala resort edges, and rural lava-zone / Kaʻū–south approaches where accurate — access rules cluster by distance, weather side, and road geometry more than ZIP alone. This is Big Island product only — explicitly not Honolulu/Oʻahu and not the entire state of Hawaii.',
  zones: [
    {
      id: 'hilo-multi-unit',
      name: 'Hilo multi-unit, downtown edges & east-side urban product',
      shortName: 'Hilo',
      neighborhoods: [
        'Downtown Hilo edges',
        'Hilo multi-unit corridors',
        'Waiākea edges',
        'Kaūmana edges',
        'Hilo bayfront approaches',
        'East-side apartment pockets',
      ],
      housingTypes: 'Walk-up multifamily, older SFH, limited elevators, mixed mid-rise',
      challenges: [
        'Multi-flight stairs, humidity packing, and scarce truck length',
        'Rain-side weather delays and covered staging needs',
        'Belt Road freeflow for westbound unload pairs',
      ],
      moverTips:
        'Survey stair counts with photos. Prefer mid-week early starts. Inventory basements and humidity-sensitive goods carefully. Price long empty miles to Kona honestly.',
      cityKeywords: [
        'hilo',
      ],
    },
    {
      id: 'kailua-kona',
      name: 'Kailua-Kona, Aliʻi corridor & west-side residential product',
      shortName: 'Kailua-Kona',
      neighborhoods: [
        'Kailua-Kona',
        'Aliʻi Drive corridors',
        'Kona hillside residential',
        'Keauhou edges',
        'Kailua village multi-unit pockets',
        'West-side HOA and association product',
      ],
      housingTypes: 'SFH, hillside product, condo/townhome, resort-adjacent multi-unit',
      challenges: [
        'Hillside driveway geometry and limited turnarounds',
        'Tourism-season congestion and scarce curb near village cores',
        'Queen Kaʻahumanu / Belt Road freeflow for east-side pairs',
      ],
      moverTips:
        'Photo driveway width and staging. Collect association rules for multi-unit and gated product. Prefer early starts on tourism peaks. Separate resort docks from pure residential surveys.',
      cityKeywords: [
        'kailua-kona',
        'kailua kona',
        'kona',
        'keauhou',
      ],
    },
    {
      id: 'waimea-kamuela',
      name: 'Waimea / Kamuela upcountry character & ranch belts',
      shortName: 'Waimea / Kamuela',
      neighborhoods: [
        'Waimea',
        'Kamuela',
        'Waimea upcountry residential',
        'Ranch and pastoral edges',
        'Parker Ranch–adjacent corridors',
        'Saddle Road approach edges',
      ],
      housingTypes: 'Character SFH, ranch lots, limited multi-unit, estate-edge stock',
      challenges: [
        'Longer empty miles to Hilo and Kona cores',
        'Weather exposure, wind, and cooler upcountry staging',
        'Driveway and ranch-road geometry for larger trucks',
      ],
      moverTips:
        'Price empty miles to Hilo or Kona honestly. Survey ranch-road width and turnaround. Protect interiors from wind and moisture during load. Clarify Waimea vs coastal addresses on every estimate.',
      cityKeywords: [
        'waimea',
        'kamuela',
      ],
    },
    {
      id: 'puna-east',
      name: 'Puna, Pāhoa, Keaʻau & east-side rural-residential belts',
      shortName: 'Puna / east',
      neighborhoods: [
        'Puna',
        'Pāhoa edges',
        'Keaʻau edges',
        'Hawaiian Paradise Park edges',
        'East-side rural subdivisions',
        'Volcano edges (access-dependent)',
      ],
      housingTypes: 'Rural-residential SFH, subdivision stock, limited multi-unit',
      challenges: [
        'Narrow roads, soft shoulders, and limited truck turnaround',
        'Longer empty miles and weather-sensitive access',
        'Mixed private road and easement conditions',
      ],
      moverTips:
        'Survey road width, surface, and turnaround before dispatch. Price empty miles and possible shuttle needs. Confirm address access for larger trucks — do not assume Hilo freeflow.',
      cityKeywords: [
        'puna',
        'pahoa',
        'keaau',
        'hawaiian paradise park',
      ],
    },
    {
      id: 'south-kohala-resort',
      name: 'South Kohala resort edges — Waikoloa, Mauna Lani & coastal resort belts',
      shortName: 'South Kohala',
      neighborhoods: [
        'Waikoloa',
        'Mauna Lani edges',
        'South Kohala resort corridors',
        'Puakō edges',
        'Resort residential and condo product',
        'Queen Kaʻahumanu coastal approaches',
      ],
      housingTypes: 'Resort condo, townhomes, estate SFH, HOA / association product',
      challenges: [
        'Resort dock rules, COIs, and timed freight windows',
        'Tourism congestion and scarce curb at peak',
        'Long empty miles to Hilo multi-unit pairs',
      ],
      moverTips:
        'Book resort freight windows and COIs in writing. Collect association packets early. Price Queen Kaʻahumanu and Belt Road time to Hilo honestly. Inventory humidity and salt-air packing needs.',
      cityKeywords: [
        'waikoloa',
        'mauna lani',
        'south kohala',
        'puako',
      ],
    },
    {
      id: 'rural-lava-south-edges',
      name: 'Rural lava-zone, Kaʻū & southern / remote approaches',
      shortName: 'Rural / lava / Kaʻū',
      neighborhoods: [
        'Kaʻū edges',
        'Ocean View edges',
        'Nāʻālehu edges',
        'Rural lava-zone residential approaches',
        'Southern Belt Road corridors',
        'Remote agricultural and homestead edges',
      ],
      housingTypes: 'Rural SFH, homestead stock, limited multi-unit, agricultural-edge product',
      challenges: [
        'Very long empty miles and limited same-day multi-stop feasibility',
        'Lava-zone / hazard-area access constraints and road quality variance',
        'Truck-length, weight, and turnaround limits on rural approaches',
      ],
      moverTips:
        'Price empty miles and overnight logistics when needed. Survey access with photos or video. Confirm whether shuttle or smaller truck is required. Never assume urban Hilo/Kona freeflow for rural lava-zone addresses.',
      cityKeywords: [
        'ka u',
        'ocean view',
        'naalehu',
        'kau',
      ],
    },
  ],
  costDrivers: {
    title: 'What drives Hawaii County moving costs',
    intro:
      'Belt Road empty miles, Hilo stairs and humidity, Kona hillside and resort rules, rural access surveys, and inter-island or mainland ocean components move the number more than packing skill alone — this is Big Island / Hawaii County logistics, not Honolulu/Oʻahu or whole-state defaults.',
    drivers: [
      {
        title: 'Hawaiʻi Belt Road & Queen Kaʻahumanu empty miles',
        detail:
          'Hilo ↔ Kona and cross-island pairs burn portal-to-portal hours even when map miles look “same island.” Distance dominates Big Island quotes.',
      },
      {
        title: 'Hilo multi-unit stairs, humidity & rain-side staging',
        detail:
          'East-side walk-ups and weather add labor and moisture-protection costs before packing skill matters.',
      },
      {
        title: 'Kona hillside geometry & resort association rules',
        detail:
          'Driveway limits, docks, COIs, and tourism curb scarcity rewrite jobs that look simple on a map.',
      },
      {
        title: 'Rural Puna / lava-zone / Kaʻū access constraints',
        detail:
          'Narrow roads, soft shoulders, and limited turnarounds can force shuttles, smaller trucks, or multi-day logistics.',
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
        note: 'Higher with stairs, humidity packing, or long Belt Road pairs',
      },
      {
        label: '2–3BR condo, duplex, or mid-size SFH',
        value: '$1,700–$5,200+',
        note: 'Hillside, resort rules, and empty miles trend up',
      },
      {
        label: '3–4+ BR / cross-island / rural access',
        value: '$3,200–$11,000+',
        note: 'Hilo↔Kona distance, rural approaches, and resort product price highest on-island',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$125–$230+/hr',
        note: 'Portal-to-portal; packing, stairs, and long empty miles scale up',
      },
      {
        label: 'Inter-island / mainland ocean components',
        value: 'Quoted separately',
        note: 'Barge, air, container, pier, and FMCSA legs are not local hourly defaults',
      },
    ],
  },
  seasonal: {
    title: 'When to schedule a Hawaii County move',
    intro:
      'Tourism peaks on the Kona side, school calendars, east-side rain patterns, vog and weather events, and inter-island barge schedules reshape access and crew availability across the Big Island grid.',
    items: [
      {
        title: 'Best windows: mid-week early mornings',
        detail:
          'Tuesday–Thursday starts clear curb in Hilo and Kona cores, ease resort freight windows, and reduce tourism congestion. Avoid month-end Fridays when leases and association slots collide.',
      },
      {
        title: 'Peak season: late May–mid-September plus visitor peaks',
        detail:
          'Family school calendars, apartment turnover, and west-side visitor pressure fill first. Book 2–4+ weeks ahead for peak weekends and popular Kona or South Kohala dates.',
      },
      {
        title: 'East-side rain & west-side heat gradients',
        detail:
          'Hilo and Puna rain can delay outdoor staging; Kona heat and sun reshape crew pacing. Prefer early starts, covered staging on the east side, and hydration plans on the west side.',
      },
      {
        title: 'Barge and inter-island schedule dependency',
        detail:
          'When barge or air components apply, cutoffs — not just truck availability — can dictate the calendar. Align local load dates with pier bookings early.',
      },
    ],
  },
  specialized: [
    {
      id: 'big-island-belt-road-corridor',
      title: 'Big Island Belt Road, Hilo–Kona & rural access logistics module',
      intro:
        'Hawaii County estimates fail more often on empty miles, weather-side surveys, resort rules, and rural access than on packing skill alone.',
      bullets: [
        'Price portal-to-portal time for any pair that rides Queen Kaʻahumanu Highway or the Hawaiʻi Belt Road — Hilo ↔ Kona is not a short urban hop.',
        'Survey Hilo stairs, humidity packing, and covered staging before finalizing east-side multi-unit quotes.',
        'Collect association packets, dock rules, and COIs for Kailua-Kona and South Kohala resort-adjacent product.',
        'Photo rural Puna, lava-zone, and Kaʻū approaches — confirm truck length, surface, and turnaround before dispatch.',
        'Clarify Hilo, Kona, Waimea/Kamuela, Puna, South Kohala, Kaʻū, and unincorporated addresses on every estimate.',
        'For in-state and inter-island jobs verify Hawaii PUC Motor Carrier CPCN covering household goods for the islands served; verify FMCSA for any mainland leg.',
      ],
    },
    {
      id: 'inter-island-barge-mainland-container',
      title: 'Inter-island barge/air & mainland container logistics module',
      intro:
        'Same-island Big Island local rates collapse when barge, air freight, pier cutoffs, or mainland ocean containers appear — quote those components as distinct line items with schedules and authority checks.',
      bullets: [
        'Separate local Big Island trucking from inter-island barge or air components and from mainland container or ocean-freight legs on every written estimate.',
        'Confirm pier cutoffs, booking windows, crate/container sizing, and moisture / humidity packing standards before deposit.',
        'Price air-freight premiums only when timeline requires them — barge remains common for full households between islands when schedules allow.',
        'Verify Hawaii PUC household goods CPCN for in-state and inter-island household goods work; verify FMCSA USDOT/MC for any mainland or other out-of-state leg.',
        'Never treat a Hawaii PUC certificate alone as mainland interstate authority, and never treat a USDOT alone as Hawaii intrastate permission.',
        'State origin and destination as Hawaii County / Big Island explicitly — never as “Honolulu” or “the entire state of Hawaii.”',
      ],
    },
    {
      id: 'not-honolulu-not-whole-state',
      title: 'Not Honolulu/Oʻahu · not the entire state of Hawaii module',
      intro:
        'A single “Hawaii rate” collapses when Big Island Belt Road product is confused with Honolulu condo elevators, Maui resort grids, or Kauaʻi North Shore constraints — or when the county name is misread as the whole state.',
      bullets: [
        'Do not price Hilo multi-unit or Kona hillside product like Waikīkī elevators or Oʻahu H-1 freeflow as interchangeable defaults.',
        'State the market as Hawaii County / Big Island / Hilo–Kona on every estimate — disambiguate from Honolulu County (Oʻahu), Maui County, Kauaʻi County, and statewide templates.',
        'Keep east-side rain logistics separate from west-side heat and tourism peaks.',
        'Match inter-island barge windows separately from same-island Belt Road empty-mile quotes.',
        'Explicitly reject “whole state of Hawaii” naming on local Big Island estimates.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Hawaii County?',
    intro:
      'Use this as a practical fit checklist — schools, healthcare, housing character, commute realism, and Big Island logistics — then verify on district and hospital sites. No single ranking captures neighborhood fit. This is Hawaii County on the Big Island only — not Honolulu/Oʻahu and not the entire state of Hawaii.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & education landscape',
        bullets: [
          {
            title: 'How districts work here',
            detail:
              'Hawaii County is served by the statewide Hawaiʻi Department of Education complex-area structure across Hilo, Kona, Waimea, Puna, Kohala, and Kaʻū communities. Assignment is address-based — marketing place names do not guarantee a campus.',
          },
          {
            title: 'Choice, boundaries & enrollment pressure',
            detail:
              'Popular schools and geographic exceptions can be competitive in growth pockets. Confirm enrollment windows early when relocating mid-year.',
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
              'Hilo Medical Center, Kona Community Hospital, North Hawaii Community Hospital (Waimea), and related clinics anchor care across the island. Specialty care may require Oʻahu travel — plan for that in household logistics.',
          },
          {
            title: 'What relocators should do',
            detail:
              'Map realistic drive times on Belt Road routes — “nearby” on paper can be hours in practice. Transfer records early and confirm insurance networks for Hilo vs Kona vs Waimea campuses.',
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
              'Expect Hilo multi-unit and older SFH; Kailua-Kona hillside and resort-adjacent product; Waimea ranch and character SFH; Puna rural-residential subdivisions; South Kohala resort condo and estate edges; Kaʻū and lava-zone rural approaches.',
          },
          {
            title: 'Cost variation inside the county',
            detail:
              'Purchase prices and rents vary sharply by coast, elevation, and resort adjacency. Budget for humidity and pest maintenance, older-building repair risk, private-road costs, and longer supply chains than urban Oʻahu.',
          },
          {
            title: 'Building and association governance',
            detail:
              'Associations and resort management often control move hours, truck size, elevators, and deposits on west-side multi-unit product. Read documents carefully.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Which areas fit whom',
        bullets: [
          {
            title: 'Hilo east-side urban living',
            detail:
              'Suits people prioritizing services density and rain-forest character — with stairs, humidity, and long westbound drive tradeoffs.',
          },
          {
            title: 'Kailua-Kona west-side living',
            detail:
              'Often appeals for sun, employment, and amenities — with hillside geometry, tourism congestion, and resort-rule complexity on move day.',
          },
          {
            title: 'Waimea / Kamuela upcountry',
            detail:
              'Fits households seeking cooler elevation and ranch character — with empty miles to both coasts and weather exposure.',
          },
          {
            title: 'Puna / east rural belts',
            detail:
              'Attracts buyers chasing land and relative value — with access surveys, longer empty miles, and infrastructure variance.',
          },
          {
            title: 'South Kohala resort edges',
            detail:
              'Common for resort-adjacent lifestyles — with association rules, tourism peaks, and high empty-mile costs to Hilo.',
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
              'Tourism and hospitality, healthcare, education, astronomy/research, agriculture, construction, government, and retail concentrate demand differently on east and west sides.',
          },
          {
            title: 'Commute realism',
            detail:
              'Belt Road and Queen Kaʻahumanu distances are real — many “local” jobs still imply long drives. Test peak and weather-affected routes before choosing solely on rent or purchase price.',
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
              'Hawaii County is the Big Island — Hilo–Kona dual cores, upcountry Waimea, rural Puna and Kaʻū, and resort-edge Kohala — explicitly not Honolulu/Oʻahu density and not the entire state of Hawaii.',
          },
          {
            title: 'Climate',
            detail:
              'Dramatic microclimates: wet east side, dry west side, cool upcountry. Plan outdoor staging, moisture protection, heat, and wind as part of move-in by zone.',
          },
          {
            title: 'Culture and pace',
            detail:
              'Visit both coasts and upcountry when deciding — distance, weather side, and tourism intensity reshape daily rhythm far more than a single “Hawaii Island” label suggests.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Hawaii County resources',
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify Hawaii PUC household goods motor carrier certificate status for in-state and inter-island moves and FMCSA for mainland legs before deposits. This hub covers Hawaii County (Big Island) only — not Honolulu/Oʻahu and not the entire state.',
    items: [
      {
        label: 'County of Hawaiʻi',
        href: 'https://www.hawaiicounty.gov/',
        external: true,
        note: 'County services & property context',
      },
      {
        label: 'County of Hawaiʻi — Civil Defense',
        href: 'https://www.hawaiicounty.gov/departments/civil-defense',
        external: true,
        note: 'Hazards and emergency context for rural / lava-zone planning',
      },
      {
        label: 'Hawaiʻi Department of Transportation — Highways',
        href: 'https://hidot.hawaii.gov/highways/',
        external: true,
        note: 'Belt Road / Queen Kaʻahumanu corridor context',
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
    'Prefer crews with Hilo multi-unit and humidity fluency; Kona hillside and resort association experience; Waimea empty-mile honesty; rural Puna / lava-zone access surveys; and written inter-island barge/air or mainland container components when those legs apply. Verify Hawaii PUC Motor Carrier CPCN covering household goods for intrastate and inter-island moves and FMCSA for mainland legs before deposits. This is Hawaii County on the Big Island (Hilo–Kona) — explicitly NOT Honolulu/Oʻahu and NOT the entire state of Hawaii.',
  lastReviewed: '2026-07-24',
});

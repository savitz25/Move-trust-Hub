import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeHiPack,
  HI_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/hawaii/hi-shared';

/**
 * Honolulu County, HI — City & County of Honolulu / Oʻahu island product.
 * NOT the Big Island (Hawaii County), not Maui, not Kauaʻi, and not a whole-state rename.
 */
export const honoluluCountyHiIntelligence: CountyIntelligencePack = finalizeHiPack({
  countySlug: 'honolulu',
  hubTitle: 'Honolulu County Moving Intelligence Hub',
  eyebrow:
    'Honolulu County, HI · Oʻahu / Honolulu density, condo elevators & H-1 / H-2 / H-3 logistics',
  h1: 'Moving in Honolulu County: Oʻahu Density, Condo Elevators, Military Patterns & H-1 / H-2 / H-3 Logistics',
  heroOpener:
    'Honolulu County is the City and County of Honolulu — the entire island of Oʻahu — not the Big Island (Hawaii County), not Maui, and not a whole-state “Hawaii movers” template. Expect Honolulu urban-core high-rises, East Honolulu and Hawaiʻi Kai hillside product, Pearl City–Aiea multi-unit and military-adjacent belts, Kapolei–Ewa growth and HOA grids, Kailua–Kaneohe windward character, and North Shore edges with constrained rural-coastal access. H-1, H-2, H-3, Kamehameha Highway, and the local Oʻahu arterial grid rewrite “local” estimates when peak congestion, elevator reservations, and pier or inter-island barge windows stack. A Waikīkī or Ala Moana elevator dock, a Salt Lake walk-up, a Kailua driveway, and a North Shore ranch do not share truck access or crew skill. Military PCS waves, tourism-adjacent lease turns, and school calendars are real inputs. This hub is for people moving in Honolulu County on Oʻahu — not Hawaii County on the Big Island and not a renamed statewide page.',
  heroCredibility:
    'HI PUC Motor Carrier CPCN (household goods) for intrastate / inter-island · FMCSA for mainland · Oʻahu condo, military & H-1 / H-2 / H-3 logistics awareness · Curated listings',
  majorCorridors: 'H-1 · H-2 · H-3 · Kamehameha Hwy · local Oʻahu grid',
  whatMakesDifferent: {
    title: 'What makes moving in Honolulu County different',
    intro:
      'These are Honolulu County / Oʻahu realities — urban condo elevators, military PCS density, windward character product, and H-1 / H-2 / H-3 freeflow — not Big Island Belt Road logistics, not Maui resort grids, and not a generic statewide Hawaii template.',
    bullets: [
      {
        title: 'This is Honolulu County on Oʻahu — not the Big Island and not the whole state',
        detail:
          'Ignore Hawaii County (Hilo–Kona) Belt Road scripts, Maui Kahului–West Maui resort templates, and Kauaʻi Līhuʻe–North Shore constraint pages. Honolulu County is the City and County of Honolulu covering Oʻahu only. Match estimates to Oʻahu addresses and Hawaii PUC authority for the commodity and islands served — not a renamed whole-state page.',
      },
      {
        title: 'Honolulu urban-core condo elevators rewrite “island-simple” jobs',
        detail:
          'Waikīkī, Ala Moana, Kakaʻako, Downtown, and Makiki multi-unit product need elevator reservations, building COIs, freight-window timing, and scarce curb that suburban Kapolei cul-de-sacs never see. A high-rise dock and a Kailua ranch do not share labor models.',
      },
      {
        title: 'Military PCS and installation-adjacent belts reshape calendars',
        detail:
          'Joint Base Pearl Harbor-Hickam, Schofield Barracks, Marine Corps Base Hawaii (Kaneohe Bay), and related housing belts create concentrated move waves that fill crews and elevators. PCS orders and housing office rules are real estimate inputs — not generic civilian lease turns alone.',
      },
      {
        title: 'Windward, East Honolulu, and hillside product underprice flat-rate optimism',
        detail:
          'Kailua, Kaneohe, Hawaiʻi Kai, and East Honolulu hillside driveways, long carries, humidity packing, and narrow residential curb fail estimates more often than packing skill alone. Stair counts and driveway geometry matter as much as distance.',
      },
      {
        title: 'H-1, H-2, H-3, and Kamehameha Highway burn portal time',
        detail:
          'Honolulu ↔ Kapolei, Kailua ↔ Pearl City, or East Honolulu ↔ Central Oʻahu pairs look local and still burn 35–70+ minutes at peak. Price portal-to-portal honestly; H-1 bottleneck segments rewrite same-island “short haul” quotes.',
      },
      {
        title: 'Inter-island barge/air and mainland container pairs are routine',
        detail:
          'Households regularly move Oʻahu ↔ Maui, Big Island, or Kauaʻi via barge or air freight components, and Oʻahu ↔ mainland via container or ocean freight. A Hawaii PUC household goods CPCN alone does not authorize mainland interstate delivery — verify FMCSA when any leg leaves Hawaii. Pier schedules, cutoffs, and moisture protection are estimate-line items, not afterthoughts.',
      },
      HI_REG_BULLET,
    ],
  },
  zonesHeading: 'Honolulu County access zones',
  zonesIntro:
    'Plan by Honolulu urban core, East Honolulu / Hawaiʻi Kai, Pearl City–Aiea military and multi-unit belts, Kapolei–Ewa growth, Kailua–Kaneohe windward character, and North Shore edges — access rules cluster by elevator, military housing, hillside geometry, and corridor freeflow more than ZIP alone. This is Oʻahu product only — not Big Island or whole-state defaults.',
  zones: [
    {
      id: 'honolulu-urban-core',
      name: 'Honolulu urban core — Waikīkī, Ala Moana, Kakaʻako, Downtown & Makiki',
      shortName: 'Honolulu core',
      neighborhoods: [
        'Waikīkī',
        'Ala Moana',
        'Kakaʻako',
        'Downtown Honolulu',
        'Makiki',
        'Mōʻiliʻili edges',
        'McCully edges',
      ],
      housingTypes: 'High-rise condo, mid-rise multifamily, walk-up, limited SFH pockets',
      challenges: [
        'Elevator reservations, freight docks, and building COIs',
        'Scarce curb near tourism and retail corridors',
        'H-1 / Nimitz / Ala Moana freeflow and peak congestion',
      ],
      moverTips:
        'Book elevators and COIs in writing when required. Prefer mid-week early freight windows. Photo curb staging and dock access early. Inventory humidity packing for ocean-adjacent stock.',
      cityKeywords: [
        'honolulu',
        'waikiki',
        'ala moana',
        'kakaako',
        'makiki',
      ],
    },
    {
      id: 'east-honolulu-hawaii-kai',
      name: 'East Honolulu, Hawaiʻi Kai & southeastern hillside belts',
      shortName: 'East Honolulu / Hawaiʻi Kai',
      neighborhoods: [
        'Hawaiʻi Kai',
        'Kāhala edges',
        'Kuliʻouʻou',
        'Niu Valley',
        'ʻĀina Haina',
        'East Honolulu hillside corridors',
      ],
      housingTypes: 'SFH, hillside product, townhomes, limited multi-unit',
      challenges: [
        'Hillside driveway geometry, long carries, and tight turnarounds',
        'Kalanianaʻole Highway freeflow and limited truck staging',
        'Humidity and coastal exposure packing needs',
      ],
      moverTips:
        'Survey driveway width and turnaround with photos. Price long carries honestly. Protect landscaping and older interiors. Align with school calendars for family product.',
      cityKeywords: [
        'hawaii kai',
        'kahala',
        'aina haina',
        'east honolulu',
      ],
    },
    {
      id: 'pearl-city-aiea',
      name: 'Pearl City, Aiea, Salt Lake & central multi-unit / military-adjacent belts',
      shortName: 'Pearl City / Aiea',
      neighborhoods: [
        'Pearl City',
        'Aiea',
        'Salt Lake',
        'Pearl Harbor edges',
        'Moanalua edges',
        'Central multi-unit corridors',
      ],
      housingTypes: 'Multi-family, military-adjacent housing, SFH, townhomes',
      challenges: [
        'Military PCS waves and housing-office timing constraints',
        'H-1 / H-201 / Kamehameha Highway freeflow',
        'Elevator and walk-up mix with scarce curb near commercial nodes',
      ],
      moverTips:
        'Coordinate PCS orders and housing office rules early. Book elevators when multi-unit. Price H-1 portal time for Honolulu or Kapolei pairs. Confirm installation access rules if on-base legs apply.',
      cityKeywords: [
        'pearl city',
        'aiea',
        'salt lake',
      ],
    },
    {
      id: 'kapolei-ewa',
      name: 'Kapolei, Ewa, Ewa Beach & leeward growth belts',
      shortName: 'Kapolei / Ewa',
      neighborhoods: [
        'Kapolei',
        'Ewa',
        'Ewa Beach',
        'Makakilo edges',
        'Ko Olina edges',
        'Leeward HOA growth corridors',
      ],
      housingTypes: 'HOA SFH, townhomes, newer multi-family, resort-edge product',
      challenges: [
        'HOA gate lists, truck-length limits, and timed windows',
        'H-1 west freeflow and longer empty miles vs Honolulu core',
        'School-calendar and growth-corridor peak demand',
      ],
      moverTips:
        'Collect HOA packets and gate codes early. Confirm truck length rules. Price H-1 west honestly for core Honolulu unload pairs. Survey resort-edge dock rules where applicable.',
      cityKeywords: [
        'kapolei',
        'ewa',
        'ewa beach',
        'makakilo',
      ],
    },
    {
      id: 'kailua-kaneohe-windward',
      name: 'Kailua, Kaneohe & windward character grids',
      shortName: 'Kailua / Kaneohe',
      neighborhoods: [
        'Kailua',
        'Kaneohe',
        'Kailua beach-adjacent edges',
        'MCBH Kaneohe Bay edges',
        'Windward multi-unit pockets',
        'Pali / Likelike approach corridors',
      ],
      housingTypes: 'Character SFH, multi-unit pockets, military-adjacent housing',
      challenges: [
        'Pali Highway / Likelike / H-3 freeflow into town',
        'Narrow residential curb and older multi-unit stairs',
        'Military and school-calendar peaks on windward product',
      ],
      moverTips:
        'Price H-3 and Pali approaches honestly. Survey stair counts with photos. Coordinate military housing rules when relevant. Prefer early starts for Honolulu-core pairs.',
      cityKeywords: [
        'kailua',
        'kaneohe',
      ],
    },
    {
      id: 'north-shore-edges',
      name: 'North Shore edges — Haleʻiwa, Waialua & rural-coastal approaches',
      shortName: 'North Shore edges',
      neighborhoods: [
        'Haleʻiwa edges',
        'Waialua edges',
        'North Shore rural-residential belts',
        'Kamehameha Highway north corridors',
        'Sunset Beach edges',
        'Rural agricultural approaches',
      ],
      housingTypes: 'SFH, rural-residential, limited multi-unit, agricultural-edge stock',
      challenges: [
        'Longer empty miles to Honolulu core and limited truck staging',
        'Narrow coastal road geometry and weather-sensitive access',
        'Tourism-season congestion on Kamehameha Highway north',
      ],
      moverTips:
        'Price empty miles and same-day round trips honestly. Survey driveway width and soft-shoulder staging. Align with weather and tourism peaks. Confirm rural turnaround before dispatch.',
      cityKeywords: [
        'haleiwa',
        'waialua',
        'north shore',
      ],
    },
  ],
  costDrivers: {
    title: 'What drives Honolulu County moving costs',
    intro:
      'Condo elevators, military PCS timing, hillside stairs, H-1 / H-2 / H-3 freeflow, and inter-island or mainland ocean components move the number more than packing skill alone — this is Oʻahu / Honolulu logistics, not Big Island or whole-state defaults.',
    drivers: [
      {
        title: 'Elevator reservations, docks & building COIs',
        detail:
          'Waikīkī, Ala Moana, Kakaʻako, Downtown, Salt Lake, and mid-rise multi-unit add labor and schedule risk before packing skill matters.',
      },
      {
        title: 'HOA gates, truck-length rules & timed windows',
        detail:
          'Kapolei, Ewa, and leeward growth packets rewrite jobs that look simple on a map.',
      },
      {
        title: 'Hillside stairs, long carries & curb limits',
        detail:
          'East Honolulu, Hawaiʻi Kai, Kailua, Kaneohe, and older multi-unit stock add flight counts and driveway geometry that flat-rate optimism underprices.',
      },
      {
        title: 'H-1 · H-2 · H-3 · Kamehameha Hwy congestion',
        detail:
          'Cross-island Oʻahu pairs burn portal-to-portal hours even when map miles look short — especially Honolulu core ↔ Kapolei or windward ↔ leeward.',
      },
      {
        title: 'Military PCS waves & housing-office constraints',
        detail:
          'Concentrated order cycles fill crews, elevators, and preferred dates; installation access rules can rewrite staging plans.',
      },
      {
        title: 'Inter-island barge/air & mainland container legs',
        detail:
          'Pier cutoffs, moisture protection, air-freight premiums, and FMCSA authority for mainland destinations raise staging distance and line-item complexity beyond same-island local rates.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (simple access)',
        value: '$600–$2,400+',
        note: 'Higher with elevators, walk-ups, peak H-1 pairs, or humidity packing',
      },
      {
        label: '2–3BR condo, duplex, or mid-size SFH',
        value: '$1,800–$5,500+',
        note: 'Stairs, elevators, HOA, and multi-unit soft costs trend up',
      },
      {
        label: '3–4+ BR / HOA / cross-island corridor',
        value: '$3,500–$12,000+',
        note: 'Gated growth, hillside product, and long H-1 / H-3 pairs price highest on-island',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$130–$240+/hr',
        note: 'Portal-to-portal; packing, elevators, HOA admin, and stairs scale up',
      },
      {
        label: 'Inter-island / mainland ocean components',
        value: 'Quoted separately',
        note: 'Barge, air, container, pier, and FMCSA legs are not local hourly defaults',
      },
    ],
  },
  seasonal: {
    title: 'When to schedule a Honolulu County move',
    intro:
      'Military PCS waves, tourism-adjacent lease turns, school calendars, summer heat and humidity, and winter trade-wind rain reshape access and crew availability across the Oʻahu grid.',
    items: [
      {
        title: 'Best windows: mid-week early mornings',
        detail:
          'Tuesday–Thursday starts clear curb, ease multi-unit freight windows, and reduce H-1 / H-2 / H-3 pain. Avoid month-end Fridays when leases, elevators, and HOA slots collide.',
      },
      {
        title: 'Peak season: late May–mid-September plus PCS peaks',
        detail:
          'Family school calendars, apartment turnover, and military permanent-change-of-station waves fill first. Book 2–4+ weeks ahead for peak weekends, elevator slots, and popular Kapolei or windward dates.',
      },
      {
        title: 'Tourism and visitor-economy lease pressure',
        detail:
          'Waikīkī and urban-core multi-unit can tighten around visitor peaks and short-term rental transitions. Prefer flexible dates and written freight windows in high-tourism corridors.',
      },
      {
        title: 'Heat, humidity & trade-wind rain',
        detail:
          'Year-round humidity and summer heat reshape outdoor labor; windward and mauka rain can delay hillside and North Shore staging. Prefer early starts, covered staging plans, and moisture protection on textiles and wood.',
      },
    ],
  },
  specialized: [
    {
      id: 'oahu-condo-military-corridor',
      title: 'Oʻahu condo, military & H-1 / H-2 / H-3 logistics module',
      intro:
        'Honolulu County estimates fail more often on elevator reservations, military housing timing, hillside surveys, and freeway freeflow than on packing skill alone.',
      bullets: [
        'Book elevators, docks, and building COIs for Waikīkī, Ala Moana, Kakaʻako, Downtown, Salt Lake, and mid-rise multi-unit before the survey is final.',
        'Collect HOA packets, gate codes, and truck-length rules for Kapolei, Ewa, and leeward growth product early.',
        'Photo stair counts, driveway geometry, and curb options for East Honolulu, Hawaiʻi Kai, Kailua, Kaneohe, and older stock.',
        'Coordinate PCS orders, housing-office rules, and installation access when military-adjacent addresses apply.',
        'Price portal-to-portal time for any pair that rides H-1, H-2, H-3, or Kamehameha Highway at peak.',
        'Clarify Honolulu core, East Honolulu, Pearl City–Aiea, Kapolei–Ewa, Kailua–Kaneohe, North Shore, and unincorporated addresses on every estimate.',
        'For in-state and inter-island jobs verify Hawaii PUC Motor Carrier CPCN covering household goods for the islands served; verify FMCSA for any mainland leg.',
      ],
    },
    {
      id: 'inter-island-barge-mainland-container',
      title: 'Inter-island barge/air & mainland container logistics module',
      intro:
        'Same-island Oʻahu local rates collapse when barge, air freight, pier cutoffs, or mainland ocean containers appear — quote those components as distinct line items with schedules and authority checks.',
      bullets: [
        'Separate local Oʻahu trucking from inter-island barge or air components and from mainland container or ocean-freight legs on every written estimate.',
        'Confirm pier cutoffs, booking windows, crate/container sizing, and moisture / humidity packing standards before deposit.',
        'Price air-freight premiums only when timeline requires them — barge remains common for full households between islands when schedules allow.',
        'Verify Hawaii PUC household goods CPCN for in-state and inter-island household goods work; verify FMCSA USDOT/MC for any mainland or other out-of-state leg.',
        'Never treat a Hawaii PUC certificate alone as mainland interstate authority, and never treat a USDOT alone as Hawaii intrastate permission.',
        'State origin and destination islands explicitly — Oʻahu addresses are not Big Island, Maui, or Kauaʻi defaults.',
      ],
    },
    {
      id: 'not-big-island-not-whole-state',
      title: 'Not Big Island · not whole-state Hawaii module',
      intro:
        'A single “Hawaii rate” collapses when Oʻahu condo and H-1 logistics are confused with Hawaii County Belt Road product, Maui resort grids, or Kauaʻi North Shore constraints.',
      bullets: [
        'Do not price Waikīkī elevators like Hilo multi-unit, Kona resort edges, or Maui West Side product as interchangeable defaults.',
        'State the market as Honolulu County / Oʻahu on every estimate — disambiguate from Hawaii County (Big Island), Maui County, and Kauaʻi County.',
        'Keep military PCS calendars separate from pure civilian school and tourism peaks when both apply.',
        'Match inter-island barge windows separately from same-island H-1 freeflow quotes.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Honolulu County?',
    intro:
      'Use this as a practical fit checklist — schools, healthcare, housing character, commute realism, and island logistics — then verify on district, hospital, and military housing sites. No single ranking captures neighborhood fit. This is Oʻahu only — not the Big Island or whole-state Hawaii.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & education landscape',
        bullets: [
          {
            title: 'How districts work here',
            detail:
              'Honolulu County is served by the statewide Hawaiʻi Department of Education complex-area structure across urban Honolulu, central Oʻahu, leeward, windward, and North Shore communities. Assignment is address-based — marketing neighborhood names do not guarantee a campus.',
          },
          {
            title: 'Choice, boundaries & enrollment pressure',
            detail:
              'Popular complexes and geographic exceptions can be competitive. Confirm enrollment windows early when relocating mid-year or mid-PCS cycle.',
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
              'The Queen’s Medical Center, Kaiser Permanente Moanalua, Tripler Army Medical Center, Straub, Pali Momi, Adventist Health Castle, and other campuses anchor care across Oʻahu. Confirm insurance networks and TRICARE pathways for your household.',
          },
          {
            title: 'What relocators should do',
            detail:
              'Map peak-hour drive times to preferred campuses — H-1, H-3, and Pali freeflow change “nearby” on paper. Transfer records early, especially for military families and multi-island care histories.',
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
              'Expect Honolulu urban high-rise and mid-rise condo; East Honolulu / Hawaiʻi Kai hillside SFH; Pearl City–Aiea multi-unit and military-adjacent product; Kapolei–Ewa HOA growth; Kailua–Kaneohe character SFH and multi-unit; North Shore rural-coastal edges.',
          },
          {
            title: 'Cost variation inside the county',
            detail:
              'Purchase prices and rents vary sharply by urban core vs leeward growth vs windward character. Budget for association dues, older-building repair risk, humidity and salt-air maintenance, and competitive rental seasons near employment and military hubs.',
          },
          {
            title: 'Building and HOA governance',
            detail:
              'Associations and multi-unit management often control move hours, truck size, elevators, and deposits. Read documents carefully before locking a move date.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Which areas fit whom',
        bullets: [
          {
            title: 'Honolulu urban core / condo lifestyle',
            detail:
              'Suits people prioritizing employment density and amenities — with elevator, curb, and H-1 freeflow tradeoffs on move day.',
          },
          {
            title: 'East Honolulu / Hawaiʻi Kai hillside living',
            detail:
              'Often appeals for views and family product — with driveway geometry, long carries, and Kalanianaʻole freeflow.',
          },
          {
            title: 'Kapolei / Ewa growth belts',
            detail:
              'Fits buyers chasing newer product and leeward access — with HOA rules and longer empty miles to the urban core.',
          },
          {
            title: 'Kailua / Kaneohe windward living',
            detail:
              'Attracts households seeking windward character and beaches — with Pali / H-3 commute realism and stair or multi-unit surveys.',
          },
          {
            title: 'Military-adjacent central belts',
            detail:
              'Common for PCS households near Pearl Harbor, Schofield, or MCBH — with housing-office timing and concentrated move waves.',
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
              'Federal and military installations, state and county government, tourism and hospitality, healthcare, construction, professional services, and logistics concentrate demand across Oʻahu.',
          },
          {
            title: 'Commute realism',
            detail:
              'Peak H-1, H-2, H-3, Pali, and Kamehameha Highway freeflow is real — including reverse pairs between Kapolei growth and Honolulu core. Test peak routes before choosing solely on rent or purchase price.',
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
              'Honolulu County is Oʻahu — urban density, military presence, windward character, and leeward growth — not Big Island lava-zone or Hilo–Kona product and not a whole-state Hawaii rename.',
          },
          {
            title: 'Climate',
            detail:
              'Tropical island climate with humidity year-round, leeward heat, windward rain gradients, and trade-wind patterns. Plan outdoor staging, moisture protection, and heat contingency as part of move-in.',
          },
          {
            title: 'Culture and pace',
            detail:
              'Visit at peak and off-peak times when deciding — school calendars, PCS cycles, tourism, and corridor congestion reshape daily rhythm. Respect local access norms and building rules on move day.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Honolulu County resources',
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify Hawaii PUC household goods motor carrier certificate status for in-state and inter-island moves and FMCSA for mainland legs before deposits.',
    items: [
      {
        label: 'City and County of Honolulu',
        href: 'https://www.honolulu.gov/',
        external: true,
        note: 'County services & municipal context',
      },
      {
        label: 'Honolulu Department of Transportation Services',
        href: 'https://www.honolulu.gov/dts/',
        external: true,
        note: 'Local traffic and transportation context',
      },
      {
        label: 'GoAkamai — Oʻahu traveler information',
        href: 'https://goakamai.org/',
        external: true,
        note: 'H-1 / H-2 / H-3 / major arterials before load windows',
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
    'Prefer crews with high-rise elevator/COI fluency for Honolulu urban core; military PCS and housing-office experience for Pearl City–Aiea–central belts; HOA gate fluency for Kapolei–Ewa; hillside and stair fluency for East Honolulu and windward product; honest H-1 · H-2 · H-3 · Kamehameha Hwy timing for cross-island Oʻahu pairs; and written inter-island barge/air or mainland container components when those legs apply. Verify Hawaii PUC Motor Carrier CPCN covering household goods for intrastate and inter-island moves and FMCSA for mainland legs before deposits. This is Honolulu County on Oʻahu — not the Big Island and not the whole state of Hawaii.',
  lastReviewed: '2026-07-24',
});

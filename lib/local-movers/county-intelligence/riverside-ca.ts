import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';

/**
 * Hand-crafted Riverside County moving intelligence.
 * Used by /local-movers/california/riverside and the shared intelligence template.
 *
 * Differentiators vs LA / OC / SD: Inland Empire growth & affordability pull,
 * extreme summer heat (esp. Coachella Valley), long inter-zone distances,
 * logistics/warehouse freeway load, coastal-to-desert contrast within one county.
 */
export const riversideCountyIntelligence: CountyIntelligencePack = {
  stateSlug: 'california',
  countySlug: 'riverside',
  hubTitle: 'Riverside County Moving Intelligence Hub',
  eyebrow: 'Riverside County · Inland Empire guide',
  h1: 'Moving in Riverside County: Heat, Distance & Inland Empire Zone Guide',
  heroOpener:
    'Riverside County is California’s fourth-most populous county (~2.5 million people) and a core growth engine of the Inland Empire. Families and buyers trade coastal prices in LA and Orange County for space and value here — then discover that “local” can mean 70–100+ minutes between Corona and Palm Desert, summer afternoons that hit 100°F+, and freeways shared with Inland Empire warehouse traffic on I-15, I-10, I-215, SR-60, and SR-91. Western suburban tracts, Temecula wine-country planned communities, the Pass area, San Jacinto Valley, and true desert resort cities are different logistics problems. This guide is built for people moving in Riverside County — not recycled SoCal coastal advice.',
  heroCredibility:
    'Inland Empire & Coachella Valley–aware · Heat & distance planning · Intrastate CA (BHGS) · FMCSA when interstate · Curated county listings',
  whatMakesDifferent: {
    title: 'What makes moving in Riverside County different',
    intro:
      'These are the Inland Empire realities that change estimates, schedules, and packing — especially heat, distance, and growth corridors.',
    bullets: [
      {
        title: 'Affordability magnet = inbound volume',
        detail:
          'Relative to coastal LA and Orange County, Riverside still offers more house for the money. That drives strong inbound migration from LA/OC and out-of-state buyers seeking space. Peak spring/summer family calendars and end-of-month lease turns keep crews busy across western Riverside and the Temecula Valley — book popular Saturdays early.',
      },
      {
        title: 'Extreme summer heat is an operational constraint',
        detail:
          'Much of the county — especially the Coachella Valley and eastern desert — regularly exceeds 100°F in summer. Heat stresses crews, electronics, candles, chocolate, vinyl, and sealed packaging. Prefer 6–10 a.m. load windows in June–September, request shaded staging, and avoid mid-afternoon desert moves when possible. Good crews plan water, earlier starts, and heat-safe packing without you having to ask twice.',
      },
      {
        title: 'Distance is a line item, not a footnote',
        detail:
          'Western Riverside ↔ Coachella Valley, or Temecula ↔ Moreno Valley, can burn more drive time than many “local” coastal hops. Hourly billing follows portal-to-portal time. Ask whether the quote assumes your specific city pair and how return travel is priced on long IE hauls.',
      },
      {
        title: 'Warehouse & logistics traffic owns the freeways',
        detail:
          'Inland Empire distribution centers load I-15, I-10, I-215, and SR-60 with tractor-trailers all week. Mid-day mid-week can be slower than expected near logistics clusters. Build buffer into load/unload windows when either address is near industrial corridors.',
      },
      {
        title: 'Five climate/lifestyle zones in one county',
        detail:
          'City of Riverside older neighborhoods, Eastvale/Corona planned suburbs, Temecula Valley growth cities, the Beaumont–Banning Pass, Hemet/San Jacinto, and Palm Springs–area resort cities do not share one truck-access or HOA profile. Treat zone-to-zone moves as distinct jobs.',
      },
      {
        title: 'Growing HOA & planned-community footprint',
        detail:
          'Temecula, Murrieta, Menifee, Eastvale, and many Coachella Valley HOAs require COIs, gate lists, truck-hour rules, and floor protection. Not as universally document-heavy as Irvine — but never assume an open curb. Get HOA rules in writing for newer tracts and gated desert communities.',
      },
      {
        title: 'March Air Reserve Base & military spillover',
        detail:
          'March ARB and military families moving along the I-215 corridor can add base-adjacent timing and PCS-like calendars. If housing is on or near base property, share access rules early so the crew can stage and document wait time correctly.',
      },
      {
        title: 'California intrastate rules (BHGS)',
        detail:
          'Moves entirely within California are generally overseen by the California Bureau of Household Goods and Services (BHGS). Interstate legs (e.g. Riverside → Phoenix or out of state) need FMCSA authority. Confirm which license applies to your exact origin and destination.',
      },
    ],
  },
  zonesIntro:
    'Treat each zone as its own climate and logistics problem. Heat, elevation (the Pass), desert resort HOAs, and IE freeway distance change the job more than map miles suggest — Riverside is not interchangeable with LA, Orange, or San Diego.',
  zones: [
    {
      id: 'western-core',
      name: 'Western Riverside / Core',
      shortName: 'Western Core',
      neighborhoods: [
        'Riverside',
        'Corona',
        'Norco',
        'Eastvale',
        'Jurupa Valley',
        'Moreno Valley',
        'Perris',
      ],
      housingTypes:
        'Older city neighborhoods, tract suburbs, newer planned communities (Eastvale), multi-family near freeways, horse-property pockets (Norco)',
      challenges: [
        'SR-91 / I-15 / I-215 / SR-60 congestion and IE warehouse traffic',
        'Mix of HOA tracts and older open-street neighborhoods',
        'Cross-county spills into San Bernardino and Orange County lines',
        'Summer heat still significant inland even outside the deep desert',
      ],
      moverTips:
        'Clarify city-to-city pairs (e.g. Corona → Moreno Valley vs Riverside → Eastvale) for honest drive time. Eastvale HOAs often need COI. For Norco larger lots, confirm driveway and trailer access. Early starts beat 91/15 peak merges.',
      cityKeywords: [
        'riverside',
        'corona',
        'norco',
        'eastvale',
        'jurupa',
        'moreno valley',
        'perris',
        'rubidoux',
        'home gardens',
        'march',
      ],
    },
    {
      id: 'temecula-valley',
      name: 'Southwest / Temecula Valley',
      shortName: 'Temecula Valley',
      neighborhoods: [
        'Temecula',
        'Murrieta',
        'Menifee',
        'Wildomar',
        'Lake Elsinore',
        'Canyon Lake',
        'French Valley',
      ],
      housingTypes:
        'Master-planned SFH, wine-country estates, growing HOA tracts, hillside lots, some gated communities',
      challenges: [
        'I-15 corridor congestion (Oceanside–Corona spine)',
        'HOA move windows in newer planned communities',
        'Hillside / equestrian access on some properties',
        'Long hauls to Coachella Valley or western core',
      ],
      moverTips:
        'Temecula/Murrieta/Menifee often feel like “South County OC” HOA culture — send management rules early. Weekend wine-country traffic can slow I-15. Treat Temecula ↔ Palm Springs as a long IE haul with explicit travel assumptions.',
      cityKeywords: [
        'temecula',
        'murrieta',
        'menifee',
        'wildomar',
        'lake elsinore',
        'canyon lake',
        'french valley',
        'sun city',
        'winchester',
      ],
    },
    {
      id: 'pass-area',
      name: 'Pass Area',
      shortName: 'Pass Area',
      neighborhoods: ['Beaumont', 'Banning', 'Calimesa', 'Cherry Valley'],
      housingTypes: 'Newer tracts, suburban SFH, pass-corridor apartments, growing planned pockets',
      challenges: [
        'I-10 wind and weather variability through the Pass',
        'Elevation and temperature swings vs western basin',
        'Truck routing around construction and grade',
        'Acts as the bridge between IE west and Coachella Valley',
      ],
      moverTips:
        'Pass-area moves often connect western IE to desert cities — price distance honestly. Wind events can affect high-profile loads; flexible dates help. Confirm HOA rules in newer Beaumont tracts.',
      cityKeywords: [
        'beaumont',
        'banning',
        'calimesa',
        'cherry valley',
        'cabazon',
        'whitewater',
      ],
    },
    {
      id: 'san-jacinto-valley',
      name: 'San Jacinto Valley',
      shortName: 'San Jacinto Valley',
      neighborhoods: ['Hemet', 'San Jacinto', 'Valle Vista', 'East Hemet'],
      housingTypes: 'Suburban SFH, retirement communities, older tracts, valley-floor multi-family',
      challenges: [
        'Longer local distances to western core and desert resorts',
        'Summer heat on valley floors',
        'Fewer high-rises; more bulk volume and longer carries on large lots',
      ],
      moverTips:
        'Inventory volume can run higher than coastal condos — do a real survey. Summer starts should be early. Confirm whether Hemet/San Jacinto ↔ Corona is still billed as short-local under the mover’s card.',
      cityKeywords: [
        'hemet',
        'san jacinto',
        'valle vista',
        'east hemet',
        'winchester',
      ],
    },
    {
      id: 'coachella-valley',
      name: 'Coachella Valley / Desert Resort Cities',
      shortName: 'Coachella Valley',
      neighborhoods: [
        'Palm Springs',
        'Palm Desert',
        'Cathedral City',
        'Rancho Mirage',
        'Indian Wells',
        'La Quinta',
        'Indio',
        'Coachella',
        'Desert Hot Springs',
      ],
      housingTypes:
        'Desert moderns, golf-course HOAs, mid-century homes, resort condos, seasonal residences, gated communities',
      challenges: [
        'Extreme summer heat (often 105–115°F+)',
        'Snowbird / seasonal occupancy calendars',
        'Gated and HOA communities with truck-hour rules',
        'Long distance from western Riverside / LA / OC origins',
      ],
      moverTips:
        'Summer desert moves should start at dawn and finish before peak heat. Protect electronics and finished wood; avoid sealed hot trucks sitting in sun. Winter snowbird season fills calendars — book early. Always confirm HOA/gate rules for golf and resort communities. Budget travel time from western IE explicitly.',
      cityKeywords: [
        'palm springs',
        'palm desert',
        'cathedral city',
        'rancho mirage',
        'indian wells',
        'la quinta',
        'indio',
        'coachella',
        'desert hot springs',
        'thousand palms',
        'bermuda dunes',
      ],
    },
  ],
  costDrivers: {
    title: 'Pricing & cost drivers inside Riverside County',
    intro:
      'Two “local” moves of the same square footage can differ sharply depending on heat windows, inter-zone distance, HOA soft costs, and whether the job is western suburban vs Coachella Valley desert.',
    drivers: [
      {
        title: 'Inter-zone distance & portal-to-portal time',
        detail:
          'Corona ↔ Indio or Temecula ↔ Moreno Valley can add hours of freeway time. Hourly crews bill travel; flat “local” minimums may not fit long IE pairs — get the city pair in writing.',
      },
      {
        title: 'Heat-constrained work windows',
        detail:
          'Summer desert and inland heat compress productive hours into mornings. Jobs that slip into afternoon heat may need more labor days or premium scheduling.',
      },
      {
        title: 'HOA, gate & planned-community soft costs',
        detail:
          'COI, elevator or loading rules, and gate registration in Temecula Valley, Eastvale, and desert HOAs add soft costs and can force weekday-only windows.',
      },
      {
        title: 'Warehouse-corridor congestion',
        detail:
          'IE logistics traffic on I-15 / I-10 / I-215 / SR-60 can stall crews mid-day — realistic ETAs prevent overtime surprises.',
      },
      {
        title: 'Seasonal desert demand (snowbirds)',
        detail:
          'Fall–spring occupancy in the Coachella Valley spikes residential and seasonal moves. Summer can be quieter but operationally harder due to heat.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (same zone, simple access)',
        value: '$550–$1,400+',
        note: 'Higher with long IE travel or desert summer constraints',
      },
      {
        label: '2–3BR house / planned community',
        value: '$1,600–$3,800+',
        note: 'HOA windows and multi-freeway hauls trend up',
      },
      {
        label: '3–4+ BR (cross-zone / desert resort)',
        value: '$2,400–$6,500+',
        note: 'Western core ↔ Coachella Valley and high-value desert homes price highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$115–$185+/hr',
        note: 'Portal-to-portal; packing and 3-person crews scale up',
      },
    ],
  },
  seasonal: {
    title: 'Seasonal, heat & calendar intelligence',
    intro:
      'Riverside’s seasons are about heat, snowbirds, and family calendars — not coastal marine layers.',
    items: [
      {
        title: 'Summer heat peak: roughly June – September',
        detail:
          'Plan early-morning loads, extra water, and heat-safe packing. Mid-afternoon Coachella Valley moves are high risk for people and property. Flexible start times beat rigid noon arrivals.',
      },
      {
        title: 'Snowbird / winter desert season',
        detail:
          'Many Coachella Valley residents arrive fall through spring. Seasonal home opens/closes and furniture installs concentrate demand — book desert winter moves early.',
      },
      {
        title: 'Spring–summer family & school calendars',
        detail:
          'Western Riverside and Temecula Valley see classic end-of-school and end-of-month volume. Saturdays in May–August book first.',
      },
      {
        title: 'Festival & event spillover (desert)',
        detail:
          'Major Coachella Valley events and holiday weekends can clog I-10 and local resort roads. If either address is event-adjacent, confirm dates and staging alternatives.',
      },
      {
        title: 'Best value: mid-month Tue–Thu, non-peak heat windows',
        detail:
          'Still start early inland. Avoid last Friday/Saturday of the month when leases and family moves collide.',
      },
    ],
  },
  resources: {
    title: 'Practical Riverside County resources',
    intro:
      'Official links and licensing notes — HOA, city, and heat-safety practices change; verify before move day.',
    items: [
      {
        label: 'City of Riverside — public works / parking context',
        href: 'https://www.riversideca.gov/',
        note: 'City services and local notices',
        external: true,
      },
      {
        label: 'City of Temecula',
        href: 'https://temeculaca.gov/',
        external: true,
      },
      {
        label: 'City of Palm Springs',
        href: 'https://www.palmspringsca.gov/',
        note: 'Desert resort city services',
        external: true,
      },
      {
        label: 'Riverside County — official site',
        href: 'https://www.rivco.org/',
        external: true,
      },
      {
        label: 'NWS heat safety (summer operations)',
        href: 'https://www.weather.gov/safety/heat',
        note: 'Plan early loads when heat risk is elevated',
        external: true,
      },
      {
        label: 'March Air Reserve Base',
        href: 'https://www.march.afrc.af.mil/',
        note: 'Confirm access if destination is base-adjacent',
        external: true,
      },
      {
        label: 'CA BHGS — household movers (intrastate)',
        href: 'https://bhgs.dca.ca.gov/',
        note: 'California Bureau of Household Goods and Services',
        external: true,
      },
      {
        label: 'FMCSA SAFER — interstate authority',
        href: 'https://safer.fmcsa.dot.gov/',
        note: 'Required when the move crosses state lines',
        external: true,
      },
      {
        label: 'Southern California Edison (SCE)',
        href: 'https://www.sce.com/',
        note: 'Electric utility for much of the county',
        external: true,
      },
      {
        label: 'IID — Imperial Irrigation District (parts of Coachella Valley)',
        href: 'https://www.iid.com/',
        note: 'Power/water for some desert communities',
        external: true,
      },
      {
        label: 'Move Trust Hub — verify a USDOT',
        href: '/verify-dot',
        note: 'Cross-check interstate licensing before deposits',
      },
      {
        label: 'Free moving calculator',
        href: '/moving-calculator',
        note: 'Inventory-based volume for local or long-distance',
      },
    ],
  },
  directoryHint:
    'Filter listings by zone (Western Core, Temecula Valley, Pass, San Jacinto Valley, Coachella Valley) when available. Confirm heat-window plans and city-to-city drive assumptions — especially for desert or cross-IE moves.',
  lastReviewed: '2026-07-22',
};

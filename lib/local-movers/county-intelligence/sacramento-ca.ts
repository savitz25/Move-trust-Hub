import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';

/**
 * Hand-crafted Sacramento County moving intelligence.
 * Used by /local-movers/california/sacramento and the shared intelligence template.
 *
 * Differentiators vs Bay Area / generic Central Valley: state capital workforce,
 * Bay Area inbound affordability pull, extreme summer heat, Midtown grid vs
 * master-planned suburbs (Elk Grove, Natomas, Folsom), I-5/I-80/US-50/SR-99 timing.
 */
export const sacramentoCountyIntelligence: CountyIntelligencePack = {
  stateSlug: 'california',
  countySlug: 'sacramento',
  hubTitle: 'Sacramento County Moving Intelligence Hub',
  eyebrow: 'Sacramento County · Capital region guide',
  h1: 'Moving in Sacramento County: Capital Region, Heat & Zone-by-Zone Guide',
  heroOpener:
    'Sacramento County is California’s capital region (~1.62 million residents) with a steady drumbeat of government, legislative, and agency workforce moves — plus strong inbound migration from the Bay Area seeking more house for the money. Midtown Victorians and multi-unit buildings sit a short freeway hop from master-planned Elk Grove, Natomas, and Folsom tracts with HOA packets and gate lists. Summers regularly hit 95–105°F+, so early load windows are operational reality, not preference. I-5, I-80, US-50, SR-99, and Business 80 turn cross-town “locals” into billable time. This guide is for people moving in Sacramento County — not generic Central Valley filler or Bay Area scripts with the city name swapped.',
  heroCredibility:
    'State capital workforce · Bay Area inbound · Heat-aware scheduling · Intrastate CA (BHGS) · FMCSA when interstate · Curated listings',
  whatMakesDifferent: {
    title: 'What makes moving in Sacramento County different',
    intro:
      'These are the capital-region realities that change estimates and schedules — government calendars, heat, and urban-core vs suburban contrast.',
    bullets: [
      {
        title: 'State capital workforce drives steady relocation',
        detail:
          'Agencies, the legislature, courts, and related contractors create year-round housing turnover. Start dates, session calendars, and agency transfers often force mid-month mid-week moves. Share hard dates early so crews can plan around downtown parking and Capitol-area congestion.',
      },
      {
        title: 'Bay Area affordability magnet',
        detail:
          'Relative to San Francisco and the East Bay, Sacramento still offers more space per dollar. Inbound transplants from SF, Oakland, and the Peninsula fill suburban inventory — especially Elk Grove, Natomas, Folsom, and Rancho Cordova. Peak spring/summer and end-of-month windows book first.',
      },
      {
        title: 'Extreme Central Valley summer heat',
        detail:
          'June–September afternoons frequently reach 95–105°F+. Heat stresses crews, electronics, and sealed packaging. Prefer 6–10 a.m. starts in peak summer, request shaded staging, and avoid mid-afternoon loads when possible. Good crews plan water and heat-safe packing without you having to ask twice.',
      },
      {
        title: 'Urban grid vs master-planned suburbs',
        detail:
          'Downtown/Midtown multi-unit and older SFH jobs are about parking, elevators, and tight streets. Elk Grove, Natomas, Folsom, and similar communities are about HOA COIs, truck-hour rules, and cul-de-sac access. Do not price them the same.',
      },
      {
        title: 'HOA paperwork is common in growth suburbs',
        detail:
          'Newer tracts and gated sections often require Certificates of Insurance, approved hours, floor protection, and sometimes vendor gate lists. Treat the HOA packet as part of the survey — especially Elk Grove, Natomas, Folsom, and parts of Rancho Cordova.',
      },
      {
        title: 'Freeway timing is a line item',
        detail:
          'I-5, I-80, US-50, SR-99, and Business 80 control billable hours. Midtown ↔ Elk Grove, Natomas ↔ Folsom, or Arden ↔ South County can double travel time in 7–9 a.m. and 3–6:30 p.m. peaks. Ask whether quotes are portal-to-portal.',
      },
      {
        title: 'River-adjacent & older core access quirks',
        detail:
          'Some river-adjacent and lower-lying neighborhoods have limited staging, flood-season awareness, or constrained approach streets. Older grid blocks may need temporary no-parking for a full-size truck — confirm who arranges it.',
      },
      {
        title: 'California intrastate rules (BHGS)',
        detail:
          'Moves entirely within California are generally overseen by the California Bureau of Household Goods and Services (BHGS). Interstate legs (e.g. Sacramento → Reno or out of state) need FMCSA authority. Confirm which license applies to your exact origin and destination.',
      },
    ],
  },
  zonesIntro:
    'Treat each zone as its own access and climate problem. Midtown elevators, Natomas planned communities, Elk Grove HOAs, and Folsom/East County distance are not interchangeable — capital-region geography defines the job more than generic Valley advice.',
  zones: [
    {
      id: 'downtown-midtown',
      name: 'Downtown / Midtown / Urban Core',
      shortName: 'Downtown / Midtown',
      neighborhoods: [
        'Downtown Sacramento',
        'Midtown',
        'Capitol area',
        'Alkali Flat',
        'Boulevard Park',
        'Land Park edge',
        'Richmond Grove',
      ],
      housingTypes:
        'Multi-unit buildings, condos, Victorians, denser SFH, some high-rises and loft conversions',
      challenges: [
        'Elevator COI and reserved move windows',
        'Limited curb staging and event/legislative traffic',
        'Street parking and permit-sensitive blocks',
        'Business 80 / I-5 / US-50 approaches into the core',
      ],
      moverTips:
        'Send building rules + COI with the estimate. Confirm elevator/dock reservations the day before. Avoid major Capitol-area event windows when possible. Weekday mornings are usually the cleanest staging times.',
      cityKeywords: [
        'downtown sacramento',
        'midtown',
        'capitol',
        'alkali',
        'boulevard park',
        'land park',
        'richmond grove',
        'midtown sacramento',
      ],
    },
    {
      id: 'natomas',
      name: 'Natomas & North Sacramento',
      shortName: 'Natomas / North Sac',
      neighborhoods: [
        'North Natomas',
        'South Natomas',
        'North Sacramento',
        'Gardenland',
        'Robla',
        'Airport-adjacent areas',
      ],
      housingTypes:
        'Newer master-planned tracts, townhomes, multi-family, some older North Sac SFH',
      challenges: [
        'HOA COI and gate rules in planned communities',
        'I-5 / I-80 congestion toward downtown and the airport',
        'Summer heat on open suburban streets',
        'Growing inventory volume in newer builds',
      ],
      moverTips:
        'Collect HOA move packets early for North Natomas villages. Early summer starts beat heat. Clarify Natomas ↔ Midtown or Natomas ↔ Elk Grove drive-time assumptions — peak I-5 can surprise.',
      cityKeywords: [
        'natomas',
        'north sacramento',
        'gardenland',
        'robla',
        'south natomas',
        'north natomas',
      ],
    },
    {
      id: 'arden-east',
      name: 'Arden-Arcade, Carmichael & East Sacramento',
      shortName: 'Arden / East Sac',
      neighborhoods: [
        'Arden-Arcade',
        'Carmichael',
        'East Sacramento',
        'River Park',
        'Campus Commons',
        'Fair Oaks edge',
      ],
      housingTypes:
        'Mid-century SFH, tree-lined neighborhoods, multi-family, some higher-value East Sac homes',
      challenges: [
        'US-50 / Business 80 / Howe–Watt arterial congestion',
        'Mature trees and tighter residential streets',
        'Mix of open-street and light HOA presence',
        'Cross-town travel to Elk Grove or Folsom at peak',
      ],
      moverTips:
        'Inventory carefully — mid-century homes hide volume. Share parking constraints on narrow blocks. East Sac ↔ Folsom or Arden ↔ Natomas pairs need honest portal-to-portal time.',
      cityKeywords: [
        'arden',
        'carmichael',
        'east sacramento',
        'river park',
        'campus commons',
        'fair oaks',
        'arden-arcade',
      ],
    },
    {
      id: 'elk-grove-south',
      name: 'Elk Grove & South County',
      shortName: 'Elk Grove / South',
      neighborhoods: [
        'Elk Grove',
        'Laguna',
        'Sheldon',
        'Wilton edge',
        'South Sacramento fringe',
      ],
      housingTypes:
        'Large master-planned communities, newer SFH, townhomes, strong HOA governance',
      challenges: [
        'Near-universal HOA packets in many villages',
        'SR-99 / I-5 congestion toward the core',
        'Cul-de-sac and truck-hour restrictions',
        'High family-move volume on summer weekends',
      ],
      moverTips:
        'Elk Grove is HOA-first: COI, approved hours, and floor protection are routine. Prefer mid-week mornings. Treat Elk Grove ↔ Midtown as a true cross-town haul with peak 99/5 traffic built in.',
      cityKeywords: [
        'elk grove',
        'laguna',
        'sheldon',
        'wilton',
        'south sacramento',
        'laguna west',
      ],
    },
    {
      id: 'folsom-east',
      name: 'Folsom, Rancho Cordova & East County',
      shortName: 'Folsom / East',
      neighborhoods: [
        'Folsom',
        'Rancho Cordova',
        'Gold River',
        'Mather',
        'Aerojet corridor',
        'El Dorado Hills edge (access)',
      ],
      housingTypes:
        'Suburban SFH, planned communities, multi-family near US-50, some hillside / lake-adjacent properties',
      challenges: [
        'US-50 corridor congestion (especially toward the foothills)',
        'HOA and gate rules in many Folsom communities',
        'Longer locals to Natomas or Elk Grove',
        'Tech/office corridor timing near Rancho Cordova',
      ],
      moverTips:
        'Confirm HOA/gate procedures in Folsom villages. Share approach photos for steeper lots. Folsom ↔ downtown or Folsom ↔ Elk Grove needs explicit drive-time assumptions on US-50.',
      cityKeywords: [
        'folsom',
        'rancho cordova',
        'gold river',
        'mather',
        'aerojet',
        'east county',
      ],
    },
    {
      id: 'citrus-ne',
      name: 'Citrus Heights & Northeast',
      shortName: 'Citrus Heights / NE',
      neighborhoods: [
        'Citrus Heights',
        'Antelope',
        'North Highlands',
        'Foothill Farms',
        'Orangevale edge',
      ],
      housingTypes:
        'Suburban SFH, multi-family, mid-century tracts, some newer infill',
      challenges: [
        'I-80 congestion toward Roseville/Placer and downtown',
        'Cross-county spill into Placer County job centers',
        'Mixed HOA and open-street neighborhoods',
        'Peak commute windows on major arterials',
      ],
      moverTips:
        'Clarify whether the destination is still Sacramento County or over the Placer line. I-80 peaks matter for Citrus Heights ↔ Midtown pairs. Mid-month mid-week remains the best rate window.',
      cityKeywords: [
        'citrus heights',
        'antelope',
        'north highlands',
        'foothill farms',
        'orangevale',
      ],
    },
  ],
  costDrivers: {
    title: 'Pricing & cost drivers inside Sacramento County',
    intro:
      'Two “local” moves of the same square footage can differ depending on heat windows, HOA soft costs, and whether the pair is Midtown multi-unit or a long suburban haul on I-5 / US-50 / SR-99.',
    drivers: [
      {
        title: 'Heat-constrained work windows',
        detail:
          'Summer heat compresses productive hours into mornings. Jobs that slip into peak afternoon heat may need more labor days or premium scheduling.',
      },
      {
        title: 'HOA & planned-community soft costs',
        detail:
          'COI, approved hours, and gate lists in Elk Grove, Natomas, and Folsom add soft costs and can force weekday-only moves.',
      },
      {
        title: 'Urban multi-unit elevators',
        detail:
          'Downtown/Midtown elevators and reserved windows add deposits, paperwork, and schedule rigidity before labor starts.',
      },
      {
        title: 'Cross-town freeway time',
        detail:
          'Natomas ↔ Elk Grove or Midtown ↔ Folsom can burn significant portal-to-portal time at peak. Hourly billing follows the clock.',
      },
      {
        title: 'Government & Bay Area inbound calendars',
        detail:
          'Agency start dates and coastal transplants concentrate demand in spring/summer and end-of-month windows — book popular Saturdays early.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (same zone, simple access)',
        value: '$550–$1,400+',
        note: 'Higher with elevators or peak summer heat windows',
      },
      {
        label: '2–3BR house / planned community',
        value: '$1,600–$3,800+',
        note: 'HOA soft costs and multi-freeway hauls trend up',
      },
      {
        label: '3–4+ BR (cross-zone / high volume)',
        value: '$2,400–$6,000+',
        note: 'Suburb-to-core and multi-freeway pairs price highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$115–$175+/hr',
        note: 'Portal-to-portal; packing and 3-person crews scale up',
      },
    ],
  },
  seasonal: {
    title: 'Seasonal, capital-calendar & heat intelligence',
    intro:
      'Sacramento peaks follow heat, school calendars, government hiring, and Bay Area outbound waves — not coastal marine layers.',
    items: [
      {
        title: 'Summer heat peak: roughly June – September',
        detail:
          'Plan early-morning loads, extra water, and heat-safe packing. Mid-afternoon suburban moves in peak heat are high risk for people and property.',
      },
      {
        title: 'Government & legislative timing',
        detail:
          'Agency starts and session-related housing changes can cluster mid-week moves near the core. Hard dates beat flexible ones for crew availability — share them early.',
      },
      {
        title: 'Bay Area inbound spring–summer wave',
        detail:
          'Coastal transplants often time moves around school calendars. Suburban inventory in Elk Grove, Natomas, and Folsom books early for May–August Saturdays.',
      },
      {
        title: 'End-of-month lease collisions',
        detail:
          'Last Friday/Saturday of the month fills elevators and HOA calendars. Mid-month mid-week remains the best value.',
      },
      {
        title: 'Best value: mid-month Tue–Thu, early start',
        detail:
          'Still plan around HOA weekday windows. Early starts win even in shoulder seasons when freeways are the real constraint.',
      },
    ],
  },
  resources: {
    title: 'Practical Sacramento County resources',
    intro:
      'Official links and licensing notes — HOA, parking, and heat-safety practices change; verify before move day.',
    items: [
      {
        label: 'City of Sacramento',
        href: 'https://www.cityofsacramento.gov/',
        note: 'City services; building HOA rules are separate',
        external: true,
      },
      {
        label: 'City of Elk Grove',
        href: 'https://www.elkgrovecity.org/',
        external: true,
      },
      {
        label: 'City of Folsom',
        href: 'https://www.folsom.ca.us/',
        external: true,
      },
      {
        label: 'City of Citrus Heights',
        href: 'https://www.citrusheights.net/',
        external: true,
      },
      {
        label: 'City of Rancho Cordova',
        href: 'https://www.cityofranchocordova.org/',
        external: true,
      },
      {
        label: 'Sacramento County — official site',
        href: 'https://www.saccounty.gov/',
        external: true,
      },
      {
        label: 'Caltrans District 3 — road conditions',
        href: 'https://dot.ca.gov/caltrans-near-me/district-3',
        note: 'I-5 / I-80 / US-50 corridor awareness',
        external: true,
      },
      {
        label: 'NWS heat safety',
        href: 'https://www.weather.gov/safety/heat',
        note: 'Plan early loads when heat risk is elevated',
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
        label: 'SMUD — electric service (much of the region)',
        href: 'https://www.smud.org/',
        external: true,
      },
      {
        label: 'PG&E — gas / some electric areas',
        href: 'https://www.pge.com/',
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
    'Filter listings by zone (Downtown/Midtown, Natomas, Arden/East Sac, Elk Grove/South, Folsom/East, Citrus Heights/NE) when available. Confirm HOA/COI rules and heat-window plans — especially for planned suburbs and multi-unit core buildings.',
  lastReviewed: '2026-07-22',
};

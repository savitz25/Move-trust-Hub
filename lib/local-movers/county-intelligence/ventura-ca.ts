import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';

/**
 * Hand-crafted Ventura County moving intelligence.
 * Used by /local-movers/california/ventura and the shared intelligence template.
 *
 * Differentiators vs LA / SB / OC: coastal towns + Oxnard/Ventura ag corridor,
 * US-101 to LA, fire/wind seasons, Conejo vs coast vs Santa Clara Valley split.
 */
export const venturaCountyIntelligence: CountyIntelligencePack = {
  stateSlug: 'california',
  countySlug: 'ventura',
  hubTitle: 'Ventura County Moving Intelligence Hub',
  eyebrow: 'Ventura County · Coastal & 101 corridor guide',
  h1: 'Moving in Ventura County: Coast, Ag Corridor, 101 to LA & Zone Guide',
  heroOpener:
    'Ventura County sits where Southern California coast, agricultural plain, and Los Angeles commute culture collide. Oxnard and Ventura carry port-adjacent and ag-corridor traffic; Camarillo and the Conejo (Thousand Oaks, Newbury Park, Westlake edges) feel HOA planned-community rules; Ojai and mountain-adjacent pockets bring canyon access and fire-season reality. US-101 is the spine that turns “local” into a long haul toward LA County, while Santa Ana winds and red-flag days can cancel outdoor packing plans overnight. This guide is for people moving in Ventura County — not generic SoCal tips recycled from LA or Orange County.',
  heroCredibility:
    'Coastal + ag corridor · 101 / LA timing · Fire & wind awareness · Intrastate CA (BHGS) · FMCSA when interstate · Curated listings',
  collapsibleDeepContent: true,
  sectionOrder: [
    'whatMakesDifferent',
    'zones',
    'costDrivers',
    'seasonal',
    'specialized',
    'relocation',
    'resources',
  ],
  whatMakesDifferent: {
    title: 'What makes moving in Ventura County different',
    intro:
      'These are the local realities that change estimates — coast vs inland valleys, 101 commute distance, ag traffic, and fire/wind seasons.',
    bullets: [
      {
        title: 'Coastal towns and ag plain are different logistics products',
        detail:
          'A Ventura beach condo, an Oxnard multi-family near farmland, and a Camarillo HOA tract share a county name but not truck access, weather, or drive-time assumptions. Get origin and destination cities into the estimate — “Ventura County local” is too vague.',
      },
      {
        title: 'US-101 is a line item, not background noise',
        detail:
          'The 101 spine links Ventura, Oxnard, Camarillo, Thousand Oaks, and the LA County line. Thousand Oaks ↔ Oxnard or Ventura ↔ West LA can burn hours at peak. Hourly crews feel every delay — ask how portal-to-portal time is priced and whether cross-zone pairs are still “local” on the rate card.',
      },
      {
        title: 'Ag, port & industrial corridor traffic (Oxnard plain)',
        detail:
          'Oxnard, Port Hueneme, and surrounding agricultural routes mix farm equipment, commercial trucks, and residential moves. Mid-day mid-week can stall “short” locals near industrial and field corridors. Build buffer when either address sits near the plain’s freight patterns.',
      },
      {
        title: 'HOAs dominate much of the Conejo and Camarillo stock',
        detail:
          'Thousand Oaks, Newbury Park, Westlake Village edges, and many Camarillo communities require Certificates of Insurance, approved hours, gate lists, and floor protection. Treat the HOA packet as part of the survey.',
      },
      {
        title: 'Fire, wind & red-flag seasons change the job',
        detail:
          'Santa Ana / sundowner wind events and red-flag warnings affect hillside and canyon moves (Ojai, upper Ojai, parts of the Conejo and Santa Monica Mountains edge). Crews may delay outdoor packing, secure tarps, or reschedule when winds make ladder and pad work unsafe. Ask about weather contingency policy before peak wind season.',
      },
      {
        title: 'Coastal salt air vs inland heat',
        detail:
          'Ventura and Oxnard coastal blocks bring salt air and damp mornings; inland Camarillo and Conejo summer afternoons run hotter. Packing and floor protection should match the microclimate — say so on the survey if either address is beach-adjacent or inland valley.',
      },
      {
        title: 'California intrastate rules (BHGS) + FMCSA when interstate',
        detail:
          'Moves entirely within California are generally overseen by the California Bureau of Household Goods and Services (BHGS). Interstate legs (e.g. Ventura → out-of-state) need FMCSA authority. Confirm which license applies to your exact origin and destination before deposit.',
      },
    ],
  },
  zonesIntro:
    'Treat each zone as its own access and traffic problem. Coastal condos, Oxnard plain freight, Conejo HOAs, and Ojai canyons are not interchangeable — and 101 distance to LA rewrites “local.”',
  zones: [
    {
      id: 'ventura-coast',
      name: 'Ventura Coast & Harbor Area',
      shortName: 'Ventura Coast',
      neighborhoods: [
        'Downtown Ventura',
        'Midtown Ventura',
        'Pierpont',
        'Harbor area',
        'East Ventura',
        'Ventura Avenue corridor',
      ],
      housingTypes:
        'Beach cottages, coastal condos, mid-century SFH, downtown multi-unit, hillside edges',
      challenges: [
        'Limited truck staging on beach-adjacent blocks',
        'Condo COI and elevator windows near the waterfront',
        '101 congestion through Ventura at peak',
        'Salt air packing and damp mornings',
      ],
      moverTips:
        'Expect shuttle or long-carry on some Pierpont and harbor-adjacent streets. Send condo rules early. Prefer mid-week mornings; protect metal and floors against salt air and sand.',
      cityKeywords: [
        'ventura',
        'pierpont',
        'ventura harbor',
        'midtown ventura',
        'downtown ventura',
        'ventura avenue',
      ],
    },
    {
      id: 'oxnard-port',
      name: 'Oxnard, Port Hueneme & Channel Islands Area',
      shortName: 'Oxnard / Port',
      neighborhoods: [
        'Oxnard',
        'Port Hueneme',
        'Channel Islands',
        'Mandalay Bay area',
        'El Rio',
        'Nyeland Acres edge',
      ],
      housingTypes:
        'Suburban SFH, multi-family, coastal condos, ag-adjacent housing, naval base-adjacent stock near Port Hueneme',
      challenges: [
        'Ag and commercial truck traffic on the plain',
        'Port and industrial corridor timing',
        'Base-adjacent access rules near Naval Base Ventura County / Port Hueneme when applicable',
        'Beach and harbor condo COI windows',
      ],
      moverTips:
        'Share if either address is near port, industrial, or base gates. Avoid mid-day freight peaks when flexible. Coastal condo jobs need the same COI discipline as any SoCal tower — get rules in writing.',
      cityKeywords: [
        'oxnard',
        'port hueneme',
        'channel islands',
        'mandalay bay',
        'el rio',
        'hueneme',
        'naval base ventura',
      ],
    },
    {
      id: 'camarillo-plain',
      name: 'Camarillo & Central Plain',
      shortName: 'Camarillo',
      neighborhoods: [
        'Camarillo',
        'Mission Oaks',
        'Spanish Hills edge',
        'Somis edge',
        'Camarillo Springs',
      ],
      housingTypes:
        'Planned-community SFH, HOA tracts, hillside edges, some multi-family and senior communities',
      challenges: [
        'HOA COI and gate lists',
        '101 interchange congestion',
        'Summer inland heat vs cooler coast the same day',
        'Longer hauls to Ojai or LA County line',
      ],
      moverTips:
        'Collect HOA packets before move day. Early starts win in summer heat. Treat Camarillo ↔ Thousand Oaks or Camarillo ↔ Ventura as timed freeway jobs, not map-mile locals.',
      cityKeywords: [
        'camarillo',
        'mission oaks',
        'somis',
        'camarillo springs',
        'spanish hills',
      ],
    },
    {
      id: 'conejo',
      name: 'Conejo Valley — Thousand Oaks, Newbury Park, Westlake Edge',
      shortName: 'Conejo',
      neighborhoods: [
        'Thousand Oaks',
        'Newbury Park',
        'Westlake Village edge',
        'North Ranch',
        'Dos Vientos',
        'Lynn Ranch',
      ],
      housingTypes:
        'Master-planned HOA communities, hillside SFH, condo/townhome clusters, larger-lot pockets',
      challenges: [
        'HOA move windows and COI requirements',
        'Hillside and cul-de-sac truck limits',
        '101 peak delays toward LA and toward Ventura/Oxnard',
        'Wildfire-adjacent canyon edges — seasonal access awareness',
      ],
      moverTips:
        'Thousand Oaks HOAs often restrict move hours — confirm in writing. Share driveway photos for hillside North Ranch / canyon-edge homes. Budget 101 time honestly for LA-bound pairs.',
      cityKeywords: [
        'thousand oaks',
        'newbury park',
        'westlake village',
        'westlake',
        'dos vientos',
        'north ranch',
        'conejo',
        'lynn ranch',
      ],
    },
    {
      id: 'ojai-valley',
      name: 'Ojai Valley & Mountain-Adjacent',
      shortName: 'Ojai',
      neighborhoods: [
        'Ojai',
        'Meiners Oaks',
        'Mira Monte',
        'Oak View',
        'Upper Ojai edge',
        'Casitas Springs edge',
      ],
      housingTypes:
        'Valley SFH, canyon and hillside homes, rural-edge lots, limited multi-unit downtown',
      challenges: [
        'Canyon roads, limited turnaround, low branches',
        'Fire-season and red-flag operational risk',
        'Longer deadhead from bay-side or Conejo crews',
        'Wind events that pause outdoor packing',
      ],
      moverTips:
        'Treat Ojai as access-first: photos of driveways and road width matter. Discuss weather contingency during wind and fire season. Ojai ↔ Oxnard or Ojai ↔ Thousand Oaks is a long local with mountain-road time.',
      cityKeywords: [
        'ojai',
        'meiners oaks',
        'mira monte',
        'oak view',
        'upper ojai',
        'casitas springs',
      ],
    },
    {
      id: 'simi-moorpark',
      name: 'Simi Valley & Moorpark',
      shortName: 'Simi / Moorpark',
      neighborhoods: [
        'Simi Valley',
        'Moorpark',
        'Santa Rosa Valley edge',
        'East Simi',
        'West Simi',
      ],
      housingTypes:
        'Suburban SFH, HOA tracts, hillside communities, some multi-family and ranch-edge lots',
      challenges: [
        '118 / 23 / 101 connection timing toward LA and Conejo',
        'HOA rules in many tracts',
        'Hillside access in parts of Simi',
        'Summer heat inland vs coast',
      ],
      moverTips:
        'Simi ↔ LA County or Simi ↔ Ventura coast needs honest freeway ETAs. Collect HOA COI early. Summer inland moves should start early to protect crews and electronics.',
      cityKeywords: [
        'simi valley',
        'simi',
        'moorpark',
        'santa rosa valley',
        'east simi',
      ],
    },
  ],
  costDrivers: {
    title: 'Pricing & cost drivers inside Ventura County',
    intro:
      'Two “local” moves of the same square footage can differ sharply depending on HOA soft costs, coast vs inland access, and whether the pair rides 101 toward LA or stays inside one valley.',
    drivers: [
      {
        title: 'US-101 / 118 cross-zone time',
        detail:
          'Conejo ↔ Oxnard, Simi ↔ Ventura coast, or any LA County spillover can burn 45–90+ minutes each way at peak. Hourly billing follows the clock.',
      },
      {
        title: 'HOA soft costs (Conejo, Camarillo, planned communities)',
        detail:
          'COI processing, approved hours, and gate lists add soft costs and can force weekday-only windows before labor starts.',
      },
      {
        title: 'Coastal staging & shuttles',
        detail:
          'Beach-adjacent Ventura and Oxnard blocks may need smaller trucks or long carries. Ask for shuttle fees in writing.',
      },
      {
        title: 'Canyon / Ojai access',
        detail:
          'Limited turnaround and long carries on canyon lots add labor hours fast — access photos prevent underquotes.',
      },
      {
        title: 'Fire / wind contingency risk',
        detail:
          'Red-flag and high-wind days can force reschedules. Clarify cancellation and weather policies before peak wind and fire season.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (same zone, simple access)',
        value: '$550–$1,500+',
        note: 'Higher with elevators, beach shuttle, or HOA windows',
      },
      {
        label: '2–3BR house / planned community',
        value: '$1,600–$4,200+',
        note: 'HOA soft costs and multi-freeway hauls trend up',
      },
      {
        label: '3–4+ BR (cross-zone / hills / LA corridor)',
        value: '$2,500–$7,000+',
        note: '101 pairs and Ojai canyon access price highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$120–$195+/hr',
        note: 'Portal-to-portal; packing and 3-person crews scale up',
      },
    ],
  },
  seasonal: {
    title: 'Seasonal, fire-wind & calendar intelligence',
    intro:
      'Ventura weather is often mild on the coast — school calendars, 101 peaks, and fire/wind seasons set the real operational risk.',
    items: [
      {
        title: 'Peak residential: late spring – early fall weekends',
        detail:
          'School calendars and end-of-month leases fill Saturdays across Conejo, Camarillo, and coastal cities. Book 2–4 weeks ahead for popular windows.',
      },
      {
        title: 'Fire season & red-flag windows (typically late summer – fall, variable)',
        detail:
          'Wildfire risk and red-flag warnings can restrict hillside work and outdoor packing. Build schedule flexibility for Ojai, canyon-edge Conejo, and mountain-adjacent addresses.',
      },
      {
        title: 'Santa Ana / sundowner wind events',
        detail:
          'High winds make ladder work, pad wrapping, and open-truck packing unsafe. Ask movers how they handle wind delays — especially inland and canyon jobs.',
      },
      {
        title: 'Summer inland heat (Camarillo, Simi, Conejo interiors)',
        detail:
          'Coast stays cooler; inland valleys heat up. Early starts protect crews and electronics even when Ventura beach weather looks mild.',
      },
      {
        title: 'Best value: mid-month Tue–Thu mornings',
        detail:
          'Still plan around HOA weekday windows. Avoid last Friday/Saturday of the month when leases collide — and check wind/fire forecasts in season.',
      },
    ],
  },
  specialized: [
    {
      id: 'coastal-la-corridor',
      title: 'Coastal towns & US-101 / LA corridor logistics',
      intro:
        'Ventura County’s defining move problem is often distance-on-101 — coast and plain origins paired with Conejo or LA County destinations.',
      bullets: [
        'Price portal-to-portal time honestly for any pair that rides 101 between Ventura/Oxnard and the Conejo or LA County line.',
        'Prefer mid-morning starts that miss the worst commute peaks when HOA windows allow.',
        'Coastal condo jobs need COI, elevator reservations, and sand/salt packing discipline — same as other SoCal beach markets.',
        'Oxnard plain addresses should note ag/industrial adjacency so crews build freight-traffic buffer.',
        'If the destination is in LA County, confirm whether the mover’s “local” rate card still applies or if a long-local / distance schedule is used.',
      ],
    },
    {
      id: 'fire-wind-canyon',
      title: 'Fire season, wind & canyon access module',
      intro:
        'Ojai Valley and hillside Conejo edges need weather contingency and truck-access plans that flat coastal jobs may not.',
      bullets: [
        'Share driveway, road-width, and turnaround photos for canyon and hillside homes before booking.',
        'Ask about red-flag and high-wind reschedule policies in writing.',
        'Secure outdoor packing plans — tarps, wind limits, and when crews will pause work.',
        'During active fire incidents, expect road closures and smoke delays; flexibility beats rigid Saturday-only plans.',
        'Defensible-space landscaping and narrow canyon approaches can limit truck length — measure before the truck is dispatched.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Ventura County?',
    intro:
      'Coast lifestyle, ag-plain practicality, Conejo planned communities, and Ojai’s valley character are different bets — pick the pocket first, then validate schools, healthcare, and commute tolerance on 101.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & education',
        intro:
          'Ventura County uses multiple districts (e.g., Ventura Unified, Oxnard elementary/high systems, Camarillo-area Pleasant Valley, Conejo Valley Unified, Simi Valley Unified, Ojai Unified, and others). Match every listing address to the correct district.',
        bullets: [
          {
            title: 'Town-first district check',
            detail:
              'Use official district boundary tools and the California School Dashboard. Marketing city names and unincorporated pockets can span feeders.',
          },
          {
            title: 'Coast vs Conejo vs Ojai',
            detail:
              'Enrollment pressures, program offerings, and bus patterns differ by valley — do not treat county averages as neighborhood truth.',
          },
          {
            title: 'Research tools',
            detail:
              'District sites and state dashboard data should lead; third-party rankings are secondary signals only.',
          },
          {
            title: 'Higher education presence',
            detail:
              'CSU Channel Islands and community colleges shape local rental demand and traffic near campus-adjacent areas — useful for student and staff households.',
          },
        ],
      },
      {
        id: 'hospitals',
        title: 'Hospitals & healthcare',
        bullets: [
          {
            title: 'County acute-care anchors',
            detail:
              'Community Memorial (Ventura), St. John’s / Dignity facilities in Oxnard, Los Robles (Thousand Oaks area), and other regional campuses serve different pockets — map ER drive times at rush hour from your target neighborhood.',
          },
          {
            title: 'Specialty care spillover',
            detail:
              'Some residents travel into LA County systems for specialty care. Confirm insurer networks and realistic appointment drive times on 101.',
          },
          {
            title: 'Relocator tip',
            detail:
              'Transfer pediatric and specialty care early if mid-treatment; book first appointments before peak summer move chaos.',
          },
        ],
      },
      {
        id: 'housing',
        title: 'Housing & cost of living',
        bullets: [
          {
            title: 'Price ladder by pocket',
            detail:
              'Coastal Ventura, Conejo planned communities, and Ojai often price differently from denser Oxnard multi-family or inland Simi stock. Compare total monthly costs, not sticker price alone.',
          },
          {
            title: 'Stock variety',
            detail:
              'Beach condos, ag-adjacent SFH, HOA master plans, and canyon homes — insurance, HOA dues, and access rules vary widely.',
          },
          {
            title: 'Wildfire & insurance awareness',
            detail:
              'Hillside and wildland-urban interface parcels can face higher insurance scrutiny. Factor insurance availability and cost into canyon and mountain-edge searches.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Town fit by lifestyle',
        bullets: [
          {
            title: 'Coastal lifestyle',
            detail:
              'Ventura and parts of Oxnard / Port Hueneme for beach access and harbor amenities — with staging and salt-air tradeoffs on move day.',
          },
          {
            title: 'Family planned communities',
            detail:
              'Camarillo, Thousand Oaks, Newbury Park, and many Simi/Moorpark tracts for HOA amenities and suburban layouts — verify HOA move rules early.',
          },
          {
            title: 'Valley character',
            detail:
              'Ojai for a distinct valley lifestyle with canyon access and fire-season awareness.',
          },
          {
            title: 'LA commute tolerance',
            detail:
              'Conejo and Simi households often trade space for 101/118 commute time into LA County — map your actual peak drive before choosing.',
          },
        ],
      },
      {
        id: 'jobs',
        title: 'Jobs & commute',
        bullets: [
          {
            title: 'Local anchors',
            detail:
              'Healthcare, education, agriculture and food processing, port/defense-adjacent roles near Port Hueneme, biotech/industrial pockets, retail, and public sector.',
          },
          {
            title: '101 corridor to LA',
            detail:
              'Many residents commute toward Los Angeles County employment centers. Peak 101 times should drive housing choice more than brochure distance.',
          },
          {
            title: 'Hybrid / local options',
            detail:
              'Some tech, professional, and remote-capable roles reduce daily LA trips — still validate coworking and broadband by pocket if that matters to you.',
          },
        ],
      },
      {
        id: 'lifestyle',
        title: 'Lifestyle & climate',
        bullets: [
          {
            title: 'Coast vs inland microclimates',
            detail:
              'Marine layer on the coast vs hotter inland afternoons in Camarillo, Simi, and Conejo interiors. Wind events cut across both.',
          },
          {
            title: 'Outdoors',
            detail:
              'Beaches, Channel Islands access points, Ojai recreation, and mountain trails are major draws; weekend visitor traffic affects coastal staging.',
          },
          {
            title: 'Seasonal risk literacy',
            detail:
              'Fire and wind seasons are part of living here for hillside and canyon households — emergency kits, evacuation routes, and insurance reviews belong in relocation planning, not after move-in.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Practical Ventura County resources',
    intro:
      'Official links and licensing notes — HOA, parking, fire restrictions, and city rules change; verify before move day.',
    items: [
      {
        label: 'County of Ventura',
        href: 'https://www.ventura.org/',
        note: 'County services hub',
        external: true,
      },
      {
        label: 'City of Ventura',
        href: 'https://www.cityofventura.ca.gov/',
        external: true,
      },
      {
        label: 'City of Oxnard',
        href: 'https://www.oxnard.org/',
        external: true,
      },
      {
        label: 'City of Camarillo',
        href: 'https://www.cityofcamarillo.org/',
        external: true,
      },
      {
        label: 'City of Thousand Oaks',
        href: 'https://www.toaks.org/',
        external: true,
      },
      {
        label: 'City of Simi Valley',
        href: 'https://www.simivalley.org/',
        external: true,
      },
      {
        label: 'City of Ojai',
        href: 'https://ojai.ca.gov/',
        external: true,
      },
      {
        label: 'CAL FIRE — incident & readiness information',
        href: 'https://www.fire.ca.gov/',
        note: 'Check fire conditions during wildfire season',
        external: true,
      },
      {
        label: 'National Weather Service — Los Angeles/Oxnard',
        href: 'https://www.weather.gov/lox/',
        note: 'Wind and red-flag context for move planning',
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
        label: 'Southern California Edison / local utility check',
        href: 'https://www.sce.com/',
        note: 'Electric service for much of the county — confirm by address',
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
    'Filter listings by zone (Ventura Coast, Oxnard/Port, Camarillo, Conejo, Ojai, Simi/Moorpark) when available. Confirm HOA/COI rules, 101 travel time, and fire/wind contingency — especially for canyon and LA-corridor pairs.',
  lastReviewed: '2026-07-23',
};

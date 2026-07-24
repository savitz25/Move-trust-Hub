import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeNvPack,
  NV_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/nevada/nv-shared';

/**
 * Nye County, NV — Pahrump desert exurban to Vegas, long approaches.
 * NOT Clark County rename, NOT Reno/Washoe product, NOT Tahoe Douglas.
 */
export const nyeCountyNvIntelligence: CountyIntelligencePack = finalizeNvPack({
  countySlug: 'nye',
  hubTitle: 'Nye County Moving Intelligence Hub',
  eyebrow:
    'Nye County, NV · Pahrump desert exurban, long approaches & NV-160 logistics',
  h1: 'Moving in Nye County: Pahrump Desert Access, Long Approaches & NV-160 / US-95 Logistics',
  heroOpener:
    'Nye County, Nevada is not a Clark County rename and not a Reno freeflow template — it is vast high desert with Pahrump as the population center, long empty-mile approaches on NV-160 toward the Las Vegas Valley, US-95 corridor product, and rural/ranch destinations that rewrite “local” estimates before packing skill matters. A Pahrump HOA cul-de-sac, a desert-lot ranch with a 200-foot carry, a senior-community timed window, and a remote Beatty or Tonopah approach do not share truck access or crew skill. Extreme heat, dust, and distance are first-class cost drivers. This hub is for people moving in Nye County, NV — not a pasted Henderson page with a different ZIP.',
  heroCredibility:
    'NTA household goods CPCN for intrastate · FMCSA for interstate · Pahrump long-approach & desert-heat logistics awareness · Curated listings',
  majorCorridors: 'NV-160 · US-95 · local Pahrump grid',
  whatMakesDifferent: {
    title: 'What makes moving in Nye County different',
    intro:
      'These are Pahrump and high-desert realities — long approaches, desert-lot product, and heat-first logistics — not Strip-adjacent elevators and not interchangeable Clark Valley HOA sprawl.',
    bullets: [
      {
        title: 'Pahrump is exurban to Vegas — not a Clark Valley neighborhood',
        detail:
          'NV-160 pairs to Summerlin, Henderson, or Strip corridors routinely burn serious portal time. Pricing Pahrump as “just west Las Vegas” collapses empty-mile reality and crew recovery costs.',
      },
      {
        title: 'Desert-lot and ranch product rewrites labor',
        detail:
          'Long driveway carries, limited staging width, dust, and open heat exposure dominate jobs that look simple on a map. Flat-rate optimism from master-plan Valley driveways underprices Nye access.',
      },
      {
        title: 'HOA and senior-community rules still exist — at lower density than Clark',
        detail:
          'Planned pockets and age-restricted communities enforce gate lists, truck limits, and timed windows. Collect packets early — but do not assume Summerlin-scale HOA volume across the whole county.',
      },
      {
        title: 'NV-160, US-95 & vast empty miles are the cost story',
        detail:
          'Pahrump ↔ Las Vegas Valley, Pahrump ↔ remote Nye destinations, or US-95 corridor pairs turn “local Nevada” into regional drive time. Price portal-to-portal honestly including recovery staging.',
      },
      {
        title: 'Extreme heat is a labor and schedule factor',
        detail:
          'Late spring through early fall afternoons regularly push dangerous open-carry conditions on exposed desert lots. Early starts, hydration pacing, and flexible weather windows outperform noon load-outs.',
      },
      {
        title: 'This is not Clark County and not Northern Nevada product',
        detail:
          'Ignore Strip elevator scripts, Reno industrial freeflow, and Tahoe grade templates. Nye’s signature is distance, desert access, and Pahrump-centered demand.',
      },
      {
        title: 'Interstate pairs (CA, AZ) still appear on long legs',
        detail:
          'Some households move Nye ↔ Southern California or Arizona. An NTA household goods CPCN alone does not authorize out-of-state delivery — verify FMCSA when any leg leaves Nevada.',
      },
      NV_REG_BULLET,
    ],
  },
  zonesHeading: 'Nye County / Pahrump access zones',
  zonesIntro:
    'Plan by central Pahrump grid, north and south Pahrump growth, desert-lot / ranch belts, NV-160 Valley approaches, and remote US-95 corridor towns — access rules cluster by distance and lot product more than ZIP alone.',
  zones: [
    {
      id: 'pahrump-central',
      name: 'Central Pahrump grid, town services & multi-unit pockets',
      shortName: 'Central Pahrump',
      neighborhoods: [
        'Central Pahrump',
        'Highway 160 corridor commercial-residential',
        'Town-service multi-unit pockets',
        'Older tract and ranchette mix',
        'Local arterial residential',
      ],
      housingTypes: 'SFH, multi-unit pockets, manufactured home communities, mixed ranchette stock',
      challenges: [
        'Mixed curb and long-lot carries on short blocks',
        'Heat exposure on open staging',
        'Local arterial freeflow near commercial nodes',
      ],
      moverTips:
        'Survey driveway length and curb options with photos. Prefer early starts before heat peaks. Clarify manufactured-home community rules where applicable.',
      cityKeywords: [
        'pahrump',
        'central pahrump',
      ],
    },
    {
      id: 'pahrump-north-growth',
      name: 'North Pahrump growth, planned pockets & larger lots',
      shortName: 'North Pahrump',
      neighborhoods: [
        'North Pahrump',
        'Northern planned communities',
        'Larger-lot north belts',
        'NV-160 north residential edges',
        'Desert subdivision pockets',
      ],
      housingTypes: 'Newer SFH, HOA pockets, larger lots, limited multi-family',
      challenges: [
        'HOA gate lists and truck limits in planned pockets',
        'Long empty miles within Pahrump itself',
        'Open heat and dust on unfinished streets',
      ],
      moverTips:
        'Collect HOA packets early. Confirm truck length rules. Price cross-Pahrump portal time honestly — north ↔ south is not always a short hop in heat.',
      cityKeywords: [
        'pahrump',
        'north pahrump',
      ],
    },
    {
      id: 'pahrump-south-east',
      name: 'South & east Pahrump, senior communities & desert edges',
      shortName: 'South / east Pahrump',
      neighborhoods: [
        'South Pahrump',
        'East Pahrump desert edges',
        'Age-restricted / senior community pockets',
        'Southern larger-lot belts',
        'Mountain-view desert product',
      ],
      housingTypes: 'SFH, senior-community product, desert-lot homes, manufactured home parks',
      challenges: [
        'Timed move windows in senior communities',
        'Long driveway carries and limited staging',
        'Heat and dust on open desert approaches',
      ],
      moverTips:
        'Collect community rules and timed windows early. Photo driveway and turnaround space. Prefer heat-safe early starts on open lots.',
      cityKeywords: [
        'pahrump',
        'south pahrump',
        'east pahrump',
      ],
    },
    {
      id: 'desert-lot-ranch',
      name: 'Desert-lot, ranchette & multi-acre product',
      shortName: 'Desert lots / ranch',
      neighborhoods: [
        'Desert-lot belts around Pahrump',
        'Ranch and multi-acre pockets',
        'Private-road rural residential',
        'Unpaved approach edges',
        'Large-parcel custom homes',
      ],
      housingTypes: 'Ranch SFH, multi-acre lots, custom desert homes, limited multi-unit',
      challenges: [
        'Extreme long carries from street or gate to home',
        'Unpaved approaches and truck clearance risk',
        'Heat, dust, and limited shade staging',
      ],
      moverTips:
        'Never assume paved curb-to-door access. Photo the full approach, gate width, and turnaround. Build heat pacing and carry-distance labor into the estimate before packing add-ons.',
      cityKeywords: [
        'pahrump',
        'nye',
        'ranch',
      ],
    },
    {
      id: 'nv160-valley-approach',
      name: 'NV-160 corridor & Las Vegas Valley approach logistics',
      shortName: 'NV-160 approach',
      neighborhoods: [
        'NV-160 corridor residential edges',
        'Mountain Springs approach context',
        'Eastbound Valley-bound pairs',
        'Westbound Pahrump recovery staging',
      ],
      housingTypes: 'Corridor SFH and ranchette product feeding long portal pairs',
      challenges: [
        'Long portal time to Clark County destinations',
        'Weather and heat exposure on open highway legs',
        'Crew recovery and empty-mile costs after Valley unloads',
      ],
      moverTips:
        'Price NV-160 honestly including buffer and recovery. Treat Pahrump ↔ Henderson / Summerlin / Strip pairs as regional jobs. Verify NTA CPCN for in-state Clark legs.',
      cityKeywords: [
        'pahrump',
        'mountain springs',
        'nye',
      ],
    },
    {
      id: 'us95-remote-towns',
      name: 'US-95 corridor: Beatty, Tonopah & remote Nye towns',
      shortName: 'US-95 remote',
      neighborhoods: [
        'Beatty',
        'Tonopah',
        'Amargosa Valley edges',
        'US-95 corridor residential',
        'Remote mining-town and rural stock',
      ],
      housingTypes: 'Older SFH, rural stock, limited multi-unit, remote custom homes',
      challenges: [
        'Extreme empty miles from Pahrump or Las Vegas staging',
        'Limited services and recovery options',
        'Heat, wind, and weather exposure on long approaches',
      ],
      moverTips:
        'Never price remote Nye towns as short local Pahrump hops. Build fuel, time, and crew recovery into the estimate. Confirm lodging/day logistics for multi-day jobs when distance requires it.',
      cityKeywords: [
        'beatty',
        'tonopah',
        'amargosa',
        'nye',
      ],
    },
  ],
  costDrivers: {
    title: 'What drives Nye County moving costs',
    intro:
      'Distance, desert-lot access, heat pacing, and NV-160 / US-95 freeflow move the number more than packing skill alone — this is long-approach desert logistics, not Clark Valley neighborhood pricing.',
    drivers: [
      {
        title: 'Long empty miles & NV-160 Valley pairs',
        detail:
          'Pahrump ↔ Las Vegas Valley jobs burn portal hours and recovery costs that “local” labels hide.',
      },
      {
        title: 'Desert-lot carries, unpaved approaches & ranch access',
        detail:
          'Gate-to-home distance and truck clearance rewrite labor before boxes matter.',
      },
      {
        title: 'Extreme desert heat pacing',
        detail:
          'Summer open carries slow crews, force early starts, and raise soft costs for water, shade, and flexible windows.',
      },
      {
        title: 'HOA / senior-community timed windows',
        detail:
          'Planned pockets and age-restricted rules add admin even when density is lower than Clark master plans.',
      },
      {
        title: 'Remote US-95 destinations & interstate legs',
        detail:
          'Beatty, Tonopah, and out-of-state pairs raise staging distance and FMCSA complexity when leaving Nevada.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (simple Pahrump access)',
        value: '$500–$1,900+',
        note: 'Higher with long lots, heat windows, or Valley pairs',
      },
      {
        label: '2–3BR SFH, manufactured home, or mid-size ranch',
        value: '$1,500–$4,800+',
        note: 'Long carries, HOA, and distance soft costs trend up',
      },
      {
        label: '3–4+ BR / desert-lot / Valley or remote pair',
        value: '$3,000–$10,000+',
        note: 'NV-160 regional pairs and remote US-95 jobs price highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$120–$220+/hr',
        note: 'Portal-to-portal; packing, distance, heat pacing, and carries scale up',
      },
    ],
  },
  seasonal: {
    title: 'When to schedule a Nye County move',
    intro:
      'Extreme summer heat, mild winter windows, school calendars, and long-approach freeflow reshape access and crew availability across Pahrump and remote Nye destinations.',
    items: [
      {
        title: 'Best windows: mid-week early mornings',
        detail:
          'Tuesday–Thursday starts clear curb and reduce heat risk. In summer, start as early as communities allow — noon open carries on desert lots are a labor hazard.',
      },
      {
        title: 'Peak heat season: late May–mid-September',
        detail:
          'Family calendars collide with extreme heat. Book ahead for peak weekends and senior-community windows. Prefer shoulder hours always.',
      },
      {
        title: 'Fall–spring milder weather advantage',
        detail:
          'October–April eases heat stress for open desert carries. Still plan for wind, dust, and holiday competition on popular weekends.',
      },
      {
        title: 'Long-approach weather & wind',
        detail:
          'NV-160 and US-95 legs add wind and heat exposure even on “easy” inventory days. Build flexible weather holds into regional pairs.',
      },
    ],
  },
  specialized: [
    {
      id: 'nye-pahrump-long-approach',
      title: 'Nye County Pahrump long-approach & desert-lot logistics module',
      intro:
        'Nye estimates fail more often on distance, desert access surveys, and heat pacing than on packing skill alone.',
      bullets: [
        'Photo full driveway/approach length, gate width, and turnaround before the survey is final.',
        'Price NV-160 Pahrump ↔ Las Vegas Valley pairs as regional portal-to-portal work — not neighborhood hops.',
        'Plan heat-safe early starts May–September on open desert lots and unpaved approaches.',
        'Collect HOA/senior-community packets early where planned pockets apply.',
        'Clarify Pahrump vs remote Nye (Beatty, Tonopah, Amargosa) destinations on every estimate.',
        'For in-state jobs verify NTA household goods CPCN; verify FMCSA for any out-of-state leg.',
      ],
    },
    {
      id: 'not-clark-rename',
      title: 'Not a Clark County rename · not Northern Nevada module',
      intro:
        'A single “Southern Nevada rate” collapses when Pahrump desert exurban product is confused with Henderson HOAs, Strip elevators, or Reno industrial freeflow.',
      bullets: [
        'Do not price desert-lot carries like Summerlin gated driveways or like Strip COI elevators.',
        'Keep Nye vs Clark county lines clear on every multi-address estimate — Pahrump is not Valley product.',
        'Match long-approach recovery costs separately from in-Pahrump grid jobs.',
        'Treat interstate legs as FMCSA authority problems — NTA CPCN alone is not enough for CA/AZ delivery.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Nye County?',
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
              'Nye County School District serves Pahrump and remote communities with address-based assignment across a vast geography. Marketing neighborhood names do not guarantee a campus.',
          },
          {
            title: 'Choice, boundaries & enrollment pressure',
            detail:
              'Pahrump schools carry most enrollment; remote communities face different access and program constraints. Confirm enrollment windows early when relocating mid-year.',
          },
          {
            title: 'Research sources',
            detail:
              'District boundary tools, Nevada Department of Education data, and campus visits beat ranking screenshots alone.',
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
              'Desert View Hospital and local clinics serve Pahrump; many households use Las Vegas Valley systems for specialty care. Remote towns face longer emergency and specialty approaches. Confirm insurance networks for your household.',
          },
          {
            title: 'What relocators should do',
            detail:
              'Map peak-hour and heat-season drive times to preferred campuses — NV-160 freeflow changes “nearby Valley care” on paper. Transfer records early.',
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
              'Expect Pahrump SFH and ranchette stock; manufactured home communities; HOA and senior-community pockets; multi-acre desert lots; sparse remote-town housing outside Pahrump.',
          },
          {
            title: 'Cost variation inside the county',
            detail:
              'Purchase prices and rents are generally lower than core Las Vegas Valley product but vary by lot size, utilities, and remote access. Budget for cooling costs, well/septic realities where relevant, and long-commute fuel.',
          },
          {
            title: 'Building and community governance',
            detail:
              'HOAs, senior communities, and manufactured-home parks often control move hours, truck size, and deposits. Read documents carefully before locking a crew day.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Which areas fit whom',
        bullets: [
          {
            title: 'Central Pahrump services living',
            detail:
              'Suits people prioritizing town amenities and shorter local trips — with mixed lot product and heat staging tradeoffs.',
          },
          {
            title: 'North / south growth & planned pockets',
            detail:
              'Often appeals for newer homes and community rules — with HOA packets and cross-Pahrump portal time.',
          },
          {
            title: 'Desert-lot / ranch living',
            detail:
              'Attracts households seeking space and privacy — with long carries, unpaved approaches, and self-sufficient logistics.',
          },
          {
            title: 'Remote US-95 towns',
            detail:
              'Fits people prioritizing remote lifestyle or specific job sites — with extreme service and moving-distance tradeoffs.',
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
              'Local services, retail, healthcare, education, construction, tourism-adjacent work, and reverse-commutes into the Las Vegas Valley concentrate demand. Remote corridors may tie to mining, energy, or federal-adjacent sites.',
          },
          {
            title: 'Commute realism',
            detail:
              'NV-160 Valley reverse commutes are real time and heat commitments. Test peak routes before choosing solely on housing cost.',
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
              'Nye County stacks Pahrump desert exurban living with vast remote high desert — different from Clark Valley master plans and from Northern Nevada mountain product.',
          },
          {
            title: 'Climate',
            detail:
              'Hot desert climate with extreme summer heat, mild winters, intense sun, wind, and dust. Plan outdoor staging and heat contingency as core move-in logistics.',
          },
          {
            title: 'Culture and pace',
            detail:
              'Visit Pahrump and, if relevant, remote towns at peak heat and off-peak times when deciding — distance and climate reshape daily rhythm more than urban amenities.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Nye County resources',
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify NTA household goods CPCN status for in-state moves and FMCSA for interstate legs before deposits.',
    items: [
      {
        label: 'Nye County, Nevada — official site',
        href: 'https://www.nyecountynv.gov/',
        external: true,
        note: 'County services & property context',
      },
      {
        label: 'Town of Pahrump',
        href: 'https://www.pahrumpnv.gov/',
        external: true,
        note: 'Population-center services & local context',
      },
      {
        label: 'NDOT — traveler information',
        href: 'https://nvroads.com/',
        external: true,
        note: 'NV-160 / US-95 before load windows',
      },
    ],
  },
  directoryHint:
    'Prefer crews with desert-lot and long-carry fluency for Pahrump ranch product; heat-pacing discipline for summer open approaches; honest NV-160 · US-95 timing for Valley and remote pairs. Verify Nevada Transportation Authority (NTA) household goods CPCN for intrastate moves (including Clark County legs) and FMCSA for interstate legs before deposits.',
  lastReviewed: '2026-07-24',
});

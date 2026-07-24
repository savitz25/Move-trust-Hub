import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeTxTier2Pack,
  TX_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/texas/tx-tier2-shared';

/**
 * Bell County — Texas Tier 2 (independent Killeen–Temple military-regional metro).
 * Secondary-market contract vs Travis County (Austin) Tier 1 — not an Austin
 * collar clone and not a thinner Tier 1 zone dump.
 */
export const bellCountyIntelligence: CountyIntelligencePack = finalizeTxTier2Pack({
  countySlug: 'bell',
  hubTitle: 'Bell County Moving Intelligence Hub',
  eyebrow: 'Bell County · Independent Killeen–Temple military-regional',
  h1: 'Moving in Bell County: Independent Killeen–Temple Metro, Fort Cavazos PCS & I-35 Logistics',
  heroOpener:
    'Bell County is an independent Killeen–Temple military-regional metro — not Austin with freer freeways, and not a Travis County HOA growth collar. Fort Cavazos PCS cycles, Killeen multi-family turnover, Temple medical and residential product, Belton/Harker Heights family stock, and rural Bell edges form their own housing ladder under Central Texas heat. Compared with Travis County Tier 1 density defaults, I-35 and I-14 freeflow replace downtown elevator grids, military multi-family is first-class product, and base access rules are normal. This guide is for people moving in Bell County as a secondary market with its own role — not recycled Travis scripts.',
  heroCredibility:
    'Independent Killeen–Temple metro · Fort Cavazos PCS · I-35 / I-14 connectivity · TxDMV household goods (intrastate) · FMCSA when interstate · Curated listings',
  majorCorridors: 'I-35 · I-14 · US-190 · SH-36 · local Killeen–Temple grid',
  parentCompare: {
    parentLabel: 'Travis County (Austin) / independent military-regional',
    parentHref: '/local-movers/texas/travis',
    title: 'Compared with Travis County (Austin) Tier 1',
    intro:
      'Bell is a freestanding Central Texas military-regional metro on the I-35 corridor between Austin and Waco — not a Travis suburb with different arterials. Use Travis County as the high-density parent contrast — it is not a drop-in template for Fort Cavazos PCS apartments, Killeen multi-family churn, or Temple medical-corridor jobs.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'Travis crews fight downtown elevators, MoPac / I-35 basin congestion, and multi-pocket Austin pairs. Bell pairs ride I-35, I-14, US-190, SH-36, and the local Killeen–Temple grid with freer mid-day flow — Killeen ↔ Temple still burns portal-to-portal time at peak, but it is not a Domain ↔ South Austin job. I-35 connectivity to Austin is real; Bell is still its own market, not a Travis collar clone.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'Travis mixes dense elevators, central multi-unit, and north/south HOA growth. Bell’s ladder is Killeen/Fort Cavazos-adjacent apartments and modest SFH, Temple medical and suburban product, Belton/Harker Heights family tracts, and rural Bell edges — more military multi-family and PCS inventory, less Austin tech-HOA default.',
      },
      {
        title: 'Truck access, HOA & density',
        detail:
          'Bell stages more driveway and multi-family PCS work than Travis elevator corridors. HOAs exist in growth pockets but are not the Round Rock/Cedar Park operating system. Base access coordination and apartment COI replace dense curb-staging fights in Austin core.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local Bell quotes often sit below Travis/Austin rates for comparable square footage when access is simple — heat windows, PCS peaks, and Killeen ↔ Temple portal time still push prices up. Expect secondary-market labor rates with military seasonality and heat as the main premiums, not downtown scarcity fees.',
      },
      {
        title: 'Role difference',
        detail:
          'Bell is an independent military-regional metro with its own employment base (Fort Cavazos, healthcare in Temple, education, retail, logistics) — not an Austin bedroom collar. Treat it as its own market when matching crews and rate cards, even when households also touch Travis for work or services.',
      },
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Bell County different',
    intro:
      'Independent military-regional realities — Fort Cavazos PCS volume, Killeen–Temple polycentric routing, Central Texas heat, and freer I-35/I-14 corridors than Travis parents — that change estimates.',
    bullets: [
      {
        title: 'Fort Cavazos PCS cycles rewrite demand',
        detail:
          'Military permanent change of station windows pack Killeen multi-family, short-notice inventory, and storage-in-transit needs. Peak PCS seasons require earlier booking than civilian-only Austin suburb calendars.',
      },
      {
        title: 'Killeen vs Temple vs Belton/Harker Heights',
        detail:
          'Fort Cavazos-adjacent apartments, Temple medical/residential product, and Belton/Harker Heights family SFH are different jobs under one county label. “Bell local” is too vague — name both cities and access type on the estimate.',
      },
      {
        title: 'I-35 / I-14 freeflow is not Austin basin — still a line item',
        detail:
          'Cross-county pairs freer than Travis still burn billable time at school and commute peaks. Ask whether quotes are portal-to-portal, especially Killeen ↔ Temple or base-edge ↔ Belton.',
      },
      {
        title: 'Central Texas heat is an operational constraint',
        detail:
          'Summer afternoons stress crews and open staging. Prefer earliest morning load windows in peak summer — mild shoulder-season Austin habits do not cancel heat risk on asphalt lots.',
      },
      TX_TIER2_REG_BULLET,
    ],
  },
  zonesHeading: 'Bell County zones: Killeen/Fort Cavazos, Temple, Belton/Harker Heights & rural edges',
  zonesIntro:
    'Four sharp products — not a six-zone dump. Killeen/Fort Cavazos-adjacent density, Temple medical-residential, Belton/Harker Heights family stock, and rural Bell edges price and stage differently under the same heat and PCS calendar.',
  zones: [
    {
      id: 'killeen-fort-cavazos',
      name: 'Killeen / Fort Cavazos-adjacent',
      shortName: 'Killeen / Fort Cavazos',
      neighborhoods: [
        'Killeen multi-family corridors',
        'Fort Cavazos-adjacent apartments',
        'US-190 residential belts',
        'Military family housing edges (as applicable)',
        'Central Killeen older stock',
      ],
      housingTypes:
        'Apartments, townhomes, modest SFH, military-adjacent multi-family',
      challenges: [
        'PCS peak volume and short-notice moves',
        'Apartment elevator windows and COI',
        'Base access coordination when applicable',
        'High turnover inventory profiles',
      ],
      moverTips:
        'Book PCS windows early. Confirm gate/base access rules if either address requires installation entry. Inventory carefully for partial loads and storage-in-transit common in military moves. Collect apartment COI before the survey is final.',
      cityKeywords: [
        'killeen',
        'fort cavazos',
        'fort hood',
        'killeen tx',
        'pcs',
        'us 190',
      ],
    },
    {
      id: 'temple',
      name: 'Temple',
      shortName: 'Temple',
      neighborhoods: [
        'Downtown Temple',
        'Medical-corridor residential',
        'South / west Temple growth',
        'Multi-family near employment centers',
        'Established SFH tracts',
      ],
      housingTypes:
        'Suburban SFH, multi-family, some HOA tracts, medical-corridor apartments, older in-town stock',
      challenges: [
        'I-35 / local arterial congestion at peak',
        'Medical-campus adjacent multi-unit windows',
        'Heat on open suburban staging',
        'Cross-town peaks toward Killeen and Belton',
      ],
      moverTips:
        'Collect building packets for multi-unit near medical corridors. Prefer earliest morning starts in summer. Temple ↔ Killeen is a classic underquoted “local” — price portal time honestly on I-35 / I-14 / US-190.',
      cityKeywords: [
        'temple',
        'temple tx',
        'scott and white',
        'baylor scott',
        'temple medical',
      ],
    },
    {
      id: 'belton-harker-heights',
      name: 'Belton / Harker Heights',
      shortName: 'Belton / Harker Heights',
      neighborhoods: [
        'Belton',
        'Harker Heights',
        'Family SFH tracts',
        'Lake-adjacent edges (as applicable)',
        'Between-city corridor residential',
      ],
      housingTypes:
        'Family SFH, some HOA tracts, townhomes, limited multi-family',
      challenges: [
        'School-calendar Saturday demand',
        'HOA COI where planned communities apply',
        'I-14 / local grid timing toward Killeen and Temple',
        'Summer heat on open streets',
      ],
      moverTips:
        'Collect HOA packets when applicable. Mid-week early starts beat heat and school traffic. Book May–August Saturdays early for family SFH moves. Clarify Belton ↔ Killeen drive assumptions.',
      cityKeywords: [
        'belton',
        'harker heights',
        'belton tx',
        'harker heights tx',
      ],
    },
    {
      id: 'rural-bell-edges',
      name: 'Rural Bell edges',
      shortName: 'Rural edges',
      neighborhoods: [
        'Salado edge',
        'Holland / Bartlett approaches',
        'Rural Bell parcels',
        'Agricultural-edge homes',
        'Small communities off main arterials',
      ],
      housingTypes:
        'Rural SFH, larger-lot edges, limited multi-unit, farm/ranch-adjacent properties',
      challenges: [
        'Longer approaches and empty miles from Killeen/Temple staging',
        'Unpaved or constrained rural driveways',
        'Lower service density than core corridors',
        'Not interchangeable with Fort Cavazos apartment logistics',
      ],
      moverTips:
        'Treat edge-to-metro pairs as long locals with honest portal-to-portal time. Mention sheds, shops, and unpaved access on the survey. Early starts are non-negotiable in summer heat.',
      cityKeywords: [
        'salado',
        'holland',
        'bartlett',
        'rural bell',
        'salado tx',
      ],
    },
  ],
  costDrivers: {
    title: 'Pricing & cost drivers inside Bell County',
    intro:
      'Same square footage prices differently by heat window, PCS timing, multi-unit COI, and whether the job is Killeen base-edge, Temple medical corridor, or rural long local.',
    drivers: [
      {
        title: 'PCS peak capacity',
        detail:
          'Military move seasons tighten crews near Killeen multi-family and can push rates or lead times — book early for known PCS windows.',
      },
      {
        title: 'Killeen ↔ Temple portal time',
        detail:
          'Cross-city pairs on I-35 / I-14 / US-190 can burn more clock than map miles suggest at peak — freer than Austin basin, still billable.',
      },
      {
        title: 'Heat-constrained work windows',
        detail:
          'Summer heat compresses productive hours into mornings. Jobs that slip into peak afternoon heat may need more labor days or premium scheduling.',
      },
      {
        title: 'Rural-edge empty miles',
        detail:
          'Longer approaches, outbuildings, and soft driveways add labor and vehicle risk — price them explicitly versus pure suburban driveway jobs.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (same zone, simple access)',
        value: '$400–$1,250+',
        note: 'Higher with elevators, PCS peaks, or long portal time',
      },
      {
        label: '2–3BR house / apartment',
        value: '$1,100–$3,400+',
        note: 'Cross-city hauls and multi-unit access trend up',
      },
      {
        label: '3–4+ BR (cross-zone / rural edge)',
        value: '$1,900–$5,800+',
        note: 'Rural edges and peak PCS windows price highest',
      },
    ],
  },
  seasonal: {
    title: 'Seasonal, heat & PCS-calendar intelligence',
    intro:
      'Bell peaks follow Fort Cavazos PCS cycles, school calendars, and Central Texas heat — not Travis downtown lease density alone.',
    items: [
      {
        title: 'PCS peak windows (Fort Cavazos)',
        detail:
          'Military permanent change of station seasons (often concentrated in summer) fill crews near Killeen multi-family. Book as soon as orders allow.',
      },
      {
        title: 'Summer heat: roughly May – September',
        detail:
          'Plan early-morning loads, extra water, and heat-safe packing. Mid-afternoon moves in peak heat are high risk for people and property.',
      },
      {
        title: 'Best value: mid-month Tue–Thu, early start outside PCS crush',
        detail:
          'Still plan around apartment elevator windows when applicable. Dawn starts win even in shoulder seasons when heat and arterials are the real constraints.',
      },
    ],
  },
  specialized: [
    {
      id: 'fort-cavazos-pcs',
      title: 'Fort Cavazos PCS & military household logistics',
      intro:
        'Bell County’s volume problem is often military turnover, short notice, and apartment access — not Austin HOA paperwork alone.',
      bullets: [
        'Book as soon as PCS orders allow; peak summer capacity disappears first near Killeen multi-family corridors.',
        'Confirm base access, gate hours, and escort rules if either address requires installation entry.',
        'Inventory carefully for partial loads, storage-in-transit, and weight-based entitlements when applicable.',
        'Collect apartment COI and elevator reservations before the survey is final.',
      ],
    },
    {
      id: 'i35-i14-connectivity',
      title: 'I-35 / I-14 connectivity logistics',
      intro:
        'Killeen–Temple polycentric routing on I-35, I-14, US-190, and SH-36 is not interchangeable with a single Austin neighborhood move.',
      bullets: [
        'Name both cities on every estimate (e.g. Killeen → Temple); “Bell local” hides portal time.',
        'Price peak I-35 / I-14 / US-190 pairs honestly — map miles understate school and commute congestion.',
        'Clarify whether long locals toward Salado or rural edges still use a pure local rate card.',
        'Build buffer when households also stage storage or partial loads common in PCS transitions.',
      ],
    },
    {
      id: 'heat-base-access',
      title: 'Heat & base-access operations',
      intro:
        'Central Texas heat plus installation access rules need operational plans that pure civilian Austin jobs never write.',
      bullets: [
        'Prefer earliest morning starts in peak summer; treat mid-afternoon loads as high risk.',
        'Request shaded staging and heat-safe packing for electronics and sealed goods.',
        'Confirm vehicle and escort requirements for any base-adjacent address before dispatch.',
        'Plan water, rotation, and realistic crew endurance on open apartment and suburban lots.',
      ],
    },
  ],
  relocation: {
    title: 'Schools & hospitals for relocators',
    intro:
      'Independent military-regional value, Fort Cavazos adjacency, and Central Texas heat are different bets — validate schools and healthcare by pocket, then plan for PCS calendars.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & education',
        intro:
          'Major systems include Killeen ISD, Temple ISD, Belton ISD, Harker Heights–area options within those systems, and others. Match every listing address to the correct boundary.',
        bullets: [
          {
            title: 'Multiple districts under one county',
            detail:
              'Killeen, Temple, Belton, and outlying addresses often fall in different systems. Marketing names and new tracts can span feeders — verify with official boundary tools and TEA data.',
          },
          {
            title: 'Military family considerations',
            detail:
              'PCS timing and school-year midpoints matter for Fort Cavazos-affiliated households — coordinate enrollment early with district military liaisons when available.',
          },
          {
            title: 'Research tools',
            detail:
              'District sites and TEA data should lead; third-party rankings are secondary. Tour campuses when possible.',
          },
        ],
      },
      {
        id: 'hospitals',
        title: 'Hospitals & healthcare',
        bullets: [
          {
            title: 'Metro acute-care anchors',
            detail:
              'Baylor Scott & White Medical Center – Temple and other Temple/Killeen-area campuses dominate regional care; military-eligible care also ties to installation systems. Map ER drive times from rural edges and Killeen multi-family at peak traffic.',
          },
          {
            title: 'Specialty & regional reality',
            detail:
              'Some specialties may require travel toward Austin or other hubs. Confirm insurer networks and realistic I-35 appointment times before relocating mid-treatment.',
          },
          {
            title: 'Relocator tip',
            detail:
              'Transfer pediatric and specialty care early if mid-treatment; book first appointments before peak summer PCS chaos.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Bell resources',
    intro:
      'Local official links first; directory listings are independent. Verify TxDMV household goods authority for in-state moves and FMCSA for interstate legs before deposits.',
    items: [
      {
        label: 'Bell County',
        href: 'https://www.bellcountytx.com/',
        note: 'County services hub',
        external: true,
      },
      {
        label: 'City of Killeen',
        href: 'https://www.killeentexas.gov/',
        external: true,
      },
      {
        label: 'City of Temple',
        href: 'https://www.templetx.gov/',
        external: true,
      },
      {
        label: 'City of Belton',
        href: 'https://www.beltontexas.gov/',
        external: true,
      },
      {
        label: 'City of Harker Heights',
        href: 'https://www.harkerheights.gov/',
        external: true,
      },
      {
        label: 'Fort Cavazos (official)',
        href: 'https://home.army.mil/cavazos/',
        note: 'PCS and installation information for military-affiliated moves',
        external: true,
      },
    ],
  },
  directoryHint:
    'Filter listings by zone (Killeen/Fort Cavazos, Temple, Belton/Harker Heights, Rural edges) when available. Confirm PCS/base rules near Fort Cavazos, heat-aware start times, and honest Killeen–Temple drive assumptions — this is an independent military-regional metro, not a Travis collar clone.',
  lastReviewed: '2026-07-24',
});

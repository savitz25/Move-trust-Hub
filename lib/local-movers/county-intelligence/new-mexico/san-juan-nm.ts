import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import { finalizeNmPack } from '@/lib/local-movers/county-intelligence/new-mexico/nm-shared';

/**
 * San Juan County, NM — Farmington / Four Corners regional hub (not ABQ north clone).
 */
export const sanJuanCountyNmIntelligence: CountyIntelligencePack = finalizeNmPack({
  countySlug: 'san-juan',
  hubTitle: 'San Juan County Moving Intelligence Hub',
  eyebrow:
    'San Juan · Farmington NM regional · Four Corners · US-64 · US-550 · NM-516 · energy corridor',
  h1: 'Moving in San Juan County: Farmington Regional Access, Four Corners Logistics & Energy-Corridor Housing Patterns',
  heroOpener:
    'San Juan County, New Mexico is the Farmington regional and Four Corners hub — not an Albuquerque north-metro clone, not a Santa Fe capital page, and not a recycled Colorado Front Range template. Farmington multi-unit and older SFH corridors, Bloomfield and Aztec town-center stock, energy-corridor and industrial-adjacent housing swings, rural Animas and San Juan river-edge approaches, and US-64 / US-550 / NM-516 freeflow rewrite “local” estimates. A downtown Farmington walk-up, a Bloomfield ranch, an Aztec hillside driveway, and a rural energy-corridor modular do not share truck access, wind exposure, or empty-mile risk. This hub is for people moving in San Juan County, New Mexico — northwest regional and Four Corners realities, not a renamed Bernalillo page.',
  heroCredibility:
    'NMDOT TRB / New Mexico household goods framework for intrastate NM moves · FMCSA for interstate · Curated directory listings',
  majorCorridors: 'US-64 · US-550 · NM-516 · local Farmington grid',
  whatMakesDifferent: {
    title: 'What makes moving in San Juan County different',
    intro:
      'These are Farmington and Four Corners regional realities — energy-corridor turnover, multi-town spacing, high-desert wind, and US-64 / US-550 timing — not Albuquerque interstate-grid defaults or a generic New Mexico template.',
    bullets: [
      {
        title: 'Regional multi-town spacing rewrites “local” estimates',
        detail:
          'Farmington ↔ Bloomfield, Farmington ↔ Aztec, or town ↔ rural-edge pairs look short on maps and bill regional portal time. Empty miles and crew repositioning matter more than bedroom count alone.',
      },
      {
        title: 'Energy-corridor and industrial-adjacent turnover patterns',
        detail:
          'Workforce housing, modular stock, and industrial-edge multi-family can mean short notice, lease-turn clustering, and different curb rules than suburban HOA growth markets.',
      },
      {
        title: 'US-64, US-550, and NM-516 define portal-to-portal time',
        detail:
          'Cross-town and Four Corners-adjacent pairs stack freight, construction, and weather windows. Price honestly — map-short jobs still run regional.',
      },
      {
        title: 'High-desert wind, sun, and river-edge access matter',
        detail:
          'Wind-exposed staging, soft shoulders near river corridors, and older driveway product change labor hours versus clean garage-friendly suburban defaults.',
      },
      {
        title: 'Not Albuquerque north, not Colorado Four Corners as the default',
        detail:
          'This is San Juan County’s Farmington market. Bernalillo metro product and Colorado-side Four Corners patterns use different access rules, regulators, and corridors — survey each San Juan address on its own terms.',
      },
      {
        title: 'Intrastate NMDOT TRB household goods authority vs interstate FMCSA',
        detail:
          'Moves entirely within New Mexico by for-hire household goods carriers generally fall under the New Mexico Department of Transportation Transportation Regulation Bureau (NMDOT TRB) household goods / motor carrier framework. Match the legal name on the estimate to NMDOT TRB authority before you deposit. Any out-of-state leg — including Colorado, Arizona, or Utah Four Corners pairs — needs active FMCSA USDOT (and usually MC) authority — verify on FMCSA SAFER. Do not substitute TX, AZ, CO PUC, UT, or NJ credentials for New Mexico intrastate work.',
      },
    ],
  },
  zonesHeading: 'San Juan County access zones',
  zonesIntro:
    'Plan by Farmington core, Bloomfield corridor, Aztec / northern approaches, and rural energy-edge / river-corridor belts — access rules cluster by zone more than ZIP alone.',
  zones: [
    {
      id: 'farmington-core',
      name: 'Farmington core, midtown multi-unit & established SFH',
      shortName: 'Farmington core',
      neighborhoods: [
        'Downtown Farmington',
        'midtown Farmington',
        'Main Street / Broadway edges',
        'established eastside SFH',
        'multi-family corridors',
      ],
      housingTypes: 'Older SFH, multi-unit, renovated stock, denser walk-ups',
      challenges: [
        'Stairs, long carries, and mixed curb rules',
        'Scarce staging near commercial corridors',
        'Multi-family lease-turn clustering',
      ],
      moverTips:
        'Photo stair counts and curb options. Prefer mid-week morning windows. Clarify multi-family building rules before final pricing.',
      cityKeywords: [
        'farmington',
        'downtown farmington',
        'farmington nm',
        'midtown farmington',
      ],
    },
    {
      id: 'bloomfield-us550-corridor',
      name: 'Bloomfield, US-550 corridor & southern approaches',
      shortName: 'Bloomfield',
      neighborhoods: [
        'Bloomfield',
        'US-550 corridor',
        'southern Farmington–Bloomfield approaches',
        'town-center SFH',
        'corridor multi-family pockets',
      ],
      housingTypes: 'Ranch SFH, multi-family, mixed older and corridor stock',
      challenges: [
        'US-550 portal time to Farmington anchors',
        'Mixed driveway condition and curb rules',
        'Industrial-adjacent traffic windows',
      ],
      moverTips:
        'Price Bloomfield–Farmington pairs portal-to-portal. Survey driveway condition carefully. Avoid peak US-550 freight windows when flexible.',
      cityKeywords: ['bloomfield', 'bloomfield nm', 'us-550 farmington'],
    },
    {
      id: 'aztec-northern-approaches',
      name: 'Aztec, northern corridors & hillside-edge stock',
      shortName: 'Aztec / north',
      neighborhoods: [
        'Aztec',
        'northern US-550 approaches',
        'hillside-edge SFH',
        'town-center older stock',
        'northern county fringe',
      ],
      housingTypes: 'Older SFH, hillside lots, limited multi-family',
      challenges: [
        'Driveway pitch and limited truck turnaround on edge lots',
        'Longer portal time to Farmington employment anchors',
        'Weather-exposed outdoor staging',
      ],
      moverTips:
        'Survey driveway pitch and staging length. Price Aztec–Farmington pairs honestly. Build weather contingency into outdoor windows.',
      cityKeywords: ['aztec', 'aztec nm', 'northern san juan'],
    },
    {
      id: 'rural-energy-river-edge',
      name: 'Rural energy-corridor, river-edge & industrial-adjacent belts',
      shortName: 'Rural / energy edge',
      neighborhoods: [
        'energy-corridor housing',
        'Animas / San Juan river-edge approaches',
        'industrial-adjacent multi-family',
        'modular and workforce stock',
        'far rural fringe',
      ],
      housingTypes: 'Modular, ranch, industrial-adjacent multi-family, acreage',
      challenges: [
        'Long empty miles and soft or unfinished approaches',
        'Short-notice workforce turnover patterns',
        'Different skill set than core multi-unit jobs',
      ],
      moverTips:
        'Survey ground condition and turnaround carefully. Price rural pairs portal-to-portal. Clarify NM vs CO/AZ/UT destinations on multi-state estimates.',
      cityKeywords: [
        'san juan county rural',
        'farmington industrial',
        'four corners nm',
        'kirtland edges',
      ],
    },
  ],
  costDrivers: {
    title: 'What drives San Juan County moving costs',
    intro:
      'Multi-town spacing, energy-corridor turnover, wind-exposed staging, and US-64 / US-550 / NM-516 portal time drive quotes more than bedroom count alone.',
    drivers: [
      {
        title: 'Farmington–Bloomfield–Aztec empty miles',
        detail: 'Regional multi-town pairs bill portal time beyond map distance.',
      },
      {
        title: 'Core multi-unit stairs & scarce curb staging',
        detail: 'Building access friction dominates denser Farmington jobs.',
      },
      {
        title: 'US-64 / US-550 / NM-516 congestion & freight',
        detail: 'Portal-to-portal spikes at peak and industrial windows.',
      },
      {
        title: 'Rural / energy-edge soft approaches & short-notice turns',
        detail: 'Ground condition and workforce timing rewrite labor hours.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (simple access)',
        value: '$400–$1,450+',
        note: 'Higher with stairs or multi-town portal time',
      },
      {
        label: '2–3BR condo or modest SFH',
        value: '$1,200–$3,800+',
        note: 'Cross-town and wind-window friction trends up',
      },
      {
        label: '3–4+ BR / rural / multi-town',
        value: '$2,200–$7,500+',
        note: 'Long approaches and regional pairs highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$100–$170+/hr',
        note: 'Portal-to-portal',
      },
    ],
  },
  seasonal: {
    title: 'When to schedule a move in San Juan County',
    intro:
      'Summer family peaks, energy-workforce turnover waves, high-desert wind and heat, and winter freezes reshape Farmington and Four Corners windows.',
    items: [
      {
        title: 'Best windows: mid-week early mornings',
        detail: 'Clear curb and reduce US-64 / US-550 pain before peak wind and traffic.',
      },
      {
        title: 'Peak family season: late May–mid-August',
        detail: 'Book Farmington Saturdays early; watch heat and wind.',
      },
      {
        title: 'Workforce & multi-family turnover clusters',
        detail: 'Industrial-adjacent and multi-unit slots fill with short notice — book early when dates are flexible.',
      },
      {
        title: 'High-desert wind, heat & winter freezes',
        detail: 'Plan outdoor staging wind protection, shade, and cold-weather contingency.',
      },
    ],
  },
  specialized: [
    {
      id: 'farmington-four-corners-energy-corridor-module',
      title: 'Farmington Four Corners & energy-corridor module',
      intro:
        'San Juan estimates fail when multi-town empty miles, workforce housing access, or US-64/US-550/NM-516 portal time are ignored — and when crews treat this as an Albuquerque north clone.',
      bullets: [
        'Price Farmington–Bloomfield–Aztec pairs portal-to-portal, not by bedroom count alone.',
        'Photo stair counts, curb options, and soft approaches on core and river-edge jobs.',
        'Plan wind and weather contingency for high-desert outdoor staging.',
        'Clarify New Mexico vs Colorado / Arizona / Utah destinations on multi-state estimates.',
        'Verify NMDOT TRB household goods authority for in-state-only jobs and FMCSA for interstate legs.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to San Juan County?',
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
              'Farmington Municipal Schools, Bloomfield, Aztec, and other systems serve different addresses across the county. Confirm zoning carefully — multi-town lines do not follow map assumptions.',
          },
          {
            title: 'Research sources',
            detail:
              'District boundary tools and New Mexico Public Education Department data beat ranking screenshots.',
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
              'San Juan Regional Medical Center and other local campuses anchor Farmington-area care; larger out-of-area systems appear in some specialist referral patterns. Confirm networks and specialist access.',
          },
          {
            title: 'What relocators should do',
            detail:
              'Map peak-hour drive times from Bloomfield, Aztec, and rural edges into major campuses. Transfer records early.',
          },
        ],
      },
      {
        id: 'housing',
        title: 'Housing character & cost pressures',
        bullets: [
          {
            title: 'Core multi-unit vs town SFH vs energy-edge modular vs rural acreage',
            detail:
              'Farmington apartments, Bloomfield ranches, Aztec hillside stock, and corridor modular product price and access very differently.',
          },
          {
            title: 'Cost variation',
            detail:
              'Energy-cycle demand can shift availability and pricing faster than pure residential growth markets.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Which areas fit whom',
        bullets: [
          {
            title: 'Farmington core lifestyle',
            detail: 'Services and employment density with multi-unit and older-SFH access tradeoffs.',
          },
          {
            title: 'Bloomfield / Aztec pattern',
            detail: 'Smaller-town space with portal-time tradeoffs to Farmington anchors.',
          },
          {
            title: 'Rural / energy-edge pattern',
            detail: 'More land and workforce housing character with longer empty-mile logistics.',
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
              'Energy and industrial support, healthcare, education, retail, government, and regional services shape employment.',
          },
          {
            title: 'Commute realism',
            detail:
              'US-64, US-550, and NM-516 multi-town peaks are real. Test drive peak routes between your zone and work anchors.',
          },
        ],
      },
      {
        id: 'lifestyle',
        title: 'Lifestyle & practical livability',
        bullets: [
          {
            title: 'Four Corners regional identity',
            detail:
              'San Juan is Farmington regional product — not Albuquerque north-metro alone, and not a Colorado Front Range default.',
          },
          {
            title: 'Climate',
            detail:
              'High-desert sun, strong wind, cold winters, and warm summers. Plan outdoor staging contingency.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful San Juan County resources',
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify NMDOT TRB household goods authority for in-state moves and FMCSA for interstate legs before deposits.',
    items: [
      {
        label: 'San Juan County, New Mexico — official site',
        href: 'https://www.sjcounty.net/',
        external: true,
      },
      {
        label: 'City of Farmington — official site',
        href: 'https://www.fmtn.org/',
        external: true,
      },
      {
        label: 'NMDOT traffic & road conditions',
        href: 'https://www.dot.nm.gov/',
        external: true,
      },
    ],
  },
  directoryHint:
    'Prefer multi-town Farmington–Bloomfield–Aztec experience and energy-corridor access with honest US-64 / US-550 / NM-516 pricing. Verify NMDOT TRB HHG authority in-state and FMCSA interstate. This is San Juan County NM (Four Corners) — not an Albuquerque north clone.',
  lastReviewed: '2026-07-24',
});

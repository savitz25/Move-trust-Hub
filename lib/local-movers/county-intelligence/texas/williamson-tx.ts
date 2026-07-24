import {
  finalizeTxTier2Pack,
  TX_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/texas/tx-tier2-shared';

/**
 * Williamson County — Texas Tier 2 (Austin north collar).
 * Parent: Travis County. Round Rock / Georgetown / Hutto tech-suburb growth —
 * NOT a renamed Travis downtown pack.
 */
export const williamsonCountyIntelligence = finalizeTxTier2Pack({
  countySlug: 'williamson',
  hubTitle: 'Williamson County Moving Intelligence Hub',
  eyebrow: 'Williamson County · Austin north collar — Round Rock / Georgetown / Hutto',
  h1: 'Moving in Williamson County: Austin North Collar — Round Rock, Georgetown & Hutto',
  heroOpener:
    'Williamson County is Austin’s northern collar — Round Rock tech and retail corridors, Georgetown’s historic square plus master-planned edges, Hutto/Taylor east growth, and Cedar Park/Leander-edge product that still sits in Williamson logistics — not downtown Travis elevators with different freeways. HOA packets, I-35 / SH-130 / US-183 / SH-45 / RM-620 freeflow, summer heat, and tech-driven transfer volume define crew days. A Round Rock HOA two-story, a Georgetown Square bungalow, a Hutto new build, and a Leander-edge tract do not share truck access. Quote the pocket and the I-35 north pair — never a recycled Austin-core rate card.',
  heroCredibility:
    'Austin north collar · Tech-suburb HOA growth · TxDMV household goods (intrastate) · FMCSA when interstate · Curated listings',
  majorCorridors: 'I-35 · SH-130 · US-183 · SH-45 · RM-620',
  parentCompare: {
    parentLabel: 'Travis County',
    parentHref: '/local-movers/texas/travis',
    title: 'Compared with Travis County',
    intro:
      'Williamson is the Austin metro’s north collar above Travis County — shared Central Texas heat and I-35 rhythm, denser HOA master-planned stock, less downtown elevator density, and its own Round Rock/Georgetown/Hutto town identities. Use this when one address sits in Travis County and the other in Williamson.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'Travis County crews fight central Austin I-35, MoPac, and dense urban arterials. Williamson pairs ride I-35 north, SH-130, US-183, SH-45, and RM-620 with freer mid-day freeflow — Round Rock ↔ Georgetown still burns portal-to-portal time at peak, but it is not a downtown Austin elevator + MoPac job. Cross-county Williamson ↔ Travis pairs are long locals on the north spine.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'Travis mixes vertical multi-family, central Austin grids, and varied hill-country edges. Williamson’s ladder is tech-suburb HOA SFH (Round Rock villages), Georgetown Square vs Sun City vs new villages, Cedar Park/Leander-edge planned product, and Hutto/Taylor east growth — more master-planned family volume, less downtown loft density.',
      },
      {
        title: 'Truck access, HOA & density',
        detail:
          'Williamson stages more driveway, cul-de-sac, and gate-list work than Travis core. HOA COI, approved hours, and truck limits are common in growth villages — real soft costs Austin urban quotes often omit. Historic-grid staging near Georgetown Square replaces high-rise dock fights as a distinctive access case.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Same-zone Round Rock jobs can look secondary-market simple until HOA windows, tech-transfer clustering, and peak I-35 time hit. East/north expansion (Hutto, Taylor, Liberty Hill edges) raises the bill above pure Round Rock in-town quotes. Do not assume Travis-core rates transfer without naming both cities and corridors.',
      },
      {
        title: 'Role difference',
        detail:
          'Williamson is Austin’s north tech-suburb and family-growth collar — Round Rock/Georgetown/Hutto identity — not a Travis downtown clone and not a DFW north-suburb script. Match crews to HOA fluency, I-35 north freeflow, and heat/growth peaks.',
      },
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Williamson County different',
    intro:
      'North-collar realities — tech-suburb HOAs, I-35 freeflow, heat/growth peaks, and Texas licensing — that a renamed Travis pack would miss.',
    bullets: [
      {
        title: 'Round Rock, Georgetown, and Hutto are different products',
        detail:
          'A Round Rock HOA two-story, a Georgetown Square bungalow, a Hutto new build, and a Cedar Park-edge tract do not share truck access. Name both cities — “Williamson County local” fails across I-35 vs east-growth last-mile.',
      },
      {
        title: 'Tech-suburb HOA paperwork is the default in growth stock',
        detail:
          'Master-planned villages require COI, approved hours, gate lists, and floor protection. Treat the HOA packet as part of the survey — not an afterthought on move morning.',
      },
      {
        title: 'I-35 north freeflow is not Austin core gridlock — still clock time',
        detail:
          'Many households pair addresses with Travis job centers. Peak I-35, 183, 130, 45, and 620 delays are billable. Ask how portal-to-portal time is priced across the county line.',
      },
      {
        title: 'Heat and growth peaks compress productive windows',
        detail:
          'Central Texas summer heat plus school and tech-transfer calendars pack May–August Saturdays. Early starts and advance booking outperform noon load-outs in peak season.',
      },
      TX_TIER2_REG_BULLET,
    ],
  },
  zonesHeading: 'Williamson County zones: Round Rock, Georgetown, west edge & east growth',
  zonesIntro:
    'Four sharp products — Round Rock, Georgetown, Cedar Park/Leander edge, and Hutto/Taylor east growth. Not a Travis zone dump with new labels.',
  zones: [
    {
      id: 'round-rock',
      name: 'Round Rock: tech, retail & planned-growth core',
      shortName: 'Round Rock',
      neighborhoods: [
        'Downtown Round Rock',
        'East Round Rock growth',
        'West Round Rock / 620 corridors',
        'Teravista and similar villages',
        'La Frontera / retail-employment edges',
        'Multi-family apartment corridors',
      ],
      housingTypes:
        'Master-planned HOA SFH, townhomes, multi-family, some older in-town stock',
      challenges: [
        'HOA COI, gate lists, and approved move hours',
        'I-35 / 45 / local arterial congestion at peak',
        'Corporate transfer and end-of-month lease volume',
        'Apartment elevator windows near employment corridors',
      ],
      moverTips:
        'Collect HOA and apartment packets early. Prefer weekday mornings near I-35. Round Rock ↔ Georgetown is a classic underquoted local — price portal time honestly.',
      cityKeywords: [
        'round rock',
        'teravista',
        'la frontera',
        'round rock tx',
      ],
    },
    {
      id: 'georgetown',
      name: 'Georgetown: Square, Sun City & village edges',
      shortName: 'Georgetown',
      neighborhoods: [
        'Georgetown Square / historic core',
        'Sun City Texas',
        'Wolf Ranch and similar villages',
        'East Georgetown growth',
        'North Georgetown tracts',
        'South Georgetown toward Round Rock',
      ],
      housingTypes:
        'Historic SFH, active-adult communities, master-planned HOA SFH, multi-family',
      challenges: [
        'Historic-grid staging near the Square',
        'Sun City / village HOA rules and hours',
        'I-35 interchange timing',
        'Mix of retiree and family move calendars',
      ],
      moverTips:
        'Share street-width photos for Square-adjacent homes. Collect Sun City and village HOA packets before booking. Early starts in summer heat.',
      cityKeywords: [
        'georgetown',
        'sun city',
        'sun city texas',
        'wolf ranch',
        'georgetown square',
      ],
    },
    {
      id: 'cedar-park-leander-edge',
      name: 'Cedar Park / Leander Edge: western corridor into Travis',
      shortName: 'Cedar Park / Leander edge',
      neighborhoods: [
        'Cedar Park (Williamson portions)',
        'Leander (Williamson portions)',
        '183A corridor residential',
        'Brushy Creek edges',
        'Master-planned west villages',
      ],
      housingTypes:
        'HOA SFH, townhomes, multi-family, some hillside and larger-lot edges',
      challenges: [
        '183 / 620 congestion toward Austin employment',
        'HOA COI and approved hours',
        'Cross-county pairs into Travis job centers',
        'School-calendar Saturday demand',
      ],
      moverTips:
        'Price portal-to-portal time for west-corridor ↔ Round Rock or Travis pairs honestly. Collect HOA packets before locking Saturday crews. Clarify which county rules apply at each address.',
      cityKeywords: [
        'cedar park',
        'leander',
        'brushy creek',
        '183a',
      ],
    },
    {
      id: 'hutto-taylor-east',
      name: 'Hutto, Taylor & eastern growth',
      shortName: 'Hutto / Taylor east growth',
      neighborhoods: [
        'Hutto',
        'Taylor',
        'East 79 / 1660 corridors',
        'Newer master-planned east villages',
        'Agricultural-edge transitions',
      ],
      housingTypes:
        'Newer HOA SFH, small-town in-grid stock, some multi-family and acreage edges',
      challenges: [
        'Longer arterials to I-35 job corridors',
        'HOA rules in new villages vs older town grids',
        'New-construction incomplete roads',
        'Lower service density than Round Rock core',
      ],
      moverTips:
        'Confirm builder/HOA access the week of the move. Hutto ↔ Round Rock or Taylor ↔ Georgetown needs honest deadhead assumptions — not pure map-mile locals.',
      cityKeywords: [
        'hutto',
        'taylor',
        'taylor tx',
        'hutto tx',
      ],
    },
  ],
  costDrivers: {
    title: 'Pricing & cost drivers inside Williamson County',
    intro:
      'Same square footage prices differently by HOA soft costs, I-35 north portal time, tech-transfer volume, and whether the job stays in Round Rock–Georgetown or stretches to Hutto/Taylor.',
    drivers: [
      {
        title: 'I-35 / 130 / 183 / 45 / 620 corridor time',
        detail:
          'Round Rock ↔ Georgetown, Cedar Park-edge ↔ Hutto, or any peak north-spine leg can burn far more clock than map miles suggest. Hourly billing follows the clock.',
      },
      {
        title: 'HOA soft costs (tech-suburb villages)',
        detail:
          'COI processing, approved hours, and gate lists add soft costs and can force weekday-only windows before labor starts.',
      },
      {
        title: 'Tech / corporate transfer clustering',
        detail:
          'Employer-driven moves can tighten mid-month mid-week capacity and still compete with Saturday HOA demand in peak season.',
      },
      {
        title: 'Eastern expansion deadhead',
        detail:
          'Hutto and Taylor raise portal time versus Round Rock core — confirm local vs long-local pricing.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (same zone, simple access)',
        value: '$450–$1,450+',
        note: 'Higher with elevators, HOA windows, or peak transfer weeks',
      },
      {
        label: '2–3BR house / planned community',
        value: '$1,500–$4,200+',
        note: 'HOA soft costs and multi-zone hauls trend up',
      },
      {
        label: '3–4+ BR (cross-zone / east expansion)',
        value: '$2,400–$7,000+',
        note: 'Long locals toward Hutto or Taylor price highest',
      },
    ],
  },
  seasonal: {
    title: 'Seasonal, heat & tech-transfer intelligence',
    intro:
      'Central Texas heat, Austin-metro school calendars, and tech/corporate transfer cycles set residential peaks across Williamson County.',
    items: [
      {
        title: 'Peak residential: late spring – early fall weekends',
        detail:
          'School calendars and end-of-month leases fill Saturdays across Round Rock, Georgetown villages, and Hutto growth. Book 2–4 weeks ahead for popular HOA windows.',
      },
      {
        title: 'Central Texas summer heat',
        detail:
          'Afternoon heat stresses open suburban staging. Prefer early starts, shaded staging, and heat-safe packing for electronics and sealed goods.',
      },
      {
        title: 'Tech and corporate transfer waves',
        detail:
          'Employer-driven moves can cluster around fiscal quarters and project starts. Mid-week capacity still competes with residential peaks in summer.',
      },
    ],
  },
  specialized: [
    {
      id: 'tech-suburb-hoa',
      title: 'Tech-suburb HOA & Round Rock logistics',
      intro:
        'Williamson County’s volume problem is often planned-community paperwork plus tech-driven transfer demand along the I-35 north spine.',
      bullets: [
        'Collect HOA COI, gate lists, and approved hours before the survey is final — many villages will turn crews away without paperwork.',
        'Corporate transfers may need inventory lists and elevator reservations for multi-unit product near employment corridors.',
        'Prefer early starts in peak summer heat on open suburban streets.',
        'If either address ties to Travis County employment, map peak commute timing into the rate card conversation.',
      ],
    },
    {
      id: 'i35-north-freeflow',
      title: 'I-35 north freeflow logistics',
      intro:
        'Williamson’s defining metro relationship is the I-35 / SH-130 / US-183 / SH-45 / RM-620 stack into Travis — freer than central Austin, still a line item.',
      bullets: [
        'Price Round Rock ↔ Georgetown and Round Rock ↔ Cedar Park-edge pairs with honest portal-to-portal time.',
        'Build peak I-35 and school-traffic buffer into weekday afternoons and Friday evenings.',
        'Ask whether cross-county pairs into Travis still use a pure local rate card or a long-local schedule.',
        'Toll vs non-toll routing on 130/45 can change billable minutes — confirm how drive time is priced.',
      ],
    },
    {
      id: 'heat-growth-peaks',
      title: 'Heat & growth-peak calendars',
      intro:
        'Central Texas heat plus school and tech-transfer peaks compress productive windows that mild-weather rate cards underweight.',
      bullets: [
        'Prefer early-morning starts in peak summer; treat mid-afternoon loads as high risk.',
        'Book May–August Saturdays 2–4 weeks ahead for family HOA corridors.',
        'Confirm new-construction access the week of the move in Hutto and east growth sections.',
        'Request shaded staging and heat-safe packing for electronics and sealed goods.',
      ],
    },
  ],
  relocation: {
    title: 'Schools & hospitals for relocators',
    intro:
      'Compressed secondary-market notes — primary districts and acute-care access that affect move-in. Not a full Tier 1 lifestyle essay.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & education',
        intro:
          'Williamson County spans multiple districts (e.g., Round Rock ISD, Georgetown ISD, Hutto ISD, Leander ISD portions, Liberty Hill ISD, Taylor ISD, and others). Match every listing address to the correct district.',
        bullets: [
          {
            title: 'Town-first district check',
            detail:
              'Use official district boundary tools and TEA resources. Marketing city names and master-planned villages can span feeders.',
          },
          {
            title: 'Growth vs established systems',
            detail:
              'Enrollment pressures differ between rapid east villages and longer-established Round Rock or Georgetown corridors — do not treat county averages as neighborhood truth.',
          },
          {
            title: 'Research tools',
            detail:
              'District sites and TEA data should lead; third-party rankings are secondary signals only.',
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
              'Baylor Scott & White Round Rock, St. David’s Georgetown, Ascension Seton Williamson, and other north-metro campuses cover much of the county — map ER drive times at rush hour from your target neighborhood.',
          },
          {
            title: 'Austin specialty spillover',
            detail:
              'Many residents use Travis County specialty systems. Confirm insurer networks and realistic I-35 / 183 appointment drive times.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Williamson County resources',
    intro:
      'Local official links first. TxDMV, FMCSA, and Move Trust Hub tools are added automatically for licensing checks.',
    items: [
      {
        label: 'Williamson County',
        href: 'https://www.wilco.org/',
        note: 'County services hub',
        external: true,
      },
      {
        label: 'City of Round Rock',
        href: 'https://www.roundrocktexas.gov/',
        external: true,
      },
      {
        label: 'City of Georgetown',
        href: 'https://georgetown.org/',
        external: true,
      },
      {
        label: 'City of Hutto',
        href: 'https://www.huttotx.gov/',
        external: true,
      },
      {
        label: 'TxDOT — road conditions & construction',
        href: 'https://www.txdot.gov/',
        note: 'Check I-35 and corridor delays for long locals',
        external: true,
      },
    ],
  },
  directoryHint:
    'Filter by zone (Round Rock, Georgetown, Cedar Park/Leander edge, Hutto/Taylor east growth) when available. Confirm HOA/COI for tech-suburb villages, Square access photos for Georgetown historic stock, and honest I-35 north freeflow time — this is an Austin north collar, not a renamed Travis pack. Parent market: Travis guide for Austin-core context.',
  lastReviewed: '2026-07-24',
});

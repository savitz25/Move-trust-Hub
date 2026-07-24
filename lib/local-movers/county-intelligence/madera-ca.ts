import {
  finalizeCaTier2Pack,
  CA_TIER2_BHGS_BULLET,
} from '@/lib/local-movers/county-intelligence/ca-tier2-shared';

/**
 * Madera County — California Tier 2 (Madera–Chowchilla Fresno north collar).
 * Parent: Fresno County. Ag + newer suburban growth on Hwy 99 —
 * NOT a renamed Fresno pack.
 */
export const maderaCountyIntelligence = finalizeCaTier2Pack({
  countySlug: 'madera',
  hubTitle: 'Madera County Moving Intelligence Hub',
  eyebrow: 'Madera County · Madera–Chowchilla Fresno north collar',
  h1: 'Moving in Madera County: Fresno North Collar, CA-99 Growth & Ag-Edge Logistics',
  heroOpener:
    'Madera County is the Fresno metro’s north collar — Madera and Chowchilla on the CA-99 spine, newer suburban growth, and ag-edge towns — not Fresno County with the city names swapped. Madera city mixes multi-unit, mid-century, and planned growth; Chowchilla runs small-city and family volume north on 99; CA-145, CA-41, CA-152, and CA-233 feed valley and foothill pairs toward Yosemite approaches and farm edges. Valley heat, harvest freight, and empty miles to Fresno/Clovis define the bill more than coastal HOA soft costs. Quote the pocket: Madera growth tract, Chowchilla SFH, ag-edge ranch, or Oakhurst/foothill approach — never “Madera County local” alone, and never a Fresno rate card with the county line ignored.',
  heroCredibility:
    'Fresno north collar · CA-99 growth · Ag-edge logistics · BHGS in-state · FMCSA interstate · Curated listings',
  majorCorridors: 'CA-99 · CA-145 · CA-41 · CA-152 · CA-233',
  parentCompare: {
    parentLabel: 'Fresno County',
    parentHref: '/local-movers/california/fresno',
    title: 'How Madera County differs from Fresno County',
    intro:
      'Madera is the north-collar secondary market above Fresno–Clovis — shared valley heat and 99 rhythm, different city inventory, smaller multi-unit core, and its own foothill edge. Use this when one address sits in Fresno County and the other in Madera.',
    bullets: [
      {
        title: 'Corridor & drive time',
        detail:
          'CA-99 is the spine through Madera and Chowchilla toward Fresno; CA-145 and CA-233 feed local and west-valley pairs; CA-41 and CA-152 open foothill and west approaches. Madera ↔ Clovis/Fresno is a metro-timing long local at peak — freer than coastal basins, still billable. Oakhurst-class foothill legs add grade and tourist traffic Fresno floor scripts underweight.',
      },
      {
        title: 'Housing differences',
        detail:
          'Madera growth tracts and multi-unit, Chowchilla small-city SFH, farm-edge homes with sheds, and foothill stock toward Oakhurst replace Fresno Tower District density and Clovis master-planned volume at scale. You get collar suburban product and ag edges — not a full Fresno zone dump under a new label.',
      },
      {
        title: 'Truck access, HOA & density',
        detail:
          'Most volume stages on driveways and suburban streets. HOAs appear in newer Madera growth pockets — real paperwork, thinner than Clovis village density. Ag gates, unpaved approaches, and foothill grades replace central Fresno multi-unit elevator fights as the hard cases.',
      },
      {
        title: 'Cost posture',
        detail:
          'Same-zone Madera jobs can look secondary-market simple until heat and long carries hit. Cross-county pairs into Fresno/Clovis and foothill long-locals raise the bill above pure in-town Madera quotes. Do not assume Fresno metro rates transfer without naming both cities and corridors.',
      },
      {
        title: 'Market role',
        detail:
          'Fresno north collar: residential growth and ag logistics with spillover ties to Fresno–Clovis employment — not an independent mid-metro clone of Fresno and not a foothill resort brochure. Popular routes bias to Fresno County and nearby valley secondaries.',
      },
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Madera County different',
    intro:
      'North-collar realities — CA-99 growth vs ag edges, valley heat, foothill approaches, and California licensing — that a renamed Fresno pack would miss.',
    bullets: [
      {
        title: 'Madera growth, Chowchilla, and foothill edges are different products',
        detail:
          'Planned suburban tracts, small-city SFH, farm parcels, and Oakhurst-approach homes do not share truck access. Name both cities — “Madera County local” fails across 99 vs 41/145 last-mile.',
      },
      {
        title: 'CA-99 freeflow to Fresno is still clock time',
        detail:
          'Many households pair addresses with Fresno or Clovis. Peak 99 and arterial delays are billable. Ask how portal-to-portal time is priced across the county line.',
      },
      {
        title: 'Ag economy shapes edge logistics',
        detail:
          'Harvest traffic, equipment sheds, and unpaved approaches are normal outside newer growth. Inventory outbuildings on the survey so crews size labor correctly.',
      },
      {
        title: 'Valley heat compresses productive hours',
        detail:
          'June–September afternoons on the floor frequently top 100°F+. Prefer 6–10 a.m. starts — Fresno heat habits apply; foothill legs can still run hot and tourist-busy.',
      },
      CA_TIER2_BHGS_BULLET,
    ],
  },
  zonesIntro:
    'Four sharp zones — Madera city/growth, Chowchilla north 99, ag-edge valley towns, and foothill/Yosemite approaches. Not a Fresno zone dump with new labels.',
  zones: [
    {
      id: 'madera-city-growth',
      name: 'Madera City & Newer Growth Corridors',
      shortName: 'Madera',
      neighborhoods: [
        'Downtown Madera',
        'Central Madera multi-unit',
        'North / east growth tracts',
        'Avenue 12 / 99 corridor edges',
      ],
      housingTypes:
        'Mid-century SFH, multi-unit, newer suburban tracts, some HOA pockets in growth villages',
      challenges: [
        'CA-99 peaks toward Fresno',
        'Multi-unit long carries and parking limits',
        'HOA COI in newer growth pockets',
        'Summer heat on open staging',
      ],
      moverTips:
        'Confirm multi-unit and HOA rules early. Prefer dawn starts in peak summer. Price Madera ↔ Fresno/Clovis with honest 99 portal time, not brochure miles.',
      cityKeywords: [
        'madera',
        'downtown madera',
        'north madera',
        'east madera',
        'avenue 12',
      ],
    },
    {
      id: 'chowchilla-north99',
      name: 'Chowchilla & North CA-99 Corridor',
      shortName: 'Chowchilla',
      neighborhoods: [
        'Chowchilla',
        'North 99 residential edges',
        'Fairmead edge',
      ],
      housingTypes:
        'Small-city SFH, multi-family, family-volume tracts, highway-adjacent edges',
      challenges: [
        'Longer empty miles from Fresno staging',
        'CA-99 freight and commute mix',
        'Heat + school-calendar family volume',
        'Cross-town peaks toward Madera',
      ],
      moverTips:
        'Treat Chowchilla ↔ Madera or Fresno as timed 99 locals. Book family SFH Saturdays early in late spring–summer. Early starts beat heat and harvest freight.',
      cityKeywords: [
        'chowchilla',
        'fairmead',
        'north 99',
        'north madera county',
      ],
    },
    {
      id: 'ag-edge-valley',
      name: 'Ag-Edge Valley Towns & Farm Parcels',
      shortName: 'Ag-edge',
      neighborhoods: [
        'Madera Ranchos edge',
        'West / east valley farm edges',
        'CA-145 / CA-233 rural corridors',
        'Unincorporated ag parcels',
      ],
      housingTypes:
        'Rural-edge SFH, ranch and farm homes, manufactured stock, outbuildings and shops',
      challenges: [
        'Unpaved or constrained rural driveways',
        'Gates, soft shoulders, and equipment yards',
        'Harvest-season arterial delay',
        'Heat with limited shade on open lots',
      ],
      moverTips:
        'Access-first: road width, gate codes, and surface photos. Inventory sheds and shops. Build harvest freight buffer mid-day on valley roads.',
      cityKeywords: [
        'madera ranchos',
        'ag edge',
        'rural madera',
        'ca-145',
        'ca-233',
      ],
    },
    {
      id: 'foothill-approaches',
      name: 'Foothill & Yosemite Approaches (CA-41 / Oakhurst edge)',
      shortName: 'Foothill',
      neighborhoods: [
        'Oakhurst',
        'Coarsegold edge',
        'CA-41 mountain approaches',
        'Eastern foothill pockets',
      ],
      housingTypes:
        'Foothill SFH, cabin-style and recreation-adjacent stock, longer-driveway hillside homes',
      challenges: [
        'Grades, curves, and limited turnaround',
        'Tourist traffic on CA-41 peak seasons',
        'Long empty miles from valley-floor staging',
        'Not interchangeable with Madera city tracts',
      ],
      moverTips:
        'Never assume valley-floor truck assumptions transfer — measure grades and turnaround. Price Oakhurst-class pairs as long locals. Prefer mid-week starts outside peak visitor weekends when flexible.',
      cityKeywords: [
        'oakhurst',
        'coarsegold',
        'ca-41',
        'yosemite approach',
        'foothill madera',
      ],
    },
  ],
  costDrivers: {
    title: 'Pricing & cost drivers inside Madera County',
    intro:
      'Same square footage prices differently by heat window, CA-99 cross-county time into Fresno, ag-edge access, and foothill empty miles.',
    drivers: [
      {
        title: 'CA-99 collar time into Fresno / Clovis',
        detail:
          'Madera or Chowchilla ↔ Fresno metro pairs burn more portal-to-portal time than map miles suggest at peak. Hourly billing follows the clock.',
      },
      {
        title: 'Heat-constrained work windows',
        detail:
          'Summer heat compresses productive hours into mornings. Jobs that slip into peak afternoon heat may need more labor days or premium scheduling.',
      },
      {
        title: 'Ag-edge & foothill access',
        detail:
          'Unpaved approaches, outbuildings, grades, and tourist-corridor delay add labor and vehicle risk — price them explicitly versus pure Madera growth-tract jobs.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (same zone, simple access)',
        value: '$450–$1,200+',
        note: 'Higher with multi-unit long carries or peak heat windows',
      },
      {
        label: '2–3BR house / growth tract',
        value: '$1,300–$3,400+',
        note: 'Cross-county 99 pairs and HOA soft costs trend up',
      },
      {
        label: '3–4+ BR (ag-edge / foothill / long-local)',
        value: '$2,000–$5,500+',
        note: 'Farm last-mile and Oakhurst-class pairs price highest',
      },
    ],
  },
  seasonal: {
    title: 'Seasonal & heat calendar intelligence',
    intro:
      'Madera peaks follow valley heat, school calendars, harvest freight, and foothill visitor seasons — not coastal marine layers.',
    items: [
      {
        title: 'Summer heat peak: roughly June – September',
        detail:
          'Plan early-morning loads, extra water, and heat-safe packing on the valley floor. Mid-afternoon moves in peak heat are high risk.',
      },
      {
        title: 'School & family calendars (Madera / Chowchilla)',
        detail:
          'Late spring through early fall weekends fill first for family SFH moves. Book 2–4 weeks ahead for popular Saturdays.',
      },
      {
        title: 'Harvest freight & foothill tourism',
        detail:
          'Ag peaks congest valley arterials; CA-41 visitor seasons tighten foothill approaches. Prefer mid-week mornings for constrained corridors when lease windows allow.',
      },
    ],
  },
  specialized: [
    {
      id: 'ca99-collar',
      title: 'CA-99 Fresno north-collar logistics',
      intro:
        'Madera’s defining metro relationship is the 99 spine into Fresno–Clovis — freer than coastal basins, still a line item.',
      bullets: [
        'Price Madera/Chowchilla ↔ Fresno or Clovis as portal-to-portal collar jobs.',
        'Build peak 99 and school-traffic buffer into weekday afternoons and Friday evenings.',
        'Ask whether cross-county pairs still use a pure local rate card or a long-local schedule.',
      ],
    },
    {
      id: 'ag-heat',
      title: 'Ag-edge access & valley heat logistics',
      intro:
        'Farm parcels and 100°F+ afternoons define edge jobs that growth-tract quotes underprice.',
      bullets: [
        'Prefer 6–10 a.m. starts in peak summer; treat mid-afternoon loads as high risk.',
        'Note sheds, shops, gates, and unpaved approaches on the survey before dispatch.',
        'Build buffer for harvest freight mid-day on valley arterials.',
        'Request shaded staging and heat-safe packing for electronics and sealed goods.',
      ],
    },
    {
      id: 'foothill-yosemite',
      title: 'Foothill / Yosemite-approach access',
      intro:
        'Oakhurst and CA-41 edges are elevation and tourism products — not Madera city cul-de-sacs renamed.',
      bullets: [
        'Verify grades, road width, and turnaround before dispatching a full-size truck.',
        'Prefer mid-week starts outside peak visitor weekends when flexible.',
        'Price valley-floor ↔ foothill pairs with honest empty-mile and grade time.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Madera County?',
    intro:
      'Compressed relocator notes — validate schools and healthcare by pocket, then test 99 commute into Fresno–Clovis and heat tolerance for the address you actually want.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & education',
        intro:
          'Major systems include Madera Unified and Chowchilla Elementary / high-school networks, plus foothill and rural districts. Match every listing address to the correct boundary.',
        bullets: [
          {
            title: 'City vs collar vs foothill districts',
            detail:
              'Madera city, Chowchilla, and Oakhurst-area addresses often fall in different systems. Marketing names and new tracts can span feeders — verify with official boundary tools and the California School Dashboard.',
          },
          {
            title: 'Fresno County spillover',
            detail:
              'Some households compare Madera collar options with Fresno/Clovis schools. Do not assume county averages or neighboring-city reputation transfer to a specific street.',
          },
        ],
      },
      {
        id: 'hospitals',
        title: 'Hospitals & healthcare',
        bullets: [
          {
            title: 'Local & metro acute-care anchors',
            detail:
              'Madera Community Hospital and greater Fresno–Clovis campuses (including Community Regional and Clovis Community) serve different acuity needs — map ER drive times at rush hour from your target neighborhood, including 99 peaks into Fresno.',
          },
          {
            title: 'Specialty & foothill access',
            detail:
              'Foothill and far-ag edges may mean longer drives into Madera or Fresno for specialty care. Confirm insurer networks and realistic appointment times on 99/41/145.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Madera County resources',
    intro:
      'Local official links first. BHGS, FMCSA, and Move Trust Hub tools are added automatically for licensing checks.',
    items: [
      {
        label: 'County of Madera',
        href: 'https://www.maderacounty.com/',
        note: 'County services hub',
        external: true,
      },
      {
        label: 'City of Madera',
        href: 'https://www.madera.gov/',
        external: true,
      },
      {
        label: 'City of Chowchilla',
        href: 'https://www.cityofchowchilla.org/',
        external: true,
      },
    ],
  },
  directoryHint:
    'Filter by zone (Madera, Chowchilla, Ag-edge, Foothill) when available. Confirm heat-window plans, CA-99 cross-county drive assumptions into Fresno, and ag/foothill access photos — this is a north collar market, not a renamed Fresno pack. Parent market: Fresno guide for metro context.',
  lastReviewed: '2026-07-24',
});

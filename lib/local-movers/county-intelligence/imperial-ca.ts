import {
  finalizeCaTier2Pack,
  CA_TIER2_BHGS_BULLET,
} from '@/lib/local-movers/county-intelligence/ca-tier2-shared';

/**
 * Imperial County — California Tier 2 (Imperial Valley border / ag market).
 * Parent: San Diego County. Extreme heat, ag/industrial, border-adjacent logistics —
 * NOT a generic rural stub and NOT a San Diego suburb rename.
 */
export const imperialCountyIntelligence = finalizeCaTier2Pack({
  countySlug: 'imperial',
  hubTitle: 'Imperial County Moving Intelligence Hub',
  eyebrow: 'Imperial County · Imperial Valley border / ag market',
  h1: 'Moving in Imperial County: Imperial Valley Heat, Ag Logistics & Border-Adjacent Access',
  heroOpener:
    'Imperial County is the Imperial Valley’s border-and-agriculture market — not San Diego County’s inland suburb with hotter weather, and not a generic rural California stub. El Centro, Imperial, Brawley, Calexico, and Holtville run on extreme desert heat, farm and packing logistics, and border-adjacent commercial rhythm. I-8 links west toward San Diego County; CA-86, CA-111, CA-98, and CA-78 stitch valley towns and north-valley edges under 110°F+ summer afternoons that rewrite start times. Ag sheds, industrial-edge housing, and long empty miles between towns define last-mile more than coastal HOA packets. Quote the pocket: El Centro multi-unit, Calexico border-edge, Brawley farm-town, or open-lot ag parcel — never “Imperial County local” alone.',
  heroCredibility:
    'Imperial Valley secondary · Extreme heat · Ag / border logistics · BHGS in-state · FMCSA interstate · Curated listings',
  majorCorridors: 'I-8 · CA-86 · CA-111 · CA-98 · CA-78',
  parentCompare: {
    parentLabel: 'San Diego County',
    parentHref: '/local-movers/california/san-diego',
    title: 'How Imperial County differs from San Diego County',
    intro:
      'Imperial is a freestanding desert valley market east of San Diego County — ag, heat, and border logistics, not coastal density or North County HOA product. Use this when one address sits in San Diego County and the other in Imperial.',
    bullets: [
      {
        title: 'Corridor & drive time',
        detail:
          'I-8 is the west approach toward San Diego County; CA-86 and CA-111 are valley spines through El Centro, Imperial, Brawley, and Calexico; CA-98 and CA-78 feed south and north-valley pairs. Imperial ↔ San Diego metro is a long inter-regional haul across heat and grades — not a city-block local. In-valley town pairs still burn portal time under freight and harvest traffic.',
      },
      {
        title: 'Housing differences',
        detail:
          'Valley-floor SFH, small-city multi-unit, farm-edge homes with sheds, and border-adjacent stock replace San Diego coastal multifamily, hillside, and master-planned North County villages. Shade, cooling capacity, and unpaved approaches matter more than elevator COI culture.',
      },
      {
        title: 'Truck access, density & constraints',
        detail:
          'Most volume stages on driveways, open lots, and small-city streets — freer curb than San Diego cores, harsher heat and dust. Ag gates, packing-plant adjacency, and border commercial traffic replace canyon grades and coastal permit wars. Calexico-edge jobs need realistic border-corridor timing.',
      },
      {
        title: 'Cost posture',
        detail:
          'Local valley quotes often sit below San Diego coastal rates for simple access — extreme heat windows, town-to-town empty miles, and ag-edge inventory push premiums. Long-haul west on I-8 is distance and climate honesty, not a San Diego “local plus desert” rate card.',
      },
      {
        title: 'Market role',
        detail:
          'Imperial Valley secondary: agriculture, logistics, healthcare, and border-adjacent commerce with its own housing ladder. Popular long-haul context points to San Diego County and other inland secondaries — not a renamed San Diego suburb product.',
      },
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Imperial County different',
    intro:
      'Valley realities — extreme heat, ag and industrial last-mile, border-adjacent corridors, and California licensing — that coastal San Diego scripts miss.',
    bullets: [
      {
        title: '110°F+ heat is an operational constraint, not a footnote',
        detail:
          'Peak summer afternoons regularly destroy unshaded work windows. Prefer dawn starts, shaded staging, heat-safe packing for electronics and sealed goods, and treat mid-afternoon loads as high risk — marine-layer San Diego habits do not transfer.',
      },
      {
        title: 'El Centro / Calexico / Brawley are different products',
        detail:
          'Metro multi-unit, border-edge streets, and farm-town SFH do not share truck access or commercial traffic. Name both cities on the estimate — “Imperial County local” fails across CA-86/111 and I-8 approaches.',
      },
      {
        title: 'Ag & industrial last-mile is normal',
        detail:
          'Packing houses, field schedules, equipment sheds, and unpaved final approaches are survey items. Build buffer for harvest and commercial truck volume on valley arterials.',
      },
      {
        title: 'Border-adjacent logistics reshape timing',
        detail:
          'Calexico and south-valley corridors mix household moves with cross-border commercial rhythm. Peak freight and inspection-related delays are billable — not map-mile footnotes.',
      },
      CA_TIER2_BHGS_BULLET,
    ],
  },
  zonesIntro:
    'Four sharp zones — El Centro metro, Calexico border edge, Brawley/north valley, and ag-edge / canal-country parcels. Heat and empty miles define the job more than generic “desert rural” advice.',
  zones: [
    {
      id: 'el-centro-metro',
      name: 'El Centro Metro & Central Valley Floor',
      shortName: 'El Centro',
      neighborhoods: [
        'Downtown El Centro',
        'Central El Centro multi-unit',
        'Imperial (city)',
        'West El Centro / I-8 approaches',
      ],
      housingTypes:
        'Small-city SFH, multi-unit and apartments, mid-century tracts, commercial-adjacent residential',
      challenges: [
        'Extreme heat on open staging lots',
        'I-8 / arterial peaks into the core',
        'Multi-unit long carries and limited shade',
        'Cross-town pairs toward Calexico or Brawley at freight peaks',
      ],
      moverTips:
        'Dawn starts are non-negotiable in peak summer. Confirm multi-unit parking and elevator status. Price El Centro ↔ Calexico or Brawley as timed valley locals with heat and freight buffer.',
      cityKeywords: [
        'el centro',
        'imperial',
        'downtown el centro',
        'city of imperial',
      ],
    },
    {
      id: 'calexico-border',
      name: 'Calexico & South Valley Border Edge',
      shortName: 'Calexico',
      neighborhoods: [
        'Calexico',
        'South El Centro / CA-111 approaches',
        'Border-adjacent commercial edges',
      ],
      housingTypes:
        'Small-city SFH, multi-family, denser border-edge blocks, commercial-adjacent stock',
      challenges: [
        'Border commercial traffic and peak congestion',
        'Tighter street staging on some blocks',
        'Heat + dust on open approaches',
        'CA-98 / CA-111 timing into El Centro',
      ],
      moverTips:
        'Build border-corridor delay into Calexico pairs. Prefer early mid-week starts. Share parking distance and long-carry needs on denser blocks. Heat plans still dominate even when the map looks short.',
      cityKeywords: [
        'calexico',
        'south valley',
        'ca-98',
        'ca-111',
        'border',
      ],
    },
    {
      id: 'brawley-north',
      name: 'Brawley, Holtville & North / East Valley Towns',
      shortName: 'Brawley / East',
      neighborhoods: [
        'Brawley',
        'Holtville',
        'Westmorland edge',
        'CA-78 / CA-111 north approaches',
      ],
      housingTypes:
        'Farm-town SFH, multi-family, older grid stock, ag-adjacent edges',
      challenges: [
        'Longer empty miles from El Centro staging',
        'Agricultural and commercial truck traffic',
        'Heat + limited shaded staging',
        'Harvest-season arterial delay',
      ],
      moverTips:
        'Treat town-to-metro pairs as long locals with honest portal-to-portal time. Note sheds and farm access on the survey. Early starts protect crews when valley temperatures climb fast.',
      cityKeywords: [
        'brawley',
        'holtville',
        'westmorland',
        'north valley',
        'east valley',
      ],
    },
    {
      id: 'ag-industrial-edge',
      name: 'Ag-Edge, Canal Country & Industrial Last-Mile',
      shortName: 'Ag / Industrial',
      neighborhoods: [
        'Rural Imperial Valley parcels',
        'Canal- and field-adjacent homes',
        'Packing / industrial residential edges',
        'Salton / north-county approaches (limited density)',
      ],
      housingTypes:
        'Farm- and ranch-edge homes, manufactured stock, outbuildings, industrial-adjacent residential',
      challenges: [
        'Unpaved or constrained rural driveways',
        'Gates, soft shoulders, and equipment yards',
        'Extreme heat with almost no shade',
        'Seasonal ag traffic and dust',
      ],
      moverTips:
        'Access-first: road width, gate codes, and surface photos before dispatch. Inventory sheds and shops explicitly. Discuss heat rotation and water plans as labor quality items, not comfort extras.',
      cityKeywords: [
        'ag edge',
        'rural imperial',
        'canal',
        'niland',
        'salton',
        'seeley',
      ],
    },
  ],
  costDrivers: {
    title: 'Pricing & cost drivers inside Imperial County',
    intro:
      'Same square footage prices differently by heat window, town-to-town valley distance, and whether the job is small-city driveway or ag-edge last-mile.',
    drivers: [
      {
        title: 'Heat-compressed work windows',
        detail:
          'Peak summer heat collapses productive hours into early mornings. Jobs that slip into afternoon heat may need more labor days or premium scheduling.',
      },
      {
        title: 'Valley town-to-town & I-8 long-local distance',
        detail:
          'El Centro ↔ Brawley/Calexico and valley ↔ San Diego County pairs burn more portal time than map miles suggest under freight and heat. Hourly billing follows the clock.',
      },
      {
        title: 'Ag / industrial access & outbuildings',
        detail:
          'Longer approaches, sheds, gates, and dust/dirt staging add labor and vehicle risk — price them explicitly versus pure suburban driveway jobs.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (same zone, simple access)',
        value: '$450–$1,200+',
        note: 'Higher with multi-unit long carries or peak heat windows',
      },
      {
        label: '2–3BR house / small-city tract',
        value: '$1,200–$3,200+',
        note: 'Town-to-town hauls and heat windows trend up',
      },
      {
        label: '3–4+ BR (ag-edge / cross-valley / long-local)',
        value: '$1,900–$5,200+',
        note: 'Rural last-mile and I-8 long-locals price highest',
      },
    ],
  },
  seasonal: {
    title: 'Seasonal & heat calendar intelligence',
    intro:
      'Imperial peaks follow extreme heat, school calendars, and ag rhythm — not coastal marine layers or San Diego lease density alone.',
    items: [
      {
        title: 'Extreme heat peak: roughly May – September',
        detail:
          'Plan dawn loads, extra water, shaded staging, and heat-safe packing. Mid-afternoon moves in peak heat are high risk for people and property.',
      },
      {
        title: 'Harvest & packing seasons',
        detail:
          'Agricultural peaks increase commercial truck volume on valley arterials. Build freight buffer into mid-day town pairs when harvest is active.',
      },
      {
        title: 'Best value: mid-month Tue–Thu, earliest start',
        detail:
          'Early starts win year-round; they are mandatory in peak summer. Shoulder-season mornings still beat heat and school traffic.',
      },
    ],
  },
  specialized: [
    {
      id: 'extreme-heat',
      title: 'Imperial Valley extreme-heat logistics',
      intro:
        'Imperial’s defining operational constraint is desert-valley heat that coastal San Diego crews and mild-weather rate cards systematically underweight.',
      bullets: [
        'Prefer earliest legal starts in peak summer; treat mid-afternoon loads as high risk.',
        'Request shaded staging and heat-safe packing for electronics, candles, and sealed goods.',
        'Plan water, rotation, and realistic crew endurance — heat is a labor and quality issue.',
        'If the job runs long, discuss split-day options rather than pushing into peak heat.',
      ],
    },
    {
      id: 'ag-industrial-border',
      title: 'Ag, industrial & border-adjacent last-mile',
      intro:
        'Farm edges, packing corridors, and Calexico-adjacent commercial rhythm are not interchangeable with El Centro cul-de-sacs.',
      bullets: [
        'Price portal-to-portal time honestly for metro ↔ Brawley/Holtville/Calexico pairs.',
        'Note sheds, shops, gates, and unpaved approaches on the survey before dispatch.',
        'Build buffer for ag freight and border commercial traffic on CA-86/111/98 corridors.',
        'Ask whether valley-to-San Diego pairs still use a pure local rate card or a long-local schedule.',
      ],
    },
    {
      id: 'dust-open-lot',
      title: 'Dust, open-lot & desert staging logistics',
      intro:
        'Open valley lots and dirt approaches create packing and equipment risks coastal jobs rarely price.',
      bullets: [
        'Flag dust-sensitive inventories and request extra protection for electronics and upholstery.',
        'Confirm truck surface suitability when final approach is dirt or soft shoulder.',
        'Plan wind-aware staging on exposed lots — tarps and load order matter more than in shaded suburbs.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Imperial County?',
    intro:
      'Compressed relocator notes — validate schools and healthcare by town, then plan for extreme heat and realistic I-8 drive times toward San Diego County.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & education',
        intro:
          'Multiple systems (El Centro–area, Calexico, Brawley, Holtville, Imperial, and other valley districts). Match every listing address to the correct boundary.',
        bullets: [
          {
            title: 'Town-first district check',
            detail:
              'Use official district tools and the California School Dashboard. Marketing city names and unincorporated farm edges can span feeders.',
          },
          {
            title: 'Valley towns are not one system',
            detail:
              'Enrollment pressure and program mix differ by community. Do not treat county averages as neighborhood truth.',
          },
        ],
      },
      {
        id: 'hospitals',
        title: 'Hospitals & healthcare',
        bullets: [
          {
            title: 'Acute-care anchors',
            detail:
              'El Centro Regional Medical Center, Pioneers Memorial (Brawley), and other valley facilities serve different pockets — map ER drive times in heat and peak traffic from your target town.',
          },
          {
            title: 'Specialty spillover',
            detail:
              'Some households use San Diego County specialty networks. Confirm insurer networks and realistic I-8 appointment times before choosing a far-north or far-east valley address.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Imperial County resources',
    intro:
      'Local official links first. BHGS, FMCSA, and Move Trust Hub tools are added automatically for licensing checks.',
    items: [
      {
        label: 'County of Imperial',
        href: 'https://www.co.imperial.ca.us/',
        note: 'County services hub',
        external: true,
      },
      {
        label: 'City of El Centro',
        href: 'https://www.cityofelcentro.org/',
        external: true,
      },
      {
        label: 'City of Calexico',
        href: 'https://www.calexico.ca.gov/',
        external: true,
      },
    ],
  },
  directoryHint:
    'Filter by zone (El Centro, Calexico, Brawley/East, Ag/Industrial) when available. Confirm heat-window plans, ag-edge access photos, and border-corridor timing — this is an Imperial Valley market, not a San Diego suburb rename. Parent market: San Diego guide for long-haul context.',
  lastReviewed: '2026-07-24',
});

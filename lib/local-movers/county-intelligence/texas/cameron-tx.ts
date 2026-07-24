import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeTxTier2Pack,
  TX_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/texas/tx-tier2-shared';

/**
 * Cameron County — Texas Tier 2 (Brownsville / South RGV).
 * Secondary-market contract vs Hidalgo (north RGV) parent — coastal-adjacent
 * border logistics and Brownsville–Harlingen product, not a McAllen clone.
 */
export const cameronCountyIntelligence: CountyIntelligencePack = finalizeTxTier2Pack({
  countySlug: 'cameron',
  hubTitle: 'Cameron County Moving Intelligence Hub',
  eyebrow: 'Cameron County · Brownsville / South RGV · coastal-adjacent border',
  h1: 'Moving in Cameron County: South RGV — Brownsville Border Logistics, Harlingen & Coastal-Adjacent Heat',
  heroOpener:
    'Cameron County is the South Rio Grande Valley — Brownsville border logistics, Harlingen mid-Valley product, and coastal-adjacent edges toward South Padre approaches — not McAllen with a different nameplate. Compared with Hidalgo County’s north RGV medical/retail polycentric core, Cameron runs more port/bridge-adjacent freight, Gulf humidity on open staging, and dual Brownsville–Harlingen routing under the same extreme heat calendar. This guide is for people moving in Cameron as a south RGV market with its own role — not a recycled Hidalgo McAllen script.',
  heroCredibility:
    'Brownsville / South RGV · Border logistics · Coastal-adjacent heat · TxDMV household goods (intrastate) · FMCSA when interstate · Curated listings',
  majorCorridors: 'I-69E · US-77 · US-83 · SH-48 · local Brownsville–Harlingen grid',
  parentCompare: {
    parentLabel: 'Hidalgo County',
    parentHref: '/local-movers/texas/hidalgo',
    title: 'Compared with Hidalgo County (north RGV)',
    intro:
      'Cameron is the south RGV — Brownsville, Harlingen, San Benito, and coastal-adjacent approaches — not a drop-in template for McAllen medical-corridor apartments, Edinburg campus product, or Mission west growth. Use Hidalgo as the north RGV parent contrast.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'Hidalgo crews stitch Mission ↔ Edinburg ↔ McAllen on US-83 / I-2 and I-69C. Cameron pairs ride I-69E, US-77, US-83, SH-48, and the local Brownsville–Harlingen grid — freer mid-day than Triangle basins, still peak-heavy on Brownsville ↔ Harlingen and bridge-adjacent freight windows. Portal-to-portal time is real; it is not a short McAllen medical-district hop.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'Hidalgo’s ladder is McAllen multi-family/medical, Mission residential, Edinburg campus/government, and rural/ag edges. Cameron’s ladder is Brownsville core and bridge-adjacent stock, Harlingen mid-county suburban and multi-family, San Benito in-town grids, and coastal-adjacent / Padre-approach edges — more port and gulf-edge product, less McAllen medical default.',
      },
      {
        title: 'Truck access, HOA & density',
        detail:
          'Both counties stage driveway and multi-unit work under Valley heat. Cameron adds more bridge/port freight adjacency, SH-48 coastal approaches, and dual-city (Brownsville–Harlingen) spacing than Hidalgo’s tighter McAllen–Mission cluster. Soft edges and incomplete paving remain first-class constraints on both sides of the Valley.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local Cameron quotes often sit near Hidalgo secondary-market levels for comparable square footage when access is simple — heat windows, Brownsville ↔ Harlingen empty miles, multi-unit COI, and coastal-edge access still push prices up. Expect south RGV labor rates with dual-city distance and border logistics friction as the main premiums, not north RGV medical-corridor density alone.',
      },
      {
        title: 'Role difference',
        detail:
          'Cameron is the south RGV gateway — port, international bridges, and coastal-adjacent tourism/residential mix — not Hidalgo’s north RGV medical/retail hub. Treat it as its own Valley market when matching crews and rate cards.',
      },
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Cameron County different',
    intro:
      'South RGV realities — Brownsville border logistics, dual Brownsville–Harlingen routing, coastal-adjacent humidity, and freer 69E/77 corridors than Triangle parents — that change estimates vs north RGV McAllen scripts.',
    bullets: [
      {
        title: 'Border and port logistics reshape timing',
        detail:
          'Bridge-adjacent freight, port commercial traffic, and peak commercial corridors can delay trucks even when residential addresses look simple. Buffer time on I-69E / US-77 / US-83 industrial and bridge approaches — this is not a pure McAllen medical-district job.',
      },
      {
        title: 'Brownsville vs Harlingen vs coastal edges',
        detail:
          'Brownsville core density, Harlingen mid-county product, San Benito grids, and Padre-approach edges are different jobs under one county label. “Cameron local” is too vague — name both cities and access type on the estimate.',
      },
      {
        title: 'Coastal-adjacent humidity plus Valley heat',
        detail:
          'Gulf humidity stacks on extreme RGV heat. Prefer earliest morning load windows in peak summer; protect inventory from moisture and grit — inland McAllen habits do not transfer one-for-one to open coastal-adjacent staging.',
      },
      {
        title: 'I-69E / US-77 freeflow is not Houston basin — still a line item',
        detail:
          'Brownsville ↔ Harlingen pairs freer than Triangle metros still burn billable time at school and commute peaks. Ask whether quotes are portal-to-portal.',
      },
      TX_TIER2_REG_BULLET,
    ],
  },
  zonesHeading:
    'Cameron zones: Brownsville core, Harlingen, San Benito / mid-county & coastal-adjacent edges',
  zonesIntro:
    'Four sharp products — not a six-zone dump. Brownsville border core, Harlingen mid-county, San Benito/mid grids, and coastal-adjacent/Padre approaches price and stage differently under the same south RGV heat calendar.',
  zones: [
    {
      id: 'brownsville-core',
      name: 'Brownsville core / bridge-adjacent',
      shortName: 'Brownsville',
      neighborhoods: [
        'Downtown Brownsville',
        'Central multi-unit corridors',
        'Bridge-adjacent residential belts',
        'Older in-town grids',
        'South / east Brownsville residential',
      ],
      housingTypes:
        'Older SFH, multi-unit buildings, mid-century stock, bridge-adjacent multi-family',
      challenges: [
        'Tighter street parking and multi-unit long carries',
        'Bridge / port freight peaks on approach corridors',
        'Elevator/COI rules in some multi-unit buildings',
        'Extreme heat and humidity on asphalt staging',
      ],
      moverTips:
        'Confirm building rules for multi-unit. Weekday early starts beat heat, humidity, and bridge-adjacent commercial peaks. Inventory stairs carefully in older stock. Share parking constraints on denser blocks.',
      cityKeywords: [
        'brownsville',
        'brownsville tx',
        'downtown brownsville',
        'cameron county brownsville',
      ],
    },
    {
      id: 'harlingen',
      name: 'Harlingen',
      shortName: 'Harlingen',
      neighborhoods: [
        'Downtown Harlingen',
        'North / south Harlingen residential',
        'Multi-family near employment corridors',
        'Established SFH tracts',
        'US-77 / Expressway approach neighborhoods',
      ],
      housingTypes:
        'Suburban SFH, multi-family, some HOA tracts, older in-town stock',
      challenges: [
        'US-77 / local arterial congestion at peak',
        'Cross-county pairs into Brownsville underquoted as “local”',
        'Heat on open suburban staging',
        'School-calendar Saturday demand',
      ],
      moverTips:
        'Treat Brownsville ↔ Harlingen as a classic long-local with honest portal time on I-69E / US-77 / US-83. Collect multi-unit packets when applicable. Prefer dawn starts in peak summer.',
      cityKeywords: [
        'harlingen',
        'harlingen tx',
        'harlingen residential',
      ],
    },
    {
      id: 'san-benito-mid',
      name: 'San Benito / mid-county',
      shortName: 'San Benito / mid',
      neighborhoods: [
        'San Benito',
        'Between Brownsville and Harlingen corridors',
        'In-town grids and modest SFH',
        'Growth multi-family pockets',
        'US-77 / US-83 mid-county product',
      ],
      housingTypes:
        'Modest SFH, multi-family pockets, mid-century stock, limited HOA growth',
      challenges: [
        'Underquoted mid-county pairs between major cities',
        'Varied access vs pure coastal or pure core product',
        'Heat and soft-edge approaches on outer tracts',
        'School and commute peaks on US-77',
      ],
      moverTips:
        'Name origin and destination cities explicitly. Do not price San Benito like Brownsville core multi-unit or Padre-edge access. Early starts still win in summer heat.',
      cityKeywords: [
        'san benito',
        'san benito tx',
        'mid cameron',
      ],
    },
    {
      id: 'coastal-adjacent-edges',
      name: 'Coastal-adjacent / Padre approaches',
      shortName: 'Coastal-adjacent',
      neighborhoods: [
        'South Padre Island approaches (as applicable)',
        'Laguna Vista / coastal-edge communities',
        'SH-48 corridor residential',
        'Wind- and humidity-exposed edges',
        'Tourism-adjacent multi-family pockets',
      ],
      housingTypes:
        'Coastal-adjacent SFH, multi-family, vacation/second-home stock, limited rural edges',
      challenges: [
        'Causeway / SH-48 timing and wind exposure',
        'Humidity, salt air, and heat on open staging',
        'Tourist-season congestion on peak weekends',
        'Not interchangeable with inland Brownsville driveway jobs',
      ],
      moverTips:
        'Treat island/coastal-edge pairs as first-class access types — not “Cameron local.” Build buffer for SH-48 and causeway peaks. Prefer early starts; protect inventory from humidity and grit.',
      cityKeywords: [
        'south padre',
        'laguna vista',
        'sh 48',
        'padre island cameron',
        'coastal brownsville',
      ],
    },
  ],
  costDrivers: {
    title: 'Pricing & cost drivers inside Cameron County',
    intro:
      'Same square footage prices differently by heat/humidity window, multi-unit COI, Brownsville ↔ Harlingen time, and whether the job is inland core or coastal-adjacent edge.',
    drivers: [
      {
        title: 'Heat- and humidity-constrained work windows',
        detail:
          'Summer heat plus Gulf humidity compress productive hours into mornings. Jobs that slip into peak afternoon heat may need more labor or premium scheduling.',
      },
      {
        title: 'Brownsville ↔ Harlingen portal time',
        detail:
          'Dual-city pairs on I-69E / US-77 / US-83 can burn more clock than map miles suggest at peak — freer than Triangle metros, still billable.',
      },
      {
        title: 'Border / port adjacency timing',
        detail:
          'Bridge and freight peaks add soft delay even on residential moves near commercial corridors — buffer portal assumptions.',
      },
      {
        title: 'Coastal-edge access',
        detail:
          'SH-48 / causeway approaches, wind, and longer empty miles add labor and risk versus pure inland driveway jobs.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (same zone, simple access)',
        value: '$400–$1,250+',
        note: 'Higher with elevators, heat delays, or long portal time',
      },
      {
        label: '2–3BR house / apartment',
        value: '$1,100–$3,400+',
        note: 'Cross-city hauls and multi-unit access trend up',
      },
      {
        label: '3–4+ BR (cross-zone / coastal edge)',
        value: '$1,900–$5,800+',
        note: 'Coastal-adjacent and dual-city long locals price highest',
      },
    ],
  },
  seasonal: {
    title: 'Seasonal, heat & south RGV calendar intelligence',
    intro:
      'Cameron peaks follow extreme heat/humidity, school calendars, tourist coastal weekends, and multi-family churn — not McAllen medical-corridor defaults alone.',
    items: [
      {
        title: 'Extreme summer heat & humidity: roughly May – September',
        detail:
          'Plan early-morning loads, extra water, and heat-safe packing. Mid-afternoon moves in peak heat and humidity are high risk for people and property.',
      },
      {
        title: 'School calendars + coastal tourist peaks',
        detail:
          'Late spring through early fall weekends fill first for family SFH moves; coastal-adjacent corridors can spike on holiday and tourist weekends. Book 2–3 weeks ahead when flexible.',
      },
      {
        title: 'Best value: mid-month Tue–Thu, early start',
        detail:
          'Still plan around apartment elevator windows when applicable. Dawn starts win even in shoulder seasons when heat and dual-city arterials are the real constraints.',
      },
    ],
  },
  specialized: [
    {
      id: 'border-port-logistics',
      title: 'Border & port-adjacent logistics',
      intro:
        'Cameron’s defining operational context is south RGV border and port freight adjacency that north RGV McAllen scripts underweight.',
      bullets: [
        'Buffer time near bridge and port approach peaks even when the residential address is not an “international move.”',
        'Name both origin and destination cities; dual-city pairs hide portal time under “Cameron local.”',
        'Expect commercial traffic friction on I-69E / US-77 corridors during freight peaks.',
        'Confirm TxDMV vs FMCSA frameworks when any leg leaves Texas; in-state south RGV pairs still need honest drive-time assumptions.',
      ],
    },
    {
      id: 'coastal-adjacent-humidity',
      title: 'Coastal-adjacent humidity & heat',
      intro:
        'Gulf humidity stacked on Valley heat defines coastal-edge and open-staging jobs more than inland McAllen apartment defaults.',
      bullets: [
        'Prefer earliest morning starts in peak summer; treat mid-afternoon loads as high risk.',
        'Request shaded staging and humidity-aware packing for electronics, wood furniture, and sealed goods.',
        'Build SH-48 / causeway buffer for Padre-approach product.',
        'If the job runs long, discuss split-day options rather than pushing into peak heat.',
      ],
    },
    {
      id: 'dual-city-brownsville-harlingen',
      title: 'Brownsville–Harlingen dual-city routing',
      intro:
        'South RGV polycentric routing is not interchangeable with a single McAllen neighborhood move.',
      bullets: [
        'Name both cities on every estimate (e.g. Brownsville → Harlingen); “Cameron local” hides portal time.',
        'Price peak I-69E / US-77 / US-83 pairs honestly — map miles understate school and commute congestion.',
        'Clarify whether San Benito mid-county and coastal edges still use a pure local rate card.',
        'Inventory multi-unit COI separately from driveway SFH — products do not share soft costs.',
      ],
    },
  ],
  relocation: {
    title: 'Schools & hospitals for relocators',
    intro:
      'South RGV value, Brownsville border context, and coastal-adjacent edges are different bets from north RGV McAllen — validate schools and healthcare by pocket, then plan for Valley summers.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & education',
        intro:
          'Major systems include Brownsville ISD, Harlingen CISD, San Benito CISD, Los Fresnos CISD, Point Isabel ISD, and others. Match every listing address to the correct boundary.',
        bullets: [
          {
            title: 'City-first district check',
            detail:
              'Use official district boundary tools and TEA resources. Marketing city names and outlying pockets can span feeders.',
          },
          {
            title: 'South vs mid-county systems',
            detail:
              'Enrollment and program offerings differ across Brownsville, Harlingen, San Benito, and coastal districts — do not treat county averages or Hidalgo district patterns as Cameron truth.',
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
            title: 'South RGV acute-care anchors',
            detail:
              'Valley Baptist Medical Center (Harlingen), Valley Regional Medical Center (Brownsville), and other south Valley campuses dominate local care. Map ER drive times from coastal edges at peak traffic and heat.',
          },
          {
            title: 'North RGV & regional specialty reality',
            detail:
              'Some specialties may require travel toward McAllen–Edinburg or farther. Confirm insurer networks and realistic dual-city drive times before relocating mid-treatment.',
          },
          {
            title: 'Relocator tip',
            detail:
              'Transfer pediatric and specialty care early if mid-treatment; book first appointments before peak summer heat and school-move chaos.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Cameron resources',
    intro:
      'Local official links first; directory listings are independent. Verify TxDMV household goods authority for in-state moves and FMCSA for interstate legs before deposits.',
    items: [
      {
        label: 'Cameron County',
        href: 'https://www.cameroncountytx.gov/',
        note: 'County services hub',
        external: true,
      },
      {
        label: 'City of Brownsville',
        href: 'https://www.brownsvilletx.gov/',
        external: true,
      },
      {
        label: 'City of Harlingen',
        href: 'https://www.harlingentx.gov/',
        external: true,
      },
      {
        label: 'City of San Benito',
        href: 'https://www.cityofsanbenito.com/',
        external: true,
      },
    ],
  },
  directoryHint:
    'Filter listings by zone (Brownsville, Harlingen, San Benito/mid, coastal-adjacent) when available. Confirm heat/humidity plans, dual-city drive assumptions, and coastal-edge access — this is south RGV, not a McAllen clone.',
  lastReviewed: '2026-07-24',
});

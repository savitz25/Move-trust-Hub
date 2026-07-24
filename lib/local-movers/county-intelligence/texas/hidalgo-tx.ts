import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeTxTier2Pack,
  TX_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/texas/tx-tier2-shared';

/**
 * Hidalgo County — Texas Tier 2 (independent South TX / McAllen–RGV hub).
 * Secondary-market contract vs Houston / DFW Tier 1 density defaults — not a
 * Houston collar and not a thinner Triangle zone dump.
 */
export const hidalgoCountyIntelligence: CountyIntelligencePack = finalizeTxTier2Pack({
  countySlug: 'hidalgo',
  hubTitle: 'Hidalgo County Moving Intelligence Hub',
  eyebrow: 'Hidalgo County · Independent McAllen / RGV hub',
  h1: 'Moving in Hidalgo County: Independent RGV Hub, McAllen Growth & Border-Metro Logistics',
  heroOpener:
    'Hidalgo County is an independent South Texas / Rio Grande Valley hub — not Houston with freer freeways, and not a Texas Triangle HOA growth collar. McAllen–Mission medical and retail density, Edinburg university and government, Pharr/San Juan bridge-adjacent corridors, and rural/ag RGV edges form their own housing ladder under extreme heat and humidity. Compared with Houston / DFW Tier 1 density defaults, US-83 / I-2 freeflow replaces multi-county basin gridlock, bilingual daily life is normal, and colonias plus multi-family growth are first-class products. This guide is for people moving in Hidalgo County as a secondary market with its own role — not recycled Harris scripts.',
  heroCredibility:
    'Independent McAllen / RGV hub · Extreme heat · Border-metro logistics · TxDMV household goods (intrastate) · FMCSA when interstate · Curated listings',
  majorCorridors: 'US-83 · I-2 · I-69C · US-281 · SH-107',
  parentCompare: {
    parentLabel: 'Texas Triangle Tier 1 metros (Harris / Dallas density defaults)',
    parentHref: '/local-movers/texas/harris',
    title: 'Compared with Houston / DFW Tier 1 density defaults',
    intro:
      'Hidalgo is a freestanding Rio Grande Valley border metro far south of the Texas Triangle. Use Houston and DFW as high-density parent contrasts — neither is a drop-in template for polycentric McAllen–Edinburg–Mission routing, RGV heat, or rural/ag edge access.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'Houston crews fight I-10/I-45/I-69 basin stacks; DFW fights Tollway/I-35 walls. Hidalgo pairs ride US-83 / I-2, I-69C, US-281, and SH-107 with freer mid-day flow — Mission ↔ Edinburg still burns portal-to-portal time at peak, but it is not a Fort Bend ↔ Downtown Houston job. Isolation from the Triangle means long-haul deadhead, not short-hop collar spillover.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'Harris/Dallas mix dense elevators, master-planned HOA villages, and multi-county suburban product. Hidalgo’s ladder is McAllen multi-family and medical-corridor apartments, Mission west residential, Edinburg campus/government stock, Pharr/San Juan in-town grids, and rural/ag edges with colonias and manufactured homes — more bilingual multi-generational product, less Triangle HOA default.',
      },
      {
        title: 'Truck access, HOA & density',
        detail:
          'Hidalgo stages more driveway and multi-city arterial work than Houston elevator corridors. HOAs exist in growth tracts but are not the Frisco/Katy operating system. Soft shoulders, incomplete paving on edges, and bridge-adjacent freight replace dense curb-staging fights.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local Hidalgo quotes often sit below Houston/DFW rates for comparable square footage when access is simple — heat windows, cross-Valley 83 time, multi-unit COI, and rural-edge empty miles still push prices up. Expect secondary-market labor rates with RGV heat and distance as the main premiums, not basin gridlock fees.',
      },
      {
        title: 'Role difference',
        detail:
          'Hidalgo is an independent South Texas border-metro hub with its own employment base (healthcare, education, retail, government, logistics, trade-adjacent) — not a Houston bedroom collar and not a DFW spillover suburb. Treat it as its own market when matching crews and rate cards.',
      },
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Hidalgo County different',
    intro:
      'Independent RGV realities — polycentric Valley cities, extreme heat, bilingual/cross-border adjacency logistics, and freer 83/281 corridors than Triangle parents — that change estimates.',
    bullets: [
      {
        title: 'RGV heat is an operational constraint, not a footnote',
        detail:
          'May–September afternoons combine extreme temperature with humidity. Heat stresses crews, electronics, and sealed packaging. Prefer earliest morning load windows in peak summer — Houston marine-influenced habits do not transfer one-for-one to Valley open staging.',
      },
      {
        title: 'Polycentric cities, not one downtown core',
        detail:
          'McAllen medical/retail, Edinburg university/government, Mission west residential, and Pharr/San Juan bridge-adjacent patterns are different products. “Valley local” is too vague — name both cities and access type on the estimate.',
      },
      {
        title: 'US-83 / I-2 freeflow is not Houston basin — still a line item',
        detail:
          'Cross-Valley pairs freer than Harris still burn billable time at school and commute peaks. Ask whether quotes are portal-to-portal, especially Mission ↔ Edinburg or McAllen ↔ Pharr.',
      },
      {
        title: 'Rural/ag edges and multi-family growth both matter',
        detail:
          'Colonias, soft approaches, and multi-generational inventory coexist with growth apartments and medical-corridor turnover. Inventory access photos and building rules on every survey.',
      },
      TX_TIER2_REG_BULLET,
    ],
  },
  zonesHeading: 'Hidalgo County zones: McAllen/Mission, Edinburg, Pharr/San Juan & RGV edges',
  zonesIntro:
    'Four sharp products — not a six-zone dump. McAllen/Mission density, Edinburg campus/government, Pharr/San Juan corridors, and rural/ag RGV edges price and stage differently under the same heat calendar.',
  zones: [
    {
      id: 'mcallen-mission',
      name: 'McAllen / Mission',
      shortName: 'McAllen / Mission',
      neighborhoods: [
        'North McAllen',
        'Central / downtown McAllen',
        'Medical district edges',
        'Mission',
        'Palmview / west residential growth',
      ],
      housingTypes:
        'Apartments, townhomes, suburban SFH, some HOA tracts, older in-town stock, medical-corridor multi-family',
      challenges: [
        'Apartment elevator windows and COI',
        'US-83 / I-2 arterial congestion at peak',
        'Heat on open docks and parking lots',
        'High end-of-month lease and medical-corridor churn',
      ],
      moverTips:
        'Collect building packets early. Prefer earliest morning starts in summer. McAllen ↔ Mission is a classic underquoted “local” — price portal time honestly. Mid-week dawn beats Saturday heat and lease peaks.',
      cityKeywords: [
        'mcallen',
        'mc allen',
        'mission',
        'palmview',
        'nolana',
        'mcallen tx',
        'mission tx',
      ],
    },
    {
      id: 'edinburg',
      name: 'Edinburg',
      shortName: 'Edinburg',
      neighborhoods: [
        'UTRGV / university-adjacent',
        'Downtown Edinburg',
        'North Edinburg growth',
        'Monte Cristo corridor residential',
        'Multi-family near campus',
      ],
      housingTypes:
        'Student and workforce multi-family, SFH tracts, some newer HOA, government-adjacent housing',
      challenges: [
        'University calendar peaks and short-notice apartment moves',
        'I-69C / US-281 / local arterial timing',
        'Heat on open suburban staging',
        'Mix of campus and family inventory profiles',
      ],
      moverTips:
        'Book campus peaks early when flexible. Share building rules for multi-unit. Edinburg ↔ McAllen medical corridors needs honest drive-time assumptions.',
      cityKeywords: [
        'edinburg',
        'utrgv',
        'university of texas rio grande valley',
        'edinburg tx',
      ],
    },
    {
      id: 'pharr-san-juan',
      name: 'Pharr / San Juan',
      shortName: 'Pharr / San Juan',
      neighborhoods: [
        'Pharr',
        'San Juan',
        'Alamo edge',
        'Bridge-adjacent and industrial edges',
        'South-central multi-family',
      ],
      housingTypes:
        'SFH, multi-family, older in-town stock, some newer tracts',
      challenges: [
        'Freight and bridge-approach congestion',
        'Mixed industrial-adjacent staging constraints',
        'Heat and limited shade on open lots',
        'Cross-town pairs into McAllen medical/retail cores',
      ],
      moverTips:
        'Buffer time near commercial peaks. Share street-width photos for older grids. Confirm truck routes that avoid the worst freight bottlenecks when flexible.',
      cityKeywords: [
        'pharr',
        'san juan',
        'alamo',
        'psja',
        'pharr tx',
      ],
    },
    {
      id: 'rural-ag-rgv-edges',
      name: 'Rural / ag RGV edges',
      shortName: 'Rural / ag edges',
      neighborhoods: [
        'Outlying colonia communities',
        'Rural Hidalgo parcels',
        'Agricultural-edge homes',
        'Mid-Valley approaches (Weslaco edge patterns)',
        'Small communities off main arterials',
      ],
      housingTypes:
        'Rural SFH, manufactured homes, acreage edges, limited multi-unit, multi-generational stock',
      challenges: [
        'Private roads, incomplete paving, soft shoulders',
        'Limited truck turnaround',
        'Longer deadhead from McAllen core crews',
        'Not interchangeable with McAllen apartment logistics',
      ],
      moverTips:
        'Access photos are mandatory — surface, width, turnaround, and clearance. Confirm vehicle size before dispatch. Price edge ↔ McAllen as long local with access risk explicit. Inventory multi-generational and outdoor loads carefully.',
      cityKeywords: [
        'colonia',
        'rural hidalgo',
        'weslaco',
        'outlying',
        'hidalgo county rural',
      ],
    },
  ],
  costDrivers: {
    title: 'Pricing & cost drivers inside Hidalgo County',
    intro:
      'Same square footage prices differently by heat window, multi-unit COI, cross-Valley 83 time, and whether the job is city tract or rural/ag edge.',
    drivers: [
      {
        title: 'Heat-constrained work windows',
        detail:
          'Summer heat and humidity compress productive hours into mornings. Jobs that slip into peak afternoon heat may need more labor days or premium scheduling.',
      },
      {
        title: 'Cross-Valley corridor time',
        detail:
          'Mission ↔ Edinburg, McAllen ↔ Pharr, or any peak 83 / 281 leg can burn more portal-to-portal time than map miles suggest — freer than Houston, still billable.',
      },
      {
        title: 'Multi-unit medical/retail core access',
        detail:
          'Elevators, COI, and short-notice apartment turnover in McAllen and Edinburg add coordination soft costs.',
      },
      {
        title: 'Rural / ag-edge access',
        detail:
          'Soft roads, limited turnaround, outbuildings, and long carries add labor hours and risk — photos prevent underquotes.',
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
        note: 'Cross-Valley hauls and multi-unit access trend up',
      },
      {
        label: '3–4+ BR (cross-zone / rural edge)',
        value: '$1,900–$5,800+',
        note: 'Rural/ag access and long Valley locals price highest',
      },
    ],
  },
  seasonal: {
    title: 'Seasonal & RGV heat calendar intelligence',
    intro:
      'Hidalgo peaks follow extreme heat, school calendars, and multi-family/medical-corridor churn — not Houston Energy Corridor or DFW master-planned defaults alone.',
    items: [
      {
        title: 'Extreme summer heat: roughly May – September',
        detail:
          'Plan early-morning loads, extra water, and heat-safe packing. Mid-afternoon moves in peak heat and humidity are high risk for people and property.',
      },
      {
        title: 'School & family calendars + campus peaks',
        detail:
          'Late spring through early fall weekends fill first for family SFH moves; UTRGV-related multi-family turnover spikes near Edinburg. Book 2–3 weeks ahead when flexible.',
      },
      {
        title: 'Best value: mid-month Tue–Thu, early start',
        detail:
          'Still plan around apartment elevator windows when applicable. Dawn starts win even in shoulder seasons when heat and arterials are the real constraints.',
      },
    ],
  },
  specialized: [
    {
      id: 'rgv-heat',
      title: 'RGV heat logistics',
      intro:
        'Hidalgo’s defining operational constraint is Valley heat and humidity that Triangle rate cards often underweight.',
      bullets: [
        'Prefer earliest morning starts in peak summer; treat mid-afternoon loads as high risk.',
        'Request shaded staging and heat-safe packing for electronics, candles, and sealed goods.',
        'Plan water, rotation, and realistic crew endurance — heat is a labor and quality issue, not just comfort.',
        'If the job runs long, discuss split-day or multi-day options rather than pushing into peak heat.',
      ],
    },
    {
      id: 'bilingual-cross-border-logistics',
      title: 'Bilingual & cross-border adjacency logistics',
      intro:
        'Border-metro freight, bridge-adjacent congestion, and bilingual daily operations are normal context — not edge cases recycled from Houston collars.',
      bullets: [
        'Buffer time near Pharr and south-central freight / bridge-approach peaks even when the residential address is not an “international move.”',
        'Name both origin and destination cities; polycentric Valley pairs hide portal time under “Hidalgo local.”',
        'Expect multi-generational inventory profiles more often than young-professional apartment defaults — inventory accurately.',
        'Confirm TxDMV vs FMCSA frameworks when any leg leaves Texas; in-state Valley pairs still need honest drive-time assumptions.',
      ],
    },
    {
      id: 'growth-multi-family',
      title: 'Growth multi-family & medical-corridor turnover',
      intro:
        'McAllen medical/retail and Edinburg campus multi-family bring elevator windows and end-of-month churn that pure rural-edge jobs never see.',
      bullets: [
        'Send building packets, COI requirements, and elevator reservations with the estimate.',
        'Confirm approved move hours before booking Saturday crews in multi-unit buildings.',
        'Inventory carefully for short-notice apartment loads common near medical and campus corridors.',
        'Share parking and long-carry constraints for denser McAllen blocks.',
      ],
    },
  ],
  relocation: {
    title: 'Schools & hospitals for relocators',
    intro:
      'Independent RGV hub value, polycentric cities, and extreme heat are different bets — validate schools and healthcare by pocket, then plan for Valley summers.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & education',
        intro:
          'Major systems include McAllen ISD, Edinburg CISD, Mission CISD, Pharr-San Juan-Alamo ISD, Weslaco ISD, La Joya ISD, Sharyland ISD, and others. Match every listing address to the correct boundary.',
        bullets: [
          {
            title: 'City-first district check',
            detail:
              'Use official district boundary tools and TEA resources. Marketing city names and outlying pockets can span feeders.',
          },
          {
            title: 'Polycentric systems',
            detail:
              'Enrollment and program offerings differ across McAllen, Edinburg, Mission, and PSJA districts — do not treat county averages as neighborhood truth.',
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
            title: 'Valley acute-care anchors',
            detail:
              'DHR Health, South Texas Health System, and other McAllen–Edinburg–Mission area campuses dominate regional care. Map ER drive times from rural edges at peak heat and traffic.',
          },
          {
            title: 'Regional specialty reality',
            detail:
              'Some specialties require travel toward San Antonio or elsewhere. Confirm insurer networks and realistic long-drive plans before relocating mid-treatment.',
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
    title: 'Useful Hidalgo resources',
    intro:
      'Local official links first; directory listings are independent. Verify TxDMV household goods authority for in-state moves and FMCSA for interstate legs before deposits.',
    items: [
      {
        label: 'Hidalgo County',
        href: 'https://www.hidalgocounty.us/',
        note: 'County services hub',
        external: true,
      },
      {
        label: 'City of McAllen',
        href: 'https://www.mcallen.net/',
        external: true,
      },
      {
        label: 'City of Edinburg',
        href: 'https://www.cityofedinburg.com/',
        external: true,
      },
      {
        label: 'City of Mission',
        href: 'https://www.missiontexas.us/',
        external: true,
      },
      {
        label: 'City of Pharr',
        href: 'https://www.pharr-tx.gov/',
        external: true,
      },
    ],
  },
  directoryHint:
    'Filter listings by zone (McAllen/Mission, Edinburg, Pharr/San Juan, Rural/ag edges) when available. Confirm heat-window plans, multi-unit packets for McAllen growth, and honest US-83 portal time — this is an independent RGV hub, not a Houston collar.',
  lastReviewed: '2026-07-24',
});

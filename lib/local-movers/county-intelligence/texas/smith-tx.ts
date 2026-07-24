import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeTxTier2Pack,
  TX_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/texas/tx-tier2-shared';

/**
 * Smith County — Texas Tier 2 (independent Tyler East Texas hub).
 * Secondary-market contract vs Dallas Tier 1 density defaults — not a DFW
 * collar clone and not a thinner Triangle zone dump. Piney woods last-mile +
 * regional medical/college product.
 */
export const smithCountyIntelligence: CountyIntelligencePack = finalizeTxTier2Pack({
  countySlug: 'smith',
  hubTitle: 'Smith County Moving Intelligence Hub',
  eyebrow: 'Smith County · Independent Tyler East Texas hub',
  h1: 'Moving in Smith County: Independent Tyler Hub, Regional Medical/College & Piney Woods Last-Mile',
  heroOpener:
    'Smith County is an independent Tyler East Texas hub — not Dallas with freer freeways, and not a DFW HOA growth collar. Regional medical and college turnover, Loop 323 suburban product, Lindale/north growth, and piney-woods last-mile edges form their own housing ladder under East Texas heat and humidity. Compared with Dallas County Tier 1 density defaults, I-20 / US-69 / Loop 323 freeflow replaces multi-freeway basin gridlock, elevator density is thinner, and rural-pine approaches are first-class jobs. This guide is for people moving in Smith County as a secondary market with its own role — not recycled Dallas scripts.',
  heroCredibility:
    'Independent Tyler East Texas hub · Regional medical / college · Piney woods last-mile · TxDMV household goods (intrastate) · FMCSA when interstate · Curated listings',
  majorCorridors: 'I-20 · US-69 · Loop 323 · SH-31 · local Tyler grid',
  parentCompare: {
    parentLabel: 'Dallas County / independent East Texas hub',
    parentHref: '/local-movers/texas/dallas',
    title: 'Compared with Dallas County Tier 1 density defaults',
    intro:
      'Smith is a freestanding East Texas regional hub centered on Tyler — not a Dallas suburb with different arterials. Use Dallas County as the high-density parent contrast — it is not a drop-in template for piney-woods last-mile, regional medical multi-family, or Loop 323 suburban jobs.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'Dallas crews fight I-35/I-635/Tollway stacks and multi-hour cross-metro pairs. Smith pairs ride I-20, US-69, Loop 323, SH-31, and the local Tyler grid with freer mid-day flow — south Tyler ↔ Lindale still burns portal-to-portal time at peak, but it is not a Plano ↔ downtown Dallas job. Isolation from DFW means long-haul deadhead, not short-hop collar spillover.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'Dallas mixes dense elevators, master-planned HOA villages, and multi-county suburban product. Smith’s ladder is Tyler core multi-unit and mid-century stock, Loop 323 suburban SFH, Lindale/north growth tracts, and piney-woods rural edges with longer approaches — more regional-medical and tree-lot product, less DFW HOA default.',
      },
      {
        title: 'Truck access, HOA & density',
        detail:
          'Smith stages more driveway, hospital-adjacent multi-family, and soft pine-edge work than Dallas elevator corridors. HOAs exist in growth pockets but are not the Frisco operating system. Narrow tree-lined streets and incomplete rural paving replace dense curb-staging fights.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local Smith quotes often sit below Dallas rates for comparable square footage when access is simple — heat/humidity windows, medical multi-unit COI, Loop 323 peak time, and piney-woods empty miles still push prices up. Expect secondary-market labor rates with East Texas access and heat as the main premiums, not basin gridlock fees.',
      },
      {
        title: 'Role difference',
        detail:
          'Tyler is an independent East Texas regional hub with its own employment base (healthcare, higher education, retail, government, light industry) — not a Dallas bedroom collar. Treat it as its own market when matching crews and rate cards.',
      },
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Smith County different',
    intro:
      'Independent East Texas realities — regional medical/college turnover, piney-woods last-mile, Loop 323 suburban product, and freer I-20/US-69 corridors than Dallas parents — that change estimates.',
    bullets: [
      {
        title: 'Regional medical and college cycles rewrite demand',
        detail:
          'Hospital and campus-adjacent multi-family churn short-notice inventory and end-of-month spikes that pure suburban DFW calendars underweight. Name medical-corridor vs pine-edge product on the estimate.',
      },
      {
        title: 'Piney woods last-mile is a first-class job type',
        detail:
          'Tree-lined approaches, soft shoulders, longer carries on wooded lots, and incomplete rural paving are not interchangeable with Loop 323 driveway jobs. “Smith local” is too vague — put both pockets and access photos on the survey.',
      },
      {
        title: 'I-20 / Loop 323 freeflow is not Dallas basin — still a line item',
        detail:
          'Cross-town pairs freer than Dallas still burn billable time at school and commute peaks. Ask whether quotes are portal-to-portal, especially Tyler core ↔ Lindale or south Loop ↔ SH-31 edges.',
      },
      {
        title: 'East Texas heat and humidity are operational constraints',
        detail:
          'Summer afternoons stress crews and open staging. Prefer earliest morning load windows in peak summer — mild shoulder-season DFW habits do not cancel heat risk on asphalt lots or wooded drives.',
      },
      TX_TIER2_REG_BULLET,
    ],
  },
  zonesHeading: 'Smith County zones: Tyler core, Loop 323 suburban, Lindale/north & piney-woods edges',
  zonesIntro:
    'Four sharp products — not a six-zone dump. Tyler medical/college core, Loop 323 suburban belt, Lindale/north growth, and piney-woods rural edges price and stage differently under the same East Texas heat calendar.',
  zones: [
    {
      id: 'tyler-core-medical',
      name: 'Tyler core / medical–college',
      shortName: 'Tyler core',
      neighborhoods: [
        'Downtown Tyler',
        'Medical-corridor multi-family',
        'College / campus-adjacent apartments',
        'Older mid-century grids',
        'Central multi-unit corridors',
      ],
      housingTypes:
        'Older SFH, multi-unit buildings, mid-century stock, medical- and campus-adjacent apartments',
      challenges: [
        'Tighter street parking and multi-unit long carries',
        'Elevator/COI rules in some multi-unit buildings',
        'Hospital and campus peak traffic on local grid',
        'Heat and humidity on asphalt staging without shade',
      ],
      moverTips:
        'Confirm building rules for multi-unit near medical and campus corridors. Weekday mornings beat heat and shift-change peaks. Inventory stairs carefully in older multi-story stock. Share parking constraints on denser blocks.',
      cityKeywords: [
        'tyler',
        'downtown tyler',
        'tyler medical',
        'tyler tx',
        'ut tyler',
      ],
    },
    {
      id: 'loop-323-suburban',
      name: 'Loop 323 suburban belt',
      shortName: 'Loop 323',
      neighborhoods: [
        'South Tyler suburban tracts',
        'West / southwest Loop residential',
        'Established HOA and non-HOA SFH',
        'Retail-corridor multi-family pockets',
        'Loop 323 / Broadway approach neighborhoods',
      ],
      housingTypes:
        'Suburban SFH, some HOA tracts, townhomes, limited multi-family',
      challenges: [
        'Loop 323 peak congestion toward core and I-20',
        'HOA COI where planned communities apply',
        'School-calendar Saturday demand for family SFH',
        'Summer heat on open cul-de-sacs',
      ],
      moverTips:
        'Collect HOA packets when applicable. Mid-week early starts beat heat and school traffic. Clarify south Loop ↔ downtown Tyler drive assumptions. Inventory family-volume SFH carefully.',
      cityKeywords: [
        'loop 323',
        'south tyler',
        'broadway tyler',
        'tyler suburban',
      ],
    },
    {
      id: 'lindale-north-growth',
      name: 'Lindale / north growth',
      shortName: 'Lindale / north',
      neighborhoods: [
        'Lindale',
        'North Smith growth tracts',
        'I-20 corridor residential',
        'Newer SFH subdivisions',
        'Between-city corridor product',
      ],
      housingTypes:
        'Newer SFH, growth subdivisions, limited multi-family, some larger-lot edges',
      challenges: [
        'Longer empty miles from Tyler core staging',
        'I-20 / US-69 approach timing',
        'Construction approaches in newest phases',
        'Not interchangeable with downtown multi-unit logistics',
      ],
      moverTips:
        'Treat Lindale ↔ Tyler as long-local with honest portal time. Ask whether pure local rate cards still apply. Early starts win on I-20 heat and freight peaks. Share driveway and turnaround photos for newer tracts.',
      cityKeywords: [
        'lindale',
        'lindale tx',
        'north tyler',
        'i-20 tyler',
      ],
    },
    {
      id: 'piney-woods-edges',
      name: 'Piney woods / rural Smith edges',
      shortName: 'Piney woods edges',
      neighborhoods: [
        'Whitehouse edge',
        'Bullard / Flint approaches',
        'Rural Smith parcels',
        'Wooded larger-lot homes',
        'Agricultural-edge properties',
      ],
      housingTypes:
        'Rural SFH, larger-lot wooded edges, limited multi-unit, farm/ranch-adjacent properties',
      challenges: [
        'Soft shoulders, tree-lined narrow approaches, limited turnaround',
        'Longer carries and outbuildings',
        'Lower service density than Loop 323 belt',
        'Heat and humidity on unshaded rural staging',
      ],
      moverTips:
        'Treat edge-to-metro pairs as long locals. Mention sheds, shops, soft driveways, and low-clearance trees on the survey. Prefer mid-week dawn starts; do not price like pure suburban Loop 323 driveways.',
      cityKeywords: [
        'whitehouse',
        'bullard',
        'flint',
        'rural smith',
        'piney woods tyler',
      ],
    },
  ],
  costDrivers: {
    title: 'Pricing & cost drivers inside Smith County',
    intro:
      'Same square footage prices differently by heat window, multi-unit COI, Loop 323 time, and whether the job is Tyler medical core or piney-woods long local.',
    drivers: [
      {
        title: 'Medical / campus multi-unit access',
        detail:
          'Elevators, COI, and short-notice apartment turnover near hospitals and campus add coordination soft costs.',
      },
      {
        title: 'Loop 323 / I-20 portal time',
        detail:
          'Tyler core ↔ Lindale or south Loop ↔ SH-31 pairs can burn more clock than map miles suggest at peak — freer than Dallas, still billable.',
      },
      {
        title: 'Heat- and humidity-constrained work windows',
        detail:
          'Summer heat compresses productive hours into mornings. Jobs that slip into peak afternoon heat may need more labor or premium scheduling.',
      },
      {
        title: 'Piney-woods empty miles & access',
        detail:
          'Longer approaches, soft roads, outbuildings, and tree constraints add labor hours and risk — photos prevent underquotes.',
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
        note: 'Cross-zone hauls and multi-unit access trend up',
      },
      {
        label: '3–4+ BR (cross-zone / piney woods edge)',
        value: '$1,900–$5,800+',
        note: 'Rural/pine access and long locals price highest',
      },
    ],
  },
  seasonal: {
    title: 'Seasonal & East Texas heat calendar intelligence',
    intro:
      'Smith peaks follow extreme heat/humidity, school calendars, and medical/campus multi-family churn — not Dallas lease density alone.',
    items: [
      {
        title: 'Summer heat & humidity: roughly May – September',
        detail:
          'Plan early-morning loads, extra water, and heat-safe packing. Mid-afternoon moves in peak heat are high risk for people and property.',
      },
      {
        title: 'School & family calendars + campus peaks',
        detail:
          'Late spring through early fall weekends fill first for family SFH moves; campus-adjacent multi-family spikes near term changes. Book 2–3 weeks ahead when flexible.',
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
      id: 'regional-medical-college',
      title: 'Regional medical & college logistics',
      intro:
        'Smith’s volume problem often sits near hospital and campus multi-family — short notice, elevators, and inventory churn that pure suburban jobs never see.',
      bullets: [
        'Send building packets, COI requirements, and elevator reservations with the estimate.',
        'Confirm approved move hours before booking Saturday crews in multi-unit buildings.',
        'Inventory carefully for short-notice apartment loads common near medical and campus corridors.',
        'Share parking and long-carry constraints for denser Tyler core blocks.',
      ],
    },
    {
      id: 'piney-woods-last-mile',
      title: 'Piney woods last-mile access',
      intro:
        'Wooded approaches, soft shoulders, and larger-lot carries define outer Smith jobs that Loop 323 driveway scripts miss.',
      bullets: [
        'Require driveway, turnaround, and tree-clearance photos before finalizing price.',
        'Price sheds, shops, and long carries explicitly versus pure suburban SFH.',
        'Build empty-mile time for Whitehouse/Bullard/Flint-style edges into portal assumptions.',
        'Prefer smaller truck configurations when narrow tree-lined streets limit 26-foot access.',
      ],
    },
    {
      id: 'heat-i20-loop323',
      title: 'Heat & I-20 / Loop 323 timing',
      intro:
        'East Texas heat plus regional corridor timing need operational plans that pure DFW HOA jobs never write.',
      bullets: [
        'Prefer earliest morning starts in peak summer; treat mid-afternoon loads as high risk.',
        'Price portal-to-portal time honestly for Tyler ↔ Lindale and core ↔ Loop 323 pairs.',
        'Request shaded staging and heat-safe packing for electronics and sealed goods.',
        'Build buffer for school and commute peaks on US-69 and Loop 323.',
      ],
    },
  ],
  relocation: {
    title: 'Schools & hospitals for relocators',
    intro:
      'Independent Tyler hub value, regional medical anchors, and piney-woods edges are different bets — validate schools and healthcare by pocket, then plan for East Texas heat.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & education',
        intro:
          'Major systems include Tyler ISD, Lindale ISD, Whitehouse ISD, Chapel Hill ISD, Bullard ISD, and others. Match every listing address to the correct boundary.',
        bullets: [
          {
            title: 'Multiple districts under one county',
            detail:
              'Tyler, Lindale, Whitehouse, and outlying addresses often fall in different systems. Marketing names and new tracts can span feeders — verify with official boundary tools and TEA data.',
          },
          {
            title: 'Growth vs established feeders',
            detail:
              'North growth and pine-edge pockets may not match older Tyler marketing names. Do not treat county averages as neighborhood truth.',
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
            title: 'Regional acute-care anchors',
            detail:
              'Christus Mother Frances Hospital – Tyler, UT Health East Texas, and other Tyler-area campuses dominate regional care. Map ER drive times from piney-woods edges at peak traffic.',
          },
          {
            title: 'Specialty & regional reality',
            detail:
              'Some specialties may require travel toward Dallas or other hubs. Confirm insurer networks and realistic I-20 appointment times before relocating mid-treatment.',
          },
          {
            title: 'Relocator tip',
            detail:
              'Transfer pediatric and specialty care early if mid-treatment; book first appointments before peak summer move chaos.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Smith resources',
    intro:
      'Local official links first; directory listings are independent. Verify TxDMV household goods authority for in-state moves and FMCSA for interstate legs before deposits.',
    items: [
      {
        label: 'Smith County',
        href: 'https://www.smith-county.com/',
        note: 'County services hub',
        external: true,
      },
      {
        label: 'City of Tyler',
        href: 'https://www.cityoftyler.org/',
        external: true,
      },
      {
        label: 'City of Lindale',
        href: 'https://www.lindaletx.gov/',
        external: true,
      },
      {
        label: 'City of Whitehouse',
        href: 'https://www.whitehousetx.org/',
        external: true,
      },
    ],
  },
  directoryHint:
    'Filter listings by zone (Tyler core, Loop 323, Lindale/north, piney-woods edges) when available. Confirm multi-unit packets near medical/campus corridors, heat-aware starts, and honest piney-woods access photos — this is an independent Tyler East Texas hub, not a Dallas collar clone.',
  lastReviewed: '2026-07-24',
});

import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeCaTier2Pack,
  CA_TIER2_BHGS_BULLET,
} from '@/lib/local-movers/county-intelligence/ca-tier2-shared';

/**
 * Fresno County — California Tier 2 (independent Central Valley mid-metro).
 * Secondary-market contract vs LA / Sacramento Tier 1 parents — not an LA-north
 * collar and not a thinner Tier 1 zone dump.
 */
export const fresnoCountyIntelligence: CountyIntelligencePack = finalizeCaTier2Pack({
  countySlug: 'fresno',
  hubTitle: 'Fresno County Moving Intelligence Hub',
  eyebrow: 'Fresno County · Independent Central Valley mid-metro',
  h1: 'Moving in Fresno County: Independent Central Valley Mid-Metro, Clovis Growth & Heat Logistics',
  heroOpener:
    'Fresno County is an independent Central Valley mid-metro — not Los Angeles County with freer freeways, and not a Sacramento capital-region suburb. Greater Fresno plus Clovis planned growth, south/west city stock, and ag-edge towns (Sanger, Reedley, Selma, Kerman and beyond) form their own housing ladder under 100°F+ summer heat. Compared with LA County, CA-99 and CA-41 freeflow replace 405-style gridlock, HOA density is lower, and agricultural last-mile is normal. Compared with Sacramento, you still get valley heat and 99 spine logistics, but without capital-region commute framing. This guide is for people moving in Fresno County as a secondary market with its own role — not recycled LA or Sac scripts.',
  heroCredibility:
    'Independent Central Valley mid-metro · BHGS intrastate · FMCSA when interstate · Secondary-market role vs LA & Sacramento · Curated listings',
  majorCorridors: 'CA-99 · CA-41 · CA-180 · CA-168 · I-5 (west approach)',
  parentCompare: {
    parentLabel: 'Los Angeles County',
    parentHref: '/local-movers/california/los-angeles',
    title: 'Compared with Los Angeles County (and Sacramento)',
    intro:
      'Fresno is a freestanding mid-metro on the San Joaquin Valley floor. Use LA County as the high-density coastal parent contrast and Sacramento as the northern valley secondary parent — neither is a drop-in template for Clovis growth, ag-edge towns, or 100°F+ move days.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'LA County crews fight I-405, I-5 basin congestion, and multi-hour cross-basin pairs. Fresno pairs ride CA-99, CA-41, CA-180, and CA-168 with freer mid-day flow — Clovis ↔ southwest Fresno still burns portal-to-portal time at peak, but it is not a 405 job. Sacramento comparison: same 99-spine rhythm, different capital-region arterial stack. I-5 is the west approach, not a daily basin wall.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'LA mixes coastal multifamily, hillside, and dense HOA suburbs. Fresno’s ladder is central multi-unit and older grid stock, north/Clovis master-planned SFH, south/west working neighborhoods, and farm-edge homes with sheds and unpaved approaches — more single-family and ag-adjacent product than LA core, less foothill/Sierra product than Sacramento’s Placer edges.',
      },
      {
        title: 'Truck access, HOA & density',
        detail:
          'Fresno stages more driveway and cul-de-sac work than LA’s elevator-and-permit corridors. HOAs concentrate in Clovis and newer north/northeast tracts — real paperwork, not LA-scale density of COI villages. Ag-edge gates and longer rural approaches replace canyon and coastal-street constraints.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local Fresno quotes often sit below LA basin rates for comparable square footage when access is simple — heat windows, cross-town 99/41 time, and ag-edge empty miles still push prices up. Expect secondary-market labor rates with heat and distance as the main premiums, not coastal scarcity or basin gridlock fees.',
      },
      {
        title: 'Role difference',
        detail:
          'Fresno is an independent inland mid-metro with its own employment base (ag, healthcare, education, logistics) and Clovis as a planned-growth partner city — not an LA bedroom collar and not a Sacramento spillover suburb. Treat it as its own market when matching crews and rate cards.',
      },
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Fresno County different',
    intro:
      'Independent mid-metro realities — extreme heat, Clovis growth vs urban core, ag-edge last-mile, and freer 99/41 corridors than coastal parents — that change estimates.',
    bullets: [
      {
        title: '100°F+ heat is an operational constraint, not a footnote',
        detail:
          'June–September afternoons regularly top 100°F+. Heat stresses crews, electronics, and sealed packaging. Prefer 6–10 a.m. load windows in peak summer, request shaded staging, and treat mid-afternoon starts as high risk — LA marine-layer habits do not transfer.',
      },
      {
        title: 'Clovis planned growth vs central Fresno vs ag towns',
        detail:
          'Clovis HOA villages and family-volume SFH are a different product from Tower District multi-unit or Sanger/Reedley farm-edge homes. “Fresno County local” is too vague — put both cities and access type on the estimate.',
      },
      {
        title: 'CA-99 / 41 freeflow is not LA 405 — still a line item',
        detail:
          'Cross-town pairs freer than the LA basin still burn billable time at school and commute peaks. Ask whether quotes are portal-to-portal, especially Clovis ↔ south/west Fresno or metro ↔ Selma/Reedley.',
      },
      {
        title: 'Ag economy shapes edge logistics',
        detail:
          'Surrounding towns and rural-edge properties bring longer approaches, equipment sheds, and seasonal road use. Inventory outbuildings and unpaved access on the survey so crews size labor correctly.',
      },
      CA_TIER2_BHGS_BULLET,
    ],
  },
  zonesHeading: 'Fresno County zones: metro core, Clovis growth & ag edges',
  zonesIntro:
    'Three to four sharp products — not a six-zone dump. Central Fresno density, Clovis/north growth, south/west city stock, and ag-edge towns price and stage differently under the same heat calendar.',
  zones: [
    {
      id: 'central-fresno',
      name: 'Central / Urban Fresno',
      shortName: 'Central Fresno',
      neighborhoods: [
        'Downtown Fresno',
        'Tower District',
        'Huntington Blvd area',
        'Central multi-unit corridors',
        'Older grid neighborhoods',
      ],
      housingTypes:
        'Older SFH, multi-unit buildings, mid-century stock, some loft/adaptive reuse, denser street grids',
      challenges: [
        'Tighter street parking and multi-unit long carries',
        'Elevator/COI rules in some multi-unit buildings',
        'CA-41 / 99 / 180 approaches into the core',
        'Peak heat on asphalt staging without shade',
      ],
      moverTips:
        'Confirm building rules for multi-unit. Weekday mornings beat heat and commute peaks. Inventory stairs carefully in older multi-story stock. Share parking constraints on denser blocks.',
      cityKeywords: [
        'downtown fresno',
        'tower district',
        'central fresno',
        'huntington',
        'fresno',
      ],
    },
    {
      id: 'clovis-north-growth',
      name: 'Clovis & North / Northeast Growth',
      shortName: 'Clovis / North',
      neighborhoods: [
        'Clovis',
        'Old Town Clovis edge',
        'Woodward Park / north Fresno tracts',
        'Harlan Ranch edge',
        'Temperance / Shepherd corridors',
      ],
      housingTypes:
        'Master-planned HOA communities, established and newer SFH, townhomes, multi-family, tree-lined suburban stock',
      challenges: [
        'HOA COI and approved-hour rules in newer villages',
        'High family-move volume on summer weekends',
        'Arterial congestion toward Fresno core',
        'Heat + longer local distances to west/south Fresno',
      ],
      moverTips:
        'Clovis growth is increasingly HOA-first — send management packets with the estimate. Mid-week early starts beat heat and school traffic. Book May–August Saturdays early for family SFH moves. Clarify Clovis ↔ southwest Fresno drive assumptions.',
      cityKeywords: [
        'clovis',
        'harlan ranch',
        'woodward park',
        'north fresno',
        'northeast fresno',
        'temperance',
        'shepherd',
        'old town clovis',
      ],
    },
    {
      id: 'south-west-fresno',
      name: 'South / West Fresno',
      shortName: 'South / West',
      neighborhoods: [
        'West Fresno',
        'Southwest Fresno',
        'Sunnyside / southeast edges',
        'Highway 99 west-side pockets',
        'Industrial-edge residential',
      ],
      housingTypes:
        'Mix of older SFH, multi-family, mid-century tracts, working neighborhoods, some newer infill',
      challenges: [
        'CA-99 freight and commute congestion',
        'Varied property access and multi-unit long carries',
        'Heat on open lots with limited shade',
        'Cross-town peaks toward Clovis and north Fresno',
      ],
      moverTips:
        'Build 99 corridor timing into west↔east pairs. Confirm parking and long-carry needs for multi-unit. Summer heat still favors dawn starts even when the map looks short.',
      cityKeywords: [
        'west fresno',
        'southwest fresno',
        'sunnyside',
        'southeast fresno',
        'westside fresno',
        'highway 99',
      ],
    },
    {
      id: 'ag-edge-towns',
      name: 'Ag-Edge Towns (Sanger, Reedley, Selma, Kerman & beyond)',
      shortName: 'Ag-edge towns',
      neighborhoods: [
        'Sanger',
        'Reedley',
        'Selma',
        'Kerman',
        'Kingsburg edge',
        'Coalinga edge',
      ],
      housingTypes:
        'Small-town SFH, rural-edge homes, farm/ranch-adjacent properties, occasional outbuildings',
      challenges: [
        'Longer approaches and empty miles from Fresno/Clovis staging',
        'Unpaved or constrained rural driveways',
        'Agricultural traffic and seasonal road use',
        'Heat + limited shaded staging on open lots',
      ],
      moverTips:
        'Treat town-to-metro pairs as long locals with honest portal-to-portal time. Mention sheds, shops, and unpaved access on the survey. Early starts are non-negotiable in summer.',
      cityKeywords: [
        'sanger',
        'reedley',
        'selma',
        'kerman',
        'kingsburg',
        'coalinga',
        'parlier',
        'orange cove',
        'fowler',
      ],
    },
  ],
  costDrivers: {
    title: 'Pricing & cost drivers inside Fresno County',
    intro:
      'Same square footage prices differently by heat window, Clovis HOA soft costs, cross-town 99/41 time, and whether the job is city tract or ag-edge.',
    drivers: [
      {
        title: 'Heat-constrained work windows',
        detail:
          'Summer heat compresses productive hours into mornings. Jobs that slip into peak afternoon heat may need more labor days or premium scheduling.',
      },
      {
        title: 'Cross-town and town-to-metro distance',
        detail:
          'Clovis ↔ southwest Fresno or Fresno ↔ Reedley/Selma can burn more portal-to-portal time than map miles suggest at peak — freer than LA, still billable.',
      },
      {
        title: 'HOA soft costs in Clovis / north growth',
        detail:
          'COI and approved hours in newer villages add paperwork and can force weekday-only windows.',
      },
      {
        title: 'Agricultural-edge access',
        detail:
          'Longer approaches, outbuildings, and unpaved driveways add labor and vehicle risk — price them explicitly versus pure suburban driveway jobs.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (same zone, simple access)',
        value: '$500–$1,200+',
        note: 'Higher with multi-unit long carries or peak heat windows',
      },
      {
        label: '2–3BR house / planned community',
        value: '$1,500–$3,600+',
        note: 'HOA soft costs and cross-town hauls trend up',
      },
      {
        label: '3–4+ BR (cross-zone / ag-edge)',
        value: '$2,200–$5,500+',
        note: 'Town-to-metro and rural-edge jobs price highest',
      },
    ],
  },
  seasonal: {
    title: 'Seasonal & heat calendar intelligence',
    intro:
      'Fresno peaks follow extreme heat, school calendars, and ag-edge rhythm — not coastal marine layers or LA basin lease density alone.',
    items: [
      {
        title: 'Summer heat peak: roughly June – September',
        detail:
          'Plan early-morning loads, extra water, and heat-safe packing. Mid-afternoon moves in peak heat are high risk for people and property.',
      },
      {
        title: 'School & family calendars (Clovis / north Fresno)',
        detail:
          'Late spring through early fall weekends fill first for family SFH moves. Book 2–4 weeks ahead for popular Saturdays in Clovis and north Fresno.',
      },
      {
        title: 'Best value: mid-month Tue–Thu, early start',
        detail:
          'Still plan around HOA weekday windows when applicable. Early starts win even in shoulder seasons when heat and arterials are the real constraints.',
      },
    ],
  },
  specialized: [
    {
      id: 'heat-logistics',
      title: 'Central Valley heat logistics',
      intro:
        'Fresno’s defining operational constraint is valley-floor heat that coastal LA crews and mild-weather rate cards often underweight.',
      bullets: [
        'Prefer 6–10 a.m. starts in peak summer; treat mid-afternoon loads as high risk.',
        'Request shaded staging and heat-safe packing for electronics, candles, and sealed goods.',
        'Plan water, rotation, and realistic crew endurance — heat is a labor and quality issue, not just comfort.',
        'If the job runs long, discuss split-day or multi-day options rather than pushing into peak heat.',
      ],
    },
    {
      id: 'hoa-new-construction',
      title: 'HOA & new-construction growth (Clovis / north)',
      intro:
        'Clovis and newer north/northeast tracts bring master-planned rules that pure central Fresno multi-unit jobs may not share.',
      bullets: [
        'Send HOA management packets, COI requirements, and gate lists with the estimate.',
        'Confirm approved move hours and floor-protection rules before booking Saturday crews.',
        'Inventory family-volume SFH carefully — suburban loads often exceed older core condos.',
        'Share driveway, cul-de-sac, and truck-length constraints for newer tracts with tight turns.',
      ],
    },
    {
      id: 'ag-industrial-last-mile',
      title: 'Ag-adjacent & industrial last-mile',
      intro:
        'Surrounding towns and packing/industrial edges are not interchangeable with Clovis cul-de-sacs — empty miles and access define the job.',
      bullets: [
        'Price portal-to-portal time honestly for metro ↔ Sanger/Reedley/Selma/Kerman pairs.',
        'Note sheds, shops, gates, and unpaved approaches on the survey before dispatch.',
        'Build buffer for agricultural and freight traffic mid-day on valley arterials.',
        'Ask whether town-to-metro pairs still use a pure local rate card or a long-local schedule.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Fresno County?',
    intro:
      'Independent mid-metro value, Clovis growth, and ag-edge living are different bets — validate schools and healthcare by pocket, then plan for valley heat.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & education',
        intro:
          'Major systems include Fresno Unified and Clovis Unified, plus separate districts in surrounding towns. Match every listing address to the correct boundary.',
        bullets: [
          {
            title: 'Fresno Unified vs Clovis Unified',
            detail:
              'City-of-Fresno and Clovis addresses often fall in different systems with different program maps. Marketing names and new tracts can span feeders — verify with official boundary tools and the California School Dashboard.',
          },
          {
            title: 'Surrounding town districts',
            detail:
              'Sanger, Reedley, Selma, Kerman, and other communities use their own districts. Do not treat county averages as neighborhood truth.',
          },
          {
            title: 'Research tools',
            detail:
              'District sites and state dashboard data should lead; third-party rankings are secondary. Tour campuses when possible.',
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
              'Community Regional Medical Center (Fresno), Clovis Community Medical Center, and other regional campuses serve greater Fresno–Clovis. Map ER drive times at rush hour from your target neighborhood.',
          },
          {
            title: 'Specialty & outlying access',
            detail:
              'Ag-edge towns may mean longer drives into the metro for specialty care. Confirm insurer networks and realistic appointment times on 99/41/180.',
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
    title: 'Useful Fresno resources',
    intro:
      'Local official links first; directory listings are independent. Verify California BHGS for in-state moves and FMCSA for interstate legs before deposits.',
    items: [
      {
        label: 'City of Fresno',
        href: 'https://www.fresno.gov/',
        note: 'City services; building/HOA rules are separate',
        external: true,
      },
      {
        label: 'City of Clovis',
        href: 'https://cityofclovis.com/',
        external: true,
      },
      {
        label: 'Fresno County — official site',
        href: 'https://www.fresnocountyca.gov/',
        external: true,
      },
    ],
  },
  directoryHint:
    'Filter listings by zone (Central Fresno, Clovis/North, South/West, Ag-edge towns) when available. Confirm heat-window plans, HOA packets for Clovis growth, and town-to-metro drive assumptions — this is an independent mid-metro, not an LA-north collar.',
  lastReviewed: '2026-07-24',
});

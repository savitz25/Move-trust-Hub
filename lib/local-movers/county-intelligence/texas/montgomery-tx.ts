import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeTxTier2Pack,
  TX_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/texas/tx-tier2-shared';

/**
 * Montgomery County — Texas Tier 2 (Houston north collar).
 * Secondary-market contract vs Harris Tier 1 parent — The Woodlands / Conroe /
 * I-45 growth, not Houston core elevators or Fort Bend SW Sugar Land scripts.
 */
export const montgomeryCountyIntelligence: CountyIntelligencePack = finalizeTxTier2Pack({
  countySlug: 'montgomery',
  hubTitle: 'Montgomery County Moving Intelligence Hub',
  eyebrow: 'Montgomery · Houston north collar · The Woodlands / Conroe',
  h1: 'Moving in Montgomery County: Houston North Collar — The Woodlands, Conroe Growth & I-45',
  heroOpener:
    'Montgomery County is Houston’s north collar — The Woodlands’ master-planned villages on one side, Conroe expansion and Lake Conroe edges on the other, and I-45 corridor towns absorbing Harris overflow. This is not Fort Bend’s Sugar Land script and not downtown Houston elevators. Woodlands HOAs, forested lots, and strict move windows dominate the south-central core; Conroe and Magnolia bring newer tracts and longer arterials; Spring/Oak Ridge edges sit on the Harris seam. Compared with Harris, you get freer I-45 freeflow than Medical Center gridlock, canopy and lake access Harris core never sees, and HOA density concentrated in planned villages rather than tower docks. This guide is for people moving in Montgomery as a north collar market — not a recycled Houston core pack.',
  heroCredibility:
    'Houston north collar · The Woodlands / Conroe · TxDMV household goods (intrastate) · FMCSA when interstate · Curated listings',
  majorCorridors: 'I-45 · SH-99 · FM-1488 · SH-242 · US-59 (south approach)',
  parentCompare: {
    parentLabel: 'Harris County',
    parentHref: '/local-movers/texas/harris',
    title: 'Compared with Harris County',
    intro:
      'Montgomery is the Houston north growth collar — The Woodlands, Conroe, Spring/Oak Ridge edges, and Magnolia/west growth — not a drop-in template for downtown elevators, Energy Corridor towers, or bayou-core flood logistics. Use Harris as the dense metro parent contrast.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'Harris crews fight I-10, Beltway 8, and multi-hour cross-county pairs into downtown and the Medical Center. Montgomery pairs ride I-45, SH-99, FM-1488, SH-242, and the US-59 south approach — freer mid-day than Inner Loop, still peak-heavy on Woodlands ↔ Conroe and Spring-edge commute windows. Portal-to-portal time is real; it is not a short Houston dock job.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'Harris mixes towers, bungalows, bayou ranchers, and west-side HOAs under one county label. Montgomery’s ladder is Woodlands master-planned villages, Conroe new construction, Spring/Oak Ridge suburban stock, Magnolia larger-lot growth, and lake-edge product — far less elevator density, far more canopy clearance and gate lists.',
      },
      {
        title: 'Truck access, HOA & density',
        detail:
          'Harris core needs COI elevators and curb permits. Montgomery defaults to Woodlands-style HOA packets, forested driveway carries, and longer approaches into Conroe/Magnolia growth. Lake and private-road edges add constraints open Harris prairie suburbs rarely see.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local Montgomery quotes often sit near secondary-collar rates for simple driveway access — HOA soft costs, I-45 peak time, canopy/long-carry labor, and lake-edge access still push prices up. Expect planned-village friction and distance premiums, not downtown dock scarcity.',
      },
      {
        title: 'Role difference',
        detail:
          'Montgomery is Houston’s north bedroom and planned-growth engine — Woodlands logistics, Conroe expansion, and I-45 spillover — not Harris’s job-center core and not Fort Bend’s SW Sugar Land product. Treat it as its own collar market when matching crews and rate cards.',
      },
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Montgomery County different',
    intro:
      'North collar realities — Woodlands HOA density, I-45 freeflow with real peaks, lake/edge access, and piney-woods canopy — that change estimates.',
    bullets: [
      {
        title: 'Woodlands master-planned is a different product than Conroe growth',
        detail:
          'A Woodlands village HOA home, a Conroe new build, a Spring-edge tract, and a Magnolia larger-lot do not share gate rules, truck access, or inventory profiles. Name both origin and destination communities on every estimate.',
      },
      {
        title: 'I-45 freeflow is not Harris gridlock — still a line item',
        detail:
          'Woodlands ↔ Conroe or Spring ↔ Magnolia pairs freer than Inner Loop still burn billable time at school and commute peaks. Ask whether quotes are portal-to-portal.',
      },
      {
        title: 'Canopy, HOA, and lake-edge access stack',
        detail:
          'Forested lots add clearance and longer carries; lake and private-road approaches add staging risk Harris core scripts miss. Share approach photos early.',
      },
      {
        title: 'Gulf Coast heat under pine canopy still exhausts crews',
        detail:
          'Summer heat and humidity slow long driveway carries even with shade. Prefer early starts; treat mid-afternoon load-outs as high risk in peak season.',
      },
      TX_TIER2_REG_BULLET,
    ],
  },
  zonesHeading: 'Montgomery zones: The Woodlands, Conroe, Spring/Oak Ridge & Magnolia west',
  zonesIntro:
    'Three to four sharp products — not a six-zone dump. Woodlands planned core, Conroe growth, Spring/Oak Ridge Harris-seam suburbs, and Magnolia/west edges price and stage differently under the same north collar.',
  zones: [
    {
      id: 'the-woodlands',
      name: 'The Woodlands Master-Planned Villages',
      shortName: 'The Woodlands',
      neighborhoods: [
        'The Woodlands Town Center edge',
        'Village cores (Cochran’s Crossing, Sterling Ridge & peers)',
        'Grogans Mill / Panther Creek edges',
        'Golf-course and forested lots',
        'I-45 / Research Forest corridors',
      ],
      housingTypes:
        'Master-planned HOA SFH, townhomes, some multi-family, forested and golf-edge product',
      challenges: [
        'HOA COI, approved hours, and gate lists as default',
        'Canopy clearance and longer driveway carries',
        'I-45 / local arterial peaks toward Houston',
        'High family-move volume on summer weekends',
      ],
      moverTips:
        'Send HOA management packets with the estimate. Mid-week early starts beat heat and school traffic. Inventory canopy clearance and family-volume SFH carefully. Clarify Woodlands ↔ Conroe or Harris drive assumptions.',
      cityKeywords: [
        'the woodlands',
        'woodlands',
        'grogans mill',
        'cochrans crossing',
        'sterling ridge',
        'research forest',
        'panther creek',
      ],
    },
    {
      id: 'conroe-growth',
      name: 'Conroe Core & Growth',
      shortName: 'Conroe',
      neighborhoods: [
        'Downtown Conroe edges',
        'Newer Conroe subdivisions',
        'Lake Conroe approach neighborhoods',
        'I-45 / SH-105 corridors',
        'East and west Conroe tracts',
      ],
      housingTypes:
        'Established SFH, new-construction tracts, multi-family, some lake-adjacent product',
      challenges: [
        'Rapid growth and incomplete roads in newest phases',
        'I-45 peak congestion toward The Woodlands / Houston',
        'Longer empty miles from Woodlands staging for north jobs',
        'Varied HOA density vs pure Woodlands villages',
      ],
      moverTips:
        'Do not price Conroe new builds exactly like Woodlands HOA villages — access and paperwork differ. Build I-45 timing into north↔south pairs. Early starts still win in summer heat.',
      cityKeywords: [
        'conroe',
        'downtown conroe',
        'lake conroe',
        'sh 105',
        'conroe tx',
        'north montgomery',
      ],
    },
    {
      id: 'spring-oak-ridge',
      name: 'Spring / Oak Ridge North Edges',
      shortName: 'Spring / Oak Ridge',
      neighborhoods: [
        'Oak Ridge North',
        'Spring-edge Montgomery pockets',
        'I-45 south approach',
        'SH-242 corridors',
        'Harris–Montgomery seam suburbs',
      ],
      housingTypes:
        'Suburban SFH, established tracts, multi-family pockets, some HOA product',
      challenges: [
        'I-45 commute peaks into Harris job centers',
        'County-line confusion on estimates and drive assumptions',
        'Mixed HOA density vs pure Woodlands core',
        'Cross-county pairs into Spring / Klein / Houston north',
      ],
      moverTips:
        'Clarify Montgomery vs Harris address on every estimate. Build I-45 and SH-242 timing into southbound pairs. Confirm HOA rules when present — do not assume Woodlands-level paperwork on every Spring-edge street.',
      cityKeywords: [
        'oak ridge north',
        'spring',
        'spring tx',
        'sh 242',
        'i-45 spring',
        'montgomery spring',
      ],
    },
    {
      id: 'magnolia-west',
      name: 'Magnolia & West Edges',
      shortName: 'Magnolia / west',
      neighborhoods: [
        'Magnolia',
        'FM-1488 corridors',
        'West Montgomery growth tracts',
        'Larger-lot and rural-edge homes',
        'SH-249 approach edges',
      ],
      housingTypes:
        'New-construction SFH, larger-lot suburban, some rural-edge and acreage-adjacent product',
      challenges: [
        'Longer approaches and empty miles from Woodlands/Conroe staging',
        'FM-1488 and SH-99 peak timing',
        'Softer shoulders and truck-turn constraints on edge roads',
        'Lower same-day crew density than Woodlands core',
      ],
      moverTips:
        'Treat Magnolia/west pairs as long-local jobs. Ask whether pure local rate cards still apply. Note gates, gravel approaches, and outbuildings on the survey. Prefer mid-week starts over peak FM-1488 traffic.',
      cityKeywords: [
        'magnolia',
        'magnolia tx',
        'fm 1488',
        'west montgomery',
        'sh 249',
        'tomball edge',
      ],
    },
  ],
  costDrivers: {
    title: 'Pricing & cost drivers inside Montgomery County',
    intro:
      'Same square footage prices differently by Woodlands HOA soft costs, I-45 portal time, and whether the job is planned-village stock or Magnolia/lake long-local.',
    drivers: [
      {
        title: 'HOA soft costs in The Woodlands',
        detail:
          'COI, approved hours, and gate coordination in Woodlands villages add paperwork and can force weekday-only windows.',
      },
      {
        title: 'I-45 / 99 / 242 corridor portal time',
        detail:
          'Woodlands ↔ Conroe or Spring ↔ Magnolia pairs burn more portal-to-portal time than map miles suggest at peak — freer than Harris core, still billable.',
      },
      {
        title: 'Canopy, lake-edge & long-local access',
        detail:
          'Forested carries, private-road lake approaches, and Magnolia empty miles add labor and vehicle risk versus pure open-tract driveway jobs.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (same zone, simple access)',
        value: '$550–$1,400+',
        note: 'Higher with multi-unit long carries or peak heat windows',
      },
      {
        label: '2–3BR house / planned community',
        value: '$1,600–$3,900+',
        note: 'Woodlands HOA soft costs and I-45 hauls trend up',
      },
      {
        label: '3–4+ BR (cross-zone / lake or Magnolia edge)',
        value: '$2,400–$6,000+',
        note: 'Long-local, canopy, and multi-HOA jobs price highest',
      },
    ],
  },
  seasonal: {
    title: 'Seasonal & heat calendar intelligence',
    intro:
      'Montgomery peaks follow extreme heat, school calendars, and north Houston spillover — not downtown lease density alone.',
    items: [
      {
        title: 'Summer heat peak: roughly June – September',
        detail:
          'Plan early-morning loads, extra water, and heat-safe packing. Mid-afternoon moves in peak heat are high risk even under canopy.',
      },
      {
        title: 'School & family calendars (Woodlands / Conroe)',
        detail:
          'Late spring through early fall weekends fill first for family SFH moves. Book 2–4 weeks ahead for popular Saturdays in The Woodlands and Conroe growth.',
      },
      {
        title: 'Best value: mid-month Tue–Thu, early start',
        detail:
          'Still plan around HOA weekday windows when applicable. Early starts win even in shoulder seasons when heat and I-45 peaks are the real constraints.',
      },
    ],
  },
  specialized: [
    {
      id: 'woodlands-hoa-master-planned',
      title: 'Woodlands HOA & master-planned logistics',
      intro:
        'Montgomery’s signature product is The Woodlands planned-village access — gate lists, COI, and canopy SFH that Harris core elevator jobs do not share.',
      bullets: [
        'Send HOA management packets, COI requirements, and gate lists with the estimate.',
        'Confirm approved move hours and floor-protection rules before booking Saturday crews.',
        'Inventory family-volume SFH and canopy clearance carefully.',
        'Share driveway, cul-de-sac, and truck-length constraints for forested villages.',
      ],
    },
    {
      id: 'i45-freeflow',
      title: 'I-45 freeflow & north-corridor timing',
      intro:
        'I-45, SH-99, FM-1488, and SH-242 turn “local” Montgomery pairs into corridor-timed jobs.',
      bullets: [
        'Price portal-to-portal time honestly for Woodlands ↔ Conroe and Spring ↔ Magnolia pairs.',
        'Build buffer for school and commute peaks on I-45 south toward Harris.',
        'Note construction and growth traffic on SH-99 and FM-1488 western approaches.',
        'Ask whether cross-zone pairs still use a pure local rate card or a long-local schedule.',
      ],
    },
    {
      id: 'lake-edge-access',
      title: 'Lake Conroe & edge access',
      intro:
        'Waterfront approaches, private roads, and Magnolia rural-edge parcels are not interchangeable with Woodlands cul-de-sacs.',
      bullets: [
        'Share approach photos, private-road rules, and dock/boat-traffic constraints early.',
        'Note soft shoulders, gates, and outbuildings on Magnolia/west surveys.',
        'Build weather buffer for heavy rain and storm season on edge approaches.',
        'Price empty miles honestly when staging from Woodlands or Conroe core.',
      ],
    },
  ],
  relocation: {
    title: 'Schools & hospitals for relocators',
    intro:
      'North collar value, Woodlands villages, and Conroe growth are different bets — validate schools and healthcare by pocket, then plan for heat and HOA calendars.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & education',
        intro:
          'Major systems include Conroe ISD (serving The Woodlands and much of central Montgomery) and Magnolia ISD on western edges, plus other local districts. Match every listing address to the correct boundary.',
        bullets: [
          {
            title: 'Conroe ISD & The Woodlands feeders',
            detail:
              'Many Woodlands and Conroe addresses fall in Conroe ISD with multiple high-school feeders. Marketing village names can span attendance zones — verify with official boundary tools.',
          },
          {
            title: 'Magnolia ISD & edge districts',
            detail:
              'Western growth and Magnolia product often use Magnolia ISD or other edge systems. Do not treat county averages as neighborhood truth.',
          },
          {
            title: 'Research tools',
            detail:
              'District sites and state data should lead; third-party rankings are secondary. Tour campuses when possible.',
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
              'Houston Methodist The Woodlands, Memorial Hermann The Woodlands, HCA Houston Healthcare Conroe, and other campuses serve greater Montgomery. Map ER drive times at rush hour from your target village.',
          },
          {
            title: 'Harris specialty spillover',
            detail:
              'Texas Medical Center and north Houston specialty care remain common for complex needs. Confirm insurer networks and realistic I-45 times.',
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
    title: 'Useful Montgomery resources',
    intro:
      'Local official links first; directory listings are independent. Verify Texas TxDMV for in-state moves and FMCSA for interstate legs before deposits.',
    items: [
      {
        label: 'The Woodlands Township',
        href: 'https://www.thewoodlandstownship-tx.gov/',
        note: 'Township services; village HOA rules are separate',
        external: true,
      },
      {
        label: 'City of Conroe',
        href: 'https://www.cityofconroe.org/',
        external: true,
      },
      {
        label: 'Montgomery County — official site',
        href: 'https://www.mctx.org/',
        external: true,
      },
    ],
  },
  directoryHint:
    'Filter listings by zone (The Woodlands, Conroe, Spring/Oak Ridge, Magnolia/west) when available. Confirm HOA packets for Woodlands villages, I-45 drive assumptions, and lake/edge access notes — this is a Houston north collar, not Harris core.',
  lastReviewed: '2026-07-24',
});

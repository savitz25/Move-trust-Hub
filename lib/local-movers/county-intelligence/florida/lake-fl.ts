import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeFlTier2Pack,
  FL_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/florida/fl-tier2-shared';

/**
 * Lake County — Florida Tier 2 (Orlando west collar).
 * Parent: Orange County. Clermont / Leesburg west-metro growth —
 * NOT a renamed Orange theme-park or downtown Orlando pack.
 */
export const lakeCountyIntelligence: CountyIntelligencePack = finalizeFlTier2Pack({
  countySlug: 'lake',
  hubTitle: 'Lake County Moving Intelligence Hub',
  eyebrow: 'Lake County · Orlando west collar · Clermont / Leesburg',
  h1: 'Moving in Lake County: Orlando West Collar — Clermont Growth, Leesburg & Lake-Area Suburbs',
  heroOpener:
    'Lake County is Orlando’s west collar — Clermont hill-and-growth villages, Leesburg and Tavares lake-country stock, Mount Dora historic-plus-commuter product, and rural lake-edge lots that freer US-27 freeflow still cannot turn into a short Orange dock job. This is not theme-park guest traffic, not downtown Orlando elevators, and not a Polk inland script with different city names. West-metro HOA growth, Florida Turnpike / US-27 / FL-50 timing, and lake-lot access define estimates. This guide is for people actually moving in Lake as a west-metro collar — not a recycled Orange County core pack.',
  heroCredibility:
    'Orlando west collar · Clermont / Leesburg growth · US-27 freeflow · FDACS Ch. 507 (intrastate) · FMCSA when interstate · Curated listings',
  majorCorridors: 'US-27 · Florida Turnpike · FL-50 · FL-19 · FL-44',
  parentCompare: {
    parentLabel: 'Orange County',
    parentHref: '/local-movers/florida/orange',
    title: 'Compared with Orange County',
    intro:
      'Lake is the Orlando west growth collar — Clermont, Leesburg/Tavares, Mount Dora, and rural lake edges — not a drop-in template for International Drive tourist density, downtown elevators, or theme-park guest traffic. Use Orange as the dense Central Florida Tier 1 parent contrast.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'Orange crews fight I-4 tourist and commuter peaks, SR-408, and multi-zone metro pairs into guest corridors. Lake pairs ride US-27, Florida Turnpike, FL-50, FL-19, and FL-44 with freer mid-day freeflow than I-4 core — Clermont ↔ Leesburg or Mount Dora ↔ west Orange still burns portal-to-portal time at school and commute peaks. It is not a short Orlando dock job.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'Orange mixes tourist multi-family, master-planned east/south growth, and dense metro product. Lake’s ladder is Clermont west-metro HOA growth, Leesburg/Tavares lake-country SFH, Mount Dora historic and hillside stock, and rural lake-edge lots — less elevator density, more lake access and longer arterials.',
      },
      {
        title: 'Truck access, HOA & density',
        detail:
          'Orange core needs tourist-corridor timing and multi-unit COI. Lake defaults to growth-village HOA packets in Clermont, lake-lot driveway and dock constraints, and longer empty miles into rural edges. Hills, soft waterfront approaches, and gate lists stack differently than guest-core staging.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local Lake quotes often sit near secondary-collar rates for simple driveway access — HOA soft costs, Turnpike/US-27 peak time, lake-lot labor, and rural empty miles still push prices up. Expect planned-village friction and distance premiums, not International Drive scarcity pricing.',
      },
      {
        title: 'Role difference',
        detail:
          'Lake is Orlando’s west bedroom and lake-suburb growth engine — Clermont logistics, Leesburg/Tavares lake country, and Turnpike spillover — not Orange’s job and tourist core. Treat it as its own collar market when matching crews and rate cards.',
      },
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Lake County different',
    intro:
      'West-metro collar realities — Clermont growth HOAs, US-27 freeflow with real peaks, lake-lot access, and rural edges — that change estimates.',
    bullets: [
      {
        title: 'Clermont growth is a different product than Leesburg lake country',
        detail:
          'A Clermont HOA tract, a Leesburg/Tavares lake-lot, a Mount Dora hillside home, and a rural edge parcel do not share gate rules, truck access, or inventory profiles. Name both origin and destination communities on every estimate.',
      },
      {
        title: 'US-27 / Turnpike freeflow is not I-4 gridlock — still a line item',
        detail:
          'Clermont ↔ Leesburg or Lake ↔ west Orange pairs freer than tourist-core I-4 still burn billable time at school and commute peaks. Ask whether quotes are portal-to-portal.',
      },
      {
        title: 'Lake-lot and waterfront access stack',
        detail:
          'Docks, soft ground, elevation, and limited swing room on lake edges differ from dry HOA cul-de-sacs. Share approach photos early.',
      },
      {
        title: 'Inland heat without guest-corridor assumptions',
        detail:
          'Summer heat on open growth streets and rural lots slows long carries. Prefer early starts; treat mid-afternoon load-outs as high risk in peak season.',
      },
      FL_TIER2_REG_BULLET,
    ],
  },
  zonesHeading: 'Lake zones: Clermont growth, Leesburg/Tavares, Mount Dora & rural lake edges',
  zonesIntro:
    'Four sharp products — not a six-zone dump. Clermont west-metro growth, Leesburg/Tavares lake country, Mount Dora, and rural lake edges price and stage differently under the same west collar.',
  zones: [
    {
      id: 'clermont-growth',
      name: 'Clermont Growth & West-Metro Villages',
      shortName: 'Clermont growth',
      neighborhoods: [
        'Clermont',
        'South Clermont / Four Corners influence',
        'Minneola edge',
        'US-27 / Turnpike growth corridors',
        'Newer HOA and master-planned tracts',
      ],
      housingTypes:
        'Master-planned SFH, HOA villages, townhomes, multi-family near retail corridors, active new construction',
      challenges: [
        'HOA COI, gates, and approved hours as default',
        'US-27 / Turnpike peak congestion toward Orange',
        'Incomplete roads on newest phases',
        'High family-move volume on summer weekends',
      ],
      moverTips:
        'Send HOA packets with the estimate. Mid-week early starts beat heat and school traffic. Inventory family-volume SFH carefully. Clarify Clermont ↔ west Orange or Leesburg drive assumptions.',
      cityKeywords: [
        'clermont',
        'minneola',
        'south clermont',
        'four corners',
        'us-27 clermont',
      ],
    },
    {
      id: 'leesburg-tavares',
      name: 'Leesburg, Tavares & Central Lake Country',
      shortName: 'Leesburg / Tavares',
      neighborhoods: [
        'Leesburg',
        'Tavares',
        'Chain-of-lakes residential edges',
        'FL-19 / US-27 connector corridors',
        'Central Lake suburban stock',
      ],
      housingTypes:
        'Lake-adjacent SFH, established suburban tracts, multi-family near commercial strips, retiree-oriented stock',
      challenges: [
        'Lake-lot docks, soft ground, and elevation carries',
        'Cross-county hauls to Clermont or Orange at peak',
        'Mix of HOA and non-HOA rules',
        'Heat on open waterfront approaches',
      ],
      moverTips:
        'Share lake-lot driveway and dock photos. Inventory stairs and long carries on waterfront homes. Treat Leesburg ↔ Clermont as a true local with arterial timing — not zero-drive.',
      cityKeywords: [
        'leesburg',
        'tavares',
        'lake harris',
        'central lake',
        'fl-19',
      ],
    },
    {
      id: 'mount-dora',
      name: 'Mount Dora & Northeast Hills',
      shortName: 'Mount Dora',
      neighborhoods: [
        'Mount Dora',
        'Historic downtown edges',
        'Hillside and lake-view pockets',
        'Eustis influence corridors',
        'FL-44 / northeast Lake approaches',
      ],
      housingTypes:
        'Historic SFH, hillside homes, lake-view stock, suburban tracts, some multi-family',
      challenges: [
        'Grades, tight historic streets, and limited staging',
        'Event and weekend tourist parking near downtown',
        'Longer pairs toward Clermont growth or rural edges',
        'Older stairs and constrained driveway depth',
      ],
      moverTips:
        'Survey curb and driveway access on historic and hillside lots. Prefer non-festival weekends near downtown when flexible. Share grade and turnaround photos early.',
      cityKeywords: [
        'mount dora',
        'eustis',
        'northeast lake',
        'fl-44',
      ],
    },
    {
      id: 'rural-lake-edges',
      name: 'Rural Lake Edges & Outlying Lots',
      shortName: 'Rural lake edges',
      neighborhoods: [
        'Umatilla / north rural edges',
        'South Lake rural pockets',
        'Larger-lot and ranch-style properties',
        'Agricultural-adjacent edges',
        'Small-town cores outside growth villages',
      ],
      housingTypes:
        'Rural SFH, larger lots, outbuildings, manufactured-home communities, lake-edge acreage-adjacent product',
      challenges: [
        'Long empty miles from Clermont or Leesburg staging',
        'Unpaved or soft driveways after rain',
        'Outbuildings and equipment inventories',
        'Lower same-day crew density than west-metro core',
      ],
      moverTips:
        'Price distance and access explicitly. Share road-width and driveway photos. Inventory sheds and workshops separately. Confirm whether pure local rate cards still apply.',
      cityKeywords: [
        'umatilla',
        'rural lake',
        'south lake rural',
        'lake county edge',
      ],
    },
  ],
  costDrivers: {
    title: 'Pricing & cost drivers inside Lake County',
    intro:
      'Same square footage prices differently by Clermont HOA soft costs, US-27/Turnpike portal time, and whether the job is growth-village stock or lake/rural long-local.',
    drivers: [
      {
        title: 'HOA soft costs in Clermont growth',
        detail:
          'COI, approved hours, and gate coordination in west-metro villages add paperwork and can force weekday-only windows.',
      },
      {
        title: 'US-27 / Turnpike / FL-50 corridor portal time',
        detail:
          'Clermont ↔ Leesburg or Lake ↔ Orange pairs burn more portal-to-portal time than map miles suggest at peak — freer than I-4 core, still billable.',
      },
      {
        title: 'Lake-lot, hillside & rural access',
        detail:
          'Docks, soft ground, Mount Dora grades, and rural empty miles add labor and vehicle risk versus pure open-tract driveway jobs.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (same zone, simple access)',
        value: '$450–$1,150+',
        note: 'Higher with multi-unit long carries or peak corridor windows',
      },
      {
        label: '2–3BR house / planned community',
        value: '$1,500–$3,600+',
        note: 'Clermont HOA soft costs and US-27 hauls trend up',
      },
      {
        label: '3–4+ BR (cross-zone / lake or rural edge)',
        value: '$2,200–$5,800+',
        note: 'Long-local, lake-lot, and multi-HOA jobs price highest',
      },
    ],
  },
  seasonal: {
    title: 'Seasonal & heat calendar intelligence',
    intro:
      'Lake peaks follow extreme heat, school calendars, and west Orlando spillover — not theme-park guest density alone.',
    items: [
      {
        title: 'Summer heat peak: roughly June – September',
        detail:
          'Plan early-morning loads, extra water, and heat-safe packing. Mid-afternoon moves in peak heat are high risk on open growth streets and rural lots.',
      },
      {
        title: 'School & family calendars (Clermont / growth villages)',
        detail:
          'Late spring through early fall weekends fill first for family SFH moves. Book 2–4 weeks ahead for popular Saturdays in Clermont growth.',
      },
      {
        title: 'Best value: mid-month Tue–Thu, early start',
        detail:
          'Still plan around HOA weekday windows when applicable. Early starts win even in shoulder seasons when heat and US-27 peaks are the real constraints.',
      },
    ],
  },
  specialized: [
    {
      id: 'west-metro-growth',
      title: 'West-metro growth HOA & Clermont logistics',
      intro:
        'Lake’s signature volume product is Clermont-area planned-village access — gate lists, COI, and family SFH that Orange tourist-core jobs do not share.',
      bullets: [
        'Send HOA management packets, COI requirements, and gate lists with the estimate.',
        'Confirm approved move hours and truck-length limits before booking Saturday crews.',
        'Reconfirm street access the week of the move in active construction villages.',
        'Inventory family-volume SFH carefully; share driveway and cul-de-sac constraints.',
      ],
    },
    {
      id: 'us27-freeflow',
      title: 'US-27 freeflow & west-corridor timing',
      intro:
        'US-27, Florida Turnpike, FL-50, FL-19, and FL-44 turn “local” Lake pairs into corridor-timed jobs.',
      bullets: [
        'Price portal-to-portal time honestly for Clermont ↔ Leesburg and Lake ↔ west Orange pairs.',
        'Build buffer for school and commute peaks on US-27 and Turnpike approaches.',
        'Note construction and growth traffic on south Clermont / Four Corners influence corridors.',
        'Ask whether cross-zone pairs still use a pure local rate card or a long-local schedule.',
      ],
    },
    {
      id: 'lake-area-suburbs',
      title: 'Lake-area suburbs, waterfront & rural edges',
      intro:
        'Waterfront Leesburg/Tavares homes, Mount Dora hills, and rural lake-edge parcels are not interchangeable with Clermont cul-de-sacs.',
      bullets: [
        'Share approach photos, dock constraints, and soft-ground notes early.',
        'Inventory stairs and long carries on elevated or lake-lot stock.',
        'Note gates, gravel approaches, and outbuildings on rural surveys.',
        'Price empty miles honestly when staging from Clermont or Leesburg core.',
      ],
    },
  ],
  relocation: {
    title: 'Schools & hospitals for relocators',
    intro:
      'West-collar value, Clermont growth, and lake-country living are different bets — validate schools and healthcare by pocket, then plan for heat and HOA calendars.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & education',
        intro:
          'Lake County Schools covers most public K–12 students. Growth areas can see enrollment pressure as new tracts open. Match every listing address to the correct boundary.',
        bullets: [
          {
            title: 'Zone before marketing name',
            detail:
              'Clermont, Leesburg, Mount Dora, and Tavares brands span multiple feeders. Verify with official boundary tools — not community marketing alone.',
          },
          {
            title: 'Growth-area capacity',
            detail:
              'West-metro Clermont corridors may see school capacity and busing changes as development continues. Ask current questions when touring.',
          },
          {
            title: 'Research tools',
            detail:
              'District sites and Florida DOE data should lead; third-party rankings are secondary. Tour campuses when possible.',
          },
        ],
      },
      {
        id: 'hospitals',
        title: 'Hospitals & healthcare',
        bullets: [
          {
            title: 'In-county acute-care anchors',
            detail:
              'AdventHealth campuses (including Waterman and other regional sites) and other facilities serve Lake. Map ER drive times at rush hour from Clermont, Mount Dora, and rural edges.',
          },
          {
            title: 'Orange specialty spillover',
            detail:
              'Orlando-area specialty care remains common for complex needs. Confirm insurer networks and realistic Turnpike / FL-50 times.',
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
    title: 'Useful Lake County resources',
    intro:
      'Local official links first; directory listings are independent. Verify FDACS for in-state moves and FMCSA for interstate legs before deposits.',
    items: [
      {
        label: 'Lake County — official site',
        href: 'https://www.lakecountyfl.gov/',
        note: 'County services hub',
        external: true,
      },
      {
        label: 'City of Clermont',
        href: 'https://www.clermontfl.gov/',
        external: true,
      },
      {
        label: 'City of Leesburg',
        href: 'https://www.leesburgflorida.gov/',
        external: true,
      },
      {
        label: 'City of Mount Dora',
        href: 'https://www.cityofmountdora.com/',
        external: true,
      },
      {
        label: 'Lake County Schools',
        href: 'https://www.lake.k12.fl.us/',
        external: true,
      },
    ],
  },
  directoryHint:
    'Filter listings by zone (Clermont growth, Leesburg/Tavares, Mount Dora, Rural lake edges) when available. Confirm HOA packets for Clermont villages, US-27 drive assumptions, and lake/edge access notes — this is an Orlando west collar, not Orange core.',
  lastReviewed: '2026-07-24',
});

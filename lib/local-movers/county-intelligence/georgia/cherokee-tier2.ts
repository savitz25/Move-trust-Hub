import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeGaTier2Pack,
  GA_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/georgia/ga-tier2-shared';

/** cherokee — GA Tier 2 Wave 1 */
export const cherokeeCountyTier2Intelligence: CountyIntelligencePack = finalizeGaTier2Pack({
  countySlug: 'cherokee',
  hubTitle: 'Cherokee County Moving Intelligence Hub',
  eyebrow: 'Cherokee · North Atlanta collar · Woodstock / Canton · vs Fulton',
  h1: 'Moving in Cherokee County: Woodstock, Canton & I-575 North-Metro Growth',
  heroOpener: 'Cherokee County is north Atlanta’s I-575 growth collar — Woodstock and Holly Springs master-plan HOAs, Canton seat density, longer empty miles from inside the Perimeter, and family SFH inventories that dominate school calendars. It is not Fulton towers or Midtown elevators, and it is not Forsyth’s GA-400 / Lake Lanier pattern with different labels: expect HOA gate lists, cul-de-sac staging, and portal-to-portal time that map miles understate. This guide is for people moving in Cherokee as north-metro growth product — not an Atlanta core rename.',
  heroCredibility: 'North-metro I-575 growth · HOA subdivisions · Georgia DPS MCCD · FMCSA when interstate · Curated listings',
  majorCorridors: 'I-575 · GA-20 · GA-92 · GA-140 · I-75 (south approach)',
  parentCompare: {
    parentLabel: 'Fulton County (and Cobb northwest patterns)',
    parentHref: '/local-movers/georgia/fulton',
    title: 'Compared with Fulton County (and Cobb northwest patterns)',
    intro: 'Cherokee is I-575 north-collar HOA growth — not Fulton intown elevators and not Cobb Cumberland multi-family alone.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail: 'Fulton crews fight Connector peaks and intown permits. Cherokee pairs ride I-575, GA-92, and Bells Ferry-style arterials — freer mid-day north of the Perimeter, still peak-heavy on school-zone and I-575 commute windows. Portal-to-portal time is real; it is not a Midtown elevator day.',
      },
      {
        title: 'Housing stock differences',
        detail: 'Fulton mixes towers, Midtown multi-family, and north-Fulton estates. Cherokee skews Woodstock/Holly Springs planned SFH, Canton two-stories, and north rural-edge lots — more continuous HOA cul-de-sac product, less freight-elevator density.',
      },
      {
        title: 'Truck access, HOA & density',
        detail: 'HOA COIs, gate lists, and weekday windows dominate more often than intown street permits. Rural-edge approaches add gravel and longer carries uncommon on Buckhead mid-rises.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail: 'Local Cherokee quotes often sit at north-collar suburban rates for driveway SFH — empty miles from intown staging and HOA soft costs push premiums vs map miles alone.',
      },
      {
        title: 'Role difference',
        detail: 'Cherokee is north-metro I-575 growth collar — not Fulton core renamed and not Forsyth GA-400 lake product.',
      }
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Cherokee County different',
    intro: 'HOA growth, I-575 freeflow, and longer north-collar empty miles — not Atlanta tower boilerplate.',
    bullets: [
      {
        title: 'I-575 is the spine — and the bottleneck',
        detail: 'North–south pairs freer mid-day still peak hard at school and commute windows. Ask portal-to-portal.',
      },
      {
        title: 'HOA master plans dominate family volume',
        detail: 'COI, gate lists, truck limits, and weekday windows are standard on growth villages.',
      },
      {
        title: 'Distance from intown staging is billable',
        detail: 'Perimeter-origin crews burn empty miles even on “metro Atlanta” labels.',
      },
      {
        title: 'New-construction access friction is common',
        detail: 'Incomplete streets, mud, and lagging gate rules appear on growth edges.',
      },
      GA_TIER2_REG_BULLET,
    ],
  },
  zonesHeading: 'Cherokee zones: Woodstock growth, Canton seat, Holly Springs/Towne Lake & north rural edge',
  zonesIntro: 'Two to four sharp products under one I-575 north-collar label.',
  zones: [
    {
      id: 'woodstock',
      name: 'Woodstock south-edge growth',
      shortName: 'Woodstock',
      neighborhoods: ["Woodstock","growth villages"],
      housingTypes: 'SFH, townhomes, HOA master plans',
      challenges: ["HOA packets","Cul-de-sac staging","I-575 peaks"],
      moverTips: 'Collect HOA rules before survey final; avoid peak school windows when possible.',
      cityKeywords: ["woodstock"],
    },
    {
      id: 'canton',
      name: 'Canton seat & core',
      shortName: 'Canton',
      neighborhoods: ["Canton","downtown edges"],
      housingTypes: 'SFH, multi-story older stock, mixed density',
      challenges: ["Street width","Mixed access"],
      moverTips: 'Inventory stairs on older stock; confirm staging near seat arterials.',
      cityKeywords: ["canton"],
    },
    {
      id: 'holly-springs',
      name: 'Holly Springs / Towne Lake patterns',
      shortName: 'Holly Springs',
      neighborhoods: ["Holly Springs","Towne Lake edges"],
      housingTypes: 'Planned SFH, townhomes',
      challenges: ["Gate lists","HOA hours"],
      moverTips: 'Gate codes and weekday windows often beat weekend assumptions.',
      cityKeywords: ["holly springs","towne lake"],
    },
    {
      id: 'north-edge',
      name: 'North Cherokee rural edge',
      shortName: 'North edge',
      neighborhoods: ["Waleska edges","northern towns"],
      housingTypes: 'Larger lots, longer approaches',
      challenges: ["Empty miles","Soft shoulders"],
      moverTips: 'Photo approaches; confirm road conditions on growth-edge mud weeks.',
      cityKeywords: ["waleska"],
    }
  ],
  specialized: [
    {
      id: 'hoa-growth',
      title: 'HOA subdivision logistics',
      intro: 'Master-plan rules are first-class cost drivers.',
      bullets: ["Collect COI and gate lists early.","Confirm truck size limits before load day."],
    },
    {
      id: 'i575-freeflow',
      title: 'I-575 north-collar freeflow',
      intro: 'Commute peaks rewrite short-looking pairs.',
      bullets: ["Price portal-to-portal honestly.","Do not quote Fulton tower rates for Woodstock driveways."],
    },
    {
      id: 'family-sfh',
      title: 'Family multi-bedroom SFH peak',
      intro: 'School-calendar inventories dominate summer.',
      bullets: ["Packing help and Saturday supply matter more than elevators.","Book early May–August."],
    }
  ],
  relocation: {
    title: 'Schools & hospitals for relocators',
    intro:
      'Compressed secondary-market notes — primary districts and acute-care access that affect move-in.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & education',
        intro: 'Cherokee families compare Cherokee County School District feeders across Woodstock, Canton, and Holly Springs — verify boundaries; do not assume Fulton or Cobb maps apply.',
        bullets: [
          {
            title: 'District-first shopping',
            detail:
              'Use Georgia DOE data and district maps; do not assume a city name equals one feeder pattern.',
          },
          {
            title: 'Capacity & calendars',
            detail:
              'Growth pockets and university/military markets can tighten housing near school calendars.',
          },
        ],
      },
      {
        id: 'hospitals',
        title: 'Hospitals & healthcare',
        bullets: [
          {
            title: 'Acute-care anchors',
            detail: 'Northside Hospital Cherokee and regional clinics anchor acute care; map peak freeflow on I-575, not only off-hour freeflow.',
          },
          {
            title: 'Peak drive times',
            detail:
              'Map ER access at commute peaks, not only off-hour freeflow.',
          },
        ],
      },
    ],
  },
  costDrivers: {
    title: 'Pricing & cost drivers',
    intro: 'Empty miles, HOA soft costs, and I-575 peaks often matter more than raw miles.',
    drivers: [
      { title: 'Corridor freeflow', detail: 'Peak windows inflate hourly bills on short-looking pairs.' },
      { title: 'Access soft costs', detail: 'HOA packets, stairs, or last-mile shuttles add labor hours.' },
      { title: 'Long empty-mile edges', detail: 'Far pockets price differently from seat cores.' },
    ],
    ranges: [
      { label: 'Studio / 1-BR', value: '$450–$1,200+' },
      { label: '3–4 BR home', value: '$1,600–$4,200+', note: 'Higher with access friction' },
      { label: '2-person crew', value: '$120–$190+/hr' },
    ],
  },
  seasonal: {
    title: 'Seasonal & calendar notes',
    intro: 'School years and summer family closings reshape demand more than intown corporate calendars alone.',
    items: [
      { title: 'Late spring – early fall', detail: 'Family closings and peak calendars fill Saturday crews first.' },
      { title: 'School & institutional calendars', detail: 'Term, PCS, or school windows can outrank pure weekend demand.' },
    ],
  },
  resources: {
    title: 'Useful resources',
    intro:
      'Official links first; directory listings are independent. Verify Georgia DPS MCCD household-goods frameworks for in-state moves and FMCSA for interstate legs.',
    items: [
      { label: 'Fulton County (and Cobb northwest patterns) movers (parent contrast)', href: '/local-movers/georgia/fulton' },
    ],
  },
});

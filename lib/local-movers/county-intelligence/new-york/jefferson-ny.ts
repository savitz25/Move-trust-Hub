import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeNyTier2Pack,
  NY_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/new-york/ny-tier2-shared';

/**
 * jefferson — NY Tier 2 Wave 2
 */
export const jeffersonCountyTier2Intelligence: CountyIntelligencePack = finalizeNyTier2Pack({
  countySlug: 'jefferson',
  hubTitle: 'Jefferson County Moving Intelligence Hub',
  eyebrow: 'Jefferson · Watertown / Fort Drum · military-regional independent',
  h1: 'Moving in Jefferson County: Watertown, Fort Drum PCS & North Country Access',
  heroOpener:
    'Jefferson County is a military-regional independent market — Watertown multi-story and seat density, Fort Drum PCS calendars, lake-edge and rural North Country approaches, and I-81 freeflow that does not answer to Syracuse scripts alone. Expect orders-driven demand spikes, base-adjacent multi-family turnover, and winter last-mile that rejects soft schedules. This guide is for people moving in Jefferson as Watertown / Fort Drum product — not Onondaga with different labels and not a pure tourist Adirondack pack.',
  heroCredibility:
    'Fort Drum PCS · Watertown hub · North Country freeflow · NYSDOT household goods · FMCSA when interstate · Curated listings',
  majorCorridors: 'I-81 · NY-3 · NY-12 · NY-11 · NY-342 · NY-37 approaches',
  parentCompare: {
    parentLabel: 'independent military-regional (vs Onondaga / Central NY defaults)',
    parentHref: '/local-movers/new-york/onondaga',
    title: 'Compared with independent military-regional (vs Onondaga / Central NY defaults)',
    intro:
      'Jefferson is Watertown / Fort Drum military-regional product — not Syracuse university multi-family and not Capital Region freeflow alone.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'Onondaga crews fight Syracuse peaks and I-81 city approaches. Jefferson pairs ride I-81 north, NY-3, NY-12, and Fort Drum approaches — freer mid-day North Country freeflow, still peak-heavy on PCS windows and Watertown arterials.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'Onondaga mixes university multi-family and suburbs. Jefferson mixes Watertown multi-story, base-adjacent apartments, and rural North Country lots — more PCS turnover product, less continuous Syracuse college density.',
      },
      {
        title: 'Truck access & density',
        detail:
          'Base-adjacent multi-family needs management packets; rural and lake edges add empty miles and winter ice uncommon on inner Syracuse jobs.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local Jefferson quotes often track secondary North Country rates for driveway SFH — PCS spikes and multi-family access push prices up on peak order weeks.',
      },
      {
        title: 'Role difference',
        detail:
          'Jefferson is Fort Drum military-regional independent — not Onondaga Central NY renamed.',
      }
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Jefferson County different',
    intro: 'PCS calendars, Watertown multi-story, and North Country winter access — not interchangeable Syracuse boilerplate.',
    bullets: [
      {
        title: 'Fort Drum PCS windows rewrite demand',
        detail:
          'Order cycles fill local crews first — not only family Saturdays. Book early on peak PCS months.',
      },
      {
        title: 'Base-adjacent multi-family is first-class product',
        detail:
          'Elevators, long carries, and building packets need inventories different from pure rural playbooks.',
      },
      {
        title: 'Winter North Country access is operational',
        detail:
          'Ice, wind, and rural approaches need flexible morning plans and honest truck-size conversations.',
      },
      {
        title: 'I-81 freeflow is still billable',
        detail:
          'Watertown ↔ base or rural pairs freer mid-day still peak hard. Ask portal-to-portal.',
      },
      NY_TIER2_REG_BULLET,
    ],
  },
  zonesHeading: 'Jefferson zones: Watertown core, Fort Drum adjacent, lake edges & rural North Country',
  zonesIntro: 'Two to four sharp products — city, base multi-family, lake approaches, and rural edges.',
  zones: [
    {
      id: 'watertown-core',
      name: 'Watertown city core',
      shortName: 'Watertown',
      neighborhoods: ["Watertown","downtown","city neighborhoods"],
      housingTypes: 'Multi-story, multi-unit, older SFH',
      challenges: ["Stairs","Street parking","Winter ice"],
      moverTips: 'Inventory stairs; plan temporary no-parking; winter mornings need flexibility.',
      cityKeywords: ["watertown"],
    },
    {
      id: 'fort-drum-adjacent',
      name: 'Fort Drum adjacent multi-family',
      shortName: 'Fort Drum adjacent',
      neighborhoods: ["Fort Drum approaches","Calcium edges","base housing corridors"],
      housingTypes: 'Apartments, multi-family, military-adjacent leases',
      challenges: ["PCS clusters","Building COIs","Gate/timing constraints"],
      moverTips: 'Align to PCS windows; collect management packets; confirm any base access rules early.',
      cityKeywords: ["fort drum","calcium"],
    },
    {
      id: 'lake-edges',
      name: 'Lake Ontario / Thousand Islands edges',
      shortName: 'Lake edges',
      neighborhoods: ["Sackets Harbor edges","Clayton approaches","lake towns"],
      housingTypes: 'Seasonal homes, SFH, some multi-unit',
      challenges: ["Seasonal roads","Tourism peaks","Last-mile width"],
      moverTips: 'Photo approaches; plan around summer tourism where relevant.',
      cityKeywords: ["sackets harbor","clayton"],
    },
    {
      id: 'rural-nc',
      name: 'Rural North Country edges',
      shortName: 'Rural edges',
      neighborhoods: ["Adams","Carthage edges","northern towns"],
      housingTypes: 'Larger lots, rural approaches',
      challenges: ["Empty miles","Winter ice","Soft shoulders"],
      moverTips: 'Photo last-mile; allow winter buffer time.',
      cityKeywords: ["adams","carthage"],
    }
  ],
  specialized: [
    {
      id: 'pcs-turnover',
      title: 'Fort Drum PCS & military-adjacent turnover',
      intro: 'Order calendars create demand spikes and multi-family clusters.',
      bullets: ["Book early around peak PCS months.","Collect building packets and elevator windows before surveys finalize."],
    },
    {
      id: 'watertown-city',
      title: 'Watertown multi-story & winter access',
      intro: 'City stairs and ice are first-class cost drivers.',
      bullets: ["Inventory floor counts and street width.","Winter mornings need flexible start times."],
    },
    {
      id: 'north-country-freeflow',
      title: 'I-81 North Country freeflow',
      intro: 'Longer empty miles still peak hard on local pairs.',
      bullets: ["Price portal-to-portal time honestly.","Clarify interstate legs for Canadian-border and out-of-state destinations."],
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
        intro: 'Jefferson families compare Watertown City, Indian River, General Brown, and other districts — verify boundaries; PCS households should re-check enrollment timing.',
        bullets: [
          {
            title: 'District-first shopping',
            detail:
              'Use NYSED data and district maps; do not assume a village name equals one feeder pattern.',
          },
          {
            title: 'Capacity & calendars',
            detail:
              'Growth pockets, college towns, and seasonal markets can tighten housing near school calendars.',
          },
        ],
      },
      {
        id: 'hospitals',
        title: 'Hospitals & healthcare',
        bullets: [
          {
            title: 'Acute-care anchors',
            detail: 'Samaritan Medical Center and regional clinics anchor acute care; map peak freeflow across Watertown–Fort Drum approaches.',
          },
          {
            title: 'Peak drive times',
            detail:
              'Map ER access at commute peaks and weather days, not only off-hour freeflow.',
          },
        ],
      },
    ],
  },
  costDrivers: {
    title: 'Pricing & cost drivers',
    intro: 'PCS spikes, multi-family access, and winter empty miles often matter more than raw miles.',
    drivers: [
      {
        title: 'Corridor freeflow',
        detail: 'Peak windows inflate hourly bills on short-looking pairs.',
      },
      {
        title: 'Access soft costs',
        detail: 'Building packets, stairs, or last-mile shuttles add labor hours.',
      },
      {
        title: 'Long empty-mile edges',
        detail: 'Far pockets price differently from seat cores.',
      },
    ],
    ranges: [
      { label: 'Studio / 1-BR', value: '$450–$1,100+' },
      {
        label: '3–4 BR home',
        value: '$1,600–$4,000+',
        note: 'Higher with access friction',
      },
      { label: '2-person crew', value: '$115–$180+/hr' },
    ],
  },
  seasonal: {
    title: 'Seasonal & calendar notes',
    intro: 'PCS windows, school years, and harsh North Country winter reshape demand more than Syracuse university calendars alone.',
    items: [
      {
        title: 'Late spring – early fall',
        detail: 'Family closings and peak calendars fill Saturday crews first.',
      },
      {
        title: 'Winter access',
        detail: 'Hills, lake edges, and rural approaches need ice-aware morning plans.',
      },
    ],
  },
  resources: {
    title: 'Useful resources',
    intro:
      'Official links first; directory listings are independent. Verify NYSDOT household-goods frameworks for in-state moves and FMCSA for interstate legs.',
    items: [
      {
        label: 'independent military-regional (vs Onondaga / Central NY defaults) movers (parent contrast)',
        href: '/local-movers/new-york/onondaga',
      },
    ],
  },
});

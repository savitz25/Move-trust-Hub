import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeNyTier2Pack,
  NY_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/new-york/ny-tier2-shared';

/**
 * columbia — NY Tier 2 Wave 2
 */
export const columbiaCountyTier2Intelligence: CountyIntelligencePack = finalizeNyTier2Pack({
  countySlug: 'columbia',
  hubTitle: 'Columbia County Moving Intelligence Hub',
  eyebrow: 'Columbia · Hudson Upper Hudson · vs Dutchess / Albany',
  h1: 'Moving in Columbia County: Hudson Upper Hudson, Historic Villages & Taconic Access',
  heroOpener:
    'Columbia County is Upper Hudson product — Hudson multi-story and historic-city stock, Chatham and Kinderhook villages, Taconic freeflow, and longer empty miles that are not Dutchess rail-suburb density and not Albany government-core. Expect historic street geometry, second-home and arts-driven demand, and rural edges that reject full trailers more often than Poughkeepsie multi-family days. This guide is for people moving in Columbia as Hudson Upper Hudson — not Dutchess or Albany renames.',
  heroCredibility:
    'Hudson Upper Hudson · Historic villages · Taconic freeflow · NYSDOT household goods · FMCSA when interstate · Curated listings',
  majorCorridors: 'I-90 · Taconic State Parkway · NY-9H · NY-9 · NY-23 · NY-66',
  parentCompare: {
    parentLabel: 'Dutchess County (and Albany Capital patterns)',
    parentHref: '/local-movers/new-york/dutchess',
    title: 'Compared with Dutchess County (and Albany Capital patterns)',
    intro:
      'Columbia is Hudson / Upper Hudson historic and village product — not Dutchess east-bank rail suburbs and not Albany brownstones alone.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'Dutchess crews fight US-9 and rail-village peaks; Albany fights capital one-ways. Columbia pairs ride the Taconic, I-90 approaches, NY-9H, and NY-23 — freer mid-day Upper Hudson freeflow, still peak-heavy on Hudson city pairs and weekend second-home traffic.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'Dutchess mixes rail multi-family and growth suburbs; Albany mixes government-core stock. Columbia mixes Hudson multi-story historic, village SFH, and large rural lots — more continuous historic-village product, less continuous Metro-North multi-family density.',
      },
      {
        title: 'Truck access & density',
        detail:
          'Hudson historic streets often need smaller trucks and temporary no-parking; rural Taconic edges add empty miles uncommon on pure Poughkeepsie jobs.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local Columbia quotes often sit at secondary Upper Hudson rates for driveway SFH — historic access and second-home peaks can price above quiet rural days.',
      },
      {
        title: 'Role difference',
        detail:
          'Columbia is Upper Hudson historic Hudson + villages — not Dutchess rail collar or Albany capital renamed.',
      }
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Columbia County different',
    intro: 'Historic Hudson streets, village geometry, and Taconic freeflow — not a Dutchess clone.',
    bullets: [
      {
        title: 'Hudson historic multi-story is first-class product',
        detail:
          'Stairs, narrow streets, and curb rules need inventories different from pure rural playbooks.',
      },
      {
        title: 'Second-home and arts-driven demand spikes',
        detail:
          'Weekend peaks and seasonal arrivals rewrite local calendars more than pure family Saturdays.',
      },
      {
        title: 'Taconic freeflow is still billable',
        detail:
          'North–south pairs freer mid-day still peak hard. Ask portal-to-portal.',
      },
      {
        title: 'MA adjacency creates interstate legs',
        detail:
          'Short-looking border hops still need FMCSA authority.',
      },
      NY_TIER2_REG_BULLET,
    ],
  },
  zonesHeading: 'Columbia zones: Hudson core, Chatham/Kinderhook villages, Taconic edges & rural east',
  zonesIntro: 'Two to four sharp products — historic city, villages, Taconic approaches, and rural east lots.',
  zones: [
    {
      id: 'hudson-core',
      name: 'Hudson historic city core',
      shortName: 'Hudson',
      neighborhoods: ["Hudson","downtown","historic blocks"],
      housingTypes: 'Multi-story, historic stock, multi-unit',
      challenges: ["Narrow streets","Stairs","Tourism parking"],
      moverTips: 'Plan temporary no-parking; measure street width; inventory stairs.',
      cityKeywords: ["hudson"],
    },
    {
      id: 'villages',
      name: 'Chatham / Kinderhook village belt',
      shortName: 'Villages',
      neighborhoods: ["Chatham","Kinderhook","village edges"],
      housingTypes: 'Village SFH, some multi-unit',
      challenges: ["Street width","Weekend traffic"],
      moverTips: 'Confirm curb plans; photo village approaches.',
      cityKeywords: ["chatham","kinderhook"],
    },
    {
      id: 'taconic-edges',
      name: 'Taconic approach corridors',
      shortName: 'Taconic edges',
      neighborhoods: ["corridor towns","Taconic approaches"],
      housingTypes: 'SFH, mixed stock',
      challenges: ["Corridor freeflow","Longer local pairs"],
      moverTips: 'Price portal-to-portal on north–south pairs.',
      cityKeywords: ["columbia taconic"],
    },
    {
      id: 'rural-east',
      name: 'Rural east & larger lots',
      shortName: 'Rural east',
      neighborhoods: ["Hillsdale edges","Copake edges","eastern towns"],
      housingTypes: 'Larger lots, rural approaches',
      challenges: ["Empty miles","Soft shoulders","Winter ice"],
      moverTips: 'Photo last-mile; allow winter buffers.',
      cityKeywords: ["hillsdale","copake"],
    }
  ],
  specialized: [
    {
      id: 'hudson-historic',
      title: 'Hudson historic multi-story access',
      intro: 'Narrow streets and stairs are first-class cost drivers.',
      bullets: ["Inventory floor counts and street width.","Temporary no-parking often beats long carries."],
    },
    {
      id: 'village-second-home',
      title: 'Village & second-home logistics',
      intro: 'Weekend peaks rewrite curb plans.',
      bullets: ["Book early around summer and holiday weekends.","Confirm access rules for mixed-use village stock."],
    },
    {
      id: 'taconic-freeflow',
      title: 'Taconic / Upper Hudson freeflow',
      intro: 'North–south pairs still peak hard.',
      bullets: ["Price portal-to-portal honestly.","Clarify MA second addresses for interstate authority."],
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
        intro: 'Columbia families compare Hudson City, Chatham, Ichabod Crane, Taconic Hills, and other districts — verify boundaries; village and rural feeders differ.',
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
            detail: 'Columbia Memorial Health and regional clinics anchor acute care; map peak freeflow across Hudson–village corridors.',
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
    intro: 'Historic access, weekend peaks, and empty miles often matter more than raw miles.',
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
    intro: 'Second-home weekends, school years, and winter ice reshape demand more than Dutchess rail commute peaks alone.',
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
        label: 'Dutchess County (and Albany Capital patterns) movers (parent contrast)',
        href: '/local-movers/new-york/dutchess',
      },
    ],
  },
});

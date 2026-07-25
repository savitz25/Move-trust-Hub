import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeNyTier2Pack,
  NY_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/new-york/ny-tier2-shared';

/**
 * warren — NY Tier 2 Wave 2
 */
export const warrenCountyNyTier2Intelligence: CountyIntelligencePack = finalizeNyTier2Pack({
  countySlug: 'warren',
  hubTitle: 'Warren County Moving Intelligence Hub',
  eyebrow: 'Warren · Glens Falls Adirondack south · vs Saratoga / Albany',
  h1: 'Moving in Warren County: Glens Falls, Lake George Edge & Adirondack South Access',
  heroOpener:
    'Warren County is Adirondack south product — Glens Falls multi-story and seat density, Queensbury retail corridors, Lake George seasonal villages, and I-87 freeflow that is not Saratoga Springs tourism growth alone and not Albany government-core. Expect seasonal tourism peaks, mountain last-mile, and lake approaches that reject full trailers more often than Clifton Park HOAs. This guide is for people moving in Warren as Glens Falls / Lake George Adirondack south — not Saratoga renamed.',
  heroCredibility:
    'Glens Falls · Lake George seasonal · Adirondack south · NYSDOT household goods · FMCSA when interstate · Curated listings',
  majorCorridors: 'I-87 · NY-9 · NY-9N · NY-149 · NY-8 · NY-28 approaches',
  parentCompare: {
    parentLabel: 'Saratoga County (and Albany Capital patterns)',
    parentHref: '/local-movers/new-york/saratoga',
    title: 'Compared with Saratoga County (and Albany Capital patterns)',
    intro:
      'Warren is Glens Falls / Lake George Adirondack south — not Saratoga Springs track-season growth suburbs and not Albany brownstones alone.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'Saratoga crews fight Northway peaks toward Albany and track-season weekends. Warren pairs ride I-87 further north, NY-9, and NY-9N — freer mid-day mid-week, still peak-heavy on Lake George summer weekends and Glens Falls arterials.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'Saratoga mixes spa-town density and Clifton Park HOAs. Warren mixes Glens Falls multi-story, Queensbury retail-corridor SFH, and Lake George seasonal stock — more continuous tourism-village product, less Capital-collar planned suburbs.',
      },
      {
        title: 'Truck access & density',
        detail:
          'Lake villages and mountain approaches often need smaller trucks; seasonal curb plans differ from pure Clifton Park driveway days.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local Warren quotes often sit near secondary Adirondack-south rates for driveway SFH — seasonal peaks and mountain shuttles can price above quiet Saratoga suburb days.',
      },
      {
        title: 'Role difference',
        detail:
          'Warren is Adirondack south Glens Falls / Lake George product — not Saratoga Capital-collar growth renamed.',
      }
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Warren County different',
    intro: 'Lake George seasonal peaks, Glens Falls multi-story, and Adirondack last-mile — not a Saratoga clone.',
    bullets: [
      {
        title: 'Lake George tourism peaks rewrite demand',
        detail:
          'Summer weekends fill crews and tighten village staging — not only family Saturdays.',
      },
      {
        title: 'Glens Falls multi-story is first-class product',
        detail:
          'Stairs and street parking need inventories different from pure resort cottages.',
      },
      {
        title: 'Mountain / lake last-mile rewrites truck size',
        detail:
          'Photo approaches; many lake streets reject full trailers.',
      },
      {
        title: 'I-87 freeflow is still billable',
        detail:
          'Northway pairs freer mid-day still peak hard. Ask portal-to-portal.',
      },
      NY_TIER2_REG_BULLET,
    ],
  },
  zonesHeading: 'Warren zones: Glens Falls core, Queensbury corridors, Lake George villages & Adirondack edges',
  zonesIntro: 'Two to four sharp products — seat city, retail corridors, seasonal lake villages, and mountain edges.',
  zones: [
    {
      id: 'glens-falls',
      name: 'Glens Falls city core',
      shortName: 'Glens Falls',
      neighborhoods: ["Glens Falls","downtown","city neighborhoods"],
      housingTypes: 'Multi-story, multi-unit, older SFH',
      challenges: ["Stairs","Street parking"],
      moverTips: 'Inventory stairs; plan temporary no-parking.',
      cityKeywords: ["glens falls"],
    },
    {
      id: 'queensbury',
      name: 'Queensbury retail & suburban corridors',
      shortName: 'Queensbury',
      neighborhoods: ["Queensbury","retail corridor edges"],
      housingTypes: 'SFH, townhomes, some multi-family',
      challenges: ["Arterial timing","Cul-de-sac staging"],
      moverTips: 'Avoid peak retail windows; confirm driveway access.',
      cityKeywords: ["queensbury"],
    },
    {
      id: 'lake-george',
      name: 'Lake George seasonal villages',
      shortName: 'Lake George',
      neighborhoods: ["Lake George","lake villages","tourist approaches"],
      housingTypes: 'Seasonal homes, multi-unit tourism stock, SFH',
      challenges: ["Tourism parking","Narrow streets","Seasonal access"],
      moverTips: 'Book early for summer peaks; photo street width; plan smaller trucks.',
      cityKeywords: ["lake george"],
    },
    {
      id: 'adirondack-edges',
      name: 'Adirondack mountain edges',
      shortName: 'Adirondack edges',
      neighborhoods: ["Warrensburg edges","mountain towns"],
      housingTypes: 'Larger lots, mountain approaches',
      challenges: ["Grades","Empty miles","Winter ice"],
      moverTips: 'Photo last-mile; winter buffers required.',
      cityKeywords: ["warrensburg"],
    }
  ],
  specialized: [
    {
      id: 'lake-george-seasonal',
      title: 'Lake George seasonal & tourism product',
      intro: 'Summer peaks rewrite demand and curb plans.',
      bullets: ["Book early for peak summer weekends.","Confirm access rules for seasonal multi-unit stock."],
    },
    {
      id: 'glens-falls-city',
      title: 'Glens Falls multi-story access',
      intro: 'City stairs are first-class cost drivers.',
      bullets: ["Inventory floor counts.","Temporary no-parking often beats long carries."],
    },
    {
      id: 'adirondack-last-mile',
      title: 'Adirondack south last-mile',
      intro: 'Mountain approaches rewrite truck size.',
      bullets: ["Photo last-mile before surveys finalize.","Do not quote Saratoga HOA rates for lake-village peaks."],
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
        intro: 'Warren families compare Glens Falls, Queensbury, Lake George, and other districts — verify boundaries; tourism towns and seat feeders differ.',
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
            detail: 'Glens Falls Hospital and regional clinics anchor acute care; map peak freeflow across Glens Falls–Queensbury and summer lake congestion.',
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
    intro: 'Seasonal peaks, multi-story access, and mountain last-mile often matter more than raw miles.',
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
    intro: 'Lake George summers, school years, and Adirondack winter ice reshape demand more than Saratoga track season alone.',
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
        label: 'Saratoga County (and Albany Capital patterns) movers (parent contrast)',
        href: '/local-movers/new-york/saratoga',
      },
    ],
  },
});

import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeCoTier2Pack,
  CO_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/colorado/co-tier2-shared';

/**
 * summit â€” CO Tier 2 Wave 1
 */
export const summitCountyCoTier2Intelligence: CountyIntelligencePack = finalizeCoTier2Pack({
  countySlug: 'summit',
  hubTitle: 'Summit County Moving Intelligence Hub',
  eyebrow: 'Summit · Breckenridge / Frisco / Silverthorne — high-country resorts',
  h1: 'Moving in Summit County: Breckenridge, Frisco & High-Country Resort Access',
  heroOpener:
    'Summit County is high-country resort product — Breckenridge multi-story and resort density, Frisco multi-family and lake-edge stock, Silverthorne and Dillon corridor approaches, and freeflow that still peaks hard on I-70 and CO-9 tourism windows. Expect elevation weather, association truck limits, and seasonal calendars under one county. This guide is for people moving in Summit as independent high-country resort — not an Eagle/Vail rename.',
  heroCredibility:
    'High-country resorts · Breckenridge / Frisco · Seasonal logistics · CO PUC HHG · FMCSA when interstate · Curated listings',
  majorCorridors: 'I-70 · CO-9 · US-6 · Swan Mountain Road · Main Street corridors',
  lastReviewed: '2026-07-25',
  parentCompare: {
    parentLabel: 'independent high-country (vs Eagle / Front Range)',
    parentHref: '/local-movers/colorado/eagle',
    title: 'Compared with independent high-country (vs Eagle / Front Range)',
    intro:
      'Summit is high-country Breckenridge/Frisco/Silverthorne product — not Eagle Vail/Edwards I-70 corridor product alone and not Front Range density.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'Eagle crews fight Vail/Edwards I-70 peaks. Summit pairs ride I-70, CO-9, and lake-corridor arterials — freer mid-day off-peak freeflow, still peak-heavy on Breckenridge tourism weekends and Frisco arterials.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'Eagle mixes Vail multi-story and Edwards planned multi-family. Summit mixes Breckenridge multi-story, Frisco multi-unit, and Silverthorne corridor stock — more high-country lake-basin product, less continuous Vail village density.',
      },
      {
        title: 'Truck access & density',
        detail:
          'Resort associations limit truck size; lake approaches can be narrow; winter chain/closure risk is first-class.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local Summit quotes often track premium high-country secondary rates when associations require shuttles — clean Frisco driveway SFH can price lower than Breckenridge multi-story jobs.',
      },
      {
        title: 'Role difference',
        detail:
          'Summit is high-country multi-town resort basin — not Eagle Vail corridor renamed.',
      }
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Summit County different',
    intro: 'High-country multi-town resort density, CO-9 freeflow, and seasonal peaks — not interchangeable Eagle boilerplate.',
    bullets: [
      {
        title: 'Ski-season peaks rewrite weekends',
        detail:
          'Breckenridge/Frisco volume stacks around major tourism windows. Book early.',
      },
      {
        title: 'Resort association access is first-class product',
        detail:
          'Truck limits and elevators rewrite pure driveway rates.',
      },
      {
        title: 'Distinct from Eagle/Vail corridor product',
        detail:
          'Do not recycle Vail/Edwards day rates alone.',
      },
      {
        title: 'I-70 / CO-9 freeflow is still billable',
        detail:
          'Pass conditions and peaks rewrite short-looking pairs. Ask portal-to-portal.',
      },
      CO_TIER2_REG_BULLET,
    ],
  },
  zonesHeading: 'Summit zones: Breckenridge multi-story, Frisco multi-family, Silverthorne/Dillon corridors & rural lots',
  zonesIntro: 'Two to four sharp products — resort multi-story, lake multi-family, corridor stock, and rural lots.',
  zones: [
    {
      id: 'breckenridge',
      name: 'Breckenridge multi-story & resort density',
      shortName: 'Breckenridge',
      neighborhoods: ["Breckenridge","resort multi-family","village edges"],
      housingTypes: 'Multi-story, multi-unit, elevators',
      challenges: ["Association packets","Tourism peaks","Grades"],
      moverTips: 'Collect association rules; book around peak weekends.',
      cityKeywords: ["breckenridge"],
    },
    {
      id: 'frisco',
      name: 'Frisco multi-family & lake-edge stock',
      shortName: 'Frisco',
      neighborhoods: ["Frisco","lake multi-family","Main Street edges"],
      housingTypes: 'Multi-family, SFH, townhomes',
      challenges: ["Elevators/stairs","Tourism freeflow","Street parking"],
      moverTips: 'Confirm elevator rules; build tourism-weekend buffers.',
      cityKeywords: ["frisco"],
    },
    {
      id: 'silverthorne',
      name: 'Silverthorne / Dillon corridor stock',
      shortName: 'Silverthorne / Dillon',
      neighborhoods: ["Silverthorne","Dillon","corridor multi-family"],
      housingTypes: 'SFH, multi-family, mixed stock',
      challenges: ["I-70 freeflow","HOA packets"],
      moverTips: 'Collect HOA docs; prefer early starts.',
      cityKeywords: ["silverthorne","dillon"],
    },
    {
      id: 'rural-high',
      name: 'Rural high-country lots',
      shortName: 'Rural high',
      neighborhoods: ["rural tracts","mountain approaches"],
      housingTypes: 'Larger lots, mountain approaches',
      challenges: ["Empty miles","Grades","Winter ice"],
      moverTips: 'Photo approaches; winter mornings need flexibility.',
      cityKeywords: ["rural summit"],
    }
  ],
  specialized: [
    {
      id: 'vs-eagle',
      title: 'Summit vs Eagle product distinction',
      intro: 'High-country basin towns differ from Vail/Edwards corridor density.',
      bullets: ["Do not recycle Vail/Edwards day rates alone.","Clarify Eagle second addresses for drive-time assumptions."],
    },
    {
      id: 'resort-assoc',
      title: 'Breckenridge resort association last-mile',
      intro: 'Association truck limits are first-class cost drivers.',
      bullets: ["Confirm size limits and elevator rules early.","Build tourism peak buffers."],
    },
    {
      id: 'i70-co9',
      title: 'I-70 / CO-9 freeflow',
      intro: 'Pass conditions rewrite freeflow assumptions.',
      bullets: ["Price portal-to-portal honestly.","Monitor closures and chain laws in season."],
    }
  ],
  relocation: {
    title: 'Schools & hospitals for relocators',
    intro:
      'Compressed secondary-market notes Ã¢â‚¬â€ primary districts and acute-care access that affect move-in.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & education',
        intro: 'Summit families compare Summit School District feeders across Breckenridge, Frisco, Silverthorne, and related communities — verify address boundaries.',
        bullets: [
          {
            title: 'District-first shopping',
            detail:
              'Use CDE data and district maps; do not assume a city name equals one feeder pattern.',
          },
          {
            title: 'Capacity & calendars',
            detail:
              'Growth pockets, university towns, and military markets can tighten housing near school and term calendars.',
          },
        ],
      },
      {
        id: 'hospitals',
        title: 'Hospitals & healthcare',
        bullets: [
          {
            title: 'Acute-care anchors',
            detail: 'St. Anthony Summit Medical Center and regional specialty spillover serve the county; map peak I-70 / CO-9 times for ER access.',
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
    intro: 'Association last-mile, seasonal peaks, and mountain freeflow often matter more than raw miles.',
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
        detail: 'Far pockets price differently from seat suburbs.',
      },
    ],
    ranges: [
      { label: 'Studio / 1-BR', value: '$450Ã¢â‚¬â€œ$1,200+' },
      { label: '3Ã¢â‚¬â€œ4 BR home', value: '$1,600Ã¢â‚¬â€œ$4,200+', note: 'Higher with access friction' },
      { label: '2-person crew', value: '$115Ã¢â‚¬â€œ$185+/hr' },
    ],
  },
  seasonal: {
    title: 'Seasonal & calendar notes',
    intro: 'Ski season, summer tourism, school years, and winter ice reshape demand by pocket.',
    items: [
      {
        title: 'Late spring Ã¢â‚¬â€œ early fall',
        detail: 'Family closings and peak calendars fill Saturday crews first.',
      },
      {
        title: 'Institutional & weather windows',
        detail:
          'School, university, PCS, tourism, or storm seasons can outrank pure weekend preference.',
      },
    ],
  },
  resources: {
    title: 'Useful resources',
    intro:
      'Official links first; directory listings are independent. Verify Colorado PUC household goods (HHG) permit for in-state Colorado moves and FMCSA for interstate legs.',
    items: [
      {
        label: 'independent high-country (vs Eagle / Front Range) movers (parent contrast)',
        href: '/local-movers/colorado/eagle',
      },
      {
        label: 'Denver County movers',
        href: '/local-movers/colorado/denver',
      },
    ],
  },
});

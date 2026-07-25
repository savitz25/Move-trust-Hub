import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeCoTier2Pack,
  CO_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/colorado/co-tier2-shared';

/**
 * eagle â€” CO Tier 2 Wave 1
 */
export const eagleCountyCoTier2Intelligence: CountyIntelligencePack = finalizeCoTier2Pack({
  countySlug: 'eagle',
  hubTitle: 'Eagle County Moving Intelligence Hub',
  eyebrow: 'Eagle · Vail / Edwards / Eagle — mountain resort corridor',
  h1: 'Moving in Eagle County: Vail, Edwards & I-70 Mountain Resort Access',
  heroOpener:
    'Eagle County is I-70 mountain resort corridor product — Vail multi-story and resort density, Edwards multi-family and HOA growth, Eagle seat stock, and freeflow that still peaks hard on winter tourism windows. Expect elevation weather, association truck limits, and seasonal calendars under one county. This guide is for people moving in Eagle as independent mountain resort — not Front Range defaults and not a Summit County rename.',
  heroCredibility:
    'I-70 resort corridor · Vail / Edwards · Seasonal logistics · CO PUC HHG · FMCSA when interstate · Curated listings',
  majorCorridors: 'I-70 · US-6 · US-24 · CO-131 · Avon Road / Edwards corridors',
  lastReviewed: '2026-07-25',
  parentCompare: {
    parentLabel: 'independent mountain resort (vs Front Range / Summit)',
    parentHref: '/local-movers/colorado/denver',
    title: 'Compared with independent mountain resort (vs Front Range / Summit)',
    intro:
      'Eagle is I-70 Vail/Edwards resort-corridor product — not Denver Front Range density and not Summit high-country Breckenridge/Frisco product alone.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'Front Range crews fight metro peaks. Eagle pairs ride I-70 mountain corridors — freer mid-day off-peak freeflow, still peak-heavy on ski weekends, pass closures, and Avon/Edwards arterials.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'Front Range mixes elevators and plains HOAs. Eagle mixes Vail multi-story, Edwards planned multi-family, and Eagle seat stock — more resort-association product, less continuous metro density.',
      },
      {
        title: 'Truck access & density',
        detail:
          'Resort associations limit truck size; grades rewrite staging; winter chain/closure risk is first-class.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local Eagle quotes often track premium mountain secondary rates when associations require shuttles — clean Eagle driveway SFH can price lower than Vail multi-story jobs.',
      },
      {
        title: 'Role difference',
        detail:
          'Eagle is I-70 mountain resort corridor — not Summit high-country product renamed.',
      }
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Eagle County different',
    intro: 'Resort association last-mile, I-70 mountain freeflow, and seasonal peaks — not interchangeable Summit or Front Range boilerplate.',
    bullets: [
      {
        title: 'Ski-season peaks rewrite weekends',
        detail:
          'Vail/Edwards volume stacks around major tourism windows. Book early.',
      },
      {
        title: 'Resort association access is first-class product',
        detail:
          'Truck limits and elevators rewrite pure driveway rates.',
      },
      {
        title: 'I-70 mountain freeflow is still billable',
        detail:
          'Pass conditions and peaks rewrite short-looking pairs. Ask portal-to-portal.',
      },
      {
        title: 'Distinct from Summit high-country product',
        detail:
          'Do not recycle Breckenridge/Frisco day rates alone.',
      },
      CO_TIER2_REG_BULLET,
    ],
  },
  zonesHeading: 'Eagle zones: Vail multi-story, Edwards multi-family, Eagle seat & rural mountain lots',
  zonesIntro: 'Two to four sharp products — resort multi-story, corridor multi-family, seat stock, and rural lots.',
  zones: [
    {
      id: 'vail',
      name: 'Vail multi-story & resort density',
      shortName: 'Vail',
      neighborhoods: ["Vail","resort multi-family","village edges"],
      housingTypes: 'Multi-story, multi-unit, elevators',
      challenges: ["Association packets","Tourism peaks","Grades"],
      moverTips: 'Collect association rules; book around peak weekends.',
      cityKeywords: ["vail"],
    },
    {
      id: 'edwards',
      name: 'Edwards multi-family & HOA growth',
      shortName: 'Edwards',
      neighborhoods: ["Edwards","Avon edges","growth multi-family"],
      housingTypes: 'Multi-family, HOA SFH, townhomes',
      challenges: ["HOA packets","I-70 freeflow","Lease clusters"],
      moverTips: 'Collect HOA COIs; build I-70 peak buffers.',
      cityKeywords: ["edwards","avon"],
    },
    {
      id: 'eagle-seat',
      name: 'Eagle seat multi-story & older stock',
      shortName: 'Eagle',
      neighborhoods: ["Eagle","downtown edges"],
      housingTypes: 'Multi-story, multi-unit, older SFH',
      challenges: ["Stairs","Street parking"],
      moverTips: 'Inventory stairs; plan temporary no-parking.',
      cityKeywords: ["eagle"],
    },
    {
      id: 'rural-mtn',
      name: 'Rural mountain lots & Gypsum edges',
      shortName: 'Rural mountain',
      neighborhoods: ["Gypsum edges","rural tracts"],
      housingTypes: 'Larger lots, mountain approaches',
      challenges: ["Empty miles","Grades","Winter ice"],
      moverTips: 'Photo approaches; winter mornings need flexibility.',
      cityKeywords: ["gypsum","rural eagle"],
    }
  ],
  specialized: [
    {
      id: 'resort-assoc',
      title: 'Vail resort association last-mile',
      intro: 'Association truck limits are first-class cost drivers.',
      bullets: ["Confirm size limits and elevator rules early.","Build tourism peak buffers."],
    },
    {
      id: 'i70-mtn',
      title: 'I-70 mountain freeflow',
      intro: 'Pass conditions rewrite freeflow assumptions.',
      bullets: ["Price portal-to-portal honestly.","Monitor closures and chain laws in season."],
    },
    {
      id: 'vs-summit',
      title: 'Eagle vs Summit product distinction',
      intro: 'I-70 Vail corridor differs from Summit high-country towns.',
      bullets: ["Do not recycle Breckenridge/Frisco day rates alone.","Clarify second-county addresses for drive-time assumptions."],
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
        intro: 'Eagle families compare Eagle County Schools feeders across Vail, Edwards, Eagle, and related communities — verify address boundaries.',
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
            detail: 'Vail Health and regional specialty spillover serve the county; map peak I-70 times for ER access.',
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
    intro: 'Association last-mile, I-70 freeflow, and seasonal peaks often matter more than raw miles.',
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
        label: 'independent mountain resort (vs Front Range / Summit) movers (parent contrast)',
        href: '/local-movers/colorado/denver',
      },
      {
        label: 'Summit County movers',
        href: '/local-movers/colorado/summit',
      },
    ],
  },
});

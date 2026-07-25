import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeCoTier2Pack,
  CO_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/colorado/co-tier2-shared';

/**
 * routt â€” CO Tier 2 Wave 1
 */
export const routtCountyCoTier2Intelligence: CountyIntelligencePack = finalizeCoTier2Pack({
  countySlug: 'routt',
  hubTitle: 'Routt County Moving Intelligence Hub',
  eyebrow: 'Routt · Steamboat Springs — northwest ski hub',
  h1: 'Moving in Routt County: Steamboat Springs, Yampa Valley & NW Resort Access',
  heroOpener:
    'Routt County is northwest Colorado Yampa Valley resort product — Steamboat Springs multi-story and resort density, multi-family growth edges, Hayden and rural valley approaches, and freeflow that is not I-70 Eagle/Summit corridor product with different labels. Expect elevation weather, association truck limits, and seasonal calendars under one county. This guide is for people moving in Routt as independent NW mountain hub — not a Summit or Eagle rename.',
  heroCredibility:
    'NW mountain independent · Steamboat / Yampa Valley · Seasonal logistics · CO PUC HHG · FMCSA when interstate · Curated listings',
  majorCorridors: 'US-40 · CO-131 · CO-14 · Lincoln Avenue corridor',
  lastReviewed: '2026-07-25',
  parentCompare: {
    parentLabel: 'independent NW mountain (vs Eagle / Summit)',
    parentHref: '/local-movers/colorado/eagle',
    title: 'Compared with independent NW mountain (vs Eagle / Summit)',
    intro:
      'Routt is independent Yampa Valley Steamboat resort product — not Eagle Vail corridor and not Summit high-country basin product alone.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'Eagle/Summit crews fight I-70 pass peaks. Routt pairs ride US-40 and valley arterials — freer mid-day Yampa freeflow, still peak-heavy on Steamboat tourism weekends and winter weather windows.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'I-70 resorts mix corridor multi-story and lake-basin multi-family. Routt mixes Steamboat multi-story, valley multi-family, and rural lots — more Yampa Valley product, less continuous I-70 corridor density.',
      },
      {
        title: 'Truck access & density',
        detail:
          'Resort associations limit truck size; grades rewrite staging; winter weather is first-class.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local Routt quotes often track premium NW mountain secondary rates when associations require shuttles — clean valley driveway SFH can price lower than resort multi-story jobs.',
      },
      {
        title: 'Role difference',
        detail:
          'Routt is independent NW Yampa Valley resort hub — not Eagle or Summit product renamed.',
      }
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Routt County different',
    intro: 'Steamboat multi-story, Yampa freeflow, and seasonal peaks — not interchangeable I-70 resort boilerplate.',
    bullets: [
      {
        title: 'Ski-season peaks rewrite weekends',
        detail:
          'Steamboat volume stacks around major tourism windows. Book early.',
      },
      {
        title: 'Resort association access is first-class product',
        detail:
          'Truck limits and elevators rewrite pure driveway rates.',
      },
      {
        title: 'Distinct from Eagle and Summit I-70 products',
        detail:
          'Do not recycle Vail or Breckenridge day rates alone.',
      },
      {
        title: 'US-40 freeflow is still billable',
        detail:
          'Valley pairs freer mid-day still peak hard. Ask portal-to-portal.',
      },
      CO_TIER2_REG_BULLET,
    ],
  },
  zonesHeading: 'Routt zones: Steamboat multi-story, multi-family growth, Hayden edges & rural valley lots',
  zonesIntro: 'Two to four sharp products — resort multi-story, multi-family growth, corridor edges, and rural lots.',
  zones: [
    {
      id: 'steamboat',
      name: 'Steamboat Springs multi-story & resort density',
      shortName: 'Steamboat',
      neighborhoods: ["Steamboat Springs","resort multi-family","village edges"],
      housingTypes: 'Multi-story, multi-unit, elevators',
      challenges: ["Association packets","Tourism peaks","Grades"],
      moverTips: 'Collect association rules; book around peak weekends.',
      cityKeywords: ["steamboat springs"],
    },
    {
      id: 'multi-growth',
      name: 'Steamboat multi-family growth edges',
      shortName: 'Multi-family growth',
      neighborhoods: ["growth multi-family","valley multi-unit"],
      housingTypes: 'Multi-family, apartments, townhomes',
      challenges: ["Elevators","HOA packets","Lease clusters"],
      moverTips: 'Collect building rules; build tourism buffers.',
      cityKeywords: ["steamboat multi"],
    },
    {
      id: 'hayden',
      name: 'Hayden / US-40 corridor edges',
      shortName: 'Hayden',
      neighborhoods: ["Hayden","US-40 multi-family"],
      housingTypes: 'SFH, multi-family, mixed stock',
      challenges: ["Empty miles","Arterial timing"],
      moverTips: 'Prefer early starts; confirm driveway depth.',
      cityKeywords: ["hayden"],
    },
    {
      id: 'rural-yampa',
      name: 'Rural Yampa valley lots',
      shortName: 'Rural valley',
      neighborhoods: ["rural tracts","mountain approaches"],
      housingTypes: 'Larger lots, rural approaches',
      challenges: ["Long empty miles","Soft shoulders","Winter ice"],
      moverTips: 'Photo approaches; winter mornings need flexibility.',
      cityKeywords: ["rural routt"],
    }
  ],
  specialized: [
    {
      id: 'vs-i70',
      title: 'Routt vs Eagle/Summit distinction',
      intro: 'Yampa Valley product differs from I-70 corridor resorts.',
      bullets: ["Do not recycle Vail or Breckenridge day rates alone.","Clarify Eagle/Summit second addresses for long empty-mile assumptions."],
    },
    {
      id: 'resort-assoc',
      title: 'Steamboat resort association last-mile',
      intro: 'Association truck limits are first-class cost drivers.',
      bullets: ["Confirm size limits and elevator rules early.","Build tourism peak buffers."],
    },
    {
      id: 'us40-freeflow',
      title: 'US-40 Yampa freeflow',
      intro: 'Valley pairs still peak hard on arterials.',
      bullets: ["Price portal-to-portal honestly.","Monitor winter weather windows."],
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
        intro: 'Routt families compare Steamboat Springs RE-2 and related district feeders — verify address boundaries.',
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
            detail: 'UCHealth Yampa Valley Medical Center anchors acute care; map peak US-40 times for ER access.',
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
    intro: 'Association last-mile, seasonal peaks, and valley freeflow often matter more than raw miles.',
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
        label: 'independent NW mountain (vs Eagle / Summit) movers (parent contrast)',
        href: '/local-movers/colorado/eagle',
      },
      {
        label: 'Summit County movers',
        href: '/local-movers/colorado/summit',
      },
    ],
  },
});

import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeNcTier2Pack,
  NC_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/north-carolina/nc-tier2-shared';

/**
 * davidson — NC Tier 2 Wave 1
 */
export const davidsonCountyNcTier2Intelligence: CountyIntelligencePack = finalizeNcTier2Pack({
  countySlug: 'davidson',
  hubTitle: 'Davidson County Moving Intelligence Hub',
  eyebrow: 'Davidson · Lexington / Thomasville — Triad south',
  h1: 'Moving in Davidson County: Lexington, Thomasville & I-85 Triad-South Access',
  heroOpener:
    'Davidson County is Triad south on I-85 — Lexington multi-story and seat stock, Thomasville furniture-region residential, Welcome and mid-county corridors, and freeflow that is not Winston-Salem West End stairs or Greensboro core with different labels. Expect furniture-legacy multi-unit, longer empty miles between discontinuous towns, and industrial-residential mix under one county. This guide is for people moving in Davidson as Triad south secondary — not a Forsyth or Guilford rename.',
  heroCredibility:
    'Triad south · Lexington / Thomasville · I-85 furniture-region · NCUC household goods · FMCSA when interstate · Curated listings',
  majorCorridors: 'I-85 · US-29 · US-52 · US-64 · NC-8 · Business 85',
  lastReviewed: '2026-07-24',
  parentCompare: {
    parentLabel: 'Forsyth County',
    parentHref: '/local-movers/north-carolina/forsyth',
    title: 'Compared with Forsyth County',
    intro:
      'Davidson is I-85 Triad-south furniture-region residential — not Forsyth Winston-Salem core and not Guilford Greensboro density alone.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'Forsyth crews fight Winston-Salem arterials and US-52 peaks. Davidson pairs ride I-85, US-29/70, and US-64 — freer mid-day south of the Triad core, still peak-heavy on Lexington arterials and Thomasville corridors.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'Forsyth mixes West End stairs and suburban multi-family. Davidson mixes Lexington multi-story, Thomasville multi-unit, and mid-county SFH — more furniture-region town product, less continuous Winston core density.',
      },
      {
        title: 'Truck access & density',
        detail:
          'Seat multi-story needs curb plans; industrial-adjacent streets rewrite truck type; rural edges add soft shoulders.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local Davidson quotes often sit at Triad-south secondary rates for driveway SFH — multi-story access and empty-mile town pairs still push prices up.',
      },
      {
        title: 'Role difference',
        detail:
          'Davidson is Triad south furniture-region collar — not Forsyth or Guilford core renamed.',
      }
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Davidson County different',
    intro: 'I-85 south freeflow, furniture-region multi-unit, and seat multi-story — not interchangeable Winston-Salem boilerplate.',
    bullets: [
      {
        title: 'I-85 freeflow is still billable',
        detail:
          'Davidson ↔ Forsyth/Guilford pairs freer mid-day still peak hard. Ask portal-to-portal.',
      },
      {
        title: 'Lexington multi-story is first-class product',
        detail:
          'Seat stairs need inventories different from mid-county cul-de-sacs.',
      },
      {
        title: 'Thomasville multi-unit carries furniture-region fabric',
        detail:
          'Older industrial-residential streets rewrite pure HOA day rates.',
      },
      {
        title: 'Discontinuous towns add empty miles',
        detail:
          'Town-to-town pairs fail when crews assume continuous Triad density.',
      },
      NC_TIER2_REG_BULLET,
    ],
  },
  zonesHeading: 'Davidson zones: Lexington seat, Thomasville multi-unit, mid-county corridor & southern edges',
  zonesIntro: 'Two to four sharp products — seat multi-story, furniture-town multi-unit, mid-corridor, and southern edges.',
  zones: [
    {
      id: 'lexington',
      name: 'Lexington multi-story & seat stock',
      shortName: 'Lexington',
      neighborhoods: ["Lexington","downtown edges","seat multi-family"],
      housingTypes: 'Multi-story, multi-unit, older SFH',
      challenges: ["Stairs","Street parking","I-85 freeflow"],
      moverTips: 'Inventory stairs; plan temporary no-parking.',
      cityKeywords: ["lexington"],
    },
    {
      id: 'thomasville',
      name: 'Thomasville multi-unit & furniture-region stock',
      shortName: 'Thomasville',
      neighborhoods: ["Thomasville","multi-family corridors","older SFH"],
      housingTypes: 'Multi-unit, twins, older SFH',
      challenges: ["Mixed curb","Arterial timing","Industrial edges"],
      moverTips: 'Survey street width; prefer early starts.',
      cityKeywords: ["thomasville"],
    },
    {
      id: 'mid-county',
      name: 'Welcome / mid-county corridor',
      shortName: 'Mid-county',
      neighborhoods: ["Welcome","mid-county SFH","US-52 edges"],
      housingTypes: 'SFH, multi-family, mixed stock',
      challenges: ["Arterial timing","Empty miles"],
      moverTips: 'Prefer early starts; confirm driveway depth.',
      cityKeywords: ["welcome","mid davidson"],
    },
    {
      id: 'south-edge',
      name: 'Southern Davidson larger lots',
      shortName: 'South edge',
      neighborhoods: ["Denton edges","southern tracts"],
      housingTypes: 'Larger lots, rural approaches',
      challenges: ["Empty miles","Soft shoulders"],
      moverTips: 'Photo approaches; soft ground after rain can block heavy trucks.',
      cityKeywords: ["denton","south davidson"],
    }
  ],
  specialized: [
    {
      id: 'i85-south',
      title: 'I-85 Triad-south freeflow',
      intro: 'South-Triad pairs still peak hard toward Winston-Salem or Greensboro.',
      bullets: ["Price portal-to-portal honestly.","Clarify Forsyth or Guilford second addresses early."],
    },
    {
      id: 'furniture-stock',
      title: 'Furniture-region multi-unit module',
      intro: 'Thomasville/Lexington older stock is first-class product.',
      bullets: ["Inventory stairs and curb width.","Do not recycle Winston-Salem West End day rates alone."],
    },
    {
      id: 'lexington-seat',
      title: 'Lexington seat multi-story access',
      intro: 'Seat stairs are a first-class cost driver.',
      bullets: ["Inventory floor counts before comparing hourly rates.","Temporary no-parking often beats long carries."],
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
        intro: 'Davidson families compare Davidson County Schools and Lexington City Schools / Thomasville City Schools feeders where applicable — verify address boundaries.',
        bullets: [
          {
            title: 'District-first shopping',
            detail:
              'Use NCDPI data and district maps; do not assume a city name equals one feeder pattern.',
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
            detail: 'Atrium Health Lexington and regional specialty spillover serve the county; map peak I-85 times for ER access.',
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
    intro: 'I-85 freeflow, multi-story access, and town-to-town empty miles often matter more than raw miles.',
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
      { label: 'Studio / 1-BR', value: '$450–$1,200+' },
      { label: '3–4 BR home', value: '$1,600–$4,200+', note: 'Higher with access friction' },
      { label: '2-person crew', value: '$115–$185+/hr' },
    ],
  },
  seasonal: {
    title: 'Seasonal & calendar notes',
    intro: 'School years, lease ends, and winter ice reshape demand by pocket.',
    items: [
      {
        title: 'Late spring – early fall',
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
      'Official links first; directory listings are independent. Verify NCUC household-goods certification for in-state North Carolina moves and FMCSA for interstate legs.',
    items: [
      {
        label: 'Forsyth County movers (parent contrast)',
        href: '/local-movers/north-carolina/forsyth',
      },
      {
        label: 'Guilford County movers',
        href: '/local-movers/north-carolina/guilford',
      },
    ],
  },
});

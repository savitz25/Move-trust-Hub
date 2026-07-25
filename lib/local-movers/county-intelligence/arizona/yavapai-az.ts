import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeAzTier2Pack,
  AZ_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/arizona/az-tier2-shared';

/**
 * yavapai — AZ Tier 2 Wave 1
 */
export const yavapaiCountyAzTier2Intelligence: CountyIntelligencePack = finalizeAzTier2Pack({
  countySlug: 'yavapai',
  hubTitle: 'Yavapai County Moving Intelligence Hub',
  eyebrow: 'Yavapai · Prescott / Prescott Valley / Sedona edge — high country',
  h1: 'Moving in Yavapai County: Prescott, Prescott Valley & High-Country Access',
  heroOpener:
    'Yavapai County is central Arizona high-country product — Prescott multi-story and historic stock, Prescott Valley HOA growth, Sedona-edge and Verde Valley approaches, and freeflow on I-17 / AZ-69 that is not Phoenix desert HOA sprawl with different elevation labels. Expect cooler seasons, grades, and longer empty miles under one county. This guide is for people moving in Yavapai as independent high-country — not desert-Phoenix defaults.',
  heroCredibility:
    'High-country independent · Prescott / PV growth · Elevation seasonality · ACC entity diligence · FMCSA when interstate · Curated listings',
  majorCorridors: 'I-17 · AZ-69 · AZ-89 · AZ-89A · AZ-169 · AZ-260 edges',
  lastReviewed: '2026-07-25',
  parentCompare: {
    parentLabel: 'independent high-country (nearest desert hub: Maricopa)',
    parentHref: '/local-movers/arizona/maricopa',
    title: 'Compared with independent high-country (nearest desert hub: Maricopa)',
    intro:
      'Yavapai is high-country independent product on I-17 / AZ-69 — not Maricopa desert Loop density and not pure rural forest freeflow.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'Maricopa crews fight Loop peaks in extreme heat. Yavapai pairs ride I-17, AZ-69, and AZ-89 — freer mid-day high-country freeflow, still peak-heavy on Prescott arterials and weekend tourism windows toward Sedona edges.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'Maricopa mixes towers and master-plan HOAs. Yavapai mixes Prescott multi-story, PV planned SFH, and Verde/Sedona-edge stock — more elevation and tourism product, less continuous desert multi-family density.',
      },
      {
        title: 'Truck access & density',
        detail:
          'Historic streets need curb plans; grades rewrite truck size; HOA packets appear on PV growth.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local Yavapai quotes often track high-country secondary rates for multi-story access — grades and tourism peaks can price above quiet PV driveway jobs.',
      },
      {
        title: 'Role difference',
        detail:
          'Yavapai is independent high-country — not Phoenix desert product renamed.',
      }
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Yavapai County different',
    intro: 'Elevation seasonality, Prescott multi-story, and I-17 freeflow — not interchangeable Valley boilerplate.',
    bullets: [
      {
        title: 'Elevation rewrites summer and winter staging',
        detail:
          'Cooler summers help heat pacing; winter ice on grades rewrites morning curb plans.',
      },
      {
        title: 'Prescott multi-story is first-class product',
        detail:
          'Historic stairs and curb plans need inventories different from pure PV cul-de-sacs.',
      },
      {
        title: 'I-17 / AZ-69 freeflow is still billable',
        detail:
          'High-country pairs freer mid-day still peak hard. Ask portal-to-portal.',
      },
      {
        title: 'Sedona-edge last-mile rejects Valley day rates',
        detail:
          'Tourism and narrow approaches rewrite truck size assumptions.',
      },
      AZ_TIER2_REG_BULLET,
    ],
  },
  zonesHeading: 'Yavapai zones: Prescott multi-story, Prescott Valley growth, Verde/Sedona edges & rural lots',
  zonesIntro: 'Two to four sharp products — historic multi-story, HOA growth, tourism edges, and rural lots.',
  zones: [
    {
      id: 'prescott',
      name: 'Prescott multi-story & historic stock',
      shortName: 'Prescott',
      neighborhoods: ["Prescott","downtown","historic multi-family"],
      housingTypes: 'Multi-story, multi-unit, older SFH',
      challenges: ["Stairs","Street parking","Grades"],
      moverTips: 'Inventory stairs; plan temporary no-parking.',
      cityKeywords: ["prescott"],
    },
    {
      id: 'pv-growth',
      name: 'Prescott Valley HOA growth',
      shortName: 'Prescott Valley',
      neighborhoods: ["Prescott Valley","growth villages"],
      housingTypes: 'HOA SFH, townhomes, multi-family',
      challenges: ["HOA packets","AZ-69 freeflow"],
      moverTips: 'Collect HOA COIs; prefer early starts.',
      cityKeywords: ["prescott valley"],
    },
    {
      id: 'verde-sedona',
      name: 'Verde Valley / Sedona-edge approaches',
      shortName: 'Verde / Sedona edge',
      neighborhoods: ["Cottonwood edges","Sedona approaches","Camp Verde edges"],
      housingTypes: 'SFH, multi-family, tourism stock',
      challenges: ["Narrow approaches","Tourism peaks","Grades"],
      moverTips: 'Photo last-mile; build tourism-weekend buffers.',
      cityKeywords: ["sedona","cottonwood","camp verde"],
    },
    {
      id: 'rural-lots',
      name: 'Northern & rural larger lots',
      shortName: 'Rural lots',
      neighborhoods: ["Chino Valley edges","rural tracts"],
      housingTypes: 'Larger lots, rural approaches',
      challenges: ["Empty miles","Soft shoulders","Winter ice"],
      moverTips: 'Survey approaches; winter mornings need flexibility.',
      cityKeywords: ["chino valley","north yavapai"],
    }
  ],
  specialized: [
    {
      id: 'high-country',
      title: 'High-country elevation module',
      intro: 'Seasonality and grades rewrite desert day rates.',
      bullets: ["Plan winter ice and summer cooler starts honestly.","Do not recycle Phoenix heat-only playbooks."],
    },
    {
      id: 'prescott-seat',
      title: 'Prescott multi-story access',
      intro: 'Historic stairs are first-class cost drivers.',
      bullets: ["Inventory floor counts and curb width.","Temporary no-parking often beats long carries."],
    },
    {
      id: 'i17-freeflow',
      title: 'I-17 / AZ-69 freeflow',
      intro: 'High-country pairs still peak hard toward Maricopa.',
      bullets: ["Price portal-to-portal honestly.","Clarify Phoenix second addresses for long empty-mile assumptions."],
    }
  ],
  relocation: {
    title: 'Schools & hospitals for relocators',
    intro:
      'Compressed secondary-market notes â€” primary districts and acute-care access that affect move-in.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & education',
        intro: 'Yavapai families compare Prescott, Humboldt, Chino Valley, and related district feeders — verify address boundaries.',
        bullets: [
          {
            title: 'District-first shopping',
            detail:
              'Use Arizona DOE data and district maps; do not assume a city name equals one feeder pattern.',
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
            detail: 'Yavapai Regional Medical Center campuses and regional specialty spillover serve the county; map peak AZ-69 / I-17 times for ER access.',
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
    intro: 'Elevation grades, multi-story access, and corridor freeflow often matter more than raw miles.',
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
      { label: 'Studio / 1-BR', value: '$450â€“$1,200+' },
      { label: '3â€“4 BR home', value: '$1,600â€“$4,200+', note: 'Higher with access friction' },
      { label: '2-person crew', value: '$115â€“$185+/hr' },
    ],
  },
  seasonal: {
    title: 'Seasonal & calendar notes',
    intro: 'Tourism weekends, school years, and winter ice reshape demand more than pure desert heat calendars.',
    items: [
      {
        title: 'Late spring â€“ early fall',
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
      'Official links first; directory listings are independent. Verify Arizona Corporation Commission (ACC) entity status for in-state Arizona moves and FMCSA for interstate legs.',
    items: [
      {
        label: 'independent high-country (nearest desert hub: Maricopa) movers (parent contrast)',
        href: '/local-movers/arizona/maricopa',
      },

    ],
  },
});

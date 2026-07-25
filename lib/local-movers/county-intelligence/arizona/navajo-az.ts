import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeAzTier2Pack,
  AZ_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/arizona/az-tier2-shared';

/**
 * navajo — AZ Tier 2 Wave 1
 */
export const navajoCountyAzTier2Intelligence: CountyIntelligencePack = finalizeAzTier2Pack({
  countySlug: 'navajo',
  hubTitle: 'Navajo County Moving Intelligence Hub',
  eyebrow: 'Navajo · Show Low / Winslow / Holbrook — NE AZ high country',
  h1: 'Moving in Navajo County: Show Low, Winslow & High-Country I-40 Access',
  heroOpener:
    'Navajo County is northeast Arizona high-country and I-40 product — Show Low multi-family and recreation stock, Winslow multi-story and seat corridors, Holbrook edges, and freeflow that still means long empty miles between discontinuous towns. Expect elevation weather, tourism peaks, and rural logistics under one county. This guide is for people moving in Navajo as independent NE AZ — not Phoenix or Tucson defaults.',
  heroCredibility:
    'NE AZ high country · Show Low / I-40 towns · Long empty miles · ACC entity diligence · FMCSA when interstate · Curated listings',
  majorCorridors: 'I-40 · AZ-77 · AZ-260 · AZ-87 · US-180 edges',
  lastReviewed: '2026-07-25',
  parentCompare: {
    parentLabel: 'independent NE Arizona (vs Maricopa / Coconino defaults)',
    parentHref: '/local-movers/arizona/coconino',
    title: 'Compared with independent NE Arizona (vs Maricopa / Coconino defaults)',
    intro:
      'Navajo is independent NE AZ high-country multi-town product — not Flagstaff university density and not Phoenix desert Loop product.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'Coconino crews fight Flagstaff arterials and NAU peaks. Navajo pairs ride I-40, AZ-77, and AZ-260 across discontinuous towns — freer mid-day between seats, still peak-heavy on Show Low tourism weekends and Winslow arterials.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'Coconino mixes Flagstaff multi-story and NAU multi-family. Navajo mixes Show Low multi-unit, Winslow multi-story, and Holbrook SFH — more multi-town rural product, less continuous university density.',
      },
      {
        title: 'Truck access & density',
        detail:
          'Elevation weather rewrites staging; long empty miles dominate town pairs; soft shoulders appear on rural edges.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local Navajo quotes often sit at NE secondary rates for driveway SFH — tourism peaks and long empty-mile pairs still push prices up.',
      },
      {
        title: 'Role difference',
        detail:
          'Navajo is independent NE AZ multi-town high country — not Flagstaff or Phoenix product renamed.',
      }
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Navajo County different',
    intro: 'Long empty miles, high-country weather, and I-40 freeflow — not interchangeable Flagstaff or Valley boilerplate.',
    bullets: [
      {
        title: 'Town-to-town empty miles are first-class cost drivers',
        detail:
          'Show Low ↔ Winslow pairs fail when crews assume continuous metro density.',
      },
      {
        title: 'Elevation weather rewrites winter and monsoon staging',
        detail:
          'Ice, snow, and storms reshape morning curb plans.',
      },
      {
        title: 'I-40 freeflow is still billable',
        detail:
          'NE pairs freer mid-day still peak hard. Ask portal-to-portal.',
      },
      {
        title: 'Tourism and recreation peaks rewrite weekends',
        detail:
          'Show Low area volume stacks around seasonal windows.',
      },
      AZ_TIER2_REG_BULLET,
    ],
  },
  zonesHeading: 'Navajo zones: Show Low multi-family, Winslow multi-story, Holbrook edges & rural lots',
  zonesIntro: 'Two to four sharp products — recreation multi-family, seat multi-story, corridor edges, and rural lots.',
  zones: [
    {
      id: 'show-low',
      name: 'Show Low multi-family & recreation stock',
      shortName: 'Show Low',
      neighborhoods: ["Show Low","Pinetop-Lakeside edges","recreation multi-family"],
      housingTypes: 'Multi-family, SFH, tourism stock',
      challenges: ["Tourism peaks","Elevation weather","HOA packets"],
      moverTips: 'Book around tourism peaks; survey driveway grades.',
      cityKeywords: ["show low","pinetop"],
    },
    {
      id: 'winslow',
      name: 'Winslow multi-story & I-40 seat corridors',
      shortName: 'Winslow',
      neighborhoods: ["Winslow","downtown edges","I-40 multi-family"],
      housingTypes: 'Multi-story, multi-unit, older SFH',
      challenges: ["Stairs","Street parking","I-40 freeflow"],
      moverTips: 'Inventory stairs; plan temporary no-parking.',
      cityKeywords: ["winslow"],
    },
    {
      id: 'holbrook',
      name: 'Holbrook / AZ-77 corridor edges',
      shortName: 'Holbrook',
      neighborhoods: ["Holbrook","corridor multi-family"],
      housingTypes: 'SFH, multi-family, mixed stock',
      challenges: ["Empty miles","Arterial timing"],
      moverTips: 'Prefer early starts for long pairs.',
      cityKeywords: ["holbrook"],
    },
    {
      id: 'rural-lots',
      name: 'Southern & rural high-country lots',
      shortName: 'Rural lots',
      neighborhoods: ["Heber-Overgaard edges","rural tracts"],
      housingTypes: 'Larger lots, rural approaches',
      challenges: ["Long empty miles","Soft shoulders","Winter ice"],
      moverTips: 'Photo approaches; winter mornings need flexibility.',
      cityKeywords: ["heber","rural navajo"],
    }
  ],
  specialized: [
    {
      id: 'long-empty',
      title: 'NE multi-town empty-mile module',
      intro: 'Discontinuous towns dominate pricing.',
      bullets: ["Price portal-to-portal between seats honestly.","Do not recycle Flagstaff day rates alone."],
    },
    {
      id: 'high-country-weather',
      title: 'High-country weather module',
      intro: 'Elevation rewrites desert staging assumptions.',
      bullets: ["Build winter morning flexibility into plans.","Monsoon and snow windows both matter."],
    },
    {
      id: 'i40-ne',
      title: 'I-40 NE freeflow',
      intro: 'NE pairs still peak hard on arterials.',
      bullets: ["Build corridor buffers for freight and tourism peaks.","Clarify Coconino second addresses for drive-time assumptions."],
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
        intro: 'Navajo families compare Show Low, Winslow, Holbrook, and related district feeders — verify address boundaries.',
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
            detail: 'Summit Healthcare (Show Low) and regional specialty spillover serve the county; map peak freeflow across discontinuous towns.',
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
    intro: 'Town-to-town empty miles, multi-story access, tourism peaks, and elevation weather often matter more than raw miles.',
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
    intro: 'Tourism summers, school years, and winter ice reshape demand by pocket.',
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
        label: 'independent NE Arizona (vs Maricopa / Coconino defaults) movers (parent contrast)',
        href: '/local-movers/arizona/coconino',
      },

    ],
  },
});

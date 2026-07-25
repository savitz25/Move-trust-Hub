import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeAzTier2Pack,
  AZ_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/arizona/az-tier2-shared';

/**
 * coconino — AZ Tier 2 Wave 1
 */
export const coconinoCountyAzTier2Intelligence: CountyIntelligencePack = finalizeAzTier2Pack({
  countySlug: 'coconino',
  hubTitle: 'Coconino County Moving Intelligence Hub',
  eyebrow: 'Coconino · Flagstaff — high country / I-40',
  h1: 'Moving in Coconino County: Flagstaff, NAU Cycles & High-Country I-40 Access',
  heroOpener:
    'Coconino County is northern Arizona high-country product — Flagstaff multi-story and NAU-adjacent density, canyon-region and forest-edge approaches, Page and rural long empty miles, and freeflow on I-40 / I-17 that is not Phoenix desert HOA sprawl with pine labels. Expect elevation weather, university calendars, and tourism peaks under one county. This guide is for people moving in Coconino as independent northern AZ — not desert-Phoenix defaults.',
  heroCredibility:
    'Northern AZ high country · NAU cycles · I-40 / elevation · ACC entity diligence · FMCSA when interstate · Curated listings',
  majorCorridors: 'I-40 · I-17 · US-89 · US-180 · AZ-89A · Milton Road corridor',
  lastReviewed: '2026-07-25',
  parentCompare: {
    parentLabel: 'independent northern Arizona (vs Maricopa desert defaults)',
    parentHref: '/local-movers/arizona/maricopa',
    title: 'Compared with independent northern Arizona (vs Maricopa desert defaults)',
    intro:
      'Coconino is independent northern high-country product on I-40 / I-17 — not Maricopa desert Loop density and not pure rural canyon freeflow alone.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'Maricopa crews fight Loop peaks in extreme heat. Coconino pairs ride I-40, I-17, and US-89 — freer mid-day high-country freeflow, still peak-heavy on Flagstaff arterials, NAU term windows, and tourism weekends.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'Maricopa mixes towers and master plans. Coconino mixes Flagstaff multi-story, NAU multi-family, and forest-edge SFH — more elevation and university product, less continuous desert HOA density.',
      },
      {
        title: 'Truck access & density',
        detail:
          'Snow and grades rewrite truck size; campus multi-family needs COIs; long rural empty miles dominate outer pockets.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local Coconino quotes often track high-country secondary-premium rates for multi-story access — snow windows and tourism peaks can price above quiet off-season lots.',
      },
      {
        title: 'Role difference',
        detail:
          'Coconino is independent northern high-country — not Phoenix product renamed.',
      }
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Coconino County different',
    intro: 'Elevation weather, NAU term calendars, and I-40 freeflow — not interchangeable Valley boilerplate.',
    bullets: [
      {
        title: 'NAU term calendars drive Flagstaff demand spikes',
        detail:
          'Move-in/out weekends fill crews and parking near campus. Book early.',
      },
      {
        title: 'Elevation snow and ice rewrite winter curb plans',
        detail:
          'Morning staging can fail when crews assume desert freeflow.',
      },
      {
        title: 'I-40 / I-17 freeflow is still billable',
        detail:
          'High-country pairs freer mid-day still peak hard. Ask portal-to-portal.',
      },
      {
        title: 'Canyon-region and forest edges rewrite truck size',
        detail:
          'Narrow approaches reject full-trailer assumptions from Valley rates.',
      },
      AZ_TIER2_REG_BULLET,
    ],
  },
  zonesHeading: 'Coconino zones: Flagstaff multi-story, NAU multi-family, forest edges & long rural lots',
  zonesIntro: 'Two to four sharp products — seat multi-story, campus multi-family, forest edges, and long rural lots.',
  zones: [
    {
      id: 'flagstaff',
      name: 'Flagstaff multi-story & seat stock',
      shortName: 'Flagstaff',
      neighborhoods: ["Flagstaff","downtown","seat multi-family"],
      housingTypes: 'Multi-story, multi-unit, older SFH',
      challenges: ["Stairs","Street parking","Winter ice"],
      moverTips: 'Inventory stairs; winter mornings need flexibility.',
      cityKeywords: ["flagstaff"],
    },
    {
      id: 'nau',
      name: 'NAU campus-edge multi-family',
      shortName: 'NAU edge',
      neighborhoods: ["campus multi-family","student stock"],
      housingTypes: 'Multi-family, apartments, some SFH',
      challenges: ["Term parking","COI packets","Elevators"],
      moverTips: 'Book around term calendars; collect building rules.',
      cityKeywords: ["nau","northern arizona university"],
    },
    {
      id: 'forest-edge',
      name: 'Forest-edge / mountain approaches',
      shortName: 'Forest edge',
      neighborhoods: ["Kachina Village edges","mountain SFH"],
      housingTypes: 'SFH, forest-edge lots',
      challenges: ["Grades","Narrow approaches","Snow staging"],
      moverTips: 'Photo last-mile; discuss smaller trucks early.',
      cityKeywords: ["kachina","forest edge"],
    },
    {
      id: 'rural-long',
      name: 'Page / long rural empty-mile edges',
      shortName: 'Long rural',
      neighborhoods: ["Page edges","eastern rural tracts"],
      housingTypes: 'SFH, rural approaches',
      challenges: ["Long empty miles","Soft shoulders"],
      moverTips: 'Price empty miles honestly; prefer early starts for long pairs.',
      cityKeywords: ["page","east coconino"],
    }
  ],
  specialized: [
    {
      id: 'nau-cycles',
      title: 'NAU university move-cycle module',
      intro: 'Term calendars drive demand spikes.',
      bullets: ["Book early around move-in/out weekends.","Price campus-edge curb time honestly."],
    },
    {
      id: 'elevation-weather',
      title: 'High-country weather module',
      intro: 'Snow and ice rewrite desert staging assumptions.',
      bullets: ["Build winter morning flexibility into plans.","Do not recycle Phoenix heat-only playbooks."],
    },
    {
      id: 'i40-high',
      title: 'I-40 / I-17 high-country freeflow',
      intro: 'Northern pairs still peak hard on arterials.',
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
        intro: 'Coconino families compare Flagstaff Unified and related district feeders — verify address boundaries; do not assume Valley maps apply.',
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
            detail: 'Flagstaff Medical Center and regional specialty spillover serve the county; map peak I-40 / arterial times for ER access.',
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
    intro: 'Term peaks, multi-story access, elevation weather, and long empty miles often matter more than raw miles.',
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
    intro: 'University calendars, tourism summers, school years, and winter snow reshape demand by pocket.',
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
        label: 'independent northern Arizona (vs Maricopa desert defaults) movers (parent contrast)',
        href: '/local-movers/arizona/maricopa',
      },

    ],
  },
});

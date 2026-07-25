import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeAzTier2Pack,
  AZ_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/arizona/az-tier2-shared';

/**
 * yuma — AZ Tier 2 Wave 1
 */
export const yumaCountyAzTier2Intelligence: CountyIntelligencePack = finalizeAzTier2Pack({
  countySlug: 'yuma',
  hubTitle: 'Yuma County Moving Intelligence Hub',
  eyebrow: 'Yuma · southwest border agriculture / military',
  h1: 'Moving in Yuma County: Yuma City, Snowbird Season & I-8 Border Access',
  heroOpener:
    'Yuma County is southwest Arizona border and agriculture product — Yuma multi-story and multi-family stock, Foothills and Fortuna edges, agricultural-edge residential, and freeflow on I-8 that is not Phoenix desert HOA sprawl with different labels. Expect winter snowbird peaks, military/ag calendars, CA/MX-adjacent logistics, and extreme heat under one county. This guide is for people moving in Yuma as independent SW AZ — not a Valley rename.',
  heroCredibility:
    'SW AZ independent · Snowbird season · I-8 border logistics · ACC entity diligence · FMCSA when interstate · Curated listings',
  majorCorridors: 'I-8 · US-95 · AZ-195 · Business 8 · 4th Avenue corridor',
  lastReviewed: '2026-07-25',
  parentCompare: {
    parentLabel: 'independent SW Arizona (vs Maricopa desert defaults)',
    parentHref: '/local-movers/arizona/maricopa',
    title: 'Compared with independent SW Arizona (vs Maricopa desert defaults)',
    intro:
      'Yuma is independent SW AZ border/agriculture/snowbird product on I-8 — not Maricopa Loop density and not pure rural desert freeflow alone.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'Maricopa crews fight Valley Loop peaks. Yuma pairs ride I-8, US-95, and local arterials — freer mid-day SW freeflow, still peak-heavy on winter snowbird windows and agricultural shift traffic.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'Maricopa mixes towers and master plans. Yuma mixes city multi-story, Foothills multi-family, and ag-edge SFH — more seasonal and border product, less continuous Valley HOA density.',
      },
      {
        title: 'Truck access & density',
        detail:
          'Multi-family elevators appear on growth edges; CA addresses flip authority; rural ag edges add soft shoulders.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local Yuma quotes often track SW secondary rates for driveway SFH — snowbird peaks and heat can price above quiet off-season lots.',
      },
      {
        title: 'Role difference',
        detail:
          'Yuma is independent SW AZ border market — not Phoenix product renamed.',
      }
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Yuma County different',
    intro: 'Snowbird calendars, I-8 freeflow, and border logistics — not interchangeable Valley boilerplate.',
    bullets: [
      {
        title: 'Winter snowbird peaks rewrite demand',
        detail:
          'Seasonal inventories and short windows fill crews first from late fall through early spring.',
      },
      {
        title: 'CA adjacency creates interstate legs',
        detail:
          'California addresses require FMCSA authority even on short-looking hops.',
      },
      {
        title: 'I-8 freeflow is still billable',
        detail:
          'SW pairs freer mid-day still peak hard. Ask portal-to-portal.',
      },
      {
        title: 'Extreme heat still governs summer open carries',
        detail:
          'Early starts outperform noon load-outs May–September.',
      },
      AZ_TIER2_REG_BULLET,
    ],
  },
  zonesHeading: 'Yuma zones: city multi-story, Foothills multi-family, ag-edge residential & rural lots',
  zonesIntro: 'Two to four sharp products — seat multi-story, growth multi-family, ag-edge SFH, and rural lots.',
  zones: [
    {
      id: 'yuma-city',
      name: 'Yuma city multi-story & multi-unit',
      shortName: 'Yuma city',
      neighborhoods: ["Yuma","downtown edges","city multi-family"],
      housingTypes: 'Multi-story, multi-unit, older SFH',
      challenges: ["Stairs","Street parking","I-8 freeflow"],
      moverTips: 'Inventory stairs; plan temporary no-parking.',
      cityKeywords: ["yuma"],
    },
    {
      id: 'foothills',
      name: 'Foothills / Fortuna multi-family growth',
      shortName: 'Foothills',
      neighborhoods: ["Foothills","Fortuna Foothills","growth multi-family"],
      housingTypes: 'Multi-family, HOA SFH, townhomes',
      challenges: ["HOA packets","Elevators","Snowbird peaks"],
      moverTips: 'Collect HOA COIs; book winter peaks early.',
      cityKeywords: ["foothills","fortuna"],
    },
    {
      id: 'ag-edge',
      name: 'Agricultural-edge residential',
      shortName: 'Ag edge',
      neighborhoods: ["ag-adjacent SFH","US-95 edges"],
      housingTypes: 'SFH, multi-family, mixed stock',
      challenges: ["Shift traffic","Dust/soft shoulders"],
      moverTips: 'Prefer early starts; survey last-mile on ag streets.',
      cityKeywords: ["south yuma"],
    },
    {
      id: 'rural-lots',
      name: 'Eastern & rural larger lots',
      shortName: 'Rural lots',
      neighborhoods: ["Wellton edges","eastern tracts"],
      housingTypes: 'Larger lots, rural approaches',
      challenges: ["Empty miles","Soft shoulders","Heat staging"],
      moverTips: 'Photo approaches; early starts beat heat peaks.',
      cityKeywords: ["wellton","east yuma"],
    }
  ],
  specialized: [
    {
      id: 'snowbird',
      title: 'Snowbird seasonal module',
      intro: 'Winter peaks dominate volume.',
      bullets: ["Book capacity early for Nov–Mar windows.","Inventory profiles differ from pure year-round family SFH."],
    },
    {
      id: 'i8-border',
      title: 'I-8 border freeflow & CA legs',
      intro: 'SW pairs still peak hard; CA legs need FMCSA.',
      bullets: ["Price portal-to-portal honestly.","Clarify California second addresses for interstate authority."],
    },
    {
      id: 'heat-pacing',
      title: 'Desert heat pacing module',
      intro: 'Summer open carries are first-class labor-hours drivers.',
      bullets: ["Prefer early starts May–September.","Pace crews and protect inventories."],
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
        intro: 'Yuma families compare Yuma Elementary/Union, Crane, Gadsden, and related district feeders — verify address boundaries.',
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
            detail: 'Yuma Regional Medical Center anchors acute care; map peak I-8 / arterial times for ER access.',
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
    intro: 'Snowbird peaks, multi-family access, interstate authority risk, and heat pacing often matter more than raw miles.',
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
    intro: 'Snowbird winters, ag calendars, school years, and extreme heat reshape demand by pocket.',
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
        label: 'independent SW Arizona (vs Maricopa desert defaults) movers (parent contrast)',
        href: '/local-movers/arizona/maricopa',
      },

    ],
  },
});

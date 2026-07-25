import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeAzTier2Pack,
  AZ_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/arizona/az-tier2-shared';

/**
 * mohave — AZ Tier 2 Wave 1
 */
export const mohaveCountyAzTier2Intelligence: CountyIntelligencePack = finalizeAzTier2Pack({
  countySlug: 'mohave',
  hubTitle: 'Mohave County Moving Intelligence Hub',
  eyebrow: 'Mohave · Lake Havasu City / Kingman / Bullhead — NW AZ',
  h1: 'Moving in Mohave County: Lake Havasu, Kingman & Colorado River Access',
  heroOpener:
    'Mohave County is northwest Arizona river and I-40 product — Lake Havasu City multi-family and recreation stock, Kingman multi-story and seat corridors, Bullhead City river-edge density, and freeflow that still peaks toward CA/NV interstate legs. Expect tourism calendars, extreme heat, and border-adjacent authority questions under one county. This guide is for people moving in Mohave as independent NW AZ — not a Phoenix rename.',
  heroCredibility:
    'NW AZ independent · Colorado River recreation · I-40 / CA-NV edge · ACC entity diligence · FMCSA when interstate · Curated listings',
  majorCorridors: 'I-40 · US-93 · AZ-95 · AZ-68 · I-15 northwest edge',
  lastReviewed: '2026-07-25',
  parentCompare: {
    parentLabel: 'independent NW Arizona (vs Maricopa desert defaults)',
    parentHref: '/local-movers/arizona/maricopa',
    title: 'Compared with independent NW Arizona (vs Maricopa desert defaults)',
    intro:
      'Mohave is independent NW AZ river/recreation and I-40 product — not Maricopa Loop density and not pure rural desert freeflow alone.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'Maricopa crews fight Valley Loop peaks. Mohave pairs ride I-40, US-93, and AZ-95 — freer mid-day NW freeflow, still peak-heavy on Lake Havasu tourism weekends and Kingman arterials.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'Maricopa mixes towers and master plans. Mohave mixes Havasu multi-family, Kingman multi-story, and Bullhead river-edge stock — more recreation and long empty-mile product, less continuous Valley HOA density.',
      },
      {
        title: 'Truck access & density',
        detail:
          'River-edge and multi-family need curb plans; CA/NV addresses flip authority; rural edges add soft shoulders.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local Mohave quotes often track secondary NW rates for driveway SFH — tourism peaks and interstate legs can price above quiet inland lots.',
      },
      {
        title: 'Role difference',
        detail:
          'Mohave is independent NW AZ river/I-40 market — not Phoenix product renamed.',
      }
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Mohave County different',
    intro: 'River recreation peaks, I-40 freeflow, and CA/NV interstate risk — not interchangeable Valley boilerplate.',
    bullets: [
      {
        title: 'Tourism and recreation peaks rewrite weekends',
        detail:
          'Lake Havasu and river towns fill crews and parking at peak season.',
      },
      {
        title: 'CA / NV adjacency creates interstate legs',
        detail:
          'Out-of-state addresses require FMCSA authority even on short-looking hops.',
      },
      {
        title: 'I-40 / US-93 freeflow is still billable',
        detail:
          'NW pairs freer mid-day still peak hard. Ask portal-to-portal.',
      },
      {
        title: 'Extreme heat still governs summer open carries',
        detail:
          'Early starts outperform noon load-outs on open river-edge streets.',
      },
      AZ_TIER2_REG_BULLET,
    ],
  },
  zonesHeading: 'Mohave zones: Lake Havasu multi-family, Kingman seat, Bullhead river edge & rural lots',
  zonesIntro: 'Two to four sharp products — recreation multi-family, seat multi-story, river edge, and rural lots.',
  zones: [
    {
      id: 'havasu',
      name: 'Lake Havasu City multi-family & recreation stock',
      shortName: 'Lake Havasu',
      neighborhoods: ["Lake Havasu City","recreation multi-family","waterfront edges"],
      housingTypes: 'Multi-family, SFH, tourism stock',
      challenges: ["Tourism peaks","Elevators/stairs","Heat staging"],
      moverTips: 'Book around tourism peaks; collect building rules.',
      cityKeywords: ["lake havasu"],
    },
    {
      id: 'kingman',
      name: 'Kingman multi-story & I-40 seat corridors',
      shortName: 'Kingman',
      neighborhoods: ["Kingman","downtown edges","I-40 multi-family"],
      housingTypes: 'Multi-story, multi-unit, older SFH',
      challenges: ["Stairs","Street parking","I-40 freeflow"],
      moverTips: 'Inventory stairs; plan temporary no-parking.',
      cityKeywords: ["kingman"],
    },
    {
      id: 'bullhead',
      name: 'Bullhead City river-edge density',
      shortName: 'Bullhead',
      neighborhoods: ["Bullhead City","river multi-family","AZ-95 corridors"],
      housingTypes: 'Multi-family, SFH, mixed stock',
      challenges: ["River freeflow","NV adjacency","Heat staging"],
      moverTips: 'Clarify NV second addresses; prefer early starts.',
      cityKeywords: ["bullhead city"],
    },
    {
      id: 'rural-lots',
      name: 'Golden Valley / rural NW lots',
      shortName: 'Rural lots',
      neighborhoods: ["Golden Valley","rural tracts"],
      housingTypes: 'Larger lots, rural approaches',
      challenges: ["Empty miles","Soft shoulders"],
      moverTips: 'Survey approaches; early starts beat heat peaks.',
      cityKeywords: ["golden valley","rural mohave"],
    }
  ],
  specialized: [
    {
      id: 'river-tourism',
      title: 'Colorado River recreation module',
      intro: 'Tourism peaks dominate Havasu and river access.',
      bullets: ["Book and stage around major recreation weekends.","Confirm multi-family packets early."],
    },
    {
      id: 'ca-nv-edge',
      title: 'CA / NV interstate edge module',
      intro: 'Short map miles can still be interstate jobs.',
      bullets: ["Match ACC diligence vs FMCSA to exact addresses.","Do not recycle Phoenix day rates for river product."],
    },
    {
      id: 'i40-freeflow',
      title: 'I-40 / US-93 freeflow',
      intro: 'NW pairs still peak hard on arterials.',
      bullets: ["Price portal-to-portal honestly.","Build buffers for tourism and freight peaks."],
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
        intro: 'Mohave families compare Lake Havasu, Kingman, Bullhead City, and related district feeders — verify address boundaries.',
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
            detail: 'Havasu Regional, Kingman Regional, and Western Arizona Regional (Bullhead) anchor acute care; map peak AZ-95 / I-40 times for ER access.',
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
    intro: 'Tourism peaks, multi-family access, interstate authority risk, and heat pacing often matter more than raw miles.',
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
    intro: 'Recreation summers, school years, and extreme heat reshape demand by pocket.',
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
        label: 'independent NW Arizona (vs Maricopa desert defaults) movers (parent contrast)',
        href: '/local-movers/arizona/maricopa',
      },

    ],
  },
});

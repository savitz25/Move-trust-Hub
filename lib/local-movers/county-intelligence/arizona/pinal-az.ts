import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeAzTier2Pack,
  AZ_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/arizona/az-tier2-shared';

/**
 * pinal — AZ Tier 2 Wave 1
 */
export const pinalCountyAzTier2Intelligence: CountyIntelligencePack = finalizeAzTier2Pack({
  countySlug: 'pinal',
  hubTitle: 'Pinal County Moving Intelligence Hub',
  eyebrow: 'Pinal · San Tan Valley / Casa Grande — Phoenix–Tucson corridor',
  h1: 'Moving in Pinal County: San Tan Valley, Casa Grande & I-10 Corridor Growth',
  heroOpener:
    'Pinal County is the Phoenix–Tucson Sun Corridor growth market — San Tan Valley and Queen Creek-edge HOA density, Casa Grande multi-family and industrial-adjacent stock, Florence and Arizona City edges, and freeflow on I-10 / AZ-347 that is not Maricopa East Valley product with different labels. Expect master-plan gate lists, longer empty miles from Valley yards, and extreme heat pacing under one county. This guide is for people moving in Pinal as outer-corridor growth — not a Maricopa rename.',
  heroCredibility:
    'Phoenix–Tucson corridor growth · HOA master plans · I-10 freeflow · ACC entity diligence · FMCSA when interstate · Curated listings',
  majorCorridors: 'I-10 · AZ-347 · AZ-79 · US-60 · AZ-287 · AZ-87',
  lastReviewed: '2026-07-25',
  parentCompare: {
    parentLabel: 'Maricopa County',
    parentHref: '/local-movers/arizona/maricopa',
    title: 'Compared with Maricopa County',
    intro:
      'Pinal is outer-corridor HOA and industrial-edge growth on I-10 — not Maricopa Loop multi-family density and not pure rural Sonoran freeflow.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'Maricopa crews fight Loop 101/202 peaks into East and West Valley. Pinal pairs ride I-10, AZ-347, and US-60 — freer mid-day further south/east of the Valley, still peak-heavy toward San Tan commute windows and Casa Grande industrial shifts. Portal-to-portal time is real; it is not a Scottsdale elevator day.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'Maricopa mixes towers, East Valley multi-family, and West Valley HOAs. Pinal mixes San Tan planned SFH, Casa Grande multi-unit, and Florence/Arizona City edges — more continuous outer-corridor HOA product, less continuous Valley vertical density.',
      },
      {
        title: 'Truck access & density',
        detail:
          'HOA COIs, gate lists, and approved hours dominate more often than central Phoenix dock permits. Rural southern lots add soft shoulders and longer empty miles.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local Pinal quotes often track outer-Valley suburb rates for driveway SFH — empty miles from Maricopa staging and HOA soft costs still push prices up vs map miles alone.',
      },
      {
        title: 'Role difference',
        detail:
          'Pinal is Phoenix–Tucson corridor growth — not Maricopa core product renamed.',
      }
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Pinal County different',
    intro: 'Outer-corridor HOA density, I-10 freeflow, and empty miles from Valley yards — not interchangeable East Valley boilerplate.',
    bullets: [
      {
        title: 'I-10 / AZ-347 peaks rewrite short-looking locals',
        detail:
          'Pinal ↔ Maricopa pairs freer mid-day still burn clock at commute peaks. Ask portal-to-portal.',
      },
      {
        title: 'Master-plan HOA is first-class product',
        detail:
          'Gate lists, truck limits, and approved hours are standard on San Tan growth villages.',
      },
      {
        title: 'Empty miles from Maricopa yards are real',
        detail:
          'Even “local” Pinal pairs can price as distance work for East Valley-based crews.',
      },
      {
        title: 'Extreme heat still governs summer open carries',
        detail:
          'Early starts and paced labor outperform noon load-outs from May through September.',
      },
      AZ_TIER2_REG_BULLET,
    ],
  },
  zonesHeading: 'Pinal zones: San Tan growth, Casa Grande multi-unit, Florence corridor & southern rural edges',
  zonesIntro: 'Two to four sharp products — HOA growth, multi-unit corridors, seat edges, and rural lots.',
  zones: [
    {
      id: 'san-tan',
      name: 'San Tan Valley / Queen Creek-edge HOA growth',
      shortName: 'San Tan growth',
      neighborhoods: ["San Tan Valley","Queen Creek edges","HOA villages"],
      housingTypes: 'HOA SFH, townhomes, multi-family',
      challenges: ["HOA packets","AZ-347 peaks","Long cul-de-sacs"],
      moverTips: 'Collect HOA COIs; build AZ-347 buffer for Maricopa pairs.',
      cityKeywords: ["san tan","queen creek"],
    },
    {
      id: 'casa-grande',
      name: 'Casa Grande multi-unit & industrial-adjacent stock',
      shortName: 'Casa Grande',
      neighborhoods: ["Casa Grande","industrial multi-family","downtown edges"],
      housingTypes: 'Multi-family, older SFH, townhomes',
      challenges: ["Elevators/stairs","I-10 freeflow","Shift traffic"],
      moverTips: 'Confirm elevator rules; prefer early starts near industrial corridors.',
      cityKeywords: ["casa grande"],
    },
    {
      id: 'florence',
      name: 'Florence / AZ-79 corridor edges',
      shortName: 'Florence',
      neighborhoods: ["Florence","AZ-79 edges"],
      housingTypes: 'SFH, multi-family, mixed stock',
      challenges: ["Empty miles","Arterial timing"],
      moverTips: 'Prefer early starts; confirm driveway depth.',
      cityKeywords: ["florence"],
    },
    {
      id: 'south-rural',
      name: 'Arizona City / southern rural edges',
      shortName: 'South rural',
      neighborhoods: ["Arizona City","southern tracts"],
      housingTypes: 'SFH, rural-edge lots',
      challenges: ["Empty miles","Soft shoulders","Heat staging"],
      moverTips: 'Survey approaches; early starts beat heat peaks.',
      cityKeywords: ["arizona city","south pinal"],
    }
  ],
  specialized: [
    {
      id: 'hoa-corridor',
      title: 'Outer-corridor HOA growth module',
      intro: 'Master-plan rules dominate San Tan family volume.',
      bullets: ["Collect COI and gate lists before the estimate is final.","Saturday HOA windows push demand into peak crew slots."],
    },
    {
      id: 'i10-freeflow',
      title: 'I-10 / AZ-347 freeflow',
      intro: 'Corridor pairs still peak hard toward Maricopa.',
      bullets: ["Price portal-to-portal honestly.","Clarify Maricopa second addresses for drive-time assumptions."],
    },
    {
      id: 'heat-pacing',
      title: 'Desert heat pacing module',
      intro: 'Summer open carries are first-class labor-hours drivers.',
      bullets: ["Prefer early starts May–September.","Pace crews and protect cardboard inventories."],
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
        intro: 'Pinal families compare J.O. Combs, Florence Unified, Casa Grande Elementary/Union, and related district feeders — verify address boundaries; do not assume Maricopa maps apply.',
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
            detail: 'Banner and regional campuses with Valley specialty spillover serve the county; map peak I-10 / AZ-347 times for ER access.',
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
    intro: 'HOA soft costs, I-10 freeflow, empty miles from Valley yards, and heat pacing often matter more than raw miles.',
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
    intro: 'School years, summer heat, and winter snowbird edges reshape demand more than pure Valley corporate calendars alone.',
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
        label: 'Maricopa County movers (parent contrast)',
        href: '/local-movers/arizona/maricopa',
      },

    ],
  },
});

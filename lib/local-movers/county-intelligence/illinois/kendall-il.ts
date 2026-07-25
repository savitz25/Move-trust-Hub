import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeIlTier2Pack,
  IL_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/illinois/il-tier2-shared';

/**
 * kendall â€” IL Tier 2 Wave 1
 */
export const kendallCountyIlTier2Intelligence: CountyIntelligencePack = finalizeIlTier2Pack({
  countySlug: 'kendall',
  hubTitle: 'Kendall County Moving Intelligence Hub',
  eyebrow: 'Kendall · Oswego / Yorkville — southwest collar growth',
  h1: 'Moving in Kendall County: Oswego, Yorkville & Outer-Collar US-34 Growth',
  heroOpener:
    'Kendall County is Chicagoland’s southwest outer-collar growth market — Oswego multi-family and HOA spillover, Yorkville seat stock, Montgomery edges, and freeflow on US-34 / I-88 links that is not Will County Joliet product with different labels. Expect master-plan gate lists, longer empty miles from Will/Kane yards, and driveway HOA density that prices differently from continuous Will industrial-residential corridors. This guide is for people moving in Kendall as outer-collar growth — not a Will rename.',
  heroCredibility:
    'Southwest outer collar · HOA growth · US-34 / I-88 · ICC household goods · FMCSA when interstate · Curated listings',
  majorCorridors: 'US-34 · IL-47 · IL-71 · I-88 links · IL-126',
  lastReviewed: '2026-07-25',
  parentCompare: {
    parentLabel: 'Will County',
    parentHref: '/local-movers/illinois/will',
    title: 'Compared with Will County',
    intro:
      'Kendall is outer-collar HOA growth on US-34 — not Will Joliet industrial-residential density and not pure rural prairie freeflow.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'Will crews fight I-55/I-80 peaks into Joliet and south-collar arterials. Kendall pairs ride US-34, IL-47, and I-88 links — freer mid-day further southwest, still peak-heavy toward Will/Kane portals and Oswego commute windows. Portal-to-portal time is real; it is not a Joliet multi-story day.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'Will mixes Joliet multi-story, industrial multi-family, and south-collar HOAs. Kendall mixes Oswego planned SFH, Yorkville multi-family, and Montgomery edges — more continuous outer-collar HOA product, less continuous Will industrial density.',
      },
      {
        title: 'Truck access & density',
        detail:
          'HOA COIs, gate lists, and approved hours dominate more often than older Will seat curb plans. Rural southern lots add soft shoulders uncommon on dense Will arterials.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local Kendall quotes often track outer-collar suburb rates for driveway SFH — empty miles from Will/Kane staging and HOA soft costs still push prices up vs map miles alone.',
      },
      {
        title: 'Role difference',
        detail:
          'Kendall is southwest outer-collar growth — not Will County product renamed.',
      }
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Kendall County different',
    intro: 'Outer-collar HOA density, US-34 freeflow, and empty miles from Will/Kane yards — not interchangeable Joliet boilerplate.',
    bullets: [
      {
        title: 'US-34 / I-88 peaks rewrite short-looking locals',
        detail:
          'Kendall ↔ Will pairs freer mid-day still burn clock at commute peaks. Ask portal-to-portal.',
      },
      {
        title: 'Master-plan HOA is first-class product',
        detail:
          'Gate lists, truck limits, and approved hours are standard on Oswego growth villages.',
      },
      {
        title: 'Empty miles from Will/Kane yards are real',
        detail:
          'Even “local” Kendall pairs can price as distance work for Joliet- or Aurora-based crews.',
      },
      {
        title: 'Yorkville multi-family differs from pure HOA cul-de-sacs',
        detail:
          'Seat stairs and curb plans need inventories different from brand-new villages.',
      },
      IL_TIER2_REG_BULLET,
    ],
  },
  zonesHeading: 'Kendall zones: Oswego growth, Yorkville seat, Montgomery edges & southern rural lots',
  zonesIntro: 'Two to four sharp products — growth HOAs, seat multi-family, edge stock, and rural lots.',
  zones: [
    {
      id: 'oswego-growth',
      name: 'Oswego multi-family & HOA growth',
      shortName: 'Oswego',
      neighborhoods: ["Oswego","growth villages","US-34 multi-family"],
      housingTypes: 'HOA SFH, townhomes, multi-family',
      challenges: ["HOA packets","US-34 peaks","Lease clusters"],
      moverTips: 'Collect HOA COIs; build US-34 buffer for Will pairs.',
      cityKeywords: ["oswego"],
    },
    {
      id: 'yorkville',
      name: 'Yorkville seat multi-family & older stock',
      shortName: 'Yorkville',
      neighborhoods: ["Yorkville","downtown edges","seat multi-family"],
      housingTypes: 'Multi-family, older SFH, townhomes',
      challenges: ["Stairs","Street parking","Mixed curb"],
      moverTips: 'Photo curb; confirm elevator vs stair access.',
      cityKeywords: ["yorkville"],
    },
    {
      id: 'montgomery',
      name: 'Montgomery / northern edges toward Kane',
      shortName: 'Montgomery edge',
      neighborhoods: ["Montgomery edges","northern tracts"],
      housingTypes: 'HOA SFH, multi-family',
      challenges: ["IL-47 freeflow","HOA rules"],
      moverTips: 'Clarify Kane or Will second addresses early.',
      cityKeywords: ["montgomery"],
    },
    {
      id: 'south-rural',
      name: 'Southern Kendall rural-edge lots',
      shortName: 'South rural',
      neighborhoods: ["southern tracts","Plano edges"],
      housingTypes: 'SFH, rural-edge lots',
      challenges: ["Empty miles","Soft shoulders"],
      moverTips: 'Survey truck access; prefer early starts for long pairs.',
      cityKeywords: ["plano","south kendall"],
    }
  ],
  specialized: [
    {
      id: 'hoa-outer',
      title: 'Outer-collar HOA growth module',
      intro: 'Master-plan rules dominate Kendall family volume.',
      bullets: ["Collect COI and gate lists before the estimate is final.","Saturday HOA windows push demand into peak crew slots."],
    },
    {
      id: 'us34-freeflow',
      title: 'US-34 / I-88 freeflow',
      intro: 'Outer-collar pairs still peak hard toward Will and Kane.',
      bullets: ["Price portal-to-portal honestly.","Clarify Will or Kane second addresses for drive-time assumptions."],
    },
    {
      id: 'yorkville-access',
      title: 'Yorkville seat multi-family access',
      intro: 'Seat density differs from pure cul-de-sac HOAs.',
      bullets: ["Inventory stairs and street width.","Temporary no-parking often beats long carries."],
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
        intro: 'Kendall families compare Oswego, Yorkville, Plano, and related district feeders — verify address boundaries; do not assume Will or Kane maps apply.',
        bullets: [
          {
            title: 'District-first shopping',
            detail:
              'Use ISBE data and district maps; do not assume a city name equals one feeder pattern.',
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
            detail: 'Rush Copley edges, Morris Hospital spillover, and Chicago specialty access serve the county; map peak US-34 / I-88 times for ER access.',
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
    intro: 'HOA soft costs, US-34 freeflow, and empty miles from Will/Kane yards often matter more than raw miles.',
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
    intro: 'School years and summer family closings reshape demand more than Will industrial calendars alone.',
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
      'Official links first; directory listings are independent. Verify Illinois Commerce Commission (ICC) household goods authority for in-state Illinois moves and FMCSA for interstate legs.',
    items: [
      {
        label: 'Will County movers (parent contrast)',
        href: '/local-movers/illinois/will',
      },
      {
        label: 'Kane County movers',
        href: '/local-movers/illinois/kane',
      },
    ],
  },
});

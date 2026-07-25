import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeNyTier2Pack,
  NY_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/new-york/ny-tier2-shared';

/**
 * ontario — NY Tier 2 Wave 1
 */
export const ontarioCountyTier2Intelligence: CountyIntelligencePack = finalizeNyTier2Pack({
  countySlug: 'ontario',
  hubTitle: 'Ontario County Moving Intelligence Hub',
  eyebrow: 'Ontario · Canandaigua / Geneva · Finger Lakes / Rochester south',
  h1: 'Moving in Ontario County: Canandaigua, Geneva & Finger Lakes South of Rochester',
  heroOpener:
    'Ontario County is Finger Lakes south of Rochester — Canandaigua lake-town density, Geneva college-adjacent stock, Victor and Farmington growth corridors, and I-90 / NY-332 freeflow that still peaks toward Monroe County. It is not Monroe Rochester core renamed: expect lake last-mile, tourism calendars, and south-collar freeflow different from Brighton elevators or Greece suburban scripts. This guide is for people moving in Ontario as Finger Lakes / Rochester south collar — not a recycled Monroe Tier 1 pack.',
  heroCredibility:
    'Finger Lakes · Rochester south collar · Lake last-mile · NYSDOT household goods · FMCSA when interstate · Curated listings',
  majorCorridors: 'I-90 · I-490 · NY-332 · NY-5 · NY-21 · NY-14 · NY-96',
  parentCompare: {
    parentLabel: 'Monroe County',
    parentHref: '/local-movers/new-york/monroe',
    title: 'Compared with Monroe County',
    intro:
      'Ontario is Finger Lakes + Rochester south collar — lake-town and growth-corridor product — not Monroe Rochester core elevators alone.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'Monroe crews fight Rochester core peaks. Ontario pairs ride I-90, NY-332, NY-96, and lake corridors — freer mid-day south of the city, still peak-heavy toward Monroe portals and Canandaigua weekends.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'Monroe mixes elevators, first-ring multi-family, and suburbs. Ontario mixes lake-town multi-story, Victor growth SFH, and Geneva stock — more Finger Lakes product, less continuous Rochester core density.',
      },
      {
        title: 'Truck access & density',
        detail:
          'Lake approaches and village streets need smaller trucks more often; growth corridors add HOA packets uncommon on pure rural Finger Lakes jobs.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local Ontario quotes often sit near or slightly below dense Rochester urban rates for driveway SFH — lake access and tourism peaks still push prices up.',
      },
      {
        title: 'Role difference',
        detail:
          'Ontario is Finger Lakes + Rochester south collar — not Monroe Rochester core product renamed.',
      }
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Ontario County different',
    intro: 'Lake last-mile, south-collar freeflow, and tourism calendars — not interchangeable Monroe boilerplate.',
    bullets: [
      {
        title: 'Lake last-mile is a first-class failure mode',
        detail:
          'Narrow approaches and seasonal congestion rewrite truck plans near Canandaigua and Geneva.',
      },
      {
        title: 'Victor growth HOA is first-class product',
        detail:
          'Planned suburbs treat COI and approved hours as standard survey inputs.',
      },
      {
        title: 'I-90 / NY-332 freeflow is still billable',
        detail:
          'Ontario ↔ Monroe pairs freer mid-day still peak hard. Ask portal-to-portal.',
      },
      {
        title: 'College-adjacent Geneva turnover is real',
        detail:
          'Term calendars create lease clusters different from pure family Saturdays.',
      },
      NY_TIER2_REG_BULLET,
    ],
  },
  zonesHeading: 'Ontario zones: Canandaigua lake town, Victor growth, Geneva corridor & rural edges',
  zonesIntro: 'Two to four sharp products — lake town, growth corridor, college town, and rural edges.',
  zones: [
    {
      id: 'canandaigua',
      name: 'Canandaigua lake town',
      shortName: 'Canandaigua',
      neighborhoods: ["Canandaigua","lake edges"],
      housingTypes: 'Village multi-story, SFH, lake cottages',
      challenges: ["Tourism parking","Narrow roads","Seasonal congestion"],
      moverTips: 'Avoid peak lake weekends; measure approaches; plan no-parking signs.',
      cityKeywords: ["canandaigua"],
    },
    {
      id: 'victor-growth',
      name: 'Victor / Farmington growth corridor',
      shortName: 'Victor growth',
      neighborhoods: ["Victor","Farmington","Eastview edges"],
      housingTypes: 'Planned SFH, townhomes, apartments',
      challenges: ["HOA packets","I-90 / NY-96 peaks"],
      moverTips: 'Collect HOA COIs; build commute buffers toward Monroe.',
      cityKeywords: ["victor","farmington"],
    },
    {
      id: 'geneva',
      name: 'Geneva college-adjacent corridor',
      shortName: 'Geneva',
      neighborhoods: ["Geneva","NY-14 edges"],
      housingTypes: 'Multi-story, multi-family, SFH',
      challenges: ["Lease clusters","Street parking","Stairs"],
      moverTips: 'Book early around term calendars; inventory stairs.',
      cityKeywords: ["geneva"],
    },
    {
      id: 'rural-edges',
      name: 'Rural edges & larger lots',
      shortName: 'Rural Ontario',
      neighborhoods: ["Canadice","Naples edges","south county lots"],
      housingTypes: 'Larger lots, rural approaches',
      challenges: ["Empty miles","Winter ice","Soft shoulders"],
      moverTips: 'Photo approaches; winter mornings need flexibility.',
      cityKeywords: ["canadice","naples"],
    }
  ],
  specialized: [
    {
      id: 'lake-last-mile',
      title: 'Finger Lakes last-mile module',
      intro: 'Lake approaches reject full trailers more often than map miles suggest.',
      bullets: ["Photo the final approach before promising truck length.","Tourism weekends change parking reality near village cores."],
    },
    {
      id: 'rochester-south-collar',
      title: 'Rochester south-collar freeflow',
      intro: 'I-90 / NY-332 pairs to Monroe still peak hard.',
      bullets: ["Price portal-to-portal time honestly for Ontario ↔ Monroe legs.","Clarify Monroe County second addresses for drive-time assumptions."],
    },
    {
      id: 'growth-hoa',
      title: 'Victor growth HOA logistics',
      intro: 'Planned suburbs are first-class Ontario product.',
      bullets: ["Collect HOA packets before the estimate is final.","Confirm approved move hours before booking Saturday crews."],
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
        intro: 'Ontario families compare Canandaigua, Victor, Geneva, and other districts — verify boundaries.',
        bullets: [
          {
            title: 'District-first shopping',
            detail:
              'Use NYSED data and district maps; do not assume a village name equals one feeder pattern.',
          },
          {
            title: 'Capacity & calendars',
            detail:
              'Growth pockets and college towns can tighten housing near school and term calendars.',
          },
        ],
      },
      {
        id: 'hospitals',
        title: 'Hospitals & healthcare',
        bullets: [
          {
            title: 'Acute-care anchors',
            detail: 'FF Thompson and related campuses serve the region with Rochester specialty spillover; map peak freeflow for ER access.',
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
    intro: 'Lake access, HOA soft costs, and south-collar freeflow often matter more than raw miles.',
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
      { label: 'Studio / 1-BR', value: '$500–$1,200+' },
      {
        label: '3–4 BR home',
        value: '$1,800–$4,200+',
        note: 'Higher with access friction',
      },
      { label: '2-person crew', value: '$120–$185+/hr' },
    ],
  },
  seasonal: {
    title: 'Seasonal & calendar notes',
    intro: 'Tourism summers, school years, term calendars, and winter ice reshape demand by pocket.',
    items: [
      {
        title: 'Late spring – early fall',
        detail: 'Family closings and peak calendars fill Saturday crews first.',
      },
      {
        title: 'Winter access',
        detail: 'Hills, lake edges, and rural approaches need ice-aware morning plans.',
      },
    ],
  },
  resources: {
    title: 'Useful resources',
    intro:
      'Official links first; directory listings are independent. Verify NYSDOT household-goods frameworks for in-state moves and FMCSA for interstate legs.',
    items: [
      {
        label: 'Monroe County movers (parent contrast)',
        href: '/local-movers/new-york/monroe',
      },
      
    ],
  },
});

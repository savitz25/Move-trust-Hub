import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeGaTier2Pack,
  GA_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/georgia/ga-tier2-shared';

/** henry — GA Tier 2 Wave 1 */
export const henryCountyTier2Intelligence: CountyIntelligencePack = finalizeGaTier2Pack({
  countySlug: 'henry',
  hubTitle: 'Henry County Moving Intelligence Hub',
  eyebrow: 'Henry · South Atlanta collar · McDonough / Stockbridge · vs Clayton',
  h1: 'Moving in Henry County: McDonough, Stockbridge & I-75 South Growth',
  heroOpener: 'Henry County is south Atlanta’s I-75 growth collar — McDonough seat density, Stockbridge multi-family and SFH mix, Hampton and logistics-adjacent residential, and freeflow that is not Clayton airport-core product. Expect longer empty miles than inner-south Fulton, HOA growth villages, and warehouse-corridor peaks that rewrite “local” pairs. This guide is for people moving in Henry as south-metro I-75 growth — not a Clayton rename and not a Fayette planned-community script.',
  heroCredibility: 'I-75 south growth · Logistics/residential mix · Georgia DPS MCCD · FMCSA when interstate · Curated listings',
  majorCorridors: 'I-75 · I-675 · US-23 · GA-20 · GA-155',
  parentCompare: {
    parentLabel: 'Clayton County (and Fulton south patterns)',
    parentHref: '/local-movers/georgia/clayton',
    title: 'Compared with Clayton County (and Fulton south patterns)',
    intro: 'Henry is I-75 south growth collar with logistics-adjacent residential — not Clayton airport multi-family core and not Fayette golf-cart planned city alone.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail: 'Clayton crews fight I-75/I-285 airport peaks. Henry pairs ride I-75 further south, I-675, and GA-20 — freer mid-day south of the airport choke, still peak-heavy on McDonough ↔ Stockbridge and warehouse-shift windows.',
      },
      {
        title: 'Housing stock differences',
        detail: 'Clayton mixes airport-adjacent multi-family and older corridors. Henry mixes McDonough seat SFH, Stockbridge multi-family, Hampton growth, and logistics-edge homes — more continuous outer-south HOA product, less continuous airport multi-unit density.',
      },
      {
        title: 'Truck access, HOA & density',
        detail: 'Growth HOAs need COI packets; industrial-adjacent streets can add truck traffic timing uncommon on pure residential Fayette days.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail: 'Local Henry quotes often sit at south-collar suburban rates for driveway SFH — empty miles and logistics-corridor peaks still push premiums.',
      },
      {
        title: 'Role difference',
        detail: 'Henry is I-75 south growth and logistics/residential mix — not Clayton airport rename and not Fayette planned Peachtree City product.',
      }
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Henry County different',
    intro: 'I-75 south freeflow, logistics adjacency, and growth HOAs — not a Clayton clone.',
    bullets: [
      {
        title: 'I-75 south freeflow is still billable',
        detail: 'McDonough ↔ Stockbridge pairs freer mid-day still peak hard. Ask portal-to-portal.',
      },
      {
        title: 'Logistics corridors rewrite timing',
        detail: 'Warehouse-shift windows can choke arterials near residential growth edges.',
      },
      {
        title: 'Growth HOA product is first-class',
        detail: 'Gate lists and COI packets dominate new villages.',
      },
      {
        title: 'Distinct from Fayette planned-city logistics',
        detail: 'Henry is not golf-cart path geometry — do not recycle Peachtree City playbooks.',
      },
      GA_TIER2_REG_BULLET,
    ],
  },
  zonesHeading: 'Henry zones: McDonough seat, Stockbridge mix, Hampton growth & logistics-edge residential',
  zonesIntro: 'Two to four sharp products under one I-75 south-collar label.',
  zones: [
    {
      id: 'mcdonough',
      name: 'McDonough seat & core',
      shortName: 'McDonough',
      neighborhoods: ["McDonough","seat neighborhoods"],
      housingTypes: 'SFH, townhomes, mixed stock',
      challenges: ["Arterial timing","HOA packets"],
      moverTips: 'Confirm driveway and HOA hours; price I-75 peaks.',
      cityKeywords: ["mcdonough"],
    },
    {
      id: 'stockbridge',
      name: 'Stockbridge multi-family & SFH mix',
      shortName: 'Stockbridge',
      neighborhoods: ["Stockbridge","multi-family clusters"],
      housingTypes: 'SFH, apartments, townhomes',
      challenges: ["Building COIs","Mixed access"],
      moverTips: 'Collect management packets on multi-family; inventory elevators.',
      cityKeywords: ["stockbridge"],
    },
    {
      id: 'hampton',
      name: 'Hampton growth edge',
      shortName: 'Hampton',
      neighborhoods: ["Hampton","growth villages"],
      housingTypes: 'Planned SFH, townhomes',
      challenges: ["Gate lists","Empty miles"],
      moverTips: 'Photo last-mile on new streets; confirm gate rules.',
      cityKeywords: ["hampton"],
    },
    {
      id: 'logistics-edge',
      name: 'Logistics-adjacent residential',
      shortName: 'Logistics edge',
      neighborhoods: ["I-75 industrial edges","warehouse-adjacent homes"],
      housingTypes: 'SFH near industrial freeflow',
      challenges: ["Truck traffic timing","Peak shifts"],
      moverTips: 'Avoid warehouse-shift peaks when possible; price portal-to-portal.',
      cityKeywords: ["henry logistics"],
    }
  ],
  specialized: [
    {
      id: 'i75-south',
      title: 'I-75 south growth freeflow',
      intro: 'Outer-south pairs still peak hard.',
      bullets: ["Price portal-to-portal honestly.","Do not quote Clayton airport multi-family rates for McDonough driveways."],
    },
    {
      id: 'logistics-mix',
      title: 'Logistics/residential corridor mix',
      intro: 'Industrial freeflow meets HOA villages.',
      bullets: ["Time loads away from shift changes when possible.","Confirm street width near industrial edges."],
    },
    {
      id: 'growth-hoa',
      title: 'South-collar HOA growth logistics',
      intro: 'New villages treat COI as default.',
      bullets: ["Gate lists early.","Mud weeks on new construction need flexibility."],
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
        intro: 'Henry families compare Henry County Schools feeders across McDonough, Stockbridge, and Hampton — verify boundaries; do not assume Clayton maps apply.',
        bullets: [
          {
            title: 'District-first shopping',
            detail:
              'Use Georgia DOE data and district maps; do not assume a city name equals one feeder pattern.',
          },
          {
            title: 'Capacity & calendars',
            detail:
              'Growth pockets and university/military markets can tighten housing near school calendars.',
          },
        ],
      },
      {
        id: 'hospitals',
        title: 'Hospitals & healthcare',
        bullets: [
          {
            title: 'Acute-care anchors',
            detail: 'Piedmont Henry Hospital and regional clinics anchor acute care; map peak freeflow on I-75 south corridors.',
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
    intro: 'I-75 peaks, logistics timing, and HOA soft costs often matter more than raw miles.',
    drivers: [
      { title: 'Corridor freeflow', detail: 'Peak windows inflate hourly bills on short-looking pairs.' },
      { title: 'Access soft costs', detail: 'HOA packets, stairs, or last-mile shuttles add labor hours.' },
      { title: 'Long empty-mile edges', detail: 'Far pockets price differently from seat cores.' },
    ],
    ranges: [
      { label: 'Studio / 1-BR', value: '$450–$1,200+' },
      { label: '3–4 BR home', value: '$1,600–$4,200+', note: 'Higher with access friction' },
      { label: '2-person crew', value: '$120–$190+/hr' },
    ],
  },
  seasonal: {
    title: 'Seasonal & calendar notes',
    intro: 'School years and summer family closings reshape demand more than airport cargo calendars alone.',
    items: [
      { title: 'Late spring – early fall', detail: 'Family closings and peak calendars fill Saturday crews first.' },
      { title: 'School & institutional calendars', detail: 'Term, PCS, or school windows can outrank pure weekend demand.' },
    ],
  },
  resources: {
    title: 'Useful resources',
    intro:
      'Official links first; directory listings are independent. Verify Georgia DPS MCCD household-goods frameworks for in-state moves and FMCSA for interstate legs.',
    items: [
      { label: 'Clayton County (and Fulton south patterns) movers (parent contrast)', href: '/local-movers/georgia/clayton' },
    ],
  },
});

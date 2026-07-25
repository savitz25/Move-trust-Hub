import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeNyTier2Pack,
  NY_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/new-york/ny-tier2-shared';

/**
 * oswego — NY Tier 2 Wave 2
 */
export const oswegoCountyTier2Intelligence: CountyIntelligencePack = finalizeNyTier2Pack({
  countySlug: 'oswego',
  hubTitle: 'Oswego County Moving Intelligence Hub',
  eyebrow: 'Oswego · Lake Ontario · vs Onondaga',
  h1: 'Moving in Oswego County: Oswego Lake City, Fulton Corridors & Central NY North Edge',
  heroOpener:
    'Oswego County is Central NY’s Lake Ontario north edge — Oswego multi-story and college-town density, Fulton corridors, lake-effect winter product, and NY-481 / NY-104 freeflow that is not a Syracuse rename. Expect longer empty miles from Onondaga cores, port-city hills, and winter access that rewrites morning plans. This guide is for people moving in Oswego as lake-north Central NY — not Onondaga university multi-family with different labels.',
  heroCredibility:
    'Lake Ontario edge · Oswego / Fulton · Central NY north · NYSDOT household goods · FMCSA when interstate · Curated listings',
  majorCorridors: 'NY-481 · NY-104 · NY-48 · NY-3 · I-81 (east approaches) · NY-69 approaches',
  parentCompare: {
    parentLabel: 'Onondaga County',
    parentHref: '/local-movers/new-york/onondaga',
    title: 'Compared with Onondaga County',
    intro:
      'Oswego is Lake Ontario north-edge city and corridor product — not Syracuse university multi-family and not pure Onondaga suburban freeflow alone.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'Onondaga crews fight Syracuse peaks and I-81 city approaches. Oswego pairs ride NY-481, NY-104, and lake corridors — freer mid-day north of the metro, still peak-heavy on Oswego city pairs and lake-effect days.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'Onondaga mixes Syracuse multi-family and suburbs. Oswego mixes Oswego multi-story/college stock, Fulton SFH, and lake-edge homes — more continuous lake-city product, less inner Syracuse elevator density.',
      },
      {
        title: 'Truck access & density',
        detail:
          'Port-city hills and multi-story need stair inventories; lake-effect ice and wind rewrite winter schedules more often than southern Onondaga suburbs.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local Oswego quotes often sit near secondary Central NY rates for driveway SFH — city access and winter peaks push prices up vs quiet suburban Onondaga days.',
      },
      {
        title: 'Role difference',
        detail:
          'Oswego is Lake Ontario north-edge Central NY — not Onondaga Syracuse core renamed.',
      }
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Oswego County different',
    intro: 'Lake-city multi-story, lake-effect winter, and north-edge freeflow — not a Syracuse clone.',
    bullets: [
      {
        title: 'Oswego multi-story & college product',
        detail:
          'Stairs and term calendars need inventories different from pure suburban playbooks.',
      },
      {
        title: 'Lake-effect winter is operational',
        detail:
          'NY-481 and lake approaches need ice-aware mornings more often than Syracuse south suburbs.',
      },
      {
        title: 'Fulton corridors still peak',
        detail:
          'Cross-county pairs freer mid-day still burn billable time. Ask portal-to-portal.',
      },
      {
        title: 'North-edge empty miles matter',
        detail:
          'Rural lake towns price differently from Oswego city cores.',
      },
      NY_TIER2_REG_BULLET,
    ],
  },
  zonesHeading: 'Oswego zones: Oswego city/college, Fulton corridor, lake towns & rural interior',
  zonesIntro: 'Two to four sharp products — lake city, inland corridor, lake villages, and rural interior.',
  zones: [
    {
      id: 'oswego-city',
      name: 'Oswego city & college edge',
      shortName: 'Oswego city',
      neighborhoods: ["Oswego","downtown","campus edges"],
      housingTypes: 'Multi-story, student multi-family, older SFH',
      challenges: ["Stairs","Hills","Term clusters","Lake wind"],
      moverTips: 'Inventory stairs; book early around term calendars; winter flexibility required.',
      cityKeywords: ["oswego"],
    },
    {
      id: 'fulton',
      name: 'Fulton corridor',
      shortName: 'Fulton',
      neighborhoods: ["Fulton","corridor edges"],
      housingTypes: 'SFH, multi-story older stock',
      challenges: ["Arterial timing","Mixed access"],
      moverTips: 'Confirm street width; price portal-to-portal toward Oswego or Syracuse.',
      cityKeywords: ["fulton"],
    },
    {
      id: 'lake-towns',
      name: 'Lake Ontario town edges',
      shortName: 'Lake towns',
      neighborhoods: ["Mexico edges","Pulaski edges","lake villages"],
      housingTypes: 'SFH, seasonal stock',
      challenges: ["Seasonal roads","Wind/ice","Empty miles"],
      moverTips: 'Photo approaches; plan winter buffers.',
      cityKeywords: ["mexico","pulaski"],
    },
    {
      id: 'rural-interior',
      name: 'Rural interior',
      shortName: 'Rural interior',
      neighborhoods: ["central towns","farm approaches"],
      housingTypes: 'Larger lots, rural approaches',
      challenges: ["Empty miles","Soft shoulders"],
      moverTips: 'Photo last-mile before locking truck size.',
      cityKeywords: ["oswego county rural"],
    }
  ],
  specialized: [
    {
      id: 'oswego-city-access',
      title: 'Oswego multi-story & college turnover',
      intro: 'City stairs and term calendars are first-class cost drivers.',
      bullets: ["Inventory floor counts and elevators.","Book early around term start/end."],
    },
    {
      id: 'lake-effect',
      title: 'Lake-effect winter logistics',
      intro: 'Weather rewrites morning plans more than map miles.',
      bullets: ["Build ice-aware buffers into quotes.","Confirm approach conditions the day before."],
    },
    {
      id: 'north-edge-freeflow',
      title: 'Central NY north-edge freeflow',
      intro: 'Oswego ↔ Onondaga pairs still peak hard.',
      bullets: ["Price portal-to-portal honestly.","Do not quote pure Syracuse driveway rates for lake-city multi-story."],
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
        intro: 'Oswego families compare Oswego City, Fulton, Mexico, Pulaski, and other districts — verify boundaries; lake and interior feeders differ.',
        bullets: [
          {
            title: 'District-first shopping',
            detail:
              'Use NYSED data and district maps; do not assume a village name equals one feeder pattern.',
          },
          {
            title: 'Capacity & calendars',
            detail:
              'Growth pockets, college towns, and seasonal markets can tighten housing near school calendars.',
          },
        ],
      },
      {
        id: 'hospitals',
        title: 'Hospitals & healthcare',
        bullets: [
          {
            title: 'Acute-care anchors',
            detail: 'Oswego Health and regional clinics anchor acute care; map peak freeflow across lake corridors and winter weather days.',
          },
          {
            title: 'Peak drive times',
            detail:
              'Map ER access at commute peaks and weather days, not only off-hour freeflow.',
          },
        ],
      },
    ],
  },
  costDrivers: {
    title: 'Pricing & cost drivers',
    intro: 'City access, lake-effect winter, and empty miles often matter more than raw miles.',
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
        detail: 'Far pockets price differently from seat cores.',
      },
    ],
    ranges: [
      { label: 'Studio / 1-BR', value: '$450–$1,100+' },
      {
        label: '3–4 BR home',
        value: '$1,600–$4,000+',
        note: 'Higher with access friction',
      },
      { label: '2-person crew', value: '$115–$180+/hr' },
    ],
  },
  seasonal: {
    title: 'Seasonal & calendar notes',
    intro: 'Lake-effect winter, college calendars, and school years reshape demand more than Syracuse office peaks alone.',
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
        label: 'Onondaga County movers (parent contrast)',
        href: '/local-movers/new-york/onondaga',
      },
    ],
  },
});

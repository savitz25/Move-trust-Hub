import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeNyTier2Pack,
  NY_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/new-york/ny-tier2-shared';

/**
 * st-lawrence — NY Tier 2 Wave 2
 */
export const stLawrenceCountyTier2Intelligence: CountyIntelligencePack = finalizeNyTier2Pack({
  countySlug: 'st-lawrence',
  hubTitle: 'St. Lawrence County Moving Intelligence Hub',
  eyebrow: 'St. Lawrence · Canton / Massena · independent North Country',
  h1: 'Moving in St. Lawrence County: Canton, Massena & North Country River Access',
  heroOpener:
    'St. Lawrence County is North Country independent product at scale — Canton and Potsdam college towns, Massena industrial and river-edge stock, Ogdensburg approaches, and long rural freeflow that does not answer to Watertown or Syracuse scripts alone. Expect extreme empty miles, winter last-mile constraints, and college calendars that spike local demand without creating Binghamton-style continuous multi-family density. This guide is for people moving in St. Lawrence as Canton / Massena North Country — not Jefferson Fort Drum product renamed.',
  heroCredibility:
    'Canton / Massena · College towns · River North Country · NYSDOT household goods · FMCSA when interstate · Curated listings',
  majorCorridors: 'US-11 · NY-37 · NY-68 · NY-56 · NY-812 · NY-3 approaches',
  parentCompare: {
    parentLabel: 'independent North Country (vs Jefferson / Onondaga defaults)',
    parentHref: '/local-movers/new-york/jefferson',
    title: 'Compared with independent North Country (vs Jefferson / Onondaga defaults)',
    intro:
      'St. Lawrence is Canton / Massena / college-town North Country at scale — not Fort Drum PCS multi-family alone and not Syracuse freeflow.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'Jefferson crews fight I-81 Watertown and Fort Drum peaks. St. Lawrence pairs ride US-11, NY-37, and long rural spines — freer mid-day on empty miles, still peak-heavy on college move weekends and Massena industrial corridors.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'Jefferson mixes Watertown multi-story and base apartments. St. Lawrence mixes Canton/Potsdam college multi-family, Massena multi-story, and vast rural lots — more dispersed product, less continuous PCS corridor density.',
      },
      {
        title: 'Truck access & density',
        detail:
          'College multi-family needs management packets; rural and river edges add extreme empty miles and winter ice uncommon on Watertown city jobs.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local St. Lawrence quotes often track secondary North Country rates — deadhead and winter access dominate pricing more than map miles.',
      },
      {
        title: 'Role difference',
        detail:
          'St. Lawrence is dispersed North Country college + river industrial product — not Jefferson Fort Drum renamed.',
      }
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in St. Lawrence County different',
    intro: 'Dispersed college towns, river industrial stock, and extreme empty miles — not Watertown PCS boilerplate.',
    bullets: [
      {
        title: 'Canton / Potsdam college calendars spike demand',
        detail:
          'Term weekends fill local crews without matching continuous Ithaca density.',
      },
      {
        title: 'Massena multi-story and industrial edges',
        detail:
          'City stairs and corridor freeflow need inventories different from pure farm approaches.',
      },
      {
        title: 'Extreme empty miles are first-class cost drivers',
        detail:
          'County scale means long local pairs; price portal-to-portal honestly.',
      },
      {
        title: 'Canada adjacency creates interstate legs',
        detail:
          'Border-facing destinations need FMCSA authority clarity.',
      },
      NY_TIER2_REG_BULLET,
    ],
  },
  zonesHeading: 'St. Lawrence zones: Canton/Potsdam colleges, Massena river, Ogdensburg edge & rural interior',
  zonesIntro: 'Two to four sharp products — college towns, river industrial city, river seat, and vast rural interior.',
  zones: [
    {
      id: 'canton-potsdam',
      name: 'Canton / Potsdam college towns',
      shortName: 'College towns',
      neighborhoods: ["Canton","Potsdam","campus edges"],
      housingTypes: 'Student multi-family, SFH, apartments',
      challenges: ["Term clusters","Building COIs","Street parking"],
      moverTips: 'Book early around term calendars; collect management packets.',
      cityKeywords: ["canton","potsdam"],
    },
    {
      id: 'massena',
      name: 'Massena river & industrial edges',
      shortName: 'Massena',
      neighborhoods: ["Massena","river approaches"],
      housingTypes: 'Multi-story, multi-unit, older SFH',
      challenges: ["Stairs","Corridor freeflow","Winter ice"],
      moverTips: 'Inventory stairs; price portal-to-portal on longer pairs.',
      cityKeywords: ["massena"],
    },
    {
      id: 'ogdensburg',
      name: 'Ogdensburg river seat edge',
      shortName: 'Ogdensburg',
      neighborhoods: ["Ogdensburg","river seat"],
      housingTypes: 'Multi-story, SFH, mixed stock',
      challenges: ["Street width","Winter access"],
      moverTips: 'Plan temporary no-parking; photo approaches in winter.',
      cityKeywords: ["ogdensburg"],
    },
    {
      id: 'rural-interior',
      name: 'Rural interior & larger lots',
      shortName: 'Rural interior',
      neighborhoods: ["Gouverneur edges","interior towns"],
      housingTypes: 'Larger lots, rural approaches',
      challenges: ["Extreme empty miles","Soft shoulders","Winter ice"],
      moverTips: 'Photo last-mile; allow large winter buffers.',
      cityKeywords: ["gouverneur"],
    }
  ],
  specialized: [
    {
      id: 'college-turnover',
      title: 'Canton / Potsdam college turnover',
      intro: 'Term calendars create multi-family clusters.',
      bullets: ["Book early around term start/end.","Inventory elevators and long carries."],
    },
    {
      id: 'massena-access',
      title: 'Massena multi-story & river corridors',
      intro: 'City stairs and freeflow are first-class cost drivers.',
      bullets: ["Inventory floor counts.","Price long local pairs portal-to-portal."],
    },
    {
      id: 'empty-miles',
      title: 'North Country empty-mile logistics',
      intro: 'County scale rewrites hourly math.',
      bullets: ["Do not quote tight urban rates for interior farms.","Photo approaches before locking truck size."],
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
        intro: 'St. Lawrence families compare Canton, Potsdam, Massena, Ogdensburg, and other districts — verify boundaries across a very large county.',
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
            detail: 'Canton-Potsdam Hospital, Massena Hospital, and regional clinics anchor acute care; map peak freeflow honestly across long distances.',
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
    intro: 'Empty miles, winter access, and college peaks often matter more than raw miles.',
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
    intro: 'Harsh winters, term calendars, and river weather reshape demand more than mid-state patterns.',
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
        label: 'independent North Country (vs Jefferson / Onondaga defaults) movers (parent contrast)',
        href: '/local-movers/new-york/jefferson',
      },
    ],
  },
});

import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeVaTier2Pack,
  VA_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/virginia/va-tier2-shared';

/** portsmouth — VA Tier 2 Wave 2 */
export const portsmouthCityVaTier2Intelligence: CountyIntelligencePack = finalizeVaTier2Pack({
  countySlug: 'portsmouth',
  hubTitle: 'Portsmouth Moving Intelligence Hub',
  eyebrow: 'Portsmouth · Olde Towne / shipyard edge · South Hampton Roads · vs Norfolk',
  h1: 'Moving in Portsmouth: Olde Towne, Shipyard Edge & South Hampton Roads',
  heroOpener: 'Portsmouth is a South Hampton Roads independent city — Olde Towne historic fabric, naval/shipyard-adjacent workforce housing, Churchland suburban scale, and tunnel/bridge freeflow that is not a Norfolk neighborhood rename. Expect historic street staging, industrial shift timing, and portal-to-portal time map miles understate. This guide is for people moving in Portsmouth as independent-city product — not Norfolk downtown defaults alone.',
  heroCredibility: 'Independent city · Shipyard-adjacent · Virginia DMV household goods · FMCSA when interstate · Curated listings',
  majorCorridors: 'I-264 · US-17 · US-58 · Midtown/Downtown Tunnel approaches · SR-164',
  lastReviewed: '2026-07-24',
  parentCompare: {
    parentLabel: 'Norfolk',
    parentHref: '/local-movers/virginia/norfolk',
    title: 'Compared with Norfolk',
    intro: 'Portsmouth is its own independent city with shipyard-adjacent product — related Roads metro, different government, schools, and day-to-day choke points than Norfolk.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail: 'Norfolk crews fight naval-base and downtown tunnel peaks. Portsmouth pairs add Olde Towne constraints and shipyard-edge freeflow — related Roads timing, different street grids.',
      },
      {
        title: 'Housing stock differences',
        detail: 'Norfolk mixes downtown multi-story and base-adjacent product. Portsmouth mixes Olde Towne historic, Churchland suburban, and industrial-edge workforce housing.',
      },
      {
        title: 'Truck access, HOA & density',
        detail: 'Historic streets and tunnel delays rewrite plans more often than pure Norfolk suburban edges.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail: 'Local Portsmouth SFH can sit at secondary Roads rates — tunnel delays and historic staging still push premiums.',
      },
      {
        title: 'Role difference',
        detail: 'Portsmouth is independent-city identity — not Norfolk renamed.',
      }
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Portsmouth different',
    intro: 'Independent-city rules, shipyard timing, and Olde Towne access — not a Norfolk clone.',
    bullets: [
      {
        title: 'Independent city logistics',
        detail: 'Do not assume Norfolk permits apply inside Portsmouth.',
      },
      {
        title: 'Shipyard-adjacent timing',
        detail: 'Industrial shift changes affect waterfront neighborhoods.',
      },
      {
        title: 'Olde Towne historic access',
        detail: 'Smaller streets and event peaks need early staging plans.',
      },
      {
        title: 'Interstate legs need FMCSA',
        detail: 'Cross-state destinations flip authority.',
      },
      VA_TIER2_REG_BULLET,
    ],
  },
  zonesHeading: 'Portsmouth zones: Olde Towne, shipyard edge, Churchland & tunnel approaches',
  zonesIntro: 'Two to four sharp products under one independent-city label.',
  zones: [
    {
      id: 'olde-towne',
      name: 'Olde Towne & downtown Portsmouth',
      shortName: 'Olde Towne',
      neighborhoods: ["Olde Towne","downtown"],
      housingTypes: 'Historic streets, waterfront, multi-story',
      challenges: ["Tight streets","Event closures"],
      moverTips: 'Photograph street widths; plan small trucks.',
      cityKeywords: ["olde towne","portsmouth"],
    },
    {
      id: 'shipyard',
      name: 'Naval/shipyard-adjacent neighborhoods',
      shortName: 'Shipyard edge',
      neighborhoods: ["shipyard-adjacent"],
      housingTypes: 'Workforce housing near industrial waterfront',
      challenges: ["Shift timing","Truck routes"],
      moverTips: 'Ask about shift windows near industrial edges.',
      cityKeywords: ["portsmouth shipyard"],
    },
    {
      id: 'churchland',
      name: 'Churchland & western Portsmouth',
      shortName: 'Churchland',
      neighborhoods: ["Churchland"],
      housingTypes: 'Suburban scale on the city’s west side',
      challenges: ["Different access than Olde Towne"],
      moverTips: 'Do not recycle Olde Towne notes for Churchland SFH.',
      cityKeywords: ["churchland"],
    },
    {
      id: 'tunnels',
      name: 'Tunnel and bridge approach corridors',
      shortName: 'Tunnel approaches',
      neighborhoods: ["Midtown/Downtown Tunnel approaches"],
      housingTypes: 'Regional connectors into Norfolk/Suffolk',
      challenges: ["Peak crossing delays"],
      moverTips: 'Build tunnel delay buffers.',
      cityKeywords: ["portsmouth tunnel"],
    }
  ],
  specialized: [
    {
      id: 'independent-city',
      title: 'Independent city logistics',
      intro: 'Portsmouth crews and parking rules are local.',
      bullets: ["Do not assume Norfolk permits apply."],
    },
    {
      id: 'shipyard-timing',
      title: 'Shipyard-adjacent timing',
      intro: 'Industrial shift changes affect neighborhood access near the waterfront.',
      bullets: ["Ask about employer shift windows."],
    },
    {
      id: 'olde-towne',
      title: 'Historic Olde Towne access',
      intro: 'Smaller streets and tourist/event peaks need early staging plans.',
      bullets: ["Photo approaches; plan shuttle options."],
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
        intro: 'Portsmouth families compare Portsmouth Public Schools feeders — verify boundaries; do not assume Norfolk maps apply.',
        bullets: [
          {
            title: 'District-first shopping',
            detail:
              'Use Virginia DOE data and district maps; do not assume a city name equals one feeder pattern.',
          },
          {
            title: 'Capacity & calendars',
            detail:
              'Growth pockets, university, military, and tourism markets can tighten housing near school calendars.',
          },
        ],
      },
      {
        id: 'hospitals',
        title: 'Hospitals & healthcare',
        bullets: [
          {
            title: 'Acute-care anchors',
            detail: 'Bon Secours Maryview and regional Hampton Roads systems serve the city; map tunnel freeflow at peaks.',
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
    intro: 'Tunnel delays, historic staging, and empty miles often matter more than raw miles.',
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
    intro: 'School years and industrial shift calendars reshape demand more than pure beach-season peaks alone.',
    items: [
      { title: 'Late spring – early fall', detail: 'Family closings and peak calendars fill Saturday crews first.' },
      { title: 'Institutional calendars', detail: 'Term, PCS, tourism, or plant windows can outrank pure weekend demand.' },
    ],
  },
  resources: {
    title: 'Useful resources',
    intro:
      'Official links first; directory listings are independent. Verify Virginia DMV household-goods / motor-carrier authority for in-state moves and FMCSA for interstate legs.',
    items: [
      { label: 'Norfolk movers (parent contrast)', href: '/local-movers/virginia/norfolk' },
    ],
  },
});

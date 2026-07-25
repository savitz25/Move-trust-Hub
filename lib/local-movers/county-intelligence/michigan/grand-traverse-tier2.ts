import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeMiTier2Pack,
  MI_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/michigan/mi-tier2-shared';

/** grand-traverse — MI Tier 2 Wave 1 */
export const grandTraverseCountyMiTier2Intelligence: CountyIntelligencePack = finalizeMiTier2Pack({
  countySlug: 'grand-traverse',
  hubTitle: 'Grand Traverse County Moving Intelligence Hub',
  eyebrow: 'Grand Traverse · Traverse City · NW tourism/regional hub · independent',
  h1: 'Moving in Grand Traverse County: Traverse City Hub, Tourism Seasonality & NW Michigan Access',
  heroOpener: 'Grand Traverse County is northwest Michigan’s independent tourism and regional medical hub — Traverse City multi-story and tourism stock, peninsula and bay approaches, longer empty miles from lower-peninsula metros, and freeflow that does not answer to Detroit collar defaults. Expect extreme seasonal peaks, shore last-mile, and freeflow that still burns on M-72 / US-31. This guide is for people moving in Grand Traverse as NW tourism/regional product — not a Detroit or Grand Rapids rename.',
  heroCredibility: 'NW tourism hub · Regional medical · MSP CVED household goods · FMCSA when interstate · Curated listings',
  majorCorridors: 'US-31 · M-72 · M-37 · M-22 · Peninsula corridors',
  lastReviewed: '2026-07-24',
  parentCompare: {
    parentLabel: 'independent NW Michigan tourism/regional hub (vs Detroit / GR defaults)',
    parentHref: '/local-movers/michigan/kent',
    title: 'Compared with independent NW Michigan tourism/regional hub (vs Detroit / GR defaults)',
    intro: 'Grand Traverse is Traverse City tourism and regional medical product — not Detroit multi-county collar density and not Grand Rapids core elevators alone.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail: 'SE Michigan crews fight I-75/I-94 peaks. Grand Traverse pairs ride US-31, M-72, and peninsula approaches — freer mid-day off-season, extreme peak congestion on summer tourism windows.',
      },
      {
        title: 'Housing stock differences',
        detail: 'Detroit collars mix continuous multi-family. Grand Traverse mixes tourism multi-story, bay-edge SFH, and rural peninsula lots — more continuous seasonal tourism product.',
      },
      {
        title: 'Truck access, HOA & density',
        detail: 'Tourism streets tighten curb plans; peninsula approaches often need smaller trucks uncommon on pure suburban collar days.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail: 'Local Grand Traverse quotes often sit at secondary NW rates for driveway SFH — tourism peaks and long empty miles from lower MI still push premiums.',
      },
      {
        title: 'Role difference',
        detail: 'Grand Traverse is independent NW tourism/regional hub — not Detroit defaults renamed.',
      }
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Grand Traverse County different',
    intro: 'Tourism seasonality, bay last-mile, and NW empty miles — not a Detroit clone.',
    bullets: [
      {
        title: 'Tourism peaks rewrite demand and curb plans',
        detail: 'Summer weekends fill crews and streets differently than pure family Saturdays.',
      },
      {
        title: 'Peninsula / bay last-mile rewrites truck size',
        detail: 'Photo approaches; many streets reject full trailers.',
      },
      {
        title: 'Long empty miles from lower MI are first-class cost drivers',
        detail: 'Do not quote SE Michigan local rates for Traverse City deadhead.',
      },
      {
        title: 'Regional medical calendars also matter',
        detail: 'Healthcare-related moves fill mid-week windows outside pure tourism peaks.',
      },
      MI_TIER2_REG_BULLET,
    ],
  },
  zonesHeading: 'Grand Traverse zones: Traverse City core, bay/peninsula edges, growth townships & rural south',
  zonesIntro: 'Two to four sharp products under one NW tourism/regional label.',
  zones: [
    {
      id: 'traverse-city',
      name: 'Traverse City multi-story & tourism stock',
      shortName: 'Traverse City',
      neighborhoods: ["Traverse City","downtown edges"],
      housingTypes: 'Multi-story, multi-unit, SFH',
      challenges: ["Stairs","Tourism parking","Street width"],
      moverTips: 'Inventory stairs; book around peak tourism weekends when flexible.',
      cityKeywords: ["traverse city"],
    },
    {
      id: 'peninsula',
      name: 'Bay / peninsula edges',
      shortName: 'Peninsula edges',
      neighborhoods: ["Old Mission approaches","bay neighborhoods"],
      housingTypes: 'SFH, seasonal stock',
      challenges: ["Last-mile width","Seasonal roads"],
      moverTips: 'Photo approaches; plan smaller trucks near bay streets.',
      cityKeywords: ["grand traverse peninsula"],
    },
    {
      id: 'townships',
      name: 'Growth townships',
      shortName: 'Growth townships',
      neighborhoods: ["suburban townships"],
      housingTypes: 'SFH, townhomes',
      challenges: ["HOA packets","Empty miles"],
      moverTips: 'Collect COI early; price portal-to-portal toward the city.',
      cityKeywords: ["grand traverse townships"],
    },
    {
      id: 'rural-south',
      name: 'Rural south & larger lots',
      shortName: 'Rural south',
      neighborhoods: ["southern townships"],
      housingTypes: 'Larger lots, rural approaches',
      challenges: ["Empty miles","Soft shoulders"],
      moverTips: 'Photo last-mile; rain and snow weeks need flexibility.',
      cityKeywords: ["grand traverse south"],
    }
  ],
  specialized: [
    {
      id: 'tourism',
      title: 'Tourism seasonality logistics',
      intro: 'Summer peaks rewrite demand and curb plans.',
      bullets: ["Book early for peak weekends.","Confirm access rules for seasonal multi-unit stock."],
    },
    {
      id: 'peninsula-last-mile',
      title: 'Bay / peninsula last-mile access',
      intro: 'Street width rewrites truck size.',
      bullets: ["Photo approaches before final quote.","Shuttle conversations beat stuck trailers."],
    },
    {
      id: 'nw-empty-miles',
      title: 'NW Michigan empty-mile logistics',
      intro: 'Long freeflow from lower MI rewrites hourly math.',
      bullets: ["Price deadhead honestly.","Do not quote Detroit collar rates for peninsula lots."],
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
        intro: 'Grand Traverse families compare Traverse City Area Public Schools and township options — verify boundaries; do not assume lower-peninsula maps apply.',
        bullets: [
          {
            title: 'District-first shopping',
            detail:
              'Use Michigan DOE data and district maps; do not assume a city name equals one feeder pattern.',
          },
          {
            title: 'Capacity & calendars',
            detail:
              'Growth pockets, university, tourism, and manufacturing markets can tighten housing near school calendars.',
          },
        ],
      },
      {
        id: 'hospitals',
        title: 'Hospitals & healthcare',
        bullets: [
          {
            title: 'Acute-care anchors',
            detail: 'Munson Medical Center and regional systems serve NW Michigan; map peak freeflow on US-31/M-72 corridors and tourism congestion.',
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
    intro: 'Tourism peaks, bay last-mile, and long empty miles often matter more than raw miles.',
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
    intro: 'Summer tourism and winter access reshape demand more than pure SE Michigan office peaks alone.',
    items: [
      { title: 'Late spring – early fall', detail: 'Family closings and peak calendars fill Saturday crews first.' },
      { title: 'Winter access', detail: 'Ice and lake-effect windows rewrite morning plans on many collars.' },
    ],
  },
  resources: {
    title: 'Useful resources',
    intro:
      'Official links first; directory listings are independent. Verify Michigan motor carrier / household goods authority (MSP CVED) for in-state moves and FMCSA for interstate legs.',
    items: [
      { label: 'independent NW Michigan tourism/regional hub (vs Detroit / GR defaults) movers (parent contrast)', href: '/local-movers/michigan/kent' },
    ],
  },
});

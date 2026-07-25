import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizePaTier2Pack,
  PA_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/pennsylvania/pa-tier2-shared';

/**
 * butler — PA Tier 2 Wave 1
 */
export const butlerCountyTier2Intelligence: CountyIntelligencePack = finalizePaTier2Pack({
  countySlug: 'butler',
  hubTitle: 'Butler County Moving Intelligence Hub',
  eyebrow: 'Butler · Butler / Cranberry edge — Pittsburgh north',
  h1: 'Moving in Butler County: Butler City, Cranberry Edge & I-79 North Growth',
  heroOpener:
    'Butler County is Pittsburgh’s northern growth collar — Cranberry Township HOA and multi-family density, Butler city multi-story stock, Zelienople and Adams Township corridors, and I-79 / Turnpike freeflow that still peaks toward Allegheny. It is not North Hills elevators renamed: expect north-collar growth calendars, longer empty miles from city yards, and seat multi-unit that stages differently from Cranberry cul-de-sacs. This guide is for people moving in Butler as Pittsburgh north collar — not a recycled Allegheny pack.',
  heroCredibility:
    'Pittsburgh north collar · Cranberry growth · I-79 / Turnpike · PA PUC household goods · FMCSA when interstate · Curated listings',
  majorCorridors: 'I-79 · I-76 Turnpike · US-19 · PA-8 · PA-228 · PA-68',
  parentCompare: {
    parentLabel: 'Allegheny County',
    parentHref: '/local-movers/pennsylvania/allegheny',
    title: 'Compared with Allegheny County',
    intro:
      'Butler is Pittsburgh north-collar growth on I-79 / Turnpike — not Allegheny North Hills elevators alone and not pure rural northwest freeflow.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'Allegheny crews fight North Hills peaks and city approaches. Butler pairs ride I-79, PA-228, and the Turnpike — freer mid-day north of the city, still peak-heavy on Cranberry ↔ Allegheny commute windows.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'Allegheny North Hills mixes elevators and dense multi-family. Butler mixes Cranberry planned SFH, Butler city multi-story, and northern larger lots — more growth-collar HOA product, less continuous city density.',
      },
      {
        title: 'Truck access & density',
        detail:
          'Cranberry HOAs need packets and arterial timing; Butler seat cores need curb plans uncommon on pure cul-de-sac jobs.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local Butler quotes often track north-metro suburb rates for driveway SFH — Cranberry HOA soft costs and empty miles from city yards still push prices up.',
      },
      {
        title: 'Role difference',
        detail:
          'Butler is Pittsburgh north growth collar — not Allegheny North Hills product renamed.',
      }
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Butler County different',
    intro: 'Cranberry growth, I-79 freeflow, and seat multi-story — not interchangeable Allegheny boilerplate.',
    bullets: [
      {
        title: 'I-79 / Turnpike freeflow is still billable',
        detail:
          'Cranberry ↔ Allegheny pairs freer mid-day still peak hard. Ask portal-to-portal.',
      },
      {
        title: 'Cranberry HOA and multi-family are first-class product',
        detail:
          'Planned suburbs treat COI, elevators, and approved hours as standard survey inputs.',
      },
      {
        title: 'Butler city multi-story differs from growth-belt SFH',
        detail:
          'Seat stairs and curb plans need inventories different from PA-228 cul-de-sacs.',
      },
      {
        title: 'Northern empty miles price as distance work',
        detail:
          'Far townships fail when crews assume Cranberry day rates.',
      },
      PA_TIER2_REG_BULLET,
    ],
  },
  zonesHeading: 'Butler zones: Cranberry growth, Butler city seat, US-19 corridor & northern lots',
  zonesIntro: 'Two to four sharp products — growth HOAs, seat multi-story, corridor stock, and northern lots.',
  zones: [
    {
      id: 'cranberry-growth',
      name: 'Cranberry / south growth belt',
      shortName: 'Cranberry growth',
      neighborhoods: ["Cranberry Township","Seven Fields","Mars edges","Adams edges"],
      housingTypes: 'HOA SFH, townhomes, apartments',
      challenges: ["HOA packets","I-79 / PA-228 peaks","Lease clusters"],
      moverTips: 'Collect HOA COIs; build I-79 commute buffers.',
      cityKeywords: ["cranberry","seven fields","mars","adams"],
    },
    {
      id: 'butler-city',
      name: 'Butler city multi-story & older stock',
      shortName: 'Butler city',
      neighborhoods: ["Butler","downtown","city multi-family"],
      housingTypes: 'Multi-story, multi-unit, older SFH',
      challenges: ["Stairs","Street parking","Mixed curb access"],
      moverTips: 'Inventory stairs; plan temporary no-parking.',
      cityKeywords: ["butler"],
    },
    {
      id: 'us19-corridor',
      name: 'US-19 / Zelienople corridor',
      shortName: 'US-19 corridor',
      neighborhoods: ["Zelienople","Harmony edges","Evans City edges"],
      housingTypes: 'SFH, multi-family, mixed stock',
      challenges: ["Arterial timing","Mixed access"],
      moverTips: 'Prefer early starts; confirm driveway depth.',
      cityKeywords: ["zelienople","harmony","evans city"],
    },
    {
      id: 'north-lots',
      name: 'Northern larger lots & rural edges',
      shortName: 'North Butler',
      neighborhoods: ["Slippery Rock edges","Prospect edges","northern townships"],
      housingTypes: 'Larger lots, rural approaches',
      challenges: ["Empty miles","Soft shoulders","Winter ice"],
      moverTips: 'Photo approaches; winter mornings need flexibility.',
      cityKeywords: ["slippery rock","prospect","rural butler"],
    }
  ],
  specialized: [
    {
      id: 'cranberry-growth',
      title: 'Cranberry north-collar growth module',
      intro: 'Cranberry planned density is the north-collar product.',
      bullets: ["Collect HOA packets and elevator rules before the estimate is final.","Price I-79 portal-to-portal time to Allegheny honestly."],
    },
    {
      id: 'i79-turnpike-north',
      title: 'I-79 / Turnpike north freeflow',
      intro: 'North-metro pairs still peak hard toward Allegheny.',
      bullets: ["Build corridor buffers for morning and evening peaks.","Clarify Allegheny second addresses for drive-time assumptions."],
    },
    {
      id: 'butler-seat',
      title: 'Butler city multi-story access',
      intro: 'Seat stairs are a first-class cost driver.',
      bullets: ["Inventory floor counts before comparing hourly rates.","Temporary no-parking often beats long carries."],
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
        intro: 'Butler families compare Seneca Valley, Butler Area, Mars, Slippery Rock, and other districts — verify address boundaries.',
        bullets: [
          {
            title: 'District-first shopping',
            detail:
              'Use PDE data and district maps; do not assume a borough name equals one feeder pattern.',
          },
          {
            title: 'Capacity & calendars',
            detail:
              'Growth pockets and university towns can tighten housing near school and term calendars.',
          },
        ],
      },
      {
        id: 'hospitals',
        title: 'Hospitals & healthcare',
        bullets: [
          {
            title: 'Acute-care anchors',
            detail: 'Butler Memorial / Independence Health and Allegheny specialty spillover serve the county; map peak I-79 times for ER access.',
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
    intro: 'Cranberry HOA soft costs, I-79 freeflow, and seat multi-story access often matter more than raw miles.',
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
    intro: 'School years, growth-lease calendars, and winter ice reshape demand by pocket.',
    items: [
      {
        title: 'Late spring – early fall',
        detail: 'Family closings and peak calendars fill Saturday crews first.',
      },
      {
        title: 'Winter access',
        detail: 'Hills, rural edges, and mountain approaches need ice-aware morning plans.',
      },
    ],
  },
  resources: {
    title: 'Useful resources',
    intro:
      'Official links first; directory listings are independent. Verify Pennsylvania PUC household-goods authority for in-state Pennsylvania moves and FMCSA for interstate legs.',
    items: [
      {
        label: 'Allegheny County movers (parent contrast)',
        href: '/local-movers/pennsylvania/allegheny',
      },
      
    ],
  },
});

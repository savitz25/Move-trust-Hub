import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeNyTier2Pack,
  NY_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/new-york/ny-tier2-shared';

/**
 * oneida — NY Tier 2 Wave 1
 */
export const oneidaCountyTier2Intelligence: CountyIntelligencePack = finalizeNyTier2Pack({
  countySlug: 'oneida',
  hubTitle: 'Oneida County Moving Intelligence Hub',
  eyebrow: 'Oneida · Utica / Rome · Mohawk Valley',
  h1: 'Moving in Oneida County: Utica, Rome & Mohawk Valley I-90 Corridor',
  heroOpener:
    'Oneida County is Mohawk Valley mid-state — Utica multi-story and multi-family stock, Rome corridors, New Hartford suburban belts, and I-90 freeflow that still peaks toward Syracuse. It is not Onondaga County Syracuse core renamed: expect independent mid-state city density, longer empty miles to rural edges, and freeflow different from Syracuse university calendars alone. This guide is for people moving in Oneida as a Mohawk Valley market — not a recycled Syracuse Tier 1 script.',
  heroCredibility:
    'Mohawk Valley · Utica / Rome · I-90 corridor · NYSDOT household goods · FMCSA when interstate · Curated listings',
  majorCorridors: 'I-90 · NY-5 · NY-8 · NY-12 · NY-49 · NY-69',
  parentCompare: {
    parentLabel: 'Onondaga County',
    parentHref: '/local-movers/new-york/onondaga',
    title: 'Compared with Onondaga County',
    intro:
      'Oneida is Mohawk Valley mid-state product — Utica/Rome density and I-90 freeflow — not Syracuse university/core calendars alone.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'Onondaga crews fight Syracuse core peaks. Oneida pairs ride I-90, NY-5, NY-8, and NY-12 — freer mid-day mid-state, still peak-heavy on Utica arterials and Thruway-oriented legs.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'Onondaga mixes university multi-family and suburban belts. Oneida mixes Utica multi-story, Rome corridors, and New Hartford SFH — independent mid-state density, not a Syracuse rename.',
      },
      {
        title: 'Truck access & density',
        detail:
          'Utica multi-story needs stair inventories; rural edges add empty miles uncommon on inner Syracuse jobs.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local Oneida quotes often sit at or below dense Syracuse urban rates for driveway SFH — multi-story access and long empty-mile edges still push prices up.',
      },
      {
        title: 'Role difference',
        detail:
          'Oneida is Mohawk Valley mid-state — not Onondaga Syracuse core product renamed.',
      }
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Oneida County different',
    intro: 'Mid-state city density, I-90 freeflow, and rural edges — not interchangeable Syracuse boilerplate.',
    bullets: [
      {
        title: 'Utica multi-story is first-class product',
        detail:
          'Stairs and street parking define more jobs than pure suburban playbooks.',
      },
      {
        title: 'I-90 freeflow is still billable',
        detail:
          'Oneida ↔ Onondaga pairs freer mid-day still peak hard. Ask portal-to-portal.',
      },
      {
        title: 'Rural edges add empty miles',
        detail:
          'Far towns price differently from Utica/New Hartford rates.',
      },
      {
        title: 'Winter upstate ice is first-class',
        detail:
          'Morning flexibility matters more than map freeflow after freeze events.',
      },
      NY_TIER2_REG_BULLET,
    ],
  },
  zonesHeading: 'Oneida zones: Utica core, New Hartford belt, Rome corridor & rural edges',
  zonesIntro: 'Two to four sharp products — city, suburbs, Rome corridor, and rural edges.',
  zones: [
    {
      id: 'utica-core',
      name: 'Utica city core',
      shortName: 'Utica',
      neighborhoods: ["Utica","downtown","east/west Utica edges"],
      housingTypes: 'Multi-story, multi-unit, older SFH',
      challenges: ["Stairs","Street parking","Older stock"],
      moverTips: 'Inventory stairs; plan temporary no-parking.',
      cityKeywords: ["utica"],
    },
    {
      id: 'new-hartford',
      name: 'New Hartford suburban belt',
      shortName: 'New Hartford',
      neighborhoods: ["New Hartford","Whitesboro edges","Yorkville edges"],
      housingTypes: 'Suburban SFH, townhomes',
      challenges: ["HOA packets","Arterial timing"],
      moverTips: 'Collect HOA docs; build arterial buffers.',
      cityKeywords: ["new hartford","whitesboro","yorkville"],
    },
    {
      id: 'rome-corridor',
      name: 'Rome corridor',
      shortName: 'Rome',
      neighborhoods: ["Rome","NY-49 edges"],
      housingTypes: 'SFH, multi-story older stock',
      challenges: ["Mixed access","Empty miles to Utica"],
      moverTips: 'Price Rome ↔ Utica freeflow honestly.',
      cityKeywords: ["rome"],
    },
    {
      id: 'rural-edges',
      name: 'Rural edges & larger lots',
      shortName: 'Rural Oneida',
      neighborhoods: ["Boonville","Camden","Vernon edges"],
      housingTypes: 'Larger lots, rural approaches',
      challenges: ["Empty miles","Winter ice","Soft shoulders"],
      moverTips: 'Photo approaches; winter mornings need flexibility.',
      cityKeywords: ["boonville","camden","vernon"],
    }
  ],
  specialized: [
    {
      id: 'utica-stairs',
      title: 'Utica multi-story access',
      intro: 'City stairs are a first-class cost driver.',
      bullets: ["Inventory floor counts before comparing hourly rates.","Temporary no-parking often beats long carries."],
    },
    {
      id: 'i90-midstate',
      title: 'I-90 mid-state freeflow',
      intro: 'Thruway-oriented pairs still peak hard.',
      bullets: ["Price portal-to-portal time honestly for Oneida ↔ Onondaga legs.","Clarify Syracuse addresses for drive-time assumptions."],
    },
    {
      id: 'winter-upstate',
      title: 'Upstate winter access',
      intro: 'Ice rewrites curb plans across the Mohawk Valley.',
      bullets: ["Morning flexibility matters after freeze events.","Soft shoulders after thaw can block heavy trucks."],
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
        intro: 'Oneida families compare Utica, New Hartford, Rome, and other districts — verify boundaries.',
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
            detail: 'Mohawk Valley Health System and related campuses serve the region; map peak freeflow for ER access.',
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
    intro: 'City stairs, empty-mile edges, and Thruway freeflow often matter more than raw miles.',
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
    intro: 'School years, lease ends, and winter ice reshape demand by pocket.',
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

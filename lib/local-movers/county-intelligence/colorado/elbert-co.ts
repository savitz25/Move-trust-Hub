import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeCoTier2Pack,
  CO_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/colorado/co-tier2-shared';

/**
 * elbert â€” CO Tier 2 Wave 1
 */
export const elbertCountyCoTier2Intelligence: CountyIntelligencePack = finalizeCoTier2Pack({
  countySlug: 'elbert',
  hubTitle: 'Elbert County Moving Intelligence Hub',
  eyebrow: 'Elbert · Elizabeth / Kiowa — outer SE Denver plains collar',
  h1: 'Moving in Elbert County: Elizabeth, Kiowa & Outer Plains Collar Access',
  heroOpener:
    'Elbert County is outer southeast Denver plains collar product — Elizabeth multi-family and growth edges, Kiowa seat stock, acreage and exurban lots, and freeflow on CO-86 / E-470 approaches that is not Douglas County Highlands Ranch product with different labels. Expect longer empty miles, soft-shoulder last-mile, and lower density under one county. This guide is for people moving in Elbert as outer plains collar — not a Douglas rename.',
  heroCredibility:
    'Outer SE plains collar · Elizabeth / Kiowa · Acreage exurban · CO PUC HHG · FMCSA when interstate · Curated listings',
  majorCorridors: 'CO-86 · CO-86/CO-83 links · E-470 approaches · Kiowa–Bennett corridors',
  lastReviewed: '2026-07-25',
  parentCompare: {
    parentLabel: 'Douglas County',
    parentHref: '/local-movers/colorado/douglas',
    title: 'Compared with Douglas County',
    intro:
      'Elbert is outer SE plains acreage/exurban collar — not Douglas continuous Highlands Ranch HOA density alone.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'Douglas crews fight I-25 and C-470 peaks into Castle Rock/HR. Elbert pairs ride CO-86 and E-470 approaches — freer mid-day further east, still peak-heavy toward metro portals and Elizabeth commute windows.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'Douglas mixes master-plan HOAs and multi-family. Elbert mixes Elizabeth multi-unit, Kiowa seat stock, and acreage lots — more continuous exurban product, less continuous planned-suburb density.',
      },
      {
        title: 'Truck access & density',
        detail:
          'Acreage driveways and soft shoulders dominate; HOA packets appear on growth edges; long empty miles from metro yards are first-class.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local Elbert quotes often track outer-collar secondary rates for driveway SFH — empty miles from Douglas/Arapahoe staging still push prices up vs map miles alone.',
      },
      {
        title: 'Role difference',
        detail:
          'Elbert is outer SE plains collar — not Douglas product renamed.',
      }
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Elbert County different',
    intro: 'Acreage last-mile, CO-86 freeflow, and empty miles from metro yards — not interchangeable Highlands Ranch boilerplate.',
    bullets: [
      {
        title: 'Empty miles from Douglas/Arapahoe yards are real',
        detail:
          'Even “local” Elbert pairs can price as distance work for metro-based crews.',
      },
      {
        title: 'Acreage approaches rewrite truck size',
        detail:
          'Long drives and soft shoulders reject pure HOA cul-de-sac assumptions.',
      },
      {
        title: 'Elizabeth multi-family differs from pure acreage lots',
        detail:
          'Elevators and curb plans need inventories different from rural driveways.',
      },
      {
        title: 'CO-86 freeflow is still billable',
        detail:
          'Outer-collar pairs freer mid-day still peak hard. Ask portal-to-portal.',
      },
      CO_TIER2_REG_BULLET,
    ],
  },
  zonesHeading: 'Elbert zones: Elizabeth growth, Kiowa seat, acreage belts & eastern rural lots',
  zonesIntro: 'Two to four sharp products — growth multi-family, seat stock, acreage belts, and rural lots.',
  zones: [
    {
      id: 'elizabeth',
      name: 'Elizabeth multi-family & growth edges',
      shortName: 'Elizabeth',
      neighborhoods: ["Elizabeth","growth multi-family","HOA edges"],
      housingTypes: 'Multi-family, HOA SFH, townhomes',
      challenges: ["HOA packets","CO-86 freeflow","Lease clusters"],
      moverTips: 'Collect HOA COIs; build metro-commute buffers.',
      cityKeywords: ["elizabeth"],
    },
    {
      id: 'kiowa',
      name: 'Kiowa seat multi-story & older stock',
      shortName: 'Kiowa',
      neighborhoods: ["Kiowa","seat multi-family"],
      housingTypes: 'Multi-story, multi-unit, older SFH',
      challenges: ["Stairs","Street parking"],
      moverTips: 'Inventory stairs; plan temporary no-parking.',
      cityKeywords: ["kiowa"],
    },
    {
      id: 'acreage',
      name: 'Acreage / exurban belts',
      shortName: 'Acreage belts',
      neighborhoods: ["acreage lots","exurban SFH"],
      housingTypes: 'Larger lots, long driveways',
      challenges: ["Long carries","Soft shoulders","Empty miles"],
      moverTips: 'Photo approaches; confirm truck turnaround.',
      cityKeywords: ["elbert acreage"],
    },
    {
      id: 'east-rural',
      name: 'Eastern rural plains lots',
      shortName: 'East rural',
      neighborhoods: ["eastern tracts","rural approaches"],
      housingTypes: 'Larger lots, rural approaches',
      challenges: ["Long empty miles","Soft shoulders","Winter ice"],
      moverTips: 'Survey approaches; winter mornings need flexibility.',
      cityKeywords: ["east elbert"],
    }
  ],
  specialized: [
    {
      id: 'outer-collar',
      title: 'Outer SE plains collar freeflow',
      intro: 'Outer pairs still peak hard toward Douglas/Arapahoe.',
      bullets: ["Price portal-to-portal honestly.","Clarify Douglas or Arapahoe second addresses early."],
    },
    {
      id: 'acreage-last',
      title: 'Acreage last-mile module',
      intro: 'Long drives and soft shoulders rewrite HOA day rates.',
      bullets: ["Photo the final approach before promising a 26-foot truck.","Do not recycle Highlands Ranch cul-de-sac assumptions."],
    },
    {
      id: 'elizabeth-growth',
      title: 'Elizabeth growth multi-family',
      intro: 'Elevators and HOA packets are first-class cost drivers.',
      bullets: ["Collect COI and elevator rules early.","Lease clusters stack around school calendars."],
    }
  ],
  relocation: {
    title: 'Schools & hospitals for relocators',
    intro:
      'Compressed secondary-market notes Ã¢â‚¬â€ primary districts and acute-care access that affect move-in.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & education',
        intro: 'Elbert families compare Elizabeth C-1, Kiowa C-2, and related district feeders — verify address boundaries; do not assume Douglas maps apply.',
        bullets: [
          {
            title: 'District-first shopping',
            detail:
              'Use CDE data and district maps; do not assume a city name equals one feeder pattern.',
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
            detail: 'Parker/Arapahoe specialty spillover and regional clinics serve the county; map peak CO-86 / E-470 times for ER access.',
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
    intro: 'Empty miles, acreage last-mile, and HOA soft costs often matter more than raw miles.',
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
      { label: 'Studio / 1-BR', value: '$450Ã¢â‚¬â€œ$1,200+' },
      { label: '3Ã¢â‚¬â€œ4 BR home', value: '$1,600Ã¢â‚¬â€œ$4,200+', note: 'Higher with access friction' },
      { label: '2-person crew', value: '$115Ã¢â‚¬â€œ$185+/hr' },
    ],
  },
  seasonal: {
    title: 'Seasonal & calendar notes',
    intro: 'School years, summer family closings, and winter ice reshape demand by pocket.',
    items: [
      {
        title: 'Late spring Ã¢â‚¬â€œ early fall',
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
      'Official links first; directory listings are independent. Verify Colorado PUC household goods (HHG) permit for in-state Colorado moves and FMCSA for interstate legs.',
    items: [
      {
        label: 'Douglas County movers (parent contrast)',
        href: '/local-movers/colorado/douglas',
      },
      {
        label: 'Arapahoe County movers',
        href: '/local-movers/colorado/arapahoe',
      },
    ],
  },
});

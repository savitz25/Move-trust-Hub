import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeOhTier2Pack,
  OH_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/ohio/oh-tier2-shared';

/** lorain — OH Tier 2 Wave 1 */
export const lorainCountyOhTier2Intelligence: CountyIntelligencePack = finalizeOhTier2Pack({
  countySlug: 'lorain',
  hubTitle: 'Lorain County Moving Intelligence Hub',
  eyebrow: 'Lorain · Lorain / Elyria / Avon · Cleveland west · vs Cuyahoga',
  h1: 'Moving in Lorain County: Avon, Elyria & I-90 / I-480 West Lakeshore Collar',
  heroOpener: 'Lorain County is Cleveland’s west lakeshore and inland collar — Avon and Amherst growth, Elyria multi-story stock, Lorain city product, I-90 / I-480 freeflow, and product that is not Lake County’s east Mentor pattern and not Medina’s south inland growth alone. Expect industrial-edge residential, HOA west-shore villages, and lake-effect winter access. This guide is for people moving in Lorain as Cleveland-west collar product — not a Cleveland rename.',
  heroCredibility: 'West lakeshore + I-90 edge · Avon / Elyria · PUCO household goods · FMCSA when interstate · Curated listings',
  majorCorridors: 'I-90 · SR-2 · SR-57 · US-20 · SR-58 · Midway Mall corridors',
  lastReviewed: '2026-07-24',
  parentCompare: {
    parentLabel: 'Cuyahoga County',
    parentHref: '/local-movers/ohio/cuyahoga',
    title: 'Compared with Cuyahoga County',
    intro: 'Lorain is Avon / Elyria west-lakeshore and inland collar — not Cleveland downtown multi-unit density and not Lake east-shore Mentor alone.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail: 'Cuyahoga crews fight downtown freeflow. Lorain pairs ride I-90, SR-2, and west corridors — freer mid-day west of the core, still peak-heavy on commute and industrial-shift windows.',
      },
      {
        title: 'Housing stock differences',
        detail: 'Lake skews continuous east-shore suburban product. Lorain mixes Avon HOA growth, Elyria multi-story, and Lorain city industrial-edge stock — more continuous west mix, less continuous pure east-shore retail corridors.',
      },
      {
        title: 'Truck access, HOA & density',
        detail: 'City multi-story needs stair inventories; growth HOAs need COI packets; industrial freeflow timing rewrites some residential pairs.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail: 'Local Lorain quotes often sit at west-collar rates for driveway SFH — multi-story access and empty miles into Cleveland still push premiums.',
      },
      {
        title: 'Role difference',
        detail: 'Lorain is Cleveland-west lakeshore/inland collar — not Cuyahoga core renamed and not Lake or Medina product.',
      }
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Lorain County different',
    intro: 'I-90 west freeflow, Avon growth, and Elyria multi-story — not a Lake or Medina clone.',
    bullets: [
      {
        title: 'I-90 / I-480 freeflow is billable',
        detail: 'Avon ↔ downtown pairs freer mid-day still peak hard. Ask portal-to-portal.',
      },
      {
        title: 'Distinct from Lake east shore',
        detail: 'West industrial-edge mix is not Mentor corridor product alone.',
      },
      {
        title: 'Distinct from Medina south inland',
        detail: 'Lakeshore west is not I-71 south Brunswick product.',
      },
      {
        title: 'Lake-effect winter is operational',
        detail: 'Build ice-aware buffers into morning plans.',
      },
      OH_TIER2_REG_BULLET,
    ],
  },
  zonesHeading: 'Lorain zones: Avon growth, Elyria multi-story, Lorain city & Amherst edges',
  zonesIntro: 'Two to four sharp products under one west-collar label.',
  zones: [
    {
      id: 'avon',
      name: 'Avon / Amherst growth villages',
      shortName: 'Avon growth',
      neighborhoods: ["Avon","Amherst","growth villages"],
      housingTypes: 'Planned SFH, townhomes',
      challenges: ["HOA packets","I-90 peaks"],
      moverTips: 'Collect COI early; price portal-to-portal toward Cleveland.',
      cityKeywords: ["avon","amherst"],
    },
    {
      id: 'elyria',
      name: 'Elyria multi-story & seat stock',
      shortName: 'Elyria',
      neighborhoods: ["Elyria","city neighborhoods"],
      housingTypes: 'Multi-story, multi-unit, older SFH',
      challenges: ["Stairs","Street parking"],
      moverTips: 'Inventory stairs; plan temporary no-parking.',
      cityKeywords: ["elyria"],
    },
    {
      id: 'lorain-city',
      name: 'Lorain city industrial-edge',
      shortName: 'Lorain city',
      neighborhoods: ["Lorain","industrial-edge neighborhoods"],
      housingTypes: 'Multi-story, SFH, mixed stock',
      challenges: ["Street width","Shift timing"],
      moverTips: 'Avoid industrial-shift peaks when possible.',
      cityKeywords: ["lorain"],
    },
    {
      id: 'inland',
      name: 'Inland edges & larger lots',
      shortName: 'Inland edges',
      neighborhoods: ["southern towns","larger lots"],
      housingTypes: 'Larger lots, rural approaches',
      challenges: ["Empty miles","Winter ice"],
      moverTips: 'Photo last-mile; allow winter buffers.',
      cityKeywords: ["lorain inland"],
    }
  ],
  specialized: [
    {
      id: 'i90-west',
      title: 'I-90 west-collar freeflow',
      intro: 'Commute peaks rewrite short-looking pairs.',
      bullets: ["Price portal-to-portal honestly.","Do not quote Cuyahoga elevator rates for Avon driveways."],
    },
    {
      id: 'elyria-city',
      title: 'Elyria multi-story access',
      intro: 'City stairs are first-class cost drivers.',
      bullets: ["Inventory floor counts.","Temporary no-parking often beats long carries."],
    },
    {
      id: 'vs-collars',
      title: 'Distinct from Lake and Medina',
      intro: 'West shore/inland differs from east shore and south inland.',
      bullets: ["Do not recycle Mentor-only or Brunswick-only playbooks.","I-90 west mix is the differentiator."],
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
        intro: 'Lorain families compare Avon, Elyria, Lorain City, Amherst, and other districts — verify boundaries; do not assume Cleveland Metropolitan maps apply.',
        bullets: [
          {
            title: 'District-first shopping',
            detail:
              'Use Ohio DOE data and district maps; do not assume a city name equals one feeder pattern.',
          },
          {
            title: 'Capacity & calendars',
            detail:
              'Growth pockets, university, and military markets can tighten housing near school calendars.',
          },
        ],
      },
      {
        id: 'hospitals',
        title: 'Hospitals & healthcare',
        bullets: [
          {
            title: 'Acute-care anchors',
            detail: 'Mercy Health and Cleveland Clinic regional campuses serve the west collar; map peak freeflow on I-90 corridors.',
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
    intro: 'Empty miles, multi-story access, and I-90 peaks often matter more than raw miles.',
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
    intro: 'Lake-effect winter and school years reshape demand more than downtown event calendars alone.',
    items: [
      { title: 'Late spring – early fall', detail: 'Family closings and peak calendars fill Saturday crews first.' },
      { title: 'Winter access', detail: 'Lake-effect and inland ice rewrite morning plans on many collars.' },
    ],
  },
  resources: {
    title: 'Useful resources',
    intro:
      'Official links first; directory listings are independent. Verify PUCO household-goods authority for in-state moves and FMCSA for interstate legs.',
    items: [
      { label: 'Cuyahoga County movers (parent contrast)', href: '/local-movers/ohio/cuyahoga' },
    ],
  },
});

import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizePaTier2Pack,
  PA_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/pennsylvania/pa-tier2-shared';

/**
 * cumberland — PA Tier 2 Wave 1
 */
export const cumberlandCountyTier2Intelligence: CountyIntelligencePack = finalizePaTier2Pack({
  countySlug: 'cumberland',
  hubTitle: 'Cumberland County Moving Intelligence Hub',
  eyebrow: 'Cumberland · Carlisle / Mechanicsburg — Harrisburg west collar',
  h1: 'Moving in Cumberland County: Carlisle, Mechanicsburg & West-Shore I-81 Growth',
  heroOpener:
    'Cumberland County is Harrisburg’s west-shore growth collar — Carlisle seat multi-story and college-adjacent stock, Mechanicsburg and Hampden suburban belts, Camp Hill river-edge density, and I-81 / Turnpike freeflow that still peaks toward Dauphin. It is not Dauphin east-bank capital core renamed: expect west-shore HOA growth, military and college calendars, and longer empty miles to western lots. This guide is for people moving in Cumberland as Harrisburg west collar — not a recycled Dauphin Tier 1 script.',
  heroCredibility:
    'Harrisburg west collar · West-shore growth · I-81 / Turnpike · PA PUC household goods · FMCSA when interstate · Curated listings',
  majorCorridors: 'I-81 · I-76 Turnpike · US-11 · PA-581 · PA-114 · PA-34',
  parentCompare: {
    parentLabel: 'Dauphin County',
    parentHref: '/local-movers/pennsylvania/dauphin',
    title: 'Compared with Dauphin County',
    intro:
      'Cumberland is Harrisburg west-shore growth product on I-81 / Turnpike — not Dauphin capital-core multi-story alone and not pure rural mid-state freeflow.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'Dauphin crews fight capital arterials and east-shore peaks. Cumberland pairs ride I-81, PA-581, US-11, and the Turnpike — freer mid-day west of the river, still peak-heavy on west-shore commute windows into Harrisburg.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'Dauphin mixes capital multi-story and east-shore suburbs. Cumberland mixes Carlisle multi-story, Mechanicsburg HOA growth, and western larger lots — more planned-suburb product, less continuous capital-core density.',
      },
      {
        title: 'Truck access & density',
        detail:
          'West-shore HOAs need packets and approved hours; Carlisle older blocks need curb plans uncommon on pure driveway SFH jobs.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local Cumberland quotes often track capital-suburb rates for driveway SFH — HOA soft costs and I-81 peaks still push prices up.',
      },
      {
        title: 'Role difference',
        detail:
          'Cumberland is Harrisburg west-shore growth collar — not Dauphin capital/education core renamed.',
      }
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Cumberland County different',
    intro: 'West-shore growth, I-81 freeflow, and HOA soft costs — not interchangeable Dauphin boilerplate.',
    bullets: [
      {
        title: 'I-81 / Turnpike freeflow is still billable',
        detail:
          'West-shore ↔ Dauphin pairs freer mid-day still peak hard. Ask portal-to-portal.',
      },
      {
        title: 'Mechanicsburg / Hampden HOA is first-class product',
        detail:
          'Planned suburbs treat COI and approved hours as standard survey inputs.',
      },
      {
        title: 'Carlisle multi-story and college calendars matter',
        detail:
          'Seat density and Dickinson-adjacent turnover need stair inventories and term-aware booking.',
      },
      {
        title: 'MD / interstate adjacency creates FMCSA legs',
        detail:
          'Out-of-state addresses flip jobs to interstate authority even when the Cumberland side feels local.',
      },
      PA_TIER2_REG_BULLET,
    ],
  },
  zonesHeading: 'Cumberland zones: Carlisle seat, Mechanicsburg growth, Camp Hill river edge & west lots',
  zonesIntro: 'Two to four sharp products — seat core, growth suburbs, river edge, and western lots price differently.',
  zones: [
    {
      id: 'carlisle-seat',
      name: 'Carlisle seat multi-story & college edges',
      shortName: 'Carlisle',
      neighborhoods: ["Carlisle","downtown","college edges"],
      housingTypes: 'Multi-story, multi-unit, older SFH',
      challenges: ["Stairs","Street parking","Term calendars"],
      moverTips: 'Inventory stairs; plan temporary no-parking; avoid peak term weekends.',
      cityKeywords: ["carlisle"],
    },
    {
      id: 'mechanicsburg-growth',
      name: 'Mechanicsburg / Hampden growth belt',
      shortName: 'Mechanicsburg growth',
      neighborhoods: ["Mechanicsburg","Hampden","Silver Spring edges"],
      housingTypes: 'HOA SFH, townhomes, apartments',
      challenges: ["HOA packets","I-81 peaks","Lease clusters"],
      moverTips: 'Collect HOA COIs; build buffer for I-81 commute peaks.',
      cityKeywords: ["mechanicsburg","hampden","silver spring"],
    },
    {
      id: 'camp-hill-edge',
      name: 'Camp Hill / east river edge',
      shortName: 'Camp Hill edge',
      neighborhoods: ["Camp Hill","Lemoyne edges","Wormleysburg edges"],
      housingTypes: 'SFH, multi-family, some multi-story',
      challenges: ["River-bridge freeflow","Tight older streets"],
      moverTips: 'Build bridge-peak buffers; measure older block access.',
      cityKeywords: ["camp hill","lemoyne","wormleysburg"],
    },
    {
      id: 'west-lots',
      name: 'Western larger lots & rural edges',
      shortName: 'West Cumberland',
      neighborhoods: ["Shippensburg edges","Newville edges","western townships"],
      housingTypes: 'Larger lots, rural approaches',
      challenges: ["Empty miles","Soft shoulders","Winter ice"],
      moverTips: 'Photo approaches; winter mornings need flexibility.',
      cityKeywords: ["shippensburg","newville","rural cumberland"],
    }
  ],
  specialized: [
    {
      id: 'west-shore-growth',
      title: 'West-shore HOA growth module',
      intro: 'Mechanicsburg–Hampden planned suburbs dominate west-collar product.',
      bullets: ["Collect HOA packets before the estimate is final.","Price I-81 portal-to-portal time to Dauphin honestly."],
    },
    {
      id: 'i81-turnpike',
      title: 'I-81 / Turnpike freeflow',
      intro: 'Capital-oriented pairs still peak hard.',
      bullets: ["Clarify Dauphin second addresses for drive-time assumptions.","Turnpike and I-81 peaks rewrite short-looking locals."],
    },
    {
      id: 'carlisle-access',
      title: 'Carlisle multi-story & college access',
      intro: 'Seat density and term calendars are first-class cost drivers.',
      bullets: ["Inventory stairs and street width downtown.","Book early around college move-in/out weekends."],
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
        intro: 'Cumberland families compare Carlisle, Cumberland Valley, Mechanicsburg, Camp Hill, and other districts — verify address boundaries.',
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
            detail: 'UPMC Carlisle, Penn State Health west-shore campuses, and Harrisburg specialty spillover serve the county; map peak I-81 / bridge times.',
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
    intro: 'HOA soft costs, I-81 freeflow, and seat multi-story access often matter more than raw miles.',
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
    intro: 'School years, college terms, and winter ice reshape demand more than pure capital-session calendars.',
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
        label: 'Dauphin County movers (parent contrast)',
        href: '/local-movers/pennsylvania/dauphin',
      },
      
    ],
  },
});

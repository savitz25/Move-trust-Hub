import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizePaTier2Pack,
  PA_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/pennsylvania/pa-tier2-shared';

/**
 * centre — PA Tier 2 Wave 1
 */
export const centreCountyTier2Intelligence: CountyIntelligencePack = finalizePaTier2Pack({
  countySlug: 'centre',
  hubTitle: 'Centre County Moving Intelligence Hub',
  eyebrow: 'Centre · State College — Penn State independent',
  h1: 'Moving in Centre County: State College, Penn State Cycles & I-80 / US-322 Access',
  heroOpener:
    'Centre County is an independent central PA university market — State College multi-family and student density, College Township and Patton growth belts, Bellefonte seat edges, and I-80 / US-322 freeflow that does not answer to Harrisburg or Philly scripts. It is not a capital-suburb rename: expect term-driven move spikes, apartment COI packets, and longer empty miles to rural ridges under one county label. This guide is for people moving in Centre as a Penn State independent market — not recycled Dauphin mid-state packs.',
  heroCredibility:
    'Penn State independent · University move cycles · I-80 / US-322 · PA PUC household goods · FMCSA when interstate · Curated listings',
  majorCorridors: 'I-80 · US-322 · PA-26 · PA-45 · PA-144 · PA-150',
  parentCompare: {
    parentLabel: 'independent central PA university (nearest mid-state hub: Dauphin)',
    parentHref: '/local-movers/pennsylvania/dauphin',
    title: 'Compared with independent central PA university (nearest mid-state hub: Dauphin)',
    intro:
      'Centre is a central PA university independent market — not Harrisburg capital freeflow and not SEPA density alone.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'Dauphin crews fight capital arterials and I-81 peaks. Centre pairs ride I-80, US-322, and PA-26 — freer mid-day central PA freeflow, still peak-heavy on State College arterials and term move weekends. Portal-to-portal time is real; it is not a Harrisburg day.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'Dauphin mixes capital multi-story and suburbs. Centre mixes student multi-family, State College SFH, and rural ridges — more university lease product, less continuous capital-core density.',
      },
      {
        title: 'Truck access & density',
        detail:
          'Apartment elevators and COI packets dominate near campus; ridge lots trade that for driveway length and winter ice.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local Centre quotes often sit at secondary mid-state rates for driveway SFH — term peaks and multi-family access still push prices up.',
      },
      {
        title: 'Role difference',
        detail:
          'Centre is Penn State independent university market — not Dauphin capital product renamed.',
      }
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Centre County different',
    intro: 'University calendars, multi-family packets, and I-80 freeflow — not interchangeable capital boilerplate.',
    bullets: [
      {
        title: 'Penn State term calendars drive demand spikes',
        detail:
          'Move-in/out weekends fill local crews first — not only family Saturdays.',
      },
      {
        title: 'Student multi-family is first-class product',
        detail:
          'Elevators, COIs, and short-notice locals need inventories different from Bellefonte lots.',
      },
      {
        title: 'I-80 / US-322 freeflow is still billable',
        detail:
          'Cross-ridge pairs freer mid-day still peak hard. Ask portal-to-portal.',
      },
      {
        title: 'Rural ridges add empty miles and winter risk',
        detail:
          'Far townships reject State College day-rate assumptions after ice events.',
      },
      PA_TIER2_REG_BULLET,
    ],
  },
  zonesHeading: 'Centre zones: State College core, campus multi-family, Bellefonte seat & rural ridges',
  zonesIntro: 'Two to four sharp products — downtown core, student multi-family, seat edge, and rural ridges.',
  zones: [
    {
      id: 'state-college-core',
      name: 'State College core & downtown',
      shortName: 'State College',
      neighborhoods: ["State College","downtown","College Heights edges"],
      housingTypes: 'Multi-family, multi-story, SFH',
      challenges: ["Street parking","Term peaks","Tight staging"],
      moverTips: 'Avoid peak move-in weekends; plan temporary no-parking.',
      cityKeywords: ["state college"],
    },
    {
      id: 'campus-multifamily',
      name: 'Campus multi-family & growth belts',
      shortName: 'Campus MF',
      neighborhoods: ["College Township","Patton Township","Harris Township edges"],
      housingTypes: 'Apartments, townhomes, student multi-family',
      challenges: ["Elevators","COI packets","Lease-end clusters"],
      moverTips: 'Collect management packets; confirm elevator windows early.',
      cityKeywords: ["college township","patton","harris township"],
    },
    {
      id: 'bellefonte-seat',
      name: 'Bellefonte seat & corridor edges',
      shortName: 'Bellefonte',
      neighborhoods: ["Bellefonte","Pleasant Gap edges","seat multi-family"],
      housingTypes: 'SFH, multi-story older stock',
      challenges: ["Mixed access","US-322 freeflow"],
      moverTips: 'Confirm driveway and street width on older blocks.',
      cityKeywords: ["bellefonte","pleasant gap"],
    },
    {
      id: 'rural-ridges',
      name: 'Rural ridges & larger lots',
      shortName: 'Rural Centre',
      neighborhoods: ["Philipsburg edges","Milesburg edges","northern ridges"],
      housingTypes: 'Larger lots, rural approaches',
      challenges: ["Empty miles","Winter ice","Soft shoulders"],
      moverTips: 'Photo approaches; winter mornings need flexibility.',
      cityKeywords: ["philipsburg","milesburg","rural centre"],
    }
  ],
  specialized: [
    {
      id: 'penn-state-cycles',
      title: 'Penn State university move cycles',
      intro: 'Term start/end weekends dominate local demand.',
      bullets: ["Book early around official move-in/out windows.","Expect short-notice apartment demand spikes near campus."],
    },
    {
      id: 'campus-multifamily',
      title: 'Campus multi-family & COI soft costs',
      intro: 'Elevators and management packets are standard survey inputs.',
      bullets: ["Collect COI and elevator overtime rules before the estimate is final.","Line-item packing for dense student inventories when needed."],
    },
    {
      id: 'i80-us322',
      title: 'I-80 / US-322 freeflow',
      intro: 'Cross-ridge pairs still peak hard.',
      bullets: ["Price portal-to-portal time honestly for long county pairs.","Winter ice on ridges rewrites morning curb plans."],
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
        intro: 'Centre families compare State College Area, Bellefonte, Bald Eagle, and other districts — verify address boundaries.',
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
            detail: 'Mount Nittany Medical Center and related campuses anchor acute care; map peak freeflow on term weekends and I-80 windows.',
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
    intro: 'Term peaks, multi-family elevators, and ridge empty miles often matter more than raw miles.',
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
    intro: 'University calendars, school years, and winter ice reshape demand more than capital or SEPA patterns.',
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
        label: 'independent central PA university (nearest mid-state hub: Dauphin) movers (parent contrast)',
        href: '/local-movers/pennsylvania/dauphin',
      },
      
    ],
  },
});

import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeNyTier2Pack,
  NY_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/new-york/ny-tier2-shared';

/**
 * broome — NY Tier 2 Wave 1
 */
export const broomeCountyTier2Intelligence: CountyIntelligencePack = finalizeNyTier2Pack({
  countySlug: 'broome',
  hubTitle: 'Broome County Moving Intelligence Hub',
  eyebrow: 'Broome · Binghamton · Southern Tier independent',
  h1: 'Moving in Broome County: Binghamton University Hub & Southern Tier Access',
  heroOpener:
    'Broome County is an independent Southern Tier hub — Binghamton multi-story and university-adjacent stock, Vestal and Endicott suburban belts, Johnson City corridors, and I-81 / NY-17 freeflow that does not answer to Syracuse or Albany scripts. It is not “upstate generic” and not an Onondaga rename: expect university calendars, river-valley city density, and longer empty miles to rural edges. This guide is for people moving in Broome as a Southern Tier independent market — not recycled Capital Region or Central NY packs.',
  heroCredibility:
    'Southern Tier independent · Binghamton university hub · I-81 / NY-17 · NYSDOT household goods · FMCSA when interstate · Curated listings',
  majorCorridors: 'I-81 · NY-17 · US-11 · NY-26 · NY-434 · NY-201',
  parentCompare: {
    parentLabel: 'independent Southern Tier (vs Central NY / Capital defaults)',
    parentHref: '/local-movers/new-york/onondaga',
    title: 'Compared with independent Southern Tier (vs Central NY / Capital defaults)',
    intro:
      'Broome is a Southern Tier independent university/regional hub — not Syracuse core calendars and not Capital Region government freeflow alone.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'Central NY crews fight Syracuse peaks. Broome pairs ride I-81, NY-17, and NY-434 — freer mid-day Southern Tier freeflow, still peak-heavy on Binghamton arterials and university move weekends.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'Onondaga mixes university multi-family and suburbs. Broome mixes Binghamton multi-story, Vestal SFH, and Endicott corridors — independent Southern Tier density, not a Syracuse rename.',
      },
      {
        title: 'Truck access & density',
        detail:
          'City hills and multi-story stock need stair inventories; rural edges add empty miles uncommon on inner Syracuse jobs.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local Broome quotes often sit at secondary mid-state rates for driveway SFH — multi-story access and university peaks still push prices up.',
      },
      {
        title: 'Role difference',
        detail:
          'Broome is Southern Tier independent university/regional hub — not Central NY or Capital Region product renamed.',
      }
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Broome County different',
    intro: 'University calendars, Southern Tier freeflow, and city hills — not interchangeable upstate boilerplate.',
    bullets: [
      {
        title: 'Binghamton University calendars drive demand spikes',
        detail:
          'Term start/end weekends fill local crews first — not only family Saturdays.',
      },
      {
        title: 'City multi-story and hills are first-class product',
        detail:
          'Stairs and grades need inventories different from pure suburban playbooks.',
      },
      {
        title: 'I-81 / NY-17 freeflow is still billable',
        detail:
          'Cross-valley pairs freer mid-day still peak hard. Ask portal-to-portal.',
      },
      {
        title: 'PA adjacency creates interstate legs',
        detail:
          'Pennsylvania addresses require FMCSA authority even on short-looking hops.',
      },
      NY_TIER2_REG_BULLET,
    ],
  },
  zonesHeading: 'Broome zones: Binghamton core, Vestal belt, Endicott/JC corridor & rural edges',
  zonesIntro: 'Two to four sharp products — city, university suburbs, triple cities corridor, and rural edges.',
  zones: [
    {
      id: 'binghamton-core',
      name: 'Binghamton city core',
      shortName: 'Binghamton',
      neighborhoods: ["Binghamton","downtown","west/east side edges"],
      housingTypes: 'Multi-story, multi-unit, older SFH',
      challenges: ["Stairs","Hills","Street parking"],
      moverTips: 'Inventory stairs and grades; plan temporary no-parking.',
      cityKeywords: ["binghamton"],
    },
    {
      id: 'vestal',
      name: 'Vestal university suburb belt',
      shortName: 'Vestal',
      neighborhoods: ["Vestal","university edges"],
      housingTypes: 'SFH, student multi-family, apartments',
      challenges: ["Lease-end clusters","HOA/management packets"],
      moverTips: 'Book early around term calendars; collect building rules.',
      cityKeywords: ["vestal"],
    },
    {
      id: 'endicott-jc',
      name: 'Endicott / Johnson City corridor',
      shortName: 'Endicott / JC',
      neighborhoods: ["Endicott","Johnson City","Endwell"],
      housingTypes: 'SFH, multi-story older stock',
      challenges: ["Mixed access","Arterial timing"],
      moverTips: 'Confirm street width on older blocks.',
      cityKeywords: ["endicott","johnson city","endwell"],
    },
    {
      id: 'rural-edges',
      name: 'Rural edges & larger lots',
      shortName: 'Rural Broome',
      neighborhoods: ["Windsor","Deposit edges","northern towns"],
      housingTypes: 'Larger lots, rural approaches',
      challenges: ["Empty miles","Winter ice"],
      moverTips: 'Photo approaches; winter mornings need flexibility.',
      cityKeywords: ["windsor","deposit"],
    }
  ],
  specialized: [
    {
      id: 'university-turnover',
      title: 'University-adjacent turnover',
      intro: 'Binghamton University calendars create lease clusters.',
      bullets: ["Book early around term start/end weekends.","Expect short-notice local demand spikes in Vestal multi-family."],
    },
    {
      id: 'city-hills',
      title: 'Binghamton multi-story & hills',
      intro: 'City stairs and grades are first-class cost drivers.',
      bullets: ["Inventory floor counts and hill approaches.","Temporary no-parking often beats long carries."],
    },
    {
      id: 'southern-tier-freeflow',
      title: 'I-81 / NY-17 Southern Tier freeflow',
      intro: 'Cross-valley pairs still peak hard.',
      bullets: ["Price portal-to-portal time honestly.","Clarify PA second addresses for interstate authority."],
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
        intro: 'Broome families compare Binghamton City, Vestal, Union-Endicott, Maine-Endwell, and other districts — verify boundaries.',
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
            detail: 'UHS and Lourdes campuses anchor acute care; map peak freeflow across the Triple Cities.',
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
    intro: 'University peaks, city stairs, and empty-mile edges often matter more than raw miles.',
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
    intro: 'Term calendars, school years, and winter ice reshape demand more than capital or NYC patterns.',
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
        label: 'independent Southern Tier (vs Central NY / Capital defaults) movers (parent contrast)',
        href: '/local-movers/new-york/onondaga',
      },
      
    ],
  },
});

import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeGaTier2Pack,
  GA_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/georgia/ga-tier2-shared';

/** houston — GA Tier 2 Wave 1 */
export const houstonCountyGaTier2Intelligence: CountyIntelligencePack = finalizeGaTier2Pack({
  countySlug: 'houston',
  hubTitle: 'Houston County Moving Intelligence Hub',
  eyebrow: 'Houston · Warner Robins / Robins AFB · Middle GA independent',
  h1: 'Moving in Houston County: Warner Robins, Robins AFB PCS & I-75 Middle Georgia',
  heroOpener: 'Houston County is Middle Georgia’s military-regional market — Warner Robins multi-family and seat density, Robins AFB PCS calendars, I-75 freeflow, and product that is not a Macon/Bibb rename. Expect orders-driven demand spikes, base-adjacent apartments, and longer empty miles than Atlanta collars. This guide is for people moving in Houston as Warner Robins / Robins AFB product — not Bibb medical-university hub with different labels.',
  heroCredibility: 'Robins AFB PCS · Warner Robins hub · I-75 middle GA · Georgia DPS MCCD · FMCSA when interstate · Curated listings',
  majorCorridors: 'I-75 · GA-247 · GA-96 · US-41 · Russell Parkway corridors',
  parentCompare: {
    parentLabel: 'independent Middle GA military-regional (vs Bibb / Macon defaults)',
    parentHref: '/local-movers/georgia/bibb',
    title: 'Compared with independent Middle GA military-regional (vs Bibb / Macon defaults)',
    intro: 'Houston is Warner Robins / Robins AFB military-regional product — not Macon multi-story medical/university core alone.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail: 'Bibb crews fight Macon intown peaks and I-16/I-75 approaches. Houston pairs ride I-75, GA-247, and Warner Robins arterials — freer mid-day Middle GA freeflow, still peak-heavy on PCS windows and base-adjacent corridors.',
      },
      {
        title: 'Housing stock differences',
        detail: 'Bibb mixes Macon multi-story and medical corridors. Houston mixes Warner Robins multi-family, base-adjacent apartments, and SFH growth — more continuous PCS turnover product, less continuous university/medical downtown density.',
      },
      {
        title: 'Truck access, HOA & density',
        detail: 'Base-adjacent multi-family needs management packets; PCS clusters rewrite calendars more than pure Macon driveway days.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail: 'Local Houston quotes often track secondary Middle GA rates for driveway SFH — PCS spikes push multi-family prices up on peak order weeks.',
      },
      {
        title: 'Role difference',
        detail: 'Houston is Robins AFB military-regional independent — not Bibb Macon renamed.',
      }
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Houston County different',
    intro: 'PCS calendars, base multi-family, and I-75 Middle GA freeflow — not a Macon clone.',
    bullets: [
      {
        title: 'Robins AFB PCS windows rewrite demand',
        detail: 'Order cycles fill local crews first — book early on peak PCS months.',
      },
      {
        title: 'Base-adjacent multi-family is first-class product',
        detail: 'Elevators, long carries, and building packets need inventories different from pure SFH playbooks.',
      },
      {
        title: 'I-75 freeflow is still billable',
        detail: 'Warner Robins ↔ Macon pairs freer mid-day still peak hard. Ask portal-to-portal.',
      },
      {
        title: 'Distinct from Atlanta collar defaults',
        detail: 'Do not recycle HOA-only north-metro playbooks for PCS multi-family weeks.',
      },
      GA_TIER2_REG_BULLET,
    ],
  },
  zonesHeading: 'Houston zones: Warner Robins core, base-adjacent multi-family, Perry edge & I-75 growth',
  zonesIntro: 'Two to four sharp products under one Middle GA military-regional label.',
  zones: [
    {
      id: 'warner-robins',
      name: 'Warner Robins city core',
      shortName: 'Warner Robins',
      neighborhoods: ["Warner Robins","seat neighborhoods"],
      housingTypes: 'Multi-story, SFH, mixed stock',
      challenges: ["Stairs","Street parking"],
      moverTips: 'Inventory stairs; plan temporary no-parking where needed.',
      cityKeywords: ["warner robins"],
    },
    {
      id: 'base-adjacent',
      name: 'Robins AFB adjacent multi-family',
      shortName: 'Base adjacent',
      neighborhoods: ["base approaches","apartment corridors"],
      housingTypes: 'Apartments, multi-family, military-adjacent leases',
      challenges: ["PCS clusters","Building COIs"],
      moverTips: 'Align to PCS windows; collect management packets early.',
      cityKeywords: ["robins afb"],
    },
    {
      id: 'perry',
      name: 'Perry edge & south corridors',
      shortName: 'Perry',
      neighborhoods: ["Perry","south edges"],
      housingTypes: 'SFH, mixed stock',
      challenges: ["Empty miles","Arterial timing"],
      moverTips: 'Price portal-to-portal toward Warner Robins.',
      cityKeywords: ["perry"],
    },
    {
      id: 'i75-growth',
      name: 'I-75 growth SFH',
      shortName: 'I-75 growth',
      neighborhoods: ["growth villages","corridor SFH"],
      housingTypes: 'Planned SFH, townhomes',
      challenges: ["HOA packets"],
      moverTips: 'Collect COI early on new villages.',
      cityKeywords: ["houston ga growth"],
    }
  ],
  specialized: [
    {
      id: 'pcs',
      title: 'Robins AFB PCS & military-adjacent turnover',
      intro: 'Order calendars create multi-family clusters.',
      bullets: ["Book early on peak PCS months.","Collect elevator windows and building packets."],
    },
    {
      id: 'wr-city',
      title: 'Warner Robins multi-story access',
      intro: 'City stairs are first-class cost drivers.',
      bullets: ["Inventory floor counts.","Temporary no-parking often beats long carries."],
    },
    {
      id: 'i75-mid',
      title: 'I-75 Middle GA freeflow',
      intro: 'Regional pairs still peak hard.',
      bullets: ["Price portal-to-portal honestly.","Do not quote Macon medical-campus rates for base apartment weeks."],
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
        intro: 'Houston families compare Houston County Schools feeders across Warner Robins and Perry — verify boundaries; PCS households should re-check enrollment timing.',
        bullets: [
          {
            title: 'District-first shopping',
            detail:
              'Use Georgia DOE data and district maps; do not assume a city name equals one feeder pattern.',
          },
          {
            title: 'Capacity & calendars',
            detail:
              'Growth pockets and university/military markets can tighten housing near school calendars.',
          },
        ],
      },
      {
        id: 'hospitals',
        title: 'Hospitals & healthcare',
        bullets: [
          {
            title: 'Acute-care anchors',
            detail: 'Houston Healthcare and regional clinics anchor acute care; map peak freeflow on Warner Robins–base corridors.',
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
    intro: 'PCS spikes, multi-family access, and I-75 peaks often matter more than raw miles.',
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
    intro: 'PCS windows and school years reshape demand more than Atlanta HOA calendars alone.',
    items: [
      { title: 'Late spring – early fall', detail: 'Family closings and peak calendars fill Saturday crews first.' },
      { title: 'School & institutional calendars', detail: 'Term, PCS, or school windows can outrank pure weekend demand.' },
    ],
  },
  resources: {
    title: 'Useful resources',
    intro:
      'Official links first; directory listings are independent. Verify Georgia DPS MCCD household-goods frameworks for in-state moves and FMCSA for interstate legs.',
    items: [
      { label: 'independent Middle GA military-regional (vs Bibb / Macon defaults) movers (parent contrast)', href: '/local-movers/georgia/bibb' },
    ],
  },
});

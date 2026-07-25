import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeGaTier2Pack,
  GA_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/georgia/ga-tier2-shared';

/** dougherty — GA Tier 2 Wave 2 */
export const doughertyCountyTier2Intelligence: CountyIntelligencePack = finalizeGaTier2Pack({
  countySlug: 'dougherty',
  hubTitle: 'Dougherty County Moving Intelligence Hub',
  eyebrow: 'Dougherty · Albany · Southwest Georgia hub · independent',
  h1: 'Moving in Dougherty County: Albany Regional Hub, Medical Corridors & SW Georgia Access',
  heroOpener: 'Dougherty County is Southwest Georgia’s independent regional hub — Albany multi-story and medical-corridor stock, agricultural-adjacent residential edges, and freeflow that does not answer to Atlanta collar defaults or coastal tourism scripts. Expect city stairs, longer empty miles to rural lots, and freeflow that is not Valdosta university product alone. This guide is for people moving in Dougherty as Albany SW GA hub — not an Atlanta metro rename.',
  heroCredibility: 'SW Georgia hub · Medical/agricultural · Georgia DPS MCCD · FMCSA when interstate · Curated listings',
  majorCorridors: 'US-19 · US-82 · GA-300 · GA-91 · GA-62 approaches',
  lastReviewed: '2026-07-24',
  parentCompare: {
    parentLabel: 'independent Southwest Georgia hub (vs Atlanta / coastal / Lowndes defaults)',
    parentHref: '/local-movers/georgia/lowndes',
    title: 'Compared with independent Southwest Georgia hub (vs Atlanta / coastal / Lowndes defaults)',
    intro: 'Dougherty is Albany medical/agricultural SW GA hub — not Atlanta HOA collars, not coastal tourism, and not Valdosta university freeflow alone.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail: 'Atlanta collar crews fight Perimeter peaks; Lowndes rides I-75. Dougherty pairs ride US-19, US-82, and Albany arterials — freer mid-day SW GA freeflow, still peak-heavy on medical campuses and intown pairs.',
      },
      {
        title: 'Housing stock differences',
        detail: 'Lowndes mixes Valdosta student multi-family. Dougherty mixes Albany multi-story, medical-corridor stock, and ag-edge lots — more continuous regional medical-hub product, less continuous university multi-family density.',
      },
      {
        title: 'Truck access, HOA & density',
        detail: 'City multi-story needs stair inventories; rural ag edges add empty miles and soft-shoulder risk uncommon on pure suburban collar days.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail: 'Local Dougherty quotes often sit at secondary SW GA rates for driveway SFH — multi-story access and medical peaks push prices up.',
      },
      {
        title: 'Role difference',
        detail: 'Dougherty is independent Albany SW GA hub — not Atlanta, coastal, or Valdosta renamed.',
      }
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Dougherty County different',
    intro: 'Albany multi-story, medical freeflow, and ag-edge empty miles — not an Atlanta or coastal clone.',
    bullets: [
      {
        title: 'Medical-corridor calendars drive spikes',
        detail: 'Hospital-adjacent moves fill crews differently than pure family Saturdays.',
      },
      {
        title: 'Albany multi-story is first-class product',
        detail: 'Stairs and street parking need inventories different from pure rural playbooks.',
      },
      {
        title: 'Ag-edge last-mile rewrites truck size',
        detail: 'Photo approaches; soft shoulders after rain are common.',
      },
      {
        title: 'FL / AL adjacency can create interstate legs',
        detail: 'Border destinations need FMCSA authority.',
      },
      GA_TIER2_REG_BULLET,
    ],
  },
  zonesHeading: 'Dougherty zones: Albany core, medical corridors, suburban edges & ag/rural lots',
  zonesIntro: 'Two to four sharp products under one SW GA hub label.',
  zones: [
    {
      id: 'albany-core',
      name: 'Albany city core',
      shortName: 'Albany core',
      neighborhoods: ["Albany","downtown edges"],
      housingTypes: 'Multi-story, multi-unit, older SFH',
      challenges: ["Stairs","Street parking"],
      moverTips: 'Inventory stairs; plan temporary no-parking.',
      cityKeywords: ["albany ga"],
    },
    {
      id: 'medical',
      name: 'Medical corridor residential',
      shortName: 'Medical corridors',
      neighborhoods: ["medical campus edges"],
      housingTypes: 'Multi-family, SFH, campus-adjacent',
      challenges: ["Building COIs","Clinical calendars"],
      moverTips: 'Book around clinical peaks; collect management packets.',
      cityKeywords: ["albany medical"],
    },
    {
      id: 'suburbs',
      name: 'Suburban edges',
      shortName: 'Suburbs',
      neighborhoods: ["suburban Albany edges"],
      housingTypes: 'SFH, townhomes',
      challenges: ["HOA packets","Arterial timing"],
      moverTips: 'Confirm driveway and HOA hours.',
      cityKeywords: ["albany suburbs"],
    },
    {
      id: 'ag-rural',
      name: 'Ag-edge & rural lots',
      shortName: 'Ag/rural',
      neighborhoods: ["agricultural edges","larger lots"],
      housingTypes: 'Larger lots, rural approaches',
      challenges: ["Empty miles","Soft shoulders"],
      moverTips: 'Photo last-mile; rain weeks need flexibility.',
      cityKeywords: ["dougherty rural"],
    }
  ],
  specialized: [
    {
      id: 'albany-city',
      title: 'Albany multi-story access',
      intro: 'City stairs are first-class cost drivers.',
      bullets: ["Inventory floor counts.","Temporary no-parking often beats long carries."],
    },
    {
      id: 'medical',
      title: 'Medical corridor logistics',
      intro: 'Clinical calendars rewrite demand.',
      bullets: ["Book early around staffing and clinic peaks.","Collect building packets on multi-family."],
    },
    {
      id: 'ag-edge',
      title: 'Agricultural-edge empty miles',
      intro: 'Rural approaches rewrite hourly math.',
      bullets: ["Photo last-mile before locking truck size.","Do not quote Atlanta collar rates for ag-edge lots."],
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
        intro: 'Dougherty families compare Dougherty County and related city school options — verify boundaries; regional-hub reputation does not replace district maps.',
        bullets: [
          {
            title: 'District-first shopping',
            detail:
              'Use Georgia DOE data and district maps; do not assume a city name equals one feeder pattern.',
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
            detail: 'Phoebe Putney and regional medical campuses anchor acute care; map peak freeflow on medical corridors.',
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
    intro: 'City access, medical peaks, and empty-mile edges often matter more than raw miles.',
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
    intro: 'Medical staffing moves, school years, and agricultural calendars reshape demand more than Atlanta HOA peaks alone.',
    items: [
      { title: 'Late spring – early fall', detail: 'Family closings and peak calendars fill Saturday crews first.' },
      { title: 'School & institutional calendars', detail: 'Term, tourism, or industrial windows can outrank pure weekend demand.' },
    ],
  },
  resources: {
    title: 'Useful resources',
    intro:
      'Official links first; directory listings are independent. Verify Georgia DPS MCCD household-goods frameworks for in-state moves and FMCSA for interstate legs.',
    items: [
      { label: 'independent Southwest Georgia hub (vs Atlanta / coastal / Lowndes defaults) movers (parent contrast)', href: '/local-movers/georgia/lowndes' },
    ],
  },
});

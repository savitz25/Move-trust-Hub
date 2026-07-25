import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeMiTier2Pack,
  MI_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/michigan/mi-tier2-shared';

/** st-clair — MI Tier 2 Wave 1 */
export const stClairCountyMiTier2Intelligence: CountyIntelligencePack = finalizeMiTier2Pack({
  countySlug: 'st-clair',
  hubTitle: 'St. Clair County Moving Intelligence Hub',
  eyebrow: 'St. Clair · Port Huron / Marysville · Blue Water east edge · vs Macomb',
  h1: 'Moving in St. Clair County: Port Huron, Marysville & I-94 Blue Water East Edge',
  heroOpener: 'St. Clair County is metro Detroit’s east Blue Water edge — Port Huron multi-story and river-city stock, Marysville corridors, I-94 terminus freeflow, and border-adjacent logistics that are not Macomb’s continuous Warren/Sterling Heights industrial-suburban density. Expect longer empty miles into the east-metro core, winter ice, and freeflow that still peaks hard on I-94. This guide is for people moving in St. Clair as east-edge / border product — not a Macomb rename.',
  heroCredibility: 'I-94 east terminus · Border-adjacent · MSP CVED household goods · FMCSA when interstate · Curated listings',
  majorCorridors: 'I-94 · I-69 · M-25 · M-29 · Gratiot Ave links',
  lastReviewed: '2026-07-24',
  parentCompare: {
    parentLabel: 'Macomb County',
    parentHref: '/local-movers/michigan/macomb',
    title: 'Compared with Macomb County',
    intro: 'St. Clair is Port Huron / Marysville Blue Water east-edge product — not Macomb continuous east-metro multi-family density alone.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail: 'Macomb crews fight I-94/M-59 east-metro peaks closer in. St. Clair pairs ride I-94 further east, M-25, and Port Huron arterials — freer mid-day at the terminus, still peak-heavy on bridge approaches and commute windows westbound.',
      },
      {
        title: 'Housing stock differences',
        detail: 'Macomb mixes continuous industrial-suburban multi-family. St. Clair mixes Port Huron multi-story, Marysville SFH, and rural lake-edge lots — more continuous terminus/edge product.',
      },
      {
        title: 'Truck access, HOA & density',
        detail: 'City multi-story needs stair inventories; border destinations flip jobs to FMCSA more often than pure in-Macomb pairs.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail: 'Local St. Clair quotes often sit at east-edge rates for driveway SFH — empty miles into Macomb still push premiums.',
      },
      {
        title: 'Role difference',
        detail: 'St. Clair is Blue Water I-94 east edge — not Macomb renamed.',
      }
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in St. Clair County different',
    intro: 'I-94 terminus freeflow, Port Huron multi-story, and border interstate legs — not a Macomb clone.',
    bullets: [
      {
        title: 'I-94 freeflow is billable',
        detail: 'Port Huron ↔ Macomb pairs freer mid-day still peak hard. Ask portal-to-portal.',
      },
      {
        title: 'Canada / border adjacency creates interstate legs',
        detail: 'Short-looking border hops need FMCSA authority clarity.',
      },
      {
        title: 'Port Huron multi-story is first-class product',
        detail: 'Stairs and street parking need inventories different from pure township SFH playbooks.',
      },
      {
        title: 'Winter ice on lakeshore approaches is operational',
        detail: 'Build weather buffers into morning plans.',
      },
      MI_TIER2_REG_BULLET,
    ],
  },
  zonesHeading: 'St. Clair zones: Port Huron core, Marysville corridors, lakeshore edges & rural west',
  zonesIntro: 'Two to four sharp products under one Blue Water east-edge label.',
  zones: [
    {
      id: 'port-huron',
      name: 'Port Huron multi-story & river-city stock',
      shortName: 'Port Huron',
      neighborhoods: ["Port Huron","downtown edges"],
      housingTypes: 'Multi-story, multi-unit, older SFH',
      challenges: ["Stairs","Street parking","Winter ice"],
      moverTips: 'Inventory stairs; plan temporary no-parking; winter flexibility required.',
      cityKeywords: ["port huron"],
    },
    {
      id: 'marysville',
      name: 'Marysville corridor suburbs',
      shortName: 'Marysville',
      neighborhoods: ["Marysville","corridor edges"],
      housingTypes: 'SFH, townhomes',
      challenges: ["Arterial timing","HOA packets"],
      moverTips: 'Confirm driveway staging; price portal-to-portal westbound.',
      cityKeywords: ["marysville"],
    },
    {
      id: 'lakeshore',
      name: 'Lakeshore / river edges',
      shortName: 'Lakeshore edges',
      neighborhoods: ["shore approaches","river towns"],
      housingTypes: 'SFH, seasonal constraints',
      challenges: ["Last-mile width","Winter ice"],
      moverTips: 'Photo approaches; plan smaller trucks near shore streets.',
      cityKeywords: ["st clair lakeshore"],
    },
    {
      id: 'rural-west',
      name: 'Rural west toward Macomb',
      shortName: 'Rural west',
      neighborhoods: ["western townships"],
      housingTypes: 'Larger lots, rural approaches',
      challenges: ["Empty miles","Soft shoulders"],
      moverTips: 'Photo last-mile; rain weeks need flexibility.',
      cityKeywords: ["st clair west"],
    }
  ],
  specialized: [
    {
      id: 'i94-terminus',
      title: 'I-94 Blue Water freeflow',
      intro: 'Terminus pairs still peak hard westbound.',
      bullets: ["Price portal-to-portal honestly.","Do not quote Macomb multi-family rates for rural lake lots."],
    },
    {
      id: 'border',
      title: 'Border-adjacent interstate legs',
      intro: 'Short-looking hops still need FMCSA.',
      bullets: ["Clarify destination country/state before deposit.","Verify USDOT/MC on interstate quotes."],
    },
    {
      id: 'port-huron-city',
      title: 'Port Huron multi-story access',
      intro: 'City stairs are first-class cost drivers.',
      bullets: ["Inventory floor counts.","Temporary no-parking often beats long carries."],
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
        intro: 'St. Clair families compare Port Huron, Marysville, and other districts — verify boundaries; do not assume Macomb maps apply.',
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
            detail: 'McLaren Port Huron and regional systems serve the east edge; map peak freeflow on I-94 corridors.',
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
    intro: 'Empty miles, city access, and I-94 peaks often matter more than raw miles.',
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
    intro: 'Winter ice and school years reshape demand more than pure Macomb industrial peaks alone.',
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
      { label: 'Macomb County movers (parent contrast)', href: '/local-movers/michigan/macomb' },
    ],
  },
});

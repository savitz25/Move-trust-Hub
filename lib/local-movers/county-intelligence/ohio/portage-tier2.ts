import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeOhTier2Pack,
  OH_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/ohio/oh-tier2-shared';

/** portage — OH Tier 2 Wave 1 */
export const portageCountyOhTier2Intelligence: CountyIntelligencePack = finalizeOhTier2Pack({
  countySlug: 'portage',
  hubTitle: 'Portage County Moving Intelligence Hub',
  eyebrow: 'Portage · Kent / Ravenna / Streetsboro · Akron east · vs Summit',
  h1: 'Moving in Portage County: Kent University Hub, Ravenna Seat & I-76 / Turnpike Access',
  heroOpener: 'Portage County is Akron’s east university and Turnpike collar — Kent multi-story and student multi-family, Ravenna seat stock, Streetsboro growth, I-76 / Turnpike freeflow, and product that is not Summit’s Akron core multi-unit density alone. Expect term-weekend spikes, longer empty miles into Akron and Cleveland edges, and HOA pockets on growth streets. This guide is for people moving in Portage as Akron-east university product — not an Akron rename.',
  heroCredibility: 'University town + Turnpike · I-76 · PUCO household goods · FMCSA when interstate · Curated listings',
  majorCorridors: 'I-76 · I-80 Ohio Turnpike · SR-8 links · SR-59 · SR-14 · SR-43 approaches',
  lastReviewed: '2026-07-24',
  parentCompare: {
    parentLabel: 'Summit County',
    parentHref: '/local-movers/ohio/summit',
    title: 'Compared with Summit County',
    intro: 'Portage is Kent university / Ravenna east product — not Akron core multi-unit density and not Cuyahoga Heights elevators alone.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail: 'Summit crews fight Akron core freeflow. Portage pairs ride I-76, Turnpike links, and Kent arterials — freer mid-day east of Akron, still peak-heavy on term weekends and I-76 peaks.',
      },
      {
        title: 'Housing stock differences',
        detail: 'Summit mixes Akron multi-story and suburban SFH. Portage mixes Kent student multi-family, Ravenna seat stock, and Streetsboro growth — more continuous university density, less continuous pure Akron industrial-edge product.',
      },
      {
        title: 'Truck access, HOA & density',
        detail: 'Student buildings need management packets; growth HOAs need COI; winter ice rewrites Turnpike-edge mornings.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail: 'Local Portage quotes often sit at secondary east-of-Akron rates for driveway SFH — term spikes push multi-family prices up.',
      },
      {
        title: 'Role difference',
        detail: 'Portage is Akron-east university / Turnpike product — not Summit core renamed.',
      }
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Portage County different',
    intro: 'Kent term calendars, I-76 freeflow, and east empty miles — not an Akron-core clone.',
    bullets: [
      {
        title: 'Kent State term calendars spike demand',
        detail: 'Move-in/move-out weekends fill local crews first — book early.',
      },
      {
        title: 'I-76 / Turnpike freeflow is billable',
        detail: 'Kent ↔ Akron pairs freer mid-day still peak hard. Ask portal-to-portal.',
      },
      {
        title: 'Student multi-family needs building packets',
        detail: 'Elevators and long carries need inventories different from pure SFH playbooks.',
      },
      {
        title: 'Winter Turnpike approaches are operational',
        detail: 'Build ice-aware buffers into morning plans.',
      },
      OH_TIER2_REG_BULLET,
    ],
  },
  zonesHeading: 'Portage zones: Kent campus density, Ravenna seat, Streetsboro growth & rural edges',
  zonesIntro: 'Two to four sharp products under one Akron-east label.',
  zones: [
    {
      id: 'kent',
      name: 'Kent university multi-family',
      shortName: 'Kent',
      neighborhoods: ["Kent","campus edges"],
      housingTypes: 'Student multi-family, multi-story, SFH',
      challenges: ["Term clusters","Building COIs","Stairs"],
      moverTips: 'Book early around term calendars; collect management packets.',
      cityKeywords: ["kent"],
    },
    {
      id: 'ravenna',
      name: 'Ravenna seat & core',
      shortName: 'Ravenna',
      neighborhoods: ["Ravenna","seat neighborhoods"],
      housingTypes: 'SFH, multi-story older stock',
      challenges: ["Street width","Mixed access"],
      moverTips: 'Inventory older multi-story; confirm staging.',
      cityKeywords: ["ravenna"],
    },
    {
      id: 'streetsboro',
      name: 'Streetsboro growth corridors',
      shortName: 'Streetsboro',
      neighborhoods: ["Streetsboro","growth villages"],
      housingTypes: 'Planned SFH, townhomes',
      challenges: ["HOA packets","Turnpike peaks"],
      moverTips: 'Collect COI early; price portal-to-portal.',
      cityKeywords: ["streetsboro"],
    },
    {
      id: 'rural',
      name: 'Rural edges & larger lots',
      shortName: 'Rural edges',
      neighborhoods: ["eastern/southern towns"],
      housingTypes: 'Larger lots, rural approaches',
      challenges: ["Empty miles","Winter ice"],
      moverTips: 'Photo last-mile; allow winter buffers.',
      cityKeywords: ["portage rural"],
    }
  ],
  specialized: [
    {
      id: 'kent-university',
      title: 'Kent University term turnover',
      intro: 'Term calendars create multi-family clusters.',
      bullets: ["Book early around move-in/move-out weekends.","Expect short-notice multi-family demand."],
    },
    {
      id: 'i76-turnpike',
      title: 'I-76 / Turnpike freeflow',
      intro: 'Regional pairs still peak hard.',
      bullets: ["Price portal-to-portal honestly.","Do not quote Akron elevator rates for rural Portage lots."],
    },
    {
      id: 'student-mf',
      title: 'Student multi-family building packets',
      intro: 'Elevators and management rules dominate.',
      bullets: ["Collect COI and elevator windows early.","Do not quote pure suburban SFH rates for campus apartments."],
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
        intro: 'Portage families compare Kent City, Ravenna, Streetsboro, and other districts — verify boundaries; university housing patterns do not replace district maps for family SFH.',
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
            detail: 'University Hospitals Portage and Akron-region systems serve the county; map peak freeflow on I-76 corridors.',
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
    intro: 'Term spikes, multi-family access, and empty miles often matter more than raw miles.',
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
    intro: 'University calendars and winter ice reshape demand more than Akron office peaks alone.',
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
      { label: 'Summit County movers (parent contrast)', href: '/local-movers/ohio/summit' },
    ],
  },
});

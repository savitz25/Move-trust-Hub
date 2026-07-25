import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeOhTier2Pack,
  OH_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/ohio/oh-tier2-shared';

/** greene — OH Tier 2 Wave 1 */
export const greeneCountyOhTier2Intelligence: CountyIntelligencePack = finalizeOhTier2Pack({
  countySlug: 'greene',
  hubTitle: 'Greene County Moving Intelligence Hub',
  eyebrow: 'Greene · Beavercreek / Xenia / Fairborn · Dayton east · vs Montgomery',
  h1: 'Moving in Greene County: Beavercreek, Fairborn & Wright-Patterson East-Metro Edge',
  heroOpener: 'Greene County is Dayton’s east-metro and Wright-Patterson edge — Beavercreek HOA growth, Fairborn multi-family and base-adjacent stock, Xenia seat product, and freeflow that is not Montgomery’s Dayton core multi-unit density alone. Expect PCS and defense-contractor calendars, longer empty miles into Dayton, and master-plan COIs on growth streets. This guide is for people moving in Greene as Dayton-east / Wright-Patt edge product — not a Montgomery rename.',
  heroCredibility: 'Wright-Patterson edge · East-metro suburbs · PUCO household goods · FMCSA when interstate · Curated listings',
  majorCorridors: 'US-35 · I-675 · SR-444 · SR-235 · SR-4 approaches · Colonel Glenn Hwy corridors',
  lastReviewed: '2026-07-24',
  parentCompare: {
    parentLabel: 'Montgomery County',
    parentHref: '/local-movers/ohio/montgomery',
    title: 'Compared with Montgomery County',
    intro: 'Greene is Beavercreek / Fairborn Wright-Patt east-edge product — not Dayton core multi-unit density and not pure west Montgomery suburbs alone.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail: 'Montgomery crews fight Dayton core freeflow. Greene pairs ride US-35, I-675, and Beavercreek corridors — freer mid-day east of the core, still peak-heavy on base and commute windows.',
      },
      {
        title: 'Housing stock differences',
        detail: 'Montgomery mixes Dayton multi-story and Kettering SFH. Greene mixes Beavercreek planned SFH, Fairborn multi-family, and Xenia seat stock — more continuous east-edge growth and base-adjacent product.',
      },
      {
        title: 'Truck access, HOA & density',
        detail: 'HOA packets dominate Beavercreek; base-adjacent multi-family needs management packets uncommon on pure rural Xenia lots.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail: 'Local Greene quotes often sit at east-metro rates for driveway SFH — PCS spikes push multi-family prices up on peak order weeks.',
      },
      {
        title: 'Role difference',
        detail: 'Greene is Dayton-east Wright-Patt edge — not Montgomery core renamed.',
      }
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Greene County different',
    intro: 'Wright-Patt calendars, Beavercreek HOAs, and east-metro freeflow — not a Dayton-core clone.',
    bullets: [
      {
        title: 'Wright-Patterson PCS and contractor cycles rewrite demand',
        detail: 'Order and contract calendars fill crews differently than pure family Saturdays.',
      },
      {
        title: 'Beavercreek HOA growth is first-class product',
        detail: 'COI and gate lists on planned villages are standard.',
      },
      {
        title: 'US-35 / I-675 freeflow is billable',
        detail: 'Beavercreek ↔ Dayton pairs freer mid-day still peak hard. Ask portal-to-portal.',
      },
      {
        title: 'Base-adjacent multi-family needs building packets',
        detail: 'Elevators and long carries need inventories different from pure SFH playbooks.',
      },
      OH_TIER2_REG_BULLET,
    ],
  },
  zonesHeading: 'Greene zones: Beavercreek growth, Fairborn base-edge, Xenia seat & rural east',
  zonesIntro: 'Two to four sharp products under one Dayton-east label.',
  zones: [
    {
      id: 'beavercreek',
      name: 'Beavercreek planned growth',
      shortName: 'Beavercreek',
      neighborhoods: ["Beavercreek","growth villages"],
      housingTypes: 'Planned SFH, townhomes',
      challenges: ["HOA packets","US-35 peaks"],
      moverTips: 'Collect COI early; price portal-to-portal toward Dayton.',
      cityKeywords: ["beavercreek"],
    },
    {
      id: 'fairborn',
      name: 'Fairborn base-adjacent multi-family',
      shortName: 'Fairborn',
      neighborhoods: ["Fairborn","base approaches"],
      housingTypes: 'Multi-family, apartments, SFH',
      challenges: ["PCS clusters","Building COIs"],
      moverTips: 'Align to PCS windows when relevant; collect management packets.',
      cityKeywords: ["fairborn"],
    },
    {
      id: 'xenia',
      name: 'Xenia seat & core',
      shortName: 'Xenia',
      neighborhoods: ["Xenia","seat neighborhoods"],
      housingTypes: 'SFH, multi-story older stock',
      challenges: ["Street width","Mixed access"],
      moverTips: 'Inventory older multi-story; confirm staging.',
      cityKeywords: ["xenia"],
    },
    {
      id: 'rural-east',
      name: 'Rural east & larger lots',
      shortName: 'Rural east',
      neighborhoods: ["eastern towns","larger lots"],
      housingTypes: 'Larger lots, rural approaches',
      challenges: ["Empty miles","Soft shoulders"],
      moverTips: 'Photo last-mile; rain weeks need flexibility.',
      cityKeywords: ["greene east"],
    }
  ],
  specialized: [
    {
      id: 'wright-patt',
      title: 'Wright-Patterson PCS & contractor turnover',
      intro: 'Base calendars create multi-family clusters.',
      bullets: ["Book early around peak PCS months.","Collect elevator windows and building packets."],
    },
    {
      id: 'beavercreek-hoa',
      title: 'Beavercreek HOA growth logistics',
      intro: 'Master-plan rules are first-class cost drivers.',
      bullets: ["Gate lists early.","Weekday windows often beat Saturdays."],
    },
    {
      id: 'us35-freeflow',
      title: 'US-35 / I-675 east-metro freeflow',
      intro: 'Regional pairs still peak hard.',
      bullets: ["Price portal-to-portal honestly.","Do not quote Dayton elevator rates for Beavercreek driveways."],
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
        intro: 'Greene families compare Beavercreek, Fairborn, Xenia, and other districts — verify boundaries; do not assume Dayton Public maps apply.',
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
            detail: 'Soin Medical Center and Dayton-region systems serve the east metro; map peak freeflow on US-35 corridors.',
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
    intro: 'PCS spikes, HOA soft costs, and east-metro peaks often matter more than raw miles.',
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
    intro: 'PCS windows and school years reshape demand more than pure Dayton office peaks alone.',
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
      { label: 'Montgomery County movers (parent contrast)', href: '/local-movers/ohio/montgomery' },
    ],
  },
});

import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeGaTier2Pack,
  GA_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/georgia/ga-tier2-shared';

/** glynn — GA Tier 2 Wave 2 */
export const glynnCountyTier2Intelligence: CountyIntelligencePack = finalizeGaTier2Pack({
  countySlug: 'glynn',
  hubTitle: 'Glynn County Moving Intelligence Hub',
  eyebrow: 'Glynn · Brunswick / Golden Isles · coastal independent',
  h1: 'Moving in Glynn County: Brunswick, Golden Isles Access & I-95 Coastal Living',
  heroOpener: 'Glynn County is coastal Georgia’s Golden Isles market — Brunswick multi-story and mainland stock, St. Simons and Sea Island bridge/causeway constraints, tourism calendars, and freeflow that is not Savannah/Chatham historic-square product. Expect humidity packing, island last-mile that rejects full trailers, and I-95 freeflow that still peaks hard on holiday weekends. This guide is for people moving in Glynn as Brunswick / Golden Isles coastal product — not a Chatham rename.',
  heroCredibility: 'Golden Isles coastal · Tourism + residential · Georgia DPS MCCD · FMCSA when interstate · Curated listings',
  majorCorridors: 'I-95 · US-17 · US-341 · GA-25 · Torras Causeway / island approaches',
  lastReviewed: '2026-07-24',
  parentCompare: {
    parentLabel: 'independent coastal GA (distant Chatham / Savannah contrast)',
    parentHref: '/local-movers/georgia/chatham',
    title: 'Compared with independent coastal GA (distant Chatham / Savannah contrast)',
    intro: 'Glynn is Brunswick / Golden Isles coastal product — not Savannah historic-square density and not I-16 port logistics alone.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail: 'Chatham crews fight historic district and island bridge peaks into Savannah/Tybee. Glynn pairs ride I-95, US-17, and Torras Causeway approaches — freer mid-day mid-coast freeflow, still peak-heavy on island tourism weekends.',
      },
      {
        title: 'Housing stock differences',
        detail: 'Chatham mixes Savannah squares and Tybee cottages. Glynn mixes Brunswick multi-story, mainland SFH, and St. Simons/Sea Island resort stock — more continuous Golden Isles tourism product, less continuous historic-lane density.',
      },
      {
        title: 'Truck access, HOA & density',
        detail: 'Island causeways and resort streets often need smaller trucks; humidity packing and salt air matter more than Atlanta HOA playbooks.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail: 'Local Glynn quotes often sit at secondary coastal rates for mainland SFH — island shuttles and tourism peaks can price above quiet inland days.',
      },
      {
        title: 'Role difference',
        detail: 'Glynn is Golden Isles coastal independent — not Chatham Savannah renamed.',
      }
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Glynn County different',
    intro: 'Island causeways, tourism peaks, and coastal humidity — not a Savannah clone.',
    bullets: [
      {
        title: 'Golden Isles last-mile rewrites truck size',
        detail: 'Causeway and resort streets often reject full trailers — photo approaches.',
      },
      {
        title: 'Tourism calendars tighten curb plans',
        detail: 'Holiday and summer peaks fill crews and streets differently than pure family Saturdays.',
      },
      {
        title: 'Humidity and salt air are operational',
        detail: 'Protection labor matters more than inland Georgia jobs.',
      },
      {
        title: 'I-95 freeflow is still billable',
        detail: 'Mainland pairs freer mid-day still peak hard. Ask portal-to-portal.',
      },
      GA_TIER2_REG_BULLET,
    ],
  },
  zonesHeading: 'Glynn zones: Brunswick mainland, St. Simons island, Sea Island/resort edge & rural mainland',
  zonesIntro: 'Two to four sharp products under one Golden Isles coastal label.',
  zones: [
    {
      id: 'brunswick',
      name: 'Brunswick mainland core',
      shortName: 'Brunswick',
      neighborhoods: ["Brunswick","mainland neighborhoods"],
      housingTypes: 'Multi-story, SFH, mixed stock',
      challenges: ["Stairs","Street parking","Humidity"],
      moverTips: 'Inventory stairs; plan humidity-aware packing; temporary no-parking where needed.',
      cityKeywords: ["brunswick"],
    },
    {
      id: 'st-simons',
      name: 'St. Simons island approaches',
      shortName: 'St. Simons',
      neighborhoods: ["St. Simons","island villages"],
      housingTypes: 'Island SFH, multi-unit tourism stock',
      challenges: ["Causeway timing","Narrow streets","Tourism parking"],
      moverTips: 'Photo last-mile; plan smaller trucks; book around peak tourism weekends.',
      cityKeywords: ["st simons"],
    },
    {
      id: 'sea-island',
      name: 'Sea Island / resort edge',
      shortName: 'Resort edge',
      neighborhoods: ["Sea Island approaches","resort properties"],
      housingTypes: 'Resort homes, multi-unit tourism stock',
      challenges: ["Access rules","Seasonal peaks"],
      moverTips: 'Confirm access rules early; do not price as pure Brunswick driveway days.',
      cityKeywords: ["sea island"],
    },
    {
      id: 'rural-mainland',
      name: 'Rural mainland & larger lots',
      shortName: 'Rural mainland',
      neighborhoods: ["mainland towns","larger lots"],
      housingTypes: 'Larger lots, rural approaches',
      challenges: ["Empty miles","Soft shoulders"],
      moverTips: 'Photo last-mile; rain weeks need flexibility.',
      cityKeywords: ["glynn mainland"],
    }
  ],
  specialized: [
    {
      id: 'island-access',
      title: 'Golden Isles causeway & island logistics',
      intro: 'Bridge timing and street width are first-class cost drivers.',
      bullets: ["Photo last-mile before surveys finalize.","Shuttle conversations beat stuck trailers."],
    },
    {
      id: 'tourism-peaks',
      title: 'Coastal tourism calendar moves',
      intro: 'Summer and holiday peaks rewrite demand.',
      bullets: ["Book early for peak weekends.","Confirm curb rules for seasonal multi-unit stock."],
    },
    {
      id: 'vs-chatham',
      title: 'Distinct from Savannah historic product',
      intro: 'Glynn is not square-and-lane historic density.',
      bullets: ["Do not recycle Chatham historic-district playbooks.","Island humidity and causeways are the differentiators."],
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
        intro: 'Glynn families compare Glynn County Schools feeders across Brunswick and island communities — verify boundaries; island vs mainland feeders differ.',
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
            detail: 'Southeast Georgia Health System and regional clinics anchor acute care; map peak freeflow across mainland–island approaches.',
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
    intro: 'Island access, tourism peaks, and humidity packing often matter more than raw miles.',
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
    intro: 'Summer tourism, holiday weekends, and hurricane-season readiness reshape demand more than Atlanta HOA peaks alone.',
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
      { label: 'independent coastal GA (distant Chatham / Savannah contrast) movers (parent contrast)', href: '/local-movers/georgia/chatham' },
    ],
  },
});

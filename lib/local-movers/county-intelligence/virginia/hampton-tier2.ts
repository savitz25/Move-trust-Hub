import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeVaTier2Pack,
  VA_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/virginia/va-tier2-shared';

/** hampton — VA Tier 2 Wave 1 */
export const hamptonCityVaTier2Intelligence: CountyIntelligencePack = finalizeVaTier2Pack({
  countySlug: 'hampton',
  hubTitle: 'Hampton Moving Intelligence Hub',
  eyebrow: 'Hampton · Peninsula independent city · Hampton Roads north · independent',
  h1: 'Moving in Hampton: Phoebus, Coliseum Corridors & North Hampton Roads Urban Access',
  heroOpener: 'Hampton is an independent Peninsula city on the north Hampton Roads edge — Phoebus multi-story and water-edge stock, Coliseum multi-family corridors, denser curb rules than York County suburbs, and product that must feel distinct from Newport News shipyard freeflow and Norfolk southside tunnels. Expect elevators, street permits, bridge approaches, and freeflow that still peaks hard. This guide is for people moving in Hampton as north Hampton Roads urban product — not a Newport News or Norfolk rename.',
  heroCredibility: 'Hampton Roads north · Urban Peninsula · Virginia DMV household goods · FMCSA when interstate · Curated listings',
  majorCorridors: 'I-64 · I-664 · US-60 · Mercury Blvd · VA-134 · Settlers Landing approaches',
  lastReviewed: '2026-07-24',
  parentCompare: {
    parentLabel: 'independent north Hampton Roads urban (vs Newport News / Norfolk / York)',
    parentHref: '/local-movers/virginia/newport-news',
    title: 'Compared with independent north Hampton Roads urban (vs Newport News / Norfolk / York)',
    intro: 'Hampton is north Hampton Roads urban multi-story and water-edge product — not Newport News shipyard freeflow alone and not Norfolk tunnel density alone.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail: 'Newport News crews fight Jefferson/Warwick peaks. Hampton pairs ride Mercury, I-64, and bridge approaches — different freeflow clocks, still peak-heavy on school and event windows.',
      },
      {
        title: 'Housing stock differences',
        detail: 'Newport News mixes shipyard multi-family. Hampton mixes Phoebus multi-story, Coliseum multi-family, and water-edge stock — more continuous north-HR urban product with different water-edge geometry.',
      },
      {
        title: 'Truck access, HOA & density',
        detail: 'Multi-story packets and curb permits dominate; water-edge streets can tighten truck size more often than pure midtown NN days.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail: 'Local Hampton quotes often sit at secondary urban Peninsula rates for multi-story access — water-edge last-mile can price above simple driveway days.',
      },
      {
        title: 'Role difference',
        detail: 'Hampton is independent north Hampton Roads urban product — not Newport News or Norfolk renamed.',
      }
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Hampton different',
    intro: 'Water-edge multi-story, Coliseum freeflow, and north-HR arterials — not a Newport News clone.',
    bullets: [
      {
        title: 'Distinct from Newport News shipyard product',
        detail: 'Different Peninsula city freeflow and housing mix — do not recycle shipyard-only playbooks.',
      },
      {
        title: 'Distinct from Norfolk tunnel logistics',
        detail: 'North-HR freeflow is not southside tunnel multi-story defaults.',
      },
      {
        title: 'Water-edge last-mile rewrites truck size',
        detail: 'Photo approaches; many streets reject full trailers.',
      },
      {
        title: 'Coliseum multi-family needs building packets',
        detail: 'Elevators and COIs rewrite labor hours.',
      },
      VA_TIER2_REG_BULLET,
    ],
  },
  zonesHeading: 'Hampton zones: Phoebus multi-story, Coliseum multi-family, Mercury corridors & northwest SFH',
  zonesIntro: 'Two to four sharp products under one north Hampton Roads city label.',
  zones: [
    {
      id: 'phoebus',
      name: 'Phoebus multi-story & water-edge',
      shortName: 'Phoebus',
      neighborhoods: ["Phoebus","water-edge neighborhoods"],
      housingTypes: 'Multi-story, multi-unit, older SFH',
      challenges: ["Stairs","Street width","Water-edge access"],
      moverTips: 'Photo street width; inventory stairs; plan smaller trucks when needed.',
      cityKeywords: ["phoebus"],
    },
    {
      id: 'coliseum',
      name: 'Coliseum multi-family corridors',
      shortName: 'Coliseum',
      neighborhoods: ["Coliseum Drive edges","multi-family clusters"],
      housingTypes: 'Multi-family, apartments',
      challenges: ["Building COIs","Arterial timing"],
      moverTips: 'Collect management packets; elevator windows early.',
      cityKeywords: ["coliseum hampton"],
    },
    {
      id: 'mercury',
      name: 'Mercury Blvd corridors',
      shortName: 'Mercury corridors',
      neighborhoods: ["Mercury Blvd edges"],
      housingTypes: 'SFH, multi-family pockets',
      challenges: ["Arterial timing"],
      moverTips: 'Price portal-to-portal; avoid peak retail windows.',
      cityKeywords: ["mercury blvd"],
    },
    {
      id: 'nw-sfh',
      name: 'Northwest SFH belts',
      shortName: 'Northwest SFH',
      neighborhoods: ["northwest neighborhoods"],
      housingTypes: 'SFH, townhomes',
      challenges: ["Driveway staging","HOA packets"],
      moverTips: 'Confirm driveway and HOA hours.',
      cityKeywords: ["hampton nw"],
    }
  ],
  specialized: [
    {
      id: 'water-edge',
      title: 'Phoebus water-edge multi-story access',
      intro: 'Street width and stairs are first-class cost drivers.',
      bullets: ["Photo approaches before final quote.","Temporary no-parking often beats long carries."],
    },
    {
      id: 'coliseum-mf',
      title: 'Coliseum multi-family logistics',
      intro: 'Building packets dominate.',
      bullets: ["Elevator windows early.","Month-end competition for crews is real."],
    },
    {
      id: 'vs-cities',
      title: 'Distinct from Newport News and Norfolk',
      intro: 'North-HR urban product differs from shipyard and tunnel cities.',
      bullets: ["Do not recycle NN shipyard-only or Norfolk tunnel-only playbooks.","Water-edge + Coliseum mix is the differentiator."],
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
        intro: 'Hampton families compare Hampton City Schools feeders — verify boundaries; county Peninsula maps do not apply.',
        bullets: [
          {
            title: 'District-first shopping',
            detail:
              'Use Virginia DOE data and district maps; do not assume a city name equals one feeder pattern.',
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
            detail: 'Sentara CarePlex and regional systems serve the city; map peak freeflow on Mercury/I-64 corridors.',
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
    intro: 'Multi-story access, water-edge last-mile, and arterial peaks often matter more than raw miles.',
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
    intro: 'School years and event calendars reshape demand more than pure industrial shift peaks alone.',
    items: [
      { title: 'Late spring – early fall', detail: 'Family closings and peak calendars fill Saturday crews first.' },
      { title: 'Institutional calendars', detail: 'Term, PCS, or tourism windows can outrank pure weekend demand.' },
    ],
  },
  resources: {
    title: 'Useful resources',
    intro:
      'Official links first; directory listings are independent. Verify Virginia DMV household-goods / motor-carrier authority for in-state moves and FMCSA for interstate legs.',
    items: [
      { label: 'independent north Hampton Roads urban (vs Newport News / Norfolk / York) movers (parent contrast)', href: '/local-movers/virginia/newport-news' },
    ],
  },
});

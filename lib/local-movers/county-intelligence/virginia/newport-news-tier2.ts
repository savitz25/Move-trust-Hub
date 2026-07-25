import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeVaTier2Pack,
  VA_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/virginia/va-tier2-shared';

/** newport-news — VA Tier 2 Wave 1 */
export const newportNewsCityVaTier2Intelligence: CountyIntelligencePack = finalizeVaTier2Pack({
  countySlug: 'newport-news',
  hubTitle: 'Newport News Moving Intelligence Hub',
  eyebrow: 'Newport News · Peninsula independent city · shipyard / midtown · independent',
  h1: 'Moving in Newport News: Shipyard Logistics, Midtown Multi-Story & Peninsula Urban Access',
  heroOpener: 'Newport News is an independent Peninsula city — shipyard and industrial freeflow, midtown multi-story stock, denser curb rules than York County suburbs, and product that is not Hampton’s urban fabric alone and not Norfolk southside tunnels. Expect freight elevators, street permits, industrial-shift peaks, and freeflow that still burns on I-64. This guide is for people moving in Newport News as Peninsula urban product — not a York or Hampton rename.',
  heroCredibility: 'Peninsula independent city · Shipyard logistics · Virginia DMV household goods · FMCSA when interstate · Curated listings',
  majorCorridors: 'I-64 · US-60 · US-17 · Jefferson Ave · Warwick Blvd · J. Clyde Morris Blvd',
  lastReviewed: '2026-07-24',
  parentCompare: {
    parentLabel: 'independent Peninsula urban (vs York County / Hampton / Norfolk)',
    parentHref: '/local-movers/virginia/york',
    title: 'Compared with independent Peninsula urban (vs York County / Hampton / Norfolk)',
    intro: 'Newport News is Peninsula urban multi-story and shipyard freeflow — not York light suburbs and not Hampton or Norfolk product alone.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail: 'York crews fight suburban freeflow. Newport News pairs ride Jefferson, Warwick, and I-64 — denser arterial peaks, still freer mid-day than Norfolk tunnel approaches on some spines.',
      },
      {
        title: 'Housing stock differences',
        detail: 'York mixes planned SFH. Newport News mixes midtown multi-story, shipyard-adjacent multi-family, and older SFH — more continuous urban Peninsula product.',
      },
      {
        title: 'Truck access, HOA & density',
        detail: 'Multi-story packets and curb permits dominate more often than pure cul-de-sac HOA days.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail: 'Local Newport News quotes often sit at secondary urban Peninsula rates for multi-story access — elevator soft costs push premiums vs York driveways.',
      },
      {
        title: 'Role difference',
        detail: 'Newport News is independent Peninsula urban shipyard product — not York or Hampton renamed.',
      }
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Newport News different',
    intro: 'Shipyard freeflow, midtown multi-story, and Peninsula arterials — not a York clone.',
    bullets: [
      {
        title: 'Shipyard and industrial freeflow rewrite timing',
        detail: 'Shift windows choke some residential pairs near industrial edges.',
      },
      {
        title: 'Midtown multi-story is first-class product',
        detail: 'Elevators, stairs, and curb permits need inventories different from pure SFH playbooks.',
      },
      {
        title: 'Distinct from Hampton urban fabric',
        detail: 'Different Peninsula city product — do not recycle Hampton-only playbooks.',
      },
      {
        title: 'Distinct from Norfolk tunnel logistics',
        detail: 'Peninsula freeflow is not southside tunnel multi-story defaults.',
      },
      VA_TIER2_REG_BULLET,
    ],
  },
  zonesHeading: 'Newport News zones: midtown multi-story, shipyard-edge residential, Denbigh north & southeast SFH',
  zonesIntro: 'Two to four sharp products under one Peninsula city label.',
  zones: [
    {
      id: 'midtown',
      name: 'Midtown multi-story & mixed stock',
      shortName: 'Midtown',
      neighborhoods: ["midtown","central neighborhoods"],
      housingTypes: 'Multi-story, multi-unit, older SFH',
      challenges: ["Stairs","Elevators","Street parking"],
      moverTips: 'Inventory floor counts; plan temporary no-parking.',
      cityKeywords: ["newport news midtown"],
    },
    {
      id: 'shipyard',
      name: 'Shipyard-edge multi-family',
      shortName: 'Shipyard edge',
      neighborhoods: ["shipyard approaches","industrial-adjacent"],
      housingTypes: 'Multi-family, apartments',
      challenges: ["Building COIs","Shift timing"],
      moverTips: 'Avoid shift peaks when possible; collect management packets.',
      cityKeywords: ["newport news shipyard"],
    },
    {
      id: 'denbigh',
      name: 'Denbigh / north corridors',
      shortName: 'Denbigh north',
      neighborhoods: ["Denbigh","northern corridors"],
      housingTypes: 'SFH, multi-family pockets',
      challenges: ["Arterial timing","HOA packets"],
      moverTips: 'Price portal-to-portal; confirm multi-family packets.',
      cityKeywords: ["denbigh"],
    },
    {
      id: 'se-sfh',
      name: 'Southeast SFH belts',
      shortName: 'Southeast SFH',
      neighborhoods: ["southeast neighborhoods"],
      housingTypes: 'SFH, townhomes',
      challenges: ["Driveway staging"],
      moverTips: 'Confirm driveway access.',
      cityKeywords: ["newport news se"],
    }
  ],
  specialized: [
    {
      id: 'shipyard-freeflow',
      title: 'Shipyard industrial freeflow',
      intro: 'Shift windows rewrite short-looking pairs.',
      bullets: ["Price portal-to-portal honestly.","Avoid peak industrial windows when possible."],
    },
    {
      id: 'midtown-access',
      title: 'Midtown multi-story access',
      intro: 'Elevators and curb permits are first-class cost drivers.',
      bullets: ["Inventory floor counts.","Temporary no-parking often beats long carries."],
    },
    {
      id: 'vs-peninsula',
      title: 'Distinct from York, Hampton, and Norfolk',
      intro: 'Urban Peninsula product differs from county suburbs and other cities.',
      bullets: ["Do not recycle York HOA-only or Norfolk tunnel-only playbooks.","Shipyard multi-story mix is the differentiator."],
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
        intro: 'Newport News families compare Newport News Public Schools feeders — verify boundaries; county Peninsula maps do not apply.',
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
            detail: 'Riverside Regional and regional Peninsula systems serve the city; map peak freeflow on Jefferson/Warwick corridors.',
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
    intro: 'Multi-story access, industrial peaks, and arterial freeflow often matter more than raw miles.',
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
    intro: 'Industrial calendars and school years reshape demand more than pure tourism peaks alone.',
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
      { label: 'independent Peninsula urban (vs York County / Hampton / Norfolk) movers (parent contrast)', href: '/local-movers/virginia/york' },
    ],
  },
});

import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeIlTier2Pack,
  IL_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/illinois/il-tier2-shared';

/**
 * sangamon â€” IL Tier 2 Wave 1
 */
export const sangamonCountyIlTier2Intelligence: CountyIntelligencePack = finalizeIlTier2Pack({
  countySlug: 'sangamon',
  hubTitle: 'Sangamon County Moving Intelligence Hub',
  eyebrow: 'Sangamon · Springfield — state capital',
  h1: 'Moving in Sangamon County: Springfield Capital Access, Government Calendars & I-55 Logistics',
  heroOpener:
    'Sangamon County is central Illinois’s state capital market — Springfield multi-story and government-corridor density, Chatham and Rochester family growth, Sherman edges, and freeflow on I-55 / I-72 that is not Bloomington twin-city insurance product or Champaign UIUC cycles with different labels. Expect session-week demand, medical corridors, and discontinuous outer towns under one county. This guide is for people moving in Sangamon as independent capital — not generic central IL boilerplate.',
  heroCredibility:
    'Springfield capital · Government calendars · I-55 / I-72 · ICC household goods · FMCSA when interstate · Curated listings',
  majorCorridors: 'I-55 · I-72 · IL-4 · Clear Lake Ave · Wabash Ave · Dirksen Parkway',
  lastReviewed: '2026-07-25',
  parentCompare: {
    parentLabel: 'independent capital (nearest hubs: McLean / Peoria)',
    parentHref: '/local-movers/illinois/mclean',
    title: 'Compared with independent capital (nearest hubs: McLean / Peoria)',
    intro:
      'Sangamon is Springfield capital government/residential product — not Bloomington–Normal twin-city density and not Peoria medical/industrial river product alone.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'Twin-city and river-hub crews fight their own arterial peaks. Sangamon pairs ride I-55, I-72, and Clear Lake corridors — freer mid-day capital freeflow, still peak-heavy on session weeks and medical corridors.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'McLean mixes professional multi-unit and ISU multi-family. Sangamon mixes capital multi-story, West Side SFH, and Chatham HOA — more continuous government-city product, less continuous twin-city university density.',
      },
      {
        title: 'Truck access & density',
        detail:
          'Downtown walk-ups need curb plans; medical multi-family needs COIs; Chatham HOAs add packets.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local Sangamon quotes often track capital secondary rates for multi-story access — session peaks push prices above quiet township driveway jobs.',
      },
      {
        title: 'Role difference',
        detail:
          'Sangamon is independent Springfield capital — not twin-city or river-hub product renamed.',
      }
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Sangamon County different',
    intro: 'Government calendars, capital multi-story, and I-55 freeflow — not interchangeable twin-city or university boilerplate.',
    bullets: [
      {
        title: 'State government calendars reshape mid-week demand',
        detail:
          'Legislative session weeks and agency start dates create hard windows that compete with Saturday family demand.',
      },
      {
        title: 'Springfield multi-story is first-class product',
        detail:
          'Walk-ups and medical multi-family need inventories different from pure Chatham cul-de-sacs.',
      },
      {
        title: 'I-55 / I-72 freeflow is still billable',
        detail:
          'Capital pairs freer mid-day still peak hard. Ask portal-to-portal.',
      },
      {
        title: 'Chatham / Rochester growth differs from pure capital core',
        detail:
          'HOA packets rewrite downtown day-rate assumptions.',
      },
      IL_TIER2_REG_BULLET,
    ],
  },
  zonesHeading: 'Sangamon zones: capital multi-story, medical corridors, Chatham/Rochester growth & outer edges',
  zonesIntro: 'Two to four sharp products — capital multi-story, medical multi-family, growth HOAs, and outer edges.',
  zones: [
    {
      id: 'capital-core',
      name: 'Springfield capital multi-story',
      shortName: 'Capital core',
      neighborhoods: ["Downtown Springfield","near-capital multi-family"],
      housingTypes: 'Multi-story, multi-unit, older SFH',
      challenges: ["Stairs","Street parking","Session peaks"],
      moverTips: 'Inventory stairs; avoid peak session-week curb when possible.',
      cityKeywords: ["springfield capital"],
    },
    {
      id: 'medical',
      name: 'Medical multi-family corridors',
      shortName: 'Medical corridors',
      neighborhoods: ["medical multi-family","Clear Lake edges"],
      housingTypes: 'Multi-family, apartments, townhomes',
      challenges: ["Elevators","COI packets","Shift windows"],
      moverTips: 'Confirm elevator reservations; allow flexible start times.',
      cityKeywords: ["springfield medical"],
    },
    {
      id: 'chatham-rochester',
      name: 'Chatham / Rochester growth HOA',
      shortName: 'Growth HOA',
      neighborhoods: ["Chatham","Rochester","growth villages"],
      housingTypes: 'HOA SFH, townhomes, multi-family',
      challenges: ["HOA packets","I-55 freeflow"],
      moverTips: 'Collect HOA COIs; prefer early starts.',
      cityKeywords: ["chatham","rochester il"],
    },
    {
      id: 'outer-edges',
      name: 'Sherman / outer edges & rural lots',
      shortName: 'Outer edges',
      neighborhoods: ["Sherman","Riverton edges","rural tracts"],
      housingTypes: 'SFH, rural approaches',
      challenges: ["Empty miles","Soft shoulders"],
      moverTips: 'Survey approaches; prefer early starts for long pairs.',
      cityKeywords: ["sherman","riverton"],
    }
  ],
  specialized: [
    {
      id: 'gov-calendars',
      title: 'State government calendar module',
      intro: 'Session weeks reshape mid-week demand.',
      bullets: ["Align surveys with agency start dates when possible.","Do not quote pure Saturday HOA rates for capital-core jobs."],
    },
    {
      id: 'capital-multi',
      title: 'Springfield multi-story access',
      intro: 'Walk-ups and elevators are first-class cost drivers.',
      bullets: ["Inventory floor counts and curb width.","Temporary no-parking often beats long carries."],
    },
    {
      id: 'i55-capital',
      title: 'I-55 / I-72 capital freeflow',
      intro: 'Capital pairs still peak hard on arterials.',
      bullets: ["Price portal-to-portal honestly.","Clarify McLean or Peoria second addresses for long empty-mile assumptions."],
    }
  ],
  relocation: {
    title: 'Schools & hospitals for relocators',
    intro:
      'Compressed secondary-market notes â€” primary districts and acute-care access that affect move-in.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & education',
        intro: 'Sangamon families compare Springfield, Ball-Chatham, Rochester, and related district feeders — verify address boundaries.',
        bullets: [
          {
            title: 'District-first shopping',
            detail:
              'Use ISBE data and district maps; do not assume a city name equals one feeder pattern.',
          },
          {
            title: 'Capacity & calendars',
            detail:
              'Growth pockets, university towns, and military markets can tighten housing near school and term calendars.',
          },
        ],
      },
      {
        id: 'hospitals',
        title: 'Hospitals & healthcare',
        bullets: [
          {
            title: 'Acute-care anchors',
            detail: 'Memorial Health, HSHS St. John’s, and related campuses anchor acute care; map peak capital and Clear Lake times for ER access.',
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
    intro: 'Session peaks, multi-story access, and I-55 freeflow often matter more than raw miles.',
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
      { label: 'Studio / 1-BR', value: '$450â€“$1,200+' },
      { label: '3â€“4 BR home', value: '$1,600â€“$4,200+', note: 'Higher with access friction' },
      { label: '2-person crew', value: '$115â€“$185+/hr' },
    ],
  },
  seasonal: {
    title: 'Seasonal & calendar notes',
    intro: 'Legislative calendars, school years, and winter ice reshape demand more than pure university patterns.',
    items: [
      {
        title: 'Late spring â€“ early fall',
        detail: 'Family closings and peak calendars fill Saturday crews first.',
      },
      {
        title: 'Institutional & weather windows',
        detail:
          'School, university, PCS, tourism, or storm seasons can outrank pure weekend preference.',
      },
    ],
  },
  resources: {
    title: 'Useful resources',
    intro:
      'Official links first; directory listings are independent. Verify Illinois Commerce Commission (ICC) household goods authority for in-state Illinois moves and FMCSA for interstate legs.',
    items: [
      {
        label: 'independent capital (nearest hubs: McLean / Peoria) movers (parent contrast)',
        href: '/local-movers/illinois/mclean',
      },
      {
        label: 'Peoria County movers',
        href: '/local-movers/illinois/peoria',
      },
    ],
  },
});

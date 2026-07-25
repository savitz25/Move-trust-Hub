import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeNyTier2Pack,
  NY_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/new-york/ny-tier2-shared';

/**
 * ulster — NY Tier 2 Wave 1
 */
export const ulsterCountyTier2Intelligence: CountyIntelligencePack = finalizeNyTier2Pack({
  countySlug: 'ulster',
  hubTitle: 'Ulster County Moving Intelligence Hub',
  eyebrow: 'Ulster · Kingston / New Paltz · Hudson Valley west',
  h1: 'Moving in Ulster County: Kingston, New Paltz College Town & Catskills Edge',
  heroOpener:
    'Ulster County is Hudson Valley west — Kingston multi-story and river-city stock, New Paltz college-town density, Saugerties and Woodstock tourism edges, and Catskills last-mile that rejects full trailers. It is not Orange Thruway retail corridors and not Dutchess east-bank rail villages alone: expect college calendars, tourism peaks, and mountain approaches under one county label. This guide is for people moving in Ulster as Hudson Valley west product — not a recycled Orange or Dutchess pack.',
  heroCredibility:
    'Hudson Valley west · College town + tourism · Catskills edge · NYSDOT household goods · FMCSA when interstate · Curated listings',
  majorCorridors: 'I-87 · NY-28 · NY-32 · NY-9W · NY-299 · NY-212',
  parentCompare: {
    parentLabel: 'Orange County',
    parentHref: '/local-movers/new-york/orange',
    title: 'Compared with Orange County',
    intro:
      'Ulster is Hudson Valley west with college-town and Catskills-edge product — not Orange I-87 retail freeflow and not Dutchess east-bank rail villages alone.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'Orange crews fight Thruway outer-collar peaks. Ulster pairs ride I-87, NY-28, NY-32, and NY-9W — freer mid-day on some spines, still peak-heavy toward Kingston arterials and New Paltz term weekends.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'Orange mixes Newburgh city stock and Woodbury growth. Ulster mixes Kingston multi-story, New Paltz multi-family, and mountain cottages — more tourism/college product, less outlet-corridor suburban density.',
      },
      {
        title: 'Truck access & density',
        detail:
          'Mountain and village approaches often need smaller trucks; college multi-family needs COI packets uncommon on pure rural jobs.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local Ulster quotes often track secondary Hudson Valley rates — mountain shuttles and tourism peaks can price above quiet Orange driveway jobs.',
      },
      {
        title: 'Role difference',
        detail:
          'Ulster is Hudson Valley west college + Catskills edge — not Orange outer NYC collar renamed.',
      }
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Ulster County different',
    intro: 'College calendars, tourism peaks, and mountain last-mile — not interchangeable Orange boilerplate.',
    bullets: [
      {
        title: 'New Paltz term calendars drive demand spikes',
        detail:
          'Lease clusters fill local crews around term start/end — not only family Saturdays.',
      },
      {
        title: 'Catskills last-mile rejects full trailers',
        detail:
          'Narrow approaches and soft ground are first-class failure modes.',
      },
      {
        title: 'Kingston multi-story is first-class product',
        detail:
          'City stairs and street parking need inventories different from pure rural playbooks.',
      },
      {
        title: 'Tourism peaks rewrite weekends',
        detail:
          'Saugerties/Woodstock corridors need early staging plans in peak season.',
      },
      NY_TIER2_REG_BULLET,
    ],
  },
  zonesHeading: 'Ulster zones: Kingston core, New Paltz college town, tourism edges & Catskills last-mile',
  zonesIntro: 'Two to four sharp products — river city, college town, tourism edges, and mountain approaches.',
  zones: [
    {
      id: 'kingston-core',
      name: 'Kingston city core',
      shortName: 'Kingston',
      neighborhoods: ["Kingston","Uptown","Midtown","Rondout edges"],
      housingTypes: 'Multi-story, multi-unit, older SFH',
      challenges: ["Stairs","Street parking","Mixed stock"],
      moverTips: 'Inventory stairs; plan temporary no-parking.',
      cityKeywords: ["kingston","rondout"],
    },
    {
      id: 'new-paltz',
      name: 'New Paltz college town',
      shortName: 'New Paltz',
      neighborhoods: ["New Paltz","campus edges"],
      housingTypes: 'Multi-family, SFH, student stock',
      challenges: ["Lease clusters","Tight streets","Building packets"],
      moverTips: 'Book early around term calendars; collect management rules.',
      cityKeywords: ["new paltz"],
    },
    {
      id: 'tourism-edges',
      name: 'Saugerties / Woodstock tourism edges',
      shortName: 'Tourism edges',
      neighborhoods: ["Saugerties","Woodstock","Phoenicia edges"],
      housingTypes: 'SFH, cottages, some multi-story',
      challenges: ["Tourism parking","Narrow roads"],
      moverTips: 'Avoid peak weekend tourism windows when possible.',
      cityKeywords: ["saugerties","woodstock","phoenicia"],
    },
    {
      id: 'catskills-last-mile',
      name: 'Catskills last-mile & larger lots',
      shortName: 'Catskills edge',
      neighborhoods: ["Shandaken","Olive","Denning edges","mountain roads"],
      housingTypes: 'Cottages, larger lots, steep approaches',
      challenges: ["Narrow roads","Soft shoulders","Winter ice"],
      moverTips: 'Photo approaches; discuss shuttle trucks early.',
      cityKeywords: ["shandaken","olive","denning"],
    }
  ],
  specialized: [
    {
      id: 'college-turnover',
      title: 'College-town turnover module',
      intro: 'New Paltz calendars create lease clusters.',
      bullets: ["Book early around term start/end weekends.","Expect short-notice multi-family demand spikes."],
    },
    {
      id: 'catskills-access',
      title: 'Catskills last-mile access',
      intro: 'Mountain approaches reject full trailers.',
      bullets: ["Photo the final approach before promising truck length.","Soft ground after rain can block heavy equipment."],
    },
    {
      id: 'tourism-staging',
      title: 'Tourism-weekend staging',
      intro: 'Saugerties/Woodstock corridors change parking reality.',
      bullets: ["Prefer midweek starts in peak tourism season.","Temporary no-parking often required near village cores."],
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
        intro: 'Ulster families compare Kingston, New Paltz, Saugerties, Onteora, and other districts — verify boundaries.',
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
            detail: 'HealthAlliance / Westchester Medical network campuses and related care serve the region; map peak freeflow for ER access.',
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
    intro: 'College peaks, mountain shuttles, and tourism windows often matter more than raw miles.',
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
    intro: 'Term calendars, tourism summers, and winter mountain ice reshape demand by pocket.',
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
        label: 'Orange County movers (parent contrast)',
        href: '/local-movers/new-york/orange',
      },
      {
        label: 'Dutchess County movers',
        href: '/local-movers/new-york/dutchess',
      },
    ],
  },
});

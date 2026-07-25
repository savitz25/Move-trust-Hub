import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeNyTier2Pack,
  NY_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/new-york/ny-tier2-shared';

/**
 * chautauqua — NY Tier 2 Wave 2
 */
export const chautauquaCountyTier2Intelligence: CountyIntelligencePack = finalizeNyTier2Pack({
  countySlug: 'chautauqua',
  hubTitle: 'Chautauqua County Moving Intelligence Hub',
  eyebrow: 'Chautauqua · Jamestown western NY · vs Erie',
  h1: 'Moving in Chautauqua County: Jamestown, Lake Corridor & Western NY Access',
  heroOpener:
    'Chautauqua County is western New York south of Buffalo — Jamestown multi-story and seat density, Dunkirk and Fredonia lake/college edges, Chautauqua Institution seasonal product, and I-86 / NY-60 freeflow that is not an Erie County rename. Expect longer empty miles from Buffalo cores, lake-effect winter access, and tourism calendars that rewrite village staging. This guide is for people moving in Chautauqua as Jamestown western NY product — not Buffalo suburbs with different labels.',
  heroCredibility:
    'Jamestown western NY · Lake corridor · I-86 freeflow · NYSDOT household goods · FMCSA when interstate · Curated listings',
  majorCorridors: 'I-86 · I-90 (north edge) · NY-60 · NY-5 · NY-394 · NY-430',
  parentCompare: {
    parentLabel: 'Erie County',
    parentHref: '/local-movers/new-york/erie',
    title: 'Compared with Erie County',
    intro:
      'Chautauqua is Jamestown / lake-corridor western NY — not Buffalo multi-story cores and not Amherst suburban freeflow alone.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'Erie crews fight Buffalo peaks and I-90/I-190 city approaches. Chautauqua pairs ride I-86, NY-60, and lake corridors — freer mid-day southern freeflow, still peak-heavy on Jamestown arterials and seasonal institution weekends.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'Erie mixes Buffalo multi-story and first-ring suburbs. Chautauqua mixes Jamestown multi-story, Fredonia college stock, Dunkirk lake edges, and rural lots — more continuous secondary-city product, less Buffalo elevator density.',
      },
      {
        title: 'Truck access & density',
        detail:
          'Jamestown hills and older multi-story need stair inventories; lake and institution villages often need smaller trucks and seasonal curb plans.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local Chautauqua quotes often sit below Buffalo core rates for simple SFH — empty miles from regional crews and winter access still push premiums.',
      },
      {
        title: 'Role difference',
        detail:
          'Chautauqua is western NY secondary hub and lake corridor — not Erie Buffalo metro renamed.',
      }
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Chautauqua County different',
    intro: 'Jamestown density, lake-effect winter, and seasonal institution calendars — not a Buffalo clone.',
    bullets: [
      {
        title: 'Jamestown multi-story is first-class product',
        detail:
          'Stairs and grades need inventories different from pure rural driveway playbooks.',
      },
      {
        title: 'Lake-effect winter rewrites schedules',
        detail:
          'I-86 and lake approaches need ice-aware morning plans more often than southern counties.',
      },
      {
        title: 'Institution / tourism peaks tighten village staging',
        detail:
          'Summer Chautauqua Institution and lake weekends change curb plans — book early.',
      },
      {
        title: 'PA and OH adjacency create interstate legs',
        detail:
          'Short-looking border hops still need FMCSA authority.',
      },
      NY_TIER2_REG_BULLET,
    ],
  },
  zonesHeading: 'Chautauqua zones: Jamestown core, Dunkirk/Fredonia lake edge, Chautauqua Institution & rural south',
  zonesIntro: 'Two to four sharp products — city, lake college edge, seasonal institution, and rural lots.',
  zones: [
    {
      id: 'jamestown-core',
      name: 'Jamestown city core',
      shortName: 'Jamestown',
      neighborhoods: ["Jamestown","downtown","city neighborhoods"],
      housingTypes: 'Multi-story, multi-unit, older SFH',
      challenges: ["Stairs","Hills","Street parking"],
      moverTips: 'Inventory stairs and grades; plan temporary no-parking.',
      cityKeywords: ["jamestown"],
    },
    {
      id: 'dunkirk-fredonia',
      name: 'Dunkirk / Fredonia lake & college edge',
      shortName: 'Dunkirk / Fredonia',
      neighborhoods: ["Dunkirk","Fredonia","lake approaches"],
      housingTypes: 'SFH, college multi-family, lake stock',
      challenges: ["Term calendars","Lake wind/ice","Street width"],
      moverTips: 'Book early around college calendars; photo lake approaches in winter.',
      cityKeywords: ["dunkirk","fredonia"],
    },
    {
      id: 'chautauqua-inst',
      name: 'Chautauqua Institution & lake villages',
      shortName: 'Institution / lake villages',
      neighborhoods: ["Chautauqua","Mayville edges","lake villages"],
      housingTypes: 'Seasonal homes, cottages, village SFH',
      challenges: ["Seasonal access","Tourism parking","Narrow streets"],
      moverTips: 'Plan summer curb carefully; off-season may freer but colder.',
      cityKeywords: ["chautauqua","mayville"],
    },
    {
      id: 'rural-south',
      name: 'Rural south & larger lots',
      shortName: 'Rural edges',
      neighborhoods: ["Clymer edges","Sherman","southern towns"],
      housingTypes: 'Larger lots, rural approaches',
      challenges: ["Empty miles","Winter ice"],
      moverTips: 'Photo last-mile; allow winter buffer.',
      cityKeywords: ["clymer","sherman"],
    }
  ],
  specialized: [
    {
      id: 'jamestown-city',
      title: 'Jamestown multi-story & hills',
      intro: 'City stairs and grades are first-class cost drivers.',
      bullets: ["Inventory floor counts and approaches.","Temporary no-parking often beats long carries."],
    },
    {
      id: 'lake-college',
      title: 'Fredonia college & Dunkirk lake edge',
      intro: 'Term calendars and lake weather rewrite local pairs.',
      bullets: ["Book early around term start/end.","Winter lake approaches need flexible mornings."],
    },
    {
      id: 'seasonal-institution',
      title: 'Chautauqua Institution seasonal product',
      intro: 'Summer tourism changes village staging.',
      bullets: ["Confirm curb and access rules for seasonal properties.","Do not price as pure Jamestown driveway days."],
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
        intro: 'Chautauqua families compare Jamestown, Dunkirk, Fredonia, Southwestern, and other districts — verify boundaries; lake and rural feeders differ.',
        bullets: [
          {
            title: 'District-first shopping',
            detail:
              'Use NYSED data and district maps; do not assume a village name equals one feeder pattern.',
          },
          {
            title: 'Capacity & calendars',
            detail:
              'Growth pockets, college towns, and seasonal markets can tighten housing near school calendars.',
          },
        ],
      },
      {
        id: 'hospitals',
        title: 'Hospitals & healthcare',
        bullets: [
          {
            title: 'Acute-care anchors',
            detail: 'UPMC Chautauqua and regional campuses anchor acute care; map peak freeflow across Jamestown–lake corridors.',
          },
          {
            title: 'Peak drive times',
            detail:
              'Map ER access at commute peaks and weather days, not only off-hour freeflow.',
          },
        ],
      },
    ],
  },
  costDrivers: {
    title: 'Pricing & cost drivers',
    intro: 'City access, lake winter, and seasonal peaks often matter more than raw miles.',
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
        detail: 'Far pockets price differently from seat cores.',
      },
    ],
    ranges: [
      { label: 'Studio / 1-BR', value: '$450–$1,100+' },
      {
        label: '3–4 BR home',
        value: '$1,600–$4,000+',
        note: 'Higher with access friction',
      },
      { label: '2-person crew', value: '$115–$180+/hr' },
    ],
  },
  seasonal: {
    title: 'Seasonal & calendar notes',
    intro: 'Lake-effect winter, institution summers, and college calendars reshape demand more than Buffalo office peaks alone.',
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
        label: 'Erie County movers (parent contrast)',
        href: '/local-movers/new-york/erie',
      },
    ],
  },
});

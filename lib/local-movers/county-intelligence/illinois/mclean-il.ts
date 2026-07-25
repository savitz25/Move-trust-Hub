import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeIlTier2Pack,
  IL_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/illinois/il-tier2-shared';

/**
 * mclean â€” IL Tier 2 Wave 1
 */
export const mcleanCountyIlTier2Intelligence: CountyIntelligencePack = finalizeIlTier2Pack({
  countySlug: 'mclean',
  hubTitle: 'McLean County Moving Intelligence Hub',
  eyebrow: 'McLean · Bloomington–Normal — twin cities / I-55',
  h1: 'Moving in McLean County: Bloomington–Normal, Twin-City Access & I-55 / I-74 Logistics',
  heroOpener:
    'McLean County is central Illinois’s insurance and university twin-city market — Bloomington multi-story and professional stock, Normal multi-family and ISU-adjacent density, and freeflow on I-55 / I-74 that is not Springfield capital product or Champaign UIUC cycles with different labels. Expect twin-city empty miles, corporate calendars, and discontinuous outer towns under one county. This guide is for people moving in McLean as independent twin-city hub — not generic central IL boilerplate.',
  heroCredibility:
    'Bloomington–Normal twin cities · Insurance/university · I-55 / I-74 · ICC household goods · FMCSA when interstate · Curated listings',
  majorCorridors: 'I-55 · I-74 · I-39 · US-51 · Veterans Pkwy · College Avenue corridor',
  lastReviewed: '2026-07-25',
  parentCompare: {
    parentLabel: 'independent central Illinois (nearest hubs: Sangamon / Champaign)',
    parentHref: '/local-movers/illinois/sangamon',
    title: 'Compared with independent central Illinois (nearest hubs: Sangamon / Champaign)',
    intro:
      'McLean is Bloomington–Normal insurance/university twin-city product — not Springfield capital density and not Champaign UIUC campus cycles alone.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'Springfield crews fight capital arterials and I-55 session peaks. McLean pairs ride I-55, I-74, and Veterans Parkway — freer mid-day twin-city freeflow, still peak-heavy on Normal university windows and Bloomington professional corridors.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'Springfield mixes capital multi-story and Chatham HOAs. McLean mixes Bloomington professional multi-unit, Normal student multi-family, and twin-city HOA growth — more continuous twin-city product, less continuous capital session density.',
      },
      {
        title: 'Truck access & density',
        detail:
          'Campus multi-family needs COIs; professional multi-story needs curb plans; outer towns add empty miles.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local McLean quotes often track twin-city secondary-premium rates for multi-family access — term and corporate peaks push prices above quiet rural lots.',
      },
      {
        title: 'Role difference',
        detail:
          'McLean is independent Bloomington–Normal twin-city hub — not capital or UIUC product renamed.',
      }
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Mclean County different',
    intro: 'Twin-city freeflow, ISU term calendars, and insurance/professional multi-family — not interchangeable capital or Champaign boilerplate.',
    bullets: [
      {
        title: 'ISU and academic calendars drive Normal demand spikes',
        detail:
          'Move-in/out weekends fill crews near campus. Book early.',
      },
      {
        title: 'Bloomington professional multi-story is first-class product',
        detail:
          'Elevators and curb plans need inventories different from pure SFH lots.',
      },
      {
        title: 'I-55 / I-74 freeflow is still billable',
        detail:
          'Twin-city and long central IL pairs freer mid-day still peak hard. Ask portal-to-portal.',
      },
      {
        title: 'Twin-city empty miles rewrite single-core rates',
        detail:
          'Bloomington ↔ Normal pairs fail when crews assume continuous single-city density.',
      },
      IL_TIER2_REG_BULLET,
    ],
  },
  zonesHeading: 'McLean zones: Bloomington core, Normal campus edge, twin-city HOA growth & outer towns',
  zonesIntro: 'Two to four sharp products — professional multi-story, campus multi-family, HOA growth, and outer towns.',
  zones: [
    {
      id: 'bloomington',
      name: 'Bloomington multi-story & professional stock',
      shortName: 'Bloomington',
      neighborhoods: ["Bloomington","downtown edges","professional multi-family"],
      housingTypes: 'Multi-story, multi-unit, older SFH',
      challenges: ["Stairs/elevators","Street parking","I-55 freeflow"],
      moverTips: 'Inventory access type; plan temporary no-parking.',
      cityKeywords: ["bloomington"],
    },
    {
      id: 'normal-campus',
      name: 'Normal / ISU campus-edge multi-family',
      shortName: 'Normal campus',
      neighborhoods: ["Normal","campus multi-family","student stock"],
      housingTypes: 'Multi-family, apartments, some SFH',
      challenges: ["Term parking","COI packets","Elevators"],
      moverTips: 'Book around term calendars; collect building rules.',
      cityKeywords: ["normal","illinois state"],
    },
    {
      id: 'twin-hoa',
      name: 'Twin-city HOA growth edges',
      shortName: 'HOA growth',
      neighborhoods: ["growth villages","Veterans Pkwy edges"],
      housingTypes: 'HOA SFH, townhomes, multi-family',
      challenges: ["HOA packets","Arterial freeflow"],
      moverTips: 'Collect HOA COIs; prefer early starts.',
      cityKeywords: ["bloomington normal hoa"],
    },
    {
      id: 'outer-towns',
      name: 'Outer McLean towns & rural lots',
      shortName: 'Outer towns',
      neighborhoods: ["Heyworth edges","Lexington edges","rural tracts"],
      housingTypes: 'SFH, rural approaches',
      challenges: ["Empty miles","Soft shoulders"],
      moverTips: 'Survey approaches; prefer early starts for long pairs.',
      cityKeywords: ["heyworth","lexington il"],
    }
  ],
  specialized: [
    {
      id: 'twin-city',
      title: 'Bloomington–Normal twin-city freeflow',
      intro: 'Twin-city pairs still peak hard on arterials.',
      bullets: ["Price portal-to-portal honestly between cores.","Do not quote single-city day rates for cross-town pairs."],
    },
    {
      id: 'isu-terms',
      title: 'ISU / university move-cycle module',
      intro: 'Term calendars drive Normal demand spikes.',
      bullets: ["Book early around move-in/out weekends.","Price campus-edge curb time honestly."],
    },
    {
      id: 'professional-multi',
      title: 'Bloomington professional multi-story',
      intro: 'Elevators and curb plans are first-class cost drivers.',
      bullets: ["Collect COI and elevator reservations early.","Temporary no-parking often beats long carries."],
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
        intro: 'McLean families compare Unit 5, District 87, and related district feeders across Bloomington–Normal — verify address boundaries.',
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
            detail: 'Carle BroMenn, OSF St. Joseph, and related campuses anchor acute care; map peak twin-city arterial times for ER access.',
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
    intro: 'Twin-city freeflow, multi-family access, and term peaks often matter more than raw miles.',
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
    intro: 'University calendars, corporate onboarding, school years, and winter ice reshape demand by pocket.',
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
        label: 'independent central Illinois (nearest hubs: Sangamon / Champaign) movers (parent contrast)',
        href: '/local-movers/illinois/sangamon',
      },
      {
        label: 'Champaign County movers',
        href: '/local-movers/illinois/champaign',
      },
    ],
  },
});

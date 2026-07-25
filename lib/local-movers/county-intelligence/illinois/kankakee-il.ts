import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeIlTier2Pack,
  IL_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/illinois/il-tier2-shared';

/**
 * kankakee â€” IL Tier 2 Wave 1
 */
export const kankakeeCountyIlTier2Intelligence: CountyIntelligencePack = finalizeIlTier2Pack({
  countySlug: 'kankakee',
  hubTitle: 'Kankakee County Moving Intelligence Hub',
  eyebrow: 'Kankakee · Kankakee / Bradley — south of Will',
  h1: 'Moving in Kankakee County: Kankakee, Bradley & I-57 South Regional Access',
  heroOpener:
    'Kankakee County is I-57 south regional product — Kankakee multi-story and seat stock, Bradley multi-family, Bourbonnais edges, and freeflow that is not Will continuous south-collar suburb with different labels. Expect river-city stairs, regional empty miles, and medical/industrial calendars under one county. This guide is for people moving in Kankakee as I-57 south regional hub — not a south-Cook or Will rename.',
  heroCredibility:
    'I-57 south regional · Kankakee / Bradley · River-city access · ICC household goods · FMCSA when interstate · Curated listings',
  majorCorridors: 'I-57 · US-45 · US-52 · IL-17 · IL-50 · IL-113',
  lastReviewed: '2026-07-25',
  parentCompare: {
    parentLabel: 'Will County',
    parentHref: '/local-movers/illinois/will',
    title: 'Compared with Will County',
    intro:
      'Kankakee is I-57 south regional river-city product — not Will continuous HOA growth and not pure rural prairie freeflow.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'Will crews fight I-55/I-80 south-collar peaks. Kankakee pairs ride I-57, US-45, and IL-50 — freer mid-day further south, still peak-heavy on Kankakee arterials and Bradley multi-family corridors.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'Will mixes Joliet multi-story and south-collar HOAs. Kankakee mixes seat multi-story, Bradley multi-unit, and Bourbonnais SFH — more discontinuous regional product, less continuous Will growth density.',
      },
      {
        title: 'Truck access & density',
        detail:
          'Seat multi-story needs curb plans; multi-family elevators appear on Bradley corridors; rural edges add soft shoulders.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local Kankakee quotes often sit at I-57 secondary rates for driveway SFH — multi-story access and long empty-mile pairs still push prices up.',
      },
      {
        title: 'Role difference',
        detail:
          'Kankakee is I-57 south regional hub — not Will or south-Cook product renamed.',
      }
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Kankakee County different',
    intro: 'I-57 freeflow, river-city multi-story, and Bradley multi-family — not interchangeable Will boilerplate.',
    bullets: [
      {
        title: 'I-57 freeflow is still billable',
        detail:
          'Kankakee ↔ Will pairs freer mid-day still peak hard. Ask portal-to-portal.',
      },
      {
        title: 'Kankakee multi-story is first-class product',
        detail:
          'Seat stairs need inventories different from Bourbonnais cul-de-sacs.',
      },
      {
        title: 'Bradley multi-family differs from pure SFH lots',
        detail:
          'Elevators and parking plans rewrite day-rate assumptions.',
      },
      {
        title: 'Regional empty miles rewrite continuous-suburb rates',
        detail:
          'Far edges fail when crews assume Will collar density.',
      },
      IL_TIER2_REG_BULLET,
    ],
  },
  zonesHeading: 'Kankakee zones: Kankakee seat, Bradley multi-family, Bourbonnais edges & rural lots',
  zonesIntro: 'Two to four sharp products — seat multi-story, multi-family corridor, growth edges, and rural lots.',
  zones: [
    {
      id: 'kankakee-seat',
      name: 'Kankakee multi-story & river-city stock',
      shortName: 'Kankakee',
      neighborhoods: ["Kankakee","downtown edges","seat multi-family"],
      housingTypes: 'Multi-story, multi-unit, older SFH',
      challenges: ["Stairs","Street parking","I-57 freeflow"],
      moverTips: 'Inventory stairs; plan temporary no-parking.',
      cityKeywords: ["kankakee"],
    },
    {
      id: 'bradley',
      name: 'Bradley multi-family corridors',
      shortName: 'Bradley',
      neighborhoods: ["Bradley","multi-family corridors"],
      housingTypes: 'Multi-family, apartments, townhomes',
      challenges: ["Elevators","Parking limits","Lease clusters"],
      moverTips: 'Confirm elevator rules; collect building packets.',
      cityKeywords: ["bradley"],
    },
    {
      id: 'bourbonnais',
      name: 'Bourbonnais / growth edges',
      shortName: 'Bourbonnais',
      neighborhoods: ["Bourbonnais","growth SFH","college edges"],
      housingTypes: 'SFH, multi-family, mixed stock',
      challenges: ["HOA packets","Arterial timing"],
      moverTips: 'Collect HOA docs where applicable; prefer early starts.',
      cityKeywords: ["bourbonnais"],
    },
    {
      id: 'rural-lots',
      name: 'Southern & eastern rural lots',
      shortName: 'Rural lots',
      neighborhoods: ["Manteno edges","southern tracts"],
      housingTypes: 'Larger lots, rural approaches',
      challenges: ["Empty miles","Soft shoulders"],
      moverTips: 'Photo approaches; prefer early starts for long pairs.',
      cityKeywords: ["manteno","south kankakee"],
    }
  ],
  specialized: [
    {
      id: 'i57-south',
      title: 'I-57 south regional freeflow',
      intro: 'South pairs still peak hard toward Will.',
      bullets: ["Price portal-to-portal honestly.","Clarify Will second addresses early."],
    },
    {
      id: 'seat-multi',
      title: 'Kankakee river-city multi-story',
      intro: 'Seat stairs are a first-class cost driver.',
      bullets: ["Inventory floor counts before comparing hourly rates.","Temporary no-parking often beats long carries."],
    },
    {
      id: 'bradley-multi',
      title: 'Bradley multi-family access',
      intro: 'Elevators and parking are first-class cost drivers.',
      bullets: ["Collect COI and elevator reservations early.","Lease clusters stack around month-end."],
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
        intro: 'Kankakee families compare Kankakee, Bradley, Bourbonnais, Manteno, and related district feeders — verify address boundaries.',
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
            detail: 'Riverside Medical Center / Ascendium and Joliet specialty spillover serve the county; map peak I-57 times for ER access.',
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
    intro: 'I-57 freeflow, multi-story access, and multi-family soft costs often matter more than raw miles.',
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
    intro: 'School years, lease ends, and winter ice reshape demand by pocket.',
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
        label: 'Will County movers (parent contrast)',
        href: '/local-movers/illinois/will',
      },

    ],
  },
});

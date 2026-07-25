import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeNyTier2Pack,
  NY_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/new-york/ny-tier2-shared';

/**
 * orange — NY Tier 2 Wave 1
 */
export const orangeCountyTier2Intelligence: CountyIntelligencePack = finalizeNyTier2Pack({
  countySlug: 'orange',
  hubTitle: 'Orange County Moving Intelligence Hub',
  eyebrow: 'Orange · Hudson Valley · Newburgh / Middletown / Woodbury',
  h1: 'Moving in Orange County: Newburgh, Middletown & I-87/I-84 Outer NYC Collar',
  heroOpener:
    'Orange County is the Hudson Valley outer NYC collar — Newburgh river-city stock, Middletown inland multi-family and SFH, Woodbury retail-corridor growth, Warwick and Goshen larger lots, and I-87 / I-84 freeflow that still peaks hard toward the Thruway. It is not Westchester hill estates and not Rockland multi-family density with different labels: expect longer empty miles, warehouse-adjacent arterials, and village cores that stage differently from south-county elevators. This guide is for people moving in Orange as an outer commuting-belt market — not a recycled Westchester or Rockland script.',
  heroCredibility:
    'Outer NYC collar · I-87 / I-84 freeflow · Mixed city & inland stock · NYSDOT household goods · FMCSA when interstate · Curated listings',
  majorCorridors: 'I-87 · I-84 · NY-17 · NY-211 · NY-32 · NY-208',
  parentCompare: {
    parentLabel: 'Westchester County',
    parentHref: '/local-movers/new-york/westchester',
    title: 'Compared with Westchester County',
    intro:
      'Orange is the outer Hudson Valley commuting belt on I-87/I-84 — longer freeflow, mixed city and inland product — not Westchester Sound Shore co-ops or Rockland bridge-dense multi-family alone.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'Westchester crews fight Hutchinson, Saw Mill, and I-287 hills. Orange pairs ride I-87, I-84, NY-17, and Woodbury retail corridors — freer mid-day than south Westchester choke points, still peak-heavy toward the Thruway and I-84. Portal-to-portal time is real; it is not a Yonkers elevator day.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'Westchester mixes south-county elevators and north-county estates. Orange mixes Newburgh multi-story, Middletown multi-family, Woodbury growth SFH, and western larger lots — more inland empty miles, less continuous Sound Shore village product.',
      },
      {
        title: 'Truck access & density',
        detail:
          'Westchester north often means long estate driveways. Orange city cores need curb plans and stair inventories; retail-corridor suburbs add HOA and arterial timing uncommon on pure estate jobs.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local Orange quotes often sit near or slightly below dense south-Westchester rates for driveway SFH — Thruway peaks, multi-family elevators, and long empty-mile west pairs still push prices up.',
      },
      {
        title: 'Role difference',
        detail:
          'Orange is the outer NYC commuting belt and Hudson Valley mid-market — not Westchester dual north–south product and not Rockland bridge multi-family density alone.',
      }
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Orange County different',
    intro: 'Thruway freeflow, mixed city inventory, and retail-corridor peaks — not interchangeable Westchester boilerplate.',
    bullets: [
      {
        title: 'I-87 / I-84 peaks rewrite short locals',
        detail:
          'Newburgh ↔ Middletown pairs freer mid-day still burn billable time at commute peaks. Ask whether quotes are portal-to-portal.',
      },
      {
        title: 'Newburgh multi-story is first-class product',
        detail:
          'City stairs and tight streets need inventories different from Woodbury cul-de-sacs.',
      },
      {
        title: 'Woodbury retail corridors punish Saturday crews',
        detail:
          'Outlet and arterial congestion changes staging windows more than map miles suggest.',
      },
      {
        title: 'NJ / PA adjacency creates interstate legs',
        detail:
          'Sussex NJ or Pike PA addresses flip jobs to FMCSA even when the Orange side feels local.',
      },
      NY_TIER2_REG_BULLET,
    ],
  },
  zonesHeading: 'Orange zones: Newburgh corridor, Middletown inland, Woodbury growth & western lots',
  zonesIntro: 'Two to four sharp products — river city, inland multi-family, retail growth, and western lots price differently.',
  zones: [
    {
      id: 'newburgh-corridor',
      name: 'Newburgh & east river corridor',
      shortName: 'Newburgh',
      neighborhoods: ["Newburgh","New Windsor","Cornwall","Beacon approaches"],
      housingTypes: 'City multi-story, SFH, river-edge stock',
      challenges: ["Tight streets","Stairs","Thruway peaks"],
      moverTips: 'Plan temporary no-parking; inventory stairs; avoid peak Thruway windows when possible.',
      cityKeywords: ["newburgh","new windsor","cornwall"],
    },
    {
      id: 'middletown-inland',
      name: 'Middletown inland core',
      shortName: 'Middletown',
      neighborhoods: ["Middletown","Wallkill edges","Scotchtown"],
      housingTypes: 'Multi-family, SFH, lease clusters',
      challenges: ["Elevators","Arterial timing","Parking"],
      moverTips: 'Collect management packets; confirm elevator windows before Saturday bookings.',
      cityKeywords: ["middletown","wallkill","scotchtown"],
    },
    {
      id: 'woodbury-growth',
      name: 'Woodbury / central retail growth',
      shortName: 'Woodbury growth',
      neighborhoods: ["Woodbury","Central Valley","Harriman edges"],
      housingTypes: 'Suburban SFH, townhomes, apartments',
      challenges: ["Retail corridor traffic","HOA windows"],
      moverTips: 'Avoid Saturday midday near outlet corridors when possible.',
      cityKeywords: ["woodbury","central valley","harriman"],
    },
    {
      id: 'warwick-west',
      name: 'Warwick / western lots',
      shortName: 'West Orange Co.',
      neighborhoods: ["Warwick","Goshen","Chester","Monroe edges"],
      housingTypes: 'Larger lots, hills, rural approaches',
      challenges: ["Driveway length","Grades","Winter ice"],
      moverTips: 'Photo approaches; soft ground after rain can block heavy trucks.',
      cityKeywords: ["warwick","goshen","chester","monroe"],
    }
  ],
  specialized: [
    {
      id: 'i87-i84',
      title: 'I-87 / I-84 freeflow module',
      intro: 'Outer collar pairs burn portal-to-portal time even when map miles look short.',
      bullets: ["Price Thruway and I-84 peaks honestly for Newburgh ↔ Middletown pairs.","Build buffer for Woodbury retail corridors on weekends.","Clarify Rockland or Westchester second addresses for authority and drive-time."],
    },
    {
      id: 'river-city',
      title: 'Newburgh river-city access',
      intro: 'City multi-story stock needs stair inventories and curb plans.',
      bullets: ["Measure streets before promising full trailers.","Temporary no-parking often beats long carries."],
    },
    {
      id: 'inland-mf',
      title: 'Inland multi-family & lease clusters',
      intro: 'Middletown-area apartments drive elevator and COI soft costs.',
      bullets: ["Collect management packets before finalizing the estimate.","Confirm elevator overtime rules."],
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
        intro: 'Orange families often compare Newburgh, Middletown, Warwick, Monroe-Woodbury, and other districts — boundaries are address-specific.',
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
            detail: 'Montefiore St. Luke’s Cornwall, Garnet Health (Middletown), and related campuses serve greater Orange; map ER times at Thruway peak.',
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
    intro: 'Thruway freeflow, multi-family elevators, and long empty-mile west pairs often matter more than raw miles.',
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
    intro: 'School years, retail peaks, and winter grades reshape demand by pocket.',
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
        label: 'Westchester County movers (parent contrast)',
        href: '/local-movers/new-york/westchester',
      },
      {
        label: 'Rockland County movers',
        href: '/local-movers/new-york/rockland',
      },
    ],
  },
});

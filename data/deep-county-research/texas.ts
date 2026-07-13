import type { DeepCountyResearch } from '@/data/deep-county-research/types';

/** Wave 2 — Texas premium metros (deep original content). */
export const texasDeepCountyResearch: Record<string, DeepCountyResearch> = {
  harris: {
    marketNotes:
      'Harris County is Greater Houston — the nation’s fourth-largest metro with petrochemical corridors, Medical Center relocations, Katy suburban sprawl, and flood-aware housing along bayous. Moves span high-rises downtown, master-planned communities, and long-distance port-related transfers.',
    costs: {
      studioRange: '$650–$1,450',
      familyRange: '$2,500–$6,200',
      avgHourly: '$120–$185/hr for a 2-person crew',
      note: 'Houston pricing reflects I-10 and I-45 congestion, Katy and Sugar Land HOA rules, Medical Center elevator logistics, and hurricane-season scheduling buffers.',
    },
    tips: [
      'Galleria and Medical Center towers require freight elevators and COIs — book 2–3 weeks ahead.',
      'Katy and Cypress new-build communities often restrict move hours and truck weight on curing driveways.',
      'Hurricane season (June–November) can delay moves — confirm weather reschedule policies.',
      'Bayou-adjacent homes may need flood-zone insurance documentation for high-value inventory.',
      'Port and energy-sector relocations may need flexible crew windows around shift schedules.',
    ],
    faqExtras: [
      {
        question: 'Does Houston flood risk affect moving plans in Harris County?',
        answer:
          'Yes — properties near bayous and in FEMA flood zones may face weather delays during heavy rain. Keep flexible overlap housing and confirm whether your mover charges for hurricane-season reschedules.',
      },
    ],
  },
  dallas: {
    marketNotes:
      'Dallas County anchors the DFW metro with downtown high-rises, Oak Cliff bungalows, and inner-ring suburbs feeding Uptown and Deep Ellum growth. Corporate relocations and Texas-to-California corridor moves create steady demand.',
    costs: {
      studioRange: '$620–$1,400',
      familyRange: '$2,400–$6,000',
      avgHourly: '$118–$180/hr for a 2-person crew',
      note: 'Dallas pricing reflects I-35E and Woodall Rodgers deck traffic, Uptown elevator reservations, and premium handling in Highland Park adjacent moves.',
    },
    tips: [
      'Uptown and downtown Dallas buildings need freight elevator slots separate from passenger cars.',
      'Highland Park and University Park moves may involve narrow streets — confirm shuttle truck options.',
      'Summer heat above 100°F affects crew pacing — schedule morning loads in July and August.',
      'DFW airport-adjacent relocations often need tight corporate timelines — verify weekend availability.',
      'Compare Dallas-city vs Collin County crew quotes; travel minimums differ across the metro.',
    ],
  },
  travis: {
    marketNotes:
      'Travis County is Austin and surrounding tech-corridor suburbs — one of the fastest-growing U.S. metros with Tesla, Apple, and UT-driven relocations, steep hills west of Mopac, and strict short-term rental turnover.',
    costs: {
      studioRange: '$680–$1,500',
      familyRange: '$2,600–$6,500',
      avgHourly: '$125–$190/hr for a 2-person crew',
      note: 'Austin pricing reflects I-35 and MoPac bottlenecks, Westlake and Lake Travis access roads, and SXSW/ACL festival traffic windows.',
    },
    tips: [
      'Westlake and Lake Travis hillside homes may need smaller trucks and extra crew for long carries.',
      'SXSW (March) and ACL (October) congest central Austin — avoid festival weekends for downtown moves.',
      'UT fall move-in (August) saturates crews — book before June for student housing turns.',
      'Many Austin condos require COI and elevator bookings through BuildingLink or similar portals.',
      'Tech relocations often need after-hours or Sunday moves — confirm overtime rates upfront.',
    ],
    faqExtras: [
      {
        question: 'When is Austin’s busiest season for local movers?',
        answer:
          'Late spring through August is peak due to UT move-in, corporate hires, and festival season. SXSW week and month-end summer lease turns require 4–6 weeks lead time.',
      },
    ],
  },
  tarrant: {
    marketNotes:
      'Tarrant County spans Fort Worth stockyards heritage, Arlington entertainment district, and sprawling suburban growth in Keller and Mansfield. Western heritage homes and DFW airport proximity shape local logistics.',
    costs: {
      studioRange: '$600–$1,350',
      familyRange: '$2,350–$5,900',
      avgHourly: '$115–$175/hr for a 2-person crew',
      note: 'Fort Worth and Arlington pricing reflects I-30 and I-35W merge traffic, AT&T Stadium event weekends, and long carries in older Near Southside properties.',
    },
    tips: [
      'Stockyards and Near Southside historic buildings have tight loading zones — coordinate parking early.',
      'Arlington Cowboys/Rangers event days congest I-30 — avoid game weekends when possible.',
      'Keller and Mansfield HOAs require mover vendor registration before truck arrival.',
      'DFW airport cargo-area relocations need security-aware movers — ask about corporate references.',
      'Compare Fort Worth vs Dallas crew bases; cross-county travel fees vary.',
    ],
  },
  bexar: {
    marketNotes:
      'Bexar County is San Antonio — military-heavy with Joint Base San Antonio, tourism around the River Walk, and rapid suburban growth in Stone Oak and Alamo Ranch. PCS moves and healthcare relocations dominate.',
    costs: {
      studioRange: '$580–$1,280',
      familyRange: '$2,200–$5,700',
      avgHourly: '$110–$168/hr for a 2-person crew',
      note: 'San Antonio pricing reflects Loop 410 and I-35 congestion, JBSA PCS surges, and River Walk area parking limits.',
    },
    tips: [
      'JBSA PCS windows tighten crew availability in summer — military families should book 6+ weeks out.',
      'River Walk and downtown lofts need elevator and loading-dock coordination with building management.',
      'Stone Oak gated communities require HOA mover passes — complete forms 1–2 weeks ahead.',
      'Fiesta San Antonio (April) congests central corridors — plan around parade routes.',
      'Humidity affects piano and antique moves — ask about climate-controlled trucks.',
    ],
  },
  collin: {
    marketNotes:
      'Collin County is explosive North Dallas suburban growth — Plano, Frisco, McKinney, and Allen — with corporate campuses, top school districts, and HOA-heavy master-planned communities.',
    costs: {
      studioRange: '$640–$1,420',
      familyRange: '$2,500–$6,100',
      avgHourly: '$120–$182/hr for a 2-person crew',
      note: 'Collin pricing reflects Legacy and Tollway corridor traffic, Frisco new-construction access limits, and premium inventory in West Plano.',
    },
    tips: [
      'Frisco and Prosper new subdivisions may ban weekend moves during early HOA phases.',
      'Legacy West and Granite Park corporate relocations need tight scheduling — confirm crew size.',
      'DNT and US-75 toll lanes affect crew routing — clarify toll reimbursement.',
      'McKinney historic downtown has narrow streets — verify shuttle needs.',
      'Collin-to-Dallas downtown moves cross pricing tiers — compare quotes from both county bases.',
    ],
  },
  denton: {
    marketNotes:
      'Denton County blends university towns (Denton UNT/TWU), Lewisville lake communities, and fast-growing Little Elm and Prosper edges of the DFW metro with more affordable housing than Collin.',
    costs: {
      studioRange: '$600–$1,320',
      familyRange: '$2,300–$5,800',
      avgHourly: '$112–$172/hr for a 2-person crew',
      note: 'Denton pricing reflects I-35E university corridor traffic, lake-community access, and travel from Dallas or Fort Worth hubs.',
    },
    tips: [
      'UNT and TWU semester turnover peaks in August and May — students should book early.',
      'Lewisville Lake properties may have steep driveways — confirm truck length limits.',
      'Little Elm and Aubrey new builds often have soft driveways — verify access with builders.',
      'Denton Square historic district has tight loading windows — coordinate with city parking.',
      'Compare Denton-based vs Frisco-based crews for total travel minimums.',
    ],
  },
  'fort-bend': {
    marketNotes:
      'Fort Bend County is affluent southwest Houston suburban growth — Sugar Land, Katy-adjacent Richmond, and master-planned communities with diverse international corporate relocations and top-rated schools.',
    costs: {
      studioRange: '$650–$1,400',
      familyRange: '$2,500–$6,200',
      avgHourly: '$118–$178/hr for a 2-person crew',
      note: 'Fort Bend pricing reflects Grand Parkway toll traffic, Sugar Land HOA move rules, and overlap with Harris County crew markets.',
    },
    tips: [
      'Sugar Land and Sienna Plantation HOAs issue strict move-in/out forms — submit before closing.',
      'Grand Parkway construction zones delay crews — build buffer days around move date.',
      'International corporate relocations may need specialty crating — verify valuation coverage.',
      'Katy-adjacent Fort Bend addresses share flood-zone considerations — monitor weather in spring.',
      'Confirm whether quotes include Harris County travel surcharges for west Houston jobs.',
    ],
  },
};
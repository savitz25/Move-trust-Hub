import type { DeepCountyResearch } from '@/data/deep-county-research/types';

/** Deep original research — Northern Virginia, Richmond, and Hampton Roads metros (wave 1). */
export const virginiaDeepCountyResearch: Record<string, DeepCountyResearch> = {
  fairfax: {
    marketNotes:
      'Fairfax County anchors the Washington DC metro’s Virginia side with 1.1M+ residents across Tysons, Reston, Vienna, and McLean. Moves mix high-rise condos, townhome HOAs, federal contractor relocations, and school-calendar family turns — with heavy competition from licensed NOVA and DC-crossing crews.',
    costs: {
      studioRange: '$950–$2,100',
      familyRange: '$3,800–$9,200',
      avgHourly: '$135–$205/hr for a 2-person crew',
      note: 'Fairfax pricing reflects Dulles/Tysons corridor demand, I-66 and I-495 toll-lane congestion, elevator COI requirements in dense nodes, and premium handling for high-value suburban inventory.',
    },
    tips: [
      'Reston, Tysons, and Mosaic District buildings often require 2–4 week elevator reservations and certificates of insurance naming the property — confirm before deposit.',
      'I-66 inside-the-Beltway HOV rules and I-495 Express lane work can shift crew arrival by 45+ minutes; insist on arrival windows, not fixed start times.',
      'Townhome and HOA communities in Burke and Fairfax Station may restrict moving hours to weekdays 9–5 — verify gate access and parking permits.',
      'Federal PCS and summer transfer season (May–August) fills crews fast; book 4–6 weeks ahead for end-of-month lease turns.',
      'Crossing into DC or Montgomery County may change licensing and toll reimbursement — clarify interstate vs local pricing upfront.',
    ],
    faqExtras: [
      {
        question: 'Do Fairfax County movers need special building paperwork?',
        answer:
          'Many Fairfax high-rises and HOA communities require certificates of insurance (COI), elevator reservations, and move-in/move-out forms. Reston and Tysons properties are especially strict — request the building’s mover checklist when you book.',
      },
    ],
  },
  'prince-william': {
    marketNotes:
      'Prince William County stretches from Manassas and Gainesville through Woodbridge along the I-95 corridor, blending fast-growing subdivisions, military families near Quantico, and commuters priced out of Fairfax. Local demand spikes around school breaks and federal hiring cycles.',
    costs: {
      studioRange: '$900–$1,950',
      familyRange: '$3,400–$8,000',
      avgHourly: '$130–$195/hr for a 2-person crew',
      note: 'Prince William moves often include longer driveway hauls in Haymarket and Bristow, I-95 HOV reversals, and mixed urban-townhome inventory in Woodbridge.',
    },
    tips: [
      'Quantico-area PCS moves may need base access coordination — confirm whether the mover has military housing experience.',
      'I-95 express lanes and HOV schedules between Woodbridge and Springfield affect crew routing; ask about toll pass-through fees.',
      'New construction in Gainesville and Haymarket may have mud-season driveway limits — confirm truck size and shuttle needs.',
      'HOA rules in Dominion Valley and similar communities restrict weekend moves; check your closing or lease date against HOA windows.',
      'Manassas historic-district streets can be narrow — verify smaller truck or shuttle options for Old Town moves.',
    ],
    faqExtras: [
      {
        question: 'Is Prince William County considered part of the DC metro for movers?',
        answer:
          'Yes — most Prince William movers also serve Fairfax and DC, but pricing may differ for Woodbridge vs Gainesville due to traffic and tolls. Confirm the quote covers your exact ZIP and any Quantico or Stafford-adjacent access.',
      },
    ],
  },
  loudoun: {
    marketNotes:
      'Loudoun County is among the nation’s wealthiest and fastest-growing counties, driven by Ashburn data centers, Leesburg historic charm, and Sterling suburban expansion. Moves often involve new-build communities, multi-car garages, and corporate relocations tied to Dulles tech employers.',
    costs: {
      studioRange: '$980–$2,150',
      familyRange: '$4,000–$9,500',
      avgHourly: '$140–$215/hr for a 2-person crew',
      note: 'Loudoun pricing reflects Route 7 and Route 28 bottlenecks, premium inventory in One Loudoun and Brambleton, and limited street parking in downtown Leesburg.',
    },
    tips: [
      'Data-center corridor relocations (Ashburn, Sterling) often happen on tight corporate timelines — confirm weekend and after-hours crew availability.',
      'Route 7 and Belmont Ridge Road construction zones frequently delay crews; build buffer days around closing dates.',
      'Gated communities in Brambleton and Lansdowne require vendor registration — complete HOA mover forms before move day.',
      'Historic Leesburg properties near King Street may need hand-carry distances; ask about shuttle truck staging on side streets.',
      'Rural western Loudoun (Purcellville, Middleburg) moves may need regional crews from Winchester or Fairfax — verify travel fees.',
    ],
  },
  henrico: {
    marketNotes:
      'Henrico County wraps Richmond’s west and north sides with Short Pump retail density, Glen Allen subdivisions, and established neighborhoods near the University of Richmond. The market mixes apartment turns, medical-professional relocations, and family moves along I-64 and I-95.',
    costs: {
      studioRange: '$820–$1,650',
      familyRange: '$2,950–$6,800',
      avgHourly: '$118–$178/hr for a 2-person crew',
      note: 'Henrico pricing reflects Short Pump traffic, West End HOA communities, and seasonal demand from VCU and University of Richmond academic calendars.',
    },
    tips: [
      'Short Pump and Innsbrook office corridors create afternoon I-64 backups — schedule morning load-outs when possible.',
      'West End townhome communities often limit moving trucks to designated lots; reserve visitor parking or a moving pod permit.',
      'Near-campus moves in Henrico should avoid move-in weekend overlaps with U of R and VCU orientation weeks.',
      'Flood-prone pockets near the James require elevated storage planning during spring — confirm climate-controlled options.',
      'Compare Richmond-city vs Henrico quotes; city permit rules differ from county suburban HOAs.',
    ],
  },
  chesterfield: {
    marketNotes:
      'Chesterfield County sits south of Richmond along the Jefferson Davis Highway and Route 288 growth corridor, with heavy demand in Midlothian, Brandermill, and Woolridge. Family moves dominate, with many buyers relocating from Henrico and Richmond city for school districts.',
    costs: {
      studioRange: '$800–$1,600',
      familyRange: '$2,850–$6,600',
      avgHourly: '$115–$175/hr for a 2-person crew',
      note: 'Chesterfield pricing reflects Route 288 construction, Midlothian retail corridor congestion, and larger suburban homes with garage-heavy inventory.',
    },
    tips: [
      'Midlothian Turnpike and Route 288 rush hours extend loading windows — prefer weekday morning slots.',
      'Brandermill and Woodlake HOAs require move notifications and may ban Sunday moves.',
      'New construction in Woolridge and Winterpock can have unfinished driveways — confirm truck weight limits with the builder.',
      'Moves bridging Chesterfield and Colonial Heights/Petersburg may cross city-county permit rules — clarify in the estimate.',
      'Summer school-district moves peak in late July; book before Memorial Day for August closings.',
    ],
  },
  arlington: {
    marketNotes:
      'Arlington County is a dense urban county across the Potomac from DC, with high-rise living along the Orange/Silver Metro lines, Pentagon-adjacent military housing, and Rosslyn-Ballston corridor professionals. Elevator logistics and street parking permits dominate local moves.',
    costs: {
      studioRange: '$1,000–$2,200',
      familyRange: '$4,200–$9,800',
      avgHourly: '$145–$220/hr for a 2-person crew',
      note: 'Arlington moves reflect Metro-adjacent walk-ups, Clarendon and Courthouse elevator COIs, Pentagon City loading docks, and premium rates for DC-license crossover crews.',
    },
    tips: [
      'Arlington requires street occupancy permits for many moving trucks — the mover or you must pull permits via Arlington County portal.',
      'High-rises in Rosslyn and Crystal City need freight elevator bookings; weekend slots disappear 3+ weeks out.',
      'Pentagon and Fort Myer-adjacent moves may involve security-sensitive scheduling — use movers experienced with military housing.',
      'Walk-ups in Lyon Park and Virginia Square may need long carries; confirm stair fees and crew size.',
      'Crossing into DC adds jurisdiction complexity; verify USDOT authority for any interstate segment.',
    ],
    faqExtras: [
      {
        question: 'Do I need a permit for a moving truck in Arlington?',
        answer:
          'Often yes — Arlington County requires right-of-way or occupancy permits for trucks blocking travel lanes. High-rise buildings add separate elevator and COI requirements. Ask your mover which permits they pull vs which you must file.',
      },
    ],
  },
  alexandria: {
    marketNotes:
      'Alexandria combines Old Town historic rowhouses, Potomac Yard new construction, and Del Ray bungalows with strong federal and defense-contractor demand. Narrow streets, brick sidewalks, and waterfront condos make access planning critical.',
    costs: {
      studioRange: '$980–$2,100',
      familyRange: '$3,900–$9,000',
      avgHourly: '$140–$210/hr for a 2-person crew',
      note: 'Alexandria pricing reflects Old Town parking restrictions, Potomac Yard elevator logistics, and premium handling for historic properties with tight stairwells.',
    },
    tips: [
      'Old Town moves may require city alley permits and limited 2-hour loading zones — coordinate with Alexandria Transportation.',
      'Potomac Yard and Carlyle high-rises need COI and dock scheduling similar to DC buildings.',
      'Del Ray street festivals (spring–fall) can block truck access — check the city events calendar against your move date.',
      'Historic brick rowhomes need floor protection and narrow-furniture planning — measure stairwells before booking.',
      'Waterfront condos near the Torpedo Factory have strict move hours; confirm with building management.',
    ],
  },
  'fairfax-city': {
    marketNotes:
      'Fairfax City is an independent city surrounded by Fairfax County, mixing Old Town Fairfax walk-ups, George Mason University student housing, and suburban pockets near Route 50. Demand tracks university semesters and NOVA commuter turnover.',
    costs: {
      studioRange: '$920–$1,900',
      familyRange: '$3,500–$8,200',
      avgHourly: '$132–$198/hr for a 2-person crew',
      note: 'Fairfax City pricing reflects Main Street parking limits, GMU move-in weekends, and overlap with broader Fairfax County crew availability.',
    },
    tips: [
      'GMU fall and spring move-in weekends saturate local crews — book early for August and January.',
      'Old Town Fairfax has timed loading zones on Main Street; movers may need shuttle trucks.',
      'City vs county address affects which HOA or permit rules apply — confirm your jurisdiction on the quote.',
      'Route 50 and Fairfax County Parkway backups are worst 4–7 PM; schedule morning loads.',
      'Student moves near campus may need shorter minimum-hour packages — compare dorm-focused movers.',
    ],
  },
  'virginia-beach': {
    marketNotes:
      'Virginia Beach is Virginia’s largest city with oceanfront towers, suburban Great Neck, and military-heavy demand from NAS Oceana and Joint Expeditionary Base Little Creek. Seasonality swings sharply between summer tourism and winter off-peak.',
    costs: {
      studioRange: '$880–$1,750',
      familyRange: '$3,100–$7,400',
      avgHourly: '$122–$188/hr for a 2-person crew',
      note: 'Virginia Beach pricing reflects oceanfront elevator rules, summer tourist traffic on Laskin and Virginia Beach Blvd, and PCS surges near military installations.',
    },
    tips: [
      'Oceanfront high-rises restrict move hours during peak tourist season (June–August) — book freight elevators early.',
      'NAS Oceana and JEB Little Creek PCS windows tighten crew availability in summer — military families should book 6+ weeks out.',
      'Sand and salt air near the oceanfront can affect storage — use climate-controlled units inland if storing between closings.',
      'Norfolk–Virginia Beach tunnel backups on I-264 delay cross-water moves; plan morning crossings.',
      'Flood-zone properties may have insurance documentation requirements — confirm valuation coverage for waterfront homes.',
    ],
    faqExtras: [
      {
        question: 'When is the busiest season for movers in Virginia Beach?',
        answer:
          'Late spring through August is peak due to tourism, beach-house turnovers, and military PCS moves. Rates and availability tighten Memorial Day through Labor Day — book early and avoid oceanfront move windows restricted by building management.',
      },
    ],
  },
  norfolk: {
    marketNotes:
      'Norfolk is a port city with Naval Station Norfolk, ODU student housing, Ghent historic homes, and downtown high-rises. Military, maritime, and university calendars drive demand more than typical suburban seasonality.',
    costs: {
      studioRange: '$850–$1,700',
      familyRange: '$3,000–$7,200',
      avgHourly: '$120–$185/hr for a 2-person crew',
      note: 'Norfolk pricing reflects naval base PCS volume, Ghent narrow-street access, and downtown loading dock coordination.',
    },
    tips: [
      'Naval Station Norfolk PCS moves require movers familiar with base access protocols — ask about military references.',
      'Ghent and West Ghent brick homes have tight turns; smaller trucks or shuttles are common.',
      'ODU student move weeks (August, May) spike hourly demand — expect higher minimums.',
      'Downtown Norfolk towers need freight elevator slots separate from passenger elevators.',
      'Hampton Roads Bridge-Tunnel delays affect moves between Norfolk and Peninsula cities — clarify cross-water fees.',
    ],
  },
  'newport-news': {
    marketNotes:
      'Newport News spans heavy industry near the shipyard, suburban Kiln Creek, and Jefferson Lab-adjacent communities. Military and shipyard contractor relocations mix with family moves along I-64.',
    costs: {
      studioRange: '$820–$1,650',
      familyRange: '$2,900–$6,900',
      avgHourly: '$115–$178/hr for a 2-person crew',
      note: 'Newport News pricing reflects shipyard shift-change traffic on Warwick Blvd, Kiln Creek HOA rules, and regional crew travel from Hampton Roads hubs.',
    },
    tips: [
      'Shipyard contractor moves may need flexible scheduling around shift changes — confirm early-morning availability.',
      'Kiln Creek and Port Warwick HOAs issue mover passes; complete forms before truck arrival.',
      'I-64 HRBT approaches back up heavily — avoid Friday afternoon loads heading toward Norfolk.',
      'Older homes in Hilton Village need preservation-aware handling for plaster walls and tight entries.',
      'Compare Peninsula-only movers vs regional Hampton Roads firms for pricing on cross-tunnel moves.',
    ],
  },
  hampton: {
    marketNotes:
      'Hampton anchors the Peninsula with Langley Air Force Base, NASA Langley, and waterfront Buckroe Beach communities. Military PCS and aerospace contractor moves are core demand drivers alongside Phoebus historic housing.',
    costs: {
      studioRange: '$820–$1,620',
      familyRange: '$2,850–$6,700',
      avgHourly: '$115–$175/hr for a 2-person crew',
      note: 'Hampton pricing reflects Langley AFB PCS cycles, Coliseum Drive retail traffic, and limited oceanfront move windows near Buckroe.',
    },
    tips: [
      'Langley AFB housing moves require base-clearance-aware movers — verify experience with military relocations.',
      'Coliseum Central and Peninsula Town Center traffic peaks on weekends; prefer weekday moves.',
      'Buckroe beach cottages may have soft-sand access — confirm whether a shuttle is needed.',
      'Phoebus historic homes near Fort Monroe have narrow lanes; measure furniture against doorways.',
      'Peninsula movers may price differently than Southside Virginia Beach firms — compare both for HRBT crossings.',
    ],
  },
  chesapeake: {
    marketNotes:
      'Chesapeake is a sprawling city blending Greenbrier retail corridors, Great Bridge wetlands suburbs, and rural South Norfolk edges. Moves range from townhome clusters to acreage properties needing longer carries.',
    costs: {
      studioRange: '$840–$1,680',
      familyRange: '$2,950–$7,000',
      avgHourly: '$118–$180/hr for a 2-person crew',
      note: 'Chesapeake pricing reflects Greenbrier Parkway congestion, Great Bridge bridge traffic, and travel time for rural southern districts.',
    },
    tips: [
      'Greenbrier and Hickory townhome communities require HOA move notifications and parking assignments.',
      'Great Bridge bridge openings and rush hour can delay crews crossing from Norfolk — plan buffer time.',
      'Southern Chesapeake rural routes may limit 26-foot truck access — confirm truck size during walkthrough.',
      'Moves near the Dismal Swamp corridor may face weather delays in hurricane season — keep flexible closing dates.',
      'Chesapeake spans multiple ZIP clusters; verify the quote covers deep South Norfolk vs Greenbrier without travel surcharges.',
    ],
  },
  richmond: {
    marketNotes:
      'The City of Richmond mixes Fan District rowhouses, Shockoe Bottom lofts, West End apartments, and VCU campus housing. Urban parking permits, historic stairwells, and riverfront humidity considerations shape local move logistics.',
    costs: {
      studioRange: '$800–$1,650',
      familyRange: '$2,900–$6,800',
      avgHourly: '$115–$178/hr for a 2-person crew',
      note: 'Richmond city pricing reflects Fan/Museum District parking permits, Carytown weekend foot traffic, and VCU semester turnover.',
    },
    tips: [
      'Fan District and Church Hill moves often need city street occupancy permits — apply via Richmond DOT portal.',
      'VCU move-in/out weeks compress availability; students should book before April for August.',
      'Historic rowhomes may lack rear alley access — expect front-street loading with time limits.',
      'Shockoe Bottom flood history means ground-floor moves need weather monitoring in spring.',
      'Compare city vs Henrico/Chesterfield movers; county crews may add travel minimums for downtown jobs.',
    ],
    faqExtras: [
      {
        question: 'Do Richmond city moves require parking permits?',
        answer:
          'For many Fan, Museum District, and downtown blocks, yes — Richmond issues right-of-way permits for moving trucks. Your mover may handle this for a fee; confirm when booking and allow lead time for city approval.',
      },
    ],
  },
  albemarle: {
    marketNotes:
      'Albemarle County centers on Charlottesville and UVA, with wine-country estates, Monticello-area tourism, and Crozet mountain suburbs. Academic calendars and fall leaf-season tourism create distinct peak windows.',
    costs: {
      studioRange: '$780–$1,550',
      familyRange: '$2,800–$6,400',
      avgHourly: '$112–$170/hr for a 2-person crew',
      note: 'Albemarle pricing reflects Route 29 student traffic, mountain-road access in Crozet, and premium handling for estate properties near Monticello.',
    },
    tips: [
      'UVA move-in (August) and graduation (May) weeks are the tightest windows — book 5+ weeks ahead.',
      'Crozet and western Albemarle mountain roads may require smaller trucks in winter.',
      'Winery and estate properties often have long gravel drives — confirm shuttle and crew size.',
      'Downtown Charlottesville parking is limited on weekends during events — avoid move days overlapping football weekends.',
      'Humidity in summer affects piano and antique moves — ask about climate-controlled transport options.',
    ],
  },
  roanoke: {
    marketNotes:
      'Roanoke City and the surrounding valley combine railroad heritage housing, hospital-system employment (Carilion), and Blue Ridge access constraints. Moves often involve hills, older homes, and regional crews from Blacksburg or Lynchburg.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,650–$6,100',
      avgHourly: '$108–$165/hr for a 2-person crew',
      note: 'Roanoke pricing reflects I-81 corridor traffic, steep neighborhood grades, and travel from regional hubs for specialty items.',
    },
    tips: [
      'Hilly neighborhoods like Raleigh Court and Old Southwest may need extra crew for long carries.',
      'Carilion clinic relocations often need weekend moves — confirm overtime policies upfront.',
      'I-81 construction zones between Roanoke and Christiansburg delay regional crews.',
      'Older mill-era homes have narrow doorways — measure large pieces before move day.',
      'Winter ice on valley roads can postpone moves — build weather flex into lease overlap plans.',
    ],
  },
  stafford: {
    marketNotes:
      'Stafford County sits between Fredericksburg and Quantico along I-95, with rapid suburban growth in North Stafford and Aquia Harbour. Marine Corps Base Quantico drives steady PCS and contractor relocation volume.',
    costs: {
      studioRange: '$880–$1,800',
      familyRange: '$3,200–$7,500',
      avgHourly: '$125–$190/hr for a 2-person crew',
      note: 'Stafford pricing reflects I-95 commuter congestion, Quantico PCS surges, and overlap with Fredericksburg and Prince William crew markets.',
    },
    tips: [
      'Quantico-adjacent moves need movers comfortable with base housing protocols — verify military references.',
      'I-95 express lanes and Staffordboro retail traffic peak 3–7 PM; schedule morning load-outs.',
      'Aquia Harbour and similar waterfront HOAs restrict truck routes — get HOA mover approval first.',
      'North Stafford new builds may still have gravel drives — confirm truck access with the site superintendent.',
      'Stafford-to-DC commutes mean some movers bill from NOVA rates — compare local Fredericksburg quotes too.',
    ],
  },
  spotsylvania: {
    marketNotes:
      'Spotsylvania County bridges Fredericksburg sprawl and rural Lake Anna recreation areas, with heavy growth in Spotsylvania Towne Centre corridors. Moves mix suburban subdivisions and seasonal lake properties.',
    costs: {
      studioRange: '$800–$1,600',
      familyRange: '$2,900–$6,700',
      avgHourly: '$115–$175/hr for a 2-person crew',
      note: 'Spotsylvania pricing reflects Route 3 commuter growth, Lake Anna seasonal access, and competition between Fredericksburg and NOVA regional crews.',
    },
    tips: [
      'Lake Anna seasonal homes see summer turnover peaks — book before Memorial Day for June closings.',
      'Spotsylvania Towne Centre traffic adds delay risk on Saturdays — prefer weekday scheduling.',
      'Rural western Spotsylvania may need travel fees from Fredericksburg hubs — confirm in writing.',
      'HOA communities near Massaponax require move-in forms and truck route maps.',
      'Historic Fredericksburg-adjacent districts have overlapping county-city rules — verify address jurisdiction.',
    ],
  },
};
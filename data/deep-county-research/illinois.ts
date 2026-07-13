import type { DeepCountyResearch } from '@/data/deep-county-research/types';

export const illinoisDeepCountyResearch: Record<string, DeepCountyResearch> = {
  cook: {
    marketNotes:
      'Cook County includes Chicago and dense inner-ring suburbs with high-rise lakefront towers, walk-ups in Logan Square and Hyde Park, and corporate relocations across the Loop. Elevator COIs, winter weather, and strict building management rules define the market.',
    costs: {
      studioRange: '$700–$1,600',
      familyRange: '$2,800–$7,500',
      avgHourly: '$130–$200/hr for a 2-person crew',
      note: 'Cook County pricing reflects Chicago high-rise freight elevators, winter salt-and-snow delays, street parking permits, and premium rates for union-experienced urban crews.',
    },
    tips: [
      'Chicago high-rises require freight elevator reservations and COIs naming the building — lead time is often 2–3 weeks.',
      'City of Chicago moving-day parking permits are required for many residential streets — confirm who files the permit.',
      'Winter moves (November–March) need snow-route planning; alley access can be blocked after heavy snowfall.',
      'Loop and lakefront buildings may restrict weekend moves; check building management calendars.',
      'Moves crossing city neighborhood boundaries still need Chicago permit awareness — suburban rules differ in Evanston and Oak Park pockets.',
    ],
    faqExtras: [
      {
        question: 'Do Chicago movers need a parking permit on move day?',
        answer:
          'In many Chicago neighborhoods, yes — the city issues residential moving parking signs. High-rises add separate elevator and insurance requirements. Clarify permit responsibility in your contract before paying a deposit.',
      },
    ],
  },
  dupage: {
    marketNotes:
      'DuPage County spans Naperville, Wheaton, Lombard, and Oak Brook corporate corridors with affluent suburban homes, townhome HOAs, and O’Hare-adjacent noise corridors. Family moves and executive relocations dominate.',
    costs: {
      studioRange: '$650–$1,400',
      familyRange: '$2,600–$6,200',
      avgHourly: '$125–$190/hr for a 2-person crew',
      note: 'DuPage pricing reflects I-88 and I-355 toll corridors, Naperville HOA move windows, and premium handling in Oak Brook and Hinsdale.',
    },
    tips: [
      'Naperville and Wheaton HOAs often limit moves to weekday business hours — verify your community’s schedule.',
      'Oak Brook and Hinsdale estates may need larger crews for long carries from detached garages.',
      'I-355 tolls and O’Hare flight-path neighborhoods affect crew routing — ask about toll reimbursement.',
      'Naperville school-district moves peak in June and August; book before spring break for summer closings.',
      'Compare quotes from DuPage-based vs Chicago-city crews; travel minimums vary.',
    ],
  },
  lake: {
    marketNotes:
      'Lake County stretches from Waukegan lakefront to affluent Lake Forest and fast-growing Gurnee corridors, blending industrial lakefront, executive homes, and family subdivisions near Great Lakes Naval Station.',
    costs: {
      studioRange: '$640–$1,380',
      familyRange: '$2,550–$6,000',
      avgHourly: '$122–$185/hr for a 2-person crew',
      note: 'Lake County pricing reflects Route 41 lakefront congestion, Great Lakes Navy PCS turnover, and premium inventory in Lake Forest and Deerfield.',
    },
    tips: [
      'Great Lakes Naval Station PCS moves spike in summer — military families should book early.',
      'Lake Forest and Highland Park properties may have long private drives — confirm truck length limits.',
      'Gurnee and Mundelein townhome clusters need HOA mover registration forms.',
      'Winter lake-effect snow can delay moves along Route 41 — build weather buffer days.',
      'Moves toward Wisconsin may cross state licensing lines — verify FMCSA authority for interstate segments.',
    ],
  },
  will: {
    marketNotes:
      'Will County includes Joliet logistics corridors, Plainfield and Bolingbrook suburban growth, and warehouse-adjacent communities along I-55. Lower price points than DuPage attract families relocating south from Cook.',
    costs: {
      studioRange: '$600–$1,300',
      familyRange: '$2,400–$5,800',
      avgHourly: '$115–$175/hr for a 2-person crew',
      note: 'Will County pricing reflects I-55 and I-80 truck traffic, Plainfield new-construction access, and regional crews based in Joliet or Orland Park.',
    },
    tips: [
      'Plainfield and Shorewood new subdivisions may have unfinished streets — confirm truck access with the builder.',
      'Joliet industrial corridors have heavy truck traffic; morning moves beat afternoon I-55 backups.',
      'Bolingbrook HOA communities restrict weekend truck hours in some phases.',
      'Will-to-Cook moves are common; verify whether the quote includes return travel from Chicago crews.',
      'Warehouse district adjacent homes may face dust and noise — protect inventory during loading.',
    ],
  },
};
import type { DeepCountyResearch } from '@/data/deep-county-research/types';

export const indianaDeepCountyResearch: Record<string, DeepCountyResearch> = {
  marion: {
    marketNotes:
      'Marion County is Indianapolis and its included cities, mixing downtown condos, Broad Ripple bungalows, and Speedway-adjacent suburbs. Indy 500 season, Colts events, and state-government transfers create localized peak windows.',
    costs: {
      studioRange: '$580–$1,250',
      familyRange: '$2,200–$5,500',
      avgHourly: '$108–$165/hr for a 2-person crew',
      note: 'Marion County pricing reflects downtown elevator logistics, I-65/I-70 merge congestion, and May Indy 500 tourism traffic.',
    },
    tips: [
      'May Indy 500 month congests west-side neighborhoods — avoid move days near Georgetown Road corridor.',
      'Downtown high-rises need freight elevator bookings; older Lockerbie square homes need tight-turn planning.',
      'Unigov means Indianapolis city and Marion County share many services, but suburb pockets like Lawrence have distinct HOA rules.',
      'Winter ice on brick sidewalks downtown increases carry times — confirm stair fees.',
      'State government fiscal-year moves (June–July) tighten corporate crew calendars.',
    ],
    faqExtras: [
      {
        question: 'Does Indianapolis Unigov affect how movers price Marion County jobs?',
        answer:
          'Most Marion County addresses are treated as Indianapolis for local moves, but included towns and townships can have different HOA and parking rules. Confirm your ZIP and any homeowner-association move forms when requesting quotes.',
      },
    ],
  },
  hamilton: {
    marketNotes:
      'Hamilton County north of Indianapolis includes Carmel, Fishers, Noblesville, and Westfield — among the fastest-growing and most affluent Indiana suburbs with HOA-heavy new construction and top school districts.',
    costs: {
      studioRange: '$620–$1,320',
      familyRange: '$2,500–$6,000',
      avgHourly: '$115–$172/hr for a 2-person crew',
      note: 'Hamilton County pricing reflects Carmel Arts District parking, Fishers new-build driveway limits, and premium suburban inventory.',
    },
    tips: [
      'Carmel and Fishers HOAs frequently ban Sunday moves and require vendor registration — complete forms early.',
      'New construction in Westfield may have mud-season access limits — confirm truck size during walkthrough.',
      '116th Street and Keystone corridor traffic peaks at school dismissal — schedule morning loads.',
      'Luxury inventory in Carmel clay homes needs floor and door jamb protection — specify in contract.',
      'Hamilton-to-Marion downtown moves cross urban-suburban pricing tiers — compare dedicated Indy city crews.',
    ],
  },
};
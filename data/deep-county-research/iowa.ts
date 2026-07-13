import type { DeepCountyResearch } from '@/data/deep-county-research/types';

export const iowaDeepCountyResearch: Record<string, DeepCountyResearch> = {
  polk: {
    marketNotes:
      'Polk County is Des Moines and inner suburbs like West Des Moines, Ankeny, and Urbandale — Iowa’s political and insurance-industry hub with strong suburban HOA growth and downtown loft rehabs.',
    costs: {
      studioRange: '$540–$1,150',
      familyRange: '$2,050–$5,100',
      avgHourly: '$102–$158/hr for a 2-person crew',
      note: 'Polk County pricing reflects downtown Des Moines elevator logistics, Ankeny growth-corridor traffic, and winter snow-route delays.',
    },
    tips: [
      'Ankeny and Waukee HOAs often require mover registration — submit forms before truck day.',
      'Downtown loft buildings need freight elevator slots; suburban homes face winter driveway ice.',
      'Iowa Caucus and legislative session winters can congest downtown parking — plan around January events.',
      'State Fair week (August) tightens regional crew availability — book before July if moving in August.',
      'Compare Des Moines-city vs Ankeny-based crews for travel minimums on opposite ends of the county.',
    ],
  },
  linn: {
    marketNotes:
      'Linn County centers on Cedar Rapids with Quaker Oats corridor industry, Czech Village historic housing, and Marion suburban expansion. Flood history along the Cedar River influences storage and timing decisions.',
    costs: {
      studioRange: '$520–$1,100',
      familyRange: '$1,950–$4,900',
      avgHourly: '$98–$152/hr for a 2-person crew',
      note: 'Cedar Rapids pricing reflects river-flood season caution, historic-home stair carries, and travel from Iowa City regional crews.',
    },
    tips: [
      'Spring flood risk along the Cedar River may affect ground-floor moves — monitor Army Corps forecasts.',
      'Czech Village historic homes have tight entries — measure furniture paths before booking.',
      'Marion and Hiawatha suburban HOAs restrict weekend truck hours in some phases.',
      'Derecho-recovery rebuild areas may have construction traffic — confirm site access with builders.',
      'Iowa City crews sometimes serve Linn County with travel fees — compare local Cedar Rapids quotes.',
    ],
    faqExtras: [
      {
        question: 'Should I plan around flood season for Cedar Rapids moves?',
        answer:
          'If your property is near the Cedar River flood plain, monitor spring forecasts and keep flexible overlap housing. Ground-floor loads can be postponed during flood warnings — confirm your mover’s weather reschedule policy in writing.',
      },
    ],
  },
};
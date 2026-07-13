import type { DeepCountyResearch } from '@/data/deep-county-research/types';

export const pennsylvaniaDeepCountyResearch: Record<string, DeepCountyResearch> = {
  philadelphia: {
    marketNotes:
      'Philadelphia County is the city consolidated — rowhomes in Fishtown and South Philly, Center City high-rises, and university-adjacent moves near Penn and Temple. Street parking permits and narrow colonial stairwells define local logistics.',
    costs: {
      studioRange: '$650–$1,400',
      familyRange: '$2,500–$6,000',
      avgHourly: '$120–$185/hr for a 2-person crew',
      note: 'Philadelphia pricing reflects I-95 and Schuylkill Expressway traffic, rowhome long carries, and Center City elevator COI requirements.',
    },
    tips: [
      'Philadelphia requires street occupancy permits for many moving trucks — apply via Philly311 or mover.',
      'Rowhomes in South Philly and Kensington often lack alleys — expect front-street time limits.',
      'Center City condos need freight elevator bookings; older buildings lack modern docks.',
      'Penn and Temple move weeks compress August availability — book before May.',
      'Parking in Fishtown and Northern Liberties is tight on weekends — prefer weekday slots.',
    ],
    faqExtras: [
      {
        question: 'Do Philadelphia moves require a street permit?',
        answer:
          'For many blocks, yes — the city issues no-parking signs for moving trucks. Center City buildings add separate elevator and insurance requirements. Confirm permit responsibility when you book.',
      },
    ],
  },
  allegheny: {
    marketNotes:
      'Allegheny County is Pittsburgh and its hills — Oakland university housing, Lawrenceville rehabs, and suburban South Hills townhomes with bridge-and-tunnel commutes and winter weather challenges.',
    costs: {
      studioRange: '$580–$1,280',
      familyRange: '$2,300–$5,700',
      avgHourly: '$110–$168/hr for a 2-person crew',
      note: 'Pittsburgh pricing reflects hill grades, bridge weight limits, Oakland student turnover, and winter salt-and-snow delays.',
    },
    tips: [
      'Steep Pittsburgh neighborhoods (Mount Washington, Lawrenceville hills) may need extra crew for carries.',
      'CMU and Pitt August move-in saturates Oakland — book before spring semester ends.',
      'Parkway East and Fort Pitt Tunnel backups delay cross-river crews — plan morning crossings.',
      'Older homes with tight stairwells need furniture measuring before move day.',
      'Winter moves need salt and ice planning on sidewalks — confirm liability coverage.',
    ],
  },
  montgomery: {
    marketNotes:
      'Montgomery County is affluent Philadelphia suburbs — King of Prussia, Blue Bell, and Main Line adjacency with corporate campuses, top schools, and HOA-heavy townhome communities.',
    costs: {
      studioRange: '$640–$1,380',
      familyRange: '$2,500–$6,100',
      avgHourly: '$118–$178/hr for a 2-person crew',
      note: 'Montgomery pricing reflects Schuylkill corridor traffic, KOP mall-area congestion, and premium inventory in Lower Merion-adjacent towns.',
    },
    tips: [
      'King of Prussia and Blue Bell office parks create afternoon I-76 backups — schedule morning loads.',
      'Main Line-adjacent HOAs require move notifications and may ban Sunday trucks.',
      'Conshohocken riverfront condos need elevator reservations similar to Philadelphia high-rises.',
      'Corporate relocations along Route 202 corridor need flexible scheduling — confirm overtime.',
      'Compare Montgomery vs Philadelphia city crew quotes; travel minimums differ for KOP jobs.',
    ],
  },
  bucks: {
    marketNotes:
      'Bucks County stretches from New Hope river towns to Levittown suburbs and Doylestown county seat charm — mixing historic properties, canal-path communities, and I-95 corridor commuters.',
    costs: {
      studioRange: '$620–$1,350',
      familyRange: '$2,400–$5,900',
      avgHourly: '$115–$175/hr for a 2-person crew',
      note: 'Bucks pricing reflects I-95 toll corridor traffic, New Hope narrow streets, and Levittown row-style home access.',
    },
    tips: [
      'New Hope and Doylestown historic districts have tight turns — shuttle trucks are common.',
      'I-95 construction zones between Bensalem and Bristol delay crews — build buffer time.',
      'Delaware River flood plain properties need spring weather monitoring.',
      'Levittown cul-de-sacs may limit 26-foot truck access — confirm truck size during walkthrough.',
      'Crossing into NJ (Trenton area) changes jurisdiction — verify bi-state authority.',
    ],
  },
  delaware: {
    marketNotes:
      'Delaware County is inner-ring Philadelphia suburbs — Media, Wayne, and Radnor with SEPTA commuter density, Villanova university adjacency, and Chester waterfront industrial heritage.',
    costs: {
      studioRange: '$630–$1,360',
      familyRange: '$2,450–$6,000',
      avgHourly: '$116–$176/hr for a 2-person crew',
      note: 'Delaware County pricing reflects I-476 Blue Route congestion, Main Line townhome HOAs, and Chester-to-suburb travel fees.',
    },
    tips: [
      'Radnor and Wayne HOAs restrict weekend move hours — verify community schedules.',
      'Villanova move weeks (August, May) tighten crew calendars near campus.',
      'Chester industrial-adjacent moves may face dust — protect upholstered inventory.',
      'Blue Route and I-95 merge peaks 3–7 PM — prefer morning scheduling.',
      'Media borough street parking is limited — coordinate no-parking signs early.',
    ],
  },
};
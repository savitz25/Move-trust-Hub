import type { DeepCountyResearch } from '@/data/deep-county-research/types';

export const ohioDeepCountyResearch: Record<string, DeepCountyResearch> = {
  franklin: {
    marketNotes:
      'Franklin County is Columbus — state government, Ohio State University, and fast-growing suburbs like Dublin and Westerville. Unigov city-county structure and university calendars drive peak demand.',
    costs: {
      studioRange: '$580–$1,250',
      familyRange: '$2,200–$5,500',
      avgHourly: '$108–$165/hr for a 2-person crew',
      note: 'Columbus pricing reflects I-70/I-71 split congestion, OSU move-in weekends, and Short North loft elevator logistics.',
    },
    tips: [
      'OSU August move-in and May move-out weeks are the tightest — book before spring break.',
      'Short North and Arena District lofts need freight elevator slots.',
      'Dublin and Powell HOAs require mover vendor registration.',
      'State government fiscal-year moves cluster in June — corporate crews fill early.',
      'Winter ice on brick sidewalks in German Village increases carry times.',
    ],
    faqExtras: [
      {
        question: 'How does Ohio State affect Columbus moving availability?',
        answer:
          'Late August and early May are peak due to student housing turns near campus. Book 4–6 weeks ahead for those windows or schedule mid-month weekdays for better rates.',
      },
    ],
  },
  cuyahoga: {
    marketNotes:
      'Cuyahoga County is Greater Cleveland — lakefront condos, West Side bungalows, and eastern suburbs along the Chagrin corridor with harsh winter weather and aging housing stock.',
    costs: {
      studioRange: '$560–$1,220',
      familyRange: '$2,150–$5,400',
      avgHourly: '$105–$162/hr for a 2-person crew',
      note: 'Cleveland pricing reflects lake-effect snow delays, Tremont and Ohio City narrow streets, and Shaker Heights estate inventory.',
    },
    tips: [
      'Lake-effect snow can postpone winter moves — confirm weather reschedule policies.',
      'Tremont and Detroit-Shoreway streets are narrow; shuttle use is common.',
      'Shaker and Cleveland Heights homes may have long stairwells — verify crew size.',
      'I-90 innerbelt construction affects cross-city routing — ask about travel fees.',
      'Medical-center relocations near University Circle need weekend crew options.',
    ],
  },
  hamilton: {
    marketNotes:
      'Hamilton County is Cincinnati — Ohio River hills, Over-the-Rhine rehabs, and northern suburbs in West Chester and Mason with cross-river moves into Northern Kentucky daily.',
    costs: {
      studioRange: '$570–$1,240',
      familyRange: '$2,200–$5,500',
      avgHourly: '$107–$164/hr for a 2-person crew',
      note: 'Cincinnati pricing reflects hill grades, Brent Spence Bridge backups, OTR historic access, and bi-state KY crossing fees.',
    },
    tips: [
      'Over-the-Rhine and Mount Adams hill streets complicate truck staging — expect shuttles.',
      'Crossing into Boone or Kenton County KY is common — confirm bi-state licensing.',
      'Brent Spence corridor backups delay crews — plan morning bridge crossings.',
      'West Chester and Mason HOAs ban some Sunday moves — check HOA windows.',
      'Riverfront condos need freight elevator coordination with building management.',
    ],
  },
  summit: {
    marketNotes:
      'Summit County centers on Akron with Goodyear legacy housing, Cuyahoga Valley adjacency, and Hudson affluent suburbs feeding the Cleveland-Akron corridor.',
    costs: {
      studioRange: '$550–$1,200',
      familyRange: '$2,100–$5,300',
      avgHourly: '$104–$160/hr for a 2-person crew',
      note: 'Akron pricing reflects Route 8 corridor traffic, Hudson HOA rules, and travel from Cleveland metro crews.',
    },
    tips: [
      'Hudson and Bath township HOAs require advance mover notification.',
      'Akron hill neighborhoods need extra crew for long carries from street to door.',
      'Cuyahoga Valley park-adjacent homes may have rural driveway limits.',
      'Compare Akron-based vs Cleveland crews for total travel minimums on east side jobs.',
      'Winter salt on driveways affects equipment — confirm floor protection materials.',
    ],
  },
};
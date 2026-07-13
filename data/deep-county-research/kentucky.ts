import type { DeepCountyResearch } from '@/data/deep-county-research/types';

export const kentuckyDeepCountyResearch: Record<string, DeepCountyResearch> = {
  jefferson: {
    marketNotes:
      'Jefferson County is Louisville, blending Ohio River waterfront condos, Highlands bungalows, East End estates, and UPS Worldport logistics employment. Derby season and flood-plain neighborhoods add unique scheduling constraints.',
    costs: {
      studioRange: '$580–$1,280',
      familyRange: '$2,300–$5,800',
      avgHourly: '$110–$168/hr for a 2-person crew',
      note: 'Louisville pricing reflects Derby week surcharges, Highlands narrow-street access, and Ohio River humidity for antique moves.',
    },
    tips: [
      'Kentucky Derby week (late April–early May) restricts availability and may add event surcharges — avoid if possible.',
      'Highlands and Clifton brick homes have tight stairwells; measure large pieces before booking.',
      'Flood-plain properties near the Ohio River need weather monitoring in spring — keep flexible overlap housing.',
      'East End gated communities require vendor badges — submit HOA mover forms 1–2 weeks ahead.',
      'Crossing into Southern Indiana (Jeffersonville, Clarksville) is common; confirm bi-state crew authority.',
    ],
    faqExtras: [
      {
        question: 'Is Derby season more expensive for Louisville movers?',
        answer:
          'Yes — late April through Derby weekend is peak demand with hotel and event traffic congestion. Book outside that window or schedule moves 4+ weeks early with explicit pricing locked in writing.',
      },
    ],
  },
  fayette: {
    marketNotes:
      'Fayette County centers on Lexington, the Horse Capital, with UK student housing, Keeneland-adjacent estates, and Man o’ War corridor suburban growth. Academic and equestrian calendars shape peak demand.',
    costs: {
      studioRange: '$560–$1,220',
      familyRange: '$2,200–$5,500',
      avgHourly: '$105–$162/hr for a 2-person crew',
      note: 'Lexington pricing reflects UK semester turnover, Keeneland meet traffic, and rural estate access on Hamburg and Richmond Road corridors.',
    },
    tips: [
      'UK move-in (August) and graduation (May) compress availability — students should book in spring.',
      'Keeneland meet weekends congest Versailles and Man o’ War corridors — avoid April and October Saturdays.',
      'Horse farm properties need mud-season driveway checks — confirm truck access after rain.',
      'Downtown Lexington lofts require elevator COIs similar to mid-size city buildings.',
      'Bluegrass estate moves may need specialty crating for art and antiques — verify valuation coverage.',
    ],
  },
  boone: {
    marketNotes:
      'Boone County is Northern Kentucky’s growth hub with Florence, Union, and Burlington suburbs serving Cincinnati commuters. Cross-river moves into Hamilton County OH are daily occurrences.',
    costs: {
      studioRange: '$600–$1,300',
      familyRange: '$2,400–$5,900',
      avgHourly: '$112–$170/hr for a 2-person crew',
      note: 'Boone County pricing reflects I-71/I-75 bridge traffic into Cincinnati, new-construction HOA rules, and bi-state crew travel.',
    },
    tips: [
      'Crossing the Ohio River into Cincinnati changes jurisdiction — confirm KY vs OH licensing on the quote.',
      'Florence Mall corridor traffic peaks weekends; weekday morning moves save time.',
      'Union and Burlington new subdivisions may restrict truck weight on curing driveways.',
      'CVG airport-adjacent neighborhoods have noise but strong crew availability from NKY hubs.',
      'Compare NKY-based vs Cincinnati-city movers for total travel minimums.',
    ],
  },
  kenton: {
    marketNotes:
      'Kenton County includes Covington, Erlanger, and Independence with urban riverfront rehabs and suburban growth feeding the Cincinnati metro. Historic MainStrasse and Roebling Bridge proximity create parking challenges.',
    costs: {
      studioRange: '$590–$1,280',
      familyRange: '$2,350–$5,800',
      avgHourly: '$110–$168/hr for a 2-person crew',
      note: 'Kenton pricing reflects Covington riverfront hill streets, Cincinnati cross-river tolls, and urban loft elevator logistics.',
    },
    tips: [
      'Covington hill streets and one-way grids complicate truck staging — expect shuttle use near MainStrasse.',
      'Riverfront condos need freight elevator slots; older buildings lack modern docks.',
      'Brent Spence Bridge corridor backups delay cross-river crews — plan morning crossings.',
      'Erlanger industrial-adjacent neighborhoods have truck traffic — protect inventory from dust.',
      'Historic rehab properties need plaster-wall protection — specify materials in the contract.',
    ],
  },
};
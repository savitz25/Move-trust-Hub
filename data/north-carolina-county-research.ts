import type { CountyCostGuide } from '@/lib/local-movers/county-seo';

export type CuratedCountyResearch = {
  marketNotes: string;
  costs: CountyCostGuide;
  tips: string[];
};

/** Hand-curated North Carolina county research — grows incrementally per batch */
export const northCarolinaCountyResearch: Record<string, CuratedCountyResearch> =
  {
    wake: {
      marketNotes:
        'Wake County is one of the fastest-growing counties in the United States, with strong demand driven by technology, education, and corporate relocations centered on Raleigh, Cary, and Apex.',
      costs: {
        studioRange: '$750–$1,500',
        familyRange: '$2,600–$5,800',
        avgHourly: '$115–$170/hr for a 2-person crew',
        note: 'Wake County pricing reflects Research Triangle metro growth, corporate relocation volume, Cary and Apex suburban turnover, and peak summer moving season demand.',
      },
      tips: [
        'Verify explicit coverage for Raleigh, Cary, Apex, and surrounding Wake County addresses before booking.',
        'Research Triangle traffic on I-40, I-440, and US-1 significantly impacts scheduling — confirm crew arrival windows.',
        'Confirm insurance and valuation for high-value tech and corporate relocations before booking.',
        'Book early for peak seasons and month-end lease turnover.',
        'Obtain multiple written estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
      ],
    },
    mecklenburg: {
      marketNotes:
        'Mecklenburg County is the most populous county in North Carolina and a major economic hub with rapid suburban and urban growth centered on Charlotte, Matthews, and Huntersville.',
      costs: {
        studioRange: '$800–$1,600',
        familyRange: '$2,800–$6,200',
        avgHourly: '$120–$175/hr for a 2-person crew',
        note: 'Mecklenburg County pricing reflects Charlotte metro growth, Uptown and South End turnover, Matthews and Huntersville suburban demand, and heavy I-77 and I-485 traffic.',
      },
      tips: [
        'Verify explicit coverage for Charlotte, Matthews, Huntersville, and Cornelius areas before booking.',
        'Heavy Charlotte metro traffic on I-77, I-485, and US-74 significantly impacts scheduling — confirm crew arrival windows.',
        'Confirm insurance and valuation for high-value urban and suburban homes before booking.',
        'Book early for peak moving seasons and month-end lease turnover.',
        'Obtain multiple written estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
      ],
    },
    guilford: {
      marketNotes:
        'Guilford County is a major Piedmont Triad hub with strong corporate, educational, and residential moving demand centered on Greensboro and High Point.',
      costs: {
        studioRange: '$700–$1,400',
        familyRange: '$2,400–$5,300',
        avgHourly: '$110–$165/hr for a 2-person crew',
        note: 'Guilford County pricing reflects Piedmont Triad growth, Greensboro and High Point suburban turnover, and I-40 and I-85 corridor traffic.',
      },
      tips: [
        'Verify explicit coverage for Greensboro, High Point, and surrounding Guilford County areas before booking.',
        'Triad highway traffic on I-40, I-85, and US-29 significantly impacts scheduling — confirm crew arrival windows.',
        'Confirm insurance and valuation for high-value homes and corporate relocations before booking.',
        'Book early for peak moving seasons and month-end lease turnover.',
        'Obtain multiple written estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
      ],
    },
    forsyth: {
      marketNotes:
        'Forsyth County is a key Piedmont Triad county with significant corporate, medical, and residential activity centered on Winston-Salem.',
      costs: {
        studioRange: '$700–$1,400',
        familyRange: '$2,400–$5,300',
        avgHourly: '$110–$165/hr for a 2-person crew',
        note: 'Forsyth County pricing reflects Winston-Salem metro demand, medical and corporate relocation volume, and Triad highway traffic on I-40 and US-52.',
      },
      tips: [
        'Verify explicit coverage for Winston-Salem and surrounding Forsyth County areas before booking.',
        'Triad traffic on I-40, US-52, and Business 40 significantly impacts scheduling — confirm crew arrival windows.',
        'Confirm insurance and valuation for high-value homes before booking.',
        'Book early for peak moving seasons and month-end lease turnover.',
        'Obtain multiple written estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
      ],
    },
    durham: {
      marketNotes:
        'Durham County is a core part of the Research Triangle with strong demand from technology, education (Duke University), and healthcare sectors.',
      costs: {
        studioRange: '$750–$1,500',
        familyRange: '$2,600–$5,700',
        avgHourly: '$115–$170/hr for a 2-person crew',
        note: 'Durham County pricing reflects Research Triangle growth, RTP corporate relocation volume, Duke and medical-sector turnover, and I-40 and US-15-501 corridor traffic.',
      },
      tips: [
        'Verify explicit coverage for Durham, RTP, and surrounding Durham County areas before booking.',
        'Research Triangle traffic on I-40, NC-147, and US-15-501 significantly impacts scheduling — confirm crew arrival windows.',
        'Confirm insurance and valuation for high-value tech, university, and medical relocations before booking.',
        'Book early for peak moving seasons and month-end lease turnover.',
        'Obtain multiple written estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
      ],
    },
    cumberland: {
      marketNotes:
        'Cumberland County is a major military hub (Fort Liberty) with significant residential and relocation demand centered on Fayetteville.',
      costs: {
        studioRange: '$650–$1,300',
        familyRange: '$2,300–$5,100',
        avgHourly: '$100–$155/hr for a 2-person crew',
        note: 'Cumberland County pricing reflects Fort Liberty PCS volume, Fayetteville suburban turnover, and seasonal military relocation surges.',
      },
      tips: [
        'Verify explicit coverage for Fayetteville and Fort Liberty area addresses before booking.',
        'Military moves require specific PCS experience and documentation — confirm mover familiarity with Fort Liberty relocations.',
        'Confirm insurance and valuation for high-value and military household goods before booking.',
        'Book early for peak moving seasons and military transfer windows.',
        'Obtain multiple written estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
      ],
    },
    buncombe: {
      marketNotes:
        'Buncombe County is a premier mountain and tourism destination with strong residential, retirement, and arts-related moving demand centered on Asheville.',
      costs: {
        studioRange: '$700–$1,450',
        familyRange: '$2,500–$5,600',
        avgHourly: '$110–$165/hr for a 2-person crew',
        note: 'Buncombe County pricing reflects Asheville metro demand, mountain-access logistics, historic-home handling, and peak tourist-season scheduling.',
      },
      tips: [
        'Verify explicit coverage for Asheville and surrounding Buncombe County mountain areas before booking.',
        'Mountain roads and weather conditions require specialized experience — confirm crew familiarity with steep driveways and narrow access.',
        'Confirm insurance and valuation for high-value mountain and historic homes before booking.',
        'Book early for peak tourist seasons and summer relocation windows.',
        'Obtain multiple written estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
      ],
    },
    union: {
      marketNotes:
        'Union County is one of the fastest-growing counties in North Carolina with strong suburban residential demand on the southeast side of Charlotte.',
      costs: {
        studioRange: '$750–$1,500',
        familyRange: '$2,600–$5,700',
        avgHourly: '$115–$170/hr for a 2-person crew',
        note: 'Union County pricing reflects Charlotte metro spillover growth, Monroe and Indian Trail suburban turnover, and I-485 and US-74 corridor traffic.',
      },
      tips: [
        'Verify explicit coverage for Monroe, Indian Trail, Waxhaw, and Stallings areas before booking.',
        'Charlotte-area traffic on I-485, US-74, and NC-16 significantly impacts scheduling — confirm crew arrival windows.',
        'Confirm insurance and valuation for high-value suburban homes before booking.',
        'Book early for peak moving seasons and month-end lease turnover.',
        'Obtain multiple written estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
      ],
    },
    johnston: {
      marketNotes:
        'Johnston County is a rapidly growing county in the Research Triangle region with strong suburban expansion centered on Smithfield, Clayton, and Selma.',
      costs: {
        studioRange: '$700–$1,400',
        familyRange: '$2,400–$5,400',
        avgHourly: '$110–$165/hr for a 2-person crew',
        note: 'Johnston County pricing reflects Raleigh metro spillover growth, Clayton and Smithfield suburban demand, and I-40 and US-70 corridor traffic.',
      },
      tips: [
        'Verify explicit coverage for Smithfield, Clayton, and Selma areas before booking.',
        'Raleigh-area traffic on I-40, I-95, and US-70 significantly impacts scheduling — confirm crew arrival windows.',
        'Confirm insurance and valuation for high-value suburban homes before booking.',
        'Book early for peak moving seasons and month-end lease turnover.',
        'Obtain multiple written estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
      ],
    },
    cabarrus: {
      marketNotes:
        'Cabarrus County is a fast-growing county northeast of Charlotte with strong residential and motorsports-related demand centered on Concord and Kannapolis.',
      costs: {
        studioRange: '$700–$1,450',
        familyRange: '$2,500–$5,600',
        avgHourly: '$110–$165/hr for a 2-person crew',
        note: 'Cabarrus County pricing reflects Charlotte metro growth, Concord and Kannapolis suburban turnover, and I-85 and US-29 corridor traffic.',
      },
      tips: [
        'Verify explicit coverage for Concord, Kannapolis, and Harrisburg areas before booking.',
        'Charlotte-area traffic on I-85, I-485, and US-29 significantly impacts scheduling — confirm crew arrival windows.',
        'Confirm insurance and valuation for high-value homes before booking.',
        'Book early for peak moving seasons and month-end lease turnover.',
        'Obtain multiple written estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
      ],
    },
    gaston: {
      marketNotes:
        'Gaston County is a growing county west of Charlotte with strong industrial and residential activity centered on Gastonia, Belmont, and Mount Holly.',
      costs: {
        studioRange: '$650–$1,350',
        familyRange: '$2,300–$5,200',
        avgHourly: '$105–$160/hr for a 2-person crew',
        note: 'Gaston County pricing reflects Charlotte metro west-side demand, Gastonia suburban turnover, and I-85 and US-74 corridor traffic.',
      },
      tips: [
        'Verify explicit coverage for Gastonia, Belmont, and Mount Holly areas before booking.',
        'Charlotte-area traffic on I-85, I-485, and US-74 significantly impacts scheduling — confirm crew arrival windows.',
        'Confirm insurance and valuation for high-value homes before booking.',
        'Book early for peak moving seasons and month-end lease turnover.',
        'Obtain multiple written estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
      ],
    },
    'new-hanover': {
      marketNotes:
        'New Hanover County is a coastal county with strong tourism, retirement, and port-related moving demand centered on Wilmington.',
      costs: {
        studioRange: '$750–$1,500',
        familyRange: '$2,600–$5,800',
        avgHourly: '$115–$170/hr for a 2-person crew',
        note: 'New Hanover County pricing reflects coastal access logistics, Wrightsville Beach and Carolina Beach demand, hurricane-season scheduling, and peak tourist-season volume.',
      },
      tips: [
        'Verify explicit coverage for Wilmington, Wrightsville Beach, and Carolina Beach areas before booking.',
        'Coastal access and hurricane-season considerations are critical — confirm crew availability and weather contingency plans.',
        'Confirm insurance and valuation for high-value waterfront properties before booking.',
        'Book early for peak tourist seasons and summer relocation windows.',
        'Obtain multiple written estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
      ],
    },
  };

export function getNorthCarolinaCountyResearch(
  countySlug: string
): CuratedCountyResearch | undefined {
  return northCarolinaCountyResearch[countySlug];
}
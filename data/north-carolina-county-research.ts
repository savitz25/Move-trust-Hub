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
    onslow: {
      marketNotes:
        'Onslow County is a major military hub (Camp Lejeune and MCAS New River) with significant residential and relocation demand centered on Jacksonville.',
      costs: {
        studioRange: '$650–$1,350',
        familyRange: '$2,300–$5,200',
        avgHourly: '$100–$155/hr for a 2-person crew',
        note: 'Onslow County pricing reflects Camp Lejeune PCS volume, Jacksonville suburban turnover, and seasonal military relocation surges.',
      },
      tips: [
        'Verify explicit coverage for Jacksonville and surrounding Onslow County areas before booking.',
        'Military moves require specific PCS experience and documentation — confirm mover familiarity with Camp Lejeune relocations.',
        'Confirm insurance and valuation for high-value and military household goods before booking.',
        'Book early for peak moving seasons and military transfer windows.',
        'Obtain multiple written estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
      ],
    },
    iredell: {
      marketNotes:
        'Iredell County is a growing county north of Charlotte with strong residential and lake-area demand centered on Statesville and Mooresville along Lake Norman.',
      costs: {
        studioRange: '$700–$1,400',
        familyRange: '$2,400–$5,400',
        avgHourly: '$110–$165/hr for a 2-person crew',
        note: 'Iredell County pricing reflects Charlotte metro north-side growth, Lake Norman waterfront demand, and I-77 and I-40 corridor traffic.',
      },
      tips: [
        'Verify explicit coverage for Statesville, Mooresville, and Lake Norman areas before booking.',
        'Charlotte-area traffic on I-77, I-40, and NC-150 significantly impacts scheduling — confirm crew arrival windows.',
        'Confirm insurance and valuation for high-value lake and suburban homes before booking.',
        'Book early for peak moving seasons and month-end lease turnover.',
        'Obtain multiple written estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
      ],
    },
    alamance: {
      marketNotes:
        'Alamance County is a growing county in the Piedmont Triad with strong residential and industrial demand centered on Burlington, Graham, and Mebane.',
      costs: {
        studioRange: '$650–$1,300',
        familyRange: '$2,300–$5,100',
        avgHourly: '$105–$160/hr for a 2-person crew',
        note: 'Alamance County pricing reflects Piedmont Triad growth, Burlington and Mebane suburban turnover, and I-40 and I-85 corridor traffic.',
      },
      tips: [
        'Verify explicit coverage for Burlington, Graham, and Mebane areas before booking.',
        'Triad traffic on I-40, I-85, and US-70 significantly impacts scheduling — confirm crew arrival windows.',
        'Confirm insurance and valuation for high-value homes before booking.',
        'Book early for peak moving seasons and month-end lease turnover.',
        'Obtain multiple written estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
      ],
    },
    pitt: {
      marketNotes:
        'Pitt County is a major eastern North Carolina hub with strong educational (East Carolina University) and medical demand centered on Greenville.',
      costs: {
        studioRange: '$650–$1,350',
        familyRange: '$2,300–$5,200',
        avgHourly: '$100–$155/hr for a 2-person crew',
        note: 'Pitt County pricing reflects ECU student and faculty turnover, Greenville suburban growth, and eastern NC regional travel logistics.',
      },
      tips: [
        'Verify explicit coverage for Greenville and surrounding Pitt County areas before booking.',
        'University and medical-sector traffic on Memorial Drive and Greenville Boulevard impacts scheduling — confirm crew arrival windows.',
        'Confirm insurance and valuation for high-value homes before booking.',
        'Book early for peak moving seasons and academic-year turnover.',
        'Obtain multiple written estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
      ],
    },
    brunswick: {
      marketNotes:
        'Brunswick County is a rapidly growing coastal county with strong retirement and beach community demand centered on Leland, Shallotte, and Southport.',
      costs: {
        studioRange: '$750–$1,500',
        familyRange: '$2,600–$5,800',
        avgHourly: '$115–$170/hr for a 2-person crew',
        note: 'Brunswick County pricing reflects coastal island and mainland access, retirement-community turnover, hurricane-season scheduling, and peak tourist-season volume.',
      },
      tips: [
        'Verify explicit coverage for Leland, Shallotte, and Southport areas before booking.',
        'Coastal access and hurricane-season considerations are critical — confirm crew availability and weather contingency plans.',
        'Confirm insurance and valuation for high-value waterfront properties before booking.',
        'Book early for peak tourist seasons and summer relocation windows.',
        'Obtain multiple written estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
      ],
    },
    davidson: {
      marketNotes:
        'Davidson County is a growing county in the Piedmont Triad with strong industrial and residential activity centered on Lexington and Thomasville.',
      costs: {
        studioRange: '$650–$1,300',
        familyRange: '$2,300–$5,100',
        avgHourly: '$105–$160/hr for a 2-person crew',
        note: 'Davidson County pricing reflects Triad industrial corridor demand, Lexington and Thomasville suburban turnover, and I-85 and US-64 traffic.',
      },
      tips: [
        'Verify explicit coverage for Lexington, Thomasville, and surrounding Davidson County areas before booking.',
        'Triad traffic on I-85, US-64, and NC-109 significantly impacts scheduling — confirm crew arrival windows.',
        'Confirm insurance and valuation for high-value homes before booking.',
        'Book early for peak moving seasons and month-end lease turnover.',
        'Obtain multiple written estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
      ],
    },
    catawba: {
      marketNotes:
        'Catawba County is a key manufacturing and residential county in the western Piedmont with strong growth around Hickory, Newton, and Conover.',
      costs: {
        studioRange: '$650–$1,350',
        familyRange: '$2,300–$5,100',
        avgHourly: '$100–$155/hr for a 2-person crew',
        note: 'Catawba County pricing reflects Hickory-Lenoir metro manufacturing corridor demand, Newton and Conover suburban turnover, and regional I-40 and US-321 traffic.',
      },
      tips: [
        'Verify explicit coverage for Hickory, Newton, and Conover areas before booking.',
        'Regional traffic patterns on I-40, US-321, and US-70 significantly impact scheduling — confirm crew arrival windows.',
        'Confirm insurance and valuation for high-value homes before booking.',
        'Book early for peak moving seasons and month-end lease turnover.',
        'Obtain multiple written estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
      ],
    },
    rowan: {
      marketNotes:
        'Rowan County is a growing county north of Charlotte with strong historic and residential demand centered on Salisbury, Kannapolis, and China Grove.',
      costs: {
        studioRange: '$650–$1,350',
        familyRange: '$2,300–$5,100',
        avgHourly: '$105–$160/hr for a 2-person crew',
        note: 'Rowan County pricing reflects Charlotte-metro northward growth, Salisbury historic-home turnover, and I-85 corridor traffic.',
      },
      tips: [
        'Verify explicit coverage for Salisbury, Kannapolis, and China Grove areas before booking.',
        'Charlotte-area traffic on I-85 and US-29 significantly impacts scheduling — confirm crew arrival windows.',
        'Confirm insurance and valuation for high-value historic homes before booking.',
        'Book early for peak moving seasons and month-end lease turnover.',
        'Obtain multiple written estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
      ],
    },
    harnett: {
      marketNotes:
        'Harnett County is a rapidly growing county in the Research Triangle region with strong suburban expansion centered on Lillington, Dunn, and Angier.',
      costs: {
        studioRange: '$650–$1,350',
        familyRange: '$2,300–$5,100',
        avgHourly: '$105–$160/hr for a 2-person crew',
        note: 'Harnett County pricing reflects Raleigh-metro southward suburban growth, Fort Liberty spillover demand, and US-401 and US-421 corridor traffic.',
      },
      tips: [
        'Verify explicit coverage for Lillington, Dunn, and Angier areas before booking.',
        'Raleigh-area traffic on US-401, US-421, and I-40 significantly impacts scheduling — confirm crew arrival windows.',
        'Confirm insurance and valuation for high-value suburban homes before booking.',
        'Book early for peak moving seasons and month-end lease turnover.',
        'Obtain multiple written estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
      ],
    },
    orange: {
      marketNotes:
        'Orange County is a highly educated and affluent county with strong demand from the University of North Carolina at Chapel Hill and the Research Triangle.',
      costs: {
        studioRange: '$750–$1,500',
        familyRange: '$2,600–$5,700',
        avgHourly: '$115–$170/hr for a 2-person crew',
        note: 'Orange County pricing reflects Chapel Hill university turnover, Carrboro and Hillsborough residential demand, and Research Triangle corridor traffic.',
      },
      tips: [
        'Verify explicit coverage for Chapel Hill, Hillsborough, and Carrboro areas before booking.',
        'University and Research Triangle traffic on I-40, US-15-501, and NC-86 significantly impacts scheduling — confirm crew arrival windows.',
        'Confirm insurance and valuation for high-value homes before booking.',
        'Book early for peak moving seasons and academic-year turnover.',
        'Obtain multiple written estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
      ],
    },
    randolph: {
      marketNotes:
        'Randolph County is a growing county in the Piedmont Triad with strong manufacturing and residential activity centered on Asheboro.',
      costs: {
        studioRange: '$650–$1,300',
        familyRange: '$2,300–$5,100',
        avgHourly: '$105–$160/hr for a 2-person crew',
        note: 'Randolph County pricing reflects Piedmont Triad manufacturing corridor demand, Asheboro suburban turnover, and I-73 and US-64 traffic.',
      },
      tips: [
        'Verify explicit coverage for Asheboro and surrounding Randolph County areas before booking.',
        'Triad traffic on I-73, US-64, and NC-49 significantly impacts scheduling — confirm crew arrival windows.',
        'Confirm insurance and valuation for high-value homes before booking.',
        'Book early for peak moving seasons and month-end lease turnover.',
        'Obtain multiple written estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
      ],
    },
    henderson: {
      marketNotes:
        'Henderson County is a scenic mountain county with strong retirement and tourism demand centered on Hendersonville.',
      costs: {
        studioRange: '$700–$1,450',
        familyRange: '$2,500–$5,600',
        avgHourly: '$110–$165/hr for a 2-person crew',
        note: 'Henderson County pricing reflects mountain-road access, retirement-community turnover, peak tourist-season volume, and Asheville-metro spillover demand.',
      },
      tips: [
        'Verify explicit coverage for Hendersonville and surrounding mountain areas before booking.',
        'Mountain roads and weather conditions require specialized experience — confirm crew familiarity with steep-driveway and seasonal access challenges.',
        'Confirm insurance and valuation for high-value mountain homes before booking.',
        'Book early for peak tourist seasons and summer relocation windows.',
        'Obtain multiple written estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
      ],
    },
    wayne: {
      marketNotes:
        'Wayne County is a major military hub (Seymour Johnson Air Force Base) with significant residential and relocation demand centered on Goldsboro.',
      costs: {
        studioRange: '$650–$1,300',
        familyRange: '$2,300–$5,100',
        avgHourly: '$100–$155/hr for a 2-person crew',
        note: 'Wayne County pricing reflects Seymour Johnson AFB PCS volume, Goldsboro suburban turnover, and eastern NC regional travel logistics.',
      },
      tips: [
        'Verify explicit coverage for Goldsboro and surrounding Wayne County areas before booking.',
        'Military moves require specific PCS experience and documentation — confirm mover familiarity with Seymour Johnson AFB relocations.',
        'Confirm insurance and valuation for high-value and military household goods before booking.',
        'Book early for peak moving seasons and military transfer windows.',
        'Obtain multiple written estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
      ],
    },
    robeson: {
      marketNotes:
        'Robeson County is a rural county in southeastern North Carolina with agricultural and residential demand centered on Lumberton.',
      costs: {
        studioRange: '$550–$1,100',
        familyRange: '$1,900–$4,300',
        avgHourly: '$95–$145/hr for a 2-person crew',
        note: 'Robeson County pricing reflects rural access challenges, limited local mover availability, and Fayetteville-metro regional service logistics.',
      },
      tips: [
        'Rural access challenges are common — confirm crew familiarity with Lumberton-area roads and long-driveway properties.',
        'Verify explicit regional service to Lumberton before booking; most crews dispatch from Fayetteville or surrounding metros.',
        'Storage is very limited locally — coordinate with regional facilities if needed.',
        'Obtain multiple written estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
        'Confirm credentials and insurance for rural moves before booking.',
      ],
    },
    moore: {
      marketNotes:
        'Moore County is known for golf resorts, retirement communities, and Fort Liberty spillover influence with strong residential demand centered on Pinehurst, Southern Pines, and Aberdeen.',
      costs: {
        studioRange: '$700–$1,400',
        familyRange: '$2,400–$5,400',
        avgHourly: '$105–$160/hr for a 2-person crew',
        note: 'Moore County pricing reflects Sandhills resort-community turnover, retirement-community access, and Fayetteville-metro regional service demand.',
      },
      tips: [
        'Verify explicit coverage for Pinehurst, Southern Pines, and Aberdeen areas before booking.',
        'Golf resort and retirement community access considerations apply — confirm crew familiarity with gated communities and narrow resort roads.',
        'Confirm insurance and valuation for high-value homes before booking.',
        'Book early for peak moving seasons and month-end lease turnover.',
        'Obtain multiple written estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
      ],
    },
    craven: {
      marketNotes:
        'Craven County is a historic coastal county with strong retirement, military, and tourism demand centered on New Bern and Havelock.',
      costs: {
        studioRange: '$650–$1,350',
        familyRange: '$2,300–$5,200',
        avgHourly: '$100–$155/hr for a 2-person crew',
        note: 'Craven County pricing reflects coastal island and mainland access, historic-home turnover, hurricane-season scheduling, and Cherry Point military spillover demand.',
      },
      tips: [
        'Verify explicit coverage for New Bern and Havelock areas before booking.',
        'Coastal access and hurricane-season considerations are critical — confirm crew availability and weather contingency plans.',
        'Confirm insurance and valuation for high-value historic homes before booking.',
        'Book early for peak tourist seasons and summer relocation windows.',
        'Obtain multiple written estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
      ],
    },
    cleveland: {
      marketNotes:
        'Cleveland County is a growing county west of Charlotte with industrial and residential demand centered on Shelby.',
      costs: {
        studioRange: '$600–$1,250',
        familyRange: '$2,200–$4,900',
        avgHourly: '$100–$155/hr for a 2-person crew',
        note: 'Cleveland County pricing reflects Charlotte-metro westward growth, Shelby suburban turnover, and I-85 corridor traffic.',
      },
      tips: [
        'Verify explicit coverage for Shelby and surrounding Cleveland County areas before booking.',
        'Charlotte-area traffic on I-85 and US-74 significantly impacts scheduling — confirm crew arrival windows.',
        'Confirm insurance and valuation for high-value homes before booking.',
        'Book early for peak moving seasons and month-end lease turnover.',
        'Obtain multiple written estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
      ],
    },
    nash: {
      marketNotes:
        'Nash County is a growing county in eastern North Carolina with residential and industrial demand centered on Rocky Mount and Nashville.',
      costs: {
        studioRange: '$600–$1,250',
        familyRange: '$2,200–$4,900',
        avgHourly: '$100–$155/hr for a 2-person crew',
        note: 'Nash County pricing reflects eastern NC regional travel logistics, Rocky Mount suburban turnover, and US-64 and I-95 corridor traffic.',
      },
      tips: [
        'Verify explicit coverage for Rocky Mount and Nashville areas before booking.',
        'Regional traffic on US-64, US-301, and I-95 significantly impacts scheduling — confirm crew arrival windows.',
        'Confirm insurance and valuation for high-value homes before booking.',
        'Book early for peak moving seasons and month-end lease turnover.',
        'Obtain multiple written estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
      ],
    },
    lincoln: {
      marketNotes:
        'Lincoln County is a growing county northwest of Charlotte with strong residential demand near Lake Norman and Lincolnton.',
      costs: {
        studioRange: '$700–$1,400',
        familyRange: '$2,400–$5,300',
        avgHourly: '$110–$165/hr for a 2-person crew',
        note: 'Lincoln County pricing reflects Lake Norman area growth, Lincolnton suburban turnover, and Charlotte-metro northwest corridor traffic.',
      },
      tips: [
        'Verify explicit coverage for Lincolnton and surrounding Lincoln County areas before booking.',
        'Charlotte-area traffic on NC-16 and I-77 significantly impacts scheduling — confirm crew arrival windows.',
        'Confirm insurance and valuation for high-value homes before booking.',
        'Book early for peak moving seasons and month-end lease turnover.',
        'Obtain multiple written estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
      ],
    },
    rockingham: {
      marketNotes:
        'Rockingham County is a rural county in the northern Piedmont Triad with residential demand centered on Reidsville, Eden, and Wentworth.',
      costs: {
        studioRange: '$600–$1,250',
        familyRange: '$2,200–$4,900',
        avgHourly: '$100–$155/hr for a 2-person crew',
        note: 'Rockingham County pricing reflects northern Triad rural access, Reidsville suburban turnover, and US-29 and US-158 corridor traffic.',
      },
      tips: [
        'Verify explicit coverage for Reidsville, Eden, and surrounding Rockingham County areas before booking.',
        'Triad traffic on US-29, US-158, and US-220 significantly impacts scheduling — confirm crew arrival windows.',
        'Confirm insurance and valuation for high-value homes before booking.',
        'Book early for peak moving seasons and month-end lease turnover.',
        'Obtain multiple written estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
      ],
    },
    burke: {
      marketNotes:
        'Burke County is a scenic mountain county with residential and industrial demand centered on Morganton.',
      costs: {
        studioRange: '$600–$1,250',
        familyRange: '$2,200–$4,900',
        avgHourly: '$100–$155/hr for a 2-person crew',
        note: 'Burke County pricing reflects mountain-road access, Hickory-metro regional service, and I-40 corridor traffic through the foothills.',
      },
      tips: [
        'Verify explicit coverage for Morganton and surrounding mountain areas before booking.',
        'Mountain roads and weather conditions require specialized experience — confirm crew familiarity with foothill access challenges.',
        'Confirm insurance and valuation for high-value mountain homes before booking.',
        'Book early for peak moving seasons and month-end lease turnover.',
        'Obtain multiple written estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
      ],
    },
    chatham: {
      marketNotes:
        'Chatham County is a growing county in the Research Triangle with strong suburban and rural residential demand centered on Pittsboro.',
      costs: {
        studioRange: '$700–$1,400',
        familyRange: '$2,400–$5,300',
        avgHourly: '$110–$165/hr for a 2-person crew',
        note: 'Chatham County pricing reflects Research Triangle southward suburban growth, Pittsboro and Siler City turnover, and US-64 and US-15-501 corridor traffic.',
      },
      tips: [
        'Verify explicit coverage for Pittsboro and surrounding Chatham County areas before booking.',
        'Raleigh-area traffic on US-64, US-15-501, and US-1 significantly impacts scheduling — confirm crew arrival windows.',
        'Confirm insurance and valuation for high-value homes before booking.',
        'Book early for peak moving seasons and month-end lease turnover.',
        'Obtain multiple written estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
      ],
    },
    franklin: {
      marketNotes:
        'Franklin County is a growing rural-suburban county north of Raleigh with increasing residential demand centered on Louisburg.',
      costs: {
        studioRange: '$650–$1,350',
        familyRange: '$2,300–$5,100',
        avgHourly: '$105–$160/hr for a 2-person crew',
        note: 'Franklin County pricing reflects Raleigh-metro northward growth, Louisburg suburban turnover, and US-1 and US-401 corridor traffic.',
      },
      tips: [
        'Verify explicit coverage for Louisburg and surrounding Franklin County areas before booking.',
        'Raleigh-area traffic on US-1 and US-401 significantly impacts scheduling — confirm crew arrival windows.',
        'Confirm insurance and valuation for high-value homes before booking.',
        'Book early for peak moving seasons and month-end lease turnover.',
        'Obtain multiple written estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
      ],
    },
    wilson: {
      marketNotes:
        'Wilson County is a growing county in eastern North Carolina with strong agricultural and residential activity centered on Wilson.',
      costs: {
        studioRange: '$600–$1,250',
        familyRange: '$2,200–$4,900',
        avgHourly: '$100–$155/hr for a 2-person crew',
        note: 'Wilson County pricing reflects eastern NC regional travel logistics, Wilson suburban turnover, and US-264 and I-95 corridor traffic.',
      },
      tips: [
        'Verify explicit coverage for Wilson and surrounding Wilson County areas before booking.',
        'Regional traffic on US-264, US-301, and I-95 significantly impacts scheduling — confirm crew arrival windows.',
        'Confirm insurance and valuation for high-value homes before booking.',
        'Book early for peak moving seasons and month-end lease turnover.',
        'Obtain multiple written estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
      ],
    },
    caldwell: {
      marketNotes:
        'Caldwell County is a mountain-adjacent county in western North Carolina with industrial and residential demand centered on Lenoir.',
      costs: {
        studioRange: '$600–$1,250',
        familyRange: '$2,200–$4,900',
        avgHourly: '$100–$155/hr for a 2-person crew',
        note: 'Caldwell County pricing reflects foothills mountain-road access, Hickory-metro regional service, and US-321 corridor traffic.',
      },
      tips: [
        'Verify explicit coverage for Lenoir and surrounding Caldwell County areas before booking.',
        'Mountain roads and weather conditions require specialized experience — confirm crew familiarity with foothill access challenges.',
        'Confirm insurance and valuation for high-value homes before booking.',
        'Book early for peak moving seasons and month-end lease turnover.',
        'Obtain multiple written estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
      ],
    },
    pender: {
      marketNotes:
        'Pender County is a growing coastal county with strong residential and retirement demand near Wilmington centered on Burgaw and Hampstead.',
      costs: {
        studioRange: '$700–$1,400',
        familyRange: '$2,400–$5,400',
        avgHourly: '$110–$165/hr for a 2-person crew',
        note: 'Pender County pricing reflects coastal mainland and island access, retirement-community turnover, hurricane-season scheduling, and Wilmington-metro spillover demand.',
      },
      tips: [
        'Verify explicit coverage for Burgaw and coastal Pender County areas before booking.',
        'Coastal access and hurricane-season considerations are critical — confirm crew availability and weather contingency plans.',
        'Confirm insurance and valuation for high-value waterfront properties before booking.',
        'Book early for peak tourist seasons and summer relocation windows.',
        'Obtain multiple written estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
      ],
    },
    surry: {
      marketNotes:
        'Surry County is a rural county in the northern Piedmont with strong agricultural and residential demand centered on Mount Airy and Dobson.',
      costs: {
        studioRange: '$600–$1,250',
        familyRange: '$2,200–$4,900',
        avgHourly: '$100–$155/hr for a 2-person crew',
        note: 'Surry County pricing reflects northern Triad rural access, Mount Airy suburban turnover, and US-52 and US-601 corridor traffic.',
      },
      tips: [
        'Verify explicit coverage for Mount Airy and surrounding Surry County areas before booking.',
        'Rural access challenges are common — confirm crew familiarity with Surry County roads and longer regional routes.',
        'Confirm insurance and valuation for high-value homes before booking.',
        'Book early for peak moving seasons and month-end lease turnover.',
        'Obtain multiple written estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
      ],
    },
    lee: {
      marketNotes:
        'Lee County is a growing county with industrial and residential demand between Raleigh and Fayetteville centered on Sanford.',
      costs: {
        studioRange: '$650–$1,300',
        familyRange: '$2,300–$5,100',
        avgHourly: '$105–$160/hr for a 2-person crew',
        note: 'Lee County pricing reflects Research Triangle southward suburban growth, Sanford industrial corridor demand, and US-1 and US-421 traffic.',
      },
      tips: [
        'Verify explicit coverage for Sanford and surrounding Lee County areas before booking.',
        'Regional traffic on US-1, US-421, and US-87 significantly impacts scheduling — confirm crew arrival windows.',
        'Confirm insurance and valuation for high-value homes before booking.',
        'Book early for peak moving seasons and month-end lease turnover.',
        'Obtain multiple written estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
      ],
    },
    carteret: {
      marketNotes:
        'Carteret County is a coastal county with strong tourism, retirement, and waterfront residential demand centered on Morehead City, Beaufort, and Emerald Isle.',
      costs: {
        studioRange: '$750–$1,500',
        familyRange: '$2,600–$5,800',
        avgHourly: '$115–$170/hr for a 2-person crew',
        note: 'Carteret County pricing reflects Crystal Coast island and mainland access, peak tourist-season volume, hurricane-season scheduling, and waterfront-property handling.',
      },
      tips: [
        'Verify explicit coverage for Morehead City, Beaufort, and Emerald Isle areas before booking.',
        'Coastal access and hurricane-season considerations are critical — confirm crew availability and weather contingency plans.',
        'Confirm insurance and valuation for high-value waterfront properties before booking.',
        'Book early for peak tourist seasons and summer relocation windows.',
        'Obtain multiple written estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
      ],
    },
    stanly: {
      marketNotes:
        'Stanly County is a growing county east of Charlotte with residential and industrial demand centered on Albemarle.',
      costs: {
        studioRange: '$600–$1,250',
        familyRange: '$2,200–$4,900',
        avgHourly: '$100–$155/hr for a 2-person crew',
        note: 'Stanly County pricing reflects Charlotte-metro eastward growth, Albemarle suburban turnover, and US-52 and NC-24 corridor traffic.',
      },
      tips: [
        'Verify explicit coverage for Albemarle and surrounding Stanly County areas before booking.',
        'Regional traffic on US-52 and NC-24 significantly impacts scheduling — confirm crew arrival windows.',
        'Confirm insurance and valuation for high-value homes before booking.',
        'Book early for peak moving seasons and month-end lease turnover.',
        'Obtain multiple written estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
      ],
    },
    wilkes: {
      marketNotes:
        'Wilkes County is a scenic mountain county with strong rural and residential demand centered on Wilkesboro and North Wilkesboro.',
      costs: {
        studioRange: '$600–$1,250',
        familyRange: '$2,200–$4,900',
        avgHourly: '$100–$155/hr for a 2-person crew',
        note: 'Wilkes County pricing reflects mountain-road access, rural property logistics, and Hickory-metro regional service demand.',
      },
      tips: [
        'Verify explicit coverage for Wilkesboro and surrounding mountain areas before booking.',
        'Mountain roads and weather conditions require specialized experience — confirm crew familiarity with steep-driveway and seasonal access challenges.',
        'Confirm insurance and valuation for high-value mountain homes before booking.',
        'Book early for peak moving seasons and month-end lease turnover.',
        'Obtain multiple written estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
      ],
    },
    rutherford: {
      marketNotes:
        'Rutherford County is a rural mountain county with residential and agricultural demand centered on Rutherfordton and Forest City.',
      costs: {
        studioRange: '$600–$1,250',
        familyRange: '$2,200–$4,900',
        avgHourly: '$100–$155/hr for a 2-person crew',
        note: 'Rutherford County pricing reflects western NC foothills access, rural property logistics, and Charlotte- and Hickory-metro regional service demand.',
      },
      tips: [
        'Verify explicit coverage for Rutherfordton and Forest City areas before booking.',
        'Mountain roads and weather conditions require specialized experience — confirm crew familiarity with foothill and rural access challenges.',
        'Confirm insurance and valuation for high-value homes before booking.',
        'Book early for peak moving seasons and month-end lease turnover.',
        'Obtain multiple written estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
      ],
    },
    haywood: {
      marketNotes:
        'Haywood County is a scenic mountain county with strong tourism, retirement, and residential demand centered on Waynesville and Maggie Valley.',
      costs: {
        studioRange: '$700–$1,450',
        familyRange: '$2,500–$5,600',
        avgHourly: '$110–$165/hr for a 2-person crew',
        note: 'Haywood County pricing reflects Asheville-metro mountain spillover, tourism-season volume, steep-driveway access, and US-74 corridor traffic.',
      },
      tips: [
        'Verify explicit coverage for Waynesville and Maggie Valley areas before booking.',
        'Mountain roads and weather conditions require specialized experience — confirm crew familiarity with steep-driveway and seasonal access challenges.',
        'Confirm insurance and valuation for high-value mountain homes before booking.',
        'Book early for peak tourist seasons and summer relocation windows.',
        'Obtain multiple written estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
      ],
    },
    sampson: {
      marketNotes:
        'Sampson County is a rural agricultural county with growing residential demand centered on Clinton between Fayetteville and Wilmington.',
      costs: {
        studioRange: '$550–$1,100',
        familyRange: '$1,900–$4,300',
        avgHourly: '$95–$145/hr for a 2-person crew',
        note: 'Sampson County pricing reflects rural access logistics, limited local carrier availability, and Fayetteville- and Wilmington-metro regional service demand.',
      },
      tips: [
        'Rural access challenges are common — confirm crew familiarity with Sampson County roads and longer regional routes.',
        'Verify explicit regional service to Clinton and surrounding Sampson County areas before booking.',
        'Storage options are very limited locally — confirm availability if you need interim storage.',
        'Obtain multiple written estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
        'Confirm credentials and insurance for rural moves before booking.',
      ],
    },
    granville: {
      marketNotes:
        'Granville County is a growing county north of Durham with strong residential and industrial demand centered on Oxford.',
      costs: {
        studioRange: '$650–$1,350',
        familyRange: '$2,300–$5,100',
        avgHourly: '$105–$160/hr for a 2-person crew',
        note: 'Granville County pricing reflects Raleigh-Durham northward suburban growth, Oxford industrial corridor demand, and US-15 and I-85 corridor traffic.',
      },
      tips: [
        'Verify explicit coverage for Oxford and surrounding Granville County areas before booking.',
        'Raleigh-Durham traffic on I-85, US-15, and US-1 significantly impacts scheduling — confirm crew arrival windows.',
        'Confirm insurance and valuation for high-value homes before booking.',
        'Book early for peak moving seasons and month-end lease turnover.',
        'Obtain multiple written estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
      ],
    },
    hoke: {
      marketNotes:
        'Hoke County is a growing county near Fort Liberty with strong military and residential demand centered on Raeford.',
      costs: {
        studioRange: '$650–$1,350',
        familyRange: '$2,300–$5,100',
        avgHourly: '$105–$160/hr for a 2-person crew',
        note: 'Hoke County pricing reflects Fort Liberty military relocation volume, Raeford suburban growth, and Fayetteville-metro regional service demand.',
      },
      tips: [
        'Verify explicit coverage for Raeford and surrounding Hoke County areas before booking.',
        'Military moves require specific experience — confirm PCS handling, storage, and scheduling flexibility.',
        'Confirm insurance and valuation for high-value homes before booking.',
        'Book early for peak moving seasons and month-end lease turnover.',
        'Obtain multiple written estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
      ],
    },
    lenoir: {
      marketNotes:
        'Lenoir County is an eastern North Carolina county with agricultural and residential demand centered on Kinston.',
      costs: {
        studioRange: '$550–$1,150',
        familyRange: '$1,900–$4,400',
        avgHourly: '$95–$145/hr for a 2-person crew',
        note: 'Lenoir County pricing reflects eastern NC rural access, Kinston suburban turnover, and Goldsboro- and Greenville-metro regional service demand.',
      },
      tips: [
        'Verify explicit coverage for Kinston and surrounding Lenoir County areas before booking.',
        'Rural access challenges are common — confirm crew familiarity with Lenoir County roads and longer regional routes.',
        'Confirm insurance and valuation for high-value homes before booking.',
        'Book early for peak moving seasons and month-end lease turnover.',
        'Obtain multiple written estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
      ],
    },
    watauga: {
      marketNotes:
        'Watauga County is a mountain county with strong tourism, university (Appalachian State), and retirement demand centered on Boone.',
      costs: {
        studioRange: '$750–$1,500',
        familyRange: '$2,600–$5,800',
        avgHourly: '$115–$170/hr for a 2-person crew',
        note: 'Watauga County pricing reflects High Country mountain-road access, Appalachian State student turnover, peak tourist-season volume, and winter weather scheduling.',
      },
      tips: [
        'Verify explicit coverage for Boone and surrounding mountain areas before booking.',
        'Mountain roads and weather conditions require specialized experience — confirm crew familiarity with steep-driveway and seasonal access challenges.',
        'Confirm insurance and valuation for high-value mountain homes before booking.',
        'Book early for peak tourist seasons and university move-in/move-out windows.',
        'Obtain multiple written estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
      ],
    },
    duplin: {
      marketNotes:
        'Duplin County is a rural agricultural county with growing residential demand centered on Kenansville between Wilmington and Goldsboro.',
      costs: {
        studioRange: '$550–$1,150',
        familyRange: '$1,900–$4,400',
        avgHourly: '$95–$145/hr for a 2-person crew',
        note: 'Duplin County pricing reflects rural access logistics, limited local carrier availability, and Wilmington- and Goldsboro-metro regional service demand.',
      },
      tips: [
        'Rural access challenges are common — confirm crew familiarity with Duplin County roads and longer regional routes.',
        'Verify explicit regional service to Kenansville and surrounding Duplin County areas before booking.',
        'Storage options are very limited locally — confirm availability if you need interim storage.',
        'Obtain multiple written estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
        'Confirm credentials and insurance for rural moves before booking.',
      ],
    },
    columbus: {
      marketNotes:
        'Columbus County is a rural southeastern county with agricultural and residential demand centered on Whiteville near the Wilmington metro.',
      costs: {
        studioRange: '$550–$1,150',
        familyRange: '$1,900–$4,400',
        avgHourly: '$95–$145/hr for a 2-person crew',
        note: 'Columbus County pricing reflects rural access logistics, limited local carrier availability, and Wilmington-metro regional service demand.',
      },
      tips: [
        'Rural access challenges are common — confirm crew familiarity with Columbus County roads and longer regional routes.',
        'Verify explicit regional service to Whiteville and surrounding Columbus County areas before booking.',
        'Storage options are very limited locally — confirm availability if you need interim storage.',
        'Obtain multiple written estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
        'Confirm credentials and insurance for rural moves before booking.',
      ],
    },
    edgecombe: {
      marketNotes:
        'Edgecombe County is a rural county with residential and agricultural demand centered on Tarboro near Rocky Mount.',
      costs: {
        studioRange: '$550–$1,150',
        familyRange: '$1,900–$4,400',
        avgHourly: '$95–$145/hr for a 2-person crew',
        note: 'Edgecombe County pricing reflects eastern Piedmont rural access, Tarboro suburban turnover, and Rocky Mount-metro regional service demand.',
      },
      tips: [
        'Rural access challenges are common — confirm crew familiarity with Edgecombe County roads and longer regional routes.',
        'Verify explicit regional service to Tarboro and surrounding Edgecombe County areas before booking.',
        'Storage options are very limited locally — confirm availability if you need interim storage.',
        'Obtain multiple written estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
        'Confirm credentials and insurance for rural moves before booking.',
      ],
    },
    stokes: {
      marketNotes:
        'Stokes County is a rural county in the northern Piedmont Triad with scenic residential demand centered on Danbury and Walnut Cove.',
      costs: {
        studioRange: '$600–$1,250',
        familyRange: '$2,200–$4,900',
        avgHourly: '$100–$155/hr for a 2-person crew',
        note: 'Stokes County pricing reflects northern Triad rural access, scenic residential turnover, and Greensboro-metro regional service demand.',
      },
      tips: [
        'Rural access challenges are common — confirm crew familiarity with Stokes County roads and longer regional routes.',
        'Verify explicit regional service to Danbury and surrounding Stokes County areas before booking.',
        'Storage options are very limited locally — confirm availability if you need interim storage.',
        'Obtain multiple written estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
        'Confirm credentials and insurance for rural moves before booking.',
      ],
    },
    davie: {
      marketNotes:
        'Davie County is a rural-suburban county in the Piedmont Triad with steady residential growth centered on Mocksville.',
      costs: {
        studioRange: '$650–$1,300',
        familyRange: '$2,300–$5,000',
        avgHourly: '$105–$160/hr for a 2-person crew',
        note: 'Davie County pricing reflects Winston-Salem Triad suburban spillover, Mocksville residential turnover, and I-40 and US-64 corridor traffic.',
      },
      tips: [
        'Verify explicit coverage for Mocksville and surrounding Davie County areas before booking.',
        'Triad traffic on I-40, US-64, and US-601 significantly impacts scheduling — confirm crew arrival windows.',
        'Confirm insurance and valuation for high-value homes before booking.',
        'Book early for peak moving seasons and month-end lease turnover.',
        'Obtain multiple written estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
      ],
    },
    halifax: {
      marketNotes:
        'Halifax County is a rural northeastern county with historic significance and residential demand centered on Halifax and Roanoke Rapids.',
      costs: {
        studioRange: '$550–$1,150',
        familyRange: '$1,900–$4,400',
        avgHourly: '$95–$145/hr for a 2-person crew',
        note: 'Halifax County pricing reflects northeastern NC rural access, limited local carrier availability, and Rocky Mount-metro regional service demand.',
      },
      tips: [
        'Rural access challenges are common — confirm crew familiarity with Halifax County roads and longer regional routes.',
        'Verify explicit regional service to Halifax and Roanoke Rapids areas before booking.',
        'Storage options are very limited locally — confirm availability if you need interim storage.',
        'Obtain multiple written estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
        'Confirm credentials and insurance for rural moves before booking.',
      ],
    },
    mcdowell: {
      marketNotes:
        'McDowell County is a mountain county with scenic residential and tourism demand centered on Marion.',
      costs: {
        studioRange: '$600–$1,250',
        familyRange: '$2,200–$4,900',
        avgHourly: '$100–$155/hr for a 2-person crew',
        note: 'McDowell County pricing reflects foothills mountain-road access, tourism-season volume, and Asheville- and Hickory-metro regional service demand.',
      },
      tips: [
        'Verify explicit coverage for Marion and surrounding mountain areas before booking.',
        'Mountain roads and weather conditions require specialized experience — confirm crew familiarity with steep-driveway and seasonal access challenges.',
        'Confirm insurance and valuation for high-value mountain homes before booking.',
        'Book early for peak moving seasons and month-end lease turnover.',
        'Obtain multiple written estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
      ],
    },
    jackson: {
      marketNotes:
        'Jackson County is a mountainous county with strong tourism and retirement demand centered on Sylva and Cashiers.',
      costs: {
        studioRange: '$700–$1,450',
        familyRange: '$2,500–$5,600',
        avgHourly: '$110–$165/hr for a 2-person crew',
        note: 'Jackson County pricing reflects western NC mountain-road access, peak tourist-season volume, steep-driveway logistics, and Asheville-metro regional service demand.',
      },
      tips: [
        'Verify explicit coverage for Sylva and Cashiers areas before booking.',
        'Mountain roads and weather conditions require specialized experience — confirm crew familiarity with steep-driveway and seasonal access challenges.',
        'Confirm insurance and valuation for high-value mountain homes before booking.',
        'Book early for peak tourist seasons and summer relocation windows.',
        'Obtain multiple written estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
      ],
    },
    beaufort: {
      marketNotes:
        'Beaufort County is a coastal county with strong waterfront and retirement demand centered on Washington.',
      costs: {
        studioRange: '$650–$1,350',
        familyRange: '$2,300–$5,200',
        avgHourly: '$105–$160/hr for a 2-person crew',
        note: 'Beaufort County pricing reflects inner-coastal waterfront access, retirement-community turnover, hurricane-season scheduling, and Greenville-metro regional service demand.',
      },
      tips: [
        'Verify explicit coverage for Washington and surrounding coastal areas before booking.',
        'Coastal access and hurricane-season considerations are critical — confirm crew availability and weather contingency plans.',
        'Confirm insurance and valuation for high-value waterfront properties before booking.',
        'Book early for peak moving seasons and month-end lease turnover.',
        'Obtain multiple written estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
      ],
    },
    pasquotank: {
      marketNotes:
        'Pasquotank County is a coastal county in northeastern North Carolina with strong maritime and residential demand centered on Elizabeth City.',
      costs: {
        studioRange: '$650–$1,350',
        familyRange: '$2,300–$5,100',
        avgHourly: '$105–$160/hr for a 2-person crew',
        note: 'Pasquotank County pricing reflects northeastern coastal access, maritime-community turnover, and Greenville- and Raleigh-metro regional service demand.',
      },
      tips: [
        'Verify explicit coverage for Elizabeth City and surrounding Pasquotank County areas before booking.',
        'Coastal access considerations apply — confirm crew familiarity with northeastern NC regional routes.',
        'Confirm insurance and valuation for high-value homes before booking.',
        'Book early for peak moving seasons and month-end lease turnover.',
        'Obtain multiple written estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
      ],
    },
    vance: {
      marketNotes:
        'Vance County is a rural county in northern North Carolina with residential and industrial demand centered on Henderson.',
      costs: {
        studioRange: '$550–$1,150',
        familyRange: '$1,900–$4,400',
        avgHourly: '$95–$145/hr for a 2-person crew',
        note: 'Vance County pricing reflects northern NC rural access, I-85 corridor industrial demand, and Durham- and Raleigh-metro regional service demand.',
      },
      tips: [
        'Rural access challenges are common — confirm crew familiarity with Vance County roads and longer regional routes.',
        'Verify explicit regional service to Henderson and surrounding Vance County areas before booking.',
        'Storage options are very limited locally — confirm availability if you need interim storage.',
        'Obtain multiple written estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
        'Confirm credentials and insurance for rural moves before booking.',
      ],
    },
    richmond: {
      marketNotes:
        'Richmond County is a rural southern county with residential and industrial demand centered on Rockingham.',
      costs: {
        studioRange: '$550–$1,150',
        familyRange: '$1,900–$4,400',
        avgHourly: '$95–$145/hr for a 2-person crew',
        note: 'Richmond County pricing reflects southern NC rural access, limited local carrier availability, and Fayetteville-metro regional service demand.',
      },
      tips: [
        'Rural access challenges are common — confirm crew familiarity with Richmond County roads and longer regional routes.',
        'Verify explicit regional service to Rockingham and surrounding Richmond County areas before booking.',
        'Storage options are very limited locally — confirm availability if you need interim storage.',
        'Obtain multiple written estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
        'Confirm credentials and insurance for rural moves before booking.',
      ],
    },
    person: {
      marketNotes:
        'Person County is a rural county north of Durham with growing residential demand centered on Roxboro.',
      costs: {
        studioRange: '$600–$1,250',
        familyRange: '$2,200–$4,900',
        avgHourly: '$100–$155/hr for a 2-person crew',
        note: 'Person County pricing reflects Durham northward suburban spillover, Roxboro residential turnover, and US-158 and US-501 corridor traffic.',
      },
      tips: [
        'Verify explicit coverage for Roxboro and surrounding Person County areas before booking.',
        'Durham-area traffic on US-501 and I-85 significantly impacts scheduling — confirm crew arrival windows.',
        'Confirm insurance and valuation for high-value homes before booking.',
        'Book early for peak moving seasons and month-end lease turnover.',
        'Obtain multiple written estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
      ],
    },
    macon: {
      marketNotes:
        'Macon County is a scenic mountain county with strong tourism and retirement demand centered on Franklin.',
      costs: {
        studioRange: '$700–$1,450',
        familyRange: '$2,500–$5,600',
        avgHourly: '$110–$165/hr for a 2-person crew',
        note: 'Macon County pricing reflects western NC mountain-road access, peak tourist-season volume, retirement-community turnover, and Asheville-metro regional service demand.',
      },
      tips: [
        'Verify explicit coverage for Franklin and surrounding mountain areas before booking.',
        'Mountain roads and weather conditions require specialized experience — confirm crew familiarity with steep-driveway and seasonal access challenges.',
        'Confirm insurance and valuation for high-value mountain homes before booking.',
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
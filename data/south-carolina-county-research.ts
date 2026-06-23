import type { CountyCostGuide } from '@/lib/local-movers/county-seo';

export type CuratedCountyResearch = {
  marketNotes: string;
  costs: CountyCostGuide;
  tips: string[];
};

/** Hand-curated South Carolina county research — grows incrementally per batch */
export const southCarolinaCountyResearch: Record<string, CuratedCountyResearch> =
  {
    aiken: {
      marketNotes:
        'Aiken County is a growing area with strong residential demand near Augusta and equestrian/rural properties across the Horse Country corridor.',
      costs: {
        studioRange: '$600–$1,150',
        familyRange: '$2,000–$4,400',
        avgHourly: '$105–$155/hr for a 2-person crew',
        note: 'Aiken County pricing reflects equestrian-property access, rural driveways, Fort Eisenhower corridor seasonality, and cross-border Augusta-Aiken crew travel.',
      },
      tips: [
        'Verify explicit local service to Aiken and North Augusta before booking.',
        'Confirm experience with rural and equestrian property access — long driveways and gate logistics are common.',
        'Obtain multiple written estimates and confirm insurance and valuation coverage.',
        'Book early for peak moving seasons and military PCS windows near Fort Eisenhower.',
        'Re-verify FMCSA authority, BBB rating, and current reviews before signing.',
      ],
    },
    dorchester: {
      marketNotes:
        'Dorchester County is a growing suburban county in the Charleston metro area with steady demand in Summerville and St. George.',
      costs: {
        studioRange: '$650–$1,250',
        familyRange: '$2,200–$4,800',
        avgHourly: '$110–$165/hr for a 2-person crew',
        note: 'Dorchester County pricing reflects Charleston-metro suburban demand, I-26 corridor traffic, and Summerville new-construction turnover.',
      },
      tips: [
        'Verify explicit coverage for Summerville, St. George, and surrounding Dorchester County addresses before booking.',
        'Charleston-area traffic on I-26 and Ashley Phosphate Road impacts scheduling — confirm crew arrival windows.',
        'Confirm insurance and valuation for high-value suburban homes before booking.',
        'Book early for peak seasons and month-end lease turnover.',
        'Obtain multiple written estimates; compare hourly vs flat-rate quotes from Charleston-area crews.',
      ],
    },
    pickens: {
      marketNotes:
        'Pickens County is a growing area in the Upstate near Greenville with foothill residential demand around Pickens and Easley.',
      costs: {
        studioRange: '$600–$1,200',
        familyRange: '$2,000–$4,500',
        avgHourly: '$105–$155/hr for a 2-person crew',
        note: 'Pickens County pricing reflects Upstate suburban growth, foothill driveway access, and Greenville-metro crew travel.',
      },
      tips: [
        'Verify explicit coverage for Pickens, Easley, and surrounding Pickens County addresses before booking.',
        'Greenville-area traffic on I-85 and Hwy 123 impacts scheduling — confirm crew arrival windows.',
        'Confirm insurance and valuation for high-value homes before booking.',
        'Book early for peak seasons and month-end lease turnover.',
        'Obtain multiple written estimates; compare hourly vs flat-rate quotes from Greenville-area crews.',
      ],
    },
    florence: {
      marketNotes:
        'Florence County is a major hub in the Pee Dee region with strong residential, commercial, and medical-related moving demand.',
      costs: {
        studioRange: '$600–$1,200',
        familyRange: '$2,000–$4,600',
        avgHourly: '$105–$155/hr for a 2-person crew',
        note: 'Florence County pricing reflects Pee Dee hub demand, medical corridor access, and crew travel from Myrtle Beach and Columbia bases.',
      },
      tips: [
        'Verify explicit coverage for Florence, Timmonsville, Lake City, and surrounding Pee Dee addresses before booking.',
        'Local traffic and medical facility access impacts scheduling — confirm crew arrival windows.',
        'Confirm insurance and valuation for high-value homes and medical equipment before booking.',
        'Book early for peak seasons and month-end lease turnover.',
        'Obtain multiple written estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
      ],
    },
    lancaster: {
      marketNotes:
        'Lancaster County is a fast-growing suburban county in the Charlotte metro area with strong demand in Lancaster and Indian Land.',
      costs: {
        studioRange: '$650–$1,250',
        familyRange: '$2,200–$4,800',
        avgHourly: '$110–$165/hr for a 2-person crew',
        note: 'Lancaster County pricing reflects Charlotte-metro suburban growth, Indian Land new construction, and cross-border crew travel.',
      },
      tips: [
        'Verify explicit coverage for Lancaster, Indian Land, and surrounding Lancaster County addresses before booking.',
        'Charlotte-area traffic on I-77 and US-521 impacts scheduling — confirm crew arrival windows.',
        'Confirm insurance and valuation for high-value suburban homes before booking.',
        'Book early for peak seasons and month-end lease turnover.',
        'Obtain multiple written estimates and re-verify credentials before signing.',
      ],
    },
    sumter: {
      marketNotes:
        'Sumter County centers on Sumter with significant military influence from Shaw Air Force Base and steady residential turnover.',
      costs: {
        studioRange: '$550–$1,100',
        familyRange: '$1,900–$4,300',
        avgHourly: '$100–$150/hr for a 2-person crew',
        note: 'Sumter County pricing reflects military PCS seasonality, Shaw AFB corridor demand, and Midlands crew travel from Columbia.',
      },
      tips: [
        'Military moves require specific experience — confirm PCS documentation and government billing familiarity for Shaw AFB relocations.',
        'Verify explicit coverage for Sumter and surrounding Sumter County addresses before booking.',
        'Confirm insurance and valuation for high-value homes before booking.',
        'Book early for peak seasons and military PCS windows.',
        'Obtain multiple written estimates and compare hourly vs flat-rate quotes from Sumter and Columbia-area crews.',
      ],
    },
    oconee: {
      marketNotes:
        'Oconee County is a scenic, lake-rich area in the Upstate with growing residential demand near Clemson, Seneca, and Walhalla.',
      costs: {
        studioRange: '$600–$1,200',
        familyRange: '$2,000–$4,500',
        avgHourly: '$105–$155/hr for a 2-person crew',
        note: 'Oconee County pricing reflects lakefront property access, mountain driveway logistics, Clemson-area turnover, and Greenville-metro crew travel.',
      },
      tips: [
        'Verify explicit coverage for Walhalla, Seneca, and lakefront properties before booking.',
        'Mountain and lake access can require specialized equipment — confirm truck size and crew experience.',
        'Confirm insurance and valuation for high-value lake homes before booking.',
        'Book early for peak seasons and Clemson academic calendar windows.',
        'Obtain multiple written estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
      ],
    },
    orangeburg: {
      marketNotes:
        'Orangeburg County is a central Midlands county with strong agricultural and university-related moving demand around Orangeburg.',
      costs: {
        studioRange: '$550–$1,100',
        familyRange: '$1,900–$4,300',
        avgHourly: '$100–$150/hr for a 2-person crew',
        note: 'Orangeburg County pricing reflects Midlands rural access, South Carolina State University corridor demand, and Columbia-area crew travel.',
      },
      tips: [
        'Verify explicit coverage for Orangeburg and surrounding rural Orangeburg County addresses before booking.',
        'Local traffic near South Carolina State University impacts scheduling — confirm crew arrival windows.',
        'Confirm insurance and valuation for high-value and farm properties before booking.',
        'Book early for peak seasons and month-end lease turnover.',
        'Obtain multiple written estimates and compare hourly vs flat-rate quotes from Columbia-area crews.',
      ],
    },
    kershaw: {
      marketNotes:
        'Kershaw County is a growing suburban and rural county east of Columbia with historic Camden as the county seat and steady Lugoff-area demand.',
      costs: {
        studioRange: '$600–$1,200',
        familyRange: '$2,000–$4,500',
        avgHourly: '$105–$155/hr for a 2-person crew',
        note: 'Kershaw County pricing reflects Columbia-corridor suburban growth, historic Camden property access, and Midlands crew travel.',
      },
      tips: [
        'Verify explicit coverage for Camden and Lugoff areas before booking.',
        'Columbia-area traffic on I-20 and US-1 impacts scheduling — confirm crew arrival windows.',
        'Confirm insurance and valuation for high-value historic homes before booking.',
        'Book early for peak seasons and month-end lease turnover.',
        'Obtain multiple written estimates and compare hourly vs flat-rate quotes from Columbia and Sumter-area crews.',
      ],
    },
    laurens: {
      marketNotes:
        'Laurens County is a growing Upstate county between Greenville and Columbia with residential demand in Laurens and Clinton.',
      costs: {
        studioRange: '$600–$1,150',
        familyRange: '$2,000–$4,400',
        avgHourly: '$105–$155/hr for a 2-person crew',
        note: 'Laurens County pricing reflects Upstate corridor demand, rural driveway access, and Greenville- and Spartanburg-metro crew travel.',
      },
      tips: [
        'Verify explicit coverage for Laurens and Clinton areas before booking.',
        'Upstate traffic on I-385 and I-26 impacts scheduling — confirm crew arrival windows.',
        'Confirm insurance and valuation for high-value homes before booking.',
        'Book early for peak seasons and month-end lease turnover.',
        'Obtain multiple written estimates and compare hourly vs flat-rate quotes from Greenville-area crews.',
      ],
    },
    greenwood: {
      marketNotes:
        'Greenwood County is a key Upstate county with strong industrial and residential moving activity centered on Greenwood.',
      costs: {
        studioRange: '$600–$1,200',
        familyRange: '$2,000–$4,500',
        avgHourly: '$105–$155/hr for a 2-person crew',
        note: 'Greenwood County pricing reflects Upstate industrial corridor demand, local traffic near manufacturing facilities, and Greenville-metro crew travel.',
      },
      tips: [
        'Verify explicit coverage for Greenwood and surrounding Greenwood County addresses before booking.',
        'Local industrial traffic impacts scheduling — confirm crew arrival windows.',
        'Confirm insurance and valuation for high-value homes before booking.',
        'Book early for peak seasons and month-end lease turnover.',
        'Obtain multiple written estimates and compare hourly vs flat-rate quotes from Greenville and Columbia-area crews.',
      ],
    },
    georgetown: {
      marketNotes:
        'Georgetown County features coastal and historic properties with strong demand for residential and retirement moves along the Grand Strand.',
      costs: {
        studioRange: '$650–$1,250',
        familyRange: '$2,200–$4,800',
        avgHourly: '$110–$165/hr for a 2-person crew',
        note: 'Georgetown County pricing reflects Grand Strand coastal demand, waterfront property access, hurricane-season scheduling, and Myrtle Beach crew travel.',
      },
      tips: [
        'Verify explicit coverage for Georgetown, Pawleys Island, and Murrells Inlet before booking.',
        'Coastal access and hurricane-season considerations apply — confirm weather contingency policies.',
        'Confirm insurance and valuation for high-value waterfront homes before booking.',
        'Book early for peak tourist seasons and retirement relocation windows.',
        'Obtain multiple written estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
      ],
    },
    darlington: {
      marketNotes:
        'Darlington County is in the Pee Dee region with strong residential demand and NASCAR-related activity around Darlington and Hartsville.',
      costs: {
        studioRange: '$550–$1,100',
        familyRange: '$1,900–$4,300',
        avgHourly: '$100–$150/hr for a 2-person crew',
        note: 'Darlington County pricing reflects Pee Dee rural access, Darlington Raceway event seasonality, and Florence-metro crew travel.',
      },
      tips: [
        'Verify explicit coverage for Darlington and Hartsville areas before booking.',
        'Local traffic near Darlington Raceway impacts scheduling — confirm crew arrival windows during race weekends.',
        'Confirm insurance and valuation for high-value homes before booking.',
        'Book early for peak seasons and month-end lease turnover.',
        'Obtain multiple written estimates and compare hourly vs flat-rate quotes from Florence and Columbia-area crews.',
      ],
    },
    cherokee: {
      marketNotes:
        'Cherokee County is an Upstate county with industrial and residential growth centered on Gaffney near the Spartanburg corridor.',
      costs: {
        studioRange: '$600–$1,150',
        familyRange: '$2,000–$4,400',
        avgHourly: '$105–$155/hr for a 2-person crew',
        note: 'Cherokee County pricing reflects Upstate industrial growth, I-85 corridor traffic, and Spartanburg- and Greenville-metro crew travel.',
      },
      tips: [
        'Verify explicit coverage for Gaffney and surrounding Cherokee County addresses before booking.',
        'Upstate traffic on I-85 impacts scheduling — confirm crew arrival windows.',
        'Confirm insurance and valuation for high-value homes before booking.',
        'Book early for peak seasons and month-end lease turnover.',
        'Obtain multiple written estimates and compare hourly vs flat-rate quotes from Spartanburg and Greenville-area crews.',
      ],
    },
    chesterfield: {
      marketNotes:
        'Chesterfield County is a rural Midlands county on the Florence and Charlotte fringe with growing residential demand around Chesterfield and Cheraw.',
      costs: {
        studioRange: '$550–$1,100',
        familyRange: '$1,900–$4,300',
        avgHourly: '$100–$150/hr for a 2-person crew',
        note: 'Chesterfield County pricing reflects rural Pee Dee access, long driveway logistics, and crew travel from Florence and Rock Hill bases.',
      },
      tips: [
        'Verify explicit coverage for Chesterfield and Cheraw areas before booking.',
        'Rural access challenges are common — confirm truck size and driveway clearance.',
        'Confirm insurance and valuation for high-value homes before booking.',
        'Book early for peak seasons and month-end lease turnover.',
        'Obtain multiple written estimates and compare hourly vs flat-rate quotes from Florence and Charlotte-area crews.',
      ],
    },
    jasper: {
      marketNotes:
        'Jasper County is in the Lowcountry with growth near Ridgeland and Hardeeville under Hilton Head and Savannah metro influence.',
      costs: {
        studioRange: '$650–$1,250',
        familyRange: '$2,200–$4,800',
        avgHourly: '$110–$165/hr for a 2-person crew',
        note: 'Jasper County pricing reflects Lowcountry coastal demand, cross-border Savannah crew travel, and peak tourist season scheduling.',
      },
      tips: [
        'Verify explicit coverage for Ridgeland and Hardeeville areas before booking.',
        'Coastal and Lowcountry access considerations apply — confirm crew experience with rural Lowcountry properties.',
        'Confirm insurance and valuation for high-value homes before booking.',
        'Book early for peak seasons and Hilton Head corridor turnover.',
        'Obtain multiple written estimates and compare hourly vs flat-rate quotes from Charleston and Savannah-area crews.',
      ],
    },
    newberry: {
      marketNotes:
        'Newberry County is a growing Midlands county with historic charm and residential expansion centered on Newberry.',
      costs: {
        studioRange: '$600–$1,150',
        familyRange: '$2,000–$4,400',
        avgHourly: '$105–$155/hr for a 2-person crew',
        note: 'Newberry County pricing reflects historic home access, rural Midlands driveways, and Columbia-area crew travel.',
      },
      tips: [
        'Verify explicit coverage for Newberry and surrounding rural Newberry County addresses before booking.',
        'Columbia-area traffic impacts scheduling — confirm crew arrival windows.',
        'Confirm insurance and valuation for high-value historic homes before booking.',
        'Book early for peak seasons and month-end lease turnover.',
        'Obtain multiple written estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
      ],
    },
    colleton: {
      marketNotes:
        'Colleton County is a rural Lowcountry county with growth around Walterboro and steady demand near the Edisto area.',
      costs: {
        studioRange: '$600–$1,200',
        familyRange: '$2,000–$4,500',
        avgHourly: '$105–$155/hr for a 2-person crew',
        note: 'Colleton County pricing reflects Lowcountry rural access, coastal property logistics, and Charleston-metro crew travel.',
      },
      tips: [
        'Verify explicit coverage for Walterboro and Edisto area addresses before booking.',
        'Coastal and rural access considerations apply — confirm truck size and crew experience.',
        'Confirm insurance and valuation for high-value properties before booking.',
        'Book early for peak seasons and month-end lease turnover.',
        'Obtain multiple written estimates and compare hourly vs flat-rate quotes from Charleston-area crews.',
      ],
    },
    chester: {
      marketNotes:
        'Chester County is a rural county with industrial and residential activity between Charlotte and Columbia centered on Chester.',
      costs: {
        studioRange: '$550–$1,100',
        familyRange: '$1,900–$4,300',
        avgHourly: '$100–$150/hr for a 2-person crew',
        note: 'Chester County pricing reflects Charlotte-fringe rural access, cross-border crew travel, and I-77 corridor traffic.',
      },
      tips: [
        'Verify explicit coverage for Chester and surrounding Chester County addresses before booking.',
        'Charlotte-area traffic on I-77 impacts scheduling — confirm crew arrival windows.',
        'Confirm insurance and valuation for high-value homes before booking.',
        'Book early for peak seasons and month-end lease turnover.',
        'Obtain multiple written estimates and compare hourly vs flat-rate quotes from Rock Hill and Charlotte-area crews.',
      ],
    },
    clarendon: {
      marketNotes:
        'Clarendon County is a rural Midlands county with agricultural and residential activity centered on Manning.',
      costs: {
        studioRange: '$550–$1,100',
        familyRange: '$1,900–$4,200',
        avgHourly: '$100–$150/hr for a 2-person crew',
        note: 'Clarendon County pricing reflects rural Midlands access, agricultural property logistics, and crew travel from Sumter and Florence bases.',
      },
      tips: [
        'Verify explicit coverage for Manning and surrounding rural Clarendon County addresses before booking.',
        'Rural access challenges are common — confirm truck size and driveway clearance.',
        'Confirm insurance and valuation for high-value homes before booking.',
        'Book early for peak seasons and month-end lease turnover.',
        'Obtain multiple written estimates and compare hourly vs flat-rate quotes from Sumter and Columbia-area crews.',
      ],
    },
    edgefield: {
      marketNotes:
        'Edgefield County is a rural county on the South Carolina side of the Augusta metro with historic and residential growth around Edgefield.',
      costs: {
        studioRange: '$550–$1,100',
        familyRange: '$1,900–$4,300',
        avgHourly: '$100–$150/hr for a 2-person crew',
        note: 'Edgefield County pricing reflects Augusta-border rural access, historic property logistics, and cross-border Aiken-Augusta crew travel.',
      },
      tips: [
        'Verify explicit coverage for Edgefield and surrounding Edgefield County addresses before booking.',
        'Augusta-area traffic impacts scheduling — confirm crew arrival windows.',
        'Confirm insurance and valuation for high-value homes before booking.',
        'Book early for peak seasons and month-end lease turnover.',
        'Obtain multiple written estimates and compare hourly vs flat-rate quotes from Aiken and Augusta-area crews.',
      ],
    },
    williamsburg: {
      marketNotes:
        'Williamsburg County is a rural Lowcountry county with Kingstree as the seat and steady residential demand from Pee Dee and Grand Strand corridor relocations.',
      costs: {
        studioRange: '$550–$1,100',
        familyRange: '$1,900–$4,200',
        avgHourly: '$100–$150/hr for a 2-person crew',
        note: 'Williamsburg County pricing reflects rural Lowcountry access, limited local storage options, and crew travel from Florence and Charleston hubs.',
      },
      tips: [
        'Rural access challenges are common — confirm truck size and driveway clearance before booking.',
        'Verify explicit regional service to Kingstree and surrounding Williamsburg County addresses.',
        'Local storage is very limited — plan move timing and confirm interim storage options early.',
        'Obtain multiple written estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
        'Confirm insurance, valuation, and credentials for rural moves before signing.',
      ],
    },
    marion: {
      marketNotes:
        'Marion County is a rural Pee Dee county with Marion as the seat and residential demand served primarily by Florence-area regional crews.',
      costs: {
        studioRange: '$550–$1,100',
        familyRange: '$1,900–$4,200',
        avgHourly: '$100–$150/hr for a 2-person crew',
        note: 'Marion County pricing reflects Pee Dee rural access, limited local mover availability, and crew travel from Florence and Myrtle Beach bases.',
      },
      tips: [
        'Rural access challenges are common — confirm truck size and driveway clearance before booking.',
        'Verify explicit regional service to Marion and surrounding Marion County addresses.',
        'Local storage is very limited — plan move timing and confirm interim storage options early.',
        'Obtain multiple written estimates and compare hourly vs flat-rate quotes from Florence-area crews.',
        'Confirm insurance, valuation, and credentials for rural moves before signing.',
      ],
    },
    dillon: {
      marketNotes:
        'Dillon County is a rural Pee Dee county with Dillon as the seat and residential demand along the I-95 and Florence corridors.',
      costs: {
        studioRange: '$550–$1,100',
        familyRange: '$1,900–$4,200',
        avgHourly: '$100–$150/hr for a 2-person crew',
        note: 'Dillon County pricing reflects Pee Dee rural access, I-95 corridor travel, and crew dispatch from Florence and Columbia hubs.',
      },
      tips: [
        'Rural access challenges are common — confirm truck size and driveway clearance before booking.',
        'Verify explicit regional service to Dillon and surrounding Dillon County addresses.',
        'Local storage is very limited — plan move timing and confirm interim storage options early.',
        'Obtain multiple written estimates and compare hourly vs flat-rate quotes from Florence and Columbia-area crews.',
        'Confirm insurance, valuation, and credentials for rural moves before signing.',
      ],
    },
    union: {
      marketNotes:
        'Union County is a rural Upstate county with Union as the seat and residential demand served by Spartanburg and Greenville regional crews.',
      costs: {
        studioRange: '$550–$1,100',
        familyRange: '$1,900–$4,200',
        avgHourly: '$100–$150/hr for a 2-person crew',
        note: 'Union County pricing reflects Upstate rural access, limited local mover availability, and crew travel from Spartanburg and Greenville bases.',
      },
      tips: [
        'Rural access challenges are common — confirm truck size and driveway clearance before booking.',
        'Verify explicit regional service to Union and surrounding Union County addresses.',
        'Local storage is very limited — plan move timing and confirm interim storage options early.',
        'Obtain multiple written estimates and compare hourly vs flat-rate quotes from Spartanburg and Greenville-area crews.',
        'Confirm insurance, valuation, and credentials for rural moves before signing.',
      ],
    },
    marlboro: {
      marketNotes:
        'Marlboro County is a rural Pee Dee county with Bennettsville as the seat and residential demand near the North Carolina border.',
      costs: {
        studioRange: '$550–$1,100',
        familyRange: '$1,900–$4,200',
        avgHourly: '$100–$150/hr for a 2-person crew',
        note: 'Marlboro County pricing reflects Pee Dee rural access, border-county crew travel, and dispatch from Florence and Columbia hubs.',
      },
      tips: [
        'Rural access challenges are common — confirm truck size and driveway clearance before booking.',
        'Verify explicit regional service to Bennettsville and surrounding Marlboro County addresses.',
        'Local storage is very limited — plan move timing and confirm interim storage options early.',
        'Obtain multiple written estimates and compare hourly vs flat-rate quotes from Florence-area crews.',
        'Confirm insurance, valuation, and credentials for rural moves before signing.',
      ],
    },
    abbeville: {
      marketNotes:
        'Abbeville County is a rural Upstate county with Abbeville as the seat and residential demand between Greenwood and Greenville corridors.',
      costs: {
        studioRange: '$550–$1,100',
        familyRange: '$1,900–$4,200',
        avgHourly: '$100–$150/hr for a 2-person crew',
        note: 'Abbeville County pricing reflects Upstate rural access, foothill driveway logistics, and crew travel from Greenville and Columbia bases.',
      },
      tips: [
        'Rural access challenges are common — confirm truck size and driveway clearance before booking.',
        'Verify explicit regional service to Abbeville and surrounding Abbeville County addresses.',
        'Local storage is very limited — plan move timing and confirm interim storage options early.',
        'Obtain multiple written estimates and compare hourly vs flat-rate quotes from Greenville-area crews.',
        'Confirm insurance, valuation, and credentials for rural moves before signing.',
      ],
    },
    barnwell: {
      marketNotes:
        'Barnwell County is a rural county on the South Carolina side of the Augusta metro with Barnwell as the seat and steady agricultural and residential demand.',
      costs: {
        studioRange: '$550–$1,100',
        familyRange: '$1,900–$4,200',
        avgHourly: '$100–$150/hr for a 2-person crew',
        note: 'Barnwell County pricing reflects Augusta-border rural access, agricultural property logistics, and cross-border Aiken-Augusta crew travel.',
      },
      tips: [
        'Rural access challenges are common — confirm truck size and driveway clearance before booking.',
        'Verify explicit regional service to Barnwell and surrounding Barnwell County addresses.',
        'Local storage is very limited — plan move timing and confirm interim storage options early.',
        'Obtain multiple written estimates and compare hourly vs flat-rate quotes from Aiken and Augusta-area crews.',
        'Confirm insurance, valuation, and credentials for rural moves before signing.',
      ],
    },
    fairfield: {
      marketNotes:
        'Fairfield County is a rural Midlands county with Winnsboro as the seat and residential demand between Columbia and Charlotte corridors.',
      costs: {
        studioRange: '$550–$1,100',
        familyRange: '$1,900–$4,200',
        avgHourly: '$100–$150/hr for a 2-person crew',
        note: 'Fairfield County pricing reflects Midlands rural access, historic Winnsboro property logistics, and crew travel from Columbia-area hubs.',
      },
      tips: [
        'Rural access challenges are common — confirm truck size and driveway clearance before booking.',
        'Verify explicit regional service to Winnsboro and surrounding Fairfield County addresses.',
        'Local storage is very limited — plan move timing and confirm interim storage options early.',
        'Obtain multiple written estimates and compare hourly vs flat-rate quotes from Columbia-area crews.',
        'Confirm insurance, valuation, and credentials for rural moves before signing.',
      ],
    },
    saluda: {
      marketNotes:
        'Saluda County is a rural Midlands county with Saluda as the seat and residential demand between Columbia and the Upstate foothills.',
      costs: {
        studioRange: '$550–$1,100',
        familyRange: '$1,900–$4,200',
        avgHourly: '$100–$150/hr for a 2-person crew',
        note: 'Saluda County pricing reflects Midlands rural access, limited local mover availability, and crew travel from Columbia-area hubs.',
      },
      tips: [
        'Rural access challenges are common — confirm truck size and driveway clearance before booking.',
        'Verify explicit regional service to Saluda and surrounding Saluda County addresses.',
        'Local storage is very limited — plan move timing and confirm interim storage options early.',
        'Obtain multiple written estimates and compare hourly vs flat-rate quotes from Columbia-area crews.',
        'Confirm insurance, valuation, and credentials for rural moves before signing.',
      ],
    },
    hampton: {
      marketNotes:
        'Hampton County is a rural Lowcountry county with Hampton as the seat and residential demand served primarily by Charleston-area regional crews.',
      costs: {
        studioRange: '$550–$1,100',
        familyRange: '$1,900–$4,200',
        avgHourly: '$100–$150/hr for a 2-person crew',
        note: 'Hampton County pricing reflects rural Lowcountry access, limited local storage, and crew travel from Charleston and Augusta hubs.',
      },
      tips: [
        'Rural access challenges are common — confirm truck size and driveway clearance before booking.',
        'Verify explicit regional service to Hampton and surrounding Hampton County addresses.',
        'Local storage is very limited — plan move timing and confirm interim storage options early.',
        'Obtain multiple written estimates and compare hourly vs flat-rate quotes from Charleston-area crews.',
        'Confirm insurance, valuation, and credentials for rural moves before signing.',
      ],
    },
    lee: {
      marketNotes:
        'Lee County is a rural Midlands county with Bishopville as the seat and residential demand between Sumter and Florence corridors.',
      costs: {
        studioRange: '$550–$1,100',
        familyRange: '$1,900–$4,200',
        avgHourly: '$100–$150/hr for a 2-person crew',
        note: 'Lee County pricing reflects Pee Dee–Midlands rural access, limited local mover availability, and crew travel from Sumter and Florence hubs.',
      },
      tips: [
        'Rural access challenges are common — confirm truck size and driveway clearance before booking.',
        'Verify explicit regional service to Bishopville and surrounding Lee County addresses.',
        'Local storage is very limited — plan move timing and confirm interim storage options early.',
        'Obtain multiple written estimates and compare hourly vs flat-rate quotes from Sumter and Florence-area crews.',
        'Confirm insurance, valuation, and credentials for rural moves before signing.',
      ],
    },
    calhoun: {
      marketNotes:
        'Calhoun County is a rural Midlands county with St. Matthews as the seat and residential demand between Columbia and Orangeburg corridors.',
      costs: {
        studioRange: '$550–$1,100',
        familyRange: '$1,900–$4,200',
        avgHourly: '$100–$150/hr for a 2-person crew',
        note: 'Calhoun County pricing reflects Midlands rural access, agricultural property logistics, and crew travel from Columbia-area hubs.',
      },
      tips: [
        'Rural access challenges are common — confirm truck size and driveway clearance before booking.',
        'Verify explicit regional service to St. Matthews and surrounding Calhoun County addresses.',
        'Local storage is very limited — plan move timing and confirm interim storage options early.',
        'Obtain multiple written estimates and compare hourly vs flat-rate quotes from Columbia-area crews.',
        'Confirm insurance, valuation, and credentials for rural moves before signing.',
      ],
    },
    bamberg: {
      marketNotes:
        'Bamberg County is a rural county in the Lowcountry–Midlands transition zone with Bamberg as the seat and steady agricultural and residential demand.',
      costs: {
        studioRange: '$550–$1,100',
        familyRange: '$1,900–$4,200',
        avgHourly: '$100–$150/hr for a 2-person crew',
        note: 'Bamberg County pricing reflects rural transition-zone access, limited local mover availability, and crew travel from Columbia and Charleston hubs.',
      },
      tips: [
        'Rural access challenges are common — confirm truck size and driveway clearance before booking.',
        'Verify explicit regional service to Bamberg and surrounding Bamberg County addresses.',
        'Local storage is very limited — plan move timing and confirm interim storage options early.',
        'Obtain multiple written estimates and compare hourly vs flat-rate quotes from Columbia and Charleston-area crews.',
        'Confirm insurance, valuation, and credentials for rural moves before signing.',
      ],
    },
    mccormick: {
      marketNotes:
        'McCormick County is a rural county on the South Carolina side of the Savannah River with McCormick as the seat and lake-area residential demand.',
      costs: {
        studioRange: '$550–$1,100',
        familyRange: '$1,900–$4,200',
        avgHourly: '$100–$150/hr for a 2-person crew',
        note: 'McCormick County pricing reflects Savannah River rural access, lake property logistics, and crew travel from Aiken and Greenville hubs.',
      },
      tips: [
        'Rural access challenges are common — confirm truck size and driveway clearance before booking.',
        'Verify explicit regional service to McCormick and surrounding McCormick County addresses.',
        'Local storage is very limited — plan move timing and confirm interim storage options early.',
        'Obtain multiple written estimates and compare hourly vs flat-rate quotes from Aiken and Greenville-area crews.',
        'Confirm insurance, valuation, and credentials for rural moves before signing.',
      ],
    },
    allendale: {
      marketNotes:
        'Allendale County is one of the smallest and most rural counties in South Carolina with Allendale as the seat and limited local mover availability.',
      costs: {
        studioRange: '$550–$1,100',
        familyRange: '$1,900–$4,200',
        avgHourly: '$100–$150/hr for a 2-person crew',
        note: 'Allendale County pricing reflects extreme rural access challenges, very limited local storage, and crew travel from Augusta and Charleston hubs.',
      },
      tips: [
        'Rural access challenges are common — confirm truck size and driveway clearance before booking.',
        'Verify explicit regional service to Allendale and surrounding Allendale County addresses.',
        'Local storage is very limited — plan move timing and confirm interim storage options early.',
        'Obtain multiple written estimates and compare hourly vs flat-rate quotes from Augusta and Charleston-area crews.',
        'Confirm insurance, valuation, and credentials for rural moves before signing.',
      ],
    },
    horry: {
      marketNotes:
        'Horry County is one of the fastest-growing counties in South Carolina with heavy tourism, retirement, and residential demand centered on Myrtle Beach, Conway, and North Myrtle Beach.',
      costs: {
        studioRange: '$700–$1,400',
        familyRange: '$2,400–$5,200',
        avgHourly: '$115–$170/hr for a 2-person crew',
        note: 'Horry County pricing reflects Grand Strand coastal demand, peak tourist season scheduling, retirement relocation volume, and Myrtle Beach crew travel.',
      },
      tips: [
        'Verify explicit coverage for Myrtle Beach, Conway, and North Myrtle Beach before booking.',
        'Tourist season traffic and coastal access require advance planning — confirm crew arrival windows.',
        'Confirm insurance and valuation for high-value beach and retirement properties before booking.',
        'Book early for peak seasons and month-end lease turnover.',
        'Obtain multiple written estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
      ],
    },
    spartanburg: {
      marketNotes:
        'Spartanburg County is a major Upstate industrial and residential hub with rapid growth in Spartanburg, Greer, and surrounding communities.',
      costs: {
        studioRange: '$650–$1,300',
        familyRange: '$2,300–$5,000',
        avgHourly: '$110–$165/hr for a 2-person crew',
        note: 'Spartanburg County pricing reflects Upstate industrial corridor demand, I-85 traffic, and Greenville-Spartanburg metro crew availability.',
      },
      tips: [
        'Verify explicit coverage for Spartanburg, Greer, and surrounding Spartanburg County addresses before booking.',
        'Upstate industrial and highway traffic impacts scheduling — confirm crew arrival windows.',
        'Confirm insurance and valuation for high-value homes before booking.',
        'Book early for peak seasons and month-end lease turnover.',
        'Obtain multiple written estimates and compare hourly vs flat-rate quotes from Spartanburg and Greenville-area crews.',
      ],
    },
    york: {
      marketNotes:
        'York County is one of the fastest-growing counties in the nation with strong suburban demand in Rock Hill, Fort Mill, and York.',
      costs: {
        studioRange: '$700–$1,400',
        familyRange: '$2,500–$5,500',
        avgHourly: '$115–$170/hr for a 2-person crew',
        note: 'York County pricing reflects Charlotte-metro suburban growth, Fort Mill new construction, and cross-border crew travel from Rock Hill and Charlotte.',
      },
      tips: [
        'Verify explicit coverage for Rock Hill, Fort Mill, and York areas before booking.',
        'Charlotte-area traffic on I-77 and US-21 impacts scheduling — confirm crew arrival windows.',
        'Confirm insurance and valuation for high-value suburban homes before booking.',
        'Book early for peak seasons and month-end lease turnover.',
        'Obtain multiple written estimates and compare hourly vs flat-rate quotes from Rock Hill and Charlotte-area crews.',
      ],
    },
    anderson: {
      marketNotes:
        'Anderson County is a major Upstate county with strong industrial and residential growth centered on Anderson and the Greenville corridor.',
      costs: {
        studioRange: '$650–$1,300',
        familyRange: '$2,300–$5,000',
        avgHourly: '$110–$165/hr for a 2-person crew',
        note: 'Anderson County pricing reflects Greenville-Anderson metro demand, lake property access, and Upstate industrial corridor traffic.',
      },
      tips: [
        'Verify explicit coverage for Anderson and surrounding Anderson County addresses before booking.',
        'Upstate traffic on I-85 and Clemson Boulevard impacts scheduling — confirm crew arrival windows.',
        'Confirm insurance and valuation for high-value homes before booking.',
        'Book early for peak seasons and month-end lease turnover.',
        'Obtain multiple written estimates and compare hourly vs flat-rate quotes from Greenville and Spartanburg-area crews.',
      ],
    },
    beaufort: {
      marketNotes:
        'Beaufort County is a premier coastal retirement and tourism county with significant military influence in Beaufort, Hilton Head, and Bluffton.',
      costs: {
        studioRange: '$750–$1,500',
        familyRange: '$2,600–$5,800',
        avgHourly: '$120–$175/hr for a 2-person crew',
        note: 'Beaufort County pricing reflects Lowcountry coastal demand, waterfront property access, hurricane-season scheduling, and Charleston-Savannah crew travel.',
      },
      tips: [
        'Verify explicit coverage for Beaufort, Hilton Head, and Bluffton before booking.',
        'Coastal access and hurricane preparedness are critical — confirm weather contingency policies.',
        'Confirm insurance and valuation for high-value waterfront and retirement properties before booking.',
        'Book early for peak seasons and military PCS windows near Marine Corps Air Station Beaufort.',
        'Obtain multiple written estimates and compare hourly vs flat-rate quotes from Charleston and Savannah-area crews.',
      ],
    },
    berkeley: {
      marketNotes:
        'Berkeley County is one of the fastest-growing counties in South Carolina with strong suburban and industrial demand near Charleston in Moncks Corner, Goose Creek, and Summerville.',
      costs: {
        studioRange: '$700–$1,400',
        familyRange: '$2,400–$5,300',
        avgHourly: '$115–$170/hr for a 2-person crew',
        note: 'Berkeley County pricing reflects Charleston-metro suburban growth, port and industrial corridor traffic, and Summerville new-construction turnover.',
      },
      tips: [
        'Verify explicit coverage for Moncks Corner, Goose Creek, and Summerville areas before booking.',
        'Charleston-area traffic on I-26 and Clements Ferry Road impacts scheduling — confirm crew arrival windows.',
        'Confirm insurance and valuation for high-value suburban homes before booking.',
        'Book early for peak seasons and month-end lease turnover.',
        'Obtain multiple written estimates and compare hourly vs flat-rate quotes from Charleston-area crews.',
      ],
    },
    lexington: {
      marketNotes:
        'Lexington County is a major suburban county west of Columbia with rapid growth and strong residential demand in Lexington, Irmo, and West Columbia.',
      costs: {
        studioRange: '$650–$1,300',
        familyRange: '$2,300–$5,100',
        avgHourly: '$110–$165/hr for a 2-person crew',
        note: 'Lexington County pricing reflects Columbia-metro suburban growth, I-26 corridor traffic, and Midlands crew availability from Columbia and Sumter bases.',
      },
      tips: [
        'Verify explicit coverage for Lexington, Irmo, and West Columbia areas before booking.',
        'Columbia-area traffic on I-26 and US-1 impacts scheduling — confirm crew arrival windows.',
        'Confirm insurance and valuation for high-value suburban homes before booking.',
        'Book early for peak seasons and month-end lease turnover.',
        'Obtain multiple written estimates and compare hourly vs flat-rate quotes from Columbia-area crews.',
      ],
    },
    charleston: {
      marketNotes:
        'Charleston County is a major coastal economic and tourism hub with high residential, historic, and military-related moving demand across Charleston, Mount Pleasant, and James Island.',
      costs: {
        studioRange: '$750–$1,500',
        familyRange: '$2,600–$5,800',
        avgHourly: '$120–$175/hr for a 2-person crew',
        note: 'Charleston County pricing reflects Lowcountry coastal demand, historic-district access logistics, bridge traffic, and peak tourist season scheduling.',
      },
      tips: [
        'Verify explicit coverage for Charleston, Mount Pleasant, and James Island before booking.',
        'Coastal access, bridge traffic, and hurricane preparedness are critical — confirm weather contingency policies.',
        'Confirm insurance and valuation for high-value historic and waterfront properties before booking.',
        'Book early for peak tourist and moving seasons.',
        'Obtain multiple written estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
      ],
    },
    richland: {
      marketNotes:
        'Richland County is the heart of the state capital region with strong government, military, and university-related moving activity centered on Columbia.',
      costs: {
        studioRange: '$650–$1,350',
        familyRange: '$2,300–$5,200',
        avgHourly: '$110–$165/hr for a 2-person crew',
        note: 'Richland County pricing reflects Columbia capital-region demand, Fort Jackson PCS seasonality, university corridor traffic, and Midlands crew availability.',
      },
      tips: [
        'Verify explicit coverage for Columbia, Irmo, and Fort Jackson areas before booking.',
        'Government and university traffic impacts scheduling — confirm crew arrival windows.',
        'Confirm insurance and valuation for high-value and military relocations before booking.',
        'Book early for peak seasons and military PCS windows.',
        'Obtain multiple written estimates and compare hourly vs flat-rate quotes from Columbia-area crews.',
      ],
    },
    greenville: {
      marketNotes:
        'Greenville County is the largest and one of the fastest-growing counties in the Upstate with vibrant urban and suburban demand in Greenville, Greer, and Mauldin.',
      costs: {
        studioRange: '$700–$1,400',
        familyRange: '$2,400–$5,300',
        avgHourly: '$115–$170/hr for a 2-person crew',
        note: 'Greenville County pricing reflects Upstate metro growth, downtown and suburban turnover, and Greenville-Spartanburg corridor traffic.',
      },
      tips: [
        'Verify explicit coverage for Greenville, Greer, and Mauldin areas before booking.',
        'Upstate highway and urban traffic impacts scheduling — confirm crew arrival windows.',
        'Confirm insurance and valuation for high-value homes before booking.',
        'Book early for peak seasons and month-end lease turnover.',
        'Obtain multiple written estimates and compare hourly vs flat-rate quotes from Greenville and Spartanburg-area crews.',
      ],
    },
  };

export function getSouthCarolinaCountyResearch(
  countySlug: string
): CuratedCountyResearch | undefined {
  return southCarolinaCountyResearch[countySlug];
}
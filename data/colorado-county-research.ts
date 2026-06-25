import type { CountyCostGuide } from '@/lib/local-movers/county-seo';

export type CuratedCountyResearch = {
  marketNotes: string;
  costs: CountyCostGuide;
  tips: string[];
};

/** Hand-curated Colorado county research — batch 1+2: 23/64 */
export const coloradoCountyResearch: Record<string, CuratedCountyResearch> = {
  'el-paso': {
    marketNotes:
      'El Paso County is Colorado’s second most populous county with strong military, suburban, and residential demand.',
    costs: {
      studioRange: '$900–$1,900',
      familyRange: '$3,500–$8,000+',
      avgHourly: '$125–$190/hr for a 2-person crew',
      note: 'El Paso County pricing reflects Colorado Springs metro demand, military PCS turnover, Pikes Peak corridor traffic, and competition among full-service agents serving suburban communities.',
    },
    tips: [
      'Verify coverage for Colorado Springs, Fountain, and surrounding cities before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value suburban homes.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  denver: {
    marketNotes:
      'Denver County is coterminous with the City of Denver, with dense urban and residential demand.',
    costs: {
      studioRange: '$950–$2,100',
      familyRange: '$4,000–$9,500+',
      avgHourly: '$135–$200/hr for a 2-person crew',
      note: 'Denver County pricing reflects dense urban demand, parking and elevator access fees, heavy I-25 and I-70 corridor traffic, and competition among full-service agents serving downtown and neighborhood moves.',
    },
    tips: [
      'Verify coverage for Denver and surrounding neighborhoods before booking.',
      'Heavy urban traffic significantly impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value urban properties.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  arapahoe: {
    marketNotes:
      'Arapahoe County is a large suburban county south of Denver with strong residential demand.',
    costs: {
      studioRange: '$900–$1,900',
      familyRange: '$3,500–$8,500+',
      avgHourly: '$125–$190/hr for a 2-person crew',
      note: 'Arapahoe County pricing reflects Aurora and Centennial suburban demand, Denver metro spillover, and competition among full-service agents serving south-metro communities.',
    },
    tips: [
      'Verify coverage for Aurora, Centennial, and surrounding cities before booking.',
      'Denver metro traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value suburban homes.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  jefferson: {
    marketNotes:
      'Jefferson County is a large suburban county west of Denver with strong residential demand.',
    costs: {
      studioRange: '$900–$1,900',
      familyRange: '$3,500–$8,500+',
      avgHourly: '$125–$190/hr for a 2-person crew',
      note: 'Jefferson County pricing reflects Lakewood and Arvada suburban demand, foothills access, Denver metro spillover, and competition among full-service agents serving west-metro communities.',
    },
    tips: [
      'Verify coverage for Lakewood, Arvada, and surrounding cities before booking.',
      'Denver metro traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value suburban homes.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  adams: {
    marketNotes:
      'Adams County is a large suburban county northeast of Denver with strong residential demand.',
    costs: {
      studioRange: '$900–$1,900',
      familyRange: '$3,500–$8,500+',
      avgHourly: '$120–$185/hr for a 2-person crew',
      note: 'Adams County pricing reflects Thornton and Westminster suburban demand, Denver metro spillover, and competition among full-service agents serving north-metro communities.',
    },
    tips: [
      'Verify coverage for Thornton, Westminster, and surrounding cities before booking.',
      'Denver metro traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value suburban homes.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  douglas: {
    marketNotes:
      'Douglas County is a large and affluent suburban county south of Denver with strong residential demand.',
    costs: {
      studioRange: '$950–$2,000',
      familyRange: '$3,800–$9,000+',
      avgHourly: '$130–$195/hr for a 2-person crew',
      note: 'Douglas County pricing reflects Castle Rock and Highlands Ranch affluent suburban demand, Denver metro spillover, and competition among full-service agents serving south-suburban communities.',
    },
    tips: [
      'Verify coverage for Castle Rock, Highlands Ranch, and surrounding cities before booking.',
      'Denver metro traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value suburban homes.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  weld: {
    marketNotes:
      'Weld County is a rapidly growing northern Colorado county with strong residential and agricultural demand.',
    costs: {
      studioRange: '$850–$1,700',
      familyRange: '$3,000–$7,000+',
      avgHourly: '$115–$175/hr for a 2-person crew',
      note: 'Weld County pricing reflects Greeley metro demand, northern front-range growth, agricultural corridor logistics, and competition among regional agents serving Weld communities.',
    },
    tips: [
      'Verify coverage for Greeley and surrounding cities before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  larimer: {
    marketNotes:
      'Larimer County is a northern Colorado county centered on Fort Collins with strong university, tech, and residential demand across the northern Front Range.',
    costs: {
      studioRange: '$900–$1,900',
      familyRange: '$3,500–$8,000+',
      avgHourly: '$125–$190/hr for a 2-person crew',
      note: 'Larimer County pricing reflects Fort Collins metro demand, I-25 corridor traffic, CSU-area turnover, and competition among full-service agents serving northern Colorado communities.',
    },
    tips: [
      'Verify coverage for Fort Collins and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and rural properties.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  boulder: {
    marketNotes:
      'Boulder County is a high-demand Front Range county with strong residential, university, and foothills demand across Boulder and mountain gateway communities.',
    costs: {
      studioRange: '$950–$2,000',
      familyRange: '$3,800–$9,000+',
      avgHourly: '$130–$195/hr for a 2-person crew',
      note: 'Boulder County pricing reflects Boulder metro demand, foothills access logistics, Denver metro spillover, and competition among full-service agents serving northwest metro communities.',
    },
    tips: [
      'Verify coverage for Boulder and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and rural properties.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  pueblo: {
    marketNotes:
      'Pueblo County is a southern Colorado county with residential and industrial demand across Pueblo and rural southern corridor communities.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$160/hr for a 2-person crew',
      note: 'Pueblo County pricing reflects southern Colorado rural demand, I-25 corridor traffic, and competition among regional agents serving Pueblo and surrounding plains communities.',
    },
    tips: [
      'Verify coverage for Pueblo and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  mesa: {
    marketNotes:
      'Mesa County anchors western Colorado’s Grand Junction metro with strong residential, agricultural, and outdoor-recreation demand.',
    costs: {
      studioRange: '$800–$1,600',
      familyRange: '$2,900–$6,500+',
      avgHourly: '$115–$175/hr for a 2-person crew',
      note: 'Mesa County pricing reflects Grand Junction metro demand, western slope corridor logistics, and competition among regional agents serving Mesa County communities.',
    },
    tips: [
      'Verify coverage for Grand Junction and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and rural properties.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  broomfield: {
    marketNotes:
      'Broomfield County is a compact Denver metro county with strong residential and tech-corridor demand across Broomfield and northwest metro communities.',
    costs: {
      studioRange: '$900–$1,900',
      familyRange: '$3,500–$8,500+',
      avgHourly: '$125–$190/hr for a 2-person crew',
      note: 'Broomfield County pricing reflects Denver metro spillover demand, US-36 corridor traffic, and competition among full-service agents serving northwest metro communities.',
    },
    tips: [
      'Verify coverage for Broomfield and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and rural properties.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  garfield: {
    marketNotes:
      'Garfield County, CO spans Glenwood Springs and the Roaring Fork Valley with residential and tourism demand — not to be confused with Garfield County, Utah.',
    costs: {
      studioRange: '$800–$1,600',
      familyRange: '$2,900–$6,500+',
      avgHourly: '$115–$175/hr for a 2-person crew',
      note: 'Garfield County pricing reflects Glenwood Springs-area demand, I-70 corridor traffic, Roaring Fork Valley logistics, and competition among regional agents serving western Colorado communities.',
    },
    tips: [
      'Verify coverage for Glenwood Springs and surrounding areas before booking.',
      'Mountain-access roads and secondary-home logistics require route planning — confirm crew vehicle size and driveway access.',
      'Confirm coverage for mountain cabins, ski-season properties, and steep-driveway homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  'la-plata': {
    marketNotes:
      'La Plata County is a southwestern Colorado county centered on Durango with tourism, outdoor-recreation, and residential demand across the San Juan Mountains.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$160/hr for a 2-person crew',
      note: 'La Plata County pricing reflects Durango tourism demand, mountain-access logistics, vacation-rental turnover, and competition among regional agents serving southwestern Colorado communities.',
    },
    tips: [
      'Verify coverage for Durango and surrounding areas before booking.',
      'Tourist-season congestion and vacation-rental turnover may affect scheduling — confirm peak-season crew availability.',
      'Confirm parking permits and access for seasonal properties, resort condos, and short-term rentals before move day.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  eagle: {
    marketNotes:
      'Eagle County anchors Colorado’s Vail Valley resort market with luxury homes, vacation properties, and strong demand across Vail, Avon, and mountain resort communities.',
    costs: {
      studioRange: '$1,000–$2,200',
      familyRange: '$4,500–$10,500+',
      avgHourly: '$140–$210/hr for a 2-person crew',
      note: 'Eagle County pricing reflects Vail resort demand, ski-season turnover, I-70 mountain corridor traffic, and competition among full-service agents serving Eagle County resort communities.',
    },
    tips: [
      'Verify coverage for Vail and surrounding areas before booking.',
      'Resort-season congestion and ski-town traffic significantly impact scheduling — confirm peak-season crew availability.',
      'Mountain-home and vacation-rental logistics require route planning — confirm parking permits, elevator reservations, and driveway access.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  fremont: {
    marketNotes:
      'Fremont County is a central Colorado county with residential demand across Canon City and Royal Gorge corridor communities.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$160/hr for a 2-person crew',
      note: 'Fremont County pricing reflects Canon City-area demand, rural corridor logistics, and competition among regional agents serving central Colorado communities.',
    },
    tips: [
      'Verify coverage for Canon City and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  montrose: {
    marketNotes:
      'Montrose County is a western Colorado county with residential and agricultural demand across Montrose and Uncompahgre Valley communities.',
    costs: {
      studioRange: '$800–$1,600',
      familyRange: '$2,900–$6,500+',
      avgHourly: '$115–$175/hr for a 2-person crew',
      note: 'Montrose County pricing reflects Montrose-area demand, US-50 corridor traffic, and competition among regional agents serving western Colorado valley communities.',
    },
    tips: [
      'Verify coverage for Montrose and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and rural properties.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  delta: {
    marketNotes:
      'Delta County is a western Colorado county with residential and agricultural demand across Delta and rural western slope communities.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$160/hr for a 2-person crew',
      note: 'Delta County pricing reflects Delta-area demand, rural travel distances, and competition among regional agents serving western Colorado communities.',
    },
    tips: [
      'Verify coverage for Delta and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  elbert: {
    marketNotes:
      'Elbert County is an eastern plains county with residential and ranch demand across Kiowa and rural Denver metro fringe communities.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$160/hr for a 2-person crew',
      note: 'Elbert County pricing reflects Kiowa-area demand, eastern plains travel distances, and competition among regional agents serving rural Front Range fringe communities.',
    },
    tips: [
      'Verify coverage for Kiowa and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  summit: {
    marketNotes:
      'Summit County, CO anchors Colorado’s high-country resort market with luxury homes and vacation properties across Breckenridge and Frisco — not to be confused with Summit County, Utah.',
    costs: {
      studioRange: '$1,000–$2,200',
      familyRange: '$4,500–$10,500+',
      avgHourly: '$140–$210/hr for a 2-person crew',
      note: 'Summit County pricing reflects Breckenridge resort demand, ski-season turnover, I-70 mountain corridor traffic, and competition among full-service agents serving high-country resort communities.',
    },
    tips: [
      'Verify coverage for Breckenridge and surrounding areas before booking.',
      'Resort-season congestion and ski-town traffic significantly impact scheduling — confirm peak-season crew availability.',
      'Mountain-home and vacation-rental logistics require route planning — confirm parking permits, elevator reservations, and driveway access.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  morgan: {
    marketNotes:
      'Morgan County, CO is an eastern plains county with residential and agricultural demand across Fort Morgan — not to be confused with Morgan County, Utah.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$160/hr for a 2-person crew',
      note: 'Morgan County pricing reflects Fort Morgan-area demand, eastern plains travel distances, and competition among regional agents serving northeastern Colorado communities.',
    },
    tips: [
      'Verify coverage for Fort Morgan and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  montezuma: {
    marketNotes:
      'Montezuma County is a southwestern Colorado county with residential and tourism demand across Cortez and four corners gateway communities.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$160/hr for a 2-person crew',
      note: 'Montezuma County pricing reflects Cortez-area demand, four corners corridor logistics, and competition among regional agents serving southwestern Colorado communities.',
    },
    tips: [
      'Verify coverage for Cortez and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and rural properties.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  routt: {
    marketNotes:
      'Routt County anchors northwestern Colorado’s Steamboat Springs resort market with luxury homes, vacation properties, and strong Yampa Valley residential demand.',
    costs: {
      studioRange: '$1,000–$2,200',
      familyRange: '$4,500–$10,500+',
      avgHourly: '$140–$210/hr for a 2-person crew',
      note: 'Routt County pricing reflects Steamboat resort demand, ski-season turnover, mountain-access logistics, and competition among full-service agents serving northwestern Colorado resort communities.',
    },
    tips: [
      'Verify coverage for Steamboat Springs and surrounding areas before booking.',
      'Resort-season congestion and ski-town traffic significantly impact scheduling — confirm peak-season crew availability.',
      'Mountain-home and vacation-rental logistics require route planning — confirm parking permits, elevator reservations, and driveway access.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
};

export function getColoradoCountyResearch(
  countySlug: string
): CuratedCountyResearch | undefined {
  return coloradoCountyResearch[countySlug];
}

import type { CountyCostGuide } from '@/lib/local-movers/county-seo';

export type CuratedCountyResearch = {
  marketNotes: string;
  costs: CountyCostGuide;
  tips: string[];
};

/** Hand-curated Colorado county research — 64/64 complete */
export const coloradoCountyResearch: Record<string, CuratedCountyResearch> = {
  'el-paso': {
    marketNotes:
      'El Paso County anchors Colorado Springs — the state’s second-highest-value market. Fort Carson, Peterson Space Force Base, and Air Force Academy military PCS moves, family suburban growth, and Pikes Peak corridor logistics distinguish El Paso from Denver metro density.',
    costs: {
      studioRange: '$900–$1,900',
      familyRange: '$3,500–$8,000+',
      avgHourly: '$125–$190/hr for a 2-person crew',
      note: 'El Paso County pricing reflects Colorado Springs metro demand, military PCS turnover, Pikes Peak corridor traffic, and competition among full-service agents serving suburban communities.',
    },
    tips: [
      'Verify coverage for Colorado Springs, Fountain, and Monument before booking.',
      'Military PCS moves near Fort Carson, Peterson SFB, and the Air Force Academy require base access coordination — confirm mover credentials.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value suburban homes.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  denver: {
    marketNotes:
      'Denver County anchors the Front Range metro — Colorado’s highest-value moving market. Tech and corporate growth, outdoor-lifestyle family moves, dense urban high-rises, and rapid population growth along I-25 distinguish Denver from Colorado Springs military corridors and mountain resort counties.',
    costs: {
      studioRange: '$950–$2,100',
      familyRange: '$4,000–$9,500+',
      avgHourly: '$135–$200/hr for a 2-person crew',
      note: 'Denver County pricing reflects dense urban demand, parking and elevator access fees, heavy I-25 and I-70 corridor traffic, tech-sector corporate relocations, and competition among full-service agents serving downtown and neighborhood moves.',
    },
    tips: [
      'Verify coverage for Denver and surrounding neighborhoods before booking.',
      'Corporate and tech-sector relocations may require building access coordination — confirm commercial move experience.',
      'Heavy urban traffic significantly impacts scheduling — confirm crew arrival windows.',
      'High-rise and condo moves may require elevator reservations and parking permits — confirm building logistics.',
      'Confirm insurance for high-value urban properties.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  arapahoe: {
    marketNotes:
      'Arapahoe County anchors Denver’s south metro — Aurora, Centennial, and Englewood drive high-volume suburban and corporate relocations. Tech-sector spillover from DTC, family-oriented communities, and I-225 corridor traffic distinguish Arapahoe from downtown Denver density.',
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
      'Jefferson County anchors Denver’s west metro — Lakewood, Arvada, and Golden combine foothills access with dense suburban demand. Outdoor-lifestyle family moves, I-70 mountain corridor staging, and corporate relocations along the C-470 belt distinguish Jefferson from downtown Denver.',
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
      'Douglas County is Denver’s affluent south-suburban corridor — Castle Rock, Highlands Ranch, and Parker attract family-oriented corporate relocations and long-distance inbound moves along the I-25 growth spine. Higher home values and master-planned communities distinguish Douglas from urban Denver counties.',
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
      'Boulder County blends university-town demand (CU Boulder), tech and outdoor-lifestyle relocations, and Flatirons foothills access. Boulder’s high cost of living and limited parking drive specialized urban and suburban move logistics distinct from Denver metro sprawl.',
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
  teller: {
    marketNotes:
      'Teller County is a Pikes Peak west mountain county with tourism, gaming, and residential demand across Cripple Creek and Woodland Park corridor communities.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$160/hr for a 2-person crew',
      note: 'Teller County pricing reflects Cripple Creek-area demand, Pikes Peak west mountain-access logistics, Colorado Springs metro spillover, and competition among regional agents serving Teller County communities.',
    },
    tips: [
      'Verify coverage for Cripple Creek and surrounding areas before booking.',
      'Resort-season congestion and ski-town traffic significantly impact scheduling — confirm peak-season crew availability.',
      'Mountain-home and vacation-rental logistics require route planning — confirm parking permits, elevator reservations, and driveway access.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  chaffee: {
    marketNotes:
      'Chaffee County is a central Colorado mountain county centered on Salida with tourism, outdoor-recreation, and residential demand across the Arkansas River Valley.',
    costs: {
      studioRange: '$800–$1,600',
      familyRange: '$2,900–$6,500+',
      avgHourly: '$115–$175/hr for a 2-person crew',
      note: 'Chaffee County pricing reflects Salida tourism demand, mountain-access logistics, vacation-rental turnover, and competition among regional agents serving central Colorado mountain communities.',
    },
    tips: [
      'Verify coverage for Salida and surrounding areas before booking.',
      'Resort-season congestion and ski-town traffic significantly impact scheduling — confirm peak-season crew availability.',
      'Mountain-home and vacation-rental logistics require route planning — confirm parking permits, elevator reservations, and driveway access.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  logan: {
    marketNotes:
      'Logan County, CO is an eastern plains county centered on Sterling with residential and agricultural demand across northeastern Colorado communities.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$160/hr for a 2-person crew',
      note: 'Logan County pricing reflects Sterling-area demand, eastern plains travel distances, and competition among regional agents serving northeastern Colorado communities.',
    },
    tips: [
      'Verify coverage for Sterling and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  park: {
    marketNotes:
      'Park County, CO spans Fairplay and the South Park high-country basin with mountain residential and seasonal demand across central Colorado communities.',
    costs: {
      studioRange: '$800–$1,600',
      familyRange: '$2,900–$6,500+',
      avgHourly: '$115–$175/hr for a 2-person crew',
      note: 'Park County pricing reflects Fairplay-area demand, South Park mountain-access logistics, Denver metro spillover, and competition among regional agents serving high-country communities.',
    },
    tips: [
      'Verify coverage for Fairplay and surrounding areas before booking.',
      'Mountain-access roads and secondary-home logistics require route planning — confirm crew vehicle size and driveway access.',
      'Confirm coverage for mountain cabins, ski-season properties, and steep-driveway homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  otero: {
    marketNotes:
      'Otero County, CO is a southeastern plains county centered on La Junta with residential and agricultural demand across Arkansas Valley communities.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$160/hr for a 2-person crew',
      note: 'Otero County pricing reflects La Junta-area demand, southeastern plains travel distances, and competition among regional agents serving rural Colorado communities.',
    },
    tips: [
      'Verify coverage for La Junta and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  gunnison: {
    marketNotes:
      'Gunnison County is a central Colorado mountain county with tourism, university, and outdoor-recreation demand across Gunnison and Crested Butte communities.',
    costs: {
      studioRange: '$800–$1,600',
      familyRange: '$2,900–$6,500+',
      avgHourly: '$115–$175/hr for a 2-person crew',
      note: 'Gunnison County pricing reflects Gunnison tourism demand, Crested Butte resort spillover, mountain-access logistics, and competition among regional agents serving central Colorado communities.',
    },
    tips: [
      'Verify coverage for Gunnison and surrounding areas before booking.',
      'Resort-season congestion and ski-town traffic significantly impact scheduling — confirm peak-season crew availability.',
      'Mountain-home and vacation-rental logistics require route planning — confirm parking permits, elevator reservations, and driveway access.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  grand: {
    marketNotes:
      'Grand County, CO spans Granby, Winter Park, and Hot Sulphur Springs with mountain resort and residential demand across the western I-70 corridor.',
    costs: {
      studioRange: '$900–$1,900',
      familyRange: '$3,500–$8,000+',
      avgHourly: '$125–$190/hr for a 2-person crew',
      note: 'Grand County pricing reflects Granby and Winter Park demand, I-70 mountain corridor traffic, ski-season turnover, and competition among full-service agents serving Grand County resort communities.',
    },
    tips: [
      'Verify coverage for Granby and surrounding areas before booking.',
      'Mountain-access roads and secondary-home logistics require route planning — confirm crew vehicle size and driveway access.',
      'Confirm coverage for mountain cabins, ski-season properties, and steep-driveway homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  alamosa: {
    marketNotes:
      'Alamosa County anchors the San Luis Valley with residential, agricultural, and university demand across Alamosa and southern Colorado valley communities.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$160/hr for a 2-person crew',
      note: 'Alamosa County pricing reflects San Luis Valley demand, rural travel distances, and competition among regional agents serving southern Colorado communities.',
    },
    tips: [
      'Verify coverage for Alamosa and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  pitkin: {
    marketNotes:
      'Pitkin County anchors Colorado’s Aspen luxury resort market with high-value homes, vacation properties, and strong demand across Aspen and Roaring Fork Valley communities.',
    costs: {
      studioRange: '$1,200–$2,500',
      familyRange: '$5,500–$12,000+',
      avgHourly: '$155–$230/hr for a 2-person crew',
      note: 'Pitkin County pricing reflects Aspen luxury resort demand, ski-season turnover, Roaring Fork Valley logistics, and competition among full-service agents serving high-end mountain resort communities.',
    },
    tips: [
      'Verify coverage for Aspen and surrounding areas before booking.',
      'Resort-season congestion and ski-town traffic significantly impact scheduling — confirm peak-season crew availability.',
      'Mountain-home and vacation-rental logistics require route planning — confirm parking permits, elevator reservations, and driveway access.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  archuleta: {
    marketNotes:
      'Archuleta County is a southwestern Colorado county centered on Pagosa Springs with tourism, outdoor-recreation, and residential demand across the San Juan south corridor.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$160/hr for a 2-person crew',
      note: 'Archuleta County pricing reflects Pagosa Springs tourism demand, mountain-access logistics, vacation-rental turnover, and competition among regional agents serving southwestern Colorado communities.',
    },
    tips: [
      'Verify coverage for Pagosa Springs and surrounding areas before booking.',
      'Tourist-season congestion and vacation-rental turnover may affect scheduling — confirm peak-season crew availability.',
      'Confirm parking permits and access for seasonal properties, resort condos, and short-term rentals before move day.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  'las-animas': {
    marketNotes:
      'Las Animas County is a southern Colorado county centered on Trinidad with residential and energy-corridor demand across the southern frontier region.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$160/hr for a 2-person crew',
      note: 'Las Animas County pricing reflects Trinidad-area demand, southern Colorado rural travel distances, and competition among regional agents serving frontier corridor communities.',
    },
    tips: [
      'Verify coverage for Trinidad and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  moffat: {
    marketNotes:
      'Moffat County is a northwestern Colorado county centered on Craig with residential, energy, and agricultural demand across northwest Colorado communities.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$160/hr for a 2-person crew',
      note: 'Moffat County pricing reflects Craig-area demand, northwest Colorado travel distances, and competition among regional agents serving rural corridor communities.',
    },
    tips: [
      'Verify coverage for Craig and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  prowers: {
    marketNotes:
      'Prowers County is an eastern plains county centered on Lamar with residential and agricultural demand across southeastern Colorado communities.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$160/hr for a 2-person crew',
      note: 'Prowers County pricing reflects Lamar-area demand, eastern plains travel distances, and competition among regional agents serving rural southeastern Colorado communities.',
    },
    tips: [
      'Verify coverage for Lamar and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  'rio-grande': {
    marketNotes:
      'Rio Grande County, CO is a southern Colorado county centered on Del Norte with residential and agricultural demand across the Rio Grande Valley.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$160/hr for a 2-person crew',
      note: 'Rio Grande County pricing reflects Del Norte-area demand, San Juan south corridor logistics, and competition among regional agents serving rural southern Colorado communities.',
    },
    tips: [
      'Verify coverage for Del Norte and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  yuma: {
    marketNotes:
      'Yuma County, CO is an eastern Colorado corner county centered on Wray with residential and agricultural demand across the northeastern plains.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$160/hr for a 2-person crew',
      note: 'Yuma County pricing reflects Wray-area demand, eastern corner travel distances, and competition among regional agents serving rural northeastern Colorado communities.',
    },
    tips: [
      'Verify coverage for Wray and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  'clear-creek': {
    marketNotes:
      'Clear Creek County spans Georgetown and the I-70 mountain corridor with residential and seasonal demand across Denver metro gateway communities.',
    costs: {
      studioRange: '$900–$1,900',
      familyRange: '$3,500–$8,500+',
      avgHourly: '$125–$190/hr for a 2-person crew',
      note: 'Clear Creek County pricing reflects Georgetown-area demand, I-70 mountain corridor traffic, Denver metro spillover, and competition among full-service agents serving west-metro mountain communities.',
    },
    tips: [
      'Verify coverage for Georgetown and surrounding areas before booking.',
      'Mountain-access roads and secondary-home logistics require route planning — confirm crew vehicle size and driveway access.',
      'Confirm coverage for mountain cabins, ski-season properties, and steep-driveway homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  'san-miguel': {
    marketNotes:
      'San Miguel County, CO anchors the Telluride resort market with luxury homes, vacation properties, and strong demand across southwestern Colorado mountain communities.',
    costs: {
      studioRange: '$1,000–$2,200',
      familyRange: '$4,500–$10,500+',
      avgHourly: '$140–$210/hr for a 2-person crew',
      note: 'San Miguel County pricing reflects Telluride resort demand, ski-season turnover, San Juan mountain-access logistics, and competition among full-service agents serving luxury resort communities.',
    },
    tips: [
      'Verify coverage for Telluride and surrounding areas before booking.',
      'Resort-season congestion and ski-town traffic significantly impact scheduling — confirm peak-season crew availability.',
      'Mountain-home and vacation-rental logistics require route planning — confirm parking permits, elevator reservations, and driveway access.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  lake: {
    marketNotes:
      'Lake County, CO is Colorado’s smallest county centered on Leadville with mountain residential and tourism demand across high-country communities.',
    costs: {
      studioRange: '$800–$1,600',
      familyRange: '$2,900–$6,500+',
      avgHourly: '$115–$175/hr for a 2-person crew',
      note: 'Lake County pricing reflects Leadville-area demand, high-country mountain-access logistics, and competition among regional agents serving central Colorado mountain communities.',
    },
    tips: [
      'Verify coverage for Leadville and surrounding areas before booking.',
      'Mountain-access roads and secondary-home logistics require route planning — confirm crew vehicle size and driveway access.',
      'Confirm coverage for mountain cabins, ski-season properties, and steep-driveway homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  conejos: {
    marketNotes:
      'Conejos County is a southern Colorado county with residential and agricultural demand across Conejos and San Luis Valley south corridor communities.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$160/hr for a 2-person crew',
      note: 'Conejos County pricing reflects Conejos-area demand, San Luis Valley rural travel distances, and competition among regional agents serving southern Colorado communities.',
    },
    tips: [
      'Verify coverage for Conejos and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  'kit-carson': {
    marketNotes:
      'Kit Carson County is an eastern plains county centered on Burlington with residential and agricultural demand across northeastern Colorado communities.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$160/hr for a 2-person crew',
      note: 'Kit Carson County pricing reflects Burlington-area demand, eastern plains travel distances, and competition among regional agents serving rural northeastern Colorado communities.',
    },
    tips: [
      'Verify coverage for Burlington and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  huerfano: {
    marketNotes:
      'Huerfano County is a southern Colorado county centered on Walsenburg with residential demand across Spanish Peaks corridor and I-25 south communities.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$160/hr for a 2-person crew',
      note: 'Huerfano County pricing reflects Walsenburg-area demand, southern Colorado rural travel distances, and competition among regional agents serving I-25 south corridor communities.',
    },
    tips: [
      'Verify coverage for Walsenburg and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  saguache: {
    marketNotes:
      'Saguache County is a central Colorado county centered on Saguache with rural residential and agricultural demand across the San Luis Valley.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$160/hr for a 2-person crew',
      note: 'Saguache County pricing reflects San Luis Valley demand, rural travel distances, and competition among regional agents serving central Colorado communities.',
    },
    tips: [
      'Verify coverage for Saguache and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  'rio-blanco': {
    marketNotes:
      'Rio Blanco County is a northwestern Colorado county centered on Meeker with rural residential, energy, and agricultural demand across the White River Valley.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$160/hr for a 2-person crew',
      note: 'Rio Blanco County pricing reflects Meeker-area demand, northwest Colorado travel distances, and competition among regional agents serving rural corridor communities.',
    },
    tips: [
      'Verify coverage for Meeker and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  gilpin: {
    marketNotes:
      'Gilpin County is a small mountain county centered on Central City with residential, tourism, and gaming-corridor demand across the Denver west gateway.',
    costs: {
      studioRange: '$800–$1,600',
      familyRange: '$2,900–$6,500+',
      avgHourly: '$115–$175/hr for a 2-person crew',
      note: 'Gilpin County pricing reflects Central City-area demand, I-70 mountain corridor traffic, Denver metro spillover, and competition among regional agents serving west-metro mountain communities.',
    },
    tips: [
      'Verify coverage for Central City and surrounding areas before booking.',
      'Mountain-access roads and secondary-home logistics require route planning — confirm crew vehicle size and driveway access.',
      'Confirm coverage for mountain cabins, ski-season properties, and steep-driveway homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  crowley: {
    marketNotes:
      'Crowley County is an eastern plains county centered on Ordway with rural residential and agricultural demand across the Arkansas Valley east corridor.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$160/hr for a 2-person crew',
      note: 'Crowley County pricing reflects Ordway-area demand, eastern plains travel distances, and competition among regional agents serving southeastern Colorado communities.',
    },
    tips: [
      'Verify coverage for Ordway and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  lincoln: {
    marketNotes:
      'Lincoln County, CO is an eastern plains county centered on Hugo with rural residential and agricultural demand across the I-70 east corridor.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$160/hr for a 2-person crew',
      note: 'Lincoln County pricing reflects Hugo-area demand, eastern plains travel distances, and competition among regional agents serving northeastern Colorado communities.',
    },
    tips: [
      'Verify coverage for Hugo and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  bent: {
    marketNotes:
      'Bent County, CO is an eastern plains county centered on Las Animas with rural residential and agricultural demand across the Arkansas Valley south corridor.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$160/hr for a 2-person crew',
      note: 'Bent County pricing reflects Las Animas-area demand, southeastern plains travel distances, and competition among regional agents serving rural Arkansas Valley communities.',
    },
    tips: [
      'Verify coverage for Las Animas and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  custer: {
    marketNotes:
      'Custer County, CO is a central mountain county centered on Westcliffe with residential demand across the Wet Mountain Valley and Sangre de Cristo foothills.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$160/hr for a 2-person crew',
      note: 'Custer County pricing reflects Westcliffe-area demand, mountain-access logistics, and competition among regional agents serving central Colorado mountain communities.',
    },
    tips: [
      'Verify coverage for Westcliffe and surrounding areas before booking.',
      'Mountain-access roads and secondary-home logistics require route planning — confirm crew vehicle size and driveway access.',
      'Confirm coverage for mountain cabins, ski-season properties, and steep-driveway homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  ouray: {
    marketNotes:
      'Ouray County is a southwestern mountain county centered on Ouray with tourism, outdoor-recreation, and residential demand along the Million Dollar Highway corridor.',
    costs: {
      studioRange: '$900–$1,900',
      familyRange: '$3,500–$8,000+',
      avgHourly: '$125–$190/hr for a 2-person crew',
      note: 'Ouray County pricing reflects Ouray tourism demand, mountain-access logistics, vacation-rental turnover, and competition among regional agents serving southwestern Colorado resort communities.',
    },
    tips: [
      'Verify coverage for Ouray and surrounding areas before booking.',
      'Resort-season congestion and ski-town traffic significantly impact scheduling — confirm peak-season crew availability.',
      'Mountain-home and vacation-rental logistics require route planning — confirm parking permits, elevator reservations, and driveway access.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  washington: {
    marketNotes:
      'Washington County, CO is an eastern plains county centered on Akron with rural residential and agricultural demand across northeastern Colorado communities.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$160/hr for a 2-person crew',
      note: 'Washington County pricing reflects Akron-area demand, eastern plains travel distances, and competition among regional agents serving northeastern Colorado communities.',
    },
    tips: [
      'Verify coverage for Akron and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  phillips: {
    marketNotes:
      'Phillips County is an eastern plains county centered on Holyoke with rural residential and agricultural demand across the Nebraska border corridor.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$160/hr for a 2-person crew',
      note: 'Phillips County pricing reflects Holyoke-area demand, eastern plains travel distances, and competition among regional agents serving northeastern border communities.',
    },
    tips: [
      'Verify coverage for Holyoke and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  costilla: {
    marketNotes:
      'Costilla County is a southern Colorado county centered on San Luis with rural residential and agricultural demand across the Culebra Range and San Luis Valley south corridor.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$160/hr for a 2-person crew',
      note: 'Costilla County pricing reflects San Luis-area demand, southern valley travel distances, and competition among regional agents serving rural San Luis Valley communities.',
    },
    tips: [
      'Verify coverage for San Luis and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  baca: {
    marketNotes:
      'Baca County is an eastern plains county centered on Springfield with rural residential and agricultural demand across southeastern Colorado corner communities.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$160/hr for a 2-person crew',
      note: 'Baca County pricing reflects Springfield-area demand, southeastern plains travel distances, and competition among regional agents serving rural frontier communities.',
    },
    tips: [
      'Verify coverage for Springfield and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  dolores: {
    marketNotes:
      'Dolores County is a southwestern Colorado county centered on Dove Creek with rural residential and agricultural demand across the four corners west corridor.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$160/hr for a 2-person crew',
      note: 'Dolores County pricing reflects Dove Creek-area demand, southwestern rural travel distances, and competition among regional agents serving four corners gateway communities.',
    },
    tips: [
      'Verify coverage for Dove Creek and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  sedgwick: {
    marketNotes:
      'Sedgwick County is an eastern plains county centered on Julesburg with rural residential and agricultural demand across the Nebraska border I-76 corridor.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$160/hr for a 2-person crew',
      note: 'Sedgwick County pricing reflects Julesburg-area demand, northeastern border travel distances, and competition among regional agents serving rural corridor communities.',
    },
    tips: [
      'Verify coverage for Julesburg and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  cheyenne: {
    marketNotes:
      'Cheyenne County, CO is an eastern plains county centered on Cheyenne Wells with rural residential and agricultural demand across southeastern Colorado communities.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$160/hr for a 2-person crew',
      note: 'Cheyenne County pricing reflects Cheyenne Wells-area demand, eastern plains travel distances, and competition among regional agents serving rural southeastern Colorado communities.',
    },
    tips: [
      'Verify coverage for Cheyenne Wells and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  kiowa: {
    marketNotes:
      'Kiowa County, CO is an eastern plains county centered on Eads with rural residential and agricultural demand across the high plains east corridor.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$160/hr for a 2-person crew',
      note: 'Kiowa County pricing reflects Eads-area demand, eastern plains travel distances, and competition among regional agents serving rural high plains communities.',
    },
    tips: [
      'Verify coverage for Eads and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  jackson: {
    marketNotes:
      'Jackson County, CO is a north-central mountain county centered on Walden with rural residential demand across North Park and the Medicine Bow corridor.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$160/hr for a 2-person crew',
      note: 'Jackson County pricing reflects Walden-area demand, North Park mountain-access logistics, and competition among regional agents serving remote north-central Colorado communities.',
    },
    tips: [
      'Verify coverage for Walden and surrounding areas before booking.',
      'Mountain-access roads and secondary-home logistics require route planning — confirm crew vehicle size and driveway access.',
      'Confirm coverage for mountain cabins, ski-season properties, and steep-driveway homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  mineral: {
    marketNotes:
      'Mineral County, CO is a small high-mountain county centered on Creede with residential and tourism demand across the northern San Juan range.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$160/hr for a 2-person crew',
      note: 'Mineral County pricing reflects Creede-area demand, high-mountain access logistics, and competition among regional agents serving remote San Juan communities.',
    },
    tips: [
      'Verify coverage for Creede and surrounding areas before booking.',
      'Mountain-access roads and secondary-home logistics require route planning — confirm crew vehicle size and driveway access.',
      'Confirm coverage for mountain cabins, ski-season properties, and steep-driveway homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  'san-juan': {
    marketNotes:
      'San Juan County, CO is Colorado’s smallest county centered on Silverton with tourism, outdoor-recreation, and high-alpine residential demand.',
    costs: {
      studioRange: '$900–$1,900',
      familyRange: '$3,500–$8,000+',
      avgHourly: '$125–$190/hr for a 2-person crew',
      note: 'San Juan County pricing reflects Silverton tourism demand, alpine mountain-access logistics, vacation-rental turnover, and competition among regional agents serving high-alpine resort communities.',
    },
    tips: [
      'Verify coverage for Silverton and surrounding areas before booking.',
      'Resort-season congestion and ski-town traffic significantly impact scheduling — confirm peak-season crew availability.',
      'Mountain-home and vacation-rental logistics require route planning — confirm parking permits, elevator reservations, and driveway access.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  hinsdale: {
    marketNotes:
      'Hinsdale County is one of Colorado’s smallest and most remote counties centered on Lake City with rural residential demand across the remote San Juan range.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$160/hr for a 2-person crew',
      note: 'Hinsdale County pricing reflects Lake City-area demand, remote mountain-access logistics, limited crew availability, and competition among regional agents serving isolated San Juan communities.',
    },
    tips: [
      'Verify coverage for Lake City and surrounding areas before booking.',
      'Mountain-access roads and secondary-home logistics require route planning — confirm crew vehicle size and driveway access.',
      'Confirm coverage for mountain cabins, ski-season properties, and steep-driveway homes before booking.',
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

import type { CountyCostGuide } from '@/lib/local-movers/county-seo';

export type CuratedCountyResearch = {
  marketNotes: string;
  costs: CountyCostGuide;
  tips: string[];
};

/** Hand-curated New Mexico county research — 33/33 complete */
export const newMexicoCountyResearch: Record<string, CuratedCountyResearch> = {
  bernalillo: {
    marketNotes:
      'Bernalillo County anchors New Mexico’s Albuquerque metro — by far the state’s highest-value moving market. Corporate and Sandia National Labs relocations, Kirtland AFB military PCS moves, Rio Rancho suburban growth, and I-25/I-40 corridor logistics distinguish Bernalillo from rural New Mexico counties.',
    costs: {
      studioRange: '$850–$1,700',
      familyRange: '$3,000–$7,000+',
      avgHourly: '$120–$180/hr for a 2-person crew',
      note: 'Bernalillo County pricing reflects Albuquerque metro demand, I-25 and I-40 corridor traffic, Kirtland AFB-area military PCS volume, and competition among full-service agents serving urban and suburban communities.',
    },
    tips: [
      'Verify coverage for Albuquerque, Rio Rancho, and surrounding cities before booking.',
      'Military PCS moves near Kirtland AFB require base access coordination — confirm mover credentials and clearance experience.',
      'Sandia National Labs and corporate relocations may require security-cleared crews — confirm commercial move experience.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'High-desert heat and altitude may affect loading times — confirm early-morning scheduling when possible.',
      'Confirm insurance for high-value suburban and foothills homes.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  'doa-ana': {
    marketNotes:
      'Doña Ana County anchors southern New Mexico’s Las Cruces metro — a military and cross-border market distinct from Albuquerque. Holloman AFB and White Sands Missile Range PCS moves, Mesilla Valley agricultural communities, and El Paso, TX cross-border relocations distinguish Doña Ana from northern tourism markets.',
    costs: {
      studioRange: '$800–$1,600',
      familyRange: '$2,900–$6,500+',
      avgHourly: '$115–$175/hr for a 2-person crew',
      note: 'Doña Ana County pricing reflects Las Cruces metro demand, I-10 and I-25 corridor traffic, Holloman AFB military PCS volume, and cross-border hauls to El Paso, TX.',
    },
    tips: [
      'Verify coverage for Las Cruces, Mesilla, and surrounding communities before booking.',
      'Military PCS moves near Holloman AFB and White Sands require base access coordination — confirm mover credentials.',
      'Cross-border moves to El Paso, TX may require interstate FMCSA authority — confirm licensing and border timing.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  sandoval: {
    marketNotes:
      'Sandoval County is a rapidly growing suburban county north of Albuquerque with strong residential demand.',
    costs: {
      studioRange: '$850–$1,700',
      familyRange: '$3,000–$7,000+',
      avgHourly: '$120–$180/hr for a 2-person crew',
      note: 'Sandoval County pricing reflects Rio Rancho and Albuquerque metro spillover demand, US-550 corridor traffic, and competition among regional agents serving fast-growing suburban communities.',
    },
    tips: [
      'Verify coverage for Rio Rancho and surrounding areas before booking.',
      'Albuquerque metro traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value suburban homes.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  'santa-fe': {
    marketNotes:
      'Santa Fe County is New Mexico’s capital and tourism hub — historic adobe homes, second-home and retirement moves, state-government relocations, and Los Alamos National Lab spillover distinguish Santa Fe from Albuquerque corporate growth and southern military corridors.',
    costs: {
      studioRange: '$850–$1,700',
      familyRange: '$3,000–$7,000+',
      avgHourly: '$120–$180/hr for a 2-person crew',
      note: 'Santa Fe County pricing reflects capital-city and tourism demand, US-84/285 corridor traffic, historic adobe specialty handling, and competition among regional agents serving high-country and Eldorado communities.',
    },
    tips: [
      'Verify coverage for Santa Fe, Eldorado, and surrounding areas before booking.',
      'Historic adobe and high-value homes require specialty handling — confirm insurance and adobe-move experience.',
      'Tourism and second-home seasonal moves often need flexible scheduling and storage — confirm availability.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Book early for peak tourist seasons (June–October) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  'san-juan': {
    marketNotes:
      'San Juan County is a northwestern New Mexico county with residential demand across the Farmington metro and Four Corners region.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$160/hr for a 2-person crew',
      note: 'San Juan County pricing reflects Farmington metro demand, US-64 corridor traffic, and competition among regional agents serving northwestern New Mexico and Four Corners communities.',
    },
    tips: [
      'Verify coverage for Farmington and surrounding cities before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  valencia: {
    marketNotes:
      'Valencia County is a suburban county south of Albuquerque with strong residential demand.',
    costs: {
      studioRange: '$800–$1,600',
      familyRange: '$2,900–$6,500+',
      avgHourly: '$115–$175/hr for a 2-person crew',
      note: 'Valencia County pricing reflects Albuquerque metro south-valley spillover demand, I-25 corridor traffic through Los Lunas, and competition among regional agents serving suburban communities.',
    },
    tips: [
      'Verify coverage for Los Lunas and surrounding areas before booking.',
      'Albuquerque metro traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value suburban homes.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  lea: {
    marketNotes:
      'Lea County is a southeastern New Mexico county with residential demand across the Hobbs metro and Permian Basin region.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Lea County pricing reflects Hobbs metro and energy-sector demand, US-62/180 corridor traffic, and competition among regional agents serving southeastern New Mexico communities.',
    },
    tips: [
      'Verify coverage for Hobbs and surrounding cities before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Energy-sector relocations may require flexible scheduling — confirm commercial move experience when needed.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  otero: {
    marketNotes:
      'Otero County is a southern New Mexico county with residential demand across Alamogordo and the White Sands region.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Otero County pricing reflects Alamogordo metro demand, US-54 and US-70 corridor traffic, and competition among regional agents serving southern high-desert communities.',
    },
    tips: [
      'Verify coverage for Alamogordo and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Military and federal relocations near Holloman AFB require base access coordination — confirm credentials.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  mckinley: {
    marketNotes:
      'McKinley County is a northwestern New Mexico county with residential demand across Gallup and the Route 66 corridor.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'McKinley County pricing reflects Gallup metro demand, I-40 corridor traffic, and competition among regional agents serving northwestern New Mexico communities.',
    },
    tips: [
      'Verify coverage for Gallup and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  eddy: {
    marketNotes:
      'Eddy County is a southeastern New Mexico county with residential demand across Carlsbad and the energy corridor.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Eddy County pricing reflects Carlsbad metro and energy-sector demand, US-285 corridor traffic, and competition among regional agents serving southeastern New Mexico communities.',
    },
    tips: [
      'Verify coverage for Carlsbad and surrounding cities before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Energy-sector relocations may require flexible scheduling — confirm commercial move experience when needed.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  chaves: {
    marketNotes:
      'Chaves County is a southeastern New Mexico county with residential demand across Roswell and the Pecos Valley.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Chaves County pricing reflects Roswell metro demand, US-285 and US-70 corridor traffic, and competition among regional agents serving southeastern New Mexico Pecos Valley communities.',
    },
    tips: [
      'Verify coverage for Roswell and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  curry: {
    marketNotes:
      'Curry County is an eastern New Mexico county with residential demand across the Clovis metro and high-plains corridor.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Curry County pricing reflects Clovis metro demand, US-60/70/84 corridor traffic, and competition among regional agents serving eastern New Mexico high-plains communities.',
    },
    tips: [
      'Verify coverage for Clovis and surrounding cities before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Cannon AFB relocations may require base access coordination — confirm credentials.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  'rio-arriba': {
    marketNotes:
      'Rio Arriba County is a northern New Mexico county with residential demand across Española, Tierra Amarilla, and the northern Rio Grande valley.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Rio Arriba County pricing reflects Española metro demand, US-84/285 corridor traffic, and competition among regional agents serving northern valley and high-country communities.',
    },
    tips: [
      'Verify coverage for Española, Tierra Amarilla, and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and historic adobe properties.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  taos: {
    marketNotes:
      'Taos County is northern New Mexico’s ski-valley and art-colony market — tourism, second-home, and retirement moves, Taos Ski Valley seasonal transitions, and high-country mountain-road logistics distinguish Taos from Albuquerque metro and southern border corridors.',
    costs: {
      studioRange: '$850–$1,700',
      familyRange: '$3,000–$7,000+',
      avgHourly: '$115–$175/hr for a 2-person crew',
      note: 'Taos County pricing reflects ski-valley tourism demand, US-64 corridor traffic, and competition among regional agents serving Taos, Taos Ski Valley, and high-country communities.',
    },
    tips: [
      'Verify coverage for Taos and surrounding areas before booking.',
      'Tourist and ski-season traffic impacts scheduling — confirm crew arrival windows.',
      'Historic adobe and high-value mountain homes may require specialty handling — confirm insurance and experience.',
      'Book early for peak tourist and ski seasons (June–March) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  grant: {
    marketNotes:
      'Grant County is a southwestern New Mexico county with residential demand across Silver City and the Gila edge region.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Grant County pricing reflects Silver City metro demand, US-180 corridor traffic, and competition among regional agents serving southwestern New Mexico communities.',
    },
    tips: [
      'Verify coverage for Silver City and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  cibola: {
    marketNotes:
      'Cibola County is a western New Mexico county with residential demand across Grants and the Mt. Taylor region.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Cibola County pricing reflects Grants metro demand, I-40 corridor traffic, and competition among regional agents serving western New Mexico communities.',
    },
    tips: [
      'Verify coverage for Grants and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  'san-miguel': {
    marketNotes:
      'San Miguel County is a northeastern New Mexico county with residential demand across Las Vegas and the Sangre de Cristo foothills.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'San Miguel County pricing reflects Las Vegas metro demand, I-25 corridor traffic, and competition among regional agents serving northeastern New Mexico communities.',
    },
    tips: [
      'Verify coverage for Las Vegas and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value historic homes.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  luna: {
    marketNotes:
      'Luna County is a southwestern New Mexico border county with residential demand across Deming and the border southwest region.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Luna County pricing reflects Deming metro demand, I-10 corridor traffic, and competition among regional agents serving southwestern New Mexico border communities.',
    },
    tips: [
      'Verify coverage for Deming and surrounding cities before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  lincoln: {
    marketNotes:
      'Lincoln County is a southern New Mexico mountain county with strong tourism and residential demand across Ruidoso and the Sacramento Mountains.',
    costs: {
      studioRange: '$850–$1,700',
      familyRange: '$3,000–$7,000+',
      avgHourly: '$115–$175/hr for a 2-person crew',
      note: 'Lincoln County pricing reflects Ruidoso tourism and mountain-home demand, US-70 corridor traffic, and competition among regional agents serving southern New Mexico mountain communities.',
    },
    tips: [
      'Verify coverage for Ruidoso, Carrizozo, and surrounding areas before booking.',
      'Tourist and mountain-road traffic impacts scheduling — confirm crew arrival windows.',
      'Mountain elevation and winding roads may require specialty handling — confirm truck access and insurance.',
      'Book early for peak tourist seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  'los-alamos': {
    marketNotes:
      'Los Alamos County is a northern New Mexico county with residential demand across Los Alamos National Laboratory and the Pajarito Plateau.',
    costs: {
      studioRange: '$900–$1,900',
      familyRange: '$3,500–$8,000+',
      avgHourly: '$125–$190/hr for a 2-person crew',
      note: 'Los Alamos County pricing reflects National Laboratory and high-income residential demand, NM-502 corridor traffic, and competition among regional agents serving northern New Mexico plateau communities.',
    },
    tips: [
      'Verify coverage for Los Alamos and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Federal and National Laboratory relocations may require security clearance coordination — confirm credentials.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  roosevelt: {
    marketNotes:
      'Roosevelt County is an eastern New Mexico plains county with residential demand across Portales and the eastern plains region.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Roosevelt County pricing reflects Portales metro and university-area demand, US-70 corridor traffic, and competition among regional agents serving eastern New Mexico plains communities.',
    },
    tips: [
      'Verify coverage for Portales and surrounding cities before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'University and agricultural relocations may require flexible scheduling — confirm experience when needed.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  torrance: {
    marketNotes:
      'Torrance County is a central New Mexico county with residential demand across Estancia and the central valley region.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Torrance County pricing reflects Estancia-area demand, US-60 corridor traffic, and competition among regional agents serving central New Mexico valley communities.',
    },
    tips: [
      'Verify coverage for Estancia and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  socorro: {
    marketNotes:
      'Socorro County is a central New Mexico county with residential demand across Socorro and the Rio Grande corridor.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Socorro County pricing reflects Socorro metro and research-community demand, I-25 corridor traffic, and competition among regional agents serving central New Mexico Rio Grande communities.',
    },
    tips: [
      'Verify coverage for Socorro and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Research and university relocations near NM Tech may require specialty handling — confirm experience.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  colfax: {
    marketNotes:
      'Colfax County is a northeastern New Mexico plateau county with residential demand across Raton and the northeast plateau region.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Colfax County pricing reflects Raton metro demand, I-25 corridor traffic, and competition among regional agents serving northeastern New Mexico plateau communities.',
    },
    tips: [
      'Verify coverage for Raton and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  sierra: {
    marketNotes:
      'Sierra County is a southern New Mexico county with residential demand across Truth or Consequences and the southern Rio Grande corridor.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Sierra County pricing reflects Truth or Consequences metro demand, I-25 and US-85 corridor traffic, and competition among regional agents serving southern New Mexico Rio Grande communities.',
    },
    tips: [
      'Verify coverage for Truth or Consequences and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and waterfront properties near Elephant Butte Lake.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  quay: {
    marketNotes:
      'Quay County is an eastern New Mexico county with residential demand across Tucumcari and the Route 66 east corridor.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Quay County pricing reflects Tucumcari metro demand, I-40 corridor traffic, and competition among regional agents serving eastern New Mexico Route 66 communities.',
    },
    tips: [
      'Verify coverage for Tucumcari and surrounding cities before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  guadalupe: {
    marketNotes:
      'Guadalupe County is an eastern New Mexico corridor county with residential demand across Santa Rosa and the eastern corridor region.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Guadalupe County pricing reflects Santa Rosa-area demand, I-40 corridor traffic, and competition among regional agents serving eastern New Mexico corridor communities.',
    },
    tips: [
      'Verify coverage for Santa Rosa and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  mora: {
    marketNotes:
      'Mora County is a northern New Mexico rural county with residential demand across Mora and the Sangre de Cristo north region.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Mora County pricing reflects rural northern New Mexico residential demand, NM-518 corridor traffic, and competition among regional agents serving remote valley communities.',
    },
    tips: [
      'Verify coverage for Mora and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and ranch properties.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  hidalgo: {
    marketNotes:
      'Hidalgo County is a southwestern New Mexico border county with residential demand across Lordsburg and the border south region.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Hidalgo County pricing reflects Lordsburg metro demand, I-10 corridor traffic, and competition among regional agents serving southwestern New Mexico border communities.',
    },
    tips: [
      'Verify coverage for Lordsburg and surrounding cities before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  catron: {
    marketNotes:
      'Catron County is a remote southwestern New Mexico county with residential demand across Reserve and the Gila Wilderness region.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Catron County pricing reflects remote southwestern New Mexico residential demand, US-180 corridor traffic, and competition among regional agents serving Gila Wilderness communities with extended travel distances.',
    },
    tips: [
      'Verify coverage for Reserve and surrounding areas before booking.',
      'Remote rural routes may require advance scheduling and cross-county crew coordination — confirm travel fees and availability.',
      'Confirm insurance for high-value ranch and wilderness-area homes.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  union: {
    marketNotes:
      'Union County is a northeastern New Mexico corner county with residential demand across Clayton and the northeast corner region.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Union County pricing reflects Clayton-area demand, US-56/64/87 corridor traffic, and competition among regional agents serving northeastern New Mexico corner communities.',
    },
    tips: [
      'Verify coverage for Clayton and surrounding cities before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and ranch properties.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  'de-baca': {
    marketNotes:
      'De Baca County is a rural eastern New Mexico county with residential demand across Fort Sumner and the eastern plateau region.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'De Baca County pricing reflects Fort Sumner-area demand, US-60/84 corridor traffic, and competition among regional agents serving rural eastern New Mexico plateau communities.',
    },
    tips: [
      'Verify coverage for Fort Sumner and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and ranch properties.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  harding: {
    marketNotes:
      'Harding County is a remote northeastern New Mexico ranch county with residential demand across Roy and the northeast ranch region.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Harding County pricing reflects remote northeastern New Mexico ranch-country demand, US-87 corridor traffic, and competition among regional agents serving isolated ranch communities with extended travel distances.',
    },
    tips: [
      'Verify coverage for Roy and surrounding areas before booking.',
      'Remote rural routes may require advance scheduling and cross-county crew coordination — confirm travel fees and availability.',
      'Confirm insurance for high-value ranch properties.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
};

export function getNewMexicoCountyResearch(
  countySlug: string
): CuratedCountyResearch | undefined {
  return newMexicoCountyResearch[countySlug];
}
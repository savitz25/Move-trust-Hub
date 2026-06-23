import type { CountyCostGuide } from '@/lib/local-movers/county-seo';

export type CuratedCountyResearch = {
  marketNotes: string;
  costs: CountyCostGuide;
  tips: string[];
};

/** Hand-curated Louisiana parish research — grows incrementally per batch */
export const louisianaCountyResearch: Record<string, CuratedCountyResearch> = {
  'east-baton-rouge': {
    marketNotes:
      'East Baton Rouge Parish is Louisiana’s most populous parish and the core of the Baton Rouge metropolitan area, with strong governmental, educational (LSU), petrochemical, and residential demand.',
    costs: {
      studioRange: '$750–$1,550',
      familyRange: '$2,700–$6,000',
      avgHourly: '$115–$170/hr for a 2-person crew',
      note: 'East Baton Rouge Parish pricing reflects Baton Rouge metro traffic, LSU and state-government relocation demand, and competition among full-service local and regional van-line agents.',
    },
    tips: [
      'Verify coverage for Baton Rouge, Zachary, Central, and surrounding areas before booking.',
      'Major highway and industrial traffic significantly impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and flood/hurricane-related coverage before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  jefferson: {
    marketNotes:
      'Jefferson Parish is Louisiana’s most populous parish and forms the core of the Greater New Orleans metropolitan area with strong suburban, commercial, and port-related demand.',
    costs: {
      studioRange: '$800–$1,650',
      familyRange: '$2,900–$6,500',
      avgHourly: '$120–$175/hr for a 2-person crew',
      note: 'Jefferson Parish pricing reflects Greater New Orleans suburban demand in Metairie and Kenner, bridge and port traffic, and competition among full-service local and regional van-line agents.',
    },
    tips: [
      'Verify coverage for Metairie, Kenner, Gretna, Harvey, and Westwego areas before booking.',
      'Heavy urban, bridge, and port traffic significantly impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and flood/hurricane-related coverage before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  orleans: {
    marketNotes:
      'Orleans Parish is the historic and cultural heart of New Orleans with intense urban, tourism, and residential relocation demand.',
    costs: {
      studioRange: '$850–$1,800',
      familyRange: '$3,100–$7,000',
      avgHourly: '$125–$180/hr for a 2-person crew',
      note: 'Orleans Parish pricing reflects dense urban New Orleans access constraints, historic-property handling, festival-season volume, and premium local crew demand.',
    },
    tips: [
      'Verify coverage for all neighborhoods in New Orleans proper before booking.',
      'Dense urban streets, parades, and festival traffic require advance planning — confirm crew arrival windows.',
      'Confirm insurance for high-value historic properties and flood/hurricane coverage before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  'st-tammany': {
    marketNotes:
      'St. Tammany Parish is one of Louisiana’s fastest-growing parishes, known for affluent suburban living, excellent schools, and strong demand from New Orleans commuters.',
    costs: {
      studioRange: '$800–$1,600',
      familyRange: '$2,900–$6,300',
      avgHourly: '$120–$175/hr for a 2-person crew',
      note: 'St. Tammany Parish pricing reflects North Shore suburban demand in Mandeville and Covington, Causeway bridge traffic, and cross-lake crews from Jefferson and Orleans providers.',
    },
    tips: [
      'Verify coverage for Mandeville, Covington, Slidell, and Madisonville areas before booking.',
      'Lake Pontchartrain bridge and I-12 traffic significantly impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value suburban homes and flood/hurricane coverage before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  lafayette: {
    marketNotes:
      'Lafayette Parish is the economic and cultural hub of Acadiana with strong oil & gas, technology, and university-driven residential demand.',
    costs: {
      studioRange: '$750–$1,550',
      familyRange: '$2,700–$6,000',
      avgHourly: '$115–$170/hr for a 2-person crew',
      note: 'Lafayette Parish pricing reflects Acadiana metro demand, UL Lafayette relocation volume, and competition among local and Baton Rouge regional providers.',
    },
    tips: [
      'Verify coverage for Lafayette, Broussard, and Youngsville areas before booking.',
      'Heavy industrial and university traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  caddo: {
    marketNotes:
      'Caddo Parish is the economic center of Northwest Louisiana with strong military, healthcare, and port-related demand.',
    costs: {
      studioRange: '$700–$1,450',
      familyRange: '$2,500–$5,600',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'Caddo Parish pricing reflects Shreveport metro demand, Barksdale AFB relocation volume, and regional van-line agents serving Northwest Louisiana.',
    },
    tips: [
      'Verify coverage for Shreveport, Bossier City, and surrounding areas before booking.',
      'Regional and interstate traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  calcasieu: {
    marketNotes:
      'Calcasieu Parish is a major industrial and port hub in Southwest Louisiana with significant residential and energy-sector demand.',
    costs: {
      studioRange: '$750–$1,550',
      familyRange: '$2,700–$6,100',
      avgHourly: '$115–$170/hr for a 2-person crew',
      note: 'Calcasieu Parish pricing reflects Lake Charles industrial and port demand, hurricane-season scheduling constraints, and regional crews from Lafayette and Baton Rouge providers.',
    },
    tips: [
      'Verify coverage for Lake Charles, Sulphur, and Westlake areas before booking.',
      'Industrial and port traffic significantly impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and hurricane/flood coverage before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  ouachita: {
    marketNotes:
      'Ouachita Parish is the economic center of Northeast Louisiana with strong healthcare, education, and residential demand.',
    costs: {
      studioRange: '$700–$1,450',
      familyRange: '$2,500–$5,600',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'Ouachita Parish pricing reflects Monroe metro demand, university and healthcare relocation volume, and regional crews from Shreveport providers.',
    },
    tips: [
      'Verify coverage for Monroe, West Monroe, and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  livingston: {
    marketNotes:
      'Livingston Parish is one of Louisiana’s fastest-growing parishes with strong suburban residential demand east of Baton Rouge.',
    costs: {
      studioRange: '$750–$1,550',
      familyRange: '$2,700–$6,000',
      avgHourly: '$115–$170/hr for a 2-person crew',
      note: 'Livingston Parish pricing reflects Denham Springs and Walker suburban growth, Baton Rouge metro traffic, and regional crews from East Baton Rouge providers.',
    },
    tips: [
      'Verify coverage for Denham Springs, Walker, and Livingston areas before booking.',
      'Baton Rouge-area traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value suburban homes and flood/hurricane coverage before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  tangipahoa: {
    marketNotes:
      'Tangipahoa Parish is a rapidly growing parish on the I-12 corridor with strong residential, educational, and commuter demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800',
      avgHourly: '$115–$165/hr for a 2-person crew',
      note: 'Tangipahoa Parish pricing reflects Hammond and Ponchatoula commuter demand, I-12 and I-55 corridor traffic, and regional crews from Baton Rouge and New Orleans providers.',
    },
    tips: [
      'Verify coverage for Hammond, Ponchatoula, and surrounding areas before booking.',
      'I-12 and I-55 traffic significantly impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and hurricane/flood coverage before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  ascension: {
    marketNotes:
      'Ascension Parish is one of Louisiana’s fastest-growing parishes with strong petrochemical, suburban, and family residential demand.',
    costs: {
      studioRange: '$750–$1,550',
      familyRange: '$2,700–$6,000',
      avgHourly: '$115–$170/hr for a 2-person crew',
      note: 'Ascension Parish pricing reflects Gonzales and Prairieville suburban growth, Baton Rouge metro traffic, and regional crews from East Baton Rouge providers.',
    },
    tips: [
      'Verify coverage for Gonzales, Prairieville, and Donaldsonville areas before booking.',
      'Baton Rouge-area traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value suburban homes and flood/hurricane coverage before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  bossier: {
    marketNotes:
      'Bossier Parish is a rapidly growing parish with strong military (Barksdale AFB), suburban, and residential demand adjacent to Shreveport.',
    costs: {
      studioRange: '$700–$1,450',
      familyRange: '$2,500–$5,600',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'Bossier Parish pricing reflects Bossier City suburban demand, Barksdale AFB relocation volume, and shared Shreveport–Bossier metro crews.',
    },
    tips: [
      'Verify coverage for Bossier City, Benton, and Haughton areas before booking.',
      'Regional and base-related traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  rapides: {
    marketNotes:
      'Rapides Parish is the economic center of Central Louisiana with strong military (Fort Johnson), healthcare, and residential demand.',
    costs: {
      studioRange: '$700–$1,450',
      familyRange: '$2,500–$5,600',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'Rapides Parish pricing reflects Alexandria metro demand, Fort Johnson relocation volume, and regional crews from Shreveport and Monroe providers.',
    },
    tips: [
      'Verify coverage for Alexandria, Pineville, and surrounding areas before booking.',
      'Military and regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  terrebonne: {
    marketNotes:
      'Terrebonne Parish is a major coastal and energy-industry parish with strong residential and commercial demand.',
    costs: {
      studioRange: '$750–$1,550',
      familyRange: '$2,700–$6,000',
      avgHourly: '$115–$170/hr for a 2-person crew',
      note: 'Terrebonne Parish pricing reflects Houma bayou and coastal demand, energy-sector relocation volume, and regional crews from Baton Rouge and Lafourche providers.',
    },
    tips: [
      'Verify coverage for Houma and surrounding bayou areas before booking.',
      'Coastal and industrial traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and hurricane/flood coverage before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  lafourche: {
    marketNotes:
      'Lafourche Parish is a key bayou parish with strong energy, fishing, and residential demand.',
    costs: {
      studioRange: '$750–$1,550',
      familyRange: '$2,700–$6,000',
      avgHourly: '$115–$170/hr for a 2-person crew',
      note: 'Lafourche Parish pricing reflects Thibodaux bayou demand, energy and fishing-industry relocation volume, and shared Houma–Thibodaux metro crews.',
    },
    tips: [
      'Verify coverage for Thibodaux, Raceland, and Lockport areas before booking.',
      'Bayou and industrial traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and hurricane/flood coverage before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  'st-landry': {
    marketNotes:
      'St. Landry Parish is a culturally rich parish in Acadiana with strong residential, agricultural, and tourism demand.',
    costs: {
      studioRange: '$700–$1,450',
      familyRange: '$2,500–$5,600',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'St. Landry Parish pricing reflects Opelousas and Eunice regional demand and cross-coverage from Lafayette and Baton Rouge Acadiana providers.',
    },
    tips: [
      'Verify coverage for Opelousas, Eunice, and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  iberia: {
    marketNotes:
      'Iberia Parish is a key Acadiana parish with strong energy, port, and residential demand.',
    costs: {
      studioRange: '$700–$1,450',
      familyRange: '$2,500–$5,600',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'Iberia Parish pricing reflects New Iberia port and energy demand, coastal scheduling constraints, and Lafayette metro cross-coverage.',
    },
    tips: [
      'Verify coverage for New Iberia and surrounding areas before booking.',
      'Industrial and port traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and hurricane/flood coverage before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  vermilion: {
    marketNotes:
      'Vermilion Parish is a coastal parish in Acadiana with strong fishing, energy, and residential demand.',
    costs: {
      studioRange: '$700–$1,450',
      familyRange: '$2,500–$5,600',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'Vermilion Parish pricing reflects Abbeville coastal demand, fishing and energy-sector relocation volume, and Lafayette metro cross-coverage.',
    },
    tips: [
      'Verify coverage for Abbeville and surrounding areas before booking.',
      'Coastal and industrial traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and hurricane/flood coverage before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  acadia: {
    marketNotes:
      'Acadia Parish is a key Acadiana parish with strong agricultural and residential demand.',
    costs: {
      studioRange: '$700–$1,450',
      familyRange: '$2,500–$5,600',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'Acadia Parish pricing reflects Crowley agricultural-community demand and Lafayette metro cross-coverage from regional Acadiana providers.',
    },
    tips: [
      'Verify coverage for Crowley and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  'st-martin': {
    marketNotes:
      'St. Martin Parish is a growing parish in Acadiana with strong residential and cultural demand.',
    costs: {
      studioRange: '$700–$1,450',
      familyRange: '$2,500–$5,600',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'St. Martin Parish pricing reflects Breaux Bridge and St. Martinville demand and Lafayette metro cross-coverage from regional Acadiana providers.',
    },
    tips: [
      'Verify coverage for St. Martinville, Breaux Bridge, and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  'st-charles': {
    marketNotes:
      'St. Charles Parish is a growing suburban parish along the Mississippi River with strong petrochemical and residential demand.',
    costs: {
      studioRange: '$750–$1,550',
      familyRange: '$2,700–$6,000',
      avgHourly: '$115–$170/hr for a 2-person crew',
      note: 'St. Charles Parish pricing reflects Luling and Destrehan river-corridor demand, petrochemical-industry relocation volume, and Greater New Orleans metro cross-coverage.',
    },
    tips: [
      'Verify coverage for Luling, Destrehan, and Norco areas before booking.',
      'River road and industrial traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and hurricane/flood coverage before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  lincoln: {
    marketNotes:
      'Lincoln Parish is anchored by Louisiana Tech University with strong educational and residential demand.',
    costs: {
      studioRange: '$700–$1,450',
      familyRange: '$2,500–$5,600',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'Lincoln Parish pricing reflects Ruston university demand, student and faculty relocation volume, and regional crews from Monroe and Shreveport providers.',
    },
    tips: [
      'Verify coverage for Ruston and surrounding areas before booking.',
      'University traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and student-related moves before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  'st-mary': {
    marketNotes:
      'St. Mary Parish is a key coastal and energy-industry parish with strong residential demand.',
    costs: {
      studioRange: '$700–$1,450',
      familyRange: '$2,500–$5,600',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'St. Mary Parish pricing reflects Morgan City and Franklin coastal demand, energy-sector relocation volume, and cross-coverage from Houma, Thibodaux, and Lafayette providers.',
    },
    tips: [
      'Verify coverage for Morgan City, Franklin, and Patterson areas before booking.',
      'Coastal and industrial traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and hurricane/flood coverage before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  'st-bernard': {
    marketNotes:
      'St. Bernard Parish is a resilient coastal parish with strong residential and industrial demand in the Greater New Orleans area.',
    costs: {
      studioRange: '$750–$1,550',
      familyRange: '$2,700–$6,000',
      avgHourly: '$115–$170/hr for a 2-person crew',
      note: 'St. Bernard Parish pricing reflects Chalmette coastal demand, industrial-area relocation volume, and Greater New Orleans metro cross-coverage from Jefferson and Orleans providers.',
    },
    tips: [
      'Verify coverage for Chalmette, Arabi, and Meraux areas before booking.',
      'Heavy industrial and coastal traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and hurricane/flood coverage before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  washington: {
    marketNotes:
      'Washington Parish is a growing North Shore parish with strong rural-suburban residential demand.',
    costs: {
      studioRange: '$700–$1,450',
      familyRange: '$2,500–$5,600',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'Washington Parish pricing reflects Bogalusa and Franklinton rural-suburban demand and cross-coverage from St. Tammany and Tangipahoa North Shore providers.',
    },
    tips: [
      'Verify coverage for Bogalusa, Franklinton, and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and hurricane/flood coverage before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  vernon: {
    marketNotes:
      'Vernon Parish is anchored by Fort Johnson with strong military and residential demand.',
    costs: {
      studioRange: '$700–$1,450',
      familyRange: '$2,500–$5,600',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'Vernon Parish pricing reflects Leesville military demand, Fort Johnson relocation volume, and regional crews from Alexandria and Shreveport providers.',
    },
    tips: [
      'Verify coverage for Leesville and surrounding areas before booking.',
      'Military base traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and military relocations before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  'st-john-the-baptist': {
    marketNotes:
      'St. John the Baptist Parish is a key River Parish with strong industrial and suburban residential demand.',
    costs: {
      studioRange: '$750–$1,550',
      familyRange: '$2,700–$6,000',
      avgHourly: '$115–$170/hr for a 2-person crew',
      note: 'St. John the Baptist Parish pricing reflects LaPlace and Reserve river-corridor demand, petrochemical-industry relocation volume, and Greater New Orleans metro cross-coverage.',
    },
    tips: [
      'Verify coverage for LaPlace, Reserve, and Edgard areas before booking.',
      'River road and industrial traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and hurricane/flood coverage before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  avoyelles: {
    marketNotes:
      'Avoyelles Parish is a rural Central Louisiana parish with strong agricultural and residential demand.',
    costs: {
      studioRange: '$650–$1,350',
      familyRange: '$2,300–$5,200',
      avgHourly: '$105–$155/hr for a 2-person crew',
      note: 'Avoyelles Parish pricing reflects Marksville rural demand and regional crews from Alexandria, Lafayette, and Monroe providers.',
    },
    tips: [
      'Verify coverage for Marksville and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  beauregard: {
    marketNotes:
      'Beauregard Parish is a growing parish in Southwest Louisiana with strong military and residential demand.',
    costs: {
      studioRange: '$650–$1,350',
      familyRange: '$2,300–$5,200',
      avgHourly: '$105–$155/hr for a 2-person crew',
      note: 'Beauregard Parish pricing reflects DeRidder regional demand and cross-coverage from Lake Charles, Vernon, and Alexandria providers.',
    },
    tips: [
      'Verify coverage for DeRidder and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  natchitoches: {
    marketNotes:
      'Natchitoches Parish is a historic parish in Northwest Louisiana with strong tourism and educational demand.',
    costs: {
      studioRange: '$700–$1,450',
      familyRange: '$2,500–$5,600',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'Natchitoches Parish pricing reflects historic-district and university demand, tourist-season volume, and regional crews from Shreveport providers.',
    },
    tips: [
      'Verify coverage for Natchitoches and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value historic homes before booking.',
      'Book early for peak tourist seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  webster: {
    marketNotes:
      'Webster Parish is a key North Louisiana parish with strong residential and industrial demand.',
    costs: {
      studioRange: '$650–$1,350',
      familyRange: '$2,300–$5,200',
      avgHourly: '$105–$155/hr for a 2-person crew',
      note: 'Webster Parish pricing reflects Minden and Springhill regional demand and shared Shreveport–Bossier metro crews.',
    },
    tips: [
      'Verify coverage for Minden and Springhill areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  evangeline: {
    marketNotes:
      'Evangeline Parish is a rural Acadiana parish with strong cultural and residential demand.',
    costs: {
      studioRange: '$650–$1,350',
      familyRange: '$2,300–$5,200',
      avgHourly: '$105–$155/hr for a 2-person crew',
      note: 'Evangeline Parish pricing reflects Ville Platte rural demand and Lafayette metro cross-coverage from regional Acadiana providers.',
    },
    tips: [
      'Verify coverage for Ville Platte and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  'jefferson-davis': {
    marketNotes:
      'Jefferson Davis Parish is a key Acadiana parish with strong agricultural and energy demand.',
    costs: {
      studioRange: '$650–$1,350',
      familyRange: '$2,300–$5,200',
      avgHourly: '$105–$155/hr for a 2-person crew',
      note: 'Jefferson Davis Parish pricing reflects Jennings agricultural-community demand and cross-coverage from Lake Charles and Lafayette providers.',
    },
    tips: [
      'Verify coverage for Jennings and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  iberville: {
    marketNotes:
      'Iberville Parish is a River Parish with strong petrochemical and residential demand.',
    costs: {
      studioRange: '$700–$1,450',
      familyRange: '$2,500–$5,600',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'Iberville Parish pricing reflects Plaquemine river-corridor demand, petrochemical-industry relocation volume, and Baton Rouge metro cross-coverage.',
    },
    tips: [
      'Verify coverage for Plaquemine and surrounding areas before booking.',
      'River road and industrial traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and hurricane/flood coverage before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  'west-baton-rouge': {
    marketNotes:
      'West Baton Rouge Parish is a key River Parish with strong industrial and suburban residential demand.',
    costs: {
      studioRange: '$750–$1,550',
      familyRange: '$2,700–$6,000',
      avgHourly: '$115–$170/hr for a 2-person crew',
      note: 'West Baton Rouge Parish pricing reflects Port Allen west-bank demand, industrial relocation volume, and shared Baton Rouge metro crews.',
    },
    tips: [
      'Verify coverage for Port Allen and surrounding areas before booking.',
      'River road and industrial traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and hurricane/flood coverage before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  'de-soto': {
    marketNotes:
      'De Soto Parish is a growing parish in Northwest Louisiana with strong residential demand.',
    costs: {
      studioRange: '$650–$1,350',
      familyRange: '$2,300–$5,200',
      avgHourly: '$105–$155/hr for a 2-person crew',
      note: 'De Soto Parish pricing reflects Mansfield regional demand and cross-coverage from Shreveport–Bossier and Natchitoches providers.',
    },
    tips: [
      'Verify coverage for Mansfield and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
};

export function getLouisianaCountyResearch(
  countySlug: string
): CuratedCountyResearch | undefined {
  return louisianaCountyResearch[countySlug];
}
import type { CountyCostGuide } from '@/lib/local-movers/county-seo';

export type CuratedCountyResearch = {
  marketNotes: string;
  costs: CountyCostGuide;
  tips: string[];
};

/** Grok Heavy–researched county content overrides templated SEO sections */
export const newYorkCountyResearch: Record<string, CuratedCountyResearch> = {
  albany: {
    marketNotes:
      'Albany County is the core of the Capital District with urban Albany, suburban areas, and government/university activity. Moves often involve residential, corporate, and student relocations with seasonal academic cycles.',
    costs: {
      studioRange: '$450–$950',
      familyRange: '$1,700–$3,600',
      avgHourly: '$105–$160/hr for a 2-person crew',
      note: 'Albany, Guilderland, and Colonie moves often reflect elevator reservations, state-government timing, and I-87/I-90 traffic windows.',
    },
    tips: [
      'Government and university moves may require specific timing around academic or legislative calendars.',
      'Urban Albany and high-rises have elevator and parking restrictions.',
      'I-87 and I-90 traffic can impact scheduling.',
      'Obtain multiple estimates in this competitive market.',
      'Verify coverage for Albany, Guilderland, and Colonie.',
    ],
  },
  allegany: {
    marketNotes:
      'Allegany County is one of New York’s most rural counties with small towns and agricultural properties. The moving market is thin; most service is regional from nearby areas like Olean, Hornell, or larger hubs such as Rochester or Buffalo.',
    costs: {
      studioRange: '$400–$850',
      familyRange: '$1,500–$3,200',
      avgHourly: '$95–$145/hr for a 2-person crew',
      note: 'Belmont and outlying rural moves often reflect long driveways, travel from Olean or Dunkirk crews, and limited local storage options.',
    },
    tips: [
      'Rural properties often have long or unpaved driveways; confirm truck and equipment needs.',
      'Verify explicit regional service coverage for Belmont and outlying areas.',
      'Storage is limited locally; coordinate with providers in larger nearby towns.',
      'Obtain multiple written estimates due to fewer local operators.',
      'Agricultural timing (harvest seasons) may affect availability; plan accordingly.',
    ],
  },
  bronx: {
    marketNotes:
      'The Bronx is a dense urban borough with high-rises, row houses, and diverse neighborhoods. Moves often involve apartment buildings, family homes, and cross-borough logistics with strict building rules and heavy traffic.',
    costs: {
      studioRange: '$550–$1,300',
      familyRange: '$2,200–$5,000+',
      avgHourly: '$130–$195/hr for a 2-person crew',
      note: 'Riverdale, Pelham, and Morris Park moves often reflect co-op move-in fees, elevator reservations, and I-95 / Bronx River Parkway traffic windows.',
    },
    tips: [
      'Many buildings require elevator reservations, certificates of insurance, and move-in fees.',
      'Traffic on major bridges and I-95 / Bronx River Parkway is heavy; select logistics-savvy teams.',
      'Diverse communities benefit from multilingual crews.',
      'Verify coverage for specific neighborhoods (e.g., Riverdale, Pelham, Morris Park).',
      'Confirm insurance for high-value urban items.',
    ],
  },
  broome: {
    marketNotes:
      'Broome County centers on Binghamton with suburban and rural areas. Moves often involve residential, university-related (Binghamton University), and family relocations with regional support from the Southern Tier.',
    costs: {
      studioRange: '$450–$900',
      familyRange: '$1,600–$3,500',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Binghamton, Endicott, and Vestal moves often reflect BU semester timing, I-86 / Route 17 traffic, and suburban driveway access.',
    },
    tips: [
      'University calendar affects seasonal demand around Binghamton University.',
      'Suburban and rural properties may have driveway or access challenges.',
      'I-86 and Route 17 traffic can impact timing.',
      'Obtain multiple estimates in this moderate market.',
      'Verify coverage for Binghamton, Endicott, and Vestal.',
    ],
  },
  cattaraugus: {
    marketNotes:
      'Cattaraugus County is rural with Olean as the primary hub and significant Seneca Nation territory. Moves are primarily residential and agricultural with limited local movers. Service is predominantly regional from Olean, Jamestown, or Buffalo.',
    costs: {
      studioRange: '$400–$850',
      familyRange: '$1,500–$3,200',
      avgHourly: '$95–$145/hr for a 2-person crew',
      note: 'Olean and outlying rural moves often reflect long driveways, reservation-area access, and travel from regional Western NY crews.',
    },
    tips: [
      'Rural and reservation-area properties often have long driveways or restricted access.',
      'Confirm explicit regional service to Olean and outlying towns.',
      'Storage is limited locally; use Olean or nearby facilities.',
      'Obtain multiple estimates in this thin market.',
      'Verify credentials for agricultural or culturally sensitive moves.',
    ],
  },
  cayuga: {
    marketNotes:
      'Cayuga County is rural with Auburn as its hub and Finger Lakes influence. Moves are primarily residential and agricultural with limited local movers. Service is regional from Syracuse, Rochester, or Ithaca.',
    costs: {
      studioRange: '$400–$850',
      familyRange: '$1,500–$3,200',
      avgHourly: '$95–$145/hr for a 2-person crew',
      note: 'Auburn and lakeside moves often reflect long driveways, Finger Lakes access roads, and travel from Syracuse or Rochester crews.',
    },
    tips: [
      'Rural and lakeside properties may involve long driveways or water-adjacent access.',
      'Confirm explicit regional service to Auburn and outlying areas.',
      'Storage is limited locally; coordinate with Syracuse or Rochester facilities.',
      'Obtain multiple estimates in this low-volume market.',
      'Verify credentials for agricultural or historic home moves.',
    ],
  },
  chautauqua: {
    marketNotes:
      'Chautauqua County is rural with Jamestown as its primary hub and Chautauqua Lake influence. Moves are primarily residential, seasonal lake properties, and agricultural with limited local movers. Service is regional from Jamestown, Buffalo, or Erie, PA.',
    costs: {
      studioRange: '$400–$850',
      familyRange: '$1,500–$3,200',
      avgHourly: '$95–$145/hr for a 2-person crew',
      note: 'Jamestown and Chautauqua Lake moves often reflect seasonal lakefront access, rural driveways, and travel from Dunkirk or Buffalo crews.',
    },
    tips: [
      'Lakefront properties require specialized handling and seasonal timing.',
      'Rural areas may have long driveways or limited access.',
      'Confirm explicit regional service to Jamestown and outlying towns.',
      'Storage is limited locally; use Jamestown or Buffalo facilities.',
      'Verify credentials in this low-volume market.',
    ],
  },
  chemung: {
    marketNotes:
      'Chemung County centers on Elmira with suburban and rural areas. Moves often involve residential, university-related (Elmira College), and family relocations with regional Southern Tier support.',
    costs: {
      studioRange: '$400–$850',
      familyRange: '$1,500–$3,300',
      avgHourly: '$95–$145/hr for a 2-person crew',
      note: 'Elmira, Horseheads, and Big Flats moves often reflect Elmira College semester timing, I-86 traffic, and suburban driveway access.',
    },
    tips: [
      'University calendar affects seasonal demand around Elmira College.',
      'Rural properties may have access challenges.',
      'I-86 traffic can impact timing.',
      'Obtain multiple estimates in this moderate market.',
      'Verify coverage for Elmira, Horseheads, and Big Flats.',
    ],
  },
  chenango: {
    marketNotes:
      'Chenango County is rural with Norwich as its hub. Moves are primarily residential with limited local infrastructure. Service is regional from Binghamton, Syracuse, or Utica.',
    costs: {
      studioRange: '$400–$850',
      familyRange: '$1,500–$3,200',
      avgHourly: '$95–$145/hr for a 2-person crew',
      note: 'Norwich and outlying rural moves often reflect long driveways and travel from Binghamton or Syracuse crews.',
    },
    tips: [
      'Rural properties often have long driveways; confirm access.',
      'Verify explicit regional service to Norwich.',
      'Storage is limited locally; use nearby facilities.',
      'Obtain multiple estimates in this low-volume market.',
      'Verify credentials.',
    ],
  },
  clinton: {
    marketNotes:
      'Clinton County is rural/northern with Plattsburgh as its hub near Lake Champlain. Moves are residential and military-related (Plattsburgh AFB legacy) with regional support from Burlington, VT or Albany.',
    costs: {
      studioRange: '$450–$900',
      familyRange: '$1,600–$3,400',
      avgHourly: '$100–$150/hr for a 2-person crew',
      note: 'Plattsburgh and Lake Champlain moves often reflect winter weather windows, cross-border logistics, and military relocation timing.',
    },
    tips: [
      'Lake Champlain properties require water-adjacent planning.',
      'Winter weather affects timing; confirm contingencies.',
      'Verify explicit regional service to Plattsburgh.',
      'Obtain multiple estimates.',
      'Military experience is beneficial.',
    ],
  },
  columbia: {
    marketNotes:
      'Columbia County is rural/historic with Hudson as its hub. Moves often involve historic homes, second homes, and artistic communities with regional support from Albany or NYC.',
    costs: {
      studioRange: '$450–$950',
      familyRange: '$1,700–$3,600',
      avgHourly: '$105–$160/hr for a 2-person crew',
      note: 'Hudson and historic-property moves often reflect preservation-sensitive handling, seasonal second-home demand, and rural access roads.',
    },
    tips: [
      'Historic properties require preservation-sensitive handling.',
      'Rural areas have access challenges.',
      'Confirm regional service to Hudson.',
      'Seasonal demand from second-home owners.',
      'Verify credentials.',
    ],
  },
};

export function getNewYorkCountyResearch(
  countySlug: string
): CuratedCountyResearch | undefined {
  return newYorkCountyResearch[countySlug];
}
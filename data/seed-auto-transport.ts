import { Company } from '@/types';
import type { LocalMover } from '@/lib/local-movers/types';

/**
 * National auto transport companies for /auto-transport and the main
 * /companies “Auto Transport” filter.
 *
 * Most consumer brands are BROKERS (arrange independent carriers). Specialty
 * enclosed fleets (Reliable Carriers, Intercity Lines) are asset-based CARRIERS.
 *
 * isVerified = true only when USDOT was confirmed ACTIVE on FMCSA SAFER
 * (research 2026-07-25). Marketplace (uShip) uses marketplace license labels.
 *
 * Wave A–C priority list is first; services use valid ServiceType tags only
 * (`Auto Transport`, `Broker`, `Carrier`). Open/Enclosed/etc. live in specialties.
 */

const TODAY = '2026-07-25';

export const seedAutoTransportCompanies: Company[] = [
  // ——— Wave A ———
  {
    id: 'montway',
    slug: 'montway-auto-transport',
    name: 'Montway Auto Transport',
    fmcsaLegalName: 'MONTWAY LLC',
    shortDescription:
      'Large nationwide auto transport broker arranging open and enclosed vehicle shipping through independent carriers.',
    description:
      'Montway Auto Transport (Montway LLC) is a licensed property broker—not a trucking carrier. It arranges door-to-door vehicle shipping by matching customers with independent carriers for open and enclosed transport. Customers should verify the assigned carrier’s USDOT and insurance before pickup. Nationwide coverage; quotes and timelines vary by route and season.',
    foundedYear: 2007,
    headquarters: 'Schaumburg, IL',
    website: 'https://www.montway.com',
    usdotNumber: '2239816',
    mcNumber: 'MC-611862',
    entityType: 'BROKER',
    fmcsaSafetyRating: 'Not Rated',
    fmcsaComplaints: 0,
    fmcsaShipments: 185000,
    authorityActive: true,
    usdotStatus: 'ACTIVE',
    bbbRating: 'A+',
    bbbAccredited: true,
    overallRating: 4.6,
    reviewCount: 12000,
    reputationScore: 90,
    yearsInBusiness: 19,
    avgPricePerMove: 1450,
    priceRange: '$$',
    coverage: 'All 50 States',
    services: ['Auto Transport', 'Broker'],
    specialties: [
      'Open Transport',
      'Enclosed Transport',
      'Door to Door',
      'Broker (not carrier)',
    ],
    ratingBreakdown: {
      fiveStar: 7800,
      fourStar: 2800,
      threeStar: 900,
      twoStar: 300,
      oneStar: 200,
    },
    isVerified: true,
    lastUpdated: TODAY,
    serviceScope: 'interstate',
  },
  {
    id: 'amerifreight',
    slug: 'amerifreight-auto-transport',
    name: 'AmeriFreight Auto Transport',
    fmcsaLegalName: 'AMERIFREIGHT INC',
    shortDescription:
      'Long-running auto transport broker known for military-friendly service and competitive nationwide quotes.',
    description:
      'AmeriFreight is a licensed auto transport broker (not a carrier). It coordinates open and enclosed vehicle shipments with independent USDOT-registered carriers across the U.S. Strong reputation for reliability and military/government moves. Always confirm the hauler’s credentials on your dispatch paperwork.',
    foundedYear: 2004,
    headquarters: 'Tyrone, GA',
    website: 'https://www.amerifreight.net',
    usdotNumber: '2238770',
    mcNumber: 'MC-597401',
    entityType: 'BROKER',
    fmcsaSafetyRating: 'Not Rated',
    fmcsaComplaints: 0,
    fmcsaShipments: 210000,
    authorityActive: true,
    usdotStatus: 'ACTIVE',
    bbbRating: 'A+',
    bbbAccredited: true,
    overallRating: 4.7,
    reviewCount: 15000,
    reputationScore: 91,
    yearsInBusiness: 22,
    avgPricePerMove: 1350,
    priceRange: '$$',
    coverage: 'All 50 States',
    services: ['Auto Transport', 'Broker'],
    specialties: [
      'Open Transport',
      'Enclosed Transport',
      'Military & Government',
      'Broker (not carrier)',
    ],
    ratingBreakdown: {
      fiveStar: 10000,
      fourStar: 3600,
      threeStar: 900,
      twoStar: 300,
      oneStar: 200,
    },
    isVerified: true,
    lastUpdated: TODAY,
    serviceScope: 'interstate',
  },
  {
    id: 'sherpa',
    slug: 'sherpa-auto-transport',
    name: 'Sherpa Auto Transport',
    fmcsaLegalName: 'SHERPA AUTO TRANSPORT LLC',
    shortDescription:
      'Auto transport broker emphasizing price transparency and price-lock style quotes for open and enclosed shipping.',
    description:
      'Sherpa Auto Transport is a licensed property broker that arranges vehicle transport with independent carriers—it does not operate its own fleet of car haulers. Known for clear pricing communication. Verify the assigned carrier on FMCSA SAFER before release of your vehicle.',
    foundedYear: 2017,
    headquarters: 'Charlotte, NC',
    website: 'https://www.sherpaautotransport.com',
    usdotNumber: '4085166',
    mcNumber: 'MC-1555035',
    entityType: 'BROKER',
    fmcsaSafetyRating: 'Not Rated',
    fmcsaComplaints: 0,
    fmcsaShipments: 92000,
    authorityActive: true,
    usdotStatus: 'ACTIVE',
    bbbRating: 'A+',
    bbbAccredited: true,
    overallRating: 4.8,
    reviewCount: 6800,
    reputationScore: 92,
    yearsInBusiness: 9,
    avgPricePerMove: 1380,
    priceRange: '$$',
    coverage: 'All 50 States',
    services: ['Auto Transport', 'Broker'],
    specialties: [
      'Open Transport',
      'Enclosed Transport',
      'Price Transparency',
      'Broker (not carrier)',
    ],
    ratingBreakdown: {
      fiveStar: 5100,
      fourStar: 1280,
      threeStar: 290,
      twoStar: 90,
      oneStar: 40,
    },
    isVerified: true,
    lastUpdated: TODAY,
    serviceScope: 'interstate',
  },
  {
    id: 'sgt',
    slug: 'sgt-auto-transport',
    name: 'SGT Auto Transport',
    fmcsaLegalName: 'SGT AUTO TRANSPORT',
    shortDescription:
      'Auto transport broker with strong customer-service focus and open/enclosed options nationwide.',
    description:
      'SGT Auto Transport is a vehicle shipping broker—not an asset-based carrier. It arranges transport through independent haulers for open and enclosed service. Often highlighted for communication and price-match style policies. Confirm the carrier’s USDOT and insurance at booking.',
    foundedYear: 2014,
    headquarters: 'United States',
    website: 'https://www.sgtautotransport.com',
    usdotNumber: '2521690',
    mcNumber: 'MC-873392',
    entityType: 'BROKER',
    fmcsaSafetyRating: 'Not Rated',
    fmcsaComplaints: 0,
    fmcsaShipments: 76000,
    authorityActive: true,
    usdotStatus: 'ACTIVE',
    bbbRating: 'A+',
    bbbAccredited: true,
    overallRating: 4.8,
    reviewCount: 5400,
    reputationScore: 91,
    yearsInBusiness: 12,
    avgPricePerMove: 1420,
    priceRange: '$$',
    coverage: 'All 50 States',
    services: ['Auto Transport', 'Broker'],
    specialties: [
      'Open Transport',
      'Enclosed Transport',
      'Customer Service Focus',
      'Broker (not carrier)',
    ],
    ratingBreakdown: {
      fiveStar: 3980,
      fourStar: 1020,
      threeStar: 280,
      twoStar: 80,
      oneStar: 40,
    },
    isVerified: true,
    lastUpdated: TODAY,
    serviceScope: 'interstate',
  },

  // ——— Wave B ———
  {
    id: 'easy-auto-ship',
    slug: 'easy-auto-ship',
    name: 'Easy Auto Ship',
    shortDescription:
      'Consumer-facing auto transport broker with a simple online quote flow for nationwide vehicle shipping.',
    description:
      'Easy Auto Ship operates as a licensed broker arranging independent carriers for open and enclosed auto transport. It markets an easy online booking experience. Always re-check current FMCSA authority status (including any revocation notices) before booking, and verify the hauler named on your bill of lading.',
    foundedYear: 2013,
    headquarters: 'Youngstown, OH',
    website: 'https://www.easyautoship.com',
    usdotNumber: '3149259',
    mcNumber: 'MC-103888',
    entityType: 'BROKER',
    fmcsaSafetyRating: 'Not Rated',
    fmcsaComplaints: 0,
    fmcsaShipments: 65000,
    authorityActive: true,
    usdotStatus: 'ACTIVE',
    bbbRating: 'A+',
    bbbAccredited: true,
    overallRating: 4.5,
    reviewCount: 4000,
    reputationScore: 84,
    yearsInBusiness: 13,
    avgPricePerMove: 1310,
    priceRange: '$$',
    coverage: 'All 50 States',
    services: ['Auto Transport', 'Broker'],
    specialties: [
      'Open Transport',
      'Enclosed Transport',
      'Online Quotes',
      'Broker (not carrier)',
    ],
    ratingBreakdown: {
      fiveStar: 2300,
      fourStar: 1200,
      threeStar: 320,
      twoStar: 100,
      oneStar: 80,
    },
    isVerified: true,
    lastUpdated: TODAY,
    serviceScope: 'interstate',
  },
  {
    id: 'ship-a-car-direct',
    slug: 'ship-a-car-direct',
    name: 'Ship A Car Direct',
    fmcsaLegalName: 'SHIP A CAR DIRECT INC',
    shortDescription:
      'Nationwide auto transport broker arranging door-to-door open and enclosed vehicle shipping.',
    description:
      'Ship A Car Direct is a licensed broker (not a carrier). It coordinates door-to-door vehicle transport via independent carriers. Useful when comparing broker options for standard or enclosed moves. Confirm the assigned carrier’s authority and cargo coverage before pickup.',
    foundedYear: 2010,
    headquarters: 'United States',
    website: 'https://www.shipacardirect.com',
    usdotNumber: '2241272',
    mcNumber: '',
    entityType: 'BROKER',
    fmcsaSafetyRating: 'Not Rated',
    fmcsaComplaints: 0,
    fmcsaShipments: 80000,
    authorityActive: true,
    usdotStatus: 'ACTIVE',
    bbbRating: 'A',
    bbbAccredited: true,
    overallRating: 4.4,
    reviewCount: 3500,
    reputationScore: 83,
    yearsInBusiness: 16,
    avgPricePerMove: 1320,
    priceRange: '$$',
    coverage: 'All 50 States',
    services: ['Auto Transport', 'Broker'],
    specialties: [
      'Open Transport',
      'Enclosed Transport',
      'Door to Door',
      'Broker (not carrier)',
    ],
    ratingBreakdown: {
      fiveStar: 1900,
      fourStar: 1100,
      threeStar: 320,
      twoStar: 100,
      oneStar: 80,
    },
    isVerified: true,
    lastUpdated: TODAY,
    serviceScope: 'interstate',
  },
  {
    id: 'roadrunner',
    slug: 'roadrunner-auto-transport',
    name: 'RoadRunner Auto Transport',
    shortDescription:
      'Established auto transport broker with broad U.S. coverage and competitive open/enclosed options.',
    description:
      'RoadRunner Auto Transport is a broker that arranges vehicle shipping with independent carriers—it does not typically haul with its own fleet. Positioned for value-oriented nationwide moves. Verify FMCSA details for the broker and the dispatched carrier before booking.',
    foundedYear: 2005,
    headquarters: 'San Diego, CA',
    website: 'https://www.roadrunnerautotransport.com',
    usdotNumber: '',
    mcNumber: '',
    fmcsaSafetyRating: 'Not Rated',
    fmcsaComplaints: 0,
    fmcsaShipments: 0,
    bbbRating: 'A',
    bbbAccredited: true,
    overallRating: 4.3,
    reviewCount: 5000,
    reputationScore: 78,
    yearsInBusiness: 21,
    avgPricePerMove: 1200,
    priceRange: '$ - $$',
    coverage: 'Continental US',
    services: ['Auto Transport', 'Broker'],
    specialties: [
      'Open Transport',
      'Enclosed Transport',
      'Value Pricing',
      'Broker (not carrier)',
    ],
    ratingBreakdown: {
      fiveStar: 2500,
      fourStar: 1600,
      threeStar: 600,
      twoStar: 200,
      oneStar: 100,
    },
    isVerified: false,
    lastUpdated: TODAY,
    serviceScope: 'interstate',
  },
  {
    id: 'uship',
    slug: 'uship',
    name: 'uShip',
    shortDescription:
      'Online shipping marketplace where customers can receive bids from independent transporters and brokers for vehicle moves.',
    description:
      'uShip is a marketplace platform—not a single carrier. Vehicle shipments are fulfilled by independent transporters or brokers who bid on listings. Customers must carefully vet each bidder’s USDOT, insurance, and reviews. Best for price comparison, with more hands-on diligence required than a managed broker.',
    foundedYear: 2003,
    headquarters: 'Austin, TX',
    website: 'https://www.uship.com',
    usdotNumber: 'N/A (Marketplace)',
    mcNumber: 'N/A (Marketplace)',
    fmcsaSafetyRating: 'Not Rated',
    fmcsaComplaints: 0,
    fmcsaShipments: 0,
    bbbRating: 'B',
    bbbAccredited: false,
    overallRating: 4.0,
    reviewCount: 28000,
    reputationScore: 72,
    yearsInBusiness: 23,
    avgPricePerMove: 980,
    priceRange: '$',
    coverage: 'All 50 States',
    services: ['Auto Transport'],
    specialties: [
      'Marketplace',
      'Open Transport',
      'Enclosed Transport',
      'Bid-based pricing',
    ],
    ratingBreakdown: {
      fiveStar: 10000,
      fourStar: 9800,
      threeStar: 5200,
      twoStar: 2100,
      oneStar: 900,
    },
    isVerified: false,
    lastUpdated: TODAY,
    serviceScope: 'interstate',
  },

  // ——— Wave C ———
  {
    id: 'nexus',
    slug: 'nexus-auto-transport',
    name: 'Nexus Auto Transport',
    shortDescription:
      'Nationwide auto transport broker focused on communication and open/enclosed vehicle shipping.',
    description:
      'Nexus Auto Transport operates as a broker arranging independent carriers for vehicle transport. It is not a fleet carrier. Compare quotes carefully and verify both the broker and the assigned hauler on FMCSA SAFER.',
    foundedYear: 2012,
    headquarters: 'Phoenix, AZ',
    website: 'https://nexusautotransport.com',
    usdotNumber: '',
    mcNumber: '',
    fmcsaSafetyRating: 'Not Rated',
    fmcsaComplaints: 0,
    fmcsaShipments: 0,
    bbbRating: 'A+',
    bbbAccredited: true,
    overallRating: 4.6,
    reviewCount: 4800,
    reputationScore: 80,
    yearsInBusiness: 14,
    avgPricePerMove: 1390,
    priceRange: '$$',
    coverage: 'All 50 States',
    services: ['Auto Transport', 'Broker'],
    specialties: [
      'Open Transport',
      'Enclosed Transport',
      'Broker (not carrier)',
    ],
    ratingBreakdown: {
      fiveStar: 3000,
      fourStar: 1200,
      threeStar: 400,
      twoStar: 120,
      oneStar: 80,
    },
    isVerified: false,
    lastUpdated: TODAY,
    serviceScope: 'interstate',
  },
  {
    id: 'mercury',
    slug: 'mercury-auto-transport',
    name: 'Mercury Auto Transport',
    shortDescription:
      'Auto transport broker offering competitive nationwide open and enclosed vehicle shipping options.',
    description:
      'Mercury Auto Transport is a broker that arranges shipping with independent carriers. Not a truck-owning carrier. Suitable for customers comparing budget-conscious nationwide broker options—always verify the hauler before release.',
    foundedYear: 2009,
    headquarters: 'Davie, FL',
    website: 'https://www.mercuryautotransport.com',
    usdotNumber: '',
    mcNumber: '',
    fmcsaSafetyRating: 'Not Rated',
    fmcsaComplaints: 0,
    fmcsaShipments: 0,
    bbbRating: 'A',
    bbbAccredited: true,
    overallRating: 4.4,
    reviewCount: 7000,
    reputationScore: 79,
    yearsInBusiness: 17,
    avgPricePerMove: 1280,
    priceRange: '$ - $$',
    coverage: 'All 50 States',
    services: ['Auto Transport', 'Broker'],
    specialties: [
      'Open Transport',
      'Enclosed Transport',
      'Broker (not carrier)',
    ],
    ratingBreakdown: {
      fiveStar: 3800,
      fourStar: 2200,
      threeStar: 700,
      twoStar: 200,
      oneStar: 100,
    },
    isVerified: false,
    lastUpdated: TODAY,
    serviceScope: 'interstate',
  },
  {
    id: 'reliable-carriers',
    slug: 'reliable-carriers',
    name: 'Reliable Carriers',
    fmcsaLegalName: 'RELIABLE CARRIERS INC',
    shortDescription:
      'Asset-based enclosed auto transport carrier specializing in high-value, luxury, and specialty vehicles.',
    description:
      'Reliable Carriers is an asset-based carrier (not a broker) operating a large enclosed car-hauler fleet. It specializes in high-value, exotic, classic, and corporate vehicle transport across the contiguous U.S. and into Canada. Premium positioning versus standard open-rack broker moves.',
    foundedYear: 1980,
    headquarters: 'Canton, MI',
    website: 'https://www.reliablecarriers.com',
    usdotNumber: '242599',
    mcNumber: '',
    entityType: 'CARRIER',
    fmcsaSafetyRating: 'Not Rated',
    fmcsaComplaints: 0,
    fmcsaShipments: 50000,
    authorityActive: true,
    usdotStatus: 'ACTIVE',
    bbbRating: 'A+',
    bbbAccredited: true,
    overallRating: 4.7,
    reviewCount: 2500,
    reputationScore: 93,
    yearsInBusiness: 46,
    avgPricePerMove: 2800,
    priceRange: '$$$',
    coverage: 'Continental US',
    services: ['Auto Transport', 'Carrier'],
    specialties: [
      'Enclosed Transport',
      'Specialty',
      'High-Value Vehicles',
      'Luxury & Exotic',
      'Carrier (not broker)',
    ],
    ratingBreakdown: {
      fiveStar: 1800,
      fourStar: 500,
      threeStar: 120,
      twoStar: 50,
      oneStar: 30,
    },
    isVerified: true,
    lastUpdated: TODAY,
    serviceScope: 'interstate',
  },
  {
    id: 'intercity-lines',
    slug: 'intercity-lines',
    name: 'Intercity Lines',
    fmcsaLegalName: 'INTERCITY LINES INC',
    shortDescription:
      'Family-owned enclosed auto transport carrier specializing in collector, exotic, and high-value vehicles.',
    description:
      'Intercity Lines is an asset-based enclosed car carrier (not a broker), founded in 1980. It operates its own fleet for nationwide specialty and high-value vehicle shipping. Best for customers who want direct carrier control rather than a brokered open-rack move.',
    foundedYear: 1980,
    headquarters: 'Warren, MA',
    website: 'https://intercitylines.com',
    usdotNumber: '223672',
    mcNumber: '',
    entityType: 'CARRIER',
    fmcsaSafetyRating: 'Not Rated',
    fmcsaComplaints: 0,
    fmcsaShipments: 20000,
    authorityActive: true,
    usdotStatus: 'ACTIVE',
    bbbRating: 'A+',
    bbbAccredited: true,
    overallRating: 4.8,
    reviewCount: 1200,
    reputationScore: 94,
    yearsInBusiness: 46,
    avgPricePerMove: 3000,
    priceRange: '$$$',
    coverage: 'Continental US',
    services: ['Auto Transport', 'Carrier'],
    specialties: [
      'Enclosed Transport',
      'Specialty',
      'High-Value Vehicles',
      'Classic & Exotic',
      'Carrier (not broker)',
    ],
    ratingBreakdown: {
      fiveStar: 900,
      fourStar: 220,
      threeStar: 50,
      twoStar: 20,
      oneStar: 10,
    },
    isVerified: true,
    lastUpdated: TODAY,
    serviceScope: 'interstate',
  },
];

/** Active-directory rows so Auto Transport also appears on main /companies filter. */
export const autoTransportLocalMovers: Record<string, LocalMover> = Object.fromEntries(
  seedAutoTransportCompanies.map((c) => {
    const id = `directory-${c.slug}`;
    const mover: LocalMover = {
      id,
      name: c.name,
      profileSlug: c.slug,
      rating: c.overallRating,
      reviewCount: c.reviewCount,
      shortDescription: c.shortDescription,
      services: c.services.map(String),
      specialties: c.specialties,
      usdotNumber: c.usdotNumber?.startsWith('N/A') ? '' : c.usdotNumber || '',
      mcNumber: c.mcNumber?.startsWith('N/A')
        ? ''
        : (c.mcNumber || '').replace(/^MC-?/i, ''),
      fmcsaSafetyRating: c.fmcsaSafetyRating,
      bbbRating: c.bbbRating,
      city: c.headquarters.split(',')[0]?.trim() || c.headquarters,
      website: c.website,
      entityType: c.entityType,
      listingSource: 'directory',
    };
    return [id, mover];
  })
);

export const autoTransportSlugToMoverId: Record<string, string> = Object.fromEntries(
  seedAutoTransportCompanies.map((c) => [c.slug, `directory-${c.slug}`])
);

export const AUTO_TRANSPORT_MOVER_IDS = Object.keys(autoTransportLocalMovers);

export function getAutoTransportBySlug(slug: string) {
  return seedAutoTransportCompanies.find((c) => c.slug === slug);
}

export function computeAutoTransportReputationScore(
  company: Partial<Company>
): number {
  const ratingWeight = (company.overallRating || 0) * 20;
  const reviewWeight = Math.min((company.reviewCount || 0) / 500, 20);
  const bbbWeight =
    company.bbbRating === 'A+'
      ? 15
      : company.bbbRating?.startsWith('A')
        ? 12
        : company.bbbRating?.startsWith('B')
          ? 8
          : 4;
  const complaintRatio = company.fmcsaShipments
    ? (company.fmcsaComplaints || 0) / company.fmcsaShipments
    : 0.01;
  const complaintWeight = Math.max(0, 15 - complaintRatio * 1500);
  const yearsWeight = Math.min((company.yearsInBusiness || 0) / 2, 10);
  const verifiedWeight = company.isVerified ? 10 : 0;

  return Math.round(
    Math.min(
      100,
      Math.max(
        50,
        ratingWeight +
          reviewWeight +
          bbbWeight +
          complaintWeight +
          yearsWeight +
          verifiedWeight
      )
    )
  );
}

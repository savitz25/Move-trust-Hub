import type { LocalMover } from '@/lib/local-movers/types';
import { predictCompanyProfileSlug } from '@/lib/directory/slug-resolution';
import { normalizeCompanyForDisplay } from '@/lib/directory/normalize-company';
import type { Company, ServiceType } from '@/types';

function mapServices(services: string[]): ServiceType[] {
  const mapped = new Set<ServiceType>();
  for (const service of services) {
    const s = service.toLowerCase();
    if (s.includes('auto')) mapped.add('Auto Transport');
    else if (s.includes('storage')) mapped.add('Storage');
    else if (s.includes('container') || s.includes('portable')) mapped.add('Container / Portable');
    else if (s.includes('carrier/broker') || s.includes('broker/carrier')) mapped.add('Carrier / Broker');
    else if (s.includes('broker')) mapped.add('Broker');
    else if (s.includes('carrier')) mapped.add('Carrier');
    else mapped.add('Full Service');
  }
  return mapped.size ? [...mapped] : ['Full Service'];
}

/** Convert a local-movers catalog entry into a directory-searchable Company row. */
export function localMoverToCompany(mover: LocalMover): Company {
  const slug =
    mover.profileSlug ||
    predictCompanyProfileSlug({ name: mover.name, usdot: mover.usdotNumber });
  const bbb = mover.bbbRating as Company['bbbRating'] | undefined;

  return normalizeCompanyForDisplay({
    id: mover.id,
    slug,
    name: mover.name,
    shortDescription: mover.shortDescription,
    description: mover.shortDescription,
    foundedYear: 0,
    headquarters: mover.city || '',
    website: mover.website || '',
    usdotNumber: mover.usdotNumber || '',
    mcNumber: mover.mcNumber || '',
    fmcsaSafetyRating: mover.fmcsaSafetyRating || 'Not Rated',
    fmcsaComplaints: 0,
    fmcsaShipments: 1000,
    bbbRating: bbb && bbb !== 'NR' ? bbb : 'NR',
    bbbAccredited: false,
    overallRating: mover.rating,
    reviewCount: mover.reviewCount,
    reputationScore: Math.round(mover.rating * 20),
    yearsInBusiness: 0,
    avgPricePerMove: 0,
    priceRange: '$$',
    coverage: 'Continental US',
    services: mapServices(mover.services),
    specialties: mover.specialties || [],
    ratingBreakdown: {
      fiveStar: 0,
      fourStar: 0,
      threeStar: 0,
      twoStar: 0,
      oneStar: 0,
    },
    isVerified: Boolean(mover.usdotNumber),
    lastUpdated: '',
  });
}
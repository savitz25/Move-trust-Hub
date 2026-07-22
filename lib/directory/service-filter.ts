/**
 * Services Offered filter chips ↔ company type badges (shown under the name).
 *
 * Type chips (Carrier, Broker, Local Mover, Carrier/Broker) match the same
 * resolution used by CompanyTypeBadges — not the optional service tags at the
 * bottom of cards (Full Service, Storage, etc.).
 */

import {
  resolveCompanyTypeBadgesFromCompany,
  type CompanyTypeBadgeId,
} from '@/lib/companies/type-badges';
import type { Company, ServiceType } from '@/types';

/** Service filter chips that map 1:1 to top-of-card type badges. */
const TYPE_SERVICE_TO_BADGE_ID: Partial<Record<ServiceType, CompanyTypeBadgeId>> = {
  'Local Mover': 'local-mover',
  Carrier: 'carrier',
  Broker: 'broker',
  'Carrier / Broker': 'carrier-broker',
};

export type ServiceFilterCompany = Pick<
  Company,
  'services' | 'entityType' | 'serviceScope' | 'usdotNumber' | 'mcNumber'
> & {
  fmcsaRaw?: Record<string, unknown> | null;
  isLocalOnly?: boolean;
};

/**
 * Whether a company matches a single Services Offered filter chip.
 * Shared by client filterCompanies and server directory API.
 */
export function companyMatchesServiceFilter(
  company: ServiceFilterCompany,
  service: ServiceType
): boolean {
  const badgeId = TYPE_SERVICE_TO_BADGE_ID[service];
  if (badgeId) {
    return resolveCompanyTypeBadgesFromCompany(company).some((b) => b.id === badgeId);
  }

  // Non-type services (Full Service, Storage, Auto Transport, …) use the services array.
  const services = Array.isArray(company.services) ? company.services : [];
  return services.includes(service);
}

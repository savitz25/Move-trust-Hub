import type { Company } from '@/types';

export type ResearchRole = 'Carrier' | 'Broker' | 'Carrier / Broker' | 'Unknown';
export type AuthorityLabel =
  | 'Current authority recorded'
  | 'Authority not current in stored evidence'
  | 'Authority status unknown';

export function namesDiffer(company: Pick<Company, 'name' | 'fmcsaLegalName'>): boolean {
  const display = (company.name ?? '').trim();
  const legal = (company.fmcsaLegalName ?? '').trim();
  if (!display || !legal) return false;
  return display.toLowerCase() !== legal.toLowerCase();
}

export function researchRole(company: Pick<Company, 'entityType' | 'services'>): ResearchRole {
  const entity = (company.entityType ?? '').trim();
  if (/carrier\s*\/\s*broker/i.test(entity) || entity.toLowerCase() === 'carrier/broker') {
    return 'Carrier / Broker';
  }
  if (/^broker$/i.test(entity)) return 'Broker';
  if (/^carrier$/i.test(entity)) return 'Carrier';
  const services = Array.isArray(company.services) ? company.services : [];
  if (services.includes('Carrier / Broker')) return 'Carrier / Broker';
  if (services.includes('Broker') && services.includes('Carrier')) return 'Carrier / Broker';
  if (services.includes('Broker') && !services.includes('Carrier')) return 'Broker';
  if (services.includes('Carrier')) return 'Carrier';
  return 'Unknown';
}

export function roleExplanation(role: ResearchRole): string {
  switch (role) {
    case 'Carrier':
      return 'A carrier actually transports household goods under its own authority. This is a business-model fact, not a quality ranking.';
    case 'Broker':
      return 'A broker arranges transportation but does not itself transport under carrier authority. Broker is not worse than carrier.';
    case 'Carrier / Broker':
      return 'Evidence indicates both carrier and broker roles. Confirm in writing who will haul the shipment. Dual role is not a recommendation.';
    default:
      return 'MoveTrustHub has not established the role confidently from the current evidence. Unknown is not the same as broker, inactive, or unlicensed.';
  }
}

export function authorityLabel(company: Pick<Company, 'authorityActive'>): AuthorityLabel {
  if (company.authorityActive === true) return 'Current authority recorded';
  if (company.authorityActive === false) return 'Authority not current in stored evidence';
  return 'Authority status unknown';
}

export function formatObservedRefresh(iso: string | null | undefined): string | null {
  if (!iso?.trim()) return null;
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return null;
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export function profileSeoTitle(company: Pick<Company, 'name' | 'usdotNumber'>): string {
  const name = (company.name || 'Moving company').replace(/\s+/g, ' ').trim();
  const usdot = company.usdotNumber?.trim();
  if (usdot) return `${name} — USDOT ${usdot} Moving Company Research`;
  return `${name} — Moving Company Research`;
}

export function profileSeoDescription(company: Pick<Company, 'name' | 'usdotNumber' | 'mcNumber' | 'fmcsaLegalName'>): string {
  const name = (company.name || 'This mover').replace(/\s+/g, ' ').trim();
  const bits = [`Independent MoveTrustHub research profile for ${name}.`];
  if (company.usdotNumber?.trim()) bits.push(`USDOT ${company.usdotNumber.trim()}.`);
  if (company.mcNumber?.trim()) bits.push(`MC ${company.mcNumber.trim()}.`);
  bits.push('We organize FMCSA identity evidence. You decide. Not a ranking or endorsement.');
  return bits.join(' ');
}

export type EvidenceStatus = 'Available' | 'Partial' | 'Not currently available';

export function evidenceSummary(company: Company): Array<{ label: string; status: EvidenceStatus }> {
  const role = researchRole(company);
  return [
    {
      label: 'FMCSA identity',
      status: company.usdotNumber?.trim() || company.mcNumber?.trim() ? 'Available' : 'Not currently available',
    },
    {
      label: 'Regulatory role',
      status: role === 'Unknown' ? 'Not currently available' : 'Available',
    },
    {
      label: 'Authority flag',
      status: company.authorityActive === true || company.authorityActive === false ? 'Available' : 'Not currently available',
    },
    {
      label: 'Headquarters evidence',
      status: company.headquarters?.trim() ? 'Available' : 'Not currently available',
    },
    {
      label: 'Review evidence',
      status: (company.reviewCount ?? 0) > 0 ? 'Partial' : 'Not currently available',
    },
  ];
}

export const RESEARCH_LIMITATIONS = [
  'FMCSA authority status is a regulatory record. It is not a MoveTrustHub endorsement, safety finding or recommendation.',
  'Headquarters is address evidence, not service territory. A company is not shown as serving a city merely because it is headquartered there.',
  'No complaint evidence on this page does not mean no complaints exist.',
  'No inspection evidence does not mean no inspections exist, and does not mean the company is safe.',
  'Consumer reviews are not regulator evidence.',
  'Listed services may be company-supplied categories, not regulatory claims.',
  'Records can change after the latest observed FMCSA refresh.',
  'A recent refresh does not mean safer, better, or recommended. An older or missing refresh does not mean inactive, unsafe, or misconduct.',
  'Carrier is not better than broker. Dual role is not a recommendation.',
] as const;

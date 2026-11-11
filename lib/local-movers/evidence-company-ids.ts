/**
 * Assignment rows often carry a public slug in company_id.
 * Discovery and state-authority rows are stored on companies.id, which can
 * differ from that slug. Evidence queries must use the canonical id.
 */
export function canonicalEvidenceCompanyIds(
  companies: Array<{ id?: string | null }>
): string[] {
  return [...new Set(companies.map((company) => company.id).filter((id): id is string => Boolean(id)))];
}

export function evidenceRowMatchesCompany(
  evidenceCompanyId: string,
  company: { id?: string | null; slug?: string | null }
): boolean {
  if (!evidenceCompanyId) return false;
  return evidenceCompanyId === company.id || evidenceCompanyId === company.slug;
}

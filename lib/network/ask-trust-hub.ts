/**
 * Ask Trust Hub network constants — shared specialist hub chrome.
 */

export const ASK_TRUST_HUB = {
  name: 'Ask Trust Hub',
  compactName: 'AskTrustHub',
  url: 'https://www.asktrusthub.com',
  promiseUrl: 'https://www.asktrusthub.com/promise',
  methodologyUrl: 'https://www.asktrusthub.com/methodology',
  /** Alias used in prose for The Ask Trust Hub Standard */
  standardUrl: 'https://www.asktrusthub.com/methodology',
  revenueUrl: 'https://www.asktrusthub.com/how-we-make-money',
  trustCenterUrl: 'https://www.asktrusthub.com/trust',
  email: 'hello@asktrusthub.com',
  /**
   * Network bar “Standards” → Ask methodology (The Standard).
   * Independence policy remains promiseUrl elsewhere.
   */
  standardsUrl: 'https://www.asktrusthub.com/methodology',
} as const;

/** Vertical methodology deep-links (canonical per hub). */
export const HUB_METHODOLOGY_URLS = {
  move: 'https://www.movetrusthub.com/about/how-we-score-movers',
  insurance: 'https://www.insurancetrusthub.com/methodology',
  lender: 'https://www.lendertrusthub.com/methodology',
  contractor: 'https://www.contractortrusthub.com/methodology',
} as const;

export const NETWORK_HUBS = [
  {
    id: 'move' as const,
    proseName: 'Move Trust Hub',
    compactName: 'MoveTrustHub',
    shortLabel: 'Move',
    url: 'https://www.movetrusthub.com',
    email: 'hello@movetrusthub.com',
  },
  {
    id: 'insurance' as const,
    proseName: 'Insurance Trust Hub',
    compactName: 'InsuranceTrustHub',
    shortLabel: 'Insurance',
    url: 'https://www.insurancetrusthub.com',
    email: 'hello@insurancetrusthub.com',
  },
  {
    id: 'lender' as const,
    proseName: 'Lender Trust Hub',
    compactName: 'LenderTrustHub',
    shortLabel: 'Lending',
    url: 'https://www.lendertrusthub.com',
    email: 'hello@lendertrusthub.com',
  },
  {
    id: 'contractor' as const,
    proseName: 'Contractor Trust Hub',
    compactName: 'ContractorTrustHub',
    shortLabel: 'Contractor',
    url: 'https://www.contractortrusthub.com',
    email: 'hello@contractortrusthub.com',
  },
  {
    id: 'senior' as const,
    proseName: 'SeniorTrustHub',
    compactName: 'SeniorTrustHub',
    shortLabel: 'Senior',
    url: 'https://www.seniortrusthub.com',
    email: 'hello@seniortrusthub.com',
  },
  {
    id: 'investor' as const,
    proseName: 'InvestorTrustHub',
    compactName: 'InvestorTrustHub',
    shortLabel: 'Investor',
    url: 'https://www.investortrusthub.com',
    email: 'hello@investortrusthub.com',
  },
] as const;

export type NetworkHubId = (typeof NETWORK_HUBS)[number]['id'];

export function networkHubById(id: NetworkHubId) {
  return NETWORK_HUBS.find((h) => h.id === id)!;
}

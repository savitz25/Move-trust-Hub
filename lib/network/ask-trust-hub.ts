/**
 * Ask Trust Hub network constants — shared by Move, Insurance, and Lender chrome.
 */

export const ASK_TRUST_HUB = {
  name: 'Ask Trust Hub',
  compactName: 'AskTrustHub',
  url: 'https://www.asktrusthub.com',
  promiseUrl: 'https://www.asktrusthub.com/promise',
  methodologyUrl: 'https://www.asktrusthub.com/methodology',
  email: 'hello@asktrusthub.com',
  standardsUrl: 'https://www.asktrusthub.com/promise',
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
] as const;

export type NetworkHubId = (typeof NETWORK_HUBS)[number]['id'];

export function networkHubById(id: NetworkHubId) {
  return NETWORK_HUBS.find((h) => h.id === id)!;
}

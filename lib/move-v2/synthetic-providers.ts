import type { ProviderClassification } from './domain';

export interface SyntheticProvider {
  providerId: string;
  displayName: string;
  legalName: string;
  dbaName?: string;
  classification: ProviderClassification;
  evidence: string[];
  contacts: string[];
  enrichment?: string;
  stateAuthority?: string;
  geography?: string;
}

export const SYNTHETIC_PROVIDERS: SyntheticProvider[] = [
  { providerId: 'synthetic-001', displayName: 'Atlas Harbor Moving', legalName: 'ATLAS HARBOR MOVING LLC', classification: 'INTERSTATE_CARRIER', evidence: ['Synthetic FMCSA: active', 'Synthetic interstate HHG authority: valid'], contacts: ['(202) 555-0101'] },
  { providerId: 'synthetic-002', displayName: 'Palm Route Movers', legalName: 'PALM ROUTE MOVERS LLC', classification: 'LOCAL_INTRASTATE_CARRIER_CANDIDATE', evidence: ['Synthetic DOT registration: active', 'State authority pending review'], contacts: ['(305) 555-0102'] },
  { providerId: 'synthetic-003', displayName: 'Sun County Moving', legalName: 'SUN COUNTY MOVING INC', classification: 'LOCAL_INTRASTATE_CARRIER', evidence: ['Synthetic Florida registration: valid'], contacts: ['moves@synthetic.invalid'], stateAuthority: 'Florida mover registration IM-SYNTHETIC · Active', geography: 'Explicit provider-published counties · Derived placement: No' },
  { providerId: 'synthetic-004', displayName: 'Clear Path Moving Brokerage', legalName: 'CLEAR PATH LOGISTICS LLC', classification: 'AUTHORIZED_BROKER', evidence: ['Synthetic broker authority: valid', 'Arranges transportation; does not operate trucks'], contacts: ['(212) 555-0104'] },
  { providerId: 'synthetic-005', displayName: 'Union Route Moving', legalName: 'UNION ROUTE TRANSPORT LLC', classification: 'DUAL_ROLE_CARRIER_BROKER', evidence: ['Synthetic carrier authority: valid', 'Synthetic broker authority: valid'], contacts: ['(312) 555-0105'] },
  { providerId: 'synthetic-006', displayName: 'Archived Moving Entity', legalName: 'ARCHIVED MOVING ENTITY LLC', classification: 'INACTIVE_ENTITY', evidence: ['Synthetic registration: inactive'], contacts: [] },
  { providerId: 'synthetic-007', displayName: 'Review Needed Moving', legalName: 'REVIEW NEEDED MOVING LLC', classification: 'NEEDS_REGULATORY_REVIEW', evidence: ['Conflicting synthetic authority snapshots'], contacts: [] },
  { providerId: 'synthetic-008', displayName: 'American Family Movers', legalName: 'XYZ TRANSPORTATION SERVICES LLC', dbaName: 'AMERICAN FAMILY MOVERS', classification: 'INTERSTATE_CARRIER', evidence: ['Synthetic official DBA', 'Legal entity preserved'], contacts: ['(561) 555-0108'] },
  { providerId: 'synthetic-009', displayName: 'Many Lines Moving', legalName: 'MANY LINES MOVING LLC', classification: 'LOCAL_INTRASTATE_CARRIER', evidence: ['Synthetic Washington UTC authority: active', 'Synthetic identity onboarding: resolved'], contacts: ['Main: (360) 555-0109', 'Claims: (360) 555-0199', 'hello@synthetic.invalid'], stateAuthority: 'Washington UTC HHG permit UTC-SYNTHETIC · Active', geography: 'TrustHub-derived origin search area · clipped to Washington · derived estimate, not provider-published fact' },
  { providerId: 'synthetic-010', displayName: 'Corroborated Moving Co.', legalName: 'CORROBORATED MOVING COMPANY LLC', classification: 'INTERSTATE_CARRIER', evidence: ['Synthetic federal evidence', 'Synthetic Google business information'], contacts: ['(404) 555-0110', 'https://synthetic.invalid'], enrichment: 'High-confidence name, address, phone, and domain match' },
  { providerId: 'synthetic-011', displayName: 'Sound County Movers', legalName: 'SOUND COUNTY MOVERS LLC', classification: 'LOCAL_INTRASTATE_CARRIER', evidence: ['Synthetic Washington UTC authority: active', 'Company states it serves King and Pierce Counties'], contacts: ['(253) 555-0111'], stateAuthority: 'Washington UTC HHG permit UTC-SYNTHETIC-2 · Active', geography: 'Explicit provider-published service area · no derived expansion' },
  { providerId: 'synthetic-012', displayName: 'Historic Radius Moving', legalName: 'HISTORIC RADIUS MOVING LLC', classification: 'LOCAL_INTRASTATE_CARRIER', evidence: ['Synthetic derived record retained for provenance', 'Later explicit service-area evidence superseded it'], contacts: [], stateAuthority: 'Florida mover registration IM-SYNTHETIC-2 · Active', geography: 'Derived area superseded · explicit provider geography now controls' },
  { providerId: 'synthetic-013', displayName: 'Unresolved Garden State Mover', legalName: 'UNRESOLVED GARDEN STATE MOVER LLC', classification: 'LOCAL_INTRASTATE_CARRIER_CANDIDATE', evidence: ['Synthetic FMCSA local candidate', 'New Jersey state roster unavailable'], contacts: [], stateAuthority: 'State authority unresolved · neutral status', geography: 'No derived placement: regulatory eligibility is unresolved' },
];

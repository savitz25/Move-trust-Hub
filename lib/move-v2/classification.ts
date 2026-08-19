import type { ClassificationResult, MoveType, ProviderClassification, RegulatoryFacts } from './domain';

export const CLASSIFICATION_RULE_VERSION = 'move-provider-v1.0.0';

export function classifyProvider(
  facts: RegulatoryFacts,
  classifiedAt = new Date().toISOString()
): ClassificationResult {
  const base = {
    classificationRuleVersion: CLASSIFICATION_RULE_VERSION,
    classifiedAt,
    supportingEvidenceIds: [...facts.sourceEvidenceIds],
  };
  if (facts.registrationStatus === 'INACTIVE') {
    return { ...base, classification: 'INACTIVE_ENTITY', classificationReason: 'Authoritative registration is inactive.' };
  }
  if (facts.registrationStatus !== 'ACTIVE') {
    return { ...base, classification: 'NEEDS_REGULATORY_REVIEW', classificationReason: 'Current registration status is unknown.' };
  }
  const carrier = facts.entityRoles.includes('CARRIER');
  const broker = facts.entityRoles.includes('BROKER');
  const carrierValid = carrier && facts.interstateHhgAuthority === 'VALID';
  const brokerValid = broker && facts.brokerAuthority === 'VALID';
  if (carrierValid && brokerValid) {
    return { ...base, classification: 'DUAL_ROLE_CARRIER_BROKER', classificationReason: 'Carrier HHG and broker authority are both valid.' };
  }
  if (broker && facts.brokerAuthority === 'INACTIVE') {
    return { ...base, classification: 'INACTIVE_ENTITY', classificationReason: 'Broker-specific authority is inactive.' };
  }
  if (carrierValid) {
    return { ...base, classification: 'INTERSTATE_CARRIER', classificationReason: 'Active carrier with valid federal interstate HHG authority.' };
  }
  if (brokerValid) {
    return { ...base, classification: 'AUTHORIZED_BROKER', classificationReason: 'Active entity with valid broker-specific authority.' };
  }
  if (carrier && facts.interstateHhgAuthority === 'NOT_AUTHORIZED') {
    return { ...base, classification: 'LOCAL_INTRASTATE_CARRIER_CANDIDATE', classificationReason: 'Active carrier lacks interstate HHG authority; state authority review is required.' };
  }
  return { ...base, classification: 'UNKNOWN_UNCLASSIFIED', classificationReason: 'Evidence does not satisfy a versioned classification rule.' };
}

export function isEligibleForMove(
  classification: ProviderClassification,
  moveType: MoveType,
  hasValidApplicableStateAuthority = false
): boolean {
  if (classification === 'INACTIVE_ENTITY' || classification === 'NEEDS_REGULATORY_REVIEW' || classification === 'UNKNOWN_UNCLASSIFIED') return false;
  if (moveType === 'INTERSTATE') return classification === 'INTERSTATE_CARRIER' || classification === 'DUAL_ROLE_CARRIER_BROKER';
  if (moveType === 'LOCAL' || moveType === 'INTRASTATE') {
    return classification === 'INTERSTATE_CARRIER' || classification === 'DUAL_ROLE_CARRIER_BROKER' ||
      (classification === 'LOCAL_INTRASTATE_CARRIER' && hasValidApplicableStateAuthority);
  }
  return false;
}

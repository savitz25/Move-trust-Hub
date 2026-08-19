import type { ProviderClassification } from './domain';

export interface PublicProviderDecisionInput {
  providerId: string;
  classification: ProviderClassification;
  evidenceStrength: number;
  moveEligible: boolean;
}

export interface PrivateCommercialState {
  organizationId: string;
  subscriptionStatus: 'FREE' | 'TRIAL' | 'PAID' | 'PAST_DUE' | 'CANCELED';
}

export function buildPublicDecision(input: PublicProviderDecisionInput) {
  return { ...input, rankScore: input.moveEligible ? input.evidenceStrength : -1 };
}

// Deliberately no function accepts both public decision inputs and commercial state.
export function validateCommercialIsolation(_state: PrivateCommercialState): true {
  void _state;
  return true;
}

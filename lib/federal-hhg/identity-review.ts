export type IdentityReviewCategory =
  | 'NAME_SIMILAR_TO_EXISTING_USDOT_DIFFERENT'
  | 'SAME_NAME_SAME_LOCATION_DIFFERENT_USDOT'
  | 'SAME_NAME_DIFFERENT_LOCATION'
  | 'LEGAL_NAME_DBA_CONFLICT'
  | 'POSSIBLE_DUPLICATE_INGEST'
  | 'BRAND_FRANCHISE_VAN_LINE'
  | 'HISTORICAL_SUCCESSOR'
  | 'EXISTING_PUBLIC_PROFILE_CONFLICT'
  | 'INSUFFICIENT_IDENTITY_EVIDENCE';

export type IdentityReviewRisk = 'LOW' | 'MEDIUM' | 'HIGH';

export type IdentityReviewTriage = {
  category: IdentityReviewCategory;
  risk: IdentityReviewRisk;
  queue: string;
  path: string;
  autoMerge: false;
};

const FRANCHISE_TOKENS = [
  'two men and a truck',
  'allied',
  'mayflower',
  'atlas',
  'wheaton',
  'north american',
  'national van',
  'united van',
  'bekins',
  'starving students',
];

export function classifyIdentityReview(input: {
  matchReason: string | null;
  legalName: string | null;
  dbaName: string | null;
  phyCity: string | null;
  phyState: string | null;
  existingName?: string | null;
  existingCity?: string | null;
  existingState?: string | null;
}): IdentityReviewTriage {
  const reason = (input.matchReason ?? '').toLowerCase();
  const legal = (input.legalName ?? '').toLowerCase();
  const dba = (input.dbaName ?? '').toLowerCase();
  const brand = FRANCHISE_TOKENS.some(
    (token) => legal.includes(token) || dba.includes(token)
  );

  if (reason.includes('task 002') || reason.includes('copied usdot')) {
    return {
      category: 'EXISTING_PUBLIC_PROFILE_CONFLICT',
      risk: 'HIGH',
      queue: 'IDENTITY_REVIEW_HIGH_RISK',
      path: 'keep_quarantined_protected_identity',
      autoMerge: false,
    };
  }
  if (reason.includes('duplicate usdot') || reason.includes('duplicate mc')) {
    return {
      category: 'POSSIBLE_DUPLICATE_INGEST',
      risk: 'HIGH',
      queue: 'IDENTITY_REVIEW_DUPLICATE_CANDIDATE',
      path: 'manual_duplicate_review',
      autoMerge: false,
    };
  }
  if (reason.includes('mc matches but usdot differs')) {
    return {
      category: 'EXISTING_PUBLIC_PROFILE_CONFLICT',
      risk: 'HIGH',
      queue: 'IDENTITY_REVIEW_HIGH_RISK',
      path: 'manual_authority_identity_review',
      autoMerge: false,
    };
  }

  const sameCity =
    Boolean(input.phyCity && input.existingCity) &&
    input.phyCity!.trim().toLowerCase() === input.existingCity!.trim().toLowerCase();
  const sameState =
    Boolean(input.phyState && input.existingState) &&
    input.phyState!.trim().toUpperCase() === input.existingState!.trim().toUpperCase();

  if (reason.includes('name similarity')) {
    if (sameCity && sameState) {
      return {
        category: 'SAME_NAME_SAME_LOCATION_DIFFERENT_USDOT',
        risk: 'HIGH',
        queue: 'IDENTITY_REVIEW_DUPLICATE_CANDIDATE',
        path: 'manual_legal_identity_review',
        autoMerge: false,
      };
    }
    if (input.existingState && !sameState) {
      return {
        category: brand
          ? 'BRAND_FRANCHISE_VAN_LINE'
          : 'SAME_NAME_DIFFERENT_LOCATION',
        risk: brand ? 'MEDIUM' : 'LOW',
        queue: brand ? 'IDENTITY_REVIEW_BRAND_FRANCHISE' : 'IDENTITY_REVIEW_LOW_RISK',
        path: brand ? 'manual_franchise_entity_review' : 'likely_distinct_operating_entity',
        autoMerge: false,
      };
    }
    return {
      category: 'NAME_SIMILAR_TO_EXISTING_USDOT_DIFFERENT',
      risk: 'MEDIUM',
      queue: 'IDENTITY_REVIEW_LOW_RISK',
      path: 'likely_distinct_or_franchise_manual_spot_check',
      autoMerge: false,
    };
  }

  if (dba && legal && dba !== legal) {
    return {
      category: 'LEGAL_NAME_DBA_CONFLICT',
      risk: 'LOW',
      queue: 'IDENTITY_REVIEW_LOW_RISK',
      path: 'preserve_both_names_no_merge',
      autoMerge: false,
    };
  }

  return {
    category: 'INSUFFICIENT_IDENTITY_EVIDENCE',
    risk: 'HIGH',
    queue: 'IDENTITY_REVIEW_HIGH_RISK',
    path: 'remain_quarantined',
    autoMerge: false,
  };
}

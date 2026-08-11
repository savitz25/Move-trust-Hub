/**
 * Move Quote Check Phase 1–3 — questionnaire + report contracts.
 * Research only; no PII storage by default.
 */

export type EstimateType =
  | 'binding'
  | 'non_binding'
  | 'binding_nte'
  | 'not_sure';

export type CompanyRole = 'carrier' | 'broker' | 'unclear';

export type SurveyBasis =
  | 'in_home'
  | 'virtual'
  | 'phone_only'
  | 'not_sure';

export type InventoryDetail =
  | 'itemized'
  | 'room_or_volume'
  | 'little_or_none'
  | 'not_sure';

export type DepositTiming =
  | 'before_load'
  | 'at_booking'
  | 'at_delivery'
  | 'not_sure'
  | 'none';

export type PaymentMethod =
  | 'card'
  | 'check'
  | 'cash'
  | 'wire'
  | 'zelle'
  | 'other'
  | 'not_sure';

export type ValuationType =
  | 'released'
  | 'full_value'
  | 'unclear';

export type YesNoUnsure = 'yes' | 'no' | 'not_sure';

export type QuoteCheckAnswers = {
  estimateType: EstimateType;
  companyName: string;
  usdot: string;
  mcNumber: string;
  companyRole: CompanyRole;
  surveyBasis: SurveyBasis;
  inventoryDetail: InventoryDetail;
  estimatedTotal: string;
  depositAmount: string;
  depositTiming: DepositTiming;
  paymentMethod: PaymentMethod;
  valuation: ValuationType;
  /** Optional mover estimate cubic feet (from paper / paste) */
  estimateCubicFeet: string;
  /** Optional mover estimate weight in pounds */
  estimateWeightLbs: string;
  /** Phase 4 — services clarity */
  packingIncluded: YesNoUnsure;
  shuttleMentioned: YesNoUnsure;
  storageMentioned: YesNoUnsure;
  signedCustomer: YesNoUnsure;
  signedCompany: YesNoUnsure;
  datesPresent: YesNoUnsure;
  originDestinationPresent: YesNoUnsure;
  rightsBookletReferenced: YesNoUnsure;
  blankOrSubjectToChange: YesNoUnsure;
};

export type FindingSeverity = 'info' | 'review' | 'high';

export type FindingStatus = 'present' | 'needs_review' | 'missing_unclear';

export type QuoteCheckFinding = {
  id: string;
  severity: FindingSeverity;
  status: FindingStatus;
  title: string;
  explanation: string;
  action: string;
  citation: string;
  family:
    | 'estimate_type'
    | 'identity'
    | 'survey'
    | 'inventory'
    | 'inventory_compare'
    | 'deposit'
    | 'valuation'
    | 'completeness';
};

export type QuoteCheckReport = {
  summaryHeadline: string;
  summaryBody: string;
  estimateTypeLabel: string;
  reviewCount: number;
  highCount: number;
  infoCount: number;
  findings: QuoteCheckFinding[];
  /** Educational 110% figure when non-binding + total provided */
  exposureNote: {
    estimatedTotal: number;
    educationalMaxAtDelivery: number;
    explanation: string;
  } | null;
  /** Phase 3 — inventory vs estimate volume/weight */
  inventoryComparison: InventoryComparisonResult | null;
  questions: string[];
  verifyDotHref: string | null;
};

/** Phase 3 comparison payload (also defined behaviorally in inventory-compare.ts) */
export type InventoryComparisonStatus =
  | 'aligned'
  | 'moderate_mismatch'
  | 'material_mismatch'
  | 'unavailable';

export type InventoryComparisonResult = {
  status: InventoryComparisonStatus;
  basis: 'volume' | 'weight' | 'none';
  moverCuFt: number | null;
  moverWeightLbs: number | null;
  userCuFt: number | null;
  userWeightLbs: number | null;
  userItemCount: number | null;
  absDiffCuFt: number | null;
  pctDiffCuFt: number | null;
  absDiffLbs: number | null;
  pctDiffLbs: number | null;
  headline: string;
  body: string;
  prompt?: string;
};

export const DEFAULT_ANSWERS: QuoteCheckAnswers = {
  estimateType: 'not_sure',
  companyName: '',
  usdot: '',
  mcNumber: '',
  companyRole: 'unclear',
  surveyBasis: 'not_sure',
  inventoryDetail: 'not_sure',
  estimatedTotal: '',
  depositAmount: '',
  depositTiming: 'not_sure',
  paymentMethod: 'not_sure',
  valuation: 'unclear',
  estimateCubicFeet: '',
  estimateWeightLbs: '',
  packingIncluded: 'not_sure',
  shuttleMentioned: 'not_sure',
  storageMentioned: 'not_sure',
  signedCustomer: 'not_sure',
  signedCompany: 'not_sure',
  datesPresent: 'not_sure',
  originDestinationPresent: 'not_sure',
  rightsBookletReferenced: 'not_sure',
  blankOrSubjectToChange: 'not_sure',
};

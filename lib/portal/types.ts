import type { DisputeCategoryId } from '@/lib/portal/messaging';

export type ClaimStatus = 'pending' | 'approved' | 'rejected' | 'needs_info';
export type VerificationMethod = 'email_domain' | 'fmcsa_contact' | 'phone' | 'manual';
export type OwnerRole = 'owner' | 'manager';
export type OwnerStatus = 'active' | 'revoked';
export type DisputeStatus =
  | 'none'
  | 'under_review'
  | 'resolved_upheld'
  | 'resolved_rejected';
export type ServiceAreaMode = 'national' | 'regional' | 'local';

export type InterstateLane = {
  from: string;
  to: string;
};

export type CompanyClaim = {
  id: string;
  company_id: string;
  company_slug: string;
  company_name: string;
  claimant_user_id: string | null;
  claimant_name: string;
  claimant_email: string;
  claimant_phone: string | null;
  claimant_title: string | null;
  usdot_submitted: string;
  verification_method: VerificationMethod;
  status: ClaimStatus;
  moderation_note: string | null;
  moderated_at: string | null;
  moderated_by: string | null;
  created_at: string;
  updated_at: string;
};

export type CompanyOwner = {
  id: string;
  company_id: string;
  company_slug: string;
  user_id: string;
  claim_id: string | null;
  role: OwnerRole;
  status: OwnerStatus;
  verified_at: string;
  company_name?: string;
};

export type PortalProfile = {
  company_id: string;
  company_slug: string;
  last_reputation_sync_at: string | null;
  last_reputation_sync_summary: ReputationSyncSummary | null;
  service_area_mode: ServiceAreaMode;
  service_area_states: string[];
  service_area_counties: string[];
  service_area_radius_miles: number | null;
  primary_interstate_lanes: InterstateLane[];
  coverage_notes: string | null;
  updated_at: string;
};

export type ReputationSyncSummary = {
  fmcsa?: { ok: boolean; message?: string; fieldsUpdated?: number };
  google?: { ok: boolean; message?: string; fieldsUpdated?: number };
  bbb?: { ok: boolean; message?: string; fieldsUpdated?: number };
  syncedAt: string;
};

export type OwnerReview = {
  id: string;
  company_id: string;
  reviewer_name: string;
  rating: number;
  title: string | null;
  content: string;
  created_at: string;
  owner_response: string | null;
  owner_response_at: string | null;
  dispute_status: DisputeStatus;
  dispute_category: DisputeCategoryId | null;
  dispute_reason: string | null;
  disputed_at: string | null;
};

export type SubmitClaimInput = {
  companySlug: string;
  claimantName: string;
  claimantEmail: string;
  claimantPhone?: string;
  claimantTitle?: string;
  usdotSubmitted: string;
};

export type ServiceAreaInput = {
  mode: ServiceAreaMode;
  states: string[];
  counties: string[];
  radiusMiles: number | null;
  primaryInterstateLanes: InterstateLane[];
  coverageNotes?: string;
};

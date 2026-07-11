import type { GooglePlacesData, PublicScrapeData } from '@/lib/verification/types';

export type NmlsLicenseRow = {
  state: string;
  regulator: string;
  licenseName: string;
  authorized: boolean | null;
  status: string | null;
};

export type NmlsBranchRow = {
  name: string;
  nmlsId: string | null;
  address: string | null;
  city: string | null;
  state: string | null;
};

export type NmlsSuggestionPreview = {
  nmlsId: string;
  entityType: 'COMPANY' | 'INDIVIDUAL' | 'BRANCH';
  legalName: string;
  otherNames: string[];
  streetAddress: string | null;
  city: string | null;
  state: string | null;
  zip: string | null;
  phone: string | null;
  fax: string | null;
  website: string | null;
  businessEmail: string | null;
  dateFormed: string | null;
  stateRegulators: string[];
  licenses: NmlsLicenseRow[];
  branches: NmlsBranchRow[];
  nmlsRecordUrl: string;
  fetchedAt: string;
  scrapeMethod: 'playwright' | 'fetch' | 'manual';
  needsManualReview: boolean;
  scrapeWarnings: string[];
};

export type CfpbComplaintSummary = {
  companyName: string | null;
  complaintCount: number;
  status: 'ok' | 'not_found' | 'error' | 'skipped';
  lastFetched: string;
  sourceUrl: string;
};

export type EnrichedLenderPreview = {
  nmls: NmlsSuggestionPreview;
  google: GooglePlacesData | null;
  publicScrape: PublicScrapeData | null;
  cfpb: CfpbComplaintSummary | null;
  countySlug: string | null;
  stateSlug: string | null;
  countyExperienceScore: number;
  fetchedAt: string;
};

export type LenderOnboardingSubmissionRow = {
  id: string;
  name: string;
  nmls_id: string;
  status: string;
  submitted_by_name: string | null;
  submitted_by_email: string | null;
  nmls_preview: NmlsSuggestionPreview | null;
  google_data: GooglePlacesData | null;
  public_scrape_data: PublicScrapeData | null;
  cfpb_data: CfpbComplaintSummary | null;
  needs_manual_review: boolean;
  created_at: string;
  lender_id: string | null;
  moderation_note: string | null;
};
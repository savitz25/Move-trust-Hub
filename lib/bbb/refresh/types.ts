export type BbbRating =
  | 'A+'
  | 'A'
  | 'A-'
  | 'B+'
  | 'B'
  | 'B-'
  | 'C+'
  | 'C'
  | 'C-'
  | 'D+'
  | 'D'
  | 'D-'
  | 'F'
  | 'NR';

export type RefreshMode = 'incremental' | 'full';

export type RefreshTrigger = 'cron' | 'github' | 'admin' | 'api';

export type RefreshRunStatus = 'running' | 'completed' | 'failed' | 'partial';

export type ChangeSeverity = 'info' | 'warning' | 'critical';

export type BbbBusinessSnapshot = {
  businessId: string;
  bbbId: string;
  name: string;
  rating: BbbRating;
  accredited: boolean;
  complaintsLast36m: number;
  customerReviews: number;
  alertCount: number;
  profileUrl?: string;
  raw: Record<string, unknown>;
};

export type CompanyRefreshRow = {
  id: string;
  slug: string;
  name: string;
  headquarters: string | null;
  website: string | null;
  bbb_rating: string | null;
  bbb_accredited: boolean;
  complaints_last_36m: number | null;
  bbb_customer_reviews: number | null;
  bbb_alert_count: number | null;
  bbb_data_hash: string | null;
  bbb_business_id: string | null;
  bbb_last_checked: string | null;
  reputation_score: number;
  overall_rating: number | null;
  review_count: number;
  fmcsa_complaints: number;
  fmcsa_shipments: number;
  is_verified: boolean;
  years_in_business: number | null;
};

export type FieldChange = {
  field: string;
  oldValue: string | null;
  newValue: string | null;
  severity: ChangeSeverity;
};

export type RefreshRunResult = {
  runId: string;
  mode: RefreshMode;
  status: RefreshRunStatus;
  companiesTotal: number;
  companiesProcessed: number;
  companiesUpdated: number;
  companiesFailed: number;
  changesDetected: number;
  errors: string[];
  durationMs: number;
  skipped?: boolean;
  skipReason?: string;
};

export type RefreshOptions = {
  mode: RefreshMode;
  triggeredBy: RefreshTrigger;
  limit?: number;
  force?: boolean;
};
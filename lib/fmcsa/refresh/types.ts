export type RefreshMode = 'incremental' | 'full';

export type RefreshTrigger = 'cron' | 'github' | 'admin' | 'api';

export type RefreshRunStatus = 'running' | 'completed' | 'failed' | 'partial';

export type ChangeSeverity = 'info' | 'warning' | 'critical';

export type FmcsaCarrierSnapshot = {
  dotNumber: string;
  mcNumber?: string;
  legalName?: string;
  dbaName?: string;
  allowedToOperate: boolean;
  authorityActive: boolean;
  outOfService: boolean;
  safetyRating: 'Satisfactory' | 'Conditional' | 'Unsatisfactory' | 'Not Rated';
  complaintsLast12m: number;
  shipments: number;
  revocationDate?: string | null;
  commonAuthorityStatus?: string;
  brokerAuthorityStatus?: string;
  raw: Record<string, unknown>;
};

export type CompanyRefreshRow = {
  id: string;
  slug: string;
  name: string;
  headquarters?: string | null;
  usdot_number: string | null;
  mc_number: string | null;
  fmcsa_safety_rating: string | null;
  fmcsa_complaints: number;
  fmcsa_shipments: number;
  authority_active: boolean | null;
  out_of_service: boolean | null;
  complaints_last_12m: number | null;
  revocation_date: string | null;
  data_hash: string | null;
  fmcsa_last_checked: string | null;
  fmcsa_raw?: Record<string, unknown> | null;
  services?: string[] | null;
  reputation_score: number;
  overall_rating: number | null;
  review_count: number;
  bbb_rating: string | null;
  bbb_accredited: boolean;
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
  /** Force re-run even if idempotency key exists */
  force?: boolean;
};

export type BatchRefreshOptions = {
  batch: number;
  offset: number;
  dryRun?: boolean;
  /** When false, inactive DOT carriers are not auto-removed (entity-type backfill safe mode). */
  batchMode?: boolean;
};

export type InactiveDotRemovalRecord = {
  id: string;
  slug: string;
  name: string;
  usdot_number: string | null;
  mc_number: string | null;
  headquarters: string | null;
  reason: string;
  inactiveDot?: string;
  inactiveSaferMessage?: string | null;
};

export type BatchCompanyOutcome = {
  index: number;
  company: CompanyRefreshRow;
  status:
    | 'updated'
    | 'unchanged'
    | 'failed'
    | 'dry_run'
    | 'skipped_existing'
    | 'removed'
    | 'would_remove';
  lookupMethod?: 'dot' | 'name_search' | 'skipped_existing';
  nameMatch?: {
    query: string;
    matchedLegalName: string;
    matchedDot: string;
    confidence: number;
  };
  removal?: InactiveDotRemovalRecord;
  dotCorrected?: boolean;
  previousDot?: string;
  changes: FieldChange[];
  error?: string;
  displayFields?: {
    entityType: string | null;
    usdotStatus: string | null;
    powerUnits: string | null;
    mcNumber: string | null;
    authorityStatus: string | null;
    safetyRating: string | null;
    complaintsLast12m: string | null;
  };
};

export type BatchRefreshResult = {
  batch: number;
  offset: number;
  dryRun: boolean;
  totalWithUsdot: number;
  companiesSelected: number;
  companiesProcessed: number;
  companiesUpdated: number;
  companiesUnchanged: number;
  companiesFailed: number;
  companiesRemoved: number;
  companiesDotCorrected: number;
  changesDetected: number;
  errors: string[];
  removals: InactiveDotRemovalRecord[];
  durationMs: number;
  outcomes: BatchCompanyOutcome[];
  nextOffset: number;
};
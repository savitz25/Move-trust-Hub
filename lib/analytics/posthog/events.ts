export const TRUSTHUB_HUB = 'move' as const;

export const TRUSTHUB_EVENTS = {
  SEARCH_SUBMITTED: 'search_submitted',
  SEARCH_RESULTS_RETURNED: 'search_results_returned',
  PROFILE_VIEWED: 'profile_viewed',
  // Canonical My TrustHub Save contract, mirrored from Ask's contract. A
  // profile_saved event is emitted only after the parent acknowledges the save.
  PROFILE_SAVE_INTENT: 'profile_save_intent',
  PROFILE_SAVED: 'profile_saved',
  PROFILE_SAVE_FAILED: 'profile_save_failed',
  CLAIM_STARTED: 'claim_started',
  PAGEVIEW: '$pageview',
} as const;

export type TrustHubEventName = (typeof TRUSTHUB_EVENTS)[keyof typeof TRUSTHUB_EVENTS];

export type TrustHubEventProperties = {
  hub: typeof TRUSTHUB_HUB;
  environment: 'production' | 'preview' | 'development';
  surface?: string;
  authenticated?: boolean;
  state?: string;
  capability?: string;
  capability_state?: string;
  result_count?: number;
  success?: boolean;
  profile_type?: string;
  provider_class?: string;
} & Record<string, string | number | boolean | undefined>;

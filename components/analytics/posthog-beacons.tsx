'use client';

import { useEffect } from 'react';
import { captureTrustEvent } from '@/lib/analytics/posthog/capture';
import { TRUSTHUB_EVENTS } from '@/lib/analytics/posthog/events';

export function ProfileViewed({
  profileType = 'moving_company',
  surface = 'profile',
}: {
  profileType?: string;
  surface?: string;
}) {
  useEffect(() => {
    captureTrustEvent(TRUSTHUB_EVENTS.PROFILE_VIEWED, {
      surface,
      profile_type: profileType,
      success: true,
    });
  }, [profileType, surface]);
  return null;
}

export function ClaimStarted({ surface = 'claim' }: { surface?: string }) {
  useEffect(() => {
    captureTrustEvent(TRUSTHUB_EVENTS.CLAIM_STARTED, {
      surface,
      success: true,
    });
  }, [surface]);
  return null;
}

export function captureSearchSubmitted(surface = 'ask_form'): void {
  captureTrustEvent(
    TRUSTHUB_EVENTS.SEARCH_SUBMITTED,
    { surface, success: true },
    { sendBeforeUnload: true },
  );
}

export function captureSearchResultsReturned(input: {
  surface?: string;
  capability?: string;
  state?: string;
  resultCount?: number;
  success?: boolean;
}): void {
  captureTrustEvent(TRUSTHUB_EVENTS.SEARCH_RESULTS_RETURNED, {
    surface: input.surface || 'ask_results',
    capability: input.capability,
    state: input.state,
    result_count: typeof input.resultCount === 'number' ? input.resultCount : undefined,
    success: input.success,
  });
}

const MY_TRUSTHUB_MOVE_SAVE_PROPERTIES = {
  action_source: 'specialist_handoff',
  specialist_hub: 'move',
} as const;

/** Emit only bounded contract fields; profile, account, and carrier identifiers stay out. */
export function captureMyTrustHubSaveIntent(): void {
  captureTrustEvent(
    TRUSTHUB_EVENTS.PROFILE_SAVE_INTENT,
    { ...MY_TRUSTHUB_MOVE_SAVE_PROPERTIES, outcome: 'intent' },
    { sendBeforeUnload: true },
  );
}

export function captureMyTrustHubSaveConfirmed(): void {
  captureTrustEvent(TRUSTHUB_EVENTS.PROFILE_SAVED, {
    ...MY_TRUSTHUB_MOVE_SAVE_PROPERTIES,
    outcome: 'success',
  });
}

export function captureMyTrustHubSaveFailed(
  failureReason: 'unable' | 'handoff_unavailable',
): void {
  captureTrustEvent(TRUSTHUB_EVENTS.PROFILE_SAVE_FAILED, {
    ...MY_TRUSTHUB_MOVE_SAVE_PROPERTIES,
    outcome: 'failure',
    failure_reason: failureReason,
  });
}

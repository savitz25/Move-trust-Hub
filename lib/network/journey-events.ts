/**
 * Network V2.1.1 — journey_handoff_click (Move).
 * Allowlisted fields only. Never blocks navigation. The handoff is not sent to a tag.
 */

export type JourneyHubId =
  | 'ask'
  | 'move'
  | 'lender'
  | 'insurance'
  | 'contractor'
  | 'senior'
  | 'investor';

const HUBS = new Set<string>([
  'ask',
  'move',
  'lender',
  'insurance',
  'contractor',
  'senior',
  'investor',
]);

const FORBIDDEN = new Set([
  'name',
  'email',
  'phone',
  'address',
  'ssn',
  'account',
  'member',
  'diagnosis',
  'holdings',
  'href',
  'url',
]);

export type MoveJourneyHandoff = {
  destination_hub: JourneyHubId;
  surface: 'move_destination' | 'move_plan_completion';
  journey_id: string;
  context_type: string;
  intent?: string;
  state?: string;
};

export function trackJourneyHandoff(params: MoveJourneyHandoff): void {
  if (typeof window === 'undefined') return;
  if (!HUBS.has(params.destination_hub)) return;
  const payload: Record<string, string> = {
    source_hub: 'move',
    destination_hub: params.destination_hub,
    from_hub: 'move',
    to_hub: params.destination_hub,
    surface: params.surface,
    journey_id: params.journey_id,
    context_type: params.context_type,
  };
  if (params.intent === 'buy' || params.intent === 'rent' || params.intent === 'refi') {
    payload.intent = params.intent;
  }
  if (params.state && /^[A-Za-z]{2}$/.test(params.state)) {
    payload.state = params.state.toUpperCase();
  }
  for (const key of Object.keys(payload)) {
    if (FORBIDDEN.has(key)) return;
  }
  void payload;
}

export function isForbiddenAnalyticsKey(key: string): boolean {
  return FORBIDDEN.has(key.toLowerCase());
}

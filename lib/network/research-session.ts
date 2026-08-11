/**
 * Stage B.1 — Research session continuity (non-PII, first-party, origin-local).
 *
 * Cross-domain continuity still depends on Stage A′ URL params.
 * This store is for return visits on Move and prefill of handoff intent.
 */

import type { JourneyIntent, MoveJourneyGeo } from '@/lib/network/journey-context';

export const RESEARCH_SESSION_KEY = 'ath:research-session:v1';
export const RESEARCH_SESSION_VERSION = 1 as const;

const MAX_AGE_MS = 90 * 24 * 60 * 60 * 1000;

export type ResearchSession = {
  version: typeof RESEARCH_SESSION_VERSION;
  src?: 'move' | 'lender' | 'insurance' | 'ask';
  journey?: 'relocate' | 'purchase' | 'refi' | 'coverage';
  state?: string;
  county?: string;
  intent?: JourneyIntent | 'refi';
  housing?: 'owner' | 'renter';
  updatedAt: string;
};

const SRC_SET = new Set(['move', 'lender', 'insurance', 'ask']);
const JOURNEY_SET = new Set(['relocate', 'purchase', 'refi', 'coverage']);
const INTENT_SET = new Set(['buy', 'rent', 'refi', 'unknown']);
const HOUSING_SET = new Set(['owner', 'renter']);

function isBrowser(): boolean {
  return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
}

function sanitizeSession(raw: unknown): ResearchSession | null {
  if (!raw || typeof raw !== 'object') return null;
  const o = raw as Record<string, unknown>;
  if (o.version !== RESEARCH_SESSION_VERSION) return null;
  if (typeof o.updatedAt !== 'string') return null;
  const updated = Date.parse(o.updatedAt);
  if (!Number.isFinite(updated) || Date.now() - updated > MAX_AGE_MS) return null;

  const src =
    typeof o.src === 'string' && SRC_SET.has(o.src)
      ? (o.src as ResearchSession['src'])
      : undefined;
  const journey =
    typeof o.journey === 'string' && JOURNEY_SET.has(o.journey)
      ? (o.journey as ResearchSession['journey'])
      : undefined;
  const intent =
    typeof o.intent === 'string' && INTENT_SET.has(o.intent)
      ? (o.intent as ResearchSession['intent'])
      : undefined;
  const housing =
    typeof o.housing === 'string' && HOUSING_SET.has(o.housing)
      ? (o.housing as ResearchSession['housing'])
      : undefined;

  let state: string | undefined;
  if (typeof o.state === 'string' && o.state.trim()) {
    state = o.state.trim().slice(0, 32);
  }

  let county: string | undefined;
  if (typeof o.county === 'string' && o.county.trim()) {
    county = o.county
      .toLowerCase()
      .replace(/[^a-z0-9-]+/g, '-')
      .replace(/^-|-$/g, '')
      .slice(0, 80);
    if (!county) county = undefined;
  }

  const session: ResearchSession = {
    version: RESEARCH_SESSION_VERSION,
    updatedAt: o.updatedAt,
    src,
    journey,
    state,
    county,
    intent,
    housing,
  };

  if (!session.state && !session.county && !session.intent && !session.journey && !session.src) {
    return null;
  }
  return session;
}

export function loadResearchSession(): ResearchSession | null {
  if (!isBrowser()) return null;
  try {
    const raw = localStorage.getItem(RESEARCH_SESSION_KEY);
    if (!raw) return null;
    return sanitizeSession(JSON.parse(raw));
  } catch {
    return null;
  }
}

export function saveResearchSession(patch: Partial<ResearchSession>): ResearchSession | null {
  if (!isBrowser()) return null;
  try {
    const existing = loadResearchSession();
    const next: ResearchSession = {
      version: RESEARCH_SESSION_VERSION,
      updatedAt: new Date().toISOString(),
      src: patch.src ?? existing?.src ?? 'move',
      journey: patch.journey ?? existing?.journey ?? 'relocate',
      state: patch.state ?? existing?.state,
      county: patch.county ?? existing?.county,
      intent: patch.intent ?? existing?.intent,
      housing: patch.housing ?? existing?.housing,
    };
    const cleaned = sanitizeSession(next);
    const toStore = cleaned ?? next;
    localStorage.setItem(RESEARCH_SESSION_KEY, JSON.stringify(toStore));
    return toStore;
  } catch {
    return null;
  }
}

/** Write destination + optional intent from a Move journey surface. */
export function writeMoveResearchSession(
  geo: MoveJourneyGeo,
  intent: JourneyIntent = 'unknown'
): ResearchSession | null {
  return saveResearchSession({
    src: 'move',
    journey: 'relocate',
    state: geo.stateCode,
    county: geo.countySlug,
    intent: intent === 'unknown' ? undefined : intent,
    housing: intent === 'buy' ? 'owner' : intent === 'rent' ? 'renter' : undefined,
  });
}

export function clearResearchSession(): void {
  if (!isBrowser()) return;
  try {
    localStorage.removeItem(RESEARCH_SESSION_KEY);
  } catch {
    /* ignore */
  }
}

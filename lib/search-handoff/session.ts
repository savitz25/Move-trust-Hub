/** Session-scoped Ask handoff context (no PII). Used for profile back-to-results. */

import type { MoveAskSearchContext } from './allowlist';
import { parseAskSearchHandoff, serializeAskSearchHandoff } from './parse';

export const ASK_HANDOFF_SESSION_KEY = 'mth:ask-search-handoff';

export function persistAskHandoffContext(ctx: MoveAskSearchContext | null): void {
  if (typeof window === 'undefined') return;
  try {
    if (!ctx) {
      window.sessionStorage.removeItem(ASK_HANDOFF_SESSION_KEY);
      return;
    }
    window.sessionStorage.setItem(ASK_HANDOFF_SESSION_KEY, serializeAskSearchHandoff(ctx));
  } catch {
    /* private mode */
  }
}

export function readAskHandoffContext(): MoveAskSearchContext | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.sessionStorage.getItem(ASK_HANDOFF_SESSION_KEY);
    if (!raw) return null;
    return parseAskSearchHandoff(raw);
  } catch {
    return null;
  }
}

export function analyticsFromAskHandoff(
  ctx: MoveAskSearchContext,
  extra?: { handoff_type?: 'entity' | 'view_more'; match_precision?: string }
) {
  return {
    source: 'ask' as const,
    handoff_type: extra?.handoff_type,
    entity_type: ctx.entityType,
    category: ctx.category,
    state: ctx.state,
    county: ctx.county,
    city: ctx.city,
    zip: ctx.zip,
    match_precision: extra?.match_precision,
  };
}

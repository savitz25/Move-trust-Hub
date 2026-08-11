/**
 * Phase 2 — compact quote-check summary in device storage (guest-friendly).
 * Does not store raw pasted estimate text.
 */

export type QuoteCheckSavedSummary = {
  id: string;
  savedAt: string;
  estimateType: string;
  estimateTypeLabel: string;
  summaryHeadline: string;
  findingIds: string[];
  findingTitles: string[];
  usdot?: string;
  companyName?: string;
  estimatedTotal?: string;
  depositAmount?: string;
  matchedProfileSlug?: string;
  toolPath: string;
};

const KEY = 'mth-quote-check-summaries-v1';
const MAX = 12;

function read(): QuoteCheckSavedSummary[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (r): r is QuoteCheckSavedSummary =>
        Boolean(r && typeof r === 'object' && typeof (r as QuoteCheckSavedSummary).id === 'string')
    );
  } catch {
    return [];
  }
}

function write(rows: QuoteCheckSavedSummary[]) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(KEY, JSON.stringify(rows.slice(0, MAX)));
  } catch {
    /* private mode */
  }
}

export function listQuoteCheckSummaries(): QuoteCheckSavedSummary[] {
  return read().sort((a, b) => b.savedAt.localeCompare(a.savedAt));
}

export function saveQuoteCheckSummary(
  input: Omit<QuoteCheckSavedSummary, 'id' | 'savedAt' | 'toolPath'> & {
    toolPath?: string;
  }
): QuoteCheckSavedSummary {
  const row: QuoteCheckSavedSummary = {
    ...input,
    id: `qc_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`,
    savedAt: new Date().toISOString(),
    toolPath: input.toolPath ?? '/tools/move-quote-check',
  };
  const next = [row, ...read().filter((r) => r.id !== row.id)];
  write(next);
  return row;
}

export function clearQuoteCheckSummaries(): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(KEY);
  } catch {
    /* ignore */
  }
}

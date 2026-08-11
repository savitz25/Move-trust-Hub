/**
 * Optional compact save of a two-estimate comparison (device-local).
 */

export type SavedCompareSummary = {
  id: string;
  savedAt: string;
  companyA: string;
  companyB: string;
  priceA?: string;
  priceB?: string;
  calloutTitles: string[];
  toolPath: string;
};

const KEY = 'mth-quote-check-compare-summaries-v1';
const MAX = 8;

function read(): SavedCompareSummary[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const p = JSON.parse(raw) as unknown;
    if (!Array.isArray(p)) return [];
    return p.filter(
      (r): r is SavedCompareSummary =>
        Boolean(r && typeof r === 'object' && typeof (r as SavedCompareSummary).id === 'string')
    );
  } catch {
    return [];
  }
}

export function saveCompareSummary(
  input: Omit<SavedCompareSummary, 'id' | 'savedAt' | 'toolPath'>
): SavedCompareSummary {
  const row: SavedCompareSummary = {
    ...input,
    id: `qcc_${Date.now().toString(36)}`,
    savedAt: new Date().toISOString(),
    toolPath: '/tools/move-quote-check/compare',
  };
  try {
    localStorage.setItem(KEY, JSON.stringify([row, ...read()].slice(0, MAX)));
  } catch {
    /* ignore */
  }
  return row;
}

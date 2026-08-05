/**
 * Device-local mover shortlist — works for guests and as cloud soft-fallback.
 * Key is stable; HQ and SaveMoverButton both read/write this.
 */

export type LocalSavedMover = {
  companySlug: string;
  companyName: string;
  notes?: string | null;
  savedAt: string;
};

const STORAGE_KEY = 'mth-local-saved-movers';

function readRaw(): LocalSavedMover[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (row): row is LocalSavedMover =>
        Boolean(row && typeof row === 'object' && typeof (row as LocalSavedMover).companySlug === 'string')
    );
  } catch {
    return [];
  }
}

function writeRaw(rows: LocalSavedMover[]) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(rows));
  } catch {
    // private mode / quota
  }
}

export function listLocalSavedMovers(): LocalSavedMover[] {
  return readRaw().sort((a, b) => b.savedAt.localeCompare(a.savedAt));
}

export function getLocalSavedMoverSlugs(): string[] {
  return readRaw().map((r) => r.companySlug);
}

export function isLocalMoverSaved(companySlug: string): boolean {
  return readRaw().some((r) => r.companySlug === companySlug);
}

export function addLocalSavedMover(input: {
  companySlug: string;
  companyName: string;
  notes?: string | null;
}): LocalSavedMover {
  const rows = readRaw().filter((r) => r.companySlug !== input.companySlug);
  const row: LocalSavedMover = {
    companySlug: input.companySlug,
    companyName: input.companyName.trim() || input.companySlug,
    notes: input.notes ?? null,
    savedAt: new Date().toISOString(),
  };
  writeRaw([row, ...rows]);
  return row;
}

export function removeLocalSavedMover(companySlug: string): void {
  writeRaw(readRaw().filter((r) => r.companySlug !== companySlug));
}

export function clearLocalSavedMovers(): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
}

/** Profile-only local projection. Never serialize notes, names, tools or the workspace. */
export const PROJECTION_VERSION = 'move-profile-selection/1';
export type LocalSelection = { companySlug: string; savedAt: string; revision: string; digest: string };
export function projection(slug: string, savedAt: string): string {
  return JSON.stringify([PROJECTION_VERSION, slug, savedAt]);
}
export function isSelection(value: unknown): value is LocalSelection[] {
  return Array.isArray(value) && value.length > 0 && value.length <= 50 &&
    value.every(row => row && typeof row === 'object' && !Array.isArray(row) &&
      Object.keys(row).length === 4 && Object.keys(row).every(k => ['companySlug','savedAt','revision','digest'].includes(k)) &&
      typeof row.companySlug === 'string' && /^[A-Za-z0-9][A-Za-z0-9_-]{0,159}$/.test(row.companySlug) &&
      typeof row.savedAt === 'string' && row.savedAt.length <= 40 && Number.isFinite(Date.parse(row.savedAt)) &&
      typeof row.digest === 'string' && /^[a-f0-9]{64}$/.test(row.digest) && row.revision === row.digest) &&
    new Set(value.map(row=>row.companySlug)).size === value.length;
}

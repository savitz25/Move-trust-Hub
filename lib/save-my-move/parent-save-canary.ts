/**
 * Single source for the reviewed Move parent-save canary.
 * Production still reads NEXT_PUBLIC_MOVE_PARENT_SAVE_CANARY_SLUGS.
 * Adding a slug here does not widen Production. That widening is a Founder GO.
 */
export const PARENT_SAVE_CANARY_SLUGS = [
  'hindman-isaacs-moving-storage-inc',
  'gentle-giant-moving',
  'caraway-moving-inc',
] as const;

export type ParentSaveCanarySlug = (typeof PARENT_SAVE_CANARY_SLUGS)[number];

export function isParentSaveCanarySlug(slug: string): boolean {
  return (PARENT_SAVE_CANARY_SLUGS as readonly string[]).includes(slug);
}

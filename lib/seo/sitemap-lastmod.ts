/** Sitemap lastmod from a row timestamp. Missing or invalid values are omitted. */

export function rowLastModified(value: string | null | undefined): Date | undefined {
  if (!value || !value.trim()) return undefined;
  const parsed = Date.parse(value);
  if (Number.isNaN(parsed)) return undefined;
  return new Date(parsed);
}

export function latestRowLastModified(
  values: Array<string | null | undefined>
): Date | undefined {
  let max = Number.NEGATIVE_INFINITY;
  for (const value of values) {
    const date = rowLastModified(value);
    if (!date) continue;
    const time = date.getTime();
    if (time > max) max = time;
  }
  return Number.isFinite(max) ? new Date(max) : undefined;
}

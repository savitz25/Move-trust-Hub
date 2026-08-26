export function formatIntelNumber(value: number | null, timedOut: boolean): string {
  if (timedOut || value === null || !Number.isFinite(value)) return '—';
  return new Intl.NumberFormat('en-US').format(value);
}

export function formatAsOf(iso: string | null): string | null {
  if (!iso) return null;
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return null;
  return d.toISOString().slice(0, 10);
}

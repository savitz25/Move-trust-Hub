/**
 * Visible when Supabase approved-mover load failed and the page is catalog-only.
 * Prevents silent “everything looks fine” seed regressions.
 */
export function DirectoryDegradedBanner({ show }: { show: boolean }) {
  if (!show) return null;
  return (
    <div
      role="status"
      className="mb-4 rounded-lg border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-950 dark:border-amber-700 dark:bg-amber-950/40 dark:text-amber-100"
    >
      <p className="font-medium">Directory temporarily limited</p>
      <p className="mt-1 text-amber-900/90 dark:text-amber-100/90">
        Live onboarded movers could not be loaded from the directory database.
        Showing curated catalog listings only — counts may look uniform across
        counties until the connection recovers.
      </p>
    </div>
  );
}

import { Clock } from 'lucide-react';

/**
 * Absolute calendar date only (UTC) — avoids SSR/client timezone and
 * Date.now() relative-time hydration mismatches (React #418).
 */
function formatCheckedAt(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  });
}

export function FmcsaLastVerified({
  checkedAt,
  className,
}: {
  checkedAt?: string | null;
  className?: string;
}) {
  if (!checkedAt) {
    return (
      <p className={`text-xs text-muted-foreground ${className ?? ''}`}>
        FMCSA data not yet refreshed
      </p>
    );
  }

  const formatted = formatCheckedAt(checkedAt);

  return (
    <p className={`text-xs text-muted-foreground flex items-center gap-1 ${className ?? ''}`}>
      <Clock className="h-3.5 w-3.5" aria-hidden="true" />
      Last verified {formatted} (UTC)
    </p>
  );
}

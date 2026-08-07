import { Clock } from 'lucide-react';

/** Absolute UTC calendar date — hydration-safe (no Date.now() relative text). */
function formatCheckedAt(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  });
}

export function BbbLastVerified({
  checkedAt,
  className,
}: {
  checkedAt?: string | null;
  className?: string;
}) {
  if (!checkedAt) {
    return (
      <p className={`text-xs text-muted-foreground ${className ?? ''}`}>
        BBB data not yet refreshed
      </p>
    );
  }

  const formatted = formatCheckedAt(checkedAt);

  return (
    <p className={`text-xs text-muted-foreground flex items-center gap-1 ${className ?? ''}`}>
      <Clock className="h-3.5 w-3.5" aria-hidden="true" />
      BBB last verified {formatted} (UTC)
    </p>
  );
}

import type { CountyMovingSnapshot } from '@/lib/local-movers/county-moving-snapshot';

export function CountyMovingSnapshotCard({
  countyLabel,
  snapshot,
}: {
  countyLabel: string;
  snapshot: CountyMovingSnapshot;
}) {
  const rows: Array<{ label: string; value: string }> = [
    { label: 'Primary markets', value: snapshot.primaryMarkets },
    { label: 'Move profile', value: snapshot.moveProfile },
    { label: 'Peak season', value: snapshot.peakSeason },
    { label: 'Key challenges', value: snapshot.keyChallenges },
    { label: 'Major corridors', value: snapshot.majorCorridors },
    { label: 'Popular destinations', value: snapshot.popularDestinations },
  ];

  return (
    <section
      className="mt-5 rounded-2xl border bg-muted/20 p-4 sm:p-5"
      aria-labelledby="county-moving-snapshot-heading"
    >
      <h2
        id="county-moving-snapshot-heading"
        className="text-sm font-semibold tracking-tight text-foreground mb-3"
      >
        {countyLabel} moving snapshot
      </h2>
      <dl className="grid sm:grid-cols-2 gap-x-4 gap-y-2.5 text-sm">
        {rows.map((row) => (
          <div key={row.label} className="min-w-0">
            <dt className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              {row.label}
            </dt>
            <dd className="text-muted-foreground leading-snug mt-0.5">{row.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

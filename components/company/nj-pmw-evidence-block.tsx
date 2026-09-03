import { selectNjPmwProfileEvidence } from '@/lib/state-hhg/nj/publication';

/**
 * New Jersey PMW authority / regulatory evidence.
 * Renders only for exact or approved deterministic identity.
 * This snapshot has no production-approved attachments.
 */
export function NjPmwEvidenceBlock({
  usdot,
  njLicenseNumber,
  legalName,
  city,
}: {
  usdot?: string | null;
  njLicenseNumber?: string | null;
  legalName?: string | null;
  city?: string | null;
}) {
  const evidence = selectNjPmwProfileEvidence({ usdot, njLicenseNumber, legalName, city });
  if (!evidence.render) return null;
  return (
    <section className="mb-6 rounded-2xl border border-border px-4 py-4" aria-labelledby="nj-pmw-evidence">
      <h2 id="nj-pmw-evidence" className="text-base font-semibold">
        New Jersey authority
      </h2>
      <p className="mt-2 text-sm text-muted-foreground">
        Shown only with an exact NJ license or official USDOT/MC crosswalk. This is not an NJ
        licensed badge.
      </p>
      <ul className="mt-3 list-disc pl-5 text-sm">
        {evidence.attachments.map((row) => (
          <li key={row.label}>
            <strong>{row.label}</strong> — {row.detail}
          </li>
        ))}
      </ul>
    </section>
  );
}

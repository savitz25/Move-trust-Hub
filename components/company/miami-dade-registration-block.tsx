import { Landmark } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  MDC_SOURCE_LOOKUP_URL,
  MDC_VERIFICATION_COPY,
  miamiDadeRegistrationBlockHeading,
  type MiamiDadePublishedRegistration,
} from '@/lib/county-regulatory/mdc/public-read';
import { cn } from '@/lib/utils';

export type MiamiDadeRegistrationBlockProps = {
  registrations: MiamiDadePublishedRegistration[];
  className?: string;
};

/**
 * Miami-Dade Moving Business Registration(s) evidence. Not an endorsement.
 * Only mount when fail-closed public-read returns PUBLISHED rows for a public company.
 * Plural heading when multiple current registrations are present.
 * HOLD_FROM_STRUCTURED_DATA_V1 — not emitted into JSON-LD / OG.
 */
export function MiamiDadeRegistrationBlock({
  registrations,
  className,
}: MiamiDadeRegistrationBlockProps) {
  if (!registrations.length) return null;

  const heading = miamiDadeRegistrationBlockHeading(registrations);

  return (
    <Card className={cn('mb-6 border-primary/20', className)}>
      <CardHeader className="pb-2 px-4 sm:px-6">
        <CardTitle className="text-base flex items-center gap-2">
          <Landmark className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
          <span>{heading}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 px-4 sm:px-6 text-sm break-words">
        {registrations.map((r) => (
          <section
            key={r.credentialNumber}
            className="space-y-3"
            aria-label={`Miami-Dade moving business registration ${r.credentialNumber}`}
          >
            <dl className="grid gap-2 sm:grid-cols-2">
              <div className="min-w-0">
                <dt className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                  Regulator
                </dt>
                <dd className="font-medium leading-snug break-words">{r.regulator}</dd>
              </div>
              <div className="min-w-0">
                <dt className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                  Registration number
                </dt>
                <dd className="font-medium font-mono tracking-wide">
                  <span className="sr-only">Miami-Dade registration number </span>
                  {r.credentialNumber}
                </dd>
              </div>
              <div className="min-w-0">
                <dt className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                  Credential type
                </dt>
                <dd>{r.credentialType}</dd>
              </div>
              <div className="min-w-0">
                <dt className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                  Status
                </dt>
                <dd>
                  <span className="sr-only">Registration status: </span>
                  {r.statusPublicLabel}
                </dd>
              </div>
            </dl>
            <p className="leading-relaxed text-muted-foreground">
              {MDC_VERIFICATION_COPY} Source:{' '}
              <a
                href={MDC_SOURCE_LOOKUP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2 hover:text-foreground"
              >
                Miami-Dade County official records
              </a>
              {' '}({r.regulator}).
            </p>
            <p className="leading-relaxed text-muted-foreground">
              County registration status is separate from Florida FDACS household goods
              authority, federal FMCSA/USDOT authority, and Miami-Dade Local Business Tax
              receipts.
            </p>
            {r.retrievedAt ? (
              <p className="text-xs text-muted-foreground">
                Source retrieval: {new Date(r.retrievedAt).toISOString().slice(0, 10)}
              </p>
            ) : null}
            <p className="text-xs text-muted-foreground">{r.disclaimer}</p>
          </section>
        ))}
      </CardContent>
    </Card>
  );
}

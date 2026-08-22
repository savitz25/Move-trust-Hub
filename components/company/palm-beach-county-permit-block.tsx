import { Landmark } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  PBC_SOURCE_LOOKUP_URL,
  type PalmBeachPublishedPermit,
} from '@/lib/county-regulatory/pbc/public-read';
import { cn } from '@/lib/utils';

export type PalmBeachCountyPermitBlockProps = {
  permits: PalmBeachPublishedPermit[];
  className?: string;
};

/**
 * Palm Beach County Moving Permit evidence. Not an endorsement.
 * Only mount when fail-closed public-read returns PUBLISHED rows for a public company.
 */
export function PalmBeachCountyPermitBlock({
  permits,
  className,
}: PalmBeachCountyPermitBlockProps) {
  if (!permits.length) return null;

  return (
    <Card className={cn('mb-6 border-primary/20', className)}>
      <CardHeader className="pb-2 px-4 sm:px-6">
        <CardTitle className="text-base flex items-center gap-2">
          <Landmark className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
          <span>Palm Beach County Moving Permit</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 px-4 sm:px-6 text-sm break-words">
        {permits.map((p) => (
          <section
            key={p.credentialNumber}
            className="space-y-3"
            aria-label={`Palm Beach County moving permit ${p.credentialNumber}`}
          >
            <dl className="grid gap-2 sm:grid-cols-2">
              <div className="min-w-0">
                <dt className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                  Regulator
                </dt>
                <dd className="font-medium leading-snug break-words">{p.regulator}</dd>
              </div>
              <div className="min-w-0">
                <dt className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                  Permit number
                </dt>
                <dd className="font-medium font-mono tracking-wide">
                  <span className="sr-only">Palm Beach County permit number </span>
                  {p.credentialNumber}
                </dd>
              </div>
              <div className="min-w-0">
                <dt className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                  Credential type
                </dt>
                <dd>County moving-business permit</dd>
              </div>
              <div className="min-w-0">
                <dt className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                  Status
                </dt>
                <dd>
                  <span className="sr-only">Permit status: </span>
                  {p.statusPublicLabel}
                </dd>
              </div>
            </dl>
            <p className="leading-relaxed text-muted-foreground">
              Permit information verified against Palm Beach County records. Source:{' '}
              <a
                href={PBC_SOURCE_LOOKUP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2 hover:text-foreground"
              >
                Palm Beach County licensed moving companies lookup
              </a>
              {' '}({p.regulator}).
            </p>
            <p className="leading-relaxed text-muted-foreground">
              County permit status is separate from Florida FDACS household goods
              authority and federal FMCSA/USDOT authority.
            </p>
            {p.retrievedAt ? (
              <p className="text-xs text-muted-foreground">
                Source retrieval: {new Date(p.retrievedAt).toISOString().slice(0, 10)}
              </p>
            ) : null}
            <p className="text-xs text-muted-foreground">
              Regulatory record verification is not a MoveTrustHub endorsement.
            </p>
          </section>
        ))}
      </CardContent>
    </Card>
  );
}

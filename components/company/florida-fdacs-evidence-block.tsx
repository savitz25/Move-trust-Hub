import { Shield } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  FL_FDACS_ADDRESS_SOURCE_LABEL,
  FL_FDACS_EMAIL_SOURCE_LABEL,
  FL_FDACS_PHONE_SOURCE_LABEL,
  floridaFdacsEvidenceBlock,
} from '@/lib/state-hhg/fl/profile-presentation';
import { cn } from '@/lib/utils';

export type FloridaFdacsEvidenceBlockProps = {
  authorityNumber: string;
  status: string;
  source?: string | null;
  retrievedAt?: string | null;
  federalCopy: string;
  phone?: string | null;
  email?: string | null;
  address?: string | null;
  className?: string;
};

/**
 * Florida FDACS registration evidence. Not an endorsement.
 * Only mount for FL_STATE_WAVE_1 PUBLISHABLE profiles (not KEEP_80 canary).
 */
export function FloridaFdacsEvidenceBlock({
  authorityNumber,
  status,
  source,
  retrievedAt,
  federalCopy,
  phone,
  email,
  address,
  className,
}: FloridaFdacsEvidenceBlockProps) {
  const block = floridaFdacsEvidenceBlock({
    authorityNumber,
    status,
    source,
    retrievedAt,
  });
  return (
    <Card className={cn('mb-6 border-primary/20', className)}>
      <CardHeader className="pb-2 px-4 sm:px-6">
        <CardTitle className="text-base flex items-center gap-2">
          <Shield className="h-4 w-4 text-primary" aria-hidden />
          {block.headline}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 px-4 sm:px-6 text-sm">
        <dl className="grid gap-2 sm:grid-cols-2">
          <div className="min-w-0">
            <dt className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
              Regulator
            </dt>
            <dd className="font-medium leading-snug break-words">{block.regulator}</dd>
          </div>
          <div className="min-w-0">
            <dt className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
              Registration
            </dt>
            <dd className="font-medium font-mono tracking-wide">{block.registrationNumber}</dd>
          </div>
          <div className="min-w-0">
            <dt className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
              Credential type
            </dt>
            <dd>{block.registrationType}</dd>
          </div>
          <div className="min-w-0">
            <dt className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
              Status
            </dt>
            <dd>
              <span className="sr-only">Registration status: </span>
              {block.status}
            </dd>
          </div>
        </dl>
        <p className="leading-relaxed text-muted-foreground">{block.detail}</p>
        <p className="leading-relaxed text-muted-foreground">{block.scope}</p>
        <p className="text-xs leading-relaxed">{block.verificationWording}. {federalCopy}</p>
        {block.freshness ? (
          <p className="text-xs text-muted-foreground">Source retrieval: {block.freshness}</p>
        ) : null}
        <p className="text-xs text-muted-foreground">
          This is evidence of Florida registration, not a MoveTrustHub endorsement.
        </p>
        {phone || email || address ? (
          <ul className="text-xs text-muted-foreground space-y-1">
            {phone ? <li>{FL_FDACS_PHONE_SOURCE_LABEL}</li> : null}
            {email ? <li>{FL_FDACS_EMAIL_SOURCE_LABEL}</li> : null}
            {address ? <li>{FL_FDACS_ADDRESS_SOURCE_LABEL}</li> : null}
          </ul>
        ) : null}
      </CardContent>
    </Card>
  );
}

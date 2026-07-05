import { MapPin, Phone, ShieldCheck } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import type { FmcsaPreview } from '@/lib/verify-dot/fmcsa';

type Props = {
  preview: FmcsaPreview;
  displayNumber: string;
  inDirectory?: boolean;
};

export function FmcsaStructuredPreview({ preview, displayNumber, inDirectory = false }: Props) {
  return (
    <Card className="border-primary/20 bg-primary/5 p-5 sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <Badge variant="secondary" className="mb-2">
            {inDirectory
              ? 'Move Trust Hub Directory'
              : preview.source === 'fmcsa_api'
                ? 'FMCSA Verified Data'
                : 'Carrier Preview'}
          </Badge>
          <h2 className="text-xl font-semibold tracking-tight">{preview.legalName}</h2>
          {preview.dbaName ? (
            <p className="text-sm text-muted-foreground mt-1">DBA: {preview.dbaName}</p>
          ) : null}
        </div>
        {preview.safetyRating ? (
          <Badge
            variant={preview.safetyRating === 'Satisfactory' ? 'default' : 'outline'}
            className="shrink-0"
          >
            FMCSA: {preview.safetyRating}
          </Badge>
        ) : null}
      </div>

      <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
        {preview.usdot ? (
          <div>
            <dt className="text-xs text-muted-foreground">USDOT</dt>
            <dd className="font-medium">DOT {preview.usdot}</dd>
          </div>
        ) : null}
        {preview.mcNumber ? (
          <div>
            <dt className="text-xs text-muted-foreground">MC Number</dt>
            <dd className="font-medium">MC-{preview.mcNumber}</dd>
          </div>
        ) : null}
        {preview.physicalAddress ? (
          <div className="flex gap-2 sm:col-span-2">
            <MapPin className="h-4 w-4 shrink-0 text-muted-foreground mt-0.5" />
            <div>
              <dt className="text-xs text-muted-foreground">Headquarters</dt>
              <dd>{preview.physicalAddress}</dd>
            </div>
          </div>
        ) : null}
        {preview.phone ? (
          <div className="flex gap-2">
            <Phone className="h-4 w-4 shrink-0 text-muted-foreground mt-0.5" />
            <div>
              <dt className="text-xs text-muted-foreground">Phone</dt>
              <dd>{preview.phone}</dd>
            </div>
          </div>
        ) : null}
        {preview.authorityStatus ? (
          <div className="flex gap-2">
            <ShieldCheck className="h-4 w-4 shrink-0 text-muted-foreground mt-0.5" />
            <div>
              <dt className="text-xs text-muted-foreground">Authority status</dt>
              <dd>{preview.authorityStatus}</dd>
            </div>
          </div>
        ) : preview.allowedToOperate ? (
          <div className="flex gap-2">
            <ShieldCheck className="h-4 w-4 shrink-0 text-muted-foreground mt-0.5" />
            <div>
              <dt className="text-xs text-muted-foreground">Allowed to operate</dt>
              <dd>{preview.allowedToOperate === 'Y' ? 'Yes' : preview.allowedToOperate}</dd>
            </div>
          </div>
        ) : null}
      </dl>

      <p className="mt-4 text-xs text-muted-foreground">
        Structured data for <strong>{displayNumber}</strong> sourced from FMCSA. Licensing
        details can change — confirm on the official government site before booking.
      </p>
    </Card>
  );
}
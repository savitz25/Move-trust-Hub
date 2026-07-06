import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { FmcsaFieldGrid } from '@/components/suggestions/fmcsa-field-grid';
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
        {preview.usdotStatus ? (
          <Badge
            variant={preview.usdotStatus === 'ACTIVE' ? 'default' : 'outline'}
            className="shrink-0"
          >
            {preview.usdotStatus}
          </Badge>
        ) : preview.safetyRating ? (
          <Badge
            variant={preview.safetyRating === 'Satisfactory' ? 'default' : 'outline'}
            className="shrink-0"
          >
            FMCSA: {preview.safetyRating}
          </Badge>
        ) : null}
      </div>

      <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
        <FmcsaFieldGrid source={preview} skipIdentity />
      </dl>

      <p className="mt-4 text-xs text-muted-foreground">
        Structured data for <strong>{displayNumber}</strong> sourced from FMCSA. Licensing
        details can change — confirm on the official government site before booking.
      </p>
    </Card>
  );
}
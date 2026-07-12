import Link from 'next/link';
import { ExternalLink } from 'lucide-react';
import { LicenseDisplay } from '@/components/trust/license-display';
import { resolveEntityTypeForDisplay } from '@/lib/fmcsa/entity-type-display';
import {
  buildFmcsaSaferUrl,
  normalizeMc,
  normalizeUsdot,
} from '@/lib/trust/license-verification';
import type { Company } from '@/types';

type Props = {
  company: Pick<
    Company,
    | 'usdotNumber'
    | 'mcNumber'
    | 'entityType'
    | 'usdotStatus'
    | 'powerUnits'
    | 'services'
    | 'authorityActive'
    | 'outOfService'
  >;
  /** Optional raw FMCSA payload for display-time entity type resolution */
  fmcsaRaw?: Record<string, unknown> | null;
  className?: string;
};

function formatUsdot(value: string): string | null {
  const digits = normalizeUsdot(value);
  return digits ? `DOT ${digits}` : null;
}

function formatMc(value: string): string | null {
  const digits = normalizeMc(value);
  return digits ? `MC-${digits}` : null;
}

function formatUsdotStatus(status: Company['usdotStatus']): string | null {
  if (!status) return null;
  if (status === 'OUT OF SERVICE') return 'Out of Service';
  if (status === 'INACTIVE') return 'Inactive';
  return 'Active';
}

function formatAuthorityStatus(
  company: Pick<Company, 'authorityActive' | 'outOfService' | 'usdotStatus'>
): string | null {
  if (company.outOfService) return 'Out of Service';
  if (company.authorityActive === true) return 'Active';
  if (company.authorityActive === false) return 'Inactive';

  const usdotStatus = formatUsdotStatus(company.usdotStatus);
  if (usdotStatus) return usdotStatus;
  return null;
}

function hasFmcsaComplianceContext(
  company: Pick<
    Company,
    'usdotNumber' | 'mcNumber' | 'entityType' | 'usdotStatus' | 'authorityActive' | 'outOfService'
  >
): boolean {
  return Boolean(
    normalizeUsdot(company.usdotNumber) ||
      normalizeMc(company.mcNumber) ||
      company.entityType ||
      company.usdotStatus ||
      company.authorityActive != null ||
      company.outOfService
  );
}

export function FmcsaDotCompliance({ company, fmcsaRaw, className = '' }: Props) {
  const usdotLabel = formatUsdot(company.usdotNumber);
  const mcLabel = formatMc(company.mcNumber);
  const hasFmcsaContext = hasFmcsaComplianceContext(company);

  const entityTypeResolved = resolveEntityTypeForDisplay({
    entityType: company.entityType,
    fmcsaRaw,
    services: company.services,
  });
  const entityTypeDisplay =
    entityTypeResolved ?? (hasFmcsaContext ? 'Not available' : null);

  const rows: Array<{ label: string; value: string | null; mono?: boolean }> = [
    { label: 'US DOT Number', value: usdotLabel, mono: true },
    { label: 'MC Number', value: mcLabel, mono: true },
    { label: 'Entity Type', value: entityTypeDisplay },
    { label: 'US DOT Status', value: formatUsdotStatus(company.usdotStatus) },
    { label: 'Authority Status', value: formatAuthorityStatus(company) },
    {
      label: 'Power Units',
      value:
        company.powerUnits !== null && company.powerUnits !== undefined
          ? String(company.powerUnits)
          : null,
    },
  ].filter((row) => row.value);

  if (!rows.length) {
    return <LicenseDisplay company={company} className={className} />;
  }

  const usdot = normalizeUsdot(company.usdotNumber);
  const fmcsaUrl = usdot ? buildFmcsaSaferUrl(usdot) : null;

  return (
    <div className={className}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 text-sm">
        {rows.map((row) => (
          <div key={row.label}>
            <div className="text-muted-foreground text-xs">{row.label}</div>
            <div
              className={
                row.mono
                  ? 'font-mono text-lg'
                  : row.value === 'Not available'
                    ? 'font-medium text-muted-foreground'
                    : 'font-medium'
              }
            >
              {row.value}
            </div>
          </div>
        ))}
        {fmcsaUrl ? (
          <div className="sm:col-span-2">
            <Link
              href={fmcsaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
            >
              Verify on FMCSA SAFER
              <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </div>
        ) : null}
      </div>
    </div>
  );
}
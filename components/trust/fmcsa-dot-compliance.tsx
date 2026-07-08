import Link from 'next/link';
import { ExternalLink } from 'lucide-react';
import { LicenseDisplay } from '@/components/trust/license-display';
import {
  buildFmcsaSaferUrl,
  normalizeMc,
  normalizeUsdot,
} from '@/lib/trust/license-verification';
import type { Company } from '@/types';

type Props = {
  company: Pick<
    Company,
    'usdotNumber' | 'mcNumber' | 'entityType' | 'usdotStatus' | 'powerUnits'
  >;
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

export function FmcsaDotCompliance({ company, className = '' }: Props) {
  const rows = [
    { label: 'Entity Type', value: company.entityType ?? null },
    { label: 'US DOT Status', value: formatUsdotStatus(company.usdotStatus) },
    { label: 'US DOT Number', value: formatUsdot(company.usdotNumber) },
    { label: 'MC Number', value: formatMc(company.mcNumber) },
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
            <div className={row.label.includes('Number') ? 'font-mono text-lg' : 'font-medium'}>
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
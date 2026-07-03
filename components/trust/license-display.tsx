import Link from 'next/link';
import { AlertTriangle, ExternalLink } from 'lucide-react';
import {
  getLicenseDisplay,
  LICENSE_PENDING_MESSAGE,
} from '@/lib/trust/company-display-policy';
import type { Company } from '@/types';

type Props = {
  company: Pick<Company, 'usdotNumber' | 'mcNumber'>;
  layout?: 'grid' | 'inline';
  className?: string;
};

export function LicenseDisplay({ company, layout = 'grid', className = '' }: Props) {
  const display = getLicenseDisplay(company);

  if (display.status === 'verified') {
    const content = (
      <>
        <div>
          <div className="text-muted-foreground text-xs">USDOT Number</div>
          <div className="font-mono text-lg">{display.usdot}</div>
        </div>
        {display.mc ? (
          <div>
            <div className="text-muted-foreground text-xs">MC Number</div>
            <div className="font-mono text-lg">{display.mc}</div>
          </div>
        ) : null}
        {display.fmcsaUrl ? (
          <div className={layout === 'grid' ? 'md:col-span-2' : ''}>
            <Link
              href={display.fmcsaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
            >
              Verify on FMCSA SAFER
              <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </div>
        ) : null}
      </>
    );

    if (layout === 'inline') {
      return (
        <div className={`flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground ${className}`}>
          <span>
            <span className="font-medium text-foreground">USDOT:</span> {display.usdot}
          </span>
          {display.mc ? (
            <span>
              <span className="font-medium text-foreground">MC:</span> {display.mc}
            </span>
          ) : null}
        </div>
      );
    }

    return (
      <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 text-sm ${className}`}>
        {content}
      </div>
    );
  }

  if (display.status === 'marketplace') {
    return (
      <div
        className={`rounded-md border border-amber-200/70 bg-amber-50/50 p-4 text-sm text-muted-foreground ${className}`}
      >
        <p className="font-medium text-foreground mb-1">Marketplace listing</p>
        <p>{display.marketplaceNote}</p>
      </div>
    );
  }

  return (
    <div
      className={`rounded-md border border-amber-200/70 bg-amber-50/50 p-4 text-sm ${className}`}
      role="status"
    >
      <p className="font-medium text-foreground inline-flex items-center gap-1.5">
        <AlertTriangle className="h-4 w-4 text-amber-600" aria-hidden="true" />
        {display.pendingMessage ?? LICENSE_PENDING_MESSAGE}
      </p>
      <p className="text-muted-foreground mt-1">
        Confirm USDOT and MC authority directly on{' '}
        <Link
          href="https://www.fmcsa.dot.gov/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:underline"
        >
          FMCSA.gov
        </Link>{' '}
        before booking.
      </p>
    </div>
  );
}

export function LicenseMetadataDescription(
  company: Pick<Company, 'usdotNumber' | 'mcNumber' | 'name'>
): string {
  const display = getLicenseDisplay(company);
  if (display.status === 'verified' && display.usdot) {
    return `USDOT ${display.usdot}.`;
  }
  if (display.status === 'marketplace') {
    return 'Online vehicle transport marketplace.';
  }
  return 'Licensing details pending verification.';
}
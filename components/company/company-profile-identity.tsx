import Link from 'next/link';
import { Building2, MapPin } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CompanyTypeBadges } from '@/components/company/company-type-badges';
import { parseHeadquarters } from '@/lib/local-movers/parse-headquarters';
import type { Company } from '@/types';

/**
 * Phase 4 — clear identity block for research profiles.
 * Does not invent missing regulatory fields.
 */
export function CompanyProfileIdentity({ company }: { company: Company }) {
  const hq = parseHeadquarters(company.headquarters);
  const legal =
    company.fmcsaLegalName?.trim() &&
    company.fmcsaLegalName.trim().toLowerCase() !== company.name.trim().toLowerCase()
      ? company.fmcsaLegalName.trim()
      : null;

  const rows: Array<{ label: string; value: string }> = [];
  if (legal) rows.push({ label: 'Legal name (FMCSA)', value: legal });
  rows.push({ label: 'Display name', value: company.name });
  if (company.usdotNumber?.trim()) {
    rows.push({ label: 'USDOT', value: company.usdotNumber.trim() });
  }
  if (company.mcNumber?.trim()) {
    rows.push({ label: 'MC', value: company.mcNumber.trim() });
  }
  if (hq.city || hq.stateCode) {
    rows.push({
      label: 'HQ locality',
      value: [hq.city, hq.stateCode].filter(Boolean).join(', '),
    });
  } else if (company.headquarters?.trim() && !hq.cityQuarantined) {
    rows.push({ label: 'Headquarters', value: company.headquarters.trim() });
  }
  if (company.physicalAddress?.trim()) {
    rows.push({ label: 'Physical address', value: company.physicalAddress.trim() });
  }
  if (company.serviceScope === 'intrastate') {
    rows.push({ label: 'Service scope', value: 'Local / in-state (intrastate)' });
  } else if (company.serviceScope === 'interstate') {
    rows.push({ label: 'Service scope', value: 'Interstate-capable listing' });
  }

  return (
    <Card className="mb-6 border-primary/15">
      <CardHeader className="pb-2 px-4 sm:px-6">
        <CardTitle className="text-base flex items-center gap-2">
          <Building2 className="h-4 w-4 text-primary" aria-hidden />
          Company identity
        </CardTitle>
        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
          Public research identity from directory records and FMCSA-oriented fields. Confirm every
          license number on official sources before you book.
        </p>
      </CardHeader>
      <CardContent className="space-y-4 px-4 sm:px-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-medium text-muted-foreground">Entity type:</span>
          <CompanyTypeBadges company={company} size="default" />
        </div>
        <dl className="grid gap-2 sm:grid-cols-2 text-sm">
          {rows.map((row) => (
            <div
              key={row.label}
              className="rounded-lg border bg-muted/20 px-3 py-2.5 flex flex-col gap-0.5 min-w-0"
            >
              <dt className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                {row.label}
              </dt>
              <dd className="font-medium text-foreground break-words leading-snug">{row.value}</dd>
            </div>
          ))}
        </dl>
        {!company.usdotNumber?.trim() && company.serviceScope !== 'intrastate' ? (
          <p className="text-xs text-amber-900 dark:text-amber-100 rounded-md border border-amber-200/80 bg-amber-50/60 px-3 py-2">
            No USDOT on this profile yet — treat licensing as incomplete and re-check FMCSA SAFER
            before deposits.
          </p>
        ) : null}
        {hq.cityQuarantined ? (
          <p className="text-xs text-muted-foreground flex items-start gap-1.5">
            <MapPin className="h-3.5 w-3.5 shrink-0 mt-0.5" aria-hidden />
            HQ locality could not be parsed cleanly from the stored address string (street/suite
            fragments are not shown as city).
          </p>
        ) : null}
        <p className="text-xs sm:text-sm rounded-lg border border-primary/20 bg-primary/5 px-3 py-2.5 leading-relaxed">
          Already have a quote from this company?{' '}
          <Link
            href="/tools/move-quote-check"
            className="font-semibold text-primary underline-offset-2 hover:underline"
          >
            Run Move Quote Check
          </Link>{' '}
          before you sign or pay a deposit — research only, no lead form.
        </p>
      </CardContent>
    </Card>
  );
}

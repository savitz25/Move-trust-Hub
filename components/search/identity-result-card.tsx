import Link from 'next/link';
import type { Company } from '@/types';
import { authorityStatusLabel, matchCompanyIdentity, roleLabel } from '@/lib/search/match';
import { normalizeSearchText } from '@/lib/search/normalize';

export function IdentityResultCard({
  company,
  query,
  href,
}: {
  company: Company;
  query: string;
  href: string;
}) {
  const legal = (company.fmcsaLegalName ?? '').trim();
  const showLegal = legal && normalizeSearchText(legal) !== normalizeSearchText(company.name);
  const match = matchCompanyIdentity(company, query);
  const role = roleLabel(company);
  const authority = authorityStatusLabel(company);

  return (
    <article className="rounded-xl border border-border/80 bg-white p-4 shadow-sm">
      <Link href={href} className="block no-underline">
        <h3 className="text-base font-semibold tracking-tight text-[#0A2540]">{company.name}</h3>
        {showLegal ? (
          <p className="mt-1 text-sm text-muted-foreground">Legal: {legal}</p>
        ) : null}
        <p className="mt-1 text-sm text-[#1E293B]">{company.headquarters}</p>
        <p className="mt-2 text-sm tabular-nums text-[#1E293B]">
          {company.usdotNumber ? `USDOT ${company.usdotNumber}` : 'USDOT not recorded'}
          {company.mcNumber ? ` · MC ${company.mcNumber}` : ''}
        </p>
        <p className="mt-2 text-sm text-[#1E293B]">
          {role}
          {authority ? ` · ${authority}` : ''}
        </p>
        {match ? (
          <p className="mt-2 text-xs font-medium text-primary">{match.explanation}</p>
        ) : null}
      </Link>
    </article>
  );
}

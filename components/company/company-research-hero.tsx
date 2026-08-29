import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { CopyIdentifierButton } from '@/components/company/copy-identifier-button';
import { ProfileResearchAnalytics } from '@/components/company/profile-research-analytics';
import { SaveMoverButton } from '@/components/save-my-move/save-mover-button';
import { buildCompaniesSearchHref, buildVerifyDotHref } from '@/lib/directory/verify-dot-link';
import {
  RESEARCH_LIMITATIONS,
  authorityLabel,
  evidenceSummary,
  formatObservedRefresh,
  namesDiffer,
  researchRole,
  roleExplanation,
} from '@/lib/company/research-profile';
import type { Company } from '@/types';

export function CompanyResearchHero({
  company,
  duplicateNameCount = 0,
}: {
  company: Company;
  duplicateNameCount?: number;
}) {
  const legalDiffers = namesDiffer(company);
  const legal = company.fmcsaLegalName?.trim() || null;
  const usdot = company.usdotNumber?.trim() || '';
  const mc = company.mcNumber?.trim() || '';
  const role = researchRole(company);
  const authority = authorityLabel(company);
  const refresh = formatObservedRefresh(company.fmcsaLastChecked);
  const verifyHref = usdot
    ? buildVerifyDotHref(`DOT ${usdot}`, { type: 'DOT', value: usdot.replace(/\D/g, ''), display: `DOT ${usdot}` })
    : mc
      ? buildVerifyDotHref(`MC ${mc}`, { type: 'MC', value: mc.replace(/\D/g, ''), display: `MC ${mc}` })
      : '/verify-dot';
  const evidence = evidenceSummary(company);

  const actionClass =
    'inline-flex min-h-11 w-full items-center justify-center rounded-lg px-4 text-sm font-medium sm:w-auto';

  return (
    <header
      data-research-hero
      className="mb-8 min-w-0 overflow-x-clip rounded-2xl border border-border/80 bg-card px-4 py-5 shadow-sm sm:px-6 sm:py-6"
    >
      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">
        Company research record
      </p>
      <h1 className="mt-2 break-words text-2xl font-semibold tracking-tight text-[#0A2540] sm:text-3xl md:text-4xl">
        {company.name}
      </h1>
      <p className="mt-2 break-words text-base leading-relaxed text-[#1E293B]">
        <span className="text-sm font-medium text-muted-foreground">FMCSA legal entity: </span>
        {legal || 'Not recorded separately from the public name'}
        {!legalDiffers && legal ? ' — same as the public name on this profile.' : null}
      </p>

      {legalDiffers ? (
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[#1E293B]">
          Brand / display name is not the FMCSA legal entity. Use the USDOT or MC number on your
          estimate, contract or paperwork to confirm you are researching the correct operator.
        </p>
      ) : null}

      <p className="mt-3 text-sm leading-relaxed text-[#1E293B]">
        MoveTrustHub is not recommending this mover. This page organizes public evidence. You decide.
      </p>

      {duplicateNameCount > 1 ? (
        <div className="mt-3 rounded-lg border border-amber-200 bg-amber-50/70 px-3 py-2 text-sm leading-relaxed text-amber-950">
          <p>
            {duplicateNameCount} published profiles use this same public name. Confirm the USDOT or MC
            number on your paperwork.
          </p>
          <Link
            className="mt-1 inline-flex min-h-11 items-center font-semibold underline-offset-2 hover:underline"
            href={buildCompaniesSearchHref(company.name)}
            data-profile-event="profile_duplicate_brand_search_clicked"
          >
            Search this brand
          </Link>
        </div>
      ) : null}

      {company.headquarters?.trim() ? (
        <p className="mt-3 text-sm text-[#1E293B]">
          <span className="font-medium">Headquarters / address evidence: </span>
          <span className="break-words">{company.headquarters.trim()}</span>
          <span className="mt-1 block text-xs text-muted-foreground">
            Headquarters is not service territory.
          </span>
        </p>
      ) : null}

      <div className="mt-4 flex min-w-0 flex-col gap-2 sm:flex-row sm:flex-wrap">
        {usdot ? (
          <p
            className="min-w-0 w-full break-all rounded-lg border bg-muted/30 px-3 py-2 font-semibold tabular-nums text-[#0A2540] sm:w-auto"
            aria-label={`USDOT number ${usdot}`}
          >
            <span className="sr-only">USDOT number </span>
            USDOT {usdot}
          </p>
        ) : (
          <p className="w-full rounded-lg border border-dashed px-3 py-2 text-sm text-muted-foreground sm:w-auto">
            USDOT not recorded on this profile
          </p>
        )}
        {mc ? (
          <p
            className="min-w-0 w-full break-all rounded-lg border bg-muted/30 px-3 py-2 font-semibold tabular-nums text-[#0A2540] sm:w-auto"
            aria-label={`MC number ${mc}`}
          >
            <span className="sr-only">MC number </span>
            MC {mc}
          </p>
        ) : (
          <p className="w-full rounded-lg border border-dashed px-3 py-2 text-sm text-muted-foreground sm:w-auto">
            MC not recorded on this profile
          </p>
        )}
      </div>

      <div className="mt-4 flex min-w-0 flex-col gap-2 sm:flex-row sm:flex-wrap">
        <Link
          href={verifyHref}
          className={`${actionClass} bg-[#0A2540] font-semibold text-white`}
          data-profile-event="profile_verify_dot_clicked"
        >
          Verify DOT
        </Link>
        <div className="grid grid-cols-2 gap-2 sm:contents">
          {usdot ? <CopyIdentifierButton label="USDOT" value={usdot} /> : null}
          {mc ? <CopyIdentifierButton label="MC" value={mc} /> : null}
        </div>
        <Button asChild className="min-h-11 w-full sm:w-auto">
          <Link href={`/compare?add=${company.slug}`} data-profile-event="profile_compare_clicked">
            Compare
          </Link>
        </Button>
        <SaveMoverButton
          companySlug={company.slug}
          companyName={company.name}
          variant="button"
          className="min-h-11 w-full sm:w-auto"
        />
        <Link href="/#plan-your-move" className={`${actionClass} border`}>
          Plan your move
        </Link>
      </div>
      <p className="mt-2 text-xs text-muted-foreground">
        Regulatory records change. Confirm identifiers and authority with FMCSA before booking.
        MoveTrustHub does not replace the official record.
      </p>

      <div className="mt-4 grid gap-2 sm:grid-cols-2 sm:gap-3">
        <section className="rounded-lg border px-3 py-2 sm:py-2.5" aria-labelledby="research-role-heading">
          <h2 id="research-role-heading" className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
            Regulatory role
          </h2>
          <p className="mt-1 font-semibold text-[#0A2540]">{role}</p>
          <p className="mt-1 text-sm leading-relaxed text-[#1E293B]">{roleExplanation(role)}</p>
        </section>
        <section className="rounded-lg border px-3 py-2 sm:py-2.5" aria-labelledby="research-authority-heading">
          <h2 id="research-authority-heading" className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
            FMCSA authority
          </h2>
          <p className="mt-1 font-semibold text-[#0A2540]">
            <span className="sr-only">Stored FMCSA authority evidence: </span>
            {authority}
          </p>
          <p className="mt-1 text-sm leading-relaxed text-[#1E293B]">
            FMCSA authority status is a regulatory record. It is not a MoveTrustHub endorsement,
            safety finding or recommendation.
            {authority === 'Authority not current in stored evidence'
              ? ' Not current is not a misconduct finding.'
              : null}
            {authority === 'Authority status unknown' ? ' Unknown is not inactive.' : null}
          </p>
        </section>
      </div>

      <p className="mt-3 text-sm text-[#1E293B]">
        <span className="font-medium">Latest FMCSA refresh observed: </span>
        {refresh ?? 'Refresh date unavailable.'}
        <span className="mt-1 block text-xs text-muted-foreground">
          A recent refresh does not mean safer or recommended. An older or missing refresh does not
          mean inactive or unsafe.
        </span>
      </p>

      <details
        className="mt-5 min-w-0 rounded-lg border px-3 py-1"
        data-profile-event="profile_legal_name_opened"
      >
        <summary className="flex min-h-11 cursor-pointer items-center text-sm font-semibold text-[#0A2540]">
          Why this profile?
        </summary>
        <dl className="mt-3 space-y-2 text-sm">
          <div>
            <dt className="text-xs uppercase tracking-wide text-muted-foreground">Public name</dt>
            <dd className="break-words">{company.name}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wide text-muted-foreground">Legal name</dt>
            <dd className="break-words">{legal || 'Not recorded separately from the public name'}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wide text-muted-foreground">USDOT</dt>
            <dd className="break-all">{usdot || 'Not recorded'}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wide text-muted-foreground">MC</dt>
            <dd className="break-all">{mc || 'Not recorded'}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wide text-muted-foreground">Regulatory role</dt>
            <dd>{role}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wide text-muted-foreground">Record sources</dt>
            <dd>FMCSA / IARD-oriented directory fields stored on this published profile. Not a score.</dd>
          </div>
        </dl>
      </details>

      <details
        className="mt-3 min-w-0 rounded-lg border px-3 py-1"
        data-profile-event="profile_trace_opened"
      >
        <summary className="flex min-h-11 cursor-pointer items-center text-sm font-semibold text-[#0A2540]">
          Trace this record
        </summary>
        <div className="-mx-1 mt-3 overflow-x-auto text-sm">
          <table className="w-full min-w-[16rem] text-left">
            <caption className="sr-only">Provenance for core identity facts</caption>
            <thead>
              <tr className="text-xs uppercase tracking-wide text-muted-foreground">
                <th scope="col" className="py-1 pr-3">Fact</th>
                <th scope="col" className="py-1 pr-3">Source</th>
                <th scope="col" className="py-1">Limitation</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row" className="py-1 pr-3 font-medium">Public name</th>
                <td className="py-1 pr-3">Directory display name</td>
                <td className="py-1">May differ from the FMCSA legal entity.</td>
              </tr>
              <tr>
                <th scope="row" className="py-1 pr-3 font-medium">USDOT / MC</th>
                <td className="py-1 pr-3">FMCSA identifier fields</td>
                <td className="py-1">Confirm on FMCSA SAFER. Numbers can change after the latest refresh.</td>
              </tr>
              <tr>
                <th scope="row" className="py-1 pr-3 font-medium">Authority</th>
                <td className="py-1 pr-3">Stored authority_active flag</td>
                <td className="py-1">Regulatory record only — not endorsement.</td>
              </tr>
              <tr>
                <th scope="row" className="py-1 pr-3 font-medium">Latest refresh</th>
                <td className="py-1 pr-3">fmcsa_last_checked</td>
                <td className="py-1">Latest observed refresh for this profile, not a quality date.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </details>

      <section className="mt-6 grid gap-4 md:grid-cols-2" aria-label="Evidence summary">
        <div>
          <h2 className="text-sm font-semibold text-[#0A2540]">What we know</h2>
          <ul className="mt-2 space-y-1 text-sm">
            {evidence.map((row) => (
              <li key={row.label}>
                <span className="font-medium">{row.label}: </span>
                {row.status}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-sm font-semibold text-[#0A2540]">What we don&apos;t know</h2>
          <ul className="mt-2 list-disc space-y-1 pl-4 text-sm leading-relaxed text-[#1E293B]">
            {RESEARCH_LIMITATIONS.slice(0, 6).map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>
      <ProfileResearchAnalytics slug={company.slug} />
    </header>
  );
}

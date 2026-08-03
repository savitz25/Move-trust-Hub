import type { ReactNode } from 'react';
import {
  BadgeCheck,
  Building2,
  ExternalLink,
  Globe,
  Mail,
  MapPin,
  Phone,
  ShieldAlert,
} from 'lucide-react';
import {
  hasDisplayableScore,
  hubBadgeLabel,
  visibleTrustSources,
  type TrustProfileShell as TrustProfileShellData,
  type TrustSourceRef,
} from '@/lib/network/trust-profile';
import { NETWORK_VOCAB } from '@/lib/network/vocabulary';
import { cn } from '@/lib/utils';

export type TrustProfileShellProps = {
  profile: TrustProfileShellData;
  className?: string;
  /** Hide contact block when page already renders a richer card below */
  showContact?: boolean;
  /** Optional actions (save, compare) rendered under identity */
  actions?: ReactNode;
};

function SourceChip({ source }: { source: TrustSourceRef }) {
  const tone =
    source.status === 'error'
      ? 'border-destructive/30 bg-destructive/5 text-destructive'
      : source.status === 'stale'
        ? 'border-amber-200 bg-amber-50 text-amber-900'
        : 'border-border/80 bg-background text-foreground';

  const inner = (
    <>
      <span className="font-medium">{source.label}</span>
      {source.status === 'stale' ? (
        <span className="text-[10px] uppercase tracking-wide opacity-70">Stale</span>
      ) : null}
      {source.status === 'error' ? (
        <ShieldAlert className="h-3 w-3 shrink-0" aria-hidden />
      ) : null}
      {source.url ? <ExternalLink className="h-3 w-3 shrink-0 opacity-60" aria-hidden /> : null}
    </>
  );

  if (source.url) {
    return (
      <a
        href={source.url}
        target="_blank"
        rel="noopener noreferrer"
        title={source.note}
        className={cn(
          'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs transition-colors hover:border-primary/40',
          tone
        )}
      >
        {inner}
      </a>
    );
  }

  return (
    <span
      title={source.note}
      className={cn('inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs', tone)}
    >
      {inner}
    </span>
  );
}

/**
 * Shared Trust Profile shell — identity, verification chips, optional score,
 * contact, and network trust footer. Vertical body content stays below.
 */
export function TrustProfileShell({
  profile,
  className,
  showContact = true,
  actions,
}: TrustProfileShellProps) {
  const sources = visibleTrustSources(profile.verification.sources);
  const showScore = hasDisplayableScore(profile.reputation);
  const contact = profile.contact;
  const hasContact =
    showContact &&
    contact &&
    (contact.phone || contact.email || contact.website || contact.address);

  return (
    <section
      className={cn(
        'rounded-2xl border border-border/80 bg-card shadow-sm',
        className
      )}
      aria-label="Trust profile"
    >
      {/* 1. Identity */}
      <div className="border-b border-border/70 px-5 py-5 sm:px-6 sm:py-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center rounded-full border border-border/80 bg-muted/40 px-2.5 py-0.5 text-[11px] font-semibold tracking-wide text-muted-foreground">
            {hubBadgeLabel(profile.hub)}
          </span>
          {profile.serviceScope && profile.serviceScope !== 'unknown' ? (
            <span className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
              {profile.serviceScope}
            </span>
          ) : null}
        </div>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          {profile.displayName}
        </h1>
        {profile.legalName ? (
          <p className="mt-1 text-sm text-muted-foreground">
            Legal name: <span className="text-foreground/90">{profile.legalName}</span>
          </p>
        ) : null}
        {actions ? <div className="mt-4 flex flex-wrap gap-2">{actions}</div> : null}
      </div>

      {/* 2. Verification strip */}
      <div className="border-b border-border/70 px-5 py-4 sm:px-6">
        <div className="flex flex-wrap items-center gap-2">
          <span
            className={cn(
              'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold',
              profile.verification.isVerified
                ? 'bg-emerald-50 text-emerald-800 ring-1 ring-emerald-200/80'
                : 'bg-muted text-muted-foreground ring-1 ring-border'
            )}
          >
            {profile.verification.isVerified ? (
              <BadgeCheck className="h-3.5 w-3.5" aria-hidden />
            ) : null}
            {profile.verification.primaryLabel}
          </span>
          {sources.map((s) => (
            <SourceChip key={`${s.id}-${s.label}`} source={s} />
          ))}
        </div>
        {sources.some((s) => s.note) ? (
          <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
            {NETWORK_VOCAB.verifyPrimaryRegulator}. Source chips link to public records when
            available.
          </p>
        ) : (
          <p className="mt-2 text-xs text-muted-foreground">
            {NETWORK_VOCAB.verifyPrimaryRegulator} before you commit.
          </p>
        )}
      </div>

      {/* 3. Reputation — only if present */}
      {showScore && profile.reputation ? (
        <div className="border-b border-border/70 px-5 py-4 sm:px-6">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
            {profile.reputation.scoreLabel ?? 'Score'}
          </p>
          <p className="mt-1 text-2xl font-semibold tabular-nums text-foreground">
            {profile.reputation.score}
            {profile.reputation.scoreMax ? (
              <span className="text-base font-medium text-muted-foreground">
                /{profile.reputation.scoreMax}
              </span>
            ) : null}
          </p>
          {profile.reputation.summary ? (
            <p className="mt-1.5 max-w-2xl text-xs leading-relaxed text-muted-foreground">
              {profile.reputation.summary}
            </p>
          ) : null}
        </div>
      ) : null}

      {/* 4. Contact */}
      {hasContact && contact ? (
        <div className="border-b border-border/70 px-5 py-4 sm:px-6">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
            Contact
          </p>
          <ul className="grid gap-2.5 text-sm sm:grid-cols-2">
            {contact.address ? (
              <li className="flex gap-2 text-muted-foreground">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
                <span>{contact.address}</span>
              </li>
            ) : null}
            {contact.phone ? (
              <li className="flex gap-2">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
                <a
                  href={`tel:${contact.phone.replace(/[^\d+]/g, '')}`}
                  className="font-medium text-foreground hover:underline"
                >
                  {contact.phone}
                </a>
              </li>
            ) : null}
            {contact.email ? (
              <li className="flex gap-2">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
                <a
                  href={`mailto:${contact.email}`}
                  className="font-medium text-foreground hover:underline"
                >
                  {contact.email}
                </a>
              </li>
            ) : null}
            {contact.website ? (
              <li className="flex gap-2">
                <Globe className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
                <a
                  href={
                    contact.website.startsWith('http')
                      ? contact.website
                      : `https://${contact.website}`
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-medium text-primary hover:underline"
                >
                  Website
                  <ExternalLink className="h-3 w-3" aria-hidden />
                </a>
              </li>
            ) : null}
            {!contact.address && !contact.phone && !contact.email && !contact.website ? (
              <li className="flex gap-2 text-muted-foreground">
                <Building2 className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
                Contact details not on file
              </li>
            ) : null}
          </ul>
        </div>
      ) : null}

      {/* 5. Trust footer */}
      <div className="px-5 py-3.5 sm:px-6">
        <p className="text-xs leading-relaxed text-muted-foreground">
          Research only · Part of the Ask Trust Hub network · {NETWORK_VOCAB.noPaidPlacements}
          {' · '}
          <a
            href={profile.methodologyUrl}
            className="font-medium text-foreground underline-offset-2 hover:underline"
            rel="noopener noreferrer"
          >
            Methodology
          </a>
          {' · '}
          <a
            href={profile.standardUrl}
            className="font-medium text-foreground underline-offset-2 hover:underline"
            rel="noopener noreferrer"
          >
            Ask Standard
          </a>
        </p>
      </div>
    </section>
  );
}

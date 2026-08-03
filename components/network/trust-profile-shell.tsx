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
  formatTrustProfileDate,
  hasDisplayableScore,
  hubBadgeLabel,
  visibleTrustSources,
  type TrustHubId,
  type TrustProfileShell as TrustProfileShellData,
  type TrustSourceRef,
} from '@/lib/network/trust-profile';
import { NETWORK_VOCAB } from '@/lib/network/vocabulary';
import { cn } from '@/lib/utils';

export type TrustProfileShellVariant = 'move' | 'insurance' | 'lender';

export type TrustProfileShellProps = {
  profile: TrustProfileShellData;
  className?: string;
  /** Accent only — defaults from profile.hub when move/insurance/lender */
  variant?: TrustProfileShellVariant;
  /** Hide contact block when page already renders a richer card below */
  showContact?: boolean;
  /** Optional actions (save, compare) rendered under identity */
  actions?: ReactNode;
};

const VARIANT_ACCENT: Record<
  TrustProfileShellVariant,
  { badge: string; verified: string; link: string; ring: string }
> = {
  move: {
    badge: 'border-blue-200/80 bg-blue-50/80 text-blue-900',
    verified: 'bg-emerald-50 text-emerald-800 ring-emerald-200/80',
    link: 'text-blue-700',
    ring: 'hover:border-blue-400/50',
  },
  insurance: {
    badge: 'border-teal-200/80 bg-teal-50/80 text-teal-900',
    verified: 'bg-emerald-50 text-emerald-800 ring-emerald-200/80',
    link: 'text-teal-700',
    ring: 'hover:border-teal-400/50',
  },
  lender: {
    badge: 'border-indigo-200/80 bg-indigo-50/80 text-indigo-900',
    verified: 'bg-emerald-50 text-emerald-800 ring-emerald-200/80',
    link: 'text-[#2563EB]',
    ring: 'hover:border-[#3B82F6]/50',
  },
};

function resolveVariant(
  profileHub: TrustHubId,
  variant?: TrustProfileShellVariant
): TrustProfileShellVariant {
  if (variant) return variant;
  if (profileHub === 'insurance' || profileHub === 'lender' || profileHub === 'move') {
    return profileHub;
  }
  return 'move';
}

function SourceChip({
  source,
  accentRing,
}: {
  source: TrustSourceRef;
  accentRing: string;
}) {
  const tone =
    source.status === 'error'
      ? 'border-destructive/30 bg-destructive/5 text-destructive'
      : source.status === 'stale'
        ? 'border-amber-200 bg-amber-50 text-amber-900'
        : 'border-border/80 bg-background text-foreground';

  const checked = formatTrustProfileDate(source.lastChecked);

  const inner = (
    <>
      <span className="min-w-0 break-words font-medium">{source.label}</span>
      {source.status === 'stale' ? (
        <span className="shrink-0 text-[10px] uppercase tracking-wide opacity-70">Stale</span>
      ) : null}
      {source.status === 'error' ? (
        <ShieldAlert className="h-3 w-3 shrink-0" aria-hidden />
      ) : null}
      {source.url ? <ExternalLink className="h-3 w-3 shrink-0 opacity-60" aria-hidden /> : null}
    </>
  );

  const className = cn(
    'inline-flex max-w-full items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs transition-colors',
    tone,
    source.url && accentRing
  );

  if (source.url) {
    return (
      <a
        href={source.url}
        target="_blank"
        rel="noopener noreferrer"
        title={
          [source.note, checked ? `Checked ${checked}` : null].filter(Boolean).join(' · ') ||
          undefined
        }
        className={className}
      >
        {inner}
      </a>
    );
  }

  return (
    <span
      title={
        [source.note, checked ? `Checked ${checked}` : null].filter(Boolean).join(' · ') ||
        undefined
      }
      className={className}
    >
      {inner}
    </span>
  );
}

/**
 * Shared Trust Profile shell — identity, verification chips, optional score,
 * contact, freshness, and network trust footer. Vertical body stays below.
 */
export function TrustProfileShell({
  profile,
  className,
  variant: variantProp,
  showContact = true,
  actions,
}: TrustProfileShellProps) {
  const variant = resolveVariant(profile.hub, variantProp);
  const accent = VARIANT_ACCENT[variant];
  const sources = visibleTrustSources(profile.verification.sources);
  const showScore = hasDisplayableScore(profile.reputation);
  const contact = profile.contact;
  const hasContact =
    showContact &&
    contact &&
    (contact.phone || contact.email || contact.website || contact.address);

  const refreshed = formatTrustProfileDate(profile.updatedAt);
  const sourceCheckedDates = sources
    .map((s) => formatTrustProfileDate(s.lastChecked))
    .filter((d): d is string => Boolean(d));
  const uniqueSourceDates = [...new Set(sourceCheckedDates)];

  return (
    <section
      className={cn(
        'rounded-2xl border border-border/80 bg-card shadow-sm',
        className
      )}
      aria-label="Trust profile"
      data-hub={profile.hub}
      data-variant={variant}
    >
      {/* 1. Identity */}
      <div className="border-b border-border/70 px-4 py-5 sm:px-6 sm:py-6">
        <div className="flex flex-wrap items-center gap-2">
          <span
            className={cn(
              'inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-semibold tracking-wide',
              accent.badge
            )}
          >
            {hubBadgeLabel(profile.hub)}
          </span>
          {profile.serviceScope && profile.serviceScope !== 'unknown' ? (
            <span className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
              {profile.serviceScope}
            </span>
          ) : null}
        </div>
        <h1 className="mt-3 break-words text-2xl font-semibold tracking-tight text-foreground sm:text-3xl md:text-4xl">
          {profile.displayName}
        </h1>
        {profile.legalName ? (
          <p className="mt-1 break-words text-sm text-muted-foreground">
            Legal name: <span className="text-foreground/90">{profile.legalName}</span>
          </p>
        ) : null}
        {actions ? (
          <div className="mt-4 flex flex-wrap items-center gap-2">{actions}</div>
        ) : null}
      </div>

      {/* 2. Verification strip */}
      <div className="border-b border-border/70 px-4 py-4 sm:px-6">
        <div className="flex flex-wrap items-center gap-2">
          <span
            className={cn(
              'inline-flex max-w-full items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ring-1',
              profile.verification.isVerified
                ? accent.verified
                : 'bg-muted text-muted-foreground ring-border'
            )}
          >
            {profile.verification.isVerified ? (
              <BadgeCheck className="h-3.5 w-3.5 shrink-0" aria-hidden />
            ) : null}
            <span className="min-w-0 break-words">{profile.verification.primaryLabel}</span>
          </span>
          {sources.map((s) => (
            <SourceChip key={`${s.id}-${s.label}`} source={s} accentRing={accent.ring} />
          ))}
        </div>
        <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
          {NETWORK_VOCAB.verifyPrimaryRegulator}
          {sources.length > 0
            ? '. Source chips link to public records when available; empty sources are hidden.'
            : ' before you commit.'}
        </p>
        {/* 5.6 Freshness — only when timestamps exist */}
        {refreshed || uniqueSourceDates.length > 0 ? (
          <p className="mt-2 text-xs text-muted-foreground">
            {refreshed ? (
              <span>
                Data refreshed <time dateTime={profile.updatedAt}>{refreshed}</time>
              </span>
            ) : null}
            {refreshed && uniqueSourceDates.length > 0 ? (
              <span className="text-muted-foreground/50"> · </span>
            ) : null}
            {uniqueSourceDates.length === 1 ? (
              <span>Source checked {uniqueSourceDates[0]}</span>
            ) : uniqueSourceDates.length > 1 ? (
              <span>Sources checked (various dates)</span>
            ) : null}
          </p>
        ) : null}
      </div>

      {/* 3. Reputation — only if present */}
      {showScore && profile.reputation ? (
        <div className="border-b border-border/70 px-4 py-4 sm:px-6">
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
        <div className="border-b border-border/70 px-4 py-4 sm:px-6">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
            Contact
          </p>
          <ul className="grid gap-2.5 text-sm sm:grid-cols-2">
            {contact.address ? (
              <li className="flex gap-2 text-muted-foreground">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
                <span className="min-w-0 break-words">{contact.address}</span>
              </li>
            ) : null}
            {contact.phone ? (
              <li className="flex gap-2">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
                <a
                  href={`tel:${contact.phone.replace(/[^\d+]/g, '')}`}
                  className="min-w-0 break-all font-medium text-foreground hover:underline"
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
                  className="min-w-0 break-all font-medium text-foreground hover:underline"
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
                  className={cn(
                    'inline-flex min-w-0 items-center gap-1 break-all font-medium hover:underline',
                    accent.link
                  )}
                >
                  Website
                  <ExternalLink className="h-3 w-3 shrink-0" aria-hidden />
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
      <div className="px-4 py-3.5 sm:px-6">
        <p className="text-xs leading-relaxed text-muted-foreground">
          Research only · Part of the Ask Trust Hub network · {NETWORK_VOCAB.noPaidPlacements}
          {' · '}
          <a
            href={profile.methodologyUrl}
            className={cn('font-medium underline-offset-2 hover:underline', accent.link)}
            rel="noopener noreferrer"
          >
            Methodology
          </a>
          {' · '}
          <a
            href={profile.standardUrl}
            className={cn('font-medium underline-offset-2 hover:underline', accent.link)}
            rel="noopener noreferrer"
          >
            Ask Standard
          </a>
        </p>
      </div>
    </section>
  );
}

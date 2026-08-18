import Link from 'next/link';
import { TrustHubLogoImage } from '@/components/hub/trust-hub-logo-image';

import { SITE_EMAIL as MOVE_SITE_EMAIL } from '@/lib/contact';
import { SITE_EMAIL as INSURANCE_SITE_EMAIL } from '@/lib/insurance/constants';
import { AfterYourMoveModule } from '@/components/hub/after-your-move-module';
import { AskNetworkSeal } from '@/components/network/ask-network-seal';
import { getHubConfig } from '@/lib/hub/config';
import { hubPath, isExternalHubHref } from '@/lib/hub/paths';
import type { HubId } from '@/lib/hub/types';
import {
  ASK_TRUST_HUB,
  NETWORK_HUBS,
  networkHubById,
  type NetworkHubId,
} from '@/lib/network/ask-trust-hub';
import { networkHubHref, type HubLinkId } from '@/lib/network/handoff-href';
import { cn } from '@/lib/utils';

export function HubFooter({ hubId }: { hubId?: HubId }) {
  const hub = getHubConfig(hubId ?? 'move');
  const year = new Date().getFullYear();
  const homeHref = hubPath(hub.id, '/');
  const networkId = (hub.id === 'move' || hub.id === 'insurance' || hub.id === 'lender'
    ? hub.id
    : 'move') as NetworkHubId;
  // Move contact is always hello@movetrusthub.com (product requirement).
  const contactEmail =
    hub.id === 'insurance'
      ? INSURANCE_SITE_EMAIL
      : hub.id === 'lender'
        ? networkHubById('lender').email
        : MOVE_SITE_EMAIL;

  const isMove = hub.id === 'move';
  /** Move redesign: 4 columns (brand+dir | tools | destinations | network & legal) */
  const gridClass = isMove
    ? 'grid grid-cols-2 gap-x-6 gap-y-9 md:grid-cols-4'
    : 'grid grid-cols-2 gap-x-6 gap-y-9 md:grid-cols-3 lg:grid-cols-6 xl:grid-cols-7';

  return (
    <footer
      className={cn(
        'border-t',
        isMove ? 'bg-[#0A2540] text-slate-200' : 'bg-muted/20'
      )}
    >
      <div className="container mx-auto px-4 py-10">
        {!isMove ? <AfterYourMoveModule hubId={hub.id} /> : null}

        <div className={gridClass}>
          <div className={isMove ? 'col-span-2 md:col-span-1' : 'col-span-2 md:col-span-1'}>
            <Link prefetch={false} href={homeHref} className="flex items-center gap-2 font-semibold text-base tracking-tight">
              <span className="relative block h-12 w-[192px] shrink-0 bg-transparent">
                <TrustHubLogoImage variant="footer" hubId={hub.id} />
              </span>
            </Link>
            <p
              className={cn(
                'mt-2.5 text-sm max-w-[220px] leading-snug',
                isMove ? 'text-slate-300' : 'text-muted-foreground'
              )}
            >
              {hub.tagline}
            </p>
            {isMove ? (
              <p className="mt-3 text-[11px] leading-relaxed text-slate-400 max-w-[240px]">
                Independent research directory. Common ownership with Ask Trust Hub; separated
                research and listing rules. No paid placements. No lead fees.
              </p>
            ) : null}
          </div>

          {hub.footerColumns.map((col) => (
            <div key={col.title}>
              <div
                className={cn(
                  'font-semibold mb-2.5 text-xs tracking-widest',
                  isMove ? 'text-slate-400' : 'text-muted-foreground/80'
                )}
              >
                {col.title}
              </div>
              <div
                className={cn(
                  'space-y-1.5 text-sm',
                  isMove ? 'text-slate-300' : 'text-muted-foreground'
                )}
              >
                {col.links.map((link) => (
                  <div key={link.href}>
                    {link.external || isExternalHubHref(link.href) ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cn(
                          'transition-colors',
                          isMove ? 'hover:text-white' : 'hover:text-foreground'
                        )}
                      >
                        {link.label}
                        {link.external ? ' ↗' : ''}
                      </a>
                    ) : (
                      <Link
                        prefetch={false}
                        href={link.href}
                        className={cn(
                          'transition-colors',
                          isMove ? 'hover:text-white' : 'hover:text-foreground'
                        )}
                      >
                        {link.label}
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* NETWORK: Ask seal primary; Lender/Insurance as siblings — not instead of Ask */}
          <div>
            <div
              className={cn(
                'font-semibold mb-2.5 text-xs tracking-widest',
                isMove ? 'text-slate-400' : 'text-muted-foreground/80'
              )}
            >
              {isMove ? 'NETWORK & LEGAL' : 'NETWORK'}
            </div>
            <div
              className={cn(
                'space-y-1.5 text-sm',
                isMove ? 'text-slate-300' : 'text-muted-foreground'
              )}
            >
              <div>
                <a
                  href={ASK_TRUST_HUB.url}
                  className={cn(
                    'font-medium transition-colors',
                    isMove ? 'text-white hover:text-white/90' : 'text-foreground hover:text-foreground/80'
                  )}
                  rel="noopener noreferrer"
                >
                  Ask Trust Hub
                </a>
                <span className="ml-1 text-[11px] opacity-70">(parent)</span>
              </div>
              <div>
                <a
                  href={ASK_TRUST_HUB.promiseUrl}
                  className={cn('transition-colors', isMove ? 'hover:text-white' : 'hover:text-foreground')}
                  rel="noopener noreferrer"
                >
                  Independence policy
                </a>
              </div>
              <div>
                <a
                  href={ASK_TRUST_HUB.methodologyUrl}
                  className={cn('transition-colors', isMove ? 'hover:text-white' : 'hover:text-foreground')}
                  rel="noopener noreferrer"
                >
                  Network methodology
                </a>
              </div>
              {NETWORK_HUBS.filter((h) => h.id !== networkId).map((h) => {
                const href = networkHubHref(h.id as HubLinkId);
                const sso = href.includes('/api/auth/network-handoff/start');
                return (
                  <div key={h.id}>
                    <a
                      href={href}
                      className={cn('transition-colors', isMove ? 'hover:text-white' : 'hover:text-foreground')}
                      rel="noopener noreferrer"
                      data-network-handoff={sso ? 'start' : undefined}
                    >
                      {h.proseName}
                    </a>
                  </div>
                );
              })}
              {isMove ? (
                <>
                  <div className="pt-2">
                    <Link
                      prefetch={false}
                      href="/about"
                      className="hover:text-white transition-colors"
                    >
                      About
                    </Link>
                  </div>
                  <div>
                    <Link
                      prefetch={false}
                      href="/contact"
                      className="hover:text-white transition-colors"
                    >
                      Contact
                    </Link>
                  </div>
                  <div>
                    <Link
                      prefetch={false}
                      href={hub.legalLinks.privacy}
                      className="hover:text-white transition-colors"
                    >
                      Privacy Policy
                    </Link>
                  </div>
                  <div>
                    <Link
                      prefetch={false}
                      href={hub.legalLinks.terms}
                      className="hover:text-white transition-colors"
                    >
                      Terms of Service
                    </Link>
                  </div>
                </>
              ) : null}
            </div>
          </div>

          {!isMove ? (
            <>
              <div>
                <div className="font-semibold mb-2.5 text-xs tracking-widest text-muted-foreground/80">
                  COMPANY &amp; LEGAL
                </div>
                <div className="space-y-1.5 text-sm text-muted-foreground">
                  <div>
                    <Link
                      prefetch={false}
                      href={hubPath(hub.id, '/about')}
                      className="hover:text-foreground transition-colors"
                    >
                      About
                    </Link>
                  </div>
                  <div>
                    <Link
                      prefetch={false}
                      href={hubPath(hub.id, '/methodology')}
                      className="hover:text-foreground transition-colors"
                    >
                      Methodology
                    </Link>
                  </div>
                  <div>
                    <Link
                      prefetch={false}
                      href={hubPath(hub.id, '/contact')}
                      className="hover:text-foreground transition-colors"
                    >
                      Contact
                    </Link>
                  </div>
                  <div>
                    <Link
                      prefetch={false}
                      href={hub.legalLinks.privacy}
                      className="hover:text-foreground transition-colors"
                    >
                      Privacy Policy
                    </Link>
                  </div>
                  <div>
                    <Link
                      prefetch={false}
                      href={hub.legalLinks.terms}
                      className="hover:text-foreground transition-colors"
                    >
                      Terms of Service
                    </Link>
                  </div>
                  <div>
                    <a
                      href={hub.verifyAuthority.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-foreground transition-colors"
                    >
                      {hub.verifyAuthority.label} ↗
                    </a>
                  </div>
                </div>
              </div>

              <div className="col-span-2 md:col-span-1 text-sm text-muted-foreground">
                <div className="font-semibold text-foreground mb-2 text-xs tracking-widest text-muted-foreground/80">
                  CONTACT
                </div>
                <p className="leading-snug text-[13px]">
                  Independent directory — <strong>not affiliated</strong> with listed providers. No
                  lead fees. No paid placements. Data for research only.
                </p>
                <p className="mt-2.5 text-[13px]">
                  <a
                    href={`mailto:${contactEmail}`}
                    className="hover:text-foreground transition-colors"
                  >
                    {contactEmail}
                  </a>
                </p>
                <div className="mt-3 text-[11px] text-muted-foreground/70">
                  © {year} {hub.siteName}
                </div>
              </div>
            </>
          ) : null}
        </div>

        {isMove ? (
          <div className="mt-8 flex flex-col gap-2 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[13px] text-slate-400">
              <a href={`mailto:${contactEmail}`} className="hover:text-white transition-colors">
                {contactEmail}
              </a>
              <span className="mx-2 text-slate-600">·</span>
              Independent research — not a marketplace
            </p>
            <p className="text-[11px] text-slate-500">© {year} {hub.siteName}</p>
          </div>
        ) : null}
      </div>
      <div
        className={cn(
          'border-t py-6 space-y-4',
          isMove ? 'border-white/10' : ''
        )}
      >
        <AskNetworkSeal currentHub={networkId} showSiblings />
        <p
          className={cn(
            'text-center text-[10px] tracking-wide',
            isMove ? 'text-slate-500' : 'text-muted-foreground/70'
          )}
        >
          Always verify licensing directly with{' '}
          <a
            href={hub.verifyAuthority.href}
            target="_blank"
            rel="noopener noreferrer"
            className={cn('underline', isMove ? 'hover:text-white' : 'hover:text-foreground')}
          >
            {hub.verifyAuthority.label}
          </a>{' '}
          and state authorities.
        </p>
      </div>
    </footer>
  );
}
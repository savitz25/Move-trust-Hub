import Link from 'next/link';
import { TrustHubLogoImage } from '@/components/hub/trust-hub-logo-image';

import { SITE_EMAIL as MOVE_SITE_EMAIL } from '@/lib/contact';
import { SITE_EMAIL as INSURANCE_SITE_EMAIL } from '@/lib/insurance/constants';
import { AfterYourMoveModule } from '@/components/hub/after-your-move-module';
import { ConsumerTrustNetworkLinks } from '@/components/hub/consumer-trust-network-links';
import { getHubConfig } from '@/lib/hub/config';
import { hubPath } from '@/lib/hub/paths';
import type { HubId } from '@/lib/hub/types';

export function HubFooter({ hubId }: { hubId?: HubId }) {
  const hub = getHubConfig(hubId ?? 'move');
  const year = new Date().getFullYear();
  const homeHref = hubPath(hub.id, '/');
  const contactEmail = hub.id === 'insurance' ? INSURANCE_SITE_EMAIL : MOVE_SITE_EMAIL;

  return (
    <footer className="border-t bg-muted/20">
      <div className="container mx-auto px-4 py-10">
        <AfterYourMoveModule hubId={hub.id} />

        <div className="grid grid-cols-2 md:grid-cols-6 gap-y-9">
          <div className="col-span-2 md:col-span-1">
            <Link prefetch={false} href={homeHref} className="flex items-center gap-2 font-semibold text-base tracking-tight">
              <span className="relative block h-12 w-[192px] shrink-0 bg-transparent">
                <TrustHubLogoImage variant="footer" hubId={hub.id} />
              </span>
            </Link>
            <p className="mt-2.5 text-sm text-muted-foreground max-w-[210px] leading-snug">
              {hub.tagline}
            </p>
          </div>

          {hub.footerColumns.map((col) => (
            <div key={col.title}>
              <div className="font-semibold mb-2.5 text-xs tracking-widest text-muted-foreground/80">
                {col.title}
              </div>
              <div className="space-y-1.5 text-sm text-muted-foreground">
                {col.links.map((link) => (
                  <div key={link.href}>
                    {link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-foreground transition-colors"
                      >
                        {link.label} ↗
                      </a>
                    ) : (
                      <Link
                        prefetch={false}
                        href={link.href}
                        className="hover:text-foreground transition-colors"
                      >
                        {link.label}
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}

          <div>
            <div className="font-semibold mb-2.5 text-xs tracking-widest text-muted-foreground/80">
              COMPANY &amp; LEGAL
            </div>
            <div className="space-y-1.5 text-sm text-muted-foreground">
              <div>
                <Link prefetch={false} href={hubPath(hub.id, '/about')} className="hover:text-foreground transition-colors">
                  About
                </Link>
              </div>
              <div>
                <Link prefetch={false} href={hubPath(hub.id, '/contact')} className="hover:text-foreground transition-colors">
                  Contact
                </Link>
              </div>
              <div>
                <Link prefetch={false} href={hub.legalLinks.privacy} className="hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
              </div>
              <div>
                <Link prefetch={false} href={hub.legalLinks.terms} className="hover:text-foreground transition-colors">
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
              TRUST &amp; TRANSPARENCY
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
        </div>
      </div>
      <div className="border-t py-5 space-y-3">
        {/* Quiet network note — never primary nav or equal footer columns. */}
        {hub.id === 'move' || hub.id === 'insurance' ? (
          <ConsumerTrustNetworkLinks hubId={hub.id} />
        ) : null}
        <p className="text-center text-[10px] text-muted-foreground/70 tracking-wide">
          Always verify licensing directly with{' '}
          <a
            href={hub.verifyAuthority.href}
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-foreground"
          >
            {hub.verifyAuthority.label}
          </a>{' '}
          and state authorities.
        </p>
      </div>
    </footer>
  );
}
import type { Metadata } from 'next';
import { LocalMoversBreadcrumbs } from '@/components/local-movers/local-movers-breadcrumbs';
import { NEW_MEXICO_MOVE_SNAPSHOT as s } from '@/lib/new-mexico-intelligence/snapshot';
import { buildMovePageMetadata } from '@/lib/seo/move-metadata';
import { JsonLd } from '@/lib/seo/json-ld';
import { SITE_URL } from '@/lib/seo/site-metadata';

export function generateMetadata(): Metadata {
  return buildMovePageMetadata({
    title: 'New Mexico Household-Goods Mover Evidence | MoveTrustHub',
    description:
      'The New Mexico PRC household-goods directory page did not include company rows. A current mover roster was not acquired. Missing is not zero. FMCSA interstate authority is separate.',
    path: s.route,
  });
}

function Official({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="font-medium underline underline-offset-2">
      {children}
    </a>
  );
}

export default function NewMexicoMovePage() {
  return (
    <main className="mx-auto max-w-6xl overflow-x-clip px-4 py-8 sm:px-6 sm:py-10">
      <JsonLd
        data={[
          {
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: 'New Mexico household-goods mover evidence',
            url: `${SITE_URL}${s.route}`,
          },
        ]}
      />
      <LocalMoversBreadcrumbs crumbs={[{ label: 'Home', href: '/' }, { label: 'New Mexico research' }]} />
      <header className="border-b border-border pb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#C2410C]">New Mexico · Public Regulation Commission</p>
        <h1 className="mt-2 max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl">New Mexico household-goods mover evidence</h1>
        <p className="mt-3 max-w-3xl text-[15px] leading-relaxed text-muted-foreground">
          The New Mexico Public Regulation Commission publishes a Household Goods Mover Companies directory. The copy retrieved on {s.retrievedAt} says “Select a Household Goods Mover Company below to view their tariff,” but that saved HTML contained no company rows and no tariff links. A current household-goods company roster was NOT_ACQUIRED. Missing rows are not a mover count. This page does not publish one.
        </p>
      </header>

      <section className="mt-8 grid gap-3 sm:grid-cols-3" aria-label="New Mexico mover evidence status">
        <div className="rounded-xl border p-4">
          <p className="text-lg font-semibold">Household-goods company roster</p>
          <p className="mt-1 text-sm font-medium">NOT_ACQUIRED</p>
          <p className="mt-1 text-xs text-muted-foreground">No company count is published. An empty directory page is not a census.</p>
        </div>
        <div className="rounded-xl border p-4">
          <p className="text-lg font-semibold">PRCe360</p>
          <p className="mt-1 text-sm font-medium">Case system · announced {s.e360AnnouncedLive}</p>
          <p className="mt-1 text-xs text-muted-foreground">Live case access is not a counted household-goods roster.</p>
        </div>
        <div className="rounded-xl border p-4">
          <p className="text-lg font-semibold">Interstate household goods</p>
          <p className="mt-1 text-sm font-medium">FMCSA · separate federal authority</p>
          <p className="mt-1 text-xs text-muted-foreground">The PRC sends interstate moves to Protect Your Move. That is not New Mexico intrastate authority.</p>
        </div>
      </section>

      <section className="mt-8 max-w-4xl space-y-4 text-sm leading-relaxed text-muted-foreground">
        <h2 className="text-lg font-semibold text-foreground">The directory page is not a roster</h2>
        <p>
          The <Official href={s.directoryUrl}>Household Goods Mover Companies directory</Official> was retrieved {s.retrievedAt}. The saved HTML is {s.directoryHtmlBytes.toLocaleString('en-US')} bytes, SHA-256 {s.directoryHtmlSha256}. It contains the prompt “Select a Household Goods Mover Company below to view their tariff.” It contained no company rows and no tariff links. {s.navigationAnchors} anchors were site navigation only. That file observation is not a mover census, and it is not a company count. A current roster remains NOT_ACQUIRED. Missing is not zero.
        </p>
        <p>
          Yoast datePublished {s.yoastDatePublished} and article:modified_time {s.articleModifiedTime} are a page clock, not a roster clock. Other PRC utility directories were not parsed as movers. An application is not active authority.
        </p>

        <h2 className="text-lg font-semibold text-foreground">Keep the records separate</h2>
        <ul className="list-disc space-y-2 pl-5">
          <li><strong className="text-foreground">PRCe360:</strong> <Official href={s.e360Url}>e360.prc.nm.gov</Official> was announced live January 26, 2026. It is a case system, not a counted roster.</li>
          <li><strong className="text-foreground">Complaints:</strong> <Official href={s.complaintUrl}>complaints.nm-prc.org</Official> is intake, not a complaint census. Provider complaint rows were NOT_ACQUIRED. A complaint is not a finding.</li>
          <li><strong className="text-foreground">Tariffs:</strong> a household-goods tariff corpus was NOT_ACQUIRED. The directory prompt is not a parsed tariff and not a quote.</li>
          <li><strong className="text-foreground">Insurance and enforcement:</strong> insurance was NOT_ACQUIRED. Enforcement orders were NOT_ACQUIRED. No provider-level order was attached by name.</li>
          <li><strong className="text-foreground">USDOT and MC:</strong> federal bridges were NOT_ACQUIRED. A federal number is not New Mexico intrastate authority.</li>
          <li><strong className="text-foreground">Interstate moves:</strong> the <Official href={s.noJurisdictionUrl}>PRC no-jurisdiction resource list</Official> sends interstate moves to <Official href={s.protectYourMoveUrl}>Protect Your Move</Official>. FMCSA is not New Mexico intrastate authority.</li>
        </ul>

        <h2 className="text-lg font-semibold text-foreground">What this research did not write</h2>
        <ul className="list-disc space-y-1 pl-5">
          <li>Name-only joins: {s.nameOnlyJoins}. Graph writes: {s.graphWrites}. New canonical organizations: {s.newCanonicalOrganizations}.</li>
          <li>Albuquerque, Santa Fe, Las Cruces, Rio Rancho, Roswell, and Farmington are geography only. This page publishes no city route.</li>
          <li>No ranking or combined mover count is published from this directory page.</li>
        </ul>

        <h2 className="text-lg font-semibold text-foreground">Official sources</h2>
        <ul className="list-disc space-y-1 pl-5">
          <li><Official href={s.directoryUrl}>PRC Household Goods Mover Companies directory</Official></li>
          <li><Official href={s.e360Url}>PRCe360</Official></li>
          <li><Official href={s.complaintUrl}>PRC complaint form</Official></li>
          <li><Official href={s.noJurisdictionUrl}>PRC no-jurisdiction resource list</Official></li>
          <li><Official href={s.protectYourMoveUrl}>FMCSA Protect Your Move</Official></li>
        </ul>
      </section>
    </main>
  );
}

'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import {
  buildClientErrorPayload,
  reportClientError,
} from '@/lib/reliability/report-client-error';
import { classifyError } from '@/lib/reliability/client-error-types';

/**
 * Segment error UI — stays inside the root layout chrome when possible.
 * Reports to /api/client-errors. Recovery links to real research surfaces.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    const message = error?.message || 'Segment render error';
    reportClientError(
      buildClientErrorPayload({
        kind: classifyError(message, error?.name) === 'chunk_load' ? 'chunk_load' : 'react_boundary',
        message,
        stack: error?.stack,
        source: error?.digest ? `digest:${error.digest}` : 'app/error.tsx',
      })
    );

    // Error shells must not look like indexable homepage content
    document.title = 'Something went wrong | Move Trust Hub';
    let robots = document.querySelector('meta[name="robots"]');
    if (!robots) {
      robots = document.createElement('meta');
      robots.setAttribute('name', 'robots');
      document.head.appendChild(robots);
    }
    robots.setAttribute('content', 'noindex, nofollow');

    let desc = document.querySelector('meta[name="description"]');
    if (!desc) {
      desc = document.createElement('meta');
      desc.setAttribute('name', 'description');
      document.head.appendChild(desc);
    }
    desc.setAttribute(
      'content',
      'Temporary error on Move Trust Hub. Reload or continue independent FMCSA research.'
    );
  }, [error]);

  return (
    <main
      id="main-content"
      role="main"
      className="container mx-auto max-w-lg px-4 py-16 text-center"
      data-error-boundary="segment"
    >
      <p className="text-xs font-semibold uppercase tracking-wider text-primary">
        Temporary error
      </p>
      <h1 className="mt-2 text-2xl font-semibold tracking-tight text-[#0A2540]">
        We couldn&apos;t load this page
      </h1>
      <p className="mt-3 text-sm text-[#3d4f63]">
        This is an error state — not the research homepage. Try again, or jump to a working
        research tool.
      </p>
      {process.env.NODE_ENV === 'development' && error?.message ? (
        <pre className="mt-4 max-h-40 overflow-auto rounded-lg border bg-muted/50 p-3 text-left font-mono text-xs text-destructive">
          {error.message}
          {error.digest ? `\ndigest: ${error.digest}` : ''}
        </pre>
      ) : null}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => reset()}
          className="inline-flex min-h-11 items-center justify-center rounded-md bg-primary px-4 text-sm font-semibold text-primary-foreground"
        >
          Try again
        </button>
        <Link
          href="/"
          className="inline-flex min-h-11 items-center justify-center rounded-md border px-4 text-sm font-semibold text-[#0A2540]"
        >
          Home
        </Link>
        <Link
          href="/companies"
          className="inline-flex min-h-11 items-center justify-center rounded-md border px-4 text-sm font-semibold text-[#0A2540]"
        >
          Directory
        </Link>
        <Link
          href="/local-movers"
          className="inline-flex min-h-11 items-center justify-center rounded-md border px-4 text-sm font-semibold text-[#0A2540]"
        >
          Local movers
        </Link>
        <Link
          href="/verify-dot"
          className="inline-flex min-h-11 items-center justify-center rounded-md border px-4 text-sm font-semibold text-[#0A2540]"
        >
          Verify DOT
        </Link>
        <Link
          href="/compare"
          className="inline-flex min-h-11 items-center justify-center rounded-md border px-4 text-sm font-semibold text-[#0A2540]"
        >
          Compare
        </Link>
      </div>
    </main>
  );
}

'use client';

import { useEffect } from 'react';

/**
 * Root-level failure document — replaces the root layout when the app crashes.
 * Must include its own <html> and <body>. Always noindex so error shells
 * never pollute SEO / Lighthouse Accessibility when PSI hits a bad render.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const message =
    typeof error?.message === 'string' && error.message
      ? error.message
      : 'Unexpected application error';

  useEffect(() => {
    try {
      console.error('[mth.global_error]', message, error?.digest);
      const body = JSON.stringify({
        kind: 'react_boundary',
        message: message.slice(0, 800),
        stack: error?.stack?.slice(0, 2000),
        source: error?.digest ? `global-error:${error.digest}` : 'global-error',
        pathname: typeof window !== 'undefined' ? window.location.pathname : undefined,
        href: typeof window !== 'undefined' ? window.location.href : undefined,
        userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : undefined,
        at: new Date().toISOString(),
      });
      if (typeof navigator !== 'undefined' && navigator.sendBeacon) {
        navigator.sendBeacon('/api/client-errors', new Blob([body], { type: 'application/json' }));
      }
    } catch {
      // ignore
    }
  }, [error, message]);

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Something went wrong | Move Trust Hub</title>
        <meta
          name="description"
          content="Move Trust Hub hit a temporary error. Reload or return home to continue independent FMCSA mover research."
        />
        <meta name="robots" content="noindex, nofollow" />
      </head>
      <body
        style={{
          margin: 0,
          fontFamily:
            'system-ui, -apple-system, Segoe UI, Roboto, Helvetica Neue, Arial, sans-serif',
          background: '#ffffff',
          color: '#0A2540',
          lineHeight: 1.5,
        }}
      >
        <main
          id="main-content"
          role="main"
          style={{
            maxWidth: 40 + 'rem',
            margin: '0 auto',
            padding: '3rem 1.25rem',
            textAlign: 'center',
          }}
        >
          <p
            style={{
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: '#c2410c',
              margin: 0,
            }}
          >
            Temporary error
          </p>
          <h1 style={{ fontSize: '1.75rem', margin: '0.75rem 0 0.5rem' }}>
            We couldn&apos;t load this page
          </h1>
          <p style={{ color: '#3d4f63', margin: '0 0 1.5rem' }}>
            This is not the research homepage — something failed while rendering. Try again, or
            open a research surface below. Independent mover research is still available.
          </p>
          {process.env.NODE_ENV === 'development' ? (
            <pre
              style={{
                textAlign: 'left',
                fontSize: 12,
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: 8,
                padding: 12,
                overflow: 'auto',
                marginBottom: 24,
              }}
            >
              {message}
              {error?.digest ? `\ndigest: ${error.digest}` : ''}
            </pre>
          ) : null}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 12,
              justifyContent: 'center',
            }}
          >
            <button
              type="button"
              onClick={() => reset()}
              style={{
                minHeight: 44,
                padding: '0 1.25rem',
                borderRadius: 8,
                border: 'none',
                background: '#0077d6',
                color: '#fff',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Try again
            </button>
            <a
              href="/"
              style={{
                minHeight: 44,
                padding: '0 1.25rem',
                borderRadius: 8,
                border: '1px solid #cbd5e1',
                display: 'inline-flex',
                alignItems: 'center',
                color: '#0A2540',
                fontWeight: 600,
                textDecoration: 'none',
              }}
            >
              Home
            </a>
            <a
              href="/companies"
              style={{
                minHeight: 44,
                padding: '0 1.25rem',
                borderRadius: 8,
                border: '1px solid #cbd5e1',
                display: 'inline-flex',
                alignItems: 'center',
                color: '#0A2540',
                fontWeight: 600,
                textDecoration: 'none',
              }}
            >
              Directory
            </a>
            <a
              href="/local-movers"
              style={{
                minHeight: 44,
                padding: '0 1.25rem',
                borderRadius: 8,
                border: '1px solid #cbd5e1',
                display: 'inline-flex',
                alignItems: 'center',
                color: '#0A2540',
                fontWeight: 600,
                textDecoration: 'none',
              }}
            >
              Local movers
            </a>
            <a
              href="/verify-dot"
              style={{
                minHeight: 44,
                padding: '0 1.25rem',
                borderRadius: 8,
                border: '1px solid #cbd5e1',
                display: 'inline-flex',
                alignItems: 'center',
                color: '#0A2540',
                fontWeight: 600,
                textDecoration: 'none',
              }}
            >
              Verify DOT
            </a>
          </div>
        </main>
      </body>
    </html>
  );
}

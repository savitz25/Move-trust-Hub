'use client';

import React from 'react';

type Props = {
  children: React.ReactNode;
  fallbackTitle?: string;
  /** When set, primary action reloads or re-runs instead of only resetting boundary state. */
  onRetry?: () => void;
  /** Optional recovery (e.g. clear corrupt localStorage) before retry */
  onResetStorage?: () => void;
};

type State = { hasError: boolean; message: string | null };

/** Lightweight boundary — no shadcn Button / logger in the happy path bundle. */
export class ErrorBoundary extends React.Component<Props, State> {
  state: State = { hasError: false, message: null };

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      message: error?.message ? String(error.message) : 'Unknown error',
    };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    if (typeof console !== 'undefined') {
      console.error('ui.error_boundary', error?.message, error, info.componentStack);
    }
    try {
      // Dynamic import keeps happy-path bundle free of report path cycles
      void import('@/lib/reliability/report-client-error').then(({ reportClientError, buildClientErrorPayload }) => {
        reportClientError(
          buildClientErrorPayload({
            kind: 'react_boundary',
            message: error?.message ? String(error.message) : 'ui.error_boundary',
            stack: error?.stack,
            source: info.componentStack?.slice(0, 400) || 'ErrorBoundary',
          })
        );
      });
    } catch {
      // ignore
    }
  }

  render() {
    if (this.state.hasError) {
      const isDev = process.env.NODE_ENV === 'development';
      return (
        <div className="mx-auto max-w-lg px-4 py-12 text-center">
          <h2 className="text-xl font-semibold">
            {this.props.fallbackTitle ?? 'Something went wrong'}
          </h2>
          <p className="mt-2 text-sm text-[#3d4f63]">
            We hit a temporary issue loading this section. Try again, or reset local data if the
            problem persists.
          </p>
          {isDev && this.state.message ? (
            <p className="mt-3 rounded-md border border-destructive/30 bg-destructive/5 px-3 py-2 text-left font-mono text-xs text-destructive">
              {this.state.message}
            </p>
          ) : null}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              className="inline-flex min-h-11 items-center justify-center rounded-md bg-primary px-4 text-sm font-semibold text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              onClick={() => {
                this.setState({ hasError: false, message: null }, () => {
                  this.props.onRetry?.();
                });
              }}
            >
              Try again
            </button>
            {this.props.onResetStorage ? (
              <button
                type="button"
                className="inline-flex min-h-11 items-center justify-center rounded-md border px-4 text-sm font-medium"
                onClick={() => {
                  try {
                    this.props.onResetStorage?.();
                  } catch {
                    // ignore
                  }
                  this.setState({ hasError: false, message: null }, () => {
                    this.props.onRetry?.();
                  });
                }}
              >
                Reset local data
              </button>
            ) : null}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

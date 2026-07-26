'use client';

import React from 'react';

type Props = {
  children: React.ReactNode;
  fallbackTitle?: string;
  /** When set, primary action reloads or re-runs instead of only resetting boundary state. */
  onRetry?: () => void;
};

type State = { hasError: boolean };

/** Lightweight boundary — no shadcn Button / logger in the happy path bundle. */
export class ErrorBoundary extends React.Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    if (typeof console !== 'undefined') {
      console.error('ui.error_boundary', error.message, info.componentStack);
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="container mx-auto max-w-lg px-4 py-16 text-center">
          <h2 className="text-xl font-semibold">
            {this.props.fallbackTitle ?? 'Something went wrong'}
          </h2>
          <p className="mt-2 text-sm text-[#3d4f63]">
            We hit a temporary issue loading this page. Try refreshing, or contact us if
            the problem persists.
          </p>
          <button
            type="button"
            className="mt-6 inline-flex min-h-11 items-center justify-center rounded-md bg-primary px-4 text-sm font-semibold text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            onClick={() => {
              this.setState({ hasError: false }, () => {
                this.props.onRetry?.();
              });
            }}
          >
            Try again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
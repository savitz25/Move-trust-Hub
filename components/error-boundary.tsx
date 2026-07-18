'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { logger } from '@/lib/logging/logger';

type Props = {
  children: React.ReactNode;
  fallbackTitle?: string;
  /** When set, primary action reloads or re-runs instead of only resetting boundary state. */
  onRetry?: () => void;
};

type State = { hasError: boolean };

export class ErrorBoundary extends React.Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    logger.error('ui.error_boundary', {
      message: error.message,
      componentStack: info.componentStack,
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="container mx-auto max-w-lg px-4 py-16 text-center">
          <h2 className="text-xl font-semibold">
            {this.props.fallbackTitle ?? 'Something went wrong'}
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            We hit a temporary issue loading this page. Try refreshing, or contact us if
            the problem persists.
          </p>
          <Button
            className="mt-6"
            onClick={() => {
              this.setState({ hasError: false }, () => {
                this.props.onRetry?.();
              });
            }}
          >
            Try again
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}
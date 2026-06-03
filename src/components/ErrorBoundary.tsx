"use client";

import React, { ReactNode } from "react";
import { AlertCircle, RefreshCw } from "lucide-react";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: (error: Error, reset: () => void) => ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Error caught by boundary:", error);
    console.error("Error info:", errorInfo);
  }

  reset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError && this.state.error) {
      if (this.props.fallback) {
        return this.props.fallback(this.state.error, this.reset);
      }

      return (
        <div className="min-h-screen flex items-center justify-center bg-bg-primary p-4">
          <div className="max-w-md w-full">
            <div className="bg-bg-card rounded-2xl p-8 border border-red-danger/20">
              <div className="flex items-center justify-center mb-4">
                <div className="w-12 h-12 rounded-full bg-red-danger/10 flex items-center justify-center">
                  <AlertCircle className="w-6 h-6 text-red-danger" />
                </div>
              </div>

              <h1 className="text-xl font-bold text-center mb-2 text-text-primary">
                Oops! Something went wrong
              </h1>

              <p className="text-text-secondary text-sm text-center mb-6">
                We encountered an unexpected error. Please try again.
              </p>

              <div className="bg-bg-primary rounded-lg p-4 mb-6 max-h-40 overflow-auto">
                <p className="text-xs font-mono text-red-danger/70 break-words">
                  {this.state.error.message}
                </p>
              </div>

              <button
                onClick={this.reset}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-purple-electric to-blue-neon text-white font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
              >
                <RefreshCw className="w-4 h-4" />
                Try Again
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

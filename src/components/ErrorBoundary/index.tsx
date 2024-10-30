import React, { Component, ReactNode } from 'react';

type ErrorBoundaryState = {
  hasError: boolean;
};

class ErrorBoundary extends Component<{ children: ReactNode }, ErrorBoundaryState> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h2>Oops! Algo no funcionó correctamente.</h2>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

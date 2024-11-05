import { Component, ReactNode } from 'react';

import { useNavigate } from 'react-router-dom';

import Fallback from '../Fallback';

type ErrorBoundaryState = {
  hasError: boolean;
};

class ErrorBoundary extends Component<
  { children: ReactNode },
  ErrorBoundaryState
> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error('ErrorBoundary caught an error', error, errorInfo);
  }

  handleRetry = () => {
    const navigate = useNavigate();
    this.setState({ hasError: false });
    navigate('/shift/list');
  };

  render() {
    if (this.state.hasError) {
      return <Fallback onRetry={this.handleRetry} />;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

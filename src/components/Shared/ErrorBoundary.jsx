// src/components/Shared/ErrorBoundary.jsx
import React, { useState } from 'react';
import { Alert, Button, Box } from '@mui/material';

export default function ErrorBoundary({ children }) {
  const [hasError, setHasError] = useState(false);

  const handleTryAgain = () => {
    setHasError(false);
    window.location.reload();
  };

  return (
    <>
      {hasError ? (
        <Box sx={{ p: 3 }}>
          <Alert severity="error" sx={{ mb: 2 }}>
            Something went wrong.
          </Alert>
          <Button variant="contained" onClick={handleTryAgain}>
            Try Again
          </Button>
        </Box>
      ) : (
        <ErrorBoundaryInner onError={() => setHasError(true)}>
          {children}
        </ErrorBoundaryInner>
      )}
    </>
  );
}

class ErrorBoundaryInner extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    this.props.onError();
  }

  render() {
    return this.state.hasError ? null : this.props.children;
  }
}
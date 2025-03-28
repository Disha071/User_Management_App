// src/App.js
import { Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/Shared/Layout';
import LoadingSpinner from './components/Shared/LoadingSpinner';
import ErrorBoundary from './components/Shared/ErrorBoundary';
import ProtectedRoute from './components/Shared/ProtectedRoute';
import './App.css';

// Lazy load pages with dynamic imports
const LoginPage = lazy(() => import('./pages/LoginPage'));
const UsersPage = lazy(() => import('./pages/UsersPage'));

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route element={<Layout />}>
            {/* Public routes */}
            <Route
              path="/login"
              element={
                <ErrorBoundary>
                  <Suspense fallback={<LoadingSpinner fullPage />}>
                    <LoginPage />
                  </Suspense>
                </ErrorBoundary>
              }
            />
            
            {/* Protected routes */}
            <Route
              path="/users"
              element={
                <ErrorBoundary>
                  <Suspense fallback={<LoadingSpinner fullPage />}>
                    <ProtectedRoute>
                      <UsersPage />
                    </ProtectedRoute>
                  </Suspense>
                </ErrorBoundary>
              }
            />
            
            {/* Redirects */}
            <Route 
              path="/" 
              element={
                <ErrorBoundary>
                  <Navigate to="/users" replace />
                </ErrorBoundary>
              } 
            />
            
            {/* Fallback route */}
            <Route
              path="*"
              element={
                <ErrorBoundary>
                  <Navigate to="/users" replace />
                </ErrorBoundary>
              }
            />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
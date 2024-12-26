import React, { lazy, Suspense } from 'react';

import {
  BrowserRouter as Router,
  Route,
  Routes,
  RouteProps,
} from 'react-router-dom';

import ErrorBoundary from './components/ErrorBoundary';
import AppLayout from './components/Layout';
import Loading from './components/Loading';
import ProtectedRoute from './hocs/ProtectedRoute';

const Signin = lazy(() => import('./pages/auth/signin'));
const Signup = lazy(() => import('./pages/auth/signup'));
const CreateShift = lazy(() => import('./pages/shift/create'));
const ShiftList = lazy(() => import('./pages/shift/list'));
const NotFound = lazy(() => import('./pages/notFound'));
const ShiftDetails = lazy(() => import('./pages/shift'));
const PatientList = lazy(() => import('./pages/user/patient/list'));
const PatientDetails = lazy(() => import('./pages/user/patient/details'));
const Doctor = lazy(() => import('./pages/user/doctor'));
const ConfirmEmail = lazy(() => import('./pages/auth/confirm-email'));
const EmailConfirmation = lazy(() => import('./pages/auth/email-confirmation'));
const ForgotPassword = lazy(() => import('./pages/auth/forgot-password'));
const ResetPassword = lazy(() => import('./pages/auth/reset-password'));

const routes: RouteProps[] = [
  { path: '/', element: <ShiftList /> },
  { path: '/shift/create', element: <CreateShift /> },
  { path: '/shift/:id', element: <ShiftDetails /> },
  { path: '/shift/list', element: <ShiftList /> },
  { path: '/user/patient/list', element: <PatientList /> },
  { path: '/user/patient/details/:id', element: <PatientDetails /> },
  { path: '/user/doctor/details/:id', element: <Doctor /> },
];

const App: React.FC = () => {
  return (
    <Router>
      <ErrorBoundary>
        <Suspense fallback={<Loading />}>
          <Routes>
            {/* Public Routes */}
            <Route path="/auth/signin" element={<Signin />} />
            <Route path="/auth/signup" element={<Signup />} />
            <Route path="/confirm-email" element={<ConfirmEmail />} />
            <Route path="/email-confirmation" element={<EmailConfirmation />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />

            {/* Protected Routes */}
            <Route
              path="*"
              element={
                <AppLayout>
                  <Routes>
                    {routes.map((route) => (
                      <Route
                        key={route.path}
                        path={route.path}
                        element={
                          <ProtectedRoute>{route.element}</ProtectedRoute>
                        }
                      />
                    ))}
                  </Routes>
                </AppLayout>
              }
            />

            {/* 404 Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </Router>
  );
};

export default App;

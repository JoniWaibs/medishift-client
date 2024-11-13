import React, { lazy, Suspense } from 'react';

import {
  BrowserRouter as Router,
  Route,
  Routes,
  RouteProps,
} from 'react-router-dom';

import ErrorBoundary from './components/ErrorBoundary';
import Loading from './components/Loading';
import ProtectedRoute from './hocs/ProtectedRoute';

const Signin = lazy(() => import('./pages/auth/signin'));
const Signup = lazy(() => import('./pages/auth/signup'));
const CreateShift = lazy(() => import('./pages/shift/create'));
const ShiftList = lazy(() => import('./pages/shift/list'));
const NotFound = lazy(() => import('./pages/notFound'));
const ShiftDetails = lazy(() => import('./pages/shift'));
const Patient = lazy(() => import('./pages/user/patient'));
const Doctor = lazy(() => import('./pages/user/doctor'));

const routes: RouteProps[] = [
  { path: '/', element: <ShiftList /> },
  { path: '/shift/create', element: <CreateShift /> },
  { path: '/shift/:id', element: <ShiftDetails /> },
  { path: '/user/patient/:id', element: <Patient /> },
  { path: '/user/doctor/:id', element: <Doctor /> },
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

            {/* Protected Routes */}
            {routes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={<ProtectedRoute>{route.element}</ProtectedRoute>}
              />
            ))}

            {/* 404 Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </Router>
  );
};

export default App;

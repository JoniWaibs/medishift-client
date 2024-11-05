import React, { lazy, ReactNode, Suspense } from 'react';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import ErrorBoundary from './components/ErrorBoundary';
import { Loading } from './components/Loading';

const Signin = lazy(() => import('./pages/auth/signin'));
const Signup = lazy(() => import('./pages/auth/signup'));
const CreateShift = lazy(() => import('./pages/shift/create'));
const ShiftList = lazy(() => import('./pages/shift/list'));
const NotFound = lazy(() => import('./pages/notFound'));
const ShiftDetails = lazy(() => import('./pages/shift'));

export const routes: { path: string; element: ReactNode }[] = [
  { path: '/shift/:id', element: <ShiftDetails /> },
  { path: '/shift/list', element: <ShiftList /> },
  { path: '/shift/create', element: <CreateShift /> },
  { path: '/auth/signin', element: <Signin /> },
  { path: '/auth/signup', element: <Signup /> },
  { path: '*', element: <NotFound /> },
];

const App: React.FC = () => {
  return (
    <Router>
      <ErrorBoundary>
        <Suspense fallback={<Loading />}>
          <Routes>
            {routes.map(
              (route: { path: string; element: ReactNode }): ReactNode => {
                return (
                  <Route
                    key={route.path}
                    path={route.path}
                    element={route.element}
                  />
                );
              },
            )}
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </Router>
  );
};

export default App;

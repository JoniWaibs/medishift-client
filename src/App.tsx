import React, { lazy, ReactNode, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DoctorProfile from './pages/user/doctor';
import PatientProfile from './pages/user/patient';
import ErrorBoundary from './components/ErrorBoundary';
import { Loading } from './components/Loading';
import { Fallback } from './components/Fallback';
import { CreateShift } from './pages/shifts/create';

const Signin = lazy(() => import('./pages/auth/signin'));
const Signup = lazy(() => import('./pages/auth/signup'));
const Shifts = lazy(() => import('./pages/shifts'));

export const routes: {path: string, element: ReactNode}[] = [
  {path: "/shifts", element: <Shifts/>},
  {path: "/shifts/create", element: <CreateShift/>},
  {path: "/shifts/create/:id?", element: <CreateShift/>},
  {path: "/auth/signin", element:<Signin/>},
  {path: "/auth/signup", element: <Signup/>},
  {path: "/user/doctor", element: <DoctorProfile />},
  {path: "/user/patient", element: <PatientProfile/>},
  {path: "/user/patient", element: <PatientProfile/>},
  {path: "*", element: <Fallback/>}
]

const App: React.FC = () => {
  return (
    <Router>
      <ErrorBoundary>
      <Suspense fallback={<Loading />}>
        <Routes>
          {routes.map((route: {path: string, element: ReactNode}): ReactNode => {
            return <Route key={route.path} path={route.path} element={route.element} />;
          })}
        </Routes>
        </Suspense>
      </ErrorBoundary>
    </Router>
  );
}

export default App;
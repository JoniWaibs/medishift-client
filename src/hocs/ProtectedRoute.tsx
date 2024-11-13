import React, { useEffect, useState } from 'react';

import { Navigate, useLocation } from 'react-router-dom';

import { Loading } from '../components/Loading';
import { RequestMethods } from '../enums';
import { useClientSideRequest } from '../hooks/useRestClient';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const location = useLocation();
  const [authState, setAuthState] = useState<{
    isAuthenticated: boolean | null;
    isLoading: boolean;
  }>({
    isAuthenticated: null,
    isLoading: true,
  });

  const { request } = useClientSideRequest({
    method: RequestMethods.CURRENT_USER,
  });

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await request();

        setAuthState({
          isAuthenticated: !!response.user.id,
          isLoading: false,
        });
      } catch {
        setAuthState({
          isAuthenticated: false,
          isLoading: false,
        });
      }
    };

    checkAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (authState.isLoading) {
    return <Loading />;
  }

  if (!authState.isAuthenticated) {
    return (
      <Navigate to="/auth/signin" state={{ from: location.pathname }} replace />
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;

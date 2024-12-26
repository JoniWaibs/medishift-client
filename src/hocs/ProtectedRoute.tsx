import React, { useEffect, useState } from 'react';

import { Navigate, useLocation } from 'react-router-dom';

import Loading from '@/components/Loading';
import { useUserStore } from '@/contexts/UserContext';
import { RequestMethods } from '@/enums';
import { useClientSideRequest } from '@/hooks/useRestClient';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const location = useLocation();
  const setUser = useUserStore((store) => store.setUser);
  const user = useUserStore((store) => store.user);

  const { request } = useClientSideRequest({
    method: RequestMethods.CURRENT_USER,
  });

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await request();

        setUser(response.user);
      } catch {
        setUser(null);
      }
    };

    checkAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (user === null) {
    return <Loading />;
  }

  if (!user) {
    return (
      <Navigate to="/auth/signin" state={{ from: location.pathname }} replace />
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;

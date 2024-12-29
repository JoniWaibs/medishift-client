import React from 'react';

import { useLocation } from 'react-router-dom';

import FooterNavigation from '../FooterNavigation';

const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();

  const authRoutes = [
    '/auth/signin',
    '/auth/signup',
    '/forgot-password',
    '/reset-password',
    '/confirm-email',
    '/email-confirmation',
  ];

  const hideFooter = authRoutes.includes(location.pathname);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex justify-center items-center h-8 bg-white border-b border-gray-200 sticky top-0 z-50">
        Medishift
      </div>
      <main className="flex-grow bg-gray-100">{children}</main>
      {!hideFooter && <FooterNavigation />}
    </div>
  );
};

export default AppLayout;

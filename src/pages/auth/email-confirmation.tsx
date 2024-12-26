import React, { useEffect, useState } from 'react';

import { useNavigate, useSearchParams } from 'react-router-dom';

import ErrorBadge from '@/components/ErrorBadge';
import Loading from '@/components/Loading';
import { RequestMethods } from '@/enums';
import { useClientSideRequest } from '@/hooks/useRestClient';

const EmailConfirmation: React.FC = () => {
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const token = searchParams.get('token');
  const navigate = useNavigate();

  const { request, loading, error } = useClientSideRequest({
    method: RequestMethods.CONFIRM_EMAIL,
    onSuccessCallback: () => {
      setIsConfirmed(true);
      setTimeout(() => {
        navigate('/auth/signin', { replace: true });
      }, 3000);
    },
  });

  useEffect(() => {
    setSearchParams({ token: token || '' });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleConfirmEmail = async () => {
    if (searchParams) {
      await request(token!);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="auth-container px-4">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="auth-heading">Confirmación de Email</h2>
        <p
          className="mt-2 text-center text-sm"
          style={{ color: 'var(--border-color)' }}
        >
          {isConfirmed
            ? '¡Tu email fue confirmado exitosamente!'
            : 'Confirmá tu dirección de email para continuar'}
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="auth-form-container">
          <div className="text-center space-y-6">
            {isConfirmed ? (
              <div className="space-y-4">
                <div className="text-center">
                  <svg
                    className="mx-auto h-12 w-12"
                    style={{ color: 'var(--accent-color)' }}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <p
                  className="text-sm"
                  style={{ color: 'var(--heading-color)' }}
                >
                  Vas a ser redirigido al inicio de sesión en unos segundos...
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <p
                  className="text-sm"
                  style={{ color: 'var(--heading-color)' }}
                >
                  Hacé click en el botón para confirmar tu dirección de email y
                  activar tu cuenta.
                </p>

                {error && <ErrorBadge error={error} />}

                <button
                  onClick={handleConfirmEmail}
                  disabled={!token || loading}
                  className="submit-button"
                >
                  {loading ? 'Confirmando...' : 'Confirmar Email'}
                </button>

                {!token && (
                  <p
                    className="text-sm"
                    style={{ color: 'var(--border-color)' }}
                  >
                    Token de confirmación no válido. Por favor, verificá el
                    enlace en tu email.
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailConfirmation;

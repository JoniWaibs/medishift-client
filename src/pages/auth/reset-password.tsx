import React, { useState } from 'react';

import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate, useSearchParams } from 'react-router-dom';

import ErrorBadge from '@/components/ErrorBadge';
import Loading from '@/components/Loading';
import { RequestMethods } from '@/enums';
import { useClientSideRequest } from '@/hooks/useRestClient';

interface ResetPasswordFormData {
  password: string;
  confirmPassword: string;
}

const ResetPassword: React.FC = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const navigate = useNavigate();
  const [isReset, setIsReset] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ResetPasswordFormData>();

  const { request, loading, error } = useClientSideRequest({
    method: RequestMethods.RESET_PASSWORD,
    onSuccessCallback: () => {
      setIsReset(true);
      setTimeout(() => {
        navigate('/auth/signin', { replace: true });
      }, 3000);
    },
  });

  const password = watch('password');

  const onSubmit: SubmitHandler<ResetPasswordFormData> = async (data) => {
    if (token) {
      await request({ token, newPassword: data.password });
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="auth-container px-4">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="auth-heading">Restablecer contraseña</h2>
        <p
          className="mt-2 text-center text-sm"
          style={{ color: 'var(--border-color)' }}
        >
          {isReset
            ? '¡Tu contraseña fue actualizada!'
            : 'Ingresá tu nueva contraseña'}
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="auth-form-container">
          <div className="text-center space-y-6">
            {isReset ? (
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
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <label htmlFor="password" className="auth-label">
                    Nueva contraseña
                  </label>
                  <div className="mt-1">
                    <input
                      {...register('password', {
                        required: 'La contraseña es requerida',
                        minLength: {
                          value: 6,
                          message:
                            'La contraseña debe tener al menos 6 caracteres',
                        },
                      })}
                      type="password"
                      className="auth-input"
                      placeholder="********"
                    />
                    {errors.password && (
                      <p className="auth-error">{errors.password.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="auth-label">
                    Confirmar contraseña
                  </label>
                  <div className="mt-1">
                    <input
                      {...register('confirmPassword', {
                        required: 'Por favor confirma tu contraseña',
                        validate: (value) =>
                          value === password || 'Las contraseñas no coinciden',
                      })}
                      type="password"
                      className="auth-input"
                      placeholder="********"
                    />
                    {errors.confirmPassword && (
                      <p className="auth-error">
                        {errors.confirmPassword.message}
                      </p>
                    )}
                  </div>
                </div>

                {error && <ErrorBadge error={error} />}

                {!token && (
                  <p
                    className="text-sm"
                    style={{ color: 'var(--border-color)' }}
                  >
                    Token de restablecimiento no válido. Por favor, verificá el
                    enlace en tu email.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={!token || loading}
                  className="submit-button"
                >
                  {loading ? 'Actualizando...' : 'Actualizar contraseña'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;

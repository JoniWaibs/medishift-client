import React, { useState } from 'react';

import { SubmitHandler, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import ErrorBadge from '@/components/ErrorBadge';
import { RequestMethods } from '@/enums';
import { useClientSideRequest } from '@/hooks/useRestClient';

const ForgotPassword: React.FC = () => {
  const [showSendEmail, setShowSendEmail] = useState(false);

  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<{ email: string }>();

  const { request, error } = useClientSideRequest({
    method: RequestMethods.FORGOT_PASSWORD,
  });

  const onSubmit: SubmitHandler<{ email: string }> = async (data) => {
    setShowSendEmail(true);
    await request(data.email);
  };

  return (
    <div className="auth-container px-4">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="auth-heading">Recuperar contraseña</h2>
        <div className="mt-2 text-center text-sm">
          <Link to="/auth/signin" className="auth-link">
            Iniciar sesión
          </Link>
        </div>
      </div>
      {!showSendEmail ? (
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="auth-form-container">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label htmlFor="email" className="auth-label">
                  Email
                </label>
                <div className="mt-1">
                  <input
                    {...register('email', {
                      required: 'El email es requerido',
                    })}
                    type="email"
                    className="auth-input"
                    placeholder="maria@email.com"
                  />
                  {errors.email && (
                    <p className="auth-error">{errors.email.message}</p>
                  )}
                </div>
              </div>
              {error && <ErrorBadge error={error} />}
              <div>
                <button type="submit" className="auth-button">
                  Enviar correo de recuperación
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <p
          className="mt-2 text-center text-sm"
          style={{ color: 'var(--border-color)' }}
        >
          Te enviamos un correo de recuperación, por favor revisá tu email.
        </p>
      )}
    </div>
  );
};

export default ForgotPassword;

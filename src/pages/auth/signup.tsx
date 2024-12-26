import React from 'react';

import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

import ErrorBadge from '@/components/ErrorBadge';
import Loading from '@/components/Loading';
import { RequestMethods, UserRole } from '@/enums';
import { useClientSideRequest } from '@/hooks/useRestClient';
import { SignUpProps } from '@/models';

const Signup: React.FC<{}> = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpProps>();
  const navigate = useNavigate();
  const { request, loading, error } = useClientSideRequest({
    onSuccessCallback: () => navigate('/confirm-email', { replace: true }),
    method: RequestMethods.SIGN_UP,
  });

  const onSubmit: SubmitHandler<SignUpProps> = async (data) => {
    const signUpPayload: SignUpProps = {
      ...data,
      role: UserRole.DOCTOR,
      contactInfo: {
        email: data.contactInfo.email,
        phone: {
          area: data.contactInfo.phone.area,
          number: data.contactInfo.phone.number,
        },
      },
    };
    request(signUpPayload);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="auth-container px-4">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="auth-heading">Crear cuenta gratis</h2>
        <p
          className="mt-2 text-center text-sm"
          style={{ color: 'var(--border-color)' }}
        >
          ¿Ya tienes una cuenta?{' '}
          <Link to="/auth/signin" className="auth-link">
            Iniciar sesión
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="auth-form-container">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label htmlFor="name" className="auth-label">
                Nombre
              </label>
              <div className="mt-1">
                <input
                  {...register('name', { required: 'El nombre es requerido' })}
                  type="text"
                  className="auth-input"
                  placeholder="Maria"
                />
                {errors.name && (
                  <p className="auth-error">{errors.name.message}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="lastName" className="auth-label">
                Apellido
              </label>
              <div className="mt-1">
                <input
                  {...register('lastName', {
                    required: 'El apellido es requerido',
                  })}
                  type="text"
                  className="auth-input"
                  placeholder="Perez"
                />
                {errors.lastName && (
                  <p className="auth-error">{errors.lastName.message}</p>
                )}
              </div>
            </div>

            <div className="flex space-x-2">
              <div className="w-2/5">
                <label htmlFor="phoneArea" className="auth-label">
                  Código área
                </label>
                <div className="mt-1 flex">
                  <input
                    type="text"
                    className="auth-input w-1/3 text-center bg-gray-300"
                    disabled
                    value="0"
                  />
                  <input
                    {...register('contactInfo.phone.area', {
                      required: 'Requerido',
                      pattern: {
                        value: /^[0-9]{2,4}$/,
                        message: 'Código inválido',
                      },
                    })}
                    type="text"
                    className="auth-input w-2/3"
                    placeholder="11"
                  />
                </div>
                {errors.contactInfo?.phone?.area && (
                  <p className="auth-error">
                    {errors.contactInfo.phone.area.message}
                  </p>
                )}
              </div>
              <div className="w-3/5">
                <label htmlFor="phoneNumber" className="auth-label">
                  Número de teléfono
                </label>
                <div className="mt-1 flex">
                  <input
                    type="text"
                    className="auth-input w-1/5 text-center bg-gray-300"
                    disabled
                    value="15"
                  />
                  <input
                    {...register('contactInfo.phone.number', {
                      required: 'Requerido',
                      pattern: {
                        value: /^[0-9]{6,8}$/,
                        message: 'Número inválido',
                      },
                    })}
                    type="text"
                    className="auth-input w-4/5"
                    placeholder="15123456"
                  />
                </div>
                {errors.contactInfo?.phone?.number && (
                  <p className="auth-error">
                    {errors.contactInfo.phone.number.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="specialization" className="auth-label">
                Especialización
              </label>
              <div className="mt-1">
                <input
                  {...register('specialization', {
                    required: 'La especialización es requerida',
                  })}
                  type="text"
                  className="auth-input"
                  placeholder="Medicina interna"
                />
                {errors.specialization && (
                  <p className="auth-error">{errors.specialization.message}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="email" className="auth-label">
                Email
              </label>
              <div className="mt-1">
                <input
                  {...register('contactInfo.email', {
                    required: 'El email es requerido',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Email inválido',
                    },
                  })}
                  type="email"
                  className="auth-input"
                  placeholder="maria@email.com"
                />
                {errors.contactInfo?.email && (
                  <p className="auth-error">
                    {errors.contactInfo.email.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="password" className="auth-label">
                Contraseña
              </label>
              <div className="mt-1">
                <input
                  {...register('password', {
                    required: 'La contraseña es requerida',
                    minLength: {
                      value: 6,
                      message: 'La contraseña debe tener al menos 8 caracteres',
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

            {error && <ErrorBadge error={error} />}

            <div>
              <button type="submit" className="submit-button">
                Crear cuenta
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;

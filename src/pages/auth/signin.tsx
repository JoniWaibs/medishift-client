import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

import Loading from '@/components/Loading';
import { RequestMethods } from '@/enums';
import { useClientSideRequest } from '@/hooks/useRestClient';
import { SignInProps } from '@/models';

import '../../App.css';

const Signin = () => {
  const navigate = useNavigate();
  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<SignInProps>();
  const { request, loading, error } = useClientSideRequest({
    onSuccessCallback: () => navigate('/', { replace: true }),
    method: RequestMethods.SIGN_IN,
  });

  const onSubmit: SubmitHandler<SignInProps> = async (data) =>
    await request({ ...data });

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="auth-container px-4">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="auth-heading">Iniciar sesión</h2>
        <p
          className="mt-2 text-center text-sm"
          style={{ color: 'var(--border-color)' }}
        >
          ¿No tienes una cuenta?{' '}
          <Link to="/auth/signup" className="auth-link">
            Registrate aquí
          </Link>
        </p>
      </div>

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
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Email inválido',
                    },
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

            <div>
              <label htmlFor="password" className="auth-label">
                Contraseña
              </label>
              <div className="mt-1">
                <input
                  {...register('password', {
                    required: 'La contraseña es requerida',
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

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="auth-checkbox"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm"
                  style={{ color: 'var(--border-color)' }}
                >
                  Recordarme
                </label>
              </div>

              <div className="text-sm">
                <Link to="/auth/forgot-password" className="auth-link">
                  ¿Olvidaste tu contraseña?
                </Link>
              </div>
            </div>

            {error && (
              <div
                className="rounded-md p-4"
                style={{ backgroundColor: 'var(--background-color)' }}
              >
                <div className="flex">
                  <div className="ml-3">
                    <h3
                      className="text-sm font-medium"
                      style={{ color: 'var(--border-color)' }}
                    >
                      {error}
                    </h3>
                  </div>
                </div>
              </div>
            )}

            <div>
              <button type="submit" className="auth-button">
                Iniciar sesión
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signin;

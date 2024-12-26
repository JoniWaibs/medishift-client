import React from 'react';

import { Link } from 'react-router-dom';

const ConfirmEmail: React.FC = () => {
  return (
    <div className="auth-container px-4">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="auth-heading">Confirmá tu email</h2>
        <p
          className="mt-2 text-center text-sm"
          style={{ color: 'var(--border-color)' }}
        >
          Te enviamos un correo de confirmación
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="auth-form-container">
          <div className="text-center space-y-6">
            <div className="space-y-4">
              <p className="text-sm" style={{ color: 'var(--heading-color)' }}>
                Por favor, revisá tu bandeja de entrada y seguí las
                instrucciones para verificar tu cuenta.
              </p>

              <p className="text-sm" style={{ color: 'var(--heading-color)' }}>
                Si no recibiste el correo, revisá tu carpeta de spam o solicitá
                un nuevo correo de confirmación.
              </p>
            </div>

            <div className="space-y-4">
              <button className="submit-button">
                Reenviar correo de confirmación
              </button>

              <div className="flex flex-col items-center space-y-4">
                <Link to="/auth/signin" className="auth-link">
                  Volver al inicio de sesión
                </Link>

                <p className="text-sm" style={{ color: 'var(--border-color)' }}>
                  ¿Necesitas ayuda?{' '}
                  <a href="mailto:soporte@tuapp.com" className="auth-link">
                    Contacta a soporte
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmEmail;

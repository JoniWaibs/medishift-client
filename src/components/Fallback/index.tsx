import React from 'react';

import { FaRedoAlt } from 'react-icons/fa';
import { SiMinutemailer } from 'react-icons/si';

interface FallbackPageProps {
  onRetry: () => void;
}

const Fallback: React.FC<FallbackPageProps> = ({ onRetry }) => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 p-4">
      <div className="text-center p-8 max-w-md">
        <FaRedoAlt className="text-yellow-500 text-6xl mb-4 mx-auto" />
        <h1 className="text-3xl font-semibold text-gray-800 mb-2">
          Algo salió mal
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          Algo salió mal. Por favor, intenta nuevamente o contactá a soporte si
          el problema persiste.
        </p>
        <div className="flex justify-center pb-6">
          <SiMinutemailer className="text-blue-600 text-2xl mr-2" />
          <a
            href={`mailto:${process.env.REACT_APP_SUPPORT_EMAIL}`}
            className="text-lg text-blue-600 "
          >
            {process.env.REACT_APP_SUPPORT_EMAIL}
          </a>
        </div>
        <button
          onClick={onRetry}
          className="font-bold py-2 px-4 submit-button flex items-center justify-center"
        >
          <FaRedoAlt className="mr-2" />
          Reintentar
        </button>
      </div>
    </div>
  );
};

export default Fallback;

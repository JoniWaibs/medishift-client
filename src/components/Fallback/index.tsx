import React from 'react';

import { FaRedoAlt } from 'react-icons/fa';

interface FallbackPageProps {
  onRetry: () => void;
}

const Fallback: React.FC<FallbackPageProps> = ({ onRetry }) => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center p-8 max-w-md bg-white shadow-lg rounded-lg">
        <FaRedoAlt className="text-yellow-500 text-6xl mb-4 mx-auto" />
        <h1 className="text-3xl font-semibold text-gray-800 mb-2">
          Algo salió mal
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          Algo salió mal. Por favor, intenta nuevamente o contacta al soporte si
          el problema persiste.
        </p>
        <button
          onClick={onRetry}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition duration-200 flex items-center justify-center"
        >
          <FaRedoAlt className="mr-2" />
          Retry
        </button>
      </div>
    </div>
  );
};

export default Fallback;

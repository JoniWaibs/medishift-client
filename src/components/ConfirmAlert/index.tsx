import React from 'react';

interface ConfirmAlertProps {
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  isOpen: boolean;
}

const ConfirmAlert: React.FC<ConfirmAlertProps> = ({
  title,
  message,
  onConfirm,
  onCancel,
  isOpen,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
      <div className="bg-white rounded-lg shadow-lg w-80 p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">{title}</h2>

        <p className="text-gray-600 mb-4">{message}</p>

        <div className="flex justify-between space-x-3">
          <button
            onClick={onCancel}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg transition"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-lg transition"
            style={{ backgroundColor: 'var(--heading-color)', color: 'white' }}
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmAlert;

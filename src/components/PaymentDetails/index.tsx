import React from 'react';

import { Payment } from '../../models';

export const PaymentDetailsSection: React.FC<{ payment: Payment }> = ({
  payment,
}) => {
  return (
    <div className="bg-white rounded-lg p-4 shadow-md">
      <h2 className="text-lg font-semibold text-gray-800 mb-2">
        Detalles del pago
      </h2>
      <p className="text-gray-600">
        <span className="font-medium">Monto:</span> ${payment.amount}
      </p>
      <p className="text-gray-600">
        <span className="font-medium">Forma de pago:</span> {payment.method}
      </p>
      <p className="text-gray-600">
        <span className="font-medium">Estado del pago:</span> {payment.status}
      </p>
    </div>
  );
};

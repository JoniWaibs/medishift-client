import React from 'react';

import { PaymentMethod } from '../../enums';

interface PaymentMethodSelectProps {
  value?: PaymentMethod;
  onChange: (method: PaymentMethod) => void;
  paymentMethods: Map<PaymentMethod | undefined, string>;
}

export const PaymentMethodSelect: React.FC<PaymentMethodSelectProps> = ({
  value,
  onChange,
  paymentMethods,
}) => {
  return (
    <div className="text-gray-600">
      <span className="font-medium">Forma de pago:</span>{' '}
      <select
        value={value ?? undefined}
        onChange={(e) => {
          const selectedValue = e.target.value
            ? (e.target.value as PaymentMethod)
            : undefined;
          onChange(selectedValue as PaymentMethod);
        }}
        className="ml-2 p-1 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {Array.from(paymentMethods.entries()).map(([method, label]) => (
          <option key={method ?? 'undefined'} value={method ?? ''}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
};

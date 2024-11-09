import React from 'react';

interface PaymentFieldProps {
  label: string;
  value: string | undefined;
  className?: string;
}

export const ShiftDataField: React.FC<PaymentFieldProps> = ({
  label,
  value,
  className,
}) => (
  <div className="text-gray-600">
    <span className="font-medium">{label}:</span>{' '}
    <span className={`font-medium ${className ?? ''}`}>{value}</span>
  </div>
);

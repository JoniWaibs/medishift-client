/* eslint-disable prettier/prettier */
import React, { useState, useMemo } from 'react';

import { PaymentMethod, PaymentStatus } from '../../enums';
import { Payment, Shift } from '../../models';
import { PaymentMethodSelect } from '../PaymentMethodSelect';
import { ShiftDataField } from '../ShiftDataField';
import { StatusDropdown } from '../StatusDropDown';

interface PaymentDetailsProps {
  shift: Shift;
  onStatusChange?: (payment: Payment) => void;
  onPaymentMethodChange?: (payment: Payment) => void;
}

export const PaymentDetailsSection: React.FC<PaymentDetailsProps> = ({
  shift,
  onStatusChange,
  onPaymentMethodChange,
}) => {
  const [shiftPayment, setShiftPayment] = useState<Payment>(shift.payment);

  const { paymentStatus, paymentMethodColor, paymentMethod } = useMemo(() => ({
    paymentStatus: new Map([
      [PaymentStatus.PENDING, 'Pendiente'],
      [PaymentStatus.PAID, 'Pagado'],
      [PaymentStatus.UNPAID, 'No pagado'],
    ]),
    paymentMethodColor: new Map([
      [PaymentStatus.PENDING, 'text-yellow-500'],
      [PaymentStatus.PAID, 'text-green-500'],
      [PaymentStatus.UNPAID, 'text-red-500'],
    ]),
    paymentMethod: new Map([
      [PaymentMethod.UNKNOWN, 'No definido'],
      [PaymentMethod.CASH, 'Efectivo'],
      [PaymentMethod.TRANSFER, 'Transferencia'],
      [PaymentMethod.CREDIT_CARD, 'Tarjeta de crédito'],
      [PaymentMethod.DEBIT_CARD, 'Tarjeta de débito'],
    ]),
  }), []);

  const handleStatusChange = (newStatus: PaymentStatus) => {
    const updatedPayment = { ...shiftPayment, status: newStatus };
    setShiftPayment(updatedPayment);
    onStatusChange?.(updatedPayment);
  };

  const handlePaymentMethodChange = (method: PaymentMethod) => {
    const updatedPayment = { ...shiftPayment, method: method || PaymentMethod.UNKNOWN };
    setShiftPayment(updatedPayment);
    onPaymentMethodChange?.(updatedPayment);
  };

  const currentStatus = shiftPayment.status ?? PaymentStatus.PENDING;
  const currentMethod = shiftPayment.method ?? PaymentMethod.UNKNOWN;

  return (
    <div className="bg-white rounded-lg p-4 shadow-md">
      <h2 className="text-lg font-semibold text-gray-800 mb-2">
        Detalles del pago
      </h2>
      
      <div className="space-y-2">
        <ShiftDataField 
          label="Monto" 
          value={`$ ${shiftPayment.amount}`} 
        />
      
        <PaymentMethodSelect
          value={currentMethod}
          onChange={handlePaymentMethodChange}
          paymentMethods={paymentMethod}
        />
          
        <ShiftDataField 
          label="Estado del pago" 
          value={paymentStatus.get(currentStatus)}
          className={paymentMethodColor.get(currentStatus) || 'text-gray-600'}
        />
      </div>

      <StatusDropdown
        statuses={paymentStatus}
        onSelect={handleStatusChange}
      />
    </div>
  );
};







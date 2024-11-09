import React, { useMemo, useState } from 'react';

import { ShiftStatus } from '../../enums';
import { Shift } from '../../models';
import { ShiftDataField } from '../ShiftDataField';
import { StatusDropdown } from '../StatusDropDown';

interface ShiftDetailsProps {
  shift: Shift;
}

export const ShiftDetailsSection: React.FC<ShiftDetailsProps> = ({ shift }) => {
  const [shiftStatus, setShiftStatus] = useState<ShiftStatus>(
    ShiftStatus.PENDING,
  );

  const { statusText, statusColor, appointmentType } = useMemo(
    () => ({
      statusText: new Map([
        [ShiftStatus.PENDING, 'Pendiente'],
        [ShiftStatus.COMPLETE, 'Completado'],
        [ShiftStatus.SUSPENDED, 'Suspendido'],
        [ShiftStatus.CANCELED, 'Cancelado'],
      ]),
      statusColor: new Map([
        [ShiftStatus.PENDING, 'text-yellow-500'],
        [ShiftStatus.COMPLETE, 'text-green-500'],
        [ShiftStatus.SUSPENDED, 'text-gray-500'],
        [ShiftStatus.CANCELED, 'text-red-500'],
      ]),
      appointmentType: new Map([
        ['in-person', 'Presencial'],
        ['virtual', 'Virtual'],
      ]),
    }),
    [],
  );

  function handleStatusChange(status: ShiftStatus): void {
    setShiftStatus(status);
  }

  return (
    <div className="bg-white rounded-lg p-4 shadow-md space-y-2">
      <h2 className="text-lg font-semibold text-gray-800 mb-2">
        Detalles del turno
      </h2>

      <ShiftDataField
        label="Estado del turno"
        value={statusText.get(shiftStatus) ?? 'No definido'}
        className={statusColor.get(shiftStatus) ?? 'text-gray-500'}
      />

      <ShiftDataField
        label="Modalidad"
        value={appointmentType.get(shift.appointmentType)}
      />

      <ShiftDataField label="Fecha" value={shift.date} />

      <div className="flex justify-between text-gray-600">
        <ShiftDataField label="Desde" value={shift.startTime} />
        <ShiftDataField label="Hasta" value={shift.endTime} />
      </div>

      {shift.location && (
        <ShiftDataField label="Locación" value={shift.location.name} />
      )}

      {shift.notes && (
        <ShiftDataField label="Notas del turno" value={shift.notes} />
      )}

      <StatusDropdown statuses={statusText} onSelect={handleStatusChange} />
    </div>
  );
};

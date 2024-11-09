import React, { useState, useEffect } from 'react';

import { RequestMethods, QueryType } from '../../enums';
import { useClientSideRequest } from '../../hooks/useRestClient';
import { Patient } from '../../models';
interface PatientInfoSectionProps {
  id: string;
}

export const PatientInfoSection: React.FC<PatientInfoSectionProps> = ({
  id,
}) => {
  const [patient, setPatient] = useState<Patient | null>(null);

  const { request } = useClientSideRequest({
    method: RequestMethods.SEARCH_PATIENT,
  });

  const fetchShift = async () => {
    if (id) {
      const [patient] = await request({ type: QueryType.ID, value: id });
      setPatient(patient);
    }
  };

  useEffect(() => {
    fetchShift();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!patient) {
    return (
      <div>Los datos del paciente no estan disponibles por el momento</div>
    );
  }

  return (
    <div className="bg-white rounded-lg p-4 shadow-md">
      <h2 className="text-lg font-semibold text-gray-800 mb-2">
        Informatición de tu paciente
      </h2>
      <p className="text-gray-600">
        <span className="font-medium">Nombre:</span> {patient.name}{' '}
        {patient.lastName}
      </p>
      <p className="text-gray-600">
        <span className="font-medium">DNI:</span> {patient.identificationNumber}
      </p>
      {patient.notes && (
        <p className="text-gray-600">
          <span className="font-medium">Notas:</span> {patient.notes}
        </p>
      )}
      {patient.currentMedications && (
        <p className="text-gray-600">
          <span className="font-medium">Medicaciones:</span>{' '}
          {patient.currentMedications.join(', ')}
        </p>
      )}
      <p className="text-gray-600">
        <span className="font-medium">Paciente:</span>{' '}
        {patient.isActive ? 'Activo' : 'Inactivo'}
      </p>
      <p className="text-gray-600">
        <span className="font-medium">OS:</span>{' '}
        {patient.insurerData.providerName}
      </p>
    </div>
  );
};

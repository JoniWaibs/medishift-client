import { useEffect, useState } from 'react';

import { ImWhatsapp } from 'react-icons/im';
import { useNavigate } from 'react-router-dom';

import { QueryType, RequestMethods } from '../../enums';
import { useClientSideRequest } from '../../hooks/useRestClient';
import { Patient, Shift } from '../../models';
import { Loading } from '../Loading';

export const ShiftListCard = ({ shift }: { shift: Shift }) => {
  const navigate = useNavigate();
  const [patient, setPatient] = useState<Patient | null>(null);

  const { request, loading } = useClientSideRequest({
    method: RequestMethods.SEARCH_PATIENT,
  });

  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        const patients = await request({
          type: QueryType.ID,
          value: shift.patientId,
        });
        setPatient(patients[0] || null);
      } catch (err) {
        console.error('Error fetching patient data:', err);
      }
    };

    fetchPatientData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (!patient) {
    return (
      <div>Los datos del paciente no estan disponibles por el momento</div>
    );
  }

  const { name, lastName } = patient;
  const { date, startTime, endTime, notes } = shift;

  return (
    <div
      className="mb-4 cursor-pointer"
      onClick={() => navigate(`/shift/${shift.id}`)}
    >
      <div className="flex justify-between">
        <p className="text-xl font-semibold text-gray-800 mb-2 px-2">
          {startTime}
        </p>
      </div>
      <div className="bg-white shadow-md rounded-lg p-4 border border-gray-200">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-xs text-gray-700">Paciente:</p>
            <div className="text-lg font-semibold text-gray-800 capitalize">
              {name} {lastName}
            </div>
          </div>
          <button className="bg-green-500 rounded-full p-2">
            <ImWhatsapp className="text-2xl text-white" />
          </button>
        </div>
        <div className="text-gray-600">
          <div>
            <span className="text-xs text-gray-700">Fecha:</span>
            <p className="font-medium text-gray-800 font-semibold">{date}</p>
          </div>

          <div className="flex justify-between">
            <div>
              <span className="text-xs text-gray-700">Desde:</span>
              <p className="font-medium text-gray-800 font-semibold">
                {startTime}
              </p>
            </div>
            <div>
              <span className="text-xs text-gray-700">Hasta:</span>
              <p className="font-medium text-gray-800 font-semibold">
                {endTime}
              </p>
            </div>
          </div>
        </div>
        {notes && (
          <div className="text-gray-800, bg-gray-100 p-2 rounded-md mt-4 text-sm">
            <p>{notes}</p>
          </div>
        )}
      </div>
    </div>
  );
};

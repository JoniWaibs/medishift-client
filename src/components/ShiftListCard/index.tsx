import React, { useEffect, useMemo, useState } from 'react';

import { ImWhatsapp } from 'react-icons/im';
import { Link, useNavigate } from 'react-router-dom';

import Loading from '@/components/Loading';
import { QueryType, RequestMethods, ShiftStatus } from '@/enums';
import { useClientSideRequest } from '@/hooks/useRestClient';
import { Patient, Shift } from '@/models';
import { handleOpenWhatsapp } from '@/utils/openWhatsapp';

interface ShiftListCardProps {
  shift: Shift;
}

export const ShiftListCard: React.FC<ShiftListCardProps> = ({ shift }) => {
  const navigate = useNavigate();
  const [patient, setPatient] = useState<Patient | null>(null);

  const { request } = useClientSideRequest({
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

  const { statusColor } = useMemo(
    () => ({
      statusColor: new Map([
        [ShiftStatus.PENDING, 'border-yellow-400'],
        [ShiftStatus.FINISHED, ' border-green-400'],
        [ShiftStatus.CANCELLED, 'border-red-400'],
        [ShiftStatus.SUSPENDED, 'border-gray-400'],
      ]),
    }),
    [],
  );

  if (!patient) {
    return (
      <div className="opacity-50 bg-gray-200 p-4 rounded-lg">
        Los datos del turno o del paciente no estan disponibles por el momento
      </div>
    );
  }

  const { name, lastName } = patient;
  const { date, startTime, endTime, notes, status } = shift;

  return (
    <div
      className="mb-4 cursor-pointer relative"
      onClick={() => navigate(`/shift/${shift.id}`)}
    >
      <div className="flex justify-between">
        <p className="text-xl font-semibold text-gray-800 mb-2 px-2">
          {startTime}
        </p>
      </div>
      <div
        className={`${statusColor.get(status)} bg-white shadow-md rounded-lg p-4 border border-gray-200 border-l-8`}
      >
        <div className="flex justify-between items-center">
          <Link
            to={`/user/patient/details/${shift.patientId}`}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              navigate(`/user/patient/details/${shift.patientId}`);
            }}
          >
            <p className="text-xs text-gray-700">Paciente:</p>
            <div className="text-lg font-semibold text-blue-800 capitalize">
              {name} {lastName}
            </div>
          </Link>
          {patient.contactInfo?.phone.number && (
            <button
              className="bg-green-500 rounded-full p-2"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleOpenWhatsapp(patient.contactInfo!);
              }}
            >
              <ImWhatsapp className="text-2xl text-white" />
            </button>
          )}
        </div>
        <div className="text-gray-600">
          <div className="flex justify-between">
            <div>
              <span className="text-xs text-gray-700">Fecha:</span>
              <p className="font-medium text-gray-800 font-semibold">{date}</p>
            </div>
            <div>
              <span className="text-xs text-gray-700">Modalidad:</span>
              <p className="font-medium text-gray-800 font-semibold flex justify-end capitalize">
                {shift.appointmentType ? shift.appointmentType : ''}
              </p>
            </div>
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
              <p className="font-medium text-gray-800 font-semibold flex justify-end">
                {endTime}
              </p>
            </div>
          </div>
        </div>
        {notes && (
          <div className="text-gray-800 bg-gray-100 p-2 rounded-md mt-4 text-sm">
            <p>{notes}</p>
          </div>
        )}
      </div>
    </div>
  );
};

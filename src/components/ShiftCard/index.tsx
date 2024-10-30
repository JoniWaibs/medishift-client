import { useEffect, useState } from "react";
import { QueryType, RequestMethods } from "../../enums";
import { useClientSideRequest } from "../../hooks/useRestClient";
import { Patient, Shift } from "../../models";
import { Loading } from "../Loading";

export const ShiftCard = ({shift}: {shift: Shift}) => {
  const [patient, setPatient] = useState<Patient | null>(null);

  const { request, loading } = useClientSideRequest({
    method: RequestMethods.SEARCH_PATIENT
  });

  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        const patients = await request({type: QueryType.ID, value: shift.patientId}); 
        setPatient(patients[0] || null);
      } catch (err) {
        console.error("Error fetching patient data:", err);
      }
    };

    fetchPatientData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (!patient) {
    return <div>No patient data available</div>;
  }

  const { name, lastName } = patient;
  const { date, startTime, endTime } = shift;

  return (
    <div className="max-w-lg mx-auto mb-4">
      <div className="flex justify-between">
        <p className="text-xl font-semibold text-gray-800 mb-2 px-2">{startTime}</p>
      </div>
      <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-4 mb-4">
        <div className="text-lg font-semibold text-gray-800 mb-2">
          Nombre y apellido: {name} {lastName}
        </div>
        <div className="text-gray-600">
          <p className="mb-1">
            <span className="font-medium text-gray-700">Fecha:</span> {date}
          </p>
          <div className="flex justify-between">
            <p>
              <span className="font-medium text-gray-700">Desde:</span> {startTime}
            </p>
            <p>
              <span className="font-medium text-gray-700">Hasta:</span> {endTime}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
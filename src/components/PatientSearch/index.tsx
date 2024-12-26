import React, { useEffect, useState } from 'react';

import { useForm } from 'react-hook-form';

import { QueryType, RequestMethods } from '../../enums';
import { useDebounce } from '../../hooks/useDebounce';
import { useClientSideRequest } from '../../hooks/useRestClient';
import { Patient } from '../../models';

interface PatientSearchProps {
  onSelectPatient: (patient: Patient) => void;
}

export const PatientSearch: React.FC<PatientSearchProps> = ({
  onSelectPatient,
}) => {
  const { register, watch, setValue } = useForm<{ search: string }>({
    defaultValues: { search: '' },
  });
  const [patients, setPatients] = useState<Patient[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const watchedQuery = watch('search', '');
  const debouncedSearchQuery = useDebounce(watchedQuery, 300);

  const { request, error } = useClientSideRequest({
    method: RequestMethods.SEARCH_PATIENT,
  });

  useEffect(() => {
    const fetchPatientData = async () => {
      if (debouncedSearchQuery.length >= 2) {
        try {
          const patients = await request({
            type: QueryType.SEARCH,
            value: debouncedSearchQuery,
          });
          setPatients(patients || null);
          setShowDropdown(patients.length > 0);
        } catch (err) {
          console.error('Error fetching patient data:', err);
        }
      } else {
        setPatients([]);
        setShowDropdown(false);
      }
    };

    fetchPatientData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchQuery]);

  const handlePatientSelect = (patient: Patient) => {
    onSelectPatient(patient);
    setShowDropdown(false);
    setValue('search', '');
  };

  return (
    <div className="relative">
      {error && <p>{error}</p>}
      <input
        type="text"
        id="patient"
        {...register('search')}
        placeholder="Buscar paciente..."
        className="w-full p-2 border border-gray-300 rounded-md"
      />
      <ul className="bg-white shadow-md max-h-64 overflow-y-auto absolute top-full w-full">
        {showDropdown &&
          patients &&
          patients?.length > 0 &&
          patients.map((patient) => (
            <li
              key={patient.id}
              className="p-2 border-b border-gray-200 last:border-none hover:bg-gray-100"
              onClick={() => handlePatientSelect(patient)}
            >
              <p className="font-medium text-gray-700">
                {patient.name} {patient.lastName}
              </p>
              <p className="text-sm text-gray-500">
                ID: {patient.identificationNumber}
              </p>
            </li>
          ))}
      </ul>
    </div>
  );
};

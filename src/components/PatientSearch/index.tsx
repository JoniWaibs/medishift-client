import { useEffect, useState } from 'react';

import { useForm } from 'react-hook-form';

import { QueryType, RequestMethods } from '../../enums';
import { useDebounce } from '../../hooks/useDebounce';
import { useClientSideRequest } from '../../hooks/useRestClient';
import { Patient } from '../../models';

export const PatientSearch = ({
  onSelectPatient,
}: {
  onSelectPatient: (patient: Patient) => void;
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
    <div className="py-4 max-w-lg mx-auto">
      {error && <p>{error}</p>}
      <input
        {...register('search')}
        placeholder="Search patients..."
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
      />
      <ul className="bg-white border border-gray-200 rounded-md shadow-md">
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

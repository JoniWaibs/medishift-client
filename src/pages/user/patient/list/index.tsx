import React, { useState, useEffect } from 'react';

import { useForm } from 'react-hook-form';
import { AiOutlineSearch } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';

import { Avatar } from '@/components/Avatar';
import { RequestMethods } from '@/enums';
import { useClientSideRequest } from '@/hooks/useRestClient';
import { uppercaseWording } from '@/utils/uppercaseWording';

interface Patient {
  id: string;
  name: string;
  lastName: string;
  identificationNumber: string;
}

const PatientList: React.FC = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [filteredPatients, setFilteredPatients] = useState<Patient[]>([]);
  const { register, watch, setValue } = useForm<{ search: string }>({
    defaultValues: { search: '' },
  });
  const { request } = useClientSideRequest({
    method: RequestMethods.SEARCH_PATIENT,
  });

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await request();
        setPatients(response);
        setFilteredPatients(response);
      } catch (error) {
        console.error('Error fetching patients:', error);
      }
    };

    fetchPatients();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = (term: string) => {
    setValue('search', term);
    const lowerTerm = term.toLowerCase();
    const filtered = patients.filter(
      (patient) =>
        patient.name.toLowerCase().includes(lowerTerm) ||
        patient.lastName.toLowerCase().includes(lowerTerm) ||
        patient.identificationNumber.includes(lowerTerm),
    );
    setFilteredPatients(filtered);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">Pacientes</h1>
      <div className="flex items-center mb-4 bg-white rounded-lg shadow-md p-2">
        <AiOutlineSearch className="text-gray-500 text-xl mr-2" />
        <input
          type="text"
          {...register('search')}
          value={watch('search')}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Buscar paciente..."
          className="w-full border-none outline-none text-gray-800"
        />
      </div>
      <ul className="space-y-4">
        {filteredPatients.map((patient) => (
          <li key={patient.id}>
            <Link
              to={`/user/patient/details/${patient.id}`}
              className="block bg-white shadow-md rounded-lg p-4 border border-gray-200 hover:shadow-lg transition"
            >
              <div className="flex items-center">
                <Avatar
                  imageUrl={''}
                  name={`${uppercaseWording(patient.name)} ${uppercaseWording(patient.lastName)}`}
                  size="sm"
                />
                <div className="flex-1 ml-4">
                  <p className="text-lg font-semibold text-gray-800">
                    {uppercaseWording(patient.name)}{' '}
                    {uppercaseWording(patient.lastName)}
                  </p>
                  <p className="text-sm text-gray-600">
                    DNI: {patient.identificationNumber}
                  </p>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PatientList;

import React, { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';

import { Avatar } from '@/components/Avatar';
import Fallback from '@/components/Fallback';
import Loading from '@/components/Loading';
import { QueryType, RequestMethods } from '@/enums';
import { useClientSideRequest } from '@/hooks/useRestClient';
import { Patient } from '@/models';

const PatientDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient | null>(null);
  const { request, loading } = useClientSideRequest({
    method: RequestMethods.SEARCH_PATIENT,
  });

  const fetchPatient = async () => {
    if (id) {
      const [patient] = await request({
        type: QueryType.ID,
        value: id,
      });

      setPatient(patient);
    }
  };

  useEffect(() => {
    fetchPatient();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (loading) {
    return <Loading />;
  }

  if (!patient) {
    return <Fallback onRetry={fetchPatient} />;
  }

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-6 bg-gray-50 rounded-lg shadow-md">
      <div className="space-y-6">
        <section className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-center space-x-4 mb-6">
            <Avatar
              imageUrl={patient.profilePictureUrl}
              name={`${patient.name} ${patient.lastName}`}
              size="sm"
            />
            <div>
              <h1 className="text-2xl font-bold text-gray-800 capitalize">
                {patient.name} {patient.lastName}
              </h1>
              <p className="text-gray-600">
                DNI: {patient.identificationNumber}
              </p>
            </div>
          </div>

          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Información Personal
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Nombre
              </label>
              <p className="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
                {patient.name}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Apellido
              </label>
              <p className="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
                {patient.lastName}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                DNI
              </label>
              <p className="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
                {patient.identificationNumber}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Fecha de Nacimiento
              </label>
              <p className="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
                {patient.dateOfBirth}
              </p>
            </div>
          </div>
        </section>

        <section className="bg-white p-4 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Información de Contacto
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Teléfono
              </label>
              <p className="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
                {patient.contactInfo?.phone.area}{' '}
                {patient.contactInfo?.phone.number}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <p className="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
                {patient.contactInfo?.email}
              </p>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">
                Dirección
              </label>
              <p className="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
                {patient.contactInfo?.address?.street}
              </p>
            </div>
          </div>
        </section>

        <section className="bg-white p-4 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Información del Contacto de emergencia
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">
                Nombre
              </label>
              <p className="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
                {patient.emergencyContact?.name}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Relacion
              </label>
              <p className="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
                {patient.emergencyContact?.relation}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Teléfono
              </label>
              <p className="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
                {patient.emergencyContact?.contactInfo.phone.area}{' '}
                {patient.emergencyContact?.contactInfo.phone.number}
              </p>
            </div>
          </div>
        </section>

        <section className="bg-white p-4 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Información de OS
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Nombre
              </label>
              <p className="mt-1 block w-full rounded-md border-gray-300 shadow-sm capitalize">
                {patient.insurerData.providerName ?? 'No idefinido'}
              </p>
            </div>
          </div>
        </section>
        <section className="bg-white p-4 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Notas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="mt-1 block w-full rounded-md border-gray-300 shadow-sm capitalize">
                {patient.notes ?? ''}
              </p>
            </div>
          </div>
        </section>
        <div className="flex justify-between">
          <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded">
            Editar
          </button>
          <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
            Crear turno
          </button>
        </div>
      </div>
    </div>
  );
};

export default PatientDetails;

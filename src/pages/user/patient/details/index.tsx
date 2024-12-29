import React, { useEffect, useState } from 'react';

import { ImWhatsapp } from 'react-icons/im';
import { useNavigate, useParams } from 'react-router-dom';

import { Avatar } from '@/components/Avatar';
import ConfirmAlert from '@/components/ConfirmAlert';
import Fallback from '@/components/Fallback';
import Loading from '@/components/Loading';
import { QueryType, RequestMethods } from '@/enums';
import { useClientSideRequest } from '@/hooks/useRestClient';
import { Patient } from '@/models';
import { handleOpenWhatsapp } from '@/utils/openWhatsapp';

const PatientDetails: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [patient, setPatient] = useState<Patient | null>(null);
  const { request, loading } = useClientSideRequest({
    method: RequestMethods.SEARCH_PATIENT,
  });

  const { request: requestDeletePatient } = useClientSideRequest({
    method: RequestMethods.DELETE_PATIENT,
    onSuccessCallback: () => {
      navigate('/user/patient/list');
    },
  });

  const fetchPatient = async () => {
    if (id) {
      const [patient] = await request({
        type: QueryType.ID,
        value: id,
      });

      setPatient(patient);
      setIsAlertOpen(false);
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

  const handleDelete = async () => await requestDeletePatient(patient.id);

  const handleCancel = () => {
    setIsAlertOpen(false);
  };

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-6 bg-gray-50 pb-20">
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
              <p className="mt-1 block w-full rounded-md border-gray-300 shadow-sm capitalize">
                {patient.name}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Apellido
              </label>
              <p className="mt-1 block w-full rounded-md border-gray-300 shadow-sm capitalize">
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
                {patient.dateOfBirth || 'No definida'}
              </p>
            </div>
          </div>
        </section>

        <section className="bg-white p-4 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Información de Contacto
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center justify-between">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Teléfono
                </label>
                <p className="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
                  +{''} {patient.contactInfo?.phone.countryCode}{' '}
                  {patient.contactInfo?.phone.area}{' '}
                  {patient.contactInfo?.phone.number}
                </p>
              </div>
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
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <p className="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
                {patient.contactInfo?.email || 'No definido'}
              </p>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">
                Dirección
              </label>
              <p className="mt-1 block w-full rounded-md border-gray-300 shadow-sm capitalize">
                {patient.contactInfo?.address?.street || 'No definida'}
              </p>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">
                Ciudad
              </label>
              <p className="mt-1 block w-full rounded-md border-gray-300 shadow-sm capitalize">
                {patient.contactInfo?.address?.city || 'No definida'}
              </p>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">
                Provincia
              </label>
              <p className="mt-1 block w-full rounded-md border-gray-300 shadow-sm capitalize">
                {patient.contactInfo?.address?.province || 'No definida'}
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

        {patient.emergencyContact && (
          <section className="bg-white p-4 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Información del Contacto de emergencia
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">
                  Nombre
                </label>
                <p className="mt-1 block w-full rounded-md border-gray-300 shadow-sm capitalize">
                  {patient.emergencyContact?.name}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Relacion
                </label>
                <p className="mt-1 block w-full rounded-md border-gray-300 shadow-sm capitalize">
                  {patient.emergencyContact?.relation}
                </p>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Teléfono
                  </label>
                  <p className="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
                    +{''}
                    {
                      patient.emergencyContact?.contactInfo.phone.countryCode
                    }{' '}
                    {patient.emergencyContact?.contactInfo.phone.area}{' '}
                    {patient.emergencyContact?.contactInfo.phone.number}
                  </p>
                </div>
                {patient.emergencyContact?.contactInfo.phone.number && (
                  <button
                    className="bg-green-500 rounded-full p-2"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleOpenWhatsapp(patient.emergencyContact!.contactInfo);
                    }}
                  >
                    <ImWhatsapp className="text-2xl text-white" />
                  </button>
                )}
              </div>
            </div>
          </section>
        )}

        <div>
          <button
            className="font-bold py-2 px-4 delete-button"
            onClick={() => setIsAlertOpen(true)}
          >
            Eliminar
          </button>
        </div>

        <ConfirmAlert
          title="Confirmar acción"
          message="¿Estás seguro de querer eliminar este paciente? Esta acción no puede ser revertida."
          isOpen={isAlertOpen}
          onConfirm={handleDelete}
          onCancel={handleCancel}
        />
      </div>
    </div>
  );
};

export default PatientDetails;

import React, { useEffect, useState } from 'react';

import { Avatar } from '@/components/Avatar';
import Fallback from '@/components/Fallback';
import Loading from '@/components/Loading';
import { useUserStore } from '@/contexts/UserContext';
import { QueryType, RequestMethods, UserRole } from '@/enums';
import { useClientSideRequest } from '@/hooks/useRestClient';
import { Doctor } from '@/models';
import { unknownWording } from '@/utils/unnownWording';

const DoctorDetails: React.FC = () => {
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const user = useUserStore((state) => state.user);

  const { request, loading } = useClientSideRequest({
    method: RequestMethods.SEARCH_DOCTOR,
  });

  const fetchDoctor = async () => {
    const [doctor] = await request({
      type: QueryType.ID,
      value: user!.id,
    });

    setDoctor(doctor);
  };

  useEffect(() => {
    fetchDoctor();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (!doctor) {
    return <Fallback onRetry={fetchDoctor} />;
  }

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-6 bg-gray-50 pb-20">
      <div className="space-y-6">
        <section className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-center space-x-4 mb-6">
            <Avatar imageUrl={''} name={``} size="sm" />
            <div>
              <h1 className="text-2xl font-bold text-gray-800 capitalize overflow-hidden text-ellipsis whitespace-nowrap">
                Dr: {doctor.lastName}
              </h1>
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
                {doctor.name}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Apellido
              </label>
              <p className="mt-1 block w-full rounded-md border-gray-300 shadow-sm capitalize">
                {doctor.lastName}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Fecha de Nacimiento
              </label>
              <p className="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
                {unknownWording(doctor.dateOfBirth)}
              </p>
            </div>
          </div>
        </section>

        <section className="bg-white p-4 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Información Profesional
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Especialidad
              </label>
              <p className="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
                {unknownWording(doctor.specialization)}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Número de Licencia
              </label>
              <p className="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
                {unknownWording(doctor.licenseNumber)}
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
                +{''} {doctor.contactInfo?.phone.countryCode}{' '}
                {doctor.contactInfo?.phone.area}{' '}
                {doctor.contactInfo?.phone.number}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <p className="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
                {doctor.contactInfo.email}
              </p>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">
                Dirección
              </label>
              <p className="mt-1 block w-full rounded-md border-gray-300 shadow-sm capitalize">
                {unknownWording(doctor.contactInfo?.address?.street)}
              </p>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">
                Ciudad
              </label>
              <p className="mt-1 block w-full rounded-md border-gray-300 shadow-sm capitalize">
                {unknownWording(doctor.contactInfo?.address?.city)}
              </p>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">
                Provincia
              </label>
              <p className="mt-1 block w-full rounded-md border-gray-300 shadow-sm capitalize">
                {unknownWording(doctor.contactInfo?.address?.province)}
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default DoctorDetails;

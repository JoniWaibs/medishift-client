import React from 'react';

import { Avatar } from '../../components/Avatar';

import patient from './patient';

const DoctorDetails: React.FC = () => {
  return (
    <div className="max-w-2xl mx-auto p-4 space-y-6 bg-gray-50 rounded-lg shadow-md">
      <div className="space-y-6">
        <section className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-center space-x-4 mb-6">
            <Avatar imageUrl={''} name={``} size="sm" />
            <div>
              <h1 className="text-2xl font-bold text-gray-800 capitalize">
                {'Doctor'} {'Nombre'}
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
              <p className="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
                {''}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Apellido
              </label>
              <p className="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
                {''}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                DNI
              </label>
              <p className="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
                {''}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Fecha de Nacimiento
              </label>
              <p className="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
                {''}
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
                {''}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Número de Licencia
              </label>
              <p className="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
                {''}
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
                {''}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <p className="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
                {''}
              </p>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">
                Dirección
              </label>
              <p className="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
                {''}
              </p>
            </div>
          </div>
        </section>

        <div className="flex justify-between">
          <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded">
            Editar
          </button>
        </div>
      </div>
    </div>
  );
};

export default DoctorDetails;

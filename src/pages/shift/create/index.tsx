import React, { useState } from 'react';

import { format } from 'date-fns';
import { SubmitHandler, useForm } from 'react-hook-form';
import { CiEdit } from 'react-icons/ci';
import { useNavigate } from 'react-router-dom';

import Loading from '@/components/Loading';
import { PatientSearch } from '@/components/PatientSearch';
import RadioButton from '@/components/RadioButton';
import { RequestMethods } from '@/enums';
import { useClientSideRequest } from '@/hooks/useRestClient';
import { AppointmentType, Patient, ServiceShiftProps } from '@/models';

const CreateShift: React.FC = () => {
  const navigate = useNavigate();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [appointmentType, setAppointmentType] = useState<AppointmentType>(
    AppointmentType.IN_PERSON,
  );
  const {
    formState: { errors },
    register,
    handleSubmit,
    setValue,
    getValues,
    watch,
  } = useForm<ServiceShiftProps>();

  const { request, loading, error } = useClientSideRequest({
    method: RequestMethods.CREATE_SHIFT,
    onSuccessCallback: () => {
      setValue('date', '');
      setValue('startTime', '');
      setValue('endTime', '');
      setValue('appointmentType', AppointmentType.IN_PERSON);
      setAppointmentType(AppointmentType.IN_PERSON);
      setValue('notes', '');
      setValue('payment.amount', 0);
      setPatient(null);
      navigate('/shift/list');
    },
  });

  const selectedDate = watch('date');
  const startTime = watch('startTime');
  const endTime = watch('endTime');
  const today = format(new Date(), 'yyyy-MM-dd');
  const currentTime = format(new Date(), 'HH:mm');

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedDate = e.target.value;
    setValue('date', formattedDate);
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue('startTime', e.target.value);
  };

  const handleAppointmentTypeChange = (value: AppointmentType) => {
    setAppointmentType(value);
    setValue('appointmentType', value);
  };

  const onSubmit: SubmitHandler<ServiceShiftProps> = async (shift) => {
    const shiftData: ServiceShiftProps = {
      ...shift,
      patientId: patient!.id!,
      appointmentType: appointmentType,
      payment: {
        amount: Number(shift.payment),
      },
    };

    await request(shiftData);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="px-4">
      {error && <div>{error}</div>}
      <div className="py-4">
        <h3 className="text-2xl font-bold text-gray-800">Crear un turno</h3>
      </div>

      <div className="max-w-lg mx-auto">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label
              htmlFor="patient"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Paciente
            </label>
            <div>
              {patient ? (
                <div className="flex justify-between">
                  <input
                    type="text"
                    value={`${patient.name} ${patient.lastName}`}
                    disabled
                    className="w-full border border-gray-300 rounded-lg p-2 capitalize"
                  />
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setPatient(null)}
                      className="font-bold  text-xl absolute right-0 top-0 p-2 min-w-10 min-h-10"
                      style={{ color: 'var(--heading-color)' }}
                    >
                      <CiEdit />
                    </button>
                  </div>
                </div>
              ) : (
                <PatientSearch onSelectPatient={setPatient} />
              )}
            </div>
          </div>

          <div>
            <label
              htmlFor="startTime"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Hora de inicio
            </label>
            <input
              type="time"
              id="startTime"
              value={getValues('startTime')}
              {...register('startTime', {
                required: 'El tiempo de inicio es requerido',
              })}
              className="w-full border border-gray-300 rounded-lg p-2 "
              onChange={handleTimeChange}
              min={getValues('date') === today ? currentTime : undefined}
            />
            {errors.startTime && (
              <span className="text-red-500 text-sm">
                {errors.startTime.message}
              </span>
            )}
          </div>

          <div>
            <label
              htmlFor="endTime"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Hora de finalización
            </label>
            <input
              type="time"
              id="endTime"
              {...register('endTime', {
                required: 'El tiempo de finalización es requerido',
                validate: (value) =>
                  startTime && value <= startTime
                    ? 'La hora de finalización debe ser mayor a la hora de inicio'
                    : true,
              })}
              className="w-full border border-gray-300 rounded-lg p-2 "
              min={startTime || undefined}
            />
            {errors.endTime && (
              <span className="text-red-500 text-sm">
                {errors.endTime.message}
              </span>
            )}
          </div>

          <div>
            <label
              htmlFor="date"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Fecha del turno
            </label>
            <input
              type="date"
              id="date"
              value={selectedDate}
              {...register('date', { required: 'La fecha es requerida' })}
              className="w-full border border-gray-300 rounded-lg p-2 "
              onChange={handleDateChange}
              min={today}
            />
            {errors.date && (
              <span className="text-red-500 text-sm">
                {errors.date.message}
              </span>
            )}
          </div>

          <div>
            <label
              htmlFor="appointmentType"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Modalidad
            </label>
            <div className="flex space-x-4">
              <RadioButton
                label="Presencial"
                value={AppointmentType.IN_PERSON}
                name="appointmentType"
                selectedValue={appointmentType}
                onChange={(value) =>
                  handleAppointmentTypeChange(value as AppointmentType)
                }
              />
              <RadioButton
                label="Virtual"
                value={AppointmentType.VIRTUAL}
                name="appointmentType"
                selectedValue={appointmentType}
                onChange={(value) =>
                  handleAppointmentTypeChange(value as AppointmentType)
                }
              />
            </div>
            {errors.appointmentType && (
              <span className="text-red-500 text-sm">
                {errors.appointmentType.message}
              </span>
            )}
          </div>

          <div>
            <label
              htmlFor="notes"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Notas
            </label>
            <textarea
              id="notes"
              {...register('notes')}
              className="w-full border border-gray-300 rounded-lg p-2"
            />
          </div>

          <div>
            <label
              htmlFor="payment"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Honorarios
            </label>
            <input
              type="number"
              id="payment"
              {...register('payment', {
                required: 'El valor de la cita es requerido',
              })}
              className="w-full border border-gray-300 rounded-lg p-2 "
            />
            {errors.payment && (
              <span className="text-red-500 text-sm">
                {errors.payment.message}
              </span>
            )}
          </div>

          <button
            type="submit"
            className="font-bold py-2 px-4 submit-button"
            disabled={!patient || !selectedDate || !startTime || !endTime}
          >
            Guardar
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateShift;

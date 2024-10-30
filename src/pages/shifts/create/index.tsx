import { SubmitHandler, useForm } from "react-hook-form";
import { Patient, ShiftFormData } from "../../../models";
import { format } from "date-fns";
import { RequestMethods } from "../../../enums";
import { useClientSideRequest } from "../../../hooks/useRestClient";
import { Loading } from "../../../components/Loading";
import { useState } from "react";
import { PatientSearch } from "../../../components/PatientSearch";


export const CreateShift = () => {
  const [patient, setPatient] = useState<Patient | null>(null);
  const { formState: { errors }, register, handleSubmit, setValue, getValues, watch } = useForm<ShiftFormData>();
  
  const { request, loading, error } = useClientSideRequest({
    method: RequestMethods.CREATE_SHIFT
  })

  const selectedDate = watch('date');
  const startTime = watch('startTime');
  const today = format(new Date(), 'yyyy-MM-dd');
  const currentTime = format(new Date(), 'HH:mm');

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedDate = e.target.value;
    setValue('date', formattedDate);
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue('startTime', e.target.value);
  };

  const onSubmit: SubmitHandler<ShiftFormData> = async (shift) => {
    const shiftData: ShiftFormData = {
      ...shift,
      patientId: patient!.id!,
      payment: {
        amount: Number(shift.payment),
      }
    }

    const response = await request(shiftData);
    
    if(response) {
      setValue('date', '');
      setValue('startTime', '');
      setValue('endTime', '');
      setValue('appointmentType', 'in-person');
      setValue('notes', '');
      setValue('payment.amount', 0);
      setPatient(null);
      alert('Cita creada exitosamente');
    }
  };
  
  if(loading) {
    return <Loading/>
  }

  return (
    <div>{error && <div>{error}</div>}
    <PatientSearch onSelectPatient={setPatient}/>
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
  <h2 className="text-2xl font-semibold text-gray-800 mb-4">New Shift</h2>
  
  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
    
    <div>
      <label htmlFor="startTime" className="block text-sm font-medium text-gray-700 mb-1">Start Time</label>
      <input
        type="time"
        id="startTime"
        value={getValues('startTime')}
        {...register("startTime", { required: "El tiempo de inicio es requerido" })}
        className="w-full border border-gray-300 rounded-lg p-2 focus:ring-blue-500 focus:border-blue-500"
        onChange={handleTimeChange}
        min={getValues('date') === today ? currentTime : undefined}
      />
      {errors.startTime && <span className="text-red-500 text-sm">{errors.startTime.message}</span>}
    </div>

    <div>
      <label htmlFor="endTime" className="block text-sm font-medium text-gray-700 mb-1">End Time</label>
      <input
        type="time"
        id="endTime"
        {...register("endTime", { 
          required: "El tiempo de finalización es requerido",
          validate: (value) => (startTime && value <= startTime ? "La hora de finalización debe ser mayor a la hora de inicio" : true),
        })}
        className="w-full border border-gray-300 rounded-lg p-2 focus:ring-blue-500 focus:border-blue-500"
        min={startTime || undefined} 
      />
      {errors.endTime && <span className="text-red-500 text-sm">{errors.endTime.message}</span>}
    </div>

    <div>
      <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">Date</label>
      <input
        type="date"
        id="date"
        value={selectedDate}
        {...register("date", { required: "La fecha es requerida" })}
        className="w-full border border-gray-300 rounded-lg p-2 focus:ring-blue-500 focus:border-blue-500"
        onChange={handleDateChange}
        min={today}
      />
      {errors.date && <span className="text-red-500 text-sm">{errors.date.message}</span>}
    </div>

    <div>
      <label htmlFor="appointmentType" className="block text-sm font-medium text-gray-700 mb-1">Appointment Type</label>
      <select
        id="appointmentType"
        {...register("appointmentType", { required: "El tipo de cita es requerido" })}
        className="w-full border border-gray-300 rounded-lg p-2 focus:ring-blue-500 focus:border-blue-500"
      >
        <option value="in-person">Presencial</option>
        <option value="virtual">Virtual</option>
      </select>
      {errors.appointmentType && <span className="text-red-500 text-sm">{errors.appointmentType.message}</span>}
    </div>

    <div>
      <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
      <textarea
        id="notes"
        {...register("notes")}
        className="w-full border border-gray-300 rounded-lg p-2 focus:ring-blue-500 focus:border-blue-500"
      />
    </div>

    <div>
      <label htmlFor="payment" className="block text-sm font-medium text-gray-700 mb-1">Payment</label>
      <input
        type="number"
        id="payment"
        {...register("payment", { required: "El valor de la cita es requerido" })}
        className="w-full border border-gray-300 rounded-lg p-2 focus:ring-blue-500 focus:border-blue-500"
      />
      {errors.payment && <span className="text-red-500 text-sm">{errors.payment.message}</span>}
    </div>

    <button type="submit" disabled={!patient} className="w-full bg-blue-500 text-white rounded-lg py-2 font-semibold hover:bg-blue-600 transition duration-200">Crear cita</button>
  
  </form>

  {patient && (
    <div className="mt-8 bg-gray-100 p-4 rounded-lg">
      <h3 className="text-lg font-semibold text-gray-700">Patient</h3>
      <div className="text-gray-600">
        <p><span className="font-medium">Nombre:</span> {patient.name}</p>
        <p><span className="font-medium">Apellido:</span> {patient.lastName}</p>
        <p><span className="font-medium">DNI:</span> {patient.identificationNumber}</p>
        <p><span className="font-medium">OS:</span> {patient.insurerData.providerName}</p>
      </div>
    </div>
  )}
      </div>
    </div>
  )
}

import { Shift } from "../../models"

export const ShiftDetailsSection: React.FC<{shift: Shift}> = ({shift}) => {

  const appointmentType = new Map<Shift['appointmentType'], string>([
    ['in-person', "Presencial"],
    ['virtual', "Virtual"],
  ])

  return <div className="bg-white rounded-lg p-4 shadow-md">
  <h2 className="text-lg font-semibold text-gray-800 mb-2">Detalles del turno</h2>
  <p className="text-gray-600">
    <span className="font-medium">Estado del turno:</span> {shift.status}
  </p>
  <p className="text-gray-600">
    <span className="font-medium">Modalidad:</span> {appointmentType.get(shift.appointmentType)}
  </p>
  <p className="text-gray-600">
    <span className="font-medium">Fecha:</span> {shift.date}
  </p>
  <div className="flex justify-between text-gray-600">
    <p>
      <span className="font-medium">Desde:</span> {shift.startTime}
    </p>
    <p>
      <span className="font-medium">Hasta:</span> {shift.endTime}
    </p>
  </div>
    {shift.location && (
    <p className="text-gray-600">
        <span className="font-medium">Locación:</span> {shift.location.name}
      </p>
    )}
    {shift.notes && (
      <p className="text-gray-600">
        <span className="font-medium">Notas del turno :</span> {shift.notes}
      </p>
    )}
  </div>
}

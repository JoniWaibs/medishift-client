import React, { useEffect, useState } from 'react';
import { useClientSideRequest } from '../../hooks/useRestClient';
import { Loading } from '../../components/Loading';
import { Shift } from '../../models';
import { RequestMethods } from '../../enums';
import { Fallback } from '../../components/Fallback';
import { useDateStore } from '../../contexts/DateContext';
import { ShiftCard } from '../../components/ShiftCard';
import { useNavigate } from 'react-router-dom';

const Shifts: React.FC = () => {
  const navigate = useNavigate();
  const [shifts, setShifts] = useState<Shift[]>([] as Shift[])
  const startDate = useDateStore((store) => store.startDate)
  const endDate = useDateStore((store) => store.endDate)
  
  const { request, loading, error } = useClientSideRequest({
    method: RequestMethods.GET_SHIFTS
  })

  useEffect(() => {
    const fetchShifts = async () => {
      try {
        const response = await request({startDate, endDate}); 
        setShifts(response?.shifts || []); 
      } catch (err) {}
    };

    fetchShifts();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  if(loading) {
    return <Loading/>
  }

  if(error) {
    return <Fallback />
  }

  const handleCreateShiftRedirection = () => {
    return navigate('/shifts/create', { replace: false });
  }

  return (
    <div className="max-w-lg mx-auto p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Tenés {shifts.length} turnos este día</h1>

      {shifts.length >= 1 && (
        <div className="flex justify-between px-2 my-8 bg-gray-100 p-4 rounded-lg">
          <p className="text-gray-800 text-md font-semibold px-2">Desde las {shifts[0].startTime}hs</p>
          <p className="text-gray-800 text-md font-semibold px-2">Hasta las {shifts[shifts.length - 1].endTime}hs</p>
        </div>
      )}
      
      {shifts.length >= 1 ? (
        shifts.sort((a, b) => a.startTime.localeCompare(b.startTime)).map((shift) => (
          <ShiftCard 
            key={shift.id}
            shift={shift}
          />
        ))
      ) : (
        <div className="text-gray-600 text-center py-4">
          Hoy no tienes turnos asignados
        </div>
      )}

      <button 
        onClick={handleCreateShiftRedirection} 
        className="mt-6 w-full bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition duration-200"
      >
        Crear turno
      </button>
    </div>
  );
};

export default Shifts;

import React, { useEffect, useState } from 'react';

import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';

import DateCarousel from '@/components/DateCarousel';
import Fallback from '@/components/Fallback';
import { ShiftListCard } from '@/components/ShiftListCard';
import { useDateStore, DateStore } from '@/contexts/DateContext';
import { QueryType, RequestMethods } from '@/enums';
import { useClientSideRequest } from '@/hooks/useRestClient';
import { Shift } from '@/models';

const ShiftList: React.FC = () => {
  const navigate = useNavigate();
  const [shifts, setShifts] = useState<Shift[]>([] as Shift[]);
  const currentDate = useDateStore((store: DateStore) => store.currentDate);
  const { error, request } = useClientSideRequest({
    method: RequestMethods.SEARCH_SHIFT,
  });

  const fetchShifts = async () => {
    try {
      const response = await request({
        type: QueryType.DATE,
        value: {
          startDate: format(currentDate, 'yyyy-MM-dd'),
          endDate: format(currentDate, 'yyyy-MM-dd'),
        },
      });

      setShifts(response || []);
      // eslint-disable-next-line no-empty
    } catch (err) {}
  };

  useEffect(() => {
    fetchShifts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentDate]);

  if (error) {
    return <Fallback onRetry={fetchShifts} />;
  }

  const handleCreateShiftRedirection = () => {
    return navigate('/shift/create', { replace: false });
  };

  return (
    <div className="container max-w-lg mx-auto px-4 pb-16 relative">
      <DateCarousel />

      {shifts.length > 0 ? (
        <div>
          <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Tenés {shifts.length} turnos este día
          </h1>
          <div className="flex justify-between px-2 my-8 bg-gray-100 p-4 rounded-lg">
            <p className="text-gray-800 text-md font-semibold px-2">
              Desde las {shifts[0].startTime}hs
            </p>
            <p className="text-gray-800 text-md font-semibold px-2">
              Hasta las {shifts[shifts.length - 1].endTime}hs
            </p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center">
          <p className="text-center text-gray-500">
            No turnos disponibles para esta fecha.
          </p>
        </div>
      )}

      <div className="container mx-auto mt-4 mb-20">
        <div className=" gap-4">
          {shifts.length > 0 &&
            shifts
              .sort((a, b) => a.startTime.localeCompare(b.startTime))
              .map((shift) => <ShiftListCard key={shift.id} shift={shift} />)}
        </div>
      </div>

      <button
        className="fixed bottom-4 left-1/2 transform -translate-x-1/2 px-6 py-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 focus:outline-none"
        onClick={handleCreateShiftRedirection}
      >
        Crear turno
      </button>
    </div>
  );
};

export default ShiftList;

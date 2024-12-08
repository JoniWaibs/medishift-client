import React, { useEffect, useState } from 'react';

import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';

import TopDateCarousel from '@/components/Carousel';
import DateCarousel from '@/components/DateCarousel';
import Fallback from '@/components/Fallback';
import { ShiftListCard } from '@/components/ShiftListCard';
import { useDateStore, DateStore } from '@/contexts/DateContext';
import { QueryType, RequestMethods, ShiftStatus } from '@/enums';
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

  const handleDateSelect = (date: Date) => {
    console.log('Selected Date:', date.toISOString());
    // Add logic to filter shifts by date
  };

  return (
    <div className="container max-w-lg mx-auto px-4 pb-16 relative">
      <TopDateCarousel />

      {shifts.length > 0 ? (
        <div className="p-1">
          <h3 className="text-xl font-bold text-gray-800 mb-1 text-center">
            Tenés {shifts.length} turnos este día
          </h3>
          <div className="flex px-2 bg-gray-100 rounded-lg justify-center gap-4">
            <p className="text-gray-800 text-sm font-semibold">
              Desde las {shifts[0].startTime} hs
            </p>
            <p className="text-gray-800 text-sm font-semibold">
              Hasta las {shifts[shifts.length - 1].endTime} hs
            </p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center">
          <p className="text-center text-gray-500">
            No tenés turnos disponibles para esta fecha.
          </p>
        </div>
      )}

      <div className="container mx-auto mb-20">
        <div className="gap-4">
          {shifts.length > 0 &&
            shifts
              .sort((a, b) => a.startTime.localeCompare(b.startTime))
              .map((shift) => <ShiftListCard key={shift.id} shift={shift} />)}
        </div>
      </div>
    </div>
  );
};

export default ShiftList;

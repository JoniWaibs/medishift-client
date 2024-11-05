import React from 'react';

import { format } from 'date-fns';

import { useDateStore } from '../../contexts/DateContext';

const DateCarousel: React.FC<{}> = () => {
  const setCurrentDate = useDateStore((store) => store.updateCurrent);
  const currentDate = useDateStore((store) => store.currentDate);

  const changeDate = (date: Date, days: number): Date => {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + days);
    return newDate;
  };

  const handlePrev = (): void => {
    const prevDate = changeDate(currentDate, -1);
    setCurrentDate(prevDate);
  };

  const handleNext = (): void => {
    const nextDate = changeDate(currentDate, 1);
    setCurrentDate(nextDate);
  };

  return (
    <div className="flex items-center justify-center my-4 space-x-4">
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        onClick={handlePrev}
      >
        Prev
      </button>
      <div className="text-xl font-semibold">
        {format(currentDate, 'yyyy-MM-dd')}
      </div>
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        onClick={handleNext}
      >
        Next
      </button>
    </div>
  );
};

export default DateCarousel;

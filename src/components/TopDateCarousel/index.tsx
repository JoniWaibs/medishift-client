import React, { useState } from 'react';

import { format } from 'date-fns';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

import { useDateStore } from '@/contexts/DateContext';

const TopDateCarousel: React.FC<{}> = () => {
  const setCurrentDate = useDateStore((store) => store.updateCurrent);
  const currentDate = useDateStore((store) => store.currentDate);

  const [dates, setDates] = useState(() => {
    const today = new Date();
    return Array.from({ length: 30 }, (_, i) => {
      const date = new Date(today);
      date.setDate(today.getDate() + i - 3);
      return date;
    });
  });

  const handleDateChange = (date: Date) => {
    setCurrentDate(date);
  };

  const navigateDates = (direction: 'prev' | 'next') => {
    setDates((prev) =>
      prev.map((date) => {
        const newDate = new Date(date);
        newDate.setDate(
          direction === 'prev' ? date.getDate() - 1 : date.getDate() + 1,
        );
        return newDate;
      }),
    );
  };

  return (
    <div className="flex items-center w-full p-2">
      <button
        className="p-2 text-gray-500"
        onClick={() => navigateDates('prev')}
      >
        <FaChevronLeft size={20} />
      </button>

      <div className="flex-1 overflow-x-scroll scrollbar-hide flex gap-4">
        <div className="flex space-x-4">
          {dates.map((date, index) => {
            const isSelected =
              date.toDateString() === currentDate.toDateString();
            return (
              <button
                key={index}
                onClick={() => handleDateChange(date)}
                className={`flex flex-col items-center p-2 rounded-lg ${
                  isSelected
                    ? 'carousel-navigation-date text-white'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                <span className="text-xs font-medium">
                  {date.toLocaleDateString('es-AR', { weekday: 'short' })}
                </span>
                <span className="text-lg font-bold">
                  {date.getDate().toString()}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <button
        className="p-2 text-gray-500"
        onClick={() => navigateDates('next')}
      >
        <FaChevronRight size={20} />
      </button>
    </div>
  );
};

export default TopDateCarousel;

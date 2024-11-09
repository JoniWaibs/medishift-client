import React, { useState } from 'react';

import { PaymentStatus, ShiftStatus } from '../../enums';

interface StatusDropdownProps<T> {
  statuses: Map<T, string>;
  onSelect: (status: T) => void;
}

export const StatusDropdown = <T extends PaymentStatus | ShiftStatus>({
  statuses,
  onSelect,
}: StatusDropdownProps<T>) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleOnSelect = (status: T) => {
    onSelect(status);
    setShowDropdown(false);
  };

  return (
    <div className="relative mt-4">
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-md w-full text-sm font-medium hover:bg-blue-600 focus:outline-none"
        onClick={() => setShowDropdown(!showDropdown)}
      >
        Cambiar estado
      </button>
      <div
        className={`absolute mt-2 w-full bg-white border border-gray-200 rounded-md shadow-lg ${
          showDropdown ? 'block' : 'hidden'
        }`}
      >
        <ul className="py-1 text-gray-700 text-sm">
          {Array.from(statuses.entries()).map(([status, label]) => (
            <li
              key={status}
              className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
              onClick={() => handleOnSelect(status)}
            >
              {label}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

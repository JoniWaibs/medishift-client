import React from 'react';

import { AppointmentType } from '@/models';

interface RadioButtonProps {
  label: string;
  value: string;
  name: string;
  selectedValue: AppointmentType;
  onChange: (value: AppointmentType) => void;
}

const RadioButton: React.FC<RadioButtonProps> = ({
  label,
  value,
  name,
  selectedValue,
  onChange,
}) => {
  return (
    <label className="flex items-center space-x-2 cursor-pointer">
      <input
        type="radio"
        name={name}
        value={value}
        checked={selectedValue === value}
        onChange={() => onChange(value as AppointmentType)}
        className="hidden"
      />
      <div
        className={`w-5 h-5 flex items-center justify-center rounded-full border-2 ${
          selectedValue === value ? 'radio-button-selected' : 'border-gray-300'
        }`}
      >
        {selectedValue === value && (
          <div className="w-2.5 h-2.5 bg-white rounded-full" />
        )}
      </div>
      <span className="text-sm text-gray-700">{label}</span>
    </label>
  );
};

export default RadioButton;

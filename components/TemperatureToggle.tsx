import React from 'react';

interface TemperatureToggleProps {
  unit: 'celsius' | 'fahrenheit';
  onToggle: (unit: 'celsius' | 'fahrenheit') => void;
}

export const TemperatureToggle: React.FC<TemperatureToggleProps> = ({ 
  unit, 
  onToggle 
}) => {
  return (
    <div className="flex items-center justify-center mb-6">
      <div className="bg-white/10 backdrop-blur-md rounded-full p-1 border border-white/20">
        <button
          onClick={() => onToggle('celsius')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
            unit === 'celsius'
              ? 'bg-white text-gray-900 shadow-lg'
              : 'text-white/80 hover:text-white'
          }`}
        >
          °C
        </button>
        <button
          onClick={() => onToggle('fahrenheit')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
            unit === 'fahrenheit'
              ? 'bg-white text-gray-900 shadow-lg'
              : 'text-white/80 hover:text-white'
          }`}
        >
          °F
        </button>
      </div>
    </div>
  );
};
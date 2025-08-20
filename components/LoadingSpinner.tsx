import React from 'react';
import { Loader2 } from 'lucide-react';

export const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] text-white">
      <Loader2 className="w-12 h-12 animate-spin mb-4" />
      <p className="text-white/80 text-lg">Loading weather data...</p>
      <p className="text-white/60 text-sm mt-2">Please wait while we fetch the latest information</p>
    </div>
  );
};
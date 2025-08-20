import React from "react";
import { Droplets, Wind, MapPin, Calendar } from "lucide-react";
import { format } from "date-fns";

interface WeatherCardProps {
  title: string;
  value: string | number;
  unit?: string;
  icon: React.ReactNode;
  description?: string;
  className?: string;
}

export const WeatherCard: React.FC<WeatherCardProps> = ({
  title,
  value,
  unit,
  icon,
  description,
  className = "",
}) => {
  return (
    <div
      className={`bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 ${className}`}
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-white/80 text-sm font-medium">{title}</h3>
        <div className="text-white/60">{icon}</div>
      </div>
      <div className="flex items-baseline gap-1">
        <span className="text-2xl font-bold text-white">{value}</span>
        {unit && <span className="text-white/60 text-sm">{unit}</span>}
      </div>
      {description && (
        <p className="text-white/60 text-xs mt-2">{description}</p>
      )}
    </div>
  );
};

interface ForecastCardProps {
  day: string;
  icon: string;
  high: number;
  low: number;
  description: string;
  humidity: number;
  windSpeed: number;
}

export const ForecastCard: React.FC<ForecastCardProps> = ({
  day,
  icon,
  high,
  low,
  description,
  humidity,
  windSpeed,
}) => {
  return (
    <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 hover:bg-white/15 transition-all duration-300 min-w-[200px]">
      <div className="text-center">
        <p className="text-white/80 text-sm font-medium mb-2">{day}</p>
        <div className="flex justify-center mb-3">
          <img
            src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
            alt={description}
            className="w-12 h-12"
          />
        </div>
        <div className="flex justify-between items-center mb-2">
          <span className="text-white font-bold">{Math.round(high)}°</span>
          <span className="text-white/60">{Math.round(low)}°</span>
        </div>
        <p className="text-white/70 text-xs mb-3 capitalize">{description}</p>
        <div className="flex justify-between text-xs text-white/60">
          <div className="flex items-center gap-1">
            <Droplets className="w-3 h-3" />
            <span>{humidity}%</span>
          </div>
          <div className="flex items-center gap-1">
            <Wind className="w-3 h-3" />
            <span>{Math.round(windSpeed)} m/s</span>
          </div>
        </div>
      </div>
    </div>
  );
};

interface LocationHeaderProps {
  location: string;
  country: string;
  currentTime: Date;
}

export const LocationHeader: React.FC<LocationHeaderProps> = ({
  location,
  country,
  currentTime,
}) => {
  return (
    <div className="text-center mb-8">
      <div className="flex items-center justify-center gap-2 mb-2">
        <MapPin className="w-5 h-5 text-white/80" />
        <h1 className="text-2xl font-bold text-white">
          {location}, {country}
        </h1>
      </div>
      <div className="flex items-center justify-center gap-2 text-white/70">
        <Calendar className="w-4 h-4" />
        <p className="text-sm">
          {format(currentTime, "EEEE, MMMM do, yyyy • h:mm a")}
        </p>
      </div>
    </div>
  );
};

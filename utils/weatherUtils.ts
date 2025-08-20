export const convertTemperature = (temp: number, from: 'celsius' | 'fahrenheit', to: 'celsius' | 'fahrenheit'): number => {
  if (from === to) return temp;
  
  if (from === 'celsius' && to === 'fahrenheit') {
    return (temp * 9/5) + 32;
  } else if (from === 'fahrenheit' && to === 'celsius') {
    return (temp - 32) * 5/9;
  }
  
  return temp;
};

export const getWeatherBackground = (weatherMain: string, isDay: boolean): string => {
  const baseClasses = "min-h-screen transition-all duration-1000";
  
  switch (weatherMain.toLowerCase()) {
    case 'clear':
      return `${baseClasses} ${isDay 
        ? 'bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600' 
        : 'bg-gradient-to-br from-indigo-900 via-purple-900 to-gray-900'}`;
    case 'clouds':
      return `${baseClasses} ${isDay 
        ? 'bg-gradient-to-br from-gray-400 via-gray-500 to-gray-600' 
        : 'bg-gradient-to-br from-gray-800 via-gray-900 to-black'}`;
    case 'rain':
    case 'drizzle':
      return `${baseClasses} bg-gradient-to-br from-gray-600 via-gray-700 to-gray-800`;
    case 'thunderstorm':
      return `${baseClasses} bg-gradient-to-br from-gray-800 via-gray-900 to-black`;
    case 'snow':
      return `${baseClasses} bg-gradient-to-br from-blue-200 via-blue-300 to-blue-400`;
    case 'mist':
    case 'fog':
    case 'haze':
      return `${baseClasses} bg-gradient-to-br from-gray-500 via-gray-600 to-gray-700`;
    default:
      return `${baseClasses} ${isDay 
        ? 'bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600' 
        : 'bg-gradient-to-br from-indigo-900 via-purple-900 to-gray-900'}`;
  }
};

export const formatTime = (timestamp: number, timezone: number): string => {
  const date = new Date((timestamp + timezone) * 1000);
  return date.toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit',
    timeZone: 'UTC'
  });
};

export const getWindDirection = (degrees: number): string => {
  const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
  const index = Math.round(degrees / 22.5) % 16;
  return directions[index];
};

export const getUVIndexLevel = (uvIndex: number): { level: string; color: string } => {
  if (uvIndex <= 2) return { level: 'Low', color: 'text-green-400' };
  if (uvIndex <= 5) return { level: 'Moderate', color: 'text-yellow-400' };
  if (uvIndex <= 7) return { level: 'High', color: 'text-orange-400' };
  if (uvIndex <= 10) return { level: 'Very High', color: 'text-red-400' };
  return { level: 'Extreme', color: 'text-purple-400' };
};

export const getAirQualityLevel = (aqi: number): { level: string; color: string } => {
  switch (aqi) {
    case 1: return { level: 'Good', color: 'text-green-400' };
    case 2: return { level: 'Fair', color: 'text-yellow-400' };
    case 3: return { level: 'Moderate', color: 'text-orange-400' };
    case 4: return { level: 'Poor', color: 'text-red-400' };
    case 5: return { level: 'Very Poor', color: 'text-purple-400' };
    default: return { level: 'Unknown', color: 'text-gray-400' };
  }
};
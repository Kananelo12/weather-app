export const convertTemperature = (temp: number, from: 'celsius' | 'fahrenheit', to: 'celsius' | 'fahrenheit'): number => {
  if (from === to) return temp;
  
  if (from === 'celsius' && to === 'fahrenheit') {
    return (temp * 9/5) + 32;
  } else if (from === 'fahrenheit' && to === 'celsius') {
    return (temp - 32) * 5/9;
  }
  
  return temp;
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

"use client";
import React, { useEffect, useState } from "react";
import { 
  Thermometer, 
  Droplets, 
  Wind, 
  Eye, 
  Gauge, 
  Sunrise, 
  Sunset,
  Sun,
  Cloud,
  CloudRain,
  Zap
} from 'lucide-react';
import { format, addDays } from 'date-fns';

import { WeatherCard, ForecastCard, LocationHeader } from '../../components/WeatherCard';
import { SearchBar } from '../../components/SearchBar';
import { TemperatureToggle } from '../../components/TemperatureToggle';
import { LoadingSpinner } from '../../components/LoadingSpinner';
import { ErrorMessage } from '../../components/ErrorMessage';
import { 
  convertTemperature, 
  getWeatherBackground, 
  formatTime, 
  getWindDirection,
  getUVIndexLevel,
  getAirQualityLevel
} from '../../utils/weatherUtils';
import { WeatherData, ForecastData, UVData, AirQualityData } from '../../types/weather';

const WeatherPage = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [forecastData, setForecastData] = useState<ForecastData | null>(null);
  const [uvData, setUVData] = useState<UVData | null>(null);
  const [airQualityData, setAirQualityData] = useState<AirQualityData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [temperatureUnit, setTemperatureUnit] = useState<'celsius' | 'fahrenheit'>('celsius');
  const [currentLocation, setCurrentLocation] = useState({ lat: -29.392827, lon: 27.513887 });

  const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;

  const fetchWeatherData = async (lat: number, lon: number) => {
    setIsLoading(true);
    setError(null);

    try {
      // Fetch current weather
      const weatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      );
      
      if (!weatherResponse.ok) {
        throw new Error('Failed to fetch weather data');
      }
      
      const weather = await weatherResponse.json();
      setWeatherData(weather);

      // Fetch 5-day forecast
      const forecastResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      );
      
      if (forecastResponse.ok) {
        const forecast = await forecastResponse.json();
        setForecastData(forecast);
      }

      // Fetch UV Index
      const uvResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=${API_KEY}`
      );
      
      if (uvResponse.ok) {
        const uv = await uvResponse.json();
        setUVData(uv);
      }

      // Fetch Air Quality
      const airQualityResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`
      );
      
      if (airQualityResponse.ok) {
        const airQuality = await airQualityResponse.json();
        setAirQualityData(airQuality);
      }

    } catch (error) {
      console.error("Error fetching weather:", error);
      setError(error instanceof Error ? error.message : 'Failed to fetch weather data');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchWeatherByCity = async (cityName: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`
      );
      
      if (!response.ok) {
        throw new Error('City not found. Please check the spelling and try again.');
      }
      
      const data = await response.json();
      setCurrentLocation({ lat: data.coord.lat, lon: data.coord.lon });
      await fetchWeatherData(data.coord.lat, data.coord.lon);
    } catch (error) {
      console.error("Error fetching weather by city:", error);
      setError(error instanceof Error ? error.message : 'Failed to fetch weather data');
      setIsLoading(false);
    }
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation({ lat: latitude, lon: longitude });
          fetchWeatherData(latitude, longitude);
        },
        (error) => {
          console.error("Error getting location:", error);
          setError('Unable to get your location. Please search for a city instead.');
          setIsLoading(false);
        }
      );
    } else {
      setError('Geolocation is not supported by this browser.');
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchWeatherData(currentLocation.lat, currentLocation.lon);
  }, []);

  const convertTemp = (temp: number) => {
    return temperatureUnit === 'fahrenheit' 
      ? convertTemperature(temp, 'celsius', 'fahrenheit')
      : temp;
  };

  const formatTemp = (temp: number) => {
    return `${Math.round(convertTemp(temp))}°${temperatureUnit === 'celsius' ? 'C' : 'F'}`;
  };

  const getDailyForecast = () => {
    if (!forecastData) return [];
    
    const dailyData: { [key: string]: any } = {};
    
    forecastData.list.forEach(item => {
      const date = format(new Date(item.dt * 1000), 'yyyy-MM-dd');
      
      if (!dailyData[date]) {
        dailyData[date] = {
          date,
          temps: [item.main.temp],
          weather: item.weather[0],
          humidity: item.main.humidity,
          windSpeed: item.wind.speed
        };
      } else {
        dailyData[date].temps.push(item.main.temp);
      }
    });

    return Object.values(dailyData).slice(0, 5).map((day: any) => ({
      ...day,
      high: Math.max(...day.temps),
      low: Math.min(...day.temps)
    }));
  };

  if (!API_KEY) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center p-4">
        <ErrorMessage message="Weather API key is not configured. Please add your OpenWeatherMap API key to the environment variables." />
      </div>
    );
  }

  const backgroundClass = weatherData 
    ? getWeatherBackground(weatherData.weather[0].main, Date.now() / 1000 > weatherData.sys.sunrise && Date.now() / 1000 < weatherData.sys.sunset)
    : 'min-h-screen bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600';

  return (
    <div className={backgroundClass}>
      <div className="container mx-auto px-4 py-8">
        <SearchBar 
          onSearch={fetchWeatherByCity}
          onCurrentLocation={getCurrentLocation}
          isLoading={isLoading}
        />

        {isLoading && <LoadingSpinner />}

        {error && (
          <ErrorMessage 
            message={error} 
            onRetry={() => fetchWeatherData(currentLocation.lat, currentLocation.lon)}
          />
        )}

        {weatherData && !isLoading && !error && (
          <div className="space-y-8">
            <LocationHeader 
              location={weatherData.name}
              country={weatherData.sys.country}
              currentTime={new Date()}
            />

            <TemperatureToggle 
              unit={temperatureUnit}
              onToggle={setTemperatureUnit}
            />

            {/* Main Weather Display */}
            <div className="text-center mb-12">
              <div className="flex justify-center mb-4">
                <img 
                  src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@4x.png`}
                  alt={weatherData.weather[0].description}
                  className="w-32 h-32 drop-shadow-lg"
                />
              </div>
              <h2 className="text-6xl font-bold text-white mb-2">
                {formatTemp(weatherData.main.temp)}
              </h2>
              <p className="text-xl text-white/80 capitalize mb-2">
                {weatherData.weather[0].description}
              </p>
              <p className="text-white/70">
                Feels like {formatTemp(weatherData.main.feels_like)}
              </p>
            </div>

            {/* Weather Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <WeatherCard
                title="Feels Like"
                value={Math.round(convertTemp(weatherData.main.feels_like))}
                unit={`°${temperatureUnit === 'celsius' ? 'C' : 'F'}`}
                icon={<Thermometer className="w-5 h-5" />}
                description="Perceived temperature"
              />
              
              <WeatherCard
                title="Humidity"
                value={weatherData.main.humidity}
                unit="%"
                icon={<Droplets className="w-5 h-5" />}
                description="Moisture in the air"
              />
              
              <WeatherCard
                title="Wind Speed"
                value={Math.round(weatherData.wind.speed * 3.6)}
                unit="km/h"
                icon={<Wind className="w-5 h-5" />}
                description={`${getWindDirection(weatherData.wind.deg)} direction`}
              />
              
              <WeatherCard
                title="Visibility"
                value={Math.round(weatherData.visibility / 1000)}
                unit="km"
                icon={<Eye className="w-5 h-5" />}
                description="Clear sight distance"
              />
              
              <WeatherCard
                title="Pressure"
                value={weatherData.main.pressure}
                unit="hPa"
                icon={<Gauge className="w-5 h-5" />}
                description="Atmospheric pressure"
              />
              
              <WeatherCard
                title="Sunrise"
                value={formatTime(weatherData.sys.sunrise, weatherData.timezone)}
                icon={<Sunrise className="w-5 h-5" />}
                description="Dawn time"
              />
              
              <WeatherCard
                title="Sunset"
                value={formatTime(weatherData.sys.sunset, weatherData.timezone)}
                icon={<Sunset className="w-5 h-5" />}
                description="Dusk time"
              />

              {uvData && (
                <WeatherCard
                  title="UV Index"
                  value={Math.round(uvData.value)}
                  icon={<Sun className="w-5 h-5" />}
                  description={getUVIndexLevel(uvData.value).level}
                  className={getUVIndexLevel(uvData.value).color}
                />
              )}
            </div>

            {/* Air Quality */}
            {airQualityData && airQualityData.list.length > 0 && (
              <div className="mb-12">
                <h3 className="text-2xl font-bold text-white mb-6 text-center">Air Quality</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <WeatherCard
                    title="Air Quality Index"
                    value={airQualityData.list[0].main.aqi}
                    icon={<Cloud className="w-5 h-5" />}
                    description={getAirQualityLevel(airQualityData.list[0].main.aqi).level}
                    className={getAirQualityLevel(airQualityData.list[0].main.aqi).color}
                  />
                  
                  <WeatherCard
                    title="PM2.5"
                    value={Math.round(airQualityData.list[0].components.pm2_5)}
                    unit="μg/m³"
                    icon={<Cloud className="w-5 h-5" />}
                    description="Fine particles"
                  />
                  
                  <WeatherCard
                    title="PM10"
                    value={Math.round(airQualityData.list[0].components.pm10)}
                    unit="μg/m³"
                    icon={<Cloud className="w-5 h-5" />}
                    description="Coarse particles"
                  />
                  
                  <WeatherCard
                    title="Ozone (O₃)"
                    value={Math.round(airQualityData.list[0].components.o3)}
                    unit="μg/m³"
                    icon={<Cloud className="w-5 h-5" />}
                    description="Ground-level ozone"
                  />
                </div>
              </div>
            )}

            {/* 5-Day Forecast */}
            {forecastData && (
              <div>
                <h3 className="text-2xl font-bold text-white mb-6 text-center">5-Day Forecast</h3>
                <div className="flex gap-4 overflow-x-auto pb-4">
                  {getDailyForecast().map((day, index) => (
                    <ForecastCard
                      key={day.date}
                      day={index === 0 ? 'Today' : format(new Date(day.date), 'EEE')}
                      icon={day.weather.icon}
                      high={convertTemp(day.high)}
                      low={convertTemp(day.low)}
                      description={day.weather.description}
                      humidity={day.humidity}
                      windSpeed={day.windSpeed}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherPage;
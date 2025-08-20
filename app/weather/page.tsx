/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useEffect, useState } from "react";

const Page = () => {
  const [weatherData, setWeatherData] = useState(null);
  const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
  // console.log("Weather API Key: ", API_KEY);

  const fetchWeather = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=-29.392827&lon=27.513887&appid=${API_KEY}&units=metric`
      );
      const data = await response.json();
      console.log("Weather data:", data);
      setWeatherData(data);
    } catch (error) {
      console.error("Error fetching weather:", error);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  return (
    <div>
      {weatherData ? (
        <div className="px-20 mt-12">
          <h1 className="font-bold text-2xl">Weather Data</h1>
          <p>
            Location: {weatherData.name}, {weatherData.sys.country}
          </p>
          <p>Description: {weatherData.weather[0].description}</p>
          <p>Temperature: {weatherData.main.temp}</p>
          <p>Humidity: {weatherData.main.humidity}</p>
        </div>
      ) : (
        <div className="text-center h-screen flex items-center justify-center">
          <div>
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading weather data</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;

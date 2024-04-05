import { AnimatePresence, motion } from "framer-motion";
import React, { useState, createContext } from "react";
import SideNav from "./SideNav";
import WeatherInfo from "./WeatherInfo";
import fetchWeatherData from "../pages/api/weather.js";

export const WeatherContext = createContext();

const WeatherApp = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [temperatureUnit, setTemperatureUnit] = useState("Celsius");

  const handleSubmit = async (e, term) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = await fetchWeatherData(term);
      if (data.error) {
        setError(data.error.message);
      } else {
        setWeatherData(data);
        setError('');
      }
    } catch (error) {
      setError('An error occurred while fetching weather data.');
    } finally {
      setLoading(false);
    }
  };

  const toggleTemperatureUnit = () => {
    setTemperatureUnit((prevUnit) =>
      prevUnit === "Celsius" ? "Fahrenheit" : "Celsius"
    );
  };

  const dataContext = {
    weatherData,
    setWeatherData,
    loading,
    setLoading,
    error,
    setError,
    handleSubmit,
    searchTerm,
    setSearchTerm,
    temperatureUnit,
    toggleTemperatureUnit,
  };

  return (
    <WeatherContext.Provider value={dataContext}>
      <div className="bg-gradient-to-r from-gray-500 to-blue-900">
        <div className="container mx-auto font-roboto flex flex-col xl:flex-row min-h-screen ">

          {/* Entire SideNav component - Search and SearchInfo implemented */}
          <SideNav />

          <div className="flex-3 flex flex-col px-6 py-6 md:p-10 lg:py-10 lg:pr-10 xl:pl-0 relative">
            {/* WeatherInfo component */}
            <AnimatePresence>
              {weatherData && !error && (
                <WeatherInfo weatherData={weatherData} />
              )}
            </AnimatePresence>

            {/* Footer section */}
            <div
              className="xl:flex items-center justify-end mt-7 text-center xl:absolute xl:bottom-10 xl:right-10"
            >
              <span className="text-xs uppercase tracking-wider font-roboto font-light text-gray-200 ">
              © Developed by {" "}
                <a className="underline" href="https://rumeysagelgi.com/" target="_blank">
                  Rumeysa Gelgi
                </a>
              {" "} | 2024
              </span>
            </div>

          </div>
          
        </div>
      </div>
    </WeatherContext.Provider>
  );
};

export default WeatherApp;
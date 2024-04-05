import React, { useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { easing, parentVariant } from "../components/utils/framerProps";
import { WeatherContext } from "./WeatherApp";

const SearchInfo = ({ weatherData, error }) => {
  const { location, current } = weatherData;
  const { temperatureUnit } = useContext(WeatherContext);

   // Function to toggle temperature unit
   const toggleUnit = (temp) => {
    if (temperatureUnit === "Celsius") {
      return `${temp}°C`;
    } else {
      // Convert Celsius to Fahrenheit
      const fahrenheit = (temp * 9) / 5 + 32;
      return `${fahrenheit.toFixed(1)}°F`;
    }
  };

  // Search result on SideNav
  return (
    // <motion.div> slide-up animation
    <motion.div
      className="px-6 py-8 md:px-12 md:py-10 bg-white rounded-md shadow-2xl flex flex-col flex-3 gap-y-12 md:gap-y-16 bg-opacity-5 "
      variants={parentVariant}
      initial="hidden"
      animate="visible"
      exit={{
        opacity: 0,
        transition: {
          duration: 0.6,
          ease: easing,
        },
      }}
    >
      {/* First section  */}
      <div className="flex flex-col gap-y-5">
        <h1 className="text-gray-100 font-roboto font-light text-lg tracking-wider">
          City Information{" "}
        </h1>
        
        <div className="grid grid-cols-2-custom gap-6 text-lg">

          <div>
            <span className="text-sm text-gray-300">Location</span>
            <p className="text-white tracking-wide">
              {location.name}, {location.region}
            </p>
          </div>

          <div>
            <span className="text-sm text-gray-300">Country</span>
            <p className="text-white tracking-wide">{location.country}</p>
          </div>

          <div>
            <span className="text-sm text-gray-300">Latitude</span>
            <p className="text-white tracking-wide">{location.lat}</p>
          </div>

          <div>
            <span className="text-sm text-gray-300">Longitude</span>
            <p className="text-white tracking-wide">{location.lon}</p>
          </div>

        </div>

      </div>

      {/* Second section  */}
      <div className="flex flex-col gap-y-5">
        <h1 className="text-gray-100 font-roboto font-light text-lg tracking-wider">
          Current Weather
        </h1>

        <div className="grid grid-cols-2-custom gap-6 text-lg">

          <div>
            <span className="text-sm text-gray-300">Last updated</span>
            <p className="text-white tracking-wide">
              Today at{" "}
              {new Date(current.last_updated_epoch * 1000).toLocaleString(
                "en-US",
                {
                  hour: "numeric",
                  minute: "numeric",
                }
              )}
            </p>
          </div>

          <div>
            <span className="text-sm text-gray-300">Temperature</span>
            <p className="text-white tracking-wide">{toggleUnit(current.temp_c)}</p>
          </div>

          <div>
            <span className="text-sm text-gray-300">Condition</span>
            <div className="flex items-center gap-x-2">
              <p className="text-white tracking-wide">
                {current.condition.text}
              </p>
              <img
                src={current.condition.icon}
                alt="Weather icon"
                className="w-8 h-8"
              />
            </div>
          </div>

          <div>
            <span className="text-sm text-gray-300">Wind speed</span>
            <p className="text-white tracking-wide">{current.wind_kph} km/h</p>
          </div>

          <div>
            <span className="text-sm text-gray-300">Pressure</span>
            <p className="text-white tracking-wide">
              {current.pressure_mb} mbar
            </p>
          </div>

          <div>
            <span className="text-sm text-gray-300">Humidity</span>
            <p className="text-white tracking-wide">{current.humidity}%</p>
          </div>

        </div>
        
      </div>
    </motion.div>
  );
};

export default SearchInfo;

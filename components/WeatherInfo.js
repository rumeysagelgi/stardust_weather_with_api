import React, { useContext } from "react";
import { motion } from "framer-motion";
import { easing, weatherInfoVariant } from "../components/utils/framerProps";
import { WeatherContext } from "./WeatherApp";

const WeatherInfo = ({ weatherData: { forecast: { forecastday } } }) => {
  const { temperatureUnit } = useContext(WeatherContext);

  // Function to toggle temperature unit
  const toggleUnit = (temp) => {
    if (temperatureUnit === "Celsius") {
      return `${temp}°C`;
    } else {
      // Convert Celsius to Fahrenheit
      const fahrenheit = (temp * 9) / 5 + 32;
      return `${Math.round(fahrenheit)}°F`;
    }
  };

  // 7 day weather data container
  return (
    <div className="flex-3 flex flex-col gap-y-8">

      <motion.h1
        className="text-gray-100 font-roboto font-light tracking-wide text-xl"
        variants={weatherInfoVariant}
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
      </motion.h1>

      <motion.div
        className="grid grid-cols-1 gap-y-8 md:grid-cols-2 lg:grid-cols-3 gap-x-4 -mt-12"
        variants={weatherInfoVariant}
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
        {forecastday.map((forecast, index) => {
          const {
            date,
            day: {
              maxtemp_c,
              mintemp_c,
              maxwind_kph,
              avghumidity,
              condition: { text, icon },
            },
          } = forecast;

          const roundedMinTemp = Math.round(mintemp_c);
          const roundedMaxTemp = Math.round(maxtemp_c);

          const formattedDate = new Date(date).toLocaleDateString("en-US", {
            weekday: "long",
            month: "numeric",
            day: "numeric",
            year: "numeric",
          });

          // UI
          return (
            // <motion.div> slide-up animation
            <motion.div
              className="px-6 md:px-8 py-6 rounded-md shadow-2xl flex flex-col gap-y-8 bg-opacity-5 bg-white"
              variants={weatherInfoVariant}
              key={index}
            >

              {/* First section */}
              <div className="flex flex-col gap-y-4">
                <div className="flex justify-between">
                  <div>
                    <span className="text-xs text-gray-300">Date</span>
                    <p className="text-white tracking-wide">{formattedDate}</p>
                  </div>
                  <img src={icon} alt="Weather icon" className=":w-12 h-12" />
                </div>

                <div>
                  <span className="text-xs text-gray-300">Temperature (min / max)</span>
                  <h1 className="text-2xl text-white">
                    {toggleUnit(roundedMinTemp)} / {toggleUnit(roundedMaxTemp)}
                  </h1>
                </div>
              </div>


              {/* Second section */}
              <div className="flex flex-col gap-y-4">
                <div>
                  <span className="text-xs text-gray-300">Condition</span>
                  <div className="flex items-center gap-x-2">
                    <p className="text-white tracking-wide">{text}</p>
                  </div>
                </div>

                {/* Sub section */}
                <div className="grid grid-cols-2-custom gap-4">
                  <div>
                    <span className="text-xs text-gray-300">Max wind speed</span>
                    <p className="text-white tracking-wide">{maxwind_kph} km/h</p>
                  </div>

                  <div>
                    <span className="text-xs text-gray-300">Humidity</span>
                    <p className="text-white tracking-wide">{avghumidity}%</p>
                  </div>
                </div>
              </div>
              
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default WeatherInfo;
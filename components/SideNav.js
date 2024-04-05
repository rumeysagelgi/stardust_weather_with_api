import { useContext } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { WeatherContext } from "./WeatherApp";
import Search from "./Search";
import SearchInfo from "./SearchInfo";
import { easing, parentVariant } from "./utils/framerProps";

const SideNav = () => {
  const { handleSubmit, setWeatherData, loading, weatherData, error, toggleTemperatureUnit, temperatureUnit } = useContext(WeatherContext);

  return (
    <div className="flex-1.5 p-6 md:p-10 flex flex-col gap-y-8 ">

      <h1 className="text-gray-300 text-8xl text-center text-shadow-custom tracking-wide font-fleur cursor-default appearance-none -mb-3 md:-my-4"><div className="-ml-28">Stardust</div><div className="-mr-24">Weather</div></h1>

      {/* Celsius to Fahrenheit toggle button */}
      <button onClick={toggleTemperatureUnit}>
      <div className="flex items-center">
        <label className="relative cursor-pointer" onChange={toggleTemperatureUnit}>
            <input type="checkbox" className="sr-only peer" />
            <div className="w-[53px] h-7 flex items-center bg-gray-700 rounded-full text-[12px] text-[#ff541b] font-extrabold after:flex after:items-center after:justify-center peer after:content-['°C'] peer-checked:after:content-['°F'] peer-checked:after:translate-x-full after:absolute after:left-[2px] peer-checked:after:border-white after:bg-white after:border after:border-gray-300 after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-gray-700"></div>
        </label>
      </div>
      </button>

      {/* Search field implementation  */}
      <Search
        handleSubmit={handleSubmit}
        setWeatherData={setWeatherData}
        loading={loading}
      />

      {/* Search result implementation + error handling  */}
      <AnimatePresence>
        {weatherData && !error ? (
          <SearchInfo weatherData={weatherData} error={error} />
        ) : null}
        {error && (
          <motion.div
            className="flex-3 flex items-center justify-center"
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
            <h1 className="text-gray-200 text-lg tracking-wide font-roboto font-light">
              {error}
            </h1>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SideNav;

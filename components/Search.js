import { useContext, useRef, useEffect } from "react";
import { WeatherContext } from "./WeatherApp";

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

const Search = ({ handleSubmit, setWeatherData, loading }) => {
  const data = useContext(WeatherContext);
  const { searchTerm, setSearchTerm, setError } = data;
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <div className="px-6 py-5 md:px-12 md:py-10 bg-white rounded-md shadow-2xl flex gap-x-4 items-center bg-opacity-5">
  
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-7 w-7 text-white"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
          clipRule="evenodd"
        />
      </svg>

      <form
        className="flex-3 flex relative items-center"
        onSubmit={(e) => handleSubmit(e, searchTerm)}
      >
        <input
          type="text"
          placeholder="Search location by city"
          className="px-2 py-1 lg:py-2 outline-none placeholder-gray-200 text-md placeholder-opacity-70 w-full border-b border-gray-200 border-opacity-70  text-white bg-transparent input-custom tracking-wide font-roboto font-light"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          ref={inputRef}
        />
      </form>
      
    </div>
  );
};

export default Search;

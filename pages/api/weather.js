// Direct call to Weather API
const fetchWeatherData = async (term) => {
    const response = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=${process.env.NEXT_PUBLIC_API_KEY}&q=${term}&days=7&aqi=no&alerts=no`
    );
    const data = await response.json();
    return data;
};
  
export default fetchWeatherData;

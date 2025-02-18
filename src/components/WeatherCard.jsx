import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useWeather } from '../context/WeatherContext';

const WeatherCard = ({ weather }) => {
  const { filters } = useWeather();

  if (!weather) return null;

  const temp = Math.round(weather.main.temp);
  const weatherType = weather.weather[0].main;

  const meetsTemperatureFilter = (
    (!filters.tempMin || temp >= parseInt(filters.tempMin)) &&
    (!filters.tempMax || temp <= parseInt(filters.tempMax))
  );

  const meetsWeatherTypeFilter = (
    !filters.weatherType || weatherType === filters.weatherType
  );

  if (!meetsTemperatureFilter || !meetsWeatherTypeFilter) {
    return null;
  }

  return (
    <Link
      to={`/weather/${weather.name}`}
      className="weather-card w-full max-w-sm mx-auto fade-in"
    >
      <div className="p-8">
        <div className="flex flex-col items-start space-y-4">
          <div className="w-full flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-1">
                {weather.name}
              </h2>
              <p className="text-gray-500">{weather.sys.country}</p>
            </div>
            <div className="weather-icon">
              <img
                src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt={weather.weather[0].description}
                className="w-20 h-20"
              />
            </div>
          </div>

          <div className="w-full">
            <h1 className="text-6xl font-bold text-blue-600 mb-2">
              {temp}°C
            </h1>
            <p className="text-lg text-gray-600 capitalize">
              {weather.weather[0].description}
            </p>
          </div>

          <div className="w-full grid grid-cols-2 gap-4 mt-6">
            <div className="bg-blue-50 rounded-lg p-4">
              <p className="text-sm text-gray-500 mb-1">Humidity</p>
              <p className="text-xl font-semibold text-blue-600">
                {weather.main.humidity}%
              </p>
            </div>
            <div className="bg-blue-50 rounded-lg p-4">
              <p className="text-sm text-gray-500 mb-1">Wind Speed</p>
              <p className="text-xl font-semibold text-blue-600">
                {weather.wind.speed} m/s
              </p>
            </div>
            <div className="bg-blue-50 rounded-lg p-4">
              <p className="text-sm text-gray-500 mb-1">Min Temp</p>
              <p className="text-xl font-semibold text-blue-600">
                {Math.round(weather.main.temp_min)}°C
              </p>
            </div>
            <div className="bg-blue-50 rounded-lg p-4">
              <p className="text-sm text-gray-500 mb-1">Max Temp</p>
              <p className="text-xl font-semibold text-blue-600">
                {Math.round(weather.main.temp_max)}°C
              </p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

WeatherCard.propTypes = {
  weather: PropTypes.shape({
    name: PropTypes.string.isRequired,
    main: PropTypes.shape({
      temp: PropTypes.number.isRequired,
      humidity: PropTypes.number.isRequired,
      temp_min: PropTypes.number.isRequired,
      temp_max: PropTypes.number.isRequired
    }).isRequired,
    weather: PropTypes.arrayOf(PropTypes.shape({
      main: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      icon: PropTypes.string.isRequired
    })).isRequired,
    sys: PropTypes.shape({
      country: PropTypes.string.isRequired
    }).isRequired,
    wind: PropTypes.shape({
      speed: PropTypes.number.isRequired
    }).isRequired
  }).isRequired
};

export default WeatherCard;
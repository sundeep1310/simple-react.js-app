import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getWeatherForecast } from '../services/weatherService';
import Loading from '../components/Loading';

const WeatherDetail = () => {
  const { city } = useParams();
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchForecast = async () => {
      try {
        const data = await getWeatherForecast(city);
        setForecast(data);
      } catch (err) {
        setError(err.message || 'Failed to fetch forecast data');
      } finally {
        setLoading(false);
      }
    };

    fetchForecast();
  }, [city]);

  if (loading) return <Loading />;
  if (error) return (
    <div className="container mx-auto px-4 py-8">
      <p className="text-red-500 text-center text-lg font-medium">{error}</p>
    </div>
  );
  if (!forecast) return null;

  return (
    <div className="container mx-auto px-4 py-8">
      <Link
        to="/"
        className="inline-flex items-center text-white hover:text-white/80 mb-8 transition-colors"
      >
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
        </svg>
        Back to Home
      </Link>
      
      <h1 className="text-3xl font-bold text-white mb-8">
        5-Day Forecast for {forecast.city.name}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {forecast.list
          .filter((item, index) => index % 8 === 0)
          .map((item) => (
            <div
              key={item.dt}
              className="glass-panel p-6 rounded-lg hover:shadow-lg transition-shadow"
            >
              <p className="font-medium text-gray-700 mb-4">
                {new Date(item.dt * 1000).toLocaleDateString('en-US', {
                  weekday: 'long',
                  month: 'short',
                  day: 'numeric'
                })}
              </p>
              <div className="weather-icon mb-4">
                <img
                  src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                  alt={item.weather[0].description}
                  className="w-16 h-16 mx-auto"
                />
              </div>
              <p className="text-2xl font-bold text-blue-600 mb-2">
                {Math.round(item.main.temp)}°C
              </p>
              <p className="text-gray-600 capitalize">
                {item.weather[0].description}
              </p>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Humidity</p>
                    <p className="font-medium text-gray-700">{item.main.humidity}%</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Wind</p>
                    <p className="font-medium text-gray-700">{Math.round(item.wind.speed)} m/s</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default WeatherDetail;
import SearchBar from '../components/SearchBar';
import WeatherCard from '../components/WeatherCard';
import Loading from '../components/Loading';
import { useWeather } from '../context/WeatherContext';

const Home = () => {
  const { weatherData, loading, error } = useWeather();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8 text-white">
        Weather Forecast
      </h1>
      
      <div className="mb-8">
        <SearchBar />
      </div>
      
      <div className="mt-8">
        {loading && <Loading />}
        
        {error && (
          <div className="text-center p-4 glass-panel rounded-lg">
            <p className="text-red-500 text-lg font-medium">{error}</p>
          </div>
        )}
        
        <div className="flex justify-center items-start">
          {weatherData && <WeatherCard weather={weatherData} />}
        </div>
        
        {weatherData && !loading && (
          <div className="mt-8 text-center">
            <p className="text-white/80 text-lg">
              Showing weather information for {weatherData.name}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
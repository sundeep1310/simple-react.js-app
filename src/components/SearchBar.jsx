import { useWeather } from '../context/WeatherContext';
import { getWeatherByCity } from '../services/weatherService';

const weatherTypes = [
  'Clear',
  'Clouds',
  'Rain',
  'Snow',
  'Thunderstorm',
  'Drizzle',
  'Mist',
  'Fog'
];

const SearchBar = () => {
  const { 
    setWeatherData, 
    setLoading, 
    setError,
    filters,
    setFilters
  } = useWeather();

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!filters.searchQuery.trim()) return;

    setLoading(true);
    try {
      const data = await getWeatherByCity(filters.searchQuery);
      setWeatherData(data);
      setError(null);
    } catch (err) {
      setError(err.message || 'Failed to fetch weather data');
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6 slide-up">
      <form onSubmit={handleSearch} className="w-full">
        <div className="glass-panel rounded-lg flex overflow-hidden">
          <input
            type="text"
            name="searchQuery"
            value={filters.searchQuery}
            onChange={handleFilterChange}
            placeholder="Enter city name..."
            className="w-full px-6 py-4 bg-transparent text-gray-800 placeholder-gray-500 focus:outline-none"
          />
          <button
            type="submit"
            className="px-8 py-4 bg-blue-600 text-white font-medium hover:bg-blue-700 focus:outline-none transition-colors duration-300"
          >
            Search
          </button>
        </div>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-panel p-4 rounded-lg">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Min Temperature (°C)
          </label>
          <input
            type="number"
            name="tempMin"
            value={filters.tempMin}
            onChange={handleFilterChange}
            placeholder="Min temp"
            className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="glass-panel p-4 rounded-lg">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Max Temperature (°C)
          </label>
          <input
            type="number"
            name="tempMax"
            value={filters.tempMax}
            onChange={handleFilterChange}
            placeholder="Max temp"
            className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="glass-panel p-4 rounded-lg lg:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Weather Type
          </label>
          <select
            name="weatherType"
            value={filters.weatherType}
            onChange={handleFilterChange}
            className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Weather Types</option>
            {weatherTypes.map(type => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
import { createContext, useState, useContext } from 'react';
import PropTypes from 'prop-types';

const WeatherContext = createContext();

export const WeatherProvider = ({ children }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchHistory, setSearchHistory] = useState([]);
  const [filters, setFilters] = useState({
    tempMin: '',
    tempMax: '',
    weatherType: '',
    searchQuery: ''
  });

  const value = {
    weatherData,
    setWeatherData,
    loading,
    setLoading,
    error,
    setError,
    searchHistory,
    setSearchHistory,
    filters,
    setFilters,
  };

  return (
    <WeatherContext.Provider value={value}>
      {children}
    </WeatherContext.Provider>
  );
};

WeatherProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export const useWeather = () => {
  const context = useContext(WeatherContext);
  if (!context) {
    throw new Error('useWeather must be used within a WeatherProvider');
  }
  return context;
};
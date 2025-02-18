import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { WeatherProvider } from './context/WeatherContext';
import Home from './pages/Home';
import WeatherDetail from './pages/WeatherDetail';

const App = () => {
  return (
    <WeatherProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/weather/:city" element={<WeatherDetail />} />
        </Routes>
      </Router>
    </WeatherProvider>
  );
};

export default App;
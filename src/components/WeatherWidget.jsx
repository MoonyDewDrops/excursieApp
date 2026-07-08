import { Cloud, Sun, CloudRain, CloudSnow, Wind, Droplets } from 'lucide-react';
import './WeatherWidget.css';

const weatherIcons = {
  sunny: Sun,
  cloudy: Cloud,
  rainy: CloudRain,
  snowy: CloudSnow,
};

export default function WeatherWidget({ weather }) {
  const WeatherIcon = weatherIcons[weather?.condition] || Sun;

  return (
    <div className="weather-widget">
      <div className="weather-main">
        <div className="weather-icon-wrapper">
          <WeatherIcon className="weather-icon" size={48} />
        </div>
        <div className="weather-temp">
          <span className="weather-temp-value">{weather?.temp || '--'}</span>
          <span className="weather-temp-unit">°C</span>
        </div>
      </div>
      <div className="weather-details">
        <div className="weather-detail">
          <Droplets size={16} />
          <span>{weather?.humidity || '--'}%</span>
        </div>
        <div className="weather-detail">
          <Wind size={16} />
          <span>{weather?.wind || '--'} km/h</span>
        </div>
      </div>
      <p className="weather-location">Berlin, Deutschland</p>
    </div>
  );
}

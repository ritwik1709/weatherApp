import React, { useState } from "react";
import './App.css'
function App() {
  const [location, setLocation] = useState("");
  const [weather, setWeather] = useState([]);

  const fetchWeather = async () => {
    try {
      // const response = await fetch(`http://localhost:5000/api/weather?location=${location}`);
      const response = await fetch(`https://weatherapp-yldl.onrender.com/api/weather?location=${location}`);
      const data = await response.json();
      if (data && data.daily) {
        setWeather(data.daily);
      } else {
        console.error('Unexpected data structure:', data);
      }
    } catch (error) {
      console.error('Error fetching weather:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWeather();
  };

  return (
    <div>
      <h1>Weather App</h1>
      <p>Get the weather of next 3 days !</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Enter the City Name"
        />
        <button type="submit">Get Weather</button>
      </form>

      
      <ul>
        {weather.map((day, index) => (
          <div key={index}>
            <h4>{location} weather on {day.fxDate}</h4>
            <span>Date: {day.fxDate}</span>
            <br />
            <span>Max temperature: {day.tempMax}°C</span>
            <br />
            <span>Min temperature: {day.tempMin}°C</span>
            <br />
            <span>Humidity: {day.humidity}%</span>
            <br />
            <span>UV Index: {day.uvIndex}</span>
            <br />
            <span>Daytime: {day.textDay} (Wind: {day.windDirDay}, {day.windScaleDay}, Speed: {day.windSpeedDay} km/h)</span>
            <br />
            <span>Nighttime: {day.textNight} (Wind: {day.windDirNight}, {day.windScaleNight}, Speed: {day.windSpeedNight} km/h)</span>
            <br />
            <span>Sunrise: {day.sunrise}</span>
            <br />
            <span>Sunset: {day.sunset}</span>
            <br /><br />
          </div>
        ))}
      </ul>
    </div>
  );
}

export default App;

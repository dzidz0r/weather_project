import React, { useState } from 'react';

const api = {
  key: '8ce9e4665b539ad3d8a0657d4a9cd207',
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {

  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
          console.log(result);
        });
    }
  }

  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }

  return (
    <div className={
      (typeof weather.main == 'undefined') ? 'App'
      :(weather.main.temp < 16 && weather.weather[0].main != 'Rain' && weather.weather[0].main != 'Thunderstorm' && weather.weather[0].main != 'Drizzle') ? 'App cold'
      :(weather.weather[0].main == 'Rain' || weather.weather[0].main == 'Thunderstorm') ? 'App rain'
      :(weather.weather[0].main == 'Drizzle') ? 'App drizzle'
      :'App'}>
      <main>
        <div className='search-box'>
        <input 
            type="text"
            className="search-bar"
            placeholder="Enter a city or country"
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>

        {(typeof weather.main != 'undefined')? (
          <div>
          <div className="location-box">
            <div className="location">{weather.name}, {weather.sys.country}</div>
            <div className="date">{dateBuilder(new Date())}</div>
          </div>
          <div className="weather-box">
            <div className="temp">
              {Math.round(weather.main.temp)}??C
            </div>
            <div className="weather">{weather.weather[0].main}</div>
            <div className="description">Description: {capitalizeFirstLetter(weather.weather[0].description)}</div>
          </div>
        </div>
        ) : ('')}
      </main>
    </div>
  );
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}



export default App;

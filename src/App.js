import { useState } from 'react';
import './App.css';

function App() {

  const [data, setData] = useState({});
  const [city, setCity] = useState('');

  const key = 'db28ed587957b83b6f4cc48e04ba39a6';
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${key}`

  const onSearchWeather = (e) => {
    if (e.key === 'Enter') {
      fetch(url)
        .then(response => response.json())
        .then(res => {
          console.log(res);
          setData(res);
        })
      setCity('');

    }
  }


  return (
    <div className="app">
      <div className="inp-field">
        <input type="text"
          placeholder='Enter Location'
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={onSearchWeather}
        />
      </div>
      <div className="container">
        <div className="header">
          <div className="city">
            <p>{data.name}</p>
          </div>

          <div className="temp">
            {data.main && <h1>{data.main.temp.toFixed()}°C</h1>}
          </div>

          <div className="desc">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

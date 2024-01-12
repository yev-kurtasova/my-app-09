import { useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {

  const [data, setData] = useState({});
  const [city, setCity] = useState('');

  const key = 'db28ed587957b83b6f4cc48e04ba39a6';
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${key}`

  const onSearchWeather = (e) => {
    if (e.key === 'Enter') {
      axios.get(url).then(response => setData(response.data))
      .catch(err => console.warn(err))
        
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
        {data.name !== undefined && (
          <>
        <div className="header">
          <div className="city">
            <p>{data.name}</p>
          </div>
        </div>

        <div className="temp">
          {data.main && <h1>{data.main.temp.toFixed()}°C</h1>}
        </div>

        <div className="desc">
          {data.weather ? <p>{data.weather[0].main}</p> : null}
        </div>

        <div className="footer">
          <div className="feels">
            {data.main ? <p className='bold'>{data.main.feels_like.toFixed()}°C</p> : null}
            <p>Відчувається як </p>
          </div>
          
          <div className="humidity">
            {data.main && <p className='bold'>{data.main.humidity}%</p>}
            <p>Вологість </p>
          </div>

          <div className="wind">
            {data.wind && <p className='bold'> {data.wind.speed} м/с</p>}
            <p>Вітер</p>
          </div>
        </div>
        </>
        )}
      </div>
    </div>
  );
}

export default App;

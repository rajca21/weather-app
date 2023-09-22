import React, { useState } from 'react';

// utils
import axios from 'axios';

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState('');
  const [flag, setFlag] = useState(false);

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=dfd7032e210d51c48b7c6802797db84f`;

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      try {
        axios.get(url).then((res) => {
          setData(res.data);
          console.log(res.data);
        });
        setLocation('');
        setFlag(true);
      } catch (err) {
        console.log(err.message);
      }
    }
  };

  return (
    <div className='app'>
      <div className='search'>
        <input
          type='text'
          onChange={(event) => setLocation(event.target.value)}
          value={location}
          onKeyPress={searchLocation}
          placeholder='Enter location'
        />
      </div>
      {flag && (
        <div className='container'>
          <div className='top'>
            <div className='location'>
              <p>{data.name}</p>
            </div>
            <div className='temp'>
              {data.main ? (
                <h1>{data.main.temp.toFixed()} °C</h1>
              ) : (
                <p>No info</p>
              )}
            </div>
            <div className='description'>
              {data.weather ? <p>{data.weather[0].main}</p> : <p>No info</p>}
            </div>
          </div>
          <div className='bottom'>
            <div className='feels'>
              {data.main ? (
                <p className='bold'>{data.main.feels_like.toFixed()} °C</p>
              ) : (
                <p>No info</p>
              )}
              <p>Feels like</p>
            </div>
            <div className='humidity'>
              {data.main ? (
                <p className='bold'>{data.main.humidity}%</p>
              ) : (
                <p>No info</p>
              )}
              <p>Humidity</p>
            </div>
            <div className='wind'>
              {data.wind ? (
                <p className='bold'>{data.wind.speed} km/h</p>
              ) : (
                <p>No info</p>
              )}
              <p>Wind Speed</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

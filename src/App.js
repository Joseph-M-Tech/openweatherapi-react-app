import React, {useState} from 'react';
import './App.css';
import axios from 'axios';

function App() {

  const [data,setData] = useState({})
  const [location,setLocation] = useState('')
  // define api call 
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=55e27c50436e03422f6b0fd687480705`
  // define search location function 
  const searchLocation = (event) => {
    if(event.key === 'Enter') {
      axios.get(url).then( (response) => {
        setData( response.data )
        console.log(response.data)
      })
      setLocation('')
    }
  }


  return (
    <div className="app">
      <div className="search">
        <input type="text" 
        value={location}
        onChange= {event => setLocation(event.target.value)}
        onKeyPress = {searchLocation}
        placeholder= 'Enter Location'
        />
      </div>
      <div className="container">

        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {/*check if child data is available */}
            { data.main ? <h2>{data.main.temp.toFixed()} ℉</h2> : null }
            {/* <h2>{data.main.temp}</h2> */}
          </div>
          <div className="description">
              { data.weather ? <p>{ data.weather[0].main }</p> : null }
          </div>
        </div>


        {data.name !=undefined && 
        <div className="bottom">
          <div className="feels">
            {data.main ? <p className="bold">{data.main.feels_like.toFixed()} ℉ </p> : null }
            <p className="weather-desc">Feels like</p>
          </div>
          <div className="humidity">
            {data.main ? <p className="bold">{data.main.humidity} % </p> : null }
            <p className="weather-desc">Humidity</p>
            <p></p>
          </div>
          <div className="wind">
            {data.wind ? <p className="bold">{data.wind.speed} MPH </p> : null }
            <p className="weather-desc">Wind Speed</p>
          </div>
      </div>
        }

      </div>
    </div>
  );
}

export default App;





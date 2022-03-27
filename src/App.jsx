import { useState, useEffect } from 'react';
import './App.css';
import {v4 as uuid} from 'uuid'
import { FaThermometer as ThermometerIcon, FaWind as WindIcon} from 'react-icons/fa'

function App() {
  const [searchedCity, setSearchedCity] = useState('Curitiba')
  const [weather, setWeather] = useState(null)
  const [city, setCity] = useState('')
  const [loading, setLoading] = useState('')

  const TranslateCurrentWeatherState = {
    'Partly cloudy':'Parcialmente nublado',
    'Light snow': 'Neve leve',
    'Clear': 'Tempo Limpo',
    'Sunny':'Ensolarado',
    'Rain with thunderstorm':'Chuva com tempestade',
    'Patchy rain possible': 'Possibilidade de chuvas irregulares',
  }

  function handleSubmit(event) {
    event.preventDefault()
    setCity(searchedCity)
    console.log(searchedCity)
  }

  useEffect(() => {
    async function getCityWeather() {
      const response = await fetch (
        `https://goweather.herokuapp.com/weather/${searchedCity}`)
       const data = await response.json()
       setWeather(data)
       console.log(data)
    }

    getCityWeather()
  },[city])

  return (
    <div>
      <form action="" onSubmit={handleSubmit}>
        <input 
        type = "text" 
        placeholder = '"Ex: Curitiba"'
        value = {searchedCity}
        onChange = {event => setSearchedCity(event.target.value)}
        />  

        <button type=' submit'>Pesquisar Cidade</button>
      </form>  

      {city && weather &&(
        <>
        <h1>{city}</h1>
        <h2>Tempo Atual</h2>
        <p>{weather.temperature}</p>
        <p>
          {
          TranslateCurrentWeatherState[weather.description]
            ? TranslateCurrentWeatherState[weather.description]
            : weather.description
          }
          </p>
        
        <h2>Previsão</h2>
        <ul>
          {weather.forecast.map((dayForecast, index) => {
            return(
              <li key = {uuid()}>
              <h3>
                {index == 0 
                ? 'Amanhã'
                : Intl.DateTimeFormat(
                  'pt-BR',
                  {weekday: 'long'}
                  )
                  .format(
                    new Date()
                    .setDate(new Date().getDate() + index +1)
                  )
                  }
              </h3>
              <div>
                <p>{dayForecast.temperature}</p>
              </div>
              <div>
                <p>{dayForecast.wind}</p>
              </div>
            </li>
            )
         })}
          </ul>
        </>
      )
      }

    </div>
  ) 
}

export default App

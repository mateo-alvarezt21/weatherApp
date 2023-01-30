import axios from 'axios'
import { useEffect, useState } from 'react'
import './App.css'
import Loader from './components/Loader'
import WeatherCard from './components/WeatherCard'

const API_KEY = "d20fb6225dcea27ad576528e5af7a402"

function App() {

  const [coords, setCoords] = useState()
  const [weather, setWeather] = useState()
  const [temps, setTemps] = useState()
  const [isCelcius, setisCelcius] = useState(true)

  const success = (e) =>{
    const newCoords ={
      lat: e.coords.latitude,
      lon: e.coords.longitude
    }
    setCoords(newCoords)
  }
  const changeUnitTemp = () => setisCelcius(!isCelcius)

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success)
  }, [])

  useEffect(() => {
    if(coords){
      const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${API_KEY}`
      axios.get(URL)
        .then( res => {
          setTimeout(() => {
            setWeather(res.data)
                      const celcius = (res.data.main.temp - 273.15).toFixed(2);
                      const fahrenheit = (celcius * (9/5) + 32).toFixed(2);
                      const newTemps = {
                        celcius,
                        fahrenheit
                      }
                      setTemps(newTemps)
          }, 1000)
          
        })
        .catch(err => console.log(err))
    }
  }, [coords])

  return (
    <div className="App">
      {
        weather ? (
          <WeatherCard 
      weather={weather} 
      temps={temps} 
      isCelcius ={isCelcius} 
      changeUnitTemp = {changeUnitTemp} />
        ) : <Loader/>
      }
    </div>
  )
}

export default App

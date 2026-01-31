import React, { useEffect, useState } from 'react'
import Weathercard from './Weathercard'
import Weatherstat from './Weatherstat'
import Forecastcard from './Forecastcard'
import Searchbar from './Searchbar'
import { weatherData } from '../data/Weatherdata'

const Dashbaord = () => {

  const [response, setResponse] = useState(()=>{
    const saved = localStorage.getItem('weatherData')
    return saved ? JSON.parse(saved) : null
  })

 
  const [forecast, setForecast] = useState(()=>{
    const saved = localStorage.getItem('Forecast')
    return saved ? JSON.parse(saved) : null
  })
  // console.log(forecast);


  useEffect(() => {
    if(response){
      localStorage.setItem('weatherData', JSON.stringify(response))
    }
  }, [response])

  useEffect(() => {
    if(forecast){
      localStorage.setItem('Forecast', JSON.stringify(forecast))
    }
  }, [forecast])
  

  const dailyForecast = forecast?.list.filter(e => 
    e.dt_txt.includes('12:00:00')
  )

 

  
    const city = response?.name  
    const temperature = response?.main?.temp
    const feelsLike = response?.main?.feels_like
    const condition = response?.weather[0]?.description

    const msToKmh = (speed) => (speed*3.6).toFixed(1)
    const metersToKm = (meters) =>(meters/1000).toFixed(1);
    const formatTime = (unix, timezone) => {
      return new Date((unix + timezone)*1000).toUTCString().slice(17, 22)
    }

    const stats = [
      { label: "Wind Speed", value: `${msToKmh(response?.wind?.speed)} km/h` },
      { label: "Humidity", value: `${response?.main?.humidity} %` },
      { label: "Visibility", value: `${metersToKm(response?.visibility)} km` },
      { label: "Pressure", value: `${response?.main?.pressure} hPa` },
      { label: "Sunrise", value: formatTime(response?.sys?.sunrise, response?.timezone) },
      { label: "Sunset", value: formatTime(response?.sys?.sunset, response?.timezone) },
    ]

    

  const weatherBackground = {
    Clear : 'bg-clear',
    Clouds : 'bg-clouds',
    Rain : 'bg-rain',
    Thunderstrom : 'bg-rain',
    Sunny : 'bg-sunny',
    Fog : 'bg-fog',
    Haze : 'bg-haze',
    Mist : 'bg-mist',
    Warm : 'bg-sunny',
    Smoke : 'bg-haze',
  }

  const weatherMain = response?.weather[0]?.main
  
  const bgClass = weatherBackground[weatherMain] || "bg-default"

  const [dateTime, setDateTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setDateTime(new Date());
    }, 1000)

    return () => clearInterval(timer);
  }, [])

  const formatDate = (date) => {
    return date.toLocaleDateString("en-IN", {
      weekday : "long",
      month : 'long',
      day : "numeric",
    })
  }

  const frmatTime = (date) => {
    return date.toLocaleTimeString("en-IN", {
      hour : 'numeric',
      minute : '2-digit',
      hour12 : true,
      timeZoneName : 'short',
    })
  }
  
  return (
    <div className={`min-h-screen ${bgClass} bg-no-repeat bg-cover p-4 sm:p-8 transition-all duration-500`}>
      {/* Header */}
      <div className="mb-6">
        <p className="text-sm opacity-70">
          {formatDate(dateTime)} • {frmatTime(dateTime)}
        </p>
      </div>

      <Searchbar setResponse={setResponse} setForecast={setForecast} />

      {/* Main Content */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left */}
        <Weathercard
          city = {city}
          temperature = {temperature}
          feelslike = {feelsLike}
          condition = {condition}
        />

        {/* Right Stats */}
        <div className="lg:col-span-2 grid grid-cols-2 sm:grid-cols-3 gap-4">
          {stats.map((stat, idx) => (
            <Weatherstat key={idx} {...stat} />
          ))}
        </div>
      </div>

      {/* Forecast */}
      <div className="mt-8">
        <h3 className="mb-4 text-lg font-semibold">5-Day Forecast</h3>
        <div className="flex gap-4 overflow-x-auto pb-2">
          {dailyForecast?.map(day  => (
            <Forecastcard 
              key={day.dt}
              date={day.dt_txt}
              min={day.main.temp_min}
              max={day.main.temp_max}
              icn = {day.weather[0].icon} 
               />
          ))}
        </div>
      </div>
    </div>
  
  )
}

export default Dashbaord
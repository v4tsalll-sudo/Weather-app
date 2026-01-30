import React from 'react'

const Weathercard = ({ city, temperature, feelslike, condition }) => {
  return (
    <div className="rounded-3xl border border-white/20 bg-white/10 shadow-lg backdrop-blur-[5px] p-6 text-center ">
      <h2 className="text-xl font-semibold">{city}</h2>

      <div className="my-6 flex flex-col items-center">
        <span className="text-6xl font-bold">{temperature}°C</span>
        <span className="text-sm opacity-80">
          Feels like {feelslike}°C
        </span>
      </div>

      <p className="text-lg opacity-90 capitalize">{condition}</p>
    </div>
  )
}

export default Weathercard
import React from 'react'

const Forecastcard = ({ date, icn,min, max }) => {
        return (
          <div className="rounded-2xl  p-4 text-center min-w-20 border border-white/20 bg-white/10 shadow-lg backdrop-blur-[5px] ">
            <p className="text-sm">
              {new Date(date).toLocaleDateString('en-US',{weekday: 'short'})}
            </p>
            <img src={`https://openweathermap.org/img/wn/${icn}@2x.png`} alt="" />
            <p className="text-xs opacity-80  text-center">{min}°/{max}°</p>
          </div>
  )
}

export default Forecastcard
import React from 'react'

const Weatherstat = ({ label, value }) => {
        return (
          <div className="rounded-2xl  p-4 border border-white/20 bg-white/10 shadow-lg backdrop-blur-[5px] ">
            <p className="text-sm opacity-70">{label}</p>
            <p className="text-lg font-semibold">{value}</p>
          </div>
  )
}

export default Weatherstat
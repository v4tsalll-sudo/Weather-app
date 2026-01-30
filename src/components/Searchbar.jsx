import React, { useEffect, useState } from 'react'
import { MapPin, Search } from 'lucide-react'
import axios from 'axios'

const Searchbar = ({setResponse, setForecast}) => {

    
    const [location, setlocation] = useState('')

    const enterLocation = async () => {
        const url = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=c8aa18690c65e764af1a5c658bb73ded&units=metric`)
        const forecastData = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=c8aa18690c65e764af1a5c658bb73ded&units=metric`)
        setResponse(url.data)
        setForecast(forecastData.data)
        setlocation('') 
    }

    const currentLocation = () => {
        if(!navigator.geolocation) {
            alert('Geolocation is not supported')
        }

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const latitude = position.coords.latitude
                const longitude = position.coords.longitude
                
                try {
                    const weatherRes = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=c8aa18690c65e764af1a5c658bb73ded&units=metric`)
                    const forecastRes = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=c8aa18690c65e764af1a5c658bb73ded&units=metric`)
                    setResponse(weatherRes.data)
                    setForecast(forecastRes.data)
                } catch (error) {
                    console.error(error);
                }
            },
            (error) => {
                alert('Unable to acces current location :(')
            }
        )
    }

    
    

    return (
        <div className="flex flex-col sm:flex-row gap-3">
            <form className='flex-1 '
            onSubmit={function(e){
                e.preventDefault()
                console.log('form submittted')
                enterLocation()
            }}
            >
            <input 
                type="text"
                value={location}
                placeholder="Search City..."
                className="rounded-xl px-4 py-3 outline-none w-full
                border border-white/20 bg-white/10 shadow-lg backdrop-blur-[5px]"
                onChange={function(e){
                    setlocation(e.target.value)
                }}
            />
            </form>
            <button onClick={currentLocation}
            className="rounded-xl  px-4 py-3 border border-white/20 bg-white/10 shadow-lg backdrop-blur-[5px] ">
               <MapPin  className='inline' /> Use current location
            </button>
        </div>


    )
}

export default Searchbar

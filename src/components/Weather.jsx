// Import the React library along with specific hooks (useEffect, useRef, useState)
import React, { useEffect, useRef, useState } from 'react'

// Import the CSS file for styling the Weather component
import './Weather.css'

// Import various weather-related icons from the assets folder
import search_icon from '../assets/search.png'
import clear_icon from '../assets/clear.png'
import cloud_icon from '../assets/cloud.png'
import drizzle_icon from '../assets/drizzle.png'
import rain_icon from '../assets/rain.png'
import snow_icon from '../assets/snow.png'
import wind_icon from '../assets/wind.png'
import humidity_icon from '../assets/humidity.png'

// Define the Weather component as a functional component
const Weather = () => {

  // Create a reference for the input element using the useRef hook
  const inputRef = useRef()

  // Define state variables using the useState hook
  // weatherData will hold the weather information, initially set to false
  const [weatherData, setWeatherData] = useState(false)

  // Define an object to map weather condition codes to their corresponding icons
  const allIcons = {
    "01d": clear_icon,
    "01n": clear_icon,
    "02d": cloud_icon,
    "02n": cloud_icon,
    "03d": cloud_icon,
    "03n": cloud_icon,
    "04d": drizzle_icon,
    "04n": drizzle_icon,
    "09d": rain_icon,
    "09n": rain_icon,
    "10d": rain_icon,
    "10n": rain_icon,
    "13d": snow_icon,
    "13n": snow_icon,
  }

  // Define an asynchronous function to fetch weather data for a given city
  const search = async (city) => {
    // Check if the city input is empty and alert the user if it is
    if (city === "") {
      alert("Enter City Name")
      return
    }
    try {
      // Construct the API URL using the provided city name and an environment variable for the API key
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${import.meta.env.VITE_APP_ID}`

      // Fetch data from the API
      const response = await fetch(url)
      const data = await response.json()

      // Check if the response is not OK and alert the user with the error message
      if (!response.ok) {
        alert(data.message)
        return
      }

      // Log the data to the console for debugging
      console.log(data)

      // Get the corresponding icon based on the weather condition code
      const icon = allIcons[data.weather[0].icon] || clear_icon

      // Update the weatherData state with the fetched data
      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: icon
      })
    } catch (error) {
      // Handle any errors that occur during the fetch process
      setWeatherData(false)
      console.error("Error in fetching weather data")
    }
  }

  // Use the useEffect hook to fetch weather data for a default city ("Houston") when the component mounts
  useEffect(() => {
    search("Houston")
  }, [])

  // Return the JSX for rendering the Weather component
  return (
    <div className='weather'>
      {/* Search bar with input field and search icon */}
      <div className="search-bar">
        <input ref={inputRef} type="text" placeholder='Search' />
        <img src={search_icon} alt="" onClick={() => search(inputRef.current.value)} />
      </div>

      {/* Conditionally render weather data if available */}
      {weatherData ? <>
        <img src={weatherData.icon} alt="" className='weather-icon' />
        <p className='temperature'>{weatherData.temperature}°F</p>
        <p className='location'>{weatherData.location}</p>
        <div className="weather-data">
          <div className="col">
            <img src={humidity_icon} alt="" />
            <div>
              <p>{weatherData.humidity}%</p>
              <span>Humidity</span>
            </div>
          </div>
          <div className="col">
            <img src={wind_icon} alt="" />
            <div>
              <p>{weatherData.windSpeed} mph</p>
              <span>Wind Speed</span>
            </div>
          </div>
        </div>
      </> : <></>}
    </div>
  )
}

// Export the Weather component as the default export of this module
export default Weather

// Import the React library, which is necessary to use React components and hooks
import React from 'react'

// Import the Weather component from the specified file path
import Weather from './components/Weather'

// Define the main App component as a functional component
const App = () => {
  // The component returns a div element with the class 'app' that contains the Weather component
  return (
    <div className = 'app'>
        <Weather/>
    </div>
  )
}

// Export the App component as the default export of this module
export default App

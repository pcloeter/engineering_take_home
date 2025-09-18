import React, { useState, useEffect } from 'react';
import LoaderComponent from './LoaderComponent';
import BuildingCardComponent from './BuildingCardComponent';

const App = () => {
  const [buildings, setBuildings] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true)

  const fetchBuildings = async () => {
    try {
      const response = await fetch('api/v1/buildings')
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`${errorData.error}`)
      }

      const data = await response.json();
      setBuildings(data.buildings)

    } catch(e) {
      setError("An unexpected error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchBuildings();
  }, [])

  if (isLoading) {
    return ( <LoaderComponent /> )
  }
  
  return (
    <div className="app">
      <h3>Very Interesting Buildings</h3>
      { error ? (
        <p className="error">{error}</p>
        ) : (
          <ul>
            { buildings.length && buildings.map( building => (
              <BuildingCardComponent key={building.id} building={building} onEdit={() => {}}/>
            ))}
          </ul>
        )}
    </div>
  );
};

export default App;

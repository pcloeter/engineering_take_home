import React, { useState, useEffect } from 'react';
import LoaderComponent from './LoaderComponent';
import BuildingCardComponent from './BuildingCardComponent';
import BuildingFormComponent from './BuildingFormComponent';

const App = () => {
  const [buildings, setBuildings] = useState([]);
  const [clients, setClients] = useState([])
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true)
  const [buildingToEdit, setBuildingToEdit] = useState(null);
  const [showForm, setShowForm] = useState(false);


  const fetchData = async () => {
    try {
      const [buildingsResponse, clientsResponse] = await Promise.all(
        [
          fetch('api/v1/buildings'),
          fetch('api/v1/clients')
        ]
      )
      
      if (!buildingsResponse.ok) {
        const errorData = await buildingsResponse.json();
        throw new Error(errorData.error?.join(', ') || 'Could not fetch buildings.');
      }

      if (!clientsResponse.ok) {
        const errorData = await clientsResponse.json();
        throw new Error(errorData.error?.join(', ') || 'Could not fetch clients.');
      }

      const buildingsData = await buildingsResponse.json()
      const clientsData = await clientsResponse.json();
      setBuildings(buildingsData.buildings);
      setClients(clientsData.clients)

    } catch(e) {
      // For the UX
      setError("Unfortunately, an error occurred! Please try again.")
      // We would log this to something like Sentry in an enterprise application
      console.error(e.message)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchData();
  }, [])

  const handleFormSuccess = () => {
    setShowForm(false);
    setBuildingToEdit(null);
    fetchData();
  };

  const handleEditClick = (building) => {
    setBuildingToEdit(building);
    setShowForm(true);
  };
  
  const handleCreateClick = () => {
    setBuildingToEdit(null);
    setShowForm(true);
  };

  if (isLoading) {
    return ( <LoaderComponent /> )
  }
  
  return (
    <div className="app">
      <h3>Very Interesting Buildings</h3>
      {!showForm && (
        <button onClick={handleCreateClick} className="btn btn-create">
          Create New Building
        </button>
      )}
      
      {showForm && (
        <BuildingFormComponent
          buildingToEdit={buildingToEdit}
          onSuccess={handleFormSuccess}
          clients={clients}
        />
      )}
      { error ? (
        <p className="error">{error}</p>
        ) : (
          <ul>
            { buildings.length && buildings.map( building => (
              <BuildingCardComponent key={building.id} building={building} onEdit={handleEditClick}/>
            ))}
          </ul>
        )}
    </div>
  );
};

export default App;

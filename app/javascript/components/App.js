import React, { useState, useEffect, useRef } from 'react';
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
  const [successMessage, setSuccessMessage] = useState('');
  const formRef = useRef(null);


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

  useEffect(() => {
    if (showForm) {
      formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [showForm]);

  const handleFormSuccess = (message) => {
    setShowForm(false);
    setBuildingToEdit(null);
    setSuccessMessage(message);
    fetchData();
    window.scrollTo({ top: 0, behavior: 'smooth' }); 

    setTimeout(() => {
      setSuccessMessage('');
    }, 3000);
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
      <h3 className="main-header">Very Interesting Buildings</h3>
      {successMessage && <p className="success-message">{successMessage}</p>}
      {!showForm && (
        <button onClick={handleCreateClick} className="btn-primary">
          Create New Building
        </button>
      )}
      
      <div ref={formRef}>
        {showForm && (
          <BuildingFormComponent
            buildingToEdit={buildingToEdit}
            onSuccess={handleFormSuccess}
            clients={clients}
          />
        )}
      </div>
      { error ? (
        <p className="error">{error}</p>
        ) : (
          <ul className="card-list">
            { buildings.length && buildings.map( building => (
              <BuildingCardComponent key={building.id} building={building} onEdit={handleEditClick}/>
            ))}
          </ul>
        )}
    </div>
  );
};

export default App;

import React, { useState, useEffect } from 'react';

const BuildingFormComponent = ({ buildingToEdit, onSuccess, clients }) => {
  const [address, setAddress] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');
  const [selectedClientId, setSelectedClientId] = useState('');
  const [customFieldValues, setCustomFieldValues] = useState({});

  useEffect(() => {
    if (buildingToEdit) {
      setSelectedClientId(buildingToEdit.client_id || '');
      setAddress(buildingToEdit.address || '');
      // This is why we needed to include state & zip in the buildings fetch
      setState(buildingToEdit.state || '');
      setZip(buildingToEdit.zip || '');
      setCustomFieldValues(buildingToEdit.custom_fields || {});
    } else {
      // For create
      setSelectedClientId('');
      setAddress('');
      setState('');
      setZip('');
      setCustomFieldValues({});
    }
  }, [buildingToEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isEditing = !!buildingToEdit;

    const buildingData = { 
      client_id: selectedClientId, 
      address, 
      state, 
      zip, 
      custom_fields: customFieldValues 
    };
    const url = isEditing ? `/api/v1/buildings/${buildingToEdit.id}` : '/api/v1/buildings';
    const method = isEditing ? 'PATCH' : 'POST';

    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ building: buildingData }),
      });

      if (response.ok) {
        onSuccess();
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.error.join(', ')}`);
      }
    } catch (error) {
      alert('Unfortunately, an error occurred!');
    }
  };

  const currentClient = clients.find(c => c.id === selectedClientId);
  const fieldsToRender = currentClient ? currentClient.custom_fields : [];

  return (
    <form onSubmit={handleSubmit} className="card">
      <h3>{buildingToEdit ? 'Edit Interesting Building' : 'Create New Interesting Building'}</h3>
      <select value={selectedClientId} onChange={(e) => setSelectedClientId(Number(e.target.value))} required>
        <option value="">-- Choose a Client! --</option>
        {clients.map(client => <option key={client.id} value={client.id}>{client.name}</option>)}
      </select>
      <input type="text" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} required />
      <input type="text" placeholder="State" value={state} onChange={(e) => setState(e.target.value)} required />
      <input type="text" placeholder="Zip" value={zip} onChange={(e) => setZip(e.target.value)} required />
      
      {fieldsToRender.length > 0 && <hr />}
      
      {fieldsToRender.map(field => (
        <div key={field.name}>
          <label style={{ textTransform: 'capitalize', display: 'block', margin: '8px 0 4px' }}>
            {field.name.replace(/_/g, ' ')}
          </label>
          <input
            type={field.field_type === 'number' ? 'number' : 'text'}
            value={customFieldValues[field.name] || ''}
            onChange={(e) => setCustomFieldValues(prev => ({ ...prev, [field.name]: e.target.value }))}
          />
        </div>
      ))}

      <button type="submit" style={{ marginTop: '1rem' }}>
        {buildingToEdit ? 'Update Building' : 'Create Building'}
      </button>
    </form>
  );
};

export default BuildingFormComponent;
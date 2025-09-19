import React from 'react';

const BuildingCard = ({ building, onEdit }) => {
  const { id, client_name, address, state, zip, ...customFields } = building;

  return (
    <div className="card">
      <h5 className="card-header">{address}</h5>
      <p className="address">{state}, {zip}</p>
      <p><strong>Client:</strong> {client_name}</p>
      <hr />
      <h5>Custom Details:</h5>
      <ul className="card-details-list">
        {Object.entries(customFields).map(([key, value]) => (
          <li key={key}>
            <strong>{key.replace(/_/g, ' ')}:</strong> {value || 'N/A'}
          </li>
        ))}
      </ul>
      <button className='btn-secondary' onClick={() => onEdit(building)}>Edit</button>
    </div>
  );
};

export default BuildingCard;
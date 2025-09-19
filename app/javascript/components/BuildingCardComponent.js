import React from 'react';

const BuildingCard = ({ building, onEdit }) => {
  const { id, client_name, address, state, zip, ...customFields } = building;

  return (
    <div className="card">
      <h3 className="card-header">{address}</h3>
      <p>{state}, {zip}</p>
      <p><strong>Client:</strong> {client_name}</p>
      <hr />
      <h4>Custom Details:</h4>
      <ul className="card-details-list">
        {Object.entries(customFields).map(([key, value]) => (
          <li key={key}>
            <strong>{key.replace(/_/g, ' ')}:</strong> {value || 'N/A'}
          </li>
        ))}
      </ul>
      <button onClick={() => onEdit(building)}>Edit</button>
    </div>
  );
};

export default BuildingCard;
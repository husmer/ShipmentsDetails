import React, { useState } from 'react';



export default function ShipmentDetails({ shipment, onSave, onDiscard }) {
  const [editedShipment, setEditedShipment] = useState({ ...shipment });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedShipment({ ...editedShipment, [name]: value });
  };

  const handleStatusChange = (e) => {
    const value = e.target.value;
    setEditedShipment({ ...editedShipment, status: value });
  };

  return (
    <div>
      <h2>Shipment Details</h2>
      <div className="row">
        <div className="column">
          <div className="input-box">
            <label>Order No:</label>
            <input
              className={'edit-box read-only-input'}
              type="text"
              name="orderNo"
              value={editedShipment.orderNo}
              readOnly
            />
          </div>
          <div className="input-box">
            <label>Date:</label>
            <input
              className="edit-box"
              type="text"
              name="date"
              value={editedShipment.date}
              onChange={handleInputChange}
            />
          </div>
          <div className="input-box">
            <label>Customer:</label>
            <input
              className="edit-box"
              type="text"
              name="customer"
              value={editedShipment.customer}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="column">
          <div className="input-box">
            <label>Tracking number:</label>
            <input
              className="edit-box"
              type="text"
              name="trackingNo"
              value={editedShipment.trackingNo}
              onChange={handleInputChange}
            />
          </div>
          <div className="input-box">
            <label>Status:</label>
            <select
              className="edit-box"
              name="status"
              value={editedShipment.status}
              onChange={handleStatusChange}
            >
              <option value="'Delivered'">'Delivered'</option>
              <option value="'In Transit'">'In Transit'</option>
              <option value="'Shipped'">'Shipped'</option>
            </select>
          </div>
          <div className="input-box">
            <label>Consignee:</label>
            <input
              className="edit-box"
              type="text"
              name="consignee"
              value={editedShipment.consignee}
              onChange={handleInputChange}
            />
          </div>
        </div>
      </div>
      <div className="button-container">
        <button className="save-button" onClick={() => onSave(editedShipment)}>Save</button>
        <button className="discard-button" onClick={onDiscard}>Discard</button>
      </div>
    </div>
  );
}

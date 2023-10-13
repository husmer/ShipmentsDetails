import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './index.css';
import ShipmentDetails from './ShipmentDetails';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboard, faCircleXmark } from '@fortawesome/free-solid-svg-icons';

// I got this error when using the website:
// {"error":"Free accounts are limited to 200 requests per day.  You can generate up to 1000000 records per day by upgrading to a Silver plan.  See http://www.mockaroo.com/api/docs for more information about usage limits."}
// So now the json file is in the public folder.
// The program also works if "/shipments.json" is replaced with the APi URL.
const baseURL = "/shipments.json";

export default function App() {
  const [info, setInfo] = useState(null);
  const [selectedShipment, setSelectedShipment] = useState(null);

  useEffect(() => {
    axios
      .get(baseURL)
      .then((response) => {
        setInfo(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  if (!info) return null;

  // Define table headers
  const tableHeaders = [
    'Order No',
    'Date',
    'Customer',
    'Tracking No',
    'Status',
    'Consignee',
  ];

  // Function to handle "Details" button click and toggle it's visibility
  const handleDetailsClick = (shipment) => {
    setSelectedShipment((prevSelectedShipment) => {
      if (prevSelectedShipment === shipment) {
        return null;
      } else {
        return shipment;
      }
    });
  };

  // Save edited Shipment Details
  const handleSave = (editedShipment) => {
    // Update the edited shipment in the info state
    const updatedInfo = info.map((shipment) =>
      shipment.orderNo === editedShipment.orderNo ? editedShipment : shipment
    );
    setInfo(updatedInfo);
    setSelectedShipment(null);
  };

  // Discard edited Shipment Details
  const handleDiscard = () => {
    setSelectedShipment(null);
  };

  const handleDelete = (orderNo) => {
    const updatedInfo = info.filter((shipment) => shipment.orderNo !== orderNo);
    setInfo(updatedInfo);
  };
  

  return (
      <table className="shipment-table">
        <thead>
          <tr>
            {tableHeaders.map((header) => (
              <th key={header}>{header}</th>
            ))}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {info.map((shipment) => (
            <React.Fragment key={shipment.orderNo}>
              <tr>
                <td>{shipment.orderNo}</td>
                <td>{shipment.date}</td>
                <td>{shipment.customer}</td>
                <td>{shipment.trackingNo}</td>
                <td>{shipment.status}</td>
                <td>{shipment.consignee}</td>
                <td>
                  <div className="button-container">
                    {/* Pass the shipment to the handleDetailsClick function */}
                    <button
                      onClick={() => handleDetailsClick(shipment)} className="details-button">
                        <FontAwesomeIcon icon={faClipboard} />
                    </button>
                    <button 
                      onClick={() => handleDelete(shipment.orderNo)}
                      className="delete-button">
                      <FontAwesomeIcon icon={faCircleXmark} />
                    </button> 
                  </div>

                </td>
              </tr>
              {/* Render ShipmentDetails under the selected data row */}
              {selectedShipment === shipment && (
                <tr>
                <td colSpan={tableHeaders.length + 1}>
                  <ShipmentDetails
                    shipment={selectedShipment}
                    onSave={handleSave}
                    onDiscard={handleDiscard}
                  />
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
  );
}

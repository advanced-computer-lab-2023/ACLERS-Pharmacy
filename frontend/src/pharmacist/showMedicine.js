import React, { useState, useEffect } from 'react';
import { useParams,useNavigate } from 'react-router-dom';

function ViewMedicine() {
  const { medicineId } = useParams();
  const [medicine, setMedicine] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editedDescription, setEditedDescription] = useState('');
  const [editedPrice, setEditedPrice] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    // Fetch the medicine data using the `medicineId` query parameter
    fetch(`http://localhost:8000/pharmacist/viewMedicine?medicineId=${medicineId}`)
      .then((response) => response.json())
      .then((data) => {
        setMedicine(data);
        setEditedDescription(data.description); // Initialize editedDescription
        setEditedPrice(data.price); // Initialize editedPrice
      })
      .catch((error) => console.error(error));
  }, [medicineId]);

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleSaveClick = async () => {
    // Send a PATCH or PUT request to update the description and price
    try {
      const response = await fetch(`http://localhost:8000/pharmacist/editMedicine?MedicineId=${medicineId}`, {
        method: 'PUT', // You might need to use 'PATCH' or 'PUT' depending on your API
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ description: editedDescription, price: editedPrice }),
      });

      if (response.ok) {
        // Exit edit mode and update the medicine data
        setEditMode(false);
        setMedicine((prevMedicine) => ({
          ...prevMedicine,
          description: editedDescription,
          price: editedPrice,
        }));
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (!medicine) {
    return <div>Loading...</div>;
  }

  return (
    <div>
         <button onClick={() => navigate(-1)}>Go Back</button>
      <h1>Medicine Details</h1>
      <img src={medicine.picture} alt={medicine.name} />
      <h2>Name: {medicine.name}</h2>

      {editMode ? (
        <div>
          <label>
            Description:
            <input
              type="text"
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
            />
          </label>
          <label>
            Price:
            <input
              type="number"
              value={editedPrice}
              onChange={(e) => setEditedPrice(e.target.value)}
            />
          </label>
          <button onClick={handleSaveClick}>Save</button>
        </div>
      ) : (
        <div>
          <p>Description: {medicine.description}</p>
          <p>Price: {medicine.price}</p>
          <p>Medicinal Use: {medicine.medicinialUse}</p>
          <button onClick={handleEditClick}>Edit</button>
          {/* Add other medicine details here */}
        </div>
      )}
    </div>
  );
}

export default ViewMedicine;

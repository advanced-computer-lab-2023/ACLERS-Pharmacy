import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function ViewMedicine() {
    const { medicineId } = useParams();
    const [medicine, setMedicine] = useState(null);
  
    useEffect(() => {
      // Fetch the medicine data using the `medicineId` query parameter
      fetch(`http://localhost:8000/pharmacist/viewMedicine?medicineId=${medicineId}`)
        .then((response) => response.json())
        .then((data) => {
          setMedicine(data);
          console.log(data)
        })
        .catch((error) => console.error(error));
    }, [medicineId]);
  
    if (!medicine) {
      return <div>Loading...</div>;
    }
  
    return (
      <div>
        <h1>Medicine Details</h1>
        <img src={medicine.picture} alt={medicine.name} />
        <h2>Name: {medicine.name}</h2>
        <p>Description: {medicine.description}</p>
        <p>Price: {medicine.price}</p>
        <p>Medicinal Use: {medicine.medicinalUse}</p>
        {/* Add other medicine details here */}
      </div>
    );
  }

  export default ViewMedicine; // Use "ViewMedicine" with an uppercase "V"

  
  
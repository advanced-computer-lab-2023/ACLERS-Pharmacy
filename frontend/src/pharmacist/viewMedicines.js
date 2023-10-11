import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const MedicineList = () => {
  const [medicines, setMedicines] = useState([]);

  useEffect(() => {
    // Fetch medicines from the backend (replace with your actual API endpoint)
    fetch(`http://localhost:8000/pharmacist/viewMedicines`)
      .then((response) => response.json())
      .then((data) => setMedicines(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      <h1>Available Medicines</h1>
      <ul>
        {medicines.map((medicine) => (
          <li key={medicine._id}>
            <img src={medicine.picture} alt={medicine.name} />
            <h3>{medicine.name}</h3>
            <p>{medicine.description}</p>
            <p>Price: {medicine.price}</p>
            <Link to={`/viewMedicine/${medicine._id}`}>View Details</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MedicineList;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import jwt from 'jsonwebtoken-promisified';

const MedicineListPatient = () => {
  const token = localStorage.getItem('token');
  const decodedToken = jwt.decode(token);
  const patientId = decodedToken.id;

  const [medicines, setMedicines] = useState([]);
  const [searchName, setSearchName] = useState('');
  const [filterMedicinalUse, setFilterMedicinalUse] = useState('');
  const [quantities, setQuantities] = useState({});
  const navigate = useNavigate();

  console.log('decoded Token:', decodedToken);

  useEffect(() => {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    fetch(`http://localhost:8000/patient/viewMedicines`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        const initialQuantities = {};
        data.forEach((medicine) => {
          initialQuantities[medicine._id] = 1;
        });
        setMedicines(data);
        setQuantities(initialQuantities);
      })
      .catch((error) => console.error(error));
  }, [token]);

  const handleSearch = () => {
    const filtered = medicines.filter((medicine) =>
      medicine.name.toLowerCase().includes(searchName.toLowerCase())
    );
    setMedicines(filtered);
  };

  const handleFilter = () => {
    const filtered =
      filterMedicinalUse !== ''
        ? medicines.filter((medicine) => medicine.medicinialUse === filterMedicinalUse)
        : medicines;
    setMedicines(filtered);
  };

  const handleAddToCart = async (medicineId) => {
    const quantity = quantities[medicineId];

    try {
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ medicineId, quantity }),
      };

      const response = await fetch('http://localhost:8000/patient/add-to-cart', requestOptions);

      if (response.ok) {
        console.log('added successfully');
      } else {
        console.error('Failed to add to cart');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleViewAlternatives = (medicineId) => {
    // Navigate to the page that displays alternatives for the specific medicine
    navigate(`/patient/ViewAlternatives/${medicineId}`);
  };

  const handleUpdateQuantity = (medicineId, newQuantity) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [medicineId]: newQuantity,
    }));
  };

  return (
    <div>
      <button onClick={() => navigate(-1)}>Go Back</button>
      <h1>Available Medicines</h1>
      <div>
        <input
          type="text"
          placeholder="Search by name"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div>
        <input
          type="text"
          placeholder="Filter by medicinal use"
          value={filterMedicinalUse}
          onChange={(e) => setFilterMedicinalUse(e.target.value)}
        />
        <button onClick={handleFilter}>Filter</button>
      </div>
      <button onClick={() => navigate('/patient/view-cart')}>View Cart</button>

      <ul>
        {medicines.map((medicine) => (
          <li key={medicine._id}>
            <img
              src={`http://localhost:8000/uploads/${medicine.picture.substring(8)}`}
              style={{ maxWidth: '50%', maxHeight: '50%', objectFit: 'contain' }}
              alt={medicine.name}
            />
            <h3>{medicine.name}</h3>
            <p>Description: {medicine.description}</p>
            <p>Medicinal Use: {medicine.medicinialUse}</p>
            <p>Price: {medicine.price}</p>
            <div>
              <button
                onClick={() =>
                  handleUpdateQuantity(medicine._id, Math.max(1, quantities[medicine._id] - 1))
                }
              >
                -
              </button>
              <span>{quantities[medicine._id]}</span>
              <button onClick={() => handleUpdateQuantity(medicine._id, quantities[medicine._id] + 1)}>
                +
              </button>
            </div>
            {!medicine.addedToCart ? (
              <>
                <button onClick={() => handleAddToCart(medicine._id)}>Add to Cart</button>
                <button onClick={() => handleViewAlternatives(medicine._id)}>
                  View Alternatives
                </button>
              </>
            ) : (
              <p>Added to Cart Successfully</p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MedicineListPatient;

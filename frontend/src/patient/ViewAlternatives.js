import React, { useState, useEffect } from 'react';
import { useNavigate,useParams } from 'react-router-dom';
import jwt from 'jsonwebtoken-promisified';

const ViewAlternatives = ({ params }) => {
  const token = localStorage.getItem('token');
  const decodedToken = jwt.decode(token);
  const { medicineId } = useParams(); // Use useParams to get the medicineId
  console.log (medicineId)


  const [alternativeMedicines, setAlternativeMedicines] = useState([]);
  const [quantities, setQuantities] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAlternativeMedicines = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/patient/viewAlternatives?medicineId=${medicineId}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          const initialQuantities = {};
          data.forEach((medicine) => {
            initialQuantities[medicine._id] = 1;
          });
          setAlternativeMedicines(data);
          setQuantities(initialQuantities);
        } else {
          console.error('Failed to retrieve alternative medicines');
        }
      } catch (error) {
        console.error('Error during alternative medicines retrieval:', error);
      }
    };

    fetchAlternativeMedicines();
  }, [token, medicineId]);

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
        console.log('Added to cart successfully');
      } else {
        console.error('Failed to add to cart');
      }
    } catch (error) {
      console.error('Error:', error);
    }
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
      <h1>Alternative Medicines</h1>
      <ul>
        {alternativeMedicines.map((medicine) => (
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
            <button onClick={() => handleAddToCart(medicine._id)}>Add to Cart</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ViewAlternatives;

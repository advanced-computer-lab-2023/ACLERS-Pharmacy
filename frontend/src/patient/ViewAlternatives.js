import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import jwt from 'jsonwebtoken-promisified';
import PatientNavbar from '../components/patientNavbar';

const ViewAlternatives = () => {
  const token = localStorage.getItem('token');
  const decodedToken = jwt.decode(token);
  const { medicineId } = useParams();

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
    <div style={{ backgroundColor: '#e0e0e0', textAlign: 'center', minHeight: '100vh' }}>
      <PatientNavbar />
      <div style={{ backgroundColor: '#e0e0e0', padding: '20px', marginBottom: '20px', marginLeft: '80px' }}>
        {/* Header */}
        <div style={{ backgroundColor: '#fff', borderRadius: '8px', marginBottom: '15px', padding: '10px 380px', marginLeft: 180, textAlign: 'left' }}>
          <h1 style={{ fontFamily: 'Arial, sans-serif', fontSize: '35px', fontWeight: 'bold', color: '#333' }}>Alternative Medicines</h1>
        </div>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-start', marginLeft: '250px' }}>
        {alternativeMedicines.map((medicine, index) => (
          <div key={medicine._id} style={{ backgroundColor: '#fff', borderRadius: '8px', margin: '10px', padding: '15px', textAlign: 'left', flexBasis: '20%', marginLeft: '40px' }}>
            <img
              src={`http://localhost:8000/uploads/${medicine.picture.substring(8)}`}
              style={{ width: '100%', height: '150px', objectFit: 'contain', marginBottom: '10px' }}
              alt={medicine.name}
            />
            <h3 style={{ fontFamily: 'Arial, sans-serif', fontSize: '18px', fontWeight: 'bold', color: '#000', cursor: 'pointer' }}>{medicine.name}</h3>
            <p style={{ fontSize: '14px' }}>Description: {medicine.description}</p>
            <p style={{ fontSize: '14px' }}>Medicinal Use: {medicine.medicinalUse}</p>
            <p style={{ fontSize: '14px' }}>Price: {medicine.price}</p>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <button onClick={() => handleUpdateQuantity(medicine._id, Math.max(1, quantities[medicine._id] - 1))} style={{ backgroundColor: '#001f3f', color: '#fff', borderRadius: '4px', padding: '5px', marginRight: '5px' }}>
                -
              </button>
              <span style={{ fontSize: '16px', fontWeight: 'bold', margin: '0 5px' }}>{quantities[medicine._id]}</span>
              <button onClick={() => handleUpdateQuantity(medicine._id, quantities[medicine._id] + 1)} style={{ backgroundColor: '#001f3f', color: '#fff', borderRadius: '4px', padding: '5px', marginRight: '5px' }}>
                +
              </button>
            </div>
            <button onClick={() => handleAddToCart(medicine._id)} style={{ backgroundColor: '#001f3f', color: '#fff', cursor: 'pointer', fontFamily: 'Arial, sans-serif', marginTop: '10px', padding: '5px 15px', borderRadius: '4px' }}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewAlternatives;

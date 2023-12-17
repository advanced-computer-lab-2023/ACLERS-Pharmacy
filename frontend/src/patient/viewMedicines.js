import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import jwt from 'jsonwebtoken-promisified';
import PatientNavbar from "../components/patientNavbar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faFilter, faCartPlus, faEye } from '@fortawesome/free-solid-svg-icons';
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { Container, Typography, IconButton } from "@mui/material";

const MedicineListPatient = () => {
  const [medicines, setMedicines] = useState([]);
  const [searchName, setSearchName] = useState('');
  const [filterMedicinalUse, setFilterMedicinalUse] = useState('');
  const [filteredMedicines, setFilteredMedicines] = useState([]);
  const [quantities, setQuantities] = useState({});
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const decodedToken = jwt.decode(token);
  const [DialogOpen, setDialogOpen] = useState(false);

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
        setFilteredMedicines(data);
        setQuantities(initialQuantities);
      })
      .catch((error) => console.error(error));
  }, [token]);

  const handleSearch = () => {
    const filtered = medicines.filter((medicine) =>
      medicine.name.toLowerCase().includes(searchName.toLowerCase())
    );
    setFilteredMedicines(filtered);
  };

  const handleFilter = () => {
    const filtered =
      filterMedicinalUse !== ''
        ? medicines.filter((medicine) => medicine.medicinalUse === filterMedicinalUse)
        : medicines;
    setFilteredMedicines(filtered);
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
        setDialogOpen(true);

        setTimeout(()=> {
          setDialogOpen(false);
        },5000);
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
    <div style={{ backgroundColor: '#e0e0e0', textAlign: 'center', minHeight: '100vh' }}>
      <PatientNavbar />
      <div style={{ backgroundColor: '#e0e0e0', padding: '20px', marginBottom: '20px', marginLeft: '80px' }}>
        {/* Header */}
        <div style={{ backgroundColor: '#fff', borderRadius: '8px', marginBottom: '15px', padding: '10px 380px', marginLeft: 180, textAlign: 'left' }}>
          <h1 style={{ fontFamily: 'Arial, sans-serif', fontSize: '35px', fontWeight: 'bold', color: '#333' }}>Available Medicines</h1>
        </div>
        {/* Search Input */}
        <div style={{ marginBottom: '10px' }}>
          <input
            type="text"
            placeholder="Search by name"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            style={{ fontSize: '16px', padding: '5px 150px' }}
          />
          <button onClick={handleSearch} style={{ backgroundColor: '#001f3f', color: '#fff', padding: '5px', fontSize: '16px' }}>
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>
        {/* Filter Input */}
        <div>
          <input
            type="text"
            placeholder="Filter by medicinal use"
            value={filterMedicinalUse}
            onChange={(e) => setFilterMedicinalUse(e.target.value)}
            style={{ fontSize: '16px', padding: '5px 150px' }}
          />
          <button onClick={handleFilter} style={{ backgroundColor: '#001f3f', color: '#fff', padding: '5px', fontSize: '16px' }}>
            <FontAwesomeIcon icon={faFilter} />
          </button>
        </div>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-start', marginLeft: '250px' }}>
        {filteredMedicines.map((medicine, index) => (
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
                <FontAwesomeIcon icon="minus" />
              </button>
              <span style={{ fontSize: '16px', fontWeight: 'bold', margin: '0 5px' }}>{quantities[medicine._id]}</span>
              <button onClick={() => handleUpdateQuantity(medicine._id, quantities[medicine._id] + 1)} style={{ backgroundColor: '#001f3f', color: '#fff', borderRadius: '4px', padding: '5px', marginRight: '5px' }}>
                <FontAwesomeIcon icon="plus" />
              </button>
            </div>
            {!medicine.addedToCart ? (
              <>
                <button onClick={() => handleAddToCart(medicine._id)} style={{ backgroundColor: '#001f3f', color: '#fff', cursor: 'pointer', fontFamily: 'Arial, sans-serif', marginTop: '10px', padding: '5px 15px', borderRadius: '4px' }}>
                  <FontAwesomeIcon icon={faCartPlus} style={{ marginRight: '5px' }} />
                  
                </button>
                <button onClick={() => handleViewAlternatives(medicine._id)} style={{ backgroundColor: '#001f3f', color: '#fff', cursor: 'pointer', fontFamily: 'Arial, sans-serif', marginTop: '10px', padding: '5px 15px', borderRadius: '4px' }}>
                  <FontAwesomeIcon icon={faEye} style={{ marginRight: '5px' }} />
                Alternative Medicine
                </button>
              </>
            ) : (
              <p style={{ fontSize: '14px', color: 'green', marginTop: '10px' }}>Added to Cart Successfully</p>
            )}
          </div>
        ))}
      </div>
      <Dialog
          open = {DialogOpen}
          onClose={() => setDialogOpen(false)}
          aria-describedby="accept-dialog-decription">
            <DialogContent>
              <Typography variant = "h6" color = "primary">
                Added to Cart!
              </Typography>
            </DialogContent>
          </Dialog>
    </div>
  );
};

export default MedicineListPatient;

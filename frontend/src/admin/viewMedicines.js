import React, { useState, useEffect } from 'react';
import jwt from 'jsonwebtoken-promisified';
import AdminNavbar from '../components/adminNavbar'; // Import the AdminNavbar component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faFilter } from '@fortawesome/free-solid-svg-icons';

const MedicineListAdmin = () => {
  const [medicines, setMedicines] = useState([]);
  const [searchName, setSearchName] = useState('');
  const [filterMedicinalUse, setFilterMedicinalUse] = useState('');
  const token = localStorage.getItem('token');
  const decodedToken = jwt.decode(token);

  useEffect(() => {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    fetch(`http://localhost:8000/admin/viewMedicines`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        setMedicines(data);
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
    const filtered = medicines.filter(
      (medicine) => medicine.medicinialUse === filterMedicinalUse
    );
    setMedicines(filtered);
  };

  if (!token) {
    return <div>ACCESS DENIED, You are not authenticated, please log in</div>;
  }

  if (decodedToken.role !== 'admin') {
    return <div>ACCESS DENIED, You are not authorized</div>;
  }

  return (
    <div style={{ backgroundColor: '#e0e0e0', textAlign: 'center', minHeight: '100vh' }}>
      <AdminNavbar /> {/* Use the AdminNavbar component */}
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
        {medicines.map((medicine, index) => (
          <div key={medicine._id} style={{ backgroundColor: '#fff', borderRadius: '8px', margin: '10px', padding: '15px', textAlign: 'left', flexBasis: '20%', marginLeft: '40px' }}>
            <img
              src={`http://localhost:8000/uploads/${medicine.picture.substring(8)}`}
              style={{ width: '100%', height: '150px', objectFit: 'contain', marginBottom: '10px' }}
              alt={medicine.name}
            />
            <h3 style={{ fontFamily: 'Arial, sans-serif', fontSize: '18px', fontWeight: 'bold', color: '#000' }}>{medicine.name}</h3>
            <p style={{ fontSize: '14px' }}>Description: {medicine.description}</p>
            <p style={{ fontSize: '14px' }}>Medicinal Use: {medicine.medicinalUse}</p>
            <p style={{ fontSize: '14px' }}>Price: {medicine.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MedicineListAdmin;

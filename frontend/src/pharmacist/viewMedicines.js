import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import jwt from 'jsonwebtoken-promisified';
import PharmacistNavbar from '../components/pharmacistNavbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faFilter, faTimes } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PopupMessage = ({ message, onClose }) => (
  <div style={{
    position: 'fixed',
    top: '0',
    right: '0',
    background: 'white',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  }}>
    <p>{message}</p>
    <button onClick={onClose} style={{
      backgroundColor: '#001f3f',
      color: '#fff',
      padding: '5px',
      margin:'5px',
      fontSize: '16px',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
    }}>
      <FontAwesomeIcon icon={faTimes} />
    </button>
  </div>
);

const MedicineList = () => {
  const [medicines, setMedicines] = useState([]);
  const [searchName, setSearchName] = useState('');
  const [filterMedicinalUse, setFilterMedicinalUse] = useState('');
  const [filteredMedicines, setFilteredMedicines] = useState([]);
  const [popupMessage, setPopupMessage] = useState(null);
  const navigate = useNavigate();
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

    fetch(`http://localhost:8000/pharmacist/viewMedicines`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        setMedicines(data);
        setFilteredMedicines(data);
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
    const filtered = medicines.filter(
      (medicine) => medicine.medicinalUse === filterMedicinalUse
    );
    setFilteredMedicines(filtered);
  };
  

  const handleToggleArchive = async (medicineId, currentStatus) => {
    let method, actionVerb;
    try {
      method = currentStatus === 'archived' ? 'unarchiveMedicine' : 'archiveMedicine';
      actionVerb = currentStatus === 'archived' ? 'Unarchived' : 'Archived';

      const response = await fetch(`http://localhost:8000/pharmacist/${method}?medicineId=${medicineId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const updatedMedicines = medicines.map((medicine) =>
          medicine._id === medicineId ? { ...medicine, status: currentStatus === 'archived' ? 'unarchived' : 'archived' } : medicine
        );

        setMedicines(updatedMedicines);
        setFilteredMedicines(updatedMedicines);

        // Show the pop-up message
        setPopupMessage(`${actionVerb} successfully`);

        // Automatically close the pop-up after 3000 milliseconds (3 seconds)
        setTimeout(() => {
          setPopupMessage(null);
        }, 3000);
      } else {
        setPopupMessage(`Failed to ${actionVerb.toLowerCase()}`);
        console.error(`Failed to ${method} medicine`);
      }
    } catch (error) {
      setPopupMessage(`Error ${actionVerb.toLowerCase()}`);
      console.error(`Error ${method} medicine:`, error);
    }
  };

  if (!token) {
    return <div>ACCESS DENIED, You are not authenticated, please log in</div>;
  }

  if (decodedToken.role !== 'pharmacist') {
    return <div>ACCESS DENIED, You are not authorized</div>;
  }

  return (
    <div style={{ backgroundColor: '#e0e0e0', textAlign: 'center', minHeight: '100vh' }}>
      <PharmacistNavbar />
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
            <Link to={`/pharmacist/view-Medicine/${medicine._id}`} style={{ textDecoration: 'none' }}>
              <img
                src={`http://localhost:8000/uploads/${medicine.picture.substring(8)}`}
                style={{ width: '100%', height: '150px', objectFit: 'contain', marginBottom: '10px' }}
                alt={medicine.name}
              />
              <h3 style={{ fontFamily: 'Arial, sans-serif', fontSize: '18px', fontWeight: 'bold', color: '#000', cursor: 'pointer' }}>{medicine.name}</h3>
            </Link>
            <p style={{ fontSize: '14px' }}>Description: {medicine.description}</p>
            <p style={{ fontSize: '14px' }}>Medicinal Use: {medicine.medicinalUse}</p>
            <p style={{ fontSize: '14px' }}>Price: {medicine.price}</p>
            <p style={{ fontSize: '14px' }}>Status: {medicine.status}</p>
            <button onClick={() => handleToggleArchive(medicine._id, medicine.status)} style={{ backgroundColor: '#001f3f', color: '#fff', cursor: 'pointer', fontFamily: 'Arial, sans-serif' }}>
              {medicine.status === 'archived' ? 'unarchive' : 'archive'}
            </button>
          </div>
        ))}
      </div>
      {popupMessage && <PopupMessage message={popupMessage} onClose={() => setPopupMessage(null)} />}
    </div>
  );
};

export default MedicineList;

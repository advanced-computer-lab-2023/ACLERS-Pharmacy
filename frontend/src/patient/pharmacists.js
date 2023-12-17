import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import jwt from 'jsonwebtoken-promisified';
import PatientNavbar from "../components/patientNavbar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faFilter, faCartPlus, faEye, faComments } from '@fortawesome/free-solid-svg-icons';
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { Container, Typography, IconButton } from "@mui/material";

const PharmacistListPatient = () => {
  const [pharmacists, setPharmacists] = useState([]);
  const [searchName, setSearchName] = useState('');
  const [filterSpecialization, setFilterSpecialization] = useState('');
  const [filteredPharmacists, setFilteredPharmacists] = useState([]);
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

    fetch(`http://localhost:8000/patient/pharmacists`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        setPharmacists(data);
        setFilteredPharmacists(data);
      })
      .catch((error) => console.error(error));
  }, [token]);

  const handleSearch = () => {
    const filtered = pharmacists.filter((pharmacist) =>
      pharmacist.name.toLowerCase().includes(searchName.toLowerCase())
    );
    setFilteredPharmacists(filtered);
  };

  const handleFilter = () => {
    const filtered =
      filterSpecialization !== ''
        ? pharmacists.filter((pharmacist) => pharmacist.specialization === filterSpecialization)
        : pharmacists;
    setFilteredPharmacists(filtered);
  };

  const handleChat = async (pharmacistId) => {
    try {
      const response = await fetch(`http://localhost:8000/patient/create-chat?receiverId=${pharmacistId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      // Assuming the response contains the conversation ID
      const conversationId = data;

      // Navigate to the chat page with the conversation ID
      navigate(`/patient/chat/${conversationId}/${pharmacistId}`);
    } catch (error) {
      console.error('Error creating conversation:', error);
      // Handle error as needed
    }
  };

  return (
    <div style={{ backgroundColor: '#e0e0e0', textAlign: 'center', minHeight: '100vh' }}>
      <PatientNavbar />
      <div style={{ backgroundColor: '#e0e0e0', padding: '20px', marginBottom: '20px', marginLeft: '80px' }}>
        {/* Header */}
        <div style={{ backgroundColor: '#fff', borderRadius: '8px', marginBottom: '15px', padding: '10px 380px', marginLeft: 180, textAlign: 'left' }}>
          <h1 style={{ fontFamily: 'Arial, sans-serif', fontSize: '35px', fontWeight: 'bold', color: '#333' }}>Available Pharmacists</h1>
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
            placeholder="Filter by specialization"
            value={filterSpecialization}
            onChange={(e) => setFilterSpecialization(e.target.value)}
            style={{ fontSize: '16px', padding: '5px 150px' }}
          />
          <button onClick={handleFilter} style={{ backgroundColor: '#001f3f', color: '#fff', padding: '5px', fontSize: '16px' }}>
            <FontAwesomeIcon icon={faFilter} />
          </button>
        </div>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-start', marginLeft: '250px' }}>
        {filteredPharmacists.map((pharmacist, index) => (
          <div key={pharmacist._id} style={{ backgroundColor: '#fff', borderRadius: '8px', margin: '10px', padding: '15px', textAlign: 'left', flexBasis: '20%', marginLeft: '40px' }}>
            <h3 style={{ fontFamily: 'Arial, sans-serif', fontSize: '18px', fontWeight: 'bold', color: '#000', cursor: 'pointer' }}>{pharmacist.name}</h3>
            <p style={{ fontSize: '14px' }}>Specialization: {pharmacist.specialization}</p>
            <p style={{ fontSize: '14px' }}>Experience: {pharmacist.experience} years</p>
            <p style={{ fontSize: '14px' }}>Location: {pharmacist.location}</p>
            <IconButton onClick={() => handleChat(pharmacist.email)} style={{ backgroundColor: '#001f3f', color: '#fff', cursor: 'pointer', marginTop: '10px', padding: '5px', borderRadius: '4px' }}>
              <FontAwesomeIcon icon={faComments} style={{ marginRight: '5px' }} />
              Chat
            </IconButton>
          </div>
        ))}
      </div>
      <Dialog
        open={DialogOpen}
        onClose={() => setDialogOpen(false)}
        aria-describedby="accept-dialog-decription"
      >
        <DialogContent>
          <Typography variant="h6" color="primary">
            Added to Cart!
          </Typography>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PharmacistListPatient;

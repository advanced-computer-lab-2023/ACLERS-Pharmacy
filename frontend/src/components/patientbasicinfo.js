import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import jwt from 'jsonwebtoken-promisified';
import AdminNavbar from '../components/adminNavbar'; // Replace with the actual path to your adminNavbar
import { Container, Typography } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import DateRangeIcon from '@mui/icons-material/DateRange';
import PhoneIcon from '@mui/icons-material/Phone';
import GenderIcon from '@mui/icons-material/Wc';

const PatientDetailsPage = () => {
  const { id } = useParams();
  const [patientDetails, setPatientDetails] = useState(null);
  const token = localStorage.getItem('token');
  const decodedToken = jwt.decode(token);

  useEffect(() => {
    const fetchPatientDetails = async () => {
      const response = await fetch(`/admin/viewPatient?id=${id}`);
      const json = await response.json();
      if (response.ok) {
        setPatientDetails(json);
      }
    };
    fetchPatientDetails();
  }, [id]);

  if (!token) {
    // Handle the case where id is not available
    return <div>ACCESS DENIED, You are not authenticated, please log in</div>;
  }
  if (decodedToken.role !== 'admin') {
    return <div>ACCESS DENIED, You are not authorized</div>;
  }

  return (
    <div style={{ backgroundColor: '#e0e0e0', minHeight: '100vh' }}>
      <AdminNavbar />
      <Typography
        variant="h4"
        style={{
          marginLeft: '600px',
          marginBottom: '20px',
          fontWeight: 'bold',
          color: '#333',
          fontSize: '28px',
          marginTop: '20px', // Added margin to the top
          marginLeft: '790px',
        }}
      >
        Patient Details
      </Typography>
      <Container
        maxWidth="sm"
        style={{
          backgroundColor: '#fff',
          borderRadius: '8px',
          padding: '20px',
          margin: '20px 0',
          boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
          textAlign: 'center',
          marginLeft: '590px',
        }}
      >
        {patientDetails && (
          <div>
            <Typography variant="h5" style={{ marginBottom: '20px', color: '#001f3f', fontSize: '28px' }}>
              {patientDetails.name}
            </Typography>
            <img
              src={`https://source.unsplash.com/random?Patient=${Math.random()}`}
              alt={`Patient ${patientDetails.name}`}
              style={{ width: '120px', height: '120px', objectFit: 'cover', borderRadius: '8px', marginBottom: '20px' }}
            />
            <Typography variant="h6" style={{ marginBottom: '10px', color: '#333', fontSize: '24px' }}>
              {patientDetails.username}
            </Typography>
            <Typography variant="body1" style={{ fontSize: '18px' }}>
              <EmailIcon /> {patientDetails.email}
            </Typography>
            <Typography variant="body1" style={{ fontSize: '18px' }}>
              <DateRangeIcon /> {patientDetails.dateOfBirth ? new Date(patientDetails.dateOfBirth).toDateString() : ''}
            </Typography>
            <Typography variant="body1" style={{ fontSize: '18px' }}>
              <PhoneIcon /> Mobile Number: {patientDetails.mobileNumber}
            </Typography>
            <Typography variant="body1" style={{ fontSize: '18px' }}>
              <GenderIcon /> Gender: {patientDetails.gender}
            </Typography>
            <Typography variant="h6" style={{ marginTop: '20px', color: '#333', fontSize: '24px' }}>
              Emergency Contact
            </Typography>
            <Typography variant="body1" style={{ fontSize: '18px' }}>
              <PersonIcon />Name: {patientDetails.emergencyContact?.fullName}
            </Typography>
            <Typography variant="body1" style={{ fontSize: '18px' }}>
              <PhoneIcon /> Mobile Number: {patientDetails.emergencyContact?.mobileNumber}
            </Typography>
          </div>
        )}
      </Container>
    </div>
  );
};

export default PatientDetailsPage;

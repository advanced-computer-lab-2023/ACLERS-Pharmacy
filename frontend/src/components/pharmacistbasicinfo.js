import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import jwt from 'jsonwebtoken-promisified';
import AdminNavbar from '../components/adminNavbar'; // Replace with the actual path to your adminNavbar
import { Container, Typography } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import DateRangeIcon from '@mui/icons-material/DateRange';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import WorkIcon from '@mui/icons-material/Work';

const PharmacistDetailsPage = () => {
  const { id } = useParams();
  const [pharmacistDetails, setPharmacistDetails] = useState(null);
  const token = localStorage.getItem('token');
  const decodedToken = jwt.decode(token);

  useEffect(() => {
    const fetchPharmacistDetails = async () => {
      const response = await fetch(`/admin/viewPharmacistInfo?id=${id}`);
      const json = await response.json();
      if (response.ok) {
        setPharmacistDetails(json);
      }
    };
    fetchPharmacistDetails();
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
          marginLeft:'765px'
        }}
      >
        Pharmacist Details
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
        {pharmacistDetails && (
          <div>
            <Typography variant="h5" style={{ marginBottom: '20px', color: '#001f3f', fontSize: '28px' }}>
              {pharmacistDetails.name}
            </Typography>
            <img
              src={`https://source.unsplash.com/random?Doctor=${Math.random()}`}
              alt={`Pharmacist ${pharmacistDetails.name}`}
              style={{ width: '120px', height: '120px', objectFit: 'cover', borderRadius: '50%', marginBottom: '20px' }}
            />
            <Typography variant="h6" style={{ marginBottom: '10px', color: '#333', fontSize: '24px' }}>
              {pharmacistDetails.username}
            </Typography>
            <Typography variant="body1" style={{ fontSize: '18px' }}>
              <EmailIcon /> {pharmacistDetails.email}
            </Typography>
            <Typography variant="body1" style={{ fontSize: '18px' }}>
              <DateRangeIcon /> {pharmacistDetails.dateOfBirth ? new Date(pharmacistDetails.dateOfBirth).toDateString() : ''}
            </Typography>
            <Typography variant="body1" style={{ fontSize: '18px' }}>
              <AttachMoneyIcon /> Hourly Rate: {pharmacistDetails.hourlyRate}
            </Typography>
            <Typography variant="body1" style={{ fontSize: '18px' }}>
              <WorkIcon /> Affiliation: {pharmacistDetails.affiliation}
            </Typography>
            <Typography variant="body1" style={{ fontSize: '18px' }}>
              Educational Background: {pharmacistDetails.educationalBackground}
            </Typography>
          </div>
        )}
      </Container>
    </div>
  );
};

export default PharmacistDetailsPage;

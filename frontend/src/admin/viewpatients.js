import React, { useEffect, useState } from 'react';
import PatientDetails from '../components/patientdetails';
import { Link, useNavigate } from 'react-router-dom';
import jwt from 'jsonwebtoken-promisified';
import AdminNavbar from '../components/adminNavbar';
import { Container, Typography } from '@mui/material';

const getRandomImageURL = () => `https://source.unsplash.com/random?patient=${Math.random()}`;

const ViewPatients = () => {
  const [patients, setPatients] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const decodedToken = jwt.decode(token);

  useEffect(() => {
    const fetchPatients = async () => {
      const requestOptions = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await fetch('/admin/view-patients', requestOptions);
      const json = await response.json();

      if (response.ok) {
        setPatients(json);
      }
    };
    fetchPatients();
  }, [token]);

  if (!token) {
    return <div>ACCESS DENIED, You are not authenticated, please log in</div>;
  }
  if (decodedToken.role !== 'admin') {
    return <div>ACCESS DENIED, You are not authorized</div>;
  }

  return (
    <div style={{ backgroundColor: '#e0e0e0', marginLeft: '240px', textAlign: 'center', minHeight: '100vh' }}>
      <AdminNavbar />
      <Typography
        variant="h4"
        style={{
          marginLeft: '60px',
          marginBottom: '20px',
          fontWeight: 'bold',
          color: '#333',
          fontSize: '28px',
          marginTop: '20px',
        }}
      >
        Patients
      </Typography>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', marginLeft: '80px' }}>
        {patients &&
          patients.map((patient) => (
            <Link key={patient._id} to={`/admin/patient/${patient._id}`} style={{ textDecoration: 'none' }}>
              <div
                style={{
                  backgroundColor: '#fff',
                  borderRadius: '8px',
                  padding: '20px',
                  width: '250px',
                  margin: '10px',
                  textAlign: 'center',
                  boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <img
                  src={getRandomImageURL()}
                  alt={`Patient ${patient.name}`}
                  style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '50%', marginBottom: '10px' }}
                />
                <Typography
                  variant="h6"
                  style={{ fontFamily: 'Arial, sans-serif', fontSize: '20px', marginBottom: '10px', color: '#001f3f' }}
                >
                  {patient.name}
                </Typography>
                {/* Add more details as needed */}
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default ViewPatients;

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PharmacistDetails from '../components/pharmacistdetails';
import jwt from 'jsonwebtoken-promisified';
import AdminNavbar from '../components/adminNavbar'; // Replace with the actual path to your adminNavbar

const getRandomImageURL = () => `https://source.unsplash.com/random?Doctor=${Math.random()}`;

const ViewPharmacists = () => {
  const [pharmacists, setPharmacists] = useState(null);
  const token = localStorage.getItem('token');
  const decodedToken = jwt.decode(token);

  useEffect(() => {
    const fetchPharmacists = async () => {
      const requestOptions = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await fetch('/admin/view-pharmacists', requestOptions);
      const json = await response.json();

      if (response.ok) {
        setPharmacists(json);
      }
    };
    fetchPharmacists();
  }, [token]);

  if (!token) {
    // Handle the case where id is not available
    return <div>ACCESS DENIED, You are not authenticated, please log in</div>;
  }
  if (decodedToken.role !== 'admin') {
    return <div>ACCESS DENIED, You are not authorized</div>;
  }

  return (
    <div style={{ backgroundColor: '#e0e0e0', marginLeft: '240px', textAlign: 'center', minHeight: '100vh' }}>
      <AdminNavbar />
      <div className="doctorviewer" style={{ padding: '20px' }}>
        <h1 style={{ fontFamily: 'Arial, sans-serif', fontSize: '35px', fontWeight: 'bold', color: '#333' }}>
          Pharmacists
        </h1>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
          {pharmacists &&
            pharmacists.map((pharmacist) => (
              <Link key={pharmacist._id} to={`/admin/pharmacist/${pharmacist._id}`} style={{ textDecoration: 'none' }}>
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
                    cursor: 'pointer',
                  }}
                >
                  <img
                    src={getRandomImageURL()}
                    alt={`Pharmacist ${pharmacist.name}`}
                    style={{
                      width: '100px',
                      height: '100px',
                      objectFit: 'cover',
                      borderRadius: '50%',
                      marginBottom: '10px',
                    }}
                  />
                  <h2
                    style={{
                      fontFamily: 'Arial, sans-serif',
                      fontSize: '20px',
                      marginBottom: '10px',
                      color: '#001f3f',
                    }}
                  >
                    {pharmacist.name}
                  </h2>
                  {/* Add more details as needed */}
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ViewPharmacists;

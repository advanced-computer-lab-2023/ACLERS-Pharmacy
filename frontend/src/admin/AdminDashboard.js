import React from 'react';
import jwt from 'jsonwebtoken-promisified';
import AdminNavbar from '../components/adminNavbar'; // Replace with the actual path to your adminNavbar
import backgroundImage from './admin.jpg'; // Replace with the actual path to your image
import { useNavigate } from 'react-router-dom';

const containerStyle = {
  position: 'relative',
  minHeight: '100vh',
};

const backgroundStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundImage: `url(${backgroundImage})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
};

function AdminDashboard() {
  const token = localStorage.getItem('token');
  const decodedToken = jwt.decode(token);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:8000/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        // Successfully logged out
        localStorage.removeItem('token');
        navigate('/'); // Redirect to the login or home page
      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  if (!token) {
    // Handle the case where id is not available
    return <div style={containerStyle}>ACCESS DENIED, You are not authenticated, please log in</div>;
  }

  if (decodedToken.role !== 'admin') {
    return <div style={containerStyle}>ACCESS DENIED, You are not authorized</div>;
  }

  return (
    <div style={containerStyle}>
      <AdminNavbar />
      <div style={backgroundStyle}></div>
      {/* Add content for each section here */}
    </div>
  );
}

export default AdminDashboard;

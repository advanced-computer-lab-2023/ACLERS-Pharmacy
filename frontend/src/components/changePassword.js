import React, { useState } from 'react';
import jwt from 'jsonwebtoken-promisified';
import { useNavigate } from 'react-router-dom';
import PharmacistNavbar from '../components/pharmacistNavbar';
import PatientNavbar from '../components/patientNavbar';

function PasswordChangeForm() {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const token = localStorage.getItem('token');
  const decodedToken = jwt.decode(token);
  const navigate = useNavigate();

  const handleOldPasswordChange = (e) => {
    setOldPassword(e.target.value);
  };

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:8000/auth/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          oldPassword,
          newPassword,
        }),
      });

      if (response.ok) {
        // Password change successful
        const result = await response.json();
        alert('Password changed successfully');
        console.log('Password changed successfully:', result);
        // You might want to update your UI or perform additional actions here
      } else {
        // Handle errors here
        alert('Failed to change password');
        console.error('Failed to change password:', response.statusText);
        // You might want to display an error message to the user
      }
    } catch (error) {
      // Handle network errors or other exceptions
      console.error('Error:', error);
    }
  };

  if (!token) {
    // Handle the case where id is not available
    return <div>ACCESS DENIED, You are not authenticated, please log in</div>;
  }

  return (
    <div style={{ backgroundColor: '#e0e0e0', textAlign: 'center', minHeight: '100vh' }}>
      {decodedToken.role === 'pharmacist' ? <PharmacistNavbar /> : <PatientNavbar />}
      <div style={{ padding: '20px', marginLeft: '80px', display: 'inline-block', borderRadius: '8px', backgroundColor: '#fff' }}>
        <h1 style={{ fontFamily: 'Verdana, sans-serif', fontSize: '30px', fontWeight: 'bold', color: '#333', marginBottom: '20px' }}>Change Password</h1>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px', display: 'flex', flexDirection: 'column', textAlign: 'start' }}>
            <label style={{ fontFamily: 'Verdana, sans-serif', fontSize: '14px', fontWeight: 'normal', color: '#333', marginBottom: '5px' }}>Current Password</label>
            <input
              type="password"
              placeholder="Enter your old password"
              value={oldPassword}
              onChange={handleOldPasswordChange}
              style={{ fontSize: '14px', padding: '12px', borderRadius: '8px', border: '1px solid #ccc', outline: 'none', marginBottom: '10px' }}
            />
          </div>
          <div style={{ marginBottom: '20px', display: 'flex', flexDirection: 'column', textAlign: 'start' }}>
            <label style={{ fontFamily: 'Verdana, sans-serif', fontSize: '14px', fontWeight: 'normal', color: '#333', marginBottom: '5px' }}>New Password</label>
            <input
              type="password"
              placeholder="Enter your new password"
              value={newPassword}
              onChange={handleNewPasswordChange}
              style={{ fontSize: '14px', padding: '12px', borderRadius: '8px', border: '1px solid #ccc', outline: 'none', marginBottom: '10px' }}
            />
          </div>
          <button type="submit" style={{ backgroundColor: '#001f3f', color: '#fff', padding: '10px 40px', fontSize: '20px', cursor: 'pointer', borderRadius: '8px', border: 'none', outline: 'none', margin: '10px' }}>Submit</button>
        </form>
      </div>
    </div>
  );
}

export default PasswordChangeForm;

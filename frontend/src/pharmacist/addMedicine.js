import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import jwt from 'jsonwebtoken-promisified';
import PharmacistNavbar from '../components/pharmacistNavbar';

const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
  background: '#fff', // Grey background for the whole page
  overflow: 'hidden', // Prevent scrolling
  marginLeft: '230px', // Adjust the left margin
};

const formStyle = {
  width: '60%', // Adjust the width as needed
  padding: '80px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  borderRadius: '8px',
  background: '#e0e0e0', // Slightly darker grey color
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

const labelStyle = {
  fontSize: '16px',
  fontWeight: 'bold',
  marginBottom: '8px',
  textAlign: 'left',
};

const inputStyle = {
  width: '100%', // Textbox width adjusted
  padding: '10px',
  marginBottom: '20px',
  borderRadius: '5px',
  border: '1px solid #ccc',
  fontSize: '14px',
};

const buttonStyle = {
  backgroundColor: '#001f3f',
  color: '#fff', // White text color
  fontSize: '23px', // Adjusted font size
  fontWeight: 'bold', // Bolder font weight
  padding: '5px 210px', // Adjusted padding and width
  borderRadius: '5px',
  cursor: 'pointer',
  fontFamily: 'Roboto, sans-serif', // Add the desired font family
};

const CreateMedicine = () => {
  const token = localStorage.getItem('token');
  const decodedToken = jwt.decode(token);

  const [medicineData, setMedicineData] = useState({
    name: '',
    medicineImage: null,
    price: '',
    description: '',
    details: '',
    quantity: '',
    sales: '',
    medicinalUse: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    if (type === 'file') {
      setMedicineData({
        ...medicineData,
        medicineImage: e.target.files[0],
      });
    } else {
      setMedicineData({
        ...medicineData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      Object.entries(medicineData).forEach(([key, value]) => {
        formData.append(key === 'picture' ? 'medicineImage' : key, value);
      });

      const response = await fetch('http://localhost:8000/pharmacist/AddMedicine', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        // Display success message using a pop-up
        window.alert('Medicine created successfully!');
        // Clear the form
        setMedicineData({
          name: '',
          medicineImage: null,
          price: '',
          description: '',
          details: '',
          quantity: '',
          sales: '',
          medicinalUse: '',
        });
      } else {
        // Display error message using a pop-up
        window.alert('Failed to create medicine. Please try again.');
      }
    } catch (error) {
      console.error('Error creating medicine:', error);
    }
  };

  if (!token) {
    return <div>ACCESS DENIED, You are not authenticated, please log in</div>;
  }
  if (decodedToken.role !== 'pharmacist') {
    return <div>ACCESS DENIED, You are not authorized</div>;
  }

  return (
    <div style={containerStyle}>
      <PharmacistNavbar />
      <form style={formStyle} onSubmit={handleSubmit}>
        <h1>Create Medicine</h1>
        <div style={{ width: '100%' }}>
          <label style={labelStyle}>Name</label>
          <input
            style={inputStyle}
            type="text"
            name="name"
            value={medicineData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div style={{ width: '100%' }}>
          <label style={labelStyle}>Medicine Image</label>
          <input
            style={inputStyle}
            type="file"
            name="medicineImage"
            onChange={handleChange}
            required
          />
        </div>

        <div style={{ width: '100%' }}>
          <label style={labelStyle}>Price</label>
          <input
            style={inputStyle}
            type="number"
            name="price"
            value={medicineData.price}
            onChange={handleChange}
            required
          />
        </div>

        <div style={{ width: '100%' }}>
          <label style={labelStyle}>Description</label>
          <input
            style={inputStyle}
            type="text"
            name="description"
            value={medicineData.description}
            onChange={handleChange}
            required
          />
        </div>

        <div style={{ width: '100%' }}>
          <label style={labelStyle}>Details</label>
          <input
            style={inputStyle}
            type="text"
            name="details"
            value={medicineData.details}
            onChange={handleChange}
            required
          />
        </div>

        <div style={{ width: '100%' }}>
          <label style={labelStyle}>Quantity</label>
          <input
            style={inputStyle}
            type="number"
            name="quantity"
            value={medicineData.quantity}
            onChange={handleChange}
            required
          />
        </div>

        <div style={{ width: '100%' }}>
          <label style={labelStyle}>Sales</label>
          <input
            style={inputStyle}
            type="number"
            name="sales"
            value={medicineData.sales}
            onChange={handleChange}
            required
          />
        </div>

        <div style={{ width: '100%' }}>
          <label style={labelStyle}>Medicinal Use</label>
          <input
            style={inputStyle}
            type="text"
            name="medicinalUse"
            value={medicineData.medicinalUse}
            onChange={handleChange}
            required
          />
        </div>

        <button style={buttonStyle} type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateMedicine;

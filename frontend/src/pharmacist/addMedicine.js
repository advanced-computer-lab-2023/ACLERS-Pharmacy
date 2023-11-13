import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import jwt from 'jsonwebtoken-promisified';

const CreateMedicine = () => {
  const token = localStorage.getItem('token');
  const decodedToken = jwt.decode(token);
  console.log('decoded Token:', decodedToken);

  const [medicineData, setMedicineData] = useState({
    name: '',
    medicineImage: null, // Updated key to match backend ('picture' to 'medicineImage')
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

    // If the input is a file, handle it separately
    if (type === 'file') {
      // Update 'picture' to 'medicineImage' to match the backend key
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
      console.log(medicineData.medicinalUse);

      const formData = new FormData();
      Object.entries(medicineData).forEach(([key, value]) => {
        // Update 'picture' to 'medicineImage' to match the backend key
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
        alert('Medicine created successfully!');
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
        alert('Failed to create medicine. Please try again.');
      }
    } catch (error) {
      console.error('Error creating medicine:', error);
    }
  };

  if (!token) {
    // Handle the case where id is not available
    return <div>ACCESS DENIED, You are not authenticated, please log in</div>;
  }
  if (decodedToken.role !== 'pharmacist') {
    return <div>ACCESS DENIED, You are not authorized</div>;
  }

  return (
    <div>
      <button onClick={() => navigate(-1)}>Go Back</button>
      <h1>Create Medicine</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={medicineData.name}
              onChange={handleChange}
              required
            />
          </label>
        </div>

        <div>
          <label>
            Medicine Image:
            <input
              type="file"
              name="medicineImage"
              onChange={handleChange}
              required
            />
          </label>
        </div>

        <div>
          <label>
            Price:
            <input
              type="number"
              name="price"
              value={medicineData.price}
              onChange={handleChange}
              required
            />
          </label>
        </div>

        <div>
          <label>
            Description:
            <input
              type="text"
              name="description"
              value={medicineData.description}
              onChange={handleChange}
              required
            />
          </label>
        </div>

        <div>
          <label>
            Details:
            <input
              type="text"
              name="details"
              value={medicineData.details}
              onChange={handleChange}
              required
            />
          </label>
        </div>

        <div>
          <label>
            Quantity:
            <input
              type="number"
              name="quantity"
              value={medicineData.quantity}
              onChange={handleChange}
              required
            />
          </label>
        </div>

        <div>
          <label>
            Sales:
            <input
              type="number"
              name="sales"
              value={medicineData.sales}
              onChange={handleChange}
              required
            />
          </label>
        </div>

        <div>
          <label>
            Medicinal Use:
            <input
              type="text"
              name="medicinalUse"
              value={medicineData.medicinalUse}
              onChange={handleChange}
              required
            />
          </label>
        </div>

        <button type="submit">Create Medicine</button>
      </form>
    </div>
  );
};

export default CreateMedicine;

import React, { useState } from 'react';
import { Link ,useNavigate} from 'react-router-dom';
const CreateMedicine = () => {
  const [medicineData, setMedicineData] = useState({
    name: '',
    picture: '',
    price: '',
    description: '',
    details: '',
    quantity: '',
    sales: '',
    medicinalUse: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMedicineData({
      ...medicineData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        console.log(medicineData.medicinalUse)
      const response = await fetch('http://localhost:8000/pharmacist/AddMedicine', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(medicineData)
      });

      if (response.ok) {
        alert('Medicine created successfully!');
        setMedicineData({
          name: '',
          picture: '',
          price: '',
          description: '',
          details: '',
          quantity: '',
          sales: '',
          medicinalUse: ''
        });
      } else {
        alert('Failed to create medicine. Please try again.');
      }
    } catch (error) {
      console.error('Error creating medicine:', error);
    }
  };

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
            Picture:
            <input
              type="text"
              name="picture"
              value={medicineData.picture}
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

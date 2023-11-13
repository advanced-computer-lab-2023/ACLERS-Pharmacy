import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import jwt from 'jsonwebtoken-promisified';

const OrderPage = () => {
  const [order, setOrder] = useState(null);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [addressData, setAddressData] = useState({
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
  });
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const decodedToken = jwt.decode(token);
  const patientId = decodedToken.id;

  useEffect(() => {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    const checkoutOrder = async () => {
      try {
        // Make a request to the server to checkout the order
        const response = await fetch('http://localhost:8000/patient/checkout', requestOptions);

        if (response.ok) {
          const data = await response.json();
          setOrder(data.order);
        } else {
          console.error('Failed to checkout order');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    checkoutOrder();
  }, [token]);

  const handleAddAddressClick = () => {
    setShowAddressForm(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddressData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddressSubmit = async () => {
    try {
      // Perform the submission logic here, e.g., send the data to the backend
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          addressLine1: addressData.addressLine1,
          addressLine2: addressData.addressLine2,
          city: addressData.city,
          state: addressData.state,
          postalCode: addressData.postalCode,
          country: addressData.country,
        }),
      };

      const response = await fetch('http://localhost:8000/patient/add-delivery-address', requestOptions);

      if (response.ok) {
        const data = await response.json();
        console.log('Delivery address added successfully:', data);
      } else {
        console.error('Failed to add delivery address');
      }
    } catch (error) {
      console.error('Error:', error);
    }

    // Reset the form and hide the address fields
    setAddressData({
      addressLine1: '',
      addressLine2: '',
      city: '',
      state: '',
      postalCode: '',
      country: '',
    });
    setShowAddressForm(false);
  };

  return (
    <div>
      <h1>Your Order Details</h1>
      <button onClick={() => navigate(-1)}>Go Back</button>

      {order ? (
        <div>
          <p>Order ID: {order._id}</p>
          <p>Total Amount: {order.totalAmount}</p>
          <p>Status: {order.status}</p>
          {/* Add more details as needed */}

          <button onClick={handleAddAddressClick}>Add New Address</button>

          {showAddressForm && (
            <div>
              <label>
                Address Line 1:
                <input
                  type="text"
                  name="addressLine1"
                  value={addressData.addressLine1}
                  onChange={handleChange}
                />
              </label>
              <label>
                Address Line 2:
                <input
                  type="text"
                  name="addressLine2"
                  value={addressData.addressLine2}
                  onChange={handleChange}
                />
              </label>
              <label>
                City:
                <input type="text" name="city" value={addressData.city} onChange={handleChange} />
              </label>
              <label>
                State:
                <input type="text" name="state" value={addressData.state} onChange={handleChange} />
              </label>
              <label>
                Postal Code:
                <input
                  type="text"
                  name="postalCode"
                  value={addressData.postalCode}
                  onChange={handleChange}
                />
              </label>
              <label>
                Country:
                <input
                  type="text"
                  name="country"
                  value={addressData.country}
                  onChange={handleChange}
                />
              </label>

              <button onClick={handleAddressSubmit}>Submit Address</button>
            </div>
          )}
        </div>
      ) : (
        <p>Loading order details...</p>
      )}
    </div>
  );
};

export default OrderPage;

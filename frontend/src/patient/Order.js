import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import jwt from 'jsonwebtoken-promisified';

const OrderPage = () => {
  const {id} =useParams();
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
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const decodedToken = jwt.decode(token);
  const patientId = decodedToken.id;

  useEffect(() => {
    const checkoutOrder = async () => {
      const requestOptions = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        const response = await fetch(`http://localhost:8000/patient/view-order?orderId=${id}`, requestOptions);

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

    const fetchAddresses = async () => {
      try {
        const requestOptions = {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await fetch('http://localhost:8000/patient/getAddresses', requestOptions);

        if (response.ok) {
          const data = await response.json();
          setAddresses(data.addresses);
        } else {
          console.error('Failed to fetch addresses');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchAddresses();
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

      const response = await fetch(
        'http://localhost:8000/patient/add-delivery-address',
        requestOptions
      );

      if (response.ok) {
        const data = await response.json();
        console.log('Delivery address added successfully:', data);

        // Update the addresses state with the newly added address
        setAddresses((prevAddresses) => [...prevAddresses, data.address]);
        // Set the selected address to the newly added address
        setSelectedAddress(data.address._id);
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

  const handlePaymentMethodChange = (e) => {
    setSelectedPaymentMethod(e.target.value);
  };

  const handlePlaceOrder = async () => {
    try {
      // Check if an address is selected
      if (!selectedAddress) {
        console.error('Please select a delivery address');
        return;
      }
  
      // Check if a payment method is selected
      if (!selectedPaymentMethod) {
        console.error('Please select a payment method');
        return;
      }
  
      // Check if an order is available
      if (!order) {
        console.error('No order details available');
        return;
      }
  
      const orderId = order._id;
  
      // Make a request to place the order using fetch with orderId in the query parameters
      const requestOptions = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          paymentMethod: selectedPaymentMethod,
          deliveryAddress: selectedAddress,
        }),
      };
      console.log(requestOptions.body)
  
      const response = await fetch(`http://localhost:8000/patient/place-order?orderId=${orderId}`, requestOptions);
  
      if (response.ok) {
        const data = await response.json();
        console.log('Order placed successfully:', data);
    window.location.href = data.url
        // Handle any further actions after placing the order
      } else {
        console.error('Failed to place order:', response.statusText);
      }
    } catch (error) {
      console.error('Error placing order:', error);
    }
  };
  

  return (
    <div>
      <h1>Your Checkout Details</h1>
      <button onClick={() => navigate(-1)}>Go Back</button>

      {order ? (
        <div>
          <p>Order ID: {order._id}</p>
          <p>Total Amount: {order.totalAmount}</p>
          <p>Status: {order.status}</p>

          <label>
            Select Address:
            <select
              name="selectedAddress"
              value={selectedAddress}
              onChange={(e) => setSelectedAddress(e.target.value)}
            >
              <option value="" disabled>
                Select an address
              </option>
              {addresses.map((address) => (
                <option key={address && address._id} value={address && address._id}>
                  {address && address.addressLine1}, {address && address.city}, {address && address.country}
                </option>
              ))}
            </select>
          </label>

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

          {/* Payment method selection */}
          <div>
            <h2>Select Payment Method</h2>
            <label>
              <input
                type="radio"
                name="paymentMethod"
                value="wallet"
                checked={selectedPaymentMethod === 'wallet'}
                onChange={handlePaymentMethodChange}
              />
              Pay with Wallet
            </label>
            <label>
              <input
                type="radio"
                name="paymentMethod"
                value="credit Card"
                checked={selectedPaymentMethod === 'credit Card'}
                onChange={handlePaymentMethodChange}
              />
              Pay with Credit Card
            </label>
            <label>
              <input
                type="radio"
                name="paymentMethod"
                value="COD"
                checked={selectedPaymentMethod === 'COD'}
                onChange={handlePaymentMethodChange}
              />
              Cash on Delivery
            </label>
          </div>

          {/* Place Order button */}
          <button onClick={handlePlaceOrder}>Place Order</button>
        </div>
      ) : (
        <p>Loading order details...</p>
      )}
    </div>
  );
};

export default OrderPage;

import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import jwt from 'jsonwebtoken-promisified';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faPlus, faCreditCard, faMoneyBill, faCheck,faMoneyBillWave } from '@fortawesome/free-solid-svg-icons';
import PatientNavbar from '../components/patientNavbar';
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { Container, Typography, IconButton } from "@mui/material";

const OrderPage = () => {
  const { id } = useParams();
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
  const [DialogOpen, setDialogOpen] = useState(false);


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
        setDialogOpen(true);

        setTimeout(()=> {
          setDialogOpen(false);
        },5000);
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
    <div style={{ backgroundColor: '#e0e0e0', textAlign: 'center', minHeight: '100vh' }}>
      <PatientNavbar />
      <div style={{ backgroundColor: '#e0e0e0', padding: '20px', marginBottom: '20px', marginLeft: '80px' }}>
        {/* Header with Back Icon */}
        <div style={{ backgroundColor: '#fff', borderRadius: '8px', marginBottom: '15px', padding: '10px 380px', marginLeft: 180, textAlign: 'left' }}>
          <h1 style={{ fontFamily: 'Arial, sans-serif', fontSize: '35px', fontWeight: 'bold', color: '#333' }}>
            <FontAwesomeIcon icon={faArrowLeft} style={{ color: '#001f3f', marginRight: '10px' }} />
            Checkout
          </h1>
        </div>
      </div>
  
      {/* Checkout Form Container */}
      <div style={{ backgroundColor: '#fff', borderRadius: '8px', padding: '20px', width: '50%', margin: 'auto', textAlign: 'left' }}>
        {order ? (
          <div>
            <p style={{ fontFamily: 'Arial, sans-serif', fontSize: '24px', color: '#001f3f' }}>
              Total Amount: ${order.totalAmount}
            </p>
  
            <label style={{ marginBottom: '10px' }}>
              Select Address:
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <select
                  name="selectedAddress"
                  value={selectedAddress || ''}
                  onChange={(e) => setSelectedAddress(e.target.value)}
                  style={{ flex: 1, padding: '8px', fontSize: '16px' }}
                >
                  <option value="" disabled>
                    Select an address
                  </option>
                  {addresses.map((address) => (
                    <option key={address && address._id} value={address && address._id.toString()}>
                      {address && address.addressLine1}, {address && address.city}, {address && address.country}
                    </option>
                  ))}
                </select>
                <button onClick={handleAddAddressClick} style={{ backgroundColor: '#fff', color: '#111', cursor: 'pointer', fontFamily: 'Arial, sans-serif', padding: '5px', borderRadius: '4px', marginLeft: '10px' }}>
                  <FontAwesomeIcon icon={faPlus} style={{ marginRight: '5px' }} />
                  
                </button>
              </div>
            </label>
  
            {showAddressForm && (
              <div>
                {/* Address Form */}
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
  
                {/* Submit Address Button */}
                <button onClick={handleAddressSubmit} style={{ backgroundColor: '#001f3f', color: '#fff', cursor: 'pointer', fontFamily: 'Arial, sans-serif', padding: '1px 8px', borderRadius: '4px', marginLeft: '20px',marginTop: '10px' }}>
                  <FontAwesomeIcon icon={faCheck} style={{ marginRight: '5px' }} />
                  Submit 
                </button>
              </div>
            )}
  
            {/* Payment method selection */}
            <div style={{ marginTop: '20px' }}>
              <h2 style={{ fontFamily: 'Arial, sans-serif', fontSize: '18px', color: '#333' }}>Select Payment Method</h2>
              <label style={{ display: 'flex', alignItems: 'center' }}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="wallet"
                  onChange={handlePaymentMethodChange}
                  style={{ marginRight: '8px' }}
                />
                <FontAwesomeIcon icon={faMoneyBill} style={{ marginRight: '5px', fontSize: '20px' }} />
                Use Wallet
              </label>
              <label style={{ display: 'flex', alignItems: 'center' }}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="credit Card"
                  onChange={handlePaymentMethodChange}
                  style={{ marginRight: '8px' }}
                />
                <FontAwesomeIcon icon={faCreditCard} style={{ marginRight: '5px', fontSize: '20px' }} />
                Credit Card
              </label>
              <label style={{ display: 'flex', alignItems: 'center' }}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="COD"
                  onChange={handlePaymentMethodChange}
                  style={{ marginRight: '8px' }}
                />
                <FontAwesomeIcon icon={faMoneyBillWave} style={{ marginRight: '5px', fontSize: '20px' }} />
                Cash on Delivery
              </label>
            </div>
  
            {/* Place Order button */}
            <button onClick={handlePlaceOrder} style={{ backgroundColor: '#001f3f', color: '#fff', cursor: 'pointer', fontFamily: 'Arial, sans-serif', padding: '10px 40px', borderRadius: '4px', marginTop: '20px' }}>
              <FontAwesomeIcon icon={faCheck} style={{ marginRight: '10px' }} />
              Place Order
            </button>
          </div>
        ) : (
          <p>Loading order details...</p>
        )}
      </div>
      <Dialog
          open = {DialogOpen}
          onClose={() => setDialogOpen(false)}
          aria-describedby="accept-dialog-decription">
            <DialogContent>
              <Typography variant = "h6" color = "primary">
                success!
              </Typography>
            </DialogContent>
          </Dialog>
    </div>
  );
  
};  
export default OrderPage;

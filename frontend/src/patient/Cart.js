import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import jwt from 'jsonwebtoken-promisified';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faSync, faShoppingCart, faShoppingBasket } from '@fortawesome/free-solid-svg-icons';
import PatientNavbar from '../components/patientNavbar';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [newQuantities, setNewQuantities] = useState({});
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const decodedToken = jwt.decode(token);
  const patientId = decodedToken.id;

  const removeFromCart = async (itemId) => {
    try {
      const requestOptions = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await fetch(`http://localhost:8000/patient/remove-item?itemId=${itemId}`, requestOptions);

      if (response.ok) {
        setCartItems((prevItems) => prevItems.filter((item) => item._id !== itemId));
      } else {
        console.error('Failed to remove item from cart');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const updateQuantity = async (itemId, newQuantity) => {
    try {
      const requestOptions = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ quantity: newQuantity }),
      };

      const response = await fetch(`http://localhost:8000/patient/change-quantity?itemId=${itemId}`, requestOptions);

      if (response.ok) {
        setCartItems((prevItems) =>
          prevItems.map((item) =>
            item._id === itemId ? { ...item, quantity: newQuantity } : item
          )
        );
      } else {
        console.error('Failed to update item quantity');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleUpdateClick = (itemId) => {
    updateQuantity(itemId, newQuantities[itemId]);
  };

  const handleCheckout = async () => {
    try {
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await fetch(`http://localhost:8000/patient/checkout`, requestOptions);

      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData);
        navigate(`/patient/Order/${responseData.order._id}`);
      } else {
        console.error('Failed to update item quantity');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    const fetchCartItems = async () => {
      try {
        const response = await fetch('http://localhost:8000/patient/get-cart-items', requestOptions);

        if (response.ok) {
          const data = await response.json();
          setCartItems(data.items);

          const initialQuantities = {};
          data.items.forEach((item) => {
            initialQuantities[item._id] = item.quantity;
          });
          setNewQuantities(initialQuantities);
        } else {
          console.error('Failed to fetch cart items');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchCartItems();
  }, [token]);

  return (
    <div style={{ backgroundColor: '#e0e0e0', textAlign: 'center', minHeight: '100vh' }}>
      <PatientNavbar />
      <div style={{ backgroundColor: '#e0e0e0', padding: '20px', marginBottom: '20px', marginLeft: '80px' }}>
        {/* Header with Shopping Cart Icon */}
        <div style={{ backgroundColor: '#fff', borderRadius: '8px', marginBottom: '15px', padding: '10px 380px', marginLeft: 180, textAlign: 'center' }}>
          <h1 style={{ fontFamily: 'Arial, sans-serif', fontSize: '35px', fontWeight: 'bold', color: '#333', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <FontAwesomeIcon icon={faShoppingCart} style={{ color: '#001f3f', marginRight: '10px' }} />
            Cart
          </h1>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginLeft: '250px' }}>
        {cartItems.map((item) => (
          <div key={item._id} style={{ backgroundColor: '#fff', borderRadius: '8px', margin: '10px', padding: '15px', textAlign: 'left', width: '50%' }}>
            <h3 style={{ fontFamily: 'Arial, sans-serif', fontSize: '18px', fontWeight: 'bold', color: '#000' }}>{item.medicine && item.medicine.name}</h3>
            <p style={{ fontSize: '14px' }}>Quantity: {item.quantity}</p>
            <p style={{ fontSize: '14px' }}>Price: {item.medicine && item.medicine.price}</p>
            <button onClick={() => removeFromCart(item._id)} style={{ backgroundColor: '#fff', cursor: 'pointer', fontFamily: 'Arial, sans-serif', padding: '5px', border: 'none' }}>
              <FontAwesomeIcon icon={faTrash} style={{ color: '#001f3f', fontSize: '20px' }} />
            </button>
            <div style={{ marginTop: '10px' }}>
              <input
                type="number"
                value={newQuantities[item._id] || ''}
                onChange={(e) => setNewQuantities((prev) => ({ ...prev, [item._id]: +e.target.value }))}
                style={{ fontSize: '16px', padding: '5px' }}
              />
              <button onClick={() => handleUpdateClick(item._id)} style={{ backgroundColor: '#fff', cursor: 'pointer', fontFamily: 'Arial, sans-serif', padding: '5px', border: 'none' }}>
                <FontAwesomeIcon icon={faSync} style={{ color: '#001f3f', fontSize: '20px' }} />
              </button>
            </div>
          </div>
        ))}
      </div>
      <button onClick={handleCheckout} style={{ backgroundColor: '#001f3f', color: '#fff', cursor: 'pointer', fontFamily: 'Arial, sans-serif',marginLeft: '220px', marginTop: '20px', padding: '10px 40px', borderRadius: '4px' }}>
        <FontAwesomeIcon icon={faShoppingBasket} style={{ marginRight: '10px' }} />
        Checkout
      </button>
    </div>
  );
};

export default CartPage;

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import jwt from 'jsonwebtoken-promisified';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [newQuantities, setNewQuantities] = useState({}); // State to track new quantities
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
        // Remove the item from the local state
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
        // Update the quantity in the local state
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
    // Call updateQuantity with the new quantity from state
    updateQuantity(itemId, newQuantities[itemId]);
  };

  const handleCheckout = () => {
    // Navigate to the checkout page
    navigate('/patient/Order');
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

          // Initialize newQuantities state with current quantities
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
    <div>
      <h1>Your Shopping Cart</h1>
      <button onClick={() => navigate(-1)}>Go Back</button>

      <ul>
        {cartItems.map((item) => (
          <li key={item._id}>
            <h3>{item.medicine.name}</h3>
            <p>Quantity: {item.quantity}</p>
            <p>Price: {item.medicine.price}</p>
            <button onClick={() => removeFromCart(item._id)}>Remove from Cart</button>
            <div>
             
              {/* Input for new quantity */}
              <input
                type="number"
                value={newQuantities[item._id] || ''}
                onChange={(e) => setNewQuantities((prev) => ({ ...prev, [item._id]: +e.target.value }))}
              />
              {/* Update button */}
              <button onClick={() => handleUpdateClick(item._id)}>Update</button>
            </div>
          </li>
        ))}
      </ul>

      <button onClick={handleCheckout}>Checkout My Order</button>
    </div>
  );
};

export default CartPage;

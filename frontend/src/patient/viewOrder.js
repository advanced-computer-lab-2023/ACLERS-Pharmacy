import React, { useState, useEffect } from 'react';
import jwt from 'jsonwebtoken-promisified';
import { useNavigate } from 'react-router-dom';
const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem('token');
  const decodedToken = jwt.decode(token);
  const patientId = decodedToken.id;
 const navigate = useNavigate();
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:8000/patient/viewOrder', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setOrders(data.orders);
        } else {
          console.error('Error fetching orders:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const cancelOrder = async (orderId) => {
    try {
      const response = await fetch(`http://localhost:8000/patient/cancel-order?orderId=${orderId}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const updatedOrders = orders.map((order) =>
          order._id === orderId ? { ...order, status: 'Cancelled' } : order
        );
        setOrders(updatedOrders);
        console.log('Order canceled successfully');
      } else {
        console.error('Error canceling order:', response.statusText);
      }
    } catch (error) {
      console.error('Error canceling order:', error);
    }
  };

  return (

    
    <div>
 <button onClick={() => navigate(-1)}>Go Back</button>
      <h2>Your Orders</h2>
      {loading ? (
        <p>Loading orders...</p>
      ) : (
        <ul>
          {(orders || []).map((order) => (
            <li key={order._id}>
              <p>Order ID: {order._id}</p>
              <p>Total Amount: {order.totalAmount}</p>
              <p>Status: {order.status}</p>
              <button onClick={() => cancelOrder(order._id)} disabled={order.status === 'Cancelled'}>
                Cancel Order
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OrderList;

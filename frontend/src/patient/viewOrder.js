import React, { useState, useEffect } from 'react';
import jwt from 'jsonwebtoken-promisified';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faBan } from '@fortawesome/free-solid-svg-icons';
import PatientNavbar from '../components/patientNavbar';
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { Container, Typography, IconButton } from "@mui/material";

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem('token');
  const decodedToken = jwt.decode(token);
  const patientId = decodedToken.id;
  const navigate = useNavigate();
  const [DialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:8000/patient/viewOrders', {
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
        setDialogOpen(true);

        setTimeout(()=> {
          setDialogOpen(false);
        },5000);
      } else {
        console.error('Error canceling order:', response.statusText);
      }
    } catch (error) {
      console.error('Error canceling order:', error);
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
            Your Orders
          </h1>
        </div>
      </div>

      {/* Orders List Container */}
      <div style={{ backgroundColor: '#fff', borderRadius: '8px', padding: '20px', width: '50%', margin: 'auto', textAlign: 'left' }}>
        {loading ? (
          <p>Loading orders...</p>
        ) : (
          <ul>
            {(orders || []).map((order) => (
              <li key={order._id} style={{ marginBottom: '20px', backgroundColor: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                <p style={{ fontFamily: 'Arial, sans-serif', fontSize: '18px', color: '#333', marginBottom: '5px' }}>Order ID: {order._id}</p>
                <p style={{ fontFamily: 'Arial, sans-serif', fontSize: '16px' }}>Total Amount: {order.totalAmount}</p>
                <p style={{ fontFamily: 'Arial, sans-serif', fontSize: '16px' }}>Status: {order.status}</p>
                <button
                  onClick={() => cancelOrder(order._id)}
                  disabled={order.status === 'Cancelled'}
                  style={{
                    backgroundColor: '#001f3f',
                    cursor: 'pointer',
                    fontFamily: 'Arial, sans-serif',
                    padding: '10px',
                    border: '1px solid #001f3f',
                    borderRadius: '4px',
                    color: '#fff',
                  }}
                >
                  <FontAwesomeIcon icon={faBan} style={{ marginRight: '5px' }} />
                  Cancel Order
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      <Dialog
          open = {DialogOpen}
          onClose={() => setDialogOpen(false)}
          aria-describedby="accept-dialog-decription">
            <DialogContent>
              <Typography variant = "h6" color = "primary">
                Order Cancelled
              </Typography>
            </DialogContent>
          </Dialog>
    </div>
  );
};

export default OrderList;

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import jwt from 'jsonwebtoken-promisified';
import PharmacistNavbar from '../components/pharmacistNavbar';
import { faSave, faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { Container, Typography, IconButton } from "@mui/material";

function ViewMedicine() {
  const { medicineId } = useParams();
  const [medicine, setMedicine] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editedDescription, setEditedDescription] = useState('');
  const [editedPrice, setEditedPrice] = useState('');
  const token = localStorage.getItem('token');
  const decodedToken = jwt.decode(token);
  const navigate = useNavigate();
  const [DialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    fetch(`http://localhost:8000/pharmacist/viewMedicine?medicineId=${medicineId}`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        setMedicine(data);
        setEditedDescription(data.description);
        setEditedPrice(data.price);
      })
      .catch((error) => console.error(error));
  }, [medicineId, token]);

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleSaveClick = async () => {
    try {
      const response = await fetch(`http://localhost:8000/pharmacist/editMedicine?MedicineId=${medicineId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ description: editedDescription, price: editedPrice }),
      });

      if (response.ok) {
        setEditMode(false);
        setMedicine((prevMedicine) => ({
          ...prevMedicine,
          description: editedDescription,
          price: editedPrice,
        }));
        setDialogOpen(true);

        setTimeout(()=> {
          setDialogOpen(false);
        },5000);
        toast.success('Medicine saved successfully', { onClose: () => navigate(`/pharmacist/view-Medicine/${medicineId}`) });
      } else {
        toast.error('Failed to save medicine');
      }
    } catch (error) {
      console.error(error);
      toast.error('An error occurred while saving medicine');
    }
  };

  if (!medicine) {
    return <div>Loading...</div>;
  }
  if (!token) {
    return <div>ACCESS DENIED, You are not authenticated, please log in</div>;
  }
  if (decodedToken.role !== 'pharmacist') {
    return <div>ACCESS DENIED, You are not authorized</div>;
  }

  return (
    <div style={{ backgroundColor: '#e0e0e0', textAlign: 'center', minHeight: '100vh' }}>
      <PharmacistNavbar />
      <div style={{ marginLeft: '250px' }}>
        <h1 style={{ fontSize: '36px', fontWeight: 'bold', margin: '8px', fontFamily: 'Arial, sans-serif' }}>Medicine Details</h1>
        <div style={{ backgroundColor: '#fff', borderRadius: '8px', padding: '20px', width: '600px', marginLeft: 'auto', marginRight: 'auto', margin: '20px', display: 'inline-block', fontFamily: 'Arial, sans-serif' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#333' }}>{medicine.name}</h2>
          <img
            src={`http://localhost:8000/uploads/${medicine.picture.substring(8)}`}
            style={{ maxWidth: '50%', maxHeight: '50%', objectFit: 'contain', margin: '10px auto' }}
            alt={medicine.name}
          />

          {editMode ? (
            <div>
              <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <label style={{ marginRight: '10px' }}>
                  Description:
                  <input
                    type="text"
                    value={editedDescription}
                    onChange={(e) => setEditedDescription(e.target.value)}
                  />
                </label>
                <label>
                  Price:
                  <input
                    type="number"
                    value={editedPrice}
                    onChange={(e) => setEditedPrice(e.target.value)}
                  />
                </label>
              </div>
              <br />
              <button
                style={{
                  fontSize: '14px',
                  backgroundColor: '#001f3f',
                  color: '#fff',
                  padding: '7px 30px',
                  cursor: 'pointer',
                  marginTop: '10px',
                  borderRadius: '5px',
                }}
                onClick={handleSaveClick}
              >
                <FontAwesomeIcon icon={faSave} style={{ marginRight: '5px' }} />
                Save
              </button>
            </div>
          ) : (
            <div>
              <p style={{ fontSize: '18px' }}>Description: {medicine.description}</p>
              <p style={{ fontSize: '18px' }}>Price: {medicine.price}</p>
              <p style={{ fontSize: '18px' }}>Medicinal Use: {medicine.medicinalUse}</p>
              <p style={{ fontSize: '18px' }}>Quantity: {medicine.quantity}</p>
              <p style={{ fontSize: '18px' }}>Sales: {medicine.sales}</p>
              <p style={{ fontSize: '18px' }}>Status: {medicine.status}</p>
              <button style={{ fontSize: '15px', backgroundColor: '#001f3f', color: '#fff', borderRadius: '5px', padding: '2px 10px', cursor: 'pointer' }} onClick={handleEditClick}>
                <FontAwesomeIcon icon={faEdit} style={{ marginRight: '5px' }} />
                Edit
              </button>
            </div>
          )}
        </div>
        <Dialog
          open = {DialogOpen}
          onClose={() => setDialogOpen(false)}
          aria-describedby="accept-dialog-decription">
            <DialogContent>
              <Typography variant = "h6" color = "primary">
                Medicine Saved!
              </Typography>
            </DialogContent>
          </Dialog>
      </div>
    </div>
  );
}

export default ViewMedicine;

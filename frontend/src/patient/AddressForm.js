// AddressForm.js
import React, { useState } from 'react';
import './AddressForm.css'; // Import your CSS file

// ... (rest of the code)


const AddressForm = ({ onSaveAddress }) => {
  const [address, setAddress] = useState({
    street: '',
    city: '',
    state: '',
    zipCode: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress((prevAddress) => ({ ...prevAddress, [name]: value }));
  };

  const handleSaveAddress = () => {
    onSaveAddress(address);
    setAddress({
      street: '',
      city: '',
      state: '',
      zipCode: '',
    });
  };


  
  
  return (
    <div>
      <h2>Add Address</h2>
      <form>
        <label>
          Street:
          <input type="text" name="street" value={address.street} onChange={handleChange} />
        </label>
        <label>
          City:
          <input type="text" name="city" value={address.city} onChange={handleChange} />
        </label>
        <label>
          State:
          <input type="text" name="state" value={address.state} onChange={handleChange} />
        </label>
        <label>
          Zip Code:
          <input type="text" name="zipCode" value={address.zipCode} onChange={handleChange} />
        </label>
        <button type="button" onClick={handleSaveAddress}>
          Save Address
        </button>
      </form>
    </div>
  );
};

export default AddressForm;

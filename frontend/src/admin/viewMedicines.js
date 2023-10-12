import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const MedicineListAdmin = () => {
  const [medicines, setMedicines] = useState([]);
  const [searchName, setSearchName] = useState('');
  const [filterMedicinalUse, setFilterMedicinalUse] = useState('');
  const [filteredMedicines, setFilteredMedicines] = useState([]);

  useEffect(() => {
    // Fetch medicines from the backend (replace with your actual API endpoint)
    fetch(`http://localhost:8000/pharmacist/viewMedicines`)
      .then((response) => response.json())
      .then((data) => {
        setMedicines(data);
        setFilteredMedicines(data);
      })
      .catch((error) => console.error(error));
  }, []);

  const handleSearch = () => {
    const filtered = medicines.filter((medicine) =>
      medicine.name.toLowerCase().includes(searchName.toLowerCase())
    );
    setFilteredMedicines(filtered);
  };

  const handleFilter = () => {
    const filtered = medicines.filter(
      (medicine) => medicine.medicinialUse === filterMedicinalUse
    );
    setFilteredMedicines(filtered);
  };

  return (
    <div>
      <h1>Available Medicines</h1>
      <div>
        <input
          type="text"
          placeholder="Search by name"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div>
        <input
          type="text"
          placeholder="Filter by medicinal use"
          value={filterMedicinalUse}
          onChange={(e) => setFilterMedicinalUse(e.target.value)}
        />
        <button onClick={handleFilter}>Filter</button>
      </div>
      <ul>
        {filteredMedicines.map((medicine) => (
          <li key={medicine._id}>
            <img src={medicine.picture} alt={medicine.name} />
            <h3>{medicine.name}</h3>
            <p>Description: {medicine.description}</p>
            <p>Medicinal Use: {medicine.medicinialUse}</p>
            <p>Price: {medicine.price}</p>
            {/* <Link to={`/pharmacist/view-Medicine/${medicine._id}`}>View Details</Link> */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MedicineListAdmin;

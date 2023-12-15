import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import jwt from "jsonwebtoken-promisified";
import PharmacistNavbar from '../components/pharmacistNavbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faFilter } from '@fortawesome/free-solid-svg-icons';

const Sales = () => {
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [date, setDate] = useState("");
  const [medicineName, setMedicineName] = useState("");
  const [sales, setSales] = useState([]);
  const [medicineNames, setMedicineNames] = useState([]);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const decodedToken = jwt.decode(token);

  useEffect(() => {
    // Fetch medicine names for dropdown
    const fetchMedicineNames = async () => {
      try {
        const response = await fetch("http://localhost:8000/pharmacist/viewMedicines", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const medicines = await response.json();
          const names = medicines.map((medicine) => medicine.name);
          setMedicineNames(names);
        } else {
          console.error("Failed to fetch medicine names");
        }
      } catch (error) {
        console.error("Error during medicine names retrieval:", error);
      }
    };

    fetchMedicineNames();
  }, [token]);

  const handleSearchByMonth = async () => {
    // Implement the logic for searching by month
    try {
      const response = await fetch("http://localhost:8000/pharmacist/monthSales", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          year,
          month,
        }),
      });

      if (response.ok) {
        const salesData = await response.json();
        setSales(salesData);
      } else {
        console.error("Failed to retrieve sales");
      }
    } catch (error) {
      console.error("Error during sales retrieval:", error);
    }
  };

  const handleFilter = async () => {
    // Implement the logic for filtering by date or medicine name
    try {
      const response = await fetch("http://localhost:8000/pharmacist/filterSales", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          date,
          medicineName,
        }),
      });

      if (response.ok) {
        const salesData = await response.json();
        setSales(salesData);
      } else {
        console.error("Failed to retrieve sales");
      }
    } catch (error) {
      console.error("Error during sales retrieval:", error);
    }
  };

  if (!token) {
    // Handle the case where id is not available
    return <div>ACCESS DENIED, You are not authenticated, please log in</div>;
  }

  if (decodedToken.role !== "pharmacist") {
    return <div>ACCESS DENIED, You are not authorized</div>;
  }

  
  return (
    <div style={{ backgroundColor: '#e0e0e0', textAlign: 'center', minHeight: '100vh' }}>
      <PharmacistNavbar />
      <div style={{ padding: '20px', marginLeft: '80px' }}>
        <h1>Sales</h1>
        <div style={{ background: '#fff', padding: '20px', borderRadius: '8px', marginBottom: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ marginBottom: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <label>
              Year:
              <input
                type="text"
                value={year}
                onChange={(e) => setYear(e.target.value)}
              />
            </label>
            <label style={{ marginLeft: '10px' }}>
              Month:
              <input
                type="text"
                value={month}
                onChange={(e) => setMonth(e.target.value)}
              />
            </label>
            <FontAwesomeIcon
              icon={faSearch}
              style={{
                marginLeft: '10px',
                fontSize: '24px',
                color: '#001f3f',
                cursor: 'pointer',
              }}
              onClick={handleSearchByMonth}
            />
          </div>
        </div>
        <div style={{ background: '#fff', padding: '20px', borderRadius: '8px', marginBottom: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ marginBottom: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <label>
              Date:
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </label>
            <label style={{ marginLeft: '10px' }}>
              Medicine Name:
              <select
                value={medicineName}
                onChange={(e) => setMedicineName(e.target.value)}
              >
                <option value="">Select Medicine</option>
                {medicineNames.map((name) => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))}
              </select>
            </label>
            <FontAwesomeIcon
              icon={faFilter}
              style={{
                marginLeft: '10px',
                fontSize: '24px',
                color: '#001f3f',
                cursor: 'pointer',
              }}
              onClick={handleFilter}
            />
          </div>
        </div>
        <div>
          {/* <h2>Sales Results</h2> */}
          <ul>
            {sales.map((sale) => (
              <li key={sale._id} style={{ background: '#fff', padding: '20px', borderRadius: '8px', marginBottom: '10px' }}>
                <p>Medicine Name: {sale.medicineName}</p>
                <p>Quantity Sold: {sale.quantitySold}</p>
                <p>Sale Date: {sale.saleDate}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sales;
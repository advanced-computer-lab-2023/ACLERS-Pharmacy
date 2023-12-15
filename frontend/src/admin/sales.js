import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import jwt from "jsonwebtoken-promisified";

const Sales = () => {
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [sales, setSales] = useState([]);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const decodedToken = jwt.decode(token);

  const handleSearchByMonth = async () => {
    // Implement the logic for searching by month
    try {
      const response = await fetch("http://localhost:8000/admin/monthSales", {
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

//   if (!token) {
//     // Handle the case where id is not available
//     return <div>ACCESS DENIED, You are not authenticated, please log in</div>;
//   }

//   if (decodedToken.role !== "admin") {
//     return <div>ACCESS DENIED, You are not authorized</div>;
//   }

  return (
    <div>
      <h1>Sales Page</h1>
      <div>
        <label>
          Year:
          <input
            type="text"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          />
        </label>
        <label>
          Month:
          <input
            type="text"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
          />
        </label>
        <button onClick={handleSearchByMonth}>Search by Month</button>
      </div>
      <div>
        <h2>Sales Results</h2>
        <ul>
          {sales.map((sale) => (
            <li key={sale._id}>
              <p>Medicine Name: {sale.medicineName}</p>
              <p>Quantity Sold: {sale.quantitySold}</p>
              <p>Sale Date: {sale.saleDate}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sales;

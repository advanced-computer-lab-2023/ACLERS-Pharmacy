import React from "react";
import { Link } from "react-router-dom";

function PharmacistDashboard() {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/pharmacist/add-medicine">Add Medicine</Link>
          </li>
         
          <li>
            <Link to="/pharmacist/view-Medicines">View Medicines</Link>
          </li>
        </ul>
      </nav>
      {/* Add content for each section here */}
    </div>
  );
}

export default PharmacistDashboard;

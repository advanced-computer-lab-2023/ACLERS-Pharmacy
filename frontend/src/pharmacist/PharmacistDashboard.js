import React from "react";
import { Link } from "react-router-dom";

function PharmacistDashboard() {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/view-my-info">View My Info</Link>
          </li>
          <li>
            <Link to="/view-my-appointments">View My Appointments</Link>
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

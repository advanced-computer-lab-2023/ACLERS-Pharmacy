import React from "react";
import { Link } from "react-router-dom";

function PatientDashboard() {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <h1>Welcome to the Patient Dashboard</h1>
            <p>Here, you can access various features and information.</p>
          </li>
          <li>
            <Link to="/patient/view-Medicines">View Medicines</Link>
          </li>
          {/* Add more navigation links as needed */}
        </ul>
      </nav>
    </div>
  );
}

export default PatientDashboard;

import React from "react";
import { Link, useNavigate } from "react-router-dom";



function PatientDashboard() {
  const navigate = useNavigate();

  return (
    <div>
    <nav>
      <ul>
        <li>
          <h1>Welcome to the Patient Dashboard</h1>
          <p>Here, you can access various features and information.</p>
        </li>
        <li>
          <div>
            <Link to="/patient/view-Medicines">View Medicines</Link>
          </div>
          <div>
            <button onClick={() => navigate('/patient/view-cart')}>View Cart</button>
          </div>
          <div>
            <button onClick={() => navigate('/patient/viewOrder')}>View Order</button>
          </div>
        </li>
        {/* Add more navigation links as needed */}
      </ul>
    </nav>
  </div>
  
  );
}

export default PatientDashboard;

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import jwt from "jsonwebtoken-promisified";

function PatientDashboard() {
  const token = localStorage.getItem("token");
  const decodedToken = jwt.decode(token);
  console.log("decoded Token:", decodedToken);
  const navigate = useNavigate();

  if (!token) {
    // Handle the case where id is not available
    return <div>ACCESS DENIED, You are not authenticated, please log in</div>;
  }if(decodedToken.role !=="patient"){
    return <div>ACCESS DENIED, You are not authorized</div>;
  }
  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:8000/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        // Successfully logged out
        localStorage.removeItem("token");
        navigate("/"); // Redirect to the login or home page
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };
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
          
          <li>
         
            <Link to="/patient/view-cart">View Cart</Link>
            </li>
            <li>
            <Link to="/patient/WalletAmount2">view wallet</Link>
          </li>
            <li>
            <Link to ={`/patient/change-password`}>Change Password</Link>
          </li>
        
          <li>
            <button onClick={handleLogout}>Logout</button>
          </li>
          <div>
            <button onClick={() => navigate('/patient/view-cart')}>View Cart</button>
          </div>
          <div>
            <button onClick={() => navigate('/patient/viewOrder')}>View Order</button>
          </div>
        </ul>
      </nav>
    
        
         
       
  </div>
  );
}

export default PatientDashboard;

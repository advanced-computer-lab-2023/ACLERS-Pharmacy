import React, { Component } from 'react';
import { Link ,useNavigate} from 'react-router-dom';
import jwt from "jsonwebtoken-promisified";
function AdminDashboard() {
  const token = localStorage.getItem("token");
  const decodedToken = jwt.decode(token);
  console.log("decoded Token:", decodedToken);
  const navigate = useNavigate();
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

  if (!token) {
    // Handle the case where id is not available
    return <div>ACCESS DENIED, You are not authenticated, please log in</div>;
  }if(decodedToken.role !=="admin"){
    return <div>ACCESS DENIED, You are not authorized</div>;
  }
    return (
      <div>
        <nav>
          <ul>
            <li><Link to="/admin/viewpharmacists">View Pharmacist </Link></li>
            <li><Link to="/admin/viewpatients">View Patients</Link></li>
            <li><Link to="/admin/AdminAdd">Add Admin</Link></li>
            <li><Link to="/admin/view-applicants">View Applicants</Link></li>
            <li>
            <Link to="/admin/view-Medicines">View Medicines</Link>
          </li>
          <li>
            <Link to ={`/admin/change-password`}>Change Password</Link>
          </li>
          <li>
            <button onClick={handleLogout}>Logout</button>
          </li>
          </ul>
        </nav>
        {/* Add content for each section here */}
      </div>
    );
  
}

export default AdminDashboard;

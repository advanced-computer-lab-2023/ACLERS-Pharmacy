import React, { useState } from "react";
import { Link ,useNavigate} from 'react-router-dom';
import jwt from "jsonwebtoken-promisified";

function AdminAdd() {
  // Define state variables to store the username and password
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const decodedToken = jwt.decode(token);
  console.log("decoded Token:", decodedToken);
  
  // Function to handle the form submission when the "Add Admin" button is clicked
  const handleAddAdmin = (event) => {
    event.preventDefault();

    console.log("Username:", username);
    console.log("Password:", password);

    const admin = { username, password };

    fetch("/admin/add-admin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(admin),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        window.location.href = "/admin/Dashboard";
      })
      .catch((err) => {
        console.log(err);
      });

    setUsername("");
    setPassword("");
  };
  if (!token) {
    // Handle the case where id is not available
    return <div>ACCESS DENIED, You are not authenticated, please log in</div>;
  }if(decodedToken.role !=="admin"){
    return <div>ACCESS DENIED, You are not authorized</div>;
  }
  return (
    <div className="body">
      <button onClick={() => navigate(-1)}>Go Back</button>
      <h1>Add Admin</h1>
      <div>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button onClick={handleAddAdmin}>Add Admin</button>
    </div>
  );
}

export default AdminAdd;

import React from "react";
import { useNavigate } from "react-router-dom";
import jwt from "jsonwebtoken-promisified";
import PharmacistNavbar from "../components/pharmacistNavbar";
import backgroundImage from "../pharmacist/pharm2.jpg"; // Replace with the actual path to your image

const containerStyle = {
position: "relative",
height: "100vh",
};

const navbarStyle = {
position: "absolute",
zIndex: 1,
};

const backgroundStyle = {
position: "absolute",
top: 0,
left: 0,
width: "100%",
height: "100%",
backgroundImage: `url(${backgroundImage})`,
backgroundSize: "cover",
backgroundPosition: "center",
};

function PharmacistDashboard() {
const token = localStorage.getItem("token");
const decodedToken = jwt.decode(token);
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
}

if (decodedToken.role !== "pharmacist") {
   return <div>ACCESS DENIED, You are not authorized</div>;
}

return (
   <div style={containerStyle}>
     <PharmacistNavbar style={navbarStyle} />
     <div style={backgroundStyle}></div>
   </div>
);
}

export default PharmacistDashboard;
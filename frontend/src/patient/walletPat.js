import React, { useState, useEffect } from "react";
import jwt from "jsonwebtoken-promisified";
import PatientNavbar from "../components/patientNavbar";

const WalletAmount2 = () => {
  const [walletInfo, setWalletInfo] = useState(null);
  const token = localStorage.getItem("token");
  const decodedToken = jwt.decode(token);

  useEffect(() => {
    const fetchWalletAmount = async () => {
      try {
        const response = await fetch("http://localhost:8000/patient/viewWallet", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const walletData = await response.json();
          setWalletInfo(walletData);
        } else {
          console.error("Failed to retrieve wallet amount");
        }
      } catch (error) {
        console.error("Error during wallet amount retrieval:", error);
      }
    };

    fetchWalletAmount();
  }, [token]);

  if (!token) {
    // Handle the case where id is not available
    return <div>ACCESS DENIED, You are not authenticated, please log in</div>;
  }

  if (decodedToken.role !== "patient") {
    return <div>ACCESS DENIED, You are not authorized</div>;
  }

  if (!walletInfo) {
    return <div>Loading...</div>;
  }

  const formatBalance = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  return (
    <div style={{ textAlign: 'center', backgroundColor: '#e0e0e0', minHeight: '100vh' }}>
      <PatientNavbar />
      <div style={{ marginTop: '50px' }}>
        <h1 style={{ fontFamily: 'Arial, sans-serif', marginLeft: '150px', fontSize: '40px', fontWeight: 'bold', color: '#333' }}> Balance</h1>
        <p style={{ fontFamily: 'Arial, sans-serif', marginLeft: '150px', fontSize: '36px', fontWeight: 'bold', color: '#001f3f' }}>
          {formatBalance(walletInfo.balance)}
        </p>
      </div>
    </div>
  );
};

export default WalletAmount2;

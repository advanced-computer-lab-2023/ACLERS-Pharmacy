import React, { useState, useEffect } from "react";
import jwt from "jsonwebtoken-promisified";

const WalletAmount = () => {
  const [walletInfo, setWalletInfo] = useState(null);
  const token = localStorage.getItem("token");
  const decodedToken = jwt.decode(token);

  useEffect(() => {
    const fetchWalletAmount = async () => {
      try {
        const response = await fetch("http://localhost:8000/pharmacist/viewWallet", {
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

  if (decodedToken.role !== "pharmacist") {
    return <div>ACCESS DENIED, You are not authorized</div>;
  }

  if (!walletInfo) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Wallet Amount</h1>
      <p>User ID: {walletInfo.userId}</p>
      <p>Balance: {walletInfo.balance}</p>
    </div>
  );
};

export default WalletAmount;

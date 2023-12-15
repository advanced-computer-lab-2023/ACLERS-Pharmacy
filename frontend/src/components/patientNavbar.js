import React from "react";
import { Link, useNavigate } from "react-router-dom";
import jwt from "jsonwebtoken-promisified";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import { styled } from "@mui/system";
import ViewListIcon from "@mui/icons-material/ViewList";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import LockIcon from "@mui/icons-material/Lock";
import LogoutIcon from "@mui/icons-material/Logout";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ReceiptIcon from "@mui/icons-material/Receipt";

const ContentContainer = styled("div")(({ theme }) => ({
  marginLeft: theme.spacing(7),
  padding: theme.spacing(3),
}));

const logoImageUrl = "https://i.ibb.co/vP2dX46/el7a2nilogo.png";

const menuItems = [
    { id: "view-Medicines", label: "View Medicines", icon: <ViewListIcon /> },
    { id: "view-cart", label: "View Cart", icon: <ShoppingCartIcon /> },
    { id: "viewOrder", label: "View Order", icon: <ReceiptIcon /> },
    { id: "WalletAmount2", label: "View Wallet", icon: <AccountBalanceWalletIcon /> },
    { id: "change-password", label: "Change Password", icon: <LockIcon /> },
  ];

function PatientNavbar() {
  const token = localStorage.getItem("token");
  const decodedToken = jwt.decode(token);
  const navigate = useNavigate();

  if (!token) {
    return <div>ACCESS DENIED, You are not authenticated, please log in</div>;
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
        localStorage.removeItem("token");
        navigate("/");
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <div>
      <Drawer variant="permanent">
        <div style={{ width: "100%" }}>
          <Link to="/patient/dashboard">
            <img
              src={logoImageUrl}
              alt="Drawer Logo"
              style={{ width: "260px" }}
            />
          </Link>
        </div>
        <List>
          {menuItems.map((item) => (
            <ListItem
              button
              key={item.id}
              component={Link}
              to={`/patient/${item.id}`}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          <ListItem button onClick={handleLogout}>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      </Drawer>
      <ContentContainer>
        {/* Content section */}
      </ContentContainer>
    </div>
  );
}

export default PatientNavbar;

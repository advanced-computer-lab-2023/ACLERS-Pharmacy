import * as React from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
//import Link from "@mui/material/Link";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { Link, useNavigate } from "react-router-dom";
import jwt from "jsonwebtoken-promisified";
import PharmacistNavbar from "../components/pharmacistNavbar";
import backgroundImage from "../pharmacist/pharm2.jpg"; // Replace with the actual path to your image
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Portal from "@mui/material/Portal";
import zIndex from "@mui/material/styles/zIndex";


const containerStyle = {
position: "relative",
height: "100vh",
};

const navbarStyle = {
position: "absolute",
zIndex: 1000,
};

const drawerWidth = 240;

const backgroundStyle = {
position: "absolute",
top: 0,
left: 0,
width: "100%",
height: "100%",
backgroundImage: `url(${backgroundImage})`,
backgroundSize: "cover",
backgroundPosition: "center",
zIndex: 1
};

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: -100,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

function PharmacistDashboard() {
const token = localStorage.getItem("token");
const decodedToken = jwt.decode(token);
const navigate = useNavigate();
const [open, setOpen] = React.useState(false);
const [notifications, setNotifications] = React.useState([]);
const [unreadCount, setUnreadCount] = React.useState(0);

const [isNotificationCardOpen, setIsNotificationCardOpen] = React.useState(false);


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

React.useEffect(() => {
  const fetchNotifications = async () => {
    try {
      const response = await fetch("http://localhost:8000/pharmacist/get-notifications", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization:` Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data)
        setNotifications(data);
        setUnreadCount(data.length); // Set initial unread count
      } else {
        console.error("Failed to fetch notifications");
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  fetchNotifications();
}, [token]);
const handleNotificationIconClick = () => {
  setUnreadCount(0);
  setIsNotificationCardOpen((prev) => !prev); 
  setOpen((prev)=>!prev);// Toggle the card visibility
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
     <PharmacistNavbar style={navbarStyle } />
     <div style={backgroundStyle}><AppBar zIndex="-1000" open={open} >
            <Toolbar
              sx={{
                pr: "24px", // keep right padding when drawer closed
                marginLeft: "250px",
                //maxWidth: "50px"
              }}
            >
              <Typography
                component="h1"
                variant="h6"
                color="inherit"
                noWrap
                sx={{ flexGrow: 1 }}
              >
                Dashboard
              </Typography>
             
                <IconButton color="inherit" onClick={handleNotificationIconClick}>
                  <Badge badgeContent={unreadCount} color="secondary">
                    <NotificationsIcon />
                  </Badge>
                </IconButton>
              
            </Toolbar>
          </AppBar>
          {open && (
            <Portal>
              {isNotificationCardOpen && (
                <Card
                  id="notification-card"
                  style={{
                    position: "fixed",
                    top: 64, // Adjust the position based on your layout
                    right: 16,
                    zIndex: 1000,
                  }}
                >
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Notifications
                    </Typography>
                    {notifications.map((message, index) => (
                      <Typography key={index}>{message}</Typography>
                    ))}
                  </CardContent>
                </Card>
              )}
            </Portal>
          )}</div>
   </div>
);
}

export default PharmacistDashboard;
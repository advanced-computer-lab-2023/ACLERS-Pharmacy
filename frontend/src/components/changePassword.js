import React, { useState } from "react";
import jwt from "jsonwebtoken-promisified";
import { useParams, useNavigate } from "react-router-dom";
import PatientNavbar from "../components/patientNavbar";
import AdminNavbar from "../components/adminNavbar";
import PharmacistNavbar from "../components/pharmacistNavbar";
import { TextField, Button, Grid, Typography } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Slide from "@mui/material/Slide";

function PasswordChangeForm() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const token = localStorage.getItem("token");
  const decodedToken = jwt.decode(token);
  console.log("decoded Token:", decodedToken);
  const navigate = useNavigate();
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleOldPasswordChange = (e) => {
    setOldPassword(e.target.value);
  };

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/auth/change-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            oldPassword,
            newPassword,
          }),
        }
      );

      if (response.ok) {
        // Password change successful
        const result = await response.json();
        alert("Password changed successfully");
        console.log("Password changed successfully:", result);
        setDialogOpen(true);

        // Close the dialog after 3 seconds
        setTimeout(() => {
          setDialogOpen(false);
        }, 5000);
        // You might want to update your UI or perform additional actions here
      } else {
        // Handle errors here
        alert("Failed to change password");
        console.error("Failed to change password:", response.statusText);
        // You might want to display an error message to the user
      }
    } catch (error) {
      // Handle network errors or other exceptions
      console.error("Error:", error);
    }
  };

  if (!token) {
    // Handle the case where id is not available
    return <div>ACCESS DENIED, You are not authenticated, please log in</div>;
  }

  let navbarComponent;
  switch (decodedToken.role) {
    case "admin":
      navbarComponent = <AdminNavbar />;
      break;
    case "patient":
      navbarComponent = <PatientNavbar />;
      break;
    case "pharmacist":
      navbarComponent = <PharmacistNavbar />;
      break;
    default:
      navbarComponent = null;
  }

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#e0e0e0", // Grey background
      }}
    >
      {navbarComponent}
      <div
        style={{
          width: "50%",
          marginRight: "20px",
        }}
      >
        <img
          src={require("./changepass.png")}
          alt="Background"
          style={{ width: "100%", height: "auto", display: "block" }}
        />
      </div>
      <div
        style={{
          padding: "20px",
          width: "50%",
          borderRadius: "10px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            padding: "20px",
            width: "80%",
            borderRadius: "10px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="h5" style={{ marginBottom: "20px" }}>
            Change Password
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Old Password"
                  type="password"
                  fullWidth
                  variant="outlined"
                  size="small"
                  value={oldPassword}
                  onChange={handleOldPasswordChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="New Password"
                  type="password"
                  fullWidth
                  variant="outlined"
                  size="small"
                  value={newPassword}
                  onChange={handleNewPasswordChange}
                />
              </Grid>
              <Grid item xs={12} style={{ textAlign: "center" }}>
                <Button
                  type="submit"
                  variant="contained"
                  style={{
                    backgroundColor: "#001f3f", // Dark blue for all roles
                    color: "white",
                    fontWeight: "bold",
                    padding: "8px 16px",
                  }}
                >
                  Change Password
                </Button>
              </Grid>
            </Grid>
          </form>
        </div>
        <Dialog
          open={dialogOpen}
          TransitionComponent={Slide}
          keepMounted
          onClose={() => setDialogOpen(false)}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogContent>
            <Typography variant="h6" color="primary">
              Password changed successfully
            </Typography>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}


export default PasswordChangeForm;

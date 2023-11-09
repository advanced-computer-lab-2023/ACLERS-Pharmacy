import React, { useState } from "react";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";

const defaultTheme = createTheme();

export default function OTPPage() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmationMessage, setConfirmationMessage] = useState("");

  const handleEmailConfirm = () => {
    // Implement logic to handle the entered email
    console.log("Entered Email: ", email);
    // Display a confirmation message
    setConfirmationMessage("An OTP was sent to your email.");
  };

  const handleOTPConfirm = () => {
    // Implement logic to handle the entered OTP
    console.log("Entered OTP: ", otp);
    window.location.href = "/newpasswordpage/:id";
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Paper elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Password Reset
          </Typography>
          <Box component="div" sx={messageContainerStyle}>
            <Typography sx={messageTextStyle}>
              An OTP was sent to your email.
            </Typography>
          </Box>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              type="email"
              label="Please enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
            <Button
              type="button"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleEmailConfirm}
            >
              Confirm
            </Button>
            {confirmationMessage && (
              <Typography sx={messageStyle}>
                {confirmationMessage}
              </Typography>
            )}
          </Box>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              type="text"
              label="Please enter 6-digit OTP"
              maxLength="6"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
            />
            <Button
              type="button"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleOTPConfirm}
            >
              Confirm
            </Button>
          </Box>
        </Box>
      </Paper>
    </ThemeProvider>
  );
}

const messageContainerStyle = {
  background: "white",
  border: "1px solid #ccc",
  padding: "20px",
  marginBottom: "20px",
  borderRadius: "8px",
};

const messageTextStyle = {
  fontSize: "24px",
  textAlign: "center",
};

const messageStyle = {
  fontSize: "16px",
  textAlign: "center",
  color: "green", // You can customize the message style
};

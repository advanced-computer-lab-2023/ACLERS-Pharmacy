import React, { useState } from "react";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";

const defaultTheme = createTheme();

export default function NewPasswordPage() {
  const [newPassword, setNewPassword] = useState("");

  const handleConfirm = () => {
    // Implement the logic to handle the new password here
    // You can make API calls to update the user's password in your application.
    // For this example, we will just log the new password.
    console.log("New Password: ", newPassword);
    window.location.href = "/login";
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
            Please enter your new password
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              type="password"
              label="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter your new password"
            />
            <Button
              type="button"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleConfirm}
            >
              Confirm
            </Button>
          </Box>
        </Box>
      </Paper>
    </ThemeProvider>
  );
}

import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Link from "@mui/material/Link";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "./signup.css";

const theme = createTheme({
  palette: {
    background: {
      default: "#FFFFFF",
    },
  },
});

export default function PharmacistSignUp() {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [hourlyRate, setHourlyRate] = useState("");
  const [affiliation, setAffiliation] = useState("");
  const [educationalBackground, setEducationalBackground] = useState("");
  const [idDocument, setIdDocument] = useState(null);
  const [medicalLicense, setMedicalLicense] = useState(null);
  const [medicalDegree, setMedicalDegree] = useState(null);
  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("username", username);
    console.log(username+"username ")
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("dateOfBirth", dateOfBirth);
    formData.append("hourlyRate", hourlyRate);
    formData.append("affiliation", affiliation);
    formData.append("educationalBackground", educationalBackground);
    formData.append("idDocument", idDocument);
    formData.append("medicalLicense", medicalLicense);
    formData.append("medicalDegree", medicalDegree);

    try {
      const response = await fetch("/auth/register-Pharmacist", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.message) {
        alert(data.message);
      } else {
        console.log(data)
        // Redirect to a different page after successful registration
        window.location.href = "/login";
      }
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            marginTop: 75,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "50%", // Make the form width 90% of the container
            backgroundColor: "rgba(255, 255, 255, 0.8)", // Add a semi-transparent white background to the form
            padding: "20px",
            borderRadius: "8px", // Add rounded corners to the form
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Pharmacist Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            {/* Pharmacist Registration Fields */}
            <Grid container spacing={2}>
            <Grid item xs={12}>
  <TextField
    autoComplete="username"
    name="username"
    required
    fullWidth
    id="username"
    label="Username"
    autoFocus
    onChange={(e) => setUsername(e.target.value)}
  />
</Grid>
<Grid item xs={12} sm={6}>
  <TextField
    autoComplete="name"
    name="name"
    required
    fullWidth
    id="name"
    label="Name"
    onChange={(e) => setName(e.target.value)}
  />
</Grid>
<Grid item xs={12} sm={6}>
  <TextField
    autoComplete="email"
    name="email"
    required
    fullWidth
    id="email"
    label="Email Address"
    onChange={(e) => setEmail(e.target.value)}
  />
</Grid>
<Grid item xs={12}>
  <TextField
    required
    fullWidth
    name="password"
    label="Password"
    type="password"
    id="password"
    onChange={(e) => setPassword(e.target.value)}
  />
</Grid>
<Grid item xs={12}>
  <TextField
    required
    fullWidth
    name="dateOfBirth"
    label="Date of Birth"
    type="date"
    id="dateOfBirth"
    onChange={(e) => setDateOfBirth(e.target.value)}
  />
</Grid>
<Grid item xs={12}>
  <TextField
    required
    fullWidth
    name="hourlyRate"
    label="Hourly Rate"
    id="hourlyRate"
    type="number"
    onChange={(e) => setHourlyRate(e.target.value)}
  />
</Grid>
<Grid item xs={12}>
  <TextField
    required
    fullWidth
    name="affiliation"
    label="Affiliation"
    id="affiliation"
    onChange={(e) => setAffiliation(e.target.value)}
  />
</Grid>
<Grid item xs={12}>
  <TextField
    required
    fullWidth
    name="educationalBackground"
    label="Educational Background"
    id="educationalBackground"
    onChange={(e) => setEducationalBackground(e.target.value)}
  />
</Grid>
            </Grid>
            <Grid item xs={12}>
              <label htmlFor="idDocument">ID Document:</label>
              <input
                type="file"
                id="idDocument"
                onChange={(e) => setIdDocument(e.target.files[0])}
              />
            </Grid>
            <Grid item xs={12}>
              <label htmlFor="medicalLicense">Medical License:</label>
              <input
                type="file"
                id="medicalLicense"
                onChange={(e) => setMedicalLicense(e.target.files[0])}
              />
            </Grid>
            <Grid item xs={12}>
              <label htmlFor="medicalDegree">Medical Degree:</label>
              <input
                type="file"
                id="medicalDegree"
                onChange={(e) => setMedicalDegree(e.target.files[0])}
              />
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

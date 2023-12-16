import React from "react";
import { Typography, Avatar, Grid, Paper, Divider } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import DateRangeIcon from "@mui/icons-material/DateRange";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import WorkIcon from "@mui/icons-material/Work";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import SchoolIcon from "@mui/icons-material/School";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";

const ApplicantDetails = ({ applicant }) => {
  const {
    affiliation,
    dateOfBirth,
    educationalBackground,
    email,
    hourlyRate,
    idDocument,
    medicalDegree,
    medicalLicense,
    name,
    status,
    username,
  } = applicant;

  return (
    <Paper elevation={3} style={{ padding: "20px", borderRadius: "8px" }}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} md={6}>
          <Avatar
            src={`http://localhost:8000/uploads/${idDocument.substring(8)}`}
            alt={idDocument}
            style={{
              width: "100px",
              height: "100px",
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h5">{username}</Typography>
          <Typography variant="body1">{name}</Typography>
          <Typography variant="body1">
            <EmailIcon /> {email}
          </Typography>
          <Typography variant="body1">
            <DateRangeIcon /> {dateOfBirth}
          </Typography>
          <Typography variant="body1">
            <AttachMoneyIcon /> Hourly Rate: {hourlyRate}
          </Typography>
          <Typography variant="body1">
            <WorkIcon /> Affiliation: {affiliation}
          </Typography>
          <Typography variant="body1">
            <SchoolIcon /> Educational Background: {educationalBackground}
          </Typography>
          <Typography variant="body1">
            <AssignmentIndIcon /> Status: {status}
          </Typography>
          <Typography variant="body1">
            <VerifiedUserIcon /> Verified User
          </Typography>
        </Grid>
      </Grid>
      <Divider style={{ margin: "20px 0" }} />
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Typography variant="subtitle1">ID Document</Typography>
          <img
            src={`http://localhost:8000/uploads/${idDocument.substring(8)}`}
            style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }}
            alt={idDocument}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography variant="subtitle1">Medical Degree</Typography>
          <img
            src={`http://localhost:8000/uploads/${medicalDegree.substring(8)}`}
            style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }}
            alt={medicalDegree}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography variant="subtitle1">Medical License</Typography>
          <img
            src={`http://localhost:8000/uploads/${medicalLicense.substring(8)}`}
            style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }}
            alt={medicalLicense}
          />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ApplicantDetails;

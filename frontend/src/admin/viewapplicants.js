import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import jwt from "jsonwebtoken-promisified";
import AdminNavbar from "../components/adminNavbar"; // Replace with the actual path to your adminNavbar
import { Container, Typography, IconButton } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import ApplicantDetails from "../components/applicantdetails.js"; // Replace with the actual path to your ApplicantDetails component
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Slide from "@mui/material/Slide";

const ViewApplicants = () => {
  const [applicants, setApplicants] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const decodedToken = jwt.decode(token);
  const [acceptDialogOpen, setAcceptDialogOpen] = useState(false);
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false);


  useEffect(() => {
    const fetchApplicants = async () => {
      const requestOptions = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await fetch("/admin/view-applicants", requestOptions);
      const json = await response.json();

      if (response.ok) {
        setApplicants(json);
      }
    };
    fetchApplicants();
  }, [token]);

  const handleAccept = (applicantId) => {
    // Send a POST request to "/admin/approve-doctor?applicantId=<applicantId>"
    fetch(`/admin/approve-doctor?applicantId=${applicantId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response, if needed
        console.log("Doctor approved:", data);
        setAcceptDialogOpen(true);

      })
      .catch((error) => {
        console.error("Error approving doctor:", error);
      });
  };

  const handleReject = (applicantId) => {
    // Send a POST request to "/admin/reject-doctor?applicantId=<applicantId>"
    fetch(`/admin/reject-doctor?applicantId=${applicantId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response, if needed
        console.log("Doctor rejected:", data);

        setRejectDialogOpen(true);
      })
      .catch((error) => {
        console.error("Error rejecting doctor:", error);
      });
  };

  if (!token) {
    // Handle the case where id is not available
    return <div>ACCESS DENIED, You are not authenticated, please log in</div>;
  }
  if (decodedToken.role !== "admin") {
    return <div>ACCESS DENIED, You are not authorized</div>;
  }

  return (
    <div style={{ backgroundColor: "#e0e0e0", minHeight: "100vh" }}>
      <AdminNavbar />
      <Typography
        variant="h4"
        style={{
          marginLeft: "600px",
          marginBottom: "20px",
          fontWeight: "bold",
          color: "#333",
          fontSize: "28px",
          marginTop: "20px", // Added margin to the top
          marginLeft: "765px",
        }}
      >
        Applicants
      </Typography>
      {applicants &&
        applicants.map((applicant) => (
          <Container
            key={applicant._id}
            maxWidth="sm"
            style={{
              backgroundColor: "#fff",
              borderRadius: "8px",
              padding: "20px",
              margin: "20px 0",
              boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
              textAlign: "center",
              marginLeft: "590px",
            }}
          >
            <ApplicantDetails applicant={applicant} />
            <IconButton
              color="success"
              onClick={() => handleAccept(applicant._id)}
              style={{ margin: "10px" }}
            >
              <CheckCircleIcon />
            </IconButton>
            <IconButton
              color="error"
              onClick={() => handleReject(applicant._id)}
              style={{ margin: "10px" }}
            >
              <CancelIcon />
            </IconButton>
          </Container>
        ))}
        <Dialog
          open = {acceptDialogOpen}
          onClose={() => setAcceptDialogOpen(false)}
          aria-describedby="accept-dialog-decription">
            <DialogContent>
              <Typography variant = "h6" color = "primary">
                Applicant accepted!
              </Typography>
            </DialogContent>
          </Dialog>

          <Dialog
          open = {rejectDialogOpen}
          onClose={() => setRejectDialogOpen(false)}
          aria-describedby="reject-dialog-decription">
            <DialogContent>
              <Typography variant = "h6" color = "primary">
                Applicant rejected.
              </Typography>
            </DialogContent>
          </Dialog>
    </div>
  );
};

export default ViewApplicants;

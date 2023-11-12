// PharmacistDetailsPage.js
import React, { useEffect, useState } from "react";
<<<<<<< HEAD
import { useParams } from "react-router-dom";
=======
import { useParams ,useNavigate} from "react-router-dom";
>>>>>>> main

const PharmacistDetailsPage = () => {
  const { id } = useParams();
  const [pharmacistDetails, setPharmacistDetails] = useState(null);
<<<<<<< HEAD

=======
  const navigate = useNavigate();
>>>>>>> main
  useEffect(() => {
    const fetchPharmacistDetails = async () => {
      const response = await fetch(`/admin/viewPharmacistInfo?id=${id}`);
      const json = await response.json();
      if (response.ok) {
        setPharmacistDetails(json);
      }
    };
    fetchPharmacistDetails();
  }, [id]);

  return (
    <div>
<<<<<<< HEAD
=======
      <button onClick={() => navigate(-1)}>Go Back</button>
>>>>>>> main
      {pharmacistDetails && (
        <div>
          <h1>Pharmacist Details</h1>
          <p><strong>Username:</strong> {pharmacistDetails?.username}</p>
          <p><strong>Name:</strong> {pharmacistDetails?.name}</p>
          <p><strong>Email:</strong> {pharmacistDetails?.email}</p>
          <p><strong>Date of Birth:</strong> {pharmacistDetails ? new Date(pharmacistDetails.dateOfBirth).toDateString() : ""}</p>
          <p><strong>Hourly Rate:</strong> {pharmacistDetails?.hourlyRate}</p>
          <p><strong>Affiliation:</strong> {pharmacistDetails?.affiliation}</p>
          <p><strong>Educational Background:</strong> {pharmacistDetails?.educationalBackground}</p>
        </div>
      )}
    </div>
  );
};

export default PharmacistDetailsPage;

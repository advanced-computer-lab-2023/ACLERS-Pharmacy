import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const PatientDetailsPage = () => {
  const { id } = useParams();
  const [patientDetails, setPatientDetails] = useState(null);
  console.log(id)
  useEffect(() => {
    const fetchPatientDetails = async () => {
        console.log("in")
      const response = await fetch(`/admin/viewPatient?id=${id}`);
      const json = await response.json();
      console.log(json)
      if (response.ok) {
        setPatientDetails(json);
      }
    };
    fetchPatientDetails();
  }, [id]);

  return (
    <div>
      {patientDetails && (
        <div>
          <h1>Patient Details</h1>
          <p><strong>Username:</strong> {patientDetails?.username}</p>
          <p><strong>Name:</strong> {patientDetails?.name}</p>
          <p><strong>Email:</strong> {patientDetails?.email}</p>
          <p><strong>Date of Birth:</strong> {patientDetails ? new Date(patientDetails.dateOfBirth).toDateString() : ""}</p>
          <p><strong>Gender:</strong> {patientDetails?.gender}</p>
          <p><strong>Mobile Number:</strong> {patientDetails?.mobileNumber}</p>
          <h2>Emergency Contact:</h2>
          <p><strong>Full Name:</strong> {patientDetails?.emergencyContact?.fullName}</p>
          <p><strong>Mobile Number:</strong> {patientDetails?.emergencyContact?.mobileNumber}</p>
        </div>
      )}
    </div>
  );
};

export default PatientDetailsPage;

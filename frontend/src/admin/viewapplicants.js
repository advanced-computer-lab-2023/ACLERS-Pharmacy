import { useEffect, useState } from "react";
import ApplicantDetails from "../components/applicantdetails.js";
<<<<<<< HEAD

const ViewApplicants = () => {
  const [applicants, setApplicants] = useState(null);

=======
import { Link ,useNavigate} from 'react-router-dom';
const ViewApplicants = () => {
  const [applicants, setApplicants] = useState(null);
  const navigate = useNavigate();
>>>>>>> main
  useEffect(() => {
    const fetchApplicants = async () => {
      const response = await fetch("/admin/view-applicants");
      const json = await response.json();

      if (response.ok) {
        setApplicants(json);
      }
    };
    fetchApplicants();
  }, []);
<<<<<<< HEAD
  return (
    <div className="applicantviewer">
      <h1>Applicants</h1>
      {applicants &&
        applicants.map((applicant) => (
          <ApplicantDetails key={applicant._id} applicant={applicant} />
        ))}
=======

  const handleAccept = (applicantId) => {
    // Send a POST request to "/admin/approve-doctor?applicantId=<applicantId>"
    fetch(`/admin/approve-doctor?applicantId=${applicantId}`, {
      method: "POST",
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response, if needed
        console.log("Doctor approved:", data);
      })
      .catch((error) => {
        console.error("Error approving doctor:", error);
      });
  };

  const handleReject = (applicantId) => {
    // Send a POST request to "/admin/reject-doctor?applicantId=<applicantId>"
    fetch(`/admin/reject-doctor?applicantId=${applicantId}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response, if needed
        console.log("Doctor rejected:", data);
      })
      .catch((error) => {
        console.error("Error rejecting doctor:", error);
      });
  };
  return (
    <div className="applicantviewer">
       <button onClick={() => navigate(-1)}>Go Back</button>
      <h1>Applicants</h1>
      
      {applicants &&
        applicants.map((applicant) => (
          <div key={applicant._id}>
          <ApplicantDetails applicant={applicant} />
          <button onClick={() => handleAccept(applicant._id)}>Accept</button>
          <button onClick={() => handleReject(applicant._id)}>Reject</button>
        </div>
        ))}
        
>>>>>>> main
    </div>
  );
};

export default ViewApplicants;

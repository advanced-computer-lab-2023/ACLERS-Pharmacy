import { useEffect, useState } from "react";
import ApplicantDetails from "../components/applicantdetails.js";
import { Link ,useNavigate} from 'react-router-dom';
import jwt from "jsonwebtoken-promisified";

const ViewApplicants = () => {
  const [applicants, setApplicants] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const decodedToken = jwt.decode(token);
  console.log("decoded Token:", decodedToken);
  useEffect(() => {
    const fetchApplicants = async () => {
      const requestOptions = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
       
      };
      const response = await fetch("/admin/view-applicants",requestOptions);
      const json = await response.json();

      if (response.ok) {
        setApplicants(json);
        console.log(json)
      }
    };
    fetchApplicants();
  }, []);

  const handleAccept = (applicantId) => {
    
    // Send a POST request to "/admin/approve-doctor?applicantId=<applicantId>"
    fetch(`/admin/approve-doctor?applicantId=${applicantId}`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
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
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
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
  if (!token) {
    // Handle the case where id is not available
    return <div>ACCESS DENIED, You are not authenticated, please log in</div>;
  }if(decodedToken.role !=="admin"){
    return <div>ACCESS DENIED, You are not authorized</div>;
  }
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
        
    </div>
  );
};

export default ViewApplicants;

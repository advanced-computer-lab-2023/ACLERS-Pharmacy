const ApplicantDetails = ({ applicant }) => {
  const { affiliation, dateOfBirth, educationalBackground, 
    email, hourlyRate, idDocument, medicalDegree, medicalLicense, name,  status, username, __v, _id } = applicant;

  return (
    <div className="applicantdetails">
      <h2>{username}</h2>
      <p>{name}</p>
      <p>{email}</p>
      
      <p>{dateOfBirth}</p>
      <p>{hourlyRate}</p>
      <p>{affiliation}</p>
      <p>{educationalBackground}</p>
      <p>{status}</p>
      <p>Id</p>
      <img src={`http://localhost:8000/uploads/${idDocument.substring(8)}`} style={{ maxWidth: "50%", maxHeight: "50%", objectFit: "contain" }}  alt={idDocument}/>
      <p>Medical Degree</p>
      <img src={`http://localhost:8000/uploads/${medicalDegree.substring(8)}`} style={{ maxWidth: "50%", maxHeight: "50%", objectFit: "contain" }} alt={medicalDegree} />
      <p>Medical License</p>
      <img src={`http://localhost:8000/uploads/${medicalLicense.substring(8)}`} style={{ maxWidth: "50%", maxHeight: "50%", objectFit: "contain" }} alt={medicalLicense} />
     
    </div>
  );
};

export default ApplicantDetails;

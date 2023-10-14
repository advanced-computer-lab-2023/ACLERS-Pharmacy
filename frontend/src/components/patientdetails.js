import { Link ,useNavigate} from 'react-router-dom';

const PatientDetails = ({ patient }) => {
  const navigate = useNavigate();
    const handleClick = async (event) => {
      console.log(patient._id);
    event.preventDefault()
  
      const url = `/admin/remove-patient?patientId=${patient._id}`;
      const response = await fetch(url, {
        method: "DELETE",
      });
  
      if (response.ok) {
        const json = await response.json();
        console.log(json);
      }
    };
  
    return (
      <div className="patientdetails">
         
        <h2>{patient.username}</h2>
        <p>{patient.password}</p>
        <button type="button" onClick={handleClick}>delete</button>
      </div>
    );
  };
  
  export default PatientDetails;
  
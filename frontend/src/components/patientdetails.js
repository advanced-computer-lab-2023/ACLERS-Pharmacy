<<<<<<< HEAD
const PatientDetails = ({ patient }) => {
    const handleClick = async () => {
      console.log(patient._id);
=======
import { Link ,useNavigate} from 'react-router-dom';

const PatientDetails = ({ patient }) => {
  const navigate = useNavigate();
    const handleClick = async (event) => {
      console.log(patient._id);
    event.preventDefault()
>>>>>>> main
  
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
<<<<<<< HEAD
        <h2>{patient.username}</h2>
        <p>{patient.password}</p>
        <button onClick={handleClick}>delete</button>
=======
         
        <h2>{patient.username}</h2>
        <p>{patient.password}</p>
        <button type="button" onClick={handleClick}>delete</button>
>>>>>>> main
      </div>
    );
  };
  
  export default PatientDetails;
  
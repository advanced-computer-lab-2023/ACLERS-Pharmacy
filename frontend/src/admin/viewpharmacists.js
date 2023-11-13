import { useEffect, useState } from "react";
import PharmacistDetails from "../components/pharmacistdetails";
import { Link ,useNavigate} from 'react-router-dom';
import jwt from "jsonwebtoken-promisified";

const ViewPharmacists = () => {
  const [pharmacists, setPharmacists] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const decodedToken = jwt.decode(token);
  console.log("decoded Token:", decodedToken);
  useEffect(() => {
    const fetchPharmacist = async () => {
      const requestOptions = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
       
      };
      const response = await fetch("/admin/view-pharmacists",requestOptions);
      const json = await response.json();

      if (response.ok) {
        setPharmacists(json);
      }
    };
    fetchPharmacist();
  }, []);
  if (!token) {
    // Handle the case where id is not available
    return <div>ACCESS DENIED, You are not authenticated, please log in</div>;
  }if(decodedToken.role !=="admin"){
    return <div>ACCESS DENIED, You are not authorized</div>;
  }
  return (
    <div className="doctorviewer">
       <button onClick={() => navigate(-1)}>Go Back</button>
      <h1>Pharmacists</h1>
      {pharmacists &&
        pharmacists.map((pharmacist) => (
          <Link key={pharmacist._id} to={`/admin/pharmacist/${pharmacist._id}`}>
            <PharmacistDetails pharmacist={pharmacist} />
          </Link>
        ))}
    </div>
  );
  
};

export default ViewPharmacists;

import { useEffect, useState } from "react";
import PharmacistDetails from "../components/pharmacistdetails";
import { Link ,useNavigate} from 'react-router-dom';
const ViewPharmacists = () => {
  const [pharmacists, setPharmacists] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchPharmacist = async () => {
      const response = await fetch("/admin/view-pharmacists");
      const json = await response.json();

      if (response.ok) {
        setPharmacists(json);
      }
    };
    fetchPharmacist();
  }, []);
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

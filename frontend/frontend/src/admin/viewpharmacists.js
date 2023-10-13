import { useEffect, useState } from "react";
import PharmacistDetails from "../components/pharmacistdetails";
import { Link } from 'react-router-dom';
const ViewPharmacists = () => {
  const [pharmacists, setPharmacists] = useState(null);

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

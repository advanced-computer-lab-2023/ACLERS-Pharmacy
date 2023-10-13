import { useEffect, useState } from "react";
import PatientDetails from "../components/patientdetails";
import { Link } from 'react-router-dom';

const ViewPatients = () => {
  const [patients, setPatients] = useState(null);

  useEffect(() => {
    const fetchPatients = async () => {
      const response = await fetch("/admin/view-patients");
      const json = await response.json();

      if (response.ok) {
        setPatients(json);
      }
    };
    fetchPatients();
  }, []);
  return (
    <div className="patientviewer">
      <h1>Patients</h1>
      {patients &&
        patients.map((patient) => (
          <Link key={patient._id} to={`/admin/patient/${patient._id}`}>
            <PatientDetails patient={patient} />
          </Link>
        ))}
    </div>
  );
};

export default ViewPatients;

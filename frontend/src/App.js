import { Routes, Route } from "react-router-dom";
import AdminDashboard from "./admin/AdminDashboard";
import AdminAdd from "./admin/AdminAdd";
import ViewPatients from "./admin/viewpatients";
import ViewPharmacists from "./admin/viewpharmacists";
import PatientDetailsPage from "./components/patientbasicinfo";
import MedicineList from "./pharmacist/viewMedicines";
import PharmacistDashboard from "./pharmacist/PharmacistDashboard";
import ViewMedicine from "./pharmacist/showMedicine";
import PatientDashboard from "./patient/PatientDashboard";
import MedicineListPatient from "./patient/viewMedicines";
import MedicineListAdmin from "./admin/viewMedicines";

function App() {
  return (
    <>
    <Routes>
    <Route path="/admin/Dashboard" element={<AdminDashboard />} />
    <Route path="/admin/AdminAdd" element={<AdminAdd />} />
    <Route path="/admin/viewpatients" element={<ViewPatients />} />
    <Route path="/admin/viewpharmacists" element={<ViewPharmacists />} />
    <Route path="/pharmacist/Dashboard"element={<PharmacistDashboard/>}/>
      <Route path="/pharmacist/view-Medicines"element={<MedicineList/>}/>
      <Route path="/pharmacist/view-Medicine/:medicineId" element={<ViewMedicine />} />
      { <Route path="/patient/Dashboard" element={<PatientDashboard />} /> }

      <Route path="/patient/view-Medicines"element={<MedicineListPatient/>}/>
      <Route path="/admin/view-Medicines"element={<MedicineListAdmin/>}/>




    
      

    
    <Route path="/admin/patient/:id" element={<PatientDetailsPage/>} />
    </Routes>
    </>
  );
}

export default App;

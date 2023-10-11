import { Routes, Route } from "react-router-dom";
import AdminDashboard from "./admin/AdminDashboard";
import AdminAdd from "./admin/AdminAdd";
import ViewPatients from "./admin/viewpatients";
import ViewPharmacists from "./admin/viewpharmacists";
import MedicineList from "./pharmacist/viewMedicines";
import PharmacistDashboard from "./pharmacist/PharmacistDashboard";
import ViewMedicine from "./pharmacist/showMedicine";

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

    
      

    
    </Routes>
    </>
  );
}

export default App;

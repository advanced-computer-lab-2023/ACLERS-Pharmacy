import { Routes, Route } from "react-router-dom";
import AdminDashboard from "./admin/AdminDashboard";
import AdminAdd from "./admin/AdminAdd";
import ViewPatients from "./admin/viewpatients";
import ViewPharmacists from "./admin/viewpharmacists";
import PatientDetailsPage from "./components/patientbasicinfo";
function App() {
  return (
    <>
    <Routes>
    <Route path="/admin/Dashboard" element={<AdminDashboard />} />
    <Route path="/admin/AdminAdd" element={<AdminAdd />} />
    <Route path="/admin/viewpatients" element={<ViewPatients />} />
    <Route path="/admin/viewpharmacists" element={<ViewPharmacists />} />
    <Route path="/admin/patient/:id" element={<PatientDetailsPage/>} />
    </Routes>
    </>
  );
}

export default App;

import { Routes, Route } from "react-router-dom";
import AdminDashboard from "./admin/AdminDashboard";
import AdminAdd from "./admin/AdminAdd";
import ViewPatients from "./admin/viewpatients";
import ViewPharmacists from "./admin/viewpharmacists";
function App() {
  return (
    <>
    <Routes>
    <Route path="/admin/Dashboard" element={<AdminDashboard />} />
    <Route path="/admin/AdminAdd" element={<AdminAdd />} />
    <Route path="/admin/viewpatients" element={<ViewPatients />} />
    <Route path="/admin/viewpharmacists" element={<ViewPharmacists />} />
    </Routes>
    </>
  );
}

export default App;

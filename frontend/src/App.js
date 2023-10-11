import { Routes, Route } from "react-router-dom";


import PharmacistDashboard from "./pharmacist/PharmacistDashboard";

import MedicineList from "./pharmacist/viewMedicines";





const App=()=> {
  return (
    <>
    <Routes>
      <Route path="/pharmacist/Dashboard"element={<PharmacistDashboard/>}/>
      <Route path="/pharmacist/view-Medicines"element={<MedicineList/>}/>

    
    </Routes>
    </>
  );
}

export default App;

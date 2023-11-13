import { Routes, Route } from "react-router-dom";
import AdminDashboard from "./admin/AdminDashboard";
import AdminAdd from "./admin/AdminAdd";
import ViewPatients from "./admin/viewpatients";
import ViewPharmacists from "./admin/viewpharmacists";
import PatientDetailsPage from "./components/patientbasicinfo";
import MedicineList from "./pharmacist/viewMedicines";
import PharmacistDashboard from "./pharmacist/PharmacistDashboard";
import ViewMedicine from "./pharmacist/showMedicine";
import PharmacistDetailsPage from "./components/pharmacistbasicinfo";
import PatientDashboard from "./patient/PatientDashboard";
import MedicineListPatient from "./patient/viewMedicines";
import MedicineListAdmin from "./admin/viewMedicines";
import CreateMedicine from "./pharmacist/addMedicine";
import PatientSignUpPage from "./signup/SignUp";
import PharmacistSignUpPage from "./signup/signupPharmacist";
import ViewApplicants from "./admin/viewapplicants";
import SignupDirectory from "./signupdirectory/SignUpPage";
import Login from "./login/SignInSide";
import CartPage from "./patient/Cart";
import OrderPage from "./patient/Order";
import PasswordChangeForm from "./components/changePassword";
import ForgotPassword from "./login/forgotPassword";
import OrderList from "./patient/viewOrder";

function App() {
  return (
    <>
      <Routes>
        <Route path="/admin/Dashboard" element={<AdminDashboard />} />
        <Route path="/admin/AdminAdd" element={<AdminAdd />} />
        <Route path="/admin/viewpatients" element={<ViewPatients />} />
        <Route path="/admin/viewpharmacists" element={<ViewPharmacists />} />
        <Route path="/admin/view-applicants" element={<ViewApplicants />} />
        <Route path="/pharmacist/Dashboard" element={<PharmacistDashboard />} />
        <Route path="/pharmacist/view-Medicines" element={<MedicineList />} />
        <Route
          path="/pharmacist/view-Medicine/:medicineId"
          element={<ViewMedicine />}
        />
        <Route path="/patient/Dashboard" element={<PatientDashboard />} />
        <Route path="/pharmacist/add-medicine" element={<CreateMedicine />} />
        <Route
          path="/patient/view-Medicines"
          element={<MedicineListPatient />}
        />
         <Route
          path="/patient/view-cart"
          element={<CartPage />}
        />
          <Route
          path="/patient/viewOrder"
          element={< OrderList/>}
        />
         <Route
          path="/patient/Order/:id"
          element={<OrderPage />}
        />
        <Route path="/admin/view-Medicines" element={<MedicineListAdmin />} />

        <Route path="/admin/patient/:id" element={<PatientDetailsPage />} />
        <Route
          path="/admin/pharmacist/:id"
          element={<PharmacistDetailsPage />}
        />
        <Route path="/signup/patient" element={<PatientSignUpPage />} />
        <Route path="/signup/pharmacist" element={<PharmacistSignUpPage />} />
        <Route path="/signuppage" element={<SignupDirectory />} />
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/patient/change-password/" element={<PasswordChangeForm/>}/>
        <Route path="/pharmacist/change-password/" element={<PasswordChangeForm/>}/>
        <Route path="/admin/change-password/" element={<PasswordChangeForm/>}/>
        <Route path="/ForgotPassword" element={<ForgotPassword />} />
      </Routes>
    </>
  );
}

export default App;

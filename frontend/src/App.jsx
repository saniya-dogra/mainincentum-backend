import React from "react";
import { Routes, Route } from "react-router-dom";
import { UserContextProvider } from "./contextapi/UserContext";
import SignupPage from "./Pages/authentication/SignupPage";
import LoginPage from "./Pages/authentication/LoginPage";
import AdminLoginPage from "./Pages/authentication/AdminLoginPage";
import HomePage from "./Pages/homePage/HomePage";
import HomeLoan from "./Pages/loans/homeLoan/HomeLoan";
import VehicleLoan from "./Pages/loans/vehicleLoan/VehicleLoan";
import PersonalLoan from "./Pages/loans/personalLoan/PersonalLoan";
import BusinessLoan from "./Pages/loans/businessLoan/BusinessLoan";
import MortgageLoan from "./Pages/loans/mortgageLoan/MortgageLoan";
import Profile from "./Pages/authentication/Profile";
import HomeDashboard from "./Pages/dashboard/homedashboard";
import ClientApplication from "./Pages/dashboard/ClientApplication";
import UserApplications from "./Pages/dashboard/UserApplications";
import FormThree from "./Pages/Forms/FormThree";
import AboutUs from "./Pages/Others/AboutUs";
import ContactUs from "./Pages/Others/ContactUs";
import Coformone from "./Pages/Forms/Coformone";
import EmiCalculator from "./Pages/homePage/homecomponents/EmiCalculator";
import Disclaimer from "./Pages/Others/Disclaimer";
import PrivacyPolicy from "./Pages/Others/PrivacyPolicy";
import Terms from "./Pages/Others/Terms";
import Thankyou from "./Pages/Forms/Thankyou";
import Coformtwo from "./Pages/Forms/Coformtwo";
import Coformthree from "./Pages/Forms/Coformthree";
import Layout from "./components/layout/Layout";
import ProtectedAdminRoute from "./Pages/authentication/ProtectedAdminRoute";

function App() {
  const ADMIN_ROUTE = import.meta.env.VITE_ADMIN_ROUTE_SECRET ;

  return (
    <UserContextProvider>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/signup-page" element={<SignupPage />} />
          <Route path="/login-page" element={<LoginPage />} />
          <Route path="/vehicle-loan" element={<VehicleLoan />} />
          <Route path="/home-loan" element={<HomeLoan />} />
          <Route path="/personal-loan" element={<PersonalLoan />} />
          <Route path="/business-loan" element={<BusinessLoan />} />
          <Route path="/mortgage-loan" element={<MortgageLoan />} />
          <Route path="/form-details-three" element={<FormThree />} />
          <Route path="/user-profile" element={<Profile />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/co-applicant-form-detail-one" element={<Coformone />} />
          <Route path="/co-applicant-form-detail-two" element={<Coformtwo />} />
          <Route path="/co-applicant-form-detail-three" element={<Coformthree />} />
          <Route path="/emi-calculator" element={<EmiCalculator />} />
          <Route path="/disclaimer" element={<Disclaimer />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<Terms />} />
          <Route path="/application-submitted-successfully" element={<Thankyou />} />
        </Route>
        <Route path="/admin-login" element={<AdminLoginPage />} />

        {/* Protected Admin Routes */}
        <Route
          path={ADMIN_ROUTE}
          element={
            <ProtectedAdminRoute>
              <HomeDashboard />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/client-application"
          element={
            <ProtectedAdminRoute>
              <ClientApplication />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/user-applications/:id"
          element={
            <ProtectedAdminRoute>
              <UserApplications />
            </ProtectedAdminRoute>
          }
        />
      </Routes>
    </UserContextProvider>
  );
}

export default App;
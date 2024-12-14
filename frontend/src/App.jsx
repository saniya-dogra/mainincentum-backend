import './App.css';
import { Routes, Route } from "react-router-dom";

import SignupPage from './Pages/authentication/SignupPage';
import LoginPage from './Pages/authentication/LoginPage';
import HeroSection from './Pages/homePage/homecomponents/HeroSection';
import FeaturesSection from './Pages/homePage/homecomponents/FeaturesSection';
import Layout from './components/layout/Layout';
import HomePage from './Pages/homePage/HomePage';
import HomeLoan from './Pages/loans/homeLoan/HomeLoan';
import VehicelLoan from './Pages/loans/vehicleLoan/VehicleLoan';
import PersonalLoan from './Pages/loans/personalLoan/PersonalLoan';
import BusinessLoan from './Pages/loans/businessLoan/BusinessLoan';
import PageFive from './Pages/Forms/vehicleforms/VehicleFive';
import HomeOne from './Pages/Forms/homeforms/Homeone';
import HomeTwo from './Pages/Forms/homeforms/HomeTwo';
import HomeThree from './Pages/Forms/homeforms/HomeThree';
import HomeFour from './Pages/Forms/homeforms/HomeFour';
import VehicleOne from './Pages/Forms/vehicleforms/VehicleOne';
import { UserContextProvider } from './contextapi/UserContext';

function App() {
  return (
        <UserContextProvider>
      
      <Routes>
        <Route path='/' element={<Layout/>}>
        <Route index element={<HomePage/>}/>
        <Route path="/signup-Page" element={<SignupPage />} />
        <Route path="/Login-Page" element={<LoginPage/>} />
        <Route path="/" element={<HeroSection />} />
        <Route path="/" element={<FeaturesSection />} />
        <Route path='vehicle-loan' element={<VehicelLoan/>}/>
        <Route path='home-loan' element={<HomeLoan/>}/>
        <Route path='personal-loan' element={<PersonalLoan/>}/>
        <Route path='business-loan' element={<BusinessLoan/>}/>
        <Route path='/HomePage' element={<HomePage/>} />
        <Route path='/presonal-details-formFive' element={<PageFive/>}/>
        <Route path='/home-details-HomeOne' element={<HomeOne/>} />
        <Route path='/home-details-HomeTwo' element={<HomeTwo/>} />
        <Route path='/home-details-HomeThree' element={<HomeThree/>}/>
        <Route path='/home-details-HomeFour' element={<HomeFour/>}/>
        <Route path='/vehicle-details-VehicleOne' element={<VehicleOne/>} />
        </Route>
      </Routes>
      </UserContextProvider>
   
  );
}

export default App;
import React, { useState,  useCallback } from "react";
import Dropdown from "./Dropdown.jsx";
import Input from "./Input.jsx";
import axios from "axios";


export default function PageOne() {
  const [formValues, setFormValues] = useState({
    "full_name": "",
    "father_name": "",
    "mobile_number": "",
    "email_id": "",
    "dob": "",
    "gender": "",
    "qualification": "",
    "employment_type": "",
    "marital_status": "",
    "spouse_employment_type": "",
    "no_of_dependents": "",
    "pan_number": "",
    "residence_type": "",
    "citizenship": "",
    "permanent_state": "",
    "permanent_district": "",
    "permanent_address": "",
    "permanent_pincode": "",
    "present_state": "",
    "present_district": "",
    "present_address": "",
    "present_pincode": ""
  });

  const [openDropdown, setOpenDropdown] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    console.log(value)
  };

  const handleOptionSelect = (name, option) => {
    setFormValues({ ...formValues, [name]: option });
    console.log(`Selected ${name}:`, option);
  };

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://127.0.0.1:8080/forms", formValues, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      alert("Form submitted successfully");
      // navigate("/HomePage");
    } catch (error) {
      console.error("Error during form submit:", error);
      alert("Could not submit form. Please try again later.");
    }
  };

  const ApplicantSection = () => (
    <div className="mx-12">
      <h1 className="text-xl font-bold mt-10 text-gray-900 mb-5">1. Personal Details</h1>
      <div className="mx-10">
        <div className="grid grid-cols-2 w-full gap-6">
        <Input
            placeholder="Full Name as per Pan card"
            name="fullName"
            value={formValues.full_name}
            onChange={handleInputChange}
          />
          <Input
            placeholder="Father Name"
            name="fatherName"
            value={formValues.father_name}
            onChange={handleInputChange}
          />
        </div>
        <div className="grid grid-cols-2 w-full gap-6">
          <Input
            placeholder="Enter 10-digit mobile number"
            name="mobileNumber"
            value={formValues.mobile_number}
            onChange={handleInputChange}
          />
          <Input
            placeholder="Email ID"
            name="email"
            value={formValues.email_id}
            onChange={handleInputChange}
          />
        </div>
        <div className="grid grid-cols-2 w-full gap-6">
          <Input
            placeholder="DOB"
            name="dob"
            value={formValues.dob}
            onChange={handleInputChange}
          />
          <Dropdown
            options={["Male", "Female", "Other"]}
            placeholder="Gender"
            setOpenDropdown={setOpenDropdown}
            isOpen={openDropdown === "gender"}
            id="gender"
            value={formValues.gender}
            onSelect={(option) => handleOptionSelect("gender", option)}
          />
        </div>
        <div className="grid grid-cols-2 w-full gap-6">
          <Dropdown
            options={[
              "Post Graduate",
              "Graduate",
              "Higher Secondary",
              "Secondary",
              "Others",
            ]}
            placeholder="Qualification"
            setOpenDropdown={setOpenDropdown}
            isOpen={openDropdown === "qualification"}
            id="qualification"
            value={formValues.qualification}
            onSelect={(option) => handleOptionSelect("qualification", option)}
          />
          <Dropdown
            options={["Salaried", "Self Employed", "Professional", "Unemployed"]}
            placeholder="Employment Type"
            setOpenDropdown={setOpenDropdown}
            isOpen={openDropdown === "employmentType"}
            id="employmentType"
            value={formValues.employment_type}
            onSelect={(option) => handleOptionSelect("employment_type", option)}
          />
        </div>
        <div className="grid grid-cols-2 w-full gap-6">
          <Dropdown
            options={["Married", "Unmarried", "Other"]}
            placeholder="Marital Status"
            setOpenDropdown={setOpenDropdown}
            isOpen={openDropdown === "maritalStatus"}
            id="maritalStatus"
            value={formValues.marital_status}
            onSelect={(option) => handleOptionSelect("marital_status", option)}
          />
          <Dropdown
            options={["Earning", "Home Maker"]}
            placeholder="Spouse Employment Type"
            setOpenDropdown={setOpenDropdown}
            isOpen={openDropdown === "spouseEmploymentType"}
            id="spouseEmploymentType"
            value={formValues.spouse_employment_type}
            onSelect={(option) => handleOptionSelect("spouse_employment_type", option)}
          />
        </div>
        <div className="grid grid-cols-2 w-full gap-6">
          <Dropdown
            options={["0", "1", "2", "3"]}
            placeholder="No of Dependents"
            setOpenDropdown={setOpenDropdown}
            isOpen={openDropdown === "dependents"}
            id="dependents"
            value={formValues.no_of_dependents}
            onSelect={(option) => handleOptionSelect("no_of_dependents", option)}
          />
          <Input
            placeholder="Pan Number"
            name="panNumber"
            value={formValues.pan_number}
            onChange={handleInputChange}
          />
        </div>
        <div className="grid grid-cols-2 w-full gap-6">
          <Dropdown
            options={["Owned", "Rented", "Parental", "Others"]}
            placeholder="Residence Type"
            setOpenDropdown={setOpenDropdown}
            isOpen={openDropdown === "residenceType"}
            id="residenceType"
            value={formValues.residence_type}
            onSelect={(option) => handleOptionSelect("residence_type", option)}
          />
          <Dropdown
            options={["Resident Indian", "Non-Resident Indian"]}
            placeholder="Citizenship"
            setOpenDropdown={setOpenDropdown}
            isOpen={openDropdown === "citizenship"}
            id="citizenship"
            value={formValues.citizenship}
            onSelect={(option) => handleOptionSelect("citizenship", option)}
          />
        </div>
      </div>

      <h1 className="text-xl font-bold mt-2 ml-3 text-gray-900 mb-5">
        Permanent Address Details
      </h1>
      <div className="mx-12">
        <div className="grid grid-cols-2 w-full gap-6">
          <Input
            placeholder="State"
            name="permanentState"
            value={formValues.permanent_state}
            onChange={handleInputChange}
          />
          <Input
            placeholder="District"
            name="permanentDistrict"
            value={formValues.permanent_district}
            onChange={handleInputChange}
          />
        </div>
        <div className="grid grid-cols-2 w-full gap-6">
          <Input
            placeholder="Enter Your Permanent Address"
            name="permanentAddress"
            value={formValues.permanent_address}
            onChange={handleInputChange}
          />
          <Input
            placeholder="Pin Code"
            name="permanentPincode"
            value={formValues.permanent_pincode}
            onChange={handleInputChange}
          />
        </div>
      </div>

      <h1 className="text-xl font-bold mt-2 ml-3 text-gray-900 mb-5">
        Present Address Details
      </h1>
      <div className="mx-12">
        <div className="grid grid-cols-2 w-full gap-6">
          <Input
            placeholder="State"
            name="presentState"
            value={formValues.present_state}
            onChange={handleInputChange}
          />
          <Input
            placeholder="District"
            name="presentDistrict"
            value={formValues.present_district}
            onChange={handleInputChange}
          />
        </div>
        <div className="grid grid-cols-2 w-full gap-6">
          <Input
            placeholder="Enter Your Present Address"
            name="presentAddress"
            value={formValues.present_address}
            onChange={handleInputChange}
          />
          <Input
            placeholder="Pin Code"
            name="presentPincode"
            value={formValues.present_pincode}
            onChange={handleInputChange}
          />
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col lg:flex-row p-7 py-10 rounded-lg shadow-md form-bg-image bg-[#C0F7FB]">
      <div className="p-7 lg:w-1/3 flex flex-col items-center">
        <div className="form-slidebar"></div>
      </div>
      <div className="lg:w-2/3 bg-white mt-8 p-8 py-11 mx-4 rounded-3xl shadow-md">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Loan Application</h1>
        <h3 className="text-xl font-medium mt-4 ml-14">
          Set up your account for your loan application
        </h3>
        <form action="" onSubmit={submitForm}>
          <ApplicantSection />
          <div className="mt-8">
            <button
              type="submit"
              className="w-full py-3 px-8 bg-blue-600 text-white text-lg rounded-xl shadow-lg hover:bg-blue-700"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

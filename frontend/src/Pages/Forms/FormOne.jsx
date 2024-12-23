
import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/form/Input.jsx";
import Dropdown from "../../components/form/Dropdown.jsx";
import Button from "../../components/form/Button.jsx";


export default function PageOne() {
  const navigate = useNavigate();
  const [formValuesList, setFormValuesList] = useState([
    {
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
      "present_pincode": "",
    },
  ]);

  const [openDropdown, setOpenDropdown] = useState(null);
  

  const handleInputChange = (index, e) => {
    const { name, value } = e.target;
    setFormValuesList((prevState) => {
      const updatedForms = [...prevState];
      updatedForms[index] = { ...updatedForms[index], [name]: value };
      return updatedForms;
    });
  };

  const handleOptionSelect = (index, name, option) => {
    setFormValuesList((prevState) => {
      const updatedForms = [...prevState];
      updatedForms[index][name] = option;
      return updatedForms;
    });
  };

  const handleNumberOfFormsChange = (num) => {
    const updatedForms = Array.from({ length: num }, (_, i) =>
      formValuesList[i] || {
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
        "present_pincode": "",
      }
    );
    setFormValuesList(updatedForms);
  };

  // const submitForm = async (e) => {
  //   e.preventDefault();
  //   try {
  //     await axios.post("http://127.0.0.1:8080/forms", formValuesList, {
  //       headers: { "Content-Type": "application/json" },
  //       withCredentials: true,
  //     });
  //     alert("Forms submitted successfully");
  //     navigate("/home-details-HomeTwo");
  //   } catch (error) {
  //     console.error("Error during form submit:", error);
  //     alert("Could not submit forms. Please try again later.");
  //   }
  // };

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
        <div className="grid grid-cols-2 w-full gap-6 ml-14 mt-4">
        <Dropdown  
          options={["1", "2", "3", "4"]}
          placeholder="Number of Forms"
          setOpenDropdown={setOpenDropdown}
          isOpen={openDropdown === "numberOfForms"}
          id="numberOfForms"
          value={formValuesList.length}
          onSelect={(option) => handleNumberOfFormsChange(Number(option))}
        />
        </div>
        <form >
          {formValuesList.map((formValues, index) => (
            <div key={index} className="mx-12">
              <h1 className="text-xl font-bold mt-8 text-gray-900 mb-5">
                Personal Details - {index + 1}
              </h1>
              <div className="mx-8">
        <div className="grid grid-cols-2 w-full gap-6">
        <Input
            placeholder="Full Name as per Pan card"
            name="full_name"
            value={formValues.full_name}
            onChange={handleInputChange}
          />
         
          <Input
            placeholder="Father Name"
            name="father_name"
            value={formValues.father_name}
            onChange={handleInputChange}
          />
        </div>
        <div className="grid grid-cols-2 w-full gap-6">
          <Input
            placeholder="Enter 10-digit mobile number"
            name="mobile_number"
            value={formValues.mobile_number}
            onChange={handleInputChange}
          />
          <Input
            placeholder="Email ID"
            name="email_id"
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
            name="pan_number"
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
            placeholder="citizenship"
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
            name="permanent_state"
            value={formValues.permanent_state}
            onChange={handleInputChange}
          />
          <Input
            placeholder="District"
            name="permanent_district"
            value={formValues.permanent_district}
            onChange={handleInputChange}
          />
        </div>
        <div className="grid grid-cols-2 w-full gap-6">
          <Input
            placeholder="Enter Your Permanent Address"
            name="permanent_address"
            value={formValues.permanent_address}
            onChange={handleInputChange}
          />
          <Input
            placeholder="Pin Code"
            name="permanent_pincode"
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
            name="present_state"
            value={formValues.present_state}
            onChange={handleInputChange}
          />
          <Input
            placeholder="District"
            name="present_district"
            value={formValues.present_district}
            onChange={handleInputChange}
          />
        </div>
        <div className="grid grid-cols-2 w-full gap-6">
          <Input
            placeholder="Enter Your Present Address"
            name="present_address"
            value={formValues.present_address}
            onChange={handleInputChange}
          />
          <Input
            placeholder="Pin Code"
            name="present_pincode"
            value={formValues.present_pincode}
            onChange={handleInputChange}
          />
        </div>
      </div>
            </div>
          ))}
          <div className="mt-8">
            <Link to={"/form-details-two"}>
            <Button type="submit" text="Submit" className="mt-6" />
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

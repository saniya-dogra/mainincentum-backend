import React, { useState } from "react";
import { Link } from "react-router-dom";
import Input from "../../components/form/Input.jsx";
import Dropdown from "../../components/form/Dropdown.jsx";
import Button from "../../components/form/Button.jsx";
import { FaUser } from "react-icons/fa";
import { FaBookOpen } from "react-icons/fa6";
import { IoDocuments } from "react-icons/io5";

export default function PageOne() {
  const [formValuesList, setFormValuesList] = useState([
    {
      full_name: "",
    father_name: "",
    mobile_number: "",
    email_id: "",
    dob: "",
    gender: "",
    qualification: "",
    employment_type: "",
    marital_status: "",
    spouse_employment_type: "",
    no_of_dependents: "",
    pan_number: "",
    residence_type: "",
    citizenship: "",
    permanent_state: "",
    permanent_district: "",
    permanent_address: "",
    permanent_pincode: "",
    present_state: "",
    present_district: "",
    present_address: "",
    present_pincode: "",
    },
  ]);

  const [openDropdown, setOpenDropdown] = useState(null);

  const handleInputChange = (index, e) => {
    const { name, value } = e.target;
    setFormValuesList((prev) => {
      const updatedForms = [...prev];
      updatedForms[index] = { ...updatedForms[index], [name]: value };
      return updatedForms;
    });
  };

  const handleOptionSelect = (index, name, option) => {
    setFormValuesList((prev) => {
      const updatedForms = [...prev];
      updatedForms[index][name] = option;
      return updatedForms;
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/form-one`, formValuesList);
      alert(response.data.message);
    } catch (error) {
      console.error("Error submitting the form", error);
      alert("Failed to submit the form");
    }
  };

  return (
    <div className="min-h-screen bg-[#010349f0] text-gray-900 flex flex-col lg:flex-row">
      {/* Horizontal Line */}
      <div className="absolute mt-20 md:mt-32 w-full h-1 bg-[#9ea0c5e7]"></div>
      {/* Sidebar */}
      <div className="w-full lg:w-1/4 py-10 px-4 lg:pl-16 flex flex-col shadow-xl relative rounded-r-3xl">
        <h2 className="text-2xl lg:text-3xl font-bold mb-8 lg:mb-14 text-white tracking-wide text-center -mt-3">
          Application Process
        </h2>
        <ul className="relative mr-10">
          {/* Vertical Timeline Line */}
          <div className="absolute right-6 top-12 bottom-0 w-1 bg-[#9ea0c5e7] mb-3"></div>

          {/* Step 1: Personal Information */}
          <li className="flex items-center justify-end space-x-6 mb-12 lg:mb-16 cursor-pointer relative group">
            <span className="text-lg lg:text-xl font-medium text-[#26cc88] group-hover:text-[#26cc88] transition-colors text-right mt-4">
              Personal Information
              <div className="text-sm">Browse and Upload</div>
            </span>
            <div className="z-10 w-10 h-10 lg:w-12 lg:h-12 mt-4 flex items-center justify-center bg-[#26cc88] rounded-full text-black font-bold shadow-lg transition-transform transform group-hover:scale-110 group-hover:rotate-6">
              <FaUser className="text-white w-5 h-5 lg:w-6 lg:h-6" />
            </div>
          </li>

          {/* Step 2: Employment Status */}
          <li className="flex items-center justify-end space-x-6 mb-12 lg:mb-16 cursor-pointer relative group">
            <span className="text-lg lg:text-xl font-medium text-white group-hover:text-[#26cc88] transition-colors text-right">
              Employment Status
              <div className="text-sm">Browse and Upload</div>
            </span>
            <div className="z-10 w-10 h-10 lg:w-12 lg:h-12 flex items-center justify-center bg-[#484a7b] rounded-full text-white font-bold shadow-lg transition-transform transform group-hover:scale-110 group-hover:rotate-6">
              <FaBookOpen className="text-white w-5 h-5 lg:w-6 lg:h-6" />
            </div>
          </li>

          {/* Step 3: Documents */}
          <li className="flex items-center justify-end space-x-6 cursor-pointer relative group">
            <span className="text-lg lg:text-xl font-medium text-white group-hover:text-[#26cc88] transition-colors text-right">
              Documents
              <div className="text-sm">Browse and Upload</div>
            </span>
            <div className="z-10 w-10 h-10 lg:w-12 lg:h-12 flex items-center justify-center bg-[#484a7b] rounded-full text-white font-bold shadow-lg transition-transform transform group-hover:scale-110 group-hover:rotate-6">
              <IoDocuments className="text-white w-5 h-5 lg:w-6 lg:h-6" />
            </div>
          </li>
        </ul>

        {/* Vertical Line on the Right End */}
        <div className="hidden lg:block absolute top-[8rem] right-0 h-screen w-1 bg-[#b1b3d7ef]">
          <div className="absolute top-[3.5rem] left-1/2 transform -translate-x-1/2 w-3.5 h-3.5 bg-[#26cc88] rounded-full"></div>
          <div className="absolute top-[10.5rem] left-1/2 transform -translate-x-1/2 w-4 h-4 bg-[#484a7b] border-4 border-[#383a69] rounded-full"></div>
          <div className="absolute top-[17.5rem] left-1/2 transform -translate-x-1/2 w-4 h-4 bg-[#484a7b] border-4 border-[#383a69] rounded-full"></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full lg:w-3/4 p-4 lg:p-10 -mt-2">
        <h1 className="text-2xl ml-12 lg:text-3xl text-white font-bold mb-3 lg:mb-3">
          Loan Application
        </h1>
        <p className="text-white ml-12 mb-6 lg:mb-11">
          Set up your account for your loan application
        </p>
        <form onSubmit={handleFormSubmit}>
          {formValuesList.map((formValues, index) => (
            <div key={index} className="mx-4 lg:mx-12">
              <h1 className="text-lg lg:text-xl font-bold mt-4 lg:mt-6 text-white mb-2 lg:mb-3">
                Personal Details - {index + 1}
              </h1>
              <div className="mx-2 lg:mx-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 w-full gap-3 lg:gap-4">
                  <Input
                    placeholder="Full Name as per Pan card"
                    name="full_name"
                    value={formValues.full_name}
                    onChange={(e) => handleInputChange(index, e)}
                  />
                  <Input
                    placeholder="Father Name"
                    name="father_name"
                    value={formValues.father_name}
                    onChange={(e) => handleInputChange(index, e)}
                  />
                  <Input
                    placeholder="Enter 10-digit mobile number"
                    name="mobile_number"
                    value={formValues.mobile_number}
                    onChange={(e) => handleInputChange(index, e)}
                  />
                  <Input
                    placeholder="Email ID"
                    name="email_id"
                    value={formValues.email_id}
                    onChange={(e) => handleInputChange(index, e)}
                  />
                  <Input
                    placeholder="DOB"
                    name="dob"
                    value={formValues.dob}
                    onChange={(e) => handleInputChange(index, e)}
                  />
                  <Dropdown
                    options={["Male", "Female", "Other"]}
                    placeholder="Gender"
                    setOpenDropdown={setOpenDropdown}
                    isOpen={openDropdown === `gender-${index}`}
                    id={`gender-${index}`}
                    value={formValues.gender}
                    onSelect={(option) =>
                      handleOptionSelect(index, "gender", option)
                    }
                  />
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
                    isOpen={openDropdown === `qualification-${index}`}
                    id={`qualification-${index}`}
                    value={formValues.qualification}
                    onSelect={(option) =>
                      handleOptionSelect(index, "qualification", option)
                    }
                  />
                  <Dropdown
                    options={[
                      "Salaried",
                      "Self Employed",
                      "Professional",
                      "Unemployed",
                    ]}
                    placeholder="Employment Type"
                    setOpenDropdown={setOpenDropdown}
                    isOpen={openDropdown === `employmentType-${index}`}
                    id={`employmentType-${index}`}
                    value={formValues.employment_type}
                    onSelect={(option) =>
                      handleOptionSelect(index, "employment_type", option)
                    }
                  />
                  <Dropdown
                    options={["Married", "Unmarried", "Other"]}
                    placeholder="Marital Status"
                    setOpenDropdown={setOpenDropdown}
                    isOpen={openDropdown === `maritalStatus-${index}`}
                    id={`maritalStatus-${index}`}
                    value={formValues.marital_status}
                    onSelect={(option) =>
                      handleOptionSelect(index, "marital_status", option)
                    }
                  />
                  <Dropdown
                    options={["Earning", "Home Maker"]}
                    placeholder="Spouse Employment Type ( If Married )"
                    setOpenDropdown={setOpenDropdown}
                    isOpen={openDropdown === `spouseEmploymentType-${index}`}
                    id={`spouseEmploymentType-${index}`}
                    value={formValues.spouse_employment_type}
                    onSelect={(option) =>
                      handleOptionSelect(
                        index,
                        "spouse_employment_type",
                        option
                      )
                    }
                  />
                  <Dropdown
                    options={["0", "1", "2", "3"]}
                    placeholder="No of Dependents"
                    setOpenDropdown={setOpenDropdown}
                    isOpen={openDropdown === "dependents"}
                    id="dependents"
                    value={formValues.no_of_dependents}
                    onSelect={(option) =>
                      handleOptionSelect(index, "no_of_dependents", option)
                    }
                  />
                  <Input
                    placeholder="Pan Number"
                    name="pan_number"
                    value={formValues.pan_number}
                    onChange={(e) => handleInputChange(index, e)}
                  />
                  <Dropdown
                    options={["Owned", "Rented", "Parental", "Others"]}
                    placeholder="Residence Type"
                    setOpenDropdown={setOpenDropdown}
                    isOpen={openDropdown === "residenceType"}
                    id="residenceType"
                    value={formValues.residence_type}
                    onSelect={(option) =>
                      handleOptionSelect(index, "residence_type", option)
                    }
                  />
                  <Dropdown
                    options={["Resident Indian", "Non-Resident Indian"]}
                    placeholder="Citizenship"
                    setOpenDropdown={setOpenDropdown}
                    isOpen={openDropdown === "citizenship"}
                    id="citizenship"
                    value={formValues.citizenship}
                    onSelect={(option) =>
                      handleOptionSelect(index, "citizenship", option)
                    }
                  />
                </div>
              </div>
              <h1 className="text-lg lg:text-xl font-bold mt-4 lg:mt-6 ml-2 lg:ml-3 text-white mb-2 lg:mb-3">
                Permanent Address Details
              </h1>
              <div className="mx-4 lg:mx-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 w-full gap-3 lg:gap-4">
                  <Input
                    placeholder="State"
                    name="permanent_state"
                    value={formValues.permanent_state}
                    onChange={(e) => handleInputChange(index, e)}
                  />
                  <Input
                    placeholder="District"
                    name="permanent_district"
                    value={formValues.permanent_district}
                    onChange={(e) => handleInputChange(index, e)}
                  />
                  <Input
                    placeholder="Enter Your Permanent Address"
                    name="permanent_address"
                    value={formValues.permanent_address}
                    onChange={(e) => handleInputChange(index, e)}
                  />
                  <Input
                    placeholder="Pin Code"
                    name="permanent_pincode"
                    value={formValues.permanent_pincode}
                    onChange={(e) => handleInputChange(index, e)}
                  />
                </div>
              </div>
              <h1 className="text-lg lg:text-xl font-bold mt-4 lg:mt-6 ml-2 lg:ml-3 text-white mb-2 lg:mb-3">
                Present Address Details
              </h1>
              <div className="mx-4 lg:mx-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 w-full gap-3 lg:gap-4">
                  <Input
                    placeholder="State"
                    name="present_state"
                    value={formValues.present_state}
                    onChange={(e) => handleInputChange(index, e)}
                  />
                  <Input
                    placeholder="District"
                    name="present_district"
                    value={formValues.present_district}
                    onChange={(e) => handleInputChange(index, e)}
                  />
                  <Input
                    placeholder="Enter Your Present Address"
                    name="present_address"
                    value={formValues.present_address}
                    onChange={(e) => handleInputChange(index, e)}
                  />
                  <Input
                    placeholder="Pin Code"
                    name="present_pincode"
                    value={formValues.present_pincode}
                    onChange={(e) => handleInputChange(index, e)}
                  />
                </div>
              </div>
            </div>
          ))}
          <div className="mt-6 lg:mt-8">
            <Link to={"/form-details-two"}>
              <Button type="submit" text="Submit" className="mt-4 lg:mt-6" />
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

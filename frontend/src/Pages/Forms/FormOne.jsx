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

  // Handle text input changes
  const handleInputChange = (index, e) => {
    const { name, value } = e.target;
    setFormValuesList((prev) => {
      const updatedForms = [...prev];
      updatedForms[index] = { ...updatedForms[index], [name]: value };
      return updatedForms;
    });
  };

  // Handle dropdown selection
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
    <div className="min-h-screen bg-[#010449] text-gray-900 flex">

  {/* Sidebar */}
  <div className="w-1/4 py-10 pl-16 flex flex-col shadow-xl relative rounded-r-3xl">

  {/* Sidebar Title */}
  <h2 className="text-3xl font-extrabold mb-14 text-white tracking-wide">
    Application Process
  </h2>
  <ul className="relative">
    
    {/* Vertical Timeline Line */}
    <div className="absolute left-6 top-12 bottom-0 w-1 bg-[#121557]"></div>

    {/* Step 1 */}
    <li className="flex items-center space-x-6 mb-16 cursor-pointer relative group">
      {/* Step Circle */}
      <div className="z-10 w-12 h-12 flex items-center justify-center bg-[#26cc88] rounded-full text-black font-bold shadow-lg transition-transform transform group-hover:scale-110 group-hover:rotate-6">
      <FaUser className="text-white w-6 h-6" />
      </div>
      {/* Step Label */}
      <span className="text-xl font-medium text-[#26cc88] group-hover:text-[#26cc88] transition-colors">
        Personal Information
      </span>
    </li>

    {/* Step 2 */}
    <li className="flex items-center space-x-6 mb-16 cursor-pointer relative group">
      {/* Step Circle */}
      <div className="z-10 w-12 h-12 flex items-center justify-center bg-[#484a7b] rounded-full text-white font-bold shadow-lg transition-transform transform group-hover:scale-110 group-hover:rotate-6">
        <FaBookOpen className="text-white w-6 h-6" />
      </div>
      {/* Step Label */}
      <span className="text-xl font-medium text-white group-hover:text-[#26cc88] transition-colors">
        Employment status 
      </span>
    </li>

    {/* Step 3 */}
    <li className="flex items-center space-x-6 cursor-pointer relative group">
      {/* Step Circle */}
      <div className="z-10 w-12 h-12 flex items-center justify-center bg-[#484a7b] rounded-full text-white font-bold shadow-lg transition-transform transform group-hover:scale-110 group-hover:rotate-6">
      <IoDocuments  className="text-white w-6 h-6"/>
      </div>
      {/* Step Label */}
      <span className="text-xl font-medium text-white group-hover:text-[#26cc88] transition-colors">
        Documents
      </span>
    </li>
  </ul>
{/* Vertical Line on the Right End */}
<div className="absolute top-[9.5rem] right-0 h-screen w-1 bg-[#121557]">
  {/* Small Hollow Dots */}
  <div className="absolute top-[2.12rem] left-1/2 transform -translate-x-1/2 w-3.5 h-3.5 bg-[#26cc88] rounded-full"></div>
  <div className="absolute top-[9.2rem] left-1/2 transform -translate-x-1/2 w-4 h-4 bg-transparent border-4 border-[#484a7b] rounded-full"></div>
  <div className="absolute top-[16.2rem] left-1/2 transform -translate-x-1/2 w-4 h-4 bg-transparent border-4 border-[#484a7b] rounded-full"></div>
</div>

  </div>

      {/* Main Content */}
      <div className="w-3/4 p-10">
        <h1 className="text-3xl text-white font-bold mb-6">
          Loan Application
        </h1>
        <p className="text-white mb-10">
          Set up your account for your loan application{" "}
        </p>
        {/* Horizontal Line Above Sidebar */}
        <div className="absolute top-56 left-0 w-full h-1 bg-[#121557]"></div>
        <form onSubmit={handleFormSubmit}>
          {formValuesList.map((formValues, index) => (
            <div key={index} className="mx-12">
              <h1 className="text-xl font-bold mt-8 text-white mb-5">
                Personal Details - {index + 1}
              </h1>
              <div className="mx-8">
                <div className="grid grid-cols-2 w-full gap-6">
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
                </div>
                <div className="grid grid-cols-2 w-full gap-6">
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
                </div>
                <div className="grid grid-cols-2 w-full gap-6">
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
                </div>
                <div className="grid grid-cols-2 w-full gap-6">
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
                    placeholder="Spouse Employment Type"
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
                </div>
                <div className="grid grid-cols-2 w-full gap-6">
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
                </div>
                <div className="grid grid-cols-2 w-full gap-6">
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
                    placeholder="citizenship"
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
              <h1 className="text-xl font-bold mt-2 ml-3 text-white mb-5">
                Permanent Address Details
              </h1>
              <div className="mx-12">
                <div className="grid grid-cols-2 w-full gap-6">
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
                </div>
                <div className="grid grid-cols-2 w-full gap-6">
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
              <h1 className="text-xl font-bold mt-2 ml-3 text-white mb-5">
                Present Address Details
              </h1>
              <div className="mx-12">
                <div className="grid grid-cols-2 w-full gap-6">
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
                </div>
                <div className="grid grid-cols-2 w-full gap-6">
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

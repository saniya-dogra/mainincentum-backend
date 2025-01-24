import React, { useState } from "react";
import { Link } from "react-router-dom";
import Input from "../../components/form/Input.jsx";
import Dropdown from "../../components/form/Dropdown.jsx";
import Button from "../../components/form/Button.jsx";

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
    <div className="min-h-screen bg-gradient-to-r from-blue-300 to-blue-50 text-white flex">
     <div className="w-1/4 bg-gradient-to-b from-blue-600 to-blue-100 py-10 pl-16 flex flex-col shadow-lg relative">
  <h2 className="text-2xl font-bold mt-4 mb-14 text-white">
    Application Process
  </h2>
  <ul className="relative">
    {/* Vertical Line */}
    <div className="absolute left-5 top-10 bottom-0 w-1 bg-teal-600 opacity-30"></div>

    {/* Step 1 */}
    <li className="flex items-center space-x-4 mb-16 cursor-pointer relative group">
      <div className="z-10 w-10 h-10 flex items-center justify-center bg-teal-400 rounded-full text-black font-bold shadow-md transition-transform transform group-hover:scale-110">
        1
      </div>
      <span className="text-lg text-white group-hover:text-gray-900">
        Personal Information
      </span>
    </li>

    {/* Step 2 */}
    <li className="flex items-center space-x-4 mb-16 cursor-pointer relative group">
      <div className="z-10 w-10 h-10 flex items-center justify-center bg-gray-600 rounded-full text-white shadow-md transition-transform transform group-hover:scale-110">
        2
      </div>
      <span className="text-lg text-white group-hover:text-gray-900">
        Other Details
      </span>
    </li>

    {/* Step 3 */}
    <li className="flex items-center space-x-4 cursor-pointer relative group">
      <div className="z-10 w-10 h-10 flex items-center justify-center bg-gray-600 rounded-full text-white shadow-md transition-transform transform group-hover:scale-110">
        3
      </div>
      <span className="text-lg text-white group-hover:text-gray-900">
        Confirmation
      </span>
    </li>
  </ul>
</div>


      {/* Main Content */}
      <div className="w-3/4 p-10">
        <h1 className="text-3xl text-gray-800 font-bold mb-6">
          Loan Application
        </h1>
        <p className="text-gray-800 mb-10">
          Set up your account for your loan application{" "}
        </p>
        <form onSubmit={handleFormSubmit}>
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
              <h1 className="text-xl font-bold mt-2 ml-3 text-gray-900 mb-5">
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
              <h1 className="text-xl font-bold mt-2 ml-3 text-gray-900 mb-5">
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

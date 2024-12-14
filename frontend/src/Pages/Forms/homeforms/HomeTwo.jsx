import React, { useState } from "react";
import { Link } from "react-router-dom";
import Input from "../../../components/form/Input.jsx";
import Dropdown from "../../../components/form/Dropdown.jsx";
import Button from "../../../components/form/Button.jsx";

const HomeTwo = () => {
  const [employmentType, setEmploymentType] = useState("");
  const [openDropdown, setOpenDropdown] = useState(null);

  const handleEmploymentChange = (event) => {
    setEmploymentType(event.target.value);
  };

  const handleOptionSelect = (option) => {
    console.log("Selected:", option);
  };

  return (
    <div className="flex flex-col lg:flex-row p-7 py-10 rounded-lg shadow-md form-bg-image bg-[#C0F7FB]">
      {/* Left Section */}
      <div className="p-7 lg:w-1/3 flex flex-col items-center">
        <div className="form-slidebar "></div>
      </div>

      {/* Right Section */}
      <div className="lg:w-2/3 bg-white mt-8 p-8 py-11 mx-4 rounded-3xl shadow-md">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Loan Application</h1>

        <h3 className="text-xl font-medium mt-4 ml-14">
          Set up your account for your loan Application
        </h3>
        <div className="ml-9 mt-4 form-step-two "></div>


        {/* Employment Type Selection */}
        <div className="mt-10 mx-12">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Employment Details</h2>
          <div className=" grid grid-cols-2 w-full gap-6">
            <label className="flex items-center">
              <input
                type="radio"
                value="Salaried"
                checked={employmentType === "Salaried"}
                onChange={handleEmploymentChange}
                className="form-radio h-5 w-5 text-blue-600"
              />
              <span className="ml-3 text-gray-900">Salaried</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                value="Self-Employed"
                checked={employmentType === "Self-Employed"}
                onChange={handleEmploymentChange}
                className="form-radio h-5 w-5 text-blue-600"
              />
              <span className="ml-3 text-gray-900">Self-Employed/Professional</span>
            </label>
          </div>
        </div>

        {/* Conditional Inputs */}
        <div className="mt-8 mx-12">
          {employmentType === "Salaried" && (
            <div>
              <div className="grid grid-cols-2 w-full gap-6">
              <Input placeholder="Organisation Name" />
              <Dropdown
                options={[
                  "Central Govt.",
                  "State Govt.",
                  "Govt. Organisation",
                  "PSU",
                  "Private Limited Company",
                  "Public Limited Company",
                  "Partnership Firm",
                  "Proprietary Firm",
                  "LLP",
                  "Others",
                ]}
                placeholder="Organisation Type"
                setOpenDropdown={setOpenDropdown}
                isOpen={openDropdown === "organisationType"}
                id="organisationType"
                onSelect={handleOptionSelect}
              />
              </div>
              <div className="grid grid-cols-2 w-full gap-6">
              <Dropdown   
                options={["Current Organisation", "Previous Organisation"]}
                placeholder="Work Experience"
                setOpenDropdown={setOpenDropdown}
                isOpen={openDropdown === "workExperience"}
                id="workExperience"
                onSelect={handleOptionSelect}
              />
              <Dropdown
                options={Array.from({ length: 36 }, (_, i) => `${i + 1} months`)}
                placeholder="Work Experience Duration"
                setOpenDropdown={setOpenDropdown}
                isOpen={openDropdown === "workExperienceDuration"}
                id="workExperienceDuration"
                onSelect={handleOptionSelect}
              />
               </div>
               <div className="grid grid-cols-2 w-full gap-6">
              <Input placeholder="Designation" />
              <Input placeholder="Place of Posting" />
              </div>
              <div className="grid grid-cols-2 w-full gap-6">
              <Input placeholder="Monthly Salary" />
              <Input placeholder="Bank in which salary account is maintained" />
            </div>
            </div>
          )}

          {employmentType === "Self-Employed" && (
            <div>
              <div className="grid grid-cols-2 w-full gap-6">
              <Input placeholder="Name of Firm/Company" />
              <Dropdown
                options={[
                  "Company",
                  "Partnership Firm",
                  "Proprietary Firm",
                  "LLP",
                  "Others",
                ]}
                placeholder="Type of Firm"
                setOpenDropdown={setOpenDropdown}
                isOpen={openDropdown === "typeOfFirm"}
                id="typeOfFirm"
                onSelect={handleOptionSelect}
              />
               </div>
               <div className="grid grid-cols-2 w-full gap-6">
              <Dropdown
                options={Array.from({ length: 9 }, (_, i) => `${i + 1} years`)}
                placeholder="Firm Registration/Incorporation Date"
                setOpenDropdown={setOpenDropdown}
                isOpen={openDropdown === "firmRegistrationDate"}
                id="firmRegistrationDate"
                onSelect={handleOptionSelect}
              />
              <Dropdown
                options={["Proprietor", "Partner", "Founder", "Director", "Others"]}
                placeholder="Designation"
                setOpenDropdown={setOpenDropdown}
                isOpen={openDropdown === "designation"}
                id="designation"
                onSelect={handleOptionSelect}
              />
               </div>
               <div className="grid grid-cols-2 w-full gap-6">
              <Dropdown
                options={Array.from({ length: 9 }, (_, i) => `${i + 1} years`)}
                placeholder="Years in Line of Business (VINTAGE)"
                setOpenDropdown={setOpenDropdown}
                isOpen={openDropdown === "lineOfBusiness"}
                id="lineOfBusiness"
                onSelect={handleOptionSelect}
              />
              <Dropdown
                options={Array.from({ length: 9 }, (_, i) => `${i + 1} years`)}
                placeholder="Years of ITR Filing (VINTAGE)"
                setOpenDropdown={setOpenDropdown}
                isOpen={openDropdown === "itrFiling"}
                id="itrFiling"
                onSelect={handleOptionSelect}
              />
               </div>
            </div>
          )}
        </div>

        <div className="mt-10 mx-12">
           <h2 className="text-xl font-bold text-gray-900 mb-4"> Property Finalised </h2>       
          {/* Property Finalised */}
          <div className="flex flex-col space-y-4">
            <div className="grid grid-cols-2 w-full gap-6">
            <label className="flex items-center">
              <input
                type="radio"
                name="propertyFinalised"
                value="Yes"
                className="form-radio h-5 w-5 text-blue-600"
              />
              <span className="ml-3 text-gray-900">Yes</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="propertyFinalised"
                value="No"
                className="form-radio h-5 w-5 text-blue-600"
              />
              <span className="ml-3 text-gray-900">No</span>
            </label>
            </div>
            <Input placeholder=" Property Address  (if Yes)" />
          </div>

          {/* Agreement/MoU Executed */}
          <h2 className="text-xl font-bold text-gray-900 mt-6 mb-4 ">Agreement/MoU Executed</h2>
          <div className=" grid grid-cols-2 w-full gap-6">
            <label className="flex items-center">
              <input
                type="radio"
                name="agreementExecuted"
                value="Yes"
                className="form-radio h-5 w-5 text-blue-600"
              />
              <span className="ml-3 text-gray-900">Yes</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="agreementExecuted"
                value="No"
                className="form-radio h-5 w-5 text-blue-600"
              />
              <span className="ml-3 text-gray-900">No</span>
            </label>
          </div>

          {/* Agreement/MoU Value */}
          <div className="grid grid-cols-2 w-full gap-6 mt-6 ">
              <Input placeholder="Agreement/MoU Value (Rs.)" />
              <Input placeholder="Loan Amount Required (Rs.)" />
          </div>

          <div className="mt-2">
          <Dropdown
            options={["Bank 1", "Bank 2", "Bank 3", "Bank 4", "Bank 5"]}
            placeholder="Your Preferred Banks (select up to 3)"
            
          />
          </div>

        {/* Continue Button */}
        <div className="mt-8">
          <Link
            to={
              employmentType === "Salaried"
                ? "/home-details-HomeThree"
                : employmentType === "Self-Employed"
                ? "/home-details-HomeFour"
                : "#"
            }
          >
            <Button />
          </Link>
        </div>
      </div>
    </div>
    </div>
  );
};

export default HomeTwo;
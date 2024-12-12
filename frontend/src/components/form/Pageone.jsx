import React, { useState } from "react";
import Input from "./Input.jsx";
import Dropdown from "./Dropdown.jsx";


export default function PageOne() {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [applicantCount, setApplicantCount] = useState(1);

  const handleOptionSelect = (option) => {
    console.log("Selected:", option);
  };

  const handleAddApplicant = () => {
    if (applicantCount < 4) {
      setApplicantCount(applicantCount + 1);
    }
  };

  const ApplicantSection = ({ index }) => (
    <div className="mx-12">
      <h1 className="text-xl font-bold mt-10 text-gray-900 mb-5">
        {index + 1}.Personal Details of{" "}
        {index == 0 ? "Applicant 1" : `Applicant ${index + 1}`}
      </h1>

      <div className="mx-10">
        <div className="grid grid-cols-2  w-full gap-6">
          <Input placeholder="Full Name as per Pan card" />
          <Input placeholder="Father Name" />
        </div>
        <div className="grid grid-cols-2 w-full gap-6">
          <Input placeholder="Enter 10-digit mobile number" />
          <Input placeholder="Email ID" />
        </div>
        <div className="grid grid-cols-2 w-full gap-6">
          <Input placeholder="DOB" />
          <Dropdown
            options={["Male", "Female", "Other"]}
            placeholder="Gender"
            setOpenDropdown={setOpenDropdown}
            isOpen={openDropdown === "gender"}
            id="gender"
            onSelect={handleOptionSelect}
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
            onSelect={handleOptionSelect}
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
            isOpen={openDropdown === "employmenttype"}
            id="employmenttype"
            onSelect={handleOptionSelect}
          />
        </div>
        <div className="grid grid-cols-2 w-full gap-6">
          <Dropdown
            options={["Married", "Unmarried", "Other"]}
            placeholder="Marital Status"
            setOpenDropdown={setOpenDropdown}
            isOpen={openDropdown === "maritalStatus"}
            id="maritalStatus"
            onSelect={handleOptionSelect}
          />
          <Dropdown
            options={["Earning", "Home Maker"]}
            placeholder="Spouse Employment Type"
            setOpenDropdown={setOpenDropdown}
            isOpen={openDropdown === "spouseemploymenttype"}
            id="spouseemploymenttype"
            onSelect={handleOptionSelect}
          />
        </div>
        <div className="grid grid-cols-2 w-full gap-6">
          <Dropdown
            options={["0", "1", "2", "3"]}
            placeholder="No of Dependents"
            setOpenDropdown={setOpenDropdown}
            isOpen={openDropdown === "dependents"}
            id="dependents"
            onSelect={handleOptionSelect}
          />
          <Input placeholder="Pan Number" />
        </div>
        <div className="grid grid-cols-2 w-full gap-6">
          <Dropdown
            options={["Owned", "Rented", "Parental", "Others"]}
            placeholder="Residence Type"
            setOpenDropdown={setOpenDropdown}
            isOpen={openDropdown === "residenceType"}
            id="residenceType"
            onSelect={handleOptionSelect}
          />
          <Dropdown
            options={["Resident Indian", "Non-Resident Indian"]}
            placeholder="Citizenship"
            setOpenDropdown={setOpenDropdown}
            isOpen={openDropdown === "residenceType"}
            id="residenceType"
            onSelect={handleOptionSelect}
          />
        </div>
      </div>

      <div>
        <h1 className="text-xl font-bold mt-2 ml-3 text-gray-900  mb-5">
          Permanent Address Details
        </h1>
        <div className="mx-12">
          <div className="grid grid-cols-2 w-full gap-6">
            <Input placeholder="State" />
            <Input placeholder="District" />
          </div>
          <div className="grid grid-cols-2  w-full gap-6">
            <Input placeholder="Enter Your Present Address" />
            <Input placeholder="Pin Code" />
          </div>
        </div>
      </div>
      <div>
        <h1 className="text-xl font-bold mt-2 ml-3 text-gray-900  mb-5">
          Present Address Details
        </h1>
        <div className="mx-12">
          <div className="grid grid-cols-2 w-full gap-6">
            <Input placeholder="State" />
            <Input placeholder="District" />
          </div>
          <div className="grid grid-cols-2  w-full gap-6">
            <Input placeholder="Enter Your Present Address" />
            <Input placeholder="Pin Code" />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col lg:flex-row p-7 py-10 rounded-lg shadow-md form-bg-image bg-[#C0F7FB] ">
      {/* Left Section */}
      <div className="p-7 lg:w-1/3 flex flex-col items-center">
        <div className="form-slidebar "></div>
      </div>

      {/* Right Section */}
      <div className="lg:w-2/3 bg-white mt-8 p-8 py-11 mx-4 rounded-3xl shadow-md">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Loan Applicaton
        </h1>

        <h3 className="text-xl font-medium mt-4 ml-14">
          Set up your account for your loan Application
        </h3>

        <div>
          {Array.from({ length: applicantCount }, (_, index) => (
            <ApplicantSection key={index} index={index} />
          ))}
        </div>
        <div>
          {applicantCount < 4 && (
            <div className="flex justify-center mt-6">
              <button
                onClick={handleAddApplicant}
                className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600"
              >
                + Add Co-Applicant
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
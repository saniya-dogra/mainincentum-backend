
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Input from "../../../components/form/Input.jsx";
import Dropdown from "../../../components/form/Dropdown.jsx";
import Button from "../../../components/form/Button.jsx";
import axios from "axios";

const HomeTwo = () => {
  const [employmentType, setEmploymentType] = useState("");
  const [openDropdown, setOpenDropdown] = useState(null);
  const [formValues, setFormValues] = useState({
    user_type: "",
    organisation_name: "",
    designation_salaried: "",
    organisation_type: "",
    work_experience: "",
    work_experience_duration: "",
    monthly_salary: "",
    place_of_posting: "",
    salary_bank_name: "",
    company_name: "",
    company_type: "",
    incorporation_date: "",
    designation_self: "",
    years_in_business: "",
    years_of_itr_filing: "",
    property_finalised: "",
    property_address: "",
    agreement_executed: "",
    agreement_mou_value: "",
    loan_amount_required: "",
    preferred_banks: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    console.log(`Updated ${name}:`, value);
  };

  const handleOptionSelect = (name, option) => {
    setFormValues({ ...formValues, [name]: option });
    console.log(`Selected ${name}:`, option);
  };

  const handleRadioChange = (name, value) => {
    setFormValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    console.log(`Selected ${name}:`, value);
  };

  const submitFormTwo = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://127.0.0.1:8080/form-two", formValues, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      alert("data send successfully");
      // navigate("/HomePage");
    } catch (error) {
      console.error("Error during form submit:", error);
      alert("Could not submit form. Please try again later.");
    }
  };

  return (
    <div className="flex flex-col lg:flex-row p-7 py-10 rounded-lg shadow-md form-bg-image bg-[#C0F7FB]">
      {/* Left Section */}
      <div className="p-7 lg:w-1/3 flex flex-col items-center">
        <div className="form-slidebar"></div>
      </div>

      {/* Right Section */}
      <div className="lg:w-2/3 bg-white mt-8 p-8 py-11 mx-4 rounded-3xl shadow-md">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Loan Application</h1>
        <h3 className="text-xl font-medium mt-4 ml-14">
          Set up your account for your loan application
        </h3>
        <div className="ml-9 mt-4 form-step-two"></div>

        <form onSubmit={submitFormTwo}>
          {/* Employment Type Selection */}
          <div className="mt-10 mx-12">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Employment Details</h2>
            <div className="grid grid-cols-2 w-full gap-6">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="user_type"
                  checked={formValues.user_type === "Salaried"}
                  value="Salaried"
                  onChange={(e) => handleRadioChange("user_type", e.target.value)}
                  className="form-radio h-5 w-5 text-blue-600"
                />
                <span className="ml-3 text-gray-900">Salaried</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="user_type"
                  checked={formValues.user_type === "Self-Employed"}
                  value="Self-Employed"
                  onChange={(e) => handleRadioChange("user_type", e.target.value)}
                  className="form-radio h-5 w-5 text-blue-600"
                />
                <span className="ml-3 text-gray-900">Self-Employed/Professional</span>
              </label>
            </div>
          </div>

          {/* Conditional Inputs */}
          <div className="mt-8 mx-12">
            {formValues.user_type === "Salaried" && (
              <div>
                <div className="grid grid-cols-2 w-full gap-6">
                  <Input
                    placeholder="Organisation Name"
                    name="organisation_name"
                    value={formValues.organisation_name}
                    onChange={handleInputChange}
                  />
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
                    value={formValues.organisation_type}
                    onSelect={(option) => handleOptionSelect("organisation_type", option)}
                  />
                </div>

                {/* Other fields */}
                <div className="grid grid-cols-2 w-full gap-6">
                  <Dropdown
                    options={["Current Organisation", "Previous Organisation"]}
                    placeholder="Work Experience"
                    setOpenDropdown={setOpenDropdown}
                    isOpen={openDropdown === "workExperience"}
                    id="workExperience"
                    value={formValues.work_experience}
                    onSelect={(option) => handleOptionSelect("work_experience", option)}
                  />
                  <Dropdown
                    options={Array.from({ length: 6 }, (_, i) => `${i + 1} years`)}
                    placeholder="Work Experience Duration"
                    setOpenDropdown={setOpenDropdown}
                    isOpen={openDropdown === "workExperienceDuration"}
                    id="workExperienceDuration"
                    value={formValues.work_experience_duration}
                    onSelect={(option) => handleOptionSelect("work_experience_duration", option)}
                  />
                </div>

                <div className="grid grid-cols-2 w-full gap-6">
                  <Input
                    placeholder="Designation"
                    name="designation_salaried"
                    value={formValues.designation_salaried}
                    onChange={handleInputChange}
                  />
                  <Input
                    placeholder="Place of Posting"
                    name="place_of_posting"
                    value={formValues.place_of_posting}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="grid grid-cols-2 w-full gap-6">
                  <Input
                    placeholder="Monthly Salary"
                    name="monthly_salary"
                    value={formValues.monthly_salary}
                    onChange={handleInputChange}
                  />
                  <Input
                    placeholder="Bank in which salary account is maintained"
                    name="salary_bank_name"
                    value={formValues.salary_bank_name}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            )}

            {formValues.user_type === "Self-Employed" && (
              <div>
                <div className="grid grid-cols-2 w-full gap-6">
                  <Input
                    placeholder="Name of Firm/Company"
                    name="company_name"
                    value={formValues.company_name}
                    onChange={handleInputChange}
                  />
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
                    value={formValues.company_type}
                    onSelect={(option) => handleOptionSelect("company_type", option)}
                  />
                </div>

                <div className="grid grid-cols-2 w-full gap-6">
                  <Dropdown
                    options={Array.from({ length: 9 }, (_, i) => `${i + 1} years`)}
                    placeholder="Firm Registration/Incorporation Date"
                    setOpenDropdown={setOpenDropdown}
                    isOpen={openDropdown === "firmRegistrationDate"}
                    id="firmRegistrationDate"
                    value={formValues.incorporation_date}
                    onSelect={(option) => handleOptionSelect("incorporation_date", option)}
                  />
                  <Dropdown
                    options={["Proprietor", "Partner", "Founder", "Director", "Others"]}
                    placeholder="Designation"
                    setOpenDropdown={setOpenDropdown}
                    isOpen={openDropdown === "designation"}
                    id="designation"
                    value={formValues.designation_self}
                    onSelect={(option) => handleOptionSelect("designation_self", option)}
                  />
                </div>

                <div className="grid grid-cols-2 w-full gap-6">
                  <Dropdown
                    options={Array.from({ length: 9 }, (_, i) => `${i + 1} years`)}
                    placeholder="Years in Line of Business (VINTAGE)"
                    setOpenDropdown={setOpenDropdown}
                    isOpen={openDropdown === "lineOfBusiness"}
                    id="lineOfBusiness"
                    value={formValues.years_in_business}
                    onSelect={(option) => handleOptionSelect("years_in_business", option)}
                  />
                  <Dropdown
                    options={Array.from({ length: 9 }, (_, i) => `${i + 1} years`)}
                    placeholder="Years of ITR Filing (VINTAGE)"
                    setOpenDropdown={setOpenDropdown}
                    isOpen={openDropdown === "itrFiling"}
                    id="itrFiling"
                    value={formValues.years_of_itr_filing}
                    onSelect={(option) => handleOptionSelect("years_of_itr_filing", option)}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Property Finalised */}
          <div className="mt-10 mx-12">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Property Finalised</h2>
            <div className="flex flex-col space-y-4">
              <div className="grid grid-cols-2 w-full gap-6">
                {/* Radio buttons for property finalised */}
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="property_finalised"
                    checked={formValues.property_finalised === "Yes"}
                    value="Yes"
                    onChange={(e) => handleRadioChange("property_finalised", e.target.value)}
                    className="form-radio h-5 w-5 text-blue-600"
                  />
                  <span className="ml-3 text-gray-900">Yes</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="property_finalised"
                    checked={formValues.property_finalised === "No"}
                    value="No"
                    onChange={(e) => handleRadioChange("property_finalised", e.target.value)}
                    className="form-radio h-5 w-5 text-blue-600"
                  />
                  <span className="ml-3 text-gray-900">No</span>
                </label>
              </div>
              {/* Conditional input for property address */}
              {formValues.property_finalised === "Yes" && (
                <Input
                  placeholder="Property Address (if Yes)"
                  name="property_address"
                  value={formValues.property_address}
                  onChange={handleInputChange}
                />
              )}
            </div>
          </div>

          {/* Agreement/MoU Executed */}
          <h2 className="text-xl font-bold text-gray-900 mt-6 mb-4">Agreement/MoU Executed</h2>
          <div className="grid grid-cols-2 w-full gap-6">
            <label className="flex items-center">
              <input
                type="radio"
                name="agreement_executed"
                checked={formValues.agreement_executed === "Yes"}
                value="Yes"
                onChange={(e) => handleRadioChange("agreement_executed", e.target.value)}
                className="form-radio h-5 w-5 text-blue-600"
              />
              <span className="ml-3 text-gray-900">Yes</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="agreement_executed"
                checked={formValues.agreement_executed === "No"}
                value="No"
                onChange={(e) => handleRadioChange("agreement_executed", e.target.value)}
                className="form-radio h-5 w-5 text-blue-600"
              />
              <span className="ml-3 text-gray-900">No</span>
            </label>
          </div>

          {/* Agreement/MoU Value */}
          <div className="grid grid-cols-2 w-full gap-6 mt-6">
            <Input
              placeholder="Agreement/MoU Value (Rs.)"
              name="agreement_mou_value"
              value={formValues.agreement_mou_value}
              onChange={handleInputChange}
            />
            <Input
              placeholder="Loan Amount Required (Rs.)"
              name="loan_amount_required"
              value={formValues.loan_amount_required}
              onChange={handleInputChange}
            />
          </div>

          {/* Preferred Banks */}
          <div className="mt-2">
            <Input
              placeholder="Your Preferred Banks (select up to 3)"
              name="preferred_banks"
              value={formValues.preferred_banks}
              onChange={handleInputChange}
            />
          </div>
          <div>

          {/* Continue Button */}
          <div className="mt-8">
          {formValues.user_type === "Self-Employed" && (
              <div>
                {/* Similar content for Self-Employed */}
              </div>
            )}
          </div>

          {/* Submit Button */}
          <Button type="submit" text="Submit" className="mt-6" />
          </div>
        </form>
    </div>
    </div>
  );
};

export default HomeTwo;

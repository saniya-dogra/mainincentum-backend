import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/form/Input.jsx";
import Dropdown from "../../components/form/Dropdown.jsx";
import Button from "../../components/form/Button.jsx";
import { FaUser } from "react-icons/fa";
import { FaBookOpen } from "react-icons/fa6";
import { IoDocuments } from "react-icons/io5";
import axios from "axios";

const FormTwo = () => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [employmentType, setEmploymentType] = useState("");
  const navigate = useNavigate();
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

  const handleEmploymentChange = (event) => {
    setFormValues((prevState) => ({
      ...prevState,
      user_type: event.target.value,
    }));
    console.log(`Selected user_type:`, event.target.value);
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

  const getNavigationPath = () => {
    const { loan } = formValues;

    if (loan === "Home Loan") {
      return formValues.user_type === "Salaried"
        ? "/form-details-three?loan_type=home&user_type=salaried"
        : formValues.user_type === "Self-Employed"
        ? "/form-details-three?loan_type=home&user_type=self_employed"
        : "#";
    } else if (loan === "Vehicle Loan") {
      return formValues.user_type === "Salaried"
        ? "/form-details-three?loan_type=vehicle&user_type=salaried"
        : formValues.user_type === "Self-Employed"
        ? "/form-details-three?loan_type=vehicle&user_type=self_employed"
        : "#";
    } else if (loan === "Personal Loan") {
      return formValues.user_type === "Salaried"
        ? "/form-details-three?loan_type=personal&user_type=salaried"
        : formValues.user_type === "Self-Employed"
        ? "/form-details-three?loan_type=personal&user_type=self_employed"
        : "#";
    } else if (loan === "Business Loan") {
      return "/form-details-three?loan_type=business&user_type=/"; 
    } else if (loan === "Mortgage Loan") {
      return formValues.user_type === "Salaried"
        ? "/form-details-three?loan_type=mortgage&user_type=salaried"
        : formValues.user_type === "Self-Employed"
        ? "/form-details-three?loan_type=mortgage&user_type=self_employed"
        : "#";
    }
    return "#";
  };

  return (
    <div className="min-h-screen bg-[#010349f0] text-gray-900 flex flex-col lg:flex-row">
      {/* Horizontal Line */}
      <div className="absolute mt-20 md:mt-32 w-full h-1 bg-[#9ea0e5e7]"></div>
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
            <span className="text-lg lg:text-xl font-medium text-white group-hover:text-[#26cc88] transition-colors text-right mt-4">
              Personal Information
              <div className="text-sm">Browse and Upload</div>
            </span>
            <div className="z-10 w-10 h-10 lg:w-12 lg:h-12 mt-4 flex items-center justify-center bg-[#484a7b] rounded-full text-black font-bold shadow-lg transition-transform transform group-hover:scale-110 group-hover:rotate-6">
              <FaUser className="text-white w-5 h-5 lg:w-6 lg:h-6" />
            </div>
          </li>

          {/* Step 2: Employment Status */}
          <li className="flex items-center justify-end space-x-6 mb-12 lg:mb-16 cursor-pointer relative group">
            <span className="text-lg lg:text-xl font-medium text-[#26cc88] group-hover:text-[#26cc88] transition-colors text-right">
              Employment Status
              <div className="text-sm">Browse and Upload</div>
            </span>
            <div className="z-10 w-10 h-10 lg:w-12 lg:h-12 flex items-center justify-center bg-[#26cc88] rounded-full text-white font-bold shadow-lg transition-transform transform group-hover:scale-110 group-hover:rotate-6">
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
          <div className="absolute top-[3.5rem] left-1/2 transform -translate-x-1/2 w-4 h-4 bg-[#484a7b] border-4 border-[#383a69] rounded-full"></div>
          <div className="absolute top-[10.5rem] left-1/2 transform -translate-x-1/2 w-3.5 h-3.5 bg-[#26cc88] rounded-full"></div>
          <div className="absolute top-[17.5rem] left-1/2 transform -translate-x-1/2 w-4 h-4 bg-[#484a7b] border-4 border-[#383a69] rounded-full"></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full lg:w-3/4 p-4 lg:p-10 -mt-2">
        <h1 className="text-2xl ml-12 lg:text-3xl text-white font-bold mb-3 lg:mb-3">
          Loan Application
        </h1>
        <p className="text-white ml-12 mb-8 lg:mb-11">
          Set up your account for your loan application
        </p>
        <form>
          <div className="mx-4 lg:mx-12 mt-4">
            <div className="grid grid-cols-2 w-full">
              <Dropdown
                options={["Home Loan", "Vehicle Loan", "Business Loan", "Personal Loan", "Mortgage Loan"]}
                placeholder="Loan Type"
                setOpenDropdown={setOpenDropdown}
                isOpen={openDropdown === "loan"}
                id="loan"
                value={formValues.loan}
                onSelect={(option) => handleOptionSelect("loan", option)}
              />
            </div>

            {/* Home Loan */}
            {formValues.loan === "Home Loan" && (
              <div>
              <div className="mt-10">
                <h2 className="text-xl font-bold text-white mb-4">
                  Employment Details
                </h2>
                <div className="grid grid-cols-2 w-full gap-6">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="user_type"
                      checked={formValues.user_type === "Salaried"}
                      value="Salaried"
                      onChange={(e) =>
                        handleRadioChange("user_type", e.target.value)
                      }
                      className="form-radio h-5 w-5 text-blue-600"
                    />
                    <span className="ml-3 text-white">Salaried</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="user_type"
                      checked={formValues.user_type === "Self-Employed"}
                      value="Self-Employed"
                      onChange={(e) =>
                        handleRadioChange("user_type", e.target.value)
                      }
                      className="form-radio h-5 w-5 text-blue-600"
                    />
                    <span className="ml-3 text-white">
                      Self-Employed / Professional
                    </span>
                  </label>
                </div>
              </div>

              <div className="mt-8">
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
                        onSelect={(option) =>
                          handleOptionSelect("organisation_type", option)
                        }
                      />
                    </div>

                    {/* Other fields */}
                    <div className="grid grid-cols-2 w-full gap-6">
                      <Dropdown
                        options={[
                          "Current Organisation",
                          "Previous Organisation",
                        ]}
                        placeholder="Work Experience"
                        setOpenDropdown={setOpenDropdown}
                        isOpen={openDropdown === "workExperience"}
                        id="workExperience"
                        value={formValues.work_experience}
                        onSelect={(option) =>
                          handleOptionSelect("work_experience", option)
                        }
                      />
                      <Dropdown
                        options={[
                          "1 year",
                          "2 year",
                          "3 year",
                          "4 year",
                          "5 year",
                          "6 year",
                        ]}
                        placeholder="Work Experience Duration"
                        setOpenDropdown={setOpenDropdown}
                        isOpen={openDropdown === "workExperienceDuration"}
                        id="workExperienceDuration"
                        value={formValues.work_experience_duration}
                        onSelect={(option) =>
                          handleOptionSelect("work_experience_duration", option)
                        }
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
                        placeholder="Monthly Salary ( in hand )"
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
                        onSelect={(option) =>
                          handleOptionSelect("company_type", option)
                        }
                      />
                    </div>

                    <div className="grid grid-cols-2 w-full gap-6">
                      <Dropdown
                        options={[
                          "1 year",
                          "2 year",
                          "3 year",
                          "4 year",
                          "5 year",
                          "5 year",
                          "6 year",
                          "7 year",
                          "8 year",
                          "9 year",
                        ]}
                        placeholder="Firm Registration / Incorporation Date"
                        setOpenDropdown={setOpenDropdown}
                        isOpen={openDropdown === "firmRegistrationDate"}
                        id="firmRegistrationDate"
                        value={formValues.incorporation_date}
                        onSelect={(option) =>
                          handleOptionSelect("incorporation_date", option)
                        }
                      />
                      <Dropdown
                        options={[
                          "Proprietor",
                          "Partner",
                          "Founder",
                          "Director",
                          "Others",
                        ]}
                        placeholder="Designation"
                        setOpenDropdown={setOpenDropdown}
                        isOpen={openDropdown === "designation"}
                        id="designation"
                        value={formValues.designation_self}
                        onSelect={(option) =>
                          handleOptionSelect("designation_self", option)
                        }
                      />
                    </div>

                    <div className="grid grid-cols-2 w-full gap-6">
                      <Dropdown
                        options={[
                          "1 year",
                          "2 year",
                          "3 year",
                          "4 year",
                          "5 year",
                          "5 year",
                          "6 year",
                          "7 year",
                          "8 year",
                          "9 year",
                        ]}
                        placeholder="Years in Line of Business (VINTAGE)"
                        setOpenDropdown={setOpenDropdown}
                        isOpen={openDropdown === "lineOfBusiness"}
                        id="lineOfBusiness"
                        value={formValues.years_in_business}
                        onSelect={(option) =>
                          handleOptionSelect("years_in_business", option)
                        }
                      />
                      <Dropdown
                        options={[
                          "1 year",
                          "2 year",
                          "3 year",
                          "4 year",
                          "5 year",
                          "5 year",
                          "6 year",
                          "7 year",
                          "8 year",
                          "9 year",
                        ]}
                        placeholder="Years of ITR Filing (VINTAGE)"
                        setOpenDropdown={setOpenDropdown}
                        isOpen={openDropdown === "itrFiling"}
                        id="itrFiling"
                        value={formValues.years_of_itr_filing}
                        onSelect={(option) =>
                          handleOptionSelect("years_of_itr_filing", option)
                        }
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Property Finalised */}
              <div className="mt-10">
                <h2 className="text-xl font-bold text-white mb-4">
                  Property Finalised
                </h2>
                <div className="flex flex-col space-y-4">
                  <div className="grid grid-cols-2 w-full gap-6">
                    {/* Radio buttons for property finalised */}
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="property_finalised"
                        checked={formValues.property_finalised === "Yes"}
                        value="Yes"
                        onChange={(e) =>
                          handleRadioChange(
                            "property_finalised",
                            e.target.value
                          )
                        }
                        className="form-radio h-5 w-5 text-blue-600"
                      />
                      <span className="ml-3 text-white">Yes</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="property_finalised"
                        checked={formValues.property_finalised === "No"}
                        value="No"
                        onChange={(e) =>
                          handleRadioChange(
                            "property_finalised",
                            e.target.value
                          )
                        }
                        className="form-radio h-5 w-5 text-blue-600"
                      />
                      <span className="ml-3 text-white">No</span>
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
              <h2 className="text-xl font-bold text-white mt-6 mb-4">
              Agreement/MoU Executed
            </h2>
            <div className="grid grid-cols-2 w-full gap-6">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="agreement_executed"
                  checked={formValues.agreement_executed === "Yes"}
                  value="Yes"
                  onChange={(e) =>
                    handleRadioChange("agreement_executed", e.target.value)
                  }
                  className="form-radio h-5 w-5 text-blue-600"
                />
                <span className="ml-3 text-white">Yes</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="agreement_executed"
                  checked={formValues.agreement_executed === "No"}
                  value="No"
                  onChange={(e) =>
                    handleRadioChange("agreement_executed", e.target.value)
                  }
                  className="form-radio h-5 w-5 text-blue-600"
                />
                <span className="ml-3 text-white">No</span>
              </label>
            </div>

            {/* Conditional input for Agreement/MoU Value */}
            {formValues.agreement_executed === "Yes" && (
              <div className=" mt-6">
                <Input
                  placeholder="Agreement/MoU Value (Rs.) (if Yes)"
                  name="agreement_mou_value"
                  value={formValues.agreement_mou_value}
                  onChange={handleInputChange}
                />
              </div>
            )}

            {/* Preferred Banks */}
            <div className=" grid grid-cols-2 w-full gap-6 mt-6">
            <Input
                placeholder="Loan Amount Required (Rs.)"
                name="loan_amount_required"
                value={formValues.loan_amount_required}
                onChange={handleInputChange}
              />
              <Input
                placeholder=" Enter Your Preferred Banks "
                name="preferred_banks"
                value={formValues.preferred_banks}
                onChange={handleInputChange}
              />
            </div>
          </div>
            )}

            {/* Vehicle Loan */}
            {formValues.loan === "Vehicle Loan" && (
              <div>
              <div className="mt-10">
                <h2 className="text-xl font-bold text-white mb-4">
                  Employment Details
                </h2>
                <div className=" grid grid-cols-2 w-full gap-6">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="Salaried"
                      checked={formValues.user_type === "Salaried"}
                      onChange={handleEmploymentChange}
                      className="form-radio h-5 w-5 text-blue-600"
                    />
                    <span className="ml-3 text-white">Salaried</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="Self-Employed"
                      checked={formValues.user_type === "Self-Employed"}
                      onChange={handleEmploymentChange}
                      className="form-radio h-5 w-5 text-blue-600"
                    />
                    <span className="ml-3 text-white">
                      Self-Employed / Professional
                    </span>
                  </label>
                </div>
              </div>

              {/* Conditional Inputs */}
              <div className="mt-8">
                {formValues.user_type === "Salaried" && (
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
                        options={[
                          "Current Organisation",
                          "Previous Organisation",
                        ]}
                        placeholder="Work Experience"
                        setOpenDropdown={setOpenDropdown}
                        isOpen={openDropdown === "workExperience"}
                        id="workExperience"
                        onSelect={handleOptionSelect}
                      />
                      <Dropdown
                        options={Array.from(
                          { length: 10 },
                          (_, i) => `${i + 1} years`
                        )}
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

                {formValues.user_type === "Self-Employed" && (
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
                        options={Array.from(
                          { length: 9 },
                          (_, i) => `${i + 1} years`
                        )}
                        placeholder="Firm Registration / Incorporation Date"
                        setOpenDropdown={setOpenDropdown}
                        isOpen={openDropdown === "firmRegistrationDate"}
                        id="firmRegistrationDate"
                        onSelect={handleOptionSelect}
                      />
                      <Dropdown
                        options={[
                          "Proprietor",
                          "Partner",
                          "Founder",
                          "Director",
                          "Others",
                        ]}
                        placeholder="Designation"
                        setOpenDropdown={setOpenDropdown}
                        isOpen={openDropdown === "designation"}
                        id="designation"
                        onSelect={handleOptionSelect}
                      />
                    </div>
                    <div className="grid grid-cols-2 w-full gap-6">
                      <Dropdown
                        options={Array.from(
                          { length: 9 },
                          (_, i) => `${i + 1} years`
                        )}
                        placeholder="Years in Line of Business (VINTAGE)"
                        setOpenDropdown={setOpenDropdown}
                        isOpen={openDropdown === "lineOfBusiness"}
                        id="lineOfBusiness"
                        onSelect={handleOptionSelect}
                      />
                      <Dropdown
                        options={Array.from(
                          { length: 9 },
                          (_, i) => `${i + 1} years`
                        )}
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

              <div className="mt-10">
                <h2 className="text-xl font-bold text-white mb-4">
                  {" "}
                  Vehicle Details{" "}
                </h2>
                {/*  Vehicle details */}
                <div className="grid grid-cols-2  w-full gap-6">
                  <Input placeholder="Make and Model of Vehicle " />
                  <Input placeholder="Expected date of delivery of Vehicle " />
                </div>
                <div className="grid grid-cols-2 w-full gap-6">
                  <Input placeholder="Dealer Name " />
                  <Input placeholder="Dealer City" />
                </div>
                {/* Agreement/MoU Value */}
                <h2 className="text-xl font-bold text-white mt-6 mb-4 ">
                  Loan Details
                </h2>
                <div className="grid grid-cols-2  w-full gap-6">
                  <Input placeholder="Price of Vehicle  " />
                  <Input placeholder="Desired loan amount  " />
                </div>

                {/* Preferred Banks */}
                <div className="mt-2">
                  <Input
                    placeholder=" Enter Your Preferred Banks "
                    name="preferred_banks"
                    value={formValues.preferred_banks}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
            )}

            {/* Personal Loan */}
            {formValues.loan === "Personal Loan" && (
               <div>
               <div className="mt-10">
                 <h2 className="text-xl font-bold text-white mb-4">
                   Employment Details
                 </h2>
                 <div className="grid grid-cols-2 w-full gap-6">
                   <label className="flex items-center">
                     <input
                       type="radio"
                       name="user_type"
                       checked={formValues.user_type === "Salaried"}
                       value="Salaried"
                       onChange={(e) =>
                         handleRadioChange("user_type", e.target.value)
                       }
                       className="form-radio h-5 w-5 text-blue-600"
                     />
                     <span className="ml-3 text-white">Salaried</span>
                   </label>
                   <label className="flex items-center">
                     <input
                       type="radio"
                       name="user_type"
                       checked={formValues.user_type === "Self-Employed"}
                       value="Self-Employed"
                       onChange={(e) =>
                         handleRadioChange("user_type", e.target.value)
                       }
                       className="form-radio h-5 w-5 text-blue-600"
                     />
                     <span className="ml-3 text-white">
                       Self-Employed / Professional
                     </span>
                   </label>
                 </div>
               </div>

               <div className="mt-8">
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
                         onSelect={(option) =>
                           handleOptionSelect("organisation_type", option)
                         }
                       />
                     </div>

                     {/* Other fields */}
                     <div className="grid grid-cols-2 w-full gap-6">
                       <Dropdown
                         options={[
                           "Current Organisation",
                           "Previous Organisation",
                         ]}
                         placeholder="Work Experience"
                         setOpenDropdown={setOpenDropdown}
                         isOpen={openDropdown === "workExperience"}
                         id="workExperience"
                         value={formValues.work_experience}
                         onSelect={(option) =>
                           handleOptionSelect("work_experience", option)
                         }
                       />
                       <Dropdown
                         options={[
                           "1 year",
                           "2 year",
                           "3 year",
                           "4 year",
                           "5 year",
                           "6 year",
                         ]}
                         placeholder="Work Experience Duration"
                         setOpenDropdown={setOpenDropdown}
                         isOpen={openDropdown === "workExperienceDuration"}
                         id="workExperienceDuration"
                         value={formValues.work_experience_duration}
                         onSelect={(option) =>
                           handleOptionSelect("work_experience_duration", option)
                         }
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
                         onSelect={(option) =>
                           handleOptionSelect("company_type", option)
                         }
                       />
                     </div>

                     <div className="grid grid-cols-2 w-full gap-6">
                       <Dropdown
                         options={[
                           "1 year",
                           "2 year",
                           "3 year",
                           "4 year",
                           "5 year",
                           "5 year",
                           "6 year",
                           "7 year",
                           "8 year",
                           "9 year",
                         ]}
                         placeholder="Firm Registration / Incorporation Date"
                         setOpenDropdown={setOpenDropdown}
                         isOpen={openDropdown === "firmRegistrationDate"}
                         id="firmRegistrationDate"
                         value={formValues.incorporation_date}
                         onSelect={(option) =>
                           handleOptionSelect("incorporation_date", option)
                         }
                       />
                       <Dropdown
                         options={[
                           "Proprietor",
                           "Partner",
                           "Founder",
                           "Director",
                           "Others",
                         ]}
                         placeholder="Designation"
                         setOpenDropdown={setOpenDropdown}
                         isOpen={openDropdown === "designation"}
                         id="designation"
                         value={formValues.designation_self}
                         onSelect={(option) =>
                           handleOptionSelect("designation_self", option)
                         }
                       />
                     </div>

                     <div className="grid grid-cols-2 w-full gap-6">
                       <Dropdown
                         options={[
                           "1 year",
                           "2 year",
                           "3 year",
                           "4 year",
                           "5 year",
                           "5 year",
                           "6 year",
                           "7 year",
                           "8 year",
                           "9 year",
                         ]}
                         placeholder="Years in Line of Business (VINTAGE)"
                         setOpenDropdown={setOpenDropdown}
                         isOpen={openDropdown === "lineOfBusiness"}
                         id="lineOfBusiness"
                         value={formValues.years_in_business}
                         onSelect={(option) =>
                           handleOptionSelect("years_in_business", option)
                         }
                       />
                       <Dropdown
                         options={[
                           "1 year",
                           "2 year",
                           "3 year",
                           "4 year",
                           "5 year",
                           "5 year",
                           "6 year",
                           "7 year",
                           "8 year",
                           "9 year",
                         ]}
                         placeholder="Years of ITR Filing (VINTAGE)"
                         setOpenDropdown={setOpenDropdown}
                         isOpen={openDropdown === "itrFiling"}
                         id="itrFiling"
                         value={formValues.years_of_itr_filing}
                         onSelect={(option) =>
                           handleOptionSelect("years_of_itr_filing", option)
                         }
                       />
                     </div>
                   </div>
                 )}
               </div>

             {/* Preferred Banks */}
             <div className=" grid grid-cols-2 w-full gap-6 mt-6">
             <Input
                 placeholder="Loan Amount Required (Rs.)"
                 name="loan_amount_required"
                 value={formValues.loan_amount_required}
                 onChange={handleInputChange}
               />
               <Input
                 placeholder=" Enter Your Preferred Banks "
                 name="preferred_banks"
                 value={formValues.preferred_banks}
                 onChange={handleInputChange}
               />
             </div>
           </div>
            )}

            {/* Business Loan */}
            {formValues.loan === "Business Loan" && (
              <div>
                <div className="mt-10">
                  <h2 className="text-xl font-bold text-white mb-4">
                    Details of Application Firm
                  </h2>
                </div>

                <div className="mt-8">
                  <div className="grid grid-cols-2 w-full gap-6">
                    <Input
                      placeholder="Name of Firm/Company"
                      name="company_name"
                      value={formValues.company_name}
                      onChange={handleInputChange}
                    />
                    <Dropdown
                      options={[
                        "Pvt Ltd Company",
                        "Unlisted Public Limited Company",
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
                      onSelect={(option) =>
                        handleOptionSelect("company_type", option)
                      }
                    />
                  </div>

                  <div className="grid grid-cols-2 w-full gap-6 mt-6">
                    <Dropdown
                      options={[
                        "1 year",
                        "2 years",
                        "3 years",
                        "4 years",
                        "5 years",
                        "6 years",
                        "7 years",
                        "8 years",
                        "9 years+",
                      ]}
                      placeholder="Firm Registration / Incorporation Date"
                      setOpenDropdown={setOpenDropdown}
                      isOpen={openDropdown === "firmRegistrationDate"}
                      id="firmRegistrationDate"
                      value={formValues.incorporation_date}
                      onSelect={(option) =>
                        handleOptionSelect("incorporation_date", option)
                      }
                    />
                    <Input
                      placeholder="Name of Director"
                      name="Name_of_Directors"
                      value={formValues.Name_of_Directors}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="grid grid-cols-2 w-full gap-6 mt-6">
                    <Dropdown
                      options={[
                        "1 year",
                        "2 years",
                        "3 years",
                        "4 years",
                        "5 years",
                        "6 years",
                        "7 years",
                        "8 years",
                        "9 years+",
                      ]}
                      placeholder="Years in Line of Business (VINTAGE)"
                      setOpenDropdown={setOpenDropdown}
                      isOpen={openDropdown === "lineOfBusiness"}
                      id="lineOfBusiness"
                      value={formValues.years_in_business}
                      onSelect={(option) =>
                        handleOptionSelect("years_in_business", option)
                      }
                    />
                    <Dropdown
                      options={[
                        "Manufacturing",
                        "Trade",
                        "Service Sector",
                        "Others",
                      ]}
                      placeholder="Type of Business"
                      setOpenDropdown={setOpenDropdown}
                      isOpen={openDropdown === "typeofbusiness"}
                      id="typeofbusiness"
                      value={formValues.type_of_business}
                      onSelect={(option) =>
                        handleOptionSelect("type_of_business", option)
                      }
                    />
                  </div>
                </div>

                {/* Property Finalised */}
                <div className="mt-10">
                  <h2 className="text-xl font-bold text-white mb-4">
                    Property Finalised
                  </h2>
                  <div className="flex flex-col space-y-4">
                    <div className="grid grid-cols-2 w-full gap-6">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="property_finalised"
                          checked={formValues.property_finalised === "Yes"}
                          value="Yes"
                          onChange={(e) =>
                            handleRadioChange("property_finalised", e.target.value)
                          }
                          className="form-radio h-5 w-5 text-blue-600"
                        />
                        <span className="ml-3 text-white">Yes</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="property_finalised"
                          checked={formValues.property_finalised === "No"}
                          value="No"
                          onChange={(e) =>
                            handleRadioChange("property_finalised", e.target.value)
                          }
                          className="form-radio h-5 w-5 text-blue-600"
                        />
                        <span className="ml-3 text-white">No</span>
                      </label>
                    </div>
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
                <h2 className="text-xl font-bold text-white mt-6 mb-4">
                  Agreement/MoU Executed
                </h2>
                <div className="grid grid-cols-2 w-full gap-6">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="agreement_executed"
                      checked={formValues.agreement_executed === "Yes"}
                      value="Yes"
                      onChange={(e) =>
                        handleRadioChange("agreement_executed", e.target.value)
                      }
                      className="form-radio h-5 w-5 text-blue-600"
                    />
                    <span className="ml-3 text-white">Yes</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="agreement_executed"
                      checked={formValues.agreement_executed === "No"}
                      value="No"
                      onChange={(e) =>
                        handleRadioChange("agreement_executed", e.target.value)
                      }
                      className="form-radio h-5 w-5 text-blue-600"
                    />
                    <span className="ml-3 text-white">No</span>
                  </label>
                </div>

                {/* Conditional input for Agreement/MoU Value */}
                {formValues.agreement_executed === "Yes" && (
                  <div className="mt-6">
                    <Input
                      placeholder="Agreement/MoU Value (Rs.) (if Yes)"
                      name="agreement_mou_value"
                      value={formValues.agreement_mou_value}
                      onChange={handleInputChange}
                    />
                  </div>
                )}

                {/* Preferred Banks */}
                <div className="grid grid-cols-2 w-full gap-6 mt-6">
                  <Input
                    placeholder="Loan Amount Required (Rs.)"
                    name="loan_amount_required"
                    value={formValues.loan_amount_required}
                    onChange={handleInputChange}
                  />
                  <Input
                    placeholder="Enter Your Preferred Banks"
                    name="preferred_banks"
                    value={formValues.preferred_banks}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            )}

            {/* Mortgage Loan */}
            {formValues.loan === "Mortgage Loan" && (
               <div>
               <div className="mt-10">
                 <h2 className="text-xl font-bold text-white mb-4">
                   Employment Details
                 </h2>
                 <div className="grid grid-cols-2 w-full gap-6">
                   <label className="flex items-center">
                     <input
                       type="radio"
                       name="user_type"
                       checked={formValues.user_type === "Salaried"}
                       value="Salaried"
                       onChange={(e) =>
                         handleRadioChange("user_type", e.target.value)
                       }
                       className="form-radio h-5 w-5 text-blue-600"
                     />
                     <span className="ml-3 text-white">Salaried</span>
                   </label>
                   <label className="flex items-center">
                     <input
                       type="radio"
                       name="user_type"
                       checked={formValues.user_type === "Self-Employed"}
                       value="Self-Employed"
                       onChange={(e) =>
                         handleRadioChange("user_type", e.target.value)
                       }
                       className="form-radio h-5 w-5 text-blue-600"
                     />
                     <span className="ml-3 text-white">
                       Self-Employed / Professional
                     </span>
                   </label>
                 </div>
               </div>

               <div className="mt-8">
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
                         onSelect={(option) =>
                           handleOptionSelect("organisation_type", option)
                         }
                       />
                     </div>

                     {/* Other fields */}
                     <div className="grid grid-cols-2 w-full gap-6">
                       <Dropdown
                         options={[
                           "Current Organisation",
                           "Previous Organisation",
                         ]}
                         placeholder="Work Experience"
                         setOpenDropdown={setOpenDropdown}
                         isOpen={openDropdown === "workExperience"}
                         id="workExperience"
                         value={formValues.work_experience}
                         onSelect={(option) =>
                           handleOptionSelect("work_experience", option)
                         }
                       />
                       <Dropdown
                         options={[
                           "1 year",
                           "2 year",
                           "3 year",
                           "4 year",
                           "5 year",
                           "5 year",
                         ]}
                         placeholder="Work Experience Duration"
                         setOpenDropdown={setOpenDropdown}
                         isOpen={openDropdown === "workExperienceDuration"}
                         id="workExperienceDuration"
                         value={formValues.work_experience_duration}
                         onSelect={(option) =>
                           handleOptionSelect("work_experience_duration", option)
                         }
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
                         onSelect={(option) =>
                           handleOptionSelect("company_type", option)
                         }
                       />
                     </div>

                     <div className="grid grid-cols-2 w-full gap-6">
                       <Dropdown
                         options={[
                           "1 year",
                           "2 year",
                           "3 year",
                           "4 year",
                           "5 year",
                           "5 year",
                           "6 year",
                           "7 year",
                           "8 year",
                           "9 year",
                         ]}
                         placeholder="Firm Registration / Incorporation Date"
                         setOpenDropdown={setOpenDropdown}
                         isOpen={openDropdown === "firmRegistrationDate"}
                         id="firmRegistrationDate"
                         value={formValues.incorporation_date}
                         onSelect={(option) =>
                           handleOptionSelect("incorporation_date", option)
                         }
                       />
                       <Dropdown
                         options={[
                           "Proprietor",
                           "Partner",
                           "Founder",
                           "Director",
                           "Others",
                         ]}
                         placeholder="Designation"
                         setOpenDropdown={setOpenDropdown}
                         isOpen={openDropdown === "designation"}
                         id="designation"
                         value={formValues.designation_self}
                         onSelect={(option) =>
                           handleOptionSelect("designation_self", option)
                         }
                       />
                     </div>

                     <div className="grid grid-cols-2 w-full gap-6">
                       <Dropdown
                         options={[
                           "1 year",
                           "2 year",
                           "3 year",
                           "4 year",
                           "5 year",
                           "5 year",
                           "6 year",
                           "7 year",
                           "8 year",
                           "9 year",
                         ]}
                         placeholder="Years in Line of Business (VINTAGE)"
                         setOpenDropdown={setOpenDropdown}
                         isOpen={openDropdown === "lineOfBusiness"}
                         id="lineOfBusiness"
                         value={formValues.years_in_business}
                         onSelect={(option) =>
                           handleOptionSelect("years_in_business", option)
                         }
                       />
                       <Dropdown
                         options={[
                           "1 year",
                           "2 year",
                           "3 year",
                           "4 year",
                           "5 year",
                           "5 year",
                           "6 year",
                           "7 year",
                           "8 year",
                           "9 year",
                         ]}
                         placeholder="Years of ITR Filing (VINTAGE)"
                         setOpenDropdown={setOpenDropdown}
                         isOpen={openDropdown === "itrFiling"}
                         id="itrFiling"
                         value={formValues.years_of_itr_filing}
                         onSelect={(option) =>
                           handleOptionSelect("years_of_itr_filing", option)
                         }
                       />
                     </div>
                   </div>
                 )}
               </div>

               {/* Property Finalised */}
               <div className="mt-10">
                 <h2 className="text-xl font-bold text-white mb-4">
                   Property Finalised
                 </h2>
                 <div className="flex flex-col space-y-4">
                   <div className="grid grid-cols-2 w-full gap-6">
                     {/* Radio buttons for property finalised */}
                     <label className="flex items-center">
                       <input
                         type="radio"
                         name="property_finalised"
                         checked={formValues.property_finalised === "Yes"}
                         value="Yes"
                         onChange={(e) =>
                           handleRadioChange(
                             "property_finalised",
                             e.target.value
                           )
                         }
                         className="form-radio h-5 w-5 text-blue-600"
                       />
                       <span className="ml-3 text-white">Yes</span>
                     </label>
                     <label className="flex items-center">
                       <input
                         type="radio"
                         name="property_finalised"
                         checked={formValues.property_finalised === "No"}
                         value="No"
                         onChange={(e) =>
                           handleRadioChange(
                             "property_finalised",
                             e.target.value
                           )
                         }
                         className="form-radio h-5 w-5 text-blue-600"
                       />
                       <span className="ml-3 text-white">No</span>
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
               <h2 className="text-xl font-bold text-white mt-6 mb-4">
               Agreement/MoU Executed
             </h2>
             <div className="grid grid-cols-2 w-full gap-6">
               <label className="flex items-center">
                 <input
                   type="radio"
                   name="agreement_executed"
                   checked={formValues.agreement_executed === "Yes"}
                   value="Yes"
                   onChange={(e) =>
                     handleRadioChange("agreement_executed", e.target.value)
                   }
                   className="form-radio h-5 w-5 text-blue-600"
                 />
                 <span className="ml-3 text-white">Yes</span>
               </label>
               <label className="flex items-center">
                 <input
                   type="radio"
                   name="agreement_executed"
                   checked={formValues.agreement_executed === "No"}
                   value="No"
                   onChange={(e) =>
                     handleRadioChange("agreement_executed", e.target.value)
                   }
                   className="form-radio h-5 w-5 text-blue-600"
                 />
                 <span className="ml-3 text-white">No</span>
               </label>
             </div>

             {/* Conditional input for Agreement/MoU Value */}
             {formValues.agreement_executed === "Yes" && (
               <div className=" mt-6">
                 <Input
                   placeholder="Agreement/MoU Value (Rs.) (if Yes)"
                   name="agreement_mou_value"
                   value={formValues.agreement_mou_value}
                   onChange={handleInputChange}
                 />
               </div>
             )}

             {/* Preferred Banks */}
             <div className=" grid grid-cols-2 w-full gap-6 mt-6">
             <Input
                 placeholder="Loan Amount Required (Rs.)"
                 name="loan_amount_required"
                 value={formValues.loan_amount_required}
                 onChange={handleInputChange}
               />
               <Input
                 placeholder=" Enter Your Preferred Banks "
                 name="preferred_banks"
                 value={formValues.preferred_banks}
                 onChange={handleInputChange}
               />
             </div>
           </div>

            )}

            {/* Submit Button */}
            <div>
              <Link to={getNavigationPath()}>
                <Button
                  type="submit"
                  text="Submit"
                  className="mt-6"
                  disabled={getNavigationPath() === "#"}
                />
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormTwo;

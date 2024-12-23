import React from 'react'

export default function Home() {
  return (
    <div>
                 <div className="mt-10 mx-12">
                   <h2 className="text-xl font-bold text-gray-900 mb-4">
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
                       <span className="ml-3 text-gray-900">Salaried</span>
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
                       <span className="ml-3 text-gray-900">
                         Self-Employed/Professional
                       </span>
                     </label>
                   </div>
                 </div>
   
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
                           placeholder="Firm Registration/Incorporation Date"
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
                 <div className="mt-10 mx-12">
                   <h2 className="text-xl font-bold text-gray-900 mb-4">
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
                         <span className="ml-3 text-gray-900">Yes</span>
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
                 <h2 className="text-xl font-bold text-gray-900 mt-6 mb-4">
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
                     <span className="ml-3 text-gray-900">Yes</span>
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
                     placeholder=" Enter Your Preferred Banks "
                     name="preferred_banks"
                     value={formValues.preferred_banks}
                     onChange={handleInputChange}
                   />
                 </div>
               </div>
  )
}

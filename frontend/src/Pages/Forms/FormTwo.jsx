// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import Input from "../../components/form/Input.jsx";
// import Dropdown from "../../components/form/Dropdown.jsx";
// import Button from "../../components/form/Button.jsx";
// import { FaUser } from "react-icons/fa";
// import { FaBookOpen } from "react-icons/fa6";
// import { IoDocuments } from "react-icons/io5";
// import axios from "axios";

// const FormTwo = () => {
//   const [openDropdown, setOpenDropdown] = useState(null);
//   // const [employmentType, setEmploymentType] = useState("");
//   const navigate = useNavigate();
//   const [formValues, setFormValues] = useState({
//     user_type: "",
//     organisation_name: "",
//     designation_salaried: "",
//     organisation_type: "",
//     currentOrganizationExperience: "",
//     previousOrganizationExperience: "",
//     monthly_salary: "",
//     place_of_posting: "",
//     salary_bank_name: "",
//     company_name: "",
//     company_type: "",
//     incorporation_date: "",
//     designation_self: "",
//     years_in_business: "",
//     years_of_itr_filing: "",
//     property_finalised: "",
//     property_address: "",
//     agreement_executed: "",
//     agreement_mou_value: "",
//     loan_amount_required: "",
//     preferred_banks: "",
//     vehicleModel: "",
//     expectedDeliveryDate: "",
//     dealerName: "",
//     dealerCity: "",
//     vehiclePrice: "",
//   });

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormValues((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//     console.log(`Updated ${name}:`, value);
//   };

//   const handleEmploymentChange = (event) => {
//     setFormValues((prevState) => ({
//       ...prevState,
//       user_type: event.target.value,
//     }));
//     console.log(`Selected user_type:`, event.target.value);
//   };

//   const handleOptionSelect = (name, option) => {
//     setFormValues({ ...formValues, [name]: option });
//     console.log(`Selected ${name}:`, option);
//   };

//   const handleRadioChange = (name, value) => {
//     setFormValues((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//     console.log(`Selected ${name}:`, value);
//   };

//   const getNavigationPath = () => {
//     const { loan, user_type } = formValues;
  
//     const paths = {
//       "Home Loan": {
//         Salaried: "/form-details-three?loan_type=home&user_type=salaried",
//         "Self-Employed": "/form-details-three?loan_type=home&user_type=self_employed",
//       },
//       "Vehicle Loan": {
//         Salaried: "/form-details-three?loan_type=vehicle&user_type=salaried",
//         "Self-Employed": "/form-details-three?loan_type=vehicle&user_type=self_employed",
//       },
//       "Personal Loan": {
//           Salaried: "/form-details-three?loan_type=personal&user_type=salaried",
//         "Self-Employed": "/form-details-three?loan_type=personal&user_type=self_employed",
//       },
//       "Business Loan": {
//          "": "/form-details-three?loan_type=business&user_type=/",
//       },
//       "Mortgage Loan": {
//         Salaried: "/form-details-three?loan_type=mortgage&user_type=salaried",
//         "Self-Employed": "/form-details-three?loan_type=mortgage&user_type=self_employed",
//       },
//     };
  
//     // Use optional chaining and nullish coalescing for safety
//     return paths[loan]?.[user_type] ?? "#";
//   };



//   const handleSubmit = async () => {
//     e.preventDefault(); // Prevent default form submission behavior
//     let user_type = formValues.user_type;
//     //if loan type is business loan set user_type to empty as we did in form values
//       if(formValues.loan === "Business Loan"){
//         user_type = "";
//       }
//       const formData = {
//         loanType: formValues.loan, // Use formValues
//         user_type: user_type, // Add user_type

//       // Conditional data based on loan type
//     ...(formValues.loan === "Home Loan" && {
//       homeDetails: {
//         employmentType: formValues.user_type,
//         salariedDetails: formValues.user_type === "Salaried" ? {
//             organizationName: formValues.organisation_name,
//             organizationType: formValues.organisation_type,
//             currentOrganizationExperience: formValues.currentOrganizationExperience,
//             previousOrganizationExperience: formValues.previousOrganizationExperience,
//              designation_salaried: formValues.designation_salaried,
//              place_of_posting: formValues.place_of_posting,
//              monthly_salary: formValues.monthly_salary,
//             salary_bank_name: formValues.salary_bank_name,
//         } : {},
//         selfEmployedDetails: formValues.user_type === "Self-Employed" ? {
//             company_name: formValues.company_name,
//             company_type: formValues.company_type,
//            incorporation_date: formValues.incorporation_date,
//            designation_self: formValues.designation_self,
//            years_in_business: formValues.years_in_business,
//            years_of_itr_filing: formValues.years_of_itr_filing,
//         } : {},
//         loanAmountRequired: formValues.loan_amount_required,
//         propertyFinalized: formValues.property_finalised,
//         propertyAddress: formValues.property_address,
//         agreementExecuted: formValues.agreement_executed,
//         agreementValue: formValues.agreement_mou_value,
//         preferredBank: formValues.preferred_banks,
//       },
//     }),

//     ...(formValues.loan === "Vehicle Loan" && {
//       vehicleDetails: {
//         employmentType: formValues.user_type,
//         salariedDetails: formValues.user_type === "Salaried" ? {
//           organizationName: formValues.organisation_name,
//           organizationType: formValues.organisation_type,
//           currentOrganizationExperience: formValues.currentOrganizationExperience,
//           previousOrganizationExperience: formValues.previousOrganizationExperience,
//           designation_salaried: formValues.designation_salaried,
//           place_of_posting: formValues.place_of_posting,
//           monthly_salary: formValues.monthly_salary,
//           salary_bank_name: formValues.salary_bank_name,
//         } : {},
//         selfEmployedDetails: formValues.user_type === "Self-Employed" ? {
//           company_name: formValues.company_name,
//           company_type: formValues.company_type,
//           incorporation_date: formValues.incorporation_date,
//           designation_self: formValues.designation_self,
//           years_in_business: formValues.years_in_business,
//           years_of_itr_filing: formValues.years_of_itr_filing,
//         } : {},
//         vehicleModel: formValues.vehicleModel,
//         expectedDeliveryDate: formValues.expectedDeliveryDate,
//         dealerName: formValues.dealerName,
//         dealerCity: formValues.dealerCity,
//         vehiclePrice: formValues.vehiclePrice,
//         loanAmountRequired: formValues.loan_amount_required,
//         preferredBank: formValues.preferred_banks,
//       },
//     }),
      
//     ...(formValues.loan === "Business Loan" && {
//       businessDetails: {
//         applicationFirm: {
//           company_name: formValues.company_name,
//           company_type: formValues.company_type,
//           incorporation_date: formValues.incorporation_date,
//           nameOfDirector: formValues.Name_of_Directors, 
//           years_in_business: formValues.years_in_business,
//           years_of_itr_filing: formValues.years_of_itr_filing, 
//         },
//         propertyFinalized: formValues.property_finalised,
//         propertyAddress: formValues.property_address,
//         agreementExecuted: formValues.agreement_executed,
//         agreementValue: formValues.agreement_mou_value,
//         loanAmountRequired: formValues.loan_amount_required,
//         preferredBank: formValues.preferred_banks,
//       },
//     }),
//     ...(formValues.loan === "Personal Loan" && {
//       personalDetails: {
//        employmentType: formValues.user_type,
//     salariedDetails: formValues.user_type === "Salaried" ? {
//         organizationName: formValues.organisation_name,
//         organizationType: formValues.organisation_type,
//         currentOrganizationExperience: formValues.currentOrganizationExperience,
//         previousOrganizationExperience: formValues.previousOrganizationExperience,
//         designation_salaried: formValues.designation_salaried,  
//         place_of_posting: formValues.place_of_posting,
//         monthly_salary: formValues.monthly_salary,
//         salary_bank_name: formValues.salary_bank_name,
//     } : {},
//     selfEmployedDetails: formValues.user_type === "Self-Employed" ? {
//       company_name: formValues.company_name,
//       company_type: formValues.company_type,
//       incorporation_date: formValues.incorporation_date,
//       designation_self: formValues.designation_self,
//       years_in_business: formValues.years_in_business,
//       years_of_itr_filing: formValues.years_of_itr_filing,
//     } : {},
//     loanAmountRequired: formValues.loan_amount_required,
//     preferredBank: formValues.preferred_banks,
//       },
//     }),
//     ...(formValues.loan === "Mortgage Loan" && {
//       mortgageDetails: {
//         employmentType: formValues.user_type,
//     salariedDetails: formValues.user_type === "Salaried" ? {
//         organizationName: formValues.organisation_name,
//         organizationType: formValues.organisation_type,
//         currentOrganizationExperience: formValues.currentOrganizationExperience,
//         previousOrganizationExperience: formValues.previousOrganizationExperience,
//         designation_salaried: formValues.designation_salaried,  
//         place_of_posting: formValues.place_of_posting,
//         monthly_salary: formValues.monthly_salary,
//         salary_bank_name: formValues.salary_bank_name,
//     } : {},
//     selfEmployedDetails: formValues.user_type === "Self-Employed" ? {
//       company_name: formValues.company_name,
//       company_type: formValues.company_type,
//       incorporation_date: formValues.incorporation_date,
//       designation_self: formValues.designation_self,
//       years_in_business: formValues.years_in_business,
//       years_of_itr_filing: formValues.years_of_itr_filing,
//     } : {},
//        propertyFinalized: formValues.property_finalised,
//     propertyAddress: formValues.property_address,
//     agreementExecuted: formValues.agreement_executed,
//     agreementValue: formValues.agreement_mou_value,
//     loanAmountRequired: formValues.loan_amount_required,
//     preferredBank: formValues.preferred_banks,
//       },
//     }),

//   };
  
//       try {
//           const response = await axios.post(
//               `${import.meta.env.VITE_API_URL}/form-two`,
//               formData,
//               {
//                   headers: {
//                       "Content-Type": "application/json",
//                   },
//               }
//           );
  
//           if (response.status === 200) {
//             alert("Loan application submitted successfully");

//             const navigationPath = getNavigationPath();
//             if (navigationPath !== "#") {
//                 navigate(navigationPath); 
//             } else {
//                 alert("Invalid loan type or user type.");
//             }
//         } else {
//             alert("Error: " + response.data.message);
//         }
//       } catch (error) {
//         console.error("Error submitting the form:", error);
//         alert("Error submitting the form. Please try again.");
//       }
//   };
  


//   return (
//     <div className="min-h-screen bg-[#010349f0] text-gray-900 flex flex-col lg:flex-row">
//       {/* Horizontal Line */}
//       <div className="absolute mt-20 md:mt-32 w-full h-1 bg-[#9ea0e5e7]"></div>
//       {/* Sidebar */}
//       <div className="w-full lg:w-1/4 py-10 px-4 lg:pl-16 flex flex-col shadow-xl relative rounded-r-3xl">
//         <h2 className="text-2xl lg:text-3xl font-bold mb-8 lg:mb-14 text-white tracking-wide text-center -mt-3">
//           Application Process
//         </h2>
//         <ul className="relative mr-10">
//           {/* Vertical Timeline Line */}
//           <div className="absolute right-6 top-12 bottom-0 w-1 bg-[#9ea0c5e7] mb-3"></div>

//           {/* Step 1: Personal Information */}
//           <li className="flex items-center justify-end space-x-6 mb-12 lg:mb-16 cursor-pointer relative group">
//             <span className="text-lg lg:text-xl font-medium text-white group-hover:text-[#26cc88] transition-colors text-right mt-4">
//               Personal Information
//               <div className="text-sm">Browse and Upload</div>
//             </span>
//             <div className="z-10 w-10 h-10 lg:w-12 lg:h-12 mt-4 flex items-center justify-center bg-[#484a7b] rounded-full text-black font-bold shadow-lg transition-transform transform group-hover:scale-110 group-hover:rotate-6">
//               <FaUser className="text-white w-5 h-5 lg:w-6 lg:h-6" />
//             </div>
//           </li>

//           {/* Step 2: Employment Status */}
//           <li className="flex items-center justify-end space-x-6 mb-12 lg:mb-16 cursor-pointer relative group">
//             <span className="text-lg lg:text-xl font-medium text-[#26cc88] group-hover:text-[#26cc88] transition-colors text-right">
//               Employment Status
//               <div className="text-sm">Browse and Upload</div>
//             </span>
//             <div className="z-10 w-10 h-10 lg:w-12 lg:h-12 flex items-center justify-center bg-[#26cc88] rounded-full text-white font-bold shadow-lg transition-transform transform group-hover:scale-110 group-hover:rotate-6">
//               <FaBookOpen className="text-white w-5 h-5 lg:w-6 lg:h-6" />
//             </div>
//           </li>

//           {/* Step 3: Documents */}
//           <li className="flex items-center justify-end space-x-6 cursor-pointer relative group">
//             <span className="text-lg lg:text-xl font-medium text-white group-hover:text-[#26cc88] transition-colors text-right">
//               Documents
//               <div className="text-sm">Browse and Upload</div>
//             </span>
//             <div className="z-10 w-10 h-10 lg:w-12 lg:h-12 flex items-center justify-center bg-[#484a7b] rounded-full text-white font-bold shadow-lg transition-transform transform group-hover:scale-110 group-hover:rotate-6">
//               <IoDocuments className="text-white w-5 h-5 lg:w-6 lg:h-6" />
//             </div>
//           </li>
//         </ul>

//         {/* Vertical Line on the Right End */}
//         <div className="hidden lg:block absolute top-[8rem] right-0 h-screen w-1 bg-[#b1b3d7ef]">
//           <div className="absolute top-[3.5rem] left-1/2 transform -translate-x-1/2 w-4 h-4 bg-[#484a7b] border-4 border-[#383a69] rounded-full"></div>
//           <div className="absolute top-[10.5rem] left-1/2 transform -translate-x-1/2 w-3.5 h-3.5 bg-[#26cc88] rounded-full"></div>
//           <div className="absolute top-[17.5rem] left-1/2 transform -translate-x-1/2 w-4 h-4 bg-[#484a7b] border-4 border-[#383a69] rounded-full"></div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="w-full lg:w-3/4 p-4 lg:p-10 -mt-2">
//       <h1 className="text-2xl ml-12 lg:text-3xl text-white font-bold mb-3 lg:mb-3">
//           Loan Application
//         </h1>
//         <p className="text-white ml-12 mb-8 lg:mb-11">
//           Set up your account for your loan application
//         </p>
//         <form onSubmit={handleSubmit}>
//           <div className="mx-4 lg:mx-12 mt-4">
//             <div className="grid grid-cols-2 w-full">
//               <Dropdown
//                 options={["Home Loan", "Vehicle Loan", "Business Loan", "Personal Loan", "Mortgage Loan"]}
//                 placeholder="Loan Type"
//                 setOpenDropdown={setOpenDropdown}
//                 isOpen={openDropdown === "loan"}
//                 id="loan"
//                 value={formValues.loan}
//                 onSelect={(option) => handleOptionSelect("loan", option)}
//               />
//             </div>

//             {/* Home Loan */}
//             {formValues.loan === "Home Loan" && (
//               <div>
//               <div className="mt-10">
//                 <h2 className="text-xl font-bold text-white mb-4">
//                   Employment Details
//                 </h2>
//                 <div className="grid grid-cols-2 w-full gap-6">
//                   <label className="flex items-center">
//                     <input
//                       type="radio"
//                       name="user_type"
//                       checked={formValues.user_type === "Salaried"}
//                       value="Salaried"
//                       onChange={(e) =>
//                         handleRadioChange("user_type", e.target.value)
//                       }
//                       className="form-radio h-5 w-5 text-blue-600"
//                     />
//                     <span className="ml-3 text-white">Salaried</span>
//                   </label>
//                   <label className="flex items-center">
//                     <input
//                       type="radio"
//                       name="user_type"
//                       checked={formValues.user_type === "Self-Employed"}
//                       value="Self-Employed"
//                       onChange={(e) =>
//                         handleRadioChange("user_type", e.target.value)
//                       }
//                       className="form-radio h-5 w-5 text-blue-600"
//                     />
//                     <span className="ml-3 text-white">
//                       Self-Employed / Professional
//                     </span>
//                   </label>
//                 </div>
//               </div>

//               <div className="mt-8">
//                 {formValues.user_type === "Salaried" && (
//                   <div>
//                     <div className="grid grid-cols-2 w-full gap-6">
//                       <Input
//                         placeholder="Organisation Name"
//                         name="organisation_name"
//                         value={formValues.organisation_name}
//                         onChange={handleInputChange}
//                       />
//                       <Dropdown
//                         options={[
//                           "Central Govt.",
//                           "State Govt.",
//                           "Govt. Organisation",
//                           "PSU",
//                           "Private Limited Company",
//                           "Public Limited Company",
//                           "Partnership Firm",
//                           "Proprietary Firm",
//                           "LLP",
//                           "Others",
//                         ]}
//                         placeholder="Organisation Type"
//                         setOpenDropdown={setOpenDropdown}
//                         isOpen={openDropdown === "organisationType"}
//                         id="organisationType"
//                         value={formValues.organisation_type}
//                         onSelect={(option) =>
//                           handleOptionSelect("organisation_type", option)
//                         }
//                       />
//                     </div>
//                     <div className="grid grid-cols-2 w-full gap-6">
//                       <Input
//                         placeholder="Experience in Current Organization"
//                         name="currentOrganizationExperience"
//                         value={formValues.currentOrganizationExperience}
//                         onChange={handleInputChange}
//                       />
//                       <Input
//                         placeholder="Experience in Previous Organization "
//                         name="previousOrganizationExperience"
//                         value={formValues.previousOrganizationExperience}
//                         onChange={handleInputChange}
//                       />
//                     </div>

//                     <div className="grid grid-cols-2 w-full gap-6">
//                       <Input
//                         placeholder="Designation"
//                         name="designation_salaried"
//                         value={formValues.designation_salaried}
//                         onChange={handleInputChange}
//                       />
//                       <Input
//                         placeholder="Place of Posting"
//                         name="place_of_posting"
//                         value={formValues.place_of_posting}
//                         onChange={handleInputChange}
//                       />
//                     </div>

//                     <div className="grid grid-cols-2 w-full gap-6">
//                       <Input
//                         placeholder="Monthly Salary ( in hand )"
//                         name="monthly_salary"
//                         value={formValues.monthly_salary}
//                         onChange={handleInputChange}
//                       />
//                       <Input
//                         placeholder="Bank in which salary account is maintained"
//                         name="salary_bank_name"
//                         value={formValues.salary_bank_name}
//                         onChange={handleInputChange}
//                       />
//                     </div>
//                   </div>
//                 )}

//                 {formValues.user_type === "Self-Employed" && (
//                   <div>
//                     <div className="grid grid-cols-2 w-full gap-6">
//                       <Input
//                         placeholder="Name of Firm/Company"
//                         name="company_name"
//                         value={formValues.company_name}
//                         onChange={handleInputChange}
//                       />
//                       <Dropdown
//                         options={[
//                           "Company",
//                           "Partnership Firm",
//                           "Proprietary Firm",
//                           "LLP",
//                           "Others",
//                         ]}
//                         placeholder="Type of Firm"
//                         setOpenDropdown={setOpenDropdown}
//                         isOpen={openDropdown === "typeOfFirm"}
//                         id="typeOfFirm"
//                         value={formValues.company_type}
//                         onSelect={(option) =>
//                           handleOptionSelect("company_type", option)
//                         }
//                       />
//                     </div>

//                     <div className="grid grid-cols-2 w-full gap-6">
//                     <Input
//                         placeholder="Firm Registration / Incorporation Date"
//                         name="incorporation_date"
//                         value={formValues.incorporation_date}
//                         onChange={handleInputChange}
//                       />
//                       <Dropdown
//                         options={[
//                           "Proprietor",
//                           "Partner",
//                           "Founder",
//                           "Director",
//                           "Others",
//                         ]}
//                         placeholder="Designation"
//                         setOpenDropdown={setOpenDropdown}
//                         isOpen={openDropdown === "designation"}
//                         id="designation"
//                         value={formValues.designation_self}
//                         onSelect={(option) =>
//                           handleOptionSelect("designation_self", option)
//                         }
//                       />
//                     </div>

//                     <div className="grid grid-cols-2 w-full gap-6">
//                     <Input
//                         placeholder="Years in Line of Business (VINTAGE)"
//                         name="years_in_business"
//                         value={formValues.years_in_business}
//                         onChange={handleInputChange}
//                       />
//                       <Input
//                         placeholder="Years of ITR Filing (VINTAGE)"
//                         name="years_of_itr_filing"
//                         value={formValues.years_of_itr_filing}
//                         onChange={handleInputChange}
//                       />
//                     </div>
//                   </div>
//                 )}
//               </div>

//               {/* Property Finalised */}
//               <div className="mt-10">
//                 <h2 className="text-xl font-bold text-white mb-4">
//                   Property Finalised
//                 </h2>
//                 <div className="flex flex-col space-y-4">
//                   <div className="grid grid-cols-2 w-full gap-6">
//                     {/* Radio buttons for property finalised */}
//                     <label className="flex items-center">
//                       <input
//                         type="radio"
//                         name="property_finalised"
//                         checked={formValues.property_finalised === "Yes"}
//                         value="Yes"
//                         onChange={(e) =>
//                           handleRadioChange(
//                             "property_finalised",
//                             e.target.value
//                           )
//                         }
//                         className="form-radio h-5 w-5 text-blue-600"
//                       />
//                       <span className="ml-3 text-white">Yes</span>
//                     </label>
//                     <label className="flex items-center">
//                       <input
//                         type="radio"
//                         name="property_finalised"
//                         checked={formValues.property_finalised === "No"}
//                         value="No"
//                         onChange={(e) =>
//                           handleRadioChange(
//                             "property_finalised",
//                             e.target.value
//                           )
//                         }
//                         className="form-radio h-5 w-5 text-blue-600"
//                       />
//                       <span className="ml-3 text-white">No</span>
//                     </label>
//                   </div>
//                   {/* Conditional input for property address */}
//                   {formValues.property_finalised === "Yes" && (
//                     <Input
//                       placeholder="Property Address (if Yes)"
//                       name="property_address"
//                       value={formValues.property_address}
//                       onChange={handleInputChange}
//                     />
//                   )}
//                 </div>
//               </div>

//               {/* Agreement/MoU Executed */}
//               <h2 className="text-xl font-bold text-white mt-6 mb-4">
//               Agreement/MoU Executed
//             </h2>
//             <div className="grid grid-cols-2 w-full gap-6">
//               <label className="flex items-center">
//                 <input
//                   type="radio"
//                   name="agreement_executed"
//                   checked={formValues.agreement_executed === "Yes"}
//                   value="Yes"
//                   onChange={(e) =>
//                     handleRadioChange("agreement_executed", e.target.value)
//                   }
//                   className="form-radio h-5 w-5 text-blue-600"
//                 />
//                 <span className="ml-3 text-white">Yes</span>
//               </label>
//               <label className="flex items-center">
//                 <input
//                   type="radio"
//                   name="agreement_executed"
//                   checked={formValues.agreement_executed === "No"}
//                   value="No"
//                   onChange={(e) =>
//                     handleRadioChange("agreement_executed", e.target.value)
//                   }
//                   className="form-radio h-5 w-5 text-blue-600"
//                   />
//                   <span className="ml-3 text-white">No</span>
//                 </label>
//               </div>
  
//               {/* Conditional input for Agreement/MoU Value */}
//               {formValues.agreement_executed === "Yes" && (
//                 <div className=" mt-6">
//                   <Input
//                     placeholder="Agreement/MoU Value (Rs.) (if Yes)"
//                     name="agreement_mou_value"
//                     value={formValues.agreement_mou_value}
//                     onChange={handleInputChange}
//                   />
//                 </div>
//               )}
  
//               {/* Preferred Banks */}
//               <div className=" grid grid-cols-2 w-full gap-6 mt-6">
//               <Input
//                   placeholder="Loan Amount Required (Rs.)"
//                   name="loan_amount_required"
//                   value={formValues.loan_amount_required}
//                   onChange={handleInputChange}
//                 />
//                 <Input
//                   placeholder=" Enter Your Preferred Banks "
//                   name="preferred_banks"
//                   value={formValues.preferred_banks}
//                   onChange={handleInputChange}
//                 />
//               </div>
//             </div>
//               )}
  
//               {/* Vehicle Loan */}
//               {formValues.loan === "Vehicle Loan" && (
//                 <div>
//                 <div className="mt-10">
//                   <h2 className="text-xl font-bold text-white mb-4">
//                     Employment Details
//                   </h2>
//                   <div className=" grid grid-cols-2 w-full gap-6">
//                     <label className="flex items-center">
//                       <input
//                         type="radio"
//                         name="user_type"
//                         value="Salaried"
//                         checked={formValues.user_type === "Salaried"}
//                         onChange={handleEmploymentChange}
//                         className="form-radio h-5 w-5 text-blue-600"
//                       />
//                       <span className="ml-3 text-white">Salaried</span>
//                     </label>
//                     <label className="flex items-center">
//                       <input
//                         type="radio"
//                         name="user_type"
//                         value="Self-Employed"
//                         checked={formValues.user_type === "Self-Employed"}
//                         onChange={handleEmploymentChange}
//                         className="form-radio h-5 w-5 text-blue-600"
//                       />
//                       <span className="ml-3 text-white">
//                         Self-Employed / Professional
//                       </span>
//                     </label>
//                   </div>
//                 </div>
  
//                 {/* Conditional Inputs */}
//                 <div className="mt-8">
//                   {formValues.user_type === "Salaried" && (
//                     <div>
//                       <div className="grid grid-cols-2 w-full gap-6">
//                       <Input
//                           placeholder="Organisation Name"
//                           name="organisation_name"
//                           value={formValues.organisation_name}
//                           onChange={handleInputChange}
//                         />
//                         <Dropdown
//                           options={[
//                             "Central Govt.",
//                             "State Govt.",
//                             "Govt. Organisation",
//                             "PSU",
//                             "Private Limited Company",
//                             "Public Limited Company",
//                             "Partnership Firm",
//                             "Proprietary Firm",
//                             "LLP",
//                             "Others",
//                           ]}
//                           placeholder="Organisation Type"
//                           setOpenDropdown={setOpenDropdown}
//                           isOpen={openDropdown === "organisationType"}
//                           id="organisationType"
//                           value={formValues.organisation_type}
//                           onSelect={(option) => handleOptionSelect("organisation_type", option)}
  
//                         />
//                       </div>
//                       <div className="grid grid-cols-2 w-full gap-6">
//                       <Input
//                           placeholder="Experience in Current Organization"
//                           name="currentOrganizationExperience"
//                           value={formValues.currentOrganizationExperience}
//                           onChange={handleInputChange}
//                         />
//                         <Input
//                           placeholder="Experience in Previous Organization "
//                           name="previousOrganizationExperience"
//                           value={formValues.previousOrganizationExperience}
//                           onChange={handleInputChange}
//                         />
//                       </div>
//                       <div className="grid grid-cols-2 w-full gap-6">
//                       <Input
//                           placeholder="Designation"
//                           name="designation_salaried"
//                           value={formValues.designation_salaried}
//                           onChange={handleInputChange}
//                           />
  
//                         <Input
//                          placeholder="Place of Posting"
//                          name="place_of_posting"
//                          value={formValues.place_of_posting}
//                          onChange={handleInputChange}
//                          />
//                       </div>
//                       <div className="grid grid-cols-2 w-full gap-6">
//                       <Input
//                           placeholder="Monthly Salary ( in hand )"
//                           name="monthly_salary"
//                           value={formValues.monthly_salary}
//                           onChange={handleInputChange}
//                         />
//                         <Input
//                           placeholder="Bank in which salary account is maintained"
//                           name="salary_bank_name"
//                           value={formValues.salary_bank_name}
//                           onChange={handleInputChange}
//                         />
//                       </div>
//                     </div>
//                   )}
  
//                   {formValues.user_type === "Self-Employed" && (
//                     <div>
//                       <div className="grid grid-cols-2 w-full gap-6">
//                       <Input
//                           placeholder="Name of Firm/Company"
//                           name="company_name"
//                           value={formValues.company_name}
//                           onChange={handleInputChange}
//                         />
//                         <Dropdown
//                           options={[
//                             "Company",
//                             "Partnership Firm",
//                             "Proprietary Firm",
//                             "LLP",
//                             "Others",
//                           ]}
//                           placeholder="Type of Firm"
//                           setOpenDropdown={setOpenDropdown}
//                           isOpen={openDropdown === "typeOfFirm"}
//                           id="typeOfFirm"
//                           value={formValues.company_type}
//                           onSelect={(option) => handleOptionSelect("company_type", option)}
  
//                         />
//                       </div>
//                       <div className="grid grid-cols-2 w-full gap-6">
//                       <Input
//                           placeholder="Firm Registration / Incorporation Date"
//                           name="incorporation_date"
//                           value={formValues.incorporation_date}
//                           onChange={handleInputChange}
//                         />
//                         <Dropdown
//                           options={[
//                             "Proprietor",
//                             "Partner",
//                             "Founder",
//                             "Director",
//                             "Others",
//                           ]}
//                           placeholder="Designation"
//                           setOpenDropdown={setOpenDropdown}
//                           isOpen={openDropdown === "designation"}
//                           id="designation"
//                           value={formValues.designation_self}
//                           onSelect={(option) => handleOptionSelect("designation_self", option)}
  
//                         />
//                       </div>
//                       <div className="grid grid-cols-2 w-full gap-6">
//                       <Input
//                           placeholder="Years in Line of Business (VINTAGE)"
//                           name="years_in_business"
//                           value={formValues.years_in_business}
//                           onChange={handleInputChange}
//                         />
//                         <Input
//                           placeholder="Years of ITR Filing (VINTAGE)"
//                           name="years_of_itr_filing"
//                           value={formValues.years_of_itr_filing}
//                           onChange={handleInputChange}
//                         />
//                       </div>
//                     </div>
//                   )}
//                 </div>
  
//                 <div className="mt-10">
//                   <h2 className="text-xl font-bold text-white mb-4">
//                     {" "}
//                     Vehicle Details{" "}
//                   </h2>
//                   {/*  Vehicle details */}
//                   <div className="grid grid-cols-2  w-full gap-6">
//                   <Input placeholder="Make and Model of Vehicle "
//                          name="vehicleModel"
//                          value={formValues.vehicleModel}
//                          onChange={handleInputChange}
//                   />
//                   <Input placeholder="Expected date of delivery of Vehicle "
//                           name="expectedDeliveryDate"
//                           value={formValues.expectedDeliveryDate}
//                           onChange={handleInputChange}
//                   />
//                   </div>
//                   <div className="grid grid-cols-2 w-full gap-6">
//                   <Input placeholder="Dealer Name "
//                         name="dealerName"
//                         value={formValues.dealerName}
//                         onChange={handleInputChange}
//                   />
//                   <Input placeholder="Dealer City"
//                           name="dealerCity"
//                           value={formValues.dealerCity}
//                           onChange={handleInputChange}
//                   />
//                   </div>
//                   {/* Agreement/MoU Value */}
//                   <h2 className="text-xl font-bold text-white mt-6 mb-4 ">
//                     Loan Details
//                   </h2>
//                   <div className="grid grid-cols-2  w-full gap-6">
//                   <Input placeholder="Price of Vehicle  "
//                           name="vehiclePrice"
//                           value={formValues.vehiclePrice}
//                           onChange={handleInputChange}
//                   />
//                   <Input placeholder="Desired loan amount  "
//                           name="loan_amount_required"
//                           value={formValues.loan_amount_required}
//                           onChange={handleInputChange}
//                   />
//                   </div>
  
//                   {/* Preferred Banks */}
//                   <div className="mt-2">
//                     <Input
//                       placeholder=" Enter Your Preferred Banks "
//                       name="preferred_banks"
//                       value={formValues.preferred_banks}
//                       onChange={handleInputChange}
//                     />
//                   </div>
//                 </div>
//               </div>
//               )}
  
//               {/* Personal Loan */}
//               {formValues.loan === "Personal Loan" && (
//                   <div>
//                   <div className="mt-10">
//                     <h2 className="text-xl font-bold text-white mb-4">
//                       Employment Details
//                     </h2>
//                     <div className="grid grid-cols-2 w-full gap-6">
//                       <label className="flex items-center">
//                         <input
//                           type="radio"
//                           name="user_type"
//                           checked={formValues.user_type === "Salaried"}
//                           value="Salaried"
//                           onChange={(e) =>
//                             handleRadioChange("user_type", e.target.value)
//                           }
//                           className="form-radio h-5 w-5 text-blue-600"
//                         />
//                         <span className="ml-3 text-white">Salaried</span>
//                       </label>
//                       <label className="flex items-center">
//                         <input
//                           type="radio"
//                           name="user_type"
//                           checked={formValues.user_type === "Self-Employed"}
//                           value="Self-Employed"
//                           onChange={(e) =>
//                             handleRadioChange("user_type", e.target.value)
//                           }
//                           className="form-radio h-5 w-5 text-blue-600"
//                         />
//                         <span className="ml-3 text-white">
//                           Self-Employed / Professional
//                         </span>
//                       </label>
//                     </div>
//                   </div>
  
//                   <div className="mt-8">
//                     {formValues.user_type === "Salaried" && (
//                       <div>
//                         <div className="grid grid-cols-2 w-full gap-6">
//                           <Input
//                             placeholder="Organisation Name"
//                             name="organisation_name"
//                             value={formValues.organisation_name}
//                             onChange={handleInputChange}
//                           />
//                           <Dropdown
//                             options={[
//                               "Central Govt.",
//                               "State Govt.",
//                               "Govt. Organisation",
//                               "PSU",
//                               "Private Limited Company",
//                               "Public Limited Company",
//                               "Partnership Firm",
//                               "Proprietary Firm",
//                               "LLP",
//                               "Others",
//                             ]}
//                             placeholder="Organisation Type"
//                             setOpenDropdown={setOpenDropdown}
//                             isOpen={openDropdown === "organisationType"}
//                             id="organisationType"
//                             value={formValues.organisation_type}
//                             onSelect={(option) =>
//                               handleOptionSelect("organisation_type", option)
//                             }
//                           />
//                         </div>
  
//                         {/* Other fields */}
//                         <div className="grid grid-cols-2 w-full gap-6">
//                         <Input
//                           placeholder="Experience in Current Organization"
//                           name="currentOrganizationExperience"
//                           value={formValues.currentOrganizationExperience}
//                           onChange={handleInputChange}
//                         />
//                         <Input
//                           placeholder="Experience in Previous Organization "
//                           name="previousOrganizationExperience"
//                           value={formValues.previousOrganizationExperience}
//                           onChange={handleInputChange}
//                         />
//                       </div>
  
//                         <div className="grid grid-cols-2 w-full gap-6">
//                             <Input
//                               placeholder="Designation"
//                               name="designation_salaried"
//                               value={formValues.designation_salaried}
//                               onChange={handleInputChange}
//                             />
//                             <Input
//                               placeholder="Place of Posting"
//                               name="place_of_posting"
//                               value={formValues.place_of_posting}
//                               onChange={handleInputChange}
//                             />
//                         </div>
  
//                         <div className="grid grid-cols-2 w-full gap-6">
//                             <Input
//                               placeholder="Monthly Salary"
//                               name="monthly_salary"
//                               value={formValues.monthly_salary}
//                               onChange={handleInputChange}
//                             />
//                             <Input
//                               placeholder="Bank in which salary account is maintained"
//                               name="salary_bank_name"
//                               value={formValues.salary_bank_name}
//                               onChange={handleInputChange}
//                             />
//                         </div>
//                       </div>
//                     )}
  
//                     {formValues.user_type === "Self-Employed" && (
//                       <div>
//                         <div className="grid grid-cols-2 w-full gap-6">
//                           <Input
//                             placeholder="Name of Firm/Company"
//                             name="company_name"
//                             value={formValues.company_name}
//                             onChange={handleInputChange}
//                           />
//                           <Dropdown
//                             options={[
//                               "Company",
//                               "Partnership Firm",
//                               "Proprietary Firm",
//                               "LLP",
//                               "Others",
//                             ]}
//                             placeholder="Type of Firm"
//                             setOpenDropdown={setOpenDropdown}
//                             isOpen={openDropdown === "typeOfFirm"}
//                             id="typeOfFirm"
//                             value={formValues.company_type}
//                             onSelect={(option) =>
//                               handleOptionSelect("company_type", option)
//                             }
//                           />
//                         </div>
  
//                       <div className="grid grid-cols-2 w-full gap-6">
//                       <Input
//                           placeholder="Firm Registration / Incorporation Date"
//                           name="incorporation_date"
//                           value={formValues.incorporation_date}
//                           onChange={handleInputChange}
//                         />
//                         <Dropdown
//                           options={[
//                             "Proprietor",
//                             "Partner",
//                             "Founder",
//                             "Director",
//                             "Others",
//                           ]}
//                           placeholder="Designation"
//                           setOpenDropdown={setOpenDropdown}
//                           isOpen={openDropdown === "designation"}
//                           id="designation"
//                           value={formValues.designation_self}
//                           onSelect={(option) =>
//                             handleOptionSelect("designation_self", option)
//                           }
//                         />
//                       </div>
//                         <div className="grid grid-cols-2 w-full gap-6">
//                         <Input
//                           placeholder="Years in Line of Business (VINTAGE)"
//                           name="years_in_business"
//                           value={formValues.years_in_business}
//                           onChange={handleInputChange}
//                         />
//                         <Input
//                           placeholder="Years of ITR Filing (VINTAGE)"
//                           name="years_of_itr_filing"
//                           value={formValues.years_of_itr_filing}
//                           onChange={handleInputChange}
//                         />
//                       </div>
//                       </div>
//                     )}
//                   </div>
  
//                 {/* Preferred Banks */}
//                 <div className=" grid grid-cols-2 w-full gap-6 mt-6">
//                 <Input
//                     placeholder="Loan Amount Required (Rs.)"
//                     name="loan_amount_required"
//                     value={formValues.loan_amount_required}
//                     onChange={handleInputChange}
//                   />
//                   <Input
//                     placeholder=" Enter Your Preferred Banks "
//                     name="preferred_banks"
//                     value={formValues.preferred_banks}
//                     onChange={handleInputChange}
//                   />
//                 </div>
//               </div>
//               )}
  
//               {/* Business Loan */}
//               {formValues.loan === "Business Loan" && (
//   <div>
//     <div className="mt-10">
//       <h2 className="text-xl font-bold text-white mb-4">
//         Details of Application Firm
//       </h2>
//     </div>

//     <div className="mt-8">
//       <div className="grid grid-cols-2 w-full gap-6">
//         <Input
//           placeholder="Name of Firm/Company"
//           name="company_name"
//           value={formValues.company_name}
//           onChange={handleInputChange}
//         />
//         <Dropdown
//           options={[
//             "Pvt Ltd Company",
//             "Unlisted Public Limited Company",
//             "Partnership Firm",
//             "Proprietary Firm",
//             "LLP",
//             "Others",
//           ]}
//           placeholder="Type of Firm"
//           setOpenDropdown={setOpenDropdown}
//           isOpen={openDropdown === "typeOfFirm"}
//           id="typeOfFirm"
//           value={formValues.company_type}
//           onSelect={(option) =>
//             handleOptionSelect("company_type", option)
//           }
//         />
//       </div>

//       <div className="grid grid-cols-2 w-full gap-6 ">
//         <Input
//           placeholder="Firm Registration / Incorporation Date"
//           name="incorporation_date"
//           value={formValues.incorporation_date}
//           onChange={handleInputChange}
//         />
//         <Input
//           placeholder="Name of Director"
//           name="Name_of_Directors"
//           value={formValues.Name_of_Directors}
//           onChange={handleInputChange}
//         />
//       </div>

//       <div className="grid grid-cols-2 w-full gap-6">
//         <Input
//           placeholder="Years in Line of Business (VINTAGE)"
//           name="years_in_business"
//           value={formValues.years_in_business}
//           onChange={handleInputChange}
//         />
//         <Input
//           placeholder="Years of ITR Filing (VINTAGE)"
//           name="years_of_itr_filing"
//           value={formValues.years_of_itr_filing}
//           onChange={handleInputChange}
//         />
//       </div>
//     </div>

//      {/* Employment Type Selection (Hidden for Business Loan) */}
//       <div className="mt-10" style={{ display: formValues.loan === 'Business Loan' ? 'none' : 'block' }}>
//         <h2 className="text-xl font-bold text-white mb-4">
//           Employment Details
//         </h2>
//         <div className="grid grid-cols-2 w-full gap-6">
//           <label className="flex items-center">
//             <input
//               type="radio"
//               name="user_type"
//               checked={formValues.user_type === "Salaried"}
//               value="Salaried"
//               onChange={(e) => handleRadioChange("user_type", e.target.value)}
//               className="form-radio h-5 w-5 text-blue-600"
//             />
//             <span className="ml-3 text-white">Salaried</span>
//           </label>
//           <label className="flex items-center">
//             <input
//               type="radio"
//               name="user_type"
//               checked={formValues.user_type === "Self-Employed"}
//               value="Self-Employed"
//               onChange={(e) => handleRadioChange("user_type", e.target.value)}
//               className="form-radio h-5 w-5 text-blue-600"
//             />
//             <span className="ml-3 text-white">Self-Employed / Professional</span>
//           </label>
//         </div>
//     </div>

//     {/* Property Finalised */}
//     <div className="mt-10">
//       <h2 className="text-xl font-bold text-white mb-4">
//         Property Finalised
//       </h2>
//       <div className="flex flex-col space-y-4">
//         <div className="grid grid-cols-2 w-full gap-6">
//           {/* Radio buttons for property finalised */}
//           <label className="flex items-center">
//             <input
//               type="radio"
//               name="property_finalised"
//               checked={formValues.property_finalised === "Yes"}
//               value="Yes"
//               onChange={(e) =>
//                 handleRadioChange(
//                   "property_finalised",
//                   e.target.value
//                 )
//               }
//               className="form-radio h-5 w-5 text-blue-600"
//             />
//             <span className="ml-3 text-white">Yes</span>
//           </label>
//           <label className="flex items-center">
//             <input
//               type="radio"
//               name="property_finalised"
//               checked={formValues.property_finalised === "No"}
//               value="No"
//               onChange={(e) =>
//                 handleRadioChange(
//                   "property_finalised",
//                   e.target.value
//                 )
//               }
//               className="form-radio h-5 w-5 text-blue-600"
//             />
//             <span className="ml-3 text-white">No</span>
//           </label>
//         </div>
//         {/* Conditional input for property address */}
//         {formValues.property_finalised === "Yes" && (
//           <Input
//             placeholder="Property Address (if Yes)"
//             name="property_address"
//             value={formValues.property_address}
//             onChange={handleInputChange}
//           />
//         )}
//       </div>
//     </div>

//     {/* Agreement/MoU Executed */}
//     <h2 className="text-xl font-bold text-white mt-6 mb-4">
//     Agreement/MoU Executed
//   </h2>
//   <div className="grid grid-cols-2 w-full gap-6">
//     <label className="flex items-center">
//       <input
//         type="radio"
//         name="agreement_executed"
//         checked={formValues.agreement_executed === "Yes"}
//         value="Yes"
//         onChange={(e) =>
//           handleRadioChange("agreement_executed", e.target.value)
//         }
//         className="form-radio h-5 w-5 text-blue-600"
//       />
//       <span className="ml-3 text-white">Yes</span>
//     </label>
//     <label className="flex items-center">
//       <input
//         type="radio"
//         name="agreement_executed"
//         checked={formValues.agreement_executed === "No"}
//         value="No"
//         onChange={(e) =>
//           handleRadioChange("agreement_executed", e.target.value)
//         }
//         className="form-radio h-5 w-5 text-blue-600"
//       />
//       <span className="ml-3 text-white">No</span>
//     </label>
//   </div>

//   {/* Conditional input for Agreement/MoU Value */}
//   {formValues.agreement_executed === "Yes" && (
//     <div className=" mt-6">
//       <Input
//         placeholder="Agreement/MoU Value (Rs.) (if Yes)"
//         name="agreement_mou_value"
//         value={formValues.agreement_mou_value}
//         onChange={handleInputChange}
//       />
//     </div>
//   )}

//     {/* Preferred Banks */}
//     <div className="grid grid-cols-2 w-full gap-6 mt-6">
//     <Input
//         placeholder="Loan Amount Required (Rs.)"
//         name="loan_amount_required"
//         value={formValues.loan_amount_required}
//         onChange={handleInputChange}
//       />
//       <Input
//         placeholder=" Enter Your Preferred Banks "
//         name="preferred_banks"
//         value={formValues.preferred_banks}
//         onChange={handleInputChange}
//       />
//     </div>
//   </div>
// )}

//               {/* Mortgage Loan */}
//               {formValues.loan === "Mortgage Loan" && (
//                 <div>
//                 <div className="mt-10">
//                   <h2 className="text-xl font-bold text-white mb-4">
//                     Employment Details
//                   </h2>
//                   <div className="grid grid-cols-2 w-full gap-6">
//                     <label className="flex items-center">
//                       <input
//                         type="radio"
//                         name="user_type"
//                         checked={formValues.user_type === "Salaried"}
//                         value="Salaried"
//                         onChange={(e) =>
//                           handleRadioChange("user_type", e.target.value)
//                         }
//                         className="form-radio h-5 w-5 text-blue-600"
//                       />
//                       <span className="ml-3 text-white">Salaried</span>
//                     </label>
//                     <label className="flex items-center">
//                       <input
//                         type="radio"
//                         name="user_type"
//                         checked={formValues.user_type === "Self-Employed"}
//                         value="Self-Employed"
//                         onChange={(e) =>
//                           handleRadioChange("user_type", e.target.value)
//                         }
//                         className="form-radio h-5 w-5 text-blue-600"
//                       />
//                       <span className="ml-3 text-white">
//                         Self-Employed / Professional
//                       </span>
//                     </label>
//                   </div>
//                 </div>

//                 <div className="mt-8">
//                   {formValues.user_type === "Salaried" && (
//                     <div>
//                       <div className="grid grid-cols-2 w-full gap-6">
//                         <Input
//                           placeholder="Organisation Name"
//                           name="organisation_name"
//                           value={formValues.organisation_name}
//                           onChange={handleInputChange}
//                         />
//                         <Dropdown
//                           options={[
//                             "Central Govt.",
//                             "State Govt.",
//                             "Govt. Organisation",
//                             "PSU",
//                             "Private Limited Company",
//                             "Public Limited Company",
//                             "Partnership Firm",
//                             "Proprietary Firm",
//                             "LLP",
//                             "Others",
//                           ]}
//                           placeholder="Organisation Type"
//                           setOpenDropdown={setOpenDropdown}
//                           isOpen={openDropdown === "organisationType"}
//                           id="organisationType"
//                           value={formValues.organisation_type}
//                           onSelect={(option) =>
//                             handleOptionSelect("organisation_type", option)
//                           }
//                         />
//                       </div>

//                       {/* Other fields */}
//                       <div className="grid grid-cols-2 w-full gap-6">
//                       <Input
//                         placeholder="Experience in Current Organization"
//                         name="currentOrganizationExperience"
//                         value={formValues.currentOrganizationExperience}
//                         onChange={handleInputChange}
//                       />
//                       <Input
//                         placeholder="Experience in Previous Organization "
//                         name="previousOrganizationExperience"
//                         value={formValues.previousOrganizationExperience}
//                         onChange={handleInputChange}
//                       />
//                     </div>

//                       <div className="grid grid-cols-2 w-full gap-6">
//                           <Input
//                             placeholder="Designation"
//                             name="designation_salaried"
//                             value={formValues.designation_salaried}
//                             onChange={handleInputChange}
//                           />
//                           <Input
//                             placeholder="Place of Posting"
//                             name="place_of_posting"
//                             value={formValues.place_of_posting}
//                             onChange={handleInputChange}
//                           />
//                       </div>

//                       <div className="grid grid-cols-2 w-full gap-6">
//                           <Input
//                             placeholder="Monthly Salary"
//                             name="monthly_salary"
//                             value={formValues.monthly_salary}
//                             onChange={handleInputChange}
//                           />
//                           <Input
//                             placeholder="Bank in which salary account is maintained"
//                             name="salary_bank_name"
//                             value={formValues.salary_bank_name}
//                             onChange={handleInputChange}
//                           />
//                       </div>
//                     </div>
//                   )}

//                   {formValues.user_type === "Self-Employed" && (
//                     <div>
//                       <div className="grid grid-cols-2 w-full gap-6">
//                         <Input
//                           placeholder="Name of Firm/Company"
//                           name="company_name"
//                           value={formValues.company_name}
//                           onChange={handleInputChange}
//                         />
//                         <Dropdown
//                           options={[
//                             "Company",
//                             "Partnership Firm",
//                             "Proprietary Firm",
//                             "LLP",
//                             "Others",
//                           ]}
//                           placeholder="Type of Firm"
//                           setOpenDropdown={setOpenDropdown}
//                           isOpen={openDropdown === "typeOfFirm"}
//                           id="typeOfFirm"
//                           value={formValues.company_type}
//                           onSelect={(option) =>
//                             handleOptionSelect("company_type", option)
//                           }
//                         />
//                       </div>

//                     <div className="grid grid-cols-2 w-full gap-6">
//                     <Input
//                         placeholder="Firm Registration / Incorporation Date"
//                         name="incorporation_date"
//                         value={formValues.incorporation_date}
//                         onChange={handleInputChange}
//                       />
//                       <Dropdown
//                         options={[
//                           "Proprietor",
//                           "Partner",
//                           "Founder",
//                           "Director",
//                           "Others",
//                         ]}
//                         placeholder="Designation"
//                         setOpenDropdown={setOpenDropdown}
//                         isOpen={openDropdown === "designation"}
//                         id="designation"
//                         value={formValues.designation_self}
//                         onSelect={(option) =>
//                           handleOptionSelect("designation_self", option)
//                         }
//                       />
//                     </div>
//                       <div className="grid grid-cols-2 w-full gap-6">
//                       <Input
//                         placeholder="Years in Line of Business (VINTAGE)"
//                         name="years_in_business"
//                         value={formValues.years_in_business}
//                         onChange={handleInputChange}
//                       />
//                       <Input
//                         placeholder="Years of ITR Filing (VINTAGE)"
//                         name="years_of_itr_filing"
//                         value={formValues.years_of_itr_filing}
//                         onChange={handleInputChange}
//                       />
//                     </div>
//                     </div>
//                   )}
//                 </div>

//                   {/* Property Finalised */}
//                 <div className="mt-10">
//                   <h2 className="text-xl font-bold text-white mb-4">
//                     Property Finalised
//                   </h2>
//                   <div className="flex flex-col space-y-4">
//                     <div className="grid grid-cols-2 w-full gap-6">
//                       {/* Radio buttons for property finalised */}
//                       <label className="flex items-center">
//                         <input
//                           type="radio"
//                           name="property_finalised"
//                           checked={formValues.property_finalised === "Yes"}
//                           value="Yes"
//                           onChange={(e) =>
//                             handleRadioChange(
//                               "property_finalised",
//                               e.target.value
//                             )
//                           }
//                           className="form-radio h-5 w-5 text-blue-600"
//                         />
//                         <span className="ml-3 text-white">Yes</span>
//                       </label>
//                       <label className="flex items-center">
//                         <input
//                           type="radio"
//                           name="property_finalised"
//                           checked={formValues.property_finalised === "No"}
//                           value="No"
//                           onChange={(e) =>
//                             handleRadioChange(
//                               "property_finalised",
//                               e.target.value
//                             )
//                           }
//                           className="form-radio h-5 w-5 text-blue-600"
//                         />
//                         <span className="ml-3 text-white">No</span>
//                       </label>
//                     </div>
//                     {/* Conditional input for property address */}
//                     {formValues.property_finalised === "Yes" && (
//                       <Input
//                         placeholder="Property Address (if Yes)"
//                         name="property_address"
//                         value={formValues.property_address}
//                         onChange={handleInputChange}
//                       />
//                     )}
//                   </div>
//                 </div>

//                 {/* Agreement/MoU Executed */}
//                 <h2 className="text-xl font-bold text-white mt-6 mb-4">
//                 Agreement/MoU Executed
//               </h2>
//               <div className="grid grid-cols-2 w-full gap-6">
//                 <label className="flex items-center">
//                   <input
//                     type="radio"
//                     name="agreement_executed"
//                     checked={formValues.agreement_executed === "Yes"}
//                     value="Yes"
//                     onChange={(e) =>
//                       handleRadioChange("agreement_executed", e.target.value)
//                     }
//                     className="form-radio h-5 w-5 text-blue-600"
//                   />
//                   <span className="ml-3 text-white">Yes</span>
//                 </label>
//                 <label className="flex items-center">
//                   <input
//                     type="radio"
//                     name="agreement_executed"
//                     checked={formValues.agreement_executed === "No"}
//                     value="No"
//                     onChange={(e) =>
//                       handleRadioChange("agreement_executed", e.target.value)
//                     }
//                     className="form-radio h-5 w-5 text-blue-600"
//                   />
//                   <span className="ml-3 text-white">No</span>
//                 </label>
//               </div>

//               {/* Conditional input for Agreement/MoU Value */}
//               {formValues.agreement_executed === "Yes" && (
//                 <div className=" mt-6">
//                   <Input
//                     placeholder="Agreement/MoU Value (Rs.) (if Yes)"
//                     name="agreement_mou_value"
//                     value={formValues.agreement_mou_value}
//                     onChange={handleInputChange}
//                   />
//                 </div>
//               )}

//                 {/* Preferred Banks */}
//                 <div className="grid grid-cols-2 w-full gap-6 mt-6">
//                 <Input
//                     placeholder="Loan Amount Required (Rs.)"
//                     name="loan_amount_required"
//                     value={formValues.loan_amount_required}
//                     onChange={handleInputChange}
//                   />
//                   <Input
//                     placeholder=" Enter Your Preferred Banks "
//                     name="preferred_banks"
//                     value={formValues.preferred_banks}
//                     onChange={handleInputChange}
//                   />
//                 </div>
//               </div>

//               )}

//             {/* Submit Button */}
//             <div>
              
//                 <Button
//                   type="submit"
//                   text="Submit"
//                   className="mt-6"
//                 />
           
//             </div>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default FormTwo;







































import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import Input from "../../components/form/Input.jsx";
import Dropdown from "../../components/form/Dropdown.jsx";
import Button from "../../components/form/Button.jsx";
import { FaUser } from "react-icons/fa";
import { FaBookOpen } from "react-icons/fa6";
import { IoDocuments } from "react-icons/io5";
import axios from "axios";

const FormTwo = () => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    user_type: "",
    organisation_name: "",
    organisation_type: "",
    designation_salaried: "",
    currentOrganizationExperience: "",
    previousOrganizationExperience: "",
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
    vehicleModel: "",
    expectedDeliveryDate: "",
    dealerName: "",
    dealerCity: "",
    vehiclePrice: "",
    loan: "" // Add loan here to your state
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

  const getNavigationPath = () => {
    const { loan, user_type } = formValues;

    const paths = {
      "Home Loan": {
        Salaried: "/form-details-three?loan_type=home&user_type=salaried",
        "Self-Employed": "/form-details-three?loan_type=home&user_type=self_employed",
      },
      "Vehicle Loan": {
        Salaried: "/form-details-three?loan_type=vehicle&user_type=salaried",
        "Self-Employed": "/form-details-three?loan_type=vehicle&user_type=self_employed",
      },
      "Personal Loan": {
          Salaried: "/form-details-three?loan_type=personal&user_type=salaried",
        "Self-Employed": "/form-details-three?loan_type=personal&user_type=self_employed",
      },
      "Business Loan": {
         "": "/form-details-three?loan_type=business&user_type=/",
      },
      "Mortgage Loan": {
        Salaried: "/form-details-three?loan_type=mortgage&user_type=salaried",
        "Self-Employed": "/form-details-three?loan_type=mortgage&user_type=self_employed",
      },
    };

    // Use optional chaining and nullish coalescing for safety
    return paths[loan]?.[user_type] ?? "#";
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    let user_type = formValues.loan === "Business Loan" ? "Self-Employed" : formValues.user_type;

    

    const formData = {
      loanType: formValues.loan,
      user_type: user_type, 

      ...(formValues.loan === "Home Loan" && {
        homeDetails: {
          employmentType: formValues.user_type,
          salariedDetails: formValues.user_type === "Salaried" ? {
              organisation_name: formValues.organisation_name,
              organisation_type: formValues.organisation_type,
              currentOrganizationExperience: formValues.currentOrganizationExperience,
              previousOrganizationExperience: formValues.previousOrganizationExperience,
              designation_salaried: formValues.designation_salaried,
              place_of_posting: formValues.place_of_posting,
              monthly_salary: formValues.monthly_salary,
              salary_bank_name: formValues.salary_bank_name,
          } : {},
          selfEmployedDetails: formValues.user_type === "Self-Employed" ? {
              company_name: formValues.company_name,
              company_type: formValues.company_type,
              incorporation_date: formValues.incorporation_date,
              designation_self: formValues.designation_self,
              years_in_business: formValues.years_in_business,
              years_of_itr_filing: formValues.years_of_itr_filing,
          } : {},
          loanAmountRequired: formValues.loan_amount_required,
          propertyFinalized: formValues.property_finalised,
          propertyAddress: formValues.property_address,
          agreementExecuted: formValues.agreement_executed,
          agreementValue: formValues.agreement_mou_value,  
          preferredBank: formValues.preferred_banks,
        },
      }),

      ...(formValues.loan === "Vehicle Loan" && {
        vehicleDetails: {
          employmentType: formValues.user_type,
          salariedDetails: formValues.user_type === "Salaried" ? {
            organisation_name: formValues.organisation_name,
            organisation_type: formValues.organisation_type,
            currentOrganizationExperience: formValues.currentOrganizationExperience,
            previousOrganizationExperience: formValues.previousOrganizationExperience,
            designation_salaried: formValues.designation_salaried,
            place_of_posting: formValues.place_of_posting,
            monthly_salary: formValues.monthly_salary,
            salary_bank_name: formValues.salary_bank_name,
          } : {},
          selfEmployedDetails: formValues.user_type === "Self-Employed" ? {
            company_name: formValues.company_name,
            company_type: formValues.company_type,
            incorporation_date: formValues.incorporation_date,
            designation_self: formValues.designation_self,
            years_in_business: formValues.years_in_business,
            years_of_itr_filing: formValues.years_of_itr_filing,
          } : {},
          vehicleModel: formValues.vehicleModel,        // Vehicle-specific
          expectedDeliveryDate: formValues.expectedDeliveryDate, // Vehicle-specific
          dealerName: formValues.dealerName,          // Vehicle-specific
          dealerCity: formValues.dealerCity,          // Vehicle-specific
          vehiclePrice: formValues.vehiclePrice,         //Vehicle-specific
          loanAmountRequired: formValues.loan_amount_required,
          preferredBank: formValues.preferred_banks,
        },
      }),

      ...(formValues.loan === "Business Loan" && {
        businessDetails: {
          applicationFirm: {
            company_name: formValues.company_name,
            company_type: formValues.company_type,
            incorporation_date: formValues.incorporation_date,
            nameOfDirector: formValues.Name_of_Directors, // Corrected Case
            years_in_business: formValues.years_in_business,
            years_of_itr_filing: formValues.years_of_itr_filing, //Keep, as it might refer to firm's, not personal ITR
          },
          propertyFinalized: formValues.property_finalised,
          propertyAddress: formValues.property_address,
          agreementExecuted: formValues.agreement_executed,
          agreementValue: formValues.agreement_mou_value,
          loanAmountRequired: formValues.loan_amount_required,
          preferredBank: formValues.preferred_banks,
        },
      }),
        ...(formValues.loan === "Personal Loan" && {
          personalDetails: {
           employmentType: formValues.user_type,
        salariedDetails: formValues.user_type === "Salaried" ? {
            organisation_name: formValues.organisation_name,
            organisation_type: formValues.organisation_type,
            currentOrganizationExperience: formValues.currentOrganizationExperience,
            previousOrganizationExperience: formValues.previousOrganizationExperience,
            designation_salaried: formValues.designation_salaried,  // Corrected naming
            place_of_posting: formValues.place_of_posting,
            monthly_salary: formValues.monthly_salary,
            salary_bank_name: formValues.salary_bank_name,
        } : {},
        selfEmployedDetails: formValues.user_type === "Self-Employed" ? {
          company_name: formValues.company_name,
          company_type: formValues.company_type,
          incorporation_date: formValues.incorporation_date,
          designation_self: formValues.designation_self,
          years_in_business: formValues.years_in_business,
          years_of_itr_filing: formValues.years_of_itr_filing,
        } : {},
        loanAmountRequired: formValues.loan_amount_required,
        preferredBank: formValues.preferred_banks,
          },
        }),

          ...(formValues.loan === "Mortgage Loan" && {
          mortgageDetails: {
            employmentType: formValues.user_type,
        salariedDetails: formValues.user_type === "Salaried" ? {
            organisation_name: formValues.organisation_name,
            organisation_type: formValues.organisation_type,
            currentOrganizationExperience: formValues.currentOrganizationExperience,
            previousOrganizationExperience: formValues.previousOrganizationExperience,
            designation_salaried: formValues.designation_salaried,  // Corrected naming
            place_of_posting: formValues.place_of_posting,
            monthly_salary: formValues.monthly_salary,
            salary_bank_name: formValues.salary_bank_name,
        } : {},
        selfEmployedDetails: formValues.user_type === "Self-Employed" ? {
          company_name: formValues.company_name,
          company_type: formValues.company_type,
          incorporation_date: formValues.incorporation_date,
          designation_self: formValues.designation_self,
          years_in_business: formValues.years_in_business,
          years_of_itr_filing: formValues.years_of_itr_filing,
        } : {},
           propertyFinalized: formValues.property_finalised,
        propertyAddress: formValues.property_address,
        agreementExecuted: formValues.agreement_executed,
        agreementValue: formValues.agreement_mou_value,
        loanAmountRequired: formValues.loan_amount_required,
        preferredBank: formValues.preferred_banks,
          },
        }),
    };

    try {
        console.log("formData before sending:", formData); // Add this line!
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/form-two`,
          formData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
          // ... rest of your code
            if (response.status === 200) {
              alert("Loan application submitted successfully");

               const navigationPath = getNavigationPath();
                 if (navigationPath !== "#") {
                 navigate(navigationPath); 
               } else {
                 alert("Invalid loan type or user type.");
             }
          } else {
             alert("Error: " + response.data.message);
             }
    } catch (error) {
        console.error("Error submitting the form:", error);
        alert("Error submitting the form. Please try again.");
    }
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
        <form onSubmit={handleSubmit}>
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
                        name="organisation_name" // Correct: name attribute matches state key
                        value={formValues.organisation_name} // Correct: bound to state
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
                        isOpen={openDropdown === "organisation_type"} // Correct: unique identifier
                        id="organisation_type"  //Correct
                        value={formValues.organisation_type} // Correct: bound to state
                        onSelect={(option) => handleOptionSelect("organisation_type", option)} 
                      />
                    </div>
                    <div className="grid grid-cols-2 w-full gap-6">
                      <Input
                        placeholder="Experience in Current Organization"
                        name="currentOrganizationExperience"
                        value={formValues.currentOrganizationExperience}
                        onChange={handleInputChange}
                      />
                      <Input
                        placeholder="Experience in Previous Organization "
                        name="previousOrganizationExperience"
                        value={formValues.previousOrganizationExperience}
                        onChange={handleInputChange}
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
                    <Input
                        placeholder="Firm Registration / Incorporation Date"
                        name="incorporation_date"
                        value={formValues.incorporation_date}
                        onChange={handleInputChange}
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
                    <Input
                        placeholder="Years in Line of Business (VINTAGE)"
                        name="years_in_business"
                        value={formValues.years_in_business}
                        onChange={handleInputChange}
                      />
                      <Input
                        placeholder="Years of ITR Filing (VINTAGE)"
                        name="years_of_itr_filing"
                        value={formValues.years_of_itr_filing}
                        onChange={handleInputChange}
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

              {/* Conditional Inputs */}
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
                        value={formValues.organisation_type} // Corrected: use formValues
                        onSelect={(option) => handleOptionSelect("organisation_type", option)}
                      />
                    </div>
                    <div className="grid grid-cols-2 w-full gap-6">
                      <Input
                        placeholder="Experience in Current Organization"
                        name="currentOrganizationExperience"
                        value={formValues.currentOrganizationExperience}
                        onChange={handleInputChange}
                      />
                      <Input
                        placeholder="Experience in Previous Organization "
                        name="previousOrganizationExperience"
                        value={formValues.previousOrganizationExperience}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="grid grid-cols-2 w-full gap-6">
                      <Input placeholder="Designation"
                              name="designation_salaried"
                              value={formValues.designation_salaried}
                              onChange={handleInputChange}
                      />
                      <Input placeholder="Place of Posting"
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
                        onSelect={(option) => handleOptionSelect("company_type", option)}
                      />
                    </div>
                    <div className="grid grid-cols-2 w-full gap-6">
                    <Input
                        placeholder="Firm Registration / Incorporation Date"
                        name="incorporation_date"
                        value={formValues.incorporation_date}
                        onChange={handleInputChange}
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
                        onSelect={(option) => handleOptionSelect("designation_self", option)}
                      />
                    </div>
                    <div className="grid grid-cols-2 w-full gap-6">
                    <Input
                        placeholder="Years in Line of Business (VINTAGE)"
                        name="years_in_business"
                        value={formValues.years_in_business}
                        onChange={handleInputChange}
                      />
                      <Input
                        placeholder="Years of ITR Filing (VINTAGE)"
                        name="years_of_itr_filing"
                        value={formValues.years_of_itr_filing}
                        onChange={handleInputChange}
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
                {/*  Vehicle details */}
                <div className="grid grid-cols-2  w-full gap-6">
                  <Input
                    placeholder="Make and Model of Vehicle "
                    name="vehicleModel"
                    value={formValues.vehicleModel}
                    onChange={handleInputChange}
                  />
                  <Input
                    placeholder="Expected date of delivery of Vehicle "
                    name="expectedDeliveryDate"
                    value={formValues.expectedDeliveryDate}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="grid grid-cols-2 w-full gap-6">
                  <Input
                    placeholder="Dealer Name "
                    name="dealerName"
                    value={formValues.dealerName}
                    onChange={handleInputChange}
                    />
                  <Input placeholder="Dealer City"
                        name="dealerCity"
                        value={formValues.dealerCity}
                        onChange={handleInputChange}
                  />
                </div>
                {/* Agreement/MoU Value */}
                <h2 className="text-xl font-bold text-white mt-6 mb-4 ">
                  Loan Details
                </h2>
                <div className="grid grid-cols-2  w-full gap-6">
                <Input placeholder="Price of Vehicle  "
                        name="vehiclePrice"
                        value={formValues.vehiclePrice}
                        onChange={handleInputChange}
                />
                <Input placeholder="Desired loan amount  "
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
                      <Input
                        placeholder="Experience in Current Organization"
                        name="currentOrganizationExperience"
                        value={formValues.currentOrganizationExperience}
                        onChange={handleInputChange}
                      />
                      <Input
                        placeholder="Experience in Previous Organization "
                        name="previousOrganizationExperience"
                        value={formValues.previousOrganizationExperience}
                        onChange={handleInputChange}
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
                        <Input
                          placeholder="Firm Registration / Incorporation Date"
                          name="incorporation_date"
                          value={formValues.incorporation_date}
                          onChange={handleInputChange}
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
                        <Input
                          placeholder="Years in Line of Business (VINTAGE)"
                          name="years_in_business"
                          value={formValues.years_in_business}
                          onChange={handleInputChange}
                        />
                        <Input
                          placeholder="Years of ITR Filing (VINTAGE)"
                          name="years_of_itr_filing"
                          value={formValues.years_of_itr_filing}
                          onChange={handleInputChange}
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

                  <div className="grid grid-cols-2 w-full gap-6 ">
                  <Input
                        placeholder="Firm Registration / Incorporation Date"
                        name="incorporation_date"
                        value={formValues.incorporation_date}
                        onChange={handleInputChange}
                      />
                    <Input
                      placeholder="Name of Director"
                      name="Name_of_Directors"
                      value={formValues.Name_of_Directors}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="grid grid-cols-2 w-full gap-6">
                  <Input
                        placeholder="Years in Line of Business (VINTAGE)"
                        name="years_in_business"
                        value={formValues.years_in_business}
                        onChange={handleInputChange}
                      />
                      <Input
                        placeholder="Years of ITR Filing (VINTAGE)"
                        name="years_of_itr_filing"
                        value={formValues.years_of_itr_filing}
                        onChange={handleInputChange}
                      />
                  </div>
                </div>

                {/* Employment Type Selection (Hidden for Business Loan) */}
                 <div className="mt-10" style={{ display: formValues.loan === 'Business Loan' ? 'none' : 'block' }}>
                    <h2 className="text-xl font-bold text-white mb-4"> Employment Details  </h2>
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
                                <span className="ml-3 text-white">Salaried</span>
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
                                 <span className="ml-3 text-white">Self-Employed / Professional</span>
                            </label>
                        </div>
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
                <div className="grid grid-cols-2 w-full gap-6 mt-6">
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
                      <Input
                        placeholder="Experience in Current Organization"
                        name="currentOrganizationExperience"
                        value={formValues.currentOrganizationExperience}
                        onChange={handleInputChange}
                      />
                      <Input
                        placeholder="Experience in Previous Organization "
                        name="previousOrganizationExperience"
                        value={formValues.previousOrganizationExperience}
                        onChange={handleInputChange}
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
                    <Input
                        placeholder="Firm Registration / Incorporation Date"
                        name="incorporation_date"
                        value={formValues.incorporation_date}
                        onChange={handleInputChange}
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
                      <Input
                        placeholder="Years in Line of Business (VINTAGE)"
                        name="years_in_business"
                        value={formValues.years_in_business}
                        onChange={handleInputChange}
                      />
                      <Input
                        placeholder="Years of ITR Filing (VINTAGE)"
                        name="years_of_itr_filing"
                        value={formValues.years_of_itr_filing}
                        onChange={handleInputChange}
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
                <div className="grid grid-cols-2 w-full gap-6 mt-6">
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

                <Button
                  type="submit"
                  text="Submit"
                  className="mt-6"
                />

            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormTwo;

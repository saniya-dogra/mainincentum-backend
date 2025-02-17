import React, { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { Link, useLocation } from "react-router-dom";
import { Button1 } from "../../components/form/Button.jsx";
import { IoDocuments } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { FaBookOpen } from "react-icons/fa6";

const FormThree = () => {
  const location = useLocation();
  const [userType, setUserType] = useState("");
  const [loanType, setLoanType] = useState("");
  const [files, setFiles] = useState({
    pan_card: null,
    aadhar_card: null,
    employer_id_card: null,
    joining_confirmation_letter: null,
    last_12_month_salary_statement: null,
    existing_loan_account_statement: null,
    latest_6_month_salary_slip: null,
    form_16_and_26as: null,
    itr_and_computation: null,
    firm_registration: null,
    gstr_last_year: null,
    current_account_statement: null,
    balance_sheets: null,
    loan_closure_statements: null,
  });

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const type = params.get("user_type");
    const loan = params.get("loan_type");
    if (type) setUserType(type);
    if (loan) setLoanType(loan);
  }, [location]);

  const FileUploader = ({ name }) => {
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
      onDrop: (acceptedFiles) => {
        setFiles((prevFiles) => ({ ...prevFiles, [name]: acceptedFiles[0] }));
      },
    });

    return (
      <div
        {...getRootProps()}
        className="border-2 border-dashed border-blue-400 rounded-md p-2 sm:p-4 text-center cursor-pointer hover:bg-blue-50 transition"
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p className="text-blue-500 text-sm sm:text-base">
            Drop the files here...
          </p>
        ) : (
          <p className="text-gray-500 text-sm sm:text-base">
            Drag and drop files here or{" "}
            <span className="text-blue-500 underline">Select files</span>
          </p>
        )}
      </div>
    );
  };

  // Document Lists
  const homeSalariedDocuments = [
    "PAN Card",
    "Aadhar Card",
    "Employer ID Card",
    "Joining/Confirmation/Experience Letter",
    "Last 12 Month Salary Account Statement",
    "Existing Loan Account Statement",
    "Latest 6 Month Salary Slip",
    "Form 16 (Part A & B) and 26 AS",
    "ITR and Computation",
  ];

  const homeSelfEmployedDocuments = [
    "PAN Card",
    "Aadhar Card",
    "Firm Registration Certificate",
    "GSTR Last Year",
    "Last 6/12 Month Current Account Statement",
    "Last 12 Month Savings Bank Account Statement",
    "Existing Loan Account Statement",
    "ITR and Computation",
    "Balance Sheets",
    "Loan Closure Statements",
  ];

  const vehicleSalariedDocuments = [
    "Pan Card",
    "Aadhar Card",
    "Employer ID card",
    "Joining/Confirmation/Experience Letter",
    "Last 12 month salary Account Statement",
    "Existing Loan Account Statement",
    "Latest 6 month salary slip",
    "3 year form 16 (part A B) and 26 AS",
    "3 year ITR and computation",
    "NOC/Loan close statements for loans closed in one year",
  ];

  const vehicleSelfEmployedDocuments = [
    "PAN Card",
    "Aadhar Card",
    "Firm registration (Shop Act/ Udyog Aadhar/ GST Certificate/Article of Association/ Memorandum of Association, Certificate for Incorporation/Licenses/Others)",
    "GSTR for last year",
    "Last 6/12 Month Current Account Statement",
    "Last 12 Month Savings Bank Account Statement",
    "Existing Loan Account Statements",
    "2/3 Year ITR & Computation",
    "2/3 Year Balance Sheets",
    "NOC /Loan closure statements for loans closed in 1 year",
  ];

  const personalSalariedDocuments = [
    "PAN Card",
    "Aadhar Card",
    "Employer ID Card",
    "Joining/Confirmation/Experience Letter",
    "Last 12 Month Salary Account Statement",
    "Existing Loan Account Statement",
    "Latest 6 Month Salary Slip",
    "Form 16 (Part A & B) and 26 AS",
    "ITR and Computation",
  ];

  const personalSelfEmployedDocuments = [
    "PAN Card",
    "Aadhar Card",
    "Firm Registration Certificate",
    "GSTR Last Year",
    "Last 6/12 Month Current Account Statement",
    "Last 12 Month Savings Bank Account Statement",
    "Existing Loan Account Statement",
    "ITR and Computation",
    "Balance Sheets",
    "Loan Closure Statements",
  ];

  const businessDocuments = [
    "PAN Card of Firm",
    "KYC of Proprietor/Partners/Directors",
    "Firm registration (Shop Act/ Udyog Aadhar/ GST Certificate/ Licenses/Others)",
    "Certificate for Incorporation (Wherever applicable)",
    "Article of Association (Wherever applicable)",
    "Memorandum of Association (Wherever applicable)",
    "GSTR for last year",
    "Last 6/12 Month Business Account Statement",
    "Last 12 Month Savings Bank Account Statement (In case of Proprietorship)",
    "Existing Loan Account Statements",
    "3 Year ITR & Computation",
    "3 Year Balance Sheets",
    "NOC /Loan closure statements for loans closed in 1 year",
    "Other relevant documents",
  ];

  const mortgageSalariedDocuments = [
    "PAN Card",
    "Aadhar Card",
    "Employer ID Card",
    "Joining/Confirmation/Experience Letter",
    "Last 12 Month Salary Account Statement",
    "Existing Loan Account Statement",
    "Latest 6 Month Salary Slip",
    "Form 16 (Part A & B) and 26 AS",
    "ITR and Computation",
  ];

  const mortgageSelfEmployedDocuments = [
    "PAN Card",
    "Aadhar Card",
    "Firm Registration Certificate",
    "GSTR Last Year",
    "Last 6/12 Month Current Account Statement",
    "Last 12 Month Savings Bank Account Statement",
    "Existing Loan Account Statement",
    "ITR and Computation",
    "Balance Sheets",
    "Loan Closure Statements",
  ];

  const getDocumentList = () => {
    if (loanType === "home") {
      return userType === "salaried"
        ? homeSalariedDocuments
        : homeSelfEmployedDocuments;
    } else if (loanType === "vehicle") {
      return userType === "salaried"
        ? vehicleSalariedDocuments
        : vehicleSelfEmployedDocuments;
    } else if (loanType === "personal") {
      return userType === "salaried"
        ? personalSalariedDocuments
        : personalSelfEmployedDocuments;
    } else if (loanType === "business") {
      return businessDocuments;
    } else if (loanType === "mortgage") {
      return userType === "salaried"
        ? mortgageSalariedDocuments
        : mortgageSelfEmployedDocuments;
    }
    return [];
  };

  return (
    <div className="min-h-screen bg-[#010349f0] text-gray-900 flex flex-col lg:flex-row">
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
            <span className="text-lg lg:text-xl font-medium text-[#26cc88] group-hover:text-[#26cc88] transition-colors text-right">
              Documents
              <div className="text-sm">Browse and Upload</div>
            </span>
            <div className="z-10 w-10 h-10 lg:w-12 lg:h-12 flex items-center justify-center bg-[#26cc88] rounded-full text-white font-bold shadow-lg transition-transform transform group-hover:scale-110 group-hover:rotate-6">
              <IoDocuments className="text-white w-5 h-5 lg:w-6 lg:h-6" />
            </div>
          </li>
        </ul>

        {/* Vertical Line on the Right End */}
        <div className="hidden lg:block absolute top-[8rem] right-0 h-screen w-1 bg-[#b1b3d7ef]">
          <div className="absolute top-[3.5rem] left-1/2 transform -translate-x-1/2 w-4 h-4 bg-[#484a7b] border-4 border-[#383a69] rounded-full"></div>
          <div className="absolute top-[10.5rem] left-1/2 transform -translate-x-1/2 w-4 h-4 bg-[#484a7b] border-4 border-[#383a69] rounded-full"></div>
          <div className="absolute top-[17.5rem] left-1/2 transform -translate-x-1/2 w-3.5 h-3.5 bg-[#26cc88] rounded-full"></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full lg:w-3/4 p-4 sm:p-6 lg:p-8 xl:p-10 -mt-2">
        <h1 className="text-xl sm:text-2xl lg:text-3xl text-white font-bold mb-3 lg:mb-3 ml-4 sm:ml-8 lg:ml-12">
          Loan Application
        </h1>
        <p className="text-white ml-4 sm:ml-8 lg:ml-12 mb-6 lg:mb-11 text-sm sm:text-base">
          Upload the required documents to proceed with the loan application.
        </p>

        {userType && (
          <div className="mx-2 sm:mx-4 lg:mx-8 mt-4">
            <div className="bg-white p-4 sm:p-6 py-8 sm:py-11 rounded-2xl sm:rounded-3xl shadow-md">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                Upload Documents for{" "}
                {loanType === "business"
                  ? "Business"
                  : userType === "salaried"
                  ? "Salaried"
                  : "Self-Employed"}
              </h1>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 p-2 sm:p-4 text-left">
                        #
                      </th>
                      <th className="border border-gray-300 p-2 sm:p-4 text-left">
                        Document Name
                      </th>
                      <th className="border border-gray-300 p-2 sm:p-4 text-left">
                        Upload Documents
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {getDocumentList().map((doc, index) => {
                      const name = doc.toLowerCase().replace(/\s+/g, "_");
                      return (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="border border-gray-300 p-2 sm:p-4 text-center">
                            {index + 1}
                          </td>
                          <td className="border border-gray-300 p-2 sm:p-4">
                            {doc}
                          </td>
                          <td className="border border-gray-300 p-2 sm:p-4">
                            <FileUploader name={name} />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <div className="mt-6 sm:mt-8 flex justify-center">
                <div className="flex flex-col sm:flex-row justify-center sm:justify-between items-center gap-4 sm:gap-6 w-full max-w-[90%] sm:max-w-[70%] md:max-w-[60%] lg:max-w-[50%]">
                  <Link
                    to="/form-details-four-coapplicant"
                    className="w-full sm:w-auto flex justify-center"
                  >
                    <Button1 button="Add Coapplicant +" />
                  </Link>
                  <Link
                    to="/next-step"
                    className="w-full sm:w-auto flex justify-center"
                  >
                    <Button1 button="Submit" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FormThree;

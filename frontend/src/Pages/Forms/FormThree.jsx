import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { Link } from "react-router-dom";
import Button from "../../../components/form/Button.jsx";

const FormThree = () => {
  const [userType, setUserType] = useState(""); // Manage user type state
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

  // File uploader component
  const FileUploader = ({ name }) => {
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
      onDrop: (acceptedFiles) => {
        setFiles((prevFiles) => ({ ...prevFiles, [name]: acceptedFiles[0] }));
      },
    });

    return (
      <div
        {...getRootProps()}
        className="border-2 border-dashed border-blue-400 rounded-md p-4 text-center cursor-pointer hover:bg-blue-50 transition"
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p className="text-blue-500">Drop the files here...</p>
        ) : (
          <p className="text-gray-500">
            Drag and drop files here or{" "}
            <span className="text-blue-500 underline">Select files</span>
          </p>
        )}
      </div>
    );
  };

  // Salaried Document List
  const salariedDocumentList = [
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

  // Self-Employed Document List
  const selfEmployedDocumentList = [
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

  return (
    <div className="flex flex-col items-center p-7 py-10 rounded-lg shadow-md bg-[#C0F7FB]">
      <h2 className="text-3xl font-bold text-gray-900 mb-4">Loan Application</h2>
      <p className="text-gray-600 mb-6">
        Please select your user type to proceed with the loan application.
      </p>

      {/* Dropdown for User Type */}
      <div className="mb-6">
        <label htmlFor="userType" className="block text-gray-800 mb-2">
          Select User Type:
        </label>
        <select
          id="userType"
          value={userType}
          onChange={(e) => setUserType(e.target.value)}
          className="border border-gray-300 rounded-lg p-2 w-full"
        >
          <option value="">-- Select --</option>
          <option value="salaried">Salaried</option>
          <option value="self_employed">Self-Employed</option>
        </select>
      </div>

      {/* Render Form Based on User Type */}
      {userType && (
        <div className="w-full bg-white mt-8 p-8 py-11 mx-4 rounded-3xl shadow-md">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Upload Documents for {userType === "salaried" ? "Salaried" : "Self-Employed"}
          </h1>

          {/* Document Upload Table */}
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 p-4 text-left">#</th>
                <th className="border border-gray-300 p-4 text-left">Document Name</th>
                <th className="border border-gray-300 p-4 text-left">Upload Documents</th>
              </tr>
            </thead>
            <tbody>
              {(userType === "salaried"
                ? salariedDocumentList
                : selfEmployedDocumentList
              ).map((doc, index) => {
                const name = doc.toLowerCase().replace(/\s+/g, "_"); // Generate name based on doc text
                return (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="border border-gray-300 p-4 text-center">{index + 1}</td>
                    <td className="border border-gray-300 p-4">{doc}</td>
                    <td className="border border-gray-300 p-4">
                      <FileUploader name={name} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {/* Submit Button */}
          <div className="mt-8">
            <Link to="/next-step"> {/* Adjust this route as per your application */}
              <Button type="button" text="Submit" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default FormThree;

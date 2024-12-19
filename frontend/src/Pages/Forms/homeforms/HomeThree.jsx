import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../../components/form/Button.jsx";
import axios from "axios";

const Salried = () => {
  const navigate = useNavigate();  // for navigation after success
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
            Drag and drop files here or{' '}
            <span className="text-blue-500 underline">Select files</span>
          </p>
        )}
      </div>
    );
  };

  // Document list
  const documentList = [
    "Pan Card",
    "Aadhar Card",
    "Employer ID card",
    "Joining/Confirmation/Experience Letter",
    "Last 12 month salary Account Statement",
    "Existing Loan Account Statement",
    "Latest 6 month salary slip",
    "2 year form 16 (part A B) and 26 AS",
    "2/3 year ITR and computation",
    "Firm Registration Certificate",
    "GSTR Last Year",
    "Current Account Statement",
    "Balance Sheets",
    "Loan Closure Statements",
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    // Append files to FormData
    Object.keys(files).forEach((key) => {
      if (files[key]) {
        formData.append(key, files[key]);
      }
    });

    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/forms/form-three",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Response:", response.data);

      alert("Documents uploaded successfully!");

      // After successful upload, navigate to another page
      navigate("/HomePage");
    } catch (error) {
      console.error("Error uploading documents:", error);
      alert("An error occurred while uploading documents.");
    }
  };

  return (
    <div className="flex flex-col lg:flex-row p-7 py-10 rounded-lg shadow-md form-bg-image bg-[#C0F7FB] ">
      {/* Left Section */}
      <div className="p-7 lg:w-1/3 flex flex-col items-center">
        <div className="form-slidebar"></div>
      </div>

      {/* Right Section */}
      <div className="lg:w-2/3 bg-white mt-8 p-8 py-11 mx-4 rounded-3xl shadow-md">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Loan Application</h2>
        <p className="text-gray-600 mb-6">
          Amazing! It's almost done! Please upload your documents.
        </p>

        {/* Steps */}
        <div className="ml-9 mt-4 form-step-three"></div>

        <h1 className="text-xl font-bold mt-8 text-gray-900 mb-8">
          3. Upload Documents for Salaried
        </h1>

        {/* Document Upload Table */}
        <form onSubmit={handleSubmit}>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 p-4 text-left">#</th>
                <th className="border border-gray-300 p-4 text-left">Document Name</th>
                <th className="border border-gray-300 p-4 text-left">Upload Documents</th>
              </tr>
            </thead>
            <tbody>
              {documentList.map((doc, index) => {
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
            <Button type="submit">Upload Documents</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Salried;

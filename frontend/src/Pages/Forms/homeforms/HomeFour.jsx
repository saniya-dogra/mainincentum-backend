import React from 'react';
import { useDropzone } from 'react-dropzone';
import { Link } from "react-router-dom";
import Button from "../../../components/form/Button.jsx";



const SelfEmployed = () => {
  // File uploads
  const FileUploader = ({ onDrop }) => {
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
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
      'PAN Card',	  
      'Aadhar Card',
      'Firm registration (Shop Act/ Udyog Aadhar/ GST Certificate/Article of Association/ Memorandum of Association, Certificate for Incorporation/Licenses/Others)',	
      'GSTR for last year',
      'Last 6/12 Month Current Account Statement',	
      'Last 12 Month Savings Bank Account Statement',
      'Existing Loan Account Statements',
      '2/3 Year ITR & Computation',
      '2/3 Year Balance Sheets',
      'NOC /Loan closure statements for loans closed in 1 year',	

  ];

  return (
    <div className="flex flex-col lg:flex-row p-7 py-10 rounded-lg shadow-md form-bg-image bg-[#C0F7FB] ">
    {/* Left Section */}
      <div className="  p-7 lg:w-1/3 flex flex-col items-center">
        <div className=" form-slidebar ">
        </div>
      </div>
      {/* Right Section */}
      <div className="lg:w-2/3 bg-white mt-8 p-8 py-11 mx-4 rounded-3xl shadow-md">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Loan Applicaton</h2>
        <p className="text-gray-600 mb-6">
        Amazing ! its almost done ! please upload your documents
        </p>

        {/* Steps */}
        <div className="ml-9 mt-4 form-step-three "></div>

        <h1 className="text-xl font-bold mt-8 text-gray-900  mb-8">
              3. Upload Documents for Self Employed/ Professionals 
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
            {documentList.map((doc, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="border border-gray-300 p-4 text-center">{index + 1}</td>
                <td className="border border-gray-300 p-4">{doc}</td>
                <td className="border border-gray-300 p-4">
                  <FileUploader onDrop={(acceptedFiles) => console.log(acceptedFiles)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Footer */}
        <div className="mt-8">
          <Link to="/presonal-details-formFive">
          <Button />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SelfEmployed;
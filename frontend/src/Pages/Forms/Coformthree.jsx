import React, { useState, useEffect, useContext } from "react";
import { useDropzone } from "react-dropzone";
import { useLocation, useNavigate } from "react-router-dom";
import { IoDocuments } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { FaBookOpen } from "react-icons/fa6";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { uploadLoanDocuments, resetUploadState } from "../../store/formOneSlice";
import { UserContext } from "../../contextapi/UserContext";

const CoformThree = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, success } = useSelector((state) => state.form);
  const { user } = useContext(UserContext);

  const [applicantsData, setApplicantsData] = useState([]);
  const [files, setFiles] = useState([]);
  const [fileErrors, setFileErrors] = useState([]);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  useEffect(() => {
    dispatch(resetUploadState());
  }, [dispatch]);

  useEffect(() => {
    const { numberOfApplicants, applicants } = location.state || {};
    const params = new URLSearchParams(location.search);

    if (!numberOfApplicants || !applicants || applicants.length === 0) {
      console.error("Missing or invalid state data from CoformTwo");
      toast.error("Missing applicant data. Please complete the previous step.", {
        position: "top-center",
        autoClose: 2000,
      });
      navigate("/co-applicant-form-detail-two");
      return;
    }

    const parsedApplicants = [];
    for (let i = 0; i < numberOfApplicants; i++) {
      const applicantKey = `applicant${i + 1}`;
      const paramValue = params.get(applicantKey);
      let loanType, userType;

      if (paramValue) {
        const [loanPart, userPart] = paramValue.split("&user_type=");
        loanType = loanPart?.toLowerCase().replace("loan", "") || "personal";
        userType = userPart?.toLowerCase().replace("-", "_") || applicants[i]?.user_type?.toLowerCase() || "self_employed";
      } else {
        loanType = applicants[i]?.loanType?.toLowerCase().replace(" loan", "") || "personal";
        userType = applicants[i]?.user_type?.toLowerCase().replace("-", "_") || "self_employed";
      }

      console.log(`Applicant ${i + 1} Raw: paramValue=${paramValue}, loanType=${loanType}, userType=${userType}, stateUserType=${applicants[i]?.user_type}`);

      if (!["salaried", "self_employed"].includes(userType)) {
        console.warn(`Invalid userType '${userType}' for Applicant ${i + 1}, defaulting to state or self_employed`);
        userType = applicants[i]?.user_type?.toLowerCase() === "salaried" ? "salaried" : "self_employed";
      }

      if (loanType && userType) {
        parsedApplicants.push({
          loanType,
          userType,
        });
      }
    }

    if (parsedApplicants.length === 0) {
      console.error("No valid applicants parsed");
      toast.error("Invalid applicant data. Please try again.", {
        position: "top-center",
        autoClose: 2000,
      });
      return;
    }

    console.log("Parsed Applicants:", parsedApplicants);
    setApplicantsData(parsedApplicants);
    setFiles(parsedApplicants.map(() => ({})));
    setFileErrors(parsedApplicants.map(() => ({})));
  }, [location, navigate]);

  useEffect(() => {
    if (!isFormSubmitted) return;

    if (success) {
      toast.success("Documents uploaded successfully!", {
        position: "top-center",
        autoClose: 2000,
        onClose: () => {
          dispatch(resetUploadState());
          setIsFormSubmitted(false);
          navigate("/application-submitted-successfully");
        },
      });
    } else if (error) {
      toast.error(error.message || "Failed to upload documents.", {
        position: "top-center",
        autoClose: 2000,
        onClose: () => {
          dispatch(resetUploadState());
          setIsFormSubmitted(false);
        },
      });
    }
  }, [success, error, isFormSubmitted, dispatch, navigate]);

  const FileUploader = ({ name, applicantIndex }) => {
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
      onDrop: (acceptedFiles) => {
        const file = acceptedFiles[0];
        if (file && file.size > 3 * 1024 * 1024) {
          setFileErrors((prev) => {
            const newErrors = [...prev];
            newErrors[applicantIndex] = {
              ...newErrors[applicantIndex],
              [name]: "File size exceeds 3 MB.",
            };
            return newErrors;
          });
        } else if (file && file.type !== "application/pdf") {
          setFileErrors((prev) => {
            const newErrors = [...prev];
            newErrors[applicantIndex] = {
              ...newErrors[applicantIndex],
              [name]: "Only PDF files are allowed.",
            };
            return newErrors;
          });
        } else {
          setFileErrors((prev) => {
            const newErrors = [...prev];
            newErrors[applicantIndex] = {
              ...newErrors[applicantIndex],
              [name]: null,
            };
            return newErrors;
          });
          setFiles((prev) => {
            const newFiles = [...prev];
            newFiles[applicantIndex] = {
              ...newFiles[applicantIndex],
              [name]: file,
            };
            return newFiles;
          });
        }
      },
      accept: { "application/pdf": [".pdf"] },
      multiple: false,
    });

    return (
      <div>
        <div
          {...getRootProps()}
          className="border-2 border-dashed border-blue-400 rounded-md p-2 text-center cursor-pointer hover:bg-blue-50"
        >
          <input {...getInputProps()} />
          {isDragActive ? (
            <p className="text-blue-500">Drop the file here...</p>
          ) : (
            <p className="text-gray-500">
              Drag & drop or <span className="text-blue-500 underline">select file</span>
            </p>
          )}
        </div>
        {fileErrors[applicantIndex]?.[name] && (
          <p className="text-red-500 text-sm mt-1">{fileErrors[applicantIndex][name]}</p>
        )}
        {files[applicantIndex]?.[name] && !fileErrors[applicantIndex]?.[name] && (
          <p className="text-sm text-green-600 mt-1">{files[applicantIndex][name].name}</p>
        )}
      </div>
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("handleSubmit triggered");
    setIsFormSubmitted(true);

    if (!user) {
      toast.error("User not authenticated. Please log in.", {
        position: "top-center",
        autoClose: 2000,
      });
      setIsFormSubmitted(false);
      return;
    }

    const hasErrors = fileErrors.some((err) => Object.values(err).some((e) => e));
    if (hasErrors) {
      toast.error("Please resolve all file errors before submitting.", {
        position: "top-center",
        autoClose: 2000,
      });
      setIsFormSubmitted(false);
      return;
    }

    const hasFiles = files.some((f) => Object.keys(f).length > 0);
    if (!hasFiles) {
      toast.error("Please upload at least one document.", {
        position: "top-center",
        autoClose: 2000,
      });
      setIsFormSubmitted(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("userId", user.id);

      const fieldNameMap = {
        pancard: "panCard",
        aadharcard: "aadharCard",
        employeridcard: "employerIDCard",
        joiningconfirmationexperienceletter: "joiningConfirmationExperienceLetter",
        last12monthsalaryaccountstatement: "last12MonthSalaryAccountStatement",
        last12monthsavingsbankaccountstatement: "last12MonthSavingsBankAccountStatement",
        existingloanaccountstatement: "existingLoanAccountStatement",
        latest6monthsalaryslip: "latest6MonthSalarySlip",
        "23yearsform16partaband26as": "form16PartABAnd26AS",
        "23yearsitrandcomputation": "itrAndComputation",
        firmregistrationcertificate: "firmRegistrationCertificate",
        gstrforlastyear: "gstrLastYear",
        last6or12monthcurrentaccountstatement: "last6Or12MonthCurrentAccountStatement",
        last6or12monthbusinessaccountstatement: "businessAccountStatement",
        "23yearsbalancesheets": "balanceSheets",
        nocloanclosurestatementsforloansclosedin1year: "nocLoanCloseStatements",
        drivinglicenseselforfamily: "drivingLicense",
        kycofproprietorpartnersdirectors: "kycProprietorPartnersDirectors",
        certificateforincorporation: "certificateForIncorporation",
        articleofassociation: "articleOfAssociation",
        memorandumofassociation: "memorandumOfAssociation",
        otherrelevantdocuments: "otherRelevantDocuments",
        pancardoffirm: "panCardofFirm",
      };

      files.forEach((applicantFiles, index) => {
        console.log(`Files for Applicant ${index + 1}:`, applicantFiles);
        Object.entries(applicantFiles).forEach(([key, file]) => {
          const backendField = fieldNameMap[key] || key; // Fallback to key if not in map
          const fieldName = `${index}_${backendField}`;
          console.log(`Appending: ${fieldName} -> ${file.name}`);
          formData.append(fieldName, file);
        });
      });

      console.log("FormData contents before submission:");
      for (let [key, value] of formData.entries()) {
        console.log(`${key}: ${value instanceof File ? value.name : value}`);
      }

      console.log("Submitting Files for All Applicants:", files);
      await dispatch(uploadLoanDocuments(formData)).unwrap();
    } catch (err) {
      console.error("Detailed Upload Error:", {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status,
      });
      toast.error(err.message || "Failed to upload documents. Please try again.", {
        position: "top-center",
        autoClose: 2000,
      });
      setIsFormSubmitted(false);
    }
  };

  const getDocumentList = (loanType, userType) => {
    const documentLists = {
      home: {
        salaried: [
          "PAN Card",
          "Aadhar Card",
          "Employer ID Card",
          "Joining/Confirmation/Experience Letter",
          "Last 12 Month Salary Account Statement",
          "Existing Loan Account Statement",
          "Latest 6 Month Salary Slip",
          "2/3 years Form 16 (Part A & B) and 26 AS",
          "2/3 years ITR and Computation",
        ],
        self_employed: [
          "PAN Card",
          "Aadhar Card",
          "Firm Registration Certificate",
          "GSTR for Last Year",
          "Last 6 or 12 Month Current Account Statement",
          "Last 12 Month Savings Bank Account Statement",
          "Existing Loan Account Statement",
          "2/3 years ITR and Computation",
          "2/3 years Balance Sheets",
          "NOC / Loan Closure Statements for loans closed in 1 year",
        ],
      },
      vehicle: {
        salaried: [
          "PAN Card",
          "Aadhar Card",
          "Employer ID Card",
          "Joining/Confirmation/Experience Letter",
          "Last 12 Month Salary Account Statement",
          "Existing Loan Account Statement",
          "Latest 6 Month Salary Slip",
          "2/3 years Form 16 (Part A & B) and 26 AS",
          "2/3 years ITR and Computation",
          "NOC / Loan Closure Statements for loans closed in 1 year",
          "Driving License (Self or Family)",
        ],
        self_employed: [
          "PAN Card",
          "Aadhar Card",
          "Firm Registration Certificate",
          "GSTR for Last Year",
          "Last 6 or 12 Month Current Account Statement",
          "Last 12 Month Savings Bank Account Statement",
          "Existing Loan Account Statement",
          "2/3 years ITR and Computation",
          "2/3 years Balance Sheets",
          "NOC / Loan Closure Statements for loans closed in 1 year",
          "Driving License (Self or Family)",
        ],
      },
      personal: {
        salaried: [
          "PAN Card",
          "Aadhar Card",
          "Employer ID Card",
          "Joining/Confirmation/Experience Letter",
          "Last 12 Month Salary Account Statement",
          "Existing Loan Account Statement",
          "Latest 6 Month Salary Slip",
          "2/3 years Form 16 (Part A & B) and 26 AS",
          "2/3 years ITR and Computation",
        ],
        self_employed: [
          "PAN Card",
          "Aadhar Card",
          "Firm Registration Certificate",
          "GSTR for Last Year",
          "Last 6 or 12 Month Current Account Statement",
          "Last 12 Month Savings Bank Account Statement",
          "Existing Loan Account Statement",
          "2/3 years ITR and Computation",
          "2/3 years Balance Sheets",
          "NOC / Loan Closure Statements for loans closed in 1 year",
        ],
      },
      business: {
        all: [
          "PAN Card of Firm",
          "KYC of Proprietor/Partners/Directors",
          "Firm Registration Certificate",
          "Certificate For Incorporation",
          "Article Of Association",
          "Memorandum Of Association",
          "GSTR for Last Year",
          "Last 6 or 12 Month Business Account Statement",
          "Last 12 Month Savings Bank Account Statement",
          "Existing Loan Account Statement",
          "2/3 years ITR and Computation",
          "2/3 years Balance Sheets",
          "NOC / Loan Closure Statements for loans closed in 1 year",
          "Other Relevant Documents",
        ],
      },
      mortgage: {
        salaried: [
          "PAN Card",
          "Aadhar Card",
          "Employer ID Card",
          "Joining/Confirmation/Experience Letter",
          "Last 12 Month Salary Account Statement",
          "Existing Loan Account Statement",
          "Latest 6 Month Salary Slip",
          "2/3 years Form 16 (Part A & B) and 26 AS",
          "2/3 years ITR and Computation",
        ],
        self_employed: [
          "PAN Card",
          "Aadhar Card",
          "Firm Registration Certificate",
          "GSTR for Last Year",
          "Last 6 or 12 Month Current Account Statement",
          "Last 12 Month Savings Bank Account Statement",
          "Existing Loan Account Statement",
          "2/3 years ITR and Computation",
          "2/3 years Balance Sheets",
          "NOC / Loan Closure Statements for loans closed in 1 year",
        ],
      },
    };

    console.log(`Getting documents for loanType: ${loanType}, userType: ${userType}`);
    const docs = loanType === "business" ? documentLists.business.all : documentLists[loanType]?.[userType] || [];
    console.log(`Documents returned:`, docs);
    return docs;
  };

  const getDisplayLoanType = (loanType) => {
    const loanTypeMap = {
      home: "Home Loan",
      vehicle: "Vehicle Loan",
      personal: "Personal Loan",
      business: "Business Loan",
      mortgage: "Mortgage Loan",
    };
    return loanTypeMap[loanType] || "Unknown Loan";
  };

  return (
    <div className="min-h-screen bg-[#010349f0] text-gray-900 flex flex-col lg:flex-row">
      <div className="absolute mt-24 md:mt-32 w-full h-1 bg-[#9ea0c5e7]"></div>
      <div className="w-full lg:w-1/4 py-10 px-4 lg:pl-16 flex flex-col shadow-xl relative rounded-r-3xl">
        <h2 className="text-2xl lg:text-3xl font-bold lg:mb-14 text-white tracking-wide text-center -mt-3">
          Application Process
        </h2>
        <ul className="relative mr-10 hidden lg:block">
          <div className="absolute right-6 top-12 bottom-0 w-1 bg-[#9ea0c5e7] mb-3"></div>
          <li className="flex items-center justify-end space-x-6 mb-12 lg:mb-16 cursor-pointer relative group">
            <div className="text-right">
              <span className="text-lg lg:text-xl font-medium text-white group-hover:text-[#26cc88]">
                Personal Information
              </span>
              <div className="text-sm text-gray-400">Browse and Upload</div>
            </div>
            <div className="z-10 w-10 h-10 lg:w-12 lg:h-12 flex items-center justify-center bg-[#484a7b] rounded-full shadow-lg group-hover:scale-110 group-hover:rotate-6">
              <FaUser className="text-white w-5 h-5 lg:w-6 lg:h-6" />
            </div>
          </li>
          <li className="flex items-center justify-end space-x-6 mb-12 lg:mb-16 cursor-pointer relative group">
            <div className="text-right">
              <span className="text-lg lg:text-xl font-medium text-white group-hover:text-[#26cc88]">
                Employment Status
              </span>
              <div className="text-sm text-gray-400">Browse and Upload</div>
            </div>
            <div className="z-10 w-10 h-10 lg:w-12 lg:h-12 flex items-center justify-center bg-[#484a7b] rounded-full shadow-lg group-hover:scale-110 group-hover:rotate-6">
              <FaBookOpen className="text-white w-5 h-5 lg:w-6 lg:h-6" />
            </div>
          </li>
          <li className="flex items-center justify-end space-x-6 cursor-pointer relative group">
            <div className="text-right">
              <span className="text-lg lg:text-xl font-medium text-[#26cc88]">
                Documents
              </span>
              <div className="text-sm text-gray-400">Browse and Upload</div>
            </div>
            <div className="z-10 w-10 h-10 lg:w-12 lg:h-12 flex items-center justify-center bg-[#26cc88] rounded-full shadow-lg group-hover:scale-110 group-hover:rotate-6">
              <IoDocuments className="text-white w-5 h-5 lg:w-6 lg:h-6" />
            </div>
          </li>
        </ul>
        <div className="hidden lg:block absolute top-[8rem] right-0 h-screen w-1 bg-[#b1b3d7ef]">
          <div className="absolute top-[3.5rem] left-1/2 transform -translate-x-1/2 w-4 h-4 bg-[#484a7b] border-4 border-[#383a69] rounded-full"></div>
          <div className="absolute top-[10.5rem] left-1/2 transform -translate-x-1/2 w-4 h-4 bg-[#484a7b] border-4 border-[#383a69] rounded-full"></div>
          <div className="absolute top-[17.5rem] left-1/2 transform -translate-x-1/2 w-3.5 h-3.5 bg-[#26cc88] rounded-full"></div>
        </div>
      </div>

      <div className="w-full lg:w-3/4 p-6 lg:p-8 xl:p-10 -mt-2">
        <h1 className="text-xl sm:text-2xl lg:text-3xl text-white font-bold mb-3 lg:mb-3 ml-4 sm:ml-8 lg:ml-12">
          Loan Application - Co-Applicant Documents
        </h1>
        <p className="text-white ml-4 sm:ml-8 lg:ml-12 mb-6 lg:mb-11 text-sm sm:text-base">
          Upload the required documents for all applicants.
        </p>
        <form onSubmit={handleSubmit}>
          <div className="mx-2 sm:mx-4 lg:mx-8 mt-4">
            {applicantsData.length > 0 ? (
              applicantsData.map((applicant, index) => {
                const displayLoanType = getDisplayLoanType(applicant.loanType);
                const displayUserType =
                  applicant.userType === "salaried" ? "Salaried" : "Self Employed";

                return (
                  <div
                    key={index}
                    className="bg-white p-4 sm:p-6 py-8 sm:py-11 rounded-2xl shadow-md mb-6"
                  >
                    <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                      Applicant {index + 1} - {displayLoanType} ({displayUserType})
                    </h1>
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse border border-gray-300">
                        <thead>
                          <tr className="bg-gray-100">
                            <th className="border border-gray-300 p-2 text-left">#</th>
                            <th className="border border-gray-300 p-2 text-left">Document Name</th>
                            <th className="border border-gray-300 p-2 text-left">Upload</th>
                          </tr>
                        </thead>
                        <tbody>
                          {getDocumentList(applicant.loanType, applicant.userType).map(
                            (doc, docIndex) => {
                              const name = doc.toLowerCase().replace(/[^a-z0-9]/g, "");
                              return (
                                <tr key={docIndex} className="hover:bg-gray-50">
                                  <td className="border border-gray-300 p-2 text-center">
                                    {docIndex + 1}
                                  </td>
                                  <td className="border border-gray-300 p-2">{doc}</td>
                                  <td className="border border-gray-300 p-2">
                                    <FileUploader name={name} applicantIndex={index} />
                                  </td>
                                </tr>
                              );
                            }
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-white">Loading applicant data...</p>
            )}
            <div className="mt-6 flex justify-center">
              <button
                type="submit"
                disabled={loading || applicantsData.length === 0}
                className={`w-full sm:w-auto bg-[#4CAF50] hover:bg-green-700 text-white font-bold py-2 px-4 rounded ${
                  loading || applicantsData.length === 0 ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {loading ? "Submitting..." : "Submit"}
              </button>
            </div>
          </div>
        </form>
      </div>
      <ToastContainer position="top-center" autoClose={2000} />
    </div>
  );
};

export default CoformThree;
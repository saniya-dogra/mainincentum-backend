const Form = require("../models/individualForms/FormOne.model");
const { asyncHandler } = require("../utils/asyncHandler");
const upload = require("../utils/FileUploaded");

// ====================== Step 1: Save Personal Details ======================
const savePersonalDetails = asyncHandler(async (req, res) => {
  const { userId, applicants } = req.body;

  if (!userId || !applicants || !Array.isArray(applicants) || applicants.length === 0) {
    return res.status(400).json({ message: "userId and applicants array are required" });
  }

  // Validate each applicant's required fields
  for (const applicant of applicants) {
    if (!applicant.full_name || !applicant.email_id) {
      return res.status(400).json({ message: "full_name and email_id are required for all applicants" });
    }
  }

  let form = await Form.findOne({ user: userId });

  if (!form) {
    form = new Form({
      user: userId,
      personalDetails: applicants, // Save array of applicants
      loanApplication: {},
      loanDocuments: {},
      status: "Pending",
    });
  } else {
    form.personalDetails = applicants; // Update with new array of applicants
  }

  await form.save();
  res.status(200).json({ message: "Personal details saved successfully", data: form });
});

// ====================== Step 2: Save Loan Application ======================
const saveLoanApplication = asyncHandler(async (req, res) => {
  const { userId, ...loanApplication } = req.body;

  if (!userId || !loanApplication.loanType || !loanApplication.user_type) {
    return res.status(400).json({ message: "userId, loanType, and user_type are required" });
  }

  let form = await Form.findOne({ user: userId });

  if (!form) {
    form = new Form({
      user: userId,
      personalDetails: {},
      loanApplication: loanApplication,
      loanDocuments: {},
      status: "Pending",
    });
  } else {
    form.loanApplication = loanApplication;
  }

  await form.save();
  res.status(200).json({ message: "Loan application saved successfully", data: form });
});

// ====================== Step 3: Save Loan Documents ======================
const handleFileUploads = upload.fields([
  { name: "panCard", maxCount: 1 },
  { name: "aadharCard", maxCount: 1 },
  { name: "employerIDCard", maxCount: 1 },
  { name: "joiningConfirmationExperienceLetter", maxCount: 1 },
  { name: "last12MonthSalaryAccountStatement", maxCount: 1 },
  { name: "existingLoanAccountStatement", maxCount: 1 },
  { name: "latest6MonthSalarySlip", maxCount: 1 },
  { name: "form16PartABAnd26AS", maxCount: 1 },
  { name: "itrAndComputation", maxCount: 1 },
  { name: "firmRegistrationCertificate", maxCount: 1 },
  { name: "gstrLastYear", maxCount: 1 },
  { name: "last6Or12MonthCurrentAccountStatement", maxCount: 1 },
  { name: "balanceSheets", maxCount: 1 },
  { name: "nocLoanCloseStatements", maxCount: 1 },
  { name: "drivingLicense", maxCount: 1 },
  { name: "kycProprietorPartnersDirectors", maxCount: 1 },
  { name: "certificateForIncorporation", maxCount: 1 },
  { name: "articleOfAssociation", maxCount: 1 },
  { name: "memorandumOfAssociation", maxCount: 1 },
  { name: "businessAccountStatement", maxCount: 1 },
  { name: "otherRelevantDocuments", maxCount: 1 },
]);

const saveLoanDocuments = asyncHandler(async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ message: "userId is required" });
  }

  let form = await Form.findOne({ user: userId });

  if (!form) {
    return res.status(400).json({ message: "Please complete Step 1 and Step 2 first" });
  }

  const loanDocuments = {};
  for (const [fieldName, fileArray] of Object.entries(req.files || {})) {
    if (fileArray && fileArray.length > 0) {
      loanDocuments[fieldName] = fileArray[0].path;
    }
  }

  form.loanDocuments = loanDocuments;
  await form.save();

  res.status(201).json({ message: "Loan documents saved successfully", data: form });
});

// ====================== Fetch All Forms ======================
const fetchAllForms = asyncHandler(async (req, res) => {
  const forms = await Form.find().populate("user");
  res.status(200).json({ message: "Forms fetched successfully", data: forms });
});

// ====================== Fetch Form by ID ======================
const fetchFormById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const form = await Form.findById(id).populate("user");
  if (!form) {
    return res.status(404).json({ message: "Form not found" });
  }

  // Explicitly reorder fields in the response
  const reorderedForm = {
    _id: form._id,
    user: form.user,
    personalDetails: form.personalDetails,
    loanApplication: form.loanApplication,
    loanDocuments: form.loanDocuments,
    status: form.status,
    createdAt: form.createdAt,
    updatedAt: form.updatedAt,
    __v: form.__v,
  };

  res.status(200).json({ message: "Form fetched successfully", data: reorderedForm });
});

// ====================== Update Form ======================
const updateForm = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updatedForm = await Form.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
  if (!updatedForm) {
    return res.status(404).json({ message: "Form not found" });
  }
  res.status(200).json({ message: "Form updated successfully", data: updatedForm });
});

// ====================== Update Form Status ======================
const updateFormStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!["Pending", "Approved", "Rejected"].includes(status)) {
    return res.status(400).json({ message: "Invalid status value" });
  }

  const updatedForm = await Form.findByIdAndUpdate(id, { status }, { new: true });
  if (!updatedForm) {
    return res.status(404).json({ message: "Form not found" });
  }
  res.status(200).json({ message: "Form status updated successfully", data: updatedForm });
});

// ====================== Delete Form ======================
const deleteForm = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const deletedForm = await Form.findByIdAndDelete(id);
  if (!deletedForm) {
    return res.status(404).json({ message: "Form not found" });
  }
  res.status(200).json({ message: "Form deleted successfully", data: deletedForm });
});

module.exports = {
  savePersonalDetails,
  saveLoanApplication,
  handleFileUploads,
  saveLoanDocuments,
  fetchAllForms,
  fetchFormById,
  updateForm,
  updateFormStatus,
  deleteForm,
};














// // controllers/formOne.js
// const FormOne = require("../models/individualForms/FormOne.model");
// const FormTwo = require("../models/individualForms/FormTwo.model");
// const LoanDocuments = require("../models/individualForms/FormThree.model");

// const { asyncHandler } = require("../utils/asyncHandler");
// const fs = require("fs");
// const { default: mongoose } = require("mongoose");


// const createFormOne = async (req, res) => {
//   try {
//     const {
//       full_name,
//       father_name,
//       mobile_number,
//       email_id,
//       dob,
//       gender,
//       qualification,
//       employment_type,
//       marital_status,
//       spouse_employment_type,
//       no_of_dependents,
//       pan_number,
//       residence_type,
//       citizenship,
//       permanent_state,
//       permanent_district,
//       permanent_address,
//       permanent_pincode,
//       present_state,
//       present_district,
//       present_address,
//       present_pincode,
//     } = req.body;

//     const existingEmail = await FormOne.findOne({ email_id });
//     if (existingEmail) {
//       return res
//         .status(400)
//         .json({ error: "Email already exists. Please use a different email." });
//     }

//     const formOneData = new FormOne({
//       full_name,
//       father_name,
//       mobile_number,
//       email_id,
//       dob,
//       gender,
//       qualification,
//       employment_type,
//       marital_status,
//       spouse_employment_type,
//       no_of_dependents,
//       pan_number,
//       residence_type,
//       citizenship,
//       permanent_state,
//       permanent_district,
//       permanent_address,
//       permanent_pincode,
//       present_state,
//       present_district,
//       present_address,
//       present_pincode,
//     });

//     const savedData = await formOneData.save();

//     res.status(201).json({
//       message: "Form data submitted successfully!",
//       data: savedData,
//     });
//   } catch (error) {
//     console.error("Error in form submission:", error);
//     if (error.code === 11000) {
//       return res
//         .status(400)
//         .json({
//           error: "Duplicate email detected. Please use a different email.",
//         });
//     }
//     res
//       .status(500)
//       .json({ message: "Internal Server Error", error: error.message });
//   }
// };

// const getFormOneData = asyncHandler(async (req, res) => {
//   try {
//     const formOneData = await FormOne.find();
//     if (!formOneData) {
//       return res.status(404).json({ message: "Form not found" });
//     }
//     res.status(200).json({
//       message: "Form data retrieved successfully!",
//       data: formOneData,
//     });
//   } catch (error) {
//     console.error("Error in retrieving form data:", error);
//     res
//       .status(500)
//       .json({ message: "Internal Server Error", error: error.message });
//   }
// });


// const getFormOneById = asyncHandler(async (req, res) => {
//   try {
//     const { id } = req.params;

//     const formOneData = await FormOne.findById(id);

//     if (!formOneData) {
//       return res.status(404).json({ message: "Form not found" });
//     }

//     res.status(200).json({
//       message: "Form data retrieved successfully!",
//       data: formOneData,
//     });
//   } catch (error) {
//     console.error("Error in retrieving form data:", error);
//     res
//       .status(500)
//       .json({ message: "Internal Server Error", error: error.message });
//   }
// });

// const updateFormOne = asyncHandler(async(req,res)=>{
//   try {
//     const { id } = req.params;
//     if (!id) {
//       return res.status(400).json({ message: "ID parameter is required" });
//   }
//     const updateForm = await FormOne.findByIdAndUpdate(id,req.body,{new:true});
//     if(!updateForm){
//       return res.status(404).json({message:"Form not found"});
//     }

//     res.status(200).json({message:"Form updated successfully",data:updateForm});
//   } catch (error) {
//     console.error("Error in updating form data:", error);
//     res.status(500).json({ message: "Internal Server Error", error: error.message });
//   }
// });


// const deleteFormOne = asyncHandler(async (req, res) => {
//   try {
//     const { id } = req.params;

//     if (!id) {
//       return res.status(400).json({ message: "ID parameter is required" });
//     }

//     const deletedForm = await FormOne.findByIdAndDelete(id);

//     if (!deletedForm) {
//       return res.status(404).json({ message: "Form not found" });
//     }

//     res.status(200).json({ message: "Form deleted successfully", data: deletedForm });
//   } catch (error) {
//     console.error("Error in deleting form data:", error);
//     res.status(500).json({ message: "Internal Server Error", error: error.message });
//   }
// });





// const createFormTwo = asyncHandler(async (req, res) => { // Using asyncHandler here.
//   try {
//     console.log("Received request body:", req.body); // Log the raw request body

//     const loan = new FormTwo(req.body);  // Directly use req.body
//     const savedLoan = await loan.save();    // Use .save()

//     res.status(201).json({
//       message: "Loan application submitted successfully",
//       loan: savedLoan, // Return the entire saved document
//     });
//   } catch (error) {
//       console.error("Error saving form data:", error); // More descriptive error
//       res.status(400).json({ message: "Error saving form data", error: error.message }); // Send error details
//   }
// });

// const getFormTwoData = asyncHandler(async(req,res)=>{
//   try {
//     const formTwoData = await FormTwo.find();
//     if(!formTwoData){
//       return res.status(404).json({message:"Form not found"});
//     }

//     res.status(200).json({message:"Form data retrieved successfully",data:formTwoData});
//   } catch (error) {
//     console.error("Error in retrieving form data:", error);
//     res.status(500).json({ message: "Internal Server Error", error: error.message });
//   }
// });

// const getFormTwoById = asyncHandler(async(req,res)=>{
//   try {
//     const {id} = req.params;
//     if(!id){
//       return res.status(400).json({message:"ID parameter is required"});
//     }

//     const formTwoData = await FormTwo.findById(id);
//     if(!formTwoData){
//       return res.status(404).json({message:"Form not found"});
//     }

//     res.status(200).json({message:"Form data retrieved successfully",data:formTwoData});

//   } catch (error) {
//     console.error("Error in retrieving form data:", error);
//     res.status(500).json({ message: "Internal Server Error", error: error.message });
//   }
// });


// const UpdateFormTwo = asyncHandler(async (req, res) => {
//   try {
//     const { id } = req.params;

//     // Validate MongoDB ObjectId
//     if (!id || !mongoose.Types.ObjectId.isValid(id)) {  
//       return res.status(400).json({ message: "Invalid or missing ID parameter" });
//     }

//     // Ensure request body is not empty
//     if (!req.body || Object.keys(req.body).length === 0) {
//       return res.status(400).json({ message: "No data provided for update" });
//     }

//     // Update the form
//     const updateFormTwo = await FormTwo.findByIdAndUpdate(id, req.body, { 
//       new: true, 
//       runValidators: true // Ensures validation rules are applied
//     });

//     if (!updateFormTwo) {
//       return res.status(404).json({ message: "Form not found" });
//     }

//     res.status(200).json({ message: "Form updated successfully", data: updateFormTwo });

//   } catch (error) {
//     console.error("Error in updating form data:", error);
//     res.status(500).json({ message: "Internal Server Error", error: error.message });
//   }
// });
// const deleteFormTwo = asyncHandler(async(req,res)=>{
//   try {
//     const {id} = req.params;

//     if(!id){
//       return res.status(400).json({message:"ID parameter is required"});
//     }

//     const deleteFormTwo = await FormTwo.findByIdAndDelete(id);
//     if(!deleteFormTwo){
//       return res.status(404).json({message:"Form not found"});
//     }   
//     res.status(200).json({message:"Form deleted successfully",data:deleteFormTwo});
//   } catch (error) {
//     console.error("Error in deleting form data:", error); 
//     res.status(500).json({ message: "Internal Server Error", error: error.message });
//   }
// })








// const uploadLoanDocuments = async (req, res) => {
//   try {
//     console.log("Request Body:", req.body); 
//     console.log("Request Files:", req.files); 
   
//     if (!req.files || Object.keys(req.files).length === 0) {
//       console.log("No files were uploaded."); 
//       return res.status(400).json({ message: "No files were uploaded." });
//     }


//     const documentData = {};
//     for (const [fieldName, fileArray] of Object.entries(req.files)) {
//       documentData[fieldName] = fileArray[0].filename; 
//     }


//     const newLoanDocument = new LoanDocuments(documentData);
//     await newLoanDocument.save();

//     res.status(201).json({ message: "Loan documents uploaded successfully", data: newLoanDocument });
//   } catch (error) {
//     console.error("Error uploading loan documents:", error);


//     if (req.files) {
//       Object.values(req.files).forEach((fileArray) => {
//         fileArray.forEach((file) => {
//           fs.unlinkSync(file.path);
//         });
//       });
//     }

//     res.status(500).json({ message: "Internal Server Error", error: error.message });
//   }
// };

// const getAllLoanDocuments = async (req, res) => {
//   try {
//     const documents = await LoanDocuments.find();
//     res.status(200).json(documents);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching loan documents", error: error.message });
//   }
// };




// module.exports = {
//   createFormOne,
//   getFormOneData,
//   getFormOneById,
//   updateFormOne,
//   deleteFormOne,
//   createFormTwo,
//   getFormTwoData,
//   getFormTwoById,
//   UpdateFormTwo,
//   deleteFormTwo,
//   uploadLoanDocuments,

// };

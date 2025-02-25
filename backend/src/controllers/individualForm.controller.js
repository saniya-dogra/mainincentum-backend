// controllers/formOne.js
const FormOne = require("../models/individualForms/FormOne.model");
const FormTwo = require("../models/individualForms/FormTwo.model");
const LoanDocuments = require("../models/individualForms/FormThree.model");
const { asyncHandler } = require("../utils/asyncHandler");
const fs = require("fs");

const createFormOne = async (req, res) => {
  try {
    const {
      full_name,
      father_name,
      mobile_number,
      email_id,
      dob,
      gender,
      qualification,
      employment_type,
      marital_status,
      spouse_employment_type,
      no_of_dependents,
      pan_number,
      residence_type,
      citizenship,
      permanent_state,
      permanent_district,
      permanent_address,
      permanent_pincode,
      present_state,
      present_district,
      present_address,
      present_pincode,
    } = req.body;

    const existingEmail = await FormOne.findOne({ email_id });
    if (existingEmail) {
      return res
        .status(400)
        .json({ error: "Email already exists. Please use a different email." });
    }

    const formOneData = new FormOne({
      full_name,
      father_name,
      mobile_number,
      email_id,
      dob,
      gender,
      qualification,
      employment_type,
      marital_status,
      spouse_employment_type,
      no_of_dependents,
      pan_number,
      residence_type,
      citizenship,
      permanent_state,
      permanent_district,
      permanent_address,
      permanent_pincode,
      present_state,
      present_district,
      present_address,
      present_pincode,
    });

    const savedData = await formOneData.save();

    res.status(201).json({
      message: "Form data submitted successfully!",
      data: savedData,
    });
  } catch (error) {
    console.error("Error in form submission:", error);
    if (error.code === 11000) {
      return res
        .status(400)
        .json({
          error: "Duplicate email detected. Please use a different email.",
        });
    }
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

const getFormOneById = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    const formOneData = await FormOne.findById(id);

    if (!formOneData) {
      return res.status(404).json({ message: "Form not found" });
    }

    res.status(200).json({
      message: "Form data retrieved successfully!",
      data: formOneData,
    });
  } catch (error) {
    console.error("Error in retrieving form data:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
});

const getFormOneData = asyncHandler(async (req, res) => {
  try {
    const formOneData = await FormOne.find();
    if (!formOneData) {
      return res.status(404).json({ message: "Form not found" });
    }
    res.status(200).json({
      message: "Form data retrieved successfully!",
      data: formOneData,
    });
  } catch (error) {
    console.error("Error in retrieving form data:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
});

const updateFormOne = asyncHandler(async(req,res)=>{
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "ID parameter is required" });
  }
    const updateForm = await FormOne.findByIdAndUpdate(id,req.body,{new:true});
    if(!updateForm){
      return res.status(404).json({message:"Form not found"});
    }

    res.status(200).json({message:"Form updated successfully",data:updateForm});
  } catch (error) {
    console.error("Error in updating form data:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
});

const deleteFormOne = asyncHandler(async(req,res)=>{
  try {
    const {id} = req.params;
    const deleteFormOne = await FormOne.findByIdAndDelete(id);
    if(!deleteFormOne){
      return res.status(404).json({message:"Form not found"});
    }
    res.status(200).json({message:"Form deleted successfully"});
  } catch (error) {
    console.error("Error in deleting form data:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
})






const formTwo = async (req, res, next) => {
  try {
    const { loanType, ...details } = req.body;

    // Create a loan object based on the loan type
    const loanData = { loanType };

    // Add loan-specific details based on the loan type
    switch (loanType) {
      case "Home Loan":
        loanData.homeDetails = details;
        break;
      case "Vehicle Loan":
        loanData.vehicleDetails = details;
        break;
      case "Business Loan":
        loanData.businessDetails = details;
        break;
      case "Personal Loan":
        loanData.personalDetails = details;
        break;
      case "Mortgage Loan":
        loanData.mortgageDetails = details;
        break;
      default:
        throw new Error("Invalid loan type");
    }

    // Save the loan application to the database
    const loan = new FormTwo(loanData);
    await loan.save();

    // Send response with all loan data
    res.status(201).json({
      message: "Loan application submitted successfully",
      loan: {
        _id: loan._id,
        loanType: loan.loanType,
        details: loanData, // Include all loan-specific details
      },
    });
  } catch (error) {
    console.error(error); // Log error for debugging
    next(error); // Pass error to global error handler
  }
};

const getFormTwoById = async (req, res) => {
  try {
    const loan = await FormTwo.findById(req.params.id);
    if (!loan) {
      return res.status(404).json({ message: "Loan application not found" });
    }
    res.status(200).json(loan);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error fetching loan application",
        error: error.message,
      });
  }
};

const uploadLoanDocuments = async (req, res) => {
  try {
    console.log("Request Body:", req.body);
    console.log("Request Files:", req.files);

    if (!req.files || Object.keys(req.files).length === 0) {
      console.log("No files were uploaded.");
      return res.status(400).json({ message: "No files were uploaded." });
    }

    const documentData = {};
    for (const [fieldName, fileArray] of Object.entries(req.files)) {
      documentData[fieldName] = fileArray[0].filename;
    }

    const newLoanDocument = new LoanDocuments(documentData);
    await newLoanDocument.save();

    res
      .status(201)
      .json({
        message: "Loan documents uploaded successfully",
        data: newLoanDocument,
      });
  } catch (error) {
    console.error("Error uploading loan documents:", error);

    if (req.files) {
      Object.values(req.files).forEach((fileArray) => {
        fileArray.forEach((file) => {
          fs.unlinkSync(file.path);
        });
      });
    }

    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

const getAllLoanDocuments = async (req, res) => {
  try {
    const documents = await LoanDocuments.find();
    res.status(200).json(documents);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching loan documents", error: error.message });
  }
};

module.exports = {
  createFormOne,
  getFormOneById,
  getFormOneData,
  updateFormOne,
  deleteFormOne,
  formTwo,
  getFormTwoById,
  uploadLoanDocuments,
  getAllLoanDocuments,
};

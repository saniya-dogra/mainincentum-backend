// controllers/formOne.js
const FormOne  = require("../models/individualForms/FormOne.model");
const Document = require("../models/individualForms/FormThree.model");
const FormTwo  = require("../models/individualForms/FormTwo.model");
const { asyncHandler } = require("../utils/asyncHandler");
const fs = require("fs");

const formOne = async (req, res) => {
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
      return res.status(400).json({ error: "Email already exists. Please use a different email." });
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
      return res.status(400).json({ error: "Duplicate email detected. Please use a different email." });
    }
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};



const getFormById = asyncHandler(async (req, res) => {
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
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
});



const formTwo = async (req, res, next) => {
  try {
    const { loanType, ...details } = req.body;

    // Create a loan object based on the loan type
    const loanData = {
      loanType,
    };

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

    const loan = new FormTwo(loanData);
    await loan.save();
    res.status(201).json({ message: "Loan application submitted successfully", loan });
  } catch (error) {
    next(error);
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
    res.status(500).json({ message: "Error fetching loan application", error: error.message });
  }
};


const uploadDocument = async (req, res, next) => {
  try {
      console.log("Request Headers:", req.headers);
      console.log("Received Body:", req.body);
      console.log("Received Files:", req.files);

      // Check if files are present
      if (!req.files) {
          console.log("No files were uploaded."); // Debugging
          return res.status(400).json({ message: "No files were uploaded." });
      }

      const { panCard, aadhaarCard, employeeId } = req.files;

      // Check if all required files are present
      if (!panCard || !aadhaarCard || !employeeId) {
          console.log("Missing files:", { panCard, aadhaarCard, employeeId }); // Debugging
          return res.status(400).json({ message: "All files (panCard, aadhaarCard, employeeId) are required!" });
      }

      // Validate file types
      const allowedTypes = ["application/pdf"];
      if (
          !allowedTypes.includes(panCard[0].mimetype) ||
          !allowedTypes.includes(aadhaarCard[0].mimetype) ||
          !allowedTypes.includes(employeeId[0].mimetype)
      ) {
          // Delete uploaded files if validation fails
          [panCard[0], aadhaarCard[0], employeeId[0]].forEach((file) => {
              fs.unlinkSync(file.path);
          });
          return res.status(400).json({ message: "Only PDF files are allowed!" });
      }

      // Save file details to the database
      const newDocument = new Document({
          panCard: panCard[0].filename,
          aadhaarCard: aadhaarCard[0].filename,
          employeeId: employeeId[0].filename,
      });

      await newDocument.save();
      res.status(201).json({ message: "Documents uploaded successfully", document: newDocument });
  } catch (error) {
      console.error("Error uploading documents:", error);
      res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

module.exports = { formOne, getFormById, formTwo, getFormTwoById, uploadDocument };
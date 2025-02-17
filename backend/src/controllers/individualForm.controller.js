// controllers/formOne.js
const FormOne  = require("../models/individualForms/FormOne.model");
const Document = require("../models/individualForms/FormThree.model");
const FormTwo  = require("../models/individualForms/FormTwo.model");
const { asyncHandler } = require("../utils/asyncHandler");
const fs = require("fs");

// Handle FormOne submission
const formOne = asyncHandler(async (req, res) => {
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

    if (!full_name || !father_name || !mobile_number || !dob || !gender) {
      return res.status(400).json({ message: "Missing required fields" });
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

    await formOneData.save();

    res.status(201).json({
      message: "Form data submitted successfully!",
      data: formOneData,
    });
  } catch (error) {
    console.error("Error in form submission:", error);
    res.status(400).json({
      message: "Validation Error",
      error: error.message,
    });
  }
});

// Get FormOne data by ID
const getFormById = asyncHandler(async (req, res) => {
  try {
    const formOneData = await FormOne.findById(req.params.id);
    if (!formOneData) {
      return res.status(404).json({ message: "Form not found" });
    }
    res.status(200).json({
      message: "Form data retrieved successfully!",
      data: formOneData,
    });
  } catch (error) {
    console.error("Error retrieving form data:", error);
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
});

// Handle FormTwo submission (Loan Application)
const formTwo = asyncHandler(async (req, res) => {
  try {
    const { loanType, ...details } = req.body;

    if (!loanType) {
      return res.status(400).json({ message: "Loan type is required" });
    }

    const  loanData = { loanType };


    switch (loanType) {  
      case "Home Loan":  
          if (!details.homeDetails || !details.homeDetails.employmentType) {  
              return res.status(400).json({ message: "employmentType is required for Home Loan" });  
          }
          loanData.homeDetails = details.homeDetails;  
          break;  

      case "Vehicle Loan":  
          if (!details.vehicleDetails) {  
              return res.status(400).json({ message: "vehicleDetails are required for Vehicle Loan" });  
          }  
          loanData.vehicleDetails = details.vehicleDetails;  
          break;  

      case "Business Loan":  
          if (!details.businessDetails) {  
              return res.status(400).json({ message: "businessDetails are required for Business Loan" });  
          }  
          loanData.businessDetails = details.businessDetails;  
          break;  

      case "Personal Loan":  
          if (!details.personalDetails) {  
              return res.status(400).json({ message: "personalDetails are required for Personal Loan" });  
          }  
          loanData.personalDetails = details.personalDetails;  
          break;  

      case "Mortgage Loan":  
          if (!details.mortgageDetails) {  
              return res.status(400).json({ message: "mortgageDetails are required for Mortgage Loan" });  
          }  
          loanData.mortgageDetails = details.mortgageDetails;  
          break;  

      default:  
          return res.status(400).json({ message: "Invalid loan type" });  
  } 

    const newFormTwo = new FormTwo(loanData);
    await newFormTwo.save();

    res.status(201).json({
      message: "Loan application submitted successfully",
      loan: newFormTwo,
    });
  } catch (error) {
    console.error("Error processing loan application:", error);
    res.status(400).json({
      message: "Validation Error",
      error: error.message,
    });
  }
});

// Get FormTwo data by ID
const getFormTwoById = asyncHandler(async (req, res) => {
  try {
    const loan = await FormTwo.findById(req.params.id);
    if (!loan) {
      return res.status(404).json({ message: "Loan application not found" });
    }
    res.status(200).json({
      message: "Loan application retrieved successfully",
      data: loan,
    });
  } catch (error) {
    console.error("Error fetching loan application:", error);
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
});


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
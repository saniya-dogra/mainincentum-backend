// controllers/formOne.js
const FormOne  = require("../models/individualForms/FormOne.model");
const FormTwo  = require("../models/individualForms/FormTwo.model");
const LoanDocuments  = require("../models/individualForms/FormThree.model");
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



const getFormById = asyncHandler(async (req, res) => {  //Correctly using asyncHandler
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





const formTwo = asyncHandler(async (req, res) => { // Using asyncHandler here.
  try {
    console.log("Received request body:", req.body); // Log the raw request body

    const loan = new FormTwo(req.body);  // Directly use req.body
    const savedLoan = await loan.save();    // Use .save()

    res.status(201).json({
      message: "Loan application submitted successfully",
      loan: savedLoan, // Return the entire saved document
    });
  } catch (error) {
      console.error("Error saving form data:", error); // More descriptive error
      res.status(400).json({ message: "Error saving form data", error: error.message }); // Send error details
  }
});



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

    res.status(201).json({ message: "Loan documents uploaded successfully", data: newLoanDocument });
  } catch (error) {
    console.error("Error uploading loan documents:", error);


    if (req.files) {
      Object.values(req.files).forEach((fileArray) => {
        fileArray.forEach((file) => {
          fs.unlinkSync(file.path);
        });
      });
    }

    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

const getAllLoanDocuments = async (req, res) => {
  try {
    const documents = await LoanDocuments.find();
    res.status(200).json(documents);
  } catch (error) {
    res.status(500).json({ message: "Error fetching loan documents", error: error.message });
  }
};


module.exports = { formOne, getFormById, formTwo, getFormTwoById, uploadLoanDocuments ,getAllLoanDocuments};
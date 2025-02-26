// controllers/individualForm.controller.js
const FormOne = require("../models/individualForms/FormOne.model");
const FormTwo = require("../models/individualForms/FormTwo.model");
const LoanDocuments = require("../models/individualForms/FormThree.model"); // Import Form Three model
const fs = require('fs'); // For file system operations (deleting files)
const path = require('path');
const { asyncHandler } = require("../utils/asyncHandler"); // Import asyncHandler
const mongoose = require('mongoose'); // Import mongoose

// ... (Your existing createFormOne, getFormOneData, etc. functions remain unchanged) ...
//copy and paste formOne all methods

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


const deleteFormOne = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: "ID parameter is required" });
        }

        const deletedForm = await FormOne.findByIdAndDelete(id);

        if (!deletedForm) {
            return res.status(404).json({ message: "Form not found" });
        }

        res.status(200).json({ message: "Form deleted successfully", data: deletedForm });
    } catch (error) {
        console.error("Error in deleting form data:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
});

const createFormTwo = asyncHandler(async (req, res) => { // Using asyncHandler here.
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
  
  const getFormTwoData = asyncHandler(async(req,res)=>{
      try {
          const formTwoData = await FormTwo.find();
          if(!formTwoData){
              return res.status(404).json({message:"Form not found"});
          }
  
          res.status(200).json({message:"Form data retrieved successfully",data:formTwoData});
      } catch (error) {
          console.error("Error in retrieving form data:", error);
          res.status(500).json({ message: "Internal Server Error", error: error.message });
      }
  });
  
  const getFormTwoById = asyncHandler(async(req,res)=>{
      try {
          const {id} = req.params;
          if(!id){
              return res.status(400).json({message:"ID parameter is required"});
          }
  
          const formTwoData = await FormTwo.findById(id);
          if(!formTwoData){
              return res.status(404).json({message:"Form not found"});
          }
  
          res.status(200).json({message:"Form data retrieved successfully",data:formTwoData});
  
      } catch (error) {
          console.error("Error in retrieving form data:", error);
          res.status(500).json({ message: "Internal Server Error", error: error.message });
      }
  });
  
  
  const UpdateFormTwo = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;

        // Validate MongoDB ObjectId
        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid or missing ID parameter" });
        }

        // Ensure request body is not empty
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({ message: "No data provided for update" });
        }

        // Update the form
        const updateFormTwo = await FormTwo.findByIdAndUpdate(id, req.body, { 
            new: true, 
            runValidators: true // Ensures validation rules are applied
        });

        if (!updateFormTwo) {
            return res.status(404).json({ message: "Form not found" });
        }

        res.status(200).json({ message: "Form updated successfully", data: updateFormTwo });

    } catch (error) {
        console.error("Error in updating form data:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
});
  const deleteFormTwo = asyncHandler(async(req,res)=>{
      try {
          const {id} = req.params;
  
          if(!id){
              return res.status(400).json({message:"ID parameter is required"});
          }
  
          const deleteFormTwo = await FormTwo.findByIdAndDelete(id);
          if(!deleteFormTwo){
              return res.status(404).json({message:"Form not found"});
          }     
          res.status(200).json({message:"Form deleted successfully",data:deleteFormTwo});
      } catch (error) {
          console.error("Error in deleting form data:", error); 
          res.status(500).json({ message: "Internal Server Error", error: error.message });
      }
  })

// Form Three Controller Functions

const uploadLoanDocuments = asyncHandler(async (req, res) => {
    try {
        console.log("Request Body:", req.body);  // Log the ENTIRE request body
        console.log("Request Files:", req.files); // Log the files received

        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).json({ message: "No files were uploaded." }); // Consistent JSON response
        }

        const documentData = {};

        // Iterate through all possible field names defined in your schema
        for (const field in req.files) {
            if (Object.hasOwn(req.files, field)) { // Use Object.hasOwn()
              // Assuming single file upload per field
              if(req.files[field] && req.files[field].length > 0){ //check for the length of array.
                documentData[field] = req.files[field][0].path;
              }
            }
        }


        const newLoanDocument = new LoanDocuments(documentData);
        const savedDocument = await newLoanDocument.save();

        res.status(201).json({
            message: "Documents uploaded and saved successfully!",
            document: savedDocument,
        });

    } catch (error) {
        console.error("Error uploading documents:", error);

        // Attempt to delete uploaded files on error.  VERY IMPORTANT.
        if (req.files) {
          for (const field in req.files) {
            if(Object.hasOwn(req.files, field) && req.files[field] && req.files[field].length > 0 && req.files[field][0].path){ //checking every condition
                try {
                   fs.unlinkSync(req.files[field][0].path); // Synchronous unlink
                   console.log("File Deleted:", req.files[field][0].path)
                 } catch (err) {
                    console.error(`Failed to delete file ${req.files[field][0].path}:`, err);
                 }
              }
            }
        }

        if (error.name === 'ValidationError') {
          // Handle Mongoose validation errors (e.g., missing required fields)
          const messages = Object.values(error.errors).map(val => val.message);
          return res.status(400).json({ message: messages });
        }

        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
});

const getAllLoanDocuments = asyncHandler(async (req, res) => {
    try {
        const documents = await LoanDocuments.find();
        res.status(200).json(documents);
    } catch (error) {
        console.error("Error fetching loan documents:", error);
        res.status(500).json({ message: "Error fetching loan documents", error: error.message });
    }
});


module.exports = {
    createFormOne,  // Keep these
    getFormOneById, // Keep these
    getFormOneData, // Keep these
    updateFormOne, // Keep these
    deleteFormOne, // Keep these
    createFormTwo,
    getFormTwoById,
    getFormTwoData,
    UpdateFormTwo,
    deleteFormTwo,
    uploadLoanDocuments,   // Export Form Three functions
    getAllLoanDocuments    // Export Form Three functions
};
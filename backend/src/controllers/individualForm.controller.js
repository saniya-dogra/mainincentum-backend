// controllers/formOne.js
const FormOne  = require("../models/individualForms/FormOne.model");
const FormTwo  = require("../models/individualForms/FormTwo.model");
const { asyncHandler } = require("../utils/asyncHandler");

const formOne = asyncHandler(async (req, res) => {
  try {
    // Destructure the data from req.body
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

    // Log incoming request body (optional)
    console.log("Incoming request body:", req.body);

    // Creating new FormOne data
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

    // Save data to the database
    await formOneData.save();

    // Send response
    res.status(201).json({
      message: "Form data submitted successfully!",
      data: formOneData,
    });
  } catch (error) {
    console.error("Error in form submission:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
});

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



const formTwo = asyncHandler(async (req, res) => {  
  try {  
      const { loanType, ...details } = req.body;  
      const loanData = { loanType };  

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

      const newFormTwo = new FormTwo(loanData);  
      await newFormTwo.save();  
      res.status(201).json({  
          message: "Loan application submitted successfully",  
          loan: newFormTwo  
      });  
  } catch (error) {  
      res.status(500).json({ message: "Error processing loan application", error: error.message });  
  }  
});  

const getFormTwoById = asyncHandler(async (req, res) => {  
  try {  
      const loan = await FormTwo.findById(req.params.id);  
      if (!loan) {  
          return res.status(404).json({ message: "Loan application not found" });  
      }  
      res.status(200).json(loan);  
  } catch (error) {  
      res.status(500).json({ message: "Error fetching loan application", error: error.message });  
  }  
});  


module.exports = { formOne, getFormById,formTwo,getFormTwoById };







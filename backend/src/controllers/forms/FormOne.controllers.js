// controllers/forms/FormOne.controllers.js
const HomeLoanOne = require("../../models/forms/FormOne.models");
const HomeLoanThree = require("../../models/forms/FormThree.models");
const HomeLoanTwo = require("../../models/forms/FormTwo.models");
const ApiError = require("../../utils/ApiError");
const ApiResponse = require("../../utils/ApiResponse");
const { asyncHandler } = require("../../utils/asyncHandler");

const multer = require('multer');
const storage = multer.memoryStorage(); // Store files in memory as buffer
const upload = multer({ storage });

// Save Form Data API
const saveFormData = asyncHandler(async (req, res) => {
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
    present_pincode
  } = req.body;

  // Basic Validation
  if (!full_name || !mobile_number || !dob || !email_id || !gender) {
    throw new ApiError(400, "All required fields are not provided");
  }

  // Log the incoming request data to debug
  console.log('Received form data:', req.body);

  // Create the form data
  try {
    const formData = await HomeLoanOne.create({
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
      present_pincode
    });

    return res.status(201).json(new ApiResponse(201, formData, "Form data saved successfully"));
  } catch (err) {
    console.error('Error while saving form data:', err);
    throw new ApiError(500, "Error saving form data");
  }
});

// Fetch all Form Entries API
const fetchAllFormEntries = asyncHandler(async (req, res) => {
    try {
      const results = await HomeLoanOne.findAll();
  
      if (results.length === 0) {
        throw new ApiError(404, "No form entries found.");
      }
  
      return res.status(200).json(new ApiResponse(200, results, "Form data fetched successfully"));
    } catch (err) {
      console.error('Error fetching form data:', err);
      throw new ApiError(500, "Error fetching form data");
    }
  });


// Save Form Data Two API
const saveFormDataTwo = asyncHandler(async (req, res) => {
  const {
    user_type,
    organisation_name,
    designation_salaried,
    organisation_type,
    work_experience,
    work_experience_duration,
    monthly_salary,
    place_of_posting,
    salary_bank_name,
    company_name,
    company_type,
    incorporation_date,
    designation_self,
    years_in_business,
    years_of_itr_filing,
    property_finalised,
    property_address,
    agreement_executed,
    agreement_mou_value,
    loan_amount_required,
    preferred_banks
  } = req.body;

  // Log the incoming request data to debug
  console.log('Received form data (Form Two):', req.body);

  try {
    const formDataTwo = await HomeLoanTwo.create({
      user_type,
      organisation_name,
      designation_salaried,
      organisation_type,
      work_experience,
      work_experience_duration,
      monthly_salary,
      place_of_posting,
      salary_bank_name,
      company_name,
      company_type,
      incorporation_date,
      designation_self,
      years_in_business,
      years_of_itr_filing,
      property_finalised,
      property_address,
      agreement_executed,
      agreement_mou_value,
      loan_amount_required,
      preferred_banks
    });

    return res.status(201).json(new ApiResponse(201, formDataTwo, "Form data saved successfully"));
  } catch (err) {
    console.error('Error while saving form data (Form Two):', err);
    throw new ApiError(500, "Error saving form data");
  }
});

// Fetch all Form Two Entries API
const fetchAllFormEntriesTwo = asyncHandler(async (req, res) => {
  try {
    const results = await HomeLoanTwo.findAll();

    if (results.length === 0) {
      throw new ApiError(404, "No loan applications found.");
    }

    return res.status(200).json(new ApiResponse(200, results, "Form data fetched successfully"));
  } catch (err) {
    console.error('Error fetching form data:', err);
    throw new ApiError(500, "Error fetching form data");
  }
});



const uploadDocuments = [
  upload.fields([
    { name: 'pan_card', maxCount: 1 },
    { name: 'aadhar_card', maxCount: 1 },
    { name: 'employer_id_card', maxCount: 1 },
    { name: 'joining_confirmation_letter', maxCount: 1 },
    { name: 'last_12_month_salary_statement', maxCount: 1 },
    { name: 'existing_loan_account_statement', maxCount: 1 },
    { name: 'latest_6_month_salary_slip', maxCount: 1 },
    { name: 'form_16_and_26as', maxCount: 1 },
    { name: 'itr_and_computation', maxCount: 1 },
    { name: 'firm_registration', maxCount: 1 },
    { name: 'gstr_last_year', maxCount: 1 },
    { name: 'current_account_statement', maxCount: 1 },
    { name: 'balance_sheets', maxCount: 1 },
    { name: 'loan_closure_statements', maxCount: 1 },
  ]),
  asyncHandler(async (req, res) => {
    // Check uploaded files
    if (!req.files) {
      throw new ApiError(400, "No files uploaded");
    }

    const files = req.files;

    // Process files as buffers and store them in documentData
    const documentData = {
      pan_card: files.pan_card ? files.pan_card[0].buffer : null,
      aadhar_card: files.aadhar_card ? files.aadhar_card[0].buffer : null,
      employer_id_card: files.employer_id_card ? files.employer_id_card[0].buffer : null,
      joining_confirmation_letter: files.joining_confirmation_letter ? files.joining_confirmation_letter[0].buffer : null,
      last_12_month_salary_statement: files.last_12_month_salary_statement ? files.last_12_month_salary_statement[0].buffer : null,
      existing_loan_account_statement: files.existing_loan_account_statement ? files.existing_loan_account_statement[0].buffer : null,
      latest_6_month_salary_slip: files.latest_6_month_salary_slip ? files.latest_6_month_salary_slip[0].buffer : null,
      form_16_and_26as: files.form_16_and_26as ? files.form_16_and_26as[0].buffer : null,
      itr_and_computation: files.itr_and_computation ? files.itr_and_computation[0].buffer : null,
      firm_registration: files.firm_registration ? files.firm_registration[0].buffer : null,
      gstr_last_year: files.gstr_last_year ? files.gstr_last_year[0].buffer : null,
      current_account_statement: files.current_account_statement ? files.current_account_statement[0].buffer : null,
      balance_sheets: files.balance_sheets ? files.balance_sheets[0].buffer : null,
      loan_closure_statements: files.loan_closure_statements ? files.loan_closure_statements[0].buffer : null,
    };

    // Save to MySQL database using Sequelize ORM
    try {
      const newDocument = await HomeLoanThree.create(documentData);
      return res.status(201).json(new ApiResponse(201, newDocument, "Documents uploaded successfully!"));
    } catch (error) {
      return res.status(500).json(new ApiResponse(500, null, "An error occurred while saving data"));
    }
  })
];

  
  
  module.exports = {
    saveFormData,
    fetchAllFormEntries,
    saveFormDataTwo,
    fetchAllFormEntriesTwo,
    uploadDocuments
  };
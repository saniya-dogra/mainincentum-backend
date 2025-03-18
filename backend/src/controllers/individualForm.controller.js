const { default: mongoose } = require("mongoose");
const Form = require("../models/individualForms/FormOne.model");
const { asyncHandler } = require("../utils/asyncHandler");
const upload = require("../utils/FileUploaded");

// ====================== Step 1: Save Personal Details ======================
const savePersonalDetails = asyncHandler(async (req, res) => {
  const { userId, applicants } = req.body;

  // Validate request payload
  if (
    !userId ||
    !applicants ||
    !Array.isArray(applicants) ||
    applicants.length === 0
  ) {
    return res
      .status(400)
      .json({ message: "userId and applicants array are required" });
  }

  // Validate userId format
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "Invalid userId format" });
  }

  // Validate each applicant's required fields
  for (const applicant of applicants) {
    if (!applicant.full_name || !applicant.email_id) {
      return res.status(400).json({
        message: "full_name and email_id are required for all applicants",
      });
    }
    if (
      applicant.mobile_number &&
      !/^[0-9]{10}$/.test(applicant.mobile_number)
    ) {
      return res
        .status(400)
        .json({ message: "mobile_number must be a 10-digit number" });
    }
    if (
      applicant.permanent_pincode &&
      !/^[0-9]{6}$/.test(applicant.permanent_pincode)
    ) {
      return res
        .status(400)
        .json({ message: "permanent_pincode must be a 6-digit number" });
    }
    if (
      applicant.present_pincode &&
      !/^[0-9]{6}$/.test(applicant.present_pincode)
    ) {
      return res
        .status(400)
        .json({ message: "present_pincode must be a 6-digit number" });
    }
  }

  try {
    let form = await Form.findOne({ user: userId });

    if (!form) {
      // Explicitly construct the new document
      form = new Form();
      form.user = userId;
      form.personalDetails = applicants;
      form.loanApplication = {};
      form.loanDocuments = {};
      form.status = "Pending";
    } else {
      form.personalDetails = applicants;
    }
    await form.save();
    console.log("Form document saved successfully:", form.toObject());
    res
      .status(200)
      .json({ message: "Personal details saved successfully", data: form });
  } catch (error) {
    console.error("Error saving personal details:", error);
    res.status(500).json({
      message: "Failed to save personal details",
      error: error.message,
    });
  }
});

// ====================== Step 2: Save Loan Application ======================
const saveLoanApplication = asyncHandler(async (req, res) => {
  console.log("Request body received:", req.body); // Debug log

  const { userId, loanType, numberOfApplicants, applicants, commonDetails } =
    req.body;

  // Validate required fields
  if (
    !userId ||
    !loanType ||
    !applicants ||
    !Array.isArray(applicants) ||
    applicants.length === 0
  ) {
    return res
      .status(400)
      .json({ message: "userId, loanType, and applicants array are required" });
  }

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "Invalid userId format" });
  }

  // Validate each applicant's user_type
  for (const applicant of applicants) {
    if (!applicant.user_type) {
      return res
        .status(400)
        .json({ message: "user_type is required for all applicants" });
    }
  }

  try {
    let form = await Form.findOne({ user: userId });

    // Transform applicants data to match schema
    const transformedApplicants = applicants.map((applicant) => {
      const { user_type, ...rest } = applicant;
      return {
        user_type,
        salariedDetails:
          user_type === "Salaried"
            ? {
                organisation_name: rest.organisation_name || "",
                organisation_type: rest.organisation_type || "",
                currentOrganizationExperience:
                  rest.currentOrganizationExperience || "",
                previousOrganizationExperience:
                  rest.previousOrganizationExperience || "",
                designation_salaried: rest.designation_salaried || "",
                place_of_posting: rest.place_of_posting || "",
                monthly_salary: rest.monthly_salary || "",
                salary_bank_name: rest.salary_bank_name || "",
              }
            : null,
        selfEmployedDetails:
          user_type === "Self-Employed"
            ? {
                company_name: rest.company_name || "",
                company_type: rest.company_type || "",
                incorporation_date: rest.incorporation_date || "",
                designation_self: rest.designation_self || "",
                years_in_business: rest.years_in_business || "",
                years_of_itr_filing: rest.years_of_itr_filing || "",
              }
            : null,
      };
    });

    const loanApplicationData = {
      loanType,
      applicants: transformedApplicants,
      property_finalised: commonDetails?.property_finalised || "",
      property_address: commonDetails?.property_address || "",
      agreement_executed: commonDetails?.agreement_executed || "",
      agreement_mou_value: commonDetails?.agreement_mou_value || "",
      loan_amount_required: commonDetails?.loan_amount_required || "",
      preferred_banks: commonDetails?.preferred_banks || "",
      vehicleDetails:
        loanType === "Vehicle Loan"
          ? {
              vehicleModel: commonDetails?.vehicleModel || "",
              expectedDeliveryDate: commonDetails?.expectedDeliveryDate || "",
              dealerName: commonDetails?.dealerName || "",
              dealerCity: commonDetails?.dealerCity || "",
              vehiclePrice: commonDetails?.vehiclePrice || "",
            }
          : null,
    };

    if (!form) {
      console.log("Creating new Form document for user:", userId);
      form = new Form({
        user: userId,
        personalDetails: [], // Empty array if not provided yet
        loanApplication: loanApplicationData,
        loanDocuments: null,
        status: "Pending",
      });
    } else {
      console.log("Updating existing Form document for user:", userId);
      form.loanApplication = loanApplicationData;
    }

    await form.save();
    console.log("Form document saved successfully:", form.toObject());
    res
      .status(200)
      .json({ message: "Loan application saved successfully", data: form });
  } catch (error) {
    console.error("Error saving loan application:", error);
    res.status(500).json({
      message: "Failed to save loan application",
      error: error.message,
    });
  }
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

  console.log("1. Request Body:", req.body); // Should show userId
  console.log("2. Uploaded Files:", JSON.stringify(req.files, null, 2)); // Detailed file info

  if (!userId) {
    return res.status(400).json({ message: "userId is required" });
  }

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "Invalid userId format" });
  }

  let form = await Form.findOne({ user: userId });
  console.log("3. Found Form:", form ? form : "No form found");

  if (
    !form ||
    !form.loanApplication ||
    !form.loanApplication.applicants.length
  ) {
    return res
      .status(400)
      .json({ message: "Please complete Step 1 and Step 2 first" });
  }

  const numberOfApplicants = form.loanApplication.applicants.length;
  console.log("4. Number of Applicants:", numberOfApplicants);

  const loanDocumentsArray = Array(numberOfApplicants)
    .fill()
    .map(() => ({}));

  // Process uploaded files
  if (req.files && Object.keys(req.files).length > 0) {
    for (const [fieldName, fileArray] of Object.entries(req.files)) {
      if (fileArray && fileArray.length > 0) {
        let applicantIndex = 0; // Default to first applicant
        let docType = fieldName;

        console.log("5. Processing Field:", fieldName);

        if (fieldName.includes("_")) {
          const [indexStr, type] = fieldName.split("_");
          const index = parseInt(indexStr, 10);
          if (!isNaN(index) && index >= 0 && index < numberOfApplicants) {
            applicantIndex = index;
            docType = type;
          } else {
            console.warn(
              `Invalid applicant index in field: ${fieldName}, defaulting to 0`
            );
          }
        }

        console.log(
          `6. Assigning ${docType} to applicant ${applicantIndex}: ${fileArray[0].path}`
        );
        loanDocumentsArray[applicantIndex][docType] = fileArray[0].path;
      }
    }
  } else {
    console.log("5. No files uploaded or req.files is empty");
    return res.status(400).json({ message: "No files uploaded" });
  }

  console.log(
    "7. Loan Documents Array Before Save:",
    JSON.stringify(loanDocumentsArray, null, 2)
  );

  // Assign and save
  form.loanDocuments = loanDocumentsArray;
  form.markModified("loanDocuments");
  await form.save();

  const updatedForm = await Form.findOne({ user: userId });
  console.log(
    "8. Saved Form Loan Documents:",
    JSON.stringify(updatedForm.loanDocuments, null, 2)
  );

  res
    .status(201)
    .json({ message: "Loan documents saved successfully", data: updatedForm });
});
// ====================== Fetch All Forms ======================
const fetchAllForms = asyncHandler(async (req, res) => {
  try {
    const forms = await Form.find()
      .populate("user", "name email") // Only populate specific user fields
      .lean(); // Convert to plain JavaScript objects for better performance
    
    if (!forms || forms.length === 0) {
      return res.status(404).json({ 
        success: false,
        message: "No forms found" 
      });
    }

    res.status(200).json({
      success: true,
      message: "Forms fetched successfully",
      data: forms,
      total: forms.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch forms",
      error: error.message
    });
  }
});

// ====================== Fetch Form by ID ======================
const fetchFormById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ success: false, message: "Invalid form ID format" });
  }

  try {
    const form = await Form.findById(id).populate("user", "name email").lean();
    if (!form) {
      return res.status(404).json({ success: false, message: "Form not found" });
    }

    const baseUrl = `${req.protocol}://${req.get("host")}/`;
    const updatedLoanDocuments = form.loanDocuments.map((doc) => {
      const updatedDoc = {};
      for (const [key, value] of Object.entries(doc)) {
        updatedDoc[key] = value ? `${baseUrl}${value.split('/').pop()}` : null;
      }
      return updatedDoc;
    });

    const reorderedForm = {
      _id: form._id,
      user: form.user,
      personalDetails: form.personalDetails,
      loanApplication: form.loanApplication,
      loanDocuments: updatedLoanDocuments,
      status: form.status,
      createdAt: form.createdAt,
      updatedAt: form.updatedAt,
      __v: form.__v,
    };

    res.status(200).json({
      success: true,
      message: "Form fetched successfully",
      data: reorderedForm,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch form", error: error.message });
  }
});

// ====================== Update Form ======================
const updateForm = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // Validate ID format
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid form ID format"
    });
  }

  // Validate request body
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({
      success: false,
      message: "Update data is required"
    });
  }

  try {
    const updatedForm = await Form.findByIdAndUpdate(
      id,
      { $set: req.body }, // Use $set to update only provided fields
      {
        new: true,
        runValidators: true,
        context: "query"
      }
    ).populate("user", "name email");

    if (!updatedForm) {
      return res.status(404).json({
        success: false,
        message: "Form not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Form updated successfully",
      data: updatedForm
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update form",
      error: error.message
    });
  }
});


// ====================== Delete Form ======================
const deleteForm = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // Validate ID format
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid form ID format"
    });
  }

  try {
    const deletedForm = await Form.findByIdAndDelete(id);

    if (!deletedForm) {
      return res.status(404).json({
        success: false,
        message: "Form not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Form deleted successfully",
      data: deletedForm
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete form",
      error: error.message
    });
  }
});

const updateFormStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  // Validate ID format
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid form ID format"
    });
  }

  // Validate status
  const validStatuses = ["Pending", "Approved", "In Progress", "Rejected"];
  if (!status || !validStatuses.includes(status)) {
    return res.status(400).json({
      success: false,
      message: `Status must be one of: ${validStatuses.join(", ")}`
    });
  }

  try {
    const updatedForm = await Form.findByIdAndUpdate(
      id,
      { status },
      {
        new: true,
        runValidators: true
      }
    ).populate("user", "name email");

    if (!updatedForm) {
      return res.status(404).json({
        success: false,
        message: "Form not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Form status updated successfully",
      data: updatedForm
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update form status",
      error: error.message
    });
  }
});

const getFormsByUserId = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  console.log(`Fetching forms for user ID: ${userId}`);

  try {
    // Fetch forms by user ID
    const forms = await Form.find({ user: userId });

    // If no forms are found, return a 404 response
    if (!forms || forms.length === 0) {
      console.log(`No forms found for user ID: ${userId}`);
      return res.status(404).json({ 
        success: false, 
        message: "No forms found for this user" 
      });
    }

    // If forms are found, return them in the response
    console.log(`Forms found for user ID: ${userId}`, forms);
    res.status(200).json({ 
      success: true, 
      data: forms 
    });

  } catch (error) {
    // Handle any errors that occur during the process
    console.error(`Error fetching forms for user ID: ${userId}`, error);
    res.status(500).json({ 
      success: false, 
      message: "Internal server error",
      error: error.message 
    });
  }
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
  getFormsByUserId
};


const express = require("express");
const router = express.Router();
const formController = require('../controllers/individualForm.controller'); 

// Step 1: Save Personal Details
router.post("/personal-details", formController.savePersonalDetails);

// Step 2: Save Loan Application
router.post("/loan-application", formController.saveLoanApplication);

// Step 3: Save Loan Documents
router.post("/loan-documents", formController.handleFileUploads, formController.saveLoanDocuments);

// Fetch All Forms
router.get("/", formController.fetchAllForms);

// Fetch Form by ID
router.get("/:id", formController.fetchFormById);

// Update Form
router.put("/:id", formController.updateForm);

// Update Form Status
router.patch("/:id/status", formController.updateFormStatus);

// Delete Form
router.delete("/:id", formController.deleteForm);

module.exports = router;













// const { Router } = require("express");
// const {  createFormOne, getFormOneById, getFormOneData, updateFormOne, deleteFormOne, createFormTwo, getFormTwoData, getFormTwoById, UpdateFormTwo, deleteFormTwo, uploadLoanDocuments , } = require("../controllers/individualForm.controller");
// const upload = require("../utils/FileUploaded");
// const formController = require('../controllers/individualForm.controller'); 

// const formRouter = Router();

// formRouter.route("/form-one").post(createFormOne); 
// formRouter.route("/form-one").get(getFormOneData); 
// formRouter.route("/form-one/:id").get(getFormOneById); 
// formRouter.route("/form-one/:id").put(updateFormOne); 
// formRouter.route("/form-one/:id").delete(deleteFormOne); 



//  formRouter.route("/form-two").post(createFormTwo); 
//  formRouter.route("/form-two").get(getFormTwoData); 
//  formRouter.route("/form-two/:id").get(getFormTwoById); 
//  formRouter.route("/form-two/:id").put(UpdateFormTwo); 
//  formRouter.route("/form-two/:id").delete(deleteFormTwo); 





// formRouter.post("/form-three", upload.fields([
//   { name: "panCard", maxCount: 1 },
//   { name: "aadharCard", maxCount: 1 },
//   { name: "employerIDCard", maxCount: 1 },
//   { name: "joiningConfirmationExperienceLetter", maxCount: 1 },
//   { name: "last12MonthSalaryAccountStatement", maxCount: 1 },
//   { name: "existingLoanAccountStatement", maxCount: 1 },
//   { name: "latest6MonthSalarySlip", maxCount: 1 },
//   { name: "form16PartABAnd26AS", maxCount: 1 },
//   { name: "itrAndComputation", maxCount: 1 },
//   { name: "firmRegistrationCertificate", maxCount: 1 },
//   { name: "gstrLastYear", maxCount: 1 },
//   { name: "last6Or12MonthCurrentAccountStatement", maxCount: 1 },
//   { name: "balanceSheets", maxCount: 1 },
//   { name: "nocLoanCloseStatements", maxCount: 1 },
//   { name: "drivingLicense", maxCount: 1 },
//   { name: "kycProprietorPartnersDirectors", maxCount: 1 },
//   { name: "certificateForIncorporation", maxCount: 1 },
//   { name: "articleOfAssociation", maxCount: 1 },
//   { name: "memorandumOfAssociation", maxCount: 1 },
//   { name: "businessAccountStatement", maxCount: 1 },
//   { name: "otherRelevantDocuments", maxCount: 1 },
// ]),formController.uploadLoanDocuments);


// // Route for fetching all loan documents
// // formRouter.get("/form-three", getAllLoanDocuments);    


// module.exports = formRouter;
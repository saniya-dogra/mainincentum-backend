const { Router } = require("express");
const {  createFormOne, getFormOneById, getFormOneData, updateFormOne, deleteFormOne, createFormTwo, getFormTwoData, getFormTwoById, UpdateFormTwo, deleteFormTwo, uploadLoanDocuments , } = require("../controllers/individualForm.controller");
// const  uploadLoanDocuments  = require('../controllers/individualForm.controller');
const upload = require("../utils/FileUploaded");
// const formController = require('../controllers/individualForm.controller'); // Correct path to your controller

const formRouter = Router();

formRouter.route("/form-one").post(createFormOne); 
formRouter.route("/form-one").get(getFormOneData); 
formRouter.route("/form-one/:id").get(getFormOneById); 
formRouter.route("/form-one/:id").put(updateFormOne); 
formRouter.route("/form-one/:id").delete(deleteFormOne); 



 formRouter.route("/form-two").post(createFormTwo); 
 formRouter.route("/form-two").get(getFormTwoData); 
 formRouter.route("/form-two/:id").get(getFormTwoById); 
 formRouter.route("/form-two/:id").put(UpdateFormTwo); 
 formRouter.route("/form-two/:id").delete(deleteFormTwo); 





formRouter.post("/form-three", upload.fields([
  { name: "panCard", maxCount: 1 },
  { name: "panCardofFirm", maxCount: 1 },
  { name: "aadharCard", maxCount: 1 },
  { name: "employerIDCard", maxCount: 1 },
  { name: "joiningConfirmationExperienceLetter", maxCount: 1 },
  { name: "last12MonthSalaryAccountStatement", maxCount: 1 },
  { name: "last12MonthSavingsAccountStatement", maxCount: 1 },
  { name: "existingLoanAccountStatement", maxCount: 1 },
  { name: "latest6MonthSalarySlip", maxCount: 1 },
  { name: "form16PartABAnd26AS", maxCount: 1 },
  { name: "itrAndComputation", maxCount: 1 },
  { name: "firmRegistrationCertificate", maxCount: 1 },
  { name: "gstrLastYear", maxCount: 1 },
  { name: "last6Or12MonthCurrentAccountStatement", maxCount: 1 },
  { name: "last6Or12MonthBusinessAccountStatement", maxCount: 1 },
  { name: "balanceSheets", maxCount: 1 },
  { name: "nocLoanCloseStatements", maxCount: 1 },
  { name: "drivingLicense", maxCount: 1 },
  { name: "kycProprietorPartnersDirectors", maxCount: 1 },
  { name: "certificateForIncorporation", maxCount: 1 },
  { name: "articleOfAssociation", maxCount: 1 },
  { name: "memorandumOfAssociation", maxCount: 1 },
  { name: "businessAccountStatement", maxCount: 1 },
  { name: "otherRelevantDocuments", maxCount: 1 },
]),(req, res) => {
    console.log("Uploaded Files:", req.files); // Log uploaded files
    console.log("Request Body:", req.body); // Log request body for debugging
    uploadLoanDocuments(req, res);
});
// Route for fetching all loan documents
// formRouter.get("/form-three", getAllLoanDocuments);    


module.exports = formRouter;
const { Router } = require("express");
const { formOne, getFormById, formTwo, getFormTwoById, uploadLoanDocuments, getAllLoanDocuments } = require("../controllers/individualForm.controller");
const upload = require("../utils/FileUploaded");

const formRouter = Router();

formRouter.route("/form-one").post(formOne); // Create new form
formRouter.route("/form-one/:id").get(getFormById); // Get form by ID

formRouter.route("/form-two").post(formTwo); // Create new form
formRouter.route("/form-two/:id").get(getFormTwoById); // Get form by ID

formRouter.post("/form-three", upload.fields([
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
]),uploadLoanDocuments);

// Route for fetching all loan documents
formRouter.get("/form-three", getAllLoanDocuments);    


module.exports = formRouter;
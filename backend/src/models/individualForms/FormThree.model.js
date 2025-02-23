const mongoose = require("mongoose");

const loanDocumentsSchema = new mongoose.Schema({
  panCard: { type: String },
  aadharCard: { type: String },
  employerIDCard: { type: String },
  joiningConfirmationExperienceLetter: { type: String },
  last12MonthSalaryAccountStatement: { type: String },
  existingLoanAccountStatement: { type: String },
  latest6MonthSalarySlip: { type: String },
  form16PartABAnd26AS: { type: String },
  itrAndComputation: { type: String },
  firmRegistrationCertificate: { type: String },
  gstrLastYear: { type: String },
  last6Or12MonthCurrentAccountStatement: { type: String },
  balanceSheets: { type: String },
  nocLoanCloseStatements:{type:String},
  drivingLicense: { type: String },
  kycProprietorPartnersDirectors: { type: String },
  certificateForIncorporation: { type: String },
  articleOfAssociation: { type: String },
  memorandumOfAssociation: { type: String },
  businessAccountStatement: { type: String },
  otherRelevantDocuments: { type: String }
}, { timestamps: true });

const LoanDocuments = mongoose.model("LoanDocuments", loanDocumentsSchema);

module.exports = LoanDocuments;

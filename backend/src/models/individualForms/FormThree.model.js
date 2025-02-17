const mongoose = require('mongoose');
const { Schema } = mongoose;

const loanApplicationSchema = new Schema({
  panCard: {
    type: String,
    required: false, // No required validation, as the field may not always be present
    ref: 'PDF', // Assuming you have a PDF model to store the files
  },
  aadharCard: {
    type: String,
    required: false,
    ref: 'PDF',
  },
  employerIdCard: {
    type: String,
    required: false,
    ref: 'PDF',
  },
  joiningLetter: {
    type: String,
    required: false,
    ref: 'PDF',
  },
  Last12MonthSalaryAccountStatement: {
    type: String,
    required: false,
    ref: 'PDF',
  },
  loanAccountStatement: {
    type: String,
    required: false,
    ref: 'PDF',
  },
  salarySlip: {
    type: String,
    required: false,
    ref: 'PDF',
  },
  form16: {
    type: String,
    required: false,
    ref: 'PDF',
  },
  itrComputation: {
    type: String,
    required: false,
    ref: 'PDF',
  },
  gstr: {
    type: String,
    required: false,
    ref: 'PDF',
  },
  currentAccountStatement: {
    type: String,
    required: false,
    ref: 'PDF',
  },
  savingsBankAccountStatement: {
    type: String,
    required: false,
    ref: 'PDF',
  },
  balanceSheets: {
    type: String,
    required: false,
    ref: 'PDF',
  },
  nocLoanClosureStatements: {
    type: String,
    required: false,
    ref: 'PDF',
  },
  drivingLicense: {
    type: String,
    required: false,
    ref: 'PDF',
  },
  firmRegistration: {
    type: String,
    required: false,
    ref: 'PDF',
  },
  businessAccountStatement: {
    type: String,
    required: false,
    ref: 'PDF',
  },
  otherRelevantDocuments: {
    type: String,
    required: false,
    ref: 'PDF',
  },
  kyc: {
    type: String,
    required: false,
    ref: 'PDF',
  },
  certificateForIncorporation: {
    type: String,
    required: false,
    ref: 'PDF',
  },
  articleOfAssociation: {
    type: String,
    required: false,
    ref: 'PDF',
  },
  memorandumOfAssociation: {
    type: String,
    required: false,
    ref: 'PDF',
  },
}, { timestamps: true });

const LoanApplication = mongoose.model('LoanApplication', loanApplicationSchema);

module.exports = LoanApplication;

const mongoose = require("mongoose");

const personalDetailsSchema  = new mongoose.Schema({
  full_name: { type: String },
  father_name: { type: String },
  mobile_number: { type: String, match: /^[0-9]{10}$/ },
  email_id: {
    type: String,
    match: /\S+@\S+\.\S+/,
  },
  dob: { type: String },
  gender: { type: String }, 
  qualification: { type: String }, 
  employment_type: { type: String }, 
  marital_status: { type: String }, 
  spouse_employment_type: { type: String }, 
  no_of_dependents: { type: Number, min: 0, max: 3 },
  pan_number: {
    type: String,
    // match: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
  },
  residence_type: { type: String }, 
  citizenship: { type: String },

  // Permanent Address
  permanent_state: { type: String },
  permanent_district: { type: String },
  permanent_address: { type: String },
  permanent_pincode: { type: String, match: /^[0-9]{6}$/ },

  // Present Address
  present_state: { type: String },
  present_district: { type: String },
  present_address: { type: String },
  present_pincode: { type: String, match: /^[0-9]{6}$/ },
},{ _id: false });


const loanApplicationSchema  = new mongoose.Schema({
    loanType: {
        type: String,
        enum: ["Home Loan", "Vehicle Loan", "Business Loan", "Personal Loan", "Mortgage Loan"],
        required: true,
    },
    user_type: { 
      type: String,
      enum: ["Salaried", "Self-Employed",], 
       required: true, 
    },
    homeDetails: {
        type: new mongoose.Schema({
            employmentType: {
                type: String,
                enum: ["Salaried", "Self-Employed"],
            },
            salariedDetails: {
                organisation_name: String, 
                organisation_type: {
                    type: String,
                    enum: ["Central Govt.", "State Govt.", "Govt. Organisation", "PSU", "Private Limited Company", "Public Limited Company", "Partnership Firm", "Proprietary Firm", "LLP", "Others"],
                },
                currentOrganizationExperience: String, 
                previousOrganizationExperience: String, 
                designation_salaried: String,
                place_of_posting: String,
                monthly_salary: Number,
                salary_bank_name: String,
            },
            selfEmployedDetails: {
                company_name: String, 
                company_type: {
                    type: String,
                    enum: ["Company", "Partnership Firm", "Proprietary Firm", "LLP", "Others"],
                },
                incorporation_date: Number,
                designation_self: {
                    type: String,
                    enum: ["Proprietor", "Partner", "Founder", "Director", "Others"],
                },
                years_in_business: Number,
                years_of_itr_filing: Number,
            },
            loanAmountRequired: Number,
            propertyFinalized: String,  
            propertyAddress: String,
            agreementExecuted: String,    
            agreementValue: Number,  
            preferredBank: String, 
        }, { _id: false }),
    },
    vehicleDetails: {
        type: new mongoose.Schema({
            employmentType: {
                type: String,
                enum: ["Salaried", "Self-Employed"],
            },
            salariedDetails: {
                organisation_name: String,
                organisation_type: {
                    type: String,
                    enum: ["Central Govt.", "State Govt.", "Govt. Organisation", "PSU", "Private Limited Company", "Public Limited Company", "Partnership Firm", "Proprietary Firm", "LLP", "Others"],
                },
                currentOrganizationExperience: String,
                previousOrganizationExperience: String,
                designation_salaried: String,
                place_of_posting: String,
                monthly_salary: Number,
                salary_bank_name: String,
            },
            selfEmployedDetails: {
                company_name: String,
                company_type: {
                    type: String,
                    enum: ["Company", "Partnership Firm", "Proprietary Firm", "LLP", "Others"],
                },
                incorporation_date: Number,
                designation_self: {
                    type: String,
                    enum: ["Proprietor", "Partner", "Founder", "Director", "Others"],
                },
                years_in_business: Number,
                years_of_itr_filing: Number,
            },
            vehicleModel: String,        
            expectedDeliveryDate: String, 
            dealerName: String,          
            dealerCity: String,          
            vehiclePrice: Number,     
            loanAmountRequired: Number,
            preferredBank: String,    
        }, { _id: false }),
        
    },
    businessDetails: {
        type: new mongoose.Schema({
            applicationFirm: {
                company_name: String,    
                company_type: {          
                    type: String,
                    enum: ["Pvt Ltd Company", "Unlisted Public Limited Company", "Partnership Firm", "Proprietary Firm", "LLP", "Others"],
                },
                incorporation_date: Number,
                nameOfDirector: String,    
                years_in_business: Number,
                years_of_itr_filing: Number, 
            },
            propertyFinalized: String, 
            propertyAddress: String,
            agreementExecuted: String, 
            agreementValue: Number,  //Consistent with form (agreement_mou_value)
            loanAmountRequired: Number,
            preferredBank: String,    // Consistent naming
        }, { _id: false }),
       // removed validator
    },
    personalDetails: {
        type: new mongoose.Schema({
            employmentType: {
                type: String,
                enum: ["Salaried", "Self-Employed"],
            },
            salariedDetails: {
                organisation_name: String, // Consistent naming
                organisation_type: {
                    type: String,
                    enum: ["Central Govt.", "State Govt.", "Govt. Organisation", "PSU", "Private Limited Company", "Public Limited Company", "Partnership Firm", "Proprietary Firm", "LLP", "Others"],
                },
                currentOrganizationExperience: String, // Keep as String since it might be "2 years, 6 months"
                previousOrganizationExperience: String, // Keep as String
                designation_salaried: String,
                place_of_posting: String,
                monthly_salary: Number,
                salary_bank_name: String,
            },
            selfEmployedDetails: {
                company_name: String, // Consistent Naming
                company_type: {
                    type: String,
                    enum: ["Company", "Partnership Firm", "Proprietary Firm", "LLP", "Others"],
                },
                incorporation_date: Number,
                designation_self: {
                    type: String,
                    enum: ["Proprietor", "Partner", "Founder", "Director", "Others"],
                },
                years_in_business: Number,
                years_of_itr_filing: Number,
            },
            loanAmountRequired: Number,
            preferredBank: String, //Consistent with form

        }, { _id: false }),
    },
    mortgageDetails: {
        type: new mongoose.Schema({
            employmentType: {
                type: String,
                enum: ["Salaried", "Self-Employed"],
            },
            salariedDetails: {
                organisation_name: String, // Consistent naming
                organisation_type: {
                    type: String,
                    enum: ["Central Govt.", "State Govt.", "Govt. Organisation", "PSU", "Private Limited Company", "Public Limited Company", "Partnership Firm", "Proprietary Firm", "LLP", "Others"],
                },
                currentOrganizationExperience: String, // Keep as String since it might be "2 years, 6 months"
                previousOrganizationExperience: String, // Keep as String
                designation_salaried: String,
                place_of_posting: String,
                monthly_salary: Number,
                salary_bank_name: String,
            },
            selfEmployedDetails: {
                company_name: String, // Consistent Naming
                company_type: {
                    type: String,
                    enum: ["Company", "Partnership Firm", "Proprietary Firm", "LLP", "Others"],
                },
                incorporation_date: Number,
                designation_self: {
                    type: String,
                    enum: ["Proprietor", "Partner", "Founder", "Director", "Others"],
                },
                years_in_business: Number,
                years_of_itr_filing: Number,
            },
            propertyFinalized: String,  // Keep as string
            propertyAddress: String,
            agreementExecuted: String, // Keep as string
            agreementValue: Number,  //Consistent with form (agreement_mou_value)
            loanAmountRequired: Number,
            preferredBank: String,    // Consistent naming

        }),
    },

},{ _id: false });




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
},{ _id: false });


const formSchema = new mongoose.Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    personalDetails: [personalDetailsSchema],
    loanApplication: loanApplicationSchema,
    loanDocuments: loanDocumentsSchema,
    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },
  }, { timestamps: true });

const Form = mongoose.model("Form", formSchema);

module.exports = Form;







module.exports = mongoose.model("formone", personalDetailsSchema);

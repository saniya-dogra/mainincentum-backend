const mongoose = require("mongoose");

const formSchema = new mongoose.Schema({
    loanType: {
        type: String,
        enum: ["Home Loan", "Vehicle Loan", "Business Loan", "Personal Loan", "Mortgage Loan"],
        required: true,
    },
    user_type: { 
      type: String,
      enum: ["Salaried", "Self-Employed"], 
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

        }, { _id: false }),
    },

}, { timestamps: true }); // Good practice: add timestamps


module.exports = mongoose.model("FormTwo", formSchema);
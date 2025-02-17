const mongoose = require("mongoose");  
  
const formSchema = new mongoose.Schema({  
    loanType: {  
        type: String,  
        enum: ["Home Loan", "Vehicle Loan", "Business Loan", "Personal Loan", "Mortgage Loan"],  
        required: true,  
    },  
    homeDetails: {  
        type: new mongoose.Schema({  
            employmentType: {  
                type: String,  
                enum: ["Salaried", "Self-Employed"],  
                required: function () {  
                    return this.parent().loanType === "Home Loan";  
                },  
            },  
            salariedDetails: {  
                organizationName: String,  
                organizationType: {  
                    type: String,  
                    enum: ["Central Govt.", "State Govt.", "Govt. Organisation", "PSU", "Private Limited Company", "Public Limited Company", "Partnership Firm", "Proprietary Firm", "LLP", "Others"],  
                },  
                workExperience: String,  
                workExperienceDuration: String,  
                designations: String,  
                placeOfPosting: String,  
                monthlySalary: Number,  
                bankInSalaryAccount: String,  
            },  
            selfEmployedDetails: {  
                nameOfFirm: String,  
                typeOfFirm: {  
                    type: String,  
                    enum: ["Company", "Partnership Firm", "Proprietary Firm", "LLP", "Others"],  
                },  
                firmRegistrationDate: Date,  
                designations: {  
                    type: String,  
                    enum: ["Proprietor", "Partner", "Founder", "Director", "Others"],  
                },  
                yearsInBusiness: Number,  
                yearsOfITRFiling: Number,  
            },  
            propertyFinalized: Boolean,  
            propertyAddress: String,  
            agreementExecuted: Boolean,  
            agreementValue: Number,  
            loanAmountRequired: Number,  
            preferredBank: String,  
        }, { _id: false }),  
        required: function () {  
            return this.loanType === "Home Loan";  
        },  
    },  
    vehicleDetails: {  
        type: new mongoose.Schema({  
            employmentType: {  
                type: String,  
                enum: ["Salaried", "Self-Employed"],  
                required: function () {  
                    return this.parent().loanType === "Vehicle Loan";  
                },  
            },  
            salariedDetails: {  
                organizationName: String,  
                organizationType: {  
                    type: String,  
                    enum: ["Central Govt.", "State Govt.", "Govt. Organisation", "PSU", "Private Limited Company", "Public Limited Company", "Partnership Firm", "Proprietary Firm", "LLP", "Others"],  
                },  
                workExperience: String,  
                workExperienceDuration: String,  
                designations: String,  
                placeOfPosting: String,  
                monthlySalary: Number,  
                bankInSalaryAccount: String,  
            },  
            selfEmployedDetails: {  
                nameOfFirm: String,  
                typeOfFirm: {  
                    type: String,  
                    enum: ["Company", "Partnership Firm", "Proprietary Firm", "LLP", "Others"],  
                },  
                firmRegistrationDate: Date,  
                designations: {  
                    type: String,  
                    enum: ["Proprietor", "Partner", "Founder", "Director", "Others"],  
                },  
                yearsInBusiness: Number,  
                yearsOfITRFiling: Number,  
            },  
            vehicleDetails: {  
                modelOfVehicle: String,  
                dealerName: String,  
                expectedDeliveryDate: Date,  
                dealerCity: String,  
            },  
            loanDetails: {  
                priceOfVehicle: Number,  
                desiredLoanAmount: Number,  
                preferredBank: String,  
            },  
        }, { _id: false }),  
        required: function () {  
            return this.loanType === "Vehicle Loan";  
        },  
    },
    businessDetails: {  
      type: new mongoose.Schema({  
          applicationFirm: {  
              nameOfFirm: String,  
              typeOfFirm: {  
                  type: String,  
                  enum: ["Pvt Ltd Company", "Unlisted Public Limited Company", "Partnership Firm", "Proprietary Firm", "LLP", "Others"],  
              },  
              firmRegistrationDate: Date,  
              nameOfDirector: String,  
              yearsInBusiness: Number,  
              typeOfBusiness: {  
                  type: String,  
                  enum: ["Manufacturing", "Trade", "Service Sector", "Others"],  
              },  
          },  
          propertyFinalized: Boolean,  
          propertyAddress: String,  
          agreementExecuted: Boolean,  
          agreementValue: Number,  
          loanAmountRequired: Number,  
          preferredBank: String,  
      }, { _id: false }),  
      required: function () {  
          return this.loanType === "Business Loan";  
      },  
    },
    personalDetails: {  
      type: new mongoose.Schema({  
          employmentType: {  
              type: String,  
              enum: ["Salaried", "Self-Employed"],  
              required: function () {  
                  return this.parent().loanType === "Personal Loan";  
              },  
          },  
          salariedDetails: {  
              organizationName: String,  
              organizationType: {  
                  type: String,  
                  enum: ["Central Govt.", "State Govt.", "Govt. Organisation", "PSU", "Private Limited Company", "Public Limited Company", "Partnership Firm", "Proprietary Firm", "LLP", "Others"],  
              },  
              workExperience: String,  
              workExperienceDuration: String,  
              designations: String,  
              placeOfPosting: String,  
              monthlySalary: Number,  
              bankInSalaryAccount: String,  
          },  
          selfEmployedDetails: {  
              nameOfFirm: String,  
              typeOfFirm: {  
                  type: String,  
                  enum: ["Company", "Partnership Firm", "Proprietary Firm", "LLP", "Others"],  
              },  
              firmRegistrationDate: Date,  
              designation: {  
                  type: String,  
                  enum: ["Proprietor", "Partner", "Founder", "Director", "Others"],  
              },  
              yearsInBusiness: Number,  
              yearsOfITRFiling: Number,  
          },  
          loanAmountRequired: Number,  
          preferredBank: String,  
      }, { _id: false }),  
      required: function () {  
          return this.loanType === "Personal Loan";  
      },  
    },  
    
    mortgageDetails: {  
      type: new mongoose.Schema({  
          employmentType: {  
              type: String,  
              enum: ["Salaried", "Self-Employed"],  
              required: function () {  
                  return this.parent().loanType === "Mortgage Loan";  
              },  
          },  
          salariedDetails: {  
              organizationName: String,  
              organizationType: {  
                  type: String,  
                  enum: ["Central Govt.", "State Govt.", "Govt. Organisation", "PSU", "Private Limited Company", "Public Limited Company", "Partnership Firm", "Proprietary Firm", "LLP", "Others"],  
              },  
              workExperience: String,  
              workExperienceDuration: String,  
              designations: String,  
              placeOfPosting: String,  
              monthlySalary: Number,  
              bankInSalaryAccount: String,  
          },  
          selfEmployedDetails: {  
              nameOfFirm: String,  
              typeOfFirm: {  
                  type: String,  
                  enum: ["Company", "Partnership Firm", "Proprietary Firm", "LLP", "Others"],  
              },  
              firmRegistrationDate: Date,  
              designation: {  
                  type: String,  
                  enum: ["Proprietor", "Partner", "Founder", "Director", "Others"],  
              },  
              yearsInBusiness: Number,  
              yearsOfITRFiling: Number,  
          },  
          propertyFinalized: Boolean,  
          propertyAddress: String,  
          agreementExecuted: Boolean,  
          agreementValue: Number,  
          loanAmountRequired: Number,  
          preferredBank: String,  
      }, { _id: false }),  
      required: function () {  
          return this.loanType === "Mortgage Loan";  
      },  
    },  
});  
  
module.exports = mongoose.model("FormTwo", formSchema);  






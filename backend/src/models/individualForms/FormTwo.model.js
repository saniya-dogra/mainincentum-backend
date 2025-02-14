const mongoose = require("mongoose");

const formSchema = new mongoose.Schema({
  loanType: {
    type: String,
    enum: ["Home Loan", "Vehicle Loan", "Business Loan", "Personal Loan", "Mortgage Loan"],
    required: true,
  },

  homeDetails: {
    type: {
      employmentType: {
        type: String,
        enum: ["Salaried", "Self-Employed / Professional"],
        required: function () {
          return this.loanType === "Home Loan";
        },
      },
      salariedDetails: {
        organizationName: {
          type: String,
          required: function () {
            return this.employmentType === "Salaried" && this.loanType === "Home Loan";
          },
        },
        organizationType: {
          type: String,
          enum: [
            "Central Govt.",
            "State Govt.",
            "Govt. Organisation",
            "PSU",
            "Private Limited Company",
            "Public Limited Company",
            "Partnership Firm",
            "Proprietary Firm",
            "LLP",
            "Others",
          ],
          required: function () {
            return this.employmentType === "Salaried" && this.loanType === "Home Loan";
          },
        },
        workExperience: {
          type: String,
          enum: ["Current Organisation", "Previous Organisation"],
          required: function () {
            return this.employmentType === "Salaried" && this.loanType === "Home Loan";
          },
        },
        workExperienceDuration: {
          type: String,
          enum: ["1 year", "2 years", "3 years", "4 years", "5 years"],
          required: function () {
            return this.employmentType === "Salaried" && this.loanType === "Home Loan";
          },
        },
        designations: {
          type: String,
          required: function () {
            return this.employmentType === "Salaried" && this.loanType === "Home Loan";
          },
        },
        placeOfPosting: {
          type: String,
          required: function () {
            return this.employmentType === "Salaried" && this.loanType === "Home Loan";
          },
        },
        monthlySalary: {
          type: Number,
          required: function () {
            return this.employmentType === "Salaried" && this.loanType === "Home Loan";
          },
        },
        bankInSalaryAccount: {
          type: String,
          required: function () {
            return this.employmentType === "Salaried" && this.loanType === "Home Loan";
          },
        },
      },
      selfEmployedDetails: {
        nameOfFirm: {
          type: String,
          required: function () {
            return this.employmentType === "Self-Employed / Professional" && this.loanType === "Home Loan";
          },
        },
        typeOfFirm: {
          type: String,
          enum: ["Company", "Partnership Firm", "Proprietary Firm", "LLP", "Others"],
          required: function () {
            return this.employmentType === "Self-Employed / Professional" && this.loanType === "Home Loan";
          },
        },
        firmRegistrationDate: {
          type: Date,
          required: function () {
            return this.employmentType === "Self-Employed / Professional" && this.loanType === "Home Loan";
          },
        },
        designations: {
          type: String,
          enum: ["Proprietor", "Partner", "Founder", "Director", "Others"],
          required: function () {
            return this.employmentType === "Self-Employed / Professional" && this.loanType === "Home Loan";
          },
        },
        yearsInBusiness: {
          type: Number,
          required: function () {
            return this.employmentType === "Self-Employed / Professional" && this.loanType === "Home Loan";
          },
        },
        yearsOfITRFiling: {
          type: Number,
          required: function () {
            return this.employmentType === "Self-Employed / Professional" && this.loanType === "Home Loan";
          },
        },
      },
      propertyFinalized: {
        type: Boolean,
        required: function () {
          return this.loanType === "Home Loan";
        },
      },
      propertyAddress: {
        type: String,
        required: function () {
          return this.propertyFinalized && this.loanType === "Home Loan";
        },
      },
      agreementExecuted: {
        type: Boolean,
        required: function () {
          return this.loanType === "Home Loan";
        },
      },
      agreementValue: {
        type: Number,
        required: function () {
          return this.agreementExecuted && this.loanType === "Home Loan";
        },
      },
      loanAmountRequired: {
        type: Number,
        required: function () {
          return this.loanType === "Home Loan";
        },
      },
      preferredBank: {
        type: String,
      },
    },
    required: function () {
      return this.loanType === "Home Loan";
    },
  },

  vehicleDetails: {
    type: {
      employmentType: {
        type: String,
        enum: ["Salaried", "Self-Employed / Professional"],
        required: function () {
          return this.loanType === "Vehicle Loan";
        },
      },
      salariedDetails: {
        organizationName: {
          type: String,
          required: function () {
            return this.employmentType === "Salaried" && this.loanType === "Vehicle Loan";
          },
        },
        organizationType: {
          type: String,
          enum: [
            "Central Govt.",
            "State Govt.",
            "Govt. Organisation",
            "PSU",
            "Private Limited Company",
            "Public Limited Company",
            "Partnership Firm",
            "Proprietary Firm",
            "LLP",
            "Others",
          ],
          required: function () {
            return this.employmentType === "Salaried" && this.loanType === "Vehicle Loan";
          },
        },
        workExperience: {
          type: String,
          enum: ["Current Organisation", "Previous Organisation"],
          required: function () {
            return this.employmentType === "Salaried" && this.loanType === "Vehicle Loan";
          },
        },
        workExperienceDuration: {
          type: String,
          enum: [
            "1 month",
            "2 months",
            "3 months",
            "4 months",
            "5 months",
            "6 months",
            "7 months",
            "8 months",
            "9 months",
            "10 months",
            "11 months",
            "12 months",
            "13 months",
            "14 months",
            "15 months",
            "16 months",
            "17 months",
            "18 months",
            "19 months",
            "20 months",
            "21 months",
            "22 months",
            "23 months",
            "24 months",
            "25 months",
            "26 months",
            "27 months",
            "28 months",
            "29 months",
            "30 months",
            "31 months",
            "32 months",
            "33 months",
            "34 months",
            "35 months",
            "36 months",
          ],
          required: function () {
            return this.employmentType === "Salaried" && this.loanType === "Vehicle Loan";
          },
        },
        designations: {
          type: String,
          required: function () {
            return this.employmentType === "Salaried" && this.loanType === "Vehicle Loan";
          },
        },
        placeOfPosting: {
          type: String,
          required: function () {
            return this.employmentType === "Salaried" && this.loanType === "Vehicle Loan";
          },
        },
        monthlySalary: {
          type: Number,
          required: function () {
            return this.employmentType === "Salaried" && this.loanType === "Vehicle Loan";
          },
        },
        bankInSalaryAccount: {
          type: String,
          required: function () {
            return this.employmentType === "Salaried" && this.loanType === "Vehicle Loan";
          },
        },
      },
      selfEmployedDetails: {
        nameOfFirm: {
          type: String,
          required: function () {
            return this.employmentType === "Self-Employed / Professional" && this.loanType === "Vehicle Loan";
          },
        },
        typeOfFirm: {
          type: String,
          enum: ["Company", "Partnership Firm", "Proprietary Firm", "LLP", "Others"],
          required: function () {
            return this.employmentType === "Self-Employed / Professional" && this.loanType === "Vehicle Loan";
          },
        },
        firmRegistrationDate: {
          type: Date,
          required: function () {
            return this.employmentType === "Self-Employed / Professional" && this.loanType === "Vehicle Loan";
          },
        },
        designations: {
          type: String,
          enum: ["Proprietor", "Partner", "Founder", "Director", "Others"],
          required: function () {
            return this.employmentType === "Self-Employed / Professional" && this.loanType === "Vehicle Loan";
          },
        },
        yearsInBusiness: {
          type: Number,
          required: function () {
            return this.employmentType === "Self-Employed / Professional" && this.loanType === "Vehicle Loan";
          },
        },
        yearsOfITRFiling: {
          type: Number,
          required: function () {
            return this.employmentType === "Self-Employed / Professional" && this.loanType === "Vehicle Loan";
          },
        },
      },
      vehicleDetails: {
        modelOfVehicle: {
          type: String,
        },
        dealerName: {
          type: String,
        },
        expectedDeliveryDate: {
          type: Date,
        },
        dealerCity: {
          type: String,
        },
      },
      loanDetails: {
        priceOfVehicle: {
          type: Number,
        },
        desiredLoanAmount: {
          type: Number,
        },
        preferredBank: {
          type: String,
        },
      },
    },
    required: function () {
      return this.loanType === "Vehicle Loan";
    },
  },

  businessDetails: {
    type: {
      applicationFirm: {
        nameOfFirm: {
          type: String,
        },
        typeOfFirm: {
          type: String,
          enum: [
            "Pvt Ltd Company",
            "Unlisted Public Limited Company",
            "Partnership Firm",
            "Proprietary Firm",
            "LLP",
            "Others",
          ],
        },
        firmRegistrationDate: {
          type: Date,
        },
        nameOfDirector: {
          type: String,
        },
        yearsInBusiness: {
          type: Number,
        },
        typeOfBusiness: {
          type: String,
          enum: ["Manufacturing", "Trade", "Service Sector", "Others"],
        },
      },
      propertyFinalized: {
        type: Boolean,
        required: function () {
          return this.loanType === "Business Loan";
        },
      },
      propertyAddress: {
        type: String,
        required: function () {
          return this.propertyFinalized && this.loanType === "Business Loan";
        },
      },
      agreementExecuted: {
        type: Boolean,
        required: function () {
          return this.loanType === "Business Loan";
        },
      },
      agreementValue: {
        type: Number,
        required: function () {
          return this.agreementExecuted && this.loanType === "Business Loan";
        },
      },
      loanAmountRequired: {
        type: Number,
      },
      preferredBank: {
        type: String,
      },
    },
    required: function () {
      return this.loanType === "Business Loan";
    },
  },

  personalDetails: {
    type: {
      employmentType: {
        type: String,
        enum: ["Salaried", "Self-Employed / Professional"],
        required: function () {
          return this.loanType === "Personal Loan";
        },
      },
      salariedDetails: {
        organizationName: {
          type: String,
          required: function () {
            return this.employmentType === "Salaried" && this.loanType === "Personal Loan";
          },
        },
        organizationType: {
          type: String,
          enum: [
            "Central Govt.",
            "State Govt.",
            "Govt. Organisation",
            "PSU",
            "Private Limited Company",
            "Public Limited Company",
            "Partnership Firm",
            "Proprietary Firm",
            "LLP",
            "Others",
          ],
          required: function () {
            return this.employmentType === "Salaried" && this.loanType === "Personal Loan";
          },
        },
        workExperience: {
          type: String,
          enum: ["Current Organisation", "Previous Organisation"],
          required: function () {
            return this.employmentType === "Salaried" && this.loanType === "Personal Loan";
          },
        },
        workExperienceDuration: {
          type: String,
          enum: ["1 year", "2 years", "3 years", "4 years", "5 years"],
          required: function () {
            return this.employmentType === "Salaried" && this.loanType === "Personal Loan";
          },
        },
        designations: {
          type: String,
          required: function () {
            return this.employmentType === "Salaried" && this.loanType === "Personal Loan";
          },
        },
        placeOfPosting: {
          type: String,
          required: function () {
            return this.employmentType === "Salaried" && this.loanType === "Personal Loan";
          },
        },
        monthlySalary: {
          type: Number,
          required: function () {
            return this.employmentType === "Salaried" && this.loanType === "Personal Loan";
          },
        },
        bankInSalaryAccount: {
          type: String,
          required: function () {
            return this.employmentType === "Salaried" && this.loanType === "Personal Loan";
          },
        },
      },
      selfEmployedDetails: {
        nameOfFirm: {
          type: String,
          required: function () {
            return this.employmentType === "Self-Employed / Professional" && this.loanType === "Personal Loan";
          },
        },
        typeOfFirm: {
          type: String,
          enum: ["Company", "Partnership Firm", "Proprietary Firm", "LLP", "Others"],
          required: function () {
            return this.employmentType === "Self-Employed / Professional" && this.loanType === "Personal Loan";
          },
        },
        firmRegistrationDate: {
          type: Date,
          required: function () {
            return this.employmentType === "Self-Employed / Professional" && this.loanType === "Personal Loan";
          },
        },
        designation: {
          type: String,
          enum: ["Proprietor", "Partner", "Founder", "Director", "Others"],
          required: function () {
            return this.employmentType === "Self-Employed / Professional" && this.loanType === "Personal Loan";
          },
        },
        yearsInBusiness: {
          type: Number,
          required: function () {
            return this.employmentType === "Self-Employed / Professional" && this.loanType === "Personal Loan";
          },
        },
        yearsOfITRFiling: {
          type: Number,
          required: function () {
            return this.employmentType === "Self-Employed / Professional" && this.loanType === "Personal Loan";
          },
        },
      },
      loanAmountRequired: {
        type: Number,
        required: function () {
          return this.loanType === "Personal Loan";
        },
      },
      preferredBank: {
        type: String,
      },
    },
    required: function () {
      return this.loanType === "Personal Loan";
    },
  },

  mortgageDetails: {
    type: {
      employmentType: {
        type: String,
        enum: ["Salaried", "Self-Employed / Professional"],
        required: function () {
          return this.loanType === "Mortgage Loan";
        },
      },
      salariedDetails: {
        organizationName: {
          type: String,
          required: function () {
            return this.employmentType === "Salaried" && this.loanType === "Mortgage Loan";
          },
        },
        organizationType: {
          type: String,
          enum: [
            "Central Govt.",
            "State Govt.",
            "Govt. Organisation",
            "PSU",
            "Private Limited Company",
            "Public Limited Company",
            "Partnership Firm",
            "Proprietary Firm",
            "LLP",
            "Others",
          ],
          required: function () {
            return this.employmentType === "Salaried" && this.loanType === "Mortgage Loan";
          },
        },
        workExperience: {
          type: String,
          enum: ["Current Organisation", "Previous Organisation"],
          required: function () {
            return this.employmentType === "Salaried" && this.loanType === "Mortgage Loan";
          },
        },
        workExperienceDuration: {
          type: String,
          enum: ["1 year", "2 years", "3 years", "4 years", "5 years"],
          required: function () {
            return this.employmentType === "Salaried" && this.loanType === "Mortgage Loan";
          },
        },
        designations: {
          type: String,
          required: function () {
            return this.employmentType === "Salaried" && this.loanType === "Mortgage Loan";
          },
        },
        placeOfPosting: {
          type: String,
          required: function () {
            return this.employmentType === "Salaried" && this.loanType === "Mortgage Loan";
          },
        },
        monthlySalary: {
          type: Number,
          required: function () {
            return this.employmentType === "Salaried" && this.loanType === "Mortgage Loan";
          },
        },
        bankInSalaryAccount: {
          type: String,
          required: function () {
            return this.employmentType === "Salaried" && this.loanType === "Mortgage Loan";
          },
        },
      },
      selfEmployedDetails: {
        nameOfFirm: {
          type: String,
          required: function () {
            return this.employmentType === "Self-Employed / Professional" && this.loanType === "Mortgage Loan";
          },
        },
        typeOfFirm: {
          type: String,
          enum: ["Company", "Partnership Firm", "Proprietary Firm", "LLP", "Others"],
          required: function () {
            return this.employmentType === "Self-Employed / Professional" && this.loanType === "Mortgage Loan";
          },
        },
        firmRegistrationDate: {
          type: Date,
          required: function () {
            return this.employmentType === "Self-Employed / Professional" && this.loanType === "Mortgage Loan";
          },
        },
        designation: {
          type: String,
          enum: ["Proprietor", "Partner", "Founder", "Director", "Others"],
          required: function () {
            return this.employmentType === "Self-Employed / Professional" && this.loanType === "Mortgage Loan";
          },
        },
        yearsInBusiness: {
          type: Number,
          required: function () {
            return this.employmentType === "Self-Employed / Professional" && this.loanType === "Mortgage Loan";
          },
        },
        yearsOfITRFiling: {
          type: Number,
          required: function () {
            return this.employmentType === "Self-Employed / Professional" && this.loanType === "Mortgage Loan";
          },
        },
      },
      propertyFinalized: {
        type: Boolean,
        required: function () {
          return this.loanType === "Mortgage Loan";
        },
      },
      propertyAddress: {
        type: String,
        required: function () {
          return this.propertyFinalized && this.loanType === "Mortgage Loan";
        },
      },
      agreementExecuted: {
        type: Boolean,
        required: function () {
          return this.loanType === "Mortgage Loan";
        },
      },
      agreementValue: {
        type: Number,
        required: function () {
          return this.agreementExecuted && this.loanType === "Mortgage Loan";
        },
      },
      loanAmountRequired: {
        type: Number,
        required: function () {
          return this.loanType === "Mortgage Loan";
        },
      },
      preferredBank: {
        type: String,
      },
    },
    required: function () {
      return this.loanType === "Mortgage Loan";
    },
  },
});

module.exports = mongoose.model("FormTwo", formSchema);
const {  DataTypes } = require('sequelize');
const { sequelize } = require("../../db");  

const HomeLoanTwo = sequelize.define('HomeLoanTwo', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  user_type: {
    type: DataTypes.ENUM('Salaried', 'Self-Employed'),
    allowNull: true
  },
  organisation_name: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  designation_salaried: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  organisation_type: {
    type: DataTypes.ENUM('Central Govt.', 'State Govt.', 'Govt. Organisation', 'PSU', 'Private Limited Company', 'Public Limited Company', 'Partnership Firm', 'Proprietary Firm', 'LLP', 'Others'),
    allowNull: true
  },
  work_experience: {
    type: DataTypes.ENUM('Current Organisation', 'Previous Organisation'),
    allowNull: true
  },
  work_experience_duration: {
    type: DataTypes.ENUM('1 year', '2 year', '3 year', '4 year', '5 year', '6 year'),
    allowNull: true
  },
  monthly_salary: {
    type: DataTypes.DECIMAL(15, 2),
    allowNull: true
  },
  place_of_posting: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  salary_bank_name: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  company_name: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  company_type: {
    type: DataTypes.ENUM('Company', 'Partnership Firm', 'Proprietary Firm', 'LLP', 'Others'),
    allowNull: true
  },
  incorporation_date: {
    type: DataTypes.ENUM('1 year', '2 year', '3 year', '4 year', '5 year', '6 year', '7 year', '8 year', '9 year'),
    allowNull: true
  },
  designation_self: {
    type: DataTypes.ENUM('Proprietor', 'Partner', 'Founder', 'Director', 'Others'),
    allowNull: true
  },
  years_in_business: {
    type: DataTypes.ENUM('1 year', '2 year', '3 year', '4 year', '5 year', '6 year', '7 year', '8 year', '9 year'),
    allowNull: true
  },
  years_of_itr_filing: {
    type: DataTypes.ENUM('1 year', '2 year', '3 year', '4 year', '5 year', '6 year', '7 year', '8 year', '9 year'),
    allowNull: true
  },
  property_finalised: {
    type: DataTypes.BOOLEAN,
    allowNull: true
  },
  property_address: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  agreement_executed: {
    type: DataTypes.BOOLEAN,
    allowNull: true
  },
  agreement_mou_value: {
    type: DataTypes.DECIMAL(15, 2),
    allowNull: true
  },
  loan_amount_required: {
    type: DataTypes.DECIMAL(15, 2),
    allowNull: true
  },
  preferred_banks: {
    type: DataTypes.STRING(255),
    allowNull: true
  }
}, {
  tableName: 'home_loan_two', // Table name in the database
  timestamps: false // Disable automatic timestamp columns createdAt & updatedAt
});


// AppLoanTwo.sync({ alter: true })
// .then(() => {
//   console.log("AppLoanTwo table created or updated successfully.");
// })
// .catch((err) => {
//   console.error("Error creating or updating table: ", err);
// });

module.exports = HomeLoanTwo;

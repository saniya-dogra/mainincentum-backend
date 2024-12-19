const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require("../../db");  

const HomeLoanOne = sequelize.define('HomeLoanOne', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  full_name: {
    type: DataTypes.STRING,
    allowNull: true
  },
  father_name: {
    type: DataTypes.STRING,
    allowNull: true
  },
  mobile_number: {
    type: DataTypes.STRING(10),
    allowNull: true
  },
  email_id: {
    type: DataTypes.STRING,
    unique:true,
    allowNull: true
  },
  dob: {
    type: DataTypes.DATEONLY,
    allowNull: true
  },
  gender: {
    type: DataTypes.ENUM('Male', 'Female', 'Other'),
    allowNull: true
  },
  qualification: {
    type: DataTypes.ENUM('Post graduate', 'Graduate', 'Higher-Secondary', 'Secondary', 'Others'),
    allowNull: true
  },
  employment_type: {
    type: DataTypes.ENUM('Salaried', 'Self-Employed', 'Professional', 'Un-Employed'),
    allowNull: true
  },
  marital_status: {
    type: DataTypes.ENUM('Married', 'Unmarried', 'Other'),
    allowNull: true
  },
  spouse_employment_type: {
    type: DataTypes.ENUM('Earning', 'Home-Maker'),
    allowNull: true
  },
  no_of_dependents: {
    type: DataTypes.ENUM('0', '1', '2', '3'),
    allowNull: true
  },
  pan_number: {
    type: DataTypes.STRING(10),
    allowNull: true
  },
  residence_type: {
    type: DataTypes.ENUM('Owned', 'Rented', 'Parental', 'Others'),
    allowNull: true
  },
  citizenship: {
    type: DataTypes.ENUM('Residant-Indian', 'Non Residant-Indian'),
    allowNull: true
  },
  permanent_state: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  permanent_district: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  permanent_address: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  permanent_pincode: {
    type: DataTypes.STRING(10),
    allowNull: true
  },
  present_state: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  present_district: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  present_address: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  present_pincode: {
    type: DataTypes.STRING(10),
    allowNull: true
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
    allowNull: true
  }
}, {
  tableName: 'home_loan_one',
  timestamps: false 
});



module.exports = HomeLoanOne;

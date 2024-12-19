const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require("../../db");

const HomeLoanThree = sequelize.define('HomeLoanThree', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  pan_card: {
    type: DataTypes.BLOB('long'),
    allowNull: true,
  },
  aadhar_card: {
    type: DataTypes.BLOB('long'),
    allowNull: true,
  },
  employer_id_card: {
    type: DataTypes.BLOB('long'),
    allowNull: true,
  },
  joining_confirmation_letter: {
    type: DataTypes.BLOB('long'),
    allowNull: true,
  },
  last_12_month_salary_statement: {
    type: DataTypes.BLOB('long'),
    allowNull: true,
  },
  existing_loan_account_statement: {
    type: DataTypes.BLOB('long'),
    allowNull: true,
  },
  latest_6_month_salary_slip: {
    type: DataTypes.BLOB('long'),
    allowNull: true,
  },
  form_16_and_26as: {
    type: DataTypes.BLOB('long'),
    allowNull: true,
  },
  itr_and_computation: {
    type: DataTypes.BLOB('long'),
    allowNull: true,
  },
  firm_registration: {
    type: DataTypes.BLOB('long'),
    allowNull: true,
  },
  gstr_last_year: {
    type: DataTypes.BLOB('long'),
    allowNull: true,
  },
  current_account_statement: {
    type: DataTypes.BLOB('long'),
    allowNull: true,
  },
  balance_sheets: {
    type: DataTypes.BLOB('long'),
    allowNull: true,
  },
  loan_closure_statements: {
    type: DataTypes.BLOB('long'),
    allowNull: true,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
    allowNull: true,
  }
}, {
  tableName: 'home_loan_three',
  timestamps: false, // Disable automatic `createdAt` and `updatedAt` fields
});

module.exports = HomeLoanThree;

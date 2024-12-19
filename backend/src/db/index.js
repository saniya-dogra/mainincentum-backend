// src/db/index.js
const { Sequelize } = require("sequelize");

// Setting up Sequelize connection
const sequelize = new Sequelize(
  `mysql://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:3306/${process.env.DB_NAME}`,
  { dialect: "mysql", logging: false }
);

module.exports = { sequelize };

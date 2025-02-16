const mongoose = require("mongoose");

const formSchema = new mongoose.Schema({
  full_name: { type: String },
  father_name: { type: String },
  mobile_number: { type: String, match: /^[0-9]{10}$/ },
  email_id: { type: String, unique: true, match: /\S+@\S+\.\S+/ },
  dob: { type: String },
  gender: { type: String, enum: ["Male", "Female", "Other"] },
  qualification: {
    type: String,
    enum: ["Post Graduate", "Graduate", "Higher Secondary", "Secondary", "Others"],
  },
  employment_type: {
    type: String,
    enum: ["Salaried", "Self Employed", "Professional", "Unemployed"],
  },
  marital_status: { type: String, enum: ["Married", "Unmarried", "Other"] },
  spouse_employment_type: { type: String, enum: ["Earning", "Home Maker"] },
  no_of_dependents: { type: Number, min: 0, max: 3 },
  pan_number: { type: String, required: true, match: /[A-Z]{5}[0-9]{4}[A-Z]{1}/ },
  residence_type: {
    type: String,
    enum: ["Owned", "Rented", "Parental", "Others"],
  },
  citizenship: { type: String, enum: ["Resident Indian", "Non-Resident Indian"] },
  
  permanent_address: {
    state: { type: String },
    district: { type: String },
    address: { type: String },
    pincode: { type: String, match: /^[0-9]{6}$/ },
  },
  present_address: {
    state: { type: String },
    district: { type: String },
    address: { type: String },
    pincode: { type: String, match: /^[0-9]{6}$/ },
  },
});

const FormOne = mongoose.model("FormOne", formSchema);

module.exports = FormOne;

const mongoose = require("mongoose");

const formOneSchema = new mongoose.Schema({
  full_name: { 
    type: String, 
    required: true
  },
  father_name: {
    type: String 
  },
  email_id: {
    type: String,
    required: [true, "Email is required"],
    unique: [true, "Email must be unique"],
    lowercase: true,
    trim: true,
    match: [/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/, "Please enter a valid email address"], 
  },
  mobile_number: {
    type: String,
    required: [true, "Phone number is required"],
    match: [/^\d{10}$/, "Phone number must be 10 digits"],  
  },
  dob: {
    type: Date, 
  },
  gender: {
    type: String, 
  },
  qualification: { 
    type: String, 
  },
  employment_type: { 
    type: String, 
  },
  marital_status: {
    type: String,
  },
  spouse_employment_type: { 
    type: String, 
  },
  no_of_dependents: {
    type: Number,  
  },
  pan_number: {
    type: String,
  },
  residence_type: { 
    type: String,
  },
  citizenship: { 
    type: String, 
  },
  permanent_state: {
    type: String,
  },
  permanent_district: { 
    type: String, 
  },
  permanent_address: { 
    type: String, 
  },
  permanent_pincode: { 
    type: String, 
  },
  present_state: {
    type: String,
  },
  present_district: {
    type: String, 
  },
  present_address: {
    type: String,
  },
  present_pincode: { 
    type: String, 
  },
}, {
  timestamps: true  
});

const FormOne = mongoose.model("FormOne", formOneSchema);

module.exports = {FormOne};

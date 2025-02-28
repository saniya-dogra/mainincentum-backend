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
});


module.exports = mongoose.model("formone", personalDetailsSchema);

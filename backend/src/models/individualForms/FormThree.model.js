const mongoose = require("mongoose");

const DocumentSchema = new mongoose.Schema({
  panCard: { type: String, }, 
  aadhaarCard: { type: String, },
  employeeId: { type: String,  }, 
  uploadedAt: { type: Date, default: Date.now },
});

const Document = mongoose.model("Document", DocumentSchema);

module.exports = Document;

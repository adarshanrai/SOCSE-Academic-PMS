const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  department: { type: mongoose.Schema.Types.ObjectId, ref: "Department" },
  semester: { type: mongoose.Schema.Types.ObjectId, ref: "Semester" },
  created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Student", studentSchema);

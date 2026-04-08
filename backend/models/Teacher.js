const mongoose = require("mongoose");

const teacherSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  department: { type: mongoose.Schema.Types.ObjectId, ref: "Department" },
  created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Teacher", teacherSchema);

const mongoose = require("mongoose");

const semesterSchema = new mongoose.Schema(
  {
    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
      required: true,
    },
    name: { type: String, required: true },
    sequence: { type: Number, required: true },
  },
  { timestamps: true },
);

semesterSchema.index({ department: 1, name: 1 }, { unique: true });

module.exports = mongoose.model("Semester", semesterSchema);

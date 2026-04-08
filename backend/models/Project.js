const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    department: { type: mongoose.Schema.Types.ObjectId, ref: "Department" },
    semester: { type: mongoose.Schema.Types.ObjectId, ref: "Semester" },
    status: {
      type: String,
      enum: ["Ongoing", "Completed", "Pending"],
      default: "Pending",
    },
    start_date: { type: Date },
    end_date: { type: Date },
    progress: { type: Number, default: 0 },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Project", projectSchema);

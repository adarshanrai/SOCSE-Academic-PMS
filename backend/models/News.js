const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    image_url: { type: String },
    published_at: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

module.exports = mongoose.model("News", newsSchema);

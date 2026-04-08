const mongoose = require("mongoose");
require("dotenv").config();

const MONGO_URI =
  process.env.MONGO_URI || "mongodb://localhost:27017/socse_pms";

async function connectDB() {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    throw err;
  }
}

module.exports = connectDB;

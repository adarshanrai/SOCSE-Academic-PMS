const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const authRouter = require("./routes/auth");
const dashboardRouter = require("./routes/dashboard");
const projectsRouter = require("./routes/projects");
const newsRouter = require("./routes/news");
const groupsRouter = require("./routes/groups");
const departmentsRouter = require("./routes/departments");
const semestersRouter = require("./routes/semesters");
const settingsRouter = require("./routes/settings");
const errorHandler = require("./middlewares/errorHandler");
const connectDB = require("./config/db");

const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/auth", authRouter);
app.use("/api/dashboard", dashboardRouter);
app.use("/api/projects", projectsRouter);
app.use("/api/news", newsRouter);
app.use("/api/groups", groupsRouter);
app.use("/api/departments", departmentsRouter);
app.use("/api/semesters", semestersRouter);
app.use("/api/settings", settingsRouter);

app.get("/", (req, res) =>
  res.json({
    message: "SOCSE Academic Project Management Portal API is running",
  }),
);

app.use(errorHandler);

connectDB().catch((err) => {
  console.error("Database connection error:", err);
  process.exit(1);
});

module.exports = app;

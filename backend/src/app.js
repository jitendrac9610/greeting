const express = require("express");
const cors = require("cors");

const app = express();

// middlewares
app.use(cors());
app.use(express.json({ limit: "10mb" }));

// routes
const templateRoutes = require("./routes/template.routes");

// API routes
app.use("/api/templates", templateRoutes);

// test route
app.get("/", (req, res) => {
  res.send("🚀 Backend is running successfully");
});

module.exports = app;

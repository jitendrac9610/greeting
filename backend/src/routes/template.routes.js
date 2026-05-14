const express = require("express");

const router = express.Router();

const {
  getTemplates,
  getSingleTemplate,
} = require("../controllers/template.controller");

// ================= GET ALL =================
router.get("/", getTemplates);

// ================= GET SINGLE =================
router.get("/:id", getSingleTemplate);

module.exports = router;

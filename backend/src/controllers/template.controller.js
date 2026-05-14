const Template = require("../models/Template");

// ================= GET ALL TEMPLATES =================
exports.getTemplates = async (req, res) => {
  try {
    const templates = await Template.find();

    res.status(200).json({
      success: true,
      data: templates,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch templates",
    });
  }
};

// ================= GET SINGLE TEMPLATE =================
exports.getSingleTemplate = async (req, res) => {
  try {
    const template = await Template.findById(req.params.id);

    // NOT FOUND
    if (!template) {
      return res.status(404).json({
        success: false,
        message: "Template not found",
      });
    }

    res.status(200).json({
      success: true,
      data: template,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch template",
    });
  }
};

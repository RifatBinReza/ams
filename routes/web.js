const express = require("express");
const router = express.Router();

/**
 * Import controllers
 */
const userController = require("../controllers/user");
const assessmentController = require("../controllers/assessment");

// Routes
router.get("/login", userController.loginView);
router.get("/dashboard", userController.dashboardView);
router.get("/assessments", assessmentController.listView);
router.get("/assessments/:id", assessmentController.testView);

module.exports = router
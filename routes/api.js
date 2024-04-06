const express = require("express");
const router = express.Router();

/**
 * Import routes
 */
const userRoutes = require("./api/user");
const assessmentRoutes = require("./api/assessment");
const publicRoutes = require("./api/public");

/**
 * Import controllers
 */
const userController = require("../controllers/user");

/**
 * Import middlewares
 */
const schemaValidator = require("../middlewares/schemaValidator");

// Auth routes
router.post("/login", schemaValidator.loginUserSchema, userController.login);

router.use("/", publicRoutes);
router.use("/secure/users", userRoutes);
router.use("/secure/assessments", assessmentRoutes);

module.exports = router
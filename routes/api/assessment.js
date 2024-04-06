const express = require("express");
const router = express.Router();

const assessmentController = require("../../controllers/assessment");

/**
 * Import middlewares
 * TODO: use schema validator before hitting the controllers
 */
const schemaValidator = require("../../middlewares/schemaValidator");

router.get("/", assessmentController.getAllAssessments);
router.get("/:id", assessmentController.getById);
router.post("/", assessmentController.create);


module.exports = router;
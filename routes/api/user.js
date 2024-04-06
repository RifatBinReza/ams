const express = require("express");
const router = express.Router();

const userController = require("../../controllers/user");

/**
 * Import middlewares
 */
const schemaValidator = require("../../middlewares/schemaValidator");


module.exports = router;
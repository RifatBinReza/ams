/**
 * Importing third party libraries
 */
require("dotenv").config(); //Load environment variables to access from process.env
const chalk = require("chalk");
const colors = require("colors");
const cors = require("cors");
const express = require("express");
const errorHandler = require("errorhandler");

/**
 * Require essentials like routes, models, controllers etc
 */
const { sequelize } = require("./models");
const { seedDB } = require("./seeders");

const apiRoutes = require("./routes/api");
const webRoutes = require("./routes/web");


const setupLogger = require("./libs/logger");

const { verifyToken } = require("./middlewares/authentication");
/**
 * Create Express server.
 */
const app = express();

/**
 * Express configuration.
 */
app.set("host", process.env.OPENSHIFT_NODEJS_IP || "0.0.0.0");
app.set("port", process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 3000);

app.use(cors());
app.options("*", cors());

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

/**
 * API Routes
 */
// secure your private routes with jwt authentication middleware
app.all("/api/secure/*", (req, res, next) => verifyToken(req, res, next));
app.use("/api", apiRoutes);
app.use("/", webRoutes);

/**
 * View config
 */
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

/**
 * Error Handler.
 */
app.get("*", (req, res) => {
  res.status(404).json({
    status: "error",
    message: "Route not found",
  });
});

if (process.env.NODE_ENV === "development") {
  // only use in development
  app.use(errorHandler());
} else {
  app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send("Server Error");
  });
}

colors.enable();
setupLogger();

/**
 * Connect the database and start Express server.
 */
sequelize.sync({force: false}).then(() => {

  // Seed the database first
  seedDB();

  let server = app.listen(app.get("port"), () => {
    console.log(
      "%s App is running at %s:%d in %s mode",
      chalk.green("✓"),
      app.get("host"),
      app.get("port"),
      app.get("env")
    );
    console.log("  Press CTRL-C to stop\n");
  });
});

module.exports = app;
